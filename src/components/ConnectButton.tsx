import React, { useImperativeHandle, useMemo } from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useEthers } from "@usedapp/core";
import Identicon from "./Identicon";
import { useActiveState } from "../hooks/useActiveState";
import WalletItem from "./Wallet/WalletItem";
import ConnectSelect from "./Wallet/ConnectSelect";
import { useGetMyInfo } from "../hooks/query/useGetMyInfo";
import { Link } from "react-router-dom";

export default function ConnectButton({ walletRef }: { walletRef: any }) {
  const { account } = useEthers();
  const { online } = useActiveState();

  const { isOpen, onOpen, onClose } = useDisclosure();

  useImperativeHandle(walletRef, () => ({
    walletOpen,
  }));

  const walletOpen = () => {
    console.debug("WALLETOPEN");
    onOpen();
  };

  const myInfo = useGetMyInfo();
  const profile = useMemo(() => {
    if (myInfo?.getMyInfo) {
      return myInfo?.getMyInfo?.profile;
    }
    return {};
  }, [myInfo]);

  return (
    <Box h="100%" className="connet-wrap">
      {online ? (
        <Button
          w="100%"
          h="100%"
          onClick={onOpen}
          borderRadius={6}
          border="1px solid #6F35FF"
          bg="#fff"
          lineHeight="1.5 !important"
        >
          <Text variant="txt146" color="primary_V" mr="8px">
            {account &&
              `${account.slice(0, 6)}...${account.slice(account.length - 4, account.length)}`}{" "}
          </Text>
          <Box w="20px" h="20px">
            {profile?.image ? (
              <Avatar size="100%" src={profile.image} name={profile.name} />
            ) : (
              <Identicon />
            )}
          </Box>
        </Button>
      ) : (
        <Button w="100%" h="100%" onClick={onOpen} bg="#6F35FF">
          <span className="ico-wallet material-symbols-outlined" style={{ marginRight: "8px" }}>
            account_balance_wallet
          </span>
          <Text variant="txt166">Connect</Text>
        </Button>
      )}

      {online ? (
        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent className="drawer-connect">
            <DrawerCloseButton />
            <DrawerBody>
              <ConnectSelect onClose={onClose} />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      ) : (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader fontSize="22px" fontWeight={600}>
              Connect your wallet
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text variant="txt174" w="90%" mx="auto" mt="3px" color="text_Gray01">
                If you don&apos;t have a wallet, you can select a provider and create one now.{" "}
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
      )}
    </Box>
  );
}
