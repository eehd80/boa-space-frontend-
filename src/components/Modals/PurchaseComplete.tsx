import React, { useMemo } from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Spacer,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import ThumbRatio from "../ThumbRatio";
import { Link, useNavigate } from "react-router-dom";
import { formatEther, parseUnits } from "ethers/lib/utils";
import { getUSDPrice, useBOAPrice } from "../../features/price/boaPriceSlice";
import { BigNumber } from "ethers";
import _ from "lodash";
import { getExplorerTxLink } from "../../utils/WalletUtils";

interface ModalProp {
  isOpen: boolean;
  onClose(): void;
  asset?: any | any[];
  orderData?: any;
  complete?(): void;
  receiptData?: any;
}
export const PurchaseComplete = ({ isOpen, onClose, asset, orderData, receiptData }: ModalProp) => {
  const navigate = useNavigate();
  const usd = useBOAPrice();
  const handlerOnPurchase = () => {
    onClose();
    if (asset && !_.isArray(asset)) {
      navigate(`/assets/${asset.assetContractAddress}/${asset.tokenId}`);
    } else {
      navigate("/my");
    }
  };

  const { price, fee, total, dollar, assetUrl } = useMemo(() => {
    if (asset && _.isArray(asset) && asset?.length > 0 && receiptData) {
      const price =
        asset.reduce((total: BigNumber, item: any) => {
          return total.add(BigNumber.from(item.orderData.unitPrice));
        }, BigNumber.from(0)) ?? BigNumber.from(0);
      const fee = BigNumber.from(parseUnits(receiptData?.gasUsed?.toString(), 9));
      const total = price.add(fee);
      const dollar = usd ? getUSDPrice(total.toString(), usd) : "$0.00";
      return { price, fee, total, dollar, assetUrl: asset[0].asset.originalUrl };
    } else if (asset && orderData && receiptData) {
      const price = BigNumber.from(orderData?.unitPrice);
      const fee = BigNumber.from(parseUnits(receiptData?.gasUsed?.toString(), 9));
      const total = price.add(fee);
      const dollar = usd ? getUSDPrice(total.toString(), usd) : "$0.00";
      return { price, fee, total, dollar, assetUrl: asset?.originalUrl };
    }

    return {};
  }, [orderData, receiptData, usd, asset]);

  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW="546px" pl="0" pr="3px">
        <ModalCloseButton />
        <ModalBody px="30px" py="27px">
          <Box w="184px" h="184px" mx="auto" bg="#8F8DB1" borderRadius="12px">
            <ThumbRatio src={assetUrl} />
          </Box>
          <Box mt="25px">
            <Text variant="txt246" color="White">
              Your purchase is complete
            </Text>
            <HStack
              divider={<StackDivider h="12px" mt="8px !important" borderColor="#616086" />}
              justify="center"
              align="center"
              mt="10px"
              spacing="10px"
            >
              <Link
                target="_blank"
                to={getExplorerTxLink(receiptData?.transactionHash)}
                style={{ color: "#A796FF", fontSize: "15px", fontWeight: "400" }}
              >
                View on BOAscan
              </Link>
              {/*<Link to="#" style={{ color: "#A796FF", fontSize: "15px", fontWeight: "400" }}>
                Show details
              </Link>*/}
            </HStack>
          </Box>
          <Box mt="20px">
            <Flex>
              <Text variant="txt174" color="White">
                Subtotal
              </Text>
              <Spacer />
              <Text variant="txt176" color="text_Gray02">
                {price && formatEther(price)} BOA
              </Text>
            </Flex>
            <Flex>
              <Text variant="txt174" color="White">
                Gas fees
              </Text>
              <Spacer />
              <Text variant="txt176" color="text_Gray02">
                {fee && formatEther(fee)} BOA
              </Text>
            </Flex>
            <Divider borderColor="popup_B01" mt="23px" mb="20px" />
            <Flex>
              <Text variant="txt205" color="White">
                Total price
              </Text>
              <Spacer />
              <Box textAlign="right">
                <Text variant="txt206" color="White">
                  {total && formatEther(total)}
                </Text>
                <Text variant="txt154" mt="5px" color="text_Gray02">
                  {dollar && dollar}
                </Text>
              </Box>
            </Flex>

            <Button variant="primary" w="100%" mt="30px" onClick={handlerOnPurchase}>
              View purchase
            </Button>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
