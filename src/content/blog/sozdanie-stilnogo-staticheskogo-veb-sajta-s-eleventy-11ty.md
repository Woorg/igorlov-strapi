---
title: Создание стильного статического веб-сайта с Eleventy (11ty)
meta_title: Создание стильного статического веб-сайта с Eleventy (11ty) - Igor Gorlov
description: >-
  С появлением генераторов статических сайтов (SSG), таких как Eleventy,
  создание стильного и эффективного статического сайта стало как никогда
  простым.
date: 2023-04-21T07:41:33.000Z
image: ../../assets/images/undefined-Apr-21-2023.avif
author: Igor Gorlov
categories:
  - Учебник
tags:
  - Eleventy
draft: false
lastmod: 2024-03-20T21:26:43.455Z
---

С появлением генераторов статических сайтов (SSG), таких как Eleventy, создание стильного и эффективного статического сайта стало как никогда простым.

В этой статье мы рассмотрим, как использовать Eleventy для создания потрясающего и функционального статического сайта портфолио без использования серверного языка или базы данных.

Вы также узнаете, как развернуть статический сайт прямо из репозитория GitHub на платформе хостинга приложений Kinsta, чтобы быстро запустить сайт на бесплатном домене .kinsta.app.

Вот демонстрация статического сайта портфолио, который вы создадите с помощью Eleventy.

<img width="1600" height="788" src="https://kinsta.com/wp-content/uploads/2023/03/11ty-portfolio-static-site.jpg" alt="Stylish static portfolio website">Создание стильного статического веб-сайта с Eleventy (11ty)

Вы можете получить доступ к <a href="https://github.com/olawanlejoel/11ty-portfolio">репозиторию GitHub </a>этого проекта, если хотите взглянуть на него поближе.

