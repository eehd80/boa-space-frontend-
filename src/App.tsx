import React, { Suspense, useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";

import { useAppApolloClient } from "./api/ApolloClient";
import { CookiesProvider } from "react-cookie";
import { useActiveState } from "./hooks/useActiveState";
import { ACTIVE_STATE } from "./constants";

import Home from "./pages/home";
import { theme } from "./theme";
import { CommonLayout } from "./components/Layout/CommonLayout";
import ConnectWallet from "./pages/connectWallet/ConnectWallet";
import { ModalProvider } from "./hooks/useModal";
import ImportNFT from "./pages/importNFT";
import CreateCollection from "./pages/collection/createCollection";
import CreateAsset from "./pages/asset/createAsset";
import AssetDetail from "./pages/asset/assetDetail";
import ListForSale from "./pages/asset/listForSale";
import SdkSample from "./pages/temp/sdkSample";
import PageNotFound from "./pages/notFound";
import MySettings from "./pages/My/Settings";
import MyCollections from "./pages/collection/myCollections";
import { AssetDetailLayout } from "./components/Layout/AssetDetailLayout";
import { SeaportContextProvider } from "./hooks/useSeaport";
import ListCollection from "./pages/collection/listCollection";
import ExploreCollection from "./pages/collection/exploreCollection";
import { useAppDispatch } from "./app/hooks";
import { fetchBOAPrice } from "./features/price/boaPriceSlice";
import Search from "./pages/search/Search";
import My from "./pages/My/My";
import Updater from "./app/Updater";

function App() {
  const client = useAppApolloClient();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getBoaTimer = setTimeout(() => {
      dispatch(fetchBOAPrice());
    }, 1000 * 60 * 5);
    return () => {
      clearTimeout(getBoaTimer);
    };
  }, [dispatch]);

  const PrivateWrapper = () => {
    const { pathname } = useLocation();
    const { activeState } = useActiveState();
    console.debug(" >>> activeState :", activeState);
    return activeState === ACTIVE_STATE.STATUS_ONLINE ? (
      <Outlet />
    ) : (
      <Navigate to="/connect" state={{ before: pathname }} />
    );
  };
  return (
    // lets us use Chakra UI syntax across our app:
    <ChakraProvider theme={theme}>
      <CookiesProvider>
        <SeaportContextProvider>
          <ApolloProvider client={client}>
            <Updater />
            <Suspense fallback={null}>
              <BrowserRouter>
                <ModalProvider>
                  <Routes>
                    <Route path="/" element={<CommonLayout />}>
                      <Route index element={<Home />} />
                      <Route path="home" element={<Home />} />
                      <Route path="explore">
                        <Route index element={<ExploreCollection />} />
                        <Route path=":category" element={<ExploreCollection />} />
                      </Route>
                      <Route path="collection">
                        <Route index element={<ListCollection />} />
                        <Route path=":name" element={<ListCollection />} />
                      </Route>
                      {/* Login 영역 */}
                      <Route element={<PrivateWrapper />}>
                        <Route path="my">
                          <Route index element={<Navigate to="/my/collected" />} />
                          <Route path=":tabName" element={<My />} />
                          <Route path="settings" element={<MySettings />} />
                        </Route>
                        <Route path="importNFT" element={<ImportNFT />} />
                        <Route path="assets">
                          <Route path="create" element={<CreateAsset />} />
                          <Route path=":contract/:tokenId/edit" element={<CreateAsset />} />
                          <Route path=":contract/:tokenId/sell" element={<ListForSale />} />
                        </Route>
                        <Route path="collections">
                          <Route index element={<MyCollections />} />
                          <Route path="create" element={<CreateCollection />} />
                          <Route path="edit/:collectionId" element={<CreateCollection />} />
                        </Route>
                      </Route>

                      <Route path="connect" element={<ConnectWallet />} />
                      <Route path="search">
                        <Route index element={<Search />} />
                        <Route path=":value" element={<Search />} />
                      </Route>
                      {/*<Route path="searchPub" element={<Search />} />*/}

                      <Route path="*" element={<PageNotFound />} />

                      {/*  ---------------- 임시 start --------------------  */}
                      <Route path="sample" element={<SdkSample />} />
                      <Route path="ListForSalePub" element={<ListForSale />} />
                      {/*  ---------------- 임시 end --------------------  */}
                    </Route>
                    <Route path="assets" element={<AssetDetailLayout />}>
                      <Route path=":contract">
                        <Route index element={<PageNotFound />} />
                        <Route path=":tokenId">
                          <Route index element={<AssetDetail />} />
                        </Route>
                      </Route>
                    </Route>
                  </Routes>
                </ModalProvider>
              </BrowserRouter>
            </Suspense>
          </ApolloProvider>
        </SeaportContextProvider>
      </CookiesProvider>
    </ChakraProvider>
  );
}

export default App;
