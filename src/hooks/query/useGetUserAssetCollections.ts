import { gql, useQuery } from "@apollo/client";
import { useEthers } from "@usedapp/core";

export const GetUserAssetCollectionsQueryGQL = gql`
  query GetUserAssetCollections($userAddress: String!) {
    GetUserAssetCollections(userAddress: $userAddress) {
      id
      createdAt
      updatedAt
      name
      description
      logoUrl
      featureUrl
      bannerUrl
      categoryType
      mediumLink
      telegramLink
      webLink
      feeCollectors {
        fee
        user {
          userAddress
        }
      }
      url
      creator {
        userAddress
      }
      useWhiteList
    }
  }
`;

export const useGetUserAssetCollections = () => {
  const { account } = useEthers();
  const { data } = useQuery(GetUserAssetCollectionsQueryGQL, {
    variables: { userAddress: account },
  });
  if (data && data?.GetUserAssetCollections) {
    const collections = data.GetUserAssetCollections;
    return {
      collections,
    };
  }
  return {};
};
