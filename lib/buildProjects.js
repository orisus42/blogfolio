const fs = require("fs");
const path = require("path");
const { marked } = require("marked");
const { write, copyDir, parseFrontmatter, getSubdirs, preprocessMarkdown } = require("./utils");
const { shell } = require("./shell");

const SRC = path.join(__dirname, "..");
const DIST = path.join(SRC, "dist");

function buildProjectPage(slug, projSrc) {
  const mdPath = path.join(projSrc, slug, "project_desc.md");
  if (!fs.existsSync(mdPath)) return null;

  const raw = fs.readFileSync(mdPath, "utf-8");
  const { meta, body: rawBody } = parseFrontmatter(raw);
  const body = preprocessMarkdown(rawBody);

  // Rewrite relative image paths to absolute /projects/slug/files/ paths
  const rewritten = body.replace(
    /!\[([^\]]*)\]\(\.\/(files\/[^)]+)\)/g,
    `![$1](/projects/${slug}/$2)`
  );

  const html = marked(rewritten);
  const backLink = `<a href="/projects" class="back-link">← projects</a>`;

  copyDir(path.join(projSrc, slug, "files"), path.join(DIST, "projects", slug, "files"));

  write(path.join(DIST, "projects", slug, "index.html"), shell({
    content: backLink + html,
    title: `${meta.title || slug} · Shriyansh`,
    section: "projects",
    description: meta.description,
  }));

  console.log(`✓ projects/${slug}`);
  return { slug, ...meta };
}

function buildProjectsIndex(projects) {
  const listHtml = projects.length
    ? projects.map(p => `
      <article class="post-card">
        <a href="/projects/${p.slug}" class="post-title">${p.title || p.slug}</a>
        ${p.date ? `<time class="post-date">${p.date}</time>` : ""}
        ${p.description ? `<p class="post-desc">${p.description}</p>` : ""}
      </article>`).join("")
    : `<p class="empty">no projects yet.</p>`;

  write(path.join(DIST, "projects", "index.html"), shell({
    content: `<h1>projects</h1><div class="post-list">${listHtml}</div>`,
    title: "Shriyansh · projects",
    section: "projects",
  }));

  console.log("✓ projects index");
}

function buildProjects() {
  const projSrc = path.join(SRC, "projects");
  const slugs = getSubdirs(projSrc);

  const projects = slugs
    .map(slug => buildProjectPage(slug, projSrc))
    .filter(Boolean);

  projects.sort((a, b) => (b.date > a.date ? 1 : -1));
  buildProjectsIndex(projects);
}

module.exports = { buildProjects };
