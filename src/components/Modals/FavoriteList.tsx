import React from "react";
import {
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  StackDivider,
} from "@chakra-ui/react";
import TooltipBtn from "../Tooltip";
import FavoritedUser from "../assets/FavoritedUser";

interface ModalProp {
  isOpen: boolean;
  onClose(): void;
}
export const FavoriteList = ({ isOpen, onClose }: ModalProp) => {
  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent pl="0" pr="3px">
        <ModalHeader>
          <Heading variant="subtit22">
            Favorited by <TooltipBtn />
          </Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody overflowY="auto" maxH="400px">
          <Stack divider={<StackDivider borderColor="#443F5B" />}>
            <FavoritedUser />
            <FavoritedUser />
            <FavoritedUser />
            <FavoritedUser />
            <FavoritedUser />
            <FavoritedUser />
            <FavoritedUser />
            <FavoritedUser />
            <FavoritedUser />
            <FavoritedUser />
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
//
// const Loading = styled(Flex)`
//   .loading-out {
//     animation: loadingAni 2s infinite;
//   }
//   .loading-in {
//     animation: loadingAni 3s infinite;
//   }
//   @keyframes loadingAni {
//     0% {
//       transform: rotate(0deg);
//     }
//     100% {
//       transform: rotate(360deg);
//     }
//   }
// `;
