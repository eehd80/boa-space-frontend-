import React from "react";

import {
  VStack,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Link,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

interface HandlerProps {
  handleClose: any;
  isOpen: any;
  success: boolean;
}

export function ImprotNFTAlert({ isOpen, handleClose, success }: HandlerProps) {
  const finalRef = React.useRef(null);
  const navigate = useNavigate();

  return (
    <>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent maxW={["445px", "445px", "445px", "445px", "456px"]}>
          <ModalCloseButton />
          <ModalBody>
            <VStack mb="20px">
              {success ? (
                <>
                  <Text
                    fontSize={["22px", "22px", "22px", "20px", "17px"]}
                    letterSpacing={["-1px", "-1px", "-1px", "0"]}
                    color="#E0002B"
                  >
                    Successful to import.
                  </Text>
                  <Text
                    mt={0}
                    fontSize={["22px", "22px", "22px", "20px", "17px"]}
                    letterSpacing={["-1px", "-1px", "-1px", "0"]}
                    color="#C4C4D3"
                  >
                    You can see it{" "}
                    <Link
                      as="u"
                      color="#FF204A"
                      textDecoration="underline"
                      onClick={() => navigate("/my")}
                    >
                      {/*<Link href={"/my"}>here</Link>*/}
                      here~
                    </Link>
                  </Text>
                </>
              ) : (
                <Text
                  fontSize={["18px", "18px", "18px", "15px"]}
                  py={3}
                  letterSpacing={["-1px", "-1px", "-1px", "0"]}
                  color="#C4C4D3"
                >
                  please try again !{" "}
                </Text>
              )}
            </VStack>
          </ModalBody>

          {/*<ModalFooter px={0} mt="5px">*/}
          {/*  <StackSet*/}
          {/*    w="100%"*/}
          {/*    spacing="10px"*/}
          {/*    direction={["column", "column", "column", "row-reverse"]}*/}
          {/*    justifyContent="center"*/}
          {/*  >*/}
          {/*    <Button*/}
          {/*      w={["100%", "100%", "100%", "100%"]}*/}
          {/*      size={{ base: "lg", md: "md" }}*/}
          {/*      onClick={handleClose}*/}
          {/*    >*/}
          {/*      Import*/}
          {/*    </Button>*/}
          {/*  </StackSet>*/}
          {/*</ModalFooter>*/}
        </ModalContent>
      </Modal>
    </>
  );
}
//
// const StackSet = styled(Stack)`
//   max-width: 340px;
//   margin: auto;
// `;
