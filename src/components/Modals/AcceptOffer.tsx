import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import { createFulfillInput, useFulfillCallback } from "../../hooks/useSeaportCallback";
import { useEthers } from "@usedapp/core";
import {
  isAlready,
  isCancelled,
  isRejected,
  LAZY_MINT_ADAPTER,
  ORDER_REASON,
} from "../../hooks/useSeaport";
import { MarketOrderEventType, MarketTransactionEventType } from "../../type";
import { useCreateEventMutation } from "../../hooks/mutation/createEventMutation";
import ThumbRatio from "../ThumbRatio";
import { formatEther } from "@ethersproject/units";
import { getUSDPrice, useBOAPrice } from "../../features/price/boaPriceSlice";
import { formatDistance } from "date-fns";
import { shortAddress } from "../../utils/WalletUtils";
import { useGetFeeInfo } from "../../hooks/query/useGetFeeInfo";
import { BigNumber, ContractReceipt } from "ethers";
import { deleteOrder, OrderType, saveOrder } from "../../features/order/orderSlice";
import { useDispatch } from "react-redux";
import useModal from "../../hooks/useModal";
import { serializeError } from "eth-rpc-errors";

interface AcceptOfferProps {
  isOpen: boolean;
  onClose(): void;
  asset?: any;
  orderData?: any;
  collectionName?: string;
  listingPrice?: string;
  retry?: any;
  isSuccess?: boolean;
  viewListing?: any;
}
enum AcceptStep {
  STEP_1_LOW_AGREE,
  STEP_2_ACCEPT_OFFER,
  STEP_3_WALLET_WAITING,
}
export const AcceptOffer = (props: AcceptOfferProps) => {
  const { isOpen, onClose, asset, orderData } = props;
  const [retryVisible, setRetryVisible] = useState(false);
  const { account } = useEthers();
  const dispatch = useDispatch();
  const { eventCall } = useCreateEventMutation();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(AcceptStep.STEP_2_ACCEPT_OFFER);
  const { execute: offerFulfill } = useFulfillCallback();
  const { alert } = useModal();

  useEffect(() => {
    setStep(AcceptStep.STEP_2_ACCEPT_OFFER);
  }, [orderData]);

  const dispatchSaveOrderData = useCallback(
    (asset: any, orderData: any, hash: string) => {
      dispatch(
        saveOrder({
          orderId: orderData.id,
          transactionHash: hash,
          asset: asset,
          orderData: orderData,
          orderType: OrderType.OFFERING_FULFILL,
        })
      );
    },
    [dispatch]
  );

  const already = useCallback(
    (asset: any, orderData: any, msg: ORDER_REASON | string) => {
      onClose();
      dispatch(deleteOrder(orderData.orderId));
      alert(msg);
    },
    [onClose, dispatch, alert]
  );

  const offererFulfillHandler = useCallback(
    (asset: any, data: any) => {
      console.debug("offererFulfillHandler CALL >>>>>>>>>");
      if (offerFulfill && !loading) {
        const originalData = JSON.parse(data.originalData);
        const fulfillInput = createFulfillInput(originalData, data.amount, account);
        offerFulfill(fulfillInput)
          .then((tx) => {
            console.debug("fulfill > Tx ", tx);
            dispatchSaveOrderData(asset, data, tx.hash);
            setLoading(true);
            const variablesData = {
              orderId: orderData.id,
              assetId: asset.id,
              amount: orderData.amount,
              fromAddress: account,
              toAddress: orderData.offerer.userAddress,
              proxyAddress: LAZY_MINT_ADAPTER,
              contractAddress: asset.assetContractAddress,
              transactionHash: tx.hash,
              orderEventType: MarketOrderEventType.MATCH_ORDER,
              transactionEventType: MarketTransactionEventType.CREATED,
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
                  console.debug("offerFulfillEventMutation >:", data);
                  onClose();
                  setStep(AcceptStep.STEP_2_ACCEPT_OFFER);
                  setLoading(false);
                  dispatch(deleteOrder(orderData.orderId));
                },
                { assetContractAddress: asset.assetContractAddress, tokenId: asset.tokenId }
              );
            });
          })
          .catch((reason: any) => {
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
      } else {
        console.debug("fulfill is null");
      }
    },
    [
      offerFulfill,
      loading,
      account,
      dispatchSaveOrderData,
      eventCall,
      orderData,
      dispatch,
      onClose,
      already,
    ]
  );

  const handlerRetry = useCallback(() => {
    setRetryVisible(false);
    offererFulfillHandler(asset, orderData);
  }, [offererFulfillHandler, asset, orderData]);

  useEffect(() => {
    if (step === AcceptStep.STEP_3_WALLET_WAITING && asset && orderData) {
      offererFulfillHandler(asset, orderData);
    }
  }, [step, offererFulfillHandler, orderData, asset]);

  useEffect(() => {
    if (!isOpen) {
      setStep(AcceptStep.STEP_2_ACCEPT_OFFER);
    }
    setRetryVisible(false);
  }, [isOpen]);

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
          {step === AcceptStep.STEP_1_LOW_AGREE ? (
            <Heading variant="subtit22">Accept low offer?</Heading>
          ) : (
            <Heading variant="subtit22">Accept offer</Heading>
          )}
        </ModalHeader>
        {!loading && <ModalCloseButton />}

        {step === AcceptStep.STEP_1_LOW_AGREE && (
          <LowOfferBody
            onAccept={() => setStep(AcceptStep.STEP_2_ACCEPT_OFFER)}
            onCancel={() => onClose()}
          />
        )}
        {step === AcceptStep.STEP_2_ACCEPT_OFFER && (
          <AcceptOfferInfoBody
            onAccept={() => setStep(AcceptStep.STEP_3_WALLET_WAITING)}
            asset={asset}
            orderData={orderData}
          />
        )}
        {step === AcceptStep.STEP_3_WALLET_WAITING && (
          <TransactionWaitingBody
            assetName={asset?.name}
            assetUrl={asset?.thumbnailUrl}
            collectionName={asset?.assetCollection?.name}
            amount={orderData?.unitPrice}
            amountType={AmountType.TOKEN}
            isLoading={loading}
          />
        )}

        <ModalFooter>
          {retryVisible && (
            <Button variant="primary" w="100%" mt="70px" onClick={handlerRetry}>
              Continue
            </Button>
          )}
          {/*{isSuccess && (*/}
          {/*  <Button variant="primary" w="100%" mt="70px" onClick={viewListing}>*/}
          {/*    View listing*/}
          {/*  </Button>*/}
          {/*)}*/}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

