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
import { AssetModalProps } from "./AssetProperites";
import { AssetOption } from "../../pages/asset/createAsset";
import AddLevels from "../Form/addLevels";
import _ from "lodash";

export const AssetStats = ({
  isOpen,
  onClose,
  option = [{ key: 0 }],
  onChange,
}: AssetModalProps) => {
  const [stats, setStats] = useState<AssetOption[]>(option);
  const [isSetting, setSetting] = useState(false);
  useEffect(() => {
    setStats(option);
  }, [option]);

  const getMaxKey = useCallback((): number => {
    return Math.max(...stats.map((item) => item.key)) + 1;
  }, [stats]);

  const handlerAdd = useCallback(() => {
    setStats([...stats, { key: getMaxKey(), numerator: 3, denominator: 5 }]);
  }, [stats, setStats, getMaxKey]);

  const handlerDelete = useCallback(
    (e: any) => {
      if (stats.length > 1) {
        setStats(stats.filter((item) => item.key !== e.key)); // 인덱스 값과 같지 않은 애들만 남겨둔다
      } else {
        setStats([{ key: 0, numerator: 3, denominator: 5 }]);
      }
    },
    [stats, setStats]
  );

  const handlerUpdate = (asset: any) => {
    setStats(stats.map((prop) => (prop.key === asset.key ? { ...prop, ...asset } : prop)));
  };

  const handlerSave = () => {
    onClose();
    const filter = stats.filter((prop) => !_.isEmpty(prop?.type));
    onChange(filter);
  };

  useEffect(() => {
    if (isOpen) {
      if (stats && stats.length === 0) setStats([{ key: 0, numerator: 3, denominator: 5 }]);
      else {
        if (!isSetting) {
          setStats(option);
          setSetting(true);
        }
      }
    } else {
      setSetting(false);
    }
  }, [isOpen, stats, isSetting, option]);

  return (
    <Modal blockScrollOnMount={true} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent px={["15px", "15px", "15px", "25px"]}>
        <ModalHeader>
          <Heading variant="subtit22">Add Stats</Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text variant="txt154" px="10px">
            Stats show up underneath your item, are clickable, and can be filtered in your
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
            {stats.map((item: AssetOption, index: number) => {
              return (
                <AddLevels
                  level={item}
                  key={index}
                  onDelete={handlerDelete}
                  onUpdate={handlerUpdate}
                />
              );
            })}
            {stats?.length < 20 && (
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
