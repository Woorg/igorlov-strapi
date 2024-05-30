import { defineCollection, z } from 'astro:content';
import any from 'prop-types';

// Post collection schema
const blogCollection = defineCollection({
	type: 'content',
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			meta_title: z.string().optional(),
			description: z.string().optional(),
			date: z.any().optional(),
			image: image().optional(),
			author: z.string().default('Igor Gorlov'),
			categories: z.array(z.string()).default(['others']),
			tags: z.array(z.string()).default(['others']),
			draft: z.boolean().optional(),
			lastmod: z.any().optional(),
		}),
});

// Projects collection schema
const projectsCollection = defineCollection({
	type: 'content',
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			meta_title: z.string().optional(),
			description: z.string().optional(),
			date: z.any().optional(),
			image: image().optional(),
			images: z.array(image()).optional(),
			author: z.string().default('Igor Gorlov'),
			categories: z.array(z.string()).default(['others']),
			tags: z.array(z.string()).default(['others']),
			industry: z.string().optional(),
			repository: z.string().optional(),
			link: z.string().optional(),
			draft: z.boolean().optional(),
		}),
});

// Author collection schema
const authorsCollection = defineCollection({
	type: 'content',
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			meta_title: z.string().optional(),
			email: z.string().optional(),
			image: image().optional(),
			description: z.string().optional(),
			social: z
				.array(
					z
						.object({
							name: z.string().optional(),
							icon: z.string().optional(),
							link: z.string().optional(),
						})
						.optional(),
				)
				.optional(),
			draft: z.boolean().optional(),
		}),
});

// Pages collection schema
const pagesCollection = defineCollection({
	type: 'content',
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			meta_title: z.string().optional(),
			description: z.string().optional(),
			image: image().optional(),
			draft: z.boolean().optional(),
		}),
});

// Export collections
export const collections = {
	blog: blogCollection,
	projects: projectsCollection,
	authors: authorsCollection,
	pages: pagesCollection,
	// sections: sectionsCollection,
};
