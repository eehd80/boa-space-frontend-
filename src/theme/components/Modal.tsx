import { modalAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, defineStyle } from "@chakra-ui/styled-system";
import { mode } from "@chakra-ui/theme-tools";
import { runIfFn } from "../../utils/run-if-fn";

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(parts.keys);

const baseStyleOverlay = defineStyle({
  bg: "rgba(0, 0, 0, 0.7)",
  zIndex: "modal",
});

const baseStyleDialogContainer = defineStyle((props) => {
  const { isCentered, scrollBehavior } = props;

  return {
    display: "flex",
    zIndex: "modal",
    justifyContent: "center",
    alignItems: isCentered ? "center" : "flex-start",
    overflow: scrollBehavior === "inside" ? "hidden" : "auto",
    px: "18px",
  };
});

const baseStyleDialog = defineStyle((props) => {
  return {
    borderRadius: "15px",
    bg: "#3D3755",
    color: "inherit",
    mx: "18px",
    my: "100px",
    zIndex: "modal",
    boxShadow: mode("lg", "dark-lg")(props),
    py: "25px",
    px: "15px",
    textAlign: "center",
  };
});

const baseStyleHeader = defineStyle({
  mx: "auto",
  mb: "17px",
  py: "0",
  px: "40px",
  fontSize: "22px",
  fontWeight: "600",
});

const baseStyleCloseButton = defineStyle({
  position: "absolute",
  top: "18px",
  right: "15px",
  insetEnd: "3",
  color: "#9F9FBA",
  transition: "0.5s",
  svg: {
    w: "13px",
    h: "13px",
  },
  _hover: {
    transform: "rotate(180deg)",
  },
});

const baseStyleBody = defineStyle(() => {
  return {
    p: "0",
    flex: "1",
    fontSize: "18px",
    fontWeight: "500",
    lineHeight: "26px",
    color: "#C4C4D3",
    // overflow: scrollBehavior === "inside" ? "auto" : undefined,
    // overflowY: "auto",
    "&::-webkit-scrollbar": {
      overflow: "hidden",
      width: "7px",
      paddingRight: "3px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "black",
      width: "7px",
      borderRadius: "5px",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "transparent",
    },
  };
});

const baseStyleFooter = defineStyle({
  p: "0",
});

const baseStyle = definePartsStyle((props) => ({
  overlay: baseStyleOverlay,
  dialogContainer: runIfFn(baseStyleDialogContainer, props),
  dialog: runIfFn(baseStyleDialog, props),
  header: baseStyleHeader,
  closeButton: baseStyleCloseButton,
  body: runIfFn(baseStyleBody),
  footer: baseStyleFooter,
}));

/**
 * Since the `maxWidth` prop references theme.sizes internally,
 * we can leverage that to size our modals.
 */
function getSize(value: string) {
  if (value === "full") {
    return definePartsStyle({
      dialog: {
        maxW: "100vw",
        minH: "$100vh",
        my: "0",
        borderRadius: "0",
      },
    });
  }
  return definePartsStyle({
    dialog: { maxW: "546" },
  });
}

const sizes = {
  xs: getSize("xs"),
  sm: getSize("sm"),
  md: getSize("md"),
  lg: getSize("lg"),
  xl: getSize("xl"),
  "2xl": getSize("2xl"),
  "3xl": getSize("3xl"),
  "4xl": getSize("4xl"),
  "5xl": getSize("5xl"),
  "6xl": getSize("6xl"),
  full: getSize("full"),
};

export const modalTheme = defineMultiStyleConfig({
  baseStyle,
  sizes,
  defaultProps: { size: "md" },
});
