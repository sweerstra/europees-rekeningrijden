import Request from './Request';
import { API_URL, GOVERNMENT_API_URL } from '../config';

const ROUTE_URL = 'https://i321720.iris.fhict.nl/traxit/routes/data.php?id=';

export default {
  auth: {
    login: (username, password) => {
      const headers = { Authorization: `Basic ${btoa(`${username}:${password}`)}` };
      return Request.request(`${API_URL}/login`, { method: 'post', headers });
    },
    register: (driver) => Request.post(`${API_URL}/driver`, driver)
  },
  user: {
    verifyUserDetails: (details) => Request.post(`${API_URL}/driver/verify`, details),
    getUserDetails: (id) => Request.get(`${GOVERNMENT_API_URL}/owner/${id}`)
  },
  invoice: {
    getInvoices: () => Request.get(`${GOVERNMENT_API_URL}/invoices`),
    downloadInvoice: (id) => Request.get(`${GOVERNMENT_API_URL}/invoice/generate/${id}`),
    getDownloadUrl: (id) => `${GOVERNMENT_API_URL}/invoice/generate/${id}`,
    getPaypalUrl: (invoiceId, price) => Request.post(`${API_URL}/payment?returnUri=${API_URL}/payment/complete&cancelUri=${window.location.origin}/payment-failed`, {
      invoiceId,
      price
    })
  },
  route: {
    getRoute: (id) => Request.get(ROUTE_URL + id)
  },
  vehicle: {
    getCurrentTrackersWithVehicleByOwner: (id) => Request.get(`${GOVERNMENT_API_URL}/vehicles/owner/${id}`)
  },
  owner: {
    getByEmail: (email) => Request.get(`${GOVERNMENT_API_URL}/owner/email/${email}`)
  },
  ownership: {
    update: (ownership) => Request.put(`${GOVERNMENT_API_URL}/ownership`, ownership)
  },
  signOver: {
    createRequest: (details) => Request.post(`${API_URL}/sign-over/request`, details),
    confirmRequest: (verification) => Request.post(`${API_URL}/sign-over/confirm`, verification)
  }
};
