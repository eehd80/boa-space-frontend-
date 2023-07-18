import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Image,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Stack,
  Text,
  Textarea,
  useDisclosure,
  VisuallyHidden,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import PropertiesItem from "../../components/assets/PropertiesItem";
import TooltipInfo from "../../components/Tooltip";
import LevelsItemBorder from "../../components/assets/LevelsItemBorder";
import StatsItemBorder from "../../components/assets/StatsItemBorder";
import { FormikErrors, useFormik } from "formik";
import { AddressZero } from "@ethersproject/constants/src.ts/addresses";
import { GetUserAssetsQueryGQL } from "../../hooks/query/useGetUserAssetsQuery";
import { useEthers } from "@usedapp/core";
import { useCreateAssetMutation } from "../../hooks/mutation/createAssetMutation";
import { AssetProperties } from "../../components/Modals/AssetProperites";
import { AssetLevels } from "../../components/Modals/AssetLevels";
import { AssetStats } from "../../components/Modals/AssetStats";
import { AssetSupply } from "../../components/Modals/AssetSupply";
import ImageDropZone from "../../components/DragBox/ImageDropZone";
import { WaitingModal } from "../../components/Modals/Waitting";
import { AssetCreatedSuccess } from "../../components/Modals/AssetCreatedSuccess";
import {
  GetUserAssetCollectionsQueryGQL,
  useGetUserAssetCollections,
} from "../../hooks/query/useGetUserAssetCollections";
import { useNavigate, useParams } from "react-router-dom";
import { useGetAssetDetailSimpleQuery } from "../../hooks/query/useGetAssetDetailQuery";
import { useActiveState } from "../../hooks/useActiveState";
import { useUpdateAssetMutation } from "../../hooks/mutation/updateAssetMutation";
import { ActivityType } from "../../type";

interface FormValues {
  name: string;
  imageFile: File;
  description: string;
  totalSupply: number;
  address: string;
  contract: string;
  externalLink: string;
  assetCollectionId: string;
  properties: AssetOption[];
  levels: AssetOption[];
  stats: AssetOption[];
}

export type CreateAssetResult = {
  id: string;
  name: string;
  originalUrl: string;
  assetContractAddress: string;
  tokenId: string;
};

export type AssetOption = {
  key: number;
  type?: string;
  name?: string;
  numerator?: number;
  denominator?: number;
};

