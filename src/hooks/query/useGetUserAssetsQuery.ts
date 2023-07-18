import { gql, useQuery } from "@apollo/client";
import { removeJWT } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { changeCollectedCount, changeCreatedCount } from "../../features/asset/assetsSlice";

export const GetUserAssetsQueryGQL = gql`
  query GetUserAssets($userAddress: String!) {
    GetUserAssets(userAddress: $userAddress) {
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
      creator {
        id
        userAddress
      }
      assetCollection {
        name
        useWhiteList
      }
      owners {
        unitPrice
        user {
          userAddress
        }
        amount
      }
      assetContract {
        id
        contractAddress
        description
        imageUrl
        itemType
        metaType
        symbol
      }
      activities {
        id
        activityType
        createdAt
        amount
        txHash
        order {
          id
          offerType
          orderType
          status
          amount
          sold
          unitPrice
          originalData
          orderHash
          updatedAt
        }
      }
    }
  }
`;

export const useGetUserAssetsQuery = (account: string) => {
  const dispatch = useDispatch();
  const { data, loading, refetch } = useQuery(GetUserAssetsQueryGQL, {
    variables: { userAddress: account },
    onCompleted(data) {
      console.debug("getUserAssetsGQL >:", data);
      if (data?.GetUserAssets) {
        dispatch(changeCollectedCount(data?.GetUserAssets?.length ?? 0));
        const create = data.GetUserAssets.filter(
          (asset: any) => asset.creator.userAddress === account
        );
        dispatch(changeCreatedCount(create?.length));
      }
    },
    onError(err) {
      if (err.toString().includes("user not found")) {
        dispatch(removeJWT(account));
        console.debug("YOU NEED LOGIN");
      } else {
        console.debug("getUserAssetsGQL > error:", err);
      }
    },
  });
  return { data, loading, refetch };
};
