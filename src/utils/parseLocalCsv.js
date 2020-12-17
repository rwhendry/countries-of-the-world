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

  const parseCountry = (country) => {
    country = country.replace("N.", "Northern");
    country = country.replace("Is.", "Island");
    country = country.replace("Dem.", "Democratics");
    country = country.replace("Rep.", "Republics");
    country = country.replace("Repub.", "Republics");
    country = country.replace("&", "and");
    country = country.replace("Fed.", "Federated");
    country = country.replace("St.", "States");

    country = country.split(", ").length === 2 ? country.split(", ")[1]  + " " + country.split(", ")[0] : country;

    return country;
  };

  for(const [row] of df.iterrows()) {
    const country = parseCountry(row.get("Country"));

    query += addLiteralTriple(row.get("Country").replace(/\s/g,"_").replace(/[^_a-zA-Z0-9]/g,"-").toLowerCase(), "name", country, "string");
    query += addLiteralTriple(row.get("Country").replace(/\s/g,"_").replace(/[^_a-zA-Z0-9]/g,"-").toLowerCase(), "inRegion", row.get("Region"), "string");
    query += addLiteralTriple(row.get("Country").replace(/\s/g,"_").replace(/[^_a-zA-Z0-9]/g,"-").toLowerCase(), "population", row.get("Population"), "long");
    query += addLiteralTriple(row.get("Country").replace(/\s/g,"_").replace(/[^_a-zA-Z0-9]/g,"-").toLowerCase(), "areaInSquareMile", row.get("Area (sq. mi.)"), "long");
    query += addLiteralTriple(row.get("Country").replace(/\s/g,"_").replace(/[^_a-zA-Z0-9]/g,"-").toLowerCase(), "gdpPerCapita", row.get("GDP ($ per capita)"), "long");
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
