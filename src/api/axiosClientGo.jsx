import axios from 'axios';
import queryString from 'query-string';
import {  URL_SERVER_GO } from '../utils/urlPath';

const axiosClientGo = axios.create({
  baseURL: URL_SERVER_GO,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin':'*'
  },
  paramsSerializer: (params) => queryString.stringify(params),
  // withCredentials: true, 
});

axiosClientGo.interceptors.request.use(async (config) => {
  return config;
});

axiosClientGo.interceptors.response.use(
  (response) => {
    if (response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    switch (error.response.status) {
      case 500:
        console.log('Server error');
        break;
      default:
        console.log('Something went wrong');
        console.log('--------------------');
        console.log(`URL: ${error.response.config.url}`);
        console.log(`HTTP Code: ${error.response.status}`);
        console.log(`HTTP Message: ${error.response.statusText}`);
        console.log('-------------------- ');
        return error.response;
    }

    return Promise.reject(error);
  }
);

export default axiosClientGo;
