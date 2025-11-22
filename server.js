/* eslint-disable @typescript-eslint/no-require-imports */
const { createServer } = require("http");

const next = require("next");
const { parse } = require("url");

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME || "0.0.0.0";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    } catch (err) {
      console.error("Error occurred handling", req.url, err);
      res.statusCode = 500;
      res.end("internal server error");
    }
  });

  server.listen(port, hostname, (err) => {
    if (err) {
      console.error("Failed to start server:", err);
      process.exit(1);
    }
    console.log(`> Ready on http://${hostname}:${port}`);
  });

  // Graceful shutdown handling
  const gracefulShutdown = (signal) => {
    console.log(`\n${signal} received: closing HTTP server`);
    server.close(() => {
      console.log("HTTP server closed");
      app.close().then(() => {
        console.log("Next.js app closed");
        process.exit(0);
      });
    });

    // Force close after 10 seconds
    setTimeout(() => {
      console.error("Forced shutdown after timeout");
      process.exit(1);
    }, 10000);
  };

  process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
  process.on("SIGINT", () => gracefulShutdown("SIGINT"));
}).catch((err) => {
  console.error("Failed to prepare Next.js app:", err);
  process.exit(1);
});