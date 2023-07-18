import React, { useCallback, useEffect, useState } from "react";
import {
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useContractFunction, useEtherBalance, useEthers, useTokenBalance } from "@usedapp/core";
import { BigNumber, Contract, utils } from "ethers";
import { WBOA9 } from "../../hooks/useSeaport";
import WBOA_ABI from "../../contracts/abis/wboa.json";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { formatEther } from "@ethersproject/units";
import { parseEther } from "ethers/lib/utils";

interface ModalProp {
  isOpen: boolean;
  onClose(): void;
  complete(): void;
}
const WBOAInterface = new utils.Interface(WBOA_ABI);
const contract = new Contract(WBOA9, WBOAInterface);
const enum WrapMode {
  DEPOSIT,
  WITHDRAW,
}
const enum InputType {
  BOA = "BOA",
  WBOA = "WBOA",
}
export const WrapModal = ({ isOpen, onClose, complete }: ModalProp) => {
  const { account } = useEthers();
  const etherBalance: BigNumber = useEtherBalance(account);
  const wBOABalance: BigNumber = useTokenBalance(WBOA9, account);
  const [invalid, setInvalid] = useState(false);
  const [wrapMode, setWrapMode] = useState<WrapMode>(WrapMode.DEPOSIT);
  const [amount, setAmount] = useState("");

  useEffect(() => {
    try {
      const bn = parseEther(amount);
      if (wrapMode === WrapMode.DEPOSIT) {
        if (etherBalance) {
          setInvalid(bn.gt(etherBalance));
        } else {
          setInvalid(true);
        }
      } else {
        if (wBOABalance) {
          setInvalid(bn.gt(wBOABalance));
        } else {
          setInvalid(true);
        }
      }
    } catch (e) {
      setInvalid(true);
    }
  }, [amount, wrapMode, etherBalance, wBOABalance]);

  const { state: depositState, send: deposit } = useContractFunction(contract, "deposit", {
    transactionName: "Wrap",
  });
  const { state: withdrawState, send: withdraw } = useContractFunction(contract, "withdraw", {
    transactionName: "Unwrap",
  });

  useEffect(() => {
    if (depositState?.status === "Success") {
      complete && complete();
    }
  }, [depositState, complete]);

  useEffect(() => {
    if (withdrawState?.status === "Success") {
      complete && complete();
    }
  }, [withdrawState, complete]);

  const handlerClick = useCallback(() => {
    if (wrapMode === WrapMode.DEPOSIT) {
      deposit({ value: utils.parseEther(amount) });
    } else if (wrapMode === WrapMode.WITHDRAW) {
      withdraw(utils.parseEther(amount));
    }
  }, [deposit, withdraw, amount, wrapMode]);

  const changeTarget = () => {
    setWrapMode(wrapMode === WrapMode.DEPOSIT ? WrapMode.WITHDRAW : WrapMode.DEPOSIT);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW="480px">
        <ModalHeader>
          <Text variant="txt206">Convert tokens</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <ConvertTokens
            amount={amount}
            setAmount={setAmount}
            maxAmount={wrapMode === WrapMode.DEPOSIT ? etherBalance : wBOABalance}
            inputType={wrapMode === WrapMode.DEPOSIT ? InputType.BOA : InputType.WBOA}
            changeTarget={changeTarget}
          />
          <Box pos="relative" h="5px" onClick={changeTarget}>
            <Image
              src="/images/icon/arrow_convert.svg"
              alt=""
              pos="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
            />
          </Box>
          <ConvertTokens
            amount={amount}
            setAmount={setAmount}
            maxAmount={wrapMode === WrapMode.DEPOSIT ? wBOABalance : etherBalance}
            inputType={wrapMode === WrapMode.DEPOSIT ? InputType.WBOA : InputType.BOA}
            changeTarget={changeTarget}
          />
          <Button
            variant="primary"
            w="100%"
            h="60px"
            mt="20px"
            borderRadius="60px"
            isLoading={
              ["PendingSignature", "Mining"].includes(depositState.status) ||
              ["PendingSignature", "Mining"].includes(withdrawState.status)
            }
            loadingText="Pending..."
            spinnerPlacement="end"
            onClick={handlerClick}
            isDisabled={invalid}
          >
            Convert tokens
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

interface ConvertTokensProps {
  amount: string;
  setAmount: any;
  inputType: InputType;
  maxAmount?: BigNumber;
  changeTarget: any;
}
const ConvertTokens = ({
  amount,
  setAmount,
  maxAmount,
  inputType,
  changeTarget,
}: ConvertTokensProps) => {
  return (
    <Box
      py="13px"
      px="20px"
      bg="#2C273F"
      borderWidth="1px"
      borderColor="#443F5B"
      borderRadius="5px"
    >
      <Flex>
        <HStack>
          <Badge>Max</Badge>{" "}
          <Text variant="txt154">
            Balance : {maxAmount && parseFloat(formatEther(maxAmount)).toFixed(5)}
          </Text>
        </HStack>
        <Spacer />
        <Box pos="relative">
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon fontSize="22px" ml="0" />}
              h="34px"
              pl="8px"
              pr="5px"
              borderRadius="34px"
              borderWidth="1px"
              borderColor="#0D0C15"
              bg="#1C1A24"
            >
              <Image
                src={
                  inputType === InputType.BOA
                    ? "/images/icon/boa-blue.svg"
                    : "/images/icon/boa-red.svg"
                }
                alt=""
                display="inline-block"
                mr="5px"
                mt="-3px"
                verticalAlign="middle"
              />{" "}
              <Text as="span" variant="txt165">
                {inputType === InputType.BOA ? "BOA" : "WBOA"}
              </Text>
            </MenuButton>
            <MenuList>
              <MenuItem py="10px" onClick={changeTarget}>
                <Image
                  src={
                    inputType === InputType.BOA
                      ? "/images/icon/boa-red.svg"
                      : "/images/icon/boa-blue.svg"
                  }
                  alt=""
                  display="inline-block"
                  mr="5px"
                  mt="-3px"
                  verticalAlign="middle"
                />{" "}
                <Text as="span" variant="txt165">
                  {inputType === InputType.BOA ? "WBOA" : "BOA"}
                </Text>
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
      <Spacer height="10px" />
      <Stack textAlign="left" spacing="10px">
        <Input
          type="number"
          variant="outline"
          placeholder="amount"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
          }}
        />
      </Stack>
    </Box>
  );
};