<!-- wp:rank-math/toc-block {"title":"Оглавление","headings":[{"key":"940414c0-9a2c-449f-8a72-61bc83fb0a29","content":"Что такое Eleventy?","level":2,"link":"#что-такое-eleventy","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"5f003e9b-922b-4e7d-a89d-14c5ee1a8d7b","content":"Установить Eleventy очень просто. Вот как:","level":2,"link":"#установить-eleventy-очень-просто-вот-как","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"263f7f83-5296-4f50-b471-f2b4fc9dd85f","content":"Команды и конфигурация Eleventy","level":2,"link":"#команды-и-конфигурация-eleventy","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"b6a2cbc2-d467-41b2-917c-08acb31d52a6","content":"Команды Eleventy","level":3,"link":"#команды-eleventy","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"0c402188-bb8b-46f1-9083-e29c7a1c5002","content":"Как настроить статический сайт с помощью Eleventy","level":3,"link":"#как-настроить-статический-сайт-с-помощью-eleventy","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"5631e033-c09d-48ce-9f26-7a3e686103e0","content":"Как сделать предварительный просмотр сайта Eleventy","level":2,"link":"#как-сделать-предварительный-просмотр-сайта-eleventy","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"995f9a25-efbc-4ed0-ba6d-80a3734d6682","content":"Как создать статический сайт-портфолио с помощью Eleventy","level":2,"link":"#как-создать-статический-сайт-портфолио-с-помощью-eleventy","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"1058e59e-d76f-4d42-8dc6-cd2f2f1e58c7","content":"Как использовать шаблоны в Eleventy","level":3,"link":"#как-использовать-шаблоны-в-eleventy","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"4f1430fc-369a-430a-8b3d-ba6877c0c3b5","content":"Как создавать макеты в Eleventy","level":3,"link":"#как-создавать-макеты-в-eleventy","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"13399d19-e8e3-44af-8a45-c85ffa1277dd","content":"Как использовать разделы в Eleventy","level":3,"link":"#как-использовать-разделы-в-eleventy","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"cd18c34c-31d2-4e8f-ba47-b4897dcc127e","content":"Как создавать шаблоны страниц в Eleventy","level":3,"link":"#как-создавать-шаблоны-страниц-в-eleventy","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"82506b4c-1b21-432a-a497-3f7bdb6bdb66","content":" Как использовать CSS и изображения в Eleventy","level":3,"link":"#как-использовать-css-и-изображения-в-eleventy","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"f9117e75-53a8-4869-ae2f-e49256b9e4d7","content":"Создание частей и добавление на главную страницу","level":2,"link":"#создание-частей-и-добавление-на-главную-страницу","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"f1ddc60e-1c0d-4f72-91e9-06ab25b807a3","content":"Разделы о герое","level":3,"link":"#разделы-о-герое","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"8db5f14b-2dda-4f49-8174-31e45900df9c","content":"Разделы \u0022О компании","level":3,"link":"#разделы-о-компании","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"b9187d0f-8664-4e01-a0cd-17e15a76a8dd","content":"Парциальные навыки","level":3,"link":"#парциальные-навыки","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"4e2c0540-1e33-4b3b-ae9b-3bf07bd09d6f","content":"Как использовать коллекции в Eleventy","level":2,"link":"#как-использовать-коллекции-в-eleventy","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"e77f19da-a7a6-4151-a137-f7417e2a7ae9","content":"Как использовать коллекции в шаблонах","level":2,"link":"#как-использовать-коллекции-в-шаблонах","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"b6cef02a-5212-493b-bb21-cb6d567ba9c1","content":"Как использовать шорткоды","level":3,"link":"#как-использовать-шорткоды","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"88958e11-41a3-4f3c-a721-e4957b5ba061","content":"Как добавить тему на сайт Eleventy","level":2,"link":"#как-добавить-тему-на-сайт-eleventy","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"7145ba84-dac3-46af-8f8c-bd361e5fd5ae","content":"Как развернуть сайт Eleventy","level":2,"link":"#как-развернуть-сайт-eleventy","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"b2c35dc8-5530-43a2-9e20-f3045e1c91a0","content":"Перенесите сайт Eleventy на GitHub","level":3,"link":"#перенесите-сайт-eleventy-на-git-hub","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"99a5412d-6ae9-4625-ba02-aff040e8d0ce","content":"Развертывание вашего сайта Eleventy на Kinsta","level":3,"link":"#развертывание-вашего-сайта-eleventy-на-kinsta","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"f4c0cfe0-5afc-4858-bf51-59efff125917","content":" Резюме","level":2,"link":"#резюме","disable":false,"isUpdated":false,"isGeneratedLink":true}],"listStyle":"ul"} -->
<div class="wp-block-rank-math-toc-block" id="rank-math-toc"><h2>Оглавление</h2><nav><ul><li class=""><a href="#что-такое-eleventy">Что такое Eleventy?</a></li><li class=""><a href="#установить-eleventy-очень-просто-вот-как">Установить Eleventy очень просто. Вот как:</a></li><li class=""><a href="#команды-и-конфигурация-eleventy">Команды и конфигурация Eleventy</a><ul><li class=""><a href="#команды-eleventy">Команды Eleventy</a></li><li class=""><a href="#как-настроить-статический-сайт-с-помощью-eleventy">Как настроить статический сайт с помощью Eleventy</a></li></ul></li><li class=""><a href="#как-сделать-предварительный-просмотр-сайта-eleventy">Как сделать предварительный просмотр сайта Eleventy</a></li><li class=""><a href="#как-создать-статический-сайт-портфолио-с-помощью-eleventy">Как создать статический сайт-портфолио с помощью Eleventy</a><ul><li class=""><a href="#как-использовать-шаблоны-в-eleventy">Как использовать шаблоны в Eleventy</a></li><li class=""><a href="#как-создавать-макеты-в-eleventy">Как создавать макеты в Eleventy</a></li><li class=""><a href="#как-использовать-разделы-в-eleventy">Как использовать разделы в Eleventy</a></li><li class=""><a href="#как-создавать-шаблоны-страниц-в-eleventy">Как создавать шаблоны страниц в Eleventy</a></li><li class=""><a href="#как-использовать-css-и-изображения-в-eleventy"> Как использовать CSS и изображения в Eleventy</a></li></ul></li><li class=""><a href="#создание-частей-и-добавление-на-главную-страницу">Создание частей и добавление на главную страницу</a><ul><li class=""><a href="#разделы-о-герое">Разделы о герое</a></li><li class=""><a href="#разделы-о-компании">Разделы "О компании</a></li><li class=""><a href="#парциальные-навыки">Парциальные навыки</a></li></ul></li><li class=""><a href="#как-использовать-коллекции-в-eleventy">Как использовать коллекции в Eleventy</a></li><li class=""><a href="#как-использовать-коллекции-в-шаблонах">Как использовать коллекции в шаблонах</a><ul><li class=""><a href="#как-использовать-шорткоды">Как использовать шорткоды</a></li></ul></li><li class=""><a href="#как-добавить-тему-на-сайт-eleventy">Как добавить тему на сайт Eleventy</a></li><li class=""><a href="#как-развернуть-сайт-eleventy">Как развернуть сайт Eleventy</a><ul><li class=""><a href="#перенесите-сайт-eleventy-на-git-hub">Перенесите сайт Eleventy на GitHub</a></li><li class=""><a href="#развертывание-вашего-сайта-eleventy-на-kinsta">Развертывание вашего сайта Eleventy на Kinsta</a></li></ul></li><li class=""><a href="#резюме"> Резюме</a></li></ul></nav></div>
<!-- /wp:rank-math/toc-block -->

<h2 class="wp-block-heading" id="что-такое-eleventy">Что такое Eleventy?</h2>

Eleventy, также известный как 11ty, является генератором статических сайтов, который создает веб-сайты на основе HTML, CSS и JavaScript без необходимости использования баз данных и внутренних языков программирования.

Eleventy известен своей простотой и гибкостью, поскольку он не заставляет вас использовать только один язык шаблонов или фреймворк. Он поддерживает более 10 языков шаблонов и даже позволяет использовать столько языков, сколько вы хотите, в одном проекте:

<img width="1600" height="226" src="https://kinsta.com/wp-content/uploads/2023/03/11ty-template-languages.jpg" alt="Template languages supported by Eleventy">Одиннадцать языков шаблонов

Eleventy, как и большинство SSG, позволяет создавать содержимое статического сайта с помощью многократно используемых компонентов, а не создавать полные HTML-документы для каждой страницы.

<h2 class="wp-block-heading" id="установить-eleventy-очень-просто-вот-как">Установить Eleventy очень просто. Вот как:</h2>

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Убедитесь, что на вашем компьютере установлен Node.js. Вы можете проверить это, выполнив команду node -v в терминале. Не установлен? Вот как установить Node.js на ваш компьютер.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Создайте новый каталог для вашего проекта.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Откройте терминал и выполните команду npm init -y в директории вашего проекта, чтобы инициализировать новый проект Node.js, создав файл package.json с настройками по умолчанию.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Выполните команду npm install @11ty/eleventy --save-dev, чтобы установить пакет в качестве зависимости разработки в вашем проекте.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Вот и все! Теперь вы можете запустить Eleventy, выполнив команду npx @11ty/eleventy в директории вашего проекта. Это сгенерирует файлы сайта и выведет их в каталог _site (или настроенный вами каталог) в папке проекта.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

Примечание: Когда вы выполните команду npx @11ty/eleventy. Вы получите следующее сообщение:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">[11ty] Wrote 0 files in 0.01 seconds (v2.0.0)</code></pre>
<!-- /wp:code -->

Здесь записывается 0 файлов, потому что в папке вашего проекта нет шаблонов.

<h2 class="wp-block-heading" id="команды-и-конфигурация-eleventy">Команды и конфигурация Eleventy</h2>

Теперь вы создали свой проект Eleventy, но это еще не все. Вам нужно создать некоторые конфигурации и знать некоторые основные команды для вашего статического сайта, который может быть передан браузеру.

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="команды-eleventy">Команды Eleventy</h3>

Вот некоторые ключевые команды Eleventy, которые вы должны знать:

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>npx eleventy: Эта команда используется для создания вашего сайта и вывода результата в папку _site (или в любую другую папку, которую вы настроили как каталог вывода).</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>npx @11ty/eleventy --serve: Эта команда запустит локальный сервер, чтобы вы могли просматривать свой сайт в браузере. Когда вы внесете какие-либо изменения на сайте, ваш проект будет автоматически перестроен и обновлен в браузере.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>npx @11ty/eleventy --serve --port=8081: Эта команда запускает сервер Eleventy и указывает пользовательский порт, на котором будет прослушиваться сервер.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>npx @11ty/eleventy --watch: Эта команда будет следить за изменениями в файлах проекта и автоматически перестраивать сайт, когда это необходимо.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

Вам не нужно запоминать эти команды, потому что вы можете добавить их к общим командам в объект scripts вашего файла package.json:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">"scripts": {
    "start": "npx @11ty/eleventy --serve",
    "watch": "npx @11ty/eleventy --watch",
    "build": "npx eleventy"
  },</code></pre>
<!-- /wp:code -->

Теперь вы можете использовать npm start для обслуживания вашего приложения вместо npx @11ty/eleventy --serve, а также запустить npm run build вместо npx eleventy.

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="как-настроить-статический-сайт-с-помощью-eleventy">Как настроить статический сайт с помощью Eleventy</h3>

По умолчанию Eleventy имеет ”нулевую конфигурацию" и гибкие возможности настройки. Вот некоторые ключевые параметры конфигурации, которые вы должны знать:

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>ввод:&nbsp;Эта опция позволяет вам указать каталог файлов вашего проекта. Лучше всего использовать src.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>output:&nbsp;Эта опция позволяет указать каталог, в который будет выводиться созданный вами сайт. По умолчанию Eleventy выводит в папку _site. (Многие разработчики используют папку public).</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>templateFormats:&nbsp;Эта опция позволяет указать, какие расширения файлов должны обрабатываться в качестве шаблонов. По умолчанию Eleventy обрабатывает .html, .njk и .md файлы как шаблоны.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

Это лишь несколько команд и опций конфигурации, доступных в Eleventy. Чтобы настроить проект Eleventy, создайте файл .eleventy.js в корне вашего проекта. Затем вставьте этот код в файл, чтобы придать проекту структуру, включающую каталоги ввода и вывода:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">module.exports = function (eleventyConfig) {
    return {
        dir: {
            input: 'src',
            output: 'public',
        },
    };
};</code></pre>
<!-- /wp:code -->

Примечание: eleventyConfig передается в качестве аргумента, предоставляя больше опций конфигурации, которые будут использованы позже в этом проекте.

<h2 class="wp-block-heading" id="как-сделать-предварительный-просмотр-сайта-eleventy">Как сделать предварительный просмотр сайта Eleventy</h2>

Теперь вы знаете некоторые ключевые команды, которые можно использовать для предварительного просмотра статического сайта Eleventy, но когда вы выполняете команду, например, npx @11ty/eleventy, ничего не отображается. Это происходит потому, что у вас нет файла шаблона.

Вы можете создать папку src в корневой папке вашего проекта, затем создать несколько файлов шаблонов, таких как index.html, или использовать предпочитаемый вами язык шаблонов для представления домашней страницы:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
    &lt;head&gt;
        &lt;meta charset="UTF-8" /&gt;
        &lt;meta http-equiv="X-UA-Compatible" content="IE=edge" /&gt;
        &lt;meta name="viewport" content="width=device-width, initial-scale=1.0" /&gt;
        &lt;title&gt;Eleventy Static Site&lt;/title&gt;
    &lt;/head&gt;
    &lt;body&gt;
        Hello World!
    &lt;/body&gt;
&lt;/html&gt;</code></pre>
<!-- /wp:code -->

Если теперь вы выполните команду npx @11ty/eleventy, будет создана общая папка со сгенерированным статическим файлом. Вы обязательно захотите, чтобы он был передан в ваш браузер и включил некоторые функции горячей перезагрузки. Это можно сделать, выполнив следующую команду:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">npx @11ty/eleventy --serve</code></pre>
<!-- /wp:code -->

Это позволит обслуживать ваш сайт на http://localhost:8080/.

Эти команды довольно сложно запомнить и постоянно использовать. Вы уже добавили их в привычный синтаксис в файле package.json, поэтому вы можете использовать npm start для обслуживания вашего приложения на http://localhost:8080/.

<h2 class="wp-block-heading" id="как-создать-статический-сайт-портфолио-с-помощью-eleventy">Как создать статический сайт-портфолио с помощью Eleventy</h2>

Теперь вы знаете, как создать статический сайт с помощью Eleventy. Давайте создадим проект портфолио.

Вы можете создать новый проект Eleventy с нуля, или вам понадобятся изображения, CSS и фактический контент для вашего проекта, поэтому мы создали шаблон репозитория GitHub, чтобы помочь вам ускорить процесс. В GitHub выберите Use this template &gt; Create a new repository, чтобы скопировать эти активы и файлы начальной конфигурации в новый собственный репозиторий, а затем загрузите их на локальную машину.

Ваш проект будет иметь следующую структуру:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">├── node_modules/
├── public/
├── src/
 |        ├── _includes
 |                      ├── layouts
 │       ├── ../../assets
 │       ├── css
 │       ├── projects
 │       └── index.njk
├── .eleventy.js
├── .gitignore
├── package.lock.json
└── package.json</code></pre>
<!-- /wp:code -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="как-использовать-шаблоны-в-eleventy">Как использовать шаблоны в Eleventy</h3>

При использовании Eleventy есть три основных типа шаблонов, которые вам необходимо понять. Эти шаблоны могут быть созданы с помощью Nunjucks, который позволяет вам определять переменные, циклы, условия и другую логику, которая может быть использована для динамической генерации содержимого страницы.

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Шаблоны страниц:&nbsp;Они определяют структуру и содержание отдельных страниц вашего сайта.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Шаблоны макетов:&nbsp;Они определяют общую структуру и дизайн страницы (страниц) вашего сайта. Они обычно включают общие элементы, такие как верхние и нижние колонтитулы, навигационные меню и боковые панели, которые используются совместно на нескольких страницах.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Шаблоны разделов:&nbsp;Они определяют небольшие, многократно используемые разделы HTML-разметки вашего сайта. Они обычно используются для определения общих элементов, таких как верхние и нижние колонтитулы, навигационные меню и боковые панели, которые могут быть включены в шаблоны макетов и страниц.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

Теперь, когда вы понимаете каждый из этих типов шаблонов. Давайте создадим шаблоны для статического сайта-портфолио.

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="как-создавать-макеты-в-eleventy">Как создавать макеты в Eleventy</h3>

Внутри каталога src создайте каталог \_includes. В ней будут содержаться все наши макеты и части.

Затем вы можете создать папку layouts (для правильной организации), в которой будут храниться все ваши макеты. Эти макеты являются шаблонами и могут использовать предпочитаемый вами язык шаблонов, например, Nunjucks, который мы используем здесь.

Давайте создадим файл base.njk для хранения общего макета для всех ваших страниц.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
    &lt;head&gt;
        &lt;meta charset="UTF-8" /&gt;
        &lt;meta http-equiv="X-UA-Compatible" content="IE=edge" /&gt;
        &lt;meta name="viewport" content="width=device-width, initial-scale=1.0" /&gt;
        &lt;link rel="icon" href="https://kinsta.com/../../assets/favicon.jpeg" /&gt;
        &lt;link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
            integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
            crossorigin="anonymous"
            referrerpolicy="no-referrer"
        /&gt;
        &lt;link rel="stylesheet" href="http://kinsta.com/css/global.css" /&gt;
        &lt;title&gt;J.'s Portfolio&lt;/title&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;div&gt;
            {{ content | safe }}
        &lt;/div&gt;
    &lt;/body&gt;
&lt;/html&gt;</code></pre>
<!-- /wp:code -->

В приведенном выше коде создается общая HTML-разметка и включается Font Awesome из CDN, чтобы вы могли получить доступ к его иконкам. Также передается переменная content, чтобы все содержимое любой страницы, использующей этот макет, было включено.

Но это еще не вся история макета. В вашем макете будут некоторые разделы, которые будут появляться на каждой странице, например, панель навигации и нижний колонтитул. Давайте создадим партиции для каждого из этих разделов.

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="как-использовать-разделы-в-eleventy">Как использовать разделы в Eleventy</h3>

Все части хранятся в каталоге \_includes. Для правильной организации вы можете хранить их в папке. В этом случае создайте папку components в каталоге \_includes и создайте шаблоны navbar и footer.

Вот партиклы Navbar в файле navbar.njk:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">&lt;div class="nav-container"&gt;
    &lt;div class="logo"&gt;
        &lt;a href="https://kinsta.com/"&gt;
            J.
        &lt;/a&gt;
    &lt;/div&gt;
    &lt;div class="nav"&gt;
        &lt;a href="http://kinsta.com/projects" class="link"&gt;
            Projects
        &lt;/a&gt;
        &lt;a href="https://docs.google.com/document/d/10ZosQ38Z3804KYPcb_aZp9bceoXK-q3GrkHjYshqIRE/edit?usp=sharing" class="cta-btn"&gt;Resume&lt;/a&gt;
    &lt;/div&gt;
&lt;/div&gt;</code></pre>
<!-- /wp:code -->

Вот партиклы футера в файле footer.njk:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">&lt;hr /&gt;
&lt;div class="footer-container"&gt;
    &lt;p&gt;© {% year %} Joel's Portfolio&lt;/p&gt;
    &lt;div class="social_icons"&gt;
        &lt;a
            href="https://twitter.com/olawanle_joel"
            aria-label="Twitter"
            target="_blank"
            rel="noopener noreferrer"
        &gt;
            &lt;i class="fa-brands fa-twitter"&gt;&lt;/i&gt;
        &lt;/a&gt;
        &lt;a
            href="https://github.com/olawanlejoel"
            aria-label="GitHub"
            target="_blank"
            rel="noopener noreferrer"
        &gt;
            &lt;i class="fa-brands fa-github"&gt;&lt;/i&gt;
        &lt;/a&gt;
        &lt;a
            href="https://www.linkedin.com/in/olawanlejoel/"
            aria-label="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
        &gt;
            &lt;i class="fa-brands fa-linkedin"&gt;&lt;/i&gt;
        &lt;/a&gt;
    &lt;/div&gt;
&lt;/div&gt;</code></pre>
<!-- /wp:code -->

Добавьте эти части в шаблон страницы или макета. Это можно сделать с помощью оператора {% include %}. Вот как будет выглядеть шаблон layouts/base.njk, если включить в него шаблоны navbar и footer:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
    &lt;head&gt;
        &lt;meta charset="UTF-8" /&gt;
        &lt;meta http-equiv="X-UA-Compatible" content="IE=edge" /&gt;
        &lt;meta name="viewport" content="width=device-width, initial-scale=1.0" /&gt;
        &lt;link rel="icon" href="https://kinsta.com/../../assets/favicon.jpeg" /&gt;
        &lt;link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
            integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
            crossorigin="anonymous"
            referrerpolicy="no-referrer"
        /&gt;
        &lt;link rel="stylesheet" href="http://kinsta.com/css/global.css" /&gt;
        &lt;title&gt;J.'s Portfolio&lt;/title&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;div&gt;
            {% include "components/navbar.njk" %}
                {{ content | safe }}
            {% include "components/footer.njk" %}
        &lt;/div&gt;
    &lt;/body&gt;
&lt;/html&gt;</code></pre>
<!-- /wp:code -->

Когда вы выполните команду npm start, этот макет не появится, потому что он не был добавлен в шаблон страницы. Создайте шаблон страницы и добавьте этот макет.

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="как-создавать-шаблоны-страниц-в-eleventy">Как создавать шаблоны страниц в Eleventy</h3>

В папке src создайте файл index.njk, который будет служить главной страницей вашего сайта-портфолио. Эта страница будет использовать базовый макет:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">--- 

layout: layouts/base.njk
title: Home
--- 

&lt;h1&gt; This is the {{title}} Page. &lt;/h1&gt;</code></pre>
<!-- /wp:code -->

Когда вы выполните команду npm start, ваш статический сайт загрузится на http://localhost:8080/. Вот как будет выглядеть вывод:

<img width="1600" height="470" src="https://kinsta.com/wp-content/uploads/2023/03/portfolio-home-page.jpg" alt="Page Template without styling">

Шаблон страницы без стилей

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="как-использовать-css-и-изображения-в-eleventy"><br>Как использовать CSS и изображения в Eleventy</h3>

Теперь вы знаете, какие существуют шаблоны, как они работают и как их можно использовать вместе. Но вы заметили, что в файле layouts/base.njk файл CSS связан со стилями страницы портфолио, но когда сайт загружается, стили CSS не затрагиваются, потому что файл CSS не добавлен в общую папку.

Чтобы исправить это, необходимо настроить его в файле .eleventy.js с помощью параметра eleventyConfig. Это позволит Eleventy знать о существовании файла(ов) CSS, а также следить за возможными изменениями в файле CSS.

В папке src вы можете создать папку css для хранения всех CSS-файлов, которые вы будете использовать в своем проекте, но для этой статьи вы можете использовать один CSS-файл - global.css. Затем вы можете настроить папку css так, чтобы она настраивала все файлы внутри папки:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">eleventyConfig.addPassthroughCopy('src/css');
eleventyConfig.addWatchTarget('src/css');</code></pre>
<!-- /wp:code -->

То же самое касается изображений. Если вы добавите любое изображение на свою страницу, вы заметите, что оно не отображается. Чтобы оно отображалось, необходимо настроить папку, в которой хранятся изображения. Давайте создадим папку ../../assets для хранения всех наших изображений и настроим папку ../../assets.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">eleventyConfig.addPassthroughCopy('src/../../assets');</code></pre>
<!-- /wp:code -->

Вот как теперь будет выглядеть ваш конфигурационный файл:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy('src/../../assets');
    eleventyConfig.addPassthroughCopy('src/css');
    eleventyConfig.addWatchTarget('src/css');

    return {
        dir: {
            input: 'src',
            output: 'public',
        },
    };
};</code></pre>
<!-- /wp:code -->

