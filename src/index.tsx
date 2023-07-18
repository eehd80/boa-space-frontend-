import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { persistor, store } from "./app/store";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import { Config, DAppProvider } from "@usedapp/core";
import { AgoraMainnet, AgoraTestnet } from "./chains/AgoraChain";

const STAGE = process.env.REACT_APP_STAGE;
console.debug("STAGE :", STAGE);

const availableChainId = STAGE === "PROD" ? AgoraMainnet.chainId : AgoraTestnet.chainId;

export const chainConfig: Config = {
  readOnlyChainId: availableChainId,
  readOnlyUrls: {
    [AgoraMainnet.chainId]: AgoraMainnet.rpcUrl || "",
    [AgoraTestnet.chainId]: AgoraTestnet.rpcUrl || "",
  },
  networks: [AgoraMainnet, AgoraTestnet],
  autoConnect: true,
};

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <DAppProvider config={chainConfig}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </DAppProvider>
);
