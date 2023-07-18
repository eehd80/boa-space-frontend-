import { gql, useMutation } from "@apollo/client";

const CREATE_ASSET_COLLECTION_MUTATION = gql`
  mutation CreateAssetCollection(
    $category: Int!
    $name: String!
    $logoUrl: String!
    $feeCollectors: String
    $telegramLink: String
    $mediumLink: String
    $webLink: String
    $description: String
    $bannerUrl: String
    $featureUrl: String
    $useWhiteList: Int
    $whiteList: String
  ) {
    createAssetCollection(
      category: $category
      name: $name
      logoUrl: $logoUrl
      feeCollectors: $feeCollectors
      telegramLink: $telegramLink
      mediumLink: $mediumLink
      webLink: $webLink
      description: $description
      bannerUrl: $bannerUrl
      featureUrl: $featureUrl
      useWhiteList: $useWhiteList
      whiteList: $whiteList
    ) {
      ... on AssetCollection {
        id
      }
    }
  }
`;

export const useCreateAssetCollectionMutation = () => {
  const [createAssetCollectionMutation] = useMutation(CREATE_ASSET_COLLECTION_MUTATION);
  return { createAssetCollectionMutation };
};
