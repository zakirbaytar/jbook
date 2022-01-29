import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import path from "path";

import { createCellsRouter } from "./routes/cells";

interface ServeOptions {
  port: number;
  filename: string;
  dir: string;
  useProxy: boolean;
}

export const serve = ({ port, filename, dir, useProxy }: ServeOptions) => {
  const app = express();
  app.use(express.json());
  app.use("/cells", createCellsRouter(filename, dir));

  if (useProxy) {
    app.use(
      createProxyMiddleware({
        target: "http://localhost:3000",
        ws: true,
        logLevel: "silent",
      })
    );
  } else {
    const packagePath = require.resolve(
      "@jbookcli/local-client/build/index.html"
    );
    app.use(express.static(path.dirname(packagePath)));
  }

  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on("error", reject);
  });
};
