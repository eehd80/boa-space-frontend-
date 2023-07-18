import { extendTheme } from "@chakra-ui/react";
import { tabsTheme } from "./components/Tabs";
import { buttonTheme } from "./components/Button";
import { alertTheme } from "./components/Alert";
import { headingTheme } from "./components/Heading";
import { textTheme } from "./components/Text";
import { inputTheme } from "./components/Form/Input";
import { formTheme } from "./components/Form/FormControl";
import { modalTheme } from "./components/Modal";
import { drawertheme } from "./components/Drawer";
import { containerTheme } from "./components/Container";
import { CalendarDefaultTheme } from "@uselessdev/datepicker";
import { textareaTheme } from "./components/Form/Textarea";
import { selectTheme } from "./components/Form/Select";
import { menuTheme } from "./components/Menu";
import "@fontsource/inter";
import { dividerTheme } from "./components/divider";
import { progressTheme } from "./components/progress";
import { numberInputTheme } from "./components/Form/number-input";
import { tableTheme } from "./components/Table";
import { accordionTheme } from "./components/Accordion";
import { checkboxTheme } from "./components/checkbox";
import { tooltipTheme } from "./components/tooltip";
import { badgeTheme } from "./components/Badge";
import { radioTheme } from "./components/radio";

const breakpoints = {
  sm: "428px",
  md: "744px",
  lg: "1024px",
  xl: "1280px",
  xxl: "1920px",
};

export const theme = extendTheme(CalendarDefaultTheme, {
  breakpoints,
  components: {
    Tabs: tabsTheme,
    Button: buttonTheme,
    Alert: alertTheme,
    Heading: headingTheme,
    Text: textTheme,
    Input: inputTheme,
    Form: formTheme,
    Modal: modalTheme,
    Drawer: drawertheme,
    Container: containerTheme,
    Textarea: textareaTheme,
    Select: selectTheme,
    Menu: menuTheme,
    Divider: dividerTheme,
    Progress: progressTheme,
    NumberInput: numberInputTheme,
    Table: tableTheme,
    Accordion: accordionTheme,
    Checkbox: checkboxTheme,
    Tooltip: tooltipTheme,
    Badge: badgeTheme,
    Radio: radioTheme,
    Calendar: {
      parts: ["calendar"],
      baseStyle: {
        calendar: {
          borderWidth: "0px",
          rounded: "none",
          shadow: "none",
          w: "min-content",
        },
        months: {
          p: 4,
          w: "100%",
          gridTemplateColumns: "1fr 1fr",
        },
      },
    },
    CalendarMonth: {
      parts: ["week", "weekday"],
    },
    CalendarDay: {
      baseStyle: {
        rounded: "7px",
        fontSize: "13px",
        margin: "1px",
        _hover: {
          bgColor: "gray.100",
          color: "#2D2A5C",
        },
      },
      sizes: {
        md: {
          h: 9,
          w: 9,
        },
      },
      variants: {
        selected: {
          bgColor: "#D9D9D9",
          color: "#2D2A5C",
          _hover: {
            bgColor: "gray.100",
          },
        },
        range: {
          bgColor: "#D9D9D9",
          color: "#2D2A5C",
          _hover: {
            bgColor: "gray.100",
          },
          _disabled: {
            _hover: {
              bgColor: "#D9D9D9",
            },
          },
        },
      },
    },
    CalendarControl: {
      parts: ["button"],
      baseStyle: {
        button: {
          h: 6,
          px: 1,
          rounded: "none",
          fontSize: "13px",
          color: "#2D2A5C",
          bgColor: "#D9D9D9",
          _hover: {
            bgColor: "gray.100",
          },
          _focus: {
            outline: "none",
          },
        },
      },
    },
  },
  styles: {
    global: {
      // styles for the `body`
      body: {
        bg: "#151225",
        color: "var(--chakra-colors-white);",
        fontFamily: "Inter",
        fontSize: "16px",
        fontWeight: "400",
      },
      // styles for the `a`
      a: {
        // color: "var(--chakra-colors-white);",
        _hover: {
          textDecoration: "none !important",
        },
      },
      li: {
        listStyle: "none",
      },
    },
  },
  space: {
    4: "25px",
  },
  colors: {
    bg: "#151225",
    text_Gray01: "#929292",
    text_Gray02: "#9F9FBA",
    Secondary_V: "#A796FF",
    primary_V: "#6F36FF",
    Point_Red: "#E0002B",
    point02: "#FF6D3F",
    point_Green: "#00A5BC",
    BG_V: "#141225",
    BG_MainBOX: "#2D2A5C",
    login_BGBOX: "#19182F",
    input_BOXbg: "#2C273F",
    login_BOXline: "#443F5B",
    login_BOXline_hover: "#8F8DB1",
    mocup_bg: "#ECECEC",
    mocup_line: "#D1D1D1",
    mocup_text: "#929292",
    popup_B01: "#443F5B",
    popup_hover: "#2C273F",
    popup_BBGG: "#46405F",
    popup_BBG: "#3D3755",
    L_Gray_T01: "#BCBCCC",
    Back_BGBLACK: "#141225",
    boa: {
      1: "#5919FB",
      2: "#b4a5ff",
      3: "#2d2a5c",
    },
  },
});
