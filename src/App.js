import React, { useCallback, useEffect, useState} from "react";

import {
  getCountryFromDbpedia,
  getCountryFromLocalGraph,
} from "constants/query";
import queryToDbpedia from "utils/queryToDbpedia";
import queryToLocalGraph from "utils/queryToLocalGraph";
import parseDbpediaToData from "utils/parseDbpedia";
import createStore, {parseLocalCSV, parseLocalToData } from "utils/parseLocalCsvWithRdfstore";
import Container from "components/Container";
// import {huehuehue} from "utils/parseLocalCsvWithRdfstore";

// eslint-disable-next-line no-undef
// const $rdf = require("rdflib");

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [localGraph, setLocalGraph] = useState(createStore());
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
      console.log(dbPediaResult);
      results.push(...dbPediaResult);
    }

    if (type === "1" || type === "2") {
      const localGraphQuery = getCountryFromLocalGraph(value);
      const localGraphResult = parseLocalToData(await queryToLocalGraph(localGraph, localGraphQuery));
      console.log(localGraphResult);
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
