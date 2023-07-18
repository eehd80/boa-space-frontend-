import React from "react";
import styled from "styled-components";
import { Box, Image } from "@chakra-ui/react";

export default function UpcomingItem() {
  return (
    <UpcomingItemWrap>
      <Box>
        <Image src="/images/main/item2-pc.png" />
        <Box className="txt-wrap">
          <em className="scab">GAME</em>
          <strong className="tit">FOOD PLANETS</strong>
          <p className="txt">
            LooksRare is the web3 NFT Marketplace where traders and collectors have earned over $1.3
            Billion in rewards.
          </p>
          <b className="dday">D - 10</b>
          {/* <b className="dday comming">COMING SOON</b> */}
        </Box>
      </Box>
    </UpcomingItemWrap>
  );
}

const UpcomingItemWrap = styled(Box)`
  position: relative;
  max-width: 544px;
  margin: 125px auto 0;
  padding: 0 4% 49px;
  border-radius: 20px;
  background: #2d2a5c;
  img {
    transform: translateY(-87px);
    margin: 0 auto -42px;
  }
  .txt-wrap {
    padding: 0 2%;
  }
  .scab {
    display: block;
    font-weight: 800;
    font-size: 18px;
    font-style: normal;
  }
  .tit {
    display: block;
    margin-top: 5px;
    font-weight: 700;
    font-size: 32px;
  }
  .txt {
    margin-top: 10px;
    font-weight: 600;
    font-size: 20px;
    color: #c4c4d3;
  }
  .dday {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 143px;
    height: 60px;
    margin-top: 39px;
    border: 1px solid #ff204a;
    font-weight: 800;
    font-size: 22px;
    line-height: 30px;
    color: #ff204a;
    &.comming {
      width: 244px;
      opacity: 0.7;
      border: 1px solid #c4c4d3;
      color: #c4c4d3;
    }
  }
  @media screen and (min-width: 744px) {
    margin-top: 141px;
    padding-left: 7%;
    padding-right: 7%;
    .txt-wrap {
      margin-top: 10px;
      padding: 0 1%;
    }
  }
  @media screen and (min-width: 1024px) {
    max-width: 87%;
    height: 342px;
    margin-top: 82px;
    padding: 40px 50px 0;
    > div {
      display: flex;
      justify-content: space-between;
      &.inner {
        flex-direction: row-reverse;
      }
    }
    img {
      width: 46%;
      transform: translateY(-77px);
      margin: 0;
    }
    .txt-wrap {
      width: 48%;
      /* height: 250px; */
    }
    .scab {
      font-size: 13px;
    }
    .tit {
      margin-top: 8px;
      font-size: 26px;
    }
    .txt {
      margin-top: 15px;
      font-size: 15px;
    }
    .dday {
      width: 140px;
      height: 50px;
      font-size: 20px;
      &.comming {
        width: 200px;
        font-size: 16px;
      }
    }
  }
  @media screen and (min-width: 1280px) {
    height: 402px;
    margin-top: 120px;
    margin-bottom: 133px;
    padding: 55px 54px 0;
    /* > div {
      padding: 0 54px;
    } */
    img {
      width: 430px;
      transform: translateY(-126px);
    }
    .tit {
      font-size: 29px;
    }
    .txt {
      font-size: 16px;
    }
    .dday {
      height: 50px;
      margin-top: 47px;
      font-size: 20px;
    }
  }
`;
