import axios from "axios";
import { DEFAULT_TIME_OUT } from "../../utils/constants";

const baseUrl = process.env.REACT_APP_API_URL;
const options = {
  baseURL: baseUrl,
  timeout: DEFAULT_TIME_OUT,
};

export const axiosClient = axios.create(options);

// Add a request interceptor
axiosClient.interceptors.request.use(
  async (config) => {
    const headers = config.headers;
    config.headers = {
      ...headers,
    };

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);