import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import Header from "../Header";
import Footer from "../Footer";

const WrapperLayout = styled.div`
  display: flex;
  align-items: center;
  min-height: 100vh;
  flex-direction: column;
`;

const Wrapper = ({ children }) => (
  <WrapperLayout>
    <Header />
    {children}
    <Footer />
  </WrapperLayout>
);

Wrapper.propTypes = {
  children: PropTypes.element,
};

export default Wrapper;
