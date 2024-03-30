---
title: Практическое руководство по парсингу в Python
meta_title: Практическое руководство по парсингу в Python - Igor Gorlov
description: >-
  Веб-скрейпинг, если говорить простым языком, – это техника, используемая для
  сбора полезных данных с веб-сайта. Согласитесь, в Интернете есть масса
  информации, и чаще всего она может быть структурирована не совсем так, как нам
  нужно.
date: 2023-03-18T01:05:36.000Z
author: Igor Gorlov
image: ../../assets/images/undefined-Mar-18-2023.avif
categories:
  - Как закодить
tags:
  - Python
draft: false
lastmod: 2024-03-20T21:26:48.498Z
---

Веб-скрейпинг, если говорить простым языком, - это техника, используемая для сбора полезных данных с веб-сайта. Согласитесь, в Интернете есть масса информации, и чаще всего она может быть структурирована не совсем так, как нам нужно. Таким образом, веб-скрейпинг позволяет нам извлекать данные из Интернета, которые затем можно реструктурировать или перестроить так, чтобы они были полезны для нас.

В этой статье я проведу вас шаг за шагом через процесс веб-скрейпинга, дам полезные советы по развитию ваших навыков, подскажу, что делать и чего не делать при скрейпинге веб-сайтов (в частности, о нарушении авторских прав), и многое другое. Кроме того, мы будем скреативить два сайта, CoinMarketCap и Bitcoin.com, чтобы получить цены на криптовалюты и последние новости о Bitcoin.

