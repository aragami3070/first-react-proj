import { Navigate, Outlet } from "react-router-dom";
import type { RootState } from "../../store";
import { useAppSelector } from "../../store/hooks";

export const GuardWrapper = () => {
  const { isAuth } = useAppSelector((state: RootState) => state.user);

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
