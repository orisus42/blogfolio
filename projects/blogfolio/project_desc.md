---
title: blogfolio
date: 2026-04-12
description: This site. A static site generator that turns markdown files into a personal website, deployed to Vercel.
---

This site itself. I wanted a personal website with a blog, a projects page, and a now page. I didn't want to use a full framework and I didn't want to spend weeks on it.

So I used an AI assistant to generate a small Node.js build script that reads markdown files and converts them to static HTML. The whole generator fits in a few files. Vercel handles deployment on every push.

## How it works

The build script reads markdown files from a defined folder structure, parses frontmatter for titles and dates, converts the content to HTML, and writes everything into a `dist/` folder. Vercel picks that up and serves it.

Math rendering with KaTeX is supported inline. Images go in a `files/` folder next to the markdown and get path-rewritten at build time.

## Stack

- Node.js build script (no framework)
- `marked` for markdown parsing
- `marked-katex-extension` + KaTeX for math
- Vanilla CSS
- Vercel for hosting

## Why

I've had "make a personal site" on my list for a long time and kept putting it off because every option felt like more work than I wanted to do. This felt like the minimum viable version that I'd actually maintain.

Source is on GitHub.
