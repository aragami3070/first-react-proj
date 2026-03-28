import { createSlice } from "@reduxjs/toolkit"
import type { UserState } from "./types"
import { login } from "./thunks"

const initialState: UserState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuth: false,
  isUserLoading: false
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutLocal: (state) => {
      state.user = null
      state.accessToken = null
      state.refreshToken = null
      state.isAuth = false
      state.isUserLoading = false
    }
  },
  extraReducers: (builder) => {
    // LOGIN
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = null
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
      state.isAuth = true
      state.isUserLoading = false
    })

    builder.addCase(login.rejected, (state) => {
      state.isAuth = false
      state.isUserLoading = false
    })
  }
})

export default userSlice.reducer;
