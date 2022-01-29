import express from "express";
import fs from "fs/promises";
import path from "path";

interface Cell {
  id: string;
  content: string;
  type: "markdown" | "code";
}

export function createCellsRouter(filename: string, dir: string) {
  const router = express.Router();
  const fullPath = path.join(dir, filename);

  router.get("/", async (req, res) => {
    try {
      const result = await fs.readFile(fullPath, { encoding: "utf-8" });
      const cells: Cell[] = JSON.parse(result);
      return res.json({ cells });
    } catch (error: any) {
      if (error.code === "ENOENT") {
        await fs.writeFile(fullPath, "[]", { encoding: "utf-8" });
        return res.json({ cells: [] });
      } else {
        return res.status(500).json({ error: error.message });
      }
    }
  });

  router.post("/", async (req, res) => {
    const { cells }: { cells: Cell[] } = req.body;
    await fs.writeFile(fullPath, JSON.stringify(cells, null, 2), "utf8");
    return res.json({ status: "ok" });
  });

  return router;
}
