import React from "react";
import { Box } from "@chakra-ui/react";
import LevelsItem from "./LevelsItem";
import { AssetOption } from "../../pages/asset/createAsset";

export interface AssetItemBorderProps {
  item?: AssetOption;
}

export default function LevelsItemBorder({ item }: AssetItemBorderProps) {
  return (
    <Box
      w="100%"
      maxW="430px"
      px="15px"
      borderWidth="1px"
      borderColor="popup_B01"
      borderRadius="8px"
    >
      <LevelsItem item={item} />
    </Box>
  );
}
