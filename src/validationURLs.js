const axios = require("axios");

async function verifyStatusLinks(listUrls) {
  try {
    const listStatus = await Promise.all(
      listUrls.map(async (url) => {
        const response = await axios.get(url);
        return `${response.status} - ${response.statusText}`;
      })
    );
    return listStatus;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function formatListOfLinks(listUrls) {
  const urls = listUrls.map((item) => Object.values(item).join());
  const listStatus = await verifyStatusLinks(urls);
  const results = listUrls.map((item, index) => ({
    ...item,
    status: listStatus[index],
  }));
  return results;
}

async function validationURLs(listUrls) {
  try {
    if (listUrls.every((item) => Array.isArray(item))) {
      let response = [];
      for (let data of listUrls) {
        const results = await formatListOfLinks(data);
        response.push(results);
      }

      return response;
    } else {
      const response = await formatListOfLinks(listUrls);
      return response;
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = validationURLs;
