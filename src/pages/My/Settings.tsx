import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Img,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FormikErrors, useFormik } from "formik";
import { UseSaveProfileMutation } from "../../hooks/mutation/CreateUserProfileMutation";
import Asterisk from "../../components/icon/Asterisk";
import { WaitingModal } from "../../components/Modals/Waitting";
import { useNavigate } from "react-router-dom";
import { GetMyInfoGQL, useGetMyInfo } from "../../hooks/query/useGetMyInfo";
import ImageDropZone, { Shape } from "../../components/DragBox/ImageDropZone";
import { useUpdateProfileMutation } from "../../hooks/mutation/updateProfileMutation";

interface FormValues {
  name: string;
  homepage: string;
  instagram: string;
  youtube: string;
  twitter: string;
  bio: string;
  userFile: File;
}

export default function MySettings() {
  const { saveProfileMutation } = UseSaveProfileMutation();
  const { updateProfileMutation } = useUpdateProfileMutation();
  const waitingModal = useDisclosure();
  const navigate = useNavigate();
  const [isEditMode, setEditMode] = useState<boolean>(false);
  const [userFileSrc, setUserFileSrc] = useState<string>(undefined);
  const myInfo = useGetMyInfo();
  const profile = useMemo(() => {
    if (myInfo?.getMyInfo?.profile) {
      return myInfo.getMyInfo.profile;
    }
  }, [myInfo]);
  const toast = useToast({
    position: "bottom-right",
    variant: "variant",
  });
  const formik = useFormik({
    initialValues: {
      name: undefined,
      homepage: undefined,
      instagram: undefined,
      youtube: undefined,
      twitter: undefined,
      bio: undefined,
      userFile: undefined,
    },
    onSubmit: (values: FormValues) => {
      waitingModal.onOpen();
      const variables = {
        ...values,
      };
      const param = {
        variables,
        onCompleted(data: any) {
          console.debug("saveProfileMutation >:", data);
          waitingModal.onClose();
          navigate("/my");
          toast({
            title: "Successfully save profile",
            status: "success",
          });
        },
        onError(err: any) {
          console.debug("saveProfileMutation > error:", err);
          waitingModal.onClose();
          toast({
            title: "Failed to save profile",
            status: "success",
          });
        },
        refetchQueries: [{ query: GetMyInfoGQL, variables: {} }],
      };
      if (profile) {
        updateProfileMutation(param);
      } else {
        saveProfileMutation(param);
      }
    },
    validateOnBlur: true,
    validateOnChange: true,
    // Add a custom validation function (this can be async too!)
    validate: (values: FormValues) => {
      let errors: FormikErrors<FormValues> = {};
      errors = {};
      if (!values.name) {
        errors.name = "This name is available.";
      }
      return errors;
    },
  });

  useEffect(() => {
    if (formik && profile && !isEditMode) {
      setEditMode(true);
      console.debug("Effect profile Data:", profile);
      formik.resetForm({
        values: {
          name: profile.name,
          homepage: profile.homepage,
          instagram: profile.instagram,
          youtube: profile.youtube,
          twitter: profile.twitter,
          bio: profile.bio,
          userFile: undefined,
        },
      });
      setUserFileSrc(profile?.image ? profile.image : undefined);
    }
  }, [profile, isEditMode, formik]);

  return (
    <React.Fragment>
      <Container variant="onlym">
        <Heading as="h2" variant="tit">
          Profile Settings
        </Heading>
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing="26px" mt="33px">
            <FormControl id="image">
              <Heading variant="sectit">Profile image</Heading>
              <FormLabel htmlFor="profile" w="120px" h="120px">
                <ImageDropZone
                  shape={Shape.CIRCLE}
                  width={120}
                  height={120}
                  onChange={<T extends File>(file: T) => formik.setFieldValue("userFile", file)}
                  isIdenticon={true}
                  defaultSrc={userFileSrc}
                />
              </FormLabel>
            </FormControl>

            <FormControl id="name" isInvalid={!!formik.errors.name && !!formik.touched.name}>
              <Heading variant="sectit">
                <FormLabel>
                  User name <Asterisk />
                </FormLabel>
              </Heading>
              <Input
                name="name"
                variant="outline"
                type="text"
                placeholder="A cool name"
                mt="10px"
                value={formik.values.name || ""}
                onChange={formik.handleChange}
              />
              <FormErrorMessage>
                <FormHelperText fontSize="14px">
                  <Stack
                    direction="row"
                    justify="flex-start"
                    align="center"
                    spacing="3px"
                    color="Point_Red"
                  >
                    <span className="material-symbols-outlined" style={{ fontWeight: "300" }}>
                      close
                    </span>
                    <Text fontSize="14px">{formik.errors.name}</Text>
                  </Stack>
                </FormHelperText>
              </FormErrorMessage>
            </FormControl>

            <FormControl id="bio">
              <Heading variant="sectit">
                <FormLabel>Bio</FormLabel>
              </Heading>
              <Textarea
                variant="outline"
                mt="10px"
                placeholder="Introduce your self"
                minH="100px"
                name="bio"
                value={formik.values.bio || ""}
                onChange={formik.handleChange}
              />
            </FormControl>
          </Stack>

          <Heading as="h3" variant="tit32" mt="70px">
            Social
          </Heading>
          <Stack spacing="23px" mt="26px">
            <FormControl id="Twitter">
              <Heading variant="sectit">
                <FormLabel>Twitter</FormLabel>
              </Heading>
              <InputGroup mt="10px">
                <InputLeftElement width="auto" pointerEvents="none">
                  <Img src="/images/icon/sns_twitter.svg" alt="" ml="17px" mr="12px" />
                </InputLeftElement>
                <Input
                  variant="outline"
                  type="text"
                  placeholder="https://twitter.com/..."
                  name="twitter"
                  value={formik.values.twitter || ""}
                  onChange={formik.handleChange}
                />
              </InputGroup>
            </FormControl>

            <FormControl id="Youtube">
              <Heading variant="sectit">
                <FormLabel>Youtube</FormLabel>
              </Heading>
              <InputGroup mt="10px">
                <InputLeftElement width="auto" pointerEvents="none">
                  <Img src="/images/icon/sns_youtube.svg" alt="" ml="17px" mr="12px" />
                </InputLeftElement>
                <Input
                  variant="outline"
                  type="text"
                  placeholder="https://youtube.com/..."
                  name="youtube"
                  value={formik.values.youtube || ""}
                  onChange={formik.handleChange}
                />
              </InputGroup>
            </FormControl>

            <FormControl id="Instagram">
              <Heading variant="sectit">
                <FormLabel>Instagram</FormLabel>
              </Heading>
              <InputGroup mt="10px">
                <InputLeftElement width="auto" pointerEvents="none">
                  <Img src="/images/icon/sns_instagram.svg" alt="" ml="17px" mr="12px" />
                </InputLeftElement>
                <Input
                  variant="outline"
                  type="text"
                  placeholder="https://instagram.com/..."
                  name="instagram"
                  value={formik.values.instagram || ""}
                  onChange={formik.handleChange}
                />
              </InputGroup>
            </FormControl>

            <FormControl id="Homepage">
              <Heading variant="sectit">
                <FormLabel>Homepage</FormLabel>
              </Heading>
              <InputGroup mt="10px">
                <InputLeftElement width="auto" pointerEvents="none">
                  <Img src="/images/icon/sns_language.svg" alt="" ml="17px" mr="12px" />
                </InputLeftElement>
                <Input
                  name="homepage"
                  type="text"
                  placeholder="https://www.yourhomepage.site"
                  value={formik.values.homepage || ""}
                  onChange={formik.handleChange}
                />
              </InputGroup>
            </FormControl>
          </Stack>
          <Button variant="primary" w="98px" mt="32px" type="submit">
            Save
          </Button>
        </form>
        <WaitingModal isOpen={waitingModal.isOpen} onClose={waitingModal.onClose} />
      </Container>
    </React.Fragment>
  );
}
