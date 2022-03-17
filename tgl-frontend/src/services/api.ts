import axios, { AxiosError } from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const tokenData = JSON.parse(localStorage.getItem('tgl:token') as '{}');

    if (!tokenData) {
      return config;
    }

    if (config.headers) {
      config.headers!.Authorization = `Bearer ${tokenData.token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
