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
import simpleStackStream from 'simple-stack-stream';
import icon from 'astro-icon';
const customizeTOC = (toc) => {
	// console.log(toc);
	try {
		const { children } = toc;
		const childrenOfChildren = children?.[0]?.children;
		if (!children?.length || !childrenOfChildren?.length) return null;
	} catch (e) {}
	return {
		type: 'element',
		tagName: 'details open',
		properties: {
			className:
				'toc border-b border-blue text-blue fluid:p-8 overflow-auto cursor-pointer bg-box ',
		},
		children: [
			{
				type: 'element',
				tagName: 'summary',
				properties: {
					className: 'toc__title text-xl font-medium',
				},
				children: [
					{
						type: 'text',
						value: 'Содержание',
					},
				],
			},
			...(toc.children || []),
		],
	};
};

// https://astro.build/config
export default defineConfig({
	// prefetch: true,
	site: config.site.base_url ? config.site.base_url : 'https://igorlov.ru',
	base: config.site.base_path,
	trailingSlash: 'never',
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
		simpleStackStream(),
		icon(),
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
					cssClasses: {
						// toc: "page-outline",      // Change the CSS class for the TOC
						link: 'text-blue', // Change the CSS class for links in the TOC
					},
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
