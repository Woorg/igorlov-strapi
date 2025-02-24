---
title: 5 способов центрирования дива
meta_title: 5 способов центрирования дива - Фул Фронт Дев
description: >-
  Оглавление 1. Flexbox 2. Grid 3. Используя позиционирование 4. Используя Flex
  & Margin 5. Используя Grid & Margin 1. Flexbox.parent { display: flex;...
date: 2023-08-19T16:04:00.000Z
image: ../../assets/images/undefined-Aug-19-2023.avif
categories:
  - Как закодить
author: Igor Gorlov
tags:
  - Css
draft: false
lastmod: 2024-03-20T21:26:45.035Z
---

<!-- wp:rank-math/toc-block {"title":"Оглавление","headings":[{"key":"8b8d8191-8de4-4269-82be-291f7335cb9f","content":"1. Flexbox","level":2,"link":"#1-flexbox","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"6bd560ef-7676-4dc9-95d2-0abb5f7fea3d","content":"2. Grid","level":2,"link":"#2-grid","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"7d7f9de9-2a51-4a65-906e-e36d74993d2f","content":"3. Используя позиционирование","level":2,"link":"#3-используя-позиционирование","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"0001f0d0-7ee9-4949-9720-07bd6dbd7340","content":"4. Используя Flex \u0026 Margin","level":2,"link":"#4-используя-flex-margin","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"19ea4a2e-46fd-46fd-85b6-e1d0fc9dd4c4","content":"5. Используя Grid \u0026 Margin","level":2,"link":"#5-используя-grid-margin","disable":false,"isUpdated":false,"isGeneratedLink":true}],"listStyle":"ul"} -->
<div class="wp-block-rank-math-toc-block" id="rank-math-toc"><h2>Оглавление</h2><nav><ul><li class=""><a href="#1-flexbox">1. Flexbox</a></li><li class=""><a href="#2-grid">2. Grid</a></li><li class=""><a href="#3-используя-позиционирование">3. Используя позиционирование</a></li><li class=""><a href="#4-используя-flex-margin">4. Используя Flex &amp; Margin</a></li><li class=""><a href="#5-используя-grid-margin">5. Используя Grid &amp; Margin</a></li></ul></nav></div>
<!-- /wp:rank-math/toc-block -->

<h2 class="wp-block-heading" id="1-flexbox">1. Flexbox</h2>

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript"> .parent {
    display: flex;
    justify-content: center;
    align-items: center;
 } 

</code></pre>
<!-- /wp:code -->

<h2 class="wp-block-heading" id="2-grid">2. Grid</h2>

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">.parent {
    display: grid;
    place-content: center;
}
</code></pre>
<!-- /wp:code -->

<h2 class="wp-block-heading" id="3-используя-позиционирование">3. Используя позиционирование</h2>

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">.parent {
    position: relative;
}

.child {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</code></pre>
<!-- /wp:code -->

<h2 class="wp-block-heading" id="4-используя-flex-margin">4. Используя Flex &amp; Margin</h2>

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">.parent {
    display: flex;

}

.child {
    margin: auto;
}
</code></pre>
<!-- /wp:code -->

<h2 class="wp-block-heading" id="5-используя-grid-margin">5. Используя Grid &amp; Margin</h2>

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">.parent {
    display: grid;
}

.child {
    margin: auto;
}
</code></pre>
<!-- /wp:code -->
