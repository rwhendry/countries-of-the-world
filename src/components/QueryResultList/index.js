import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { MOBILE_BREAK_POINT } from "constants/mobileBreakPoint";

const Layout = styled.div`
  width: 45%;
  border: 1px solid lightgray;
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
  padding: 1em 2em;
  word-wrap: break-word;

  :nth-child(even) {
    border-radius: 1em;
    background-color: lavender;
  }
`;

const QueryResultList = ({ data, searchValue="", onSelect }) => {
  if (!searchValue) {
    return <Layout />;
  }

  return (
    <Layout>
      <p>Showing results for <b>{searchValue}</b></p>
      {data.length} {data.length > 1 ? "entries" : "entry"} match your query:

      <hr/>

      {data.map((result, index) => (
        <ResultLayout key={index} onClick={() => onSelect(index)}>
          {index+1}. Source: {result["source"]}
          <br/>
          Name: {result.name}
        </ResultLayout>
      ))}
    </Layout>
  );
};

QueryResultList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()),
  searchValue: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
};

export default QueryResultList;
