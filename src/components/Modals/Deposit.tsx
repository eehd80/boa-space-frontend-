import React from "react";
import {
  Button,
  Center,
  HStack,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
interface ModalProp {
  isOpen: boolean;
  onClose(): void;
}
export default function Deposit({ isOpen, onClose }: ModalProp) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text variant="txt226">Deposit crypto</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <SimpleGrid
            columns={[2, 2, 2, 3]}
            spacing={5}
            py="25px"
            px="30px"
            bg="#2C273F"
            borderRadius="8px"
          >
            <Center height="30px">
              <Image src="/images/symbol/bithumb.svg" alt="bitthumb" />
            </Center>
            <Center height="30px">
              <Image src="/images/symbol/gate.svg" alt="gate.io" />
            </Center>
            <Center height="30px">
              <Image src="/images/symbol/latoken.svg" alt="latoken" />
            </Center>
            <Center height="30px">
              <Image src="/images/symbol/kucoin.svg" alt="kucoin" />
            </Center>
            <Center height="30px">
              <Image src="/images/symbol/bitclobal.svg" alt="bitclobal" />
            </Center>
            <Center height="30px">
              <Image src="/images/symbol/zt.svg" alt="zt Global" />
            </Center>
          </SimpleGrid>
          <Text variant="txt174" mt="40px" px="20px" color="#BCBCCC">
            Transfer funds from an exchange or another wallet to your wallet address below.
          </Text>
          <HStack mt="20px">
            <Input placeholder="0x7D9D139A3Ba4648a7D6C8D92f" h="52px" />
            <Button variant="primary">Copy</Button>
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
