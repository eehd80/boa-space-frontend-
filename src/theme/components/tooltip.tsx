import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system";
import { cssVar } from "@chakra-ui/theme-tools";

const $bg = cssVar("tooltip-bg");
const $fg = cssVar("tooltip-fg");
const $arrowBg = cssVar("popper-arrow-bg");

const baseStyle = defineStyle({
  pos: "releative",
  color: "$fg.reference",
  [$fg.variable]: "colors.whiteAlpha.900",
  _dark: {
    [$bg.variable]: "colors.gray.300",
    [$fg.variable]: "colors.gray.900",
  },
  [$arrowBg.variable]: "#443F5B",
  //   h: "41px",
  px: "18px",
  py: "11px",
  borderRadius: "8px",
  fontWeight: "600",
  fontSize: "15px",
  boxShadow: "md",
  maxW: "xs",
  zIndex: "tooltip",
  boxSizing: "border-box",
  textAlign: "center",
  bg: "#443F5B",
  span: {
    color: "#A796FF",
  },
  svg: {
    fontSize: "15px",
  },
});

export const tooltipTheme = defineStyleConfig({
  baseStyle,
});
