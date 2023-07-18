import React from "react";
import { FormControl, FormLabel, FormErrorMessage, FormHelperText, Input } from "@chakra-ui/react";

export default function ImportRow() {
  return (
    <FormControl>
      <FormLabel fontSize={["18px", "18px", "16px"]} fontWeight="500">
        Address
      </FormLabel>
      <Input
        type="text"
        placeholder="0x..."
        _placeholder={{ opacity: 0.75, color: "inherit" }}
        h={["58px", "58px", "58px", "50px"]}
      />
      <FormHelperText
        mt={"16px"}
        fontSize={["15px", "15px", "14px"]}
        fontWeight="400"
        lineHeight="12px"
        color="#ff204a"
      >
        Please enter the address required.
      </FormHelperText>
      <FormErrorMessage
        fontSize={["15px", "15px", "14px"]}
        fontWeight="400"
        lineHeight="12px"
        color="#ff204a"
      >
        Please enter the address required.
      </FormErrorMessage>
    </FormControl>
  );
}
