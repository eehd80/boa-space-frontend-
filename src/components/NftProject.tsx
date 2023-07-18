import React from "react";
import styled from "styled-components";
import { Image, Link, Button } from "@chakra-ui/react";

export default function NFTProject() {
  return (
    <NftList>
      {/*<li>*/}
      {/*  <div className="tit-area">*/}
      {/*    <span className="live">LIVE</span>*/}
      {/*    <em>OVERVIEW</em>*/}
      {/*    <strong>#1 Finple NFT</strong>*/}
      {/*  </div>*/}
      {/*  <div className="img-area">*/}
      {/*    <Image src="/images/thumb/thumb-nft1.png" alt="" />*/}
      {/*  </div>*/}
      {/*  <div className="info-wrap">*/}
      {/*    <dl>*/}
      {/*      <dt>price</dt>*/}
      {/*      <dd>&#8361; 5,000</dd>*/}
      {/*    </dl>*/}
      {/*    <dl>*/}
      {/*      <dt>Quantity</dt>*/}
      {/*      <dd>000ea</dd>*/}
      {/*    </dl>*/}
      {/*    <dl>*/}
      {/*      <dt>Owned by</dt>*/}
      {/*      <dd className="nanum">핀플러스글로벌</dd>*/}
      {/*    </dl>*/}
      {/*    <dl>*/}
      {/*      <dt>Description</dt>*/}
      {/*      <dd className="nanum">실물자산 기반 최초의 수익형 부동산</dd>*/}
      {/*    </dl>*/}
      {/*    <dl>*/}
      {/*      <dt>SNS</dt>*/}
      {/*      <dd>*/}
      {/*        <FtSns>*/}
      {/*          <li>*/}
      {/*            <Link className="m">M</Link>*/}
      {/*          </li>*/}
      {/*          <li>*/}
      {/*            <Link className="twitter">Twitter</Link>*/}
      {/*          </li>*/}
      {/*          <li>*/}
      {/*            <Link className="medium">Medium</Link>*/}
      {/*          </li>*/}
      {/*          <li>*/}
      {/*            <Link className="naver">Naver</Link>*/}
      {/*          </li>*/}
      {/*        </FtSns>*/}
      {/*      </dd>*/}
      {/*    </dl>*/}
      {/*    <Button*/}
      {/*      onClick={() => window.open("https://www.finrft.com/", "_blank")}*/}
      {/*      size={{ base: "lg", lg: "md" }}*/}
      {/*    >*/}
      {/*      BUY NOW*/}
      {/*    </Button>*/}
      {/*  </div>*/}
      {/*</li>*/}
      <li className="soldout">
        <div className="tit-area">
          <em>OVERVIEW</em>
          <strong>#1 FM Way – US Stock NFT</strong>
        </div>
        <div className="img-area">
          <Image src="/images/thumb/thumb-nft2.png" alt="" />
        </div>
        <div className="info-wrap">
          <dl>
            <dt>price</dt>
            <dd>&#8361; 100,000</dd>
          </dl>
          <dl>
            <dt>Quantity</dt>
            <dd>&#8361; 16,600,000</dd>
          </dl>
          <dl>
            <dt>Owned by</dt>
            <dd className="nanum">FM테크놀로지</dd>
          </dl>
          <dl>
            <dt>Description</dt>
            <dd className="nanum">Fmway 미국주식 펀드 수익율 60% 기념 NFT</dd>
          </dl>
          <dl>
            <dt>SNS</dt>
            <dd>
              <FtSns onClick={() => window.open("https://fmway.io/", "_blank")}>
                <li>
                  <Link className="fmway">FM WAY</Link>
                </li>
              </FtSns>
            </dd>
          </dl>
          <Button disabled size={{ base: "lg", lg: "md" }}>
            BUY NOW
          </Button>
        </div>
      </li>
    </NftList>
  );
}

const FtSns = styled.ul`
  display: flex;
  margin-top: 11px;

  > li {
    padding: 0 9px 0 0;

    a {
      overflow: hidden;
      display: block;
      width: 35px;
      height: 35px;
      border-radius: 50%;
      text-indent: -9999px;
      font-size: 0;
      line-height: 0;
      background-position: 50% 50%;
      background-size: contain;
      background-repeat: no-repeat;
    }
  }

  .m {
    background-image: url(/images/comm/ico-m.svg);
  }

  .medium {
    background-image: url(/images/comm/ico-medium.svg);
  }

  .twitter {
    background-image: url(/images/comm/ico-twitter.svg);
  }

  .naver {
    background-image: url(/images/comm/ico-naver.svg);
  }

  .fmway {
    width: 180px;
    height: 26px;
    border-radius: 0;
    background-image: url(/images/comm/ico-fmway.svg);
    background-position: 0 0;
  }

  @media screen and (min-width: 744px) {
    margin-top: 0;
    > li {
      padding: 0 0 0 8px;

      a {
        width: 30px;
        height: 30px;
      }

      .fmway {
        width: 118px;
        height: 17px;
      }
    }
  }
  @media screen and (min-width: 1024px) {
    > li {
      a {
        width: 22px;
        height: 22px;
      }
    }
  }
  @media screen and (min-width: 1280px) {
    > li {
      a {
        width: 25px;
        height: 25px;
      }
    }
  }
`;

