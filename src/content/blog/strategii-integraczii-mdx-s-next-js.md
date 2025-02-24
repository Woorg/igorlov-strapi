---
title: Стратегии интеграции MDX с Next.js
meta_title: Стратегии интеграции MDX с Next.js - Igor Gorlov
description: >-
  MDX – это формат на основе Markdown, широко используемый в издательском деле
  благодаря своей легкости и простоте. Markdown – это легкий язык разметки с
  синтаксисом форматирования обычного текста.
date: 2023-02-26T16:36:14.000Z
author: Igor Gorlov
image: ../../assets/images/undefined-Feb-26-2023.avif
categories:
  - Учебник
tags:
  - MDX
  - Next.js
draft: false
lastmod: 2024-03-20T21:26:46.164Z
---

MDX - это формат на основе Markdown, широко используемый в издательском деле благодаря своей легкости и простоте. Markdown - это легкий язык разметки с синтаксисом форматирования обычного текста. Он разработан так, чтобы его было легко писать и читать для пользователей, которые необязательно знакомы с синтаксисом HTML, хотя он широко используется для написания веб-страниц. В этой статье мы рассмотрим, как MDX может быть интегрирован в приложения Next.js.

<h2 class="wp-block-heading">Что такое Markdown?</h2>

Markdown - это простой и мощный инструмент для форматирования текстовых документов. Всего несколькими нажатиями клавиш вы можете создавать заголовки, подчеркивать слова, создавать списки и многое другое. Markdown легко читается и пишется, позволяя создавать богатые форматированные документы без использования сложного текстового процессора.

Если вы пишете в Интернете, в электронном письме или в файле программной документации, Markdown - ценный инструмент, который необходимо иметь в своем арсенале. В этой статье мы подробно рассмотрим, как легко интегрировать Markdown в Next.js.

<h2 class="wp-block-heading">Next.js и Markdown</h2>

Next.js - это JavaScript-фреймворк для создания серверных рендеринговых и статически генерируемых приложений. Одной из интересных особенностей Next.js является его интеграция с Markdown. С помощью Next.js вы можете легко импортировать и отображать файлы Markdown в своем приложении. Это может быть полезно при создании постов в блогах, документации или другого контента, требующего форматирования.

Чтобы использовать Markdown в Next.js, вам нужно установить необходимые зависимости, такие как remark и rehype-react. Затем вы будете использовать компонент remark-react для рендеринга контента в формате Markdown. Это позволит вам писать контент в простом и легко читаемом синтаксисе, а Next.js позаботится о рендеринге и форматировании.

В этом учебнике мы будем использовать next/mdx, next-mdx-remote и next-mdx-enhanced для реализации Markdown.

<h2 class="wp-block-heading">Реализация Markdown с помощью next/mdx</h2>

Чтобы начать работу, установите следующие зависимости:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">npm install @next/mdx @mdx-js/loader @mdx-js/react
</code></pre>
<!-- /wp:code -->

Чтобы настроить страницу, добавьте следующий код в файл next.config.js:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
    providerImportSource: '@mdx-js/react',
  },
});

module.exports = nextConfig;

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
});
</code></pre>
<!-- /wp:code -->

После добавления приведенного выше кода в ваш проект Next.js каждый файл с расширением .mdx будет преобразован в страницу.

Далее создайте файл внутри каталога ./pages, например ./pages/blog/hello-world.mdx. Затем вы можете написать в этом файле Markdown, хотя он может показаться простым. Вот как это будет выглядеть:

<!-- wp:image {"align":"center","id":158183} -->
<figure class="wp-block-image aligncenter"><img src="https://blog.logrocket.com/wp-content/uploads/2023/02/next-js-mdx-blog.png?is-pending-load=1" alt="Пример блога, демонстрирующий интеграцию MDX в Next.js" class="wp-image-158183"/></figure>
<!-- /wp:image -->

Теперь мы создадим макет для страницы нашего блога, чтобы персонализировать наши HTML-компоненты. Создайте файл в месте ./layouts/Layout.tsx и введите в него следующий код:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">import { MDXProvider } from '@mdx-js/react';

