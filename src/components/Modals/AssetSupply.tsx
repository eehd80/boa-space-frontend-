import React from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

interface ModalProp {
  isOpen: boolean;
  onClose(): void;
}
export const AssetSupply = ({ isOpen, onClose }: ModalProp) => {
  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent px={["15px", "15px", "15px", "25px"]}>
        <ModalHeader>
          <Heading variant="subtit22" w="80%" m="0 auto">
            How does token supply work?
          </Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Accordion allowToggle>
            <AccordionItem borderRadius="10px" border="1px solid #443F5B">
              <h2>
                <AccordionButton borderBottomWidth="1px" borderColor="#443F5B" h="75px">
                  <Box w="100%" textAlign="left">
                    <span
                      className="material-symbols-outlined"
                      style={{
                        display: "inline-block",
                        verticalAlign: "middle",
                        margin: "-3px 10px 0 0",
                      }}
                    >
                      add_photo_alternate
                    </span>
                    What is minting?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel>
                <Text variant="txt164" p="20px" color="White">
                  Minting is an action that brings an item into existence on the blockchain, and
                  costs gas to do so. Minting using BOAspace tools is lazy, meaning it only occurs
                  when necessary: <br /> <br />
                  1. When you transfer an item to another account <br />
                  2. When someone buys an item from
                  <br />
                  <br />
                  you This means that you can create as much as you want here for free.
                </Text>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
