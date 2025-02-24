---
title: >-
  Настройка набора реплик MongoDB локально в docker или с помощью Atlas для
  Prisma ORM
meta_title: >-
  Настройка набора реплик MongoDB локально в docker или с помощью Atlas для
  Prisma ORM - Igor Gorlov
description: >-
  Настройка набора реплик MongoDB локально в docker или с помощью Atlas для
  Prisma ORM
date: 2023-04-23T08:45:21.000Z
author: Igor Gorlov
image: ../../assets/images/undefined-Apr-23-2023.avif
categories:
  - Учебник
tags:
  - Mongodb
  - Prisma
draft: false
lastmod: 2024-03-20T21:26:46.213Z
---

<!-- wp:rank-math/toc-block {"title":"Оглавление","headings":[{"key":"2321964b-3de4-4ef6-9deb-4f1ffeb65ddd","content":"Обзор","level":2,"link":"#обзор","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"4bfee9bb-4bab-4406-9df0-8a4901bc6d66","content":"Что такое набор репликаций","level":2,"link":"#что-такое-набор-репликаций","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"f7bccafb-373d-409c-af76-86b502baaec0","content":"Установка локального экземпляра с помощью Docker","level":2,"link":"#установка-локального-экземпляра-с-помощью-docker","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"5c78c318-49f1-4345-88b4-8d59207ce086","content":"Настройка в MongoDB Atlas","level":2,"link":"#настройка-в-mongo-db-atlas","disable":false,"isUpdated":false,"isGeneratedLink":true}],"listStyle":"ul"} -->
<div class="wp-block-rank-math-toc-block" id="rank-math-toc"><h2>Оглавление</h2><nav><ul><li class=""><a href="#обзор">Обзор</a></li><li class=""><a href="#что-такое-набор-репликаций">Что такое набор репликаций</a></li><li class=""><a href="#установка-локального-экземпляра-с-помощью-docker">Установка локального экземпляра с помощью Docker</a></li><li class=""><a href="#настройка-в-mongo-db-atlas">Настройка в MongoDB Atlas</a></li></ul></nav></div>
<!-- /wp:rank-math/toc-block -->

<h2 class="wp-block-heading" id="обзор">Обзор</h2>

Prisma требует, чтобы экземпляр MongoDB работал как набор реплик, который нетривиально настроить локально, хотя довольно легко с помощью Atlas. Но если ваше интернет-соединение не очень хорошее, установка локального экземпляра становится обязательной для разработки.

Почему я пишу эту статью? Потому что существует слишком много способов сделать это неправильно. Я нашел правильный способ тяжелым путем. Если вам нужно быстрое решение, вы можете проверить мой ответ на stackoverflow. Здесь я собираюсь предоставить подробные шаги с объяснениями.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--Xiko2ZIq--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/1jbw25czwwonam6o189y.png" alt="Мемы"/></figure>
<!-- /wp:image -->

<h2 class="wp-block-heading" id="что-такое-набор-репликаций">Что такое набор репликаций</h2>

Набор реплик в MongoDB - это группа процессов mongodb, которые обрабатывают одни и те же данные для обеспечения избыточности.

Избыточность повышает высокую доступность. В наборе реплик, если один узел выходит из строя, другой узел может взять на себя выполнение операций.

Существует один первичный узел и другие вторичные узлы. Вот диаграмма, которая суммирует взаимодействие между первичными и вторичными узлами

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--V6LJSLX1--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/82zvf61wu1hlw6tcv2jy.png" alt="Набор репликаций"/></figure>
<!-- /wp:image -->

Если вы хотите узнать больше, вы можете прочитать об этом здесь

<h2 class="wp-block-heading" id="установка-локального-экземпляра-с-помощью-docker">Установка локального экземпляра с помощью Docker</h2>

Prisma опубликовала образ docker, который создает реплику одного экземпляра без дополнительной настройки.

Перейдите к тегам и найдите последнюю доступную версию, на данный момент это 5.0.3.

Извлеките образ docker с помощью

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">docker pull prismagraphql/mongo-single-replica:5.0.3
</code></pre>
<!-- /wp:code -->

Запустите образ с помощью этой команды

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">docker run --name mongo \
      -p 27017:27017 \
      -e MONGO_INITDB_ROOT_USERNAME="monty" \
      -e MONGO_INITDB_ROOT_PASSWORD="pass" \
      -d prismagraphql/mongo-single-replica:5.0.3
</code></pre>
<!-- /wp:code -->

Теперь необходимо настроить URL подключения, в данном случае он должен выглядеть следующим образом,

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">DATABASE_URL="mongodb://monty:pass@localhost:27017/db_name?authSource=admin&amp;directConnection=true"
</code></pre>
<!-- /wp:code -->

Замените db_name на имя вашей базы данных, если она не существует, она будет создана автоматически.

Обратите внимание, что ROOT_USERNAME и authSource не совпадфают, вы можете изменить ROOT_USERNAME на любой другой, но authSouce должен быть admin, так как это база данных, которая содержит учетные данные пользователей.

Наконец, протестируйте соединение. Выполните эту команду в корневом каталоге проекта. Это синхронизирует вашу схему с базой данных

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">npx prisma db push
</code></pre>
<!-- /wp:code -->

<h2 class="wp-block-heading" id="настройка-в-mongo-db-atlas">Настройка в MongoDB Atlas</h2>

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Создайте бесплатный аккаунт https://www.mongodb.com/cloud/atlas/register</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Создайте новый проект<br>Нажмите на кнопку "Создать базу данных</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<br><img width="800" height="432" src="https://res.cloudinary.com/practicaldev/image/fetch/s--m4IaL9ZB--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/4qr2qexn8ix9uwqztfll.png" alt="Build Database">

Выберите свободный кластер M0 и задайте ему имя.<br><img width="800" height="554" src="https://res.cloudinary.com/practicaldev/image/fetch/s--w0Kx4ZzF--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/6sm4pcjpec9lq4zo4i5e.png" alt="Create Cluster">

Вам будет предложено создать пользователя<br><img width="800" height="500" src="https://res.cloudinary.com/practicaldev/image/fetch/s--3tVrTlgs--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/srautgru9geg2bzg1jdg.png" alt="Create User"><br>

ПРИМЕЧАНИЕ: Для безопасности вы должны использовать автоматически сгенерированный пароль и записать его где-нибудь.<br>Ваш IP будет автоматически добавлен в список доступа, нажмите ”Завершить и закрыть" и перейдите к базе данных.

<br><img width="800" height="565" src="https://res.cloudinary.com/practicaldev/image/fetch/s--nRfVgreM--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/3ojj5fmbl3g3y4qnq2gq.png" alt="Finish Cluster Creation">

Чтобы получить url подключения, нажмите кнопку “Connect” и выберите “Drivers”.<br><img width="800" height="539" src="https://res.cloudinary.com/practicaldev/image/fetch/s--gq1OyMGb--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/w5p2mvrxrw3rvo8dhlpu.png" alt="Connect">

Наконец, скопируйте url подключения и замените на ваш автоматически сгенерированный пароль<img width="800" height="727" src="https://res.cloudinary.com/practicaldev/image/fetch/s--1ZdLw8eo--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/1lspa4zpshfymcaddw6o.png" alt="Get URL">

ВАЖНО: Вы должны добавить имя базы данных после имени хоста. В моем случае url выглядит следующим образом

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">DATABASE_URL="mongodb+srv://monty:pass@cluster0.nqtl0pv.mongodb.net/db_name?retryWrites=true&amp;w=majority"
</code></pre>
<!-- /wp:code -->

Протестируйте соединение и схему синхронизации

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">npx prisma db push
</code></pre>
<!-- /wp:code -->
