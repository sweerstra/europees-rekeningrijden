import { decodeToken } from '../utils/decodeToken';
import { TOKEN_KEY } from '../config';

export const getLoggedInEmail = () => {
  const token = getToken();

  if (token) {
    return decodeToken(getToken()).sub;
  } else {
    return null;
  }
};

export const isAdmin = () => {
  return Boolean(decodeToken(getToken()).isAdmin);
};

export const isLoggedIn = () => {
  return Boolean(getToken());
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};
