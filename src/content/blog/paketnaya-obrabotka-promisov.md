---
title: Пакетная обработка промисов
meta_title: Пакетная обработка промисов - Igor Gorlov
description: >-
  Одним из способов одновременного выполнения кода в JavaScript является
  одновременный вызов множества обещаний без ожидания их результатов, затем вы
  используете Promise.all для ожидания завершения всех обещаний. 
date: 2023-03-19T21:48:01.000Z
author: Igor Gorlov
image: ../../assets/images/undefined-Mar-20-2023.avif
categories:
  - Учебник
tags:
  - JavaScript
  - Promise
draft: false
lastmod: 2024-03-20T21:26:48.360Z
---

<!-- wp:rank-math/toc-block {"title":"Оглавление","headings":[{"key":"df719161-088a-48cf-b5fc-e839a1a70d7b","content":"Одновременное выполнение кода","level":2,"link":"#одновременное-выполнение-кода","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"fcbcb3c9-2eef-4073-aca7-5888e78e183d","content":"Одновременное выполнение многих обещаний","level":2,"link":"#одновременное-выполнение-многих-обещаний","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"9f97c75b-4723-40ca-968f-929a0497bc67","content":"Пакетная обработка обещаний","level":2,"link":"#пакетная-обработка-обещаний","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"617dcbcf-a4c8-43bc-a754-d595c6ce8dc8","content":"В заключение","level":2,"link":"#в-заключение","disable":false,"isUpdated":false,"isGeneratedLink":true}],"listStyle":"ul"} -->
<div class="wp-block-rank-math-toc-block" id="rank-math-toc"><h2>Оглавление</h2><nav><ul><li class=""><a href="#одновременное-выполнение-кода">Одновременное выполнение кода</a></li><li class=""><a href="#одновременное-выполнение-многих-обещаний">Одновременное выполнение многих обещаний</a></li><li class=""><a href="#пакетная-обработка-обещаний">Пакетная обработка обещаний</a></li><li class=""><a href="#в-заключение">В заключение</a></li></ul></nav></div>
<!-- /wp:rank-math/toc-block -->

<h2 class="wp-block-heading" id="одновременное-выполнение-кода">Одновременное выполнение кода</h2>

Чтобы ускорить выполнение, мы обычно выполняем код параллельно.<br>Одним из способов одновременного выполнения кода в JavaScript является одновременный вызов множества обещаний без ожидания их результатов, затем вы используете Promise.all для ожидания завершения всех обещаний. Посмотрите пример ниже:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">const promiseA = asyncFnA();
const promiseB = asyncFnB();

const results = await Promise.all([promiseA, promiseB]);
</code></pre>
<!-- /wp:code -->

Приведенный выше код будет выполнять asyncFnA и asyncFnB одновременно, а Promise.all будет ожидать выполнения обоих обещаний для разрешения.

<h2 class="wp-block-heading" id="одновременное-выполнение-многих-обещаний">Одновременное выполнение многих обещаний</h2>

Давайте посмотрим на этот код

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">const users = await User.find(); // return all users in the database

const results = await Promise.all(users.map(async (user) =&gt; processUser(user));
</code></pre>
<!-- /wp:code -->

Этот код будет выполнять столько обещаний, сколько пользователей в вашей базе данных. Node и JavaScript не очень хорошо справляются с одновременным выполнением многих обещаний, а Go справляется с этим хорошо.<br>Этот код, вероятно, будет потреблять много процессора и памяти и в итоге закончится.<br>Чтобы решить эту проблему, нам нужно обработать все эти обещания в пакетном режиме

<h2 class="wp-block-heading" id="пакетная-обработка-обещаний">Пакетная обработка обещаний</h2>

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">export async function processPromisesBatch(
  items: Array&lt;any&gt;,
  limit: number,
  fn: (item: any) =&gt; Promise&lt;any&gt;,
): Promise&lt;any&gt; {
  let results = [];
  for (let start = 0; start &lt; items.length; start += limit) {
    const end = start + limit &gt; items.length ? items.length : start + limit;

    const slicedResults = await Promise.all(items.slice(start, end).map(fn));

    results = [
      ...results,
      ...slicedResults,
    ]
  }

  return results;
}
</code></pre>
<!-- /wp:code -->

Usage

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">const results = await processPromisesBatch(users, 100, processUser)
</code></pre>
<!-- /wp:code -->

<code>processPromisesBatch </code>нарежет ваши элементы на куски размером N и выполнит N обещаний одновременно.<br>Это гарантирует, что он не будет потреблять много процессора и памяти, а также не перегрузит цикл событий.

<h2 class="wp-block-heading" id="в-заключение">В заключение</h2>

Понимание ограничений вашего языка программирования и среды выполнения может помочь вам разработать решение для их обхода.

Поделитесь решениями, которые вы разработали на основе ограничений вашего языка программирования, среды выполнения или фреймворка.
