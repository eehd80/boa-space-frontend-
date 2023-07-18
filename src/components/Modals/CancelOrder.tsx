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
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import ThumbRatio from "../ThumbRatio";
import { useCancelCallback } from "../../hooks/useSeaportCallback";
import {
  isAlready,
  isCancelled as isCancelCheck,
  isRejected,
  LAZY_MINT_ADAPTER,
  ORDER_REASON,
} from "../../hooks/useSeaport";
import { MarketOrderEventType, MarketTransactionEventType } from "../../type";
import { useCreateEventMutation } from "../../hooks/mutation/createEventMutation";
import { formatEther } from "ethers/lib/utils";
import { deleteOrder, OrderType, saveOrder } from "../../features/order/orderSlice";
import { useDispatch } from "react-redux";
import { removeCart } from "../../features/cart/cartSlice";
import useModal from "../../hooks/useModal";
import { serializeError } from "eth-rpc-errors";
import { useEthers } from "@usedapp/core";
import { ContractReceipt } from "ethers";

interface ModalProp {
  isOpen: boolean;
  onClose(): void;
  asset?: any;
  orderData?: any;
  setOrderData?: any;
}
export const CancelOrder = ({ isOpen, onClose, asset, orderData, setOrderData }: ModalProp) => {
  const dispatch = useDispatch();
  const { account } = useEthers();
  const { eventCall } = useCreateEventMutation();
  const [retryVisible, setRetryVisible] = useState(false);
  const [order, setOrder] = useState<any>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isComplete, setComplete] = useState(false);
  const { alert } = useModal();

  const toast = useToast({
    position: "bottom-right",
    variant: "variant",
  });
  const { execute: listingCancel } = useCancelCallback();

  const saveOrderData = useCallback(
    (asset: any, orderData: any, hash: string) => {
      dispatch(
        saveOrder({
          orderId: orderData.id,
          transactionHash: hash,
          asset: asset,
          orderData: orderData,
          orderType: OrderType.CANCEL,
        })
      );
    },
    [dispatch]
  );

  const already = useCallback(
    (asset: any, orderData: any, msg: ORDER_REASON | string) => {
      onClose();
      dispatch(deleteOrder(orderData.orderId));
      dispatch(removeCart({ account, orderId: orderData.orderId }));
      alert(msg);
    },
    [onClose, dispatch, account, alert]
  );

  const cancelCall = useCallback(
    (asset: any, orderData: any) => {
      setOrder(orderData);
      setRetryVisible(false);
      if (orderData && listingCancel) {
        const { parameters: data } = JSON.parse(orderData.originalData);
        listingCancel(data)
          .then((tx) => {
            saveOrderData(asset, orderData, tx.hash);
            setLoading(true);
            const variablesData = {
              assetId: asset.id,
              fromAddress: account,
              proxyAddress: LAZY_MINT_ADAPTER,
              contractAddress: asset.assetContractAddress,
              transactionHash: tx.hash,
              orderId: orderData.id,
              error: "",
              orderEventType: MarketOrderEventType.CANCEL_ORDER,
              transactionEventType: MarketTransactionEventType.CREATED,
            };
            eventCall(variablesData);
            tx.wait().then((receipt: ContractReceipt) => {
              console.debug("Cancel Receipt : ", receipt);
              eventCall(
                {
                  ...variablesData,
                  transactionEventType:
                    receipt.status === 1
                      ? MarketTransactionEventType.CONFIRMED
                      : MarketTransactionEventType.FAILED,
                },
                (data: any) => {
                  console.debug("cancelEventMutation >:", data);
                },
                { assetContractAddress: asset.assetContractAddress, tokenId: asset.tokenId }
              );
              setOrderData(undefined);
              setLoading(false);
              setComplete(true);
              dispatch(deleteOrder(orderData.orderId));
              onClose();
            });
            // console.debug("Transacting");
          })
          .catch((reason) => {
            console.debug("REASON:", reason);
            if (isAlready(reason)) {
              already(asset, data, ORDER_REASON.ALREADY);
            } else if (isCancelCheck(reason)) {
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
    [listingCancel, saveOrderData, account, eventCall, setOrderData, dispatch, onClose, already]
  );

  useEffect(() => {
    if (isOpen && orderData && !order) {
      cancelCall(asset, orderData);
    }
  }, [isOpen, orderData, order, cancelCall, asset]);

  useEffect(() => {
    if (isComplete) {
      setComplete(false);
      toast({
        title: "Successfully cancel listing",
        status: "success",
      });
    }
  }, [toast, isComplete]);

  return (
    <Modal
      blockScrollOnMount={true}
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
      closeOnEsc={false}
    >
      <ModalOverlay />
      <ModalContent px={["15px", "15px", "15px", "25px"]}>
        <ModalHeader>
          <Heading variant="subtit22">
            {orderData?.offerType === "LISTING" ? "Cancel listing" : "Cancel offer"}
          </Heading>
        </ModalHeader>
        {!isLoading && <ModalCloseButton />}
        <ModalBody maxH="400px">
          <Box>
            {isLoading && (
              <Box textAlign="left" pb="40px">
                <Text variant="txt174" color="red" lineHeight="23px">
                  The transaction is in progress. Please wait without closing the window. The
                  transaction may take 3 minutes.
                </Text>
              </Box>
            )}
            <Flex>
              <Stack direction="row" justify="flex-start" align="center" spacing="15px">
                <Box
                  borderRadius="10px"
                  width="65px"
                  height="65px"
                  background="L_Gray_T01"
                  position="relative"
                >
                  <ThumbRatio src={asset?.thumbnailUrl} isLoading={isLoading} />
                </Box>
                <Stack justify="flex-start" align="flex-start" spacing="0px">
                  <Text variant="txt176" color="White">
                    {asset?.name}
                  </Text>
                  <Text variant="txt154" color="White" textAlign="left">
                    {asset?.assetCollection?.name}
                  </Text>
                </Stack>
              </Stack>
              <Spacer />
              <Box textAlign="right">
                <Text variant="txt206" color="White" mt="10px">
                  {orderData?.unitPrice && formatEther(orderData.unitPrice)} BOA
                </Text>
              </Box>
            </Flex>
            <Divider mb="40px" borderColor="#443F5B" />
            <Box textAlign="left">
              <Text variant="txt176" color="White">
                Go to your wallet
              </Text>
              <Text variant="txt174" color="White">
                You will be asked to review and confirm this cancellation in your wallet.
              </Text>
            </Box>
          </Box>
        </ModalBody>
        <ModalFooter>
          {retryVisible && (
            <Button
              variant="primary"
              w="100%"
              mt="70px"
              onClick={() => cancelCall(asset, orderData)}
            >
              Continue
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