Когда вы запустите npm start, стилизация CSS будет работать, и ваша домашняя страница будет выглядеть следующим образом:

<img width="1600" height="436" src="https://kinsta.com/wp-content/uploads/2023/03/portfolio-home-page-with-css.jpg" alt="Appearance of the template when you add layout">Внешний вид шаблона после добавления макета

<h2 class="wp-block-heading" id="создание-частей-и-добавление-на-главную-страницу">Создание частей и добавление на главную страницу</h2>

Теперь вы успешно создали макет и добавили его на домашнюю страницу (index.njk). Давайте настроим домашнюю страницу так, чтобы она содержала некоторую информацию о вас, например, дополнительные сведения о вас, ваших навыках и контактную информацию.

Вы можете добавить свои коды и разметку непосредственно в шаблон index.njk, но давайте создадим отдельные Частицы для разделов Главная, О себе, навыки и контактная информация.

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="разделы-о-герое">Разделы о герое</h3>

Это первый раздел под Navbar, основная цель которого - дать пользователям представление о том, о чем сайт.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">&lt;div class="hero-container"&gt;
    &lt;img src="https://kinsta.com/blog/eleventy/../../assets/profile.jpeg" class="profile-img" alt="Joe's personal headshot" /&gt;
    &lt;div class="hero-text"&gt;
        &lt;h1&gt;Hey, I'm Joe 👋&lt;/h1&gt;
        &lt;p&gt;
            I'm a software developer based in Lagos, Nigeria. I specialize in building (and occasionally designing) exceptional websites, applications, and everything in between.
        &lt;/p&gt;
        &lt;div class="social-icons"&gt;
            &lt;a href="https://twitter.com/olawanle_joel"&gt;
                &lt;i class="fa-brands fa-twitter"&gt;&lt;/i&gt;
            &lt;/a&gt;
            &lt;a href="https://github.com/olawanlejoel"&gt;
                &lt;i class="fa-brands fa-github"&gt;&lt;/i&gt;
            &lt;/a&gt;
            &lt;a href="https://www.linkedin.com/in/olawanlejoel/"&gt;
                &lt;i class="fa-brands fa-linkedin"&gt;&lt;/i&gt;
            &lt;/a&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;</code></pre>
