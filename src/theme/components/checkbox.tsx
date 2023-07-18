import { checkboxAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, cssVar, defineStyle } from "@chakra-ui/styled-system";
import { mode } from "@chakra-ui/theme-tools";
import { runIfFn } from "../utils/run-if-fn";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys);

const $size = cssVar("checkbox-size");

const baseStyleControl = defineStyle((props) => {
  const { colorScheme: c } = props;

  return {
    w: "23px",
    h: "23px",
    mr: "10px",
    transitionProperty: "box-shadow",
    transitionDuration: "normal",
    borderRadius: "4px",
    background: "Back_BGBLACK",
    borderWidth: "2px",
    borderColor: "#626086",
    color: "white",

    _checked: {
      bg: "transparent",
      color: mode("primary_V", "gray.900")(props),
      borderColor: "primary_V",
      background: "primary_V",
      _hover: {
        borderColor: "primary_V",
        background: "primary_V",
      },
      _disabled: {
        borderColor: mode("gray.200", "transparent")(props),
        bg: mode("gray.200", "whiteAlpha.300")(props),
        color: mode("gray.500", "whiteAlpha.500")(props),
      },
    },

    _indeterminate: {
      bg: mode(`${c}.500`, `${c}.200`)(props),
      borderColor: "primary_V",
      color: mode("white", "gray.900")(props),
    },

    _disabled: {
      bg: mode("gray.100", "whiteAlpha.100")(props),
      borderColor: mode("gray.100", "transparent")(props),
    },

    _focusVisible: {
      boxShadow: "none",
      borderColor: "primary_V",
    },

    _invalid: {
      borderColor: "primary_V",
    },
  };
});

const baseStyleContainer = defineStyle({
  alignItems: "flex-start",
  _disabled: { cursor: "not-allowed" },
});

const baseStyleLabel = defineStyle({
  userSelect: "none",
  _disabled: { opacity: 0.4 },
});

const baseStyleIcon = defineStyle({
  transitionProperty: "transform",
  transitionDuration: "normal",
});

const baseStyle = definePartsStyle((props) => ({
  icon: baseStyleIcon,
  container: baseStyleContainer,
  control: runIfFn(baseStyleControl, props),
  label: baseStyleLabel,
}));

const sizes = {
  sm: definePartsStyle({
    control: { [$size.variable]: "sizes.4" },
    label: {
      display: "flex",
      justifyContent: "space-between",
      w: "calc(100% - 54px)",
      mr: "13px",
      fontSize: "16px",
      fontWeight: "400",
      color: "White",
      lineHeight: "24px",
    },
    icon: { fontSize: "2xs", color: "#3D3755" },
  }),
  md: definePartsStyle({
    control: { [$size.variable]: "sizes.4" },
    label: { fontSize: "16px", fontWeight: "600", color: "#BCBCCC", lineHeight: "24px" },
    icon: { fontSize: "2xs", color: "#3D3755" },
  }),
  lg: definePartsStyle({
    control: { [$size.variable]: "sizes.5" },
    label: { fontSize: "lg" },
    icon: { fontSize: "2xs" },
  }),
};

export const checkboxTheme = defineMultiStyleConfig({
  baseStyle,
  sizes,
  defaultProps: {
    size: "md",
    colorScheme: "blue",
  },
});
