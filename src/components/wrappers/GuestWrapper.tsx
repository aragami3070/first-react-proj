import type { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../../store";

export const GuestWrapper = ({ children }: { children: ReactNode }) => {
  const isAuth = useSelector((state: RootState) => state.user.isAuth);

  if (isAuth) {
    return <Navigate to="/profile" replace />;
  }

  return children;
};
