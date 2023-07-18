import React from "react";
import { Box } from "@chakra-ui/react";
import StatsItem from "../../components/assets/StatsItem";
import { AssetItemBorderProps } from "./LevelsItemBorder";

export default function StatsItemBorder({ item }: AssetItemBorderProps) {
  return (
    <Box
      w="100%"
      maxW="430px"
      px="15px"
      borderWidth="1px"
      borderColor="popup_B01"
      borderRadius="8px"
    >
      <StatsItem item={item} />
    </Box>
  );
}
