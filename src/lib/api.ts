import axios from 'axios';
import { store } from '../app/store';

// It's good practice to have the base URL in an environment variable
// For now, we'll hardcode it for simplicity.
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
});

/**
 * Axios request interceptor.
 * This function attaches the authentication token to the headers of each
 * outgoing request if a token is available in the Redux store.
 */
api.interceptors.request.use(
  (config) => {
    const { accessToken } = store.getState().auth;

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
