import React from "react";
import styled from "styled-components";

export function EmptyImage() {
  return <ImageNone />;
}

const ImageNone = styled.div`
  margin: 0 auto 70px;
  text-align: center;
  font-weight: 500;
  font-size: 18px;
  color: #c4c4d3;
  background-color: #46405f;
  display: flex;
  height: 100%;
  &::before {
    content: "";
    width: 128px;
    height: 100%;
    display: flex;
    align-items: center;
    margin: 0 auto 10px;
    vertical-align: -50%;
    background: url(/images/icon/no_image_icon.svg) 50% 50% no-repeat;
  }
`;
