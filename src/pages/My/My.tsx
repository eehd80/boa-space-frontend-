import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Spacer,
  Stack,
  Tab,
  TabList,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import UserInfo from "../../components/UserInfo";
import { useNavigate, useParams } from "react-router-dom";
import MenuSns from "../../components/My/Menu";
import Filters2Button from "../../components/collection/Filters2Button";
import { useFavoriteCount } from "../../features/favorite/favoriteSlice";
import { useGetMyInfo } from "../../hooks/query/useGetMyInfo";
import ChainColl from "../../components/My/Chain";
import ActivityTab from "./tabs/ActivityTab";
import FavoritesTab from "./tabs/FavoritesTab";
import CreatedTab from "./tabs/CreatedTab";
import CollectedTab from "./tabs/CollectedTab";
import { useCollectedCount, useCreatedCount } from "../../features/asset/assetsSlice";

export enum MyTabName {
  COLLECTED = "collected",
  CREATED = "created",
  FAVORITES = "favorites",
  ACTIVITY = "activity",
}
export interface MyTabProps {
  currentTime: number;
}
export default function My() {
  const { tabName } = useParams();

  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState(0);
  const favoriteCount = useFavoriteCount();
  const collectedCount = useCollectedCount();
  const createdCount = useCreatedCount();
  const myInfo = useGetMyInfo();
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const handler = () => {
      setCurrentTime(Date.now);
    };
    const interval = setInterval(handler, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const profile = useMemo(() => {
    if (myInfo?.getMyInfo) {
      return myInfo?.getMyInfo?.profile;
    }
    return {};
  }, [myInfo]);

  useEffect(() => {
    if (tabName) {
      if (tabName === MyTabName.COLLECTED) {
        setTabIndex(0);
      } else if (tabName === MyTabName.CREATED) {
        setTabIndex(1);
      } else if (tabName === MyTabName.FAVORITES) {
        setTabIndex(2);
      } else if (tabName === MyTabName.ACTIVITY) {
        setTabIndex(3);
      }
    } else {
      setTabIndex(0);
    }
  }, [tabName]);

  const handlerOnTabChange = (idx: number) => {
    if (idx === 0) {
      navigate("/my/collected");
    } else if (idx === 1) {
      navigate("/my/created");
    } else if (idx === 2) {
      navigate("/my/favorites");
    } else if (idx === 3) {
      navigate("/my/activity");
    }
  };

  return (
    <>
      {/* user */}
      <Stack
        pos="sticky"
        zIndex="100"
        direction={["column", "column", "column", "row"]}
        justify="space-between"
      >
        <UserInfo profile={profile} />
        <HStack
          align="center"
          justify="center"
          h={["auto", "auto", "auto", "48px"]}
          spacing={["10px", "10px", "10px", "0"]}
          pt={["0", "0", "0", "78px"]}
        >
          <Box
            pos="relative"
            w={["48px", "48px", "48px", "auto"]}
            h={["48px", "48px", "48px", "auto"]}
            borderRadius={["50%", "50%", "50%", "0"]}
            bg={["popup_B01", "popup_B01", "popup_B01", "transparent"]}
          >
            <MenuSns data={profile} />
          </Box>
          <Divider
            display={["none", "none", "none", "block"]}
            orientation="vertical"
            borderColor="text_Gray01"
            h="20px"
            mt="2px !important"
            px="0"
            mx="10px !important"
          />
          <Box
            w="48px"
            h="48px"
            borderRadius="50%"
            bg={["popup_B01", "popup_B01", "popup_B01", "transparent"]}
          >
            <ChainColl />
          </Box>
          <Box
            as={Button}
            w="48px"
            h="48px"
            borderRadius="50%"
            bg={["popup_B01", "popup_B01", "popup_B01", "transparent"]}
            onClick={() => navigate("/my/settings")}
          >
            <span className="material-symbols-outlined fill">settings</span>
          </Box>
        </HStack>
      </Stack>
      <Flex>
        <Spacer />
        {/* <Button
          variant="primary"
          size={{ base: "lg", md: "md" }}
          onClick={() => navigate("/importNFT")}
        >
          IMPORT
        </Button> */}
      </Flex>
      {/* Collected */}
      <Tabs
        pos="sticky"
        mt={["35px", "35px", "35px", "7px"]}
        onChange={handlerOnTabChange}
        index={tabIndex}
        isLazy={true}
        lazyBehavior="unmount"
      >
        <TabList>
          <Tab>Collected {collectedCount}</Tab>
          <Tab>Created {createdCount}</Tab>
          <Tab>Favorites {favoriteCount}</Tab>
          <Tab>Activity</Tab>
        </TabList>
        <TabPanels>
          <CollectedTab currentTime={currentTime} />
          <CreatedTab currentTime={currentTime} />
          <FavoritesTab currentTime={currentTime} />
          <ActivityTab currentTime={currentTime} />
        </TabPanels>
      </Tabs>

      <Filters2Button />
    </>
  );
}
