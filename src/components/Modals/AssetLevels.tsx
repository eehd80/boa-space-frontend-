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
import AddLevels from "../Form/addLevels";
import { AssetModalProps } from "./AssetProperites";
import { AssetOption } from "../../pages/asset/createAsset";
import _ from "lodash";

export const AssetLevels = ({
  isOpen,
  onClose,
  option = [{ key: 0 }],
  onChange,
}: AssetModalProps) => {
  const [levels, setLevels] = useState<AssetOption[]>(option);
  const [isSetting, setSetting] = useState(false);
  useEffect(() => {
    setLevels(option);
  }, [option]);

  const getMaxKey = useCallback((): number => {
    return Math.max(...levels.map((item) => item.key)) + 1;
  }, [levels]);

  const handlerAdd = useCallback(() => {
    setLevels([...levels, { key: getMaxKey(), numerator: 3, denominator: 5 }]);
  }, [levels, setLevels, getMaxKey]);

  const handlerDelete = (e: any) => {
    setLevels(levels.filter((item) => item !== e));
  };

  const handlerUpdate = (asset: any) => {
    setLevels(levels.map((prop) => (prop.key === asset.key ? { ...prop, ...asset } : prop)));
  };

  const handlerSave = () => {
    onChange(levels.filter((prop) => !_.isEmpty(prop?.type)));
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      if (levels && levels.length === 0) setLevels([{ key: 0, numerator: 3, denominator: 5 }]);
      else {
        if (!isSetting) {
          setLevels(option);
          setSetting(true);
        }
      }
    } else {
      setSetting(false);
    }
  }, [isOpen, levels, isSetting, option]);

  return (
    <Modal blockScrollOnMount={true} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent px={["15px", "15px", "15px", "25px"]}>
        <ModalHeader>
          <Heading variant="subtit22">Add Levels</Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text variant="txt154" px="10px" color="text_Gray02">
            Levels show up underneath your item, are clickable, and can be filtered in your
            collection&apos;s sidebar.
          </Text>
          <Stack mt="15px">
            <HStack>
              <Text
                variant="txt156"
                w="53%"
                pl="52px"
                textAlign="left"
                color="white"
                boxSizing="border-box"
              >
                Type
              </Text>
              <Text variant="txt156" w="44%" textAlign="left" color="white">
                Value
              </Text>
            </HStack>
            {levels.map((item: AssetOption, index: number) => {
              return (
                <AddLevels
                  level={item}
                  key={index}
                  onDelete={handlerDelete}
                  onUpdate={handlerUpdate}
                />
              );
            })}
            {levels?.length < 20 && (
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
