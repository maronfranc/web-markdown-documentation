import { existsSync } from 'node:fs';
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const DEFAULT_DOCS_DIR = './src/content/docs';

const envDocsDir = process.env.DOCS_DIR;
let docsBase = envDocsDir ?? DEFAULT_DOCS_DIR;

if (envDocsDir && !existsSync(envDocsDir)) {
 console.warn(`[docs] DOCS_DIR "${envDocsDir}" does not exist — using default "${DEFAULT_DOCS_DIR}"`);
 docsBase = DEFAULT_DOCS_DIR;
}

const docs = defineCollection({
 loader: glob({ pattern: '**/*.md', base: docsBase }),
 schema: z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  order: z.number().optional(),
 }),
});

export const collections = { docs };
