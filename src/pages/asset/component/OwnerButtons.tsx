import React from "react";
import { Button, Flex } from "@chakra-ui/react";

interface OwnerButtonsProps {
  isSell: boolean;
  isEdit: boolean;
  onSellClick?: () => void;
  onEditClick?: () => void;
}
export default function OwnerButtons({
  isSell,
  isEdit,
  onSellClick,
  onEditClick,
}: OwnerButtonsProps) {
  return (
    <>
      {isSell && (
        <Flex
          className="btn-float"
          display="none"
          pos="fixed"
          top={["auto", "auto", "auto", "auto", "70px"]}
          bottom={["0", "0", "0", "0", "auto"]}
          left="0"
          right="0"
          zIndex="100"
          justify={["center", "center", "center", "center", "flex-end"]}
          mx="auto"
          px="35px"
          py="15px"
          borderColor="popup_BBG"
          borderWidth={["1px 0 0", "1px 0 0", "1px 0 0", "1px 0 0", "0 0 1px"]}
          bg="BG_V"
          backgroundColor="rgba(21, 18, 37, 0.7)"
          backdropFilter="blur(10px)"
        >
          {isSell && (
            <React.Fragment>
              {isEdit && (
                <Button variant="gray" w="162px" h="57px" onClick={onEditClick}>
                  Edit
                </Button>
              )}
              <Button variant="primary" w="162px" h="57px" m="0 0 0 10px" onClick={onSellClick}>
                Sell
              </Button>
            </React.Fragment>
          )}
        </Flex>
      )}
    </>
  );
}
