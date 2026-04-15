import { createSlice} from "@reduxjs/toolkit"
import type { UserState } from "./types"
import { getMe, login, register } from "./thunks"

const initialState: UserState = {
  user: null,
  isAuth: false,
  isUserLoaded: false,
  isAuthInitialized: false
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutLocal: (state) => {
      state.user = null;
      state.isAuth = false;
      state.isUserLoaded = false;
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("refreshToken");
    },
  },
  extraReducers: (builder) => {
    // Login
    builder.addCase(login.fulfilled, (state) => {
      state.user = null;
      state.isAuth = true;
      state.isAuthInitialized = true;
      state.isUserLoaded = false;
    })

    builder.addCase(login.rejected, (state) => {
      state.isAuth = false;
      state.isUserLoaded = false;
      state.isAuthInitialized = false;
    })

    // Registeration
    builder.addCase(register.fulfilled, (state) => {
      state.user = null;
      state.isAuth = true;
      state.isAuthInitialized = true;
      state.isUserLoaded = false;
    })

    builder.addCase(register.rejected, (state) => {
      state.isAuth = false;
      state.isUserLoaded = false;
    })

    // Profile
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isUserLoaded = true;
      state.isAuth = true
      state.isAuthInitialized = true;
    })

    builder.addCase(getMe.rejected, (state) => {
      state.user = null;
      state.isUserLoaded = false;
      state.isAuth = false;
    })
  }
})

export const { logoutLocal } = userSlice.actions;
export default userSlice.reducer;
