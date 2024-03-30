---
title: 'Парсинг с помощью Puppeteer для полных профанов: Часть 2'
meta_title: 'Парсинг с помощью Puppeteer для полных профанов: Часть 2 - Igor Gorlov'
description: >-
  Здравствуйте и добро пожаловать во второй пост из этой серии статей о
  веб-скрейпинге с помощью Puppeteer. Если вы пропустили первый пост, вы можете
  ознакомиться с ним здесь.
date: 2023-02-25T20:44:01.000Z
author: Igor Gorlov
image: ../../assets/images/undefined-Feb-25-2023.avif
categories:
  - Учебник
tags:
  - JavaScript
  - Парсинг
draft: false
lastmod: 2024-03-20T21:26:47.445Z
---

Здравствуйте и добро пожаловать во второй пост из этой серии статей о веб-скрейпинге с помощью Puppeteer. Если вы пропустили первый пост, вы можете ознакомиться с ним здесь. В этой заметке мы продолжим с того места, на котором остановились, и возьмем данные о погоде с сайта weather.com. Текущая цель - получить прогноз погоды в Остине, штат Техас, на 10 дней. Не стесняйтесь заменить Остин на ваш любимый город.

<!-- wp:rank-math/toc-block {"title":"Оглавление","headings":[{"key":"4dd8b2f2-3f94-4e13-a67d-03304ea4f8fd","content":"Разбираемся с тем, на чем остановились","level":2,"link":"#разбираемся-с-тем-на-чем-остановились","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"b31827c3-32e1-4b41-a0a9-3fe8be36ba91","content":"Давайте посмотрим, как мы можем это сделать:","level":2,"link":"#давайте-посмотрим-как-мы-можем-это-сделать","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"fca13740-a8fc-45f0-bac0-a3ac618cf5d7","content":"Давайте теперь запустим node scraper.js в терминале и проверим результаты:","level":2,"link":"#давайте-теперь-запустим-node-scraper-js-в-терминале-и-проверим-результаты","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"ae4ecfcf-01d2-4df8-8f43-53ac90212a29","content":"Репозиторий GitHub","level":2,"link":"#репозиторий-git-hub","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"db4b14f4-006a-407a-b491-c1381d47177d","content":"Подведение итогов","level":2,"link":"#подведение-итогов","disable":false,"isUpdated":false,"isGeneratedLink":true}],"listStyle":"ul"} -->
<div class="wp-block-rank-math-toc-block" id="rank-math-toc"><h2>Оглавление</h2><nav><ul><li class=""><a href="#разбираемся-с-тем-на-чем-остановились">Разбираемся с тем, на чем остановились</a></li><li class=""><a href="#давайте-посмотрим-как-мы-можем-это-сделать">Давайте посмотрим, как мы можем это сделать:</a></li><li class=""><a href="#давайте-теперь-запустим-node-scraper-js-в-терминале-и-проверим-результаты">Давайте теперь запустим node scraper.js в терминале и проверим результаты:</a></li><li class=""><a href="#репозиторий-git-hub">Репозиторий GitHub</a></li><li class=""><a href="#подведение-итогов">Подведение итогов</a></li></ul></nav></div>
<!-- /wp:rank-math/toc-block -->

<h2 class="wp-block-heading" id="разбираемся-с-тем-на-чем-остановились">Разбираемся с тем, на чем остановились</h2>

Наша функция scrape, которую мы создали в предыдущем посте, выглядит следующим образом:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">async function scrape() {
  const browser = await puppeteer.launch({ dumpio: true });
  const page = await browser.newPage();

  await page.goto("https://weather.com/weather/tenday/l/Austin+TX");

  const weatherData = await page.evaluate(() =&gt;
    Array.from(
      document.querySelectorAll(".DaypartDetails--DayPartDetail--2XOOV"),
      (e) =&gt; ({
        date: e.querySelector("h3").innerText,
      })
    )
  );

  await browser.close();
  return weatherData;
}

const scrapedData = await scrape();
console.log(scrapedData);
</code></pre>
<!-- /wp:code -->

Теперь добавим данные weatherData. В дополнение к внутреннему тексту h3 мы получим высокую температуру, низкую температуру и процент осадков за день.

<h2 class="wp-block-heading" id="давайте-посмотрим-как-мы-можем-это-сделать">Давайте посмотрим, как мы можем это сделать:</h2>

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">const weatherData = await page.evaluate(() =&gt;
    Array.from(
      document.querySelectorAll(".DaypartDetails--DayPartDetail--2XOOV"),
      (e) =&gt; ({
        date: e.querySelector("h3").innerText,
        highTemp: e.querySelector(".DetailsSummary--highTempValue--3PjlX")
          .innerText,
        lowTemp: e.querySelector(".DetailsSummary--lowTempValue--2tesQ")
          .innerText,
        precipitationPercentage: e.querySelector(
          ".DetailsSummary--precip--1a98O"
        ).innerText,
      })
    )
</code></pre>
<!-- /wp:code -->

Как вы видите, я добавляю три новых свойства к объекту, который возвращается в функции отображения Array.from. Этими свойствами являются highTemp, lowTemp и precipitationPercentage. Я нашел имена классов, просматривая документ в браузере. Похоже, что эти значения работают, но только время покажет, придется ли что-то обновлять.

<h2 class="wp-block-heading" id="давайте-теперь-запустим-node-scraper-js-в-терминале-и-проверим-результаты">Давайте теперь запустим node scraper.js в терминале и проверим результаты:</h2>

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">[
  {
    date: 'Tonight',
    highTemp: '--',
    lowTemp: '31°',
    precipitationPercentage: '84%'
  },
  {
    date: 'Thu 02',
    highTemp: '41°',
    lowTemp: '32°',
    precipitationPercentage: '53%'
  },
  {
    date: 'Fri 03',
    highTemp: '55°',
    lowTemp: '30°',
    precipitationPercentage: '6%'
  },
  {
    date: 'Sat 04',
    highTemp: '57°',
    lowTemp: '40°',
    precipitationPercentage: '7%'
  },
  {
    date: 'Sun 05',
    highTemp: '64°',
    lowTemp: '47°',
    precipitationPercentage: '9%'
  },
  {
    date: 'Mon 06',
    highTemp: '71°',
    lowTemp: '58°',
    precipitationPercentage: '14%'
  },
  {
    date: 'Tue 07',
    highTemp: '68°',
    lowTemp: '50°',
    precipitationPercentage: '54%'
  },
  {
    date: 'Wed 08',
    highTemp: '60°',
    lowTemp: '47°',
    precipitationPercentage: '40%'
  },
  {
    date: 'Thu 09',
    highTemp: '60°',
    lowTemp: '42°',
    precipitationPercentage: '52%'
  },
  {
    date: 'Fri 10',
    highTemp: '62°',
    lowTemp: '38°',
    precipitationPercentage: '17%'
  },
  {
    date: 'Sat 11',
    highTemp: '59°',
    lowTemp: '42°',
    precipitationPercentage: '11%'
  },
  {
    date: 'Sun 12',
    highTemp: '64°',
    lowTemp: '48°',
    precipitationPercentage: '15%'
  },
  {
    date: 'Mon 13',
    highTemp: '67°',
    lowTemp: '51°',
    precipitationPercentage: '24%'
  },
  {
    date: 'Tue 14',
    highTemp: '71°',
    lowTemp: '51°',
    precipitationPercentage: '24%'
  },
  {
    date: 'Wed 15',
    highTemp: '70°',
    lowTemp: '50°',
    precipitationPercentage: '21%'
  }
]
</code></pre>
<!-- /wp:code -->

Очень круто. Мы получаем значения, которые я ожидал получить.

<h2 class="wp-block-heading" id="репозиторий-git-hub">Репозиторий GitHub</h2>

Я создал репозиторий GitHub для этого проекта. Вы можете найти ссылку здесь. Не стесняйтесь форкать/клонировать этот репозиторий и играть вокруг. Если вам не очень удобно использовать git, есть множество ресурсов. Если вас заинтересует учебник для новичков, пожалуйста, дайте мне знать в разделе комментариев.

<h2 class="wp-block-heading" id="подведение-итогов">Подведение итогов</h2>

В этом посте мы смогли собрать немного больше данных о прогнозе погоды и вернуть их в нашу функцию scrape. В следующем посте я покажу вам, как создать GitHub Action, который будет запускать функцию scrape раз в день и сохранять собранные данные о погоде в .json-файл в том же репозитории GitHub.
