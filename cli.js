#!/usr/bin/env node
const chalk = require("chalk");

const { getDir, getFile } = require("./src/getLinks");
const validationURLs = require("./src/validationURLs");

async function handleText(pathFile) {
  const typesValid = ["dir", "file"];
  let results;

  if (typesValid.includes(pathFile[2])) {
    const listOfUrls =
      pathFile[2] === typesValid[0]
        ? await getDir(pathFile[3])
        : await getFile(pathFile[3]);

    if (pathFile[4] === "validation") {
      results = await validationURLs(listOfUrls);
      console.log(chalk.yellow("list links verified:"), results);
    } else console.log(chalk.yellow("list links:"), listOfUrls);
  }
}

handleText(process.argv);
