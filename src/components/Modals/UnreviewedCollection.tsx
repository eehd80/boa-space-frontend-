import React from "react";
import {
  Box,
  Button,
  Checkbox,
  Heading,
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  StackDivider,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { InfoOutlineIcon } from "@chakra-ui/icons";

interface ModalProp {
  isOpen: boolean;
  onClose(): void;
}
export const UnreviewedCollection = ({ isOpen, onClose }: ModalProp) => {
  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW="546px" pl="0" pr="3px">
        <ModalHeader>
          <Heading variant="subtit22">This is an unreviewed collection</Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box textAlign="left" px="25px">
            <Box mt="8px" pl="15px">
              <Image src="/images/icon/search_icon 1.svg" alt="" mx="auto" />
              <HStack mt="36px" align="flex-start">
                <Text variant="txt156" lineHeight="20px">
                  Review this information to encure it’s what you want to buy.
                </Text>
                <Tooltip
                  label="Items in your cart are
                  not guaranteed at purchase."
                  hasArrow
                  arrowSize={15}
                  placement="top"
                >
                  <InfoOutlineIcon color="text_Gray01" fontSize="19px" m="-2px 0 0 10px" />
                </Tooltip>
              </HStack>
            </Box>
            <Stack
              divider={<StackDivider borderColor="popup_B01" />}
              mt="23px"
              borderWidth="1px"
              borderColor="popup_B01"
              borderRadius="10px"
              spacing="0"
            >
              <HStack px="20px" py="16px">
                <Text
                  variant="txt165"
                  w="45%"
                  minW="140px"
                  color="text_Gray02"
                  letterSpacing="-0.05rem"
                >
                  Collection name
                </Text>
                <Text variant="txt176" flexGrow="1" color="Secondary_V">
                  OppiesNFT
                </Text>
              </HStack>
              <HStack px="20px" py="16px">
                <Text
                  variant="txt165"
                  w="45%"
                  minW="140px"
                  color="text_Gray02"
                  letterSpacing="-0.05rem"
                >
                  Creator
                </Text>
                <Text variant="txt176" flexGrow="1" color="Secondary_V">
                  buurduli
                  <Text as="span" variant="txt154" color="text_Gray02">
                    (member since 2022년 3월 5일)
                  </Text>
                </Text>
              </HStack>
              <HStack px="20px" py="16px">
                <Text
                  variant="txt165"
                  w="45%"
                  minW="140px"
                  color="text_Gray02"
                  letterSpacing="-0.05rem"
                >
                  Total sales
                </Text>
                <Text variant="txt176" flexGrow="1" color="White">
                  0 sales
                </Text>
              </HStack>
              <HStack px="20px" py="16px">
                <Text
                  variant="txt165"
                  w="45%"
                  minW="140px"
                  color="text_Gray02"
                  letterSpacing="-0.05rem"
                >
                  Total volume
                </Text>
                <Text variant="txt176" flexGrow="1" color="White">
                  48BOA{" "}
                  <Text as="span" variant="txt154" color="text_Gray02">
                    ($67,347.84)
                  </Text>
                </Text>
              </HStack>
              <HStack px="20px" py="16px">
                <Text
                  variant="txt165"
                  w="45%"
                  minW="140px"
                  color="text_Gray02"
                  letterSpacing="-0.05rem"
                >
                  Social links
                </Text>
                <HStack>
                  <HStack ml="-15px" spacing="0">
                    <Image src="/images/icon/twitter_purple.svg" alt="twitter" />
                    <Image src="/images/icon/language_purple.svg" alt="language" />
                  </HStack>
                  {/* <Text variant="txt176" flexGrow="1" color="White">
                      Not specified
                    </Text> */}
                </HStack>
              </HStack>
              <Button w="100%" h="47px" color="text_Gray02" fontSize="16px" fontWeight={600}>
                Show more
              </Button>
            </Stack>
            <Checkbox mt="20px" lineHeight="24px">
              I understand that BOASPACE has not reviewed this collection and blockchain
              transactions are irreversible.
            </Checkbox>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
