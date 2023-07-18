import { radioAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, defineStyle } from "@chakra-ui/styled-system";
import { runIfFn } from "../utils/run-if-fn";
import { checkboxTheme } from "./checkbox";

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(parts.keys);

const baseStyleControl = defineStyle((props) => {
  const controlStyle = runIfFn(checkboxTheme.baseStyle, props)?.control;

  return {
    ...controlStyle,
    borderRadius: "full",
    borderColor: "#626086",
    borderWidth: "2px",
    background: "transparent",
    _checked: {
      ...controlStyle?.["_checked"],
      borderColor: "primary_V",
      background: "transparent !important",
      _before: {
        content: `""`,
        display: "inline-block",
        pos: "relative",
        w: "50%",
        h: "50%",
        borderRadius: "50%",
        bg: "primary_V",
      },
    },
    _hover: {},
  };
});

const baseStyle = definePartsStyle((props) => ({
  label: checkboxTheme.baseStyle?.(props).label,
  container: checkboxTheme.baseStyle?.(props).container,
  control: baseStyleControl(props),
}));

const sizes = {
  md: definePartsStyle({
    control: { w: "24px", h: "24px" },
    label: { fontSize: "16px", fontWeight: "400" },
  }),
  lg: definePartsStyle({
    control: { w: "5", h: "5" },
    label: { fontSize: "lg" },
  }),
  sm: definePartsStyle({
    container: { py: "11px", px: "18px", bg: "popup_hover", borderRadius: "10px" },
    control: { width: "24px", height: "24px" },
    label: { fontSize: "sm" },
  }),
};

export const radioTheme = defineMultiStyleConfig({
  baseStyle,
  sizes,
  defaultProps: {
    size: "md",
    colorScheme: "blue",
  },
});
