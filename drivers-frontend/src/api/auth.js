import { decodeToken } from '../utils/decodeToken';

const TOKEN_KEY = 'access_token';

export const getLoggedInEmail = () => {
  const token = getToken();

  if (token) {
    const decodedToken = decodeToken(token);
    if (decodedToken) {
      return decodedToken.unique_name;
    }
  } else {
    return null;
  }
};

export const getLoggedInProperty = (prop) => {
  const token = getToken();

  if (token) {
    const decodedToken = decodeToken(token);
    return decodedToken && decodedToken[prop];
  } else {
    return null;
  }
};

export const isLoggedIn = () => {
  return Boolean(getToken() && !isExpiredToken(getToken()));
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

export const isExpiredToken = (token) => {
  try {
    const jwt = decodeToken(token);
    if (!jwt) return true;

    const currentTime = Date.now() / 1000;
    return jwt.exp < currentTime;
  } catch (e) {
    console.error(e);
    return true;
  }
};
