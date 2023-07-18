import React from "react";
import { SimpleGrid } from "@chakra-ui/react";
import AssetCard from "./assetCard";
import { EmptyList } from "../collection/EmptyList";

interface CollectionAssetCardViewProps {
  assets?: any[];
  isTransaction?: boolean;
  isMyAssetCount?: boolean;
  isDisableCart?: boolean;
}
function CollectionAssetCardView({
  assets,
  isTransaction = true,
  isMyAssetCount = true,
  isDisableCart = false,
}: CollectionAssetCardViewProps) {
  return (
    <React.Fragment>
      {assets && assets.length > 0 ? (
        <SimpleGrid
          columns={[2, 2, 2, 3, 4, 4, 6]}
          spacing={["8px", "8px", "8px", "8px", "20px"]}
          my="20px"
        >
          {assets.map((asset: any, index: number) => {
            return (
              <AssetCard
                key={index}
                asset={asset}
                isTransaction={isTransaction}
                isMyAssetCount={isMyAssetCount}
                isDisableCart={isDisableCart}
              />
            );
          })}
        </SimpleGrid>
      ) : (
        <EmptyList />
      )}
    </React.Fragment>
  );
}
export default React.memo(CollectionAssetCardView);
