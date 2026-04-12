const fs = require("fs");
const path = require("path");

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function write(filePath, content) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content, "utf-8");
}

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  ensureDir(dest);
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(srcPath, destPath);
    else fs.copyFileSync(srcPath, destPath);
  }
}

function parseFrontmatter(raw) {
  const meta = { title: "", date: "", description: "" };
  const lines = raw.split("\n");
  if (lines[0].trim() !== "---") return { meta, body: raw };
  let i = 1;
  while (i < lines.length && lines[i].trim() !== "---") {
    const colonIdx = lines[i].indexOf(":");
    if (colonIdx !== -1) {
      const key = lines[i].slice(0, colonIdx).trim();
      const val = lines[i].slice(colonIdx + 1).trim();
      meta[key] = val;
    }
    i++;
  }
  return { meta, body: lines.slice(i + 1).join("\n") };
}

function getSubdirs(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true })
    .filter(e => e.isDirectory())
    .map(e => e.name);
}

/**
 * Strip / convert Obsidian-specific syntax that standard markdown parsers
 * don't understand. Run this on the body before passing to marked().
 */
function preprocessMarkdown(md) {
  return md
    // Strip block comments: %% ... %%
    .replace(/%%[\s\S]*?%%/g, "")
    // Strip embedded file transclusions: ![[file]]
    .replace(/!\[\[([^\]]+)\]\]/g, "")
    // Wikilinks with alias: [[page|label]] → label
    .replace(/\[\[([^|\]]+)\|([^\]]+)\]\]/g, "$2")
    // Plain wikilinks: [[page]] → page
    .replace(/\[\[([^\]]+)\]\]/g, "$1")
    // Highlights: ==text== → <mark>text</mark>
    .replace(/==([^=\n]+)==/g, "<mark>$1</mark>");
}

module.exports = { ensureDir, write, copyDir, parseFrontmatter, getSubdirs, preprocessMarkdown };
