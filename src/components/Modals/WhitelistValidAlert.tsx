import React from "react";

import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import styled from "@emotion/styled";

interface HandlerProps {
  isOpen: boolean;
  onClose: any;
  list?: string[];
}

export function WhitelistValidAlert({ onClose, isOpen, list }: HandlerProps) {
  const finalRef = React.useRef(null);

  return (
    <>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent px={["15px", "15px", "15px", "25px"]} maxW="650px">
          <ModalHeader fontSize="24px" fontWeight={600}></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={10}>
              <HStack>
                <Text variant="txt174" color="#ff204a">
                  Please enter a valid wallet address.
                </Text>
              </HStack>
              <VStack divider={<StackDivider borderColor="#443F5B" />}>
                {list?.length > 0 &&
                  list.map((v) => {
                    return <AddressItem value={v} key={v} />;
                  })}
              </VStack>
            </VStack>
          </ModalBody>

          <ModalFooter px={0} mt="42px">
            <HStack
              minW="100%"
              mx="auto"
              spacing="15px"
              direction={["column", "column", "column", "row-reverse"]}
              justifyContent="center"
            >
              <Button variant="primary" w="100%" minW={50} onClick={onClose} flexGrow="1">
                OK
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
const AddressItem = ({ value }: { value: string }) => {
  return (
    <HStack verticalAlign="middle" style={{ width: "auto" }}>
      <InfoIcon />
      <MessageValue>{value}</MessageValue>
    </HStack>
  );
};

const MessageValue = styled(Text)`
  letter-spacing: -0.1px;
  width: fit-content;
  word-break: break-all;
  word-wrap: break-word;
`;
