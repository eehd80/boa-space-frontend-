import React from "react";
import { Box, Image, useBoolean } from "@chakra-ui/react";
import { Loading } from "./Modals/Waitting";
import { rgba } from "polished";

interface ThumbRatioProp {
  src?: string;
  isLoading?: boolean;
  isScale?: boolean;
}
export default function ThumbRatio({ src, isLoading = false, isScale = false }: ThumbRatioProp) {
  const [hovered, setHovered] = useBoolean(false);
  return (
    <Box pos="relative" w="100%" pb="100%" m="0 !important">
      <Box pos="absolute" w="100%" h="100%">
        <Image
          src={src}
          alt=""
          objectFit="cover"
          boxSize="100%"
          objectPosition="50% 50%"
          borderRadius="base"
          onMouseEnter={setHovered.on}
          onMouseLeave={setHovered.off}
          style={{
            transform: `${hovered && isScale ? "scale(1.1,1.1)" : "scale(1,1)"}`,
            transition: "0.5s",
          }}
        />
      </Box>
      {isLoading && (
        <Box pos="absolute" w="100%" h="100%" background={rgba(4, 17, 29, 0.7)}>
          <Loading display="inline-flex" justify="center" pos="relative" mt="5px">
            <Image className="loading-out" src="/images/icon/loading-out.svg" />
            <Image
              className="loading-in"
              src="/images/icon/loading-in.svg"
              pos="absolute"
              top="50%"
              left="50%"
              m="-16.5px 0 0 -16.5px"
            />
          </Loading>
        </Box>
      )}
    </Box>
  );
}
