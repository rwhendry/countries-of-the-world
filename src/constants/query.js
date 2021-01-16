export const getCountryFromDbpedia = (value) => (`
  PREFIX dbo: <http://dbpedia.org/ontology/>
  PREFIX dbp: <http://dbpedia.org/property/>
  PREFIX foaf: <http://xmlns.com/foaf/0.1/>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

  SELECT DISTINCT
    ?name
    ?country
    (SAMPLE(?foundingDate) as ?foundingDate)
    (SAMPLE(?leader) as ?leader)
    (SAMPLE(?capital) as ?capital)
    (SAMPLE(?currency) as ?currency)
    ?abstract
  WHERE {
    ?country a dbo:Country ;
      dbo:abstract ?abstract ;
      rdfs:label ?name ;
      dbo:capital ?capitalObject .

    ?capitalObject foaf:name ?capital .

    OPTIONAL {
      ?country dbo:leaderFunction ?leaderObject .
      ?leaderObject dbo:person ?leaderPerson .
      ?leaderPerson foaf:name ?leader .
    }
    OPTIONAL {
      ?country dbo:currency ?currencyObject .
      ?currencyObject rdfs:label ?currency .
    }
    OPTIONAL { ?country dbp:establishedDate ?foundingDate }

    FILTER (LANG(?name)="en")
    FILTER (DATATYPE(?foundingDate)=xsd:date)
    FILTER (LANG(?leader)="en")
    FILTER (LANG(?capital)="en")
    FILTER (LANG(?currency)="en")
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
