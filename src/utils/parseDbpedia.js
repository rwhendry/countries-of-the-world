const parseDbpediaToData = ((value) => {
  return value.map((data) => {
    let currentData = {
      "source": "DBpedia",
    };

    Object.keys(data).map((key) => {
      console.log(data[key]);
      currentData[key] = data[key]["value"];
    });

    return currentData;
  });
});

export default parseDbpediaToData;