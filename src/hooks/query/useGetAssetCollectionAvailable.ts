import { gql, useLazyQuery } from "@apollo/client";

export const GetAssetCollectionAvailable = gql`
  query GetAssetCollectionAvailable($address: String!, $id: String!) {
    GetAssetCollectionAvailable(address: $address, id: $id) {
      address
      availableAmount
      buyAmount
    }
  }
`;

export const useGetAssetCollectionAvailable = () => {
  const [getAvailable, { data }] = useLazyQuery(GetAssetCollectionAvailable, {
    onCompleted(data) {
      console.debug("useGetAssetCollectionAvailable >:", data);
    },
    onError(err) {
      console.debug("GetAssetCollectionAvailable > error:", err);
    },
    fetchPolicy: "no-cache",
  });
  return { getAvailable, data };
};
