import { useEthers } from "@usedapp/core";
import { useUserActivities } from "../../../hooks/query/useGetUserActivities";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Spacer,
  TabPanel,
  Text,
  VisuallyHidden,
} from "@chakra-ui/react";
import FiltersButton from "../../../components/collection/FiltersButton";
import { numberFormat } from "../../../utils/Format";
import ActivityEls from "../../../components/assets/ActivityEls";
import { FilterWrap } from "./CollectedTab";
import { MyTabProps } from "../My";
import { formatDistanceToNowStrict } from "date-fns";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { setFilterActivity, useOptionState } from "../../../features/utils/optionSlice";

export default function ActivityTab({ currentTime }: MyTabProps) {
  const { account } = useEthers();
  const dispatch = useDispatch();
  const { isFilterActivity } = useOptionState();

  const handlerOnFilter = useCallback(() => {
    dispatch(setFilterActivity(!isFilterActivity));
  }, [dispatch, isFilterActivity]);

  const { data: activitiesData, refetch } = useUserActivities(account);

  const { activities, updateTime } = useMemo(() => {
    if (activitiesData && activitiesData.GetUserActivities) {
      return {
        activities: _.orderBy(activitiesData.GetUserActivities, ["createdAt"], ["desc"]),
        updateTime: Date.now(),
      };
    }
    return { activities: [], updateTime: Date.now() };
  }, [activitiesData]);

  const [distanceTime, setDistanceTime] = useState("");

  useEffect(() => {
    if (updateTime) setDistanceTime(`Updated ${formatDistanceToNowStrict(updateTime)}`);
  }, [currentTime, updateTime]);

  return (
    <TabPanel>
      <FilterWrap className="">
        <VisuallyHidden>
          <FiltersButton onClick={handlerOnFilter} />
        </VisuallyHidden>
        {/*<HStack spacing="10px">
          <Show breakpoint="(min-width: 1024px)">
            <MostViewed />
          </Show>
          <Show breakpoint="(min-width: 1024px)">
            <GridAlign />
          </Show>
        </HStack>*/}
      </FilterWrap>
      <HStack align="flex-start" justify="space-between" w="100%" mt="30px" spacing="0">
        {/*<Show breakpoint="(min-width: 1023px)">
          {isFilterActivity && (
            <Box display="block" w="300px" mt="-15px" ml="-15px" mr="38px">
              <FiltersEl />
            </Box>
          )}
        </Show>*/}
        <Box
          maxW="100%"
          flexGrow="1"
          // w={["100%", "100%", "100%", "100%", "calc(100% - 325px)"]}
        >
          <Flex px="0">
            <HStack>
              {distanceTime !== "" && (
                <React.Fragment>
                  <IconButton
                    style={{ padding: 0, margin: 0, minWidth: 22, minHeight: 22, height: "22px" }}
                    icon={<span className="material-symbols-outlined">autorenew</span>}
                    aria-label="reload"
                    onClick={() => refetch({ userAddress: account })}
                  />
                  <Text variant="txt174" color="#706D82">
                    {distanceTime}
                  </Text>
                </React.Fragment>
              )}
            </HStack>
            <Spacer />
            {activities && activities?.length > 0 && (
              <Text variant="txt176" color="White">
                {`${activities?.length && numberFormat.format(activities.length)}
                ${activities.length < 2 ? "item" : "items"}`}
              </Text>
            )}
          </Flex>

          {/* table */}
          <ActivityEls activities={activities} />
        </Box>
      </HStack>
    </TabPanel>
  );
}
