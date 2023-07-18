import React from "react";
import styled from "styled-components";
import { Alert, CloseButton, useDisclosure, Button, Show } from "@chakra-ui/react";

export default function ErrowAlert() {
  const { isOpen: isVisible, onClose, onOpen } = useDisclosure({ defaultIsOpen: false });

  return isVisible ? (
    <AlertW>
      <Alert>
        <Show above="md"> Register now - </Show>
        Get up to 100 USDT in trading fee trading fee rebate (fore verified usders)
        <CloseButton
          alignSelf="flex-start"
          position="relative"
          right={-1}
          top={-1}
          onClick={onClose}
          display={["none", "none", "none", "none", "flex", "flex"]}
        />
      </Alert>
    </AlertW>
  ) : (
    <Button onClick={onOpen}>Show Alert</Button>
  );
}

const AlertW = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1100;

  > div {
    justify-content: center;
    height: 68px;
    font-size: 15px;
    font-weight: 400;
    line-height: 20px;
    color: #fffbba;
  }

  @media screen and (min-width: 744px) {
    > div {
      height: 48px;
      font-weight: 500;
      font-size: 14px;
    }

    button {
      top: 50%;
      transform: translateY(-50%);
      width: 48px;
      height: 48px;
    }
  }
  @media screen and (min-width: 1024px) {
    > div {
      height: 32px;
      font-size: 13px;
    }
  }
`;
