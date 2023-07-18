import React from "react";
import { Stack, Text } from "@chakra-ui/react";
import { BorderProps } from "../index";
import { AssetOption } from "../../pages/asset/createAsset";

interface PropertiesItemProps extends BorderProps {
  property?: AssetOption;
}

export default function PropertiesItem({ borderVisible = true, property }: PropertiesItemProps) {
  return (
    <Stack
      minWidth="150px"
      px="10px"
      py="10px"
      borderRadius="6px"
      justify="flex-start"
      align="center"
      spacing="1px"
      borderColor="Secondary_V"
      borderWidth={borderVisible ? "1px" : "0px"}
      background="rgba(167, 150, 255, 0.15)"
    >
      <Text variant="txt115" color="Secondary_V">
        {property?.type}
      </Text>
      <Text
        variant="txt167"
        w="90%"
        overflow="hidden"
        textOverflow="ellipsis"
        whiteSpace="nowrap"
        textAlign="center"
      >
        {property?.name}
      </Text>
      {/*<Text*/}
      {/*  variant="txt134"*/}
      {/*  color="text_Gray02"*/}
      {/*  w="90%"*/}
      {/*  overflow="hidden"*/}
      {/*  textOverflow="ellipsis"*/}
      {/*  textAlign="center"*/}
      {/*>*/}
      {/*  2% have this trait*/}
      {/*</Text>*/}
    </Stack>
  );
}
