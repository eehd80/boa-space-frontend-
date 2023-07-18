import React from "react";
import { VStack, Text, Flex, Spacer, Progress } from "@chakra-ui/react";
import { BorderProps } from "../index";
import { AssetOption } from "../../pages/asset/createAsset";

interface ItemBorderProps extends BorderProps {
  item?: AssetOption;
}
export default function LevelsItem({ borderVisible = false, item }: ItemBorderProps) {
  return (
    // className 추가삭제할 수 있도록 부탁드립니다.
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
      <Progress max={item?.denominator} min={0} value={item?.numerator} />
    </VStack>
  );
}
