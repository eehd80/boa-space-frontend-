import { gql, useMutation } from "@apollo/client";
import { useCallback } from "react";
import { GetAssetDetailQueryGQL } from "../query/useGetAssetDetailQuery";

const CREATE_EVENT_MUTATION = gql`
  mutation CreateEvent($eventData: String!) {
    createEvent(eventData: $eventData) {
      ... on Activity {
        id
      }
    }
  }
`;
export interface AssetReFetchData {
  assetContractAddress: string;
  tokenId: string;
}
export const useCreateEventMutation = () => {
  const [createEventMutation, { data, loading, error }] = useMutation(CREATE_EVENT_MUTATION);
  const eventCall = useCallback(
    (variablesData: any, callBack?: any, refetchData?: AssetReFetchData) => {
      const variables = {
        eventData: JSON.stringify(variablesData),
      };
      const refetchQueries = refetchData
        ? [
            {
              query: GetAssetDetailQueryGQL,
              variables: {
                assetContractAddress: refetchData.assetContractAddress,
                tokenId: refetchData.tokenId,
              },
            },
          ]
        : [];
      createEventMutation({
        variables,
        onCompleted: callBack,
        refetchQueries: refetchQueries,
      });
    },
    [createEventMutation]
  );
  return { createEventMutation, eventCall, data, loading, error };
};
