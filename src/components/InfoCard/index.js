import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Layout = styled.div`
  width: 30%;
  max-width: 30%;
  height: 100%;
  display: inline-block;
  border: 1px solid grey;
  border-radius: 1em;
  padding: 2em;
  margin-top: 2em;
  margin-right: 2em;
  word-wrap: break-word;
`;

const InfoCard = ({ data, onToggle, isMobile }) => (
  <Layout>
    {isMobile && (
      <div>
        <button onClick={onToggle}>back</button>
        <br /><br /><br /><br />
      </div>
    )}
    {Object.keys(data).map((key, index) => (
      <div key={index}>{key}: {data[key]}</div>
    ))}
  </Layout>
);

InfoCard.propTypes = {
  data: PropTypes.shape(),
  onToggle: PropTypes.func,
  isMobile: PropTypes.bool
};

export default InfoCard;
