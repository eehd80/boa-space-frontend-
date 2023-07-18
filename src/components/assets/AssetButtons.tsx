import { Button, HStack } from "@chakra-ui/react";
import React, { useState } from "react";
import styled from "styled-components";

export default function AssetButtons({
  onClickCart,
  onClickBuyNow,
}: {
  onClickCart?(): void;
  onClickBuyNow?(): void;
}) {
  const [isLargeBuy, setLargeBuy] = useState(false);

  const handlerOver = () => {
    setLargeBuy(true);
  };
  const handlerLeave = () => {
    setLargeBuy(false);
  };

  return (
    <HStack className="btn-wrap" onMouseLeave={handlerLeave}>
      <SlideButton
        variant="primary"
        borderRadius="0"
        w={isLargeBuy ? "0%" : "100%"}
        h="38px"
        borderRightWidth="1px"
        borderColor="#2C273F"
        fontSize="15px"
        fontWeight="600"
        onClick={onClickCart}
        leftIcon={
          isLargeBuy ? null : <span className="material-symbols-outlined fill">shopping_cart</span>
        }
      >
        {isLargeBuy ? (
          <span className="material-symbols-outlined fill">shopping_cart</span>
        ) : (
          "Add to cart"
        )}
      </SlideButton>
      <SlideButton
        style={{ display: "none" }}
        variant="primary"
        w={isLargeBuy ? "100%" : "30px"}
        h="38px"
        borderRadius="0"
        m="0 !important"
        borderLeftWidth="1px"
        borderColor="#BCBCCB"
        fontSize="15px"
        fontWeight="600"
        onClick={onClickBuyNow}
        leftIcon={isLargeBuy ? <span className="material-symbols-outlined fill">bolt</span> : null}
        onMouseLeave={handlerLeave}
        onMouseOver={handlerOver}
      >
        {isLargeBuy ? "Buy Now" : <span className="material-symbols-outlined fill">bolt</span>}
      </SlideButton>
    </HStack>
  );
}
const SlideButton = styled(Button)`
  transition: all 0.3s ease-in-out;
`;
