import React from "react";
import styled from "styled-components";

const StyledFooter = styled.footer`
  width: 100%;
  min-height: 1em;
  padding: 0.5em 0;
  text-align: center;
  position: sticky;
  bottom: 0;
  background-color: lavender;
`;

const Footer = () => (
  <StyledFooter>
    Copyright of Sam Kok @ 2020
  </StyledFooter>
);

export default Footer;
