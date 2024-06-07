---
title: Astro 2.5
meta_title: Astro 2.5 - Igor Gorlov
description: 'Мы только что выпустили Astro 2.5 с большим списком функций, включая:'
date: 2023-05-22T15:14:53.000Z
author: Igor Gorlov
image: ../../assets/images/undefined-May-22-2023.avif
categories:
  - Новости
tags:
  - Astro
draft: false
lastmod: 2024-03-20T21:26:43.363Z
---

Мы только что выпустили Astro 2.5 с большим списком функций, включая:

<!-- wp:rank-math/toc-block {"title":"Оглавление","headings":[{"key":"ce17bc5b-3969-459e-9522-1022105ad026","content":"Коллекции данных и ссылки","level":2,"link":"#коллекции-данных-и-ссылки","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"bbc20bd8-7d7b-4283-b851-ec78ab6e1227","content":"Статический гибридный рендеринг по умолчанию (экспериментальный)","level":2,"link":"#статический-гибридный-рендеринг-по-умолчанию-экспериментальный","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"2dd4ecb7-f7c8-4412-8dd8-9f6846f30bee","content":"Пользовательские клиентские директивы (экспериментально)","level":2,"link":"#пользовательские-клиентские-директивы-экспериментально","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"ae6698dd-5ad2-443b-b06a-eae6bb387f92","content":"Минификация HTML","level":2,"link":"#минификация-html","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"f8b45e7e-273f-41dd-bb97-3a606da6cd75","content":"Параллельный рендеринг","level":2,"link":"#параллельный-рендеринг","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"13725dd3-45b2-4b0c-9b04-cb30a96c1970","content":"Помощник полиморфного типа","level":2,"link":"#помощник-полиморфного-типа","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"e5b39195-0eb6-4ec0-8f81-3b3ac1dc76d0","content":"Подробнее","level":2,"link":"#подробнее","disable":false,"isUpdated":false,"isGeneratedLink":true}],"listStyle":"ul"} -->
<div class="wp-block-rank-math-toc-block" id="rank-math-toc"><h2>Оглавление</h2><nav><ul><li class=""><a href="#коллекции-данных-и-ссылки">Коллекции данных и ссылки</a></li><li class=""><a href="#статический-гибридный-рендеринг-по-умолчанию-экспериментальный">Статический гибридный рендеринг по умолчанию (экспериментальный)</a></li><li class=""><a href="#пользовательские-клиентские-директивы-экспериментально">Пользовательские клиентские директивы (экспериментально)</a></li><li class=""><a href="#минификация-html">Минификация HTML</a></li><li class=""><a href="#параллельный-рендеринг">Параллельный рендеринг</a></li><li class=""><a href="#помощник-полиморфного-типа">Помощник полиморфного типа</a></li><li class=""><a href="#подробнее">Подробнее</a></li></ul></nav></div>
<!-- /wp:rank-math/toc-block -->

<h2 class="wp-block-heading" id="коллекции-данных-и-ссылки">Коллекции данных и ссылки</h2>

Коллекции данных — это первоклассное решение Astro для управления и создания контента. В Astro 2.5 эта история получила еще большее развитие благодаря новым форматам данных и ссылкам на коллекции.

Во-первых, мы ввели новый тип: свойство ‘data’ для хранения форматов данных, таких как JSON и YAML, в собственных коллекциях. Это открывает возможности использования коллекций для новых форм контента, включая профили авторов, многократно используемый альт текст изображений, словари переводов и многое другое.

Создавайте коллекции данных вместе с существующими коллекциями контента:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">src/content/
    blog/
        week-1.md
        week-2.md
+    authors/
+        grace-hopper.json
+        alan-turing.json</code></pre>
<!-- /wp:code -->

Настройте их с помощью нового свойства type: ‘data’:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">// src/content/config.ts
import { defineCollection, z } from "astro:content"

const authors = defineCollection({
	type: "data",
	schema: z.object({
		name: z.string(),
		socialLink: z.string().url(),
	}),
})

const blog = defineCollection({
	type: "content",
	schema: z.object({
		/* ... */
	}),
})

export const collections = { blog: blog, authors: authors }</code></pre>
<!-- /wp:code -->

Вы также можете захотеть ”ссылаться” на связанные записи. Обычный пример - запись в блоге, которая ссылается на многократно используемые профили авторов, хранящиеся в виде JSON в коллекции данных, или URL-адреса связанных записей, хранящиеся в той же коллекции. Вы можете настроить эти отношения с помощью новой функции reference():

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">import { defineCollection, reference, z } from "astro:content"

const blog = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		// Reference a single author from the `authors` collection by `id`
		author: reference("authors"),
		// Reference an array of related posts from the `blog` collection by `slug`
		relatedPosts: z.array(reference("blog")),
	}),
})

