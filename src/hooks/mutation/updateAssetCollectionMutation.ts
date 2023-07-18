import { gql, useMutation } from "@apollo/client";

const UPDATE_ASSET_COLLECTION_MUTATION = gql`
  mutation UpdateAssetCollection(
    $updateAssetCollectionId: String!
    $category: Int
    $feeCollectors: String
    $telegramLink: String
    $mediumLink: String
    $webLink: String
    $description: String
    $name: String
    $bannerUrl: String
    $featureUrl: String
    $logoUrl: String
    $useWhiteList: Int
    $whiteList: String
  ) {
    updateAssetCollection(
      id: $updateAssetCollectionId
      category: $category
      feeCollectors: $feeCollectors
      telegramLink: $telegramLink
      mediumLink: $mediumLink
      webLink: $webLink
      description: $description
      name: $name
      bannerUrl: $bannerUrl
      featureUrl: $featureUrl
      logoUrl: $logoUrl
      useWhiteList: $useWhiteList
      whiteList: $whiteList
    ) {
      ... on AssetCollection {
        id
      }
    }
  }
`;

export const useUpdateAssetCollectionMutation = () => {
  const [updateAssetCollectionMutation] = useMutation(UPDATE_ASSET_COLLECTION_MUTATION);
  return { updateAssetCollectionMutation };
};
