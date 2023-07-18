import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  Box,
  Button,
  HStack,
  Image,
  Input,
  InputGroup,
  Kbd,
  Show,
  useBoolean,
} from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { useHotkeys } from "react-hotkeys-hook";

export default function SearchButton() {
  const navigate = useNavigate();
  const [searchStr, setSearchStr] = useState("");
  const searchRef = useRef<HTMLInputElement>();
  const [visibleSearch, setVisibleSearch] = useBoolean(false);
  const mSearchInputRef = useRef<HTMLInputElement>();

  useEffect(() => {
    setTimeout(() => {
      if (mSearchInputRef?.current) {
        mSearchInputRef.current.focus();
      }
    }, 1000);
  }, [visibleSearch]);

  useHotkeys("ctrl+/", () => {
    if (searchRef?.current) searchRef?.current?.focus();
  });

  const handleSubmit = (e: any) => {
    if (e.key === "Enter") {
      setVisibleSearch.off();
      e.preventDefault();
      navigate("/search/" + searchStr);
    }
  };

  return (
    <Box
      w={["auto", "auto", "auto", "100%"]}
      ml={["25px", "25px", "25px", "25px", "45px", "75px"]}
      mr={["0", "0", "0", "0", "0", "35px"]}
    >
      <form>
        <Show breakpoint="(max-width: 743px)">
          <Button onClick={setVisibleSearch.on}>
            <Image src="/images/icon/search.svg" alt="search" />
          </Button>
          {visibleSearch && (
            <Box pos="absolute" zIndex="10" inset="0 0 0 0" pt="11px" bg="bg">
              <InputGroup>
                <Button w="55px" h="50px" onClick={setVisibleSearch.off}>
                  <ChevronLeftIcon color="White" fontSize="25px" />
                </Button>
                <Input
                  ref={mSearchInputRef}
                  type="tel"
                  pl="5px"
                  placeholder="Search BOASPACE"
                  border="none"
                  bg="bg"
                  fontSize="17px"
                  fontWeight="400"
                  _placeholder={{ color: "text_Gray02" }}
                  _focusVisible={{ boxShadow: "none" }}
                  onKeyDown={handleSubmit}
                  value={searchStr}
                  onChange={(e: any) => {
                    setSearchStr(e.currentTarget.value);
                  }}
                />
              </InputGroup>
            </Box>
          )}
        </Show>
        <Show breakpoint="(min-width: 744px)">
          <InputGroup
            pos="relative"
            w="100%"
            px="10px"
            borderColor="#443F5B"
            borderWidth="2px"
            bg="transparent"
            borderRadius="8px"
            alignItems="center"
          >
            <Image src="/images/icon/search-gnb.svg" />
            <InputSearch
              placeholder="Search items, collections"
              // placeholder="Search items, collections, and accounts"
              borderWidth="0"
              bg="transparent"
              h="44px"
              px="8px"
              onKeyDown={handleSubmit}
              value={searchStr}
              onChange={(e: any) => {
                setSearchStr(e.currentTarget.value);
              }}
              ref={searchRef}
            />
            <HStack color="white">
              <Kbd style={{ padding: 5, background: "#443F5B", color: "#ececec", border: 0 }}>
                ctrl + /
              </Kbd>
            </HStack>
            {/*<Image src="/images/icon/slash.svg" />*/}
          </InputGroup>
        </Show>
      </form>
    </Box>
  );
}

const InputSearch = styled(Input)`
  &:focus-visible {
    border: none;
    outline: none !important;
    box-shadow: none !important;
  }
`;
