---
title: Введение в ElectronJS
meta_title: Введение в ElectronJS - Igor Gorlov
description: >-
  ElectronJS – это фреймворк с открытым исходным кодом, который позволяет
  разработчикам создавать кроссплатформенные настольные приложения с
  использованием веб-технологий, таких как HTML, CSS и Javascript.
date: 2023-04-20T17:57:39.000Z
author: Igor Gorlov
image: ../../assets/images/undefined-Apr-20-2023.avif
categories:
  - Учебник
tags:
  - ElectronJS
draft: false
lastmod: 2024-03-20T21:26:48.666Z
---

<h2 class="wp-block-heading">Что такое ElectronJS?</h2>

ElectronJS - это фреймворк с открытым исходным кодом, который позволяет разработчикам создавать кроссплатформенные настольные приложения с использованием веб-технологий, таких как HTML, CSS и Javascript. Он был разработан и выпущен на GitHub в 2013 году и с тех пор завоевал огромную популярность среди разработчиков благодаря простоте использования и возможности создавать высокопроизводительные приложения, работающие на Windows, macOS и Linux.

<h2 class="wp-block-heading">Чем известен ElectronJS?</h2>

Одним из наиболее значимых преимуществ ElectronJS является то, что он позволяет разработчикам создавать настольные приложения с веб-основой. Это означает, что разработчики могут использовать те же навыки веб-разработки, которыми они уже обладают, для создания мощных настольных приложений, которые легко работают в различных операционных системах.

Еще одним ключевым преимуществом ElectronJS является то, что он предоставляет доступ к мощным нативным API, которые позволяют разработчикам создавать многофункциональные приложения. Разработчики могут использовать эти API для доступа к файловой системе, манипулирования окнами, создания иконок в системном трее и многого другого.

<h2 class="wp-block-heading">Когда был выпущен ElectronJS?</h2>

ElectronJS был первоначально выпущен под названием “Atom Shell” в 2013 году на GitHub. Целью было создание фреймворка для настольных приложений, который можно было бы использовать для создания редактора кода Atom. В 2016 году Atom Shell был переименован в ElectronJS и выпущен как проект с открытым исходным кодом.

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Некоторые приложения, созданные с помощью ElectronJS</h3>

ElectronJS использовался для создания многих популярных настольных приложений. Некоторые из наиболее известных приложений, созданных с использованием ElectronJS, включают:

<!-- wp:list {"ordered":true} -->
<ol><!-- wp:list-item -->
<li>Visual Studio Code - популярный редактор кода</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Slack - инструмент для совместной работы на экзамене</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Discord - приложение для голосового и текстового чата для геймеров</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Atom - настраиваемый текстовый редактор</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Skype - приложение для голосовых и видеозвонков</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Postman - популярный инструмент для разработки API</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>GitHub Desktop - графический пользовательский интерфейс для Git</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Trello - инструмент продуктивности для организации задач и проектов</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Microsoft Teams - платформа для общения и совместной работы</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Figma - инструмент совместного проектирования для создания пользовательских интерфейсов и прототипов.</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<h2 class="wp-block-heading">Использование ElectronJS</h2>

ElectronJS относительно прост в использовании, особенно для разработчиков, знакомых с веб-разработкой. Поскольку ElectronJS использует веб-технологии, разработчики могут использовать те же инструменты и библиотеки, которые они уже знают для создания настольных приложений! Кроме того, ElectronJS предоставляет массу встроенных функций и API, которые позволяют быстро создавать мощные приложения.

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Давайте создадим быстрое настольное приложение</h3>

Здесь мы рассмотрим быструю настройку настольного приложения, которое является хорошим началом знакомства с ElectronJS.

<strong>Во-первых, нам нужно создать новый каталог и инициализировать его файлом package.json:</strong>

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">mkdir hello-world
cd hello-world
npm init -y</code></pre>
<!-- /wp:code -->

Далее нам нужно установить ElectronJS в качестве зависимости:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">npm install electron</code></pre>
<!-- /wp:code -->

Теперь мы можем создать наш файл main.js, который будет содержать код для нашего окна:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">First: touch main.js
Insert into main.js: 
const { app, BrowserWindow } = require('electron')

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(() =&gt; {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
}) 
</code></pre>
<!-- /wp:code -->

Этот код устанавливает новое приложение ElectronJS с главным окном шириной 800 пикселей и высотой 600 пикселей.

Он также загружает в окно HTML-файл под названием “index.html”.<br>Мы можем создать этот файл в том же каталоге и добавить следующий код:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">Create index.html: touch index.html

&lt;!DOCTYPE html&gt;
&lt;html&gt;
  &lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Hello World!&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;Hello World!&lt;/h1&gt;
  &lt;/body&gt;
&lt;/html&gt;
</code></pre>
<!-- /wp:code -->

В файле package.json вы хотите добавить скрипт для запуска вашего приложения:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">"start": "electron ."
</code></pre>
<!-- /wp:code -->

После выполнения этой команды должно появиться новое окно с текстом “Hello World!” в центре.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--rVv_VeNz--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/f6n79uur0vv0sw0v2d1c.png" alt="Приложение для рабочего стола"/></figure>
<!-- /wp:image -->

<h2 class="wp-block-heading">Заключение</h2>

ElectronJS - это мощный и универсальный фреймворк, который позволяет разработчикам создавать высокопроизводительные настольные приложения, используя веб-технологии. Он позволяет разработчикам легко перейти к созданию настольных приложений, а тот факт, что ElectronJS был большой частью некоторых повседневных приложений, которые мы, разработчики, используем, показывает нам, что мы тоже способны создавать удивительные приложения.
