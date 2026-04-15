import { store } from "../store";
import { setError } from "../store/settings";
import { logoutLocal } from "../store/user";

export function unauthorized() {
  store.dispatch(logoutLocal());
  store.dispatch(setError("Сессия истекла. Зайдите заново"));
}

export function dropError(message: string) {
  store.dispatch(setError(message));
}