<!-- /wp:code -->

Несколько подробностей о вас включены в код выше, а также несколько социальных иконок для подключения ссылок на ваши профили в социальных сетях.

Партикулы героя должны выглядеть следующим образом:

<img width="1600" height="680" src="https://kinsta.com/wp-content/uploads/2023/03/portfolio-hero-partials.jpg" alt="The Hero partials&nbsp;display basic catchy details about the developer">Экран героя

Вы можете добавить больше контента в раздел Hero, изменить стили в файле css/globals.css или даже создать свою собственную версию этого раздела.

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="разделы-о-компании">Разделы "О компании</h3>

Раздел ”О себе" предоставляет людям, которые посещают ваше портфолио, больше информации о вас в любом количестве абзацев. Это может быть отдельная страница, если вам нужно рассказать больше информации.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">&lt;div class="about-container"&gt;
    &lt;h2&gt;About Me&lt;/h2&gt;
    &lt;div class="flex-about"&gt;
        &lt;div class="about-text"&gt;
            &lt;p&gt;
                As a developer, I have always been passionate about creating elegant and effective solutions to complex problems. I have a strong foundation in software development, with a focus on web technologies such as HTML, CSS, and JavaScript. I enjoy working on both the front-end and back-end of applications, and I am always looking for ways to optimize performance, improve user experience, and ensure the highest level of code quality.
            &lt;/p&gt;
            &lt;p&gt;Throughout my career, I have worked on a wide range of projects, from simple static websites to complex enterprise-level applications. I am experienced in working with a variety of development tools and frameworks, including React, Angular, Vue.js, Node.js, and Laravel. I am always eager to learn and explore new technologies, and I am constantly seeking out opportunities to improve my skills and knowledge.&lt;/p&gt;
        &lt;/div&gt;
        &lt;div class="about-img"&gt;
            &lt;Image src="https://kinsta.com/../../assets/about.jpeg" class="profile-img" alt="Joe and animal relaxing and having fun" /&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;</code></pre>
