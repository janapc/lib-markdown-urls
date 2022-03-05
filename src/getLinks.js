const fs = require("fs");
const path = require("path");

async function getFile(file) {
  try {
    const data = await fs.readFileSync(file, "utf-8");

    return extractLinks(data);
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getDir(dir) {
  const pathFiles = path.join(__dirname, "..", dir);
  try {
    const files = await fs.readdirSync(pathFiles, "utf-8");
    const results = await Promise.all(
      files.map(async (file) => await getFile(`${pathFiles}/${file}`))
    );

    return results;
  } catch (error) {
    throw new Error(error.message);
  }
}

function extractLinks(text) {
  const regex = /\[([^\]]*)\]\((https?:\/\/[^$#\s].[^\s]*)\)/gm;

  let temp;
  let results = [];
  while ((temp = regex.exec(text)) !== null) {
    results.push({ [temp[1]]: temp[2] });
  }

  return results.length === 0 ? "no links" : results;
}

module.exports = { getFile, getDir };
