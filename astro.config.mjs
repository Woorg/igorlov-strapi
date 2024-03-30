import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import vue from '@astrojs/vue';

import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import AutoImport from 'astro-auto-import';
import { defineConfig } from 'astro/config';

import remarkOEmbed from 'remark-oembed';

import rehypeToc from 'rehype-toc';
import rehypeFigure from 'rehype-figure';
import rehypeExternalLinks from 'rehype-external-links';
import config from './src/config/config.json';

const customizeTOC = (toc) => {
	try {
		const { children } = toc;
		const childrenOfChildren = children?.[0]?.children;
		if (!children?.length || !childrenOfChildren?.length) return null;
	} catch (e) {}
	return {
		type: 'element',
		tagName: 'details',
		properties: {
			className: 'toc px-5 border border-gray-light  lg:px-10 py-2 cursor-pointer',
		},
		children: [
			{
				type: 'element',
				tagName: 'summary',
				properties: { className: 'title' },
				children: [
					{
						type: 'text',
						value: 'Оглавление',
					},
				],
			},
			...(toc.children || []),
		],
	};
};

// https://astro.build/config
export default defineConfig({
	prefetch: true,
	experimental: {
		clientPrerender: true,
		directRenderScript: true,
		contentCollectionCache: false,
	},
	site: config.site.base_url ? config.site.base_url : 'https://igorlov.ru',
	base: config.site.base_path ? config.site.base_path : '/',
	trailingSlash: config.site.trailing_slash ? 'always' : 'never',
	image: {
		domains: [
			'stackpathcdn.com',
			'pressablecdn.com',
			'vercel.com',
			'images.unsplash.com',
			'blog.logrocket.com',
		],
	},
	integrations: [
		react(),
		vue(),
		sitemap(),
		tailwind({
			config: {
				applyBaseStyles: false,
			},
		}),
		AutoImport({
			imports: [
				'@/shortcodes/Button',
				'@/shortcodes/Accordion',
				'@/shortcodes/Notice',
				'@/shortcodes/Video',
				'@/shortcodes/Youtube',
				'@/shortcodes/Tabs',
				'@/shortcodes/Tab',
			],
		}),
		mdx(),
	],
	markdown: {
		extendDefaultPlugins: true,
		syntaxHighlight: 'shiki',
		shikiConfig: {
			theme: 'poimandres',
			// https://shiki.style/languages
			skipInline: false,
			langs: [],
			wrap: true,
			// Найдите общие transformers: https://shiki.style/packages/transformers
			transformers: [],
		},
		remarkPlugins: [
			[
				remarkOEmbed,
				{
					syncWidget: true,
				},
			],
		],
		rehypePlugins: [
			'rehype-slug',
			[
				'rehype-autolink-headings',
				{
					behavior: 'append',
				},
			],
			[
				rehypeToc,
				{
					customizeTOC,
				},
			],
			[
				rehypeFigure,
				{
					className: 'igorlov-figure',
				},
			],
			[
				rehypeExternalLinks,
				{
					target: '_blank',
					rel: ['noopener noreferrer nofollow'],
				},
			],
		],
	},
});
