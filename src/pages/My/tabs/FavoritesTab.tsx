import { useFavoriteList, useFavoriteUpdateTime } from "../../../features/favorite/favoriteSlice";
import React, { useEffect, useMemo, useState } from "react";
import { Box, Flex, HStack, Show, Spacer, TabPanel, Text } from "@chakra-ui/react";
import { numberFormat } from "../../../utils/Format";
import CollectionAssetCardView from "../../../components/assets/CollectionAssetCardView";
import { FilterWrap } from "./CollectedTab";
import { formatDistanceToNowStrict } from "date-fns";
import SortingMenu from "../../../components/Filter/SortingMenu";
import { MyTabProps } from "../My";
import { useEthers } from "@usedapp/core";

export default function FavoritesTab({ currentTime }: MyTabProps) {
  const { account } = useEthers();
  const originAssetData = useFavoriteList();
  const { originAssetList } = useMemo(() => {
    if (originAssetData) {
      const originAssetList = originAssetData.map((asset: any) => {
        let my = undefined;
        if (asset?.owners) {
          my = asset.owners?.find((a: any) => a.user.userAddress === account);
        }
        return { ...asset, ...my };
      });
      return {
        originAssetList,
      };
    }
    return {};
  }, [originAssetData, account]);

  const [assets, setAssets] = useState([]);
  const [distanceTime, setDistanceTime] = useState("");
  const updateTime = useFavoriteUpdateTime();

  useEffect(() => {
    if (updateTime) setDistanceTime(`Updated ${formatDistanceToNowStrict(updateTime)}`);
  }, [currentTime, updateTime]);

  useEffect(() => {
    setAssets(originAssetList);
  }, [originAssetList]);

  return (
    <TabPanel>
      <FilterWrap>
        <HStack spacing="10px" width="100%" justifyContent="flex-end">
          <Show breakpoint="(min-width: 1024px)">
            <Box w="240px" pos="relative">
              <SortingMenu collection={assets} setCollection={setAssets} />
            </Box>
          </Show>
        </HStack>
      </FilterWrap>
      <HStack align="flex-start" justify="space-between" w="100%" mt="30px" spacing="0">
        <Box maxW="100%" flexGrow="1">
          <Flex px="10px">
            <HStack>
              {/*TODO : Favorites reload*/}
              {/*<span className="material-symbols-outlined">autorenew</span>*/}
              <Text variant="txt174" color="#706D82">
                {distanceTime}
              </Text>
            </HStack>
            <Spacer />
            {assets && assets?.length > 0 && (
              <Text variant="txt174" color="White">
                {`${assets?.length && numberFormat.format(assets.length)}
                ${assets.length < 2 ? "item" : "items"}`}
              </Text>
            )}
          </Flex>

          {/* grid */}
          <CollectionAssetCardView assets={assets} />
        </Box>
      </HStack>
    </TabPanel>
  );
}
