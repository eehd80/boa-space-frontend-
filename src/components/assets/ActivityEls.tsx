import React from "react";
import {
  Box,
  Button,
  Center,
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
import { getEventType } from "../../pages/asset/component/ActivityList";
import { formatEther } from "@ethersproject/units";
import { getExplorerTxLink } from "../../utils/WalletUtils";
import { formatDistance } from "date-fns";
import { Link } from "react-router-dom";
import LinkAddress from "../Link/LinkAddress";
import { getUSDPrice, useBOAPrice } from "../../features/price/boaPriceSlice";

export default function ActivityEls({ activities }: { activities: any[] }) {
  const usd = useBOAPrice();
  return (
    <>
      {activities?.length ? (
        <TableContainer mt="20px">
          <Table variant="main">
            <Thead>
              <Tr>
                <Th></Th>
                <Th>Item</Th>
                <Th textAlign="right">Price</Th>
                <Th>Quantity</Th>
                <Th>From</Th>
                <Th>To</Th>
                <Th>Time</Th>
              </Tr>
            </Thead>
            <Tbody>
              {activities.map((vo: any) => {
                const isCanceled =
                  ["LIST", "OFFER"].includes(vo.activityType) && vo?.order?.status === "CANCELED";
                const date = formatDistance(new Date(vo.createdAt), new Date(), {
                  addSuffix: true,
                });
                return (
                  <Tr key={vo.id}>
                    <Th>
                      <HStack align="center">
                        {getEventType(vo.activityType)}
                        {isCanceled && (
                          <Text as="span" variant="txt124" color="point02">
                            Cancel
                          </Text>
                        )}
                        {/*{isExpired && (
                          <Text as="span" variant="txt124" color="point02">
                            Expired
                          </Text>
                        )}*/}
                      </HStack>
                    </Th>
                    <Td>
                      <HStack spacing="15px">
                        <Box overflow="hidden" w="40px" h="40px" bg="popup_BBGG" borderRadius="8px">
                          <Image
                            src={
                              vo?.asset?.thumbnailUrl ??
                              "https://i.seadn.io/gcs/files/e4a1df907db7f45baeaece02955b4764.png?auto=format&w=48"
                            }
                            w="100%"
                            h="100%"
                            objectFit="cover"
                            objectPosition="50% 50%"
                          />
                        </Box>
                        <Box>
                          <Text variant="txt154" color="text_Gray02">
                            {vo?.asset?.assetCollection?.name}
                          </Text>
                          <Text variant="txt156">{vo?.asset?.name}</Text>
                        </Box>
                      </HStack>
                    </Td>
                    <Td>
                      <Text variant="txt146">
                        {vo?.order?.unitPrice ? `${formatEther(vo.order.unitPrice)}  BOA` : "---"}
                      </Text>
                      <Text variant="txt134" color="text_Gray02">
                        {vo?.order?.unitPrice && getUSDPrice(vo.order.unitPrice, usd)}
                      </Text>
                    </Td>
                    <Td>
                      <Text variant="txt164" color="White">
                        {vo.amount}
                      </Text>
                    </Td>
                    <Td>
                      <LinkAddress address={vo?.from?.userAddress} isLeft={true} />
                    </Td>
                    <Td>
                      <LinkAddress address={vo?.to?.userAddress} isLeft={true} />
                    </Td>
                    <Td>
                      {vo?.txHash ? (
                        <Text
                          as={Link}
                          target="_blank"
                          to={getExplorerTxLink(vo.txHash)}
                          variant="txt154"
                          color="Secondary_V"
                        >
                          {date}
                          <Box as="span" pl="5px" className="material-symbols-outlined">
                            open_in_new
                          </Box>
                        </Text>
                      ) : (
                        <Text variant="txt154" color="White">
                          {date}
                        </Text>
                      )}
                    </Td>
                  </Tr>
                );
              })}
              {/*
              <Tr>
                <Th>
                  <HStack align="center">
                    <span className="material-symbols-outlined fill">auto_awesome</span>
                    <Text variant="txt157">Minted</Text>
                  </HStack>
                </Th>
                <Td>
                  <HStack spacing="15px">
                    <Box overflow="hidden" w="40px" h="40px" bg="popup_BBGG" borderRadius="8px">
                      <Image
                        src="https://i.seadn.io/gcs/files/e4a1df907db7f45baeaece02955b4764.png?auto=format&w=48"
                        w="100%"
                        h="100%"
                        objectFit="cover"
                        objectPosition="50% 50%"
                      />
                    </Box>
                    <Box>
                      <Text variant="txt154" color="text_Gray02">
                        KarunaXprivateFund Collection
                      </Text>
                      <Text variant="txt156">sunny</Text>
                    </Box>
                  </HStack>
                </Td>
                <Td>
                  <Text variant="txt146">---</Text>
                </Td>
                <Td>
                  <Text variant="txt164" color="White">
                    1
                  </Text>
                </Td>
                <Td>
                  <Text variant="txt154" color="Secondary_V">
                    NullAddress
                  </Text>
                </Td>
                <Td>
                  <Text variant="txt154" color="Secondary_V">
                    you
                  </Text>
                </Td>
                <Td>
                  <Text variant="txt154" color="White">
                    2 days ago
                  </Text>
                </Td>
              </Tr>
              <Tr>
                <Th>
                  <HStack align="center">
                    <Image src="/images/icon/approval_delegation.svg" mr="0" />
                    <Text variant="txt157">Offer</Text>
                  </HStack>
                </Th>
                <Td>
                  <HStack spacing="15px">
                    <Box overflow="hidden" w="40px" h="40px" bg="popup_BBGG" borderRadius="8px">
                      <Image
                        src="https://i.seadn.io/gcs/files/e4a1df907db7f45baeaece02955b4764.png?auto=format&w=48"
                        w="100%"
                        h="100%"
                        objectFit="cover"
                        objectPosition="50% 50%"
                      />
                    </Box>
                    <Box>
                      <Text variant="txt154" color="text_Gray02">
                        KarunaXprivateFund Collection
                      </Text>
                      <Text variant="txt156">sunny</Text>
                    </Box>
                  </HStack>
                </Td>
                <Td>
                  <Text variant="txt146">---</Text>
                </Td>
                <Td>
                  <Text variant="txt164" color="White">
                    1
                  </Text>
                </Td>
                <Td>
                  <Text variant="txt154" color="Secondary_V">
                    NullAddress
                  </Text>
                </Td>
                <Td>
                  <Text variant="txt154" color="Secondary_V">
                    you
                  </Text>
                </Td>
                <Td>
                  <Text variant="txt154" color="Secondary_V">
                    10 months ago <span className="material-symbols-outlined">open_in_new</span>
                  </Text>
                </Td>
              </Tr>
              <Tr>
                <Th>
                  <HStack align="center">
                    <span className="material-symbols-outlined">multiple_stop</span>
                    <Text variant="txt157">Transfer</Text>
                  </HStack>
                </Th>
                <Td>
                  <HStack spacing="15px">
                    <Box overflow="hidden" w="40px" h="40px" bg="popup_BBGG" borderRadius="8px">
                      <Image
                        src="https://i.seadn.io/gcs/files/e4a1df907db7f45baeaece02955b4764.png?auto=format&w=48"
                        w="100%"
                        h="100%"
                        objectFit="cover"
                        objectPosition="50% 50%"
                      />
                    </Box>
                    <Box>
                      <Text variant="txt154" color="text_Gray02">
                        KarunaXprivateFund Collection
                      </Text>
                      <Text variant="txt156">sunny</Text>
                    </Box>
                  </HStack>
                </Td>
                <Td>
                  <Text variant="txt146">---</Text>
                </Td>
                <Td>
                  <Text variant="txt164" color="White">
                    1
                  </Text>
                </Td>
                <Td>
                  <Text variant="txt154" color="Secondary_V">
                    NullAddress
                  </Text>
                </Td>
                <Td>
                  <Text variant="txt154" color="Secondary_V">
                    you
                  </Text>
                </Td>
                <Td>
                  <Text variant="txt154" color="Secondary_V">
                    10 months ago <span className="material-symbols-outlined">open_in_new</span>
                  </Text>
                </Td>
              </Tr>
              <Tr>
                <Th>
                  <HStack align="center">
                    <span className="material-symbols-outlined fill">shopping_cart</span>
                    <Text variant="txt157">Sale</Text>
                  </HStack>
                </Th>
                <Td>
                  <HStack spacing="15px">
                    <Box overflow="hidden" w="40px" h="40px" bg="popup_BBGG" borderRadius="8px">
                      <Image
                        src="https://i.seadn.io/gcs/files/e4a1df907db7f45baeaece02955b4764.png?auto=format&w=48"
                        w="100%"
                        h="100%"
                        objectFit="cover"
                        objectPosition="50% 50%"
                      />
                    </Box>
                    <Box>
                      <Text variant="txt154" color="text_Gray02">
                        KarunaXprivateFund Collection
                      </Text>
                      <Text variant="txt156">sunny</Text>
                    </Box>
                  </HStack>
                </Td>
                <Td>
                  <Text variant="txt146">---</Text>
                </Td>
                <Td>
                  <Text variant="txt164" color="White">
                    1
                  </Text>
                </Td>
                <Td>
                  <Text variant="txt154" color="Secondary_V">
                    NullAddress
                  </Text>
                </Td>
                <Td>
                  <Text variant="txt154" color="Secondary_V">
                    you
                  </Text>
                </Td>
                <Td>
                  <Text variant="txt154" color="Secondary_V">
                    10 months ago <span className="material-symbols-outlined">open_in_new</span>
                  </Text>
                </Td>
              </Tr>*/}
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        <Center flexDir="column" py="100px">
          <Text
            fontSize={["22px", "22px", "22px", "28px"]}
            fontWeight={600}
            color="text_Gray02"
            textAlign="center"
          >
            Seems a little boring here
          </Text>
          <Button variant="primary" w="200px" mt="50px">
            Upload now
          </Button>
        </Center>
      )}
    </>
  );
}
