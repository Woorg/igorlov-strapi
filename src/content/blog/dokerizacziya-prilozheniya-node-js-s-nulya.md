---
title: Докеризация приложения Node.js с нуля
meta_title: Докеризация приложения Node.js с нуля - Igor Gorlov
description: >-
  Докеризация приложения Node.js может значительно упростить процесс
  развертывания и улучшить масштабируемость вашего приложения. Docker – это
  платформа контейнеризации, которая позволяет упаковать ваше приложение и его
  зависимости в контейнер, который затем может быть запущен на любой платформе,
  поддерживающей Docker.
date: 2023-04-30T16:46:52.000Z
author: Igor Gorlov
image: ../../assets/images/undefined-Apr-30-2023.avif
categories:
  - Как закодить
tags:
  - Docker
draft: false
lastmod: 2024-03-20T21:26:48.155Z
---

Докеризация приложения Node.js может значительно упростить процесс развертывания и улучшить масштабируемость вашего приложения. Docker - это платформа контейнеризации, которая позволяет упаковать ваше приложение и его зависимости в контейнер, который затем может быть запущен на любой платформе, поддерживающей Docker.

В этой статье мы рассмотрим шаги, необходимые для Dockerize приложения Node.js с нуля.

<!-- wp:rank-math/toc-block {"title":"Оглавление","headings":[{"key":"ecc22f7b-3ad1-4edd-998c-440e9bfc1046","content":"Шаг 1: Создание приложения Node.js","level":2,"link":"#шаг-1-создание-приложения-node-js","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"9c5e9cd7-f366-4b32-aa0b-5cfef163118f","content":"Шаг 2: Создание Dockerfile","level":2,"link":"#шаг-2-создание-dockerfile","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"04eaf06d-00ef-4375-a12e-80f75d00bfdc","content":"Шаг 3: Сборка образа Docker","level":2,"link":"#шаг-3-сборка-образа-docker","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"0bdb1b50-3015-4fe7-8ad2-a73b890772e5","content":"Шаг 4: Запуск контейнера Docker","level":2,"link":"#шаг-4-запуск-контейнера-docker","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"1a502d61-a78d-47f8-9951-d36f854c13f8","content":"Заключение","level":2,"link":"#заключение","disable":false,"isUpdated":false,"isGeneratedLink":true}],"listStyle":"ul"} -->
<div class="wp-block-rank-math-toc-block" id="rank-math-toc"><h2>Оглавление</h2><nav><ul><li class=""><a href="#шаг-1-создание-приложения-node-js">Шаг 1: Создание приложения Node.js</a></li><li class=""><a href="#шаг-2-создание-dockerfile">Шаг 2: Создание Dockerfile</a></li><li class=""><a href="#шаг-3-сборка-образа-docker">Шаг 3: Сборка образа Docker</a></li><li class=""><a href="#шаг-4-запуск-контейнера-docker">Шаг 4: Запуск контейнера Docker</a></li><li class=""><a href="#заключение">Заключение</a></li></ul></nav></div>
<!-- /wp:rank-math/toc-block -->

<h2 class="wp-block-heading" id="шаг-1-создание-приложения-node-js">Шаг 1: Создание приложения Node.js</h2>

Первым шагом будет создание приложения Node.js, которое мы хотим докеризировать. Для этого мы будем использовать фреймворк Express.js, который является популярным фреймворком веб-приложений для Node.js.

Чтобы создать приложение Express.js, нам сначала нужно установить Node.js и менеджер пакетов npm на нашу машину. После установки Node.js и npm мы можем создать новое приложение Express.js, выполнив следующую команду:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">npx express-generator myapp
</code></pre>
<!-- /wp:code -->

Это создаст новое приложение Express.js в каталоге под названием myapp. После создания приложения мы можем перейти в каталог и установить его зависимости с помощью npm:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">cd myapp
npm install
</code></pre>
<!-- /wp:code -->

<h2 class="wp-block-heading" id="шаг-2-создание-dockerfile">Шаг 2: Создание Dockerfile</h2>

Следующим шагом будет создание Dockerfile, который представляет собой конфигурационный файл, описывающий, как создать образ Docker для нашего приложения Node.js.

Создайте новый файл под названием Dockerfile в корневом каталоге вашего приложения и добавьте в него следующее содержимое:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript"># Use an official Node.js runtime as a parent image
FROM node:14-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose port 3000
EXPOSE 3000

# Start the application
CMD [ "npm", "start" ]
</code></pre>
<!-- /wp:code -->

Давайте пройдемся по этому Dockerfile строка за строкой:

FROM node:14-alpine: Эта строка указывает, что мы хотим использовать официальную среду исполнения Node.js 14 в качестве базового образа для нашего образа Docker. Alpine - это легкий дистрибутив Linux, который обычно используется для Docker-образов из-за своего небольшого размера.

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>WORKDIR /app: Эта строка устанавливает рабочий каталог для нашего образа Docker в /app.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>COPY package*.json ./: Эта строка копирует файлы package.json и package-lock.json в рабочий каталог.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>RUN npm install: Эта строка устанавливает зависимости, перечисленные в package.json.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>COPY ...: Эта строка копирует остальной код приложения в рабочий каталог.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>EXPOSE 3000: Эта строка открывает порт 3000 - порт, который будет прослушивать наше приложение Node.js.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>CMD [ "npm", "start" ]: В этой строке указывается команда, которая будет выполняться при запуске контейнера Docker. В данном случае мы запускаем наше приложение Node.js с помощью команды npm start.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<h2 class="wp-block-heading" id="шаг-3-сборка-образа-docker">Шаг 3: Сборка образа Docker</h2>

Теперь, когда у нас есть Dockerfile, мы можем использовать его для создания образа Docker для нашего приложения Node.js. Для этого мы воспользуемся командой docker build.

Откройте окно терминала, перейдите в корневой каталог вашего приложения и выполните следующую команду:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">docker build -t myapp .</code></pre>
<!-- /wp:code -->

Эта команда указывает Docker на сборку нового образа с использованием Dockerfile в текущем каталоге и присваивает ему имя myapp. Символ . в конце команды указывает контекст сборки, то есть каталог, который Docker использует в качестве корня процесса сборки.

<h2 class="wp-block-heading" id="шаг-4-запуск-контейнера-docker">Шаг 4: Запуск контейнера Docker</h2>

Теперь, когда у нас есть образ Docker для нашего приложения Node.js, мы можем использовать его для запуска контейнера Docker. Для этого мы воспользуемся командой docker run.

Откройте окно терминала и выполните следующую команду:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">docker run -p 3000:3000 myapp</code></pre>
<!-- /wp:code -->

Эта команда указывает Docker запустить новый контейнер, используя образ myapp, который мы только что создали, и сопоставить порт 3000 из контейнера с портом 3000 на хост-машине. Это позволит нам получить доступ к нашему приложению Node.js, запущенному внутри контейнера, через веб-браузер.

Если все настроено правильно, вы должны увидеть вывод в окне терминала, указывающий на то, что ваше приложение Node.js запущено. Теперь вы можете открыть веб-браузер и перейти по адресу http://localhost:3000, чтобы увидеть свое приложение в действии.

<h2 class="wp-block-heading" id="заключение">Заключение</h2>

В этой статье мы рассмотрели шаги, необходимые для Dockerize приложения Node.js с нуля, без копирования других. Мы начали с создания нового приложения Node.js с использованием фреймворка Express.js, затем создали Dockerfile, в котором описали, как создать образ Docker для нашего приложения. Затем мы создали образ Docker и запустили контейнер Docker, используя этот образ. Выполнив эти шаги, вы теперь должны иметь полностью Dockerized Node.js приложение, которое можно легко развернуть и масштабировать.

Спасибо за ваше время!
