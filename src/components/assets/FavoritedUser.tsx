import React from "react";
import { HStack, Text, Image, Box } from "@chakra-ui/react";

export default function FavoritedUser() {
  return (
    <HStack alignItems="flex-start" px="20px">
      <Image src="/images/thumb/user1.png" w="30px" h="30px" mt="5px" mr="10px" />
      <Box textAlign="left">
        <Text variant="txt176" color="White">
          Alexander_Shadurin
        </Text>
        <Text variant="txt154" mt="3px">
          0X3Ef9...a63f
        </Text>
      </Box>
    </HStack>
  );
}
