// app.js (or server.js) - cPanel entry point in CommonJS
const { createServer } = require("http");
const next = require("next");
const { parse } = require("url");

// cPanel will usually set PORT or NODE_PORT
const port = parseInt(process.env.PORT || process.env.NODE_PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";

// Pass hostname + port (recommended for newer Next.js versions)
const app = next({
  dev,
  hostname: "0.0.0.0", // listen on all interfaces
  port,
});

const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
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

    // cPanel/Passenger handles the actual binding externally,
    // we just listen on the provided port
    server.listen(port, (err) => {
      if (err) {
        console.error("Failed to start server:", err);
        process.exit(1);
      }
      console.log(`> Ready on port ${port}`);
      console.log(`> Environment: ${dev ? "development" : "production"}`);
    });

    // Optional: graceful shutdown (won't hurt if signals are never sent)
    const gracefulShutdown = (signal) => {
      console.log(`\n${signal} received: closing HTTP server`);
      server.close(() => {
        console.log("HTTP server closed");

        // app.close() exists in newer Next.js; guard it just in case
        if (typeof app.close === "function") {
          app
            .close()
            .then(() => {
              console.log("Next.js app closed");
              process.exit(0);
            })
            .catch((err) => {
              console.error("Error closing Next.js app:", err);
              process.exit(1);
            });
        } else {
          process.exit(0);
        }
      });

      // Force close after 10 seconds
      setTimeout(() => {
        console.error("Forced shutdown after timeout");
        process.exit(1);
      }, 10000);
    };

    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
    process.on("SIGINT", () => gracefulShutdown("SIGINT"));
  })
  .catch((err) => {
    console.error("Failed to prepare Next.js app:", err);
    process.exit(1);
  });