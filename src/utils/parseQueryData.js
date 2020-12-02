export const parseDbpediaToData = ((value) => {
  return value.map((data) => {
    let currentData = { "source": "DBpedia" };
    Object.keys(data).forEach((key) => {
      currentData[key] = data[key].value;
    });
    return currentData;
  });
});

export const parseLocalToData = (data) => {
  const parsedData = data.map((element) => {
    let data = { source: "Local" };
    Object.keys(element).forEach((key) => {
      data[key] = element[key].value;
    });

    return data;
  });
  return parsedData;
};
