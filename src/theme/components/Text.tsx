import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system";
const brandPrimary = defineStyle({
  color: "blue.500",
  // let's also provide dark mode alternatives
  _dark: {
    color: "blue.300",
  },
});

const txt325 = defineStyle({
  fontSize: "32px",
  fontWeight: "500",
  fontFamily: "Inter",
  lineHeight: "1.1",
  color: "White",
});

const txt306 = defineStyle({
  fontSize: "30px",
  fontWeight: "600",
  fontFamily: "Inter",
  lineHeight: "1.1",
});

const txt286 = defineStyle({
  fontSize: "28px",
  fontWeight: "600",
  fontFamily: "Inter",
});

const txt246 = defineStyle({
  fontSize: "24px",
  fontWeight: "600",
  fontFamily: "Inter",
});

const txt226 = defineStyle({
  fontSize: "22px",
  fontWeight: "600",
  fontFamily: "Inter",
});

const txt216 = defineStyle({
  fontSize: "21px",
  fontWeight: "600",
  fontFamily: "Inter",
});

const txt206 = defineStyle({
  fontSize: "20px",
  fontWeight: "600",
  fontFamily: "Inter",
});

const txt205 = defineStyle({
  fontSize: "20px",
  fontWeight: "500",
  fontFamily: "Inter",
});

const txt187 = defineStyle({
  fontSize: "18px",
  fontWeight: "700",
  fontFamily: "Inter",
});

const txt177 = defineStyle({
  mt: "7px",
  fontSize: "17px",
  lineHeight: "23px",
  fontWeight: "700",
  fontFamily: "Inter",
});

const txt176 = defineStyle({
  mt: "7px",
  fontSize: "17px",
  lineHeight: "23px",
  fontWeight: "600",
  fontFamily: "Inter",
});

const txt174 = defineStyle({
  mt: "7px",
  fontSize: "17px",
  lineHeight: "23px",
  fontWeight: "400",
  fontFamily: "Inter",
  color: "text_Gray02",
});
const txt172 = defineStyle({
  mt: "7px",
  fontSize: "17px",
  lineHeight: "23px",
  fontWeight: "200",
  fontFamily: "Inter",
  color: "text_Gray02",
});

const txt167 = defineStyle({
  fontSize: "16px",
  fontWeight: "700",
  fontFamily: "Inter",
});

const txt166 = defineStyle({
  fontSize: "16px",
  fontWeight: "600",
  fontFamily: "Inter",
});

const txt165 = defineStyle({
  fontSize: "16px",
  fontWeight: "500",
  fontFamily: "Inter",
});

const txt164 = defineStyle({
  fontSize: "16px",
  fontWeight: "400",
  fontFamily: "Inter",
  color: "text_Gray02",
});

const txt157 = defineStyle({
  fontSize: "15px",
  fontWeight: "700",
  fontFamily: "Inter",
});

const txt156 = defineStyle({
  fontSize: "15px",
  fontWeight: "600",
  fontFamily: "Inter",
});

const txt155 = defineStyle({
  fontSize: "15px",
  fontWeight: "500",
  fontFamily: "Inter",
  color: "#9F9FBA",
});

const txt154 = defineStyle({
  fontSize: "15px",
  fontWeight: "400",
  fontFamily: "Inter",
  lineHeight: "20px",
});

const txt147 = defineStyle({
  fontSize: "14px",
  fontWeight: "700",
  fontFamily: "Inter",
});
const txt146 = defineStyle({
  fontSize: "14px",
  fontWeight: "600",
  fontFamily: "Inter",
});

const txt145 = defineStyle({
  fontSize: "14px",
  fontWeight: "500",
  fontFamily: "Inter",
});

const txt144 = defineStyle({
  fontSize: "14px",
  fontWeight: "400",
  fontFamily: "Inter",
});

const txt137 = defineStyle({
  fontSize: "13px",
  fontWeight: "700",
  fontFamily: "Inter",
});

const txt136 = defineStyle({
  fontSize: "13px",
  fontWeight: "600",
  fontFamily: "Inter",
});

const txt134 = defineStyle({
  fontSize: "13px",
  fontWeight: "400",
  fontFamily: "Inter",
});

const txt126 = defineStyle({
  fontSize: "12px",
  fontWeight: "600",
  fontFamily: "Inter",
});
const txt124 = defineStyle({
  fontSize: "12px",
  fontWeight: "400",
  fontFamily: "Inter",
  color: "text_Gray02",
});

const txt115 = defineStyle({
  fontSize: "11px",
  fontWeight: "500",
  fontFamily: "Inter",
});

const txt114 = defineStyle({
  fontSize: "11px",
  fontWeight: "400",
  fontFamily: "Inter",
});
const txt113 = defineStyle({
  fontSize: "11px",
  fontWeight: "300",
  fontFamily: "Inter",
});

export const textTheme = defineStyleConfig({
  variants: {
    brand: brandPrimary,
    txt325: txt325,
    txt306: txt306,
    txt286: txt286,
    txt246: txt246,
    txt226: txt226,
    txt216: txt216,
    txt206: txt206,
    txt205: txt205,
    txt187: txt187,
    txt177: txt177,
    txt176: txt176,
    txt174: txt174,
    txt172: txt172,
    txt167: txt167,
    txt166: txt166,
    txt165: txt165,
    txt164: txt164,
    txt157: txt157,
    txt156: txt156,
    txt155: txt155,
    txt154: txt154,
    txt147: txt147,
    txt146: txt146,
    txt145: txt145,
    txt144: txt144,
    txt137: txt137,
    txt136: txt136,
    txt134: txt134,
    txt126: txt126,
    txt124: txt124,
    txt115: txt115,
    txt114: txt114,
    txt113: txt113,
  },
});
