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
      console.log(response);
    } catch (e) {
      console.error(e);
    }
  }

  // Нам потребуется id, категория и url
  const result = {};
  for (let { id, alt_text, source_url: url } of response) {
    const [category, name] = alt_text.split('_');

    // Создаем ключ с пустым массивом, если еще нет
    if (!result[category]) {
      result[category] = [];
    }

    // Добавляем медиа в массив нужной категории
    result[category].push({ id, name, url });
  }

  return result;
}

const mediaLibrary = await loadMedia();

export async function getPosts(q = '') {
  try {
    const posts = await wp.posts().search(q);
    return posts;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getMedia(category) {
  try {
    return mediaLibrary[category];
  } catch (error) {
    console.log(error);
    return [];
  }
}