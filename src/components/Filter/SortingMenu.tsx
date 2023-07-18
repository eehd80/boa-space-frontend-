import { Button, Menu, MenuButton, MenuItem, MenuList, Text, Box } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import _ from "lodash";

export enum SortType {
  RECENTLY_RECEIVED,
  MOST_VIEWED,
  LEAST_VIEWED,
  PRICE_LOW_TO_HIGH,
  PRICE_HIGH_TO_LOW,
}
export interface SortItem {
  name: string;
  field?: Array<any>[] | Function[] | Object[] | string[];
  orders?: "asc" | "desc";
}
export const SortTypeMap = new Map<SortType, SortItem>([
  [SortType.RECENTLY_RECEIVED, { name: "Recently received", field: ["createdAt"], orders: "desc" }],
  [SortType.MOST_VIEWED, { name: "Most viewed", field: ["viewCount"], orders: "desc" }],
  [SortType.LEAST_VIEWED, { name: "Least viewed", field: ["viewCount"], orders: "asc" }],
  // [
  //   SortType.PRICE_LOW_TO_HIGH,
  //   {
  //     name: "Price low to high",
  //     field: ["unitPrice"],
  //     orders: "asc",
  //   },
  // ],
  // [SortType.PRICE_HIGH_TO_LOW, { name: "Price high to low", field: ["unitPrice"], orders: "desc" }],
]);

const SortingMenu = ({
  collection,
  setCollection,
}: {
  collection?: any[];
  setCollection?: any;
}) => {
  const [current, setCurrent] = useState<SortType>(SortType.RECENTLY_RECEIVED);
  const [beforeType, setBeforeType] = useState(current);

  const handlerOnChange = (select: SortType) => {
    setCurrent(select);
  };

  useEffect(() => {
    if (!setCollection) return;
    if (current === beforeType) return;
    if (collection?.length) {
      setBeforeType(current);
      const s: SortItem = SortTypeMap.get(current);
      if (s) {
        const f = _.orderBy(collection, s.field, [s.orders]);
        setCollection(f);
      } else {
        setCollection(collection);
      }
    } else {
      setCollection([]);
    }
  }, [collection, beforeType, current, setCollection]);

  return (
    <Box pos="relative">
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
          <Text variant="txt154">{SortTypeMap.get(current).name}</Text>
        </MenuButton>
        <MenuList width="auto">
          {Array.from(SortTypeMap).map(([key, value]) => {
            return (
              <MenuItem key={key} onClick={() => handlerOnChange(key)}>
                {value.name}
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
    </Box>
  );
};
export default React.memo(SortingMenu);
