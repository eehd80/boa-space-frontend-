import { inputAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, defineStyle } from "@chakra-ui/styled-system";
import { getColor, mode } from "@chakra-ui/theme-tools";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  field: {
    width: "100%",
    minWidth: 0,
    outline: 0,
    position: "relative",
    appearance: "none",
    transitionProperty: "common",
    transitionDuration: "normal",
    _disabled: {
      opacity: 0.4,
      cursor: "not-allowed",
    },
  },
});

const size = {
  lg: defineStyle({
    fontSize: "lg",
    px: "4",
    h: "12",
    borderRadius: "md",
  }),
  md: defineStyle({
    fontSize: "md",
    px: "18px",
    h: "10",
    borderRadius: "md",
  }),
  sm: defineStyle({
    fontSize: "sm",
    px: "3",
    h: "8",
    borderRadius: "sm",
  }),
  xs: defineStyle({
    fontSize: "xs",
    px: "2",
    h: "6",
    borderRadius: "sm",
  }),
};

const sizes = {
  lg: definePartsStyle({
    field: size.lg,
    addon: size.lg,
  }),
  md: definePartsStyle({
    field: size.md,
    addon: size.md,
  }),
  sm: definePartsStyle({
    field: size.sm,
    addon: size.sm,
  }),
  xs: definePartsStyle({
    field: size.xs,
    addon: size.xs,
  }),
};

function getDefaults(props: Record<string, any>) {
  const { focusBorderColor: fc, errorBorderColor: ec } = props;
  return {
    focusBorderColor: fc || mode("blue.500", "blue.300")(props),
    errorBorderColor: ec || mode("red.500", "red.300")(props),
  };
}

const variantOutline = definePartsStyle((props) => {
  const { theme } = props;
  const { errorBorderColor: ec } = getDefaults(props);

  return {
    field: {
      h: "50px",
      border: "2px solid",
      borderColor: "#443F5B",
      fontFamily: "Inter",
      lineHeight: "1.33",
      fontWeight: "600",
      fontSize: "15px",
      maxWidth: "100%",
      background: "#2C273F",
      borderRadius: "8px",
      color: "white",
      _placeholderShown: {
        color: "text_Gray01",
      },
      _hover: {
        borderColor: "#8F8DB1",
      },
      _readOnly: {
        boxShadow: "none !important",
        userSelect: "all",
      },
      _invalid: {
        borderColor: getColor(theme, ec),
      },
      _focusVisible: {
        zIndex: 1,
        borderColor: "#8F8DB1",
        outline: "none",
      },
      _placeholder: {
        color: "#929292",
      },
    },
    addon: {
      border: "1px solid",
      borderColor: mode("inherit", "whiteAlpha.50")(props),
      bg: mode("gray.100", "whiteAlpha.300")(props),
    },
  };
});

const variantFilled = definePartsStyle((props) => {
  const { theme } = props;
  const { focusBorderColor: fc, errorBorderColor: ec } = getDefaults(props);

  return {
    field: {
      border: "2px solid",
      borderColor: "transparent",
      bg: mode("gray.100", "whiteAlpha.50")(props),
      _hover: {
        bg: mode("gray.200", "whiteAlpha.100")(props),
      },
      _readOnly: {
        boxShadow: "none !important",
        userSelect: "all",
      },
      _invalid: {
        borderColor: getColor(theme, ec),
      },
      _focusVisible: {
        bg: "transparent",
        borderColor: getColor(theme, fc),
      },
    },
    addon: {
      border: "2px solid",
      borderColor: "transparent",
      bg: mode("gray.100", "whiteAlpha.50")(props),
    },
  };
});

const variantFlushed = definePartsStyle((props) => {
  const { theme } = props;
  const { focusBorderColor: fc, errorBorderColor: ec } = getDefaults(props);

  return {
    field: {
      borderBottom: "1px solid",
      borderColor: "inherit",
      borderRadius: "0",
      px: "0",
      bg: "transparent",
      _readOnly: {
        userSelect: "all",
      },
      _invalid: {
        borderColor: getColor(theme, ec),
      },
      _focusVisible: {
        borderColor: getColor(theme, fc),
      },
    },
    addon: {
      borderBottom: "2px solid",
      borderColor: "inherit",
      borderRadius: "0",
      px: "0",
      bg: "transparent",
    },
  };
});

const variantUnstyled = definePartsStyle({
  field: {
    bg: "transparent",
    px: "12px",
    height: "100%",
    background: "#2C273F",
    boxSizing: "border-box",
    borderRadius: "0",
    border: "2px solid #2C273F",
    color: "#fff",
    _focus: {
      border: "2px solid #8F8DB1",
    },
    _placeholder: {
      color: "#929292",
    },
  },
  addon: {
    bg: "transparent",
    px: "0",
    height: "auto",
  },
});

const variantBlind = definePartsStyle({
  field: {
    pos: "absolute",
    w: "0",
    height: "0",
    bg: "transparent",
    p: "0",
    border: "0",
  },
  addon: {
    bg: "transparent",
    px: "0",
    height: "auto",
  },
});

const variants = {
  outline: variantOutline,
  filled: variantFilled,
  flushed: variantFlushed,
  unstyled: variantUnstyled,
  blind: variantBlind,
};

export const inputTheme = defineMultiStyleConfig({
  baseStyle,
  sizes,
  variants,
  defaultProps: {
    size: "md",
    variant: "outline",
  },
});
