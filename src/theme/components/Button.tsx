import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system";
import { mode, transparentize } from "@chakra-ui/theme-tools";

const isFunction = (value: any): value is Function => typeof value === "function";

export function runIfFn<T, U>(valueOrFn: T | ((...fnArgs: U[]) => T), ...args: U[]): T {
  return isFunction(valueOrFn) ? valueOrFn(...args) : valueOrFn;
}

const baseStyle = defineStyle({
  px: "0",
  lineHeight: "1.2",
  borderRadius: "6px",
  fontSize: "18px",
  fontWeight: "600",
  transitionProperty: "common",
  transitionDuration: "normal",
  _focusVisible: {
    boxShadow: "outline",
  },
  _disabled: {
    opacity: 0.4,
    cursor: "not-allowed",
    boxShadow: "none",
  },
});

const variantGhost = defineStyle((props) => {
  const { colorScheme: c, theme } = props;

  if (c === "gray") {
    return {
      color: "mode(`inherit`, `whiteAlpha.900`)(props)",
      _hover: {
        bg: mode(`gray.100`, `whiteAlpha.200`)(props),
      },
      _active: { bg: mode(`gray.200`, `whiteAlpha.300`)(props) },
    };
  }

  const darkHoverBg = transparentize(`${c}.200`, 0.12)(theme);
  const darkActiveBg = transparentize(`${c}.200`, 0.24)(theme);

  return {
    color: mode(`${c}.800`, `${c}.200`)(props),
    bg: "transparent",
    _hover: {
      bg: mode(`${c}.50`, darkHoverBg)(props),
    },
    _active: {
      bg: mode(`${c}.100`, darkActiveBg)(props),
    },
  };
});

const variantOutline = defineStyle((props) => {
  return {
    height: "52px",
    px: "22px",
    py: "12px",
    border: "2px solid",
    borderColor: "#706D82",
    color: "#fff",
    fontFamily: "Inter",
    fontWeight: "600",
    fontSize: "17px",
    borderRadius: "10px",
    ".chakra-button__group[data-attached] > &:not(:last-of-type)": {
      marginEnd: "-1px",
    },
    ...runIfFn(variantGhost, props),
    _hover: {
      borderColor: "login_BOXline_hover",
      _disabled: {
        borderWidth: "1px",
      },
    },
  };
});
const variantOutlineBlue = defineStyle((props) => {
  return {
    height: "52px",
    px: "22px",
    py: "12px",
    border: "2px solid",
    borderColor: "#8F8DB1",
    color: "#fff",
    fontFamily: "Inter",
    fontWeight: "600",
    fontSize: "17px",
    ".chakra-button__group[data-attached] > &:not(:last-of-type)": {
      marginEnd: "-1px",
    },
    ...runIfFn(variantGhost, props),
    _hover: {
      borderColor: "login_BOXline_hover",
      _disabled: {
        borderWidth: "1px",
      },
    },
  };
});

const variantSolid = defineStyle((props) => {
  const { colorScheme: c } = props;

  if (c === "gray") {
    const bg = mode(`gray.100`, `whiteAlpha.200`)(props);

    return {
      bg,
      _hover: {
        bg: mode(`gray.200`, `whiteAlpha.300`)(props),
        _disabled: {
          bg,
        },
      },
      _active: { bg: mode(`gray.300`, `whiteAlpha.400`)(props) },
    };
  }

  return {
    bg: "inhert",
    _hover: {
      bg: "_dark",
      _disabled: {
        bg: "_dark",
      },
    },
    _active: { bg: "inhert" },
  };
});

const variantPrimary = defineStyle({
  h: "52px",
  lineHeight: "1.2",
  borderRadius: "10px",
  fontSize: "17px",
  fontWeight: "600",
  bg: "#6F36FF",
  color: "#fff",
  _hover: {
    bg: "#8A5EF9",
    _disabled: {
      bg: "#6F36FF",
    },
  },
  _disabled: {
    bg: "#6F36FF",
    opacity: "0.5",
  },
  _focusVisible: {
    zIndex: 1,
    borderColor: "login_BOXline_hover",
    outline: "none",
  },
  _active: {
    borderColor: "login_BOXline_hover",
    outline: "none",
  },
});

const variantGray = defineStyle({
  background: "#443F5B",
  borderRadius: "10px",
  w: "135px",
  h: "52px",
  p: "14px 30px",
  fontSize: "17px",
  fontWeight: "600",
  color: "White",
  _hover: {
    bg: "#3D3755",
    color: "White",
  },
  _disabled: {
    bg: "#443F5B",
    color: "#8F8DB1",
  },
});

