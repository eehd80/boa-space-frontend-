import { modalAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, defineStyle } from "@chakra-ui/styled-system";
import { runIfFn } from "../../utils/run-if-fn";

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(parts.keys);

const baseStyleOverlay = defineStyle({
  mt: "72px",
  bg: "rgba(0, 0, 0, 0.7)",
  zIndex: "modal",
});

const baseStyleDialog = defineStyle((props) => {
  props;
  return {
    mt: "72px",
    bg: "#19182F",
    color: "inherit",
    zIndex: "modal",
    border: "1px solid",
    borderColor: "#221F3D",
  };
});

const baseStyleCloseButton = defineStyle({
  position: "absolute",
  top: "11px",
  right: "7px",
  insetEnd: "3",
  borderRadius: "6px",
  w: "50px",
  h: "50px",
  zIndex: "10000",
  transform: "scale(0.7)",
  color: "text_Gray02",
  bg: "transparent",
  svg: {
    w: "20px",
    h: "20px",
  },
});

const baseStyleBody = defineStyle((props) => {
  const { scrollBehavior } = props;
  return {
    px: "0",
    py: "0",
    bg: "popup_BBG",
    flex: "1",
    overflow: scrollBehavior === "inside" ? "auto" : undefined,
  };
});

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
    dialog: { maxW: "428px" },
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

const baseStyle = definePartsStyle((props) => ({
  overlay: baseStyleOverlay,
  dialog: runIfFn(baseStyleDialog, props),
  closeButton: baseStyleCloseButton,
  body: runIfFn(baseStyleBody, props),
}));

export const drawertheme = defineMultiStyleConfig({
  baseStyle,
  sizes,
  defaultProps: { size: "sm" },
});
