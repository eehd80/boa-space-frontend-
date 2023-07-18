import { gql, useMutation } from "@apollo/client";

const CREATE_ORDER_MUTATION = gql`
  mutation CreateOrder(
    $originalData: String!
    $orderHash: String!
    $offerType: Int!
    $assetId: String!
  ) {
    createOrder(
      originalData: $originalData
      orderHash: $orderHash
      offerType: $offerType
      assetId: $assetId
    ) {
      ... on Order {
        amount
        id
        offerer {
          id
        }
        orderHash
        status
        offerType
      }
    }
  }
`;

export const useCreateOrderMutation = () => {
  const [createOrderMutation] = useMutation(CREATE_ORDER_MUTATION);
  return { createOrderMutation };
};
