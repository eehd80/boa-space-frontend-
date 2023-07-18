import React, { useMemo, useState } from "react";
import {
  Heading,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VisuallyHidden,
} from "@chakra-ui/react";
import ThumbCollection from "../../components/collection/ThumbCollection";
import { useGetAssetCollectionsQuery } from "../../hooks/query/useGetAssetCollectionsQuery";
import { EmptyList, EmptyType } from "../../components/collection/EmptyList";

export default function ExploreCollection() {
  const [tabIdx, setTabIdx] = useState(0);
  const collectionsData = useGetAssetCollectionsQuery(tabIdx);
  const collections = useMemo(() => {
    if (collectionsData && collectionsData?.GetAssetCollections) {
      return collectionsData.GetAssetCollections;
    }
    return [];
  }, [collectionsData]);

  return (
    <>
      <Heading
        mt="60px"
        fontFamily="Inter"
        fontSize={["32px", "32px", "32px", "50px"]}
        fontWeight={700}
      >
        Explore collections
      </Heading>
      <Tabs mt="50px" index={tabIdx} onChange={(index: number) => setTabIdx(index)}>
        <TabList>
          <Tab>ALL</Tab>
          <Tab>ART</Tab>
          <Tab>GAME</Tab>
          <Tab>MUSIC</Tab>
          <Tab>PHOTOGRAPHY</Tab>
          <Tab>MEMBERSHIP</Tab>
          <Tab>VIRTUAL WORLD</Tab>
          <Tab>SPORTS</Tab>
          <Tab>NO CATEGORY</Tab>
        </TabList>
        <VisuallyHidden>
          <TabPanels>
            <TabPanel />
          </TabPanels>
        </VisuallyHidden>
      </Tabs>
      <CollectionTabPanel collections={collections} />
    </>
  );
}

function CollectionTabPanel({ collections }: { collections: any[] }) {
  return (
    <React.Fragment>
      {collections && collections.length > 0 ? (
        <SimpleGrid
          columns={[1, 1, 1, 2, 3, 4]}
          spacing={["20px", "20px", "20px", "20px", "22px"]}
          padding="22px 0"
        >
          {collections.map((v: any) => {
            return <ThumbCollection collection={v} key={v.id} />;
          })}
        </SimpleGrid>
      ) : (
        <EmptyList type={EmptyType.COLLECTION} />
      )}
    </React.Fragment>
  );
}
