// eslint-disable-next-line no-undef
const $rdf = require("rdflib");

const rowHandler = (qry_vars, results) => {
  const row = {};
  for (var r in results) {
    let found = false;
    let got_var = r.replace(/^\?/, "");
    if (qry_vars.length) {
      for (var i in qry_vars) {
        if (got_var === qry_vars[i].label) {
          found = true;
          continue;
        }
      }
      if (!found) continue;
    }
    row[got_var] = results[r].value;
  }
  return row;
};

export default function queryToLocalGraph(store, query) {
  var qry = $rdf.SPARQLToQuery(query, false, store);
  return new Promise((resolve, reject) => {
    const qry_vars = qry.vars;
    const resultArr = [];
    store.query(
      qry,
      results => {
        if (typeof results === "undefined") {
          reject("No results.");
        } else {
          let row = rowHandler(qry_vars, results);
          if (row) resultArr.push(row);
        }
      },
      {},
      () => {
        resolve(resultArr);
      }
    );
  });
}
