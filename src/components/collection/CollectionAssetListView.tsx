import React from "react";
import {
  Box,
  HStack,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { EmptyList } from "./EmptyList";
import { formatDistance } from "date-fns";
import { useNavigate } from "react-router-dom";
import LinkAddress from "../Link/LinkAddress";
import _ from "lodash";
import { formatEther } from "ethers/lib/utils";
import { ActivityType, OrderStatus } from "../../type";
import { propsAreEqual } from "../../utils/PropsUtils";

interface CollectionAssetListViewProps {
  assets?: any[];
}
const CollectionAssetListView = ({ assets }: CollectionAssetListViewProps) => {
  const navigate = useNavigate();
  const handlerOnClick = (asset: any) => {
    navigate(`/assets/${asset?.assetContractAddress}/${asset?.tokenId}`);
  };
  return (
    <React.Fragment>
      {assets?.length > 0 ? (
        <TableContainer mt="20px">
          <Table variant="main">
            <Thead>
              <Tr>
                {/*<Th w="30px"></Th>*/}
                <Th>Item</Th>
                <Th>Current Price</Th>
                <Th>Best Offer</Th>
                <Th>Last Sale</Th>
                <Th>Owner</Th>
                <Th>Time Listed</Th>
              </Tr>
            </Thead>
            <Tbody>
              {assets.map((v) => {
                const owner = _.maxBy(v.owners, (o: any) => o.amount);
                const sellList = v?.activities?.filter(
                  (a: any) => a.activityType === ActivityType.SELL
                );
                const lastPrice = _.maxBy(sellList, (a: any) => new Date(a.createdAt).getTime());
                const bestPrice = _.maxBy(sellList, (a: any) => a.order.unitPrice);
                const saleList = v?.activities?.filter(
                  (a: any) =>
                    a.activityType === ActivityType.LIST && a.order.status === OrderStatus.SALE
                );
                const currentPrice = _.minBy(saleList, (a: any) => a.order.unitPrice);
                return (
                  <Tr key={v.id}>
                    {/*<Td>
                      <Checkbox />
                    </Td>*/}
                    <Td onClick={() => handlerOnClick(v)} className="hand">
                      <HStack spacing="15px">
                        <Box overflow="hidden" w="40px" h="40px" bg="popup_BBGG" borderRadius="8px">
                          <Image
                            src={v.originalUrl}
                            w="100%"
                            h="100%"
                            objectFit="cover"
                            objectPosition="50% 50%"
                          />
                        </Box>
                        <Text variant="txt156">{v.name}</Text>
                      </HStack>
                    </Td>
                    <Td>
                      {currentPrice
                        ? formatEther(currentPrice?.order?.unitPrice) + " BOA"
                        : /* <Badge variant="gray">
                          {v?.unitPrice && `${formatEther(v?.unitPrice)} BOA`}
                          {/!*<Image src="/images/icon/bolt.svg" />*!/}
                        </Badge>*/
                          "--"}
                    </Td>
                    <Td>{bestPrice ? formatEther(bestPrice?.order?.unitPrice) + " BOA" : "--"}</Td>
                    <Td>{lastPrice ? formatEther(lastPrice?.order?.unitPrice) + " BOA" : "--"}</Td>
                    <Td>
                      <LinkAddress address={owner?.user?.userAddress} />
                      {/*<VerifiedIcon /> TODO : Verified feature*/}
                    </Td>
                    <Td>
                      {v?.updatedAt &&
                        formatDistance(new Date(v.updatedAt), Date.now(), {
                          addSuffix: true,
                        })}
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        <EmptyList />
      )}
    </React.Fragment>
  );
};
export default React.memo(CollectionAssetListView, propsAreEqual);
