import React, { useCallback, useEffect, useState} from "react";

import {
  getCountryFromDbpedia,
  getCountryFromLocalGraph,
} from "constants/query";
import queryToDbpedia from "utils/queryToDbpedia";
import queryToLocalGraph from "utils/queryToLocalGraph";
import parseDbpediaToData from "utils/parseDbpedia";
import parseLocalCSV, { parseLocalToData } from "utils/parseLocalCsv";
import Container from "components/Container";

// eslint-disable-next-line no-undef
const $rdf = require("rdflib");

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [localGraph, setLocalGraph] = useState($rdf.graph());
  const [queryResult, setQueryResult] = useState([]);
  const [selectedResult, setSelectedResult] = useState({});

  useEffect(async () => {
    setIsLoading(true);
    await parseLocalCSV(localGraph);
    setLocalGraph(localGraph);
    setIsLoading(false);
  }, []);

  const onSearch = useCallback(async (value, type) => {
    value = value.toLowerCase();
    let results = [];
    if (type === "0" || type === "2") {
      const dbPediaQuery = getCountryFromDbpedia(value);
      const dbPediaQueryResult = await queryToDbpedia(dbPediaQuery);
      const dbPediaResult = parseDbpediaToData(dbPediaQueryResult.results.bindings);
      results.push(...dbPediaResult);
    }

    if (type === "1" || type === "2") {
      const localGraphQuery = getCountryFromLocalGraph(value);
      const localGraphQueryResult = await queryToLocalGraph(localGraph, localGraphQuery);
      const localGraphResult = parseLocalToData(localGraphQueryResult);
      results.push(...localGraphResult);
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
