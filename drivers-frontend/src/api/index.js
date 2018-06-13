import Request from './Request';
import { API_URL, GOVERNMENT_API_URL } from '../config';

const ROUTE_URL = 'https://i321720.iris.fhict.nl/traxit/routes/data.php?id=';

export default {
  auth: {
    // login: (username, password) => Request.post(`${API_URL}/login`, { username, password })
    /* login: (username, password) => new Promise((resolve, reject) => {
      if (Math.random() > 0.5) {
        resolve();
      } else {
        reject();
      }
    }) */
    login: (username, password) => {
      const headers = { Authorization: `Basic ${btoa(`${username}:${password}`)}` };
      return Request.request(`${API_URL}/login`, { method: 'post', headers });
    }
  },
  user: {
    verifyUserDetails: (details) => Request.post(`${API_URL}/driver`, details),
    getUserDetails: (id) =>  Request.get(`${GOVERNMENT_API_URL}/owner/${id}`)
    /* verifyUserDetails: (details) => new Promise((resolve, reject) => {
      if (Math.random() > 0.5) {
        resolve();
      } else {
        reject();
      }
    }) */
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
  signOver: {
    createRequest: (details) => Request.post(`${API_URL}/sign-over/request`, details),
    // createCode: (licensePlate, sender, receiver, password) => Request,
    confirmRequest: (verification) => Request.post(`${API_URL}/sign-over/confirm`, verification),
    getDetailsForCode: code => {
      return new Promise((resolve, reject) => resolve({
        licensePlate: 'LG-976-TR',
        sender: {
          firstName: 'Dennis',
          lastName: 'van Gils'
        },
        receiver: {}
      }));
    }
  }
};
