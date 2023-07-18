import React, { useState } from "react";
import { useEffect, useRef } from "react";
import { useEthers } from "@usedapp/core";
import styled from "@emotion/styled";
import Jazzicon from "@metamask/jazzicon";

const StyledIdenticon = styled.div`
  overflow: hidden;
  height: 100%;
  width: 100%;
  border-radius: 50%;
  background-color: #151225;
  div {
    width: 100% !important;
    height: 100% !important;
  }
  svg {
    width: 100% !important;
    height: 100% !important;
    background-size: cover;
  }
`;

export default function Identicon() {
  const ref = useRef(null);
  const { account } = useEthers();
  const [jazziconSize, setJazziconSize] = useState(0);

  useEffect(() => {
    const { clientWidth, clientHeight } = ref.current.parentNode;
    const size = Math.min(clientWidth, clientHeight);
    setJazziconSize(size);
  }, []);

  useEffect(() => {
    if (account && ref.current) {
      ref.current.innerHTML = "";
      ref.current.appendChild(
        Jazzicon(jazziconSize, parseInt(account.toLowerCase().slice(2, 10), 16))
      );
    }
  }, [account, jazziconSize]);

  return <StyledIdenticon ref={ref} />;
}