interface AcceptOfferInfoBodyProps {
  asset?: any;
  orderData?: any;
  onAccept?: () => void;
}
export function AcceptOfferInfoBody({ onAccept, asset, orderData }: AcceptOfferInfoBodyProps) {
  const usd = useBOAPrice();
  const defaultFee = useGetFeeInfo();
  const { originalData, serviceFee, creatorFee, totalEarning } = useMemo(() => {
    if (orderData) {
      const origin = JSON.parse(orderData.originalData).parameters;
      const fees = origin?.consideration.filter((c: any) => c.itemType === 1);
      const c = fees.filter((f: any) => f?.recipient !== defaultFee?.manager);
      const creatorFee =
        c?.reduce((total: BigNumber, item: any) => {
          return total.add(BigNumber.from(item.startAmount));
        }, BigNumber.from(0)) ?? BigNumber.from(0);
      const serviceFee =
        fees.find((f: any) => f?.recipient === defaultFee?.manager)?.startAmount ?? "0";
      const totalEarning = BigNumber.from(orderData.unitPrice).sub(creatorFee).sub(serviceFee);
      return {
        originalData: origin,
        serviceFee: serviceFee,
        creatorFee: creatorFee,
        totalEarning: totalEarning,
      };
    }
    return {};
  }, [orderData, defaultFee]);
  return (
    <ModalBody>
      {/* type1 899.1237 BOA 105.369   94.64027*/}
      <Stack divider={<StackDivider borderColor="popup_B01" />} spacing="20px">
        <Flex>
          <Stack
            flexGrow="1"
            direction="row"
            justify="flex-start"
            align="center"
            spacing="15px"
            w="calc(100% - 50px)"
          >
            <Box
              overflow="hidden"
              borderRadius="10px"
              width="74px"
              height="74px"
              background="L_Gray_T01"
            >
              <ThumbRatio src={asset.originalUrl} />
            </Box>
            <Box>
              <Text variant="txt176" color="White" textAlign="left" whiteSpace="nowrap">
                {asset?.name}
              </Text>
              <Text variant="txt154" mt="5px" color="text_Gray01" whiteSpace="nowrap">
                {originalData &&
                  formatDistance(Number(originalData.startTime) * 1000, Date.now(), {
                    addSuffix: true,
                  })}
              </Text>
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
              {orderData?.unitPrice && formatEther(orderData.unitPrice)} WBOA
            </Text>
            <Text variant="txt154" mt="5px" color="text_Gray01" whiteSpace="nowrap">
              {getUSDPrice(orderData?.unitPrice, usd)}
            </Text>
          </Box>
        </Flex>
        <Flex align="flex-end">
          <Box textAlign="left">
            <Text variant="txt186" color="White">
              Offer details
            </Text>
            <Text variant="txt174" color="text_Gray02">
              Quantity
            </Text>
            <Text variant="txt174" color="text_Gray02">
              From
            </Text>
            <Text variant="txt174" color="text_Gray02">
              Expiration
            </Text>
          </Box>
          <Spacer />
          <Box textAlign="right">
            <Text variant="txt174" color="text_Gray02">
              {orderData?.amount}
            </Text>
            <Text variant="txt176" color="Secondary_V">
              {originalData && shortAddress(originalData.offerer)}
            </Text>
            <Text variant="txt174" color="text_Gray02">
              {originalData &&
                formatDistance(Number(originalData.endTime) * 1000, Date.now(), {
                  addSuffix: true,
                })}
            </Text>
          </Box>
        </Flex>
        <Flex align="flex-end">
          <Box textAlign="left">
            <Text variant="txt186" color="White">
              Fees
            </Text>
            <Text variant="txt174" color="text_Gray02">
              Service fee
            </Text>
            <Text variant="txt174" color="text_Gray02">
              Creator earnings
            </Text>
          </Box>
          <Spacer />
          <Box textAlign="right">
            <Text variant="txt176" color="#00A5BC">
              {serviceFee && formatEther(serviceFee)} WBOA
            </Text>
            <Text variant="txt174" color="text_Gray02">
              {creatorFee && formatEther(creatorFee)} WBOA
            </Text>
          </Box>
        </Flex>
        <Flex>
          <Box textAlign="left">
            <Text variant="txt186" color="White">
              Total estimated earnings
            </Text>
          </Box>
          <Spacer />
          <Box textAlign="right">
            <Text variant="txt186" color="White">
              {totalEarning && formatEther(totalEarning)} WBOA
            </Text>
            {/*  <Text variant="txt174" color="text_Gray02">
              2.50%
            </Text>*/}
          </Box>
        </Flex>
      </Stack>
      <Button variant="primary" w="100%" mt="54px" onClick={onAccept}>
        Accept
      </Button>
    </ModalBody>
  );
}

