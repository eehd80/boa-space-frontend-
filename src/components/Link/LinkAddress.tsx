import {
  firstAddress,
  getExplorerAddressLink,
  isAddressZero,
  shortAddress,
} from "../../utils/WalletUtils";
import React from "react";
import { Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useEthers } from "@usedapp/core";

export default function LinkAddress({
  address,
  isLeft = false,
}: {
  address?: string;
  isLeft?: boolean;
}) {
  const { account } = useEthers();
  return (
    <React.Fragment>
      {isAddressZero(address) ? (
        address && address === account ? (
          "you"
        ) : isLeft ? (
          firstAddress(address)
        ) : (
          shortAddress(address)
        )
      ) : (
        <Link to={getExplorerAddressLink(address)} target="_blank">
          <Text color="Secondary_V" className="blue ellipsis">
            {address && address === account
              ? "you"
              : isLeft
              ? firstAddress(address)
              : shortAddress(address)}
          </Text>
        </Link>
      )}
    </React.Fragment>
  );
}
