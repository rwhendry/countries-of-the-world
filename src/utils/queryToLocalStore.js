export default function queryToLocalStore(store, query) {
  let queryResult;
  store.execute(query, function(err, results){
    if (err) {
      console.log("[query] Error querying: " + err);
    } else {
      queryResult = results;
    }
  });
  return queryResult;
}
