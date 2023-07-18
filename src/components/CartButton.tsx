import React from "react";
import {
  Badge,
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Image,
  Show,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import Cart from "./Header/Cart";
import { useCartCount } from "../features/cart/cartSlice";

export default function CartButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cartCount = useCartCount();
  return (
    <>
      <Button onClick={onOpen} w="54px" h="54px">
        <Image src="/images/icon/shopping_cart.svg" alt="cart" />
        {cartCount > 0 && (
          <Badge
            style={{
              position: "absolute",
              top: "6px",
              right: "3px",
              height: "19px",
              borderRadius: "10px",
              borderWidth: "2px",
              background: "#E0002B",
              color: "#fff",
              fontSize: "13px",
              fontWeight: "600",
            }}
          >
            {cartCount > 99 ? "99+" : cartCount}
          </Badge>
        )}
      </Button>
      {/* mobile에선 Bottom / pc에선 right */}
      {/* mobile */}
      <Show breakpoint="(max-width: 744px)">
        <Drawer placement={"bottom"} onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent
            pos="relative"
            bg="#3D3755"
            borderRadius="15px 15px 0 0"
            border="0"
            mr="0"
            mb="0"
          >
            <DrawerCloseButton />
            <DrawerHeader bg="transparent" borderBottomWidth="1px" borderColor="popup_B01">
              <Center fontSize="22px" fontWeight={600}>
                Your cart{" "}
                <Tooltip
                  label="Items in your cart are not guaranteed at purchase."
                  hasArrow
                  arrowSize={15}
                  placement="top"
                >
                  <InfoOutlineIcon color="text_Gray01" fontSize="19px" m="-2px 0 0 10px" />
                </Tooltip>
              </Center>
            </DrawerHeader>
            <DrawerBody bg="transparent">
              <Cart onClose={onClose} />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Show>
      {/* pc 버전 */}
      <Show breakpoint="(min-width: 744px)">
        <Drawer placement={"right"} onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay mt="0" />
          <DrawerContent
            pos="relative"
            bg="#3D3755"
            borderRadius="15px"
            border="0"
            maxW="382px"
            mt="25px"
            mr="25px"
            mb="25px"
          >
            <DrawerCloseButton />
            <DrawerHeader bg="transparent" borderBottomWidth="1px" borderColor="popup_B01">
              <Center fontSize="22px" fontWeight={600}>
                Your cart{" "}
                <Tooltip
                  label="Items in your cart are
                  not guaranteed at purchase."
                  hasArrow
                  arrowSize={15}
                  placement="top"
                >
                  <InfoOutlineIcon color="text_Gray01" fontSize="19px" m="-2px 0 0 10px" />
                </Tooltip>
              </Center>
            </DrawerHeader>
            <DrawerBody bg="transparent">
              <Cart onClose={onClose} />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Show>
    </>
  );
}
