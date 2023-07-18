import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system";

const baseStyle = defineStyle({
  borderColor: "#3D3755",
  opacity: "1",
  my: "20px",
});

const variantSolid = defineStyle({
  borderStyle: "solid",
});

const variantDashed = defineStyle({
  borderStyle: "dashed",
});

const variants = {
  solid: variantSolid,
  dashed: variantDashed,
};

export const dividerTheme = defineStyleConfig({
  baseStyle,
  variants,
  defaultProps: {
    variant: "solid",
  },
});
