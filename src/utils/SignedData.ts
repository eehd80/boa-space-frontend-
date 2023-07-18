// All properties on a domain are optional

export const domain = {
  name: "Ether Mail",
  version: "1",
  chainId: 1,
  verifyingContract: "0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC",
};

// The named list of all type definitions
export const types = {
  Person: [
    { name: "name", type: "string" },
    { name: "wallet", type: "address" },
  ],
  Mail: [
    { name: "from", type: "Person" },
    { name: "to", type: "Person" },
    { name: "contents", type: "string" },
  ],
};

// The data to sign
export const value = {
  from: {
    name: "Cow",
    wallet: "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826",
  },
  to: {
    name: "Bob",
    wallet: "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB",
  },

  contents: "Hello, Bob!",
};
export const BOASPACE_DOMAIN = "boaspace.io";
//
// export async function getSignedData() {
//   const provider = new ethers.providers.Web3Provider(window.ethereum)
//
// // MetaMask requires requesting permission to connect users accounts
//   await provider.send("eth_requestAccounts", []);
//
// // The MetaMask plugin also allows signing transactions to
// // send ether and pay to change state within the blockchain.
// // For this, you need the account signer...
//   const signer = provider.getSigner()
//   return signer
// }
