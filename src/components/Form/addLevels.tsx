import React from "react";
import { CloseIcon } from "@chakra-ui/icons";

import { HStack, Input, InputGroup, InputLeftAddon, Text } from "@chakra-ui/react";
import { AssetOption } from "../../pages/asset/createAsset";

interface AddLevelProps {
  onDelete: any;
  onUpdate: any;
  level: AssetOption;
}
export default function AddLevels({ onDelete, onUpdate, level }: AddLevelProps) {
  return (
    <HStack mt="10px !important" spacing="1px">
      <InputGroup
        display="flex"
        overflow="hidden"
        w="53%"
        h="50px"
        mr="2px"
        borderRadius="8px 0px 0px 8px"
        border="2px solid #443F5B"
        boxSizing="border-box"
      >
        <InputLeftAddon
          bg="#443F5B"
          width="48px"
          height="100%"
          borderRadius="0"
          border="none"
          cursor="pointer"
          onClick={() => onDelete(level)}
        >
          <CloseIcon w="13" h="13" color="#C4C4D3" />
        </InputLeftAddon>
        <Input
          type="text"
          placeholder="Speed"
          flexGrow="1"
          variant="unstyled"
          name="type"
          onChange={(e) => {
            onUpdate({ ...level, type: e.target.value });
          }}
          value={level.type || ""}
        />
      </InputGroup>
      <InputGroup
        display="flex"
        overflow="hidden"
        w="47%"
        h="50px"
        mr="2px"
        borderRadius="0 8px 8px 0"
        border="2px solid #443F5B"
        boxSizing="border-box"
      >
        <Input
          type="number"
          placeholder="3"
          flexGrow="1"
          variant="unstyled"
          name="numerator"
          onChange={(e) => {
            onUpdate({ ...level, numerator: e.target.value });
          }}
          value={level.numerator}
        />
        <InputLeftAddon
          bg="#443F5B"
          width="48px"
          height="100%"
          p="0"
          borderRadius="0"
          border="none"
          justifyContent="center"
          color="#fff"
        >
          <Text variant="txt154">Of</Text>
        </InputLeftAddon>
        <Input
          type="number"
          placeholder="5"
          w="50%"
          variant="unstyled"
          name="denominator"
          onChange={(e) => {
            onUpdate({ ...level, denominator: e.target.value });
          }}
          value={level.denominator}
        />
      </InputGroup>
    </HStack>
  );
}
