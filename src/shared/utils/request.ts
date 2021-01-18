import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import { environment } from '../../environment';

const client = axios.create({
  baseURL: environment.apiUrl,
});

const addAuthHeader = (options: AxiosRequestConfig): AxiosRequestConfig => ({
  ...options,
  headers: { ...options.headers, ClubyApiKey: environment.apiKey },
});

type Ajax = <T>(options: AxiosRequestConfig) => Promise<T>;
const ajax: Ajax = async (options, withAuth = true) => {
  const onSuccess = (response: AxiosResponse) => response.data;

  const onError = (error: AxiosError) => {
    // eslint-disable-next-line no-console
    console.error('Request Failed:', error.config);

    return Promise.reject(error.response || error.message);
  };

  try {
    const response = await client(withAuth ? addAuthHeader(options) : options);

    return onSuccess(response);
  } catch (error) {
    return onError(error);
  }
};

type Request = <T>(url: string, options?: AxiosRequestConfig) => Promise<T>;

const get: Request = (url, options = {}) => {
  return ajax({ method: 'GET', url, ...options });
};

const post: Request = (url, options = {}) => {
  return ajax({ method: 'POST', url, ...options });
};

const put: Request = (url, options = {}) => {
  return ajax({ method: 'PUT', url, ...options });
};

const patch: Request = (url, options = {}) => {
  return ajax({ method: 'PATCH', url, ...options });
};

const remove: Request = (url, options = {}) => {
  return ajax({ method: 'DELETE', url, ...options });
};

export default {
  get,
  post,
  put,
  patch,
  remove,
};
