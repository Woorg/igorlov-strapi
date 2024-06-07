---
title: 'Докеризация вашего приложения: Знакомство с Docker'
meta_title: 'Докеризация вашего приложения: Знакомство с Docker - Igor Gorlov'
description: >-
  Представьте себе такой сценарий: вы закончили разработку приложения и готовы
  развернуть его на удаленной машине. Однако вы обнаруживаете, что дистрибутив
  сервера не является Ubuntu или CentOS, с которыми вы хорошо знакомы.
date: 2023-03-22T20:03:57.000Z
author: Igor Gorlov
image: ../../assets/images/undefined-Mar-22-2023.avif
categories:
  - Учебник
tags:
  - DevOps
  - Docker
draft: false
lastmod: 2024-03-20T21:26:43.910Z
---

Представьте себе такой сценарий: вы закончили разработку приложения и готовы развернуть его на удаленной машине. Однако вы обнаруживаете, что дистрибутив сервера не является Ubuntu или CentOS, с которыми вы хорошо знакомы. Более того, чтобы запустить приложение, вы должны сначала вручную установить системные зависимости, такие как Node.js и MongoDB. Это может быть довольно хлопотно! Сейчас идеальный момент для использования Docker.

Docker поможет вам упаковать среду Ubuntu + Node14 + MongoDB с вашим JS-кодом в один образ. Таким образом, вы сможете легко запустить весь образ на удаленном сервере, не беспокоясь о проблемах с окружением.

