import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  Heading,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  VStack,
  useDisclosure,
  Spacer,
  Box,
  Text,
  Divider,
} from "@chakra-ui/react";
import InputRow from "./InputRow";
import WalletItem from "../Wallet/WalletItem";
// import ConnectWallet from "../Wallet/ConnectSelect";

export default function LoginForm() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <ImportWrap>
        <InputRow />
        <Spacer mb={["20px"]} />
        <InputRow />

        <VStack
          spacing={[3, 3, 3, 2]}
          align="stretch"
          mt={["40px", "40px", "40px", "46px", "43px", "56px"]}
        >
          <Button type="submit" onClick={onOpen} size={{ base: "lg", md: "md" }}>
            Import
          </Button>
          <Button type="reset" variant="outline" mt="11px" size={{ base: "lg", md: "md" }}>
            Cancel
          </Button>
        </VStack>
      </ImportWrap>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContentCondition>
          {/* 디자인이 약간씩 달라서 css로 구분했다가 그냥 따로 넣었습니다. */}
          {/* <ConnectWallet /> */}
          <ConnectWrap>
            <GnbWrap>
              <ul className="lst-gnb">
                <li>
                  <Link to="#" onClick={onClose}>
                    <span
                      className="material-symbols-outlined"
                      style={{ transform: "rotate(90deg)" }}
                    >
                      expand_more
                    </span>{" "}
                    Account
                  </Link>
                </li>
              </ul>
            </GnbWrap>
            <Box mx={2} className="">
              <Heading
                as="h2"
                fontSize={["32px", "32px", "32px", "24px"]}
                fontWeight={600}
                lineHeight="35px"
              >
                Connect your wallet
              </Heading>
              <Text
                pt="15px"
                fontSize={["14px", "18px", "18px", "15px"]}
                fontWeight={500}
                color="#C4C4D3"
                letterSpacing={"-1px"}
              >
                If you don&apos;t have a{" "}
                <Link to="#">
                  <Text as="span" color="#FF204A">
                    wallet
                  </Text>
                </Link>{" "}
                yet, <br className="cut2" /> you can select a provider and create one now.
              </Text>
            </Box>
            <VStack align="stretch" className="box">
              <Divider borderColor="#413C5A" mt={7} mb={3} />
              <WalletItem />
            </VStack>
          </ConnectWrap>
          <ModalCloseButton />
        </ModalContentCondition>
      </Modal>
    </>
  );
}

const GnbWrap = styled.div`
  .lst-gnb {
    li {
      display: flex;
      border-bottom: 1px solid #443f5b;
      padding-left: 10px;
    }

    a,
    button {
      position: relative;
      display: flex;
      align-items: center;
      width: 100%;
      padding: 20px 15px;
      font-weight: 600;
      font-size: 16px;
      line-height: 35px;
      color: var(--chakra-colors-white);

      &:hover {
        color: var(--chakra-colors-boa-2);
        background: transparent;
      }

      span {
        margin-right: 15px;
        font-size: 23px;
      }
    }
  }
`;

const ConnectWrap = styled(Box)`
  width: 100%;
  margin: 0 auto;
  .box {
    position: relative;
    margin-top: 33px;
    padding: 0 20px 0.5rem 28px;
    background: #2a253d;
    border: 1px solid #413c5a;
    border-radius: 8px;
    &::after {
      content: "";
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      height: 1px;
      background: #413c5a;
    }
    > div {
      margin: 9px 0;
    }
    hr {
      display: none;
    }
  }
  .modal {
    .box {
      > div {
        margin-bottom: 20px;
      }
    }
    .txt-your {
      display: inline-block;
    }
  }
`;

const ImportWrap = styled.div`
  max-width: 428px;
  margin: auto;
  padding: 20px 22px 30px;
  background: #19182f;
  border: 1px solid #221f3d;
  border-radius: 16px;
  @media screen and (min-width: 744px) {
    padding: 35px 33px;
  }
`;

const ModalContentCondition = styled(ModalContent)`
  h2 {
    .cut {
      display: inline-block;
    }
  }
  .box {
    margin-top: 0;
    padding: 0;
    background: transparent;
    border: none;
    border-radius: 8px;
    &::after {
      display: none;
    }
    > div {
      margin-bottom: 0;
    }
    hr {
      display: block;
    }
  }
`;
