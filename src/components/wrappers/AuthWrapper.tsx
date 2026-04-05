import type { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../../store";

export const AuthWrapper = ({ children }: { children: ReactNode }) => {
  const isAuth = useSelector((state: RootState) => state.user.isAuth);
  console.log("Я регнулся?", isAuth);
  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
