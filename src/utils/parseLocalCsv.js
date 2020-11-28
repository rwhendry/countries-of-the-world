import Papa from "papaparse";
import { DataFrame } from "pandas-js";

// eslint-disable-next-line no-undef
var rdfstore = require("rdfstore");

const csvFilePath = "data/countries-of-the-world.csv";

const addLiteralTriple = (subj, pred, obj) => {
  return `sam:${subj} sam:${pred} "${obj}". `;
};

export const addDataToStore = (store, df) => {
  let query = "INSERT DATA { ";

  for(const [row] of df.iterrows()) {
    query += addLiteralTriple(row.get("Country").replace(/\s/g,"_").replace(/[^_a-zA-Z0-9]/g,"-").toLowerCase(), "name", row.get("Country"), "string");
    query += addLiteralTriple(row.get("Country").replace(/\s/g,"_").replace(/[^_a-zA-Z0-9]/g,"-").toLowerCase(), "inRegion", row.get("Region"), "string");
    query += addLiteralTriple(row.get("Country").replace(/\s/g,"_").replace(/[^_a-zA-Z0-9]/g,"-").toLowerCase(), "population", row.get("Population"), "long");
    query += addLiteralTriple(row.get("Country").replace(/\s/g,"_").replace(/[^_a-zA-Z0-9]/g,"-").toLowerCase(), "areaInSquareMile", row.get("Area (sq. mi.)"), "long");
    query += addLiteralTriple(row.get("Country").replace(/\s/g,"_").replace(/[^_a-zA-Z0-9]/g,"-").toLowerCase(), "populationDensityPerSquareMile", row.get("Pop. Density (per sq. mi.)"), "double");
    query += addLiteralTriple(row.get("Country").replace(/\s/g,"_").replace(/[^_a-zA-Z0-9]/g,"-").toLowerCase(), "coastlineRatio", row.get("Coastline (coast/area ratio)"), "double");
    query += addLiteralTriple(row.get("Country").replace(/\s/g,"_").replace(/[^_a-zA-Z0-9]/g,"-").toLowerCase(), "netMigration", row.get("Net migration"), "double");
    query += addLiteralTriple(row.get("Country").replace(/\s/g,"_").replace(/[^_a-zA-Z0-9]/g,"-").toLowerCase(), "infantMortalityPer1000", row.get("Infant mortality (per 1000 births)"), "double");
    query += addLiteralTriple(row.get("Country").replace(/\s/g,"_").replace(/[^_a-zA-Z0-9]/g,"-").toLowerCase(), "gdpPerCapita", row.get("GDP ($ per capita)"), "long");
    query += addLiteralTriple(row.get("Country").replace(/\s/g,"_").replace(/[^_a-zA-Z0-9]/g,"-").toLowerCase(), "literacyPercent", row.get("Literacy (%)"), "double");
    query += addLiteralTriple(row.get("Country").replace(/\s/g,"_").replace(/[^_a-zA-Z0-9]/g,"-").toLowerCase(), "phonesPer1000", row.get("Phones (per 1000)"), "double");
    query += addLiteralTriple(row.get("Country").replace(/\s/g,"_").replace(/[^_a-zA-Z0-9]/g,"-").toLowerCase(), "arablePercent", row.get("Arable (%)"), "double");
    query += addLiteralTriple(row.get("Country").replace(/\s/g,"_").replace(/[^_a-zA-Z0-9]/g,"-").toLowerCase(), "cropsPercent", row.get("Crops (%)"), "double");
    query += addLiteralTriple(row.get("Country").replace(/\s/g,"_").replace(/[^_a-zA-Z0-9]/g,"-").toLowerCase(), "otherPercent", row.get("Other (%)"), "double");
    query += addLiteralTriple(row.get("Country").replace(/\s/g,"_").replace(/[^_a-zA-Z0-9]/g,"-").toLowerCase(), "climate", row.get("Climate"), "double");
    query += addLiteralTriple(row.get("Country").replace(/\s/g,"_").replace(/[^_a-zA-Z0-9]/g,"-").toLowerCase(), "birthrate", row.get("Birthrate"), "double");
    query += addLiteralTriple(row.get("Country").replace(/\s/g,"_").replace(/[^_a-zA-Z0-9]/g,"-").toLowerCase(), "deathrate", row.get("Deathrate"), "double");
    query += addLiteralTriple(row.get("Country").replace(/\s/g,"_").replace(/[^_a-zA-Z0-9]/g,"-").toLowerCase(), "agriculture", row.get("Agriculture"), "double");
    query += addLiteralTriple(row.get("Country").replace(/\s/g,"_").replace(/[^_a-zA-Z0-9]/g,"-").toLowerCase(), "industry", row.get("Industry"), "double");
    query += addLiteralTriple(row.get("Country").replace(/\s/g,"_").replace(/[^_a-zA-Z0-9]/g,"-").toLowerCase(), "service", row.get("Service"), "double");
  }

  query += "}";

  store.execute(query, function(err){
    if (err) { console.log("[addLiteralTriple] Error inserting: " + err); }
  });
};

const parseLocalCSV = async() => {
  let resultDF;
  await fetch(csvFilePath)
    .then(response => response.text())
    .then(text => {
      const result = Papa.parse(text, { header: true });
      const df = new DataFrame(result.data);
      resultDF = df;
    });
  return resultDF;
};

async function createStore(localStore) {
  rdfstore.create(async function(err, store) {
    if (err) {
      console.log("[rdfstore.create] Error creating store: " + err);
    } else {
      console.log("[rdfstore.create] Creating store success");
      store.registerDefaultProfileNamespaces();
      store.registerDefaultNamespace("sam", "http://www.samkok.cn/resource/");
      const df = await parseLocalCSV();
      addDataToStore(store, df);
      localStore.obj = store;
    }
  });
}

export default createStore;
