import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/slice"
import settingsReducer from "./settings/slice"

// TODO: добавить appReducer
// TODO: добавить quotesReducer
export const store = configureStore({
  reducer: {
    user: userReducer,
    settings: settingsReducer,
    // quotes: quotesReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
