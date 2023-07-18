import React, { useEffect } from "react";
import styled from "styled-components";
import { Image, Button } from "@chakra-ui/react";
import "@kfonts/nanum-square-ac";
import NFTProject from "../../components/NftProject";
import { useActiveState } from "../../hooks/useActiveState";
import { useNavigate } from "react-router-dom";

export default function Explore() {
  const { activeState, online } = useActiveState();
  const navigate = useNavigate();
  useEffect(() => {
    console.debug("online :", online);
    console.debug("activeState :", activeState);
  }, [activeState, online]);
  return (
    <>
      <IntWrap>
        <IntTit>
          <Image src="/images/explore/int-img.svg" className="logo-img" alt="" />
          <div className="tit-wrap">
            <div className="img-area">
              <Image src="/images/explore/int-title.svg" className="logo-txt" alt="" />
            </div>
            <p className="tit-txt">
              2022년 12월,{" "}
              <BoaLogo>
                BOA
                <em>SPACE</em>
              </BoaLogo>{" "}
              차원의 문이 열리기 시작했습니다! <br />
              내가 보유한 NFT 및 자산 확인이 가능한 상태입니다.{" "}
            </p>
          </div>
        </IntTit>
        <IntAdvan>
          <li>
            <div className="img-wrap">
              <Image src="/images/explore/int-sym1.svg" />
            </div>
            <p className="txt">
              BOASPACE는 <br /> 보스아고라 메인넷 기반의
              <br /> NFT 마켓플레이스입니다.
            </p>
          </li>
          <li>
            <div className="img-wrap">
              <Image src="/images/explore/int-sym2.svg" />
            </div>
            <p className="txt">
              바다보다 깊고
              <br /> 하늘보다 넓은!
              <br /> 우주 NFT 마켓플레이스로
              <br /> 발전할 예정입니다.
            </p>
          </li>
          <li>
            <div className="img-wrap">
              <Image src="/images/explore/int-sym3.svg" />
            </div>
            <p className="txt">
              원클릭!
              <br /> 개인 메타마스크 지갑과
              <br /> 연동만 하면 NFT 거래
              <br /> 준비 완료!{" "}
            </p>
          </li>
          <li>
            <div className="img-wrap">
              <Image src="/images/explore/int-sym4.svg" />
            </div>
            <p className="txt">
              BOASPACE의
              <br /> 거래 통화로는
              <br /> BOA가 사용됩니다.{" "}
            </p>
          </li>
          <li>
            <div className="img-wrap">
              <Image src="/images/explore/int-sym5.svg" />
            </div>
            <p className="txt">
              거래를 위해 BOA를
              <br /> 지갑에 준비해 주세요.
              <span>
                (프로젝트에 따라 해당 프로젝트의 토큰도 거래 수단으로 추가 될 수 있습니다.)
              </span>
            </p>
          </li>
        </IntAdvan>
        {!online ? (
          <Button size={{ base: "lg", lg: "md" }} onClick={() => navigate("/connect")}>
            CONNECT WALLET
          </Button>
        ) : null}
      </IntWrap>
      <NftWrap>
        <Titleh2>
          NFT <span>Project</span>
        </Titleh2>
        <NFTProject />
      </NftWrap>
      <Comming>
        <p>
          곧,{" "}
          <BoaLogo>
            BOA
            <em>SPACE</em>
          </BoaLogo>
          의 차원의 문이 활짝 열릴 예정입니다! <br />
          차원의 문이 활짝 열리면 <b>NFT 민팅, 판매, 전송, 거래</b>가 가능해집니다.
        </p>
        <p>
          BOA<span>SPACE</span>의 우주는 계속 진화합니다. <br /> 차별화된 다양한 편의기능이 수시로
          업데이트 될 예정입니다.
        </p>
        {!online ? (
          <Button size={{ base: "lg", lg: "md" }} onClick={() => navigate("/connect")}>
            CONNECT WALLET
          </Button>
        ) : null}
      </Comming>
    </>
  );
}

const BoaLogo = styled.strong`
  font-weight: 800;
  font-family: "Inter";

  em {
    font-style: normal;
    font-weight: 400;
  }
`;

const Comming = styled.div`
  width: 93%;
  margin: 58px auto 0;

  p {
    margin-bottom: 30px;
    font-family: "nanum-square-ac";
    font-style: normal;
    font-weight: 500;
    font-size: 23px;
    line-height: 40px;
    text-align: center;
    text-transform: uppercase;
  }

  b {
    color: #b4a5ff;
  }

  span {
    font-weight: 400;
  }

  button {
    display: flex;
    margin: 45px auto 0;
  }

  @media screen and (min-width: 744px) {
    max-width: 544px;
    margin-top: 68px;
    p {
      font-size: 25px;
      line-height: 42px;
    }
  }
  @media screen and (min-width: 1024px) {
    max-width: none;
    p {
      font-size: 27px;
      line-height: 45px;
    }
  }
  @media screen and (min-width: 1280px) {
    margin-top: 80px;
    button {
      min-width: 216px;
    }
  }
`;

