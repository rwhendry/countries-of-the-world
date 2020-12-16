export const getCountryFromDbpedia = (value) => (`
  PREFIX dbo: <http://dbpedia.org/ontology/>
  PREFIX dbr: <http://dbpedia.org/resource/>

  SELECT DISTINCT
    ?name
    ?country
    (MAX(?foundingDate) as ?foundingDate)
    (SAMPLE(?leader) as ?leader)
    (SAMPLE(?capital) as ?capital)
    (SAMPLE(?currency) as ?currency)
    ?abstract
  WHERE {
    ?country a dbo:Country ;
             rdfs:label ?name ;
             dbo:capital ?capitalObject ;
             dbo:abstract ?abstract ;
             dbo:leader ?leaderObject .
    
    ?capitalObject foaf:name ?capital .
    ?leaderObject foaf:name ?leader .

    OPTIONAL {
      ?country dbo:currency ?currencyObject ;
               dbo:foundingDate ?foundingDate .

      ?currencyObject foaf:name ?currency .
    }

    FILTER (LANG(?name)="en")
    FILTER (LANG(?abstract)="en")
    FILTER (REGEX(str(?name), "${value}", "i"))
    FILTER NOT EXISTS { ?country dbo:dissolutionYear ?yearEnd }
  }
`);

export const getCountryFromLocalStore = value => (`
  PREFIX SAM: <http://www.samkok.cn/resource/>

  SELECT
    ?name ?region ?population ?area ?gdp ?birthrate ?deathrate ?agricultureIncomeRatio ?industryIncomeRatio ?serviceIncomeRatio
  WHERE {
    ?country SAM:name ?name ;
             SAM:inRegion ?region ;
             SAM:population ?population ;
             SAM:areaInSquareMile ?area ;
             SAM:gdpPerCapita ?gdp ;
             SAM:birthrate ?birthrate ;
             SAM:deathrate ?deathrate ;
             SAM:agriculture ?agricultureIncomeRatio ;
             SAM:industry ?industryIncomeRatio ;
             SAM:service ?serviceIncomeRatio .

    FILTER (
      REGEX(str(?name), "${value}", "i")
    )
  }
`);
