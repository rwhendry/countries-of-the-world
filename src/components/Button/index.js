import styled from "styled-components";
import { MOBILE_BREAK_POINT } from "constants/mobileBreakPoint";

const Button = styled.button`
  padding: 1em;
  border: 1px solid lightgray;
  background-color: lightgray;
  cursor: pointer;
  transition: all 0.25s ease-out;

  &:hover {
    border: 1px solid grey;
  }

  @media (max-width: ${MOBILE_BREAK_POINT}px) {
    padding: 0.5em 1em;
  }
`;

export default Button;
