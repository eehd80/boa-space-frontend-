import { gql, useMutation } from "@apollo/client";

const UPDATE_PROFILE_MUTATION = gql`
  mutation UpdateProfile(
    $homepage: String
    $instagram: String
    $youtube: String
    $twitter: String
    $bio: String
    $name: String
    $userFile: Upload
  ) {
    updateProfile(
      homepage: $homepage
      instagram: $instagram
      youtube: $youtube
      twitter: $twitter
      bio: $bio
      name: $name
      userFile: $userFile
    ) {
      ... on Profile {
        id
      }
    }
  }
`;

export const useUpdateProfileMutation = () => {
  const [updateProfileMutation] = useMutation(UPDATE_PROFILE_MUTATION);
  return { updateProfileMutation };
};