interface LayoutProps {
  children: React.ReactNode;
}

function Layout ({children, ...props}: LayoutProps) {
   return (
    &lt;MDXProvider components={components}&gt;
      {children}
    &lt;/MDXProvider&gt;
}
</code></pre>
<!-- /wp:code -->

Затем добавьте этот компонент Layout на страницу Markdown:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">import Layout from '../../components/layout';

# Hello World!

{/* Markdown content */}

export default ({ children }) =&gt; &lt;Layout&gt;{children}&lt;/Layout&gt;;
</code></pre>
<!-- /wp:code -->

Хотя сейчас ничего особенного не происходит, мы создали основу для настройки нашей страницы Markdown. Теперь давайте создадим несколько основных пользовательских компонентов, начиная с тегов заголовков.

<h2 class="wp-block-heading">Создание пользовательских компонентов</h2>

В ./components/mdx/Heading.tsx добавьте следующее:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">export const Heading = {
  H1: ({ children }) =&gt; &lt;h1 className="text-2xl font-bold"&gt;{children}&lt;/h1&gt;,
  H2: ({ children }) =&gt; &lt;h2 className="text-xl font-bold"&gt;{children}&lt;/h2&gt;,
};
</code></pre>
<!-- /wp:code -->

Аналогично, добавьте один для тега абзаца в ./components/mdx/Para.tsx:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">function Para({ children }) {
  return &lt;p className="text-gray-700 my-4 text-base"&gt;{children}&lt;/p&gt;;
}
export default Para;
</code></pre>
<!-- /wp:code -->

Вы можете создавать более уникальные компоненты на основе спецификаций. Вы можете получить доступ к инструментам разработчика, нажав Ctrl + Shift + C. Вы можете навести курсор на элемент, который хотите изучить, чтобы увидеть, какие элементы обернуты вокруг него на сайте:

<!-- wp:image {"align":"center","id":158185} -->
<figure class="wp-block-image aligncenter"><img src="https://blog.logrocket.com/wp-content/uploads/2023/02/next-js-mdx-custom.png?is-pending-load=1" alt="Добавление пользовательских компонентов MDX Next.js" class="wp-image-158185"/></figure>
<!-- /wp:image -->

Далее перейдите к компоненту Layout и добавьте следующие изменения:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">const components = {
  h1: Heading.H1,
  h2: Heading.H2,
  p: Para,
  ul: UnorderedList,
};

function Layout ({children, ...props}: LayoutProps) {
  return (
    &lt;MDXProvider components={components}&gt;
      &lt;div className="w-[80%] mx-auto p-6"&gt;
        {children}
      &lt;/div&gt;
    &lt;/MDXProvider&gt;
  )
}
</code></pre>
<!-- /wp:code -->

Выглядит лучше!

<!-- wp:image {"align":"center","id":158188} -->
<figure class="wp-block-image aligncenter"><img src="https://blog.logrocket.com/wp-content/uploads/2023/02/mdx-next-js-integration.png?is-pending-load=1" alt="Компоненты в MDX и Next.js Blog" class="wp-image-158188"/></figure>
<!-- /wp:image -->

<h2 class="wp-block-heading">Добавление метаданных</h2>

Еще один прием, который можно использовать с next/mdx, - добавление метаданных к содержимому Markdown. Это может быть полезно при добавлении SEO к вашей странице Markdown.

Теперь добавьте следующий код к странице Markdown, которую вы только что создали:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">export const meta = {
  author: 'Georgey',
  title: 'Introduction to Technical Writing',
  slug: 'introduction-to-technical-writing',
  topics: [
    'technical writing',
    'software engineering',
    'technical writing basics',
  ],
};

{/* Makrdown content */}

export default ({ children }) =&gt; &lt;Layout meta={meta}&gt;{children}&lt;/Layout&gt;;
</code></pre>
<!-- /wp:code -->

