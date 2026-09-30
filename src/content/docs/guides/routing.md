---
title: Routing
description: How markdown files map to routes and how nested folders work.
order: 3
---

Markdown files are served from `/docs/[...slug]`, where the slug is the file path inside
`src/content/docs/` without the extension.

## Nested folders

`src/content/docs/guides/routing.md` renders at:

```
/docs/guides/routing
```

Nesting can go as deep as you need — the rest parameter in
`src/pages/docs/[...slug].astro` captures the whole path.

## Listing

`src/pages/docs/index.astro` calls `getCollection('docs')` and sorts entries by `order`,
so new pages appear in the index automatically.
