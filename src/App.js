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

  const levenshtein = (a, b) => {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;
    let tmp, i, j, prev, val, row;
    // swap to save some memory O(min(a,b)) instead of O(a)
    if (a.length > b.length) {
      tmp = a;
      a = b;
      b = tmp;
    }

    row = Array(a.length + 1);
    // init the row
    for (i = 0; i <= a.length; i++) {
      row[i] = i;
    }

    // fill in the rest
    for (i = 1; i <= b.length; i++) {
      prev = i;
      for (j = 1; j <= a.length; j++) {
        if (b[i - 1] === a[j - 1]) {
          val = row[j - 1]; // match
        } else {
          val = Math.min(row[j - 1] + 1, // substitution
            Math.min(prev + 1,     // insertion
              row[j] + 1));  // deletion
        }
        row[j - 1] = prev;
        prev = val;
      }
      row[a.length] = prev;
    }
    return row[a.length];
  };

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
            let mini = 100, word;

            dbQuery.map((c) => {
              if (levenshtein(a.name, c.name) < mini) {
                mini = levenshtein(a.name, c.name);
                word = c;
              }
            });

            a.additionalInformation = word;
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
