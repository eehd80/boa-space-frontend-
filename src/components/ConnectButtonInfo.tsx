import React from "react";
import {
  Button,
  Box,
  Text,
  Show,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useEthers, useEtherBalance } from "@usedapp/core";
import { formatEther } from "@ethersproject/units";
import Identicon from "./Identicon";
import { BOA_SYMBOL } from "../constants";
import ConnectSelect from "./Wallet/ConnectSelect";

export default function ConnectButton() {
  const { account, chainId } = useEthers();
  const etherBalance = useEtherBalance(account);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return account && chainId ? (
    <Box display="flex" alignItems="center" background="gray.700" borderRadius="xl" py="0">
      <Box px="3">
        <Text color="white" fontSize="md">
          {etherBalance && parseFloat(formatEther(etherBalance)).toFixed(3)} {BOA_SYMBOL}
        </Text>
      </Box>
      <Button
        bg="gray.800"
        border="1px solid transparent"
        _hover={{
          border: "1px",
          borderStyle: "solid",
          borderColor: "blue.400",
          backgroundColor: "gray.700",
        }}
        borderRadius="xl"
        m="1px"
        px={3}
        height="38px"
      >
        <Text color="white" fontSize="md" fontWeight="medium" mr="2">
          {account &&
            `${account.slice(0, 6)}...${account.slice(account.length - 4, account.length)}`}
        </Text>
        <Identicon />
      </Button>
    </Box>
  ) : (
    <>
      <Button size={{ base: "lg", md: "md" }} onClick={onOpen}>
        <Show below="743px">
          <span className="ico-wallet material-symbols-outlined">account_balance_wallet</span>
        </Show>
        <Show above="md">
          <span className="material-symbols-outlined">arrow_right_alt</span> Connect
        </Show>
      </Button>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent className="drawer-connect">
          <DrawerCloseButton />
          <ConnectSelect onClose={onClose} />
        </DrawerContent>
      </Drawer>
    </>
  );
}
