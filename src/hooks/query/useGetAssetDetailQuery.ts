import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { useEthers } from "@usedapp/core";
import { useNavigate } from "react-router-dom";

export const GetAssetDetailQueryGQL = gql`
  query GetAssetDetail($assetContractAddress: String, $tokenId: String, $userAddress: String) {
    GetAssetDetail(
      assetContractAddress: $assetContractAddress
      tokenId: $tokenId
      userAddress: $userAddress
    ) {
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
        viewCount
        updatedAt
        attribute
        externalLink
        assetContract {
          id
          contractAddress
          description
          imageUrl
          itemType
          metaType
          symbol
        }
        assetCollection {
          id
          name
          bannerUrl
          categoryType
          featureUrl
          logoUrl
          mediumLink
          telegramLink
          webLink
          description
          feeCollectors {
            fee
            user {
              userAddress
            }
          }
          url
          useWhiteList
          whiteList {
            availableAmount
            user {
              userAddress
            }
          }
        }
        activities {
          id
          activityType
          createdAt
          from {
            id
            userAddress
          }
          amount
          to {
            id
            userAddress
          }
          txHash
          order {
            id
            createdAt
            offerType
            orderType
            status
            amount
            sold
            unitPrice
            offerer {
              id
              userAddress
            }
            originalData
            orderHash
            updatedAt
          }
        }
        creator {
          id
          userAddress
        }
        owners {
          id
          user {
            id
            userAddress
          }
          amount
        }
      }
    }
  }
`;

export const useGetAssetDetailQuery = (assetContractAddress: string, tokenId: string) => {
  const { account } = useEthers();
  const navigate = useNavigate();
  const { data, refetch } = useQuery(GetAssetDetailQueryGQL, {
    variables: { assetContractAddress, tokenId, userAddress: account },
    onCompleted(data) {
      console.debug("getAssetDetailQuery >:", data);
    },
    onError(err) {
      console.debug("getAssetDetailQuery > error:", err);
      navigate("/not_found_asset");
    },
    // fetchPolicy: "no-cache",
  });
  return { data, refetch };
};

export const GetAssetDetailSimpleQueryGQL = gql`
  query GetAssetDetail($assetContractAddress: String, $tokenId: String) {
    GetAssetDetail(assetContractAddress: $assetContractAddress, tokenId: $tokenId) {
      ... on Asset {
        id
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
        attribute
        externalLink
        activities {
          id
          activityType
        }
        creator {
          id
          userAddress
        }
        assetCollection {
          id
          name
          logoUrl
        }
      }
    }
  }
`;

export const useGetAssetDetailSimpleQuery = () => {
  const [getAssetDetailSimple, { data }] = useLazyQuery(GetAssetDetailSimpleQueryGQL, {
    onCompleted(data) {
      console.debug("getAssetDetailQuery >:", data);
    },
    onError(err) {
      console.debug("getAssetDetailQuery > error:", err);
    },
    fetchPolicy: "no-cache",
  });
  return { getAssetDetailSimple, data };
};
