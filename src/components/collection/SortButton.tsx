import React from "react";
import {
  Button,
  ButtonGroup,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Radio,
  RadioGroup,
  Show,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";

export default function SortButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} variant="gray" w="100%" h="52px">
        <span className="material-symbols-outlined" style={{ marginRight: "10px" }}>
          swap_vert
        </span>{" "}
        Sort
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
                Sort by
              </Center>
            </DrawerHeader>
            <DrawerBody bg="transparent" px="15px">
              <RadioGroup>
                <Stack direction="column" spacing="5px">
                  <Radio
                    value="sort1"
                    flexDirection="row-reverse"
                    justifyContent="space-between"
                    size="sm"
                  >
                    Price low to high
                  </Radio>
                  <Radio
                    value="sort2"
                    flexDirection="row-reverse"
                    justifyContent="space-between"
                    size="sm"
                  >
                    Single items
                  </Radio>
                </Stack>
              </RadioGroup>

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
