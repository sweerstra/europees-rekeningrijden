import Request from './request';
import { API_URL, GOVERNMENT_API_URL, MOV_API_URL } from '../config';

export default {
    auth: {
        login: (email, password) => Request.post(`${API_URL}/login`, { email, password })
    },
    stolenCar: {
        add: (stolencar) => Request.post(`${API_URL}/stolenvehicle`, stolencar),
        getAll: () => Request.get(`${API_URL}/stolenvehicle`)
    },
    vehicle: {
        getTrackerbyLicensePlate: (licensePlate) => Request.get(`${GOVERNMENT_API_URL}/vehicle/${licensePlate}/tracker`),
        add: (stolencar) => Request.post(`${API_URL}/stolencar`, stolencar),
        getAll: () => Request.get(`${API_URL}/stolencar/all`),
        getLatestMovement: (trackerId) => Request.get(`${MOV_API_URL}/movement/latest/${trackerId}`)
    },
    ownership: {
        getByTrackerId: (trackerId) => Request.get(`${GOVERNMENT_API_URL}/ownership/tracker/${trackerId}`)
    }
};
