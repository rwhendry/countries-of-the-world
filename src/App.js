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

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [localStore, setLocalStore] = useState(null);
  const [queryResult, setQueryResult] = useState([]);
  const [selectedResult, setSelectedResult] = useState({});
  const [tempData, setTempData] = useState([]);

  const getLocalStoreResult = useCallback((result) => {
    console.log(result);
    setTempData([...tempData, ...parseLocalToData(result)]);
  }, []);

  useEffect(async () => {
    setIsLoading(true);
    const store = await createStore();
    setLocalStore(store);
    setIsLoading(false);
  }, []);

  const onSearch = useCallback(async (value, type) => {
    if (type === "0" || type === "2") {
      const dbPediaQuery = getCountryFromDbpedia(value);
      const dbPediaQueryResult = await queryToDbpedia(dbPediaQuery);
      const dbPediaResult = parseDbpediaToData(dbPediaQueryResult.results.bindings);
      setTempData([...tempData, dbPediaResult]);
    }

    if (type === "1" || type === "2") {
      const localStoreQuery = getCountryFromLocalStore();
      await queryToLocalStore(localStore, localStoreQuery, getLocalStoreResult);
    }

    setQueryResult(tempData);
    setSelectedResult({});
  }, []);

  return (
    <Container
      onSearch={onSearch}
      selectedResult={selectedResult}
      queryResult={queryResult}
      onResultSelect={(index) => setSelectedResult(queryResult[index])}
      isLoading={isLoading}
    />
  );
};

export default App;
