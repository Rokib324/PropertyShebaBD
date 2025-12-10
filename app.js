/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * app.js - cPanel Custom Server Entry Point
 * This file is used for deploying Next.js applications on cPanel
 */

const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

// cPanel provides PORT via environment variable (Node.js Selector)
const port = parseInt(process.env.PORT || process.env.NODE_PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";

// Initialize Next.js app
const app = next({ dev });
const handle = app.getRequestHandler();

// Start server
app
  .prepare()
  .then(() => {
    // Create HTTP server
    const server = createServer((req, res) => {
      try {
        const parsedUrl = parse(req.url, true);
        handle(req, res, parsedUrl);
      } catch (err) {
        console.error("Error handling request:", err);
        if (!res.headersSent) {
          res.statusCode = 500;
          res.end("Internal Server Error");
        }
      }
    });

    // Start listening on port
    server.listen(port, (err) => {
      if (err) {
        console.error("❌ Failed to start server:", err);
        process.exit(1);
      }
      console.log("=".repeat(50));
      console.log(`✅ Server is running`);
      console.log(`📍 Port: ${port}`);
      console.log(`🌍 Environment: ${dev ? "development" : "production"}`);
      console.log(`🔗 Ready on http://localhost:${port}`);
      console.log("=".repeat(50));
    });

    // Graceful shutdown handlers (for cPanel)
    const gracefulShutdown = (signal) => {
      console.log(`\n${signal} received: shutting down gracefully...`);
      
      server.close((err) => {
        if (err) {
          console.error("Error closing server:", err);
          process.exit(1);
        }
        
        console.log("HTTP server closed");
        
        // Close Next.js app
        if (typeof app.close === "function") {
          app.close()
            .then(() => {
              console.log("Next.js app closed");
              process.exit(0);
            })
            .catch((closeErr) => {
              console.error("Error closing Next.js app:", closeErr);
              process.exit(1);
            });
        } else {
          process.exit(0);
        }
      });

      // Force shutdown after 10 seconds
      setTimeout(() => {
        console.error("⚠️  Forced shutdown after timeout");
        process.exit(1);
      }, 10000);
    };

    // Handle shutdown signals
    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
    process.on("SIGINT", () => gracefulShutdown("SIGINT"));

    // Handle uncaught exceptions
    process.on("uncaughtException", (err) => {
      console.error("❌ Uncaught Exception:", err);
      gracefulShutdown("uncaughtException");
    });

    // Handle unhandled promise rejections
    process.on("unhandledRejection", (reason, promise) => {
      console.error("❌ Unhandled Rejection at:", promise, "reason:", reason);
      gracefulShutdown("unhandledRejection");
    });
  })
  .catch((err) => {
    console.error("❌ Failed to prepare Next.js app:", err);
    process.exit(1);
  });
