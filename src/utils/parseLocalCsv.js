import Papa from "papaparse";
import { DataFrame } from "pandas-js";

// eslint-disable-next-line no-undef
const $rdf = require("rdflib");

const csvFilePath = "data/countries-of-the-world.csv";

const XSD = new $rdf.Namespace("http://www.w3.org/2001/XMLSchema#");
const SAM = new $rdf.Namespace("http://www.samkok.cn/resource/");

const addLiteralTriple = (graph, subj, pred, obj, type) => {
  graph.add(SAM(subj), SAM(pred), $rdf.lit(obj, "", XSD(type)));
};

const addDataToGraph = (graph, df) => {
  for(const [row] of df.iterrows()) {
    addLiteralTriple(graph, row.get("Country").replace(/\s/g,"_").toLowerCase(), "name", row.get("Country"), "string");
    addLiteralTriple(graph, row.get("Country").replace(/\s/g,"_").toLowerCase(), "inRegion", row.get("Region"), "string");
    addLiteralTriple(graph, row.get("Country").replace(/\s/g,"_").toLowerCase(), "population", row.get("Population"), "long");
    addLiteralTriple(graph, row.get("Country").replace(/\s/g,"_").toLowerCase(), "areaInSquareMile", row.get("Area (sq. mi.)"), "long");
    addLiteralTriple(graph, row.get("Country").replace(/\s/g,"_").toLowerCase(), "populationDensityPerSquareMile", row.get("Pop. Density (per sq. mi.)"), "double");
    addLiteralTriple(graph, row.get("Country").replace(/\s/g,"_").toLowerCase(), "coastlineRatio", row.get("Coastline (coast/area ratio)"), "double");
    addLiteralTriple(graph, row.get("Country").replace(/\s/g,"_").toLowerCase(), "netMigration", row.get("Net migration"), "double");
    addLiteralTriple(graph, row.get("Country").replace(/\s/g,"_").toLowerCase(), "infantMortalityPer1000", row.get("Infant mortality (per 1000 births)"), "double");
    addLiteralTriple(graph, row.get("Country").replace(/\s/g,"_").toLowerCase(), "gdpPerCapita", row.get("GDP ($ per capita)"), "long");
    addLiteralTriple(graph, row.get("Country").replace(/\s/g,"_").toLowerCase(), "literacyPercent", row.get("Literacy (%)"), "double");
    addLiteralTriple(graph, row.get("Country").replace(/\s/g,"_").toLowerCase(), "phonesPer1000", row.get("Phones (per 1000)"), "double");
    addLiteralTriple(graph, row.get("Country").replace(/\s/g,"_").toLowerCase(), "arablePercent", row.get("Arable (%)"), "double");
    addLiteralTriple(graph, row.get("Country").replace(/\s/g,"_").toLowerCase(), "cropsPercent", row.get("Crops (%)"), "double");
    addLiteralTriple(graph, row.get("Country").replace(/\s/g,"_").toLowerCase(), "otherPercent", row.get("Other (%)"), "double");
    addLiteralTriple(graph, row.get("Country").replace(/\s/g,"_").toLowerCase(), "climate", row.get("Climate"), "double");
    addLiteralTriple(graph, row.get("Country").replace(/\s/g,"_").toLowerCase(), "birthrate", row.get("Birthrate"), "double");
    addLiteralTriple(graph, row.get("Country").replace(/\s/g,"_").toLowerCase(), "deathrate", row.get("Deathrate"), "double");
    addLiteralTriple(graph, row.get("Country").replace(/\s/g,"_").toLowerCase(), "agriculture", row.get("Agriculture"), "double");
    addLiteralTriple(graph, row.get("Country").replace(/\s/g,"_").toLowerCase(), "industry", row.get("Industry"), "double");
    addLiteralTriple(graph, row.get("Country").replace(/\s/g,"_").toLowerCase(), "service", row.get("Service"), "double");
  }
};

export const parseLocalToData = (data) => {
  const parsedData = data.map((element) => {
    let data = {
      ...element,
      source: "Local",
    };

    return data;
  });
  return parsedData;
};

const parseLocalCSV = async (graph) => {
  await fetch(csvFilePath)
    .then(response => response.text())
    .then(text => {
      const result = Papa.parse(text, { header: true });
      const df = new DataFrame(result.data);
      addDataToGraph(graph, df);
    });

  return graph;
};

export default parseLocalCSV;
