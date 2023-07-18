import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Box, Button, Flex, HStack, Show, SimpleGrid, Spacer, Stack, Text } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import FiltersButton from "../../components/collection/FiltersButton";
import SortButton from "../../components/collection/SortButton";
import FiltersEl from "../../components/collection/FilterEl";
import Filters2Button from "../../components/collection/Filters2Button";
import CollectionAssetCardView from "../../components/assets/CollectionAssetCardView";
import { useNavigate, useParams } from "react-router-dom";
import { useSearchResultQuery } from "../../hooks/query/useSearchResultUnionQuery";
import SlickSearch from "../../components/search/searchSlick";
import { numberFormat } from "../../utils/Format";
import SortingMenu from "../../components/Filter/SortingMenu";

export default function Search() {
  const { value } = useParams();
  const navigate = useNavigate();
  const { getSearchResult, data } = useSearchResultQuery();
  const [assets, setAssets] = useState<any[]>(undefined);
  const [collections, setCollections] = useState<any[]>(undefined);

  useEffect(() => {
    setAssets(undefined);
    setCollections(undefined);
    getSearchResult({ variables: { input: value } });
  }, [value, getSearchResult]);

  useEffect(() => {
    if (data?.GetSearchResult?.length) {
      const assList = data.GetSearchResult.filter((item: any) => item.__typename === "Asset");
      const colList = data.GetSearchResult.filter(
        (item: any) => item.__typename === "AssetCollection"
      );
      console.log("COL", assList);
      setAssets(assList);
      setCollections(colList);
    }
  }, [data]);

  return (
    <>
      <FilterWrap mt="20px">
        <SimpleGrid columns={2} spacing="10px">
          <Box display="none">
            <FiltersButton />
          </Box>
          <Show breakpoint="(max-width: 1023px)">
            <SortButton />
          </Show>
        </SimpleGrid>
        <HStack spacing="10px">
          <Show breakpoint="(min-width: 1024px)">
            <Box w="240px" pos="relative">
              <SortingMenu />
            </Box>
          </Show>
        </HStack>
      </FilterWrap>

      <Stack mt="20px">
        <Text variant="txt176" mb="10px">
          Collection results
        </Text>
        <SlickSearch collections={collections} />
      </Stack>
      <HStack align="flex-start" justify="space-between" w="100%" mt="20px" spacing="0">
        <Show breakpoint="(min-width: 1023px)">
          {/* display: block, display: none */}
          <Box display="none" w="300px" mt="-15px" ml="-15px" mr="38px">
            <FiltersEl />
          </Box>
        </Show>

        <Flex flexDir="column" justifyContent="center" flexGrow="1">
          <Flex px="10px">
            <Spacer />
            <Text variant="txt176">
              {assets &&
                assets.length > 0 &&
                `${numberFormat.format(assets.length)} ${assets.length < 2 ? "item" : "items"}`}
            </Text>
          </Flex>

          <Show breakpoint="(min-width: 1023px)">
            <HStack spacing="10px">
              {value && (
                <Button
                  variant="gray"
                  rightIcon={<CloseIcon ml="10px" fontSize="13px" color="text_Gray01" />}
                  w="auto"
                  h="46px"
                  px="20px"
                  borderRadius="6px"
                  fontSize="16px"
                  fontWeight={500}
                  onClick={() => {
                    navigate("/search/");
                  }}
                >
                  {value}
                </Button>
              )}
              <Button
                w="auto"
                h="46px"
                px="20px"
                borderRadius="6px"
                fontSize="16px"
                fontWeight={500}
                onClick={() => {
                  navigate("/search/");
                }}
              >
                Clear All
              </Button>
            </HStack>
          </Show>

          {/* grid */}
          <CollectionAssetCardView assets={assets} isMyAssetCount={false} />

          <Filters2Button />
        </Flex>
      </HStack>
    </>
  );
}

const FilterWrap = styled(Box)`
  @media screen and (min-width: 1024px) {
    display: flex;
    justify-content: space-between;
  }
`;
