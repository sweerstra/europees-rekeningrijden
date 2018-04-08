import Request from './Request';

const API_URL = 'http://localhost:60858/government/api';

export default {
  ownership: {
    add: (ownership) => Request.post(`${API_URL}/ownership`, ownership),
    getAll: () => Request.get(`${API_URL}/ownership/all`),
    getLatest: () => Request.get(`${API_URL}/ownership/latest`),
    getByOwner: (id) => Request.get(`${API_URL}/ownership/owner/${id}`),
    getByVehicle: (id) => Request.get(`${API_URL}/ownership/vehicle/${id}`)
  },
  owner: {
    getAll: () => Request.get(`${API_URL}/owners`)
  },
  vehicle: {
    getByLicensePlate: (licensePlate) => Request.get(`${API_URL}/vehicle/${licensePlate}`)
  }
};