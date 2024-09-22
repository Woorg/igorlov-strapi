---
title: Гибкая многофункциональная библиотека Node.js для краулеров x-crawl
meta_title: >-
  Гибкая многофункциональная библиотека Node.js для краулеров x-crawl - Igor
  Gorlov
description: >-
  X-crawl – это гибкая многофункциональная библиотека Node.js для краулеров.
  Используется для переползания страниц, переползания интерфейсов, переползания
  файлов и опроса переползающих страниц.
date: 2023-04-24T08:39:23.000Z
author: Igor Gorlov
image: ../../assets/images/undefined-Apr-24-2023.avif
categories:
  - Как закодить
tags:
  - Node.js
  - Парсер
draft: false
lastmod: 2024-03-20T21:26:43.532Z
---

<!-- wp:rank-math/toc-block {"title":"Оглавление","headings":[{"key":"8bef0f7a-c883-4b4a-9ac9-c108e793816d","content":"X-crawl","level":2,"link":"#x-crawl","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"e9d74b4e-c6dd-453f-b0ac-97e483314ba0","content":"Особенности","level":2,"link":"#особенности","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"5b824516-10cf-4ca1-be6c-87c66a7c6d55","content":"Пример","level":2,"link":"#пример","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"84eb04ea-4d8c-423c-88a2-9472b82767f6","content":"Результат работы:","level":2,"link":"#результат-работы","disable":false,"isUpdated":false,"isGeneratedLink":true}],"listStyle":"ul"} -->
<div class="wp-block-rank-math-toc-block" id="rank-math-toc"><h2>Оглавление</h2><nav><ul><li class=""><a href="#x-crawl">X-crawl</a></li><li class=""><a href="#особенности">Особенности</a></li><li class=""><a href="#пример">Пример</a></li><li class=""><a href="#результат-работы">Результат работы:</a></li></ul></nav></div>
<!-- /wp:rank-math/toc-block -->

<h2 class="wp-block-heading" id="x-crawl">X-crawl</h2>

X-crawl - это гибкая многофункциональная библиотека Node.js для краулеров. Используется для переползания страниц, переползания интерфейсов, переползания файлов и опроса переползающих страниц.

Если вам также нравится x-crawl, вы можете дать репозиторию x-crawl звезду, чтобы поддержать его, спасибо за вашу поддержку!

<h2 class="wp-block-heading" id="особенности">Особенности</h2>

🔥 AsyncSync - Просто измените значение атрибута mode, чтобы переключить режим асинхронного или синхронного ползания.

⚙️Multiple функций — Он может ползать по страницам, ползать по интерфейсам, ползать по файлам и опрашивать ползание, а также поддерживает одиночное или множественное ползание.

🖋️ Гибкий стиль написания — Простая конфигурация цели, подробная конфигурация цели, смешанная конфигурация массива целей и расширенная конфигурация, один и тот же API ползания может адаптироваться к нескольким конфигурациям.

👀Device Fingerprinting - нулевая конфигурация или пользовательская конфигурация, чтобы избежать отпечатков пальцев для идентификации и отслеживания нас из разных мест.

⏱️ Interval Crawling - отсутствие интервала, фиксированный интервал и случайный интервал могут генерировать или избежать высокой одновременности ползания.

🔄 Повторная попытка при неудаче - глобальные настройки, локальные настройки и индивидуальные настройки, это позволяет избежать неудач при ползании, вызванных временными проблемами.

🚀 Очередь приоритетов - В соответствии с приоритетом одной цели ползания, она может быть пройдена раньше других целей.

☁️ Crawl SPA - Crawl SPA (Single Page Application) для создания предварительно отрендеренного контента (он же “SSR” (Server Side Rendering)).

⚒️ Controlling Pages - Безголовые браузеры могут отправлять формы, нажатия клавиш, действия по событиям, генерировать скриншоты страниц и т.д.

🧾 Захват записей - Захват и запись результатов ползания и другой информации, а также выделение напоминаний на консоли.

🦾 TypeScript - Собственные типы, реализация полных типов через дженерики.

<h2 class="wp-block-heading" id="пример">Пример</h2>

В качестве примера возьмем несколько фотографий из опыта Airbnb hawaii и Plus listings автоматически каждый день:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">// 1.Import module ES/CJS
import xCrawl from 'x-crawl'

// 2.Create a crawler instance
const myXCrawl = xCrawl({ maxRetry: 3, intervalTime: { max: 3000, min: 2000 } })

// 3.Set the crawling task
/*
  Call the startPolling API to start the polling function,
  and the callback function will be called every other day
*/
myXCrawl.startPolling({ d: 1 }, async (count, stopPolling) =&gt; {
  // Call crawlPage API to crawl Page
  const res = await myXCrawl.crawlPage([
    'https://zh.airbnb.com/s/hawaii/experiences',
    'https://zh.airbnb.com/s/hawaii/plus_homes'
  ])

  // Store the image URL to targets
  const targets = []
  const elSelectorMap = ['.c14whb16', '.a1stauiv']
  for (const item of res) {
    const { id } = item
    const { page } = item.data

    // Gets the URL of the page's wheel image element
    const boxHandle = await page.$(elSelectorMap[id - 1])
    const urls = await boxHandle!.$eval('picture img', (imgEls) =&gt; {
      return imgEls.map((item) =&gt; item.src)
    })
    targets.push(...urls)

    // Close page
    page.close()
  }

  // Call the crawlFile API to crawl pictures
  myXCrawl.crawlFile({ targets, storeDir: './upload' })
})
</code></pre>
<!-- /wp:code -->

<h2 class="wp-block-heading" id="результат-работы">Результат работы:</h2>

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--JP3SwssN--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://raw.githubusercontent.com/coder-hxl/x-crawl/main/../../assets/en/crawler.png%3Fcoderhxl02" alt=""/></figure>
<!-- /wp:image -->

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--j0KjlEpP--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://raw.githubusercontent.com/coder-hxl/x-crawl/main/../../assets/en/crawler-result.png%3Fcoderhxl02" alt=""/></figure>
<!-- /wp:image -->

Примечание: Не ползайте по своему усмотрению, вы можете проверить протокол robots.txt перед ползанием. Это просто демонстрация того, как использовать x-crawl.
