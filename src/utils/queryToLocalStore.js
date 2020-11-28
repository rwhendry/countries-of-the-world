export default function queryToLocalStore(store, query, callback) {
  store.execute(query, function(err, results){
    if (err) {
      console.log("[query] Error querying: " + err);
    } else {
      console.log(results);
      callback(results);
    }
  });
}