<!-- /wp:code -->

Код содержит информацию о вас (изображение и немного текста). Вот как должен выглядеть раздел ”О вас":

<img width="1600" height="704" src="https://kinsta.com/wp-content/uploads/2023/03/portfolio-about-partials.jpg" alt="Appearance of the about partials.">О частицах

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="парциальные-навыки">Парциальные навыки</h3>

Этот раздел используется для отображения технологий, которые вы используете или любите использовать.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">&lt;div class="skills-container"&gt;
    &lt;h2&gt;Skills&lt;/h2&gt;
    &lt;div class="grid-skills"&gt;
        &lt;div class="skill-card html"&gt;
            &lt;i class="fa-brands fa-html5 html-icon"&gt;&lt;/i&gt;
            &lt;p&gt;HTML&lt;/p&gt;
        &lt;/div&gt;
        &lt;div class="skill-card css"&gt;
            &lt;i class="fa-brands fa-css3-alt css-icon"&gt;&lt;/i&gt;
            &lt;p&gt;CSS&lt;/p&gt;
        &lt;/div&gt;
        &lt;div class="skill-card js"&gt;
            &lt;i class="fa-brands fa-js-square js-icon"&gt;&lt;/i&gt;
            &lt;p&gt;JavaScript&lt;/p&gt;
        &lt;/div&gt;
        &lt;div class="skill-card react"&gt;
            &lt;i class="fa-brands fa-react react-icon"&gt;&lt;/i&gt;
            &lt;p&gt;React&lt;/p&gt;
        &lt;/div&gt;
        &lt;div class="skill-card node"&gt;
            &lt;i class="fa-brands fa-node-js node-icon"&gt;&lt;/i&gt;
            &lt;p&gt;Node&lt;/p&gt;
        &lt;/div&gt;
        &lt;div class="skill-card python"&gt;
            &lt;i class="fa-brands fa-python python-icon"&gt;&lt;/i&gt;
            &lt;p&gt;Python&lt;/p&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;</code></pre>
