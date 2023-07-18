import React from "react";

import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import WalletItem from "../Wallet/WalletItem";

interface HandlerProps {
  handleClose: any;
}

export function Login({ handleClose }: HandlerProps) {
  return (
    <Modal isOpen={true} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize="22px" fontWeight={600}>
          Connect your wallet
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text variant="txt174" w="90%" mx="auto" mt="3px" color="text_Gray01">
            {`If you don't have a wallet, you can select a provider and create one now. `}
            <Link to="https://metamask.io/download/" target="_blank">
              <Text as="span" color="#7C95FE">
                Learn more
              </Text>
            </Link>
          </Text>
          <Divider mt="26px" mb="0" borderColor="popup_B01" />
          <WalletItem />
          <Divider mt="0" mb="4px" borderColor="popup_B01" />
          <Button fontSize="17px" fontWeight={600} mb="-20px">
            Show more
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
