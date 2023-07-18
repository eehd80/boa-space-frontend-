import React from "react";
import {
  Box,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import ThumbRatio from "../ThumbRatio";
import { Link } from "react-router-dom";
import { CreateAssetResult } from "../../pages/asset/createAsset";

interface ModalProp {
  isOpen: boolean;
  onClose(): void;
  assetResult?: CreateAssetResult;
}
export const AssetCreatedSuccess = ({ isOpen, onClose, assetResult }: ModalProp) => {
  return (
    <Modal blockScrollOnMount={true} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent px={["15px", "15px", "15px", "25px"]}>
        <ModalHeader>
          <Heading variant="subtit22">You Created {assetResult?.name ?? "your NFT"}! </Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody maxH="400px">
          <Box w="185px" m="0 auto" bg="#8F8DB1" borderRadius="12px">
            <ThumbRatio src={assetResult?.originalUrl} />
          </Box>
          <Text variant="txt166" color="White" mt="30px">
            You just created{" "}
            <Link to={`/assets/${assetResult?.assetContractAddress}/${assetResult?.tokenId}`}>
              <Text as="span" color="Secondary_V">
                {assetResult?.name ?? "your NFT"}.
              </Text>
            </Link>
          </Text>
        </ModalBody>
        <ModalFooter>
          {/*
           TODO : Asset create share link
          <Stack justify="center" w="100%" mt="40px">
            <Text variant="txt136" textAlign="center">
              SHARE TO...
            </Text>
            <HStack justify="center" spacing="30px">
              <Link to="#">
                <Image src="/images/icon/sns_link.svg" alt="" />
                <VisuallyHidden>Link</VisuallyHidden>
              </Link>
              <Link to="#">
                <Image src="/images/icon/sns_facebook.svg" alt="" />
                <VisuallyHidden>facebook</VisuallyHidden>
              </Link>
              <Link to="#">
                <Image src="/images/icon/sns_twitter.svg" alt="" />
                <VisuallyHidden>twitter</VisuallyHidden>
              </Link>
              <Link to="#">
                <Image src="/images/icon/sns_telegram.svg" alt="" />
                <VisuallyHidden>telegram</VisuallyHidden>
              </Link>
            </HStack>
          </Stack>*/}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
