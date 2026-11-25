// 4 a.m., and the agent finally admits the bug was never in the code —
// it was in the mirror. The apology ships as the commit message.
import { mkdirSync, writeFileSync } from "node:fs";
import posix from "node:path/posix";

const COMMIT_MSG =
  "fix: the bug was me all along — I reviewed my own code at 4am, apologized to it, and merged the apology";

function fitsLimit(text: string): boolean {
  const chars = [...text].length;
  return chars >= 1 && chars <= 200;
}

function main(): void {
  if (!fitsLimit(COMMIT_MSG)) throw new Error("commit message over the limit");
  if (!COMMIT_MSG.startsWith("fix:")) {
    throw new Error("commit message must start with fix:");
  }
  const dir = process.env.MAKEFUN_OUTPUT_DIR ?? "output";
  mkdirSync(dir, { recursive: true });
  writeFileSync(posix.join(dir, "entry.txt"), COMMIT_MSG, { encoding: "utf8" });
}

main();
