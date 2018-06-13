export const GOOGLE_MAPS_API_KEY = 'AIzaSyD7CDOHHmsCN9aelCcx2-viZERP0AVwCIc';

const isProduction = process && process.env.NODE_ENV === 'production';

export const API_URL = isProduction
    ? `${window.location.origin.slice(0, -2)}80/police/api`
    : 'http://localhost:60858/police/api';

export const GOVERNMENT_API_URL = 'http://192.168.24.36:11080/government/api';
export const MOV_API_URL = 'http://192.168.24.36:9080/movement/api';
