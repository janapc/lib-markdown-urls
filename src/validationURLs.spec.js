const validationURLs = require("./validationURLs");
const axios = require("axios");

jest.mock("axios");

const listLinks = [
  {
    FileList: "https://developer.mozilla.org/pt-BR/docs/Web/API/FileList",
  },
];

const list2links = [
  [
    {
      FileList: "https://developer.mozilla.org/pt-BR/docs/Web/API/FileList",
    },
  ],
  [
    {
      HTMLCanvasElement:
        "https://developer.mozilla.org/pt-BR/docs/Web/API/HTMLCanvasElement",
    },
  ],
];

describe("validationURLs src", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("Should return array with links and statusCode of file", async () => {
    jest
      .spyOn(axios, "get")
      .mockResolvedValue({ status: 200, statusText: "OK" });
    await expect(validationURLs(listLinks)).resolves.toEqual([
      {
        FileList: "https://developer.mozilla.org/pt-BR/docs/Web/API/FileList",
        status: "200 - OK",
      },
    ]);
  });

  it("Should return array with links and statusCode if have 2 directories", async () => {
    jest
      .spyOn(axios, "get")
      .mockResolvedValue({ status: 200, statusText: "OK" });
    await expect(validationURLs(list2links)).resolves.toEqual([
      [
        {
          FileList: "https://developer.mozilla.org/pt-BR/docs/Web/API/FileList",
          status: "200 - OK",
        },
      ],
      [
        {
          HTMLCanvasElement:
            "https://developer.mozilla.org/pt-BR/docs/Web/API/HTMLCanvasElement",
          status: "200 - OK",
        },
      ],
    ]);
  });

  it("Should return error if the link is invalid", async () => {
    jest.spyOn(axios, "get").mockRejectedValue(new Error("Page not found"));
    await expect(validationURLs(list2links)).rejects.toThrow("Page not found");
  });
});
