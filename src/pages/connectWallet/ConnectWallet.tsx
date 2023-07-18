import React, { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import ConnectSelect from "../../components/Wallet/ConnectSelect";
import { useLocation, useNavigate } from "react-router-dom";
import { useActiveState } from "../../hooks/useActiveState";

// connect page
export default function ConnectWallet() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { online } = useActiveState();
  useEffect(() => {
    console.debug("connect wallet > online:", online);
    if (online) {
      navigate(state?.before ? state.before : "/my");
    }
  }, [online, navigate, state]);
  return (
    <Box mt="87px" maxW="550px" ml="auto" mr="auto">
      <ConnectSelect />
    </Box>
  );
}
