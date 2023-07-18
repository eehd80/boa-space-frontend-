import { gql, useLazyQuery } from "@apollo/client";

const getTokenGQL = gql`
  query GetToken($address: String!, $message: String!, $signature: String!) {
    getJwt(signature: $signature, message: $message, userAddress: $address) {
      ... on Jwt {
        userAddress
        jwt
      }
    }
  }
`;

export const useGetTokenQuery = () => {
  const [loadToken, { data }] = useLazyQuery(getTokenGQL);
  return { loadToken, token: data };
};