export default function CreateAsset() {
  const propertiesModal = useDisclosure();
  const LevelsModal = useDisclosure();
  const StatsModal = useDisclosure();
  const SupplyModal = useDisclosure();
  const waitingModal = useDisclosure();
  const SuccessModal = useDisclosure();
  const navigate = useNavigate();
  const { account } = useEthers();
  const { contract, tokenId } = useParams();
  const [isEditMode, setEditMode] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string>(undefined);

  const [attributeProperties, setAttributeProperties] = useState<AssetOption[]>([]);
  const [attributeLevels, setAttributeLevels] = useState<AssetOption[]>([]);
  const [attributeStats, setAttributeStats] = useState<AssetOption[]>([]);

  const { updateAssetMutation } = useUpdateAssetMutation();
  const { createAssetMutation } = useCreateAssetMutation();
  const [createAssetResult, setCreateAssetResult] = useState<CreateAssetResult>();
  const { collections } = useGetUserAssetCollections();
  const { online } = useActiveState();
  const { getAssetDetailSimple, data } = useGetAssetDetailSimpleQuery();
  const saveData = useMemo(() => {
    if (
      data?.GetAssetDetail?.activities?.length === 1 &&
      data?.GetAssetDetail?.activities[0].activityType === ActivityType.MINTED
    ) {
      return data.GetAssetDetail;
    } else {
      // TODO : This asset cannot be modified.
      navigate("/my/collected");
    }
  }, [data, navigate]);

  useEffect(() => {
    if (online && contract && tokenId && account) {
      getAssetDetailSimple({ variables: { assetContractAddress: contract, tokenId } });
    }
  }, [contract, tokenId, account, online, getAssetDetailSimple]);

  const [currentCollection, setCurrentCollection] = useState<{
    name: string;
    id: string;
    logoUrl: string;
  }>();

  useEffect(() => {
    if (collections && !currentCollection && collections.length) {
      setCurrentCollection(collections[0]);
    }
  }, [collections, currentCollection]);

  useEffect(() => {
    if (createAssetResult && !SuccessModal.isOpen) {
      navigate(`/assets/${createAssetResult?.assetContractAddress}/${createAssetResult?.tokenId}`);
    }
  }, [navigate, createAssetResult, SuccessModal.isOpen]);

  const formik = useFormik({
    initialValues: {
      name: "",
      imageFile: undefined,
      description: "",
      totalSupply: 1,
      address: account,
      contract: AddressZero,
      externalLink: "",
      assetCollectionId: undefined,
      properties: [],
      levels: [],
      stats: [],
    },
    onSubmit: (values: FormValues) => {
      let params: any = {
        ...values,
        address: account,
        attribute: JSON.stringify({
          properties: attributeProperties,
          levels: attributeLevels,
          stats: attributeStats,
        }),
        assetCollectionId: currentCollection?.id ?? undefined,
      };
      if (saveData) {
        params = { ...params, assetId: saveData.id };
      }
      waitingModal.onOpen();

      const input = {
        variables: params,
        onCompleted(data: any) {
          console.debug("createAssetMutation >:", data);
          waitingModal.onClose();
          SuccessModal.onOpen();
          setCreateAssetResult(saveData ? data.updateAsset : data.createAsset);
        },
        onError(err: any) {
          console.debug("createAssetMutation > error:", err);
          waitingModal.onClose();
        },
        refetchQueries: [
          // mutation 완료 후 재요청할 쿼리 목록
          { query: GetUserAssetsQueryGQL, variables: { userAddress: account } },
          { query: GetUserAssetCollectionsQueryGQL, variables: { userAddress: account } },
        ],
      };

      if (saveData) {
        updateAssetMutation(input);
      } else {
        createAssetMutation(input);
      }
    },
    validateOnBlur: true,
    validateOnChange: true,
    // Add a custom validation function (this can be async too!)
    validate: (values: FormValues) => {
      let errors: FormikErrors<FormValues> = {};
      errors = {};
      if (!values.imageFile && !saveData) {
        errors.imageFile = "Please select the image required.";
      } else if (!values.name) {
        errors.name = "This name is available.";
      } else if (!values.totalSupply) {
        errors.totalSupply = "Please enter the supply required.";
      } else if (values.totalSupply === 0) {
        errors.totalSupply = "Enter a number greater than zero supply.";
      }
      return errors;
    },
  });

  useEffect(() => {
    if (!isEditMode && saveData && formik && collections) {
      setEditMode(true);
      const { properties, levels, stats } = JSON.parse(saveData.attribute);
      formik.resetForm({
        values: {
          name: saveData.name,
          imageFile: undefined,
          description: saveData.description,
          totalSupply: saveData.totalSupply,
          address: account,
          contract: saveData.assetContractAddress,
          externalLink: saveData.externalLink,
          assetCollectionId: undefined,
          properties: properties,
          levels: levels,
          stats: stats,
        },
      });
      setAttributeProperties(properties || []);
      setAttributeLevels(levels || []);
      setAttributeStats(stats || []);
      setCurrentCollection(saveData.assetCollection);
      setImageSrc(saveData.originalUrl);
    }
  }, [saveData, formik, isEditMode, account, collections]);

  return (
    <>
      <React.Fragment>
        <Container variant="onlym">
          <Heading as="h2" variant="tit">
            {saveData ? "Edit Item" : "Create New Item"}
          </Heading>

          <Text mt="26px" fontFamily="Inter" fontWeight="400" fontSize="12px" color="White">
            <Box as="span" mr={1} color="Point_Red">
              *
            </Box>
            <Box as="span" color="White">
              Required fields
            </Box>
          </Text>
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing="30px" mt="9px">
              {/* Image */}
              <FormControl isInvalid={!!formik.errors.imageFile && !!formik.touched.imageFile}>
                <Heading variant="sectit">
                  <FormLabel>
                    Image
                    <Box as="span" color="Point_Red">
                      *
                    </Box>
                  </FormLabel>
                </Heading>
                <Text variant="txt124">
                  File types supported: JPG, PNG, GIF, SVG, WEBM (Max size: 10 MB)
                </Text>
                <Box>
                  <ImageDropZone
                    defaultSrc={imageSrc}
                    onChange={<T extends File>(file: T) => formik.setFieldValue("imageFile", file)}
                  />
                </Box>
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
                    {formik?.errors?.imageFile as string}
                  </FormHelperText>
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!formik.errors.name && !!formik.touched.name}>
                <Heading as="label" variant="sectit">
                  <FormLabel htmlFor="name">
                    Name
                    <Box as="span" color="Point_Red">
                      *
                    </Box>
                  </FormLabel>
                </Heading>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  variant="outline"
                  placeholder="Item name"
                  mt="10px"
                  onChange={formik.handleChange}
                  value={formik.values.name || ""}
                  isDisabled={!!saveData}
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
                {/*<FormErrorMessage>
                  <FormHelperText fontSize="14px">
                    <Stack
                      direction="row"
                      justify="flex-start"
                      align="center"
                      spacing="3px"
                      color="point_Green"
                    >
                      <span className="material-symbols-outlined" style={{ fontWeight: "300" }}>
                        circle
                      </span>
                      <Text fontSize="14px">{formik.errors.name}</Text>
                    </Stack>
                  </FormHelperText>
                </FormErrorMessage>*/}
                {/*
                {!isError ? (
                ) : (
                  // error
                  <FormErrorMessage fontSize="14px">
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
                      <Text fontSize="14px">The name is already taken.</Text>
                    </Stack>
                  </FormErrorMessage>
                )}*/}
                {/* 유효성 메시지 */}
                {/*<Box mt="10px">
                  <Stack
                    direction="row"
                    justify="flex-start"
                    align="center"
                    spacing="3px"
                    color="point_Green"
                  >
                    <span className="material-symbols-outlined" style={{ fontWeight: "300" }}>
                      circle
                    </span>
                    <Text fontSize="14px">This name is available.</Text>
                  </Stack>
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
                    <Text fontSize="14px">Name contains forbidden characters.</Text>
                  </Stack>
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
                    <Text fontSize="14px">The name is already taken.</Text>
                  </Stack>
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
                    <Text fontSize="14px">Required field.</Text>
                  </Stack>
                </Box>*/}
              </FormControl>

              <FormControl id="link">
                <Heading variant="sectit">
                  <FormLabel>External link</FormLabel>
                </Heading>
                <Text variant="txt124">
                  BOAspace will include a link to this URL on this item&apos;s detail page, so that
                  users can click to learn more about it. You are welcome to link to your own
                  webpage with more details.
                </Text>
                <Input
                  name="externalLink"
                  variant="outline"
                  type="text"
                  placeholder="https://yoursite.io/item/123"
                  mt="10px"
                  value={formik.values.externalLink || ""}
                  onChange={formik.handleChange}
                />
              </FormControl>

              <FormControl id="description">
                <Heading variant="sectit">
                  <FormLabel>Description</FormLabel>
                </Heading>
                <Text variant="txt124">
                  The description will be included on the item&apos;s detail page underneath its
                  image.{" "}
                  {/*<Text as="span" color="#A796FF">
                    Markdown
                  </Text>{" "}
                  syntax is supported.*/}
                </Text>
                <Textarea
                  name="description"
                  variant="outline"
                  mt="10px"
                  placeholder="Provide a detailed description of your item."
                  onChange={formik.handleChange}
                  value={formik.values.description || ""}
                />
              </FormControl>

              {/* Collection */}
              {/* TODO: Need to collection select logic */}
              <FormControl id="collection">
                <Heading variant="sectit">
                  <FormLabel>Collection</FormLabel>
                </Heading>
                <Stack
                  direction="row"
                  justify="flex-start"
                  alignItems="center"
                  spacing="3px"
                  mb="10px"
                >
                  <Text variant="txt124">This is the collection where your item will appear.</Text>
                  <TooltipInfo />
                </Stack>
                <Menu>
                  <MenuButton
                    as={Button}
                    rightIcon={<ChevronDownIcon w="20px" h="20px" color="#929292" />}
                    variant="input"
                    color="white"
                    fontWeight="600"
                    fontSize="15px"
                  >
                    <Image
                      display="inline-block"
                      verticalAlign="middle"
                      boxSize="30px"
                      borderRadius="full"
                      src={currentCollection?.logoUrl ?? "/images/icon/close.svg"}
                      alt="Simon the pensive"
                      mr="12px"
                      mt="-2px"
                    />
                    {currentCollection && currentCollection.name}
                  </MenuButton>
                  <MenuList w="100%">
                    {collections &&
                      collections?.map((item: any) => {
                        return (
                          <MenuItem key={item.id} onClick={() => setCurrentCollection(item)}>
                            <Image
                              boxSize="30px"
                              borderRadius="full"
                              src={item.logoUrl}
                              alt={item.name}
                              mr="12px"
                            />{" "}
                            {item.name}
                          </MenuItem>
                        );
                      })}
                  </MenuList>
                </Menu>
              </FormControl>

              <Divider />

              <Stack spacing="23px" mt="23px">
                {/* Properties */}
                <FormControl>
                  <Box>
                    <Flex>
                      <Box>
                        <Heading variant="sectit">
                          <span className="material-symbols-outlined">format_list_bulleted</span>{" "}
                          Properties
                        </Heading>
                        <Text variant="txt164" mb="10px" pl="39px" pr="10px">
                          Textual traits that show up as rectangles
                        </Text>
                      </Box>
                      <Spacer />
                      <Button variant="plus" onClick={propertiesModal.onOpen}>
                        <VisuallyHidden>select</VisuallyHidden>
                        <span className="material-symbols-outlined" color="white">
                          add
                        </span>
                      </Button>
                    </Flex>
                    <Wrap spacing="10px" mt="22px">
                      {attributeProperties?.map((item, index) => {
                        return (
                          <WrapItem key={index}>
                            <PropertiesItem property={item} />
                          </WrapItem>
                        );
                      })}
                    </Wrap>
                  </Box>
                  <AssetProperties
                    option={attributeProperties}
                    isOpen={propertiesModal.isOpen}
                    onClose={propertiesModal.onClose}
                    onChange={(values: AssetOption[]) => setAttributeProperties(values)}
                  />
                </FormControl>
                <Divider />

                {/* Levels */}
                <FormControl>
                  <Box>
                    <Flex>
                      <Box>
                        <Heading variant="sectit">
                          <span className="material-symbols-outlined fill"> grade</span>
                          Levels
                        </Heading>
                        <Text variant="txt164" mb="10px" pl="39px" pr="10px">
                          Numerical traits that show as a progress bar
                        </Text>
                      </Box>
                      <Spacer />
                      <Button variant="plus" onClick={LevelsModal.onOpen}>
                        <VisuallyHidden>select</VisuallyHidden>
                        <span className="material-symbols-outlined" color="white">
                          add
                        </span>
                      </Button>
                    </Flex>
                    <VStack align="flex-start" mt="11px" spacing="10px">
                      {attributeLevels?.map((item, index) => {
                        return <LevelsItemBorder key={index} item={item} />;
                      })}
                    </VStack>
                  </Box>
                  <AssetLevels
                    isOpen={LevelsModal.isOpen}
                    onClose={LevelsModal.onClose}
                    option={attributeLevels}
                    onChange={(values: AssetOption[]) => setAttributeLevels(values)}
                  />
                </FormControl>
                <Divider />

                {/* Stats */}
                <FormControl>
                  <Box>
                    <Flex>
                      <Box>
                        <Heading variant="sectit">
                          <span
                            className="material-symbols-outlined"
                            style={{ marginRight: "15px" }}
                          >
                            equalizer
                          </span>
                          Stats
                        </Heading>
                        <Text variant="txt164" mb="10px" pl="39px" pr="10px">
                          Numerical traits that just show as numbers
                        </Text>
                      </Box>
                      <Spacer />
                      <Button variant="plus" onClick={StatsModal.onOpen}>
                        <VisuallyHidden>select</VisuallyHidden>
                        <span className="material-symbols-outlined" color="white">
                          add
                        </span>
                      </Button>
                    </Flex>
                    <VStack align="flex-start" mt="11px" spacing="10px">
                      {attributeStats?.map((item, index) => {
                        return <StatsItemBorder key={index} item={item} />;
                      })}
                    </VStack>
                  </Box>
                  <AssetStats
                    isOpen={StatsModal.isOpen}
                    onClose={StatsModal.onClose}
                    option={attributeStats}
                    onChange={(values: AssetOption[]) => setAttributeStats(values)}
                  />
                </FormControl>
              </Stack>
              <Divider />

              <FormControl>
                <Heading variant="sectit">
                  <FormLabel htmlFor="totalSupply">
                    Supply
                    <Box as="span" color="Point_Red">
                      *
                    </Box>
                  </FormLabel>
                </Heading>
                <Stack
                  direction="row"
                  justify="flex-start"
                  alignItems="center"
                  spacing="3px"
                  mb="10px"
                >
                  <Text variant="txt124">
                    The number of items that can be minted. No gas cost to you!
                  </Text>
                  <TooltipInfo onClick={SupplyModal.onOpen} />
                </Stack>
                <Input
                  id="totalSupply"
                  name="totalSupply"
                  variant="outline"
                  type="number"
                  w="100%"
                  onChange={formik.handleChange}
                  value={formik.values.totalSupply}
                  isDisabled={!!saveData}
                />
              </FormControl>

              <Divider mb="40px" />
              <Button type="submit" variant="primary" mt="50px !important">
                {saveData ? "Submit changes" : "Create"}
              </Button>
            </Stack>

            <AssetSupply isOpen={SupplyModal.isOpen} onClose={SupplyModal.onClose} />
          </form>
          <WaitingModal isOpen={waitingModal.isOpen} onClose={waitingModal.onClose} />
          <AssetCreatedSuccess
            isOpen={SuccessModal.isOpen}
            onClose={SuccessModal.onClose}
            assetResult={createAssetResult}
          />
        </Container>
      </React.Fragment>
    </>
  );
}
