import { Text } from "@chakra-ui/react";
import React from "react";
import styled from "styled-components";

export enum EmptyType {
  NFT = "NFTs",
  COLLECTION = "collections",
}

export function EmptyList({ type = EmptyType.NFT }: { type?: EmptyType }) {
  return (
    <ListNone>
      <Text className="none-lst" fontSize={["24px", "22px"]}>
        {`No ${type} to display`}
      </Text>
    </ListNone>
  );
}

const ListNone = styled.div`
  margin: 80px auto 0;
  text-align: center;
  font-weight: 500;
  font-size: 18px;
  color: #c4c4d3;
  &::before {
    content: "";
    display: block;
    width: 128px;
    height: 128px;
    margin: 0 auto 10px;
    background: url(/images/comm/img-none.svg) 50% 50% no-repeat;
  }
`;
