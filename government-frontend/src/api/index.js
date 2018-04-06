import Request from './Request';

const API_URL = 'http://localhost:60858/government/api';

export default {
  ownership: {
    getAll: () => Request.get(`${API_URL}/ownership/all`),
    getLatest: () => Request.get(`${API_URL}/ownership/latest`),
    getByOwner: (id) => Request.get(`${API_URL}/ownership/owner/${id}`)
  },
  owner: {
    getAll: () => Request.get(`${API_URL}/owners`)
  },
  vehicle: {
    getByLicensePlate: (licensePlate) => Request.get(`${API_URL}/vehicle/${licensePlate}`)
  }
};
