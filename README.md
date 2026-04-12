# blogfolio

# What

This is my personal site. It has a blog, a projects page, and a now page inspired from [Derek Sivers](https://sive.rs/now).
It reads markdown files from a specific folder structure, converts them to HTML, and drops everything into a `dist/` folder. Vercel picks that up and serves it.

## Why

I didn't want to deal with any web development. It's a great thing we have AI now. I just wanted to write markdown files and have them show up on a website. So I generated this little "blogfolio" with the help of Claude Sonnet.

The whole thing lives in `build.js` (and a few files in `lib/`). You can read it in five minutes.

## How

```
blogfolio/
├── now/
│   ├── now.md              <- the /now page
│   └── files/              <- images for now.md
├── blog/
│   └── post-slug/
│       ├── blog_page.md
│       └── files/
├── projects/
│   └── project-slug/
│       ├── project_desc.md
│       └── files/
├── public/
│   └── style.css
├── build.js
└── vercel.json
```

Adding a post means creating a folder, dropping in a markdown file, and pushing. Vercel builds it automatically.

## Frontmatter

Blog posts and project pages need a small frontmatter block at the top:

```
---
title: title of the thing
date: 2026-04-13
description: one line that shows up on the index page
---
```

## Images and LaTeX

Images go in a `files/` folder next to the markdown file and are referenced like this:

```markdown
![alt text](./files/image.png)
```

The build script rewrites the paths automatically so they resolve correctly on the site.

For math: inline with `$E = mc^2$` and block with `$$\int f(x)dx$$`. KaTeX handles the rendering.

---

## AI notice

The code in this repo was written with the help of an AI coding assistant. The reason is simple: I can't be bothered to do website work. I know what I want the site to do, I don't want to spend hours wiring it together myself. The AI handled the implementation, I told it what I wanted and reviewed what came out. Everything here reflects my own decisions about design and structure, I just didn't write every line by hand.