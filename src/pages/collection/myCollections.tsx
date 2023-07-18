import React from "react";

import { Button, Heading, HStack, SimpleGrid, Text, Tooltip } from "@chakra-ui/react";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import ThumbCollection from "../../components/collection/ThumbCollection";
import { useNavigate } from "react-router-dom";
import { useGetUserAssetCollections } from "../../hooks/query/useGetUserAssetCollections";
import { EmptyList, EmptyType } from "../../components/collection/EmptyList";

export default function MyCollections() {
  const navigate = useNavigate();

  const { collections } = useGetUserAssetCollections();

  return (
    <>
      <Heading as="h2" variant="tit">
        My Collections
      </Heading>

      <HStack mt="34px" align="flex-start">
        <Text variant="txt174" w={["345px", "345px", "345px", "auto"]} mt="-3px" color="White">
          Create, curate, and manage collections of unique NFTs to share and sell.
        </Text>
        <Tooltip
          label="Collections can be created either directly
on BOAspace or imported from an existing
smart contract. You can also import
the items to BOAspace."
          placement="top"
          flexGrow="1"
        >
          <InfoOutlineIcon fontSize="16px" ml="7px !important" color="text_Gray01" />
        </Tooltip>
      </HStack>
      <Button
        variant="primary"
        minW="214px"
        mt="30px"
        onClick={() => navigate("/collections/create")}
      >
        Create a collection
      </Button>
      {collections && collections?.length ? (
        <SimpleGrid
          columns={[1, 1, 1, 2, 2, 4]}
          spacing={["15px", "15px", "15px", "10px"]}
          mt="34px"
        >
          {collections?.map((item: any, index: number) => {
            return <ThumbCollection key={index} collection={item} />;
          })}
        </SimpleGrid>
      ) : (
        <EmptyList type={EmptyType.COLLECTION} />
      )}
    </>
  );
}
