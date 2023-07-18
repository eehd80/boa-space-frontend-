import React from "react";
import styled from "styled-components";
import { Box, Image, SimpleGrid } from "@chakra-ui/react";
import "@kfonts/nanum-square-ac";
import "swiper/css";

export default function CommingItem() {
  // const navigate = useNavigate();
  // const settings = {
  //   arrows: true,
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 3,
  //   slidesToScroll: 1,
  //   responsive: [
  //     {
  //       breakpoint: 1024,
  //       settings: {
  //         arrows: false,
  //       },
  //     },
  //   ],
  // };
  return (
    <Box maxW="1720px" mt={["44px", "44px", "44px", "44px", "28px"]} mx="auto">
      <SimpleGrid
        columns={[1, 1, 1, 1, 2, 4]}
        spacing={["20px", "20px", "20px", "20px", "20px", "20px", "30px"]}
        maxW="1850px"
        mx="auto"
      >
        <UpcomingItem>
          <Image src="/images/main/item4.png" />
          <Box className="txt-wrap">
            <em className="scab">finance</em>
            <strong className="tit">Finple NFT</strong>
            <p className="txt">실물자산 기반 최초의 수익형 부동산 NFT.</p>
          </Box>
          <b className="dday comming">COMING SOON</b>
        </UpcomingItem>

        <UpcomingItem>
          <Image src="/images/main/item1.png" />
          <Box className="txt-wrap">
            <em className="scab">GAME</em>
            <strong className="tit">Game NFT</strong>
            <p className="txt">
              꿈을 향해 달려라! <br /> NFT와 함께 즐기는 신개념 GAME
            </p>
          </Box>
          <b className="dday comming">COMING SOON</b>
        </UpcomingItem>

        <UpcomingItem>
          <Image src="/images/main/item2.png" />
          <Box className="txt-wrap">
            <em className="scab">F&B</em>
            <strong className="tit">Food & Beverage NFT</strong>
            <p className="txt">
              세상 어디에도 없는 특별한 경험을 선사해드립니다. <br /> NFT로 만나는 세계 최초 F&B NFT
            </p>
          </Box>
          <b className="dday comming">COMING SOON</b>
          {/*<Link to="#" className="dday">
            <Image src="/images/icon/bolt.svg" w="24px !important" mr="7px" /> Buy now
          </Link>*/}
        </UpcomingItem>

        <UpcomingItem>
          <Image src="/images/main/item3.png" />
          <Box className="txt-wrap">
            <em className="scab">Sports</em>
            <strong className="tit">Sports NFT</strong>
            <p className="txt">
              스포츠를 통해 건강한 몸도 만들고 돈도 벌 수 있다면? <br /> NFT에서 제공하는 다양한
              혜택과 함께 찾아가겠습니다.
            </p>
          </Box>
          <b className="dday comming">COMING SOON</b>
        </UpcomingItem>
      </SimpleGrid>
      {/* <Show breakpoint="(min-width: 1281px)">
        <ItemSlider {...settings}>
          <UpcomingItem>
            <Image src="/images/main/item4.png" />
            <Box className="txt-wrap">
              <em className="scab">finance</em>
              <strong className="tit">Finple NFT</strong>
              <p className="txt">실물자산 기반 최초의 수익형 부동산 NFT.</p>
            </Box>
            <b className="dday comming">COMING SOON</b>
          </UpcomingItem>
          <UpcomingItem>
            <Image src="/images/main/item1.png" />
            <Box className="txt-wrap">
              <em className="scab">GAME</em>
              <strong className="tit">Game NFT</strong>
              <p className="txt">
                꿈을 향해 달려라! <br /> NFT와 함께 즐기는 신개념 GAME
              </p>
            </Box>
            <b className="dday comming">COMING SOON</b>
          </UpcomingItem>
          <UpcomingItem>
            <Image src="/images/main/item2.png" />
            <Box className="txt-wrap">
              <em className="scab">F&B</em>
              <strong className="tit">Food & Beverage NFT</strong>
              <p className="txt">
                세상 어디에도 없는 특별한 경험을 선사해드립니다. <br /> NFT로 만나는 세계 최초 F&B
                NFT 세상 어디에도 없는 특별한 경험을 선사해드립니다. <br /> NFT로 만나는 세계 최초
                F&B NFT
              </p>
            </Box>
            <Link to="#" className="dday">
              <span className="material-symbols-outlined fill" style={{ marginRight: "7px" }}>
                bolt
              </span>{" "}
              Buy now
            </Link>
          </UpcomingItem>
          <UpcomingItem>
            <Image src="/images/main/item3.png" />
            <Box className="txt-wrap">
              <em className="scab">Sports</em>
              <strong className="tit">Sports NFT</strong>
              <p className="txt">
                스포츠를 통해 건강한 몸도 만들고 돈도 벌 수 있다면? <br /> NFT에서 제공하는 다양한
                혜택과 함께 찾아가겠습니다.
              </p>
            </Box>
            <b className="dday comming">COMING SOON</b>
          </UpcomingItem>
        </ItemSlider>
      </Show> */}
    </Box>
  );
}

// const ItemSlider = styled(Slider)`
//   overflow: hidden;
//   width: 100%;
// `;

const UpcomingItem = styled(Box)`
  position: relative;
  overflow: hidden;
  /* max-width: 400px; */
  width: 100%;
  margin: 0 auto;
  padding-bottom: 73px;
  border-radius: 10px;
  background: #3d3755;
  img {
    width: 100%;
  }
  .txt-wrap {
    padding: 0 20px;
  }
  .scab {
    display: block;
    margin-top: 17px;
    font-weight: 600;
    font-size: 14px;
    font-style: normal;
    text-transform: uppercase;
  }
  .tit {
    display: block;
    margin-top: 2px;
    font-weight: 600;
    font-size: 24px;
    line-height: 35px;
  }
  .txt {
    overflow: hidden;
    height: 45px;
    margin-top: 6px;
    font-weight: 400;
    font-size: 15px;
    color: #9f9fba;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-family: "nanum-square-ac";
  }
  .dday {
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 62px;
    font-weight: 500;
    font-size: 18px;
    line-height: 30px;
    color: #fff;
    background: #6f36ff;
    &.comming {
      background: #46405f;
      color: #b89cff;
      font-weight: 700;
      font-size: 17px;
    }
  }
  @media screen and (min-width: 744px) {
    width: 100%;
    max-width: 544px;
    padding-left: 0;
    padding-right: 0;
    padding-bottom: 120px;
    .txt-wrap {
      margin-top: 10px;
      padding: 0 30px;
    }
    .tit {
      margin-top: 16px;
    }
    .txt {
      margin-top: 20px;
    }
  }
  @media screen and (min-width: 1024px) {
    padding-bottom: 80px;
    .tit {
      margin-top: 5px;
    }
    .txt {
      margin-top: 15px;
    }
  }
`;