<!-- wp:rank-math/toc-block {"title":"Оглавление","headings":[{"key":"7a701fc3-2f26-4469-baef-05ef761da5ce","content":"Что такое Docker","level":2,"link":"#что-такое-docker","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"99e1299a-0025-4c6f-a116-026b0df502c9","content":"Давайте попробуем использовать Docker","level":2,"link":"#давайте-попробуем-использовать-docker","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"c8d35828-c771-42cb-b019-9147a6ecdbc3","content":"Установите Docker","level":3,"link":"#установите-docker","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"969e9405-c73c-4509-bafc-281bb4acd9c9","content":"Создание среды Ubuntu с помощью Docker","level":3,"link":"#создание-среды-ubuntu-с-помощью-docker","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"e1d1a92c-9145-45ec-bb3c-3d6595e43704","content":"Как упаковать в Docker существующее приложение","level":2,"link":"#как-упаковать-в-docker-существующее-приложение","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"454f03a4-3ff3-496c-87b6-6fb8b640cc34","content":"Шаг 0 - Создание Docker-файла","level":3,"link":"#шаг-0-создание-docker-файла","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"23f9adc1-16f1-4b96-b5a3-956344d907bc","content":"Шаг 1 - Найти подходящий базовый образ","level":3,"link":"#шаг-1-найти-подходящий-базовый-образ","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"4aeb06d7-b60c-45f8-b4fd-a0b21ce0aa68","content":"Шаг 2 - Скопируйте исходный код в изображение","level":3,"link":"#шаг-2-скопируйте-исходный-код-в-изображение","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"809d4921-fed1-4c0e-907b-562f6ce9f608","content":"Шаг 3 - Установка зависимостей","level":2,"link":"#шаг-3-установка-зависимостей","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"639bbcd5-904e-401a-a84b-cf191cb57f77","content":"Шаг 4 - Укажите начальную команду","level":3,"link":"#шаг-4-укажите-начальную-команду","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"e7b80423-2051-428c-9f2d-2715fceac59c","content":"Шаг 5 - Сборка образа","level":3,"link":"#шаг-5-сборка-образа","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"3a225e61-f183-4017-aa88-5c5c0a3fc40c","content":"Запуск образа на ноутбуке","level":2,"link":"#запуск-образа-на-ноутбуке","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"bb4ca9e9-6df9-4bd2-bd5f-351c6df0526f","content":"Запуск в фоновом режиме","level":3,"link":"#запуск-в-фоновом-режиме","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"11503787-9009-4d4f-b531-45d1105c0eb4","content":"Резюме","level":2,"link":"#резюме","disable":false,"isUpdated":false,"isGeneratedLink":true}],"listStyle":"ul"} -->
<div class="wp-block-rank-math-toc-block" id="rank-math-toc"><h2>Оглавление</h2><nav><ul><li class=""><a href="#что-такое-docker">Что такое Docker</a></li><li class=""><a href="#давайте-попробуем-использовать-docker">Давайте попробуем использовать Docker</a><ul><li class=""><a href="#установите-docker">Установите Docker</a></li><li class=""><a href="#создание-среды-ubuntu-с-помощью-docker">Создание среды Ubuntu с помощью Docker</a></li></ul></li><li class=""><a href="#как-упаковать-в-docker-существующее-приложение">Как упаковать в Docker существующее приложение</a><ul><li class=""><a href="#шаг-0-создание-docker-файла">Шаг 0 - Создание Docker-файла</a></li><li class=""><a href="#шаг-1-найти-подходящий-базовый-образ">Шаг 1 - Найти подходящий базовый образ</a></li><li class=""><a href="#шаг-2-скопируйте-исходный-код-в-изображение">Шаг 2 - Скопируйте исходный код в изображение</a></li></ul></li><li class=""><a href="#шаг-3-установка-зависимостей">Шаг 3 - Установка зависимостей</a><ul><li class=""><a href="#шаг-4-укажите-начальную-команду">Шаг 4 - Укажите начальную команду</a></li><li class=""><a href="#шаг-5-сборка-образа">Шаг 5 - Сборка образа</a></li></ul></li><li class=""><a href="#запуск-образа-на-ноутбуке">Запуск образа на ноутбуке</a><ul><li class=""><a href="#запуск-в-фоновом-режиме">Запуск в фоновом режиме</a></li></ul></li><li class=""><a href="#резюме">Резюме</a></li></ul></nav></div>
<!-- /wp:rank-math/toc-block -->

<h2 class="wp-block-heading" id="что-такое-docker">Что такое Docker</h2>

Docker - это легкая технология виртуализации, которая позволяет легко упаковать ваше приложение и его окружение в образ, так что вам больше не придется беспокоиться о проблемах с окружением.

Следующий пример демонстрирует использование Docker для запуска трех отдельных приложений в разных контейнерах. Каждый контейнер обеспечивает независимую среду, что означает, что они могут иметь различные системы, базы данных, компиляторы и т.д. Например, вы можете запустить Node 8 в одном контейнере и Node 14 в другом.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--RAwCtY8N--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/80o5934vwpsnlg1lkt71.png" alt="Пример использования Docker"/></figure>
<!-- /wp:image -->

<h2 class="wp-block-heading" id="давайте-попробуем-использовать-docker">Давайте попробуем использовать Docker</h2>

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="установите-docker">Установите Docker</h3>

Docker может быть запущен на Linux, macOS и Windows. Вы можете перейти на страницу “Get Docker” и получить версию, совместимую с вашей ОС. После установки Docker вы можете выполнить команду docker run hello-world, чтобы убедиться, что Docker установлен правильно.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--8dyhi0Kg--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/wu2adgr3t7mc7d7egujf.png" alt="Docker helloworld"/></figure>
<!-- /wp:image -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="создание-среды-ubuntu-с-помощью-docker">Создание среды Ubuntu с помощью Docker</h3>

Docker позволяет легко получить нужное вам окружение. Например, если вам в данный момент нужна среда Ubuntu Bash, вы можете сначала получить образ Ubuntu из Docker Hub.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">docker pull ubuntu
docker image ls
</code></pre>
<!-- /wp:code -->

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--fu7vceSu--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/6sywmpkh544kasu16pq9.png" alt="образ ubuntu"/></figure>
<!-- /wp:image -->

После подготовки образа ubuntu можно запустить процесс Bash в контейнере Ubuntu. Опция -it включает интерактивный режим в контейнере, что позволяет нам выполнять команды в Bash.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">docker run -it ubuntu bash
</code></pre>
<!-- /wp:code -->

После входа в контейнер можно выполнить команду cat /etc/\*release, чтобы увидеть версию Ubuntu, которая на моей стороне составляет 22.04.2 LTS.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--uy-fgKx3--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/7y0yv75ud1veub8ty4xw.png" alt="версия ubuntu"/></figure>
<!-- /wp:image -->

Возможно, вы путаете изображение с контейнером. Вы можете думать об образе как о коде. Это просто файлы, хранящиеся на диске и не работающие в данный момент. Контейнер, с другой стороны, - это запущенный экземпляр образа. Контейнеры используют ресурсы вашего процессора и памяти для выполнения кода, содержащегося в образе.

В общем, Docker позволяет вам получить желаемое окружение. Далее я расскажу вам, как упаковать ваше приложение с нужным вам окружением.

<h2 class="wp-block-heading" id="как-упаковать-в-docker-существующее-приложение">Как упаковать в Docker существующее приложение</h2>

Dockerize означает упаковать приложение и окружение в образ Docker. После установки Docker на целевой машине вы можете просто запустить образ для развертывания приложения.

В этом посте я покажу, как докеризировать приложение Node.js под названием simple-express-server. Приложение представляет собой HTTP-сервер, который прослушивает порт 8080 и при обращении к нему отвечает “Hello World!”.

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="шаг-0-создание-docker-файла">Шаг 0 - Создание Docker-файла</h3>

Для того чтобы упаковать код и окружение в единый образ, нам нужно записать все шаги по упаковке в Dockerfile. Итак, давайте сначала создадим пустой Dockerfile.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">simple-express-server
├── Dockerfile  &lt;--  HERE
├── README.md
├── index.js
├── node_modules
└── package.json
</code></pre>
<!-- /wp:code -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="шаг-1-найти-подходящий-базовый-образ">Шаг 1 - Найти подходящий базовый образ</h3>

Образ Docker строится слой за слоем, поэтому нам нужно найти подходящий базовый образ на Docker Hub, а затем переработать его в нужный нам образ.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s---3t44Su5--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/nbb3ay4fapxz4moqso9t.png" alt="слои изображение"/></figure>
<!-- /wp:image -->

Поскольку проект написан на Node.js, нам нужно найти окружение Node.js на Docker Hub. Мы можем найти официальный образ Node на Docker Hub, выполнив поиск по запросу “Node.js”.

Если вы хотите докеризировать приложение, написанное на других языках, вы можете легко найти соответствующий образ для Python, Golang и т.д.

Определившись с базовым образом, мы должны выбрать для него версию. В данном случае мы используем node:18.15. Если вы предпочитаете использовать последнюю версию, вы можете указать node:latest.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="docker" class="language-docker"># Dockerfile
FROM node:18.15
</code></pre>
<!-- /wp:code -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="шаг-2-скопируйте-исходный-код-в-изображение">Шаг 2 - Скопируйте исходный код в изображение</h3>

После настройки среды Node.js следующим шагом будет копирование всего необходимого исходного кода в образ. Для этого мы воспользуемся командой COPY, чтобы скопировать index.js и package.json в каталог /app внутри контейнера.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="docker" class="language-docker">FROM node:18.15
COPY index.js package.json /app/
</code></pre>
<!-- /wp:code -->

<h2 class="wp-block-heading" id="шаг-3-установка-зависимостей">Шаг 3 - Установка зависимостей</h2>

После того как мы получили окружение и исходный код в образе, нам нужно перейти в каталог /app и установить зависимости.

Сначала мы используем команду WORKDIR для перехода в каталог /app, а затем выполним команду npm install &amp;&amp; npm cache clean --force. Цель очистки кэша - минимизировать размер результирующего образа.

Если вы пишете на других языках, вы можете заменить npm install соответствующей командой, например pip install, для установки зависимостей.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="docker" class="language-docker">WORKDIR /app
RUN npm install &amp;&amp; npm cache clean --force
</code></pre>
<!-- /wp:code -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="шаг-4-укажите-начальную-команду">Шаг 4 - Укажите начальную команду</h3>

После подготовки среды, исходного кода и зависимостей, последним шагом является выполнение программы. Для этого мы используем CMD, чтобы указать начальную команду. Поскольку это приложение Node.js требует запуска node index.js, мы запишем эту команду в Dockerfile.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="docker" class="language-docker">FROM node:18.15
COPY index.js package.json /app/
WORKDIR /app
RUN npm install &amp;&amp; npm cache clean --force
CMD node index.js
</code></pre>
<!-- /wp:code -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="шаг-5-сборка-образа">Шаг 5 - Сборка образа</h3>

После завершения создания Dockerfile мы можем использовать команду docker build -t simple-express-server . для сборки образа из Dockerfile.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--3a3cxYL9--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/6b9c9cmzcpym0t2h3p5l.png" alt="создать образ"/></figure>
<!-- /wp:image -->

После завершения процесса сборки вы можете запустить команду docker image ls для просмотра образа с именем simple-express-server. Образ содержит среду Node.js, код приложения, зависимости и команду init.

<h2 class="wp-block-heading" id="запуск-образа-на-ноутбуке">Запуск образа на ноутбуке</h2>

После подготовки образа мы можем запустить контейнер, выполнив команду docker run -p 3000:8080 simple-express-server. Внутри контейнера будет выполнена команда node index.js. Опция -p 3000:8080 соединяет порт 3000 на ноутбуке с портом 8080 в контейнере, чтобы мы могли получить доступ к серверу API на 127.0.0.1:3000.

После докеризации приложения мы можем запустить API-сервер без необходимости установки Node.js. Docker - это все, что нам нужно!

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="запуск-в-фоновом-режиме">Запуск в фоновом режиме</h3>

Поскольку команда previous будет блокировать терминал, вы можете добавить опцию -d для запуска контейнера в фоновом режиме. Выполнив команду docker run -d , вы получите идентификатор контейнера. Если вы хотите просмотреть журналы контейнера, просто выполните команду docker logs -f &lt;container ID&gt;.

<h2 class="wp-block-heading" id="резюме">Резюме</h2>

Эта заметка охватывает фундаментальные концепции Docker и предоставляет руководство по докеризации существующего приложения Node.js. Если вы хотите узнать больше о командах Docker, вы можете ознакомиться с базовой справкой по командам и Dockerfile.

Это первый пост из серии статей о Docker. В следующих постах я расскажу о таких темах, как docker-compose, docker swarm и Kubernetes. Пожалуйста, следите за мной, если вам интересно узнать о Docker. Спасибо!
