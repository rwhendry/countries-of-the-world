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
import levenshtein from "utils/levenhshtein";

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
    let dbQuery, localQuery;

    if (type === "0" || type === "2" || type === "3") {
      const dbPediaQuery = getCountryFromDbpedia(value);
      const dbPediaQueryResult = await queryToDbpedia(dbPediaQuery);
      const dbPediaResult = parseDbpediaToData(dbPediaQueryResult.results.bindings);
      dbQuery = dbPediaResult;
      results = [...results, ...dbPediaResult];
    }

    if (type === "1" || type === "2" || type === "3") {
      const setLocalStoreResult = (result) => {
        const localStoreResult = parseLocalToData(result);
        localQuery = localStoreResult;
        results = [...results, ...localStoreResult];
        setQueryResult(results);

        if (type === "3") {
          setQueryResult(localQuery.map((a) => {
            let minDistance = 100, word;

            dbQuery.map((c) => {
              if (levenshtein(a.name, c.name) < minDistance) {
                minDistance = levenshtein(a.name, c.name);
                word = c;
              }
            });

            if (levenshtein(a.name , word.name) <= (Math.min(a.name.length, word.name.length) // 3)) {
              a.additionalInformation = word;
            }
 
            return a;
          }));
        }
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
