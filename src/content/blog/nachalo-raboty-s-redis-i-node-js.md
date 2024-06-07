---
title: Начало работы с Redis и Node.JS
meta_title: Начало работы с Redis и Node.JS - Igor Gorlov
description: >-
  Redis  это мощный инструмент для кэширования данных и обеспечения их
  доступности в памяти. Для работы Redis требуется оперативная память, и каждый
  фрагмент
date: 2023-11-19T23:56:15.784Z
author: Igor Gorlov
image: ../../assets/images/undefined-Nov-20-2023.avif
category:
  - Как закодить
tag:
  - JavaScript
  - Node
  - Redis
draft: false
categories:
  - Как закодить
tags:
  - Redis
  - Node.js
lastmod: 2024-03-20T21:26:45.172Z
---

Redis - это мощный инструмент для кэширования данных и обеспечения их доступности в памяти. Для работы Redis требуется оперативная память, и каждый фрагмент данных, который вы используете в Redis, загружается в оперативную память. Это означает, что доступ к ним можно получить очень быстро, что позволяет нам кэшировать и предоставлять данные пользователям очень быстро.

Redis имеет множество применений, включая кэширование веб-страниц и использование в качестве обычной базы данных для более быстрого доступа. Его также можно использовать из коробки с Node.JS. В этом руководстве я покажу вам, как начать работу с Redis и Node.JS.

<h2 class="wp-block-heading" id="использование-redis-с-node-js">Использование Redis с Node.JS</h2>

Прежде чем начать, убедитесь, что вы сначала установили Redis. Затем запустите новый проект/папку Node.JS и запустите npm с помощью npm init в этой папке:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">npm init</code></pre>
<!-- /wp:code -->

Это поможет вам выполнить настройку npm. Затем вы можете установить пакет npm redis, используя:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">npm i redis</code></pre>
<!-- /wp:code -->

После этого вы можете свободно использовать Redis в своем коде любым удобным для вас способом. Пакет Node.JS redis предоставляет вам интерфейс для хранения данных в базе данных Redis, точно так же, как если бы вы использовали Redis из командной строки. Чтобы начать работу с ним, вы можете импортировать redis в свой код следующим образом:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript"><span class="k">import</span> <span class="p">{</span> <span class="nx">createClient</span> <span class="p">}</span> <span class="k">from</span> <span class="dl">'</span><span class="s1">redis</span><span class="dl">'</span><span class="p">;</span>

<span class="kd">const</span> <span class="nx">client</span> <span class="o">=</span> <span class="nx">createClient</span><span class="p">();</span>
<span class="nx">client</span><span class="p">.</span><span class="nx">on</span><span class="p">(</span><span class="dl">'</span><span class="s1">error</span><span class="dl">'</span><span class="p">,</span> <span class="p">(</span><span class="nx">err</span><span class="p">)</span> <span class="o">=&gt;</span> <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="dl">'</span><span class="s1">Redis Client Error</span><span class="dl">'</span><span class="p">,</span> <span class="nx">err</span><span class="p">));</span>
<span class="k">await</span> <span class="nx">client</span><span class="p">.</span><span class="nx">connect</span><span class="p">();</span></code></pre>
<!-- /wp:code -->

createClient - это функция, которую мы используем для подключения к redis - после чего мы инициируем наше подключение к redis с помощью метода connect() этой функции. После этого мы можем взаимодействовать с redis, используя нашу клиентскую переменную.

Давайте рассмотрим несколько примеров. Чтобы установить ключ, мы теперь можем использовать client.set:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript"><span class="k">await</span> <span class="nx">client</span><span class="p">.</span><span class="kd">set</span><span class="p">(</span><span class="dl">'</span><span class="s1">myKey</span><span class="dl">'</span><span class="p">,</span> <span class="dl">'</span><span class="s1">someValue</span><span class="dl">'</span><span class="p">);</span></code></pre>
<!-- /wp:code -->

Поскольку на установку данных в оперативную память требуется некоторое время, каждая из этих функций является асинхронной - то есть возвращает обещания. Поэтому убедитесь, что вы используете их в сочетании с await или then. Подробнее об обещаниях вы можете узнать здесь.

Аналогичным образом мы можем получить ключ с помощью функции get:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript"><span class="k">await</span> <span class="nx">client</span><span class="p">.</span><span class="kd">get</span><span class="p">(</span><span class="dl">'</span><span class="s1">myKey</span><span class="dl">'</span><span class="p">)</span></code></pre>
<!-- /wp:code -->

Redis намного быстрее других баз данных, поскольку она доступна прямо в памяти - поэтому ожидайте высокого уровня производительности при использовании этих функций. Вы также можете использовать любую другую типичную функцию Redis, например, Hashes:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript"><span class="k">await</span> <span class="nx">client</span><span class="p">.</span><span class="nx">hSet</span><span class="p">(</span><span class="dl">'</span><span class="s1">user</span><span class="dl">'</span><span class="p">,</span> <span class="dl">'</span><span class="s1">1</span><span class="dl">'</span><span class="p">,</span> <span class="dl">'</span><span class="s1">someValue</span><span class="dl">'</span><span class="p">);</span>
<span class="k">await</span> <span class="nx">client</span><span class="p">.</span><span class="nx">hGetAll</span><span class="p">(</span><span class="dl">'</span><span class="s1">user</span><span class="dl">'</span><span class="p">);</span></code></pre>
<!-- /wp:code -->

Вы также можете использовать sendCommand, если хотите отправить Redis определенную команду любого типа. Это полезно, если вы нашли что-то, что Redis для Node.JS не поддерживает:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript"><span class="k">await</span> <span class="nx">client</span><span class="p">.</span><span class="nx">sendCommand</span><span class="p">([</span><span class="dl">'</span><span class="s1">HGETALL</span><span class="dl">'</span><span class="p">,</span> <span class="dl">'</span><span class="s1">someKey</span><span class="dl">'</span><span class="p">]);</span></code></pre>
<!-- /wp:code -->

<h2 class="wp-block-heading" id="заключение">Заключение</h2>

Redis работает очень быстро, и я использовал его довольно широко при создании fjolt. Надеюсь, вам понравилось это краткое руководство по началу работы с Redis в Node.JS.
