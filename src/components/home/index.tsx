import React from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Box, Button, Heading, Image, Stack, Text, useMediaQuery } from "@chakra-ui/react";
import "@kfonts/nanum-square-ac";

export default function SlickIntro() {
  const [isLargerThan1024] = useMediaQuery("(min-width: 1024px)");
  const navigate = useNavigate();
  const settings = {
    arrows: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 5000,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          arrows: false,
        },
      },
    ],
  };
  return (
    <>
      <SliderWrap {...settings}>
        <Stack className="slide-item" justifyContent="center">
          <VideoSpaceM>
            <video
              src={isLargerThan1024 ? "/images/main/open-pc.mp4" : "/images/main/open-m.mp4"}
              autoPlay
              loop
              muted
            />
          </VideoSpaceM>
          <Box className="slide-maxw" pos="relative">
            <Box className="txt-wrap" w="90%" margin="0 auto">
              <Heading color="logo_v" h={["auto", "auto", "auto", "104px"]}>
                <span style={{ fontWeight: "800" }}>BOA</span>
                <span style={{ fontWeight: "400" }}>SPACE</span>
              </Heading>
              <Text minW="100%" fontFamily="nanum-square-ac" color="logo_v" lineHeight="1.3">
                New universe of infinite possibilities has opened up! <br /> Show off your
                creativity.
              </Text>
            </Box>
            <Box className="img-wrap"></Box>
          </Box>
        </Stack>
        <Stack className="slide-item" justifyContent="center">
          <Box className="slide-maxw">
            <Box className="txt-wrap" w="90%" margin="0 auto">
              <Heading>ROBOT TEAKWON V SPACE WAR</Heading>
              <Text fontFamily="nanum-square-ac">New Generation Mining Content</Text>
              <Button variant="primary" minW="162px" onClick={() => navigate("/explore")}>
                Explore
              </Button>
            </Box>
            <Box className="img-wrap">
              <Image src="/images/main/slide3.png" alt="" />
            </Box>
          </Box>
        </Stack>
        <Stack className="slide-item" justifyContent="center">
          <Box className="slide-maxw">
            <Box className="txt-wrap" w="90%" margin="0 auto">
              <Heading>
                FM WAY - <br /> US STOCK
              </Heading>
              <Text fontFamily="nanum-square-ac">FM way 미국주식 펀드 수익율 60% 기념 NFT</Text>
              <Button variant="primary" minW="162px" onClick={() => navigate("/explore")}>
                Explore
              </Button>
            </Box>
            <Box className="img-wrap">
              <Image src="/images/main/slide2.png" alt="" />
            </Box>
          </Box>
        </Stack>
      </SliderWrap>
    </>
  );
}

const VideoSpaceM = styled.div`
  > video {
    position: absolute;
    top: -70px;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  @media screen and (min-width: 1024px) {
    > video {
      top: 0;
    }
  }
`;

const SliderWrap = styled(Slider)`
  overflow: hidden;
  position: relative;
  margin: 0 -35px;
  background: #2c273f url(/images/main/slide-bg.jpeg) 50% 50% / cover no-repeat;
  .slick-track {
    display: flex;
  }

  .slick-slide {
    position: relative;
    height: 868px;
    padding: 70px 18px 75px;
  }
  .slide-item {
    max-width: 18965315px;
  }

  .slick-list {
    /* max-width: 1400px; */
    margin: 0 auto;
    text-align: center;

    h2 {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 144px;
      margin: 0 auto;
      font-size: 40px;
      font-weight: 600;
      line-height: 1.2;
    }

    p {
      width: 80%;
      margin: 18px auto 40px;
      font-weight: 400;
      font-size: 22px;
      font-family: "nanum-square-ac";
    }

    .img-wrap {
      overflow: hidden;
      height: 100%;
      margin: 50px auto 0;
      border-radius: 20px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: 50% 50%;
      }
    }
  }

  .slick-dots {
    bottom: 50px;
  }

  .btn-wrap {
    display: flex;
    justify-content: center;
    margin: 0 auto;
    padding: 0;

    > button {
      width: auto;
      min-width: 0;
      /* height: 60px; */
      margin: 0 6px;
      padding: 0 30px;

      span {
        margin-right: 10px;
      }
    }
  }

  @media screen and (min-width: 744px) {
    .slick-list {
      h2 {
        height: auto;
        font-size: 50px;
        font-weight: 700;
      }
      p {
        width: 100%;
        height: auto;
        margin-bottom: 48px;
        font-size: 22px;
      }
      .img-wrap {
        margin-top: 60px;
      }
    }
    .slick-slide {
      height: 1044px;
      padding-top: 75px;
      padding-bottom: 95px;
    }
    .slide-item {
      max-width: 544px;
      margin: 0 auto;
    }
    .slick-arrow {
      top: 50%;
      transform: translateY(-50%);
      &.slick-prev {
        left: 20px;
        background: url(/images/icon/arrow_back.svg) no-repeat 50% 50% / auto 44px;
      }
      &.slick-next {
        right: 20px;
        background: url(/images/icon/arrow_forward.svg) no-repeat 50% 50% / auto 44px;
      }
    }
  }
  @media screen and (min-width: 1024px) {
    max-width: none;
    box-sizing: border-box;
    .slick-slide {
      height: 520px;
      /* padding-left: 100px;
      padding-right: 100px; */
      padding-top: 63px;
      padding-bottom: 80px;
      > div {
        display: flex;
        align-items: center;
        height: 100%;
      }
    }

    .slide-item {
      overflow: hidden;
      display: flex !important;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      max-width: none;
      height: 377px;
      margin: 0 auto;
      /* width: 90% !important; */

      .txt-wrap {
        float: left;
        width: calc(100% - 430px);
        margin: 0;
        text-align: left;
      }

      h2 {
        justify-content: flex-start;
        height: 124px;
      }

      p {
        margin-top: 20px;
        margin-bottom: 50px;
        font-size: 18px;
      }

      .img-wrap {
        float: right;
        width: 380px;
        height: 380px;
        margin: 0;
      }
    }

    .slide-maxw {
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 1080px;
      width: 100%;
      margin: auto;
    }

    .slide-video {
      .m {
        display: none;
      }
      .pc {
        display: block;
      }
    }

    .btn-wrap {
      justify-content: flex-start;
      margin: 0;

      > button {
        width: 128px;
        height: 48px;
        margin: 0 12px 0 0;
        padding: 0 22px;
      }
    }
  }
  @media screen and (min-width: 1280px) {
    .slick-list {
      h2 {
        font-size: 62px;
        font-weight: 600;
        line-height: 1;
      }
    }
    .slick-slide {
      /* padding: 0 140px; */
    }
  }
`;
