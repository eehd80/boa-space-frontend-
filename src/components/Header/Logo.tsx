import React from "react";
import styled from "styled-components";
import { Image, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import "@fontsource/poppins";

export default function Logo() {
  return (
    <Heading as="h1" display="flex" h="68px">
      <LogoLink to="/home">
        <Image src="/images/comm/logo.svg" h={["30px", "30px", "30px", "28px"]} alt="BOASPACE" />{" "}
        {/* <Show above="md">BOASPACE</Show>    test*/}
      </LogoLink>
    </Heading>
  );
}

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
`;
