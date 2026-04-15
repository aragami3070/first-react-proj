import { store } from "../store";
import { refresh } from "../store/user";

export async function refreshTokens() {
  await store.dispatch(refresh())
  return sessionStorage.getItem("accessToken");
}
