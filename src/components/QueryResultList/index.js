import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { MOBILE_BREAK_POINT } from "constants/mobileBreakPoint";

const Layout = styled.div`
  width: 45%;
  border: 1px solid grey;
  border-radius: 1em;
  padding: 2em;
  margin: 2em;

  @media (max-width: ${MOBILE_BREAK_POINT}px) {
    width: 80vw;
    border: none;
    margin-top: 0.5em;
  }
`;

const ResultLayout = styled.div`
  cursor: pointer;
  padding: 1em;
  border: 1px solid grey;
  border-radius: 1em;
  margin: 1em 0;
  word-wrap: break-word;
`;

const QueryResultList = ({ data, onSelect }) => (
  <Layout>
    {data.length} data matches your query:

    {data.map((result, index) => (
      <ResultLayout key={index} onClick={() => onSelect(index)}>
        {index+1}. Source: {result["source"]}
        <br/>
        Data: {JSON.stringify(result)}
      </ResultLayout>
    ))}
  </Layout>
);

QueryResultList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()),
  onSelect: PropTypes.func.isRequired,
};

export default QueryResultList;
