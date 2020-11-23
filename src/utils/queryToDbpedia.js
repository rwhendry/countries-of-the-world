import dps from "dbpedia-sparql-client";
import { toast } from "react-toastify";

export default async function queryToDbpedia(query) {
  let data;
  const setData = (response) => data = response;

  await dps
    .client() 
    .query(query)
    .timeout(10000)
    .asJson()
    .then(response => { setData(response); })
    .catch(error => { toast.error(String(error)); });

  return data;
}
