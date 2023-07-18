import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Spacer,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";

import { FormikErrors, useFormik } from "formik";
import { useImportNFTMutation } from "../../hooks/mutation/importNFTMutation";
import { ImprotNFTAlert } from "../Modals/ImportNFT";
import { useNavigate } from "react-router-dom";
import { GetUserAssetsQueryGQL } from "../../hooks/query/useGetUserAssetsQuery";
import { useEthers } from "@usedapp/core";

// Shape of form values
interface FormValues {
  address: string;
  tokenId: string;
}

// Aside: You may see InjectedFormikProps<OtherProps, FormValues> instead of what comes below in older code.. InjectedFormikProps was artifact of when Formik only exported a HoC. It is also less flexible as it MUST wrap all props (it passes them through).
const ImportNFTWrap = () => {
  const { account } = useEthers();
  const { importNFTMutation } = useImportNFTMutation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const [successToImport, setSuccessToImport] = useState(false);
  const [isSending, setSending] = useState(false);

  const formik = useFormik({
    initialValues: {
      address: "",
      tokenId: "",
      // address: "0x2fddd0f488B767E8Dd42aE4E60f0685A2e15b1Fd",
      // 1 tokenId: "89697278701889901864060606526707955834850344146599935406839114474368771555378",
      // 2 tokenId: "29534064577826613153035026441167017977610697301918714276121482762912448643272",
      // 3 tokenId: "29534064577826613153035026441167017977610697301918714276121482768410006782152",
      // 4 tokenId: "29534064577826613153035026441167017977610697301918714276121482769509518409928",
    },
    onSubmit: (values: FormValues) => {
      console.debug("Param", values);
      setSending(true);
      importNFTMutation({
        variables: { assetContractAddress: values.address, tokenId: values.tokenId.toString() },
        onCompleted(data) {
          console.debug("importNFTMutation >:", data);
          setSending(false);
          setSuccessToImport(true);
          onOpen();
        },
        onError(err: any) {
          console.debug("importNFTMutation > error:", err);
          setSending(false);
          setSuccessToImport(false);
          onOpen();
        },
        refetchQueries: [
          // mutation 완료 후 재요청할 쿼리 목록
          { query: GetUserAssetsQueryGQL, variables: { userAddress: account } },
        ],
      });
    },
    validateOnBlur: true,
    validateOnChange: true,
    // Add a custom validation function (this can be async too!)
    validate: (values: FormValues) => {
      let errors: FormikErrors<FormValues> = {};
      errors = {};
      if (!values.address) {
        errors.address = "Please enter the address required.";
      } else if (!values.tokenId) {
        errors.tokenId = "Please enter the tokenId required.";
      }
      return errors;
    },
  });
  return (
    <>
      <Box maxW="445px" w="100%" mx="auto" p="30px" bg="#3D3755" borderRadius="15px">
        <form onSubmit={formik.handleSubmit}>
          <FormControl isInvalid={!!formik.errors.address && !!formik.touched.address}>
            <FormLabel htmlFor="address" fontSize="16px" fontWeight="600">
              Address
            </FormLabel>
            <Input
              id="address"
              name="address"
              type="text"
              placeholder="0x..."
              _placeholder={{ opacity: 0.75, color: "inherit" }}
              h="52px"
              onChange={formik.handleChange}
              value={formik.values.address}
              bg="#2C273F"
              borderRadius="8px"
              border="2px solid #443F5B;"
            />
            <FormErrorMessage>
              <FormHelperText
                mt={"16px"}
                fontSize={["15px", "15px", "14px"]}
                fontWeight="400"
                lineHeight="12px"
                color="#ff204a"
              >
                {formik.errors.address}
              </FormHelperText>
            </FormErrorMessage>
          </FormControl>
          <Spacer mb={["20px"]} />
          <FormControl>
            <FormLabel htmlFor="tokenId" fontSize="16px" fontWeight="600">
              Token ID
            </FormLabel>
            <Input
              id="tokenId"
              name="tokenId"
              type="text"
              placeholder="Enter the collectible ID"
              _placeholder={{ opacity: 0.75, color: "inherit" }}
              h="52px"
              onChange={formik.handleChange}
              value={formik.values.tokenId}
              bg="#2C273F"
              borderRadius="8px"
              border="2px solid #443F5B;"
            />
            {formik.touched.tokenId && formik.errors.tokenId && (
              <FormHelperText
                mt={"16px"}
                fontSize={["15px", "15px", "14px"]}
                fontWeight="400"
                lineHeight="12px"
                color="#ff204a"
              >
                {formik.errors.tokenId}
              </FormHelperText>
            )}
          </FormControl>
          <VStack spacing="12px" align="stretch" mt="50px">
            <Button
              type="submit"
              variant="primary"
              isLoading={isSending}
              loadingText="Submitting"
              spinnerPlacement="end"
            >
              Import
            </Button>
            <Button type="reset" variant="outline" color="White" onClick={() => navigate("/my")}>
              Cancel
            </Button>
          </VStack>
        </form>
      </Box>
      <ImprotNFTAlert isOpen={isOpen} success={successToImport} handleClose={onClose} />
    </>
  );
};

export default function ImportNFTForm() {
  return (
    <>
      <>
        <VStack spacing={[3, 3, 3, 2]} align="stretch" mt="25px">
          <ImportNFTWrap />
        </VStack>
      </>
    </>
  );
}

// const ImportWrap = styled.div`
//   width: 100%;
//   max-width: 428px;
//   margin: auto;
//   padding: 30px 8% 30px;
//   background: #3d3755;
//   border: none;
//   border-radius: 15px;
//   @media screen and (min-width: 744px) {
//     padding: 35px 33px;
//   }
// `;
