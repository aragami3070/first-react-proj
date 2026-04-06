import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";
import { startLoading, stopLoading } from "../settings";
import type { AxiosError } from "axios";
import type { ApiError } from "../../api/type";

export const login = createAsyncThunk(
  "user/login",
  async (data: { email: string; password: string }, { rejectWithValue, dispatch }) => {
    try {
      dispatch(startLoading())
      const tokens = await api.post("Auth/Login", data);

      sessionStorage.setItem("refreshToken", tokens.data.refreshToken);

      return {
        user: null,
        accessToken: tokens.data.accessToken,
      }
    } catch (e: any) {
      const error = e as AxiosError<ApiError>;
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
  }, { rejectWithValue }) => {
    try {
      const tokens = await api.post("Auth/Registration", data);

      sessionStorage.setItem("refreshToken", tokens.data.refreshToken);

      return {
        user: null,
        accessToken: tokens.data.accessToken,
      }
    } catch (e: any) {
      const error = e as AxiosError<ApiError>;
      return rejectWithValue(error.response?.data.message)
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
      return rejectWithValue(error.response?.data.message)
    }
    finally {
      dispatch(stopLoading())
    }
  }
)
