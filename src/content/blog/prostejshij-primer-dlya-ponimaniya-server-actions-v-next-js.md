---
title: Простейший пример для понимания Server Actions в Next.js
meta_title: Простейший пример для понимания Server Actions в Next.js - Фул Фронт Дев
description: >-
  Server Actions — это новая возможность в Next.js. Когда я впервые услышал о
  них, они показались мне не очень интуитивно понятными. Теперь, когда я
  немного...
date: 2023-08-19T15:57:00.000Z
image: ../../assets/images/undefined-Aug-19-2023.avif
categories:
  - Учебник
author: Igor Gorlov
tags:
  - React
  - Next.js
draft: false
lastmod: 2024-03-20T21:26:47.044Z
---

Server Actions — это новая возможность в Next.js. Когда я впервые услышал о них, они показались мне не очень интуитивно понятными. Теперь, когда я немного привык к ним, позвольте мне внести свой вклад в облегчение их понимания.

Я попытался создать минимально возможный пример, чтобы помочь разработчикам понять, что это такое и для чего их можно использовать. В результате получился этот пример, состоящий из двух файлов:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">// client-component.tsx
'use client'
import { useEffect, useState } from 'react'
import { getInformationFromTheServer } from './actions'

export function ClientComponent() {
  const [info, setInfo] = useState('')

  useEffect(() =&gt; {
    getInformationFromTheServer('World').then((res) =&gt; setInfo(res))
  }, [])

  return (
    &lt;p&gt;
      This comes from the server: &lt;code&gt;{info}&lt;/code&gt;
    &lt;/p&gt;
  )
}
</code></pre>
<!-- /wp:code -->

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">// actions.ts
'use server'

export async function getInformationFromTheServer(name: string) {
  return `Hello ${name}!`
}
</code></pre>
<!-- /wp:code -->

Пример использования следующий: В клиентском компоненте мы хотим получить некоторую информацию от сервера. Без серверных действий нам пришлось бы:

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Либо получить эту информацию в виде реквизита, передаваемого родительским компонентом (предполагается, что это серверный компонент),</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Либо создавать API-маршрут и вызывать его из клиентского компонента с помощью fetch. Серверные действия похожи на второй вариант, но с небольшим преимуществом: API-маршрут будет создан Next.js за нас.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

В нашем примере серверным действием является функция getInformationFromTheServer, объявленная в файле actions.ts (серверные действия не могут быть определены в том же файле, что и клиентский компонент). Как и любое другое серверное действие:

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Она объявлена как async (так и должно быть, даже если она не выполняет никаких async-операций),</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>В нем используется директива 'use server' (либо в верхней части файла, либо в верхней части функции).</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

Из клиентского компонента мы можем вызвать функцию, как и любую другую функцию побочного эффекта (async): в useEffect или в обратном вызове события.

<!-- wp:image {"sizeSlug":"large"} -->
<figure class="wp-block-image size-large"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--syOvpCas--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/hdsvxn8ix9mcbuw9t7zb.png" alt=""/></figure>
<!-- /wp:image -->

Кажется, что мы просто вызываем функцию, поэтому возникает вопрос, почему все так суетятся вокруг действий сервера… Присмотритесь: из клиентского компонента мы вызываем функцию, хранящуюся на сервере.

Это означает, что это не просто вызов функции: на самом деле для вызова функции выполняется HTTP-запрос к API. Это можно увидеть на вкладке Network в DevTools:

<!-- wp:image {"sizeSlug":"large"} -->
<figure class="wp-block-image size-large"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--BjRwWOe_--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/k2lyqz3ybfckcgqc8ft1.png" alt=""/></figure>
<!-- /wp:image -->

Конечная точка находится на том же пути, что и текущая страница, но:

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Используется метод POST,</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Требуются некоторые заголовки, например, Next-Action, содержащий некий идентификатор действия сервера,</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Получает параметры для передачи в функцию из тела запроса (в виде JSON).</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

Если скопировать идентификатор действия сервера из заголовков, то можно даже вызвать конечную точку API с помощью cURL:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">$ curl 'http://localhost:3001/getting-info-from-server' \
  -H 'Content-Type: text/plain;charset=UTF-8' \
  -H 'Next-Action: da9f55acc16563503a57a4fdfe567f8770898818' \
  -X POST --data-raw '["World"]'
0:["$@1",["development",null]]
1:"Hello World!"
</code></pre>
<!-- /wp:code -->

Примечание: В Chrome DevTools на момент написания этого сообщения, похоже, невозможно увидеть результат запроса, поскольку он отправляется с использованием HTTP-потока. С cURL это работает хорошо 😉.

Как видите, ничего магического в server actions нет:

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Next.js берет нашу функцию getInformationFromTheServer,</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>И делает ее вызываемой через определенную конечную точку API,</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Из клиентского компонента, когда мы думаем, что вызываем определенную нами функцию, на самом деле мы вызываем функцию, сгенерированную Next.js, которая решает за нас вопрос с вызовом необходимого API.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

Если вы знакомы с паттернами распределенных вычислений, то можете заметить, что действия сервера предлагают паттерн удаленного вызова процедур (RPC) для приложений Next.js.

Пример с cURL демонстрирует очень важную особенность серверных действий: каждый может вызывать существующие серверные действия с любыми параметрами! Это означает, что параметры, получаемые серверными действиями, должны быть проверены, как и любой параметр, отправляемый в классический API-маршрут.

Это особенно не интуитивно при использовании TypeScript. Даже если вы объявите, что ваша функция должна получать строковый параметр, эта функция будет доступна для всего остального мира, даже для больших плохих хакеров, которые захотят отправить вместо него число.

Учитывая это, серверные действия все еще предлагают хороший шаблон для получения информации от сервера, особенно в клиентском компоненте. Дальше мы можем представить себе более сложные варианты использования:

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Изменение данных на сервере (например, в базе данных),</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>отправка электронного письма,</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>обработка данных, введенных в форму, и т.д.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

И, как и в любой другой конечной точке API, мы, конечно же, можем проверить аутентификацию пользователя, чтобы не разрешить ничего никому.

Надеюсь, что теперь действия сервера стали для вас немного понятнее!

Когда вы поймете, как они работают, вы сможете найти множество ресурсов о том, как использовать их в реальных приложениях:
