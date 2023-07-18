import React, { MouseEventHandler, useCallback, useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormHelperText,
  Heading,
  HStack,
  Image,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Spacer,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useEthers, useTokenBalance } from "@usedapp/core";
import { WBOA9 } from "../../hooks/useSeaport";
import { CreateOrderResult, useCreateOrderCallback } from "../../hooks/useSeaportCallback";
import { useCreateOrderMutation } from "../../hooks/mutation/createOrderMutation";
import { ItemType } from "boa-space-seaport-js/lib/constants";
import { parseEther } from "ethers/lib/utils";
import { ORDER_TYPE } from "../../constants";
import { ApolloError } from "@apollo/client";
import { GetAssetDetailQueryGQL } from "../../hooks/query/useGetAssetDetailQuery";
import { addDays, addHours, addMonths, addWeeks, format } from "date-fns";
import { formatEther } from "@ethersproject/units";
import { FormikErrors, useFormik } from "formik";
import { CreateOrderInput } from "boa-space-seaport-js/lib/types";
import ThumbRatio from "../ThumbRatio";
import _ from "lodash";
import { getBOAUSDPrice, useBOAPrice } from "../../features/price/boaPriceSlice";
import { BigNumber } from "ethers";
import { useGetFeeInfo } from "../../hooks/query/useGetFeeInfo";

interface ModalProp {
  isOpen: boolean;
  onClose(): void;
  asset: any;
  onClick?: MouseEventHandler | undefined;
}

export const MakeOffer = ({ isOpen, onClose, asset }: ModalProp) => {
  const [today] = useState<Date>(new Date());
  const usd = useBOAPrice();
  const [dates, setDates] = useState<any>({
    start: today,
    end: addMonths(today, 1),
  });
  const defaultFee = useGetFeeInfo();
  const [isLoading, setLoading] = useState(false);
  const { account } = useEthers();
  const wBOABalance: BigNumber = useTokenBalance(WBOA9, account);
  const { createOrderMutation } = useCreateOrderMutation();
  const { execute: listingCall } = useCreateOrderCallback();
  const [currentOption, setCurrentOption] = useState<string | undefined>(DurationRange.THREE_DAY);
  const [retryVisible, setRetryVisible] = useState(false);
  const [orderInput, setOrderInput] = useState(undefined);
  const toast = useToast({
    position: "bottom-right",
    variant: "solid",
  });
  const [totalPrice, setTotalPrice] = useState<BigNumber>();
  const { createFeeList, available } = useMemo(() => {
    if (asset?.assetCollection?.feeCollectors?.length) {
      const createFeeList = asset?.assetCollection.feeCollectors.map((item: any) => {
        return { fee: item.fee, address: item.user.userAddress };
      });
      const available =
        asset?.owners
          ?.filter((o: any) => o.user.userAddress !== account)
          ?.reduce((sum: number, o: any) => sum + o.amount, 0) ?? 0;
      return { createFeeList, available };
    }
    return {};
  }, [asset, account]);

  useEffect(() => {
    if (currentOption === DurationRange.HALF_DAY) {
      setDates({ start: today, end: addHours(today, 12) });
    } else if (currentOption === DurationRange.ONE_DAY) {
      setDates({ start: today, end: addDays(today, 1) });
    } else if (currentOption === DurationRange.THREE_DAY) {
      setDates({ start: today, end: addDays(today, 3) });
    } else if (currentOption === DurationRange.ONE_WEEK) {
      setDates({ start: today, end: addWeeks(today, 1) });
    } else if (currentOption === DurationRange.ONE_MONTH) {
      setDates({ start: today, end: addMonths(today, 1) });
    } else if (currentOption === DurationRange.THREE_MONTHS) {
      setDates({ start: today, end: addMonths(today, 3) });
    }
  }, [today, currentOption]);

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
        asset.assetContract.itemType === "ERC721"
          ? {
              allowPartialFills: true, // 부분 거래 허용 여부
              startTime: Math.floor(dates.start.getTime() / 1000).toString(), // 거래 시작 시간
              endTime: Math.floor(dates.end.getTime() / 1000).toString(), // 거래 종료 시간
              offer: [
                {
                  amount: totalPrice.toString(),
                  token: WBOA9,
                },
              ],
              consideration: [
                {
                  itemType: ItemType.ERC721,
                  token: asset.assetContractAddress, // 아이템 컨트랙트 주소
                  identifier: asset.tokenId, // 아이템 토큰 아이디
                  recipient: account, // 아이템 받을 대상
                },
              ],
              fees: fees,
            }
          : {
              allowPartialFills: true, // 부분 거래 허용 여부
              startTime: Math.floor(dates.start.getTime() / 1000).toString(), // 거래 시작 시간
              endTime: Math.floor(dates.end.getTime() / 1000).toString(), // 거래 종료 시간
              offer: [
                {
                  amount: totalPrice.toString(),
                  token: WBOA9,
                },
              ],
              consideration: [
                {
                  itemType: ItemType.ERC1155, // 아이템 타입
                  token: asset.assetContractAddress, // 아이템 컨트랙트 주소
                  amount: values.quantity.toString(), // 아이템 개수
                  identifier: asset.tokenId, // 아이템 토큰 아이디
                  recipient: account, // 아이템 받을 대상
                },
              ],
              fees: fees,
            };
      setOrderInput(orderInput);
      setLoading(true);
      offer(orderInput);
    },
    validate: (values: FormValues) => {
      let errors: FormikErrors<FormValues> = {};
      errors = {};
      try {
        if (!_.isNumber(values?.amount) && _.isNaN(values?.amount)) {
          errors.amount = "Please enter only numbers";
        } else if (!values?.amount) {
          errors.amount = "Please enter the valid amount";
        } else if (!values?.quantity) {
          errors.quantity = "Please enter the quantity required";
        } else if (!_.isNumber(values.quantity)) {
          errors.quantity = "Please enter only numbers";
        } else if (values.quantity > available) {
          errors.quantity = `The quantity cannot exceed ${available}`;
        } else if (parseEther(values.amount.toString()).mul(values.quantity).gt(wBOABalance)) {
          errors.amount = "You don't have enough WBOA";
        } else if (
          wBOABalance &&
          (wBOABalance.isZero() || wBOABalance.lt(parseEther(values.amount.toString())))
        ) {
          errors.amount = "You don't have enough WBOA";
        }
      } catch (e) {
        console.debug("ERROR", e);
      }
      return errors;
    },
  });

  const offer = useCallback(
    (orderInput: CreateOrderInput) => {
      if (listingCall && createOrderMutation && orderInput) {
        listingCall(orderInput)
          .then(({ order, orderHash }: CreateOrderResult) => {
            createOrderMutation({
              variables: {
                originalData: JSON.stringify(order),
                assetId: asset.id,
                orderHash,
                offerType: ORDER_TYPE.OFFERING,
              },
              onCompleted(data: any) {
                console.debug("createOrderMutation >:", data);
                toast({
                  title: "Your offer has been submitted.",
                  status: "success",
                });
                onClose();
              },
              onError(err: ApolloError) {
                console.debug("createOrderMutation > error:", err);
              },
              refetchQueries: [
                {
                  query: GetAssetDetailQueryGQL,
                  variables: {
                    assetContractAddress: asset.assetContractAddress,
                    tokenId: asset.tokenId,
                  },
                },
              ],
            });
          })
          .catch((e) => {
            console.debug("MetaError", e);
            setRetryVisible(true);
          });
      }
    },
    [asset, createOrderMutation, listingCall, toast, onClose]
  );

  useEffect(() => {
    if (isOpen) {
      setLoading(false);
      setRetryVisible(false);
    }
  }, [isOpen]);

  const handlerRetry = () => {
    setRetryVisible(false);
    offer(orderInput);
  };

  const handlerOnCuration = useCallback(
    (e: any) => {
      setCurrentOption(e.target.value);
    },
    [setCurrentOption]
  );

  useEffect(() => {
    if (formik?.values?.amount && formik?.values?.quantity) {
      const price = parseEther(formik.values.amount.toString()).mul(formik.values.quantity);
      setTotalPrice(price);
    }
  }, [formik?.values?.amount, formik?.values?.quantity]);

  return (
    <Modal blockScrollOnMount={true} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      {!isLoading ? (
        <form onSubmit={formik.handleSubmit}>
          <ModalContent>
            <ModalHeader>
              <Heading variant="subtit22">Make an offer</Heading>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex>
                <Stack direction="row" justify="flex-start" align="center" spacing="15px">
                  <Box
                    overflow="hidden"
                    borderRadius="10px"
                    width="65px"
                    height="65px"
                    background="L_Gray_T01"
                  >
                    <Image
                      src={asset?.thumbnailUrl}
                      w="100%"
                      h="100%"
                      objectFit="contain"
                      objectPosition="50%"
                    />
                  </Box>
                  <Stack justify="flex-start" align="flex-start" spacing="0px">
                    <Text variant="txt176" color="White">
                      {asset?.name}
                    </Text>
                    <Stack direction="row" justify="flex-start" align="center" spacing="5px">
                      <Text variant="txt165" color="White">
                        {asset?.assetCollection?.name}
                      </Text>
                      {/*<VerifiedIcon /> TODO : Verified feature*/}
                    </Stack>
                  </Stack>
                </Stack>
                <Spacer />
                <Box textAlign="right">
                  <Text variant="txt146" color="White" mt="10px">
                    {totalPrice && formatEther(totalPrice)} WBOA
                  </Text>
                  <Text variant="txt144" color="#706D82">
                    {totalPrice && getBOAUSDPrice(formatEther(totalPrice).toString(), usd)}
                  </Text>
                </Box>
              </Flex>
              <Box
                mt="24px"
                p="15px"
                borderRadius="8px"
                background="popup_hover"
                borderColor="popup_B01"
                borderWidth="1px"
              >
                <Stack justify="flex-start" align="center" spacing="6px">
                  <Flex w="100%">
                    <HStack color="White">
                      <span className="material-symbols-outlined" style={{ marginRight: "0" }}>
                        account_balance_wallet
                      </span>
                      <Text variant="txt166">Balance</Text>
                    </HStack>
                    <Spacer />
                    <Text variant="txt166" color="White">
                      {wBOABalance ? formatEther(wBOABalance) : "--"} WBOA
                    </Text>
                  </Flex>
                  {/*<Flex w="100%">
                    <HStack>
                      <Text variant="txt166" color="White">
                        Floor price
                      </Text>
                    </HStack>
                    <Spacer />
                    <Text variant="txt166" color="White">
                      --
                    </Text>
                  </Flex>*/}
                  <Flex w="100%">
                    <HStack>
                      <Text variant="txt166" color="White">
                        Best offer
                      </Text>
                    </HStack>
                    <Spacer />
                    <Text variant="txt166" color="White">
                      --
                    </Text>
                  </Flex>
                </Stack>
              </Box>

              <FormControl>
                <Flex mt="30px" h="50px">
                  <Input
                    name="amount"
                    variant="outline"
                    type="number"
                    placeholder="Price"
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
                    <option value="BOA">WBOA</option>
                  </Select>
                </Flex>
                {formik.touched.amount && formik.errors.amount && (
                  <FormHelperText
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
                )}
              </FormControl>
              <FormControl mt="20px">
                <Stack mt="8px" spacing="10px">
                  <Text variant="txt166" pl="3px" textAlign="left">
                    Quantity
                  </Text>
                  <Input
                    name="quantity"
                    type="number"
                    value={formik.values.quantity}
                    onChange={formik.handleChange}
                    h="50px"
                    isDisabled={asset?.assetContract?.itemType === "ERC721"}
                  />
                </Stack>
                {formik.touched.quantity && formik.errors.quantity && (
                  <FormHelperText
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
                )}
              </FormControl>
              <Box mt="20px">
                <Text variant="txt166" pl="3px" textAlign="left">
                  Duration
                </Text>
                <HStack h="50px" mt="8px" spacing="10px">
                  <Menu>
                    <MenuButton
                      as={Button}
                      rightIcon={<ChevronDownIcon />}
                      w="190px"
                      h="50px"
                      pl="18px"
                      pr="12px"
                      borderRadius="8px"
                      borderColor="#443F5B"
                      bg="#2C273F"
                      fontSize="15px"
                      textAlign="left"
                    >
                      {currentOption}
                    </MenuButton>
                    <MenuList minW="0" w="190px">
                      {Object.keys(DurationRange).map((key, index) => {
                        return (
                          <MenuItem
                            py="10px"
                            key={index}
                            onClick={handlerOnCuration}
                            value={DurationRange[key as keyof typeof DurationRange]}
                          >
                            {DurationRange[key as keyof typeof DurationRange]}
                          </MenuItem>
                        );
                      })}
                    </MenuList>
                  </Menu>
                  <Flex
                    align="center"
                    h="100%"
                    px="25px"
                    color="White"
                    whiteSpace="nowrap"
                    bg="popup_B01"
                    borderRadius="8px"
                    flexGrow="1"
                  >
                    <Text variant="txt166">{dates?.end && format(dates.end, "PP")}</Text>
                    <Spacer />
                    <Text variant="txt166">{dates?.end && format(dates.end, "p")}</Text>
                  </Flex>
                </HStack>
              </Box>
            </ModalBody>
            <ModalFooter>
              <Button variant="primary" w="100%" mt="50px" type="submit">
                Make offer
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      ) : (
        <ModalContent maxW="700px" pl="0" pr="3px">
          <ModalHeader>
            <Heading variant="subtit22">Approve offering</Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody px="30px">
            <Flex>
              <Stack direction="row" justify="flex-start" align="center" spacing="15px">
                <Box borderRadius="10px" width="65px" height="65px" background="L_Gray_T01">
                  <ThumbRatio src={asset?.thumbnailUrl} isLoading={true} />
                </Box>
                <Stack justify="flex-start" align="flex-start" spacing="0px">
                  <Text variant="txt176" color="White">
                    {asset?.name}
                  </Text>
                  <Text variant="txt154" color="White" textAlign="left">
                    {asset?.assetCollection?.name}
                  </Text>
                </Stack>
              </Stack>
              <Spacer />
              <Box textAlign="right">
                <Text variant="txt206" color="White" mt="10px">
                  {formatEther(totalPrice)} WBOA
                </Text>
                <Text variant="txt154" color="text_Gray01">
                  {getBOAUSDPrice(formatEther(totalPrice).toString(), usd)}
                </Text>
              </Box>
            </Flex>
            <Divider mb="40px" borderColor="#443F5B" />
            <Box textAlign="left">
              <Text variant="txt176" color="White">
                Go to your wallet
              </Text>
              <Text variant="txt174" color="White">
                You’ll be asked to review and confirm this listing from your wallet.
              </Text>
            </Box>
          </ModalBody>
          <ModalFooter>
            {retryVisible && (
              <Button
                variant="primary"
                w="100%"
                ml="30px"
                mr="30px"
                mt="50px"
                onClick={handlerRetry}
              >
                Continue
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      )}
    </Modal>
  );
};

interface FormValues {
  address: string;
  tokenId: string;
  quantity: number;
  amount: string;
  startTime: number;
  endTime: number;
}
const DurationRange = {
  HALF_DAY: "12 Hours",
  ONE_DAY: "1 day",
  THREE_DAY: "3 day",
  ONE_WEEK: "1 week",
  ONE_MONTH: "1 month",
  THREE_MONTHS: "3 months",
};
