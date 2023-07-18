import React from "react";

import {
  Button,
  HStack,
  Image,
  Link,
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
}

export function AcceptSignConfirm({ handleClose, handleOK, handleCancel }: HandlerProps) {
  const finalRef = React.useRef(null);

  return (
    <>
      <Modal finalFocusRef={finalRef} isOpen={true} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent px={["15px", "15px", "15px", "25px"]}>
          <ModalHeader fontSize="24px" fontWeight={600}>
            Welcome to BOASPACE
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack>
              <Image src="/images/comm/img-planet.svg" w="152px" mt="40px" mb="40px" />
              <Text fontSize="15px" fontWeight={600} color="text_Gray02">
                By connecting your wallet and using BOASPACE, <br /> you agree to our{" "}
                <Link as="u" color="#E0002B">
                  Terms of Service
                </Link>
              </Text>
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
              <Button
                variant="outline"
                w="45%"
                color="White"
                colorScheme="blue"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button variant="primary" w="55%" onClick={handleOK} flexGrow="1">
                Accept and sign
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
