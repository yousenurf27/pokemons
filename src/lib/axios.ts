import axios, { AxiosInstance } from 'axios';
import { BASE_API_URL } from '../utils/config';

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_API_URL,
});
