import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system";
const brandPrimary = defineStyle({
  color: "blue.500",
  // let's also provide dark mode alternatives
  _dark: {
    color: "blue.300",
  },
});

const blind = defineStyle({
  w: "0",
  h: "0",
  fontSize: "0",
  p: "0",
  border: "0",
});

export const inputcusTheme = defineStyleConfig({
  variants: {
    brand: brandPrimary,
    blind: blind,
  },
});
