---
title: Разъяснение JavaScript IIFE
meta_title: |
  Разъяснение JavaScript IIFE - Фул Фронт Дев
description: >
  IIFE (Immediately Invoked Function Expression) – один из самых популярных
  паттернов проектирования в JavaScript. Аббревиатура произносится как "айфи".
date: 2023-10-22T22:40:05.002Z
image: ../../assets/images/razuyasnenie-javascript-iife-Oct-23-2023.avif
categories:
  - Учебник
author: Igor Gorlov
tags:
  - JavaScript
draft: false
keywords:
  - JavaScript IIFE
type: blog
slug: razuyasnenie-javascript-iife
lastmod: 2024-03-20T21:26:48.993Z
---

<!-- wp:rank-math/toc-block {"title":"Структура содержания","headings":[{"key":"8322c444-a424-4305-b2b9-a5acf44f2602","content":"Что такое IIFE?","level":2,"link":"#что-такое-iife","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"c7254f4e-18a6-4f0e-a82a-0149706a8248","content":"Зачем она используется?","level":2,"link":"#зачем-она-используется","disable":false,"isUpdated":false,"isGeneratedLink":true}],"listStyle":"ul"} -->
<div class="wp-block-rank-math-toc-block" id="rank-math-toc"><h2>Содержание</h2><nav><ul><li class=""><a href="#что-такое-iife">Что такое IIFE?</a></li><li class=""><a href="#зачем-она-используется">Зачем она используется?</a></li></ul></nav></div>
<!-- /wp:rank-math/toc-block -->

IIFE (Immediately Invoked Function Expression) – один из самых популярных паттернов проектирования в JavaScript. Аббревиатура произносится как "айфи".

Звучит сложно? Не волнуйтесь! В этой статье мы разберем, что такое IIFE, как его использовать и многое другое! После прочтения этой статьи вы получите ясное представление о IIFE.

<h2 class="wp-block-heading" id="что-такое-iife">Что такое IIFE?</h2>

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--dpVFpAdZ--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://imgs.search.brave.com/I-WKciK1kulobb42P9xXsDCa62fVXanBgqXMHmTLBZI/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9taXJv/Lm1lZGl1bS5jb20v/djIvMSpvVzI5QU9P/UFpvdzRiMGd0bmVM/aDRRLnBuZw" alt=""/></figure>
<!-- /wp:image -->

IIFE расшифровывается как "Immediately Invoked Function Expression" (немедленно вызываемое функциональное выражение).

"IIFE (немедленно вызываемое функциональное выражение) - это JavaScript-функция, которая выполняется немедленно после своего определения. Это самовызывающаяся функция, которая обычно используется для создания закрытой области видимости, инкапсуляции кода и предотвращения загрязнения переменных в глобальном пространстве имен."

Давайте разберем синтаксис:

```javascript
(function Greet() {
	console.log('Hello Folks');
})();

// Output: Hello Folks
```

Заметили разницу?

Здесь мы обернули функцию скобками, а затем вызвали ее.

Но почему?

Мы оборачиваем функцию в скобки, чтобы рассматривать ее как выражение, а не как объявление функции. И мы используем еще один набор скобок для немедленного вызова функции.

Но что произойдет, если мы не используем внешние скобки?

Давайте рассмотрим это на примере.

```javascript
function Greet(){
    console.log("Hello Folks");
}()

// Output: Uncaught SyntaxError: Unexpected token ')'

```

Это вызывает ошибку, просто потому, что в обычном синтаксисе функции мы не можем вызвать функцию напрямую. В этом случае нам нужно явно вызвать функцию.

Поэтому для использования IIFE нам нужно использовать внешние скобки.

<h2 class="wp-block-heading" id="зачем-она-используется">Зачем она используется?</h2>

Существует много причин использовать IIFE. Вот некоторые из них:

<!-- wp:list {"ordered":true} -->
<ol><!-- wp:list-item -->
<li>Создание изолированной области видимости:</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

IIFE создает новую функциональную область видимости, что помогает избежать конфликтов имен переменных и функций с другими частями кода. Переменные, определенные внутри IIFE, не доступны из внешней области видимости, что сохраняет их в частной и изолированной области.

<!-- wp:list {"ordered":true,"start":2} -->
<ol start="2"><!-- wp:list-item -->
<li>Предотвращение загрязнения глобальной области видимости:</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

Как вы знаете, переменные, объявленные в глобальной области видимости, доступны каждой функции. Иногда это приводит к конфликтам и ошибкам. Для предотвращения этого IIFE очень полезна, так как она создает свою собственную область видимости и сохраняет переменные в ней, защищая их от загрязнения глобальной области видимости.

<!-- wp:list {"ordered":true,"start":3} -->
<ol start="3"><!-- wp:list-item -->
<li>Одноразовое использование:</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

IIFE полезны для выполнения кода, который должен выполняться только один раз при инициализации приложения.

Спасибо за чтение :)

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--mRzvhI1R--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://cdn.hashnode.com/res/hashnode/image/upload/v1690697017967/37521c8d-59fb-4f86-99ef-36877e7fc7a8.png" alt=""/></figure>
<!-- /wp:image -->
