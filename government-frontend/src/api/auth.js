import { decodeToken } from '../utils/decodeToken';

const TOKEN_KEY = 'access_token';

export const getLoggedInEmail = () => {
  const token = getToken();

  if (token) {
    return decodeToken(getToken()).sub;
  } else {
    return null;
  }
};

export const isLoggedIn = () => {
  return Boolean(getToken());
};

const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};
