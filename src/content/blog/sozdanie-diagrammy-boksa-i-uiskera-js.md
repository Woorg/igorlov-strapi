---
title: Создание диаграммы Бокса и Уискера (JS)
meta_title: Создание диаграммы Бокса и Уискера (JS) - Igor Gorlov
description: >-
  Превратите свои данные в выводы с помощью потрясающего графика
  box-and-whisker! Узнайте, что это такое и как легко создать такую диаграмму с
  помощью JavaScript.
date: 2023-03-18T00:04:27.000Z
author: Igor Gorlov
image: ../../assets/images/undefined-Mar-18-2023.avif
categories:
  - Как закодить
tags:
  - Charts
  - JavaScript
draft: false
lastmod: 2024-03-20T21:26:45.815Z
---

Превратите свои данные в выводы с помощью потрясающего графика box-and-whisker! Узнайте, что это такое и как легко создать такую диаграмму с помощью JavaScript. В этом уроке я проведу вас через шаги по созданию аккуратной и визуально привлекательной коробочной диаграммы на основе JS (HTML5) с годовыми валовыми зарплатами различных ИТ-профессий в Европе. Откройте силу визуализации данных и начните быстро выявлять тенденции и закономерности уже сегодня!

<!-- wp:rank-math/toc-block {"title":"Оглавление","headings":[{"key":"452e5372-012a-4641-8ff0-039ba9ee8177","content":"Что такое диаграмма бокса и вискера?","level":2,"link":"#что-такое-диаграмма-бокса-и-вискера","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"d403f57c-2bdf-484e-893d-c8d3222a70ce","content":"Построение диаграммы квадратов и усов","level":2,"link":"#построение-диаграммы-квадратов-и-усов","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"3e1ac66f-a725-4947-a2f1-ddb43900a42f","content":"Базовый график бокса и вискера","level":2,"link":"#базовый-график-бокса-и-вискера","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"fe2c4ec6-e1dd-4979-986a-35fd89f1f090","content":"1. Создание веб-страницы в HTML","level":3,"link":"#1-создание-веб-страницы-в-html","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"4c47ddcc-cd0a-4ee4-9a67-87e19b91b618","content":"2. Включение необходимых файлов JavaScript","level":3,"link":"#2-включение-необходимых-файлов-java-script","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"3fec436d-b311-406e-aaaf-6a3f5ce203f3","content":"3. Установите данные","level":3,"link":"#3-установите-данные","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"0c6cb666-4a19-4952-abbf-d1740fd44391","content":"4. Добавьте код JavaScript","level":3,"link":"#4-добавьте-код-java-script","disable":false,"isUpdated":false,"isGeneratedLink":true}],"listStyle":"ul"} -->
<div class="wp-block-rank-math-toc-block" id="rank-math-toc"><h2>Оглавление</h2><nav><ul><li class=""><a href="#что-такое-диаграмма-бокса-и-вискера">Что такое диаграмма бокса и вискера?</a></li><li class=""><a href="#построение-диаграммы-квадратов-и-усов">Построение диаграммы квадратов и усов</a></li><li class=""><a href="#базовый-график-бокса-и-вискера">Базовый график бокса и вискера</a><ul><li class=""><a href="#1-создание-веб-страницы-в-html">1. Создание веб-страницы в HTML</a></li><li class=""><a href="#2-включение-необходимых-файлов-java-script">2. Включение необходимых файлов JavaScript</a></li><li class=""><a href="#3-установите-данные">3. Установите данные</a></li><li class=""><a href="#4-добавьте-код-java-script">4. Добавьте код JavaScript</a></li></ul></li></ul></nav></div>
<!-- /wp:rank-math/toc-block -->

<h2 class="wp-block-heading" id="что-такое-диаграмма-бокса-и-вискера">Что такое диаграмма бокса и вискера?</h2>

Диаграмма box-and-whisker, или просто box plot или box plot, - это тип графического представления, обычно используемый в статистическом анализе для отображения распределения набора данных. График состоит из прямоугольного поля, простирающегося от первого квартиля до третьего квартиля (также известного как межквартильный размах, или IQR), с горизонтальной линией внутри, представляющей медиану.

В дополнение к коробке от нее могут отходить линии (называемые ”усами"), указывающие на изменчивость за пределами верхнего и нижнего квартилей. Эти "усы" могут представлять различные вещи в зависимости от контекста, например, максимальное и минимальное значения в определенном диапазоне или кратное стандартное отклонение.

Выбросы, которые значительно отличаются от остальной части набора данных, могут быть изображены в виде отдельных точек за пределами усов на графике. Наличие выбросов может дать ценную информацию о распределении данных и помочь выявить потенциальные ошибки или аномалии в данных.

<h2 class="wp-block-heading" id="построение-диаграммы-квадратов-и-усов">Построение диаграммы квадратов и усов</h2>

Чтобы пробудить ваш интерес к построению креативной диаграммы, позвольте мне показать вам окончательный вариант диаграммы ”ящик и усы", который будет готов к концу этого урока.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--Q7qlIfzV--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/0s639xrh251f7jvgbcs1.png" alt="Диаграмма Бокса и Вискера"/></figure>
<!-- /wp:image -->

Не правда ли, выглядит великолепно? Продолжайте читать, чтобы узнать, как его создать.

<h2 class="wp-block-heading" id="базовый-график-бокса-и-вискера">Базовый график бокса и вискера</h2>

Если у вас уже есть опыт создания графиков с помощью JavaScript, вы должны иметь базовое представление о том, как это работает. Однако если вы новичок, этот учебник по построению графиков в виде коробок поможет вам шаг за шагом. Давайте начнем с обзора необходимых шагов:

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Создайте веб-страницу на языке HTML.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Включите необходимые файлы JavaScript.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Установите данные.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Добавить код JavaScript.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

Вы можете создать потрясающую базовую диаграмму ”бокс и вискер" с помощью всего нескольких строк кода. Кроме того, я покажу вам несколько интересных настроек для улучшения внешнего вида графика. Давайте погрузимся!

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="1-создание-веб-страницы-в-html">1. Создание веб-страницы в HTML</h3>

<br>Мы будем работать с JavaScript, поэтому прежде всего нам нужно использовать HTML для создания веб-страницы, на которой будет отображаться наша бокс-диаграмма.

Начнем с того, что зададим название веб-страницы “JavaScript Box-and-Whisker Plot”. Затем мы включим несколько строк CSS-кода в тег style, чтобы установить margin и padding на 0; и сделать высоту и ширину веб-страницы 100%. Это обеспечит правильное отображение графика на веб-странице.

Наконец, мы добавим тег div с идентификатором “container”. Позже мы будем использовать этот div для размещения квадратного графика.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="markup" class="language-markup">&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
  &lt;head&gt;
    &lt;meta charset="utf-8"&gt;
    &lt;title&gt;JavaScript Box-and-Whisker Plot&lt;/title&gt;
    &lt;style type="text/css"&gt;
      html, body, #container {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
      }
    &lt;/style&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;div id="container"&gt;&lt;/div&gt;
  &lt;/body&gt;
&lt;/html&gt;
</code></pre>
<!-- /wp:code -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="2-включение-необходимых-файлов-java-script">2. Включение необходимых файлов JavaScript</h3>

После завершения базовой верстки нашей веб-страницы HTML следующим шагом будет включение необходимых файлов JavaScript. Мы должны включить ссылку на библиотеку диаграмм JavaScript в раздел head нашей HTML-страницы.

Для этой цели мы будем использовать AnyChart. Нам понадобятся модули Core и Basic Cartesian для нашей диаграммы в виде квадрата и усов.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="markup" class="language-markup">&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
  &lt;head&gt;
    &lt;meta charset="utf-8"&gt;
    &lt;title&gt;JavaScript Box-and-Whisker Plot&lt;/title&gt;
    &lt;script src="https://cdn.anychart.com/releases/8.11.0/js/anychart-core.min.js"&gt;&lt;/script&gt;
    &lt;script src="https://cdn.anychart.com/releases/8.11.0/js/anychart-cartesian.min.js"&gt;&lt;/script&gt;
    &lt;style type="text/css"&gt;
      html, body, #container {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
      }
    &lt;/style&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;div id="container"&gt;&lt;/div&gt;
    &lt;script&gt;
      // All the code for the JS Box-and-Whisker Plot will come here
    &lt;/script&gt;
  &lt;/body&gt;
&lt;/html&gt;
</code></pre>
<!-- /wp:code -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="3-установите-данные">3. Установите данные</h3>

Мы будем использовать данные о годовой брутто-зарплате для различных профессий в Европе, взятые из обзора IT Salary Survey для региона ЕС (2018-2020), доступного на Kaggle.

После очистки данных для удаления дубликатов и некорректно оформленных или вводящих в заблуждение данных я выбрал только профессии с достаточным количеством данных и рассчитал их средние значения. Затем я выбрал 8 лучших ИТ-профессий для нашей визуализации в виде бокса и вискера.

Данные представлены в виде массива объектов, каждый из которых представляет профессию. В свойствах объекта отображаются название профессии, первый квартиль, медиана, третий квартиль, минимальное и максимальное значения, а также значения выбросов.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">var data = [
  {
    x: 'Backend Developer',
    low: 35000,
    q1: 60000,
    median: 70000,
    q3: 80000,
    high: 110000,
    outliers: [10001, 10001, 12000, 13000, 14400, 17500, 25000, 27000, 27000, 28000, 120000, 135000, 154000, 172000]
  },
  {
    x: 'Data Engineer',
    low: 40000,
    q1: 54000,
    median: 68000,
    q3: 84000,
    high: 110000,
    outliers: [200000]
  },
  {
    x: 'DevOps',
    low: 52500,
    q1: 65000,
    median: 72000,
    q3: 82500,
    high: 105000,
    outliers: [30000, 37000, 124000, 140000]
  },
  {
    x: 'Engineering Manager',
    low: 78000,
    q1: 80000,
    median: 85000,
    q3: 95750,
    high: 105000
  },
  {
    x: 'ML Engineer',
    low: 11500,
    q1: 52500,
    median: 65000,
    q3: 81000,
    high: 120000,
    outliers: [180000]
  },
  {
    x: 'Mobile Developer',
    low: 40000,
    q1: 61250,
    median: 66000,
    q3: 77000,
    high: 85000,
    outliers: [240000]
  },
  {
    x: 'Product Manager',
    low: 30000,
    q1: 60000,
    median: 70000,
    q3: 85000,
    high: 120000,
    outliers: [150000]
  },
  {
    x: 'Software Engineer',
    low: 28800,
    q1: 60000,
    median: 72000,
    q3: 81000,
    high: 110000,
    outliers: [14712, 16320, 21000, 21120, 24000, 26400, 113000, 115000, 120000, 120000, 120000, 120000, 120000, 120000, 130000, 130000, 140000, 150000, 151872, 160000, 200000, 250000]
  }
];
</code></pre>
<!-- /wp:code -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="4-добавьте-код-java-script">4.&nbsp;Добавьте код JavaScript</h3>

Наконец, давайте напишем немного кода JavaScript, чтобы запустить наш график.

Мы включим функцию onDocumentReady() библиотеки построения графиков и заключим в нее наш код, чтобы обеспечить представление данных на экране после полной загрузки веб-страницы HTML.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">&lt;script&gt;
  anychart.onDocumentReady(function () {
    // The box chart's code will be written here.
  });
&lt;/script&gt;
</code></pre>
<!-- /wp:code -->

Сначала мы добавим наши данные из Шага 3.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">anychart.onDocumentReady(function () {
  var data = [
    {
      x: 'Backend Developer',
      low: 35000,
      q1: 60000,
      median: 70000,
      q3: 80000,
      high: 110000,
      outliers: [10001, 10001, 12000, 13000, 14400, 17500, 25000, 27000, 27000, 28000, 120000, 135000, 154000, 172000]
    },
    {
      x: 'Data Engineer',
      low: 40000,
      q1: 54000,
      median: 68000,
      q3: 84000,
      high: 110000,
      outliers: [200000]
    },
    {
      x: 'DevOps',
      low: 52500,
      q1: 65000,
      median: 72000,
      q3: 82500,
      high: 105000,
      outliers: [30000, 37000, 124000, 140000]
    },
    {
      x: 'Engineering Manager',
      low: 78000,
      q1: 80000,
      median: 85000,
      q3: 95750,
      high: 105000
    },
    {
      x: 'ML Engineer',
      low: 11500,
      q1: 52500,
      median: 65000,
      q3: 81000,
      high: 120000,
      outliers: [180000]
    },
    {
      x: 'Mobile Developer',
      low: 40000,
      q1: 61250,
      median: 66000,
      q3: 77000,
      high: 85000,
      outliers: [240000]
    },
    {
      x: 'Product Manager',
      low: 30000,
      q1: 60000,
      median: 70000,
      q3: 85000,
      high: 120000,
      outliers: [150000]
    },
    {
      x: 'Software Engineer',
      low: 28800,
      q1: 60000,
      median: 72000,
      q3: 81000,
      high: 110000,
      outliers: [14712, 16320, 21000, 21120, 24000, 26400, 113000, 115000, 120000, 120000, 120000, 120000, 120000, 120000, 130000, 130000, 140000, 150000, 151872, 160000, 200000, 250000]
    }
];
</code></pre>
<!-- /wp:code -->

Далее мы создаем наш график box-and-whisker, указывая тип графика как “box”. Мы создаем серию box и передаем в нее наши данные.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">var chart = anychart.box()
var series = chart.box(data);
</code></pre>
<!-- /wp:code -->

После этого мы добавляем заголовок графика и устанавливаем контейнер, ссылающийся на элемент div, которому мы присвоили id “container” в шаге 1.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">chart.title('Yearly Gross Salary for Different IT Professions in Europe');
chart.container('container');
</code></pre>
<!-- /wp:code -->

Наконец, мы рисуем график с помощью функции draw().

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">chart.draw();
</code></pre>
<!-- /wp:code -->

Вот как выглядит базовый интерактивный JS box-and-whisker plot! Полный код веб-страницы HTML приведен ниже. Вы также можете найти интерактивную версию этого графика на AnyChart Playground.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--vWd4z1u8--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/9p5empwsosbr0nr71vrl.png" alt="Базовый интерактивный JS box-and-whisker график"/></figure>
<!-- /wp:image -->

<!-- wp:code -->
<pre class="wp-block-code"><code lang="markup" class="language-markup">&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
  &lt;head&gt;
    &lt;meta charset="utf-8"&gt;
    &lt;title&gt;JavaScript Box-and-Whisker Plot&lt;/title&gt;
    &lt;script src="https://cdn.anychart.com/releases/8.11.0/js/anychart-core.min.js"&gt;&lt;/script&gt;
    &lt;script src="https://cdn.anychart.com/releases/8.11.0/js/anychart-cartesian.min.js"&gt;&lt;/script&gt;
    &lt;style type="text/css"&gt;
      html, body, #container {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
      }
    &lt;/style&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;div id="container"&gt;&lt;/div&gt;
    &lt;script&gt;
      anychart.onDocumentReady(function () {
        var data = [
          {
            x: 'Backend Developer',
            low: 35000,
            q1: 60000,
            median: 70000,
            q3: 80000,
            high: 110000,
            outliers: [10001, 10001, 12000, 13000, 14400, 17500, 25000, 27000, 27000, 28000, 120000, 135000, 154000, 172000]
          },
          {
            x: 'Data Engineer',
            low: 40000,
            q1: 54000,
            median: 68000,
            q3: 84000,
            high: 110000,
            outliers: [200000]
          },
          {
            x: 'DevOps',
            low: 52500,
            q1: 65000,
            median: 72000,
            q3: 82500,
            high: 105000,
            outliers: [30000, 37000, 124000, 140000]
          },
          {
            x: 'Engineering Manager',
            low: 78000,
            q1: 80000,
            median: 85000,
            q3: 95750,
            high: 105000
          },
          {
            x: 'ML Engineer',
            low: 11500,
            q1: 52500,
            median: 65000,
            q3: 81000,
            high: 120000,
            outliers: [180000]
          },
          {
            x: 'Mobile Developer',
            low: 40000,
            q1: 61250,
            median: 66000,
            q3: 77000,
            high: 85000,
            outliers: [240000]
          },
          {
            x: 'Product Manager',
            low: 30000,
            q1: 60000,
            median: 70000,
            q3: 85000,
            high: 120000,
            outliers: [150000]
          },
          {
            x: 'Software Engineer',
            low: 28800,
            q1: 60000,
            median: 72000,
            q3: 81000,
            high: 110000,
            outliers: [14712, 16320, 21000, 21120, 24000, 26400, 113000, 115000, 120000, 120000, 120000, 120000, 120000, 120000, 130000, 130000, 140000, 150000, 151872, 160000, 200000, 250000]
          }
        ];
        // create a chart
        var chart = anychart.box();
        // create a box series and set the data
        var series = chart.box(data);
        // set the chart title
        chart.title('Yearly Gross Salary for Different IT professions in Europe');
        // set the container id
        chart.container('container');
        // draw the chart
        chart.draw();
      });
    &lt;/script&gt;
  &lt;/body&gt;
&lt;/html&gt;
</code></pre>
<!-- /wp:code -->
