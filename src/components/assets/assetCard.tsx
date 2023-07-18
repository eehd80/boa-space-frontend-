import React, { useMemo } from "react";
import styled, { CSSProp } from "styled-components";
import { Badge, Box, HStack, SlideFade, Text, useBoolean, useToast } from "@chakra-ui/react";
import ThumbRatio from "../ThumbRatio";
import { useNavigate } from "react-router-dom";
import { useEthers } from "@usedapp/core";
import { formatEther } from "@ethersproject/units";
import { FavoriteIcon } from "../Button/Favorite";
import AssetButtons from "./AssetButtons";
import { ActivityType, OrderStatus, WhiteListType } from "../../type";
import { addCart } from "../../features/cart/cartSlice";
import { useDispatch } from "react-redux";
import { numberFormat } from "../../utils/Format";
import _ from "lodash";
import WhiteListMark from "./WhiteListMark";

interface AssetProps {
  asset?: any;
  isTransaction?: boolean;
  isMyAssetCount?: boolean;
  isDisableCart?: boolean;
}
interface CollectionWrapProps {
  transaction?: CSSProp;
}
export default function AssetCard({
  asset,
  isTransaction = true,
  isMyAssetCount = true,
  isDisableCart = false,
}: AssetProps) {
  const navigate = useNavigate();
  const { account } = useEthers();
  const dispatch = useDispatch();
  const [mouseIn, setMouseIn] = useBoolean(false);
  const toast = useToast({
    position: "bottom-right",
    variant: "variant",
  });

  const handlerOnClick = () => {
    navigate(`/assets/${asset?.assetContractAddress}/${asset?.tokenId}`);
  };

  const { currentPrice, amount, orderData, isWhiteList } = useMemo(() => {
    if (asset?.owners?.length) {
      const my = asset.owners.filter((owner: any) => owner.user.userAddress === account);
      const activities: any = asset?.activities
        ?.filter(
          (a: any) => a.activityType === ActivityType.LIST && a?.order?.status === OrderStatus.SALE
        )
        .sort((a: any, b: any) => a?.order?.unitPrice - b?.order?.unitPrice);
      const order = activities?.length > 0 ? activities[0].order : undefined;
      const myAsset = isMyAssetCount
        ? my?.length > 0
          ? my[0].amount
          : undefined
        : asset.totalSupply;
      const saleList = asset?.activities?.filter(
        (a: any) => a.activityType === ActivityType.LIST && a.order.status === OrderStatus.SALE
      );
      const currentPrice = _.minBy(saleList, (a: any) => a.order.unitPrice);
      return {
        amount: myAsset ?? 0,
        currentPrice,
        orderData: order,
        isWhiteList: asset?.assetCollection?.useWhiteList === WhiteListType.ACTIVE,
      };
    }
    return {
      amount: 0,
      currentPrice: undefined,
      orderData: undefined,
      isWhiteList: asset?.assetCollection?.useWhiteList === WhiteListType.ACTIVE,
    };
  }, [asset, account, isMyAssetCount]);

  const handlerAddCart = () => {
    if (orderData) {
      dispatch(addCart({ account, asset, orderData: orderData }));
      toast({
        title: "Successfully add cart",
        status: "success",
      });
    }
  };

  return (
    <MoreCollectionWrap
      overflow="hidden"
      pos="relative"
      w="100%"
      bg="popup_hover"
      borderRadius="10px"
      flexShrink="0"
      className="collectionEl"
      transaction={isTransaction.toString()}
      onMouseEnter={setMouseIn.on}
      onMouseLeave={setMouseIn.off}
    >
      <Box onClick={handlerOnClick}>
        <ThumbRatio src={asset?.originalUrl ?? "/images/symbol/boa.svg"} isScale />
        {amount > 1 && (
          <CountBadge variant="solid" colorScheme="purple">
            {`x${numberFormat.format(amount)}`}
          </CountBadge>
        )}
        <WhiteListMark visible={isWhiteList} />
      </Box>

      <Box pos="relative" className="txt-wrap" p="15px" bg="popup_hover" pb="42px" h="102px">
        <Text
          variant="txt155"
          overflow="hidden"
          maxW="70%"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          color="White"
        >
          {asset?.name}
        </Text>
        {/* search 페이지만 노출 */}
        <HStack>
          <Text
            variant="txt155"
            overflow="hidden"
            maxW="70%"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            color="White"
          >
            {asset?.assetCollection?.name}
          </Text>{" "}
          {/*
            TODO : Verified feature
          <Box transform="scale(0.8) translate(-10px, -2px)" transformOrigin="0 50%">
            <VerifiedIcon />
          </Box>*/}
        </HStack>
        {currentPrice && (
          <Text variant="txt165">{`${formatEther(currentPrice?.order?.unitPrice)} BOA`}</Text>
        )}
        <Box pos="absolute" zIndex="100" top="12px" right="16px">
          <FavoriteIcon assetData={asset} viewMode={false} />
        </Box>
      </Box>
      {!isDisableCart && !isWhiteList && orderData && (
        <SlideFade in={mouseIn}>
          <AssetButtons onClickCart={handlerAddCart} />
        </SlideFade>
      )}
    </MoreCollectionWrap>
  );
}

const CountBadge = styled(Badge)`
  position: absolute;
  left: 10px;
  top: 10px;
  border-radius: 5px !important;
  background-color: #a796ff;
  text-transform: none !important;
`;

const MoreCollectionWrap = styled(Box)<CollectionWrapProps>`
  position: relative;
  cursor: pointer;
  .btn-wrap {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }
`;
