/* eslint-disable @typescript-eslint/no-require-imports */

const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";

const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    createServer((req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    }).listen(port, (err) => {
      if (err) {
        console.error("Error starting server:", err);
        process.exit(1);
      }
      console.log(
        `> Server listening on port ${port} (NODE_ENV=${process.env.NODE_ENV || "development"})`
      );
    });
  })
  .catch((err) => {
    console.error("Error preparing Next app:", err);
    process.exit(1);
  });