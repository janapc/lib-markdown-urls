const getLinks = require("./getLinks");
const path = require("path");

const listLinks = [
  {
    FileList: "https://developer.mozilla.org/pt-BR/docs/Web/API/FileList",
  },
];

describe("getLinks src", () => {
  it("Should return array with results - getFile", async () => {
    const pathFiles = path.join(__dirname, "..", "tests/files/text-1.md");
    await expect(getLinks.getFile(pathFiles)).resolves.toEqual(listLinks);
  });

  it("Should return 'no links' - getFile", async () => {
    const pathFiles = path.join(__dirname, "..", "tests/files/text-2.md");

    await expect(getLinks.getFile(pathFiles)).resolves.toBe("no links");
  });

  it("Should return error if the file is invalid - getFile", async () => {
    const pathFiles = path.join(__dirname, "..", "tests/files/");

    await expect(getLinks.getFile(pathFiles)).rejects.toThrow(
      "EISDIR: illegal operation on a directory, read"
    );
  });

  it("Should return array with results - getDir", async () => {
    await expect(getLinks.getDir("tests/files")).resolves.toEqual([
      listLinks,
      "no links",
    ]);
  });

  it("Should return error if the path is invalid - getDir", async () => {
    await expect(getLinks.getDir("tests/banana")).rejects.toThrow(
      "ENOENT: no such file or directory, scandir '/home/janapc/Documents/alura/nodejs/lib-markdown-links/tests/banana'"
    );
  });
});
