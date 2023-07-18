import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { removeJWT } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useEthers } from "@usedapp/core";
interface GnbProps {
  onClose?: any;
}

export default function GnbAccount({ onClose }: GnbProps) {
  const dispatch = useDispatch();
  const { account } = useEthers();
  const removeAuth = () => {
    onClose();
    dispatch(removeJWT(account));
  };

  return (
    <GnbWrap>
      <ul className="lst-gnb">
        <li>
          <Link to="/my" onClick={onClose}>
            <span className="material-symbols-outlined fill">person</span> My NFT
          </Link>
        </li>
        <li>
          <Link to="/collections" onClick={onClose}>
            <span className="material-symbols-outlined">grid_on</span> My Collections
          </Link>
        </li>
        <li>
          <Link to="/my/favorites" onClick={onClose}>
            <span className="material-symbols-outlined">favorite</span> Favorites
          </Link>
        </li>
        <li>
          <Link to="/assets/create" onClick={onClose}>
            <span className="material-symbols-outlined fill">edit</span> Create
          </Link>
        </li>
        <li>
          <Link to="/my/settings" onClick={onClose}>
            <span className="material-symbols-outlined fill">settings</span> Profile Settings
          </Link>
        </li>
        {/*<li>*/}
        {/*  <Link to="/partnership" onClick={onClose}>*/}
        {/*    <span className="material-symbols-outlined">outgoing_mail</span> Partnership*/}
        {/*  </Link>*/}
        {/*</li>*/}
        <li>
          <Button onClick={removeAuth} justifyContent="flex-start">
            <span className="material-symbols-outlined">logout</span> Log Out
          </Button>
        </li>
      </ul>
    </GnbWrap>
  );
}

const GnbWrap = styled.div`
  .lst-gnb {
    li {
      display: flex;
      border-bottom: 1px solid #443f5b;
      padding-left: 10px;
    }

    a,
    button {
      position: relative;
      display: flex;
      align-items: center;
      width: 100%;
      height: 75px;
      padding: 20px 15px;
      font-weight: 600;
      font-size: 16px;
      line-height: 35px;
      color: var(--chakra-colors-white);

      &:hover {
        color: var(--chakra-colors-boa-2);
        background: transparent;
      }

      span {
        margin-right: 15px;
        font-size: 23px;
      }
    }
  }

  /* @media screen and (min-width: 744px) {
    margin-right: 20px;
    .lst-gnb {
      display: flex;
      list-style: none;
      height: 100%;

      li {
        border-bottom: none;
      }

      a,
      button {
        display: flex;
        align-items: center;
        height: 100%;
        padding: 0 16px;
        border: none;
        font-weight: 600;
        font-size: 18px;

        &::after {
          display: none;
        }
      }
    }
  }
  @media screen and (min-width: 1024px) {
    .lst-gnb {
      a,
      button {
        font-size: 14px;
      }
    }
  } */
`;
