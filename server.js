(async () => {
  const { createServer } = await import("http");
  const { parse } = await import("url");
  const next = (await import("next")).default;

  const port = parseInt(process.env.PORT || "3000", 10);
  const dev = process.env.NODE_ENV !== "production";

  const app = next({ dev, port }); // no hostname needed
  const handle = app.getRequestHandler();

  app.prepare().then(() => {
    createServer((req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    }).listen(port, () => {
      console.log(
        `> Server listening on port ${port} as ${dev ? "development" : "production"}`
      );
    });
  });
})();