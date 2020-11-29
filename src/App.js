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
  const [localStore] = useState({"obj": null});
  const [queryResult, setQueryResult] = useState([]);
  const [selectedResult, setSelectedResult] = useState({});

  useEffect(() => {
    setIsLoading(true);
    createStore(localStore);
    setIsLoading(false);
  }, []);

  const onSearch = useCallback(async (value, type) => {
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
      console.log(localStore);
      await queryToLocalStore(localStore.obj, localStoreQuery, setLocalStoreResult);
    }

    setQueryResult(results);
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
