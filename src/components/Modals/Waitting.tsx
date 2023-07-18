import React from "react";
import {
  Flex,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import styled from "styled-components";

interface ModalProp {
  isOpen: boolean;
  onClose(): void;
}
export const WaitingModal = ({ isOpen, onClose }: ModalProp) => {
  return (
    <Modal blockScrollOnMount={true} isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading variant="subtit22">Please wait...</Heading>
        </ModalHeader>
        <ModalBody>
          <Loading display="inline-flex" justify="center" pos="relative" mb="20px">
            <Image className="loading-out" src="/images/icon/loading-out.svg" />
            <Image
              className="loading-in"
              src="/images/icon/loading-in.svg"
              pos="absolute"
              top="50%"
              left="50%"
              m="-16.5px 0 0 -16.5px"
            />
          </Loading>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export const Loading = styled(Flex)`
  .loading-out {
    animation: loadingAni 2s infinite;
  }
  .loading-in {
    animation: loadingAni 3s infinite;
  }
  @keyframes loadingAni {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
