import { useBlockNumber, useEthers } from "@usedapp/core";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useActiveState } from "../hooks/useActiveState";
import {
  deleteOrder,
  OrderItem,
  OrderType,
  updateBlockNumber,
  useRemainingOrders,
} from "../features/order/orderSlice";
import { useCreateEventMutation } from "../hooks/mutation/createEventMutation";
import { LAZY_MINT_ADAPTER, useSeaport } from "../hooks/useSeaport";
import { MarketOrderEventType, MarketTransactionEventType } from "../type";
import { BigNumber } from "ethers";
import { removeCart } from "../features/cart/cartSlice";
import { TransactionReceipt } from "@ethersproject/abstract-provider";

export default function Updater(): any {
  const blockNumber = useBlockNumber();
  const dispatch = useDispatch();
  const { online } = useActiveState();
  const { eventCall } = useCreateEventMutation();
  const garbageData = useRemainingOrders();
  const { seaport } = useSeaport();
  const { library } = useEthers();

  const getMatchOrderVariables = useCallback(
    (order: OrderItem, receipt: TransactionReceipt): any => {
      return {
        assetId: order.asset.id,
        proxyAddress: LAZY_MINT_ADAPTER,
        contractAddress: order.asset.assetContractAddress,
        transactionHash: order.transactionHash,
        fromAddress:
          order.orderType === OrderType.LISTING_FULFILL
            ? order.orderData.offerer.userAddress
            : receipt.from,
        toAddress:
          order.orderType === OrderType.LISTING_FULFILL
            ? receipt.from
            : order.orderData.offerer.userAddress,
        orderEventType:
          order.orderType === OrderType.CANCEL
            ? MarketOrderEventType.CANCEL_ORDER
            : MarketOrderEventType.MATCH_ORDER,
        transactionEventType: MarketTransactionEventType.CONFIRMED,
        orderId: order.orderId,
        amount: order.orderData.amount,
      };
    },
    []
  );

  const getFailOrderVariables = useCallback(
    (order: OrderItem, receipt: TransactionReceipt): any => {
      return order.orderType === OrderType.CANCEL
        ? {
            assetId: order.asset.id,
            fromAddress: order.orderData.offerer.userAddress,
            proxyAddress: LAZY_MINT_ADAPTER,
            contractAddress: order.asset.assetContractAddress,
            transactionHash: order.transactionHash,
            eventType: MarketOrderEventType.FAIL_ORDER,
            transactionEventType: MarketTransactionEventType.FAILED,
            orderId: order.orderId,
            error: "",
          }
        : {
            assetId: order.asset.id,
            proxyAddress: LAZY_MINT_ADAPTER,
            contractAddress: order.asset.assetContractAddress,
            transactionHash: order.transactionHash,
            fromAddress:
              order.orderType === OrderType.LISTING_FULFILL
                ? order.orderData.offerer.userAddress
                : receipt.from,
            toAddress:
              order.orderType === OrderType.LISTING_FULFILL
                ? receipt.from
                : order.orderData.offerer.userAddress,
            orderEventType: MarketOrderEventType.FAIL_ORDER,
            transactionEventType: MarketTransactionEventType.FAILED,
            orderId: order.orderId,
            amount: order.orderData.amount,
          };
    },
    []
  );

  const checkGarbage = useCallback(
    (o: OrderItem) => {
      const originalData = JSON.parse(o.orderData.originalData);
      const orderHash: string = seaport.getOrderHash(originalData.parameters);

      Promise.all([
        seaport.getOrderStatus(orderHash),
        library.getTransactionReceipt(o.transactionHash),
      ]).then((res) => {
        console.debug("Transactions : ", res);
        const [orderStatus, receipt] = res;
        if (orderStatus && receipt) {
          const callback = (data: any) => {
            dispatch(deleteOrder(o.orderId));
            dispatch(removeCart({ orderId: o.orderId }));
            console.debug("garbageEventMutation >:", data);
          };
          const refetch = {
            assetContractAddress: o.asset.assetContractAddress,
            tokenId: o.asset.tokenId,
          };
          if (o.orderType === OrderType.CANCEL) {
            const isCancelled: boolean = orderStatus.isCancelled;
            if (isCancelled) {
              console.debug("The order you are trying to fulfill is cancelled");
              const variables =
                receipt?.status === 1
                  ? getMatchOrderVariables(o, receipt)
                  : getFailOrderVariables(o, receipt);
              eventCall(variables, callback, refetch);
            }
          } else {
            const totalFilled: BigNumber = orderStatus.totalFilled;
            const totalSize: BigNumber = orderStatus.totalSize;
            if (totalSize.gt(0) && totalFilled.div(totalSize).eq(1)) {
              console.debug("The order you are trying to fulfill is already filled");
              const variables =
                receipt?.status === 1
                  ? getMatchOrderVariables(o, receipt)
                  : getFailOrderVariables(o, receipt);
              eventCall(variables, callback, refetch);
            }
          }
        }
      });
    },
    [seaport, library, getMatchOrderVariables, getFailOrderVariables, eventCall, dispatch]
  );

  useEffect(() => {
    if (!online) return;
    if (garbageData?.length < 1) return;
    garbageData?.forEach((o: OrderItem) => {
      if (blockNumber - o.blockNumber > 5) checkGarbage(o);
    });
  }, [blockNumber, online, eventCall, garbageData, dispatch, seaport, checkGarbage]);

  useEffect(() => {
    dispatch(updateBlockNumber(blockNumber));
  }, [blockNumber, dispatch]);
}
