import React from "react";
import { Stack, Text } from "@chakra-ui/react";
import { useActiveState } from "../../hooks/useActiveState";

// menu에 있는거 보고 넣었는데 이상합니다 ㅋ

export default function Favorite() {
  const { online } = useActiveState();
  return (
    <>
      {online ? (
        // 비활성화
        <Stack
          direction="row"
          justify="flex-end"
          align="center"
          spacing="0px"
          w="100%"
          h="45px"
          px="16px"
          bg="popup_BBG"
          borderBottom="1px solid;"
          borderColor="popup_B01"
        >
          <Text variant="txt136" color="text_Gray02" mr="10px">
            3
          </Text>
          <span className="material-symbols-outlined" style={{ color: "#9F9FBA" }}>
            favorite
          </span>
        </Stack>
      ) : (
        // 활성화
        <Stack
          direction="row"
          justify="flex-end"
          align="center"
          spacing="0px"
          w="100%"
          h="45px"
          px="16px"
          bg="popup_BBG"
          borderBottom="1px solid;"
          borderColor="popup_B01"
        >
          <Text variant="txt136" color="Point_Red" mr="10px">
            3
          </Text>
          <span className="material-symbols-outlined fill" style={{ color: "#E0002B" }}>
            favorite
          </span>
        </Stack>
      )}
    </>
  );
}
// top="6px" left="40px"
