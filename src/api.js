import * as WPAPI from 'wpapi';

import reactPress from './reactPress';

import { g1, g2, g3 } from './assets/images/gallery';

const wp = new WPAPI(
  process.env.NODE_ENV === 'development'
    ? {
        endpoint: reactPress.api.rest_url,
        username: 'admin',
        password: 'testapi',
      }
    : { endpoint: reactPress.api.rest_url, nonce: reactPress.api.nonce }
);

export async function getContacts(q = '') {
  try {
    const users = await wp.users().search(q);
    return users;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getSliderImages() {
  const mock = [ g1, g2, g3 ];
  
  return mock;
}