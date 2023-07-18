import { gql, useLazyQuery, useQuery } from "@apollo/client";

const getNonceGQL = gql`
  query GetNonce($userAddress: String!) {
    getNonce(userAddress: $userAddress) {
      ... on User {
        id
        createdAt
        updatedAt
        nonce
      }
    }
  }
`;

export const useGetNonceQuery = (account: string) => {
  console.debug("getNunceQuery.", account);
  const { data } = useQuery(getNonceGQL, {
    variables: { userAddress: account },
    onCompleted(data) {
      console.debug("getNonceGQL >:", data);
    },
    onError(err) {
      console.debug("getNonceGQL > error:", err);
    },
  });
  return data;
};
export const useGetNonceLazyQuery = () => {
  const [loadNonce, { data }] = useLazyQuery(getNonceGQL);
  return { loadNonce, nonce: data };
};
