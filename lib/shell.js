function shell({ content, title, section, description = "" }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  ${description ? `<meta name="description" content="${description}" />` : ""}
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;1,400&family=DM+Mono:ital,wght@0,300;0,400;1,300&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/katex.min.css">
  <link rel="stylesheet" href="/style.css" />
</head>
<body>
  <div class="layout">
    <header>
      <a href="/" class="site-name">Shriyansh</a>
      <nav>
        <a href="/now" ${section === "now" ? 'class="active"' : ""}>now</a>
        <a href="/blog" ${section === "blog" ? 'class="active"' : ""}>blog</a>
        <a href="/projects" ${section === "projects" ? 'class="active"' : ""}>projects</a>
      </nav>
    </header>
    <main class="prose">
      ${content}
    </main>
    <footer>
      <span>made with a markdown file and a git push</span>
    </footer>
  </div>
</body>
</html>`;
}

module.exports = { shell };
