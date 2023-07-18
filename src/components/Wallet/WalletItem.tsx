import React from "react";
import styled from "styled-components";
import { LinkBox, Flex, Image, Badge, Center, Text, Button } from "@chakra-ui/react";
import { useActiveState, useLogin } from "../../hooks/useActiveState";
import { ACTIVE_STATE } from "../../constants";

export default function WalletItem() {
  const login = useLogin();
  const { activeState } = useActiveState();
  return (
    <LinkBoxWrap>
      <Flex h="45px" alignItems="center">
        <Button variant="ghost" onClick={login}>
          <Flex>
            <Center mr={2} w="35px">
              <Image src="/images/symbol/metamask.svg" alt="metamask" />
            </Center>
            <Text fontSize="16px" fontWeight={600} color="White">
              MetaMask
            </Text>
          </Flex>
          <Badge fontSize="12px" fontWeight={600} color="text_Gray02" bg="transparent" border="0">
            {activeState === ACTIVE_STATE.STATUS_OFFLINE_ACCOUNT ||
            activeState === ACTIVE_STATE.STATUS_OFFLINE_CHAIN
              ? "CONNECT NETWORK"
              : "SIGN IN"}
          </Badge>
        </Button>
        {/* <Spacer /> */}
      </Flex>
    </LinkBoxWrap>
  );
}

const LinkBoxWrap = styled(LinkBox)`
  position: relative;
  margin: 0 !important;
  padding: 15px 20px;
  border-bottom: 1px solid #443f5b;
  &:hover {
    background: transparent;
  }
  &:last-child {
    border-bottom: none;
  }
  .chakra-badge {
    position: absolute;
    top: 50%;
    right: 3px;
    transform: translateY(-50%);
  }
  button {
    flex-grow: 1;
    justify-content: flex-start;
    padding: 0;
    &:hover {
      background: transparent;
    }
  }
`;
