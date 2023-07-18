import { gql, useMutation } from "@apollo/client";

const SAVE_PROFILE_MUTATION = gql`
  mutation CreateUserProfile(
    $name: String!
    $homepage: String
    $instagram: String
    $youtube: String
    $twitter: String
    $bio: String
    $userFile: Upload
  ) {
    createUserProfile(
      name: $name
      homepage: $homepage
      instagram: $instagram
      youtube: $youtube
      twitter: $twitter
      bio: $bio
      userFile: $userFile
    ) {
      ... on Profile {
        id
      }
    }
  }
`;

export const UseSaveProfileMutation = () => {
  const [saveProfileMutation] = useMutation(SAVE_PROFILE_MUTATION);
  return { saveProfileMutation };
};
