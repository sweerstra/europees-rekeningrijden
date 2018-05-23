import Request from './Request';
import { API_URL, GOVERNMENT_API_URL } from '../config';

const ROUTE_URL = 'https://i321720.iris.fhict.nl/traxit/routes/data.php?id=';

export default {
  auth: {
    login: (username, password) => {
      const headers = { Authorization: `Basic ${btoa(`${username}:${password}`)}` };
      return Request.request(`${API_URL}/login`, { method: 'post', headers });
    }
  },
  user: {
    // verifyUserDetails: (details) => Request.post(`${API_URL}/user/verify`, { details })
    verifyUserDetails: (details) => new Promise((resolve, reject) => resolve(Math.random() > 0.5))
  },
  invoice: {
    getInvoices: () => Request.get(`${GOVERNMENT_API_URL}/invoices`),
    downloadInvoice: (id) => Request.get(`${GOVERNMENT_API_URL}/invoice/generate/${id}`),
    getDownloadUrl: (id) => `${GOVERNMENT_API_URL}/invoice/generate/${id}`
  },
  route: {
    getRoute: (id) => Request.get(ROUTE_URL + id)
  },
  vehicle: {
    getCurrentTrackersWithVehicleByOwner: (id) => Request.get(`${GOVERNMENT_API_URL}/vehicles/owner/${id}`)
  }
};
