---
title: Парсинг с помощью Puppeteer для полных профанов
meta_title: Парсинг с помощью Puppeteer для полных профанов - Igor Gorlov
description: >-
  Парсинг — это то, чем я никогда не думал, что буду заниматься. Я в основном
  разработчик пользовательского интерфейса, хотя моя карьера начиналась как
  бэкенд-разработчик.
date: 2023-02-25T20:22:57.000Z
author: Igor Gorlov
image: ../../assets/images/undefined-Feb-25-2023.avif
categories:
  - Учебник
tags:
  - JavaScript
  - Puppeteer
  - Парсинг
draft: false
lastmod: 2024-03-20T21:26:47.975Z
---

Парсинг — это то, чем я никогда не думал, что буду заниматься. Я в основном разработчик пользовательского интерфейса, хотя моя карьера начиналась как бэкенд-разработчик. На работе меня никогда не просили выполнять какие-либо задачи по скраппингу, и до недавнего времени у меня не было личного проекта, который требовал бы от меня скраппинга данных. Я поделюсь тем, чему научился, а это, честно говоря, лишь малая толика того, что можно сделать с помощью такой технологии, как Puppeteer. В этой заметке я расскажу вам, как установить и написать сценарий Node.js, который будет скрести сайт прогноза погоды. Сайт прогноза погоды - это не мой личный проект, о котором я говорил ранее, это скорее надуманный пример того, как начать работу с Парсингом с помощью Node.js и Puppeteer.

Эта статья предполагает, что у вас есть некоторые знания о Node.js, NPM, async/await и командной строке.

Это будет многосерийный пост/учебник. Мы начнем медленно, и в итоге у нас получится проект, который даст нам прогноз погоды на 10 дней в формате json.

Отказ от ответственности: я не эксперт в Node.js и уж точно не эксперт в Puppeteer, поэтому, если вы увидите что-то, что можно было бы сделать более квалифицированно, или что просто неправильно, пожалуйста, дайте мне знать. Спасибо.

Примечание: В этом посте я буду использовать npm. Не стесняйтесь использовать ваш любимый менеджер пакетов, если вам так удобнее.

<h2 class="wp-block-heading">Настройка проекта</h2>

Сайт, который мы будем скреативить, - weather.com. Мы будем работать над получением прогноза на 10 дней для Остина, штат Техас. Вы, конечно же, можете поменять город на тот, который вам больше нравится.

Давайте создадим новый каталог для нашего проекта:<br>mkdir weather-scraper

Теперь перейдите в этот каталог:<br>cd weather-scraper

Давайте инициализируем проект (я буду использовать флаг -y, чтобы пропустить все вопросы):<br>npm init -y

Далее, я собираюсь пойти вперед, открыть свой любимый редактор и создать файл JavaScript. Я назову его scraper.js.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--O6M-mrIB--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/1e49twnxojmux4sitysh.png" alt="изображение каталога проекта"/></figure>
<!-- /wp:image -->

Прежде чем мы зайдем слишком далеко, давайте добавим одну строку в файл package.json, чтобы мы могли использовать объявление импорта. Добавьте эту строку:<br>“type”: “module”,

Ваш package.json должен выглядеть примерно так:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">{
  "name": "weather-scraper",
  "type": "module",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" &amp;&amp; exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "puppeteer": "^19.6.2"
  }
}
</code></pre>
<!-- /wp:code -->

Теперь установим Puppeteer.

npm i puppeteer

Первые несколько строк кода

Прежде всего, давайте импортируем puppeteer в строке 1:

import puppeteer from ‘puppeteer’;

Создадим асинхронную функцию под названием scrape и напишем первый фрагмент кода. Причина, по которой эта функция является async-функцией, станет понятна чуть позже (в основном мы должны ожидать все).

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">async function scrape() {
  const browser = await puppeteer.launch({ dumpio: true });
  const page = await browser.newPage();
}
</code></pre>
<!-- /wp:code -->

