import React from "react";

import {
  Box,
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";

export default function TooltipVerified() {
  return (
    <Popover isLazy placement="right">
      <PopoverTrigger>
        <Button h="30px" m="0" p="0" minW="0">
          <span
            className="material-symbols-outlined fill"
            style={{
              color: "#A796FF",
              margin: "0 0 -2px 5px",
              fontWeight: "700",
              fontSize: "15px",
            }}
          >
            verified
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>
          <Text variant="txt156" whiteSpace="nowrap">
            This is a verified account.{" "}
            <Box as="span" color="#A796FF">
              Learn more
            </Box>
          </Text>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
// top="6px" left="40px"
