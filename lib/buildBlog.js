const fs = require("fs");
const path = require("path");
const { marked } = require("marked");
const { write, copyDir, parseFrontmatter, getSubdirs, preprocessMarkdown } = require("./utils");
const { shell } = require("./shell");

const SRC = path.join(__dirname, "..");
const DIST = path.join(SRC, "dist");

function buildPostPage(slug, blogSrc) {
  const mdPath = path.join(blogSrc, slug, "blog_page.md");
  if (!fs.existsSync(mdPath)) return null;

  const raw = fs.readFileSync(mdPath, "utf-8");
  const { meta, body: rawBody } = parseFrontmatter(raw);
  const body = preprocessMarkdown(rawBody);

  // Rewrite relative image paths to absolute /blog/slug/files/ paths
  const rewritten = body.replace(
    /!\[([^\]]*)\]\(\.\/(files\/[^)]+)\)/g,
    `![$1](/blog/${slug}/$2)`
  );

  const html = marked(rewritten);
  const backLink = `<a href="/blog" class="back-link">← blog</a>`;

  copyDir(path.join(blogSrc, slug, "files"), path.join(DIST, "blog", slug, "files"));

  write(path.join(DIST, "blog", slug, "index.html"), shell({
    content: backLink + html,
    title: `${meta.title || slug} · Shriyansh`,
    section: "blog",
    description: meta.description,
  }));

  console.log(`✓ blog/${slug}`);
  return { slug, ...meta };
}

function buildBlogIndex(posts) {
  const listHtml = posts.length
    ? posts.map(p => `
      <article class="post-card">
        <a href="/blog/${p.slug}" class="post-title">${p.title || p.slug}</a>
        ${p.date ? `<time class="post-date">${p.date}</time>` : ""}
        ${p.description ? `<p class="post-desc">${p.description}</p>` : ""}
      </article>`).join("")
    : `<p class="empty">no posts yet.</p>`;

  write(path.join(DIST, "blog", "index.html"), shell({
    content: `<h1>blog</h1><div class="post-list">${listHtml}</div>`,
    title: "Shriyansh · blog",
    section: "blog",
  }));

  console.log("✓ blog index");
}

function buildBlog() {
  const blogSrc = path.join(SRC, "blog");
  const slugs = getSubdirs(blogSrc);

  const posts = slugs
    .map(slug => buildPostPage(slug, blogSrc))
    .filter(Boolean);

  posts.sort((a, b) => (b.date > a.date ? 1 : -1));
  buildBlogIndex(posts);
}

module.exports = { buildBlog };
