# web-markdown-documentation

Static documentation site built with Astro. Every markdown file in `src/content/docs/` is served as a page — no route file is added per document.

## Adding content

Drop a `.md` file anywhere inside `src/content/docs/`:

| File | URL |
| --- | --- |
| `src/content/docs/api.md` | `/docs/api` |
| `src/content/docs/guides/api.md` | `/docs/guides/api` |

The file is picked up automatically: it gets a route, appears in the `/docs` index, and hot-reloads in dev. Deleting or renaming a file updates the site the same way.

### Frontmatter

Frontmatter is optional. A plain `README.md` or scratch note works as-is.

```md
---
title: My Page
description: Shown in the docs index.
order: 3
---

## First heading

Body content goes here.
```

| Field | Required | Fallback when missing |
| --- | --- | --- |
| `title` | no | first `# heading` in the file, otherwise the filename (`notes-api.md` → `Notes Api`) |
| `description` | no | omitted from the index |
| `order` | no | sorted after ordered pages, then alphabetically by title |

If the body already starts with a `# heading`, no duplicate page heading is added.

## Serving content from an absolute path

By default markdown is loaded from `./src/content/docs/`. To load it from an absolute path elsewhere on disk, set the `DOCS_DIR` environment variable — the Makefile passes it to Astro on every run:

```bash
make dev   DOCS_DIR=/home/you/code/global-documentation
make build DOCS_DIR=/home/you/code/global-documentation
```

To use a path as the default for all Make targets, change the first line of the `Makefile`:

```make
DOCS_DIR ?= $(HOME)/code/global-documentation
```

If the path does not exist, the app prints a terminal message and falls back to the default `./src/content/docs/` instead of failing:

```text
[docs] DOCS_DIR "/home/you/code/global-documentation" does not exist — using default "./src/content/docs"
```

The variable also works outside Make (`DOCS_DIR=/abs/path pnpm build`); when unset, the default directory is used.

## Project structure

```text
/
├── public/
├── src/
│   ├── components/
│   │   └── ThemeToggle.astro
│   ├── content/
│   │   └── docs/            # markdown pages, any folder depth
│   ├── content.config.ts    # collection + frontmatter schema
│   ├── layouts/
│   │   └── Layout.astro     # page shell (head, header, theme)
│   ├── lib/
│   │   └── docs.ts          # title/description fallbacks
│   ├── pages/
│   │   ├── index.astro      # home
│   │   └── docs/
│   │       ├── index.astro  # listing of all markdown pages
│   │       └── [...slug].astro  # renders one markdown page
│   └── styles/
│       └── global.css       # theme variables + .prose markdown styles
└── package.json
```

## Commands

All commands are run from the root of the project, from a terminal:

| Command | Action |
| :--- | :--- |
| `pnpm install` | Installs dependencies |
| `pnpm dev` | Starts local dev server at `localhost:4321` |
| `pnpm build` | Build your production site to `./dist/` |
| `pnpm preview` | Preview your build locally, before deploying |
| `pnpm astro ...` | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro -- --help` | Get help using the Astro CLI |
| `make dev` / `make build` | Same as `pnpm dev` / `pnpm build`, with `DOCS_DIR` passed through |
| `make stop` / `make status` / `make logs` | Manage the background dev server |
| `make preview` / `make clean` | Preview the build / remove `dist/` and `.astro/` |

## Want to learn more?

Feel free to check [Astro documentation](https://docs.astro.build) or jump into the [Discord server](https://astro.build/chat).
