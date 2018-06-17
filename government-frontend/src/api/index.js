import Request from './Request';
import { API_URL } from '../config/index';

export default {
  auth: {
    login: (email, password) => Request.post(`${API_URL}/login`, { email, password })
  },
  employee: {
    add: (employee) => Request.post(`${API_URL}/employee`, employee),
    getAll: () => Request.get(`${API_URL}/employee/all`),
    edit: (employee) => Request.put(`${API_URL}/employee`, employee)
  },
  ownership: {
    add: (ownership) => Request.post(`${API_URL}/ownership`, ownership),
    edit: (ownership) => Request.put(`${API_URL}/ownership`, ownership),
    getAll: () => Request.get(`${API_URL}/ownership/all`),
    getLatest: () => Request.get(`${API_URL}/ownership/latest`),
    getByOwner: (id) => Request.get(`${API_URL}/ownership/owner/${id}`),
    getByVehicleOrTrackerId: (vehicleId, trackerId) => Request.get(`${API_URL}/ownership/vehicle/${vehicleId}/${trackerId}`),
    getByTrackerId: (trackerId) => Request.get(`${API_URL}/ownership/tracker/${trackerId}`),
    remove: (id) => Request.put(`${API_URL}/ownership/${id}`)
  },
  owner: {
    getAll: () => Request.get(`${API_URL}/owners`),
    getByCitizenServiceNumber: (bsn) => Request.get(`${API_URL}/owner/bsn/${bsn}`),
    searchByName: (name) => Request.get(`${API_URL}/owner/search/${name}`)
  },
  invoices: {
    getAll: () => Request.get(`${API_URL}/invoices`)
  },
  vehicle: {
    getByLicensePlate: (licensePlate) => Request.get(`${API_URL}/vehicle/${licensePlate}`),
  },
  region: {
    addRegion: (region) => Request.post(`${API_URL}/region`, region),
    editRegion: (id, region) => Request.put(`${API_URL}/region/${id}`, region),
    getByName: (name) => Request.get(`${API_URL}/region/${name}`),
    getAll: () => Request.get(`${API_URL}/region/all`)
  },
  emissions: {
    addEmissions: (emissions) => Request.post(`${API_URL}/emissions`, emissions),
    getEmissions: () => Request.get(`${API_URL}/emissions/all`)
  },
  defaultRate: {
    add: (rate) => Request.post(`${API_URL}/rate`, { rate }),
    getRate: () => Request.get(`${API_URL}/rate/all`)
  }
};
