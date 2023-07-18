import React from "react";
import styled from "styled-components";
import { VStack, Heading, Image, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function PageNotFound() {
  const navigate = useNavigate();
  return (
    <LoginWrap>
      <Heading as="h2" size="xl" mt={["20px", "20px", "20px", "52px", "50px"]} mb={["20px"]}>
        <VStack>
          <Image
            src="/images/comm/img-planet.svg"
            display={["none", "none", "none", "block"]}
            w="110px"
            mb="10px"
          />
          <Text
            fontSize={["30px", "30px", "30px", "34px"]}
            fontWeight={["600", "600", "600", "500"]}
          >
            404 Page Not Found.
          </Text>
          <Button size={{ base: "lg", lg: "md" }} onClick={() => navigate("/")}>
            Go back to home
          </Button>
        </VStack>
      </Heading>
    </LoginWrap>
  );
}

const LoginWrap = styled.div`
  @media screen and (min-width: 1024px) {
    transform: scale(0.8);
    transform-origin: 50% 0;
  }
  @media screen and (min-width: 1280px) {
    transform: scale(1);
  }
`;
