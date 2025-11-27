/* eslint-disable @typescript-eslint/no-require-imports */
// cPanel entry point - must use CommonJS (require) instead of ES modules
const { createServer } = require("http");
const next = require("next");
const { parse } = require("url");

// cPanel provides PORT via environment variable
const port = parseInt(process.env.PORT || process.env.NODE_PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
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

  // cPanel handles hostname binding automatically
  server.listen(port, (err) => {
    if (err) {
      console.error("Failed to start server:", err);
      process.exit(1);
    }
    console.log(`> Ready on port ${port}`);
    console.log(`> Environment: ${dev ? "development" : "production"}`);
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

