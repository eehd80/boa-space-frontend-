import { ethers } from "ethers";
import { useEthers } from "@usedapp/core";
import { useCallback, useMemo, useState } from "react";
import { makeSignMessage, TOKEN_NAME } from "./authToken";
import { ACTIVE_STATE } from "../constants";
import { useGetNonceQuery } from "./query/nonceQuery";
import { useGetTokenQuery } from "./query/tokenQuery";
import { JsonRpcProvider } from "@ethersproject/providers/src.ts/json-rpc-provider";
import { AgoraMainnet, AgoraTestnet } from "../chains/AgoraChain";
import useModals from "./useModal";
import { useAppDispatch } from "../app/hooks";
import { selectAuth, saveJWT } from "../features/auth/authSlice";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

const STAGE = process.env.REACT_APP_STAGE;
const availableChainId = STAGE === "PROD" ? AgoraMainnet.chainId : AgoraTestnet.chainId;

export function useActiveState() {
  const { account, chainId } = useEthers();
  const token = useSelector((state: RootState) => selectAuth(state, account));
  const [state, setState] = useState(ACTIVE_STATE.STATUS_OFFLINE_ACCOUNT);
  const [online, setOnline] = useState(false);

  return useMemo(() => {
    if (!chainId || chainId !== availableChainId) {
      setOnline(false);
      setState(ACTIVE_STATE.STATUS_OFFLINE_CHAIN);
      return { activeState: state, online };
    }
    if (!account) {
      setOnline(false);
      setState(ACTIVE_STATE.STATUS_OFFLINE_ACCOUNT);
      return { activeState: state, online };
    }
    if (!token) {
      setOnline(false);
      setState(ACTIVE_STATE.STATUS_OFFLINE_TOKEN);
      return { activeState: state, online };
    }
    if (!!account && !!chainId && !!token) {
      setOnline(true);
      setState(ACTIVE_STATE.STATUS_ONLINE);
    }
    return { activeState: state, online };
  }, [account, chainId, token, state, online]);
}
//
// export function useLogout() {
//   const client = useApolloClient();
//   const token = useAppSelector(selectAuth);
//   const dispatch = useAppDispatch();
//   const logout = useCallback(async () => {
//     client.resetStore();
//     removeAuthToken();
//   }, [client, removeAuthToken]);
//   return logout;
// }

export function useLogin() {
  const { account, chainId, library, switchNetwork, activateBrowserWallet } = useEthers();
  const { activeState } = useActiveState();
  const nonceData = useGetNonceQuery(account) || null;
  const { loadToken } = useGetTokenQuery();
  const { acceptSignConfirm } = useModals();
  const dispatch = useAppDispatch();

  /*
   * 1.STATUS_OFFLINE_CHAIN : switch netwrok
   * 2.STATUS_OFFLINE_ACCOUNT : connect metamask
   * 3.STATUS_OFFLINE_TOKEN : get jwt
   * */
  const login = useCallback(async () => {
    const wrapLoadToken = function (message: string, signature: string) {
      if (signature) {
        loadToken({
          variables: { address: account, message, signature },
          onCompleted(data: any) {
            console.debug("getJwt data:", data);
            if (!data.getJwt) return;
            dispatch(saveJWT({ token: data.getJwt.jwt, address: account }));
            localStorage.setItem(TOKEN_NAME, data.getJwt.jwt);
          },
          onError(err: any) {
            console.debug("getToken > error:", err);
          },
        });
      }
    };

    console.debug("login usecallback > activeState:", activeState);
    if (activeState === ACTIVE_STATE.STATUS_OFFLINE_TOKEN) {
      console.debug("nonceData :", nonceData);
      if (nonceData) {
        const nonce = nonceData?.getNonce.nonce;
        if (await acceptSignConfirm("Are you sure?")) {
          const message = makeSignMessage(account, chainId?.toString() || "", nonce || "");
          (library as JsonRpcProvider)
            .getSigner(account)
            .signMessage(message)
            .then((signature: any) => {
              // setSignature(signature);
              const recover = ethers.utils.verifyMessage(message, signature);
              if (recover !== account) {
                console.debug("Recover failed!");
                return;
              }
              wrapLoadToken(message, signature);
            })
            .catch((error: any) => {
              console.debug("Failure!" + (error && error.message ? `\n\n${error.message}` : ""));
            });
        }
      }
    } else if (activeState === ACTIVE_STATE.STATUS_OFFLINE_CHAIN) {
      console.debug("switch network > availableChainId:", availableChainId);
      console.debug("swtich chainId 3:", chainId);
      console.debug("swtich account 3:", account);
      if (!chainId) {
        if (!account) {
          activateBrowserWallet();
        } else switchNetwork(availableChainId);
      } else switchNetwork(availableChainId);
    } else if (activeState === ACTIVE_STATE.STATUS_OFFLINE_ACCOUNT) {
      activateBrowserWallet();
    }
  }, [
    activeState,
    nonceData,
    account,
    chainId,
    library,
    dispatch,
    loadToken,
    activateBrowserWallet,
    switchNetwork,
    acceptSignConfirm,
  ]);

  return login;
}
