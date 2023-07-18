import React, { useEffect } from "react";

import { Box, Button, VStack } from "@chakra-ui/react";
import { Seaport } from "boa-space-seaport-js";
import { BigNumber } from "ethers";
import { JsonRpcProvider } from "@ethersproject/providers/src.ts/json-rpc-provider";
import { useEthers } from "@usedapp/core";
import { parseEther, randomBytes } from "ethers/lib/utils";
import { ItemType, MAX_INT } from "boa-space-seaport-js/lib/constants";
import {
  CreateOrderInput,
  Item,
  MatchOrdersFulfillment,
  Order,
  OrderStatus,
  OrderWithCounter,
} from "boa-space-seaport-js/lib/types";
import { Buffer } from "buffer";

// @ts-ignore
window.Buffer = Buffer;

export const SEAPORT_ADDRESS = process.env.REACT_APP_SEAPORT_ADDRESS;
export const LAZY_MINT_ADAPTER = process.env.REACT_APP_LAZY_MINT_ADAPTER_ADDRESS;
export const ASSET_CONTRACT = process.env.REACT_APP_ASSET_CONTRACT_SHARED_ADDRESS;
export const WBOA9 = process.env.REACT_APP_WBOA9_ADDRESS;
export const PAYABLE_PROXY = process.env.REACT_APP_PAYABLE_PROXY_ADDRESS;
export const TOKEN_ID =
  "9490434390849790054731572076376116650519590089042247525170096698442617143872";
export const TOKEN_ID_2 =
  "9490434390849790054731572076376116650519590089042247525170304508339290063424";
export const MATCH_ORDER_RECIPIENT = "0xAcb913db781a46611fAa04Ff6Cb9A370df069eed";

export const BOASPACE_DOMAIN = "boaspace.io";

export const TEST_ERC721_ADDRESS = "0xcD9aEC7eA9b5F74a5340643e862704F56628e3Cf";
export const TEST_ERC721_TOKEN_ID = "1"; // 테스트를 위하여 1부터 20까지 사용가능

export const isCurrencyItem = ({ itemType }: Item) =>
  [ItemType.NATIVE, ItemType.ERC20].includes(itemType);

export const generateRandomSalt = () => {
  return `0x${Buffer.from(randomBytes(8)).toString("hex").padStart(24, "0")}`;
};

export const constructPrivateListingCounterOrder = (
  order: OrderWithCounter,
  privateSaleRecipient: string
): Order => {
  // Counter order offers up all the items in the private listing consideration
  // besides the items that are going to the private listing recipient
  const paymentItems = order.parameters.consideration.filter(
    (item) => item.recipient.toLowerCase() !== privateSaleRecipient.toLowerCase()
  );

  if (!paymentItems.every((item) => isCurrencyItem(item))) {
    throw new Error(
      "The consideration for the private listing did not contain only currency items"
    );
  }
  if (!paymentItems.every((item) => item.itemType === paymentItems[0].itemType)) {
    throw new Error("Not all currency items were the same for private order");
  }

  const { aggregatedStartAmount, aggregatedEndAmount } = paymentItems.reduce(
    ({ aggregatedStartAmount, aggregatedEndAmount }, item) => ({
      aggregatedStartAmount: aggregatedStartAmount.add(item.startAmount),
      aggregatedEndAmount: aggregatedEndAmount.add(item.endAmount),
    }),
    {
      aggregatedStartAmount: BigNumber.from(0),
      aggregatedEndAmount: BigNumber.from(0),
    }
  );

  const counterOrder: Order = {
    parameters: {
      ...order.parameters,
      offerer: privateSaleRecipient,
      offer: [
        {
          itemType: paymentItems[0].itemType,
          token: paymentItems[0].token,
          identifierOrCriteria: paymentItems[0].identifierOrCriteria,
          startAmount: aggregatedStartAmount.toString(),
          endAmount: aggregatedEndAmount.toString(),
        },
      ],
      // The consideration here is empty as the original private listing order supplies
      // the taker address to receive the desired items.
      consideration: [],
      salt: generateRandomSalt(),
      totalOriginalConsiderationItems: 0,
    },
    signature: "0x",
  };

  return counterOrder;
};

export const getPrivateListingFulfillments = (
  privateListingOrder: OrderWithCounter
): MatchOrdersFulfillment[] => {
  const nftRelatedFulfillments: MatchOrdersFulfillment[] = [];

  // For the original order, we need to match everything offered with every consideration item
  // on the original order that's set to go to the private listing recipient
  privateListingOrder.parameters.offer.forEach((offerItem, offerIndex) => {
    const considerationIndex = privateListingOrder.parameters.consideration.findIndex(
      (considerationItem) =>
        considerationItem.itemType === offerItem.itemType &&
        considerationItem.token === offerItem.token &&
        considerationItem.identifierOrCriteria === offerItem.identifierOrCriteria
    );
    if (considerationIndex === -1) {
      throw new Error(
        "Could not find matching offer item in the consideration for private listing"
      );
    }
    nftRelatedFulfillments.push({
      offerComponents: [
        {
          orderIndex: 0,
          itemIndex: offerIndex,
        },
      ],
      considerationComponents: [
        {
          orderIndex: 0,
          itemIndex: considerationIndex,
        },
      ],
    });
  });

  const currencyRelatedFulfillments: MatchOrdersFulfillment[] = [];

  // For the original order, we need to match everything offered with every consideration item
  // on the original order that's set to go to the private listing recipient
  privateListingOrder.parameters.consideration.forEach((considerationItem, considerationIndex) => {
    if (!isCurrencyItem(considerationItem)) {
      return;
    }
    // We always match the offer item (index 0) of the counter order (index 1)
    // with all of the payment items on the private listing
    currencyRelatedFulfillments.push({
      offerComponents: [
        {
          orderIndex: 1,
          itemIndex: 0,
        },
      ],
      considerationComponents: [
        {
          orderIndex: 0,
          itemIndex: considerationIndex,
        },
      ],
    });
  });

  return [...nftRelatedFulfillments, ...currencyRelatedFulfillments];
};

