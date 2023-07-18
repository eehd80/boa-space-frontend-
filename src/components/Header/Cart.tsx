import React, { useCallback, useState } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Spacer,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import ThumbRatio from "../ThumbRatio";
import { clearCart, removeCart, useCartList } from "../../features/cart/cartSlice";
import { formatEther } from "@ethersproject/units";
import { useDispatch } from "react-redux";
import { BigNumber } from "ethers";
import { getUSDPrice, useBOAPrice } from "../../features/price/boaPriceSlice";
import { MultiApprovePurchase } from "../Modals/MultiApprovePurchase";
import { PurchaseComplete } from "../Modals/PurchaseComplete";
import useAuthCallback from "../../hooks/useAuthCallback";
import { useActiveState } from "../../hooks/useActiveState";
import { useEthers } from "@usedapp/core";

function Cart({ onClose }: { onClose?: () => void }) {
  const dispatch = useDispatch();
  const approvePurchaseModal = useDisclosure();
  const { online } = useActiveState();
  const { loginCheck } = useAuthCallback();
  const { account } = useEthers();
  const completeModal = useDisclosure({
    onClose: () => {
      dispatch(clearCart(account));
    },
  });
  const { items, totalCount } = useCartList();
  const [completeReceipt, setCompleteReceipt] = useState(undefined);
  const toast = useToast({
    position: "bottom-right",
    variant: "variant",
  });

  const handlerOnPurchase = () => {
    loginCheck(() => {
      approvePurchaseModal.onOpen();
    });
    if (!online) {
      onClose();
    }
  };

  const handlerApproveComplete = useCallback(
    (receipt: any) => {
      setCompleteReceipt(receipt);
      approvePurchaseModal.onClose();
      completeModal.onOpen();
    },
    [approvePurchaseModal, completeModal]
  );

  return (
    <>
      <Stack spacing="23px" px="25px" pt="15px" pb="0">
        {items && items.length > 0 ? (
          <React.Fragment>
            <Flex>
              <Text variant="txt176">{`${totalCount} item`}</Text>
              <Spacer />
              <Text
                variant="txt166"
                color="text_Gray02"
                className="hand"
                onClick={() => {
                  dispatch(clearCart(account));
                  toast({
                    title: "Successfully clear cart",
                    status: "success",
                  });
                }}
              >
                Clear all
              </Text>
            </Flex>
            {items.map((data: any, index: number) => {
              return <CartAsset key={index} asset={data.asset} orderData={data.orderData} />;
            })}
            <TotalPrice
              totalPrice={
                items?.reduce((total: BigNumber, item: any) => {
                  if (item?.orderData?.unitPrice) {
                    return total.add(BigNumber.from(item.orderData.unitPrice));
                  } else {
                    return total;
                  }
                }, BigNumber.from(0)) ?? BigNumber.from(0)
              }
            />
          </React.Fragment>
        ) : (
          <EmptyCart />
        )}
      </Stack>
      <Box p="25px">
        <Button
          isDisabled={totalCount === 0 ? true : false}
          variant="primary"
          w="100%"
          h="57px"
          onClick={handlerOnPurchase}
        >
          Complete purchase
        </Button>
      </Box>
      <MultiApprovePurchase
        isOpen={approvePurchaseModal.isOpen}
        onClose={approvePurchaseModal.onClose}
        assets={items}
        complete={handlerApproveComplete}
      />
      <PurchaseComplete
        isOpen={completeModal.isOpen}
        onClose={completeModal.onClose}
        asset={items}
        receiptData={completeReceipt}
      />
    </>
  );
}

interface CartAssetProps {
  asset?: any;
  orderData?: any;
}
function CartAsset({ asset, orderData }: CartAssetProps) {
  const dispatch = useDispatch();
  const toast = useToast({
    position: "bottom-right",
    variant: "variant",
  });
  const { account } = useEthers();

  const handlerDelete = useCallback(() => {
    dispatch(removeCart({ account, orderId: orderData.id }));
    toast({
      title: "Successfully remove cart",
      status: "success",
    });
  }, [account, dispatch, orderData, toast]);

  return (
    <Flex>
      <HStack>
        <Box overflow="hidden" w="72px" h="72px" bg="#BCBCCC" borderRadius="8px">
          <ThumbRatio
            src={
              asset?.originalUrl ??
              "https://i.seadn.io/gcs/files/ea3c15935f9142ecb0a8d20398281841.png?auto=format&w=256"
            }
          />
        </Box>
        <Box>
          <Text variant="txt156">{asset?.name}</Text>
          <Text variant="txt145" color="text_Gray02">
            {asset?.assetCollection?.name}
            {/*
              TODO : verified for cart asset
              <span
              className="material-symbols-outlined fill" ml="5px"
              style={{
                color: "#A796FF",
                margin: "-2px 0 0 3px",
                verticalAlign: "middle",
                fontSize: "16px",
              }}
            >
              verified
            </span>
            */}
          </Text>

          {/*
            TODO : earning percent calculation for cart asset
            <Text variant="txt134" color="text_Gray01">
              Creator earnings: 10%
            </Text>
          */}
        </Box>
      </HStack>
      <Spacer />
      <HStack>
        <Text variant="txt146">
          {orderData?.unitPrice ? formatEther(orderData.unitPrice) : 0} BOA
        </Text>
        <span
          onClick={handlerDelete}
          className="material-symbols-outlined fill hand"
          style={{
            fontSize: "22px",
          }}
        >
          delete
        </span>
      </HStack>
    </Flex>
  );
}
interface TotalPriceProps {
  totalPrice?: BigNumber;
}
function TotalPrice({ totalPrice = BigNumber.from(0) }: TotalPriceProps) {
  const usd = useBOAPrice();
  return (
    <React.Fragment>
      <Flex mt="30px" px="25px" pt="22px" pb="29px" borderTopWidth="1px" borderColor="popup_B01">
        <Text variant="txt176">Total price</Text>
        <Spacer />
        <Box textAlign="right">
          <Text variant="txt167">{formatEther(totalPrice)} BOA</Text>
          <Text variant="txt145" mt="7px" color="text_Gray01">
            {getUSDPrice(totalPrice.toString(), usd)}
          </Text>
        </Box>
      </Flex>
    </React.Fragment>
  );
}

function EmptyCart() {
  return (
    <Center h="175px">
      <Text variant="txt174" color="text_Gray02">
        Add items to get started.
      </Text>
    </Center>
  );
}
export default React.memo(Cart);
