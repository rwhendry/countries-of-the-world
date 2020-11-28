export const getCountryFromDbpedia = (value) => (`
  PREFIX dbo: <http://dbpedia.org/ontology/>
  PREFIX dbr: <http://dbpedia.org/resource/>

  SELECT DISTINCT ?name (MAX(?population) as ?population) (MAX(?area) as ?area) (MAX(?gdp) as ?gdp) ?capital ?currency
  WHERE {
    ?country a dbo:Country ;
             rdfs:label ?name ;
             dbo:populationTotal ?population ;
             dbo:areaTotal ?area ;
             dbp:gdpPppPerCapita ?gdp ;
             dbo:capital ?capitalObject;
             dbo:currency ?currencyObject .
    ?capitalObject foaf:name ?capital .
    ?currencyObject foaf:name ?currency .

    FILTER (LANG(?name)="en")
    FILTER (REGEX(str(?name), "${value}", "i"))
    FILTER NOT EXISTS { ?country dbo:dissolutionYear ?yearEnd }
  }
  LIMIT 10
`);

export const getCountryFromLocalStore = (value) => (`
  SELECT ?name
  WHERE {
    ?country SAM:name "${value}" .
  }
`);
