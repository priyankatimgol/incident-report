const getDataFromJson = (key, jsonData) => {
  if (!jsonData) {
    return null;
  }
  try {
    const data = JSON.parse(jsonData);
    return key.split('.').reduce((r, e) => r[e], data);
  } catch (e) {
    console.error('Error [getDataFromJson] getting data from JSON: ' + jsonData);
    return null;
  }
};

export default getDataFromJson;