<!-- wp:rank-math/toc-block {"title":"Оглавление","headings":[{"key":"f4a37a87-fd15-4a64-8a4f-76b4e0b68a46","content":"Необходимые условия","level":2,"link":"#необходимые-условия","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"27859ba7-0855-4f80-94fa-c430f5b0f268","content":"Процесс веб-скрапинга","level":2,"link":"#процесс-веб-скрапинга","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"6c57c610-f09a-43e5-b295-66efc8f18b74","content":"Запросы","level":3,"link":"#запросы","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"a4ebee24-a225-49bd-81ae-d0e07aff5d40","content":"Beautiful Soup","level":3,"link":"#beautiful-soup","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"a09db767-67a5-4458-9513-21be759ddfd2","content":"Создание скреперов (написание кода)","level":2,"link":"#создание-скреперов-написание-кода","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"db9c1fa7-603c-452d-8cea-cde24febe63a","content":"НАСТРОЙКА ПРОЕКТА","level":3,"link":"#настройка-проекта","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"95496474-2c2c-4d18-82a6-8a5431a0bfdb","content":"Скраппинг Bitcoin.com","level":3,"link":"#скраппинг-bitcoin-com","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"42b87d45-26d3-4f4f-bc27-5a084c1630ad","content":"Немного о HTML и разработке фронтенда","level":3,"link":"#немного-о-html-и-разработке-фронтенда","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"5a900cca-f3b0-42a8-b3e9-305235d71c05","content":"Скраппинг лучших цен на криптовалюты с CoinMarketCap.","level":3,"link":"#скраппинг-лучших-цен-на-криптовалюты-с-coin-market-cap","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"e1edcb29-c63f-4d0f-95d5-2925f0f1f4a4","content":"Вернемся к редактору кода","level":3,"link":"#вернемся-к-редактору-кода","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"d956223b-5262-4234-9403-e0ca2ea06d57","content":"Что мы уже сделали?","level":3,"link":"#что-мы-уже-сделали","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"c24eeb64-6379-437c-96c7-afad65863bdd","content":"Возвращаясь к скрапбукингу Bitcoin News","level":3,"link":"#возвращаясь-к-скрапбукингу-bitcoin-news","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"02034a13-95c7-46d7-aaff-8b1cf3aad10b","content":"Возвращаемся к редактору кода:","level":3,"link":"#возвращаемся-к-редактору-кода","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"42c6e8d6-2dee-433e-ba8a-52c8a69cfe81","content":"Скраппинг заголовка новостей","level":3,"link":"#скраппинг-заголовка-новостей","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"075571fd-2d2a-498d-8e97-1a2a46a1a3a1","content":"Скраппинг URL-адресов новостей","level":3,"link":"#скраппинг-url-адресов-новостей","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"fd648fa7-fe5d-4136-91d2-2e680b3b5f82","content":"Использование соскобленных данных","level":2,"link":"#использование-соскобленных-данных","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"db7a54f9-8b7f-40fa-baeb-eec98c3662f4","content":"Чего не следует делать при соскабливании веб-сайтов","level":2,"link":"#чего-не-следует-делать-при-соскабливании-веб-сайтов","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"9f2cd9ce-89fa-445c-a8db-a03c7342c021","content":"Заключение","level":2,"link":"#заключение","disable":false,"isUpdated":false,"isGeneratedLink":true}],"listStyle":"ul"} -->
<div class="wp-block-rank-math-toc-block" id="rank-math-toc"><h2>Оглавление</h2><nav><ul><li class=""><a href="#необходимые-условия">Необходимые условия</a></li><li class=""><a href="#процесс-веб-скрапинга">Процесс веб-скрапинга</a><ul><li class=""><a href="#запросы">Запросы</a></li><li class=""><a href="#beautiful-soup">Beautiful Soup</a></li></ul></li><li class=""><a href="#создание-скреперов-написание-кода">Создание скреперов (написание кода)</a><ul><li class=""><a href="#настройка-проекта">НАСТРОЙКА ПРОЕКТА</a></li><li class=""><a href="#скраппинг-bitcoin-com">Скраппинг Bitcoin.com</a></li><li class=""><a href="#немного-о-html-и-разработке-фронтенда">Немного о HTML и разработке фронтенда</a></li><li class=""><a href="#скраппинг-лучших-цен-на-криптовалюты-с-coin-market-cap">Скраппинг лучших цен на криптовалюты с CoinMarketCap.</a></li><li class=""><a href="#вернемся-к-редактору-кода">Вернемся к редактору кода</a></li><li class=""><a href="#что-мы-уже-сделали">Что мы уже сделали?</a></li><li class=""><a href="#возвращаясь-к-скрапбукингу-bitcoin-news">Возвращаясь к скрапбукингу Bitcoin News</a></li><li class=""><a href="#возвращаемся-к-редактору-кода">Возвращаемся к редактору кода:</a></li><li class=""><a href="#скраппинг-заголовка-новостей">Скраппинг заголовка новостей</a></li><li class=""><a href="#скраппинг-url-адресов-новостей">Скраппинг URL-адресов новостей</a></li></ul></li><li class=""><a href="#использование-соскобленных-данных">Использование соскобленных данных</a></li><li class=""><a href="#чего-не-следует-делать-при-соскабливании-веб-сайтов">Чего не следует делать при соскабливании веб-сайтов</a></li><li class=""><a href="#заключение">Заключение</a></li></ul></nav></div>
<!-- /wp:rank-math/toc-block -->

<h2 class="wp-block-heading" id="необходимые-условия">Необходимые условия</h2>

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Базовые навыки программирования. Хотя в этой статье мы будем использовать Python, вы сможете извлечь из нее пользу, даже если знакомы с другими языками программирования.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Фундаментальное понимание HTML, элементов и атрибутов HTML и т.д.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Знание Chrome DevTools (не обязательно)</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Компьютер или другой инструмент для выполнения кода Python.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:quote -->
<blockquote class="wp-block-quote">
Позвольте мне быстро познакомить вас с двумя пакетами: requests и BeautifulSoup. Это библиотеки Python, которые используются для соскабливания веб-сайтов. В этой статье они нам понадобятся.
</blockquote>
<!-- /wp:quote -->

<h2 class="wp-block-heading" id="процесс-веб-скрапинга">Процесс веб-скрапинга</h2>

Когда вы заходите в браузер и вводите url сайта, который хотите посетить, ваш браузер делает запрос на сервер. Затем сервер отвечает вашему браузеру. Браузер получает данные от сервера в виде текста, HTML, JSON или многокомпонентного запроса (медиафайла).

Когда браузер получает HTML, он анализирует его, создает узлы DOM и отображает их на странице, выводя прекрасный веб-сайт на ваш экран.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--928xCMHf--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/3jrhnl27ldelulek9jm9.png" alt="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/3jrhnl27ldelulek9jm9.png"/></figure>
<!-- /wp:image -->

При скрейпинге веб-сайтов нам нужен этот HTML-контент, и это знакомит нас с первыми пакетными запросами.

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="запросы"><a href="https://pypi.org/project/requests/" target="_blank" rel="noreferrer noopener nofollow">Запросы</a></h3>

Как следует из названия, он используется для отправки запросов на серверы. Если у вас есть опыт разработки фронтенда или Javascript, это эквивалент fetch API в Javascript.

Для того чтобы мы могли соскабливать содержимое сайта, нам нужно убедиться, что конечная точка сервера, к которой мы обращаемся, возвращает HTML.

После получения HTML следующим шагом будет сбор нужных нам данных. И это приводит нас ко второму пакету BeautifulSoup.

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="beautiful-soup"><a href="https://www.crummy.com/software/BeautifulSoup/bs4/doc/" target="_blank" rel="noreferrer noopener nofollow">Beautiful Soup</a></h3>

Beautiful Soup - это библиотека, используемая для извлечения данных из HTML и XML файлов. Beautiful soup содержит множество очень полезных утилит, которые делают веб-скрейпинг действительно простым.

<h2 class="wp-block-heading" id="создание-скреперов-написание-кода">Создание скреперов (написание кода)</h2>

После долгих разговоров перейдем к самой сути дела - написанию кода и созданию собственно веб-скреперов.

Я создал репозиторий на Github, который содержит код для скреперов. Полный код находится в ветке completed, для начала работы перейдите в ветку get-started.

В этой статье я буду создавать проект с нуля, для тех, кто не хочет клонировать репозиторий Github.

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="настройка-проекта">НАСТРОЙКА ПРОЕКТА</h3>

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Создайте новую папку. Назовите ее как угодно.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Создайте новое виртуальное окружение.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

Выполните следующие команды для создания нового виртуального окружения

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash"># if you've not already installed virtualenv
pip install virtualenv

# you can name your environment whatever you want
python -m venv &lt;name_of_environment&gt;
</code></pre>
<!-- /wp:code -->

После успешного выполнения предыдущих команд вы должны увидеть папку с именем виртуальной среды, которую вы только что создали.

Вам также необходимо активировать виртуальную среду. Для этого выполните следующие команды в зависимости от вашей ОС.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash"># macOS / linux
source ./&lt;virtual_env_name&gt;/bin/activate

# windows
&lt;virtual_env_name&gt;/Scripts/activate.bat   # In CMD
&lt;virtual_env_name&gt;/Scripts/Activate.ps1   # In Powershell
</code></pre>
<!-- /wp:code -->

Установите необходимые пакеты.

Активировав нашу виртуальную среду, давайте перейдем к установке пакетов. Для этого выполните в терминале следующие действия:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">pip install requests beautifulsoup4
</code></pre>
<!-- /wp:code -->

Создайте файл requirements.txt.

Если вы будете делиться кодом с кем-то или командой, важно, чтобы другая сторона установила точно такую же версию пакета, которую вы использовали для сборки проекта. В используемом пакете могут быть изменения, поэтому важно, чтобы все использовали одну и ту же версию. Файл requirements.txt позволяет другим узнать точную версию пакетов, которые вы использовали в проекте.

Чтобы сгенерировать файл requirements.txt, просто выполните следующие действия:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">pip freeze &gt; requirements.txt
</code></pre>
<!-- /wp:code -->

После выполнения этой команды вы должны увидеть файл, содержащий пакеты, необходимые для запуска проекта.

Если вы работаете в команде и в проекте есть файл requirements.txt, запустите pip install -r requirements.txt, чтобы установить точную версию пакетов из файла requirements.txt.

Сколько раз я сказал про файл requirements.txt? 🤡

Добавьте файл .gitignore.

Он используется для указания git’у файлов или папок, которые следует игнорировать при запуске git add. Добавьте /&lt;virtual_env_name&gt; в файл .gitignore.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--xdVEyk-F--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ifeeagl0b6fouy4m272h.png" alt=""/></figure>
<!-- /wp:image -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="скраппинг-bitcoin-com">Скраппинг Bitcoin.com</h3>

Теперь мы займемся скраппингом первого сайта. Первое, что нам нужно сделать, это получить HTML с запросами.

Итак, создайте файл bitcoinnews.py (вы можете назвать его как угодно).

Добавьте в файл следующий код

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">import requests

def get_news():
    url = '&lt;https://news.bitcoin.com&gt;'

    response = requests.get(url) # making a request
    response_text = response.text # getting the html

    # here's where we should get the news content from the html, we're just printing the content to the terminal for now
    print(response_text)

get_news()
</code></pre>
<!-- /wp:code -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="немного-о-html-и-разработке-фронтенда">Немного о HTML и разработке фронтенда</h3>

При сканировании веб-сайтов важно понимать основы HTML, поскольку это поможет нам выбрать наилучший способ извлечения данных.

HTML (HyperText Markup Language) - это стандартный язык разметки для создания веб-страниц. HTML используется для описания структуры веб-страницы. Элементы HTML - это строительные блоки каждой веб-страницы. Элементы HTML связаны друг с другом таким образом, что напоминают дерево.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--2SWKX8s9--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/aczrvybxcblzq2imp9ef.png" alt=""/></figure>
<!-- /wp:image -->

На схеме выше у нас есть корневой элемент, элемент &lt;html&gt;, который имеет два дочерних элемента, элементы &lt;head&gt; и &lt;body&gt;. У тега &lt;head&gt; есть один дочерний элемент, тег &lt;, который имеет в качестве дочернего элемента простой текст. Элемент &lt;body&gt; имеет три дочерних элемента (один тег заголовка и два тега абзаца).

Эта древовидная структура облегчает компоновку элементов и определение отношений между ними. Это упрощает написание абзаца и включение в него ссылок.

Элементы HTML, помимо наличия дочерних элементов, имеют атрибуты, которые добавляют им гораздо больше функциональности. Элемент ‘image’ требует указания источника изображения, которое он должен отображать. Когда вы нажимаете на ссылку (тег якоря), он должен знать, куда вы хотите перейти. Атрибуты также могут использоваться для различения одного элемента и группы элементов.

Понимание атрибутов HTML очень важно, поскольку при сканировании веб-сайта нам нужны конкретные данные, и важно, чтобы мы могли нацелиться на элементы, содержащие нужные нам данные.

Если вы хотите узнать больше об HTML, вы можете посетить сайт W3schools.com.

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="скраппинг-лучших-цен-на-криптовалюты-с-coin-market-cap">Скраппинг лучших цен на криптовалюты с CoinMarketCap.</h3>

Прежде чем мы вернемся к нашему скреперу Bitcoin News, давайте соскребем цены ведущих криптовалют с CoinMarketCap вместе с изображениями.

СОВЕТ: Прежде чем приступить к скраппингу веб-сайта, отключите Javascript и откройте страницу в браузере. Это важно, потому что некоторые сайты отображают содержимое на веб-странице с помощью Javascript на стороне клиента, который не может быть использован нашими скреперами. Поэтому имеет смысл видеть только точный HTML, который возвращает сервер.

С запущенным Javascript

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--md-Do36h--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/q3k9s3d64ic4xsp6y7b2.png" alt=""/></figure>
<!-- /wp:image -->

Без работающего Javascript

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--w4Z94N76--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/5tojecltd5d4ixzh58yi.png" alt=""/></figure>
<!-- /wp:image -->

Если вы откроете сайт coinmarketcap.com в браузере с отключенным Javascript, вы заметите, что можете получить цены только на первые десять криптовалют. Вы также заметите, что в браузере, где включен Javascript, вы можете прокручивать страницу, чтобы получить цены на другие криптовалюты. Это различие во внешнем виде страницы (HTML) может доставить вам много неприятностей при скраппинге веб-сайта.

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="вернемся-к-редактору-кода">Вернемся к редактору кода</h3>

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Создайте новый файл. Вы можете назвать его как угодно. Я назвал свой coinmarketcap.py</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Добавьте в него следующий код.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">import requests
from bs4 import BeautifulSoup

def get_crypto_prices():
    url = '&lt;https://coinmarketcap.com&gt;'
    response_text = requests.get(url).text

    soup = BeautifulSoup(response_text, 'html.parser') #added this line

    print(soup)

get_crypto_prices()
</code></pre>
<!-- /wp:code -->

Этот файл выглядит почти так же, как предыдущий, я только изменил URL и название функции, а также добавил строку с BeautifulSoup.

Эта строка кода анализирует HTML-текст, который мы получаем от конечной точки, и преобразует его в объект BeautifulSoup, который имеет методы, которые мы можем использовать для извлечения информации из текста.

Теперь, когда у нас есть доступ к HTML, давайте разберемся, как извлечь нужные нам данные: в нашем случае цены на криптовалюты.

Откройте DevTools в своем веб-браузере.<br>Если вы используете Chrome на Mac, вы можете нажать Cmd + Option + I, чтобы открыть DevTools.

Или вы можете просто щелкнуть правой кнопкой мыши на целевом элементе и нажать кнопку inspect.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--SHTU8f4N--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/8w5b3wjlk16ggo6m92sa.gif" alt=""/></figure>
<!-- /wp:image -->

Если вы посмотрите на элементы в разделе Inspect Element в Chrome DevTools, вы заметите, что там есть элемент table с дочерними элементами. Внутри элемента таблицы есть элементы colgroup, thead, tbody. Элемент tbody содержит все содержимое таблицы. Внутри элемента tbody есть элемент tr, обозначающий строку таблицы, который также содержит несколько элементов td. td обозначает данные таблицы.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--mPLO2ZPa--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/8j2odt2tkiv24q51wkbw.png" alt=""/></figure>
<!-- /wp:image -->

Теперь просто знать, что нужные нам данные находятся в таблице, недостаточно. Мы должны углубиться в дерево HTML, чтобы извлечь именно те данные, которые нам нужны. В данном случае нам нужно название криптовалюты, сокращенное название, например, BTC для Bitcoin, текущая цена и изображение криптовалюты.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--RMf5gCV7--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/gm7g9lzv9v62zs7oaawu.png" alt=""/></figure>
<!-- /wp:image -->

Если присмотреться, можно заметить, что название криптовалюты находится в теге параграфа с классом sc-e225a64a-0 ePTNty. Сокращенное название криптовалюты также находится в теге абзаца с другим именем класса sc-e225a64a-0 dfeAJi coin-item-symbol.

Мы используем такие атрибуты, как class и id, для уникальной идентификации элементов HTML или групп знакомых элементов HTML. &nbsp;Когда у нас есть эти уникальные атрибуты, мы можем использовать их для нацеливания на элементы и извлечения из них нужных нам значений.

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="что-мы-уже-сделали">Что мы уже сделали?</h3>

Проанализировав сайт Coinmarketcap, мы увидели, что данные о каждой криптовалюте расположены в строке, и каждая строка имеет дочерние элементы, содержащие данные, которые мы хотим извлечь.

Давайте вернемся к редактору кода и обновим наш файл coinmarketcap.py

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">import requests
from bs4 import BeautifulSoup

def get_crypto_prices():
    url = '&lt;https://coinmarketcap.com&gt;'
    response_text = requests.get(url).text

    soup = BeautifulSoup(response_text, 'html.parser')

    # get all the table rows
    table_rows = soup.findAll('tr')

    # iterate through all the table rows and get the required data
    for table_row in table_rows:
        crypto_name = table_row.find('p', class_ = 'sc-e225a64a-0 ePTNty')
        shortened_crypto_name = table_row.find('p', class_ = 'sc-e225a64a-0 dfeAJi coin-item-symbol')
        coin_img = table_row.find('img', class_ = 'coin-logo')

        print(crypto_name, shortened_crypto_name)

    get_crypto_prices()
</code></pre>
<!-- /wp:code -->

Обратите внимание на разницу между findAll и find

Если вы выполните приведенный выше код, то получите следующее

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--L888Qhod--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ei67om29rk8s6j5j2jm2.png" alt=""/></figure>
<!-- /wp:image -->

Вы можете видеть, что некоторые данные возвращают значение None. Это происходит из-за того, что оставшиеся строки таблицы пусты. Что мы можем сделать в этом случае, так это проверить, есть ли значение, прежде чем печатать значения.

Обновив наш цикл for, мы получим следующее:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python"># iterate through all the table rows and get the required data

for table_row in table_rows:
    crypto_name = table_row.find('p', class_ = 'sc-e225a64a-0 ePTNty')
    shortened_crypto_name = table_row.find('p', class_ = 'sc-e225a64a-0 dfeAJi coin-item-symbol')
    coin_img = table_row.find('img', class_ = 'coin-logo')

    if crypto_name is None or shortened_crypto_name is None:
        continue
    else:
        crypto_name = crypto_name.text
        shortened_crypto_name = shortened_crypto_name.text
        coin_img = coin_img.attrs.get('src')

        print(crypto_name, shortened_crypto_name)
</code></pre>
<!-- /wp:code -->

Если есть значение crypto_name или shortened_crypto_name, мы получаем текст из HTML-элемента и выводим его в консоль. Мы также получаем src изображения криптовалюты.

Запустив обновленный код, мы должны получить следующее:

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--TRo4wjSd--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/9f7cqa9rlvbz72eciihf.png" alt=""/></figure>
<!-- /wp:image -->

Теперь давайте получим цены для каждой криптовалюты.

Вернувшись в Chrome Devtools и щелкнув правой кнопкой мыши на тексте цены, мы должны увидеть следующее:

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--XM7Ek7C7--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/seu300hix30mgnsyqtf8.png" alt=""/></figure>
<!-- /wp:image -->

Мы видим, что цена валюты находится в теге span, который обернут в тег якоря: тег a, который имеет значение класса cmc-link. Однако использование класса тега якоря для поиска цены не сработает, потому что класс cmc-link не идентифицирует элемент, на который мы пытаемся нацелиться.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">const bitcoinRow = document.querySelectorAll('tr')[1]
const cmcLinks = bitcoinRow.querySelectorAll('.cmc-link')

console.log(cmcLinks) // NodeList(4)&nbsp;[a.cmc-link, a.cmc-link, a.cmc-link, a.cmc-link]
</code></pre>
<!-- /wp:code -->

Если вы запустите приведенный выше код Javascript в консоли браузера, вы увидите, что в каждом ряду есть четыре ссылки с именем класса cmc-link. Это определенно не лучший способ получить цену криптовалюты в данном ряду.

Давайте посмотрим на родителя: div с именем класса sc-8bda0120-0 dskdZn

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--os2ixx9m--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/of85gr8v2s06ip2bk3n1.png" alt=""/></figure>
<!-- /wp:image -->

Обратите внимание, что при наведении элемента на консоль цена также наводится на веб-страницу. Таким образом, это оказывается лучшим способом получения цены криптовалюты.

Обновив код, мы получили:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">import requests
from bs4 import BeautifulSoup

def get_crypto_prices():
    url = '&lt;https://coinmarketcap.com&gt;'
    response_text = requests.get(url).text

    soup = BeautifulSoup(response_text, 'html.parser')

    # get all the table rows
    table_rows = soup.findAll('tr')

    # iterate through all the table rows and get the required data
    for table_row in table_rows:
        crypto_name = table_row.find('p', class_ = 'sc-e225a64a-0 ePTNty')
        shortened_crypto_name = table_row.find('p', class_ = 'sc-e225a64a-0 dfeAJi coin-item-symbol')
        coin_img = table_row.find('img', class_ = 'coin-logo')
        crypto_price = table_row.find('div', class_ = 'sc-8bda0120-0 dskdZn')

            if crypto_name is None or shortened_crypto_name is None or crypto_price is None:
                continue
            else:
                crypto_name = crypto_name.text
                shortened_crypto_name = shortened_crypto_name.text
                coin_img = coin_img.attrs.get('src')
                crypto_price = crypto_price.text

                print(f"Name: {crypto_name} ({shortened_crypto_name}) \\nPrice: {crypto_price} \\nImage URL: {crypto_img_url}\\n")

get_crypto_prices()
</code></pre>
<!-- /wp:code -->

Запустив обновленный код, мы должны получить следующее:

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--iShLQMaa--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/kxoj218ussxusoj69ylk.png" alt=""/></figure>
<!-- /wp:image -->

Ууууппппсссссссс… Это было очень сложно. Надеюсь, вы смогли довести дело до конца.<br>Возьмите чашку кофе, вы ее заслужили👍.

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="возвращаясь-к-скрапбукингу-bitcoin-news">Возвращаясь к скрапбукингу Bitcoin News</h3>

Теперь, вооружившись знаниями, которые мы получили от скраппинга Coinmarketcap, мы можем продолжить работу над скраппером Bitcoin News. Мы будем использовать этот скребок для получения последних новостей в криптовалютном пространстве.

Щелкнув правой кнопкой мыши на первой новости и открыв раздел Inspect Elements в Chrome Devtools, мы увидим, что заголовки новостей имеют класс story. Однако если вы щелкните правой кнопкой мыши на других новостных заголовках, то обнаружите, что они имеют разновидности. Есть средняя история, маленькая, огромная, крошечная и т.д., с разными названиями классов для уникальной идентификации каждого типа.

Очень важным навыком, необходимым для веб-скраппинга, является способность внимательно изучить структуру HTML веб-страницы. Если вы понимаете структуру веб-страницы, то извлечение полезного содержимого из элементов не представляет собой сложной задачи.

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="возвращаемся-к-редактору-кода">Возвращаемся к редактору кода:</h3>

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">import requests

def get_news():
    url = '&lt;https://news.bitcoin.com&gt;'

    response = requests.get(url) # making a request
    response_text = response.text # getting the html

    print(response_text)

    soup = BeautifulSoup(response_text, 'html.parser')
    all_articles = soup.findAll('div', class_ = 'story')

    for article in all_articles:
        print(article.text.strip())

get_news()
</code></pre>
<!-- /wp:code -->

Когда вы запустите приведенный выше код, вы можете получить следующее:

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--JHlOR7Ks--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/70dq8xz602ft7yykg6nz.png" alt=""/></figure>
<!-- /wp:image -->

Чтобы предотвратить доступ вредоносных ботов к своему сайту, некоторые сайты используют <a href="https://www.cloudflare.com/products/bot-management/" target="_blank" rel="noreferrer noopener">Cloudfl</a><a href="https://www.cloudflare.com/products/bot-management/" target="_blank" rel="noreferrer noopener nofollow">a</a><a href="https://www.cloudflare.com/products/bot-management/" target="_blank" rel="noreferrer noopener">re Bot Management</a>. Cloudflare ведет список известных хороших ботов, которым разрешен доступ к сайту, например, поисковые системы, боты для защиты авторских прав, боты для чата, боты для мониторинга сайта и так далее. К сожалению для таких энтузиастов веб-скрапинга, как мы с вами, они также предполагают, что весь трафик ботов, не включенных в белый список, является вредоносным.

Однако есть несколько способов обойти эту проблему, и легкость зависит от того, насколько бот представляет угрозу для Cloudflare и от плана Bot Protection, на который подписался владелец сайта.

Список способов обхода Cloudflare можно найти <a href="https://www.zenrows.com/blog/bypass-cloudflare#how-cloudflare-detects-bots" target="_blank" rel="noreferrer noopener nofollow">здесь</a>. Щелкните <a href="https://www.cloudflare.com/learning/bots/what-is-bot-management/" target="_blank" rel="noreferrer noopener nofollow">здесь</a>, чтобы узнать больше об управлении ботами Cloudflare.

В этой статье мы рассмотрим самое основное - установку заголовка User-Agent. Этим мы делаем вид, что запрос поступает от обычного браузера.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">def get_news():
    url = '&lt;https://news.bitcoin.com&gt;'
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
    }

    response = requests.get(url, headers=headers)

    # the rest of the code
</code></pre>
<!-- /wp:code -->

После добавления приведенной выше строки кода и ее запуска мы должны получить следующее:

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--K1b0Eqpe--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/xxeqsu87meoru3d1dy0t.png" alt=""/></figure>
<!-- /wp:image -->

Теперь, когда у нас есть фактический веб-контент, давайте перейдем в наш браузер, чтобы просмотреть веб-страницу:

Щелкнув правой кнопкой мыши на первой новости, мы увидим следующее:

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--DBkRHIc9--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/cioxtmhdcxi06cmcijac.png" alt=""/></figure>
<!-- /wp:image -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="скраппинг-заголовка-новостей">Скраппинг заголовка новостей</h3>

Обратите внимание, что элемент h6 имеет класс story**title story–medium**title. Если вы щелкните правой кнопкой мыши на другой новости, вы можете увидеть что-то вроде story**title story–huge**title или story**title story–large**title. Заметьте, что уже существует закономерность: заголовок каждой новости всегда имеет класс story\_\_title. Это кажется лучшим способом нацелиться на заголовок новости.

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="скраппинг-url-адресов-новостей">Скраппинг URL-адресов новостей</h3>

Если вы присмотритесь, то заметите, что у заголовка новости есть родитель, который является ссылкой. Эта ссылка содержит URL новости в атрибуте href.

Собрав все это вместе, мы можем написать код для скрепера.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">import requests
from bs4 import BeautifulSoup

def get_news():
    url = '&lt;https://news.bitcoin.com&gt;'
    headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
    } # headers to bypass Cloudflare Protection

    response = requests.get(url, headers=headers)
    response_text = response.text

    soup = BeautifulSoup(response_text, 'html.parser')
    all_articles = soup.findAll('div', class_ = 'story')

    for article in all_articles:
        news_title_element = article.select_one('.story__title')
        news_url = news_title_element.parent.attrs.get('href')
        news_title = news_title_element.text.strip()

        print(f"HEADLINE: {news_title} \\nURL: {news_url}\\n")

get_news()
</code></pre>
<!-- /wp:code -->

Выполнив приведенный выше код, мы получим заголовок новости и URL-адрес

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--u1fOxdk1--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/lyhx42akegg49mq79dpo.png" alt=""/></figure>
<!-- /wp:image -->

<h2 class="wp-block-heading" id="использование-соскобленных-данных">Использование соскобленных данных</h2>

Теперь, когда мы успешно собрали необходимые данные с веб-сайтов, давайте сохраним собранные данные. Если вы работаете с базой данных, вы можете сразу сохранить ее в данных, вы можете выполнить вычисления с данными, вы можете сохранить их для будущего использования, как бы то ни было, данные, которые вы соскребли, не очень полезны в консоли.

Давайте сделаем что-то действительно простое: сохраним данные в JSON-файл

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">import requests
from bs4 import BeautifulSoup
import json

# some code
all_articles = soup.findAll('div', class_ = 'story')
scraped_articles = []

for article in all_articles:
    news_title_element = article.select_one('.story__title')
    news_url = news_title_element.parent.attrs.get('href')
    news_title = news_title_element.text.strip()

    scraped_articles.append({
        "headline": news_title,
        "url": news_url
    })

with open ('news.json', 'w') as file:
    news_as_json = json.dumps({
        'news': scraped_articles,
        'number_of_news': len(scraped_articles)
    }, indent = 3, sort_keys = True)

    file.write(news_as_json)
</code></pre>
<!-- /wp:code -->

Теперь мы сохраняем сохраненные новости в JSON-файл, который можно использовать для любых целей.

Ваш JSON-файл должен выглядеть примерно так.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--WPay2gE7--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/97jv9gomf5p4z4bw9v0h.png" alt=""/></figure>
<!-- /wp:image -->

Whooopppsssss.⚡️⚡️ Это было очень много для восприятия.

<h2 class="wp-block-heading" id="чего-не-следует-делать-при-соскабливании-веб-сайтов">Чего не следует делать при соскабливании веб-сайтов</h2>

Перегружать серверы слишком большим количеством запросов одновременно. Причина, по которой многие сайты не одобряют ботов, заключается в частом злоупотреблении ими. Когда вы делаете запрос, сервер использует ресурсы, чтобы обработать его. Большое количество запросов может привести к тому, что у сервера закончатся ресурсы, а это нехорошо.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">"""
⛔️ DON'T DO THIS
"""
for i in range(10000):
    request.get('&lt;https://reallyamazingwebsite.com&gt;')
</code></pre>
<!-- /wp:code -->

Ваш IP-адрес может попасть в черный список.

Пренебрежение правилами авторского права. Веб-скрейпинг является абсолютно законным, если вы используете данные, находящиеся в открытом доступе в Интернете. Но некоторые виды данных защищены международными нормами, поэтому будьте осторожны при соскабливании личных данных, интеллектуальной собственности или конфиденциальных данных. Некоторые сайты могут открыто заявлять, что содержимое страницы не должно распространяться никакими другими способами, это следует уважать.

Наконец-то вы добрались до конца статьи, молодец, чемпион.

<h2 class="wp-block-heading" id="заключение">Заключение</h2>

В заключение хочу сказать, что веб-скрейпинг в Python может быть полезным инструментом для сбора информации с веб-сайтов для различных целей. Python предоставляет удобный и эффективный способ извлечения структурированных данных с веб-сайтов с помощью популярных библиотек, таких как BeautifulSoup. Однако важно помнить, что сбор информации с веб-сайтов всегда должен осуществляться этично и в соответствии с условиями обслуживания веб-сайта. Также важно знать о любых юридических ограничениях, которые могут применяться к данным, которые собираются. Учитывая эти факторы, веб-скрейпинг в Python может стать полезным навыком для всех, кто хочет собирать и анализировать данные из Интернета.

Если вам понравилось читать эту статью, вы можете поделиться ею в своих социальных сетях и следить за мной в социальных сетях.
