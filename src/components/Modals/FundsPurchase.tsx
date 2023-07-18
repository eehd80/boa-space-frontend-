import React from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
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
import { CopyIcon } from "@chakra-ui/icons";

interface ModalProp {
  isOpen: boolean;
  onClose(): void;
  asset?: any;
}
export const FundsPurchase = ({ isOpen, onClose }: ModalProp) => {
  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent pl="0" pr="3px">
        <ModalHeader>
          <Heading variant="subtit22">Add funds to purchase</Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box px="5%">
            <Stack mt="27px" spacing="3px">
              <Text variant="txt206" color="White">
                You need 0.153 ETH + {}
                <Text as="span" color="Secondary_V">
                  gas fees
                </Text>
              </Text>
              <Text variant="txt176" color="text_Gray02" w="95%" mx="auto">
                Transfer funds to your wallet or add funds with a card. It can take up to a minute
                for your balance to update.
              </Text>
            </Stack>

            <Stack mt="33px">
              <Flex>
                <Text variant="txt176" color="White">
                  Your ETH wallet :
                </Text>
                <Spacer />
                <Text variant="txt176" color="text_Gray02">
                  Balance: 0 ETH
                </Text>
              </Flex>
              <InputGroup size="sm">
                <Input placeholder="0x6be02d1d3665660d22ff9624b7be0551ee1ac91b" />
                <InputRightElement>
                  <CopyIcon
                    color="#9F9FBA"
                    fontSize="20px"
                    transform="scaleY(1.2) rotate(-90deg)"
                  />
                </InputRightElement>
              </InputGroup>
            </Stack>

            <Stack mt="60px">
              <Button variant="primary">Continue</Button>
              <Button color="Secondary_V">Add funds with card</Button>
            </Stack>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
