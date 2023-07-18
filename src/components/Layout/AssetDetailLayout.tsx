import React, { useEffect, useState } from "react";
import "../../assets/scss/comm.scss";
import styled from "styled-components";
import Footer from "./../Footer";
import Header from "./../Header";
import { Outlet, useLocation } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { Main, MainInner } from "./CommonLayout";
import { AuthExpiredCheckProvider } from "../AuthExpriedCheck";

interface Props {
  children?: React.ReactNode;
  className?: string;
}

export const AssetDetailLayout: React.FC<Props> = () => {
  const [prevLocation, setPrevLocation] = useState<any>();
  const location = useLocation();
  useEffect(() => {
    if (prevLocation !== location.pathname) {
      window.scrollTo(0, 0);
      setPrevLocation(location.pathname);
    }
  }, [location, prevLocation]);
  return (
    <Wrap id="asset-detail">
      <AuthExpiredCheckProvider>
        <Box className="wrap-inner">
          <Header />
          <Main>
            <MainInner>
              <Outlet />
            </MainInner>
          </Main>
          <Footer />
        </Box>
      </AuthExpiredCheckProvider>
    </Wrap>
  );
};

const Wrap = styled.div``;