Теперь к этому объекту можно получить доступ с помощью компонента Layout.tsx, который мы создали ранее. В файле ./layouts/Layout.tsx добавьте содержимое метаданных в компонент Head, предоставленный Next.js:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">// ...imports
import Head from "next/head"

interface LayoutProps {
  children: React.ReactNode;
  meta: { author: string; title: string; slug: string; topics: string[] };
}

function Layout ({children, ...props}: LayoutProps) {
  return (
    &lt;MDXProvider components={components}&gt;
      &lt;Head&gt;
        &lt;title&gt;{props.meta.title}&lt;/title&gt;
        &lt;meta name="description" content={props.meta.title} /&gt;
      &lt;/Head&gt;
    &lt;/MDXProvider&gt;
  )
}
</code></pre>
<!-- /wp:code -->

После этого наша страница может быть проиндексирована веб-краулерами без проблем и заработать балл в рейтинге Lighthouse. Теперь, когда у нас есть метаданные, мы также можем включить их в раздел TL;DR страницы, чтобы предоставить читателям краткий обзор.

В компонент ./layouts/Layout.tsx добавьте следующее:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">function Layout ({children, ...props}: LayoutProps) {
  return (
    &lt;MDXProvider&gt;
      &lt;div className="w-[80%] mx-auto p-6"&gt;
        {/* Head */}



        &lt;div className="flex flex-col mt-6 mb-10 items-center justify-center text-center"&gt;
          &lt;h1 className="text-3xl font-bold"&gt;{props.meta.title}&lt;/h1&gt;
          &lt;p className="text-md text-gray-500"&gt;By {props.meta.author}&lt;/p&gt;
          {/* topics */}
          &lt;div className="flex flex-wrap gap-2 mt-4"&gt;
            {props.meta.topics.map((topic) =&gt; (
              &lt;span
                key={topic}
                className="text-sm text-gray-500 bg-gray-200 rounded-full px-2 py-1"
              &gt;
                {topic.slice(0, 1).toUpperCase() + topic.slice(1)}
              &lt;/span&gt;
            ))}
          &lt;/div&gt;
        &lt;/div&gt;


        {children}
      &lt;/div&gt;
    &lt;/MDXProvider&gt;
  )
} 
</code></pre>
<!-- /wp:code -->

Чтобы помочь пользователю понять релевантность страницы, мы отобразили ключевые теги, к которым относится статья, в разделе выше. Вот как это будет выглядеть:

<!-- wp:image {"align":"center","id":158193} -->
<figure class="wp-block-image aligncenter"><img src="https://blog.logrocket.com/wp-content/uploads/2023/02/mdx-next-js-integration-metadata.png?is-pending-load=1" alt="MDX and Next.js Integration Adding Metadata" class="wp-image-158193"/></figure>
<!-- /wp:image -->

<h2 class="wp-block-heading">Интеграция MDX с next-mdx-remote</h2>

Чтобы увидеть код для этого метода в репозитории, измените ветку на using-next-mdx-remote, чтобы ссылаться на код для next-mdx-remote.

Чтобы начать работу с next-mdx-remote, установите указанную ниже зависимость:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">npm install next-mdx-remote
</code></pre>
<!-- /wp:code -->

Вы можете закомментировать конфигурации, которые мы добавили в файл next.config.js ранее для next/mdx. Для next-mdx-remote они нам не понадобятся.

Далее очистите файлы Markdown внутри каталога ./pages/blog и переместите их в отдельный каталог за пределами ./pages в каталог под названием ./database. Внутри каталога ./database создайте все файлы Markdown в отдельном каталоге для каждой страницы статьи.

Ваша файловая структура должна выглядеть следующим образом:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="markdown" class="language-markdown">- pages
  |- blog
    |- [slug].tsx
- database
  |- intro-to-technical-writing
    |- intro-to-technical-writing.mdx
</code></pre>
<!-- /wp:code -->

Этот формат файла будет полезен, когда мы будем добавлять в статьи элементы, например, изображения. После этого из файла Markdown и объекта метаданных нужно удалить строку экспорта. Теперь вы можете включить в свой Markdown-файл функцию под названием frontmatter.

