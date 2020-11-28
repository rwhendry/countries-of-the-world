export const parseDbpediaToData = ((value) => {
  return value.map((data) => {
    let currentData = {
      "source": "DBpedia",
    };

    Object.keys(data).map((key) => {
      currentData[key] = data[key]["value"];
    });

    return currentData;
  });
});

export const parseLocalToData = (data) => {
  const parsedData = data.map((element) => {
    let data = {
      ...element,
      source: "Local",
    };

    return data;
  });
  return parsedData;
};