export default function SdkSample() {
  let seaport: Seaport;
  const { account, library } = useEthers();

  let standardCreateOrderInput: CreateOrderInput;
  let order: OrderWithCounter;
  let counterOrder: Order;
  let multipleOrders: OrderWithCounter[];
  let counter: number;
  let orderStatus: OrderStatus;

  const [orderData, setOrderData] = React.useState(order);
  const [multipleOrdersData, setMultipleOrdersData] = React.useState(multipleOrders);
  const [counterData, setCounterData] = React.useState(counter);

  useEffect(() => {}, []);

  const setEnvironment = () => {
    const provider = library as JsonRpcProvider;
    seaport = new Seaport(provider, {
      overrides: {
        contractAddress: SEAPORT_ADDRESS, // 테스트넷에 배포된 Seaport 컨트랙트 주소
      },
    });

    console.debug("Seaport: ", seaport.contract.address);
  };

  /////////////////////////////////////////////////////////////////////////////
  // 리스팅를 통한 거래. NFT를 주고 BOA를 받음
  const handlerOnClickCreateOrder = () => {
    console.debug("====== Create Order Click ======");
    setEnvironment();

    // the count of the NFT tokens to sell
    const assetTokenAmount = "10";

    // information for order
    standardCreateOrderInput = {
      allowPartialFills: true, // 부분 거래 허용 여부
      startTime: Math.floor(Date.now() / 1000).toString(), // 거래 시작 시간
      endTime: MAX_INT.toString(), // 거래 종료 시간

      offer: [
        {
          itemType: ItemType.ERC1155, // 아이템 타입
          token: LAZY_MINT_ADAPTER, // 아이템 컨트랙트 주소
          amount: assetTokenAmount, // 아이템 개수
          identifier: TOKEN_ID, // 아이템 토큰 아이디
        },
      ],
      consideration: [
        {
          amount: parseEther("0.1").toString(), // Native Token(BOA) 개수
          recipient: account, // Native Token을 받을 대상
        },
      ],
      // 2.5% fee
      fees: [{ recipient: PAYABLE_PROXY, basisPoints: 250 }],
    };

    // create an order
    seaport
      .createOrder(standardCreateOrderInput, account)
      .then(({ actions, executeAllActions }) => {
        console.debug("actions:", JSON.stringify(actions));
        executeAllActions().then((_order) => {
          order = _order;
          setOrderData(order);
          console.debug("order:", JSON.stringify(order));
          seaport.getOrderStatus(seaport.getOrderHash(order.parameters)).then((_orderStatus) => {
            orderStatus = _orderStatus;
            console.debug("orderStatus:", JSON.stringify(orderStatus));
          });
        });
      });
  };

  const handlerOnClickFulfillOrder = () => {
    console.debug("====== Fulfill Order Click ======");
    setEnvironment();
    order = orderData;
    console.debug("order:", JSON.stringify(order));

    // information for fulfilling the order
    const fulfillInput = {
      order: order,
      unitsToFill: 2, // 2개만 구매하기로 함
      accountAddress: account, // 주문 완결하는 사람 (fulfiller)
    };
    seaport.fulfillOrder(fulfillInput).then(({ actions }) => {
      console.debug("actions:", JSON.stringify(actions));
      const fulfillAction = actions[0];
      fulfillAction.transactionMethods.transact().then((transaction) => {
        transaction.wait().then((receipt) => {
          console.debug("Order fuflfilled - transactionHash:", receipt.transactionHash);
        });
      });
    });
  };

  ////////////////////////////////////////////////////////////////////////////
  // 리스팅를 통한 거래. NFT를 주고 WBOA를 받음
  const handlerOnClickCreateOrderWBoa = () => {
    console.debug("====== Create Order WBOA to NFT ======");
    setEnvironment();
    // the count of the NFT tokens to sell
    const assetTokenAmount = "10";

    // information for order
    standardCreateOrderInput = {
      allowPartialFills: true, // 부분 거래 허용 여부
      startTime: Math.floor(Date.now() / 1000).toString(), // 거래 시작 시간
      endTime: MAX_INT.toString(), // 거래 종료 시간

      offer: [
        {
          itemType: ItemType.ERC1155, // 아이템 타입
          token: LAZY_MINT_ADAPTER, // 아이템 컨트랙트 주소
          amount: assetTokenAmount, // 아이템 개수
          identifier: TOKEN_ID, // 아이템 토큰 아이디
        },
      ],
      consideration: [
        {
          amount: parseEther("0.1").toString(), // WBOA 개수
          token: WBOA9, // WBOA 컨트랙트 주
          recipient: account, // WBOA 받을 대상
        },
      ],
      // 2.5% fee
      fees: [{ recipient: PAYABLE_PROXY, basisPoints: 250 }],
    };

    // create an order
    seaport
      .createOrder(standardCreateOrderInput, account)
      .then(({ actions, executeAllActions }) => {
        console.debug("actions:", JSON.stringify(actions));
        executeAllActions().then((_order) => {
          order = _order;
          setOrderData(order);
          console.debug("order:", JSON.stringify(order));
          seaport.getOrderStatus(seaport.getOrderHash(order.parameters)).then((_orderStatus) => {
            orderStatus = _orderStatus;
            console.debug("orderStatus:", JSON.stringify(orderStatus));
          });
        });
      });
  };

  const handlerOnClickFulfillOrderWBoa = () => {
    console.debug("====== Fulfill Order WBOA to NFT ======");
    setEnvironment();
    order = orderData;
    console.debug("order:", JSON.stringify(order));

    // information for fulfilling the order
    const fulfillInput = {
      order: order,
      unitsToFill: 4, // 4개만 구매하기로 함
      accountAddress: account, // 주문 완결하는 사람 (fulfiller)
    };
    seaport.fulfillOrder(fulfillInput).then(async ({ actions }) => {
      console.debug("actions:", JSON.stringify(actions));
      for (let i = 0; i < actions.length; i++) {
        // actions 배열에는 두가지 action type이 존재함: approval, exchange.
        if (actions[i].type == "approval") {
          const transaction = actions[i].transactionMethods.transact();
          await (await transaction).wait();
          console.debug("%s completed", actions[i].type);
        } else {
          // "exchange"
          const transaction = actions[i].transactionMethods.transact();
          const receipt = await (await transaction).wait();
          console.debug("Order fuflfilled - transactionHash:", receipt.transactionHash);
        }
      }
    });
  };

  ////////////////////////////////////////////////////////////////////////////
  // 오퍼를 통한 거래. WBOA를 주고 NFT 받음
  const handlerOnClickCreateOrderOffer = () => {
    console.debug("====== Create Order for offer ======");
    setEnvironment();
    // the count of the NFT tokens to sell
    const assetTokenAmount = "10";

    // information for order
    standardCreateOrderInput = {
      allowPartialFills: true, // 부분 거래 허용 여부
      startTime: Math.floor(Date.now() / 1000).toString(), // 거래 시작 시간
      endTime: MAX_INT.toString(), // 거래 종료 시간

      offer: [
        {
          amount: parseEther("0.1").toString(), // 원하는 WBOA 개수
          token: WBOA9, // WBOA 컨트랙트 주소
        },
      ],
      consideration: [
        {
          itemType: ItemType.ERC1155, // 아이템 타입
          token: LAZY_MINT_ADAPTER, // 아이템 컨트랙트 주소
          amount: assetTokenAmount, // 아이템 개수
          identifier: TOKEN_ID, // 아이템 토큰 아이디
          recipient: account, // 아이템 받을 대상
        },
      ],
      // 2.5% fee
      fees: [{ recipient: PAYABLE_PROXY, basisPoints: 250 }],
    };

    // create an order
    seaport
      .createOrder(standardCreateOrderInput, account)
      .then(({ actions, executeAllActions }) => {
        console.debug("actions:", JSON.stringify(actions));
        executeAllActions().then((_order) => {
          order = _order;
          setOrderData(order);
          console.debug("order:", JSON.stringify(order));
          seaport.getOrderStatus(seaport.getOrderHash(order.parameters)).then((_orderStatus) => {
            orderStatus = _orderStatus;
            console.debug("orderStatus:", JSON.stringify(orderStatus));
          });
        });
      });
  };

  const handlerOnClickFulfillOrderOffer = () => {
    console.debug("====== Fulfill Order for offer ======");
    setEnvironment();
    order = orderData;
    console.debug("order:", JSON.stringify(order));

    // information for fulfilling the order
    const fulfillInput = {
      order: order,
      unitsToFill: 5, // 일부만 구매하기로 함
      accountAddress: account, // 주문 완결하는 사람 (fulfiller)
    };
    seaport.fulfillOrder(fulfillInput).then(({ actions }) => {
      console.debug("actions:", JSON.stringify(actions));
      const fulfillAction = actions[0];
      fulfillAction.transactionMethods.transact().then((transaction) => {
        transaction.wait().then((receipt) => {
          console.debug("###### Order fuflfilled - transactionHash:", receipt.transactionHash);
        });
      });
    });
  };

  /////////////////////////////////////////////////////////////////////////////
  // 오퍼를 통한 거래. validate() 콜 이용
  const handlerOnClickCreateOrderOfferValidate = () => {
    console.debug("== Create Order with validate() ==");
    setEnvironment();
    // the count of the NFT tokens to sell
    const assetTokenAmount = "10";

    // information for order
    standardCreateOrderInput = {
      allowPartialFills: true, // 부분 거래 허용 여부
      startTime: Math.floor(Date.now() / 1000).toString(), // 거래 시작 시간
      endTime: MAX_INT.toString(), // 거래 종료 시간

      offer: [
        {
          amount: parseEther("0.1").toString(), // 원하는 WBOA 개수
          token: WBOA9, // WBOA 컨트랙트 주소
        },
      ],
      consideration: [
        {
          itemType: ItemType.ERC1155, // 아이템 타입
          token: LAZY_MINT_ADAPTER, // 아이템 컨트랙트 주소
          amount: assetTokenAmount, // 아이템 개수
          identifier: TOKEN_ID, // 아이템 토큰 아이디
          recipient: account, // 아이템 받을 대상
        },
      ],
      // 2.5% fee
      fees: [{ recipient: PAYABLE_PROXY, basisPoints: 250 }],
    };

    // create an order
    seaport
      .createOrder(standardCreateOrderInput, account)
      .then(({ actions, executeAllActions }) => {
        console.debug("actions:", JSON.stringify(actions));
        executeAllActions().then((_order) => {
          order = _order;
          setOrderData(order);
          console.debug("order:", JSON.stringify(order));
          seaport.getOrderStatus(seaport.getOrderHash(order.parameters)).then((_orderStatus) => {
            orderStatus = _orderStatus;
            console.debug("orderStatus:", JSON.stringify(orderStatus));

            // call validate() for the order
            seaport
              .validate([order], account)
              .transact()
              .then(() => {
                console.debug("validate() called.");
              });
          });
        });
      });
  };

  const handlerOnClickFulfillOrderOfferValidate = () => {
    console.debug("== Fulfill for offer with validate() ==");
    setEnvironment();
    order = orderData;
    console.debug("order:", JSON.stringify(order));

    // information for fulfilling the order
    const fulfillInput = {
      order: order,
      unitsToFill: 5, // 일부만 구매하기로 함
      accountAddress: account, // 주문 완결하는 사람 (fulfiller)
    };

    // Remove signature
    // 이미 validate()함수를 통해서, 오더가 `verified`되었으므로 시그너처를 수정해도 오더가 완료(fulfill)됨.
    order.signature = "0x";

    seaport.fulfillOrder(fulfillInput).then(({ actions }) => {
      console.debug("actions:", JSON.stringify(actions));
      const fulfillAction = actions[0];
      fulfillAction.transactionMethods.transact().then((transaction) => {
        transaction.wait().then((receipt) => {
          console.debug("###### Order fuflfilled - transactionHash:", receipt.transactionHash);
        });
      });
    });
  };

  ////////////////////////////////////////////////////////////////////////////
  // 오퍼를 생성한후에 취소함
  const handlerOnClickCreateOrderForCancelling = () => {
    console.debug("====== Create Order for cancelling ======");
    setEnvironment();
    // the count of the NFT tokens to sell
    const assetTokenAmount = "10";

    // information for order
    standardCreateOrderInput = {
      allowPartialFills: true, // 부분 거래 허용 여부
      startTime: Math.floor(Date.now() / 1000).toString(), // 거래 시작 시간
      endTime: MAX_INT.toString(), // 거래 종료 시간

      offer: [
        {
          amount: parseEther("0.1").toString(), // 원하는 WBOA 개수
          token: WBOA9, // WBOA 컨트랙트 주소
        },
      ],
      consideration: [
        {
          itemType: ItemType.ERC1155, // 아이템 타입
          token: LAZY_MINT_ADAPTER, // 아이템 컨트랙트 주소
          amount: assetTokenAmount, // 아이템 개수
          identifier: TOKEN_ID, // 아이템 토큰 아이디
          recipient: account, // 아이템 받을 대상
        },
      ],
      // 2.5% fee
      fees: [{ recipient: PAYABLE_PROXY, basisPoints: 250 }],
    };

    // create an order
    seaport
      .createOrder(standardCreateOrderInput, account)
      .then(({ actions, executeAllActions }) => {
        console.debug("actions:", JSON.stringify(actions));
        executeAllActions().then((_order) => {
          order = _order;
          setOrderData(order);
          console.debug("order:", JSON.stringify(order));
          seaport.getOrderStatus(seaport.getOrderHash(order.parameters)).then((_orderStatus) => {
            orderStatus = _orderStatus;
            console.debug("orderStatus:", JSON.stringify(orderStatus));
          });
        });
      });
  };

  const handlerOnClickCancelOrder = () => {
    console.debug("====== Cancel order ======");
    setEnvironment();
    order = orderData;
    console.debug("order:", JSON.stringify(order));

    const orderHash = seaport.getOrderHash(order.parameters);
    seaport
      .cancelOrders([order.parameters])
      .transact()
      .then(() => {
        seaport.getOrderStatus(orderHash).then(() => {
          console.debug("Order cancelled - orderHash: ", orderHash);
        });
      });
  };

  const handlerOnClickCheckCancelling = () => {
    console.debug("====== Check cancelling ======");
    setEnvironment();
    order = orderData;
    const orderHash = seaport.getOrderHash(order.parameters);
    seaport.getOrderStatus(orderHash).then((cancelStatus) => {
      console.debug("Order is cancelled: ", cancelStatus.isCancelled);
    });
  };

  ////////////////////////////////////////////////////////////////////////////
  // 오더를 2개 생성한후에, `incrementCounter` 호출을 통해서 모두 취소시킴
  // `Check cancelling orders` 버튼에서 `counter`가 제대로 변경되었는지 확인.
  const handlerOnClickCreateMultipleOrders = () => {
    console.debug("=== Create Multiple Orders for cancelling ===");
    const orders: OrderWithCounter[] = [];

    setEnvironment();
    // the count of the NFT tokens to sell
    const assetTokenAmount = "10";

    // the first order
    standardCreateOrderInput = {
      allowPartialFills: true, // 부분 거래 허용 여부
      startTime: Math.floor(Date.now() / 1000).toString(), // 거래 시작 시간
      endTime: MAX_INT.toString(), // 거래 종료 시간

      offer: [
        {
          amount: parseEther("0.1").toString(), // 원하는 WBOA 개수
          token: WBOA9, // WBOA 컨트랙트 주소
        },
      ],
      consideration: [
        {
          itemType: ItemType.ERC1155, // 아이템 타입
          token: LAZY_MINT_ADAPTER, // 아이템 컨트랙트 주소
          amount: assetTokenAmount, // 아이템 개수
          identifier: TOKEN_ID, // 아이템 토큰 아이디
          recipient: account, // 아이템 받을 대상
        },
      ],
      // 2.5% fee
      fees: [{ recipient: PAYABLE_PROXY, basisPoints: 250 }],
    };

    // create the first order
    seaport
      .createOrder(standardCreateOrderInput, account)
      .then(({ actions, executeAllActions }) => {
        console.debug("actions:", JSON.stringify(actions));
        executeAllActions().then((_order) => {
          orders.push(_order);
          setMultipleOrdersData(orders);
          console.debug("order:", JSON.stringify(_order));

          // show current counter
          seaport.getCounter(account).then((_counter) => {
            console.debug("counter:", _counter);
            setCounterData(_counter);
          });
        });
      });

    // the second order
    standardCreateOrderInput = {
      allowPartialFills: true, // 부분 거래 허용 여부
      startTime: Math.floor(Date.now() + 1 / 1000).toString(), // 거래 시작 시간
      endTime: MAX_INT.toString(), // 거래 종료 시간

      offer: [
        {
          amount: parseEther("10").toString(), // 원하는 WBOA 개수
          token: WBOA9, // WBOA 컨트랙트 주소
        },
      ],
      consideration: [
        {
          itemType: ItemType.ERC1155, // 아이템 타입
          token: LAZY_MINT_ADAPTER, // 아이템 컨트랙트 주소
          amount: assetTokenAmount, // 아이템 개수
          identifier: TOKEN_ID, // 아이템 토큰 아이디
          recipient: account, // 아이템 받을 대상
        },
      ],
      // 2.5% fee
      fees: [{ recipient: PAYABLE_PROXY, basisPoints: 250 }],
    };

    // create the second order
    seaport
      .createOrder(standardCreateOrderInput, account)
      .then(({ actions, executeAllActions }) => {
        console.debug("actions:", JSON.stringify(actions));
        executeAllActions().then((_order) => {
          orders.push(_order);
          setMultipleOrdersData(orders);
          console.debug("order:", JSON.stringify(_order));

          // show current counter
          seaport.getCounter(account).then((_counter) => {
            console.debug("counter:", _counter);
            setCounterData(_counter);
          });
        });
      });
  };

  const handlerOnClickCancelMultipleOrders = () => {
    console.debug("=== Cancel multiple orders ===");
    setEnvironment();
    const orders = multipleOrdersData;
    console.debug("orders:", JSON.stringify(orders));

    seaport
      .bulkCancelOrders(account)
      .transact()
      .then(() => {
        console.debug("The counter for", account, " is increased");
      });
  };

  const handlerOnClickCheckCancellingMultipleOrders = () => {
    console.debug("=== Check cancelling multiple orders ===");
    setEnvironment();

    const prveCounter = counterData;
    // show current counter
    seaport.getCounter(account).then((_counter) => {
      console.debug("previous counter:", prveCounter);
      console.debug("counter: ", _counter);
      if (_counter != prveCounter + 1) {
        console.debug("Wait until `the counter` becomes", prveCounter + 1);
      } else {
        console.debug("`incrementCounter` is done.");
      }
    });
  };

  ////////////////////////////////////////////////////////////////////////////
  // 여러 개의 오더를 주문 처리
  // 내부적으로는 Seaport 컨트랙트의 fulfillAvailableAdvancedOrders를 호출함
  const handlerOnClickCreateManyOrders = () => {
    console.debug("=== Create many orders ===");
    const orders: OrderWithCounter[] = [];

    setEnvironment();
    // the count of the NFT tokens to sell
    const assetTokenAmount = "10";

    // the first order
    standardCreateOrderInput = {
      allowPartialFills: true, // 부분 거래 허용 여부
      startTime: Math.floor(Date.now() / 1000).toString(), // 거래 시작 시간
      endTime: MAX_INT.toString(), // 거래 종료 시간

      offer: [
        {
          amount: parseEther("0.1").toString(), // 원하는 WBOA 개수
          token: WBOA9, // WBOA 컨트랙트 주소
        },
      ],
      consideration: [
        {
          itemType: ItemType.ERC1155, // 아이템 타입
          token: LAZY_MINT_ADAPTER, // 아이템 컨트랙트 주소
          amount: assetTokenAmount, // 아이템 개수
          identifier: TOKEN_ID, // 아이템 토큰 아이디
          recipient: account, // 아이템 받을 대상
        },
      ],
      // 2.5% fee
      fees: [{ recipient: PAYABLE_PROXY, basisPoints: 250 }],
    };

    // create the first order
    seaport
      .createOrder(standardCreateOrderInput, account)
      .then(({ actions, executeAllActions }) => {
        console.debug("actions:", JSON.stringify(actions));
        executeAllActions().then((_order) => {
          orders.push(_order);
          setMultipleOrdersData(orders);
          console.debug("order:", JSON.stringify(_order));

          // show current counter
          seaport.getCounter(account).then((_counter) => {
            console.debug("counter:", _counter);
            setCounterData(_counter);
          });
        });
      });

    // the second order
    standardCreateOrderInput = {
      allowPartialFills: true, // 부분 거래 허용 여부
      startTime: Math.floor(Date.now() / 1000).toString(), // 거래 시작 시간
      endTime: MAX_INT.toString(), // 거래 종료 시간

      offer: [
        {
          amount: parseEther("0.1").toString(), // 원하는 WBOA 개수
          token: WBOA9, // WBOA 컨트랙트 주소
        },
      ],
      consideration: [
        {
          itemType: ItemType.ERC1155, // 아이템 타입
          token: LAZY_MINT_ADAPTER, // 아이템 컨트랙트 주소
          amount: assetTokenAmount, // 아이템 개수
          identifier: TOKEN_ID_2, // 아이템 토큰 아이디
          recipient: account, // 아이템 받을 대상
        },
      ],
      // 2.5% fee
      fees: [{ recipient: PAYABLE_PROXY, basisPoints: 250 }],
    };

    // create the second order
    seaport
      .createOrder(standardCreateOrderInput, account)
      .then(({ actions, executeAllActions }) => {
        console.debug("actions:", JSON.stringify(actions));
        executeAllActions().then((_order) => {
          orders.push(_order);
          setMultipleOrdersData(orders);
          console.debug("order:", JSON.stringify(_order));

          // show current counter
          seaport.getCounter(account).then((_counter) => {
            console.debug("counter:", _counter);
            setCounterData(_counter);
          });
        });
      });
  };

  const handlerOnClickFulfillOrders = () => {
    console.debug("====== Fulfill many orders ======");
    setEnvironment();
    const orders = multipleOrdersData;
    console.debug("orders:", JSON.stringify(orders));
    console.debug("account:", account);

    // information for fulfilling the order
    const firstFulfill = {
      order: orders[0],
      unitsToFill: 5, // 일부만 구매하기로 함
    };

    const secondFulfill = {
      order: orders[1],
      unitsToFill: 5, // 일부만 구매하기로 함
    };

    seaport
      .fulfillOrders({
        fulfillOrderDetails: [firstFulfill, secondFulfill],
        accountAddress: account,
      })
      .then(({ actions }) => {
        const fulfillActions = actions[0];
        console.debug("actions:", JSON.stringify(actions));
        fulfillActions.transactionMethods.transact().then((transaction) => {
          transaction.wait().then((receipt) => {
            console.debug("###### Orders fulfilled - transactionHash:", receipt.transactionHash);
          });
        });
      });
  };

  ////////////////////////////////////////////////////////////////////////////
  // 오퍼를 통한 거래. WBOA를 주고 ERC721 NFT 받음
  const handlerOnClickCreateOrderForERC721 = () => {
    console.debug("====== Create Order for ERC721 token ======");
    setEnvironment();

    // information for order
    standardCreateOrderInput = {
      startTime: Math.floor(Date.now() / 1000).toString(), // 거래 시작 시간
      endTime: MAX_INT.toString(), // 거래 종료 시간

      offer: [
        {
          amount: parseEther("0.1").toString(), // 원하는 WBOA 개수
          token: WBOA9, // WBOA 컨트랙트 주소
        },
      ],
      consideration: [
        {
          itemType: ItemType.ERC721, // 아이템 타입
          token: TEST_ERC721_ADDRESS, // 아이템 컨트랙트 주소
          identifier: TEST_ERC721_TOKEN_ID, // 아이템 토큰 아이디
          recipient: account, // 아이템 받을 대상
        },
      ],
      // 2.5% fee
      fees: [{ recipient: PAYABLE_PROXY, basisPoints: 250 }],
    };

    // create an order
    seaport
      .createOrder(standardCreateOrderInput, account)
      .then(({ actions, executeAllActions }) => {
        console.debug("actions:", JSON.stringify(actions));
        executeAllActions().then((_order) => {
          order = _order;
          setOrderData(order);
          console.debug("order:", JSON.stringify(order));
          seaport.getOrderStatus(seaport.getOrderHash(order.parameters)).then((_orderStatus) => {
            orderStatus = _orderStatus;
            console.debug("orderStatus:", JSON.stringify(orderStatus));
          });
        });
      });
  };

  const handlerOnClickFulfillOrderERC721 = () => {
    console.debug("====== Fulfill Order for ERC721 token ======");
    setEnvironment();
    order = orderData;
    console.debug("order:", JSON.stringify(order));

    // information for fulfilling the order
    const fulfillInput = {
      order: order,
      accountAddress: account, // 주문 완결하는 사람 (fulfiller)
    };
    seaport.fulfillOrder(fulfillInput).then(async ({ actions }) => {
      console.debug("actions:", JSON.stringify(actions));
      for (let i = 0; i < actions.length; i++) {
        // actions 배열에는 두가지 action type이 존재함: approval, exchange.
        if (actions[i].type == "approval") {
          const transaction = actions[i].transactionMethods.transact();
          await (await transaction).wait();
          console.debug("%s completed", actions[i].type);
        } else {
          // "exchange"
          const transaction = actions[i].transactionMethods.transact();
          const receipt = await (await transaction).wait();
          console.debug("Order fuflfilled - transactionHash:", receipt.transactionHash);
        }
      }
    });
  };

  ////////////////////////////////////////////////////////////////////////////
  // `matchOrders` 샘플
  const handlerOnClickCreateOrderForCreator = () => {
    console.debug("=== Create order for matchOrders ===");
    setEnvironment();

    // the count of the NFT tokens to sell
    const assetTokenAmount = "10";

    // information for order
    standardCreateOrderInput = {
      allowPartialFills: true, // 부분 거래 허용 여부
      startTime: Math.floor(Date.now() / 1000).toString(), // 거래 시작 시간
      endTime: MAX_INT.toString(), // 거래 종료 시간

      offer: [
        {
          itemType: ItemType.ERC1155, // 아이템 타입
          token: LAZY_MINT_ADAPTER, // 아이템 컨트랙트 주소
          amount: assetTokenAmount, // 아이템 개수
          identifier: TOKEN_ID, // 아이템 토큰 아이디
        },
      ],
      consideration: [
        {
          amount: parseEther("0.1").toString(), // WBOA 개수
          token: WBOA9, // WBOA 컨트랙트 주
          recipient: account, // WBOA 받을 대상
        },
        {
          itemType: ItemType.ERC1155, // 아이템 타입
          token: LAZY_MINT_ADAPTER, // 아이템 컨트랙트 주소
          amount: assetTokenAmount, // 아이템 개수
          identifier: TOKEN_ID, // 아이템 토큰 아이디
          recipient: MATCH_ORDER_RECIPIENT, // 아이템 받을 대상
        },
      ],
      // 2.5% fee
      fees: [{ recipient: PAYABLE_PROXY, basisPoints: 250 }],
    };

    // create an order
    seaport
      .createOrder(standardCreateOrderInput, account)
      .then(({ actions, executeAllActions }) => {
        console.debug("actions:", JSON.stringify(actions));
        executeAllActions().then((_order) => {
          order = _order;
          setOrderData(order);
          console.debug("order:", JSON.stringify(order));
          seaport.getOrderStatus(seaport.getOrderHash(order.parameters)).then((_orderStatus) => {
            orderStatus = _orderStatus;
            console.debug("orderStatus:", JSON.stringify(orderStatus));
          });
        });
      });
  };

  const handlerOnClickMatchOrders = () => {
    console.debug("====== Match orders ======");
    setEnvironment();
    order = orderData;
    console.debug("order:", JSON.stringify(order));

    counterOrder = constructPrivateListingCounterOrder(order, account);
    const fulfillments = getPrivateListingFulfillments(order);

    seaport
      .matchOrders({
        orders: [order, counterOrder],
        fulfillments,
        overrides: {
          value: counterOrder.parameters.offer[0].startAmount,
        },
        accountAddress: account,
      })
      .transact()
      .then((transaction) => {
        transaction.wait().then((receipt) => {
          console.debug("###### Orders matched - transactionHash:", receipt.transactionHash);
        });
      });
  };

  return (
    <React.Fragment>
      <Box borderRadius="lg" p={8} shadow="base">
        <VStack spacing={5} margin={5}>
          <span>
            Listing: Offering 10 NFTs with 10 BOAs as consideration {"<==>"} Buying only 2 NFTs
          </span>
          <Button
            bg="green.400"
            color="white"
            width={300}
            _hover={{
              bg: "green.500",
            }}
            onClick={handlerOnClickCreateOrder}
          >
            Create Order by owner
          </Button>
          <Button
            bg="red.400"
            color="white"
            width={300}
            _hover={{
              bg: "red.500",
            }}
            onClick={handlerOnClickFulfillOrder}
          >
            Fulfill Order by buyer
          </Button>
        </VStack>
        <hr
          style={{
            color: "white",
            height: "3px",
          }}
        />
        <VStack spacing={5} margin={5}>
          <span>
            Listing: Offering 10 NFTs with 10 WBOAs as consideration {"<==>"} Buying only 4 NFTs
          </span>
          <Button
            bg="blue.400"
            color="white"
            width={300}
            _hover={{
              bg: "blue.500",
            }}
            onClick={handlerOnClickCreateOrderWBoa}
          >
            Create Order by owner
          </Button>
          <Button
            bg="red.400"
            color="white"
            width={300}
            _hover={{
              bg: "red.500",
            }}
            onClick={handlerOnClickFulfillOrderWBoa}
          >
            Fulfill Order by buyer
          </Button>
        </VStack>
        <hr
          style={{
            color: "white",
            height: "3px",
          }}
        />
        <VStack spacing={5} margin={5}>
          <span>
            Offer: Offering 10 WBOAs with 10 NFTs as consideration {"<==>"} Selling only 5 NFTs
          </span>
          <Button
            bg="purple.400"
            color="white"
            width={300}
            _hover={{
              bg: "purple.500",
            }}
            onClick={handlerOnClickCreateOrderOffer}
          >
            Create Order for offer by buyer
          </Button>
          <Button
            bg="red.400"
            color="white"
            width={300}
            _hover={{
              bg: "red.500",
            }}
            onClick={handlerOnClickFulfillOrderOffer}
          >
            Fulfill Order for offer by owner
          </Button>
        </VStack>
        <hr
          style={{
            color: "white",
            height: "3px",
          }}
        />
        <VStack spacing={5} margin={5}>
          <span>
            Offer with validate(): Offering 10 WBOAs with 10 NFTs {"<==>"} Selling only 5 NFTs
          </span>
          <Button
            bg="purple.400"
            color="white"
            width={300}
            _hover={{
              bg: "purple.500",
            }}
            onClick={handlerOnClickCreateOrderOfferValidate}
          >
            Create Order with validate()
          </Button>
          <Button
            bg="red.400"
            color="white"
            width={300}
            _hover={{
              bg: "red.500",
            }}
            onClick={handlerOnClickFulfillOrderOfferValidate}
          >
            Fulfill Order for offer by owner
          </Button>
        </VStack>
        <hr
          style={{
            color: "white",
            height: "3px",
          }}
        />
        <VStack spacing={5} margin={5}>
          <span>
            Cancel: Offering 10 WBOAs with 10 NFTs as consideration {"==>"} Cancelling the order
          </span>
          <Button
            bg="cyan.400"
            color="white"
            width={300}
            _hover={{
              bg: "cyan.500",
            }}
            onClick={handlerOnClickCreateOrderForCancelling}
          >
            Create Order by buyer
          </Button>
          <Button
            bg="red.400"
            color="white"
            width={300}
            _hover={{
              bg: "red.500",
            }}
            onClick={handlerOnClickCancelOrder}
          >
            Cancel order
          </Button>
          <Button
            bg="pink.400"
            color="white"
            width={300}
            _hover={{
              bg: "pink.500",
            }}
            onClick={handlerOnClickCheckCancelling}
          >
            Check cancelling
          </Button>
        </VStack>
        <hr
          style={{
            color: "white",
            height: "3px",
          }}
        />
        <VStack spacing={5} margin={5}>
          <span>Cancel orders: Creating two orders {"==>"} Cancelling orders</span>
          <Button
            bg="cyan.400"
            color="white"
            width={300}
            _hover={{
              bg: "cyan.500",
            }}
            onClick={handlerOnClickCreateMultipleOrders}
          >
            Create Orders by buyer
          </Button>
          <Button
            bg="red.400"
            color="white"
            width={300}
            _hover={{
              bg: "red.500",
            }}
            onClick={handlerOnClickCancelMultipleOrders}
          >
            Cancel orders
          </Button>
          <Button
            bg="pink.400"
            color="white"
            width={300}
            _hover={{
              bg: "pink.500",
            }}
            onClick={handlerOnClickCheckCancellingMultipleOrders}
          >
            Check cancelling orders
          </Button>
        </VStack>
        <hr
          style={{
            color: "white",
            height: "3px",
          }}
        />
        <VStack spacing={5} margin={5}>
          <span>- 구매자에 의한 2개의 오더 생성, 판매자에 의한 fulfillOrders 함수 호출</span>
          <Button
            bg="blue.400"
            color="white"
            width={300}
            _hover={{
              bg: "cyan.500",
            }}
            onClick={handlerOnClickCreateManyOrders}
          >
            Create two orders by buyer
          </Button>
          <Button
            bg="red.400"
            color="white"
            width={300}
            _hover={{
              bg: "red.500",
            }}
            onClick={handlerOnClickFulfillOrders}
          >
            Fulfill orders
          </Button>
        </VStack>
        <hr
          style={{
            color: "white",
            height: "3px",
          }}
        />
        <VStack spacing={5} margin={5}>
          <span> ERC721 거래 샘플 </span>
          <Button
            bg="teal.400"
            color="white"
            width={400}
            _hover={{
              bg: "cyan.500",
            }}
            onClick={handlerOnClickCreateOrderForERC721}
          >
            Create Order for offer by buyer (ERC721)
          </Button>
          <Button
            bg="purple.400"
            color="white"
            width={400}
            _hover={{
              bg: "red.500",
            }}
            onClick={handlerOnClickFulfillOrderERC721}
          >
            Fulfill Order for offer by owner (ERC721)
          </Button>
        </VStack>
        <hr
          style={{
            color: "white",
            height: "3px",
          }}
        />
        <VStack spacing={5} margin={5}>
          <span> matchOrders 샘플 </span>
          <Button
            bg="teal.400"
            color="white"
            width={300}
            _hover={{
              bg: "cyan.500",
            }}
            onClick={handlerOnClickCreateOrderForCreator}
          >
            Create order for `matchOrders`
          </Button>
          <Button
            bg="purple.400"
            color="white"
            width={300}
            _hover={{
              bg: "red.500",
            }}
            onClick={handlerOnClickMatchOrders}
          >
            Match orders
          </Button>
        </VStack>
      </Box>
    </React.Fragment>
  );
}
