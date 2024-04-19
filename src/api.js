import * as WPAPI from 'wpapi';

import reactPress from './reactPress';

const wp = new WPAPI(
  process.env.NODE_ENV === 'development'
    ? {
      endpoint: reactPress.api.rest_url,
      username: 'admin',
      password: 'admin',
    }
    : { endpoint: reactPress.api.rest_url, nonce: reactPress.api.nonce }
);

// Функция загрузки медабиблиотеки по категориям
async function loadMedia() {
  // Пытаемся получить медиа, пока не получится
  let response;
  while (!response) {
    try {
      response = await wp.media();
    } catch (e) {
      console.error(e);
    }
  }

  // Нам потребуется id, категория и url
  const result = {};
  while (response) {
    for (let { id, alt_text, source_url: image } of response) {
      const [category, name] = alt_text.split('_');

      // Создаем ключ с пустым массивом, если еще нет
      if (!result[category]) {
        result[category] = [];
      }

      // Добавляем медиа в массив нужной категории
      result[category].push({ id, name, image });
    }
    if (!response._paging.next) break;
    response = await response._paging.next.get();
  }

  return result;
}

const mediaLibrary = await loadMedia();
console.log(mediaLibrary);

export async function getPosts(q = '') {
  try {
    const posts = await wp.posts().search(q);
    return posts;
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
        console.log(target[media.name].id);
      }

      return target;
    }

    return mediaLibrary[category];
  } catch (error) {
    console.log(error);
    return [];
  }
}