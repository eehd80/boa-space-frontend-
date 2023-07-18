import { gql, useQuery } from "@apollo/client";

export const GetFeeInfoQueryGQL = gql`
  query GeeFeeInfo {
    GeeFeeInfo {
      ... on FeeInfo {
        manager
        percent
      }
    }
  }
`;

export const useGetFeeInfo = () => {
  const { data } = useQuery(GetFeeInfoQueryGQL, {
    variables: {},
    onCompleted(data) {
      console.debug("getFeeInfoGQL >:", data);
    },
    onError(err) {
      console.debug("getFeeInfoGQL > error:", err);
    },
  });
  return data?.GeeFeeInfo;
};
