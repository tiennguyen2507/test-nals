import axios from 'axios';
import { getToken } from '@/utils/tokenStorage';

const URL = 'https://api-placeholder.herokuapp.com';

const instance = axios.create({
  baseURL: URL,
  timeout: 6000,
});

instance.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token) {
      config.headers = {
        ...config.headers,
        accessToken: token,
      };
    }

    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);

instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (err) => {
    return Promise.reject(err);
  },
);

export default instance;
