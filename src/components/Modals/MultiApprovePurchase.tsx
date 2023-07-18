import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import ThumbRatio from "../ThumbRatio";
import {
  isAlready,
  isCancelled,
  isRejected,
  LAZY_MINT_ADAPTER,
  ORDER_REASON,
  useSeaport,
} from "../../hooks/useSeaport";
import { useCreateEventMutation } from "../../hooks/mutation/createEventMutation";
import { useEthers } from "@usedapp/core";
import { formatEther } from "@ethersproject/units";
import { BigNumber } from "ethers";
import { CartItem, removeCart } from "../../features/cart/cartSlice";
import { getUSDPrice, useBOAPrice } from "../../features/price/boaPriceSlice";
import { useDispatch } from "react-redux";
import { MarketOrderEventType, MarketTransactionEventType } from "../../type";
import { deleteOrder, OrderType, saveOrder } from "../../features/order/orderSlice";
import useModal from "../../hooks/useModal";
import { serializeError } from "eth-rpc-errors";

interface ModalProp {
  isOpen: boolean;
  onClose(): void;
  assets: any;
  complete: any;
}
export const MultiApprovePurchase = ({ isOpen, onClose, assets, complete }: ModalProp) => {
  const { seaport } = useSeaport();
  const dispatch = useDispatch();
  const { eventCall } = useCreateEventMutation();
  const { account } = useEthers();
  const usd = useBOAPrice();
  const [retryVisible, setRetryVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { alert } = useModal();

  const { totalPrice, assetUrl } = useMemo(() => {
    if (assets && assets.length > 0) {
      return {
        totalPrice:
          assets?.reduce((total: BigNumber, item: any) => {
            return total.add(BigNumber.from(item.orderData.unitPrice));
          }, BigNumber.from(0)) ?? BigNumber.from(0),
        assetUrl: assets[0].asset.originalUrl,
      };
    }
    return {};
  }, [assets]);

  const already = useCallback(
    (asset: any, msg: ORDER_REASON | string) => {
      onClose();
      asset.forEach((d: any) => {
        dispatch(deleteOrder(d.orderData.id));
        dispatch(removeCart({ account, orderId: d.orderData.id }));
      });
      alert(msg);
    },
    [onClose, alert, dispatch, account]
  );

  const saveOrderData = useCallback(
    (assets: any, hash: string) => {
      if (assets?.length && hash) {
        assets.forEach(async (d: any) => {
          dispatch(
            saveOrder({
              orderId: d.orderData.id,
              transactionHash: hash,
              asset: d.asset,
              orderData: d.orderData,
              orderType: OrderType.LISTING_FULFILL,
            })
          );
        });
      }
    },
    [dispatch]
  );

  const listingFulfillHandler = useCallback(
    (data: any) => {
      const orders = data.map((item: CartItem) => {
        return {
          order: JSON.parse(item.orderData.originalData),
          unitsToFill: item.orderData.amount,
        };
      });
      seaport
        .fulfillOrders({
          fulfillOrderDetails: orders,
          accountAddress: account,
        })
        .then(({ executeAllActions }) => {
          executeAllActions()
            .then((tx) => {
              setLoading(true);
              saveOrderData(data, tx.hash);
              data.forEach(async (d: any) => {
                await eventCall({
                  orderId: d.orderData.id,
                  assetId: d.asset.id,
                  fromAddress: d.orderData.offerer.userAddress,
                  proxyAddress: LAZY_MINT_ADAPTER,
                  contractAddress: d.asset.assetContractAddress,
                  transactionHash: tx.hash,
                  toAddress: account,
                  orderEventType: MarketOrderEventType.MATCH_ORDER,
                  transactionEventType: MarketTransactionEventType.CREATED,
                  amount: d.orderData.amount,
                });
              });
              tx.wait().then((receipt) => {
                data.forEach(async (d: any) => {
                  await eventCall({
                    orderId: d.orderData.id,
                    assetId: d.asset.id,
                    fromAddress: d.orderData.offerer.userAddress,
                    proxyAddress: LAZY_MINT_ADAPTER,
                    contractAddress: d.asset.assetContractAddress,
                    transactionHash: receipt.transactionHash,
                    toAddress: receipt.from,
                    orderEventType: MarketOrderEventType.MATCH_ORDER,
                    transactionEventType:
                      receipt.status === 1
                        ? MarketTransactionEventType.CONFIRMED
                        : MarketTransactionEventType.FAILED,
                    amount: d.orderData.amount,
                  });
                  dispatch(deleteOrder(d.orderData.id));
                });
                setLoading(false);
                complete(receipt);
              });
            })
            .catch((reason) => {
              console.debug("Catch:", reason);
              setLoading(false);
              setRetryVisible(true);
            });
        })
        .catch((reason) => {
          console.debug("Metamask R:", reason);
          if (isAlready(reason)) {
            already(data, ORDER_REASON.ALREADY);
          } else if (isCancelled(reason)) {
            already(data, ORDER_REASON.CANCELLED);
          } else if (isRejected(reason)) {
            setRetryVisible(true);
          } else {
            const e = serializeError(reason);
            already(data, e.message.split(";")[0]);
          }
        });
    },
    [account, already, complete, eventCall, dispatch, saveOrderData, seaport]
  );

  const handlerRetry = useCallback(() => {
    setRetryVisible(false);
    listingFulfillHandler(assets);
  }, [assets, listingFulfillHandler]);

  useEffect(() => {
    if (isOpen && assets) {
      listingFulfillHandler(assets);
    } else {
      setRetryVisible(false);
      setLoading(false);
    }
  }, [isOpen, assets, listingFulfillHandler]);

  return (
    <Modal
      blockScrollOnMount={true}
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
      closeOnEsc={false}
    >
      <ModalOverlay />
      <ModalContent maxW="700px" pl="0" pr="3px">
        <ModalHeader>
          <Heading variant="subtit22">Approve purchase</Heading>
        </ModalHeader>
        {!loading && <ModalCloseButton />}
        <ModalBody px="30px">
          <Box>
            {loading && (
              <Box textAlign="left" pb="40px">
                <Text variant="txt174" color="red" lineHeight="23px">
                  The transaction is in progress. Please wait without closing the window. The
                  transaction may take 3 minutes.
                </Text>
              </Box>
            )}
            <Flex>
              <Stack
                flexGrow="1"
                direction="row"
                justify="flex-start"
                align="center"
                spacing="15px"
                w="calc(100% - 50px)"
              >
                <Box borderRadius="10px" width="74px" height="74px" background="L_Gray_T01">
                  <ThumbRatio src={assetUrl} isLoading={loading} />
                </Box>
                <Text variant="txt176" color="White" textAlign="left" whiteSpace="nowrap">
                  {assets.length} item
                </Text>
              </Stack>
              <Spacer />
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignContent="flex-end"
                textAlign="right"
              >
                <Text variant="txt206" color="White" whiteSpace="nowrap">
                  {totalPrice && formatEther(totalPrice)} BOA
                </Text>
                <Text variant="txt154" color="text_Gray01" whiteSpace="nowrap">
                  {totalPrice && getUSDPrice(totalPrice, usd)}
                </Text>
              </Box>
            </Flex>
            <Divider borderColor="popup_B01" mt="23px" mb="20px" />
            <Box textAlign="left" mt="23px">
              <Text variant="txt176" color="White">
                Go to your wallet
              </Text>
              <Text variant="txt174" color="White" lineHeight="23px">
                You’ll be asked to review and confirm this listing from your wallet.
              </Text>
            </Box>
            {retryVisible && (
              <Button variant="primary" w="100%" mt="54px" onClick={handlerRetry}>
                Continue
              </Button>
            )}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
