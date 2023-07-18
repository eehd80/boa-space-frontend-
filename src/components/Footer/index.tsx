import React from "react";
import styled from "styled-components";
import { Show, VisuallyHidden } from "@chakra-ui/react";
import Logo from "../Header/Logo";

function Footer() {
  return (
    <Line>
      <Ft>
        <div className="container">
          <Show above="lg">
            <Logo />
          </Show>
          <VisuallyHidden>BOASPACE info</VisuallyHidden>
          <FtInfo>
            {/*<li>*/}
            {/*  <Link>Terms</Link>*/}
            {/*</li>*/}
            {/*<li>*/}
            {/*  <Link>Privacy policy</Link>*/}
            {/*</li>*/}
            {/*<li>*/}
            {/*  <Link*/}
            {/*    onClick={() =>*/}
            {/*      window.open("https://metamask.app.link/dapp/testnet.boaspace.io", "_blank")*/}
            {/*    }*/}
            {/*  >*/}
            {/*    Built on*/}
            {/*  </Link>*/}
            {/*</li>*/}
            {/*<li>*/}
            {/*  <Link>Docs</Link>*/}
            {/*</li>*/}
            {/*<li className="contact">*/}
            {/*  <Link href="mailto:media@uniswap.org">Contact Us</Link>*/}
            {/*</li>*/}
          </FtInfo>

          {/* <VisuallyHidden>BOASPACE SNS</VisuallyHidden>
        <FtSns>
          <li>
            <Link className="medium">Medium</Link>
          </li>
          <li>
            <Link className="telegram">Telegram</Link>
          </li>
          <li>
            <Link className="twitter">Twitter</Link>
          </li>
          <li>
            <Link className="youtube">Youtube</Link>
          </li>
          <li>
            <Link className="github">Github</Link>
          </li>
        </FtSns> */}
          <Copyright>Copyright 2022 BOSAGORA Foundation</Copyright>
        </div>
      </Ft>
    </Line>
  );
}
export default React.memo(Footer);

const Line = styled("div")`
  border-top: 1px solid rgba(217, 217, 217, 0.2);
`;

const Ft = styled.footer`
  padding: 23px 0 77px;

  @media screen and (min-width: 1024px) {
    padding: 0 2.2%;
    border-top: none;
    .container {
      position: relative;
      display: flex;
      ///* padding: 20px 0; */
      //border-top: 1px solid rgba(217, 217, 217, 0.2);
    }
  }
  @media screen and (min-width: 1280px) {
    padding-left: 2.2%;
    padding-right: 2.2%;
  }
  @media screen and (min-width: 1920px) {
    padding-left: 1.7%;
    padding-right: 1.7%;
  }
`;

const FtInfo = styled.ul`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  .contact {
    color: var(--chakra-colors-boa-2);
    text-decoration: underline;
  }
  a {
    display: block;
    padding: 10px 16px;
    font-weight: 400;
    font-size: 16px;
    white-space: nowrap;
  }
  @media screen and (min-width: 1024px) {
    margin-left: 44px;
    a {
      padding: 10px 14px;
      font-size: 12px;
    }
  }
`;

const Copyright = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0 0 auto;
  font-weight: 400;
  font-size: 13px;
  color: #c4c4d3;
  @media screen and (min-width: 1024px) {
    margin-top: 0;
    font-size: 11px;
  }
`;
