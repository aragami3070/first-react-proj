import { createAsyncThunk } from "@reduxjs/toolkit";
import { mapUser } from "../../entities/user/types";
import api from "../../api/axios";

export const login = createAsyncThunk(
  "user/login",
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const tokens = await api.post("Auth/Login", data);

      sessionStorage.setItem("refreshToken", tokens.data.refreshToken);

      return {
        user: null,
        accessToken: tokens.data.accessToken,
      }
    } catch (e: any) {
      return rejectWithValue(e.response?.data?.message || "Login error")
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
      console.log(data)
      const tokens = await api.post("Auth/Registration", data);

      sessionStorage.setItem("refreshToken", tokens.data.refreshToken);

      return {
        user: null,
        accessToken: tokens.data.accessToken,
      }
    } catch (e: any) {
      return rejectWithValue(e.response?.data?.message || "Registration error")
    }
  }
)
