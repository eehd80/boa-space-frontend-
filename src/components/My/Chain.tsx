import React, { useState } from "react";
import { Button, Image, Tooltip, useClipboard, VisuallyHidden } from "@chakra-ui/react";

export default function ChainColl() {
  const { onCopy, hasCopied } = useClipboard(window.location.href);
  const [isOpen, setIsOpen] = useState(false);
  const handler = () => {
    onCopy();
    setIsOpen(true);
    setTimeout(() => setIsOpen(false), 1000);
  };
  return (
    <Tooltip
      bg="red.600"
      label={hasCopied ? "Copied Link" : "Copy Link"}
      aria-label="copy tooltip"
      placement="top"
      hasArrow
      isOpen={isOpen}
    >
      <Button
        variant="circle"
        w="48px"
        h="48px"
        onClick={handler}
        onMouseOver={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <Image src="/images/icon/chain.svg" alt="" />
        <VisuallyHidden>CopyLink</VisuallyHidden>
      </Button>
    </Tooltip>
  );
}
// top="6px" left="40px"
