import { gql, useQuery } from "@apollo/client";

export const GetAssetQueryGQL = gql`
  query GetAsset($tokenId: String!, $assetContractAddress: String) {
    GetAsset(tokenId: $tokenId, assetContractAddress: $assetContractAddress) {
      ... on Asset {
        id
        createdAt
        updatedAt
        assetContractAddress
        tokenId
        name
        description
        originalUrl
        thumbnailUrl
        previewUrl
        metadataLink
        backgroundColor
        totalSupply
      }
    }
  }
`;

export const useGetAssetQuery = (assetContractAddress: string, tokenId: string) => {
  const { data } = useQuery(GetAssetQueryGQL, {
    variables: { assetContractAddress, tokenId },
    onCompleted(data) {
      console.debug("getAssetGQL >:", data);
    },
    onError(err) {
      console.debug("getAssetGQL > error:", err);
    },
    // fetchPolicy: "no-cache",
  });
  return data;
};
