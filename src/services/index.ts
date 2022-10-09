import axios from 'axios';

const URL = 'https://api-placeholder.herokuapp.com';

const instance = axios.create({
  baseURL: URL,
  timeout: 6000,
});

instance.interceptors.request.use(
  (config) => {
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
