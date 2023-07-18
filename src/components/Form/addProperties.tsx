import React from "react";
import { HStack, Input, InputGroup, InputLeftAddon } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { AssetOption } from "../../pages/asset/createAsset";

interface AddPropertiesProps {
  onDelete: any;
  property: AssetOption;
  onUpdate: any;
}

export default function AddProperties({ property, onDelete, onUpdate }: AddPropertiesProps) {
  return (
    <HStack mt="12px !important" spacing="1px">
      <InputGroup
        display="flex"
        overflow="hidden"
        w="59%"
        h="50px"
        mr="2px"
        borderRadius="8px 0px 0px 8px"
        border="2px solid #443F5B"
        boxSizing="border-box"
      >
        <InputLeftAddon
          bg="#443F5B"
          width="50px"
          height="100%"
          borderRadius="0"
          border="none"
          cursor="pointer"
          onClick={() => onDelete(property)}
        >
          <CloseIcon w="13" h="13" color="#C4C4D3" />
        </InputLeftAddon>
        <Input
          type="text"
          name="type"
          value={property.type || ""}
          onChange={(e) => {
            onUpdate({ ...property, type: e.target.value });
          }}
          placeholder="Character"
          flexGrow="1"
          variant="unstyled"
        />
      </InputGroup>
      <InputGroup
        display="flex"
        overflow="hidden"
        w="calc(41% - 2px)"
        h="48px"
        mr="2px"
        borderRadius="0 8px 8px 0"
        border="2px solid #443F5B"
        boxSizing="border-box"
      >
        <Input
          type="text"
          name="name"
          placeholder="Male"
          w="100%"
          variant="unstyled"
          value={property.name || ""}
          onChange={(e) => {
            onUpdate({ ...property, name: e.target.value });
          }}
        />
      </InputGroup>
    </HStack>
  );
}
