import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Select, InputLabel, MenuItem } from "@material-ui/core";

import SearchBar from "../SearchBar";
import QueryResultList from "../QueryResultList";
import InfoCard from "../InfoCard";

import useWindowSize from "hooks/useWindowSize";
import { MOBILE_BREAK_POINT } from "constants/mobileBreakPoint";
import ClipLoader from "react-spinners/ClipLoader";

const ContentLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  width: 100%;
  padding: 0.2em 0;
`;

const ResultLayout = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  flex-grow: 1;

  @media (max-width: ${MOBILE_BREAK_POINT}px) {
    justify-content: center;
    align-items: center;
    font-size: 1em;
  }
`;

const Container = ({ onSearch, searchValue="", queryResult=[], selectedResult={}, onResultSelect, isLoading }) => {
  const { width } = useWindowSize();
  const [mobileIsShowingInfoCard, setMobileIsShowingInfoCard] = useState(false);
  const [type, setType] = useState("3");

  if (isLoading) {
    return (
      <ContentLayout style={{ justifyContent: "center" }}><ClipLoader /></ContentLayout>
    );
  }

  const selectResult = (index) => {
    setMobileIsShowingInfoCard(true);
    onResultSelect(index);
  };

  const isMobile = width <= MOBILE_BREAK_POINT;

  let resultComponent;
  if (!searchValue) {
    resultComponent = (
      <ResultLayout style={{ alignItems: "center", paddingBottom: "4em", color: "grey"}}>
        Start searching to explore the world
      </ResultLayout>
    );
  } else {
    if (isMobile) {
      if (mobileIsShowingInfoCard) {
        resultComponent = (
          <ResultLayout>
            <InfoCard data={selectedResult} isMobile={isMobile} onToggle={() => setMobileIsShowingInfoCard(false)}/>
          </ResultLayout>
        );
      } else {
        resultComponent = (
          <ResultLayout>
            <QueryResultList searchValue={searchValue} data={queryResult} onSelect={selectResult} />
          </ResultLayout>
        );
      }
    } else {
      resultComponent = (
        <ResultLayout>
          <QueryResultList searchValue={searchValue} data={queryResult} onSelect={selectResult} />
          <InfoCard data={selectedResult} />
        </ResultLayout>
      );
    }

  }

  return (
    <ContentLayout>
      <InputLabel id="label" style={{ marginTop: "1em", fontSize: isMobile ? "0.75em" : "1em" }}>Query From</InputLabel>
      <Select
        labelId="label"
        id="select"
        value={type}
        style={{ marginTop: "0.5em", fontSize: isMobile ? "0.75em" : "1em"}}
        onChange={(event) => setType(event.target.value)}
      >
        <MenuItem value="0">DBPedia</MenuItem>
        <MenuItem value="1">Local</MenuItem>
        <MenuItem value="2">Local + DBPedia [Separated]</MenuItem>
        <MenuItem value="3">Local + DBPedia [Combined]</MenuItem>
      </Select>
      <SearchBar onSubmit={(value) => onSearch(value, type)} />
      {resultComponent}
    </ContentLayout>
  );
};

Container.propTypes = {
  onSearch: PropTypes.func.isRequired,
  searchValue: PropTypes.string,
  queryResult: PropTypes.arrayOf(PropTypes.shape()),
  selectedResult: PropTypes.shape(),
  onResultSelect: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

export default Container;
