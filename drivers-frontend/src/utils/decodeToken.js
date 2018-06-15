export const decodeToken = (token) => {
  try {
    const [, url] = token.split('.');
    const base = url.replace('-', '+').replace('_', '/');
    return JSON.parse(atob(base));
  } catch (e) {
    return null;
  }
};
