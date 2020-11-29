import React, { useCallback, useEffect, useState} from "react";

import {
  getCountryFromDbpedia,
  getCountryFromLocalStore,
} from "constants/query";
import queryToDbpedia from "utils/queryToDbpedia";
import queryToLocalStore from "utils/queryToLocalStore";
import { parseDbpediaToData, parseLocalToData } from "utils/parseQueryData";
import createStore from "utils/parseLocalCsv";
import Container from "components/Container";
import Wrapper from "components/Container/Wrapper";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [localStore] = useState({"obj": null});
  const [queryResult, setQueryResult] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedResult, setSelectedResult] = useState({});

  useEffect(() => {
    setIsLoading(true);
    createStore(localStore);
    setIsLoading(false);
  }, []);

  const onSearch = useCallback(async (value, type) => {
    setIsLoading(true);
    setSearchValue(value);
    let results = [];

    if (type === "0" || type === "2") {
      const dbPediaQuery = getCountryFromDbpedia(value);
      const dbPediaQueryResult = await queryToDbpedia(dbPediaQuery);
      const dbPediaResult = parseDbpediaToData(dbPediaQueryResult.results.bindings);
      results = [...results, ...dbPediaResult];
    }

    if (type === "1" || type === "2") {
      const setLocalStoreResult = (result) => {
        const localStoreResult = parseLocalToData(result);
        results = [...results, ...localStoreResult];
        setQueryResult(results);
      };

      const localStoreQuery = getCountryFromLocalStore(value);
      await queryToLocalStore(localStore.obj, localStoreQuery, setLocalStoreResult);
    }

    setQueryResult(results);
    setSelectedResult({});
    setIsLoading(false);
  }, []);

  return (
    <Wrapper>
      <Container
        onSearch={onSearch}
        searchValue={searchValue}
        selectedResult={selectedResult}
        queryResult={queryResult}
        onResultSelect={(index) => setSelectedResult(queryResult[index])}
        isLoading={isLoading}
      />
    </Wrapper>
  );
};

export default App;
