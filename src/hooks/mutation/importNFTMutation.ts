import { gql, useMutation } from "@apollo/client";

const IMPORT_NFT_MUTATION = gql`
  mutation ImportAsset($assetContractAddress: String!, $tokenId: String!) {
    importAsset(assetContractAddress: $assetContractAddress, tokenId: $tokenId) {
      ... on Asset {
        id
      }
    }
  }
`;

export const useImportNFTMutation = () => {
  const [importNFTMutation] = useMutation(IMPORT_NFT_MUTATION);
  return { importNFTMutation };
};