const NftList = styled.ul`
  margin-top: 40px;

  > li {
    position: relative;
    margin-bottom: 20px;
    padding: 30px 4%;
    background: #2d2a5c;
    border-radius: 20px;

    &.soldout {
      .img-area {
        &::after {
          display: block;
        }

        img {
          opacity: 0.3;
        }
      }
    }

    .tit-area {
      padding-bottom: 30px;

      .live {
        position: absolute;
        top: 0;
        left: 13px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 78px;
        height: 28px;
        background: #ff204a;
        border-radius: 144px;
        font-weight: 700;
        font-size: 14px;
        line-height: 23px;
        color: #ffffff;
        transform: translate(5px, -15px);

        &::before {
          content: "";
          display: block;
          width: 8px;
          height: 8px;
          margin-right: 10px;
          border-radius: 50%;
          background: #fff;
        }
      }

      em {
        display: block;
        font-weight: 700;
        font-size: 18px;
        line-height: 33px;
        text-transform: uppercase;
        color: #c4c4d3;
        font-style: normal;
      }

      strong {
        display: block;
        font-weight: 600;
        font-size: 32px;
        line-height: 39px;
      }
    }

    .img-area {
      position: relative;
      overflow: hidden;
      border-radius: 20px;
      background: #fff;

      &::after {
        content: "";
        display: none;
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 10;
        transform: translate(-50%, -50%) scale(0.8);
        width: 340px;
        height: 171px;
        background: url(/images/explore/img-soldout.svg) no-repeat 0 0;
      }

      img {
        width: 100%;
      }
    }

    .info-wrap {
      width: 93%;
      margin: 0 auto;
      padding: 17px 0 0;

      dl {
        padding: 12px 0;
        border-bottom: 1px solid #403c5c;
      }

      dt {
        font-weight: 600;
        font-size: 16px;
        line-height: 32px;
        text-transform: capitalize;
        color: #b4a5ff;
      }

      dd {
        /* margin-top: 4px; */
        font-weight: 600;
        font-size: 22px;
        line-height: 32px;
        color: #fff;
      }

      .nanum {
        font-family: "nanum-square-ac";
        font-weight: 400;
      }
    }

    button {
      display: flex;
      width: 100%;
      margin: 22px auto 0;

      &:disabled {
        background-color: #929292 !important;
        opacity: 1 !important;
      }
    }
  }

  @media screen and (min-width: 744px) {
    max-width: 544px;
    margin: 50px auto 0;
    > li {
      margin-bottom: 26px;
      padding: 45px 7%;

      .tit-area {
        .live {
          left: 40px;
        }
      }

      .info-wrap {
        width: 99%;

        dl {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding: 14px 0 15px;
        }

        dt {
          width: 27%;
          font-size: 20px;
        }

        dd {
          display: flex;
          justify-content: flex-end;
          width: 70%;
          margin-top: 0;
          font-size: 20px;
          text-align: right;
        }
      }
    }
  }
  @media screen and (min-width: 1024px) {
    max-width: 800px;
    margin-top: 36px;
    > li {
      position: relative;
      display: flex;
      flex-direction: row-reverse;
      justify-content: space-between;
      margin-bottom: 30px;
      padding: 40px 3.5%;

      .tit-area {
        position: absolute;
        top: 0;
        left: 3.5%;
        padding-top: 34px;

        .live {
          left: 0;
        }

        em {
          font-size: 12px;
          line-height: 19px;
        }

        strong {
          font-size: 23px;
        }
      }

      .info-wrap {
        display: flex;
        flex-direction: column;
        width: 51%;
        margin: 0;
        padding: 66px 0 0;

        dl {
          padding: 6px 0;
        }

        dt {
          width: 25%;
          font-weight: 600;
          font-size: 14px;
        }

        dd {
          display: flex;
          align-items: center;
          width: 75%;
          height: 32px;
          font-weight: 600;
          font-size: 15px;
          text-align: right;
        }
      }

      .img-area {
        width: 43%;

        img {
          height: 100%;
          object-fit: cover;
          object-position: 50% 50%;
        }
      }

      button {
        margin: auto 0 0;
      }
    }
  }
  @media screen and (min-width: 1280px) {
    max-width: 1060px;
    margin-top: 44px;
    > li {
      margin-bottom: 40px;
      padding: 50px 4.5%;

      .tit-area {
        left: 4.5%;
        padding-top: 57px;

        .live {
          top: 3px;
          width: 78px;
          height: 28px;
          font-size: 13px;
        }

        em {
          font-size: 14px;
        }

        strong {
          margin-top: 5px;
          font-size: 28px;
        }
      }

      .img-area {
        width: 45%;
      }

      .info-wrap {
        width: 50%;
        padding-top: 88px;

        dl {
          padding: 15px 0;
        }

        dt {
          font-size: 18px;
        }

        dd {
          font-size: 18px;
        }
      }
    }
  }
  @media screen and (min-width: 1920px) {
    max-width: 1220px;
    > li {
      margin-bottom: 48px;
      padding: 50px 5%;

      .img-area {
        width: 39%;
      }

      .info-wrap {
        width: 54%;
      }
    }
  }
`;
