import { accordionAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, defineStyle } from "@chakra-ui/styled-system";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  container: {
    borderRadius: "8px",
    borderColor: "popup_B01",
    borderTopWidth: "1px",
    _last: {
      marginBottom: "0",
    },
  },
  button: {
    transitionProperty: "common",
    transitionDuration: "normal",
    px: "20px",
    py: "20px",
    fontSize: "17px",
    fontWeight: "700",
    color: "White",
    _focusVisible: {
      boxShadow: "outline",
    },
    _hover: {
      bg: "blackAlpha.50",
    },
    _disabled: {
      opacity: 0.4,
      cursor: "not-allowed",
    },
    span: {
      flex: "1",
      textAlign: "left",
    },
  },
  panel: {
    pt: "0",
    pb: "3px",
    px: "0",
    borderColor: "popup_BBG",
    borderTopWidth: "1px",
    textAlign: "left",
    color: "White",
  },
  icon: {
    fontSize: "1.3em",
    opacity: "0.7",
  },
});

const variantLine = definePartsStyle({
  container: {
    borderRadius: "0",
    borderTopWidth: "1px",
    borderColor: "popup_BBG",
    _last: {
      borderBottomWidth: "1px",
    },
  },

  panel: {
    px: "17px",
    py: "15px",
    borderColor: "popup_BBG",
    borderTopWidth: "1px",
    textAlign: "left",
    color: "White",
  },
  icon: {
    fontSize: "1.3em",
    opacity: "0.7",
  },
});

const variants = {
  line: variantLine,
  unstyled: defineStyle({}),
};

export const accordionTheme = defineMultiStyleConfig({ baseStyle, variants });
