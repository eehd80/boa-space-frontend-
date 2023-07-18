import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import AddPorperties from "../Form/addProperties";
import { AssetOption } from "../../pages/asset/createAsset";

export interface AssetModalProps {
  isOpen: boolean;
  onClose(): void;
  option?: AssetOption[];
  onChange: any;
}
export const AssetProperties = ({
  isOpen,
  onClose,
  option = [{ key: 0, type: "", name: "" }],
  onChange,
}: AssetModalProps) => {
  const [properties, setProperties] = useState<AssetOption[]>(option);
  const [isSetting, setSetting] = useState(false);
  useEffect(() => {
    setProperties(option);
  }, [option]);

  const getMaxKey = useCallback((): number => {
    return Math.max(...properties.map((item) => item.key)) + 1;
  }, [properties]);

  const handlerAdd = useCallback(() => {
    setProperties([...properties, { key: getMaxKey(), type: "", name: "" }]);
  }, [properties, setProperties, getMaxKey]);

  const handlerDelete = (e: any) => {
    setProperties([...properties.filter((item) => item !== e)]);
  };

  const handlerUpdate = (asset: any) => {
    setProperties(
      properties.map((prop) => (prop.key === asset.key ? { ...prop, ...asset } : prop))
    );
  };

  const handlerSave = () => {
    onChange(properties.filter((prop) => prop?.type !== "" && prop?.name !== ""));
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      if (properties && properties.length === 0) {
        setProperties([{ key: 0, type: "", name: "" }]);
      } else {
        if (!isSetting) {
          setProperties(option);
          setSetting(true);
        }
      }
    } else {
      setSetting(false);
    }
  }, [isOpen, properties, isSetting, option]);

  return (
    <Modal blockScrollOnMount={true} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent px={["15px", "15px", "15px", "25px"]}>
        <ModalHeader>
          <Heading variant="subtit22">Add Properties</Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text variant="txt154" px="10px">
            Properties show up underneath your item, are clickable, and can be filtered in your
            collection&apos;s sidebar.
          </Text>
          <Stack spacing={4} mt="12px">
            <HStack>
              <Text variant="txt156" w="60%" pl="52px" textAlign="left" color="white">
                Type
              </Text>
              <Text variant="txt156" w="40%" textAlign="left" color="white">
                Name
              </Text>
            </HStack>
            {properties.map((item: AssetOption, index: number) => {
              return (
                <AddPorperties
                  key={index}
                  property={item}
                  onDelete={handlerDelete}
                  onUpdate={handlerUpdate}
                />
              );
            })}
            {properties?.length < 20 && (
              <Button variant="gray" mt="12px !important" onClick={handlerAdd}>
                Add more
              </Button>
            )}
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button variant="primary" w="100%" mt="19px" onClick={handlerSave}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