const authors = defineCollection({
	type: "data",
	schema: z.object({
		/** ... */
	}),
})

export const collections = { blog, authors }</code></pre>
<!-- /wp:code -->

Теперь каждая запись блога может ссылаться на связанные записи с безопасной для типов валидацией:

<!-- wp:code -->

## <pre class="wp-block-code"><code lang="javascript" class="language-javascript"># src/content/blog/welcome.md

title: “Welcome to my blog”
author: ben-holmes # references `src/content/authors/ben-holmes.json`
relatedPosts:

- about-me # references `src/content/blog/about-me.md`
- my-year-in-review # references `src/content/blog/my-year-in-review.md`
---</code></pre>
<!-- /wp:code -->

Подробные примеры смотрите в <a href="https://docs.astro.build/en/guides/content-collections/" target="_blank" rel="noreferrer noopener nofollow">обновленном руководстве по коллекциям контента</a>.

<h2 class="wp-block-heading" id="статический-гибридный-рендеринг-по-умолчанию-экспериментальный">Статический гибридный рендеринг по умолчанию (экспериментальный)</h2>

В версии 2.0 мы добавили возможность предварительного рендеринга отдельных страниц в приложениях SSR. Теперь в версии 2.5 вы можете сделать и обратное; в основном статическом сайте вы можете указать некоторые маршруты, которые не будут подвергаться предварительному рендерингу.

Эта новая ”гибридная” опция вывода на сервер перевернет стандартное поведение пререндеринга в SSR так, что вам больше не придется отмечать каждый статический маршрут, который вы хотите пререндерить. Эта опция будет помечена как экспериментальная в течение короткого периода времени, пока мы стабилизируем крайние случаи. Вы можете использовать ее уже сегодня, включив флаг hybridOutput в экспериментальной секции вашего конфига и добавив адаптер:

astro.config.mjs

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">import { defineConfig } from "astro/config"
import nodejs from "@astrojs/node"

export default defineConfig({
	output: "hybrid",
	adapter: nodejs(),
	experimental: {
		hybridOutput: true,
	},
})</code></pre>
<!-- /wp:code -->

Как только вы это сделаете, весь ваш сайт будет предварительно отрисован по умолчанию. Вы можете отказаться от предварительного рендеринга, установив значение false для экспорта предварительного рендеринга любой страницы или конечной точки:

src/pages/contact.astro

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">--- 

export const prerender = false

if (Astro.request.method === "POST") {
	// handle form submission
}
--- 


&lt;form method="POST"&gt;
	&lt;input type="text" name="name" /&gt;
	&lt;input type="email" name="email" /&gt;
	&lt;button type="submit"&gt;Submit&lt;/button&gt;
&lt;/form&gt;</code></pre>
<!-- /wp:code -->

<h2 class="wp-block-heading" id="пользовательские-клиентские-директивы-экспериментально">Пользовательские клиентские директивы (экспериментально)</h2>

Пользовательские клиентские директивы позволяют авторам интеграций определять новые директивы client: для получения большего контроля над загрузкой компонентов.

Интеграции могут добавлять их через новый API addClientDirective() хука astro:config:setup. Чтобы использовать этот API, включите customClientDirectives в экспериментальном разделе вашего конфига.

astro.config.mjs

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">import { defineConfig } from "astro/config"
import onClickDirective from "astro-click-directive"

export default defineConfig({
	integrations: [onClickDirective()],
	experimental: {
		customClientDirectives: true,
	},
})</code></pre>
<!-- /wp:code -->

