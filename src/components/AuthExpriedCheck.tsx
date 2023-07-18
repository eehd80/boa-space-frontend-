import React, { ReactNode, useEffect } from "react";
import { useActiveState } from "../hooks/useActiveState";
import { useEthers } from "@usedapp/core";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { getAuth, removeJWT } from "../features/auth/authSlice";
import { addDays } from "date-fns";
import { useLocation } from "react-router-dom";

export const AuthExpiredCheckProvider = ({ children }: { children: ReactNode }) => {
  const { online } = useActiveState();
  const { account } = useEthers();
  const auth = useSelector((state: RootState) => getAuth(state, account));
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (online && auth?.createdAt) {
      const added = addDays(auth.createdAt, 29).getTime();
      if (added < Date.now()) {
        dispatch(removeJWT(account));
      }
    }
  }, [account, auth, dispatch, location, online]);

  return <React.Fragment>{children}</React.Fragment>;
};
