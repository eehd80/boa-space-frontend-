import React, { useEffect, useState } from "react";
import { CopyIcon } from "@chakra-ui/icons";
import { Box, Tooltip, useClipboard } from "@chakra-ui/react";

export default function IconCopy({ address }: { address: string }) {
  const { onCopy, setValue, hasCopied } = useClipboard(address);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setValue(address);
  }, [address, setValue]);
  const handler = () => {
    onCopy();
    setIsOpen(true);
    setTimeout(() => setIsOpen(false), 1000);
  };
  return (
    <Tooltip
      label={hasCopied ? "Copied" : "Copy"}
      shouldWrapChildren
      hasArrow
      isOpen={isOpen}
      bg="red.600"
    >
      <Box
        display="flex"
        onClick={handler}
        className="hand"
        onMouseOver={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <CopyIcon transform="scaleX(0.8) rotate(-90deg)" />
      </Box>
    </Tooltip>
  );
}
