---
title: Svelte Stores x Dexie 2.0
meta_title: Svelte Stores x Dexie 2.0 - Igor Gorlov
description: >-
  Мой первый пост был посвящен подключению svelte store к indexedDB. Этот пост
  будет обновлением на ту же тему. Продолжайте читать, если вам нужен совершенно
  другой подход, более практичный в большинстве случаев!
date: 2023-04-20T18:18:03.000Z
author: Igor Gorlov
image: ../../assets/images/undefined-Apr-20-2023.avif
categories:
  - Как закодить
tags:
  - JavaScript
  - Svelte
draft: false
lastmod: 2024-03-20T21:26:43.118Z
---

Мой первый пост был посвящен подключению svelte store к indexedDB. Этот пост будет обновлением на ту же тему. Продолжайте читать, если вам нужен совершенно другой подход, более практичный в большинстве случаев!

<!-- wp:rank-math/toc-block {"title":"Оглавление","headings":[{"key":"dc14eab5-fca9-4722-9f80-d71f6bbfeeaa","content":"Чего я хочу добиться","level":2,"link":"#чего-я-хочу-добиться","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"72007409-27fd-438c-a989-c9619994c613","content":"Проблема","level":2,"link":"#проблема","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"5c5701a8-802c-4ece-bbec-71c7b0bbc6d7","content":"Решение","level":2,"link":"#решение","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"42f6e725-f409-471d-817e-ac2561f227d9","content":"Создайте db.js","level":2,"link":"#создайте-db-js","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"d741ce15-b509-468d-b1d7-d876707a259e","content":"Создайте stores.js","level":2,"link":"#создайте-stores-js","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"2e627457-f5c2-4a1d-a5f2-b8fa9d707b73","content":"Выполняйте действия, когда данные загружены","level":2,"link":"#выполняйте-действия-когда-данные-загружены","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"7fd92d39-0666-4112-8269-a7fda28cb259","content":"Как сохранить","level":2,"link":"#как-сохранить","disable":false,"isUpdated":false,"isGeneratedLink":true}],"listStyle":"ul"} -->
<div class="wp-block-rank-math-toc-block" id="rank-math-toc"><h2>Оглавление</h2><nav><ul><li class=""><a href="#чего-я-хочу-добиться">Чего я хочу добиться</a></li><li class=""><a href="#проблема">Проблема</a></li><li class=""><a href="#решение">Решение</a></li><li class=""><a href="#создайте-db-js">Создайте db.js</a></li><li class=""><a href="#создайте-stores-js">Создайте stores.js</a></li><li class=""><a href="#выполняйте-действия-когда-данные-загружены">Выполняйте действия, когда данные загружены</a></li><li class=""><a href="#как-сохранить">Как сохранить</a></li></ul></nav></div>
<!-- /wp:rank-math/toc-block -->

<h2 class="wp-block-heading" id="чего-я-хочу-добиться">Чего я хочу добиться</h2>

Я хочу сохранять данные в indexedDB и использовать их в своем приложении.

<h2 class="wp-block-heading" id="проблема">Проблема</h2>

Поскольку idexedDB работает асинхронно, в большинстве случаев страница загружается раньше данных, что приводит к некрасивому мерцанию при обновлении элементов из-за реактивной природы svelte. Поэтому, по возможности, данные должны загружаться из хранилища, а не из самой indexedDB. Очевидно, что данные должны быть загружены один раз при начальной загрузке страницы — но в SPA это все!

<h2 class="wp-block-heading" id="решение">Решение</h2>

Маленькое хранилище со специальной функцией, которая получает данные из индексированной базы данных. В принципе, это все, но есть несколько важных тонкостей, которые я объясню через минуту.

Установите Dexie

Для того чтобы использовать это, вам нужно установить Dexie.js:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">npm install dexie
</code></pre>
<!-- /wp:code -->

<h2 class="wp-block-heading" id="создайте-db-js">Создайте db.js</h2>

Это очень минималистичная установка для вашей indexedDB, которая находится в папке lib:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">import Dexie from 'dexie';

export const db = new Dexie("user");

db.version(1).stores({
  user: "key, value"
});
</code></pre>
<!-- /wp:code -->

<h2 class="wp-block-heading" id="создайте-stores-js">Создайте stores.js</h2>

Это фактический магазин, который вы можете использовать в вашем +page.svelte. Как вы видите, в нем есть функция sync, которая получает данные из индексированной базы данных Dexie и устанавливает данные userData. Она также возвращает обещание, которое будет очень полезно через секунду.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">import { writable } from "svelte/store";
import { db } from "$lib/db";

export const userData = writable([]);

userData.sync = function() {
    return new Promise (async (resolve, reject) =&gt; {
        try {
            const data = await db.progress.toArray();
            userData.set(data);

            resolve();
        } catch (error) {
            console.error(error);

            reject (error);
        }
    })
}
</code></pre>
<!-- /wp:code -->

Как загрузить

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">import { userData } from "@stores"; // I am using an alias here

&lt;script&gt;
    function handleMount() {
        userData.sync()
    }

    onMount(handleMount);
&lt;/script&gt;

&lt;main&gt;
    {#each userData as data}
        &lt;p&gt;{data.name}, {data.age}&lt;/p&gt;
    {/each}
&lt;/main&gt;
</code></pre>
<!-- /wp:code -->

<h2 class="wp-block-heading" id="выполняйте-действия-когда-данные-загружены">Выполняйте действия, когда данные загружены</h2>

Иногда необходимо дождаться данных, чтобы вызвать функцию. Это больше не проблема, поскольку вы можете просто использовать .then после функции sync-Function.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">import { userData } from "@stores"; // I am using an alias here

&lt;script&gt;
    function handleMount() {
        userData.sync()
        .then(() =&gt; {
            // do stuff!
        })
    }

    onMount(handleMount);
&lt;/script&gt;

&lt;main&gt;
    {#each userData as data}
        &lt;p&gt;{data.name}, {data.age}&lt;/p&gt;
    {/each}
&lt;/main&gt;
</code></pre>
<!-- /wp:code -->

<h2 class="wp-block-heading" id="как-сохранить">Как сохранить</h2>

Чтобы сохранить данные в indexedDB, просто используйте Dexie API, а затем обновите хранилище:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">    function saveData() {
        db.user.put({ name, inputValue });
        userData.sync()
    }
</code></pre>
<!-- /wp:code -->

Мне очень нравится этот рабочий процесс, поскольку он дает мне больше контроля, чем предыдущее решение, но при этом остается очень, очень простым!

Ваше здоровье,