<!-- /wp:code -->

Приведенный выше код создает карточку для хранения иконки технологии font-awesome и названия каждого навыка. Вы также можете добавить дополнительные стили и изменить код, чтобы сделать его более привлекательным и четким. Вот как должен выглядеть раздел навыков:

<img width="1600" height="446" src="https://kinsta.com/wp-content/uploads/2023/03/portfolio-skills-partials.jpg" alt="Skills partials showing all added skills">Навыки партиципации

<br>Контактные частицы

Поскольку это портфолио, вам следует добавить способ, с помощью которого потенциальные клиенты могут связаться с вами. Одним из способов может быть отправка вам электронного письма.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">&lt;div class="contact-container"&gt;
    &lt;h2&gt;Get In Touch&lt;/h2&gt;
    &lt;p&gt;If you want us to work together, have any question or want me to speak at your event, my inbox is always open. Whether just want to say hi, I'll try my best to get back to you! Cheers!&lt;/p&gt;
    &lt;a href="https://kinsta.com/blog/eleventy/mailto:[email&nbsp;protected]" class="cta-btn"&gt;Say Hello&lt;/a&gt;
&lt;/div&gt;</code></pre>
<!-- /wp:code -->

Замените адрес электронной почты в теге a на свой собственный, чтобы кнопка запускала приложение электронной почты, с помощью которого люди смогут отправить вам сообщение.

<img width="1600" height="318" src="https://kinsta.com/wp-content/uploads/2023/03/portfolio-contact-partials.jpg" alt="Contact partials display a little information and a cta button">Контактные частицы

Теперь вы успешно создали все части для главной страницы. Далее вам нужно включить их в файл index.njk, чтобы они отображались на главной странице:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">--- 

layout: layouts/base.njk
title: Home
--- 

{% include "components/hero.njk" %}
{% include "components/about.njk" %}
{% include "components/skills.njk" %}
{% include "components/contact.njk" %}</code></pre>
<!-- /wp:code -->

Когда вы выполните команду start, на вашей домашней странице будут отображаться все добавленные Коллекции.

<h2 class="wp-block-heading" id="как-использовать-коллекции-в-eleventy">Как использовать коллекции в Eleventy</h2>

В Eleventy коллекции - это способ сгруппировать связанный контент вместе, чтобы вы могли создавать страницы на его основе. Например, если у вас есть файлы с похожим содержимым (записи блога), хранящиеся в папке блога вашего проекта, вы можете использовать коллекции, чтобы получить их и отобразить список всего содержимого. Также вы можете создать макет для обработки отображения этого содержимого.

Коллекции определяются в файле конфигурации .eleventy.js и могут включать данные из различных источников, таких как файлы markdown или JSON.

Для этого сайта-портфолио создадим каталог projects в каталоге src, чтобы хранить содержимое каждого проекта в формате markdown. Это содержимое будет включать подробную информацию о проекте, решенной проблеме, использованных технологиях, возникших проблемах и извлеченных уроках.

Вы можете создать файл markdown с именем проекта (quotes-generator.md) и вставить в него приведенный ниже код:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">--- 

title: Quotes Generator
description: "Helps you generates quotes from about 1600 quotes written by different authors . Quotes are automatically copied to your clipboards."
gitHubURL: "https://github.com/olawanlejoel/random-quote-generator"
image: "/../../assets/quotes-banner.jpeg"
--- 


The quotes generator project is a software tool designed to display random inspirational or thought-provoking quotes to users. This project aims to solve the problem of lack of motivation or inspiration by providing users with a quick and easy way to access inspiring quotes.

### Technologies Used
The technologies used in this project include HTML, CSS, and JavaScript. The application utilizes an API to fetch random quotes and display them to the user.

### Challenges and Lessons Learned
One of the main challenges faced during this project was designing the user interface to be visually appealing and responsive on different devices. The team had to consider various design elements such as font sizes, colors, and layout to create a user-friendly and aesthetically pleasing interface.

Another challenge was handling errors and edge cases such as network connectivity issues or invalid API responses. The team had to implement error handling and fallback mechanisms to ensure that the application would continue to function smoothly under various conditions.

Throughout the project, the team learned valuable lessons about front-end development, such as the importance of clean and efficient code, effective debugging and troubleshooting, and responsive design principles. They also learned the importance of utilizing APIs to access and display data from external sources.

Overall, the quotes generator project was a valuable learning experience that allowed the team to develop their technical and creative skills, and create a useful tool for users looking for daily inspiration or motivation.</code></pre>
<!-- /wp:code -->

Примечание: Если вы использовали стартовый шаблон, они у вас уже должны быть, в противном случае вы можете скопировать их из каталога projects нашего стартового шаблона на GitHub.

frontmatter в верхней части этих файлов, как и в шаблонах, делает значения доступными для вставки в ваши шаблоны.

Поскольку эти файлы Markdown находятся в каталоге src, Eleventy будет рассматривать их как шаблоны и генерировать HTML-страницу для каждого из них. Их URL будет выглядеть примерно так: /projects/quotes-generator.

<img width="1600" height="587" src="https://kinsta.com/wp-content/uploads/2023/03/quote-project-page.jpg" alt="The appearance of each project without layout">Внешний вид проекта без верстки

Однако Eleventy не знает, какой макет использовать для этих страниц, потому что у них еще нет значения макета в frontmatter.

Давайте сначала создадим макет для этого содержимого, прежде чем создавать коллекцию и добавлять их в виде списка на специальную страницу проектов.

