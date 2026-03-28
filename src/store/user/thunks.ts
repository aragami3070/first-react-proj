import { createAsyncThunk } from "@reduxjs/toolkit";
import { mapUser } from "../../entities/user/types";
import api from "../../api/axios";

export const login = createAsyncThunk(
  "user/login",
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const tokens = await api.post("Auth/Login", data)

      return {
        user: null,
        accessToken: tokens.data.accessToken,
        refreshToken: tokens.data.refreshToken
      }
    } catch (e: any) {
      return rejectWithValue(e.response?.data?.message || "Login error")
    }
  }
)
