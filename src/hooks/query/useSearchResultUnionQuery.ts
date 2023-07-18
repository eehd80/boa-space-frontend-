import { gql, useLazyQuery } from "@apollo/client";

export const GetSearchResultGQL = gql`
  query GetSearchResult($input: String!) {
    GetSearchResult(input: $input) {
      ... on Asset {
        id
        assetContractAddress
        tokenId
        name
        originalUrl
        thumbnailUrl
        previewUrl
        attribute
        metadataLink
        backgroundColor
        totalSupply
        viewCount
        assetCollection {
          name
          useWhiteList
        }
      }
      ... on AssetCollection {
        id
        createdAt
        name
        description
        logoUrl
        featureUrl
        bannerUrl
        webLink
        mediumLink
        telegramLink
        categoryType
        feeCollectors {
          fee
        }
        useWhiteList
      }
    }
  }
`;

export const useSearchResultQuery = () => {
  const [getSearchResult, { data, loading, error }] = useLazyQuery(GetSearchResultGQL, {
    fetchPolicy: "no-cache",
  });
  return { getSearchResult, data, loading, error };
};
