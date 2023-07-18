import React from "react";
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Image,
  Box,
  MenuDivider,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEthers } from "@usedapp/core";
import { removeJWT } from "../features/auth/authSlice";
import { useActiveState } from "../hooks/useActiveState";
import { ACTIVE_STATE } from "../constants";

export default function AccountButton() {
  const dispatch = useDispatch();
  const { account } = useEthers();
  const { activeState } = useActiveState();
  const removeAuth = () => {
    dispatch(removeJWT(account));
  };

  return (
    <Box pos="relative" className="account-gnb">
      <Menu>
        <MenuButton as={Button} w="35px" h="34px">
          <Image src="/images/icon/account_circle.svg" alt="cart" />
        </MenuButton>
        <MenuList minW="244px" overflow="hidden">
          <MenuItem p="0">
            <Link to="/my" style={{ width: "100%", padding: "21px 18px" }}>
              <span className="material-symbols-outlined fill" style={{ marginRight: "20px" }}>
                person
              </span>{" "}
              My NFT
            </Link>
          </MenuItem>
          <MenuDivider />
          <MenuItem p="0">
            <Link to="/collections" style={{ width: "100%", padding: "21px 18px" }}>
              <span className="material-symbols-outlined" style={{ marginRight: "20px" }}>
                grid_on
              </span>{" "}
              My Collections
            </Link>
          </MenuItem>
          <MenuDivider />
          <MenuItem p="0">
            <Link to="/my/favorites" style={{ width: "100%", padding: "21px 18px" }}>
              <span className="material-symbols-outlined" style={{ marginRight: "20px" }}>
                favorite
              </span>{" "}
              Favorites
            </Link>
          </MenuItem>
          <MenuDivider />
          <MenuItem p="0">
            <Link to="/assets/create" style={{ width: "100%", padding: "21px 18px" }}>
              <span className="material-symbols-outlined fill" style={{ marginRight: "20px" }}>
                edit
              </span>{" "}
              Create
            </Link>
          </MenuItem>
          <MenuDivider />
          <MenuItem p="0">
            <Link to="/my/settings" style={{ width: "100%", padding: "21px 18px" }}>
              <span className="material-symbols-outlined fill" style={{ marginRight: "20px" }}>
                settings
              </span>{" "}
              Profile Settings
            </Link>
          </MenuItem>
          <MenuDivider />
          {/*<MenuItem p="0">*/}
          {/*  <Link to="/partner" style={{ width: "100%", padding: "21px 18px" }}>*/}
          {/*    <span className="material-symbols-outlined" style={{ marginRight: "20px" }}>*/}
          {/*      outgoing_mail*/}
          {/*    </span>{" "}*/}
          {/*    Partnership*/}
          {/*  </Link>*/}
          {/*</MenuItem>*/}
          {activeState === ACTIVE_STATE.STATUS_ONLINE && (
            <React.Fragment>
              <MenuDivider />
              <MenuItem
                p="0"
                onClick={removeAuth}
                w="100%"
                px="18px"
                py="21px"
                fontSize="14px"
                fontWeight="600"
                color="White"
              >
                <span className="material-symbols-outlined" style={{ marginRight: "20px" }}>
                  logout
                </span>{" "}
                Log Out
              </MenuItem>
            </React.Fragment>
          )}
        </MenuList>
      </Menu>
    </Box>
  );
}
