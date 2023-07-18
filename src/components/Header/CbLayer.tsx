import React from "react";
import styled from "styled-components";
import { Show, Link } from "@chakra-ui/react";

export default function CdLayer() {
  return (
    <CdLayerWrap>
      <Show below="743px">
        <Link>
          <p>Get up to 100 USDT in trading fee</p>
          <span className="material-symbols-outlined">arrow_right_alt</span>
        </Link>
      </Show>
      <Show above="md">
        <Link>
          <p>BOA 메인넷 기반 NFT Marketplace &apos;BOASPACE&apos; OPEN</p>
        </Link>
      </Show>
    </CdLayerWrap>
  );
}

const CdLayerWrap = styled.div`
  position: relative;
  /* z-index: 10000; */
  height: 58px;
  background: #141225;
  > a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  border-bottom: 1px solid rgba(180, 165, 255, 0.3);
  p {
    display: flex;
    align-items: center;
    font-weight: 400;
    font-size: 15px;
    color: #b4a5ff;
  }
  .material-symbols-outlined {
    margin-left: 15px;
    font-size: 22px;
    color: #b4a5ff;
  }

  @media screen and (min-width: 744px) {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 48px;
    p {
      font-size: 14px;
    }
  }
  @media screen and (min-width: 1024px) {
    height: 32px;
    p {
      font-size: 13px;
    }
    .material-symbols-outlined {
      margin-left: 8px;
    }
  }
`;
