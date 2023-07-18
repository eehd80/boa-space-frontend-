import React from "react";
import { Box, HStack, Text } from "@chakra-ui/react";
import styled from "styled-components";
import { compactNumberFormat } from "../../utils/Format";

interface CollectionStatisticsProps {
  items?: number;
  owners?: number;
  volume?: number;
  floor?: number;
  royalty?: number;
  availableForPurchase?: number;
}
export function CollectionStatistics({
  items = NaN,
  owners = NaN,
  volume = NaN,
  floor = NaN,
  royalty = NaN,
  availableForPurchase = NaN,
}: CollectionStatisticsProps) {
  return (
    <HStack
      width="100%"
      divider={<Divider />}
      spacing={25}
      wrap="wrap"
      // display={["grid", "grid", "grid", "inline-grid", "inline-grid"]}
      // spacing={["19px", "19px", "19px", "42px", "42px"]}
      mt="24px"
      flexWrap="wrap"
      // columns={[3, 3, 3, 5, 5]}
    >
      <StatisticItem>
        <Text as="strong" variant="txt154">
          Items
        </Text>
        <Text variant="txt226" lineHeight="1.1">
          {isNaN(items) ? "--" : compactNumberFormat.format(items)}
        </Text>
      </StatisticItem>

      <StatisticItem>
        <Text as="strong" variant="txt154">
          Owners
        </Text>
        <Text variant="txt226" lineHeight="1.1">
          {isNaN(owners) ? "--" : compactNumberFormat.format(owners)}
        </Text>
      </StatisticItem>

      {!isNaN(volume) && (
        <StatisticItem>
          <Text as="strong" variant="txt154">
            VOL.
          </Text>
          <Text variant="txt226" lineHeight="1.1">
            {volume}
          </Text>
        </StatisticItem>
      )}

      {!isNaN(floor) && (
        <StatisticItem>
          <Text as="strong" variant="txt154">
            Floor
          </Text>
          <Text variant="txt226" lineHeight="1.1">
            {floor}
          </Text>
        </StatisticItem>
      )}

      <StatisticItem>
        <Text as="strong" variant="txt154">
          Royalty
        </Text>
        <Text variant="txt226" lineHeight="1.1">
          {isNaN(royalty) ? "--" : `${royalty}%`}
        </Text>
      </StatisticItem>
      {!isNaN(availableForPurchase) && (
        <StatisticItem>
          <Text as="strong" variant="txt154">
            Available for purchase
          </Text>
          <Text variant="txt226" lineHeight="1.1" textAlign="center">
            {availableForPurchase}
          </Text>
        </StatisticItem>
      )}
    </HStack>
  );
}

const StatisticItem = styled(Box)`
  margin: 10px 0;
  //position: relative;
  //&:first-child::before,
  //&:nth-child(4)::before {
  //  display: none;
  //}
  //&::before {
  //  content: "";
  //  position: absolute;
  //  top: 5px;
  //  left: -18px;
  //  width: 1px;
  //  height: 41px;
  //  background-color: #443f5b;
  //}
  strong {
    display: block;
    margin-bottom: 5px;
    color: #706d82;
  }
  @media screen and (min-width: 744px) {
    //&:nth-child(4)::before {
    //  display: block;
    //}
    //&::before {
    //  left: -32px;
    //}
    &:last-child::after {
      content: "";
      position: absolute;
      top: 5px;
      right: -10px;
      width: 1px;
      height: 41px;
      background-color: #443f5b;
    }
  }
`;
const Divider = styled("div")`
  height: 41px;
  margin: 10px 25px;
  width: 1px;
  min-width: 1px;
  background-color: #443f5b;
`;
