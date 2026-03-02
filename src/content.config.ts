import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		publishDate: z.coerce.date(),
		image: z.string().optional(),
		imagealt: z.string().optional(),
		author: z.string().optional(),
		tags: z.array(z.string()).optional(),
		hideToC: z.boolean().optional(),
	}),
});

export const collections = { blog };
