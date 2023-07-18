import React from "react";
import styled from "styled-components";

// import { Box } from "@chakra-ui/react";
import InfoOutlineIcon from "./icon/Info";

export default function IconInfo() {
  return (
    <InfoIcon>
      <InfoOutlineIcon />
    </InfoIcon>
  );
}

const InfoIcon = styled.span`
  display: inline-block;
  margin: -5px 0 0 3px;
  color: text_Gray01;
  vertical-align: middle;
  cursor: pointer;
  span {
    font-size: 24px !important;
  }
`;
