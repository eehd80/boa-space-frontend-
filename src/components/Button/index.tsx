import React from "react";
import styled from "styled-components";

const Base = styled.button<{
  padding?: string;
  width?: string;
  borderRadius?: string;
  altDisabledStyle?: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 58px;
  font-weight: 600;
  font-size: 19px;
  border-radius: 6px;
  box-sizing: border-box;
  &:hover {
    background: #b4a5ff;
    color: #fff;
  }

  &:disabled {
    cursor: auto;
  }
  > * {
    user-select: none;
  }
  @media screen and (min-width: 1024px) {
    height: 52px;
    font-size: 15px;
  }
`;

export const ButtonBase = styled(Base)`
  background: var(--chakra-colors-boa-3);
  border: 1px solid var(--chakra-colors-boa-3);
  color: #fff;
`;

export const ButtonOutline = styled(Base)`
  margin-top: 10px;
  color: #c4c4d3;
  border: 1px solid rgba(196, 196, 211, 0.4);
  border-radius: 6px;
  &:focus,
  &:hover {
    cursor: pointer;
    background: ${({ theme }) => theme.purple1};
  }
  &:disabled {
    pointer-events: none;
    box-shadow: none;
    border: 1px solid ${({ theme }) => theme.purpleDisabled};
    outline: none;
    background: ${({ theme }) => theme.purpleDisabled};
    color: ${({ theme }) => theme.purpleDisabledColor};
  }
`;
