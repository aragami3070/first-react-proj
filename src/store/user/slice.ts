import { createSlice } from "@reduxjs/toolkit"
import type { UserState } from "./types"
import { login, register } from "./thunks"

const initialState: UserState = {
  user: null,
  accessToken: null,
  isAuth: false,
  isUserLoading: false
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutLocal: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuth = false;
      state.isUserLoading = false;
      sessionStorage.removeItem("refreshToken");
    }
  },
  extraReducers: (builder) => {
    // LOGIN
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = null;
      state.accessToken = action.payload.accessToken;
      state.isAuth = true;
      state.isUserLoading = false;
    })

    builder.addCase(login.rejected, (state) => {
      state.isAuth = false;
      state.isUserLoading = false;
    })

    builder.addCase(register.fulfilled, (state, action) => {
      state.user = null;
      state.accessToken = action.payload.accessToken;
      state.isAuth = true;
      state.isUserLoading = false;
    })

    builder.addCase(register.rejected, (state) => {
      state.isAuth = false;
      state.isUserLoading = false;
    })


  }
})

export const { logoutLocal } = userSlice.actions;
export default userSlice.reducer;
