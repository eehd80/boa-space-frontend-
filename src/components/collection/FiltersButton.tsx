import React from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Show,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import FiltersEl from "./FilterEl";

export default function FiltersButton({ onClick }: { onClick?: any }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLargerThan1024] = useMediaQuery("(min-width: 1024px)");

  const handlerClick = () => {
    if (isLargerThan1024) {
      onClick && onClick();
    } else {
      onOpen();
    }
  };

  return (
    <>
      <Button
        onClick={handlerClick}
        // variant="gray"
        w={["100%", "100%", "100%", "100%", "52px"]}
        h="52px"
        p="0"
        borderRadius={["10px", "10px", "10px", "10px", "52px"]}
        _hover={{ bg: "#4F4B67" }}
        fontSize="17px"
        bg={["popup_BBG", "popup_BBG", "popup_BBG", "popup_BBG", "transparent"]}
      >
        <Box as="span" mr={["10px", "10px", "10px", "10px", "0"]}>
          <span className="material-symbols-outlined" style={{ fontSize: "24px" }}>
            filter_list
          </span>
        </Box>
        <Show breakpoint="(max-width: 1023px)">Filters</Show>
      </Button>
      {/* mobile에선 Bottom / pc에선 right */}
      {/* mobile */}
      <Show breakpoint="(max-width: 1023px)">
        <Drawer placement={"bottom"} onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent
            pos="relative"
            bg="Back_BGBLACK"
            borderRadius="15px 15px 0 0"
            border="0"
            h="100vh"
            mr="0"
            mb="0"
          >
            <DrawerCloseButton />
            <DrawerHeader bg="transparent" borderBottomWidth="0">
              <Center fontSize="22px" fontWeight={600}>
                Filters
              </Center>
            </DrawerHeader>
            <DrawerBody bg="transparent" px="5px">
              <FiltersEl />
              <ButtonGroup
                pos="absolute"
                left="10px"
                right="10px"
                bottom="0"
                py="20px"
                borderTopWidth="1px"
                borderColor="#3D3755"
                gap="0"
                bg="Back_BGBLACK"
              >
                <Button variant="gray" w="50%">
                  Clear all
                </Button>
                <Button variant="primary" w="50%">
                  Done
                </Button>
              </ButtonGroup>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Show>
    </>
  );
}