interface LowOfferBodyProps {
  onCancel?: () => void;
  onAccept?: () => void;
}
export function LowOfferBody({ onAccept, onCancel }: LowOfferBodyProps) {
  return (
    <ModalBody maxH="400px">
      <Text variant="txt174" color="text_Gray02">
        This offer is 100% below the floor price for this collection.
      </Text>
      <HStack spacing="20px" mt="50px">
        <Button variant="outline" color="Secondary_V" flexGrow="1" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" flexGrow="1" onClick={onAccept}>
          Accept offer
        </Button>
      </HStack>
    </ModalBody>
  );
}

interface TransactionWaitingModalBodyProps {
  assetName: string;
  assetUrl: string;
  collectionName: string;
  amount: string;
  amountType?: AmountType;
  isLoading?: boolean;
}
export enum AmountType {
  COIN,
  TOKEN,
}

export function TransactionWaitingBody({
  assetName = "",
  assetUrl = "",
  collectionName = "",
  amount = "0",
  amountType = AmountType.COIN,
  isLoading = false,
}: TransactionWaitingModalBodyProps) {
  const usd = useBOAPrice();
  return (
    <ModalBody>
      {isLoading && (
        <Box textAlign="left" pb="40px">
          <Text variant="txt174" color="red" lineHeight="23px">
            The transaction is in progress. Please wait without closing the window. The transaction
            may take 3 minutes.
          </Text>
        </Box>
      )}
      <Flex>
        <Stack direction="row" justify="flex-start" align="center" spacing="15px">
          <Box borderRadius="10px" width="65px" height="65px" background="L_Gray_T01">
            <ThumbRatio src={assetUrl} isLoading={isLoading} />
          </Box>
          <Stack justify="flex-start" align="flex-start" spacing="0px">
            <Text variant="txt176" color="White">
              {assetName}
            </Text>
            <Text variant="txt154" color="White" textAlign="left">
              {collectionName}
            </Text>
          </Stack>
        </Stack>
        <Spacer />
        <Box textAlign="right">
          <Text variant="txt206" color="White" mt="10px">
            {formatEther(amount) + (amountType === AmountType.COIN ? " BOA" : " WBOA")}
          </Text>
          <Text variant="txt154" color="text_Gray01">
            {getUSDPrice(amount, usd)}
          </Text>
        </Box>
      </Flex>
      <Divider mb="40px" borderColor="#443F5B" />
      <Box textAlign="left">
        <Text variant="txt176" color="White">
          Go to your wallet
        </Text>
        <Text variant="txt174" color="White">
          You’ll be asked to review and confirm this listing from your wallet.
        </Text>
      </Box>
    </ModalBody>
  );
}
