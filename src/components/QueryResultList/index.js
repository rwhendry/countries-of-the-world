import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Layout = styled.div`
  width: 45%;
  border: 1px solid grey;
  border-radius: 1em;
  padding: 2em;
  margin: 2em;
`;

const Result = styled.div`
  cursor: pointer;
  padding: 0.5em;
  border: 1px solid grey;
  border-radius: 1em;
  margin: 1em 0;
  word-wrap: break-word;
`;

const QueryResultList = ({ data, onSelect }) => (
  <Layout>
    Your query matches:

    {data.map((result, index) => (
      <Result key={index} onClick={() => onSelect(index)}>
        Source: {result["source"]}
        <br/>
        Name: {result["name"]}
      </Result>
    ))}
  </Layout>
);

QueryResultList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()),
  onSelect: PropTypes.func.isRequired,
};

export default QueryResultList;