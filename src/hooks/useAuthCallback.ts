import { useMemo } from "react";
import { useActiveState } from "./useActiveState";
import { useLocation, useNavigate } from "react-router-dom";
import { useEthers } from "@usedapp/core";
import { getAuth, removeJWT } from "../features/auth/authSlice";
import { addDays } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";

export default function useAuthCallback() {
  const { online } = useActiveState();
  const navigate = useNavigate();
  const location = useLocation();
  const { account } = useEthers();
  const auth = useSelector((state: RootState) => getAuth(state, account));
  const dispatch = useDispatch();
  return useMemo(() => {
    return {
      loginCheck: (callback: () => void) => {
        if (auth?.createdAt && online) {
          const added = addDays(auth.createdAt, 29).getTime();
          if (added < Date.now()) {
            dispatch(removeJWT(account));
            navigate("/connect", { state: { before: location.pathname } });
          } else {
            callback();
          }
        } else {
          navigate("/connect", { state: { before: location.pathname } });
        }
      },
    };
  }, [account, auth, dispatch, location, navigate, online]);
}
