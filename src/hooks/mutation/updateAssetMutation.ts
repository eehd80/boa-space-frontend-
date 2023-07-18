import { gql, useMutation } from "@apollo/client";

const UPDATE_ASSET_MUTATION = gql`
  mutation UpdateAsset(
    $backgroundColor: String
    $metadataLink: String
    $attribute: String
    $externalLink: String
    $imageFile: Upload
    $description: String
    $name: String
    $tokenId: String
    $assetCollectionId: String
    $assetContractAddress: String
    $assetId: String
  ) {
    updateAsset(
      backgroundColor: $backgroundColor
      metadataLink: $metadataLink
      attribute: $attribute
      externalLink: $externalLink
      imageFile: $imageFile
      description: $description
      name: $name
      tokenId: $tokenId
      assetCollectionId: $assetCollectionId
      assetContractAddress: $assetContractAddress
      assetId: $assetId
    ) {
      ... on Asset {
        id
        name
        originalUrl
        assetContractAddress
        tokenId
      }
    }
  }
`;

export const useUpdateAssetMutation = () => {
  const [updateAssetMutation] = useMutation(UPDATE_ASSET_MUTATION);
  return { updateAssetMutation };
};