const IntAdvan = styled.ul`
  margin-top: 35px;

  br {
    display: none;
  }

  > li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 120px;
    margin-bottom: 6px;
    padding: 0 5% 0 1%;
    background: rgba(10, 6, 33, 0.8);
    border-radius: 10px;

    &:last-child {
      height: 136px;

      .img-wrap img {
        transform: scale(0.6);
      }
    }

    &:nth-child(2) .img-wrap img {
      transform: scale(0.6);
    }

    .img-wrap {
      display: flex;
      justify-content: center;
      /* width: 30%; */
      width: 110px;

      img {
        margin-top: -3px;
        transform: scale(0.7);
      }
    }

    .txt {
      width: calc(100% - 120px);
      font-weight: 400;
      font-size: 18px;
      font-family: "nanum-square-ac";
      text-transform: uppercase;
      color: #fff;
      text-align: left;

      span {
        display: block;
        font-weight: 400;
        font-size: 13px;
        line-height: 19px;
        text-transform: uppercase;
        color: #c4c4d3;
      }
    }
  }

  @media screen and (min-width: 744px) {
    max-width: 544px;
    margin: 40px auto 0;
    > li {
      height: 139px;
      padding-right: 28px;

      &:last-child {
        height: 139px;
      }

      .img-wrap {
        width: 28%;
        height: 80%;

        img {
          transform: scale(0.8);
        }
      }

      .txt {
        width: 71%;
        font-size: 19px;

        span {
          font-size: 12px;
        }
      }
    }
  }
  @media screen and (min-width: 1024px) {
    display: flex;
    justify-content: space-between;
    max-width: 820px;
    margin-top: 26px;
    > li {
      display: block;
      width: 19%;
      height: 262px;
      padding: 5px 2%;

      &:nth-child(2) .img-wrap img {
        transform: scale(0.56);
      }

      &:last-child {
        height: 262px;

        .img-wrap img {
          transform: scale(0.58);
        }
      }

      .img-wrap {
        width: 100%;
        height: 145px;

        img {
          transform: scale(0.7);
        }
      }

      .txt {
        width: 100%;
        font-weight: 400;
        font-size: 14px;

        span {
          font-size: 10px;
          line-height: 15px;
        }
      }
    }
  }
  @media screen and (min-width: 1280px) {
    margin-top: 48px;
    max-width: 1055px;
    br {
      display: block;
    }

    > li {
      padding: 10px 1.6%;
      height: 328px;

      &:last-child {
        height: 328px;
      }

      .img-wrap {
        height: 185px;
      }

      .txt {
        font-size: 16px;

        span {
          display: block;
          margin-top: 7px;
          font-weight: 400;
          font-size: 12px;
          line-height: 19px;
        }
      }
    }
  }

  @media screen and (min-width: 1920px) {
    max-width: 1220px;
    > li {
      &:nth-child(2) .img-wrap img,
      &:last-child .img-wrap img {
        transform: scale(0.5);
      }

      .img-wrap {
        height: 190px;

        img {
          transform: scale(0.6);
        }
      }
    }
  }
`;

const IntTit = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;

  .tit-wrap {
    width: 89%;
    margin: 14px auto;
  }

  .logo-txt {
    margin: 0 auto;
  }

  .tit-txt {
    margin-top: 30px;
    font-weight: 500;
    font-size: 24px;
    text-align: center;
    text-transform: uppercase;
    font-family: "nanum-square-ac";
  }

  @media screen and (min-width: 744px) {
    padding-top: 36px;
    .logo-img {
      width: 162px;
    }

    .tit-wrap {
      margin-top: 20px;
    }

    .logo-txt {
      width: 416px;
    }

    .tit-txt {
      margin-top: 43px;
      font-size: 22px;
    }
  }
  @media screen and (min-width: 1024px) {
    padding-top: 20px;
    .logo-txt {
      width: 416px;
    }

    .tit-wrap {
      margin-top: 6px;
    }

    .logo-txt {
      width: 375px;
    }

    .tit-txt {
      margin-top: 20px;
    }
  }
  @media screen and (min-width: 1280px) {
    .logo-img {
      width: 200px;
    }

    .tit-wrap {
      margin-top: 20px;
    }

    .logo-txt {
      width: 415px;
    }

    .tit-txt {
      margin-top: 40px;
      font-size: 25px;
    }
  }
`;

const IntWrap = styled.section`
  button {
    display: flex;
    margin: 40px auto 0;
  }

  @media screen and (min-width: 1024px) {
    button {
      margin-top: 30px;
    }
  }
  @media screen and (min-width: 1280px) {
    button {
      min-width: 216px;
    }
  }
`;

const NftWrap = styled.section`
  padding-top: 103px;
  @media screen and (min-width: 744px) {
    padding-top: 85px;
  }
  @media screen and (min-width: 1024px) {
    padding-top: 80px;
  }
  @media screen and (min-width: 1280px) {
    padding-top: 110px;
  }
`;

const Titleh2 = styled.h2`
  font-weight: 700;
  font-size: 38px;
  line-height: 46px;
  text-align: center;

  span {
    font-weight: 400;
  }

  @media screen and (min-width: 744px) {
    font-size: 42px;
  }
  @media screen and (min-width: 1024px) {
    font-size: 40px;
  }
  @media screen and (min-width: 1280px) {
    font-size: 45px;
  }
`;
