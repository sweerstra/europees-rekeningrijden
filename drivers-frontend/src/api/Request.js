import { getToken } from './auth';

class Request {
  get(url) {
    return this.request(url);
  }

  post(url, data) {
    return this.request(url, {
      method: 'post',
      body: JSON.stringify(data)
    });
  }

  put(url, data) {
    return this.request(url, {
      method: 'put',
      body: JSON.stringify(data)
    });
  }

  delete(url, data) {
    return this.request(url, {
      method: 'delete',
      body: JSON.stringify(data)
    });
  }

  request(url, options = {}) {
    const headers = { ...options.headers, 'Content-Type': 'application/json' };

    const token = getToken();

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return fetch(url, { ...options, headers })
      .then(resp => resp.json());
  };
}

export default new Request();
