import React from "react";
import styled from "styled-components";
import { VStack, Text, Heading, Box, Link, Divider } from "@chakra-ui/react";
import WalletItem from "../../components/Wallet/WalletItem";

export default function MyConnect() {
  return (
    <>
      {/* 접속 전 */}
      <ConnectWrap>
        <Box mx={2} className="">
          <Heading
            as="h2"
            fontSize={["32px", "32px", "32px", "24px"]}
            fontWeight={600}
            lineHeight="35px"
          >
            Connect{" "}
            <Box
              className="txt-your"
              display={["block", "block", "block", "inline-block", "inline-block"]}
            >
              your wallet
            </Box>
          </Heading>
          <Text
            pt="20px"
            fontSize={["18px", "18px", "18px", "15px"]}
            fontWeight={500}
            color="#C4C4D3"
            letterSpacing={"-1px"}
          >
            If you don&apos;t have a{" "}
            <Link>
              <Text as="u" color="#FF204A">
                <span onClick={() => window.open("https://metamask.io/download/", "_blank")}>
                  walletd
                </span>
              </Text>
            </Link>{" "}
            yet, <br className="cut2" /> you can select a provider and create one now.
          </Text>
        </Box>
        <VStack align="stretch" className="box" spacing={1}>
          <Divider borderColor="gray.500" mt={8} mb={2} />
          <WalletItem />
        </VStack>
      </ConnectWrap>
    </>
  );
}

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
    /* > div {
      margin-bottom: 26px;
    } */
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
