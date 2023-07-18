import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Seaport } from "boa-space-seaport-js";
import { useEthers } from "@usedapp/core";
import { JsonRpcProvider } from "@ethersproject/providers/src.ts/json-rpc-provider";

export const SEAPORT_ADDRESS = process.env.REACT_APP_SEAPORT_ADDRESS;
export const LAZY_MINT_ADAPTER = process.env.REACT_APP_LAZY_MINT_ADAPTER_ADDRESS;
export const ASSET_CONTRACT = process.env.REACT_APP_ASSET_CONTRACT_SHARED_ADDRESS;
export const WBOA9 = process.env.REACT_APP_WBOA9_ADDRESS;
export const PAYABLE_PROXY = process.env.REACT_APP_PAYABLE_PROXY_ADDRESS;
export const TOKEN_ID = process.env.REACT_APP_TOKEN_ID;

export interface SeaportContextProviderProps {
  children?: ReactNode;
}

interface SeaportContextValue {
  seaport: Seaport | undefined;
}
const defaultContext: SeaportContextValue = {
  seaport: undefined,
};
const SeaportContext = createContext<SeaportContextValue>(defaultContext);
export function SeaportContextProvider({ children }: SeaportContextProviderProps) {
  const [seaport, setSeaport] = useState<Seaport>();
  const { library } = useEthers();

  const active = useCallback(() => {
    if (library) {
      const seaport = new Seaport(library as JsonRpcProvider, {
        overrides: {
          contractAddress: SEAPORT_ADDRESS, // 테스트넷에 배포된 Seaport 컨트랙트 주소
          lazymintAdapterAddress: LAZY_MINT_ADAPTER, // 테스트넷에 배포된 SharedStorefrontLazyMintAdapter 컨트랙트 주소
          assetTokenAddress: ASSET_CONTRACT, // 테스트넷에 배포된 AssetContractShared 컨트랙트 주소
          wboaTokenAddress: WBOA9, // 테스트넷에 배포된 WBOA9 컨트랙트 주소
        },
      });
      setSeaport(seaport);
    }
  }, [setSeaport, library]);

  useEffect(() => {
    void active();
  }, [active]);

  return (
    <SeaportContext.Provider
      value={{
        seaport,
      }}
    >
      {children}
    </SeaportContext.Provider>
  );
}

export const useSeaport = () => useContext(SeaportContext);

export enum ORDER_REASON {
  ALREADY = "The order you are trying to fulfill is already filled",
  CANCELLED = "The order you are trying to fulfill is cancelled",
  REJECTED = "user rejected transaction",
  UNKNOWN = "The order you are trying to process cannot be processed due to an unknown error.",
}
export const isAlready = (reason: string): boolean => {
  return reason.toString().includes(ORDER_REASON.ALREADY);
};
export const isCancelled = (reason: string): boolean => {
  return reason.toString().includes(ORDER_REASON.CANCELLED);
};
export const isRejected = (reason: string): boolean => {
  return reason.toString().includes(ORDER_REASON.REJECTED);
};
