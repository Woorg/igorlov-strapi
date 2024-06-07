---
title: Реализация базовой авторизации с помощью Laravel
meta_title: Реализация базовой авторизации с помощью Laravel - Igor Gorlov
description: "Здравствуйте! В этом руководстве я покажу вам, как реализовать базовую авторизацию с помощью фреймворка laravel. \U0001F603"
date: 2023-03-26T14:40:14.000Z
author: Igor Gorlov
image: ../../assets/images/undefined-Mar-26-2023.avif
categories:
  - Учебник
tags:
  - Laravel
draft: false
lastmod: 2024-03-20T21:26:44.474Z
---

<!-- wp:rank-math/toc-block {"title":"Оглавление","headings":[{"key":"10995d12-e67d-476c-88b3-1eab7fdf9e15","content":"Введение","level":2,"link":"#введение","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"90c9b7b2-e415-48fe-8778-c5dca08f7a25","content":"Требования","level":2,"link":"#требования","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"6b0505c3-2ffe-4d26-82c2-e7d424fd310b","content":"Создание проекта","level":2,"link":"#создание-проекта","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"f60d0a0a-e6e3-4e79-843d-89f7d34de194","content":"Создание и настройка базы данных","level":2,"link":"#создание-и-настройка-базы-данных","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"190645ed-dd00-4cda-9d85-8cc90c2b55dd","content":"Завершение работы над проектом","level":2,"link":"#завершение-работы-над-проектом","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"b8782583-8bca-44fe-ae0e-b27041463600","content":"Заключение","level":2,"link":"#заключение","disable":false,"isUpdated":false,"isGeneratedLink":true}],"listStyle":"ul"} -->
<div class="wp-block-rank-math-toc-block" id="rank-math-toc"><h2>Оглавление</h2><nav><ul><li class=""><a href="#введение">Введение</a></li><li class=""><a href="#требования">Требования</a></li><li class=""><a href="#создание-проекта">Создание проекта</a></li><li class=""><a href="#создание-и-настройка-базы-данных">Создание и настройка базы данных</a></li><li class=""><a href="#завершение-работы-над-проектом">Завершение работы над проектом</a></li><li class=""><a href="#заключение">Заключение</a></li></ul></nav></div>
<!-- /wp:rank-math/toc-block -->

<h2 class="wp-block-heading" id="введение">Введение</h2>

Здравствуйте! В этом руководстве я покажу вам, как реализовать базовую авторизацию с помощью фреймворка laravel. 😃

<h2 class="wp-block-heading" id="требования">Требования</h2>

Для этого урока вам понадобится следующее:

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>PHP и composer, установленные на вашей системе (Процесс установки зависит от вашей ОС).</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Базовые знания PHP</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>PHP драйвер для подключения к вашей базе данных (В данном примере используется PostgreSQL)</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<h2 class="wp-block-heading" id="создание-проекта">Создание проекта</h2>

Создать проект очень просто — достаточно выполнить следующую команду:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">composer create-project --prefer-dist laravel/laravel auth-example
</code></pre>
<!-- /wp:code -->

Это создаст проект под названием “auth-example” в каталоге, в котором вы выполнили вышеуказанную команду. Далее нам нужно настроить базу данных, которая будет использоваться для хранения учетных данных пользователя.

<h2 class="wp-block-heading" id="создание-и-настройка-базы-данных">Создание и настройка базы данных</h2>

В этом руководстве мы сосредоточимся на PostgreSQL, но вы можете использовать mysql и т.д.<br>Сначала нам нужно создать базу данных, для этого выполните следующие команды:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">psql postgres

# This will log you in to the postgresql database
# Next create the database
create database laravel_example;

# Next we need to create a role that can access the created database.
create role laravel with LOGIN PASSWORD 'password' SUPERUSER;
</code></pre>
<!-- /wp:code -->

Вышеуказанное создаст новую базу данных под названием “laravel_example” и нового пользователя под названием “laravel” с паролем “password”, очевидно, что в производственной среде вам понадобится более сложный для угадывания пароль 😉.

Далее вам нужно будет изменить файл ”.env” вашего laravel, чтобы он знал о базе данных, которая только что была создана. Откройте файл ".env” и отредактируйте следующее:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="properties" class="language-properties">DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=laravel_example
DB_USERNAME=laravel
DB_PASSWORD=password
</code></pre>
<!-- /wp:code -->

Теперь мы можем продолжить создание проекта.

<h2 class="wp-block-heading" id="завершение-работы-над-проектом">Завершение работы над проектом</h2>

Теперь нам нужно установить пользовательский интерфейс для проекта, это можно сделать, выполнив следующие команды:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">yarn
composer require laravel/ui
php artisan ui react --auth
yarn
</code></pre>
<!-- /wp:code -->

Приведенные выше команды инициализируют пакеты node, а затем реализуют пользовательский интерфейс React (вы можете использовать другие фреймворки пользовательского интерфейса, но React, вероятно, является самым популярным). После внедрения мы снова запускаем yarn, чтобы завершить установку. Вам может быть предложено заменить текущие представления, если это так, введите ”да" для всех из них.

Далее нам нужно запустить миграции для базы данных, это можно сделать с помощью следующей команды:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">php artisan migrate
</code></pre>
<!-- /wp:code -->

Затем мы можем запустить сервер разработки следующим образом:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash"># Start Laravel
php artisan serve

# Start react UI
yarn dev
</code></pre>
<!-- /wp:code -->

Теперь, если вы направите браузер на страницу “http://localhost:8000”, вы увидите следующее:

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--T1dgGfwN--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://i.ibb.co/rvQPK0f/laravel-start.png" alt="Стартовая страница"/></figure>
<!-- /wp:image -->

Если вы нажмете на кнопку Register, вы увидите следующее:

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--rTtZKO97--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://i.ibb.co/mSVNv73/laravel-register.png" alt="Страница Регистрации"/></figure>
<!-- /wp:image -->

Не стесняйтесь попробовать зарегистрировать учетную запись, в случае успеха вы попадете на страницу приборной панели:

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--1dikt0a5--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://i.ibb.co/J2JzYXd/laravel-dashboard.png" alt="Дашборд"/></figure>
<!-- /wp:image -->

Попробуйте выйти из системы и снова войти в нее через страницу входа:

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--_PUzMjZV--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://i.ibb.co/CnMsp1x/laravel-login.png" alt="Страница входа в систему"/></figure>
<!-- /wp:image -->

Отлично, теперь вы реализовали базовую авторизацию в laravel 😎

<h2 class="wp-block-heading" id="заключение">Заключение</h2>

В этом руководстве я показал, как реализовать базовую авторизацию с помощью фреймворка Laravel. Надеюсь, что вы чему-то научились, так как я получил массу удовольствия от реализации. 😄

Я новичок, когда дело касается Laravel, поэтому если у вас есть какие-либо замечания, пожалуйста, дайте мне знать в комментариях.

Вы можете найти исходники этого проекта на моей странице Github:<br>https://github.com/ethand91/laravel-auth-example

Счастливого кодинга! 😄

Нравится моя работа? Я пишу на разные темы, если вы хотите видеть больше, пожалуйста, ставьте лайк и следите за мной.<br>Также я люблю кофе.

Если вы хотите изучить шаблоны алгоритмов, чтобы успешно пройти собеседование по кодингу, я рекомендую следующий курс
