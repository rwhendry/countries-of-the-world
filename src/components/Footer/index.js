import React from "react";
import styled from "styled-components";
import { MOBILE_BREAK_POINT } from "constants/mobileBreakPoint";

const StyledFooter = styled.footer`
  width: 100%;
  min-height: 1em;
  padding: 0.5em 0;
  text-align: center;
  position: sticky;
  bottom: 0;
  background-color: lavender;
  z-index: 999;

  @media (max-width: ${MOBILE_BREAK_POINT}px) {
    font-size: 0.75em;
  }
`;

const Footer = () => (
  <StyledFooter>
    Copyright of Sam Kok @ Semantic Web CSUI 2020
  </StyledFooter>
);

export default Footer;
