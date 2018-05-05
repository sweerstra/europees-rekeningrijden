import Request from './Request';
import { API_URL } from '../config';

export default {
  auth: {
    login: (username, password) => Request.post(`${API_URL}/login`, { username, password })
  }
};
