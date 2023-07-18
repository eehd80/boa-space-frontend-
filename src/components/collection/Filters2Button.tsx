import React from "react";
import { Button, Show } from "@chakra-ui/react";

export default function Filters2Button() {
  return (
    <Show breakpoint="(max-width: 1023px)">
      <Button
        variant="gray"
        pos="absolute"
        bottom="30px"
        left="50%"
        transform="translateX(-50%)"
        borderRadius="52px"
      >
        <span className="material-symbols-outlined" style={{ marginRight: "10px" }}>
          filter_list
        </span>
        Filters 2
      </Button>
    </Show>
  );
}
