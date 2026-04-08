import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import type { RootState } from "../../store";
import { useAppSelector } from "../../store/hooks";

export const AuthWrapper = ({ children }: { children: ReactNode }) => {
  const isAuth = useAppSelector((state: RootState) => state.user.isAuth);
  const isAuthInitialized = useAppSelector((state: RootState) => state.user.isAuthInitialized)

  if (!isAuthInitialized) return null;

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
