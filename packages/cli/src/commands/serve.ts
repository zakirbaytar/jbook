import path from "path";
import { Command } from "commander";
import { serve } from "@jbookcli/local-api";
import { getErrorMessage } from "../utils";

const isProduction = process.env.NODE_ENV === "production";

interface Options {
  port: string;
}

export const serveCommand = new Command()
  .command("serve [filename]")
  .description("Open a file for editing")
  .option("-p, --port <port>", "Port to serve on", "4005")
  .action(async (filePath = "notebook.js", options: Options) => {
    const port = parseInt(options.port, 10);
    const dir = path.join(process.cwd(), path.dirname(filePath));
    const filename = path.basename(filePath);

    try {
      await serve({ port, filename, dir, useProxy: !isProduction });
    } catch (error: any) {
      const message = getErrorMessage(error, {
        port,
        filename,
      });

      console.error(message);
    }
  });
