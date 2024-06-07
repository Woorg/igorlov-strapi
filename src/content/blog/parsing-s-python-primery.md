---
title: 'Парсинг с python: примеры'
meta_title: 'Парсинг с python: примеры - Igor Gorlov'
description: >-
  В этом посте мы рассмотрим несколько реальных примеров веб-скрейпинга с
  использованием Python и популярных библиотек BeautifulSoup и Scrapy.
date: 2023-03-07T22:08:45.000Z
author: Igor Gorlov
image: ../../assets/images/undefined-Mar-08-2023.avif
categories:
  - Учебник
draft: false
tags:
  - BeautifulSoup
  - Python
  - Парсинг
  - Scrapy
lastmod: 2024-03-20T21:26:43.293Z
---

В этом посте мы рассмотрим несколько реальных примеров веб-скрейпинга с использованием Python и популярных библиотек BeautifulSoup и Scrapy.

<h2 class="wp-block-heading">Пример 1: Скраппинг новостных статей</h2>

Допустим, вы хотите построить модель машинного обучения для анализа настроений в новостных статьях. Для этого вам понадобится большой набор данных новостных статей с метками, указывающими на настроение каждой статьи. Вместо того чтобы вручную собирать и маркировать статьи, можно использовать веб-скрейпинг для автоматизации этого процесса.

Одним из популярных источников новостных статей является сайт New York Times. Вот некоторый код на языке Python, использующий BeautifulSoup для соскабливания заголовков и текста статей с сайта New York Times:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">import requests
from bs4 import BeautifulSoup

url="https://www.nytimes.com/"
response = requests.get(url)
soup = BeautifulSoup(response.text, 'html.parser')

articles = []
for article in soup.find_all('article'):
headline = article.find('h2').text.strip()
body = article.find('p').text.strip()
articles.append({'headline': headline, 'body': body})

</code></pre>
<!-- /wp:code -->

В этом примере мы сначала используем библиотеку requests для получения HTML-содержимого главной страницы New York Times. Затем мы создаем объект BeautifulSoup и используем его методы для извлечения заголовков и текста из каждой статьи на странице. Мы храним данные в списке словарей, каждый из которых представляет статью, ее заголовок и основной текст.

<h2 class="wp-block-heading">Пример 2: Поиск цен на товары</h2>

Еще один распространенный случай использования веб-скреппинга - сбор данных о ценах на товары с сайтов электронной коммерции. Это может быть полезно для исследования рынка, анализа конкурентов и многого другого.

Допустим, вы хотите сравнить цены на определенный товар на нескольких сайтах электронной коммерции. Вот некоторый код на языке Python с использованием Scrapy для сопоставления цен на товар с Amazon, Best Buy и Walmart:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">import scrapy

class ProductSpider(scrapy.Spider):
    name="product_spider"
    start_urls = [
      'https://www.amazon.com/dp/B08J62XKJT', 
      'https://www.bestbuy.com/site/sony-playstation-5- 
           console/6426149.p?skuId=6426149', 
      'https://www.walmart.com/ip/Sony-PlayStation-5/363472942'
     ]
    def parse(self, response):
        title = response.css('h1.a-text-normal::text').get()
        price = response.css('span.a-offscreen::text').get()
        yield {'title': title, 'price': price}
</code></pre>
<!-- /wp:code -->

<h2 class="wp-block-heading">Пример 3: Сбор данных о погоде</h2>

Веб-скрейпинг можно также использовать для сбора данных о погоде с таких сайтов, как Weather Underground или Национальная метеорологическая служба. Эти данные можно использовать для моделирования климата, прогнозирования погоды и многого другого.

Допустим, вы хотите собрать данные о температуре в городе Матмата с сайта Weather Underground. Вот некоторый код на языке Python с использованием BeautifulSoup для сбора данных о температуре:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">import requests
from bs4 import BeautifulSoup

url="https://www.wunderground.com/weather/tn/matmata"
response = requests.get(url)
soup = BeautifulSoup(response.text, 'html.parser')

temperature = soup.find('span', {'class': 'wu-value wu-value-to'}).text.strip()
print(f"The current temperature in Matmata is {temperature} degrees Fahrenheit.")
</code></pre>
<!-- /wp:code -->

В этом примере мы используем запросы и BeautifulSoup для получения текущей температуры для города Матмата, Тунис, с сайта Weather Underground. Сначала мы отправляем GET-запрос на сайт и создаем объект BeautifulSoup. Затем мы используем CSS-селектор для извлечения данных о температуре со страницы и выводим их на консоль.

Это лишь несколько примеров из множества реальных применений веб-скрейпинга с помощью Python. Независимо от того, собираете ли вы данные для научных или деловых целей, веб-скрейпинг поможет автоматизировать процесс и сэкономить драгоценное время и ресурсы.

До встречи в следующем посте!
