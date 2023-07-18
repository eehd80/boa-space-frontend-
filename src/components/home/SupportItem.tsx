import React from "react";
import styled from "styled-components";
import { Image, Wrap, WrapItem } from "@chakra-ui/react";
import "swiper/css";

export default function SupportItem() {
  return (
    <SupportItemWrap>
      <WrapItem className="sup1">
        <Image src="/images/main/sup-finpl.svg" alt="finpl" />
      </WrapItem>
      <WrapItem className="sup2">
        <Image src="/images/main/sup-nftgo.svg" alt="nftgo" />
      </WrapItem>
      <WrapItem className="sup3">
        <Image src="/images/main/sup-crowdy.svg" alt="crowdy" />
      </WrapItem>
      <WrapItem className="sup4">
        <Image src="/images/main/sup-fmway.svg" alt="fmway" />
      </WrapItem>
      <WrapItem className="sup5">
        <Image src="/images/main/sup-nedmade.svg" alt="nedmade" />
      </WrapItem>
    </SupportItemWrap>
  );
}

const SupportItemWrap = styled(Wrap)`
  ul {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 544px;
    width: 47%;
    margin: 65px auto 0;

    > li {
      display: flex;
      align-items: center;
      padding-bottom: 64px;
      &.sup1 {
        transform: scale(0.9);
      }
      &.sup3 {
        transform: scale(0.9);
      }
      &.sup5 {
        transform: scale(0.9);
      }
    }
  }

  @media screen and (min-width: 744px) {
    ul {
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
      width: 100%;
      margin-top: 54px;

      > li {
        width: 33%;
        margin: 0 !important;
        padding-bottom: 32px;
        transform: scale(0.7);

        &.sup2 {
          transform: scale(0.75);
        }

        &.sup4 {
          transform: scale(0.75) translateX(25px);
        }

        &.sup5 {
          transform: scale(0.65) translateX(50px);
        }
      }
    }
  }
  @media screen and (min-width: 1024px) {
    padding: 0 35px;
    ul {
      flex-wrap: nowrap;
      justify-content: space-between;
      width: 98%;
      max-width: none;
      margin-top: 60px;
      margin-bottom: 10px;
      > li {
        width: auto;
        padding-bottom: 0;
        transform: scale(1.1);
        &.sup1,
        &.sup3 {
          transform: scale(1);
        }
        &.sup2,
        &.sup4,
        &.sup5 {
          transform: scale(1.1);
        }

        &.sup1 img {
          height: 24px;
        }

        &.sup2 img {
          height: 30px;
        }

        &.sup3 img {
          height: 15px;
        }

        &.sup4 img {
          height: 18px;
        }

        &.sup5 img {
          height: 47px;
        }
      }
    }
  }
  @media screen and (min-width: 1280px) {
    ul {
      width: 100%;
      max-width: 1180px;
      margin-top: 48px;

      > li {
        transform: scale(1);
        &.sup1 img {
          height: 32px;
        }

        &.sup2 img {
          height: 41px;
        }

        &.sup3 img {
          height: 19px;
        }

        &.sup4 img {
          height: 24px;
        }

        &.sup5 img {
          height: 60px;
        }
      }
    }
  }
  @media screen and (min-width: 1920px) {
    ul {
      max-width: 1300px;

      > li {
        &.sup1 img {
          height: 36px;
        }

        &.sup2 img {
          height: 47px;
        }

        &.sup3 img {
          height: 22px;
        }

        &.sup4 img {
          height: 27px;
        }

        &.sup5 img {
          height: 68px;
        }
      }
    }
  }
`;
