const fs = require("node:fs");
const path = require("node:path");

const sourcePath = path.resolve(__dirname, "..", "public", "manifest.json");
const targetPath = path.resolve(__dirname, "..", "dist", "manifest.json");

fs.mkdirSync(path.dirname(targetPath), { recursive: true });
fs.copyFileSync(sourcePath, targetPath);
