import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";
import { setError, startLoading, stopLoading } from "../settings/slice";
import type { AxiosError } from "axios";
import type { ApiError } from "../../api/type";
import { getErrorMessage } from "../../utils/errorTemplateMessage";

export const logout = createAsyncThunk("user/logout", async (_, { }) => {
  return;
});

export const login = createAsyncThunk(
  "user/login",
  async (data: { email: string; password: string }, { rejectWithValue, dispatch }) => {
    try {
      dispatch(startLoading())
      const tokens = await api.post<{ accessToken: string, refreshToken: string }>(
        "Auth/Login", data
      );

      sessionStorage.setItem("refreshToken", tokens.data.refreshToken);
      sessionStorage.setItem("accessToken", tokens.data.accessToken);

      await dispatch(getMe()).unwrap();
      return;
    } catch (e: any) {
      const error = e as AxiosError<ApiError>;
      dispatch(setError(getErrorMessage(error)));
      return rejectWithValue(error.response?.data.message)
    }
    finally {
      dispatch(stopLoading())
    }
  }
)

export const register = createAsyncThunk(
  "user/register",
  async (data: {
    firstName: string;
    secondName: string;
    email: string;
    password: string
  }, { rejectWithValue, dispatch }) => {
    try {
      dispatch(startLoading())
      const tokens = await api.post<{ accessToken: string, refreshToken: string }>(
        "Auth/Registration", data
      );

      sessionStorage.setItem("refreshToken", tokens.data.refreshToken);
      sessionStorage.setItem("accessToken", tokens.data.accessToken);

      await dispatch(getMe()).unwrap();
      return;
    } catch (e: any) {
      const error = e as AxiosError<ApiError>;
      dispatch(setError(getErrorMessage(error)));
      return rejectWithValue(error.response?.data.message)
    }
    finally {
      dispatch(stopLoading())
    }
  }
)

export const getMe = createAsyncThunk(
  "user/getMe",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      dispatch(startLoading())
      const user = await api.get("User/myprofile");

      return {
        user: user.data,
      }
    } catch (e: any) {
      const error = e as AxiosError<ApiError>;
      dispatch(setError("Сессия истекла. Зайдите заново"));
      return rejectWithValue(error.response?.data.message)
    }
    finally {
      dispatch(stopLoading())
    }
  }
)

export const refresh = createAsyncThunk(
  "user/refresh",
  async (_, { dispatch, rejectWithValue }) => {
    dispatch(startLoading())
    const oldRefreshToken = sessionStorage.getItem("refreshToken");

    try {
      const res = await api.post<{ accessToken: string, refreshToken: string }>(
        "Auth/RefreshAllTokens",
        null,
        { params: { oldRefreshToken } }
      );

      sessionStorage.setItem("accessToken", res.data.accessToken);
      sessionStorage.setItem("refreshToken", res.data.refreshToken);

    } catch (e: any) {
      const error = e as AxiosError<ApiError>;
      dispatch(logout());
      return rejectWithValue(error.response?.data.message)
    }
    finally {
      dispatch(stopLoading())
    }
  }
);

export const refreshAuth = createAsyncThunk(
  "user/refreshAuth",
  async (_, { dispatch }) => {
    dispatch(startLoading())
    try {
      await dispatch(refresh()).unwrap();
      await dispatch(getMe());
    } catch {
      dispatch(logout());
    }
    finally {
      dispatch(stopLoading())
    }
  }
);

