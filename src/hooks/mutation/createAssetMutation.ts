import { gql, useMutation } from "@apollo/client";

const CREATE_ASSET_MUTATION = gql`
  mutation CreateAsset(
    $totalSupply: Int!
    $description: String!
    $name: String!
    $imageFile: Upload!
    $attribute: String
    $externalLink: String
    $assetContractAddress: String
    $assetCollectionId: String
  ) {
    createAsset(
      totalSupply: $totalSupply
      description: $description
      name: $name
      imageFile: $imageFile
      attribute: $attribute
      externalLink: $externalLink
      assetContractAddress: $assetContractAddress
      assetCollectionId: $assetCollectionId
    ) {
      ... on Asset {
        id
        name
        originalUrl
        tokenId
        assetContractAddress
      }
    }
  }
`;

export const useCreateAssetMutation = () => {
  const [createAssetMutation] = useMutation(CREATE_ASSET_MUTATION);
  return { createAssetMutation };
};
