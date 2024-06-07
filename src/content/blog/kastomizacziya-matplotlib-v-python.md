---
title: Кастомизация Matplotlib в Python
meta_title: Кастомизация Matplotlib в Python - Igor Gorlov
description: >-
  Matplotlib - это популярная библиотека визуализации данных в Python, широко
  используемая для создания статических, интерактивных и анимированных
  визуализаций в Python.
date: 2023-03-07T22:41:41.000Z
author: Igor Gorlov
image: ../../assets/images/undefined-Mar-08-2023.avif
categories:
  - Как закодить
tags:
  - Python
draft: false
lastmod: 2024-03-20T21:26:45.016Z
---

<!-- wp:rank-math/toc-block {"title":"Оглавление","headings":[{"key":"b6bd04bb-387c-4076-a754-c0a919446095","content":"Что такое Matplotlib","level":2,"link":"#что-такое-matplotlib","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"cd33ae4b-e1ea-4113-874e-de3e42f13384","content":"Почему Matplotlib","level":2,"link":"#почему-matplotlib","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"16963324-39e6-4ce0-8fe4-8585ea465332","content":"Использование маркеров в графиках","level":2,"link":"#использование-маркеров-в-графиках","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"215a0f47-fe23-453c-b1fd-118ab3976129","content":"Синтаксис","level":3,"link":"#синтаксис","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"1b9bedd2-02fd-4263-a49f-3d152b269617","content":"Различные виды представления данных","level":2,"link":"#различные-виды-представления-данных","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"b3c8424e-2dc7-4326-aa26-996ae849b393","content":"Метки и заголовки","level":2,"link":"#метки-и-заголовки","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"dab01962-8ea8-4e13-a005-dbaceaa193e0","content":"Настройка с помощью Легенды","level":2,"link":"#настройка-с-помощью-легенды","disable":false,"isUpdated":false,"isGeneratedLink":true}],"listStyle":"ul"} -->
<div class="wp-block-rank-math-toc-block" id="rank-math-toc"><h2>Оглавление</h2><nav><ul><li class=""><a href="#что-такое-matplotlib">Что такое Matplotlib</a></li><li class=""><a href="#почему-matplotlib">Почему Matplotlib</a></li><li class=""><a href="#использование-маркеров-в-графиках">Использование маркеров в графиках</a><ul><li class=""><a href="#синтаксис">Синтаксис</a></li></ul></li><li class=""><a href="#различные-виды-представления-данных">Различные виды представления данных</a></li><li class=""><a href="#метки-и-заголовки">Метки и заголовки</a></li><li class=""><a href="#настройка-с-помощью-легенды">Настройка с помощью Легенды</a></li></ul></nav></div>
<!-- /wp:rank-math/toc-block -->

<h2 class="wp-block-heading" id="что-такое-matplotlib">Что такое Matplotlib</h2>

Matplotlib - это популярная библиотека визуализации данных в Python, широко используемая для создания статических, интерактивных и анимированных визуализаций в Python. Мы можем представлять наши данные различными интерактивными способами, такими как графики, гистограммы, круговые диаграммы и т.д.

<h2 class="wp-block-heading" id="почему-matplotlib">Почему Matplotlib</h2>

Он предоставляет широкий спектр возможностей настройки, чтобы сделать ваши графики более информативными и визуально привлекательными. Вот некоторые из опций настройки, доступных в Matplotlib:

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Добавление маркеров</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Изменение вида графика</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Добавление меток и заголовков</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Добавление легенд</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<h2 class="wp-block-heading" id="использование-маркеров-в-графиках">Использование маркеров в графиках</h2>

Маркеры в Matplotlib используются для представления точек данных на графике с помощью символа, такого как круг, квадрат или треугольник. Мы можем выполнять различные функции и настройки, используя ключевое слово _marker_, например:

Изменение размера маркераизменение цвета маркераИзменение цвета и ширины края маркера

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="синтаксис">Синтаксис</h3>

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">import matplotlib.pyplot as plt
import pandas as pd

ypoints = [10,20,34,40,15]

plt.plot(ypoints, marker="o", markeredgecolor="black", markersize=7, markerfacecolor="red")
plt.show()
</code></pre>
<!-- /wp:code -->

Вывод

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--g5-HYhEi--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/efqx3wg98hyf5vu4k6g7.png" alt="График"/></figure>
<!-- /wp:image -->

<h2 class="wp-block-heading" id="различные-виды-представления-данных">Различные виды представления данных</h2>

Мы можем представить наши данные в различных интерактивных формах, таких как:Круговые диаграммы, Гистограммы, Штриховые диаграммы и т.д., используя вид ключевого слова.

Примечание

Вид графика записывается в виде строки.

Синтаксис

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">import matplotlib.pyplot as plt
import pandas as pd

data = {'x': [1, 2, 3, 4, 5], 'y': [2, 4, 6, 8, 10]}
df = pd.DataFrame(data)
graph = df.plot(kind="bar")
plt.show(graph)
</code></pre>
<!-- /wp:code -->

Вывод:

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--Er0dN4iA--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/6zjakkihi17befefwqqi.png" alt="График"/></figure>
<!-- /wp:image -->

<h2 class="wp-block-heading" id="метки-и-заголовки">Метки и заголовки</h2>

Метки и заголовки являются наиболее важными компонентами графика Matplotlib, поскольку они предоставляют информацию о визуализируемых данных. Они делают график более понятным. Мы можем добавить метки как по оси x, так и по оси y, в то время как заголовок дает графику название, которое становится более информативным.

Синтаксис

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">import matplotlib.pyplot as plt
import pandas as pd

data = {'x': [1, 2, 3, 4, 5], 'y': [2, 4, 6, 8, 10]}
df = pd.DataFrame(data)
graph = df.plot(kind="bar")
plt.title("Monthly Sales")
plt.xlabel("Years")
plt.ylabel("Sales")
plt.show(graph)
</code></pre>
<!-- /wp:code -->

Вывод

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--WhxBi0ym--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/6mhb8xsqkbzu02h0vsxj.png" alt="График"/></figure>
<!-- /wp:image -->

<h2 class="wp-block-heading" id="настройка-с-помощью-легенды">Настройка с помощью Легенды</h2>

Легенда используется для идентификации и различения различных графиков на рисунке. Мы можем изменить цвет нескольких столбцов, что делает наш график более интерактивным и легким для понимания.

Синтаксис

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">import matplotlib.pyplot as plt
import pandas as pd

data = {'x': [1, 2, 3, 4, 9], 'y': [2, 5, 6, 8, 10]}
df = pd.DataFrame(data)
graph = df.plot(kind="bar")
plt.legend(["blue","orange"])
plt.show(graph)
</code></pre>
<!-- /wp:code -->

Вывод

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--CFFrgBh9--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/549mzmkni5eo1m2lc4mr.png" alt="График"/></figure>
<!-- /wp:image -->
