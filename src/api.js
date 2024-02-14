import * as WPAPI from 'wpapi';

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