import { cpSync, existsSync, mkdirSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const standalone = path.join(root, ".next", "standalone");

if (!existsSync(standalone)) {
  console.warn("prepare-standalone: .next/standalone missing — skip asset copy");
  process.exit(0);
}

const publicDir = path.join(root, "public");
if (existsSync(publicDir)) {
  cpSync(publicDir, path.join(standalone, "public"), { recursive: true });
}

const staticDir = path.join(root, ".next", "static");
if (existsSync(staticDir)) {
  const dest = path.join(standalone, ".next", "static");
  mkdirSync(path.dirname(dest), { recursive: true });
  cpSync(staticDir, dest, { recursive: true });
}

console.log("prepare-standalone: copied public/ and .next/static into standalone output");
