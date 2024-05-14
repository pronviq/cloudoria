import axios, { AxiosInstance, AxiosResponse } from "axios";

export const API_URL = "http://localhost:711/api";

const $api: AxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

$api.interceptors.request.use((config) => {
  console.log("\x1b[32m--- Подцепил токен, идем дальше...\x1b[0m");

  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

$api.interceptors.response.use(
  (config: AxiosResponse) => {
    return config;
  },
  async (error: any) => {
    console.log("\x1b[33m401. Ошибочка. Обновляю токен...\x1b[0m");

    const originalRequest = error.config;

    if (error.response.status === 401 && error.config && !error.config._isRetry) {
      try {
        originalRequest._isRetry = true;
        const response = await axios.get(API_URL + "/refresh", { withCredentials: true });
        localStorage.setItem("token", response.data.accessToken);
        return $api.request(originalRequest);
      } catch (error) {
        throw new Error("401 Non-authorized");
      }
    }

    throw error;
  }
);

export default $api;
