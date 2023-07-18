import React from "react";

import { Box, Text } from "@chakra-ui/react";
import { InfoOutlineIcon } from "@chakra-ui/icons";

interface TooltipInfoProps {
  onClick?: () => void;
}
export default function TooltipInfo({ onClick }: TooltipInfoProps) {
  return (
    <Box as="span" pos="relative">
      <InfoOutlineIcon
        style={{ cursor: "pointer" }}
        color="text_Gray01"
        fontSize="19px"
        m="-2px 0 0 5px"
        onClick={onClick}
      />
      <Box
        display="none"
        pos="absolute"
        top={["-50px", "-50px", "-50px", "50%"]}
        left={["50%", "50%", "50%", "40px"]}
        transform={[
          "translate(-50%, 0)",
          "translate(-50%, 0)",
          "translate(-50%, 0)",
          "translate(0, -46%)",
        ]}
        py="10px"
        px="18px"
        bg="#443F5B"
        borderRadius="8px"
      >
        <Box
          pos="absolute"
          top={["32px", "32px", "32px", "1px"]}
          left={["44%", "44%", "44%", "-3px"]}
          transform={[
            "rotate(180deg) scaleY(1) translateX(-50%)",
            "rotate(180deg) scaleY(1) translateX(-40%)",
            "rotate(180deg) scaleY(1) translateX(-40%)",
            "rotate(35deg) scaleY(1.7)",
          ]}
          color="#443F5B"
        >
          <span className="material-symbols-outlined fill" style={{ margin: 0 }}>
            change_history
          </span>
        </Box>
        <Text variant="txt156" whiteSpace="nowrap">
          This is a verified account.{" "}
          <Box as="span" color="#A796FF">
            Learn more
          </Box>
        </Text>
      </Box>
    </Box>
  );
}
// top="6px" left="40px"
