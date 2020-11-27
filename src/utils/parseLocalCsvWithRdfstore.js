import Papa from "papaparse";
import { DataFrame } from "pandas-js";
import { tes } from "../constants/query";

const rdfstore = require("rdfstore");

const csvFilePath = "data/countries-of-the-world.csv";

var graph;
const graphUri = "http://www.samkok.cn/store/graph/countries-in-the-world";
function createStore() {
  try {
    var dataStore;
    new rdfstore.Store((err, store) => {
      if (!err) {
        console.log("No error creating store");
        // store.registerDefaultProfileNamespaces();
        // store.registerDefaultNamespace("SAM", "http://www.samkok.cn/resource/");

        ///// Tes pake graf
        graph = store.rdf.createGraph();
        // graph.addAction(store.rdf.createAction(store.rdf.filters.p(store.rdf.resolve("foaf:name")),
        //   function(triple){ var name = triple.object.valueOf();
        //     name = name.slice(0,1).toUpperCase()
        //     + name.slice(1, name.length);
        //     triple.object = store.rdf.createNamedNode(name);
        //     return triple;}));

        // store.rdf.setPrefix("SAM", "http://www.samkok.cn/resource/");
        // graph.add(store.rdf.createTriple( store.rdf.createNamedNode(store.rdf.resolve("SAM:Alice")),
        //   store.rdf.createNamedNode(store.rdf.resolve("foaf:name")),
        //   store.rdf.createLiteral("alice") ));

        // var triples = graph.match(null, store.rdf.createNamedNode(store.rdf.resolve("foaf:name")), null).toArray();

        // console.log(triples[0].subject.valueOf());
        // console.log(triples[0].predicate.valueOf());
        // console.log(triples[0].object.valueOf());
        // console.log("worked? "+(triples[0].object.valueOf() === "Alice"));

        store.insert(graph, graphUri, function(err) {console.log(err);});

        ///// Tes kalo insert data pake query
        store.registerDefaultProfileNamespaces();
        store.registerDefaultNamespace("sam", "http://www.samkok.cn/resource/");
        store.execute("INSERT DATA {  sam:person1 foaf:name \"Indonesia\" }", function(err){

          if (!err) {
            store.registerDefaultProfileNamespaces();

            store.execute("SELECT * { ?s foaf:name ?name }", function(err,results) {
              console.log("Heehe");
              console.log(results);
              console.log(results[0].name.value);
              // test.ok(results.length === 1);
              // test.ok(results[0].name.value === "Celia");
            });
          }
        });

        ////// Tes data yg keluar dari graf atau data yg dari query INSERT
        store.execute(tes("ndone"), function(err, results){
          if(!err) {
            console.log("Masuk ga eror");
            console.log(results);
            // process results
            if(results.length > 0 && results[0].s.token === "uri") {
              console.log(results[0].s.value);
              console.log(results[0].p.value);
              console.log(results[0].o.value);
            } else if (results.length == 0) {
              console.log("Empty dude");
            }
          } else {
            console.log("Masuk eror");
            console.log(err);
          }
        });
      }
      dataStore = store;
    });
    console.log("dataStore");
    console.log(dataStore);
    return dataStore;
  } catch (err) {
    console.log("[parseLocalCsvWithRdfstore::createStore] Error when creating store");
    console.log(err);
    return null;
  }
}

export async function executeQuery(store, query) {
  try {
    console.log("executeQuery");
    store.registerDefaultProfileNamespaces();
    store.registerDefaultNamespace("SAM", "http://www.samkok.cn/resource/");
    // store.execute(getCountryFromLocalGraph, function(err,results) {
    //   console.log(results);
    //   err;
    //   results;
    // });

    // store.insert(graph, graphUri, function() {});
    // store.graph(graphUri, function(err, graph){
    //   var serialized = graph.toNT();
    //   console.log(serialized);
    // });
    console.log(query);
    console.log(store);
    var res;
    await store.execute("SELECT * { ?s ?p ?o }", function(err, results){
      if(!err) {
        console.log("Masuk ga eror");
        console.log(results);
        res = results;
        // process results
        if(results.length > 0 && results[0].s.token === "uri") {
          console.log(results[0].s.value);
          console.log(results[0].p.value);
          console.log(results[0].o.value);
        } else if (results.length == 0) {
          console.log("Empty dude");
        }
      } else {
        console.log("Masuk eror");
        console.log(err);
      }
    });
    console.log("Habis query");
    console.log(res);
    return res;
  } catch (err) {
    console.log("[parseLocalCsvWithRdfstore::executeQuery] Error when executing query");
    console.log(err);
    return [];
  }
}

const addLiteralTriple = (store, subj, pred, obj, type) => {
  try {
    store.registerDefaultProfileNamespaces();
    store.registerDefaultNamespace("sam", "http://www.samkok.cn/resource/");
    let query = `INSERT DATA {  sam:${subj} sam:${pred} "${obj}" }`;
    store.execute(query, function(err){
      if (err) {console.log("addLiteralTriple::" + type + err);}
    });
  } catch (err) {
    console.log("[parseLocalCsvWithRdfstore::addLiteralTriple] Error when add literal triple");
    console.log(err);
  }
};

