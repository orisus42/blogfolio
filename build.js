const path = require("path");
const { marked } = require("marked");
const markedKatex = require("marked-katex-extension");
const { ensureDir } = require("./lib/utils");
const { buildNow } = require("./lib/buildNow");
const { buildBlog } = require("./lib/buildBlog");
const { buildProjects } = require("./lib/buildProjects");
const { copyDir } = require("./lib/utils");

// ── Configure markdown renderer ──────────────────────────────────
marked.use(markedKatex({ throwOnError: false }));
marked.use({ breaks: true, gfm: true });

const DIST = path.join(__dirname, "dist");

function buildPublic() {
  copyDir(path.join(__dirname, "public"), DIST);
  console.log("✓ public assets");
}

// ── Run ──────────────────────────────────────────────────────────
console.log("building...");
ensureDir(DIST);
buildPublic();
buildNow();
buildBlog();
buildProjects();
console.log("done → dist/");
