import * as WPAPI from 'wpapi';

import reactPress from './reactPress';

// Токен fileBird
const fbToken = 'ltvszr1EL7Q8lX9v4W7ivAEwJsFUvicFGtLepCDj';

const wp = new WPAPI(
  process.env.NODE_ENV === 'development'
    ? {
      endpoint: reactPress.api.rest_url,
      username: 'admin',
      password: 'admin',
    }
    : { endpoint: reactPress.api.rest_url, nonce: reactPress.api.nonce }
);
wp.setHeaders('Authorization', 'Bearer ' + fbToken);

// Получаем категории медиафайлов
const response = await wp.url(reactPress.api.rest_url + 'filebird/public/v1/folders')
const { data: { folders } } = response;
const mediaCategories = {};

// Деструктурируем объекты в формат {category: id}
for (let { id, text } of folders) {
  mediaCategories[text] = id;
}
console.log(response);
console.log(mediaCategories);
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
    const response = await wp.url(reactPress.api.rest_url + 'filebird/public/v1/attachment-id/?folder_id=' + mediaCategories[category]);
    console.log(response);
    return [];
  } catch (error) {
    console.log(error);
    return [];
  }
}