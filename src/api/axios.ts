import axios from "axios";
import type { AxiosError, AxiosInstance } from "axios";
import { setError } from "../store/settings";
import { getErrorMessage } from "../utils/errorTemplateMessage";
import { logoutLocal } from "../store/user";
import type { ApiError, AppStore, RetryAxiosRequestConfig } from "./type";

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setupInterceptors = (store: AppStore) => {
  api.interceptors.request.use((config) => {
    const token = store.getState().user.accessToken;

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
        const refreshToken = sessionStorage.getItem("refreshToken");

        try {
          const res = await api.post("Auth/RefreshAllTokens", { refreshToken });

          store.dispatch({
            type: "user/refresh",
            payload: res.data.accessToken,
          });

          sessionStorage.setItem("refreshToken", res.data.refreshToken);

          // повторяем запрос с новым accessToken
          originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;
          return api(originalRequest);
        } catch (e) {
          store.dispatch(logoutLocal())
          store.dispatch(setError("Сессия истекла. Зайдите заново"));
        }
      }
      const message = error.response?.data.message
        ?? getErrorMessage(error.response?.status ?? -1);

      if (error.response?.status !== 401) {
        store.dispatch(setError(message));
      }

      return Promise.reject(error);
    }
  );
};

export default api;
