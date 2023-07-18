import { useDisclosure } from "@chakra-ui/react";

export function useModalDisclosure() {
  const {
    isOpen: isOpenAcceptSign,
    onOpen: onOpenAcceptSign,
    onClose: onCloseAcceptSign,
  } = useDisclosure();
  const toggleAcceptSign = isOpenAcceptSign ? onOpenAcceptSign : onCloseAcceptSign;

  return {
    acceptSign: {
      isOpen: isOpenAcceptSign,
      onOpen: onOpenAcceptSign,
      onClose: onCloseAcceptSign,
      toggleAcceptSign,
    },
  };
}
