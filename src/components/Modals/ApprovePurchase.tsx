import React, { useCallback, useEffect, useState } from "react";
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
import { createFulfillInput, useFulfillCallback } from "../../hooks/useSeaportCallback";
import { MarketOrderEventType, MarketTransactionEventType } from "../../type";
import {
  isAlready,
  isCancelled,
  isRejected,
  LAZY_MINT_ADAPTER,
  ORDER_REASON,
} from "../../hooks/useSeaport";
import { useCreateEventMutation } from "../../hooks/mutation/createEventMutation";
import { useEthers } from "@usedapp/core";
import { formatEther } from "@ethersproject/units";
import { getUSDPrice, useBOAPrice } from "../../features/price/boaPriceSlice";
import { useDispatch } from "react-redux";
import { deleteOrder, OrderType, saveOrder } from "../../features/order/orderSlice";
import useModal from "../../hooks/useModal";
import { removeCart } from "../../features/cart/cartSlice";
import { serializeError } from "eth-rpc-errors";
import { ContractReceipt } from "ethers";

interface ModalProp {
  isOpen: boolean;
  onClose(): void;
  asset: any;
  orderData: any;
  complete: any;
}
export const ApprovePurchase = ({ isOpen, onClose, asset, orderData, complete }: ModalProp) => {
  const { eventCall } = useCreateEventMutation();
  const { account } = useEthers();
  const [retryVisible, setRetryVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const usd = useBOAPrice();
  const dispatch = useDispatch();
  const { alert } = useModal();
  const { execute: fulfill } = useFulfillCallback();

  const already = useCallback(
    (asset: any, orderData: any, type: ORDER_REASON | string) => {
      onClose();
      dispatch(deleteOrder(orderData.orderId));
      dispatch(removeCart({ account, orderId: orderData.orderId }));
      alert(type);
    },
    [onClose, dispatch, account, alert]
  );

  const dispatchSaveOrderData = useCallback(
    (asset: any, orderData: any, hash: string) => {
      dispatch(
        saveOrder({
          orderId: orderData.id,
          transactionHash: hash,
          asset: asset,
          orderData: orderData,
          orderType: OrderType.LISTING_FULFILL,
        })
      );
    },
    [dispatch]
  );

  const listingFulfillHandler = useCallback(
    (asset: any, data: any) => {
      if (fulfill && !loading) {
        const originalData = JSON.parse(data.originalData);
        const fulfillInput = createFulfillInput(originalData, data.amount, account);
        fulfill(fulfillInput)
          .then((tx) => {
            console.debug("fulfill > Tx ", tx);
            setLoading(true);
            dispatchSaveOrderData(asset, data, tx.hash);
            const variablesData = {
              orderId: orderData.id,
              assetId: asset.id,
              fromAddress: orderData.offerer.userAddress,
              toAddress: account,
              proxyAddress: LAZY_MINT_ADAPTER,
              contractAddress: asset.assetContractAddress,
              transactionHash: tx.hash,
              orderEventType: MarketOrderEventType.MATCH_ORDER,
              transactionEventType: MarketTransactionEventType.CREATED,
              amount: orderData.amount,
            };
            eventCall(variablesData);
            tx.wait().then((receipt: ContractReceipt) => {
              console.debug("fulfill > receipt ", receipt);
              eventCall(
                {
                  ...variablesData,
                  transactionEventType:
                    receipt.status === 1
                      ? MarketTransactionEventType.CONFIRMED
                      : MarketTransactionEventType.FAILED,
                },
                (data: any) => {
                  setLoading(false);
                  dispatch(deleteOrder(orderData.orderId));
                  complete(receipt);
                  console.debug("fulfillEventMutation >:", data);
                },
                { assetContractAddress: asset.assetContractAddress, tokenId: asset.tokenId }
              );
            });
          })
          .catch((reason) => {
            console.debug("REASON:", reason);
            if (isAlready(reason)) {
              already(asset, data, ORDER_REASON.ALREADY);
            } else if (isCancelled(reason)) {
              already(asset, data, ORDER_REASON.CANCELLED);
            } else if (isRejected(reason)) {
              setRetryVisible(true);
            } else {
              const e = serializeError(reason);
              already(asset, data, e.message.split(";")[0]);
            }
          });
      }
    },
    [
      fulfill,
      loading,
      account,
      dispatchSaveOrderData,
      eventCall,
      orderData,
      dispatch,
      complete,
      already,
    ]
  );

  const handlerRetry = useCallback(() => {
    setRetryVisible(false);
    listingFulfillHandler(asset, orderData);
  }, [listingFulfillHandler, asset, orderData]);

  useEffect(() => {
    if (isOpen && orderData && asset) {
      listingFulfillHandler(asset, orderData);
    } else {
      setRetryVisible(false);
      setLoading(false);
    }
  }, [isOpen, orderData, listingFulfillHandler, asset]);

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
                  <ThumbRatio src={asset?.originalUrl} isLoading={loading} />
                </Box>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignContent="flex-end"
                  textAlign="right"
                >
                  <Text variant="txt176" color="White" textAlign="left" whiteSpace="nowrap">
                    {`1 item`}
                  </Text>
                  {orderData?.amount > 1 && (
                    <Text variant="txt176" color="White" textAlign="left" whiteSpace="nowrap">
                      {`Quantity : ${orderData.amount}`}
                    </Text>
                  )}
                </Box>
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
                  {orderData?.unitPrice && formatEther(orderData?.unitPrice)} BOA
                </Text>
                <Text variant="txt154" color="text_Gray01" whiteSpace="nowrap">
                  {orderData?.unitPrice && getUSDPrice(orderData.unitPrice, usd)}
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
