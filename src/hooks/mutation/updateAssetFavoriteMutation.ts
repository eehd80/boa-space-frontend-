import { gql, useMutation } from "@apollo/client";

const UPDATE_ASSET_FAVORITE_MUTATION = gql`
  mutation UpdateAssetFavorite($tokenId: String, $assetContractAddress: String, $assetId: String) {
    updateAssetFavorite(
      tokenId: $tokenId
      assetContractAddress: $assetContractAddress
      assetId: $assetId
    ) {
      ... on Asset {
        id
      }
    }
  }
`;

export const useUpdateAssetFavoriteMutation = () => {
  const [updateAssetFavoriteMutation] = useMutation(UPDATE_ASSET_FAVORITE_MUTATION);
  return { updateAssetFavoriteMutation };
};
