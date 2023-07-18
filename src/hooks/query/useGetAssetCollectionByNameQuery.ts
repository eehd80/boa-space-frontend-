import { gql, useQuery } from "@apollo/client";

export const GetAssetCollectionByNameQueryGQL = gql`
  query GetAssetCollectionByName($name: String!) {
    GetAssetCollectionByName(name: $name) {
      ... on AssetCollection {
        id
        createdAt
        updatedAt
        name
        url
        description
        logoUrl
        featureUrl
        bannerUrl
        webLink
        mediumLink
        telegramLink
        categoryType
        creator {
          id
          userAddress
          profile {
            id
            createdAt
            updatedAt
            image
            name
            bio
            twitter
            youtube
            instagram
            homepage
          }
        }
        feeCollectors {
          fee
          user {
            userAddress
          }
        }
        useWhiteList
        whiteList {
          availableAmount
          user {
            userAddress
          }
        }
        assets {
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
          externalLink
          attribute
          metadataLink
          backgroundColor
          totalSupply
          viewCount
          owners {
            amount
            user {
              userAddress
            }
          }
          activities {
            activityType
            amount
            createdAt
            order {
              id
              offerType
              orderType
              status
              startTime
              endTime
              amount
              sold
              originalData
              orderHash
              unitPrice
            }
            id
            txHash
          }
        }
      }
    }
  }
`;

export const useGetAssetCollectionByNameQuery = (name: string) => {
  const { data, refetch } = useQuery(GetAssetCollectionByNameQueryGQL, {
    variables: { name },
    onCompleted(data) {
      console.debug("useGetAssetCollectionByNameQuery >:", data);
    },
    onError(err) {
      console.debug("useGetAssetCollectionByNameQuery > error:", err);
    },
    // fetchPolicy: "no-cache",
  });
  return { data, refetch };
};

export const GetAssetCollectionByNameSimpleQueryGQL = gql`
  query GetAssetCollectionByName($name: String!) {
    GetAssetCollectionByName(name: $name) {
      ... on AssetCollection {
        id
        name
        url
        description
        logoUrl
        featureUrl
        bannerUrl
        webLink
        mediumLink
        telegramLink
        categoryType
        useWhiteList
        whiteList {
          availableAmount
          user {
            userAddress
          }
        }
        feeCollectors {
          fee
          user {
            userAddress
          }
        }
        createdAt
      }
    }
  }
`;

export const useGetAssetCollectionByNameSimpleQuery = (name: string) => {
  const { data, loading } = useQuery(GetAssetCollectionByNameSimpleQueryGQL, {
    variables: { name },
    onCompleted(data) {
      console.debug("GetAssetCollectionByNameSimpleQueryGQL >:", data);
    },
    onError(err) {
      console.debug("GetAssetCollectionByNameSimpleQueryGQL > error:", err);
    },
    fetchPolicy: "no-cache",
  });
  return { data, loading };
};

export const GetAssetCollectionByNameAvailableCheckQueryGQL = gql`
  query GetAssetCollectionByName($name: String!) {
    GetAssetCollectionByName(name: $name) {
      ... on AssetCollection {
        id
      }
    }
  }
`;

export const useGetAssetCollectionByAvailableCheckQuery = (name: string) => {
  const { data, loading } = useQuery(GetAssetCollectionByNameAvailableCheckQueryGQL, {
    variables: { name },
    onCompleted(data) {
      console.debug("GetAssetCollectionByNameAvailableCheckQueryGQL >:", data);
    },
    onError(err) {
      console.debug("GetAssetCollectionByNameAvailableCheckQueryGQL > error:", err);
    },
  });
  return { data, loading };
};
