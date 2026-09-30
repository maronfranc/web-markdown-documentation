## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Content

Markdown pages live in `src/content/docs/` (any folder depth) and are served from `/docs/[...slug]`.

- Collection schema: `src/content.config.ts` — `title`, `description`, `order` are all optional; markdown without frontmatter is valid
- Routes: `src/pages/docs/[...slug].astro` builds paths from `getCollection('docs')`; the listing is `src/pages/docs/index.astro`
- Title fallback (frontmatter `title` → first `# heading` → filename) is in `src/lib/docs.ts`
- Shared page shell: `src/layouts/Layout.astro`; markdown styles: `.prose` in `src/styles/global.css`

Adding, renaming, or deleting a markdown file requires no route changes. After content-related edits run `astro build` and confirm the new paths appear in the generated routes.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