const addDataToStore = (store, df) => {
  for(const [row] of df.iterrows()) {
    addLiteralTriple(store, row.get("Country").replace(/\s/g,"_").replace(/[^_a-zA-Z0-9]/g,"-").toLowerCase(), "name", row.get("Country"), "string");
    addLiteralTriple(store, row.get("Country").replace(/\s/g,"_").replace(/[^_a-zA-Z0-9]/g,"-").toLowerCase(), "inRegion", row.get("Region"), "string");
    addLiteralTriple(store, row.get("Country").replace(/\s/g,"_").replace(/[^_a-zA-Z0-9]/g,"-").toLowerCase(), "population", row.get("Population"), "long");
    addLiteralTriple(store, row.get("Country").replace(/\s/g,"_").replace(/[^_a-zA-Z0-9]/g,"-").toLowerCase(), "areaInSquareMile", row.get("Area (sq. mi.)"), "long");
    addLiteralTriple(store, row.get("Country").replace(/\s/g,"_").replace(/[^_a-zA-Z0-9]/g,"-").toLowerCase(), "populationDensityPerSquareMile", row.get("Pop. Density (per sq. mi.)"), "double");
    addLiteralTriple(store, row.get("Country").replace(/\s/g,"_").replace(/[^_a-zA-Z0-9]/g,"-").toLowerCase(), "coastlineRatio", row.get("Coastline (coast/area ratio)"), "double");
    addLiteralTriple(store, row.get("Country").replace(/\s/g,"_").replace(/[^_a-zA-Z0-9]/g,"-").toLowerCase(), "netMigration", row.get("Net migration"), "double");
    addLiteralTriple(store, row.get("Country").replace(/\s/g,"_").replace(/[^_a-zA-Z0-9]/g,"-").toLowerCase(), "infantMortalityPer1000", row.get("Infant mortality (per 1000 births)"), "double");
    addLiteralTriple(store, row.get("Country").replace(/\s/g,"_").replace(/[^_a-zA-Z0-9]/g,"-").toLowerCase(), "gdpPerCapita", row.get("GDP ($ per capita)"), "long");
    addLiteralTriple(store, row.get("Country").replace(/\s/g,"_").replace(/[^_a-zA-Z0-9]/g,"-").toLowerCase(), "literacyPercent", row.get("Literacy (%)"), "double");
    addLiteralTriple(store, row.get("Country").replace(/\s/g,"_").replace(/[^_a-zA-Z0-9]/g,"-").toLowerCase(), "phonesPer1000", row.get("Phones (per 1000)"), "double");
    addLiteralTriple(store, row.get("Country").replace(/\s/g,"_").replace(/[^_a-zA-Z0-9]/g,"-").toLowerCase(), "arablePercent", row.get("Arable (%)"), "double");
    addLiteralTriple(store, row.get("Country").replace(/\s/g,"_").replace(/[^_a-zA-Z0-9]/g,"-").toLowerCase(), "cropsPercent", row.get("Crops (%)"), "double");
    addLiteralTriple(store, row.get("Country").replace(/\s/g,"_").replace(/[^_a-zA-Z0-9]/g,"-").toLowerCase(), "otherPercent", row.get("Other (%)"), "double");
    addLiteralTriple(store, row.get("Country").replace(/\s/g,"_").replace(/[^_a-zA-Z0-9]/g,"-").toLowerCase(), "climate", row.get("Climate"), "double");
    addLiteralTriple(store, row.get("Country").replace(/\s/g,"_").replace(/[^_a-zA-Z0-9]/g,"-").toLowerCase(), "birthrate", row.get("Birthrate"), "double");
    addLiteralTriple(store, row.get("Country").replace(/\s/g,"_").replace(/[^_a-zA-Z0-9]/g,"-").toLowerCase(), "deathrate", row.get("Deathrate"), "double");
    addLiteralTriple(store, row.get("Country").replace(/\s/g,"_").replace(/[^_a-zA-Z0-9]/g,"-").toLowerCase(), "agriculture", row.get("Agriculture"), "double");
    addLiteralTriple(store, row.get("Country").replace(/\s/g,"_").replace(/[^_a-zA-Z0-9]/g,"-").toLowerCase(), "industry", row.get("Industry"), "double");
    addLiteralTriple(store, row.get("Country").replace(/\s/g,"_").replace(/[^_a-zA-Z0-9]/g,"-").toLowerCase(), "service", row.get("Service"), "double");
  }
};

export const parseLocalCSV = async (store) => {
  await fetch(csvFilePath)
    .then(response => response.text())
    .then(text => {
      const result = Papa.parse(text, { header: true });
      const df = new DataFrame(result.data);
      addDataToStore(store, df);
    });

  return store;
};

export const parseLocalToData = (data) => {
  try {
    const parsedData = data.map((element) => {
      let data = {
        ...element,
        source: "Local",
      };

      return data;
    });
    return parsedData;
  } catch (err) {
    console.log("[parseLocalCsvWithRdfstore::parseLocalToData] Error when parse local to data");
    console.log(err);
    return data;
  }
};

export default createStore;