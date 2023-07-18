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
  Text,
  VStack,
} from "@chakra-ui/react";

interface HandlerProps {
  handleClose: any;
  handleOK: any;
  handleCancel: any;
  message: string;
}

export function ConfirmAlert({ handleClose, handleOK, handleCancel, message }: HandlerProps) {
  const finalRef = React.useRef(null);

  return (
    <>
      <Modal finalFocusRef={finalRef} isOpen={true} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent px={["15px", "15px", "15px", "25px"]} maxW={640}>
          <ModalHeader fontSize="24px" fontWeight={600}></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack p={"20px 20px 10px"}>
              <HStack>
                <Text fontSize="20px" fontWeight={600} color="#FFFFFF">
                  {message}
                </Text>
              </HStack>
            </VStack>
          </ModalBody>

          <ModalFooter px={0} mt="42px">
            <HStack
              minW="360px"
              mx="auto"
              spacing="15px"
              direction={["column", "column", "column", "row-reverse"]}
              justifyContent="center"
            >
              <Button variant="primary" w="55%" onClick={handleOK} flexGrow="1">
                OK
              </Button>
              <Button
                variant="outline"
                w="45%"
                color="White"
                colorScheme="blue"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