Мы создали две переменные, browser и page. Переменная browser создается с помощью метода puppeteer’s launch, который имеет возвращаемый тип Promise . Дополнительную информацию о типе Browser см. на этой странице.

Переменная страницы создается с помощью метода newPage контекста браузера, который возвращает тип Promise. Более подробную информацию о классе Page смотрите на этой странице.

Класс Page имеет метод, который мы будем использовать для перехода на сайт погоды, который мы пытаемся соскоблить, - метод goto. Этот метод принимает один параметр, url, а также необязательный параметр options, который мы сейчас не будем использовать. Этот метод возвращает тип Promise.

Мы добавим его следующим:<br>await page.goto(‘https://weather.com/weather/tenday/l/Austin+TX’)

На данный момент наш файл scraper.js должен выглядеть следующим образом:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">import puppeteer from 'puppeteer';

async function scrape() {
    const browser = await puppeteer.launch({ dumpio: true });
    const page = await browser.newPage();

    await page.goto('https://weather.com/weather/tenday/l/Austin+TX')
}
</code></pre>
<!-- /wp:code -->

<h2 class="wp-block-heading">Начинаем скрапинг</h2>

После метода goto мы можем использовать метод evaluate класса Page, чтобы сотворить нечто волшебное. Внутри метода evaluate мы можем написать функцию в контексте страницы и получить результат. По сути, мы напишем код внутри этого метода, чтобы получить данные со страницы, которые мы хотим получить. Я собираюсь поместить код ниже, а затем обсудить его:

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
</code></pre>
<!-- /wp:code -->

Метод evaluate является функцией высшего порядка, то есть мы можем передать в качестве параметра другую функцию, что мы и делаем. Внутри анонимной функции, которую мы передаем, у нас есть доступ к объекту документа. Если вы посмотрите url-файл weather.com, которым я поделился, вы сможете найти класс DaypartDetails–DayPartDetail–2XOOV.

Мы используем метод Array.from и передаем document.querySelectorAll(”.DaypartDetails–DayPartDetail–2XOOV”), который вернет NodeList всех элементов в документе с этим классом. Метод Array.from имеет второй, необязательный параметр, который представляет собой функцию отображения. Мы используем эту функцию отображения для выбора всех элементов h3 внутри каждого элемента в NodeList и присваиваем значение его innerText свойству, которое мы называем date;

<h2 class="wp-block-heading">Просмотр наших данных</h2>

После функции scrape добавьте эти две строки и сохраните:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">const scrapedData = await scrape();
console.log(scrapedData);
</code></pre>
<!-- /wp:code -->

Перейдем в терминал и запустим:<br>node scraper.js

Мы получим результаты, которые выглядят примерно так:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">[
  { date: 'Tonight' },
  { date: 'Tue 31' },
  { date: 'Wed 01' },
  { date: 'Thu 02' },
  { date: 'Fri 03' },
  { date: 'Sat 04' },
  { date: 'Sun 05' },
  { date: 'Mon 06' },
  { date: 'Tue 07' },
  { date: 'Wed 08' },
  { date: 'Thu 09' },
  { date: 'Fri 10' },
  { date: 'Sat 11' },
  { date: 'Sun 12' },
  { date: 'Mon 13' }
]
</code></pre>
<!-- /wp:code -->

Очень круто.

Весь файл scraper.js выглядит следующим образом:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">import puppeteer from "puppeteer";

async function scrape() {
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

<h2 class="wp-block-heading">Подведение итогов</h2>

Я призываю вас поиграть с этим. Посмотрите, сможете ли вы собрать другие части данных. В следующем посте я продолжу то, на чем остановился. К концу моих постов о Парсинге я покажу вам, как его делать, создавать GitHub Action для автоматизации, и чтобы GitHub Action сохранял данные в .json-файл в том же репозитории.

Надеюсь, вы нашли этот пост интересным. Спасибо, что остаетесь с нами. До следующего раза.
