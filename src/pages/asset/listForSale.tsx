import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Hide,
  HStack,
  Input,
  Select,
  Spacer,
  Stack,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import ThumbRatio from "../../components/ThumbRatio";
import {
  GetAssetDetailQueryGQL,
  useGetAssetDetailQuery,
} from "../../hooks/query/useGetAssetDetailQuery";
import { useNavigate, useParams } from "react-router-dom";
import { FormikErrors, useFormik } from "formik";
import { ItemType } from "boa-space-seaport-js/lib/constants";
import { formatEther, parseEther } from "ethers/lib/utils";
import { CreateOrderResult, useCreateOrderCallback } from "../../hooks/useSeaportCallback";
import { ORDER_TYPE } from "../../constants";
import { ApolloError } from "@apollo/client";
import { useEthers } from "@usedapp/core";
import { useCreateOrderMutation } from "../../hooks/mutation/createOrderMutation";
import DatePicker from "../../components/DatePicker/DatePicker";
import { CompleteListing } from "../../components/Modals/CompleteListing";
import { InfoIcon } from "@chakra-ui/icons";
import { LAZY_MINT_ADAPTER } from "../../hooks/useSeaport";
import { CreateOrderInput } from "boa-space-seaport-js/lib/types";
import { ActivityType, OrderStatus } from "../../type";
import { numberFormat } from "../../utils/Format";
import { getBOAUSDPrice, useBOAPrice } from "../../features/price/boaPriceSlice";
import _ from "lodash";
import { useGetFeeInfo } from "../../hooks/query/useGetFeeInfo";

interface FormValues {
  address: string;
  tokenId: string;
  quantity: number;
  amount: string;
  startTime: number;
  endTime: number;
}

