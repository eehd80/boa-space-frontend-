import React from "react";
import { Stack, Text } from "@chakra-ui/react";
import { compactNumberFormat, numberFormat } from "../../utils/Format";

interface ViewHeartProps {
  ownerCount?: number;
  viewCount?: number;
  favoriteCount?: number;
  itemCount?: number;
}
export default function ViewHeart({
  viewCount = NaN,
  favoriteCount = NaN,
  ownerCount = NaN,
  itemCount = NaN,
}: ViewHeartProps) {
  return (
    <Stack direction="row" justify="flex-start" align="flex-start" spacing="30px" mt="20px">
      {ownerCount && (
        <Stack direction="row" justify="flex-start" align="center" spacing="5px">
          <span className="material-symbols-outlined" style={{ fontWeight: "400" }}>
            people
          </span>
          <Text color="White" variant="txt144">
            {`${numberFormat.format(ownerCount)} owner${ownerCount > 1 ? "s" : ""}`}
          </Text>
        </Stack>
      )}
      {itemCount && (
        <Stack direction="row" justify="flex-start" align="center" spacing="5px">
          <span className="material-symbols-outlined" style={{ fontWeight: "400" }}>
            view_module
          </span>
          <Text color="White" variant="txt144">
            {`${numberFormat.format(itemCount)} item${itemCount > 1 ? "s" : ""}`}
          </Text>
        </Stack>
      )}
      {viewCount && (
        <Stack direction="row" justify="flex-start" align="center" spacing="5px">
          <span className="material-symbols-outlined" style={{ fontWeight: "400" }}>
            visibility
          </span>
          <Text color="White" variant="txt144">
            {`${compactNumberFormat.format(viewCount)} view${viewCount > 1 ? "s" : ""}`}
          </Text>
        </Stack>
      )}
      {favoriteCount && (
        <Stack direction="row" justify="flex-start" align="center" spacing="5px">
          <span className="material-symbols-outlined" style={{ fontWeight: "400" }}>
            favorite
          </span>
          <Text color="White" variant="txt144">
            {`${compactNumberFormat.format(favoriteCount)} favorite${favoriteCount > 1 ? "s" : ""}`}
          </Text>
        </Stack>
      )}
    </Stack>
  );
}
