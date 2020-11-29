import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Select, InputLabel, MenuItem } from "@material-ui/core";

import Header from "../Header";
import Footer from "../Footer";
import SearchBar from "../SearchBar";
import QueryResultList from "../QueryResultList";
import InfoCard from "../InfoCard";

import useWindowSize from "hooks/useWindowSize";
import { MOBILE_BREAK_POINT } from "constants/mobileBreakPoint";

const ContainerLayout = styled.div`
  display: flex;
  align-items: center;
  min-height: 100vh;
  flex-direction: column;
`;

const ContentLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  width: 100%;
`;

const ResultLayout = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;

  @media (max-width: ${MOBILE_BREAK_POINT}px) {
    justify-content: center;
    align-items: center;
  }
`;

const Container = ({ onSearch, queryResult=[], selectedResult={}, onResultSelect, isLoading }) => {
  const { width } = useWindowSize();
  const [mobileIsShowingInfoCard, setMobileIsShowingInfoCard] = useState(false);
  const [type, setType] = useState("2");

  if (isLoading) {
    return (
      <ContainerLayout>
        <Header /><ContentLayout>Loading...</ContentLayout><Footer />
      </ContainerLayout>
    );
  }

  const selectResult = (index) => {
    setMobileIsShowingInfoCard(true);
    onResultSelect(index);
  };

  const isMobile = width <= MOBILE_BREAK_POINT;

  let resultComponent;
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
          <QueryResultList data={queryResult} onSelect={selectResult} />
        </ResultLayout>
      );
    }
  } else {
    resultComponent = (
      <ResultLayout>
        <QueryResultList data={queryResult} onSelect={selectResult} />
        <InfoCard data={selectedResult} />
      </ResultLayout>
    );
  }

  return (
    <ContainerLayout>
      <Header />
      <ContentLayout>
        <InputLabel id="label" style={{ marginTop: "1em" }}>Query Type</InputLabel>
        <Select labelId="label" id="select" value={type} style={{ marginTop: "0.5em"}} onChange={(event) => setType(event.target.value)}>
          <MenuItem value="0">DBPedia</MenuItem>
          <MenuItem value="1">Local</MenuItem>
          <MenuItem value="2">DBPedia + Local</MenuItem>
        </Select>
        <SearchBar onSubmit={(value) => onSearch(value, type)} />
        {resultComponent}
      </ContentLayout>
      <Footer />
    </ContainerLayout>
  );
};

Container.propTypes = {
  onSearch: PropTypes.func.isRequired,
  queryResult: PropTypes.arrayOf(PropTypes.shape()),
  selectedResult: PropTypes.shape(),
  onResultSelect: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

export default Container;
