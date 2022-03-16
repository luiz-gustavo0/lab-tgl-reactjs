import axios, { AxiosError } from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('@tgl:token');

    if (token) {
      config.headers!.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  async (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      return Promise.reject(error.response);
    }

    return Promise.reject(error);
  }
);
