const fs = require("fs");
const path = require("path");
const { marked } = require("marked");
const { write, copyDir, parseFrontmatter, preprocessMarkdown } = require("./utils");
const { shell } = require("./shell");

const SRC = path.join(__dirname, "..");
const DIST = path.join(SRC, "dist");

function buildNow() {
  const mdPath = path.join(SRC, "now", "now.md");
  if (!fs.existsSync(mdPath)) return console.warn("⚠ now/now.md not found, skipping");

  const { body: rawBody } = parseFrontmatter(fs.readFileSync(mdPath, "utf-8"));
  const body = preprocessMarkdown(rawBody);
  const html = marked(body);

  copyDir(path.join(SRC, "now", "files"), path.join(DIST, "now", "files"));

  write(path.join(DIST, "now", "index.html"), shell({
    content: html,
    title: "Shriyansh · now",
    section: "now",
  }));

  // Root index.html redirects to /now
  write(path.join(DIST, "index.html"), `<!DOCTYPE html>
<html><head><meta charset="UTF-8">
<meta http-equiv="refresh" content="0;url=/now" />
</head><body></body></html>`);

  console.log("✓ now");
}

module.exports = { buildNow };
