import React from "react";
import { Flex, Spacer, Text, VStack } from "@chakra-ui/react";
import { BorderProps } from "../index";
import { AssetOption } from "../../pages/asset/createAsset";

interface ItemBorderProps extends BorderProps {
  item?: AssetOption;
}
export default function StatsItem({ borderVisible = false, item }: ItemBorderProps) {
  return (
    <VStack
      spacing={1}
      borderRadius="8px"
      w="100%"
      py="15px"
      background={borderVisible ? "Back_BGBLACK" : undefined}
      borderColor="popup_B01"
      borderWidth={borderVisible ? "1px" : "0px"}
    >
      <Flex w="100%">
        <Text variant="txt155">{item?.type}</Text>
        <Spacer />
        <Text variant="txt155">{`${item?.numerator} of ${item?.denominator}`}</Text>
      </Flex>
    </VStack>
  );
}
