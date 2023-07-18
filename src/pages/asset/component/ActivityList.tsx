import React, { ReactElement } from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
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
import { formatEther } from "ethers/lib/utils";
import { getExplorerTxLink } from "../../../utils/WalletUtils";
import { formatDistance } from "date-fns";
import { ActivityType, OrderStatus } from "../../../type";
import { Link } from "react-router-dom";
import LinkAddress from "../../../components/Link/LinkAddress";
import { pascalCase } from "change-case";

interface ActivityListProps {
  activities?: any;
}
export default function ActivityList({ activities }: ActivityListProps) {
  return (
    <Accordion defaultIndex={[0]} allowMultiple>
      {/* Item Activity */}
      <AccordionItem bg="popup_hover">
        <h2>
          <AccordionButton>
            <Box as="span">
              <span className="material-symbols-outlined">swap_vert</span> Item Activity
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel>
          <TableContainer>
            <Table>
              <Thead>
                <Tr>
                  <Th>Event</Th>
                  <Th>Price</Th>
                  <Th>Quantity</Th>
                  <Th>From</Th>
                  <Th>To</Th>
                  <Th>Date</Th>
                </Tr>
              </Thead>
              <Tbody>
                {activities && activities.length ? (
                  activities.map((data: any, index: number) => {
                    const amount = data?.order?.unitPrice
                      ? formatEther(data.order.unitPrice)
                      : null;
                    const isStatusVisible =
                      [ActivityType.LIST, ActivityType.OFFER].includes(data.activityType) &&
                      data.order.status !== "SALE";
                    const date = formatDistance(new Date(data.createdAt), new Date(), {
                      addSuffix: true,
                    });
                    return (
                      <Tr key={index}>
                        <Th>
                          {getEventType(data.activityType)}
                          {isStatusVisible && (
                            <Box as="span" fontSize={11} ml={2} color="#EB5757">
                              {data?.order?.status === OrderStatus.ORDFAIL
                                ? "Order Failed"
                                : pascalCase(data?.order?.status)}
                            </Box>
                          )}
                        </Th>
                        <Td
                          style={
                            isStatusVisible && data?.order?.status === OrderStatus.CANCELED
                              ? { textDecoration: "line-through", textDecorationColor: "#FFFFFF" }
                              : undefined
                          }
                        >
                          {amount
                            ? `${amount} ${data?.order?.offerType === "OFFERING" ? "WBOA" : "BOA"}`
                            : null}
                        </Td>
                        <Td>{data.amount}</Td>
                        <Td>
                          <LinkAddress address={data?.from?.userAddress} />
                        </Td>
                        <Td>
                          <LinkAddress address={data?.to?.userAddress} />
                          {/*<Tooltip
                                  label="Supply Tooltip"
                                  placement="top"
                                  hasArrow
                                  arrowSize={10}
                                >
                                  <InfoIcon ml="5px" color="Point_Red" fontSize="16px" />
                                </Tooltip>*/}
                        </Td>
                        <Td>
                          {data?.txHash ? (
                            <Link to={getExplorerTxLink(data.txHash)} target="_blank">
                              <span className="blue ellipsis">
                                {date}
                                <Box as="span" pl="5px" className="material-symbols-outlined">
                                  open_in_new
                                </Box>
                              </span>
                            </Link>
                          ) : (
                            date
                          )}
                        </Td>
                      </Tr>
                    );
                  })
                ) : (
                  <Tr>
                    <Td colSpan={100}>
                      <Flex
                        alignItems="center"
                        justifyContent="center"
                        flexDirection="column"
                        py="80px"
                        textAlign="center"
                      >
                        <Image src="/images/icon/empty_item.svg" />
                        <Text variant="txt167" mt="16px" mr="-15px">
                          No item activity yet
                        </Text>
                      </Flex>
                    </Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
export const getEventType = (type: ActivityType): ReactElement => {
  if (type === ActivityType.MINTED) {
    return (
      <>
        <span className="material-symbols-outlined fill">auto_awesome</span>
        Minted
      </>
    );
  } else if (type === ActivityType.CANCEL) {
    return (
      <>
        <span className="material-symbols-outlined fill">cancel</span>
        Cancel
      </>
    );
  } else if (type === ActivityType.LIST) {
    return (
      <>
        <span className="material-symbols-outlined fill">sell</span>
        List
      </>
    );
  } else if (type === ActivityType.SELL) {
    return (
      <>
        <span className="material-symbols-outlined fill">shopping_cart</span>
        Sale
      </>
    );
  } else if (type === ActivityType.OFFER) {
    return (
      <>
        <Image src="/images/icon/approval_delegation.svg" />
        Offer
      </>
    );
  } else if (type === ActivityType.TRANSFER) {
    return (
      <>
        <span className="material-symbols-outlined fill">multiple_stop</span>
        Transfer
      </>
    );
  } else if (type === ActivityType.TXFAIL) {
    return (
      <>
        <span className="material-symbols-outlined fill">link_off</span>
        Order failed
      </>
    );
  }
  return null;
};
