import { gql, useMutation } from "@apollo/client";

export const UPLOAD_SINGLE_IMAGE_MUTATION = gql`
  mutation UploadSingleImage($imageFile: Upload!) {
    uploadSingleImage(imageFile: $imageFile)
  }
`;

export const useUploadSingleImageMutation = () => {
  const [uploadSingleImage] = useMutation(UPLOAD_SINGLE_IMAGE_MUTATION);
  return { uploadSingleImage };
};
