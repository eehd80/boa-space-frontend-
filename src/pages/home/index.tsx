import React from "react";
import styled from "styled-components";
import { Box, Button, Heading, Text, useBoolean, useMediaQuery, VStack } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import "@kfonts/nanum-square-ac";
import SlickIntro from "../../components/home";
import CommingItem from "../../components/home/CommingItem";
import SupportItem from "../../components/home/SupportItem";
import { setIntroVideoTime, useExpiredIntroVideoTime } from "../../features/utils/optionSlice";
import { useDispatch } from "react-redux";

export default function My() {
  const dispatch = useDispatch();
  const isExpiredTime = useExpiredIntroVideoTime();
  const [isLargerThan1024] = useMediaQuery("(min-width: 1024px)");
  const [isShowVideo, setVideoControl] = useBoolean(isExpiredTime && !isLargerThan1024);

  const handlerIntroVideoClose = () => {
    setVideoControl.off();
    dispatch(setIntroVideoTime(Date.now()));
  };

  return (
    <>
      <SlickIntro />

      <Box as="section" mt={["72px", "72px", "72px", "87px", "65px", "88px"]}>
        <Textarea>
          <Heading as="h2">Upcoming Items</Heading>
          <Text>Look forward to the upcoming NFT</Text>
        </Textarea>
        <CommingItem />
      </Box>

      <Box as="section" mt={["67px", "67px", "67px", "87px", "76px", "100px"]}>
        <Textarea>
          <Heading as="h2">Supported by</Heading>
          <Text>Item providers and Partners</Text>
        </Textarea>
        <SupportItem />
      </Box>

      {isShowVideo && isLargerThan1024 && (
        <IntroVideo>
          <VStack>
            <Button>
              <CloseIcon fontSize="30px" onClick={handlerIntroVideoClose} />
            </Button>
            <VideoBox
              src="/images/main/open-intro-pc.mp4"
              autoPlay
              muted
              playsInline
              onEnded={handlerIntroVideoClose}
            />
          </VStack>
        </IntroVideo>
      )}
    </>
  );
}

const VideoBox = styled("video")`
  max-width: 100%;
  height: 100%;
`;
const IntroVideo = styled(Box)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10000;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.7);
  div {
    max-width: 100%;
    height: 100%;
    align-items: flex-end;
    button {
      padding-top: 30px;
      padding-right: 30px;
      &:hover {
        svg {
          color: #ccb8ff;
        }
      }
    }
  }
  @media screen and (min-width: 1024px) {
    display: flex;
  }
`;

const Textarea = styled.div`
  text-align: center;

  h2 {
    font-size: 36px;
    font-weight: 600;
    text-align: center;
  }

  p {
    padding-top: 10px;
    font-size: 18px;
    font-weight: 500;
    line-height: 25px;
    color: #9f9fba;
  }

  @media screen and (min-width: 744px) {
    h2 {
      font-size: 40px;
    }
  }
  @media screen and (min-width: 1024px) {
    h2 {
      font-size: 32px;
    }
    p {
      font-size: 16px;
    }
  }
`;
