import Request from './request';
import { API_URL } from '../config/index';

export default {
    auth: {
        login: (email, password) => Request.post(`${API_URL}/login`, { email, password })
    },
    stolenCar: {
        add: (stolencar) => Request.post(`${API_URL}/stolencar`, stolencar),
        getAll: () => Request.get(`${API_URL}/stolencar/all`)
    }
};
