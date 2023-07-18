import React, { useEffect, useMemo } from "react";
import styled from "styled-components";
import {
  Box,
  Button,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Show,
  SimpleGrid,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { ChevronDownIcon, CloseIcon } from "@chakra-ui/icons";
import FiltersButton from "../../components/collection/FiltersButton";
import SortButton from "../../components/collection/SortButton";
import FiltersEl from "../../components/collection/FilterEl";
import Filters2Button from "../../components/collection/Filters2Button";
import CollectionAssetCardView from "../../components/assets/CollectionAssetCardView";
import { useParams } from "react-router-dom";
import { useSearchResultQuery } from "../../hooks/query/useSearchResultUnionQuery";

export default function SearchCollection() {
  const { value } = useParams();
  const { getSearchResult, data } = useSearchResultQuery();
  // const { getSearchResult, data, loading, error } = useSearchResultQuery(value);
  console.debug("SEARCH RESULT:(" + value + ")", data);

  useEffect(() => {
    if (getSearchResult && value) {
      getSearchResult({ variables: { input: value } });
    }
  }, [value, getSearchResult]);

  const { assets } = useMemo(() => {
    if (data?.GetSearchResult?.length) {
      return {
        assets: data.GetSearchResult.filter((item: any) => item.__typename === "Asset"),
      };
    }
    return {};
  }, [data]);

  console.debug("Assets", assets);

  return (
    <>
      <FilterWrap mt="20px">
        <SimpleGrid columns={2} spacing="10px">
          <FiltersButton />
          <Show breakpoint="(max-width: 1023px)">
            <SortButton />
          </Show>
        </SimpleGrid>
        <HStack spacing="10px">
          <Show breakpoint="(min-width: 1024px)">
            <Box w="240px" pos="relative">
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  w="240px"
                  h="52px"
                  px="16px"
                  borderColor="popup_B01"
                  borderWidth="2px"
                  borderRadius="8px"
                  textAlign="left"
                >
                  <Text variant="txt154">Most viewed</Text>
                </MenuButton>
                <MenuList>
                  <MenuItem>Download</MenuItem>
                  <MenuItem>Create a Copy</MenuItem>
                  <MenuItem>Mark as Draft</MenuItem>
                  <MenuItem>Delete</MenuItem>
                  <MenuItem>Attend a Workshop</MenuItem>
                </MenuList>
              </Menu>
            </Box>
          </Show>
        </HStack>
      </FilterWrap>
      <HStack align="flex-start" justify="space-between" w="100%" mt="20px" spacing="0">
        <Show breakpoint="(min-width: 1023px)">
          {/* display: block, display: none */}
          <Box display="block" w="300px" mt="-15px" ml="-15px" mr="38px">
            <FiltersEl />
          </Box>
        </Show>

        <Flex flexDir="column" justifyContent="center" flexGrow="1">
          <Flex px="10px">
            <Spacer />
            <Text variant="txt176">6,942 items</Text>
          </Flex>

          <Show breakpoint="(min-width: 1023px)">
            <HStack spacing="10px">
              <Button
                variant="gray"
                rightIcon={<CloseIcon ml="10px" fontSize="13px" color="text_Gray01" />}
                w="auto"
                h="46px"
                px="20px"
                borderRadius="6px"
                fontSize="16px"
                fontWeight={500}
              >
                Buy Now
              </Button>
              <Button
                variant="gray"
                rightIcon={<CloseIcon ml="10px" fontSize="13px" color="text_Gray01" />}
                w="auto"
                h="46px"
                px="20px"
                borderRadius="6px"
                fontSize="16px"
                fontWeight={500}
              >
                Buy Now
              </Button>
              <Button
                w="auto"
                h="46px"
                px="20px"
                borderRadius="6px"
                fontSize="16px"
                fontWeight={500}
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
