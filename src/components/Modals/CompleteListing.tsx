import React from "react";
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
} from "@chakra-ui/react";
import ThumbRatio from "../ThumbRatio";
import { getBOAUSDPrice, useBOAPrice } from "../../features/price/boaPriceSlice";

interface ModalProp {
  isOpen: boolean;
  onClose(): void;
  asset?: any;
  collectionName?: string;
  listingPrice?: string;
  retryVisible?: boolean;
  retry?: any;
  isSuccess: boolean;
  viewListing: any;
}
export const CompleteListing = ({
  isOpen,
  onClose,
  asset,
  listingPrice,
  retryVisible = false,
  retry,
  isSuccess = false,
  viewListing,
}: ModalProp) => {
  const usd = useBOAPrice();
  return (
    <Modal blockScrollOnMount={true} isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent px={["15px", "15px", "15px", "25px"]}>
        <ModalHeader>
          <Heading variant="subtit22">
            {isSuccess ? "Your item has been listed!" : "Complete listing"}
          </Heading>
        </ModalHeader>
        <ModalCloseButton onClick={isSuccess ? viewListing : undefined} />
        <ModalBody maxH="400px">
          {isSuccess ? (
            <>
              <Box w="185px" m="0 auto" bg="#8F8DB1" borderRadius="12px">
                <ThumbRatio src={asset?.originalUrl} />
              </Box>
              <Text variant="txt166" color="White" mt="30px">
                <Text as="span" color="Secondary_V">
                  {asset?.name}
                </Text>{" "}
                from the{" "}
                <Text as="span" color="Secondary_V">
                  {asset?.assetCollection?.name}
                </Text>{" "}
                collection has been listed for sale.
              </Text>
            </>
          ) : (
            <>
              <Flex>
                <Stack direction="row" justify="flex-start" align="center" spacing="15px">
                  <Box borderRadius="10px" width="65px" height="65px" background="L_Gray_T01">
                    <ThumbRatio src={asset?.thumbnailUrl} />
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
                    {listingPrice} BOA
                  </Text>
                  <Text variant="txt154" color="text_Gray01">
                    {listingPrice && getBOAUSDPrice(listingPrice, usd)}
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
            </>
          )}
        </ModalBody>
        <ModalFooter>
          {retryVisible && (
            <Button variant="primary" w="100%" mt="70px" onClick={retry}>
              Continue
            </Button>
          )}
          {isSuccess && (
            <Button variant="primary" w="100%" mt="70px" onClick={viewListing}>
              View listing
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
