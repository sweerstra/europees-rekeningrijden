export const decodeToken = (token) => {
  const [, url] = token.split('.');
  const base = url.replace('-', '+').replace('_', '/');
  return JSON.parse(atob(base));
};