astro-click-directive

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">export default function onClickDirective() {
	return {
		hooks: {
			"astro:config:setup": ({ addClientDirective }) =&gt; {
				addClientDirective({
					name: "click",
					entrypoint: "astro-click-directive/click.js",
				})
			},
		},
	}
}</code></pre>
<!-- /wp:code -->

Теперь вы можете использовать client:click для любых компонентов вашего фреймворка с полной поддержкой типов.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">&lt;Counter client:click /&gt;</code></pre>
<!-- /wp:code -->

См. документацию по клиентским директивам, чтобы узнать, как создавать такие типы интеграций.

<h2 class="wp-block-heading" id="минификация-html">Минификация HTML</h2>

Теперь вы можете отказаться от минификации HTML, создаваемого вашими компонентами Astro.

Используя опцию compressHTML, Astro удалит все пробельные символы из вашего HTML, включая переносы строк.

Мы хотели включить минификацию без ущерба для производительности. Для приложений с серверным рендерингом минификация при каждом рендеринге может оказаться дорогостоящей. С compressHTML ваши компоненты сжимаются только один раз компилятором Astro, а затем во время сборки.

Вы можете включить эту функцию в конфигурации:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">import { defineConfig } from "astro/config"
export default defineConfig({
	compressHTML: true,
})</code></pre>
<!-- /wp:code -->

Примечание: сжатие происходит как в режиме разработки, так и в финальной сборке.

Хотя эта опция не сжимает HTML, создаваемый компонентом фреймворка, вы можете написать промежуточное ПО для сжатия HTML-ответов.

<h2 class="wp-block-heading" id="параллельный-рендеринг">Параллельный рендеринг</h2>

Теперь Astro будет рендерить компоненты параллельно, так что компоненты, загружающие данные выше в дереве, больше не будут блокировать другие компоненты, которые также загружают данные, как в примере ниже:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">&lt;Delayed ms={30} /&gt;
&lt;Delayed ms={20} /&gt;
&lt;Delayed ms={40} /&gt;
&lt;Delayed ms={10} /&gt;</code></pre>
<!-- /wp:code -->

Этот <code>&lt;Delayed /&gt;</code> компонент ждет определенное количество миллисекунд. Раньше каждый компонент должен был дождаться завершения предыдущего, прежде чем начать рендеринг. Теперь в версии 2.5 все они будут отрисовываться одновременно.

Забавный факт: мы пытались добавить эту оптимизацию в прошлом, но нам не хватало хороших бенчмарков, чтобы убедиться, что это не замедляет рендеринг. Недавние улучшения в нашей инфраструктуре бенчмарков CI позволили нам реализовать эту оптимизацию с уверенностью.

<h2 class="wp-block-heading" id="помощник-полиморфного-типа">Помощник полиморфного типа</h2>

Astro теперь включает помощник TypeScript (Polymorphic) для упрощения создания компонентов, которые могут отображаться как различные элементы HTML с полной безопасностью типов. Это полезно для таких компонентов, как <code>&lt;Link&gt;</code>, которые могут отображаться как <code>&lt;a&gt;</code> или <code>&lt;button&gt;</code> в зависимости от переданных им реквизитов.

В приведенном ниже примере реализован полностью типизированный, полиморфный компонент, который может отображаться как любой элемент HTML. Тип HTMLTag используется для обеспечения того, что реквизит <code>as</code> является допустимым элементом HTML.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">--- 

import { HTMLTag, Polymorphic } from "astro/types"

type Props&lt;Tag extends HTMLTag&gt; = Polymorphic&lt;{ as: Tag }&gt;

const { as: Tag, ...props } = Astro.props
--- 


&lt;Tag {...props} /&gt;</code></pre>
<!-- /wp:code -->

<h2 class="wp-block-heading" id="подробнее">Подробнее</h2>

В этот выпуск включены дополнительные исправления ошибок и улучшения. Ознакомьтесь с <a href="https://github.com/withastro/astro/pull/7090" target="_blank" rel="noreferrer noopener nofollow">примечаниями к выпуску</a>, чтобы узнать больше.
