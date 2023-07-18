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
import { InfoIcon } from "@chakra-ui/icons";

interface HandlerProps {
  handleClose: any;
  message: string;
}

export function Alert({ handleClose, message }: HandlerProps) {
  const finalRef = React.useRef(null);

  return (
    <>
      <Modal finalFocusRef={finalRef} isOpen={true} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent px={["15px", "15px", "15px", "25px"]}>
          <ModalHeader fontSize="24px" fontWeight={600}></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack>
              <HStack>
                <InfoIcon boxSize={6} />
                <Text fontSize="15px" fontWeight={600} color="text_Gray02">
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
              <Button variant="primary" w="100%%" onClick={handleClose} flexGrow="1">
                OK
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
