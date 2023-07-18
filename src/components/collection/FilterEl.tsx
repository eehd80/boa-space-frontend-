import React from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  HStack,
  Input,
  Select,
  Stack,
  Text,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";

export default function FiltersEl() {
  return (
    <>
      <Accordion
        defaultIndex={[0]}
        allowMultiple
        borderBottomWidth="1px"
        borderColor="#3D3755"
        minW="300px"
      >
        {/* status */}
        {/*<AccordionItem border="none">
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Status
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} px="12px" border="none">
            <CheckboxGroup colorScheme="green" defaultValue={["naruto", "kakashi"]}>
              <Stack spacing={6} direction="column">
                <Checkbox value="BuyNow" flexDirection="row-reverse" size="sm">
                  Buy Now
                </Checkbox>
                <Checkbox value="OnAuction" flexDirection="row-reverse" size="sm">
                  On Auction
                </Checkbox>
              </Stack>
            </CheckboxGroup>
          </AccordionPanel>
        </AccordionItem>*/}
        {/* price */}
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Price
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} px="12px" border="none">
            <HStack>
              <Select defaultValue="BOA" maxW="100px" bg="Back_BGBLACK">
                <option value="BOA">BOA</option>
                <option value="option2">WBOA</option>
              </Select>
              <Input
                placeholder="Min"
                maxW={["100px", "100px", "100px", "100px", "70px"]}
                bg="Back_BGBLACK"
                px={["18px", "18px", "18px", "18px", "8px"]}
              />
              <Text variant="txt176" px="4px">
                to
              </Text>
              <Input
                placeholder="Max"
                maxW={["100px", "100px", "100px", "100px", "70px"]}
                bg="Back_BGBLACK"
                px={["18px", "18px", "18px", "18px", "8px"]}
              />
            </HStack>
            <Button variant="gray" w="100%" mt="20px">
              Apply
            </Button>
          </AccordionPanel>
        </AccordionItem>
        {/* Quantity */}
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Quantity
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} px="12px" border="none">
            <RadioGroup>
              <Stack direction="column" spacing={6}>
                <Radio value="All items" flexDirection="row-reverse" justifyContent="space-between">
                  All items
                </Radio>
                <Radio
                  value="Single items"
                  flexDirection="row-reverse"
                  justifyContent="space-between"
                >
                  Single items
                </Radio>
                <Radio value="Bundles" flexDirection="row-reverse" justifyContent="space-between">
                  Bundles
                </Radio>
              </Stack>
            </RadioGroup>
          </AccordionPanel>
        </AccordionItem>
        {/* Currency */}
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Currency
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} px="12px" border="none">
            <CheckboxGroup colorScheme="green" defaultValue={["naruto", "kakashi"]}>
              <Stack spacing={6} direction="column">
                <Checkbox value="ETH" flexDirection="row-reverse" size="sm">
                  BOA
                </Checkbox>
                <Checkbox value="WETH" flexDirection="row-reverse" size="sm">
                  WBOA
                </Checkbox>
              </Stack>
            </CheckboxGroup>
          </AccordionPanel>
        </AccordionItem>
        {/* Kind */}
        {/*<AccordionItem>
          <h2>
            <AccordionButton>
              <HStack w="100%" mr="16px">
                <Box as="span" flex="1" textAlign="left">
                  Kind
                </Box>
                <Text variant="txt145" ml="auto" mr="20px" color="#706D82">
                  5,205
                </Text>
              </HStack>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} px="12px" border="none">
            <InputGroup
              pos="relative"
              w="100%"
              mb="20px"
              px="10px"
              borderColor="#443F5B"
              borderWidth="2px"
              bg="transparent"
              borderRadius="8px"
              alignItems="center"
            >
              <Image src="/images/icon/search.svg" w="24px" />
              <InputSearch
                placeholder="Search"
                borderWidth="0"
                bg="transparent"
                h="44px"
                px="8px"
              />
            </InputGroup>
            <CheckboxGroup colorScheme="green" defaultValue={["naruto", "kakashi"]}>
              <Stack spacing={6} direction="column">
                <Checkbox value="kind1" flexDirection="row-reverse" size="sm">
                  <HStack w="100%" justify="space-between">
                    <Text w="60%" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
                      Writer’s Room: Jenkins’ St...
                    </Text>
                    <Text variant="txt145" color="#706D82">
                      5,205
                    </Text>
                  </HStack>
                </Checkbox>
                <Checkbox value="kind2" flexDirection="row-reverse" size="sm">
                  <HStack w="100%" justify="space-between">
                    <Text w="60%" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
                      Writer’s Room: Jenkins’ St...
                    </Text>
                    <Text variant="txt145" color="#706D82">
                      294
                    </Text>
                  </HStack>
                </Checkbox>
                <Checkbox value="kind3" flexDirection="row-reverse" size="sm">
                  <HStack w="100%" justify="space-between">
                    <Text w="60%" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
                      Writer’s Room: Jenkins’ St...
                    </Text>
                    <Text variant="txt145" color="#706D82">
                      294
                    </Text>
                  </HStack>
                </Checkbox>
                <Checkbox value="kind4" flexDirection="row-reverse" size="sm">
                  <HStack w="100%" justify="space-between">
                    <Text w="60%" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
                      Writer’s Room: Jenkins’ St...
                    </Text>
                    <Text variant="txt145" color="#706D82">
                      294
                    </Text>
                  </HStack>
                </Checkbox>
              </Stack>
            </CheckboxGroup>
          </AccordionPanel>
        </AccordionItem>*/}
      </Accordion>
    </>
  );
}

// const InputSearch = styled(Input)`
//   &:focus-visible {
//     border: none;
//     outline: none !important;
//     box-shadow: none !important;
//   }
// `;
