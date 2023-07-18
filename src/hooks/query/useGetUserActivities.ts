import { gql, useQuery } from "@apollo/client";

export const GetUserActivitiesGQL = gql`
  query GetUserActivities($userAddress: String!) {
    GetUserActivities(userAddress: $userAddress) {
      id
      createdAt
      updatedAt
      activityType
      from {
        id
        userAddress
      }
      amount
      asset {
        name
        thumbnailUrl
        originalUrl
        assetCollection {
          name
        }
      }
      to {
        id
        userAddress
      }
      txHash
      order {
        id
        createdAt
        updatedAt
        offerType
        orderType
        status
        startTime
        endTime
        amount
        sold
        offerer {
          userAddress
        }
        originalData
        orderHash
        unitPrice
      }
    }
  }
`;

export const useUserActivities = (userAddress: string) => {
  const { data, refetch } = useQuery(GetUserActivitiesGQL, {
    variables: { userAddress },
    onCompleted(data) {
      console.debug("GetUserActivitiesGQL >:", data);
    },
    onError(err) {
      console.debug("GetUserActivitiesGQL > error:", err);
    },
    // fetchPolicy: "no-cache",
  });
  return { data, refetch };
};
