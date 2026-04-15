import { Navigate, Outlet } from "react-router-dom";
import type { RootState } from "../../store";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect } from "react";
import { refreshAuth } from "../../store/user";

export const AuthWrapper = () => {
  const { isAuth, isAuthInitialized } = useAppSelector((state: RootState) => state.user);

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
