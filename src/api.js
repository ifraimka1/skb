import * as WPAPI from 'wpapi';
import { flatten } from 'lodash';

import reactPress from './reactPress';
import projects from './projects.json';

const wp = new WPAPI(
  process.env.NODE_ENV === 'development'
    ? {
      endpoint: reactPress.api.rest_url,
      username: 'admin',
      password: 'admin',
    }
    : { endpoint: reactPress.api.rest_url, nonce: reactPress.api.nonce }
);

async function getAllContent(request) {
  return request.then(function (response) {
    if (!response._paging || !response._paging.next) {
      return response;
    }
    // Запрос к следующей странице и возврат ответов одной коллекцией
    return Promise.all([
      response,
      getAllContent(response._paging.next)
    ]).then(function (responses) {
      return flatten(responses);
    });
  });
}

// Функция загрузки медабиблиотеки и сортировки по категориям
async function loadMedia() {
  const response = await getAllContent(wp.media());

  // Нам потребуется id, категория и url
  const result = {};

  for (let { id, alt_text, source_url: image } of response) {
    const [category, name] = alt_text.split('_');

    // Создаем ключ с пустым массивом, если еще нет
    if (!result[category]) {
      result[category] = [];
    }

    // Добавляем медиа в массив нужной категории
    result[category].push({ id, name, image });
  }

  return result;
}

async function loadPosts() {
  // Получаем рубрики
  const responseCategories = await getAllContent(wp.categories());
  const categories = {};

  for (let { id, name } of responseCategories) {
    categories[id] = name;
  }

  // Получаем метки
  const responseTags = await getAllContent(wp.tags());
  const tags = {};

  for (let { id, name } of responseTags) {
    tags[id] = name;
  }

  // Получаем записи
  const responsePosts = await getAllContent(wp.posts());

  for (let post of responsePosts) {
    post.categories = post.categories.map(el => categories[el]);
    post.tags = post.tags.map(el => tags[el]);
  }

  return responsePosts;
}

const mediaLibrary = await loadMedia();
console.log(mediaLibrary);
const posts = await loadPosts();
console.log(posts);

export async function getPosts(name) {
  try {
    const result = posts.filter(post => post.tags.includes(name))[0];
    return result;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getMedia(category, target = false) {
  try {
    if (target) {
      for (let media of mediaLibrary[category]) {
        target[media.name].image = media.image;
        target[media.name].id = media.id;
      }

      return target;
    }

    return mediaLibrary[category];
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getProjects(id) {
  try {
    if (typeof id != 'undefined') {
      return projects[id];
    }

    return projects;
  } catch (error) {
    console.log(error);
    return [];
  }
}