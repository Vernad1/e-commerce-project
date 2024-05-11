import axios, { InternalAxiosRequestConfig } from "axios";

const $host = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const $authHost = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const authInterceptor = (config: InternalAxiosRequestConfig) => {
  if (!config?.headers) {
    throw new Error(
      `Expected 'config' and 'config.headers' not to be undefined`
    );
  }
  const token = localStorage.getItem("token");

  if (token && token !== null) {
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
};

$authHost.interceptors.request.use(authInterceptor);

export { $host, $authHost };
