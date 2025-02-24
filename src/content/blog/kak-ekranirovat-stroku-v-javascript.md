---
title: Как экранировать строку в JavaScript
meta_title: Как экранировать строку в JavaScript - Igor Gorlov
description: >-
  В JavaScript строка - это тип данных, представляющий последовательность
  символов, которая может состоять из букв, цифр, символов, слов или
  предложений.
date: 2023-02-17T05:37:00.000Z
image: ../../assets/images/undefined-Feb-17-2023.avif
categories:
  - Как закодить
author: Igor Gorlov
tags:
  - Javascript
draft: false
lastmod: 2024-03-20T21:26:47.341Z
---

В JavaScript строка - это тип данных, представляющий последовательность символов, которая может состоять из букв, цифр, символов, слов или предложений.

Строки используются для представления текстовых данных и в основном определяются с помощью одинарных кавычек (’) или двойных кавычек (”).

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">let name1 = 'John Doe';
let name2 = "John Doe";
</code></pre>
<!-- /wp:code -->

Поскольку эти кавычки используются для обозначения строк, необходимо быть осторожным при использовании апострофов и кавычек в строках.

Если вы попытаетесь использовать их в строке, то в реальном смысле это приведет к окончанию строки, и JavaScript попытается разобрать оставшуюся часть строки как код. Это приведет к ошибке.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">let quote = "He said, "I learned from freeCodeCamp!"";
</code></pre>
<!-- /wp:code -->

Это приведет к ошибке, как показано ниже:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">Uncaught SyntaxError: Unexpected identifier 'I'
</code></pre>
<!-- /wp:code -->

В JavaScript, если вам необходимо включить кавычки или апострофы в строку, существует три основных способа исправить ошибку. Этими способами являются:

Использование противоположного синтаксиса строкиИспользование символа экранированияИспользование шаблонных литералов

Как использовать синтаксис противоположной строки для экранирования строки в JavaScript

В JavaScript для экранирования строки можно использовать синтаксис противоположной строки ’ или ”. Для этого вы должны обернуть строку в синтаксис, противоположный тому, что вы экранируете.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">let quote="He said, "I learned from freeCodeCamp!"";
console.log(quote); // He said, "I learned from freeCodeCamp!"

let apostrophe = "It's a beautiful day";
console.log(apostrophe); // It's a beautiful day
</code></pre>
<!-- /wp:code -->

Это означает, что если вы используете двойные кавычки для обертывания строки, вы можете использовать апостроф внутри строки. Также если вы обернете строку в одинарные кавычки, то сможете использовать двойные кавычки внутри строки.

Но здесь есть свои ограничения, потому что что если вам нужно использовать кавычки и апостроф в одной строке? Тогда вы можете использовать символ эвакуации (\).

Как использовать символ Escape (\) для экранирования строки в JavaScript

В JavaScript вы можете экранировать строку с помощью символа \ (обратная косая черта). Обратная косая черта указывает на то, что следующий символ следует рассматривать как литеральный символ, а не как специальный символ или разделитель строки.

Вот пример экранирования строки в JavaScript:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">let quote = "He said, \"I learned from freeCodeCamp!\"";
console.log(quote); // He said, "I learned from freeCodeCamp!"

let apostrophe="It\"s a beautiful day';
console.log(apostrophe); // It's a beautiful day
</code></pre>
<!-- /wp:code -->

Как использовать шаблонные литералы для экранирования строки в JavaScript

В JavaScript для экранирования строки можно использовать шаблонные литералы (также известные как шаблонные строки).

Шаблонные литералы - это строковые литералы, которые позволяют вставлять выражения внутрь строки, используя синтаксис ${выражение}.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">let quote = `He said, "I learned from freeCodeCamp!"`;
console.log(quote); // He said, "I learned from freeCodeCamp!"
</code></pre>
<!-- /wp:code -->

При использовании шаблонных литералов вам не нужно использовать обратные косые черты для экранирования символов. Вместо этого вы просто обводите строку обратными знаками ( ).

Завершаем!

В этой статье вы узнали, как экранировать строку в JavaScript. Это поможет вам избежать использования символов Юникода для добавления кавычек и апострофов в строки.

Вы можете ознакомиться с более чем 180 моими статьями, посетив мой сайт. Вы также можете использовать поле поиска, чтобы узнать, написал ли я какую-то конкретную статью.

<!-- wp:acf/acf-donate {"id":"block_64678dc93985f","name":"acf/acf-donate","data":{"title":"Задонатить на поддержку!","_title":"field_646b621e8617c","list_0_name":"Donatepay","_list_0_name":"field_646b623e8617e","list_0_url":"https://new.donatepay.ru/@1117856","_list_0_url":"field_646b62528617f","list_0_address":"","_list_0_address":"field_646b625d86180","list_1_name":"Donationalerts","_list_1_name":"field_646b623e8617e","list_1_url":"https://www.donationalerts.com/c/woorg_","_list_1_url":"field_646b62528617f","list_1_address":"","_list_1_address":"field_646b625d86180","list_2_name":"USDT (TRC20)","_list_2_name":"field_646b623e8617e","list_2_url":"","_list_2_url":"field_646b62528617f","list_2_address":"TR121HxpTDF71TMm9idZkBaZxnjSMcCPWj","_list_2_address":"field_646b625d86180","list_3_name":"ETH","_list_3_name":"field_646b623e8617e","list_3_url":"","_list_3_url":"field_646b62528617f","list_3_address":"0x442721192987047eDeEC69Ca1D4c706f9Adb16B3","_list_3_address":"field_646b625d86180","list_4_name":"BTC","_list_4_name":"field_646b623e8617e","list_4_url":"","_list_4_url":"field_646b62528617f","list_4_address":"36dLKv5uRozphSQa55w2XgsF42AugPu2QT","_list_4_address":"field_646b625d86180","list":5,"_list":"field_646b62308617d"},"align":"","mode":"edit"} /-->
