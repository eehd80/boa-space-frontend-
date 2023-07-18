import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system";
import { inputTheme } from "./Input";

const baseStyle = defineStyle({
  ...inputTheme.baseStyle?.field,
  my: "0",
  p: "10px",
  minHeight: "118",
  lineHeight: "short",
  verticalAlign: "top",
  resize: "none",
  _focusVisible: {
    zIndex: 1,
    borderColor: "#8F8DB1",
    outline: "none",
    boxShadow: "none",
  },
});

const variants = {
  outline: defineStyle((props) => inputTheme.variants?.outline(props).field ?? {}),
  flushed: defineStyle((props) => inputTheme.variants?.flushed(props).field ?? {}),
  filled: defineStyle((props) => inputTheme.variants?.filled(props).field ?? {}),
  unstyled: inputTheme.variants?.unstyled.field ?? {},
};

const sizes = {
  xs: inputTheme.sizes?.xs.field ?? {},
  sm: inputTheme.sizes?.sm.field ?? {},
  md: inputTheme.sizes?.md.field ?? {},
  lg: inputTheme.sizes?.lg.field ?? {},
};

export const textareaTheme = defineStyleConfig({
  baseStyle,
  sizes,
  variants,
  defaultProps: {
    size: "md",
    variant: "outline",
  },
});
