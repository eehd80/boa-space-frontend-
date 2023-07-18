import { menuAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
  menuAnatomy.keys
);

// define the base component styles
const baseStyle = definePartsStyle({
  // define the part you're going to style
  button: {
    // this will style the MenuButton component
    fontWeight: "medium",
    bg: "red.500",
    color: "gray.200",
    _hover: {
      bg: "teal.600",
      color: "white",
    },
  },
  list: {
    // this will style the MenuList component
    zIndex: "1000",
    overflow: "hidden",
    w: "auto",
    h: "auto",
    borderRadius: "10px",
    border: "none",
    bg: "popup_BBG",
    // left: "0",
    // right: "auto",
    p: "0",
  },
  item: {
    // this will style the MenuItem and MenuItemOption components
    px: "18px",
    py: "21px",
    color: "gray.200",
    fontWeight: "600",
    fontSize: "14px",
    bg: "transparent",
    borderBottom: "1px solid",
    borderColor: "login_BOXline",
    boxSizing: "border-box",
    _last: {
      border: "none",
    },
    _hover: {
      bg: "#46405F",
    },
    _focus: {
      bg: "login_BOXline",
    },
  },
  groupTitle: {
    // this will style the text defined by the title prop
    // in the MenuGroup and MenuOptionGroup components
    textTransform: "uppercase",
    color: "white",
    textAlign: "center",
    letterSpacing: "wider",
    opacity: "0.7",
  },
  command: {
    // this will style the text defined by the command
    // prop in the MenuItem and MenuItemOption components
    opacity: "0.8",
    fontFamily: "mono",
    fontSize: "sm",
    letterSpacing: "tighter",
    pl: "4",
  },
  divider: {
    // this will style the MenuDivider component
    my: "0",
    borderColor: "#443F5B",
    borderBottom: "1px solid",
  },
});
// export the base styles in the component theme
export const menuTheme = defineMultiStyleConfig({ baseStyle });
