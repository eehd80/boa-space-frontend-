import { gql, useQuery } from "@apollo/client";
import { useDispatch } from "react-redux";
import { changeFavorite } from "../../features/favorite/favoriteSlice";

export const GetMyInfoGQL = gql`
  query GetMyInfo {
    getMyInfo {
      ... on User {
        id
        createdAt
        updatedAt
        userAddress
        nonce
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
        assetsFavorite {
          id
          name
          originalUrl
          tokenId
          viewCount
          totalSupply
          externalLink
          description
          attribute
          assetContractAddress
          assetCollection {
            useWhiteList
          }
        }
      }
    }
  }
`;

export const useGetMyInfo = () => {
  const dispatch = useDispatch();
  const { data } = useQuery(GetMyInfoGQL, {
    variables: {},
    onCompleted(data) {
      console.debug("useGetMyInfo >:", data);
      if (data?.getMyInfo?.assetsFavorite) {
        dispatch(changeFavorite(data.getMyInfo.assetsFavorite));
      }
    },
    onError() {
      // console.debug("useGetMyInfo > error:", err);
    },
    // fetchPolicy: "no-cache",
  });
  return data;
};
