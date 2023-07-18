import { Box, Drawer, DrawerContent, DrawerOverlay, useDisclosure } from "@chakra-ui/react";
import React, { useRef } from "react";
import styled from "styled-components";
import ConnectButton from "../ConnectButton";
import Gnb from "./Gnb";

export default function HamMenu() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const walletRef = useRef();

  return (
    <>
      <LabelHam htmlFor="menu">
        {!isOpen ? (
          <span className="material-symbols-outlined ico-ham" onClick={onOpen}>
            menu
          </span>
        ) : (
          <span className="material-symbols-outlined ico-close" onClick={onClose}>
            close
          </span>
        )}
      </LabelHam>
      <Drawer isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent w="100%">
          <Gnb onClose={onClose} walletRef={walletRef} />
          <Box w="calc(100% - 40px)" h="58px" mx="auto" mt="auto" mb="30px">
            <ConnectButton walletRef={walletRef} />
          </Box>
        </DrawerContent>
      </Drawer>
    </>
  );
}
const LabelHam = styled.label`
  cursor: pointer;
  span {
    font-size: 36px;
  }
`;
