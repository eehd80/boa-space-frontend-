import React, { useState } from "react";

import { Button, Flex, Image, useClipboard, VisuallyHidden, Tooltip } from "@chakra-ui/react";

export default function LinkShare() {
  const { onCopy, hasCopied } = useClipboard(window.location.href);
  const [isOpen, setIsOpen] = useState(false);
  const handler = () => {
    onCopy();
    setIsOpen(true);
    setTimeout(() => setIsOpen(false), 1000);
  };
  return (
    <Flex pos="absolute" top="0" right="0" w="48px" h="48px" borderRadius="50%" bg="#443F5B">
      <Tooltip
        label={hasCopied ? "Copied Link" : "Copy Link"}
        aria-label="A tooltip"
        placement="top"
        hasArrow
        isOpen={isOpen}
      >
        <Button
          onClick={handler}
          onMouseOver={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
          }}
        >
          {/* <span className="material-symbols-outlined">share</span> */}
          <Image src="/images/icon/link_chain.svg" />
          <VisuallyHidden>share</VisuallyHidden>
        </Button>
      </Tooltip>
    </Flex>
  );
}
