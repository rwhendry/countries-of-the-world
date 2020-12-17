import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { MOBILE_BREAK_POINT } from "constants/mobileBreakPoint";


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
          <Numbering>{index+1}</Numbering>
          <ResultItemLayout>
            <span style={{ fontSize: "0.65em"}}>{result.source}</span><br/>
            {result.name}
          </ResultItemLayout>
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

const Layout = styled.div`
  width: 45%;
  border: 1px solid lightgray;
  border-radius: 1em;
  padding: 2em;
  margin: 2em;
  overflow-y: scroll;
  max-height: 55vh;

  @media (max-width: ${MOBILE_BREAK_POINT}px) {
    width: 80vw;
    border: none;
    margin-top: 0.5em;
    max-height: 65vh;
    padding: 0;
  }
`;

const ResultLayout = styled.div`
  cursor: pointer;
  padding: 0.5em 2em 0.5em 1.5em;
  display: flex;
  flex-direction: row;

  :nth-child(even) {
    border-radius: 0.75em;
    background-color: whitesmoke;
  }
`;

const ResultItemLayout = styled.div`
  word-break: break-word;
`;

const Numbering = styled.div`
  display: flex;
  align-items: center;
  min-width: 2em;
`;

export default QueryResultList;
