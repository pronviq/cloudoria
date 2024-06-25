import axios, { AxiosInstance, AxiosResponse } from "axios";
import store from "../redux/store";
import { initialState, setUser } from "../redux/userSlice";

// export const API_URL = "http://45.12.75.100:711/api";
export const API_URL = "https://cloudoria.ru:711/api";
// export const API_URL = "http://192.168.0.12:711/api";
// export const API_URL = "http://192.168.43.179:711/api";

const $api: AxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

$api.interceptors.request.use((config) => {
  // console.log(`\x1b[32m--- Token has intercepted on url: ${config.baseURL} ---\x1b[0m`);

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
    const originalRequest = error.config;

    if (error.response?.status === 401 && error.config && !error.config._isRetry) {
      // console.log("\x1b[33m401. Обновляю токен...\x1b[0m");
      try {
        originalRequest._isRetry = true;
        const response = await axios.get(API_URL + "/refresh", { withCredentials: true });

        localStorage.setItem("token", response.data.access);

        return $api.request(originalRequest);
      } catch (error) {
        store.dispatch(setUser(initialState));
      }
    }

    // console.log(error.config._isRetry, error.response.status);

    if (error.config._isRetry && error.response.status === 401) {
      store.dispatch(setUser(initialState));
    }

    throw error;
  }
);

export default $api;