Это будет служить метаданными нашей страницы и автоматически обрабатываться при получении содержимого Markdown:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="markdown" class="language-markdown"><code>--- 

title: Intro to technical writing
author: Georgey
topics: technical writing, writing, documentation
description: A short introduction to technical writing
--- 

# Intro to technical writing
Technical writing is the process of writing and sharing information in a professional setting. A technical writer, or tech writer, is a person who produces technical...
{/* ...content below */}</code>
</code></pre>
<!-- /wp:code -->

Осталось только настроить next-mdx-remote внутри файла [slug].tsx. Мы будем использовать функцию динамических маршрутов Next.js для создания страницы для каждого файла в каталоге ./database.

Мне больше нравится этот подход, поскольку он отделяет содержимое Markdown от кода извлечения данных, который имеет большее значение. Внутри [slug].tsx добавьте следующие строки:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">import fs from "fs"

export async function getStaticPaths() {
  const files = fs.readdirSync('database');
  return {
    paths: files.map((file) =&gt; ({
      params: {
        slug: file,
      },
    })),
    fallback: false,
  };
}
</code></pre>
<!-- /wp:code -->

Динамические маршруты внутри ./pages должны быть указаны с количеством маршрутов, сгенерированных статически во время сборки. Для этого используется getStaticPaths. Мы можем использовать модуль файловой системы Node.js для получения имен файлов, которые будут использоваться в качестве имен маршрутов для каждой страницы статьи.

Как только это будет сделано, останется только получить конкретное содержимое Markdown. Для этого создайте функцию getStaticProps и включите в нее следующий код:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">import { GetStaticPropsContext } from 'next';
import { serialize } from "next-mdx-remote/serialize"
import path from "path"

export async function getStaticProps(ctx: GetStaticPropsContext) {
  const { slug } = ctx.params;

  const source = fs.readFileSync(
    path.join('database', slug as string, (slug + '.mdx') as string),
    'utf8'
  );

  const mdxSource = await serialize(source, { parseFrontmatter: true });
  return {
    props: {
      source: mdxSource,
    },
  };
}
</code></pre>
<!-- /wp:code -->

В приведенном выше коде запрашиваемый slug используется в качестве параметра для получения содержимого Markdown из каталога ./database. Опять же, используя модуль fs, содержимое Markdown извлекается и сериализуется в JSX для использования парсером, предоставляемым next-mdx-remote.

Мы будем использовать его на стороне клиента в ближайшее время. Обратите внимание, что мы передаем дополнительный объект в функцию serialize со свойством parseFrontmatter, чтобы разобрать frontmatter из содержимого Markdown. Без этого вы могли бы получить пустой объект после сериализации.

<h2 class="wp-block-heading">Настройка клиентской части</h2>

Теперь перейдем к клиентской части. Добавьте следующий код, чтобы сразу увидеть Markdown:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { MDXRemote } from 'next-mdx-remote';
import Head from 'next/head';

function ArticlePage({
  source,
}: InferGetStaticPropsType&lt;typeof getStaticProps&gt;) {
  return (
    &lt;div&gt;
      &lt;Head&gt;
        &lt;title&gt;{source.frontmatter.title}&lt;/title&gt;
      &lt;/Head&gt;
      &lt;MDXRemote {...source} /&gt;
    &lt;/div&gt;
  );
}

// getStaticPaths + getStaticProps

export default ArticlePage;</code></pre>
<!-- /wp:code -->

<!-- wp:image {"align":"center","id":158197} -->
<figure class="wp-block-image aligncenter"><img src="https://blog.logrocket.com/wp-content/uploads/2023/02/mdx-remote-next-js.png?is-pending-load=1" alt="Интеграция MDX и Next.js с MDX-Remote" class="wp-image-158197"/></figure>
<!-- /wp:image -->

