import React from "react";
import { Box, Button } from "@chakra-ui/react";
import { useEthers } from "@usedapp/core";
import { JsonRpcProvider } from "@ethersproject/providers/src.ts/json-rpc-provider";

export default function Sign() {
  const { account, library } = useEthers();
  return (
    <main id="main">
      <div className="container">
        <Box>
          {/*<Button colorScheme="blue" onClick={getSignedData}>*/}
          {/*  Buttons*/}
          {/*</Button>*/}
          {!!(library && account) && (
            <Button
              style={{
                height: "3rem",
                borderRadius: "1rem",
                cursor: "pointer",
              }}
              onClick={() => {
                (library as JsonRpcProvider)
                  .getSigner(account)
                  .signMessage("👋")
                  .then((signature: any) => {
                    window.alert(`Success!\n\n${signature}`);
                  })
                  .catch((error: any) => {
                    window.alert(
                      "Failure!" + (error && error.message ? `\n\n${error.message}` : "")
                    );
                  });
              }}
            >
              Sign Message
            </Button>
          )}
        </Box>
      </div>
    </main>
  );
}
