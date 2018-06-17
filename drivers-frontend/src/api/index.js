import Request from './Request';
import { API_URL, GOVERNMENT_API_URL } from '../config';

const MOVEMENTS_URL = 'http://192.168.24.36:9080/movement/api/movement/';

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
    getInvoicesByOwner: (ownerId) => Request.get(`${GOVERNMENT_API_URL}/invoices/${ownerId}`),
    downloadInvoice: (id) => Request.get(`${GOVERNMENT_API_URL}/invoice/generate/${id}`),
    getDownloadUrl: (id) => `${GOVERNMENT_API_URL}/invoice/pdf/${id}`,
    getPaypalUrl: (invoiceId, price) => Request.post(`${API_URL}/payment?returnUri=${API_URL}/payment/complete&cancelUri=${window.location.origin}/payment-failed`, {
      invoiceId,
      price
    })
  },
  route: {
    getMovementsFromTracker: (trackerId) => Request.get(MOVEMENTS_URL + trackerId)
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