Как и раньше, создайте файл макета (project.njk) в папке layouts. Чтобы избежать повторений, поскольку этот файл будет использовать HTML-разметку по умолчанию, вы скорректируете макет base.njk, создав блок, обозначающий раздел вашего макета, который будет изменен.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
    &lt;head&gt;
        &lt;meta charset="UTF-8" /&gt;
        &lt;meta http-equiv="X-UA-Compatible" content="IE=edge" /&gt;
        &lt;meta name="viewport" content="width=device-width, initial-scale=1.0" /&gt;
        &lt;link rel="icon" href="https://kinsta.com/../../assets/favicon.jpeg" /&gt;
        &lt;link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
            integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
            crossorigin="anonymous"
            referrerpolicy="no-referrer"
        /&gt;
        &lt;link rel="stylesheet" href="http://kinsta.com/css/global.css" /&gt;
        &lt;title&gt;J.'s Portfolio&lt;/title&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;div&gt;
            {% include "components/navbar.njk" %}
                {% block content %} 
                    {{ content | safe }}
                {% endblock %}
            {% include "components/footer.njk" %}
        &lt;/div&gt;
    &lt;/body&gt;
&lt;/html&gt;</code></pre>
<!-- /wp:code -->

Блоку присваивается имя content, поскольку в шаблонах может быть много блоков. Теперь вы можете распространить это на макет project.njk, поэтому вам нужно указать только блок content:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">{% extends "layouts/base.njk" %}

{% block content %}
    &lt;div class="project-layout"&gt;
        &lt;h2&gt;{{title}}&lt;/h2&gt;
        &lt;img src="https://kinsta.com/blog/eleventy/{{image}}" alt="image" class="banner-img" /&gt;
        &lt;a href="{{gitHubURL}}" class="cta-btn pt-btn"&gt;
            &lt;div class="small-icons"&gt;
                GitHub &lt;i class="fa-brands fa-github"&gt;&lt;/i&gt;
            &lt;/div&gt;
        &lt;/a&gt;
        {{ content | safe }}
    &lt;/div&gt;
{% endblock %}</code></pre>
<!-- /wp:code -->

В приведенном выше коде вы указываете, как будет отображаться каждый проект. Он получит заголовок, изображение и gitHubURL из frontmatter, а затем добавит другое содержимое с помощью переменной content ({{ content | safe }}).

Следующим шагом будет добавление ключа и значения layout в frontmatter каждого проекта:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">--- 

layout: layouts/project.njk
title: Quotes Generator
description: "Helps you generates quotes from about 1600 quotes written by different authors . Quotes are automatically copied to your clipboards."
gitHubURL: "https://github.com/olawanlejoel/random-quote-generator"
image: "/../../assets/quotes-banner.jpeg"
--- 


…</code></pre>
<!-- /wp:code -->

Когда вы перезагрузите URL каждого проекта, например, /projects/quotes-generator, вы заметите, что теперь он использует созданный макет:

<img width="1600" height="877" src="https://kinsta.com/wp-content/uploads/2023/03/quote-project-page-with-layout.jpg" alt="The appearance of each project with layout">Внешний вид проекта с планировкой

<h2 class="wp-block-heading" id="как-использовать-коллекции-в-шаблонах">Как использовать коллекции в шаблонах</h2>

Каждый из ваших проектов теперь красиво отображается с заданным макетом, но как люди могут получить доступ к этим проектам? Вам нужно создать список, нажав на который люди смогут перейти к каждому проекту. Здесь на помощь приходят коллекции.

Чтобы использовать коллекцию, вы должны определить ее в файле конфигурации .eleventy.js с помощью метода addCollection().

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">module.exports = function (eleventyConfig) {
    // …

    eleventyConfig.addCollection('projects', (collection) =&gt; {
        return collection.getFilteredByGlob('src/projects/*.md');
    });

    return {
        // ...
    };
};</code></pre>
<!-- /wp:code -->

В приведенном выше коде метод addCollection() используется для определения коллекции под названием projects. Функция обратного вызова, переданная в addCollection(), возвращает все файлы уценки в каталоге projects с помощью метода getFilteredByGlob().

Определив коллекцию, вы можете использовать ее в шаблоне для генерации страниц на основе этого содержимого. Давайте создадим шаблон страницы projects.njk, который будет использовать макет base.njk, но его содержимым будут проекты из коллекции projects:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">--- 

layout: layouts/base.njk
title: Projects
--- 

&lt;div class="projects-container"&gt;
    &lt;h2&gt;Projects&lt;/h2&gt;
    &lt;div class="projects-grid"&gt;
        {% for project in collections.projects %}
            &lt;div class="project-card"&gt;
                &lt;div class="project-header"&gt;
                    &lt;i class="fa-regular fa-folder-open folder-icon"&gt;&lt;/i&gt;
                    &lt;div class="small-icons"&gt;
                        &lt;a href={{project.data.gitHubURL}}&gt;&lt;i class="fa-brands fa-github"&gt;&lt;/i&gt;&lt;/a&gt;
                    &lt;/div&gt;
                &lt;/div&gt;
                &lt;h3&gt;{{project.data.title}}&lt;/h3&gt;
                &lt;p&gt;{{project.data.description}}&lt;/p&gt;
                &lt;a href="https://kinsta.com/blog/eleventy/{{project.url}}" class="cta-btn"&gt;Read more&lt;/a&gt;
            &lt;/div&gt;
        {% endfor %}
    &lt;/div&gt;
&lt;/div&gt;</code></pre>
<!-- /wp:code -->

В приведенном выше коде оператор {% for %} используется для перебора всех проектов в коллекции projects и создания карточки проекта для каждого из них.

Вы получите доступ ко всем переменным с помощью project.data.[key]. Например, приведенный выше код отобразит название проекта, его описание и URL GitHub. Вы также можете получить доступ к URL проекта с помощью project.url.

Когда вы выполните команду start и перейдете на страницу проектов, вот как будет выглядеть ваша страница, когда вы добавите много проектов:

<img width="1600" height="877" src="https://kinsta.com/wp-content/uploads/2023/03/projects-page-with-content.jpg" alt="A collection of all projects on the projects template page">Страница шаблона проектов

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="как-использовать-шорткоды">Как использовать шорткоды</h3>

Шорткоды - это способ определения пользовательских HTML-тегов или динамических значений JavaScript, которые вы можете повторно использовать в своих шаблонах. Например, вы можете определить шорткод для генерации текущего года и добавить его на свой сайт.

