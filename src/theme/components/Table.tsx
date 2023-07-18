import { tableAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, defineStyle } from "@chakra-ui/styled-system";
import { mode } from "@chakra-ui/theme-tools";

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  table: {
    fontVariantNumeric: "lining-nums tabular-nums",
    borderCollapse: "collapse",
    width: "full",
  },
  thead: {
    th: {
      h: "20px",
      px: "20px",
      boxSizing: "border-box",
      borderBottom: "1px",
      borderColor: "popup_BBG",
      fontWeight: "500",
      fontSize: "14px",
      letterSpacing: "-0.5px",
      textAlign: "start",
      color: "#9F9FBA",
      textTransform: "none",
      paddingLeft: "15px",
      paddingRight: "15px",
    },
    caption: {
      mt: 4,
      fontFamily: "heading",
      textAlign: "center",
      fontWeight: "medium",
    },
  },
  tbody: {
    tr: {
      th: {
        px: "20px",
        borderBottomWidth: "1px",
        borderColor: "popup_BBG",
        fontFamily: "Inter",
        fontSize: "15px",
        fontWeight: "700",
        letterSpacing: "-0.5px",
        color: "White",
        textTransform: "capitalize",
        boxSizing: "border-box",
        "img, .material-symbols-outlined": {
          display: "inline-block",
          width: "25px",
          marginRight: "5px",
          verticalAlign: "middle",
        },
      },
      td: {
        px: "20px",
        boxSizing: "border-box",
        borderBottomWidth: "1px",
        borderColor: "popup_BBG",
        fontFamily: "Inter",
        fontSize: "15px",
        fontWeight: "500",
        letterSpacing: "-0.5px",
        whiteSpace: "nowrap",
        paddingLeft: "15px",
        paddingRight: "15px",
        ".blue": {
          color: "#A796FF",
        },
        ".ellipsis": {
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
        ".btn": {
          w: "75px",
          h: "37px",
          p: "2px 0 0",
          span: {
            w: "15px",
            m: "0 7px 0 -4px",
            // "&:nth-child(2)": {
            //   m: "0",
            // },
          },
        },
        img: {
          display: "inline-block",
          marginRight: "5px",
          verticalAlign: "middle",
        },
        ".tooltip": {
          color: "Point_Red",
        },
      },
      "&:last-child": {
        th: {
          borderWidth: "0",
        },
        td: {
          borderWidth: "0",
        },
      },
      _hover: {
        bg: "popup_hover",
      },
    },
  },
});

const numericStyles = defineStyle({
  "&[data-is-numeric=true]": {
    textAlign: "end",
  },
});

const variantSimple = definePartsStyle((props) => {
  const { colorScheme: c } = props;

  return {
    th: {
      color: mode("gray.600", "gray.400")(props),
      borderBottom: "1px",
      borderColor: mode(`${c}.100`, `${c}.700`)(props),
      ...numericStyles,
    },
    td: {
      borderBottom: "1px",
      borderColor: mode(`${c}.100`, `${c}.700`)(props),
      ...numericStyles,
    },
    caption: {
      color: mode("gray.600", "gray.100")(props),
    },
    tfoot: {
      tr: {
        "&:last-of-type": {
          th: { borderBottomWidth: 0 },
        },
      },
    },
  };
});

const variantMain = definePartsStyle({
  table: {
    fontVariantNumeric: "lining-nums tabular-nums",
    borderCollapse: "collapse",
    width: "full",
  },
  thead: {
    th: {
      h: "20px",
      px: "20px",
      boxSizing: "border-box",
      borderBottom: "1px",
      borderColor: "popup_BBG",
      fontWeight: "500",
      fontSize: "15px",
      letterSpacing: "-0.5px",
      textAlign: "start",
      color: "#fff",
      textTransform: "none",
    },
    caption: {
      mt: 4,
      fontFamily: "heading",
      textAlign: "center",
      fontWeight: "medium",
    },
  },
  tbody: {
    tr: {
      th: {
        px: "20px",
        borderBottomWidth: "1px",
        borderColor: "popup_BBG",
        fontFamily: "Inter",
        fontSize: "15px",
        fontWeight: "600",
        letterSpacing: "-0.5px",
        color: "White",
        textTransform: "capitalize",
        boxSizing: "border-box",
        "img, .material-symbols-outlined": {
          display: "inline-block",
          width: "25px",
          marginRight: "5px",
          verticalAlign: "middle",
        },
      },
      td: {
        px: "20px",
        boxSizing: "border-box",
        borderBottomWidth: "1px",
        borderColor: "popup_BBG",
        fontFamily: "Inter",
        fontSize: "14px",
        fontWeight: "400",
        letterSpacing: "-0.5px",
        whiteSpace: "nowrap",
        ".blue": {
          color: "#A796FF",
        },
        ".ellipsis": {
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
        ".btn": {
          w: "75px",
          h: "37px",
          p: "2px 0 0",
          span: {
            w: "15px",
            m: "0 7px 0 -4px",
            // "&:nth-child(2)": {
            //   m: "0",
            // },
          },
        },
        img: {
          display: "inline-block",
          marginRight: "5px",
          verticalAlign: "middle",
        },
        ".tooltip": {
          color: "Point_Red",
        },
      },
      "&:last-child": {
        th: {
          borderWidth: "0",
        },
        td: {
          borderWidth: "0",
        },
      },
    },
  },
});

const variants = {
  simple: variantSimple,
  main: variantMain,
  unstyled: defineStyle({}),
};

const sizes = {
  sm: definePartsStyle({
    th: {
      px: "4",
      py: "1",
      lineHeight: "4",
      fontSize: "xs",
    },
    td: {
      px: "4",
      py: "2",
      fontSize: "sm",
      lineHeight: "4",
    },
    caption: {
      px: "4",
      py: "2",
      fontSize: "xs",
    },
  }),
  md: definePartsStyle({
    th: {
      h: "56px",
      px: "3",
      py: "2",
      lineHeight: "4",
      fontSize: "xs",
    },
    td: {
      h: "56px",
      px: "3",
      py: "3",
      lineHeight: "5",
    },
    caption: {
      px: "6",
      py: "2",
      fontSize: "sm",
    },
  }),
  lg: definePartsStyle({
    th: {
      px: "8",
      py: "4",
      lineHeight: "5",
      fontSize: "sm",
    },
    td: {
      px: "8",
      py: "5",
      lineHeight: "6",
    },
    caption: {
      px: "6",
      py: "2",
      fontSize: "md",
    },
  }),
};

export const tableTheme = defineMultiStyleConfig({
  baseStyle,
  variants,
  sizes,
  defaultProps: {
    variant: "simple",
    size: "md",
    colorScheme: "gray",
  },
});
