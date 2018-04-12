import { decodeToken } from '../utils/decodeToken';

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
  return localStorage.getItem('access_token');
};

export const logout = () => {
  localStorage.removeItem('access_token');
};