const variantGray2 = defineStyle({
  background: "#46405F",
  borderRadius: "6px",
  w: "135px",
  h: "52px",
  mt: "15px !important",
  p: "14px 30px",
  fontSize: "16px",
  fontWeight: "600",
  color: "White",
  _hover: {
    bg: "#626086",
    color: "#fff",
  },
});
const variantGray3 = defineStyle({
  background: "#3D3755",
  borderRadius: "8px",
  w: "135px",
  h: "52px",
  p: "14px 30px",
  fontSize: "16px",
  fontWeight: "600",
  color: "White",
  _hover: {
    bg: "#626086",
    color: "#9F9FBA",
  },
  _active: {
    bg: "#6F36FF",
    color: "#fff",
  },
});

const variantGray4 = defineStyle({
  background: "popup_B01",
  p: "0",
  color: "White",
  borderRadius: "0",
  _hover: {
    bg: "#2C273F",
  },
});

const variantLink = defineStyle((props) => {
  const { colorScheme: c } = props;
  return {
    padding: 0,
    height: "auto",
    lineHeight: "normal",
    verticalAlign: "baseline",
    color: mode(`${c}.500`, `${c}.200`)(props),
    _hover: {
      textDecoration: "underline",
      _disabled: {
        textDecoration: "none",
      },
    },
    _active: {
      color: mode(`${c}.700`, `${c}.500`)(props),
    },
  };
});

const variantInput = defineStyle({
  w: "100%",
  h: "50px",
  pl: "18px",
  pr: "10px",
  border: "2px solid",
  borderColor: "login_BOXline",
  fontFamily: "Inter",
  lineHeight: "1.33",
  fontWeight: "400",
  fontSize: "15px",
  color: "text_Gray01",
  maxWidth: "100%",
  background: "input_BOXbg",
  borderRadius: "8px",
  textAlign: "left",
  _hover: {
    borderColor: "login_BOXline_hover",
  },
  _focusVisible: {
    zIndex: 1,
    borderColor: "login_BOXline_hover",
    outline: "none",
  },
  _active: {
    borderColor: "login_BOXline_hover",
    outline: "none",
  },
});

const variantPlus = defineStyle({
  flexShrink: "0",
  w: "58px",
  h: "58px",
  p: "0",
  fontFamily: "Inter",
  lineHeight: "1.33",
  fontWeight: "600",
  fontSize: "15px",
  color: "White",
  background: "#3D3755",
  borderRadius: "10px",
  _hover: {
    borderColor: "login_BOXline_hover",
  },
  _focusVisible: {
    zIndex: 1,
    borderColor: "login_BOXline_hover",
    outline: "none",
  },
  _active: {
    borderColor: "login_BOXline_hover",
    outline: "none",
  },
});

const variantCircle = defineStyle({
  flexShrink: "0",
  w: "48px",
  h: "48px",
  p: "0",
  fontFamily: "Inter",
  lineHeight: "1.33",
  fontWeight: "600",
  fontSize: "15px",
  color: "White",
  background: "transparant",
  borderRadius: "48px",
  _hover: {
    bg: "#443F5B",
  },
  _focusVisible: {
    zIndex: 1,
    bg: "#443F5B",
    outline: "none",
  },
  _active: {
    bg: "#443F5B",
    outline: "none",
  },
});

const variantUnstyled = defineStyle({
  bg: "none",
  color: "inherit",
  display: "inline",
  lineHeight: "inherit",
  m: "0",
  p: "0",
});

const variantTooltip = defineStyle((props) => {
  return {
    minW: "30px",
    w: "19px",
    h: "19px",
    p: "0",
    border: "none",
    color: "#929292",
    fontWeight: "300",
    fontSize: "19px",
    ".chakra-button__group[data-attached] > &:not(:last-of-type)": {
      marginEnd: "-1px",
    },
    ...runIfFn(variantGhost, props),
    _hover: {
      borderColor: "login_BOXline_hover",
      _disabled: {
        borderWidth: "1px",
      },
    },
  };
});

const variants = {
  primary: variantPrimary,
  ghost: variantGhost,
  outline: variantOutline,
  outlineBlue: variantOutlineBlue,
  solid: variantSolid,
  link: variantLink,
  unstyled: variantUnstyled,
  input: variantInput,
  plus: variantPlus,
  tooltip: variantTooltip,
  circle: variantCircle,
  gray: variantGray,
  gray2: variantGray2,
  gray3: variantGray3,
  gray4: variantGray4,
};

const sizes = {
  lg: defineStyle({
    h: "54px",
    minW: "135px",
    fontSize: "18px",
    px: "30px",
    lineHeight: "54px",
  }),
  md: defineStyle({
    h: "48px",
    minW: "103px",
    fontSize: "15px",
    px: "18px",
    lineHeight: "48px",
  }),
  sm: defineStyle({
    h: "54px",
    minW: "12",
    fontSize: "18px",
    px: "0",
    lineHeight: "54px",
  }),
  xs: defineStyle({
    h: "6",
    minW: "6",
    fontSize: "xs",
    px: "2",
  }),
};

export const buttonTheme = defineStyleConfig({
  baseStyle,
  variants,
  sizes,
  defaultProps: {
    variant: "solid",
    size: "sm",
    colorScheme: "whiteAlpha",
  },
});