В конфигурационном файле .eleventy.js можно определить шорткод с помощью метода addShortcode(). Например, следующий код определяет шорткод под названием year:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">module.exports = function (eleventyConfig) {
    // ...
    eleventyConfig.addShortcode('year', () =&gt; {
        return `${new Date().getFullYear()}`;
    });
    return {
        // ...
    };
};</code></pre>
<!-- /wp:code -->

Приведенный выше шорткод year возвращает текущий год, который вы можете добавить в любой шаблон вашего проекта. Например, вместо жесткого кодирования года в футере этого сайта, вы можете добавить его динамически, используя {% year %}, чтобы он обновлялся каждый год:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">&lt;hr /&gt;
&lt;div class="footer-container"&gt;
    &lt;p&gt;© {% year %} Joel's Portfolio&lt;/p&gt;
    &lt;div class="social_icons"&gt;
        // ...
    &lt;/div&gt;
&lt;/div&gt;</code></pre>
<!-- /wp:code -->

Когда страница будет отображена, в теге HTML p будет указан текущий год.

<h2 class="wp-block-heading" id="как-добавить-тему-на-сайт-eleventy">Как добавить тему на сайт Eleventy</h2>

Добавление темы на сайт Eleventy может быть отличным способом быстро настроить внешний вид и ощущение вашего сайта. Официально Eleventy называет темы стартовыми, но следует понимать, что они означают одно и то же. Многие сайты предоставляют бесплатные темы Eleventy, например, официальные стартеры Eleventy и темы Jamstack.

Все, что вам нужно сделать, это выбрать понравившуюся тему или стартер, затем зайти в ее репозиторий GitHub, чтобы клонировать ее на свою локальную машину. Убедитесь, что вы прочитали документацию по проекту, чтобы узнать, как настроить и кастомизировать проекты.

Запустите npm install для установки всех используемых пакетов, а затем запустите npm start для локального обслуживания вашего приложения на http://localhost:8080/.

<h2 class="wp-block-heading" id="как-развернуть-сайт-eleventy">Как развернуть сайт Eleventy</h2>

Теперь вам удалось создать стильный статический сайт портфолио с помощью Eleventy. Иметь такой сайт на локальной машине недостаточно. Вы захотите разместить его в Интернете, чтобы поделиться им с кем угодно.

Kinsta - это облачная платформа, которая позволяет размещать статические веб-сайты, включая Eleventy. Это можно сделать, разместив свои коды на GitHub, а затем развернув их на Kinsta.

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="перенесите-сайт-eleventy-на-git-hub">Перенесите сайт Eleventy на GitHub</h3>

Сначала создайте репозиторий на GitHub; это даст вам доступ к URL репозитория. Затем вы можете использовать команды git для переноса своих кодов.

Перед отправкой файлов на GitHub лучше всего создать файл .gitignore, чтобы указать некоторые файлы и папки, которые git должен игнорировать при отправке кода. Создайте файл .gitignore в корневой папке и добавьте в него следующее:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript"># dependencies
/node_modules

# run
/public</code></pre>
<!-- /wp:code -->

Теперь вы можете инициализировать свой локальный Git-репозиторий, открыв терминал, перейдя в каталог, содержащий ваш проект, и выполнив следующую команду:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">git init</code></pre>
<!-- /wp:code -->

Теперь добавьте ваш код в локальный репозиторий Git с помощью следующей команды:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">git add</code></pre>
<!-- /wp:code -->

Теперь вы можете зафиксировать свои изменения с помощью следующей команды:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">git commit -m "my first commit"</code></pre>
<!-- /wp:code -->

Примечание: Вы можете заменить ”мой первый коммит" на краткое сообщение, описывающее ваши изменения.

Наконец, отправьте свой код на GitHub с помощью следующих команд:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">git remote add origin [repository URL]
git push -u origin master</code></pre>
<!-- /wp:code -->

Примечание: Убедитесь, что вы заменили ”[URL репозитория]" на URL вашего собственного репозитория GitHub.

После выполнения этих шагов ваш код будет размещен на GitHub и доступен по URL вашего репозитория.

Теперь вы можете развернуть сайт на Kinsta!

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="развертывание-вашего-сайта-eleventy-на-kinsta">Развертывание вашего сайта Eleventy на Kinsta</h3>

Развертывание на Kinsta происходит всего за несколько минут. Начните с приборной панели My Kinsta, чтобы войти в систему или создать свой аккаунт. Затем вы авторизуете Kinsta на GitHub.

Затем нажмите Приложения на левой боковой панели, затем нажмите Добавить сервис и, наконец, выберите Приложение из выпадающего списка:

<img width="1600" height="503" src="https://kinsta.com/wp-content/uploads/2023/03/Untitled-1.jpg" alt="Deploying to Kinsta’s application hosting">Развертывание на хостинге приложений Kinsta

Появится модальное окно, в котором можно выбрать хранилище, которое вы хотите развернуть. Выберите ветвь, которую вы хотите развернуть, если у вас несколько ветвей в репозитории.

Затем вы можете присвоить имя этому приложению. Выберите местоположение центра обработки данных из 25 доступных, после чего Kinsta автоматически определит команду запуска.

<img width="1600" height="815" src="https://kinsta.com/wp-content/uploads/2023/03/deploy-11ty-website.jpg" alt="Successful deployment of Jekyll static site">Успешное развертывание статического сайта Jekyll

Начнется развертывание вашего приложения. В течение нескольких минут будет предоставлена ссылка для доступа к развернутой версии вашего сайта. В данном случае это https://ty-portfolio-lvjy7.kinsta.app/.

Скучные портфолио прочь! Используйте Eleventy для создания статического сайта, который будет кричать “HIRE ME!”.

<h2 class="wp-block-heading" id="резюме"><br>Резюме</h2>

В этой статье вы узнали, как создать стильный сайт с помощью Eleventy, о различных способах настройки статического сайта Eleventy с нуля, а также о том, как создать красивый сайт-портфолио.

Создаете ли вы личный блог, сайт портфолио или интернет-магазин, Eleventy поможет вам достичь ваших целей с минимальными усилиями и максимальным эффектом. Так почему бы не попробовать его сегодня и не посмотреть, что вы можете создать?

Что вы думаете об Eleventy? Использовали ли вы Eleventy для создания чего-либо? Пожалуйста, не стесняйтесь поделиться с нами своими проектами и опытом в разделе комментариев ниже.

<script async="" src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
