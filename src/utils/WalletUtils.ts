export const shortAddress = (address: String): string => {
  if (address) {
    if (address.length > 6) return `${address.slice(0, 6)}...${address.slice(-4)}`;
    else {
      return address.slice(0, 6);
    }
  }
  return "";
};
export const firstAddress = (address: String): string => {
  if (address) return address.substring(2, 8).toUpperCase();
  else return "";
};
export const isValidAddress = (address: string) => {
  if (!/^(0x)?[0-9a-fA-F]{40}$/.test(address)) {
    return false;
  } else if (/^(0x)?[0-9a-fA-F]{40}$/.test(address) || /^(0x)?[0-9A-Fa-f]{40}$/.test(address)) {
    return true;
  } else {
    return false;
  }
};

export const BOA_SCAN_URL: string =
  process.env.REACT_APP_BOA_SCAN_URL || "https://testnet.boascan.io";

export const getExplorerTxLink = (txHash: string): string => {
  return BOA_SCAN_URL + "/tx/" + txHash;
};
export const getExplorerAddressLink = (address: string): string => {
  return BOA_SCAN_URL + "/address/" + address;
};

export const isAddressZero = (address: string) => {
  if (address) {
    return /^0x0*$/.test(address);
  }
  return false;
};
