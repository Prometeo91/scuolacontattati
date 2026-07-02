import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const lezioni = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/lezioni' }),
  schema: z.object({
    anno: z.number().int().min(1).max(7),
    num: z.number().int().min(1),
    data: z.coerce.date().optional(),
    titolo: z.string(),
    sottotitolo: z.string(),
    temi: z.array(z.string()),
    citazione: z.string().optional(),
    autore: z.string().optional(),
  }),
});

export const collections = { lezioni };
