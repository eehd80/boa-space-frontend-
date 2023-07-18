import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system";
const brandPrimary = defineStyle({
  color: "blue.500",
  // let's also provide dark mode alternatives
  _dark: {
    color: "blue.300",
  },
  _for: {},
});

const custom = defineStyle({
  color: "yellow.500",
  fontWeight: "600",
  // let's also provide dark mode alternatives
  _dark: {
    color: "yellow.300",
  },
});

const tit = defineStyle({
  mt: "60px",
  mb: "8px",
  fontSize: "40px",
  lineHeight: "48px",
  fontWeight: "600",
});
const tit32 = defineStyle({
  mb: "8px",
  fontSize: "32px",
  fontWeight: "700",
});

const subtit30 = defineStyle({
  mb: "8px",
  fontSize: "30px",
  fontWeight: "600",
});
const subtit28 = defineStyle({
  mb: "8px",
  fontSize: "28px",
  fontWeight: "600",
});
const subtit22 = defineStyle({
  mb: "20px",
  fontSize: "22px",
  fontWeight: "600",
});

const sectit = defineStyle({
  display: "flex",
  alignItems: "center",
  mb: "3px",
  fontSize: "17px",
  fontWeight: "600",
  ".material-symbols-outlined": {
    margin: "-2px 15px 0 0",
    fontWeight: "700",
  },
});

const sectit700 = defineStyle({
  mt: "6px",
  mb: "3px",
  fontSize: "17px",
  fontWeight: "700",
});

export const headingTheme = defineStyleConfig({
  variants: {
    brand: brandPrimary,
    custom: custom,
    tit: tit,
    tit32: tit32,
    subtit30: subtit30,
    subtit28: subtit28,
    subtit22: subtit22,
    sectit: sectit,
    sectit700: sectit700,
  },
});