Как и раньше, давайте добавим несколько пользовательских компонентов к парсеру MDX. Это довольно просто сделать в next-mdx-remote:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">&lt;div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8"&gt;
 &lt;MDXRemote
  {...source}
  components={{
   h1: Heading.H1,
   h2: Heading.H2,
   p: Para,
   ul: UnorderedList,
  }}
 /&gt;
&lt;/div&gt;
</code></pre>
<!-- /wp:code -->

Затем импортируйте пользовательские компоненты, которые мы использовали ранее для @next/mdx:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">import { Heading } from '../../components/mdx/Heading';
import Para from '../../components/mdx/Para';
import UnorderedList from '../../components/mdx/UnorderedList';
</code></pre>
<!-- /wp:code -->

И, вуаля!

<!-- wp:image {"align":"center","id":158199} -->
<figure class="wp-block-image aligncenter"><img src="https://blog.logrocket.com/wp-content/uploads/2023/02/mdx-integration.png?is-pending-load=1" alt="Улучшенный результат интеграции MDX в Next.js" class="wp-image-158199"/></figure>
<!-- /wp:image -->

<h2 class="wp-block-heading">Использование react-markdown для интеграции MDX</h2>

Теперь мы рассмотрим использование react-markdown в качестве стратегии для интеграции MDX. Сначала установите следующие зависимости:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">npm install react-markdown gray-matter
</code></pre>
<!-- /wp:code -->

gray-matter - это пакет для разбора frontmatter, имеющегося на нашей странице, в отличие от встроенной функции serialize в next-mdx-remote.

Давайте перейдем к нашему файлу [slug].tsx. Функция getStaticPaths останется прежней, поскольку мы получаем имена файлов. В функции getStaticProps изменится только одна вещь, а именно замена функции serialize на gray-matter. gray-matter помогает разобрать содержимое метаданных, имеющихся на странице Markdown, и сериализовать его соответствующим образом.

Импортируйте gray-matter likewise и добавьте следующий код:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">import matter from 'gray-matter';

export async function getStaticProps(ctx: GetStaticPropsContext) {
  const { slug } = ctx.params;
  const source = fs.readFileSync(
    path.join('database', slug as string, (slug + '.md') as string),
    'utf8'
  );
  const { data, content } = matter(source);
  return {
    props: {
      data,
      content,
    },
  };
}
</code></pre>
<!-- /wp:code -->

Возвращаемое значение функции matter может быть деструктурировано для получения данных и содержимого. Обратите внимание, что мы будем использовать расширение файла .md для react-markdown вместо .mdx, поэтому обязательно внесите это изменение в метод path.join() выше. Далее перейдите к функции client и добавьте следующие строки:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">import ReactMarkdown from "react-markdown"

function ArticlePage({
  data,
  content,
}: InferGetStaticPropsType&lt;typeof getStaticProps&gt;) {
  return (
    {/* header and layout */}
    &lt;Layout meta={data}&gt;
      &lt;ReactMarkdown children={content} /&gt;
    &lt;/Layout&gt;
  )
}   
</code></pre>
<!-- /wp:code -->

После этого ваша страница сможет отображать содержимое в формате Markdown. Далее, как обычно, добавим наши пользовательские компоненты. Опять же, это довольно просто в react-markdown:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">&lt;ReactMarkdown
  children={content}
  components={{
    h1: Heading.H1,
    h2: Heading.H2,
    p: Para,
    ul: UnorderedList,
  }}
/&gt;
</code></pre>
<!-- /wp:code -->

Чтобы просмотреть полный список настраиваемых компонентов, посетите официальную страницу MDX.js.

<h2 class="wp-block-heading">Ленивая загрузка и оптимизация изображений</h2>

Наша статья также может содержать изображения, поэтому давайте настроим тег img на использование компонента Next.js Image, который позволяет ленивую загрузку и оптимизацию изображений.

Сначала создайте новый файл ./components/mdx/Image.tsx:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">import Image from 'next/legacy/image';

