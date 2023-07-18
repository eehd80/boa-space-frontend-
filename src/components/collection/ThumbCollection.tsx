import React, { useState } from "react";
import styled from "styled-components";
import {
  Box,
  Button,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useEthers } from "@usedapp/core";
import { EmptyImage } from "./EmptyImage";
import _ from "lodash";
import { useActiveState } from "../../hooks/useActiveState";
import WhiteListMark from "../assets/WhiteListMark";
import { WhiteListType } from "../../type";

interface ThumbCollectionProps {
  collection?: any;
}
export default function ThumbCollection({ collection }: ThumbCollectionProps) {
  const navigate = useNavigate();
  const { account } = useEthers();
  const [isOption, setOption] = useState(false);
  const { online } = useActiveState();
  const handlerOnClick = (e: any) => {
    if (e.target.nodeName !== "BUTTON") {
      if (collection) {
        navigate(`/collection/${collection.url}`);
      } else {
        navigate(`/collection`);
      }
    }
  };

  const handlerOver = () => {
    if (collection?.creator?.userAddress === account && online) {
      setOption(true);
    }
  };

  const handlerOut = () => {
    setOption(false);
  };

  const handlerOnEdit = () => {
    navigate(`/collections/edit/${collection.url}`);
  };

  return (
    <BoxThumb
      pos="relative"
      overflow="hidden"
      borderRadius="10px"
      bg="popup_BBGG"
      onMouseOver={handlerOver}
      onMouseOut={handlerOut}
      className="hand"
      onClick={handlerOnClick}
    >
      <Box
        pos="relative"
        overflow="hidden"
        w="100%"
        h="302px"
        m="0 !important"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {collection?.featureUrl ? (
          <Image
            src={collection?.featureUrl ?? "/images/icon/no_image_icon.svg"}
            alt=""
            w="100%"
            h="100%"
            objectFit="cover"
            objectPosition="50% 50%"
          />
        ) : (
          <EmptyImage />
        )}
        <WhiteListMark visible={collection?.useWhiteList === WhiteListType.ACTIVE} />
      </Box>
      <Box
        className="txt_wrap"
        pos="absolute"
        left="0"
        right="0"
        bottom="0"
        h="77px"
        px="17px"
        bg="popup_hover"
      >
        <HStack spacing="15px">
          <Box
            overflow="hidden"
            pos="relative"
            w="70px"
            h="70px"
            mt="-10px"
            background="#BCBCCB"
            border="3px solid #2C273F"
            borderRadius="10px"
            flexShrink="0"
          >
            <Image
              src={
                _.isEmpty(collection?.logoUrl)
                  ? "/images/icon/no_image_icon.svg"
                  : collection?.logoUrl
              }
              alt=""
              w="100%"
              h="100%"
              objectFit="cover"
              objectPosition="50%"
            />
          </Box>
          <Box display="flex" alignItems="baseline">
            <Ellipsis variant="txt176" transform="translateY(3px)">
              {collection?.name}
            </Ellipsis>
            <Box display="inline-block" transform="scale(0.8)">
              {/*<VerifiedIcon /> TODO : Verified feature*/}
            </Box>
          </Box>
        </HStack>
      </Box>
      <Stack alignItems="flex-end" spacing="5px" pos="absolute" top="0" right="0" p="14px">
        {isOption && (
          <React.Fragment>
            <Menu closeOnSelect={true}>
              <MenuButton
                as={Button}
                variant="gray4"
                minW="0"
                w="30px"
                h="30px"
                p="0"
                borderRadius="6px"
                boxShadow="15px 15px 28px rgba(0, 0, 0, 0.3)"
                bg="#443F5B"
              >
                <Image src="/images/icon/ham.svg" />
              </MenuButton>
              <MenuList boxShadow="15px 15px 28px rgba(0, 0, 0, 0.3)">
                <MenuItem
                  as={Button}
                  icon={
                    <span className="material-symbols-outlined fill" style={{ fontSize: "24px" }}>
                      edit
                    </span>
                  }
                  display="flex"
                  justifyContent="flex-start"
                  w="100%"
                  bg="popup_B01"
                  _hover={{
                    bg: "popup_hover",
                  }}
                  onClick={handlerOnEdit}
                >
                  Edit
                </MenuItem>
                {/*<MenuItem
                  as={Button}
                  icon={
                    <span className="material-symbols-outlined" style={{ fontSize: "24px" }}>
                      attach_money
                    </span>
                  }
                  display="flex"
                  justifyContent="flex-start"
                  w="100%"
                  onClick={handlerCreatorEarnings}
                >
                  Creator earnings
                </MenuItem>*/}
              </MenuList>
            </Menu>
          </React.Fragment>
        )}
      </Stack>
    </BoxThumb>
  );
}

const BoxThumb = styled(Box)`
  &:hover {
    .txt_wrap {
      background: transparent;
    }
  }
`;

const Ellipsis = styled(Text)`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
