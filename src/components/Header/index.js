import React from "react";
import styled from "styled-components";

const StyledHeader = styled.header`
  width: 100%;
  min-height: 1em;
  padding: 0.5em 0;
  text-align: center;
  position: sticky;
  top: 0;
  background-color: lavender;
  z-index: 999;
`;

const Header = () => (
  <StyledHeader>
    Country of The Worlds - Search Engine
  </StyledHeader>
);

export default Header;
