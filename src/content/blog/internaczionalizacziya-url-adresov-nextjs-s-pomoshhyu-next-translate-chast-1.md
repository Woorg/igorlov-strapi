---
title: Интернационализация URL-адресов NextJs с помощью next-translate (часть 1)
meta_title: >-
  Интернационализация URL-адресов NextJs с помощью next-translate (часть 1) -
  Igor Gorlov
description: "I18n URL были доступны во всех основных генераторах статических сайтов, но почему-то отсутствуют в NextJs, и это определенно жаль \U0001F614."
date: 2023-03-18T00:38:11.000Z
author: Igor Gorlov
image: ../../assets/images/undefined-Mar-18-2023.avif
categories:
  - Как закодить
tags:
  - i18n
  - JavaScript
  - Next.js
draft: false
lastmod: 2024-03-20T21:26:48.209Z
---

I18n URL были доступны во всех основных генераторах статических сайтов, но почему-то отсутствуют в NextJs, и это определенно жаль 😔.

Я француз и всегда создаю свои сайты как минимум на французском и английском языках.

Вот подробное объяснение того, как любой разработчик может добиться этого менее чем за 10 минут и наконец-то иметь возможность работать с такими урлами, как

<!-- wp:rank-math/toc-block {"title":"Оглавление","headings":[{"key":"cacc2905-c2bf-40a6-9791-c0e071cb0843","content":"TLDR","level":2,"link":"#tldr","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"714e3d73-2e4c-4988-971d-5bc11afd2dec","content":"Предварительные условия","level":2,"link":"#предварительные-условия","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"c13921f2-03ed-4618-887b-f656cc8eb96d","content":"Что будет сделано","level":2,"link":"#что-будет-сделано","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"cdc9a77a-262b-4bc5-af61-860614863053","content":"Процедура","level":2,"link":"#процедура","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"523163b3-b053-43f8-9b2b-120bba18bf2e","content":"Укажите пермалинки","level":3,"link":"#укажите-пермалинки","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"6319731e-ae23-4595-b22f-67f7a16a0eab","content":"Усиление функции nextTranslate","level":3,"link":"#усиление-функции-next-translate","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"f45e3271-f95b-4747-a39e-90b18f0245f8","content":"Адаптация компонента Link","level":3,"link":"#адаптация-компонента-link","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"91ca38b6-9628-404c-a324-2c9adc08d19a","content":"Ссылка","level":2,"link":"#ссылка","disable":false,"isUpdated":false,"isGeneratedLink":true}],"listStyle":"ul"} -->
<div class="wp-block-rank-math-toc-block" id="rank-math-toc"><h2>Оглавление</h2><nav><ul><li class=""><a href="#tldr">TLDR</a></li><li class=""><a href="#предварительные-условия">Предварительные условия</a></li><li class=""><a href="#что-будет-сделано">Что будет сделано</a></li><li class=""><a href="#процедура">Процедура</a><ul><li class=""><a href="#укажите-пермалинки">Укажите пермалинки</a></li><li class=""><a href="#усиление-функции-next-translate">Усиление функции nextTranslate</a></li><li class=""><a href="#адаптация-компонента-link">Адаптация компонента Link</a></li></ul></li><li class=""><a href="#ссылка">Ссылка</a></li></ul></nav></div>
<!-- /wp:rank-math/toc-block -->

<h2 class="wp-block-heading" id="tldr">TLDR</h2>

Репозиторий со всем исходным кодом можно найти на <a href="https://github.com/martinratinaud/next-translate-i18n-routes" target="_blank" rel="noreferrer noopener nofollow">GitHub</a>

<h2 class="wp-block-heading" id="предварительные-условия">Предварительные условия</h2>

В этом руководстве используется отличная библиотека next-translate, но ее можно адаптировать для next-i18next.

наличие next-translate, уже установленного в вашем проекте.

<h2 class="wp-block-heading" id="что-будет-сделано">Что будет сделано</h2>

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Генерировать правила переписывания, которые заставят URL-адреса адаптироваться в соответствии с языком, выбранным пользователем</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Переоснастить функцию nextTranslate для использования этих перезаписей</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Написать пользовательский компонент Link, который будет использовать эти правила переписывания для создания соответствующих i18n-слогов и использовать их для навигации.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<h2 class="wp-block-heading" id="процедура">Процедура</h2>

Во всех последующих шагах созданные файлы и функции будут помещены в папку modules/I18n.Это практика, к которой я пришел после многих лет программирования и которая очень помогает разделять части приложения (в данном случае всю логику, связанную с I18n).Скоро я напишу об этом статью в блоге.

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="укажите-пермалинки">Укажите пермалинки</h3>

Первое, что необходимо сделать, это указать пермалинки, которые мы хотим использовать.Давайте создадим modules/I18n/permalinks.json

<!-- wp:code -->
<pre class="wp-block-code"><code lang="json" class="language-json">{
  "https://dev.to/": {
    "fr": "/accueil"
  }
}
</code></pre>
<!-- /wp:code -->

ПРИМЕЧАНИЕ: это не идеальное решение для меня, так как оно отделяет фактическую страницу (jsx файл) от определения ее пермалинков, и было бы лучше иметь экспорт const пермалинков изнутри страницы. Эта проблема рассматривается в части 2 этой статьи (и вы также можете связаться со мной, если вам нужна дополнительная информация).

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="усиление-функции-next-translate">Усиление функции nextTranslate</h3>

Цель здесь - преобразовать созданные нами пермалинки в правила перезаписи, чтобы NextJS мог правильно переписывать URL в зависимости от языка.

TLDR См. коммит на <a href="https://github.com/martinratinaud/next-translate-i18n-routes/commit/c03e2d74ad8c19e052e1ebb5b23e9babe65492d1" target="_blank" rel="noreferrer noopener nofollow">GitHub</a>

Создайте modules/I18n/next.config.js с

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">const nextTranslate = require('next-translate-plugin');
const fs = require('fs');
const permalinks = require('./permalinks.json');

/**
 * 
 * Transforms
{
  "https://dev.to/": {
    "fr": "/accueil"
  }
}
 * into
[
  {
    source: '/fr/accueil',
    destination: '/fr',
    locale: false
  }
]
*/
const permalinksToRewriteRules = (permalinks) =&gt;
  Object.entries(permalinks).reduce(
    (acc, [originalSlug, permalinks]) =&gt; [
      ...acc,
      ...Object.entries(permalinks).reduce(
        (acc2, [locale, i18nSlug]) =&gt; [
          ...acc2,
          {
            source: `/${locale}${i18nSlug}`,
            destination: `/${locale}${originalSlug}`,
            locale: false,
          },
        ],
        []
      ),
    ],
    []
  );

module.exports = (nextConfig) =&gt; {
  const nextTranslateConfig = nextTranslate(nextConfig);

  return {
    ...nextTranslateConfig,
    async rewrites() {
      const existingRewrites = nextTranslateConfig.rewrites
        ? await nextTranslateConfig.rewrites()
        : [];
      return [...permalinksToRewriteRules(permalinks), ...existingRewrites];
    },
  };
};
</code></pre>
<!-- /wp:code -->

и замените вызов функции в файле next.config.js

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">- const nextTranslate = require('next-translate-plugin')
+ const nextTranslate = require('./src/modules/I18n/next.config');
</code></pre>
<!-- /wp:code -->

Отлично, теперь, если вы перезагрузите свой сервер, вы сможете получить доступ к странице

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>http://localhost:3000/fr/accueil</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

Теперь давайте адаптируем компонент Link, чтобы он учитывал этот новый URL

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="адаптация-компонента-link">Адаптация компонента Link</h3>

Цель состоит в том, чтобы иметь возможность переходить непосредственно к красивым URL, определенным ранее.

TLDR: См. коммит на <a href="https://github.com/martinratinaud/next-translate-i18n-routes/commit/24da9244238f65af9c9ab3077f74edc558b698b7" target="_blank" rel="noreferrer noopener nofollow">GitHub</a>

Необходимо создать новый компонент modules/I18n под названием Link и изменить все импорты next/link.

Да, это действительно больная тема, я признаю, но я не смог найти способ сделать по-другому.

На самом деле это не такая уж большая проблема, так как простой ”поиск и замена” будет работать

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">- import Link from 'next/link';
+ import { Link } from 'modules/I18n';
</code></pre>
<!-- /wp:code -->

Во-первых, переменная permalinks должна быть открыта для фронтенда, чтобы ее мог использовать создаваемый компонент Link.

В nextJs это делается с помощью

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">  return {
    ...nextTranslateConfig,
+    publicRuntimeConfig: {
+      ...nextTranslateConfig.publicRuntimeConfig,
+      permalinks, // add it to publicRuntimeConfig so it can be used by the Link component
+    },
    async rewrites() {
    ...
</code></pre>
<!-- /wp:code -->

Встроенный в nextJS компонент Link работает следующим образом: он строит URL из href и переданной (или существующей) локали.

Это означает, что ссылка на / в fr приведет к /fr.

Этот компонент создаст карту URL для прямого перехода к соответствующему правильному URL /fr/accueil

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const permalinks: { [key: string]: { [key: string]: string } } =
  publicRuntimeConfig.permalinks || {};

/**
 * Formats permalinks
{
  "https://dev.to/": {
    "fr": "/accueil"
  }
}
 * into
{
  "/fr/": "/fr/accueil",
  "/en/accueil": "https://dev.to/"
} 
 */
export const i18nFallbackUrls: { [key: string]: string } = Object.entries(
  permalinks
).reduce(
  (acc, [originalSlug, permalinks]) =&gt; ({
    ...acc,
    ...Object.entries(permalinks || {}).reduce(
      (acc2, [locale, permalink]) =&gt; ({
        ...acc2,
        [`/${locale}${originalSlug}`]: `/${locale}${permalink}`,
        [`/en${permalink}`]: originalSlug,
      }),
      {}
    ),
  }),
  {}
);

const I18nLink = ({ href, locale, ...props }: any) =&gt; {
  const router = useRouter();
  const wantedLocale = locale || router.locale;
  let i18nProps: any = {
    href,
    locale,
  };

  if (i18nFallbackUrls[`/${wantedLocale}${href}`]) {
    i18nProps = {
      href: i18nFallbackUrls[`/${wantedLocale}${href}`],
      locale: false,
    };
  }

  return &lt;Link {...i18nProps} {...props} /&gt;;
};

export default I18nLink;
</code></pre>
<!-- /wp:code -->

И вуаля! Все готово, и вот как это выглядит.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--p6f97oQH--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/lxja36rhdydohaswfhdm.gif" alt="Image description"/></figure>
<!-- /wp:image -->

<h2 class="wp-block-heading" id="ссылка">Ссылка</h2>

Посмотрите <a href="https://github.com/martinratinaud/next-translate-i18n-routes" target="_blank" rel="noreferrer noopener nofollow">Github Repo</a>
