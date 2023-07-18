import React from "react";
import { Heading, Image, Text, VStack } from "@chakra-ui/react";
import ImportNFTForm from "../../components/Form/importNFT";

export default function ImportNFT() {
  return (
    <>
      <Heading as="h2" size="xl" mt="100px" mb={["20px"]}>
        <VStack>
          <Image src="/images/comm/img-planet.svg" w="110px" mb="10px" />
          <Text fontSize="32px" fontWeight={500}>
            Import NFT
          </Text>
        </VStack>
      </Heading>
      <ImportNFTForm />
    </>
  );
}
