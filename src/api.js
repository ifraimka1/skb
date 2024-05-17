import * as WPAPI from 'wpapi';
import { flatten } from 'lodash';

import reactPress from './reactPress';
import HTMLReactParser from 'html-react-parser/lib/index';
//import projects from './projects.json';

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

const mediaLibrary = await loadMedia();
console.log(mediaLibrary);

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

const posts = await loadPosts();
console.log(posts);


function createProjectList() {
  const result = {};

  for (let post of posts) {
    if (post.categories.includes('projects')) {
      const { image } = mediaLibrary['projects'].find(item => item.id === post.featured_media);

      result[post.id] = {
        id: post.id,
        name: post.title.rendered,
        tag: post.tags[0],
        preview: image
      }
    }
  }

  return result;
}

const projects = createProjectList();
console.log(projects);

export async function getPosts(name) {
  try {
    const result = posts.filter(post => post.id == name)[0];
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

export async function getProjectByID(id) {
  try {
    if (typeof id != 'undefined') {
      return projects[id];
    }
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getProjects(filter) {
  try {
    if (typeof filter != 'undefined') {
      return projects.filter(project => project.includes(filter));
    }

    return projects;
  } catch (error) {
    console.log(error);
    return [];
  }
}