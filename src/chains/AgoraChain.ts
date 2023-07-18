import { Chain } from "@usedapp/core";

export const AgoraMainnet: Chain = {
  chainId: 2151,
  chainName: "AgoraMainnet",
  isTestChain: false,
  isLocalChain: false,
  multicallAddress: "0x045d5aFA977791EFA0A78d9Cd31D0327DB79C632",
  rpcUrl: "https://mainnet.bosagora.org",
  nativeCurrency: {
    name: "BOA",
    symbol: "BOA",
    decimals: 18,
  },
  blockExplorerUrl: "https://scan.bosagora.org",
  getExplorerAddressLink: (address: string) => `https://scan.bosagora.org/address/${address}`,
  getExplorerTransactionLink: (transactionHash: string) =>
    `https://scan.bosagora.org/tx/${transactionHash}`,
};

export const AgoraTestnet: Chain = {
  chainId: 2019,
  chainName: "AgoraTestnet",
  isTestChain: true,
  isLocalChain: false,
  multicallAddress: "0xbD9cffA1ABaEecDD75e197eBC18d12E172ff82E3",
  rpcUrl: "https://testnet.bosagora.org",
  nativeCurrency: {
    name: "BOA",
    symbol: "BOA",
    decimals: 18,
  },
  blockExplorerUrl: "https://testnet-scan.bosagora.org",
  getExplorerAddressLink: (address: string) =>
    `https://testnet-scan.bosagora.org/address/${address}`,
  getExplorerTransactionLink: (transactionHash: string) =>
    `https://testnet-scan.bosagora.org/tx/${transactionHash}`,
};

export default { AgoraMainnet, AgoraTestnet };
