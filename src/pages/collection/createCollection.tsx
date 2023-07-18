import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Collapse,
  Container,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Img,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Stack,
  Switch,
  Text,
  Textarea,
  useDisclosure,
  useToast,
  VisuallyHidden,
  VStack,
} from "@chakra-ui/react";
import { CheckIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { FormikErrors, useFormik } from "formik";
import Asterisk from "../../components/icon/Asterisk";
import { useCreateAssetCollectionMutation } from "../../hooks/mutation/createAssetCollectionMutation";
import ImageDropZone, { Shape } from "../../components/DragBox/ImageDropZone";
import { Loading, WaitingModal } from "../../components/Modals/Waitting";
import { useNavigate, useParams } from "react-router-dom";
import { CategoryType, WhiteListType } from "../../type";
import { GetUserAssetCollectionsQueryGQL } from "../../hooks/query/useGetUserAssetCollections";
import { useEthers } from "@usedapp/core";
import { useUploadSingleImageMutation } from "../../hooks/mutation/UploadSingleImage";
import {
  useGetAssetCollectionByAvailableCheckQuery,
  useGetAssetCollectionByNameSimpleQuery,
} from "../../hooks/query/useGetAssetCollectionByNameQuery";
import { useUpdateAssetCollectionMutation } from "../../hooks/mutation/updateAssetCollectionMutation";
import { isValidAddress } from "../../utils/WalletUtils";
import styled from "styled-components";
import _ from "lodash";
import { WhitelistValidAlert } from "../../components/Modals/WhitelistValidAlert";
import useModal from "../../hooks/useModal";
import { addDays, format } from "date-fns";

interface FormValues {
  name: string;
  logoFile: File;
  featureFile: File;
  bannerFile: File;
  description: string;
  category: number;
  webLink: string;
  mediumLink: string;
  telegramLink: string;
  feeCollectors: FeeValues[];
  whiteList: string;
}

interface FeeValues {
  address: string;
  fee: number;
  key: number;
}
const whitelistEx = `Ex )
wallet address1, available quantity,
wallet address2, available quantity,
0x6629E54deC62B88b34d6fF7439B290cC0f1bfaEC, 3,
0x9E8549cc1B5b9036AC410Ed11966BB3c6B94A77d, 1,
⋮
⋮
⋮`;

export default function CreateCollection() {
  const { collectionId } = useParams();
  const { data, loading } = useGetAssetCollectionByNameSimpleQuery(collectionId);
  const [isEditMode, setEditMode] = useState<boolean>(false);
  const [createAt, setCreateAt] = useState<Date>();
  const [logoSrc, setLogoSrc] = useState<string>(undefined);
  const [featureSrc, setFeatureSrc] = useState<string>(undefined);
  const [bannerSrc, setBannerSrc] = useState<string>(undefined);
  const [disableWhiteList, setDisableWhiteList] = useState(false);
  const [isWhiteList, setWhiteList] = useState(false);
  const { alert, confirm } = useModal();

  const saveData = useMemo(() => {
    if (data) {
      return data.GetAssetCollectionByName;
    }
  }, [data]);

  const [createFees, setCreateFees] = useState<FeeValues[]>([{ address: "", fee: NaN, key: 0 }]);
  const { updateAssetCollectionMutation } = useUpdateAssetCollectionMutation();
  const { createAssetCollectionMutation } = useCreateAssetCollectionMutation();
  const navigate = useNavigate();
  const { account } = useEthers();
  const [categoryType, setCategoryType] = useState(CategoryType.NO_CATEGORY);
  const toast = useToast({
    position: "bottom-right",
    variant: "variant",
  });
  const waitingModal = useDisclosure();
  const whitelistModal = useDisclosure();

  const { uploadSingleImage } = useUploadSingleImageMutation();

  const formik = useFormik({
    initialValues: {
      name: "",
      logoFile: undefined,
      featureFile: undefined,
      bannerFile: undefined,
      description: "",
      category: NaN,
      feeCollectors: [],
      webLink: undefined,
      mediumLink: undefined,
      telegramLink: undefined,
      whiteList: "",
    },
    onSubmit: async (values: FormValues) => {
      waitingModal.onOpen();

      let logoFileURL = null;

      if (formik.values.logoFile !== undefined) {
        logoFileURL = await uploadSingleImage({
          variables: { imageFile: formik.values.logoFile },
        });
      } else {
        if (saveData?.logoUrl) logoFileURL = { data: { uploadSingleImage: saveData.logoUrl } };
      }

      let featureFileURL = null;
      if (formik.values.featureFile !== undefined) {
        featureFileURL = await uploadSingleImage({
          variables: { imageFile: formik.values.featureFile },
        });
      } else {
        if (saveData?.featureUrl)
          featureFileURL = { data: { uploadSingleImage: saveData.featureUrl } };
      }

      let bannerFileURL = null;
      if (formik.values.bannerFile !== undefined) {
        bannerFileURL = await uploadSingleImage({
          variables: { imageFile: formik.values.bannerFile },
        });
      } else {
        if (saveData?.bannerUrl)
          bannerFileURL = { data: { uploadSingleImage: saveData.bannerUrl } };
      }
      const createFee = createFees
        .filter((item) => item.address !== "" && !isNaN(item.fee))
        .map((item) => {
          return { address: item.address, fee: item.fee };
        });

      const params = {
        name: values.name,
        description: values.description,
        feeCollectors: createFee.length ? JSON.stringify(createFee) : undefined,
        category: categoryType.value,
        logoUrl: logoFileURL.data.uploadSingleImage,
        featureUrl: featureFileURL ? featureFileURL.data.uploadSingleImage : undefined,
        bannerUrl: bannerFileURL ? bannerFileURL.data.uploadSingleImage : undefined,
        telegramLink: values.telegramLink,
        mediumLink: values.mediumLink,
        webLink: values.webLink,
        useWhiteList:
          isWhiteList && isWhitelistValidation ? WhiteListType.ACTIVE : WhiteListType.NONE,
        whiteList:
          isWhiteList && isWhitelistValidation ? JSON.stringify(values.whiteList) : undefined,
      };

      if (isEditMode) {
        const useWhiteList =
          saveData.useWhiteList === WhiteListType.ACTIVE && !isWhiteList
            ? WhiteListType.INACTIVE
            : saveData.useWhiteList;
        updateAssetCollectionMutation({
          variables: { ...params, updateAssetCollectionId: saveData.id, useWhiteList },
          onCompleted(data: any) {
            console.debug("createAssetCollectionMutation > Compete:", data);
            waitingModal.onClose();
            toast({
              title: "Successfully save collection",
              status: "success",
            });
            navigate("/collections");
          },
          onError(err: any) {
            console.debug("createAssetCollectionMutation > Error:", err);
            waitingModal.onClose();
            toast({
              title: "Save failed collection",
              status: "error",
            });
          },
          refetchQueries: [
            { query: GetUserAssetCollectionsQueryGQL, variables: { userAddress: account } },
          ],
        });
      } else {
        createAssetCollectionMutation({
          variables: params,
          onCompleted(data: any) {
            console.debug("createAssetCollectionMutation > Compete:", data);
            waitingModal.onClose();
            toast({
              title: "Successfully created collection",
              status: "success",
            });
            navigate("/collections");
          },
          onError(err: any) {
            console.debug("createAssetCollectionMutation > Error:", err);
            waitingModal.onClose();
            toast({
              title: "Create failed collection",
              status: "error",
            });
          },
          refetchQueries: [
            { query: GetUserAssetCollectionsQueryGQL, variables: { userAddress: account } },
          ],
        });
      }
    },
    validateOnBlur: true,
    validateOnChange: true,
    // Add a custom validation function (this can be async too!)
    validate: (values: FormValues) => {
      let errors: FormikErrors<FormValues> = {};
      errors = {};
      if (!values.logoFile) {
        if (!saveData?.logoUrl) errors.logoFile = "Please select the logo image required.";
      }

      if (isEditMode) {
        if (saveData.name !== values.name) {
          setAvailableName(values.name);
        } else {
          setAvailableName("");
        }
      } else {
        if (!values.name) {
          errors.name = "This name is available.";
        } else {
          setAvailableName(values.name);
        }
      }

      if (createFees && createFees?.length) {
        createFees.forEach((fee) => {
          if (fee.address !== "") {
            if (!isValidAddress(fee.address)) {
              errors.feeCollectors = "Invalid address.";
            }
            if (isNaN(fee.fee)) {
              errors.feeCollectors = "Fee value is available.";
            }
          }
        });
      }

      if (isWhiteList) {
        if (!isWhitelistValidation) {
          errors.whiteList = "Validate for whitelist has not been executed.";
        }
      }

      return errors;
    },
  });

  const [availableName, setAvailableName] = useState("");
  const [isAvailable, setAvailable] = useState(true);
  const { data: availableData, loading: availableLoading } =
    useGetAssetCollectionByAvailableCheckQuery(availableName);

  useEffect(() => {
    if (availableData?.GetAssetCollectionByName?.id) {
      setAvailable(false);
    } else {
      setAvailable(true);
    }
  }, [availableData]);

  const handlerFeeDelete = (e: any) => {
    if (createFees.length > 1) {
      setCreateFees(createFees.filter((item) => item.key !== e)); // 인덱스 값과 같지 않은 애들만 남겨둔다
    } else {
      setCreateFees([{ address: "", fee: NaN, key: 0 }]);
    }
  };

  const handlerFeeUpdate = (asset: any) => {
    setCreateFees(
      createFees.map((prop) => (prop.key === asset.key ? { ...prop, ...asset } : prop))
    );
  };

  const getMaxKey = useCallback((): number => {
    return Math.max(...createFees.map((item) => item.key)) + 1;
  }, [createFees]);

  useEffect(() => {
    if (formik && saveData && !isEditMode) {
      console.debug("saveData", saveData);

      setEditMode(true);
      setCategoryType(getCategoryByName(saveData.categoryType));
      setLogoSrc(saveData.logoUrl);
      setFeatureSrc(saveData.featureUrl);
      setBannerSrc(saveData.bannerUrl);
      setCreateFees([...converterFee(saveData.feeCollectors)]);
      setWhiteList(saveData.useWhiteList === WhiteListType.ACTIVE);
      setDisableWhiteList(saveData.useWhiteList !== WhiteListType.ACTIVE);
      setCreateAt(new Date(saveData.createdAt));

      const wl =
        saveData?.whiteList?.length > 0
          ? saveData?.whiteList?.reduce((combinedValue: string, item: any) => {
              const conversionValue = item.user.userAddress + "," + item.availableAmount + ",\n";
              return (combinedValue += conversionValue);
            }, "")
          : "";
      setWhitelistValidation(wl !== "");
      setWhiteListValue(wl);
      formik.resetForm({
        values: {
          name: saveData.name,
          logoFile: undefined,
          featureFile: undefined,
          bannerFile: undefined,
          description: saveData.description,
          category: NaN,
          feeCollectors: [],
          webLink: saveData.webLink,
          mediumLink: saveData.mediumLink,
          telegramLink: saveData.telegramLink,
          whiteList: undefined,
        },
      });
    }
  }, [formik, saveData, isEditMode]);

  const getCategoryByName = (name: string) => {
    return Object.values(CategoryType).find(
      (c) => c.name.replace(" ", "_").toLowerCase() === name.toLowerCase()
    );
  };

  const converterFee = (fee: any[]): FeeValues[] => {
    return fee?.map((f: any, idx: number) => {
      return { address: f.user.userAddress, fee: f.fee, key: idx };
    });
  };

  const [whiteListValue, setWhiteListValue] = useState("");
  const [isWhitelistValidation, setWhitelistValidation] = useState(false);
  const [whiteErrorMsg, setWhiteErrorMsg] = useState([]);

  const handlerValidateWhiteList = () => {
    if (_.isEmpty(whiteListValue)) {
      alert("Please enter a wallet address.");
      setWhitelistValidation(false);
      return;
    }
    const addressList = whiteListValue
      .replaceAll("\n", "")
      .replaceAll(" ", "")
      .trim()
      .split(",")
      .filter((i) => !_.isEmpty(i));
    const chuckList = _.chunk(addressList, 2);
    const paris = _.fromPairs(chuckList);

    const val = [];
    for (const [key, value] of Object.entries(paris)) {
      console.log(`${key}: ${!isValidAddress(key)} & ${value}: ${!Number(value)}`);
      if (!isValidAddress(key) || !Number(value)) {
        val.push(`${key}, ${value}`);
      }
    }
    if (val.length > 0) {
      console.debug("wrong", val);
      setWhiteErrorMsg(val);
      whitelistModal.onOpen();
      setWhitelistValidation(false);
      return;
    }

    const json = _.map(paris, (value, key) => {
      return { address: key, availableAmount: value };
    });
    formik.setFieldValue("whiteList", json);
    formik.setFieldTouched("whiteList", false);
    setWhitelistValidation(true);
    alert("Validation is complete.");
  };

  const handlerWhitelistOnClick = useCallback(
    (e: any) => {
      const state = e.target.checked;
      if (isEditMode && !state) {
        confirm(
          "Whitelist cannot be re registered once canceled.\nWould you like to cancel anyway?"
        ).then((res) => {
          if (res) setWhiteList(false);
        });
      } else {
        setWhiteList(state);
      }
    },
    [confirm, isEditMode]
  );

  return (
    <React.Fragment>
      {/*<History />*/}
      {collectionId && loading ? (
        <Loading />
      ) : (
        <Container variant="onlym">
          <Heading as="h2" variant="tit" w={["200px", "200px", "200px", "auto"]}>
            {saveData ? "Edit Collection" : "Create a Collection"}
          </Heading>

          <Text mt="10px" fontFamily="Inter" fontWeight="400" fontSize="12px" color="White">
            <Box as="span" mr={1} color="Point_Red">
              *
            </Box>
            <Box as="span" color="White">
              Required fields
            </Box>
          </Text>
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing="25px" mt="6px">
              <FormControl isInvalid={!!formik.errors.logoFile && !!formik.touched.logoFile}>
                <Heading variant="sectit">
                  Logo image
                  <Asterisk />
                </Heading>
                <Text variant="txt174">
                  This image will also be used for navigation. 350 x 350 recommended.
                </Text>
                <ImageDropZone
                  shape={Shape.CIRCLE}
                  width={158}
                  height={158}
                  onChange={<T extends File>(file: T) => formik.setFieldValue("logoFile", file)}
                  defaultSrc={logoSrc}
                />
                <FormErrorMessage>
                  <FormHelperText
                    fontSize={["15px", "15px", "14px"]}
                    fontWeight="400"
                    lineHeight="12px"
                    color="#ff204a"
                  >
                    <span className="material-symbols-outlined" style={{ fontWeight: "300" }}>
                      close
                    </span>
                    {formik?.errors?.logoFile as string}
                  </FormHelperText>
                </FormErrorMessage>
              </FormControl>

              <FormControl>
                <Heading variant="sectit">Featured image</Heading>
                <Text variant="txt174">
                  This image will be used for featuring your collection on the homepage, category
                  pages, or other promotional areas of BOAspace. 600 x 400 recommended.
                </Text>
                <ImageDropZone
                  width={300}
                  height={200}
                  onChange={<T extends File>(file: T) => formik.setFieldValue("featureFile", file)}
                  defaultSrc={featureSrc}
                />
              </FormControl>

              <FormControl>
                <Heading as="label" variant="sectit">
                  Banner image
                </Heading>
                <Text variant="txt174">
                  This image will appear at the top of your collection page. Avoid including too
                  much text in this banner image, as the dimensions change on different devices.
                  1400 x 350 recommended.
                </Text>
                <ImageDropZone
                  width="100%"
                  height="200"
                  onChange={<T extends File>(file: T) => formik.setFieldValue("bannerFile", file)}
                  defaultSrc={bannerSrc}
                />
              </FormControl>

              <FormControl id="name" isInvalid={!!formik.errors.name && !!formik.touched.name}>
                <Heading variant="sectit">
                  <FormLabel>
                    Name
                    <Asterisk />
                  </FormLabel>
                </Heading>
                <Input
                  id="name"
                  name="name"
                  variant="outline"
                  type="text"
                  placeholder="Example : Treasures of the space"
                  mt="10px"
                  value={formik.values.name || ""}
                  onChange={formik.handleChange}
                />
                {availableLoading ? (
                  <FormHelperText fontSize="14px">
                    <Stack
                      direction="row"
                      justify="flex-start"
                      align="center"
                      spacing="8px"
                      color="Secondary_V"
                      pl="3px"
                    >
                      <Spinner size="sm" speed="0.7s" />
                      <Text fontSize="14px">Checking available names.</Text>
                    </Stack>
                  </FormHelperText>
                ) : (
                  availableName &&
                  (isAvailable ? (
                    <FormHelperText fontSize="14px">
                      <Stack
                        direction="row"
                        justify="flex-start"
                        align="center"
                        spacing="3px"
                        color="point_Green"
                      >
                        <span className="material-symbols-outlined">circle</span>
                        <Text fontSize="14px">This name is available.</Text>
                      </Stack>
                    </FormHelperText>
                  ) : (
                    <FormHelperText fontSize="14px">
                      <Stack
                        direction="row"
                        justify="flex-start"
                        align="center"
                        spacing="3px"
                        color="Point_Red"
                      >
                        <span className="material-symbols-outlined">close</span>
                        <Text fontSize="14px">The name is already taken.</Text>
                      </Stack>
                    </FormHelperText>
                  ))
                )}

                <FormErrorMessage>
                  <Stack
                    direction="row"
                    justify="flex-start"
                    align="center"
                    spacing="3px"
                    color="Point_Red"
                  >
                    <span className="material-symbols-outlined">close</span>
                    <Text fontSize="14px">{formik.errors.name}</Text>
                  </Stack>
                </FormErrorMessage>
              </FormControl>

              {/*<FormControl id="url">*/}
              {/*  <Heading variant="sectit">*/}
              {/*    <FormLabel>URL</FormLabel>*/}
              {/*  </Heading>*/}
              {/*  <Text variant="txt174">*/}
              {/*    Customize your URL on BOSSpace. Must only contain lowercase letters, numbers, and*/}
              {/*    hyphens.*/}
              {/*  </Text>*/}
              {/*  <Input*/}
              {/*    name="customURL"*/}
              {/*    variant="outline"*/}
              {/*    type="text"*/}
              {/*    placeholder="https://www.boaspace.io/collection/treasures-of-the-space"*/}
              {/*    mt="10px"*/}
              {/*    value={formik.values.customURL}*/}
              {/*    onChange={formik.handleChange}*/}
              {/*  />*/}
              {/*</FormControl>*/}

              <FormControl id="description">
                <Heading variant="sectit">
                  <FormLabel>Description</FormLabel>
                </Heading>
                <Text variant="txt174">
                  {/*<Text as="span" color="#A796FF">
                    Markdown{" "}
                  </Text>*/}
                  {/*syntax is supported. */}0 of 1000 characters used.
                </Text>
                <Textarea
                  variant="outline"
                  mt="10px"
                  name="description"
                  maxLength={1000}
                  value={formik.values.description}
                  onChange={formik.handleChange}
                />
              </FormControl>

              <FormControl id="category">
                <Heading variant="sectit">
                  <FormLabel>Category</FormLabel>
                </Heading>
                <Text variant="txt174" mb="10px">
                  Adding a category will help make your item discoverable on BOAspace.
                </Text>
                <Menu>
                  <MenuButton
                    as={Button}
                    rightIcon={<ChevronDownIcon w="20px" h="20px" color="#929292" />}
                    variant="input"
                    color="white"
                    fontWeight="600"
                    fontSize="15px"
                  >
                    {categoryType.name}
                  </MenuButton>
                  <MenuList w="100%">
                    {Object.values(CategoryType).map((type, index) => {
                      if (index > 0) {
                        return (
                          <MenuItem
                            key={index}
                            onClick={() => {
                              setCategoryType(type);
                            }}
                          >
                            {type.name}
                          </MenuItem>
                        );
                      }
                    })}
                  </MenuList>
                </Menu>
              </FormControl>

              <FormControl isInvalid={!!formik.errors.whiteList && !!formik.touched.whiteList}>
                <Flex flexDirection="row" justifyContent="space-between" alignItems="center">
                  <Flex flexDirection="column">
                    <Heading variant="sectit">
                      <FormLabel>Whitelist</FormLabel>
                    </Heading>
                  </Flex>
                  <Switch
                    disabled={disableWhiteList}
                    size="lg"
                    colorScheme="purple"
                    isChecked={isWhiteList}
                    onChange={handlerWhitelistOnClick}
                  />
                </Flex>
                <Collapse in={isWhiteList} animateOpacity>
                  <>
                    {createAt && (
                      <WhiteText variant="txt174">
                        - Estimated whitelist auto-termination date :{" "}
                        {format(addDays(createAt, 60), "yyyy.MM.dd")}
                      </WhiteText>
                    )}
                    <WhiteText variant="txt174">
                      - According to BOASpace policy, The whitelist can be sold to the general
                      public 60 days after registration.
                    </WhiteText>
                    <WhiteText variant="txt174">
                      - To register multiple wallet addresses Use comma(,) to separate them.
                    </WhiteText>
                    {isEditMode && (
                      <>
                        <WhiteText variant="txt174">- You can add a new address.</WhiteText>
                        <WhiteText variant="txt174">
                          - Once registered, addresses cannot be deleted. You can change only the
                          number of available purchases. If you want to delete it, change the number
                          of purchases to zero.
                        </WhiteText>
                      </>
                    )}
                    <Textarea
                      variant="outline"
                      mt="10px"
                      name="description"
                      value={whiteListValue}
                      h={300}
                      onChange={(e) => {
                        setWhitelistValidation(false);
                        setWhiteListValue(e.target.value);
                      }}
                      placeholder={whitelistEx}
                      style={{ letterSpacing: "-0.1px" }}
                    />
                    <Button
                      w="100%"
                      type="button"
                      mt={3}
                      variant="outlineBlue"
                      onClick={handlerValidateWhiteList}
                      leftIcon={isWhitelistValidation && <CheckIcon color="#00A5BC" />}
                    >
                      Validate
                    </Button>
                    <FormErrorMessage>
                      <Stack
                        direction="row"
                        justify="flex-start"
                        align="center"
                        spacing="3px"
                        color="Point_Red"
                      >
                        <span className="material-symbols-outlined">close</span>
                        <Text fontSize="14px">{formik.errors.whiteList}</Text>
                      </Stack>
                    </FormErrorMessage>
                  </>
                </Collapse>
              </FormControl>

              <FormControl id="links">
                <Heading variant="sectit">
                  <FormLabel>Links</FormLabel>
                </Heading>
                <LinkVStack mt="10px" align="stretch" maxWidth="100%" spacing={0}>
                  <InputGroup>
                    <InputLeftElement width="auto" pointerEvents="none">
                      <Img src="/images/icon/sns_language.svg" alt="" ml="17px" mr="12px" />
                    </InputLeftElement>
                    <Input
                      name="webLink"
                      type="text"
                      placeholder="yoursite.io"
                      value={formik.values.webLink || ""}
                      onChange={formik.handleChange}
                    />
                  </InputGroup>

                  <InputGroup>
                    <InputLeftElement width="auto" pointerEvents="none">
                      <Img
                        src="/images/icon/sns_circle_medium.svg"
                        alt="discord"
                        ml="17px"
                        mr="12px"
                      />
                      https://www.medium.com/
                    </InputLeftElement>
                    <Input
                      name="mediumLink"
                      pl="236px"
                      type="text"
                      placeholder="@YourMediumHandle"
                      value={formik.values.mediumLink || ""}
                      onChange={formik.handleChange}
                    />
                  </InputGroup>

                  <InputGroup>
                    <InputLeftElement width="auto" pointerEvents="none">
                      <Img
                        src="/images/icon/sns_circle_telegram.svg"
                        alt="telegram"
                        ml="17px"
                        mr="12px"
                      />
                      https://t.me/
                    </InputLeftElement>
                    <Input
                      name="telegramLink"
                      pl="136px"
                      type="text"
                      placeholder="@YourTelegramHandle"
                      value={formik.values.telegramLink || ""}
                      onChange={formik.handleChange}
                    />
                  </InputGroup>
                </LinkVStack>
              </FormControl>

              <FormControl
                id="fees"
                isInvalid={!!formik.errors.feeCollectors && !!formik.touched.feeCollectors}
              >
                <Heading variant="sectit">
                  <FormLabel>Creator fees</FormLabel>
                </Heading>
                <Text variant="txt174">
                  Collection owners can collect a fee when a user re-sells an item they created.
                  Contact the collection owner to change the fee percentage or the payout address.
                </Text>
                {createFees.map((item) => {
                  return (
                    <CreateFeeItem
                      key={item.key}
                      item={item}
                      onUpdate={handlerFeeUpdate}
                      onDelete={handlerFeeDelete}
                    />
                  );
                })}
                <FormErrorMessage>
                  <FormHelperText
                    fontSize={["15px", "15px", "14px"]}
                    fontWeight="400"
                    lineHeight="12px"
                    color="#ff204a"
                  >
                    <span className="material-symbols-outlined" style={{ fontWeight: "300" }}>
                      close
                    </span>
                    {formik?.errors?.feeCollectors as string}
                  </FormHelperText>
                </FormErrorMessage>
                <Button
                  mt="15px"
                  variant="outlineBlue"
                  onClick={() => {
                    setCreateFees([...createFees, { address: "", fee: NaN, key: getMaxKey() }]);
                  }}
                >
                  Add address
                </Button>
              </FormControl>

              <Divider mb="40px" />
              <Button type="submit" variant="primary" isDisabled={!isAvailable}>
                {saveData ? "Save" : "Create"}
              </Button>
            </Stack>
          </form>
          <WaitingModal isOpen={waitingModal.isOpen} onClose={waitingModal.onClose} />
          <WhitelistValidAlert
            isOpen={whitelistModal.isOpen}
            onClose={whitelistModal.onClose}
            list={whiteErrorMsg}
          />
        </Container>
      )}
    </React.Fragment>
  );
}
interface CreateFeeItemProps {
  onDelete: any;
  onUpdate: any;
  item: FeeValues;
}

function CreateFeeItem({ onDelete, onUpdate, item }: CreateFeeItemProps) {
  return (
    <HStack spacing="10px" mt="10px">
      <Input
        variant="outline"
        type="text"
        placeholder="Please enter an address, e.g. 0x1ed3... or destin..."
        w="70%"
        name="address"
        value={item?.address ? item.address : ""}
        onChange={(e) => {
          onUpdate({ ...item, address: e.target.value });
        }}
      />
      <Box pos="relative" w="20%">
        <Input
          name="fee"
          variant="outline"
          type="number"
          placeholder="0"
          pr="35px"
          value={item?.fee ? item.fee : ""}
          onChange={(e) => {
            const cleanValue = e.target.value.replace(/[^\d.]/g, "");
            if (Number(cleanValue) > 5) {
              onUpdate({ ...item, fee: 5 });
            } else {
              onUpdate({ ...item, fee: Number(parseFloat(cleanValue).toFixed(2)) });
            }
          }}
        />
        <Text pos="absolute" top="14px" right="15px" fontSize="15px">
          %
        </Text>
      </Box>
      <Button variant="ghost" w="10%" p="0" m="0 !important" onClick={() => onDelete(item.key)}>
        <span className="material-symbols-outlined">delete</span>
        <VisuallyHidden>Delete</VisuallyHidden>
      </Button>
    </HStack>
  );
}
const LinkVStack = styled(VStack)`
  div {
    input {
      border-radius: 0;
    }
  }
  div:first-child {
    input {
      border-radius: 8px 8px 0 0;
      border-bottom-color: #2c273f;
    }
  }
  div:last-child {
    input {
      border-radius: 0 0 8px 8px;
      border-top-color: #2c273f;
    }
  }
`;

const WhiteText = styled(Text)`
  padding-left: 14px;
  text-indent: -14px;
  color: #ff204a !important;
`;
