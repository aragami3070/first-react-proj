import type { RootState } from "../../store";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect, useRef, type ReactNode } from "react";
import { refreshAuth } from "../../store/user";

export const AuthWrapper = ({ children }: { children: ReactNode }) => {
  const { isAuthInitialized } = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  const didInit = useRef(false);
  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;
    const tryInitRefresh = async () => {
      if (!isAuthInitialized) {
        await dispatch(refreshAuth());
      }
    }
    tryInitRefresh()
  }, []);

  return children;
};
