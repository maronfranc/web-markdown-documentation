---
title: Writing Content
description: Add new markdown pages to the docs collection.
order: 2
---

Create a `.md` file anywhere inside `src/content/docs/`. The file path becomes the page URL:

| File | URL |
| --- | --- |
| `src/content/docs/api.md` | `/docs/api` |
| `src/content/docs/guides/api.md` | `/docs/guides/api` |

## Frontmatter

Frontmatter is entirely optional — a plain markdown file (a `README.md`, a scratch note) works too.

```md
---
title: My Page
description: Shown in the docs index.
order: 3
---

## First heading

Body content goes here.
```

When a field is missing the page falls back to:

| Field | Fallback |
| --- | --- |
| `title` | first `# heading` in the file, otherwise the filename (`notes-api.md` → `Notes Api`) |
| `description` | omitted from the index |
| `order` | sorted after ordered pages, then alphabetically by title |

`description` and `order` control the index listing. If the body already starts with a
`# heading`, no duplicate page heading is added.

## Markdown features

Headings, lists, tables, and fenced code blocks all render. Inline code looks like `getCollection()`.

> Blockquotes are styled too, for callouts and notes.