export default function ListForSale() {
  // modal
  const CompleteListingModal = useDisclosure();
  const [isSuccess, setSuccess] = useState(false);
  const { account } = useEthers();
  const { contract, tokenId } = useParams();
  const navigate = useNavigate();
  const usd = useBOAPrice();
  const [available, setAvailable] = useState(0);
  const [retryVisible, setRetryVisible] = useState(false);
  const defaultFee = useGetFeeInfo();
  const { execute: listingCall } = useCreateOrderCallback();
  const { createOrderMutation } = useCreateOrderMutation();
  const { data: assetDetailData } = useGetAssetDetailQuery(contract, tokenId);
  const [isError, setError] = useState(false);
  const { asset, assetCollection, owners, activities, assetContract } = useMemo(() => {
    console.debug("assetDetail", assetDetailData);
    if (assetDetailData && assetDetailData?.GetAssetDetail) {
      return {
        asset: assetDetailData.GetAssetDetail,
        assetCollection: assetDetailData.GetAssetDetail.assetCollection,
        assetContract: assetDetailData.GetAssetDetail.assetContract,
        owners: assetDetailData.GetAssetDetail.owners,
        activities: assetDetailData.GetAssetDetail.activities,
      };
    }
    return {};
  }, [assetDetailData]);

  const { createFeeList, totalCreateFee } = useMemo(() => {
    if (assetCollection?.feeCollectors?.length) {
      const createFeeList = assetCollection.feeCollectors.map((item: any) => {
        return { fee: item.fee, address: item.user.userAddress };
      });
      const totalCreateFee =
        createFeeList?.reduce((total: number, item: any) => {
          return total + item.fee;
        }, 0) ?? 0;
      return { createFeeList, totalCreateFee };
    }
    return { totalCreateFee: 0 };
  }, [assetCollection]);

  useEffect(() => {
    if (owners?.length && account) {
      const total = owners
        .filter((item: any) => item.user.userAddress === account)
        .reduce((total: number, item: any) => {
          return total + item.amount;
        }, 0);
      const listingCount = activities
        ?.filter(
          (item: any) =>
            item.activityType === ActivityType.LIST &&
            item.order.status === OrderStatus.SALE &&
            item.order.offerer.userAddress === account
        )
        ?.reduce((total: number, item: any) => {
          return total + (item.order.amount - item.order.sold);
        }, 0);
      setAvailable(total - listingCount);
    }
  }, [owners, account, activities]);

  const formik = useFormik({
    initialValues: {
      address: account,
      tokenId: asset?.tokenId ?? "",
      quantity: 1,
      amount: "",
      startTime: 0,
      endTime: 0,
    },
    onSubmit: (values: FormValues) => {
      const param = { ...values, tokenId: asset.tokenId, address: account };
      CompleteListingModal.onOpen();

      let fees = [];
      if (defaultFee?.percent && Number(defaultFee.percent) > 0)
        fees.push({ recipient: defaultFee.manager, basisPoints: defaultFee.percent * 100 });
      if (createFeeList?.length) {
        const cf = createFeeList.map((item: any) => {
          return { recipient: item.address, basisPoints: item.fee * 100 };
        });
        fees = [...fees, ...cf];
      }

      const orderInput: CreateOrderInput =
        assetContract.itemType === "ERC721"
          ? {
              startTime: Math.floor(param.startTime / 1000).toString(), // 거래 시작 시간
              endTime: Math.floor(param.endTime / 1000).toString(), // 거래 종료 시간
              offer: [
                {
                  itemType: ItemType.ERC721, // 아이템 타입
                  token: asset.assetContractAddress, // 아이템 컨트랙트 주소
                  identifier: asset.tokenId.toString(), // 아이템 토큰 아이디
                },
              ],
              consideration: [
                {
                  amount: parseEther(param.amount.toString()).toString(), // Native Token(BOA) 개수
                  recipient: account, // Native Token을 받을 대상
                },
              ],
              fees,
            }
          : {
              allowPartialFills: true, // 부분 거래 허용 여부
              startTime: Math.floor(param.startTime / 1000).toString(), // 거래 시작 시간
              endTime: Math.floor(param.endTime / 1000).toString(), // 거래 종료 시간
              offer: [
                {
                  itemType: ItemType.ERC1155, // 아이템 타입
                  token: LAZY_MINT_ADAPTER, // 아이템 컨트랙트 주소
                  amount: param.quantity.toString(), // 아이템 개수
                  identifier: asset.tokenId.toString(), // 아이템 토큰 아이디
                },
              ],
              consideration: [
                {
                  amount: parseEther(listingPrice.toString()).toString(), // Native Token(BOA) 개수
                  recipient: account, // Native Token을 받을 대상
                },
              ],
              fees,
            };

      listingCall(orderInput)
        .then(({ order, orderHash }: CreateOrderResult) => {
          // setOrderData(order);
          console.debug("OrderData", order);
          createOrderMutation({
            variables: {
              originalData: JSON.stringify(order),
              assetId: asset.id,
              orderHash,
              offerType: ORDER_TYPE.LISTING,
            },
            onCompleted(data: any) {
              console.debug("createOrderMutation >:", data);
              setRetryVisible(false);
              setSuccess(true);
            },
            onError(err: ApolloError) {
              console.debug("createOrderMutation > error:", err);
            },
            refetchQueries: [
              {
                query: GetAssetDetailQueryGQL,
                variables: { assetContractAddress: contract, tokenId },
              },
            ],
          });
        })
        .catch((reason: any) => {
          console.debug("ListingCall Error : ", reason);
          setRetryVisible(true);
        });
    },
    validate: (values: FormValues) => {
      let errors: FormikErrors<FormValues> = {};
      errors = {};
      if (!values.quantity) {
        errors.quantity = "Please enter the quantity required.";
      } else if (values.quantity > available) {
        errors.quantity = `The quantity cannot exceed ${available}`;
      } else if (!values.amount || !_.isNumber(values.amount)) {
        errors.amount = "Please enter the valid amount.";
      } else if (Number(values.amount) <= 0) {
        errors.amount = "The amount cannot have precision greater than 18 decimal places.";
      } else if (!values.startTime || !values.endTime) {
        errors.startTime = "Please select the duration required.";
      }
      return errors;
    },
  });

  const [totalEarnAmount, setTotalEarnAmount] = useState("");
  const [listingPrice, setListingPrice] = useState(0);
  const [listingPriceBOA, setListingPriceBOA] = useState("");

  useEffect(() => {
    if (Number(formik.values.quantity) && Number(formik.values.amount)) {
      try {
        const sum = Number(formik.values.quantity) * Number(formik.values.amount);
        setListingPrice(sum);
        setListingPriceBOA(`${formatEther(parseEther(sum.toString()))} BOA`);
        const totalFee = totalCreateFee + Number(defaultFee.percent);
        const earn = sum * (1 - totalFee / 100);
        setTotalEarnAmount(earn.toString());
        setError(false);
      } catch (e) {
        setError(true);
      }
    }
  }, [
    formik.values.quantity,
    formik.values.amount,
    setTotalEarnAmount,
    setListingPrice,
    totalCreateFee,
    defaultFee,
  ]);

  const handlerRetry = () => {
    setRetryVisible(false);
    formik.handleSubmit();
  };

  return (
    <React.Fragment>
      <Stack
        maxW={["825px", "825px", "825px", "825px", "825px", "980px"]}
        direction={["column", "column", "column", "column", "row-reverse"]}
        justify="space-between"
        m="0 auto"
        pt={["0", "0", "0", "0", "30px"]}
      >
        <Box w={["100%", "100%", "100%", "100%", "380px"]}>
          <Stack
            overflow="hidden"
            direction={["row", "row", "row", "row", "column"]}
            m={["0 -4%", "0 -4%", "0 -4%", "0 -4%", "0"]}
            py={["18px", "18px", "18px", "18px", "0"]}
            px={["4%", "4%", "4%", "4%", "0"]}
            bg="popup_B01"
            borderRadius={[0, 0, 0, 0, "10px"]}
            spacing="15px"
          >
            <Box
              overflow="hidden"
              width={["70px", "70px", "70px", "70px", "100%"]}
              h={["70px", "70px", "70px", "70px", "auto"]}
              bg="#8F8DB1"
              borderRadius={["8px", "8px", "8px", "8px", "0"]}
            >
              <ThumbRatio src={asset?.originalUrl} />
            </Box>
            <Stack justify="center" spacing="0" p={[0, 0, 0, 0, "0 20px 24px"]}>
              <Text variant="txt176" mt="0">
                {asset?.name}
              </Text>
              <Text variant="txt165" color="text_Gray02">
                {assetCollection?.name}
              </Text>
              <Hide below="md">
                <Text variant="txt206" mt="17px">
                  {formik?.values?.amount
                    ? `${formatEther(parseEther(formik.values.amount.toString()))} BOA`
                    : "-- BOA"}
                </Text>
              </Hide>
            </Stack>
          </Stack>
        </Box>
        <Box
          w={["100%", "100%", "100%", "100%", "405px", "524px"]}
          pt={["53px", "53px", "53px", "53px", "0"]}
        >
          <Heading as="h2" variant="tit32" mt="0">
            <Button
              transform="rotate(90deg)"
              color="text_Gray01"
              w="44px"
              h="44px"
              p="0"
              mr="10px"
              ml="-15px"
              onClick={() => navigate(`/assets/${contract}/${tokenId}`)}
            >
              <span className="material-symbols-outlined" style={{ fontSize: "25px" }}>
                expand_more
              </span>
            </Button>
            List for sale
          </Heading>
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing="30px" mt="36px">
              <FormControl id="quantity">
                <Heading variant="subtit22">
                  <FormLabel>Quantity</FormLabel>
                </Heading>
                <Input
                  name="quantity"
                  type="number"
                  variant="outline"
                  placeholder="1"
                  onChange={formik.handleChange}
                  defaultValue={"1"}
                  isDisabled={assetContract?.itemType === "ERC721"}
                />
                {(formik.touched.quantity && formik.errors.quantity && (
                  <FormHelperText
                    mt={"16px"}
                    fontSize={["15px", "15px", "14px"]}
                    fontWeight="400"
                    lineHeight="12px"
                    color="#ff204a"
                  >
                    <span className="material-symbols-outlined" style={{ fontWeight: "300" }}>
                      close
                    </span>
                    {formik.errors.quantity}
                  </FormHelperText>
                )) ?? (
                  <FormHelperText textAlign="right" pr="10px">
                    {(available && numberFormat.format(available)) ?? 0} available
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl id="setPrice">
                <Heading variant="subtit22">
                  <HStack align="center">
                    <FormLabel>Set a price per item</FormLabel>
                    <Tooltip
                      label="You will not be able to change the price after listing.
                             If you'd like to change the price,
                             you will need to create a new listing."
                      placement="top"
                      hasArrow
                      arrowSize={10}
                    >
                      <InfoIcon />
                    </Tooltip>
                  </HStack>
                </Heading>
                <Flex mt="30px" h="50px">
                  <Input
                    name="amount"
                    variant="outline"
                    type="number"
                    maxLength={20}
                    onInput={(o: any) => {
                      if (o.target.value.length > o.target.maxLength)
                        o.target.value = o.target.value.slice(0, o.target.maxLength);
                    }}
                    placeholder="Amount"
                    w="calc(100% - 114px)"
                    borderRightWidth="0"
                    borderRadius="8px 0 0 8px"
                    value={formik.values.amount}
                    onChange={formik.handleChange}
                  />
                  <Select
                    w="114px"
                    m="0 !important"
                    borderRadius="0 8px 8px 0"
                    borderColor="#8F8DB1"
                    name="priceType"
                    value="BOA"
                    isDisabled={true}
                  >
                    <option value="BOA">BOA</option>
                  </Select>
                </Flex>
                {(formik.touched.amount && formik.errors.amount && (
                  <FormHelperText
                    mt={"16px"}
                    fontSize={["15px", "15px", "14px"]}
                    fontWeight="400"
                    lineHeight="12px"
                    color="#ff204a"
                  >
                    <span className="material-symbols-outlined" style={{ fontWeight: "300" }}>
                      close
                    </span>
                    {formik.errors.amount}
                  </FormHelperText>
                )) ?? (
                  <FormHelperText pl="10px">
                    {_.isNumber(formik.values.amount) &&
                      `${getBOAUSDPrice(formik.values.amount, usd)} Total`}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl id="setDuration">
                <Heading variant="subtit22">
                  <FormLabel>Set duration</FormLabel>
                </Heading>
                <DatePicker
                  id="duration"
                  name="duration"
                  onChange={(dates: any) => {
                    const { start, end } = dates;
                    if (start.getTime() !== formik.getFieldProps("startTime").value) {
                      formik.setFieldValue("startTime", dates.start.getTime(), false);
                    }
                    if (end.getTime() !== formik.getFieldProps("endTime").value) {
                      formik.setFieldValue("endTime", dates.end.getTime(), false);
                    }
                  }}
                />
              </FormControl>

              <FormControl id="summary">
                <Heading variant="subtit22">
                  <FormLabel>Summary</FormLabel>
                </Heading>
                <Stack spacing="10px" color="White">
                  <Flex>
                    <Text variant="txt165">Listing price</Text>
                    <Spacer />
                    <Text variant="txt165">{listingPriceBOA}</Text>
                  </Flex>
                  <Flex>
                    <Text variant="txt165">Service fee</Text>
                    <Spacer />
                    <Text variant="txt165">{defaultFee?.percent}%</Text>
                  </Flex>
                  <Flex>
                    <Text variant="txt165">Creator fee</Text>
                    <Spacer />
                    <Text variant="txt165">{totalCreateFee ? totalCreateFee : 0}%</Text>
                  </Flex>
                </Stack>
                <Divider mb="30px" />
                <Flex>
                  <Text variant="txt206">Total potential earnings</Text>
                  <Spacer />
                  <Text variant="txt206">
                    {totalEarnAmount ? totalEarnAmount + " BOA" : "-- BOA"}
                  </Text>
                </Flex>
              </FormControl>
              <Button variant="primary" mt="45px !important" type="submit" isDisabled={isError}>
                Complete listing
              </Button>
              {/*<Button isDisabled variant="primary" onClick={CompleteListingModal.onOpen}>
                disabled
              </Button>
              <Button variant="primary" onClick={WaitModalModal.onOpen}>
                Please wait
              </Button>

              <Button variant="primary" onClick={CreatedSunnyModal.onOpen}>
                You Created Sunny!
              </Button>*/}
            </Stack>
          </form>
        </Box>
      </Stack>
      <CompleteListing
        isOpen={CompleteListingModal.isOpen}
        onClose={CompleteListingModal.onClose}
        asset={asset}
        listingPrice={listingPrice.toString()}
        retryVisible={retryVisible}
        retry={handlerRetry}
        isSuccess={isSuccess}
        viewListing={() => navigate(`/assets/${contract}/${tokenId}`)}
      />
    </React.Fragment>
  );
}
