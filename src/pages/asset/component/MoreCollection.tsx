import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Center,
  HStack,
} from "@chakra-ui/react";
import styled from "styled-components";
import { useGetAssetCollectionQuery } from "../../../hooks/query/useGetAssetCollectionQuery";
import { useNavigate } from "react-router-dom";
import { EmptyList, EmptyType } from "../../../components/collection/EmptyList";
import AssetCard from "../../../components/assets/assetCard";

export default function MoreCollectionList({
  collection,
  currentAssetId,
}: {
  collection: any;
  currentAssetId: string;
}) {
  const collectionId = collection?.id ?? undefined;
  const navigate = useNavigate();
  const { getAssetCollection, data: collectionsData } = useGetAssetCollectionQuery();
  const [assets, setAssets] = useState<any[]>([]);

  useEffect(() => {
    if (collectionId) {
      getAssetCollection({
        variables: { getAssetCollectionId: collectionId },
      });
    }
  }, [collectionId, getAssetCollection]);

  useEffect(() => {
    if (collectionsData?.GetAssetCollection?.assets?.length) {
      const assets = collectionsData.GetAssetCollection.assets.filter(
        (asset: any) => asset.id !== currentAssetId
      );
      setAssets(assets);
    }
  }, [collectionsData, currentAssetId]);

  const handlerViewCollection = () => {
    if (collection) {
      navigate(`/collection/${collection.url}`);
    }
  };

  return (
    <Accordion allowToggle defaultIndex={[0]}>
      {/* Item Activity */}
      <AccordionItem bg="popup_hover">
        <h2>
          <AccordionButton>
            <Box as="span">
              <span className="material-symbols-outlined fill">view_module</span> More From This
              Collection
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel>
          {assets && assets.length > 0 ? (
            <>
              <MoreCollectionWrap
                className="scroll"
                px="20px"
                pt="20px"
                pb="30px"
                border="1px solid #3D3755"
              >
                <HStack
                  w={[
                    "calc(100% - 20px)",
                    "calc(100% - 20px)",
                    "calc(100% - 20px)",
                    "calc(100% - 20px)",
                    "calc(100% - 40px)",
                    "calc(100% - 65px)",
                    "calc(100% - 90px)",
                  ]}
                  spacing="22px"
                >
                  {assets?.map((asset: any) => {
                    return <AssetCard key={asset.id} asset={asset} isMyAssetCount={false} />;
                  })}
                </HStack>
              </MoreCollectionWrap>
              <Center my="15px">
                <Button variant="gray" w="auto" onClick={handlerViewCollection}>
                  View collection
                </Button>
              </Center>
            </>
          ) : (
            <Box mb="80px">
              <EmptyList type={EmptyType.NFT} />
            </Box>
          )}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

const MoreCollectionWrap = styled(Box)`
  .collectionEl {
    width: 50%;
  }
  @media all and (min-width: 1024px) {
    .collectionEl {
      width: 33.333%;
    }
  }
  @media all and (min-width: 1280px) {
    .collectionEl {
      width: 25%;
    }
  }
  @media all and (min-width: 1920px) {
    .collectionEl {
      width: 20%;
    }
  }
`;
