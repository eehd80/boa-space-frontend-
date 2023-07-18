import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Box, Flex, HStack, Show, Text } from "@chakra-ui/react";
import HamMenu from "./HamMenu";
import Logo from "./Logo";
import SearchButton from "../SearchButton";
import CartButton from "../CartButton";
import AccountButton from "../AccountButton";
import { Link } from "react-router-dom";
import ConnectButton from "../ConnectButton";
import { MainInner } from "../Layout/CommonLayout";

export default function Header() {
  const [stickyClass, setStickyClass] = useState("sticky");
  const ref = useRef();
  useEffect(() => {
    window.addEventListener("scroll", stickNavbar);

    return () => {
      window.removeEventListener("scroll", stickNavbar);
    };
  }, []);

  const stickNavbar = () => {
    if (window !== undefined) {
      const windowHeight = window.scrollY;
      windowHeight < 0 ? setStickyClass("non-sticky") : setStickyClass("sticky");
    }
  };

  return (
    <>
      {/* <CdLayer /> */}
      <Hd id="header" className={stickyClass}>
        <MainInner>
          <Flex justify="space-between">
            <Logo />
            <HStack
              flexGrow="1"
              justify="flex-end"
              align="center"
              spacing={["10px", "10px", "10px", "15px", "30px"]}
            >
              {/* Desktop */}
              {/* <Hide below="md">
                <Gnb />
              </Hide> */}
              {/* drawer 열리면 html 스크롤 안되게 부탁드립니다. */}
              <SearchButton />
              <Show breakpoint="(min-width: 1024px)">
                <Link to="/explore">
                  <Text as="span" variant="txt156">
                    Explore
                  </Text>
                </Link>
                <AccountButton />
              </Show>
              <CartButton />
              <Show breakpoint="(min-width: 1024px)">
                <ContentBtnWrap w="150px" h="40px">
                  <ConnectButton walletRef={ref} />
                </ContentBtnWrap>
              </Show>
              <Show breakpoint="(max-width: 1024px)">
                <HamMenu />
              </Show>
            </HStack>
          </Flex>
        </MainInner>
      </Hd>
    </>
  );
}

const ContentBtnWrap = styled(Box)`
  > div {
    width: 100%;
    min-width: 150px;
    height: 100%;
  }
`;

const Hd = styled.header`
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: 72px;

  &.sticky {
    background-color: rgba(21, 18, 37, 0.7);
    backdrop-filter: blur(10px);
  }

  .chakra-button {
    /* width: 40px;
    height: 40px; */
    min-width: 0;
    padding: 0;
    /* font-size: 32px; */
    /* background: transparent; */
  }

  /* @media screen and (min-width: 744px) {
    .chakra-button {
      width: 139px;
      height: 52px;
      padding-left: 15px;
      padding-right: 10px;
      font-size: 18px;
      span {
        overflow: hidden;
        width: calc(100% - 25px);
        margin-right: 5px;
      }
      > div {
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        width: 20px;
        height: 20px;
        flex-grow: 1;
      }
    }

    .chakra-switch {
      display: none;
    }
  } */
  @media screen and (min-width: 1024px) {
    .container {
      padding: 0 2%;
    }
  }
  @media screen and (min-width: 1280px) {
    .container {
      padding-left: 2%;
      padding-right: 2%;
    }
  }
  @media screen and (min-width: 1920px) {
    .container {
      padding-left: 1.5%;
      padding-right: 1.5%;
    }
  }
`;
