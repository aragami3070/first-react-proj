import axios from "axios";
import type { AxiosError, AxiosInstance } from "axios";
import { getErrorMessage } from "../utils/errorTemplateMessage";
import type { ApiError, RetryAxiosRequestConfig } from "./type";
import { dropError, unauthorized } from "../utils/dropError";
import { refreshTokens } from "../utils/refreshLogic";

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError<ApiError>) => {
    const originalRequest = error.config as RetryAxiosRequestConfig;

    // NOTE: попытка обновить accessToken и сделать запрос снова
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshTokens();
        // повторяем запрос с новым accessToken
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (e: any) {
        unauthorized()
      }
    }

    const message = error.response?.data.message
      ?? getErrorMessage(error.response?.status ?? -1);

    if (error.response?.status !== 401) {
      dropError(message)
    }

    return Promise.reject(error);
  }
);

export default api;
