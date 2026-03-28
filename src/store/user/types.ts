import type { User } from "../../entities/user/types"

export type UserState = {
  user: User | null,
  accessToken: string | null,
  refreshToken: string | null,
  isAuth: boolean,
  isUserLoading: boolean,
}