function CustomImage({ src, alt, ...props }) {
  return (
    &lt;div className="w-[10rem] p-10 mx-auto"&gt;
      &lt;Image
        src={src}
        width={300}
        height={100}
        layout="responsive"
        alt={alt}
        {...props}
      /&gt;
    &lt;/div&gt;
  );
}
export default CustomImage;
</code></pre>
<!-- /wp:code -->

Затем добавьте его в конфигурацию внутри компонента ReactMarkdown:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">&lt;ReactMarkdown
  children={content}
  components={{
    h1: Heading.H1,
    h2: Heading.H2,
    p: Para,
    ul: UnorderedList,
    image: ({ src, alt, ...props }) =&gt; {
      return &lt;CustomImage src={src} alt={alt} {...props} /&gt;;
    },
  }}
/&gt;
</code></pre>
<!-- /wp:code -->

После этого вы сможете просмотреть изображение:

<!-- wp:image {"align":"center","id":158202} -->
<figure class="wp-block-image aligncenter"><img src="https://blog.logrocket.com/wp-content/uploads/2023/02/next-js-image-mdx.png?is-pending-load=1" alt="Добавление изображений в блог с помощью MDX и Next.js" class="wp-image-158202"/></figure>
<!-- /wp:image -->

<h2 class="wp-block-heading">Добавление подсветки синтаксиса</h2>

Еще одна интересная функция, которую вы можете добавить в свои блоги, - подсветка синтаксиса для блоков кода. Для этого мы будем использовать react-syntax-highlighter. Чтобы установить его, используйте npm следующим образом:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">npm install react-syntax-highlighter
</code></pre>
<!-- /wp:code -->

Затем импортируйте Provider и тему, которую мы будем использовать для блоков кода:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">// syntax-highlighter
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
</code></pre>
<!-- /wp:code -->

Внутри компонента ReactMarkdown добавьте еще один пользовательский компонент:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">&lt;ReactMarkdown
  children={content}
  components={{
    ...components,
    code({ node, inline, className, children, ...props }) {
     const match = /language-(\w+)/.exec(className || '');
     return !inline &amp;&amp; match ? (
      &lt;SyntaxHighlighter
       children={String(children).replace(/\n$/, '')}
       style={atomDark}
       language={match[1]}
       PreTag="div"
       {...props}
      /&gt;
     ) : (
      &lt;span className={className} {...props}&gt;
       {children}
      &lt;/span&gt;
     );
    },
  }}
/&gt;
</code></pre>
<!-- /wp:code -->

Эта строка кода проверяет содержимое Markdown на наличие одного тега кода ”<code>” или блока кода, который обычно обернут в "</code>---content---``”. Если это блок кода, он извлекает язык и присваивает его компоненту SyntaxHighlighter, добавляя соответствующую подсветку синтаксиса. После добавления этой функции вы должны увидеть следующую тему на ваших фрагментах кода:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="markdown" class="language-markdown">```js
let name = "Georgey";

console.log("Hello " + name );
```
</code></pre>
<!-- /wp:code -->

<!-- wp:image {"align":"center","id":158208} -->
<figure class="wp-block-image aligncenter"><img src="https://blog.logrocket.com/wp-content/uploads/2023/02/mdx-next-js-image-optimization.png?is-pending-load=1" alt="Next.js Image Optimization" class="wp-image-158208"/></figure>
<!-- /wp:image -->

<h2 class="wp-block-heading">Заключение</h2>

В заключение следует отметить, что три различные стратегии интеграции MDX, описанные в этой статье, имеют уникальные преимущества и компромиссы. Добавив @next/mdx в свой проект Next.js, вы сможете легко писать JSX в своих Markdown-файлах и использовать преимущества автоматического разделения кода, предоставляемого Next.js.

next-mdx-remote позволяет отделить содержимое Markdown от кодовой базы и упростить управление. В то же время react-markdown предоставляет вам легкое решение для преобразования Markdown в JSX с минимальной настройкой. В конечном итоге наилучшая стратегия интеграции MDX для вашего проекта Next.js будет зависеть от ваших конкретных потребностей и требований.
