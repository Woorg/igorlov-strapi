---
title: Что такое строка в JS? Строковая переменная JavaScript с пояснениями
meta_title: >-
  Что такое строка в JS? Строковая переменная JavaScript с пояснениями - Igor
  Gorlov
description: >-
  При изучении JaveScript или любого другого языка программирования вы
  столкнетесь с ключевым словом или термином строка.
date: 2023-02-26T15:43:20.000Z
author: Igor Gorlov
image: ../../assets/images/undefined-Feb-26-2023.avif
categories:
  - Учебник
tags:
  - JavaScript
draft: false
lastmod: 2024-03-20T21:26:43.792Z
---

При изучении JaveScript или любого другого языка программирования вы столкнетесь с ключевым словом или термином строка.

Строка представляет собой текстовые данные, которые являются основополагающей частью многих приложений. Вы также можете использовать строки для взаимодействия с пользователями через подсказки, предупреждения и другие формы пользовательского ввода и вывода.

В этой статье вы узнаете, что такое строка, как она работает в JavaScript, как создать строку и как убрать кавычки и апострофы в строках.

<!-- wp:rank-math/toc-block {"title":"Оглавление","headings":[{"key":"e0f609d2-932c-468c-b8db-89d203b983ed","content":"Что такое строка в JavaScript?","level":2,"link":"#что-такое-строка-в-java-script","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"d8dbcad6-aa0e-4200-b8cc-a9f2e596e771","content":"Конкатенация строк в JavaScript","level":2,"link":"#конкатенация-строк-в-java-script","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"e29574e6-c184-44b5-92b8-a6797c622ba6","content":"Конкатенация строк в JavaScript с помощью шаблонных литералов","level":2,"link":"#конкатенация-строк-в-java-script-с-помощью-шаблонных-литералов","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"ebc11978-a46d-4352-ae38-e1bc26ae3909","content":"Как экранировать кавычки и апострофы в строках","level":2,"link":"#как-экранировать-кавычки-и-апострофы-в-строках","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"29eb5719-f424-4544-9654-fbbb16fec403","content":"Как преобразовать строку в верхний или нижний регистр с помощью JavaScript","level":2,"link":"#как-преобразовать-строку-в-верхний-или-нижний-регистр-с-помощью-java-script","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"d2a5733e-77b3-400b-8db7-11152ee70ea2","content":"Подведем итоги!","level":2,"link":"#подведем-итоги","disable":false,"isUpdated":false,"isGeneratedLink":true}],"listStyle":"ul"} -->
<div class="wp-block-rank-math-toc-block" id="rank-math-toc"><h2>Оглавление</h2><nav><ul><li class=""><a href="#что-такое-строка-в-java-script">Что такое строка в JavaScript?</a></li><li class=""><a href="#конкатенация-строк-в-java-script">Конкатенация строк в JavaScript</a></li><li class=""><a href="#конкатенация-строк-в-java-script-с-помощью-шаблонных-литералов">Конкатенация строк в JavaScript с помощью шаблонных литералов</a></li><li class=""><a href="#как-экранировать-кавычки-и-апострофы-в-строках">Как экранировать кавычки и апострофы в строках</a></li><li class=""><a href="#как-преобразовать-строку-в-верхний-или-нижний-регистр-с-помощью-java-script">Как преобразовать строку в верхний или нижний регистр с помощью JavaScript</a></li><li class=""><a href="#подведем-итоги">Подведем итоги!</a></li></ul></nav></div>
<!-- /wp:rank-math/toc-block -->

<h2 class="wp-block-heading" id="что-такое-строка-в-java-script">Что такое строка в JavaScript?</h2>

В JavaScript строка - это тип данных, представляющий последовательность символов, которая может состоять из букв, цифр, символов, слов или предложений.

Мы используем строки для представления текстовых данных и определяем их с помощью одинарных кавычек (’), двойных кавычек (”) или обратных знаков (``):

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">let name1 = 'John Doe';
let name2 = "John Doe";
let name3 = `John Doe`;
</code></pre>
<!-- /wp:code -->

В приведенном выше примере у вас есть три строки, назначенные разным переменным. Чтобы убедиться, что все они являются строками, вы можете проверить тип переменной:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">console.log(typeof(name1)); // string
console.log(typeof(name2)); // string
console.log(typeof(name3)); // string
</code></pre>
<!-- /wp:code -->

Важно знать, что в JavaScript строки являются неизменяемыми. Это означает, что после создания строки ее содержимое не может быть изменено.

Вместо этого вы должны создать новую строку, представляющую измененную версию, когда хотите изменить строку.

Например, если строка назначена переменной, вы не можете ее изменить. Вместо этого вы создадите новую строку и присвоите ее той же переменной следующим образом:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">let name = "John Doe";
name = "Jane Doe";
</code></pre>
<!-- /wp:code -->

Это означает, что исходная строка “John Doe” по-прежнему существует в памяти, но имя переменной теперь ссылается на новую строку “Jane Doe”.

Строки в JavaScript можно преобразовывать и обрабатывать различными способами, например, преобразовывать их в верхний или нижний регистр, извлекать подстроки, искать определенные символы или последовательности, сравнивать строки для определения их равенства.

Эти возможности делают строки универсальным и мощным инструментом для разработчиков. Они имеют ряд встроенных методов и свойств, которые позволяют разработчикам манипулировать строками и работать с ними. Давайте рассмотрим некоторые из них.

<h2 class="wp-block-heading" id="конкатенация-строк-в-java-script">Конкатенация строк в JavaScript</h2>

В JavaScript конкатенация строк объединяет две или более строк в одну строку с их переменными. Это можно сделать с помощью оператора +, как показано в примере ниже:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">let firstName = "John";
let lastName = "Doe";
let fullName = firstName + " " + lastName;
console.log(fullName); // John Doe
</code></pre>
<!-- /wp:code -->

В этом примере вы добавляете между ними пустую строку (” ”), чтобы создать пространство между обеими строками. Другим способом объединения строк в JavaScript является использование метода concat(), который доступен для каждого строкового объекта. Например:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">let firstName = "John";
let lastName = "Doe";
let fullName = firstName.concat(" ", lastName);
console.log(fullName); // John Doe
</code></pre>
<!-- /wp:code -->

<h2 class="wp-block-heading" id="конкатенация-строк-в-java-script-с-помощью-шаблонных-литералов">Конкатенация строк в JavaScript с помощью шаблонных литералов</h2>

В JavaScript для конкатенации строк можно также использовать шаблонные литералы. Шаблонный литерал - это специальный тип строки, который вы определяете с помощью обратных знаков (``) вместо кавычек (’’ или “').

Шаблонные литералы могут содержать выражения, которые оцениваются (например, переменные) и конкатенируются с окружающим текстом, как показано в примере ниже:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">let firstName = "John";
let lastName = "Doe";
let fullName = `${firstName} ${lastName}`;
console.log(fullName); // John Doe
</code></pre>
<!-- /wp:code -->

Шаблонные литералы обеспечивают лаконичный и удобный для чтения способ конкатенации строк и вставки выражений в строки. Они также поддерживают перевод строки и другие специальные символы, что делает их гибким инструментом для работы со строками в JavaScript.

<h2 class="wp-block-heading" id="как-экранировать-кавычки-и-апострофы-в-строках">Как экранировать кавычки и апострофы в строках</h2>

В JavaScript, если вам нужно включить кавычки или апострофы в строку, вы должны экранировать их с помощью обратной косой черты (\), поскольку в противном случае будет выдана ошибка, как показано ниже:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">let quote = "He said, "I learned from igorlov.ru!"";
</code></pre>
<!-- /wp:code -->

Это приведет к возникновению следующей ошибки:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">Uncaught SyntaxError: Unexpected identifier 'I'
</code></pre>
<!-- /wp:code -->

Чтобы исправить это, вы можете использовать противоположный тип кавычек. Например, если ваша цитата имеет двойную кавычку, то оберните вашу строку одинарной кавычкой и наоборот:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">let quote="He said, "I love JavaScript!"";
let apostrophe = "It's a beautiful day";
</code></pre>
<!-- /wp:code -->

Подробнее о том, как экранировать строки в JavaScript, вы можете узнать из этой статьи.

<h2 class="wp-block-heading" id="как-преобразовать-строку-в-верхний-или-нижний-регистр-с-помощью-java-script">Как преобразовать строку в верхний или нижний регистр с помощью JavaScript</h2>

В JavaScript вы можете преобразовать строку в верхний или нижний регистр с помощью методов toUpperCase() и toLowerCase() соответственно. Эти методы возвращают новую строку со всеми символами в верхнем или нижнем регистре, как показано в примере ниже:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">let myString = "Welcome to igorlov!";
let upperCaseString = myString.toUpperCase();
let lowerCaseString = myString.toLowerCase();

console.log(upperCaseString); // "WELCOME TO IGORLOV!"
console.log(lowerCaseString); // "welcome to igorlov!"
</code></pre>
<!-- /wp:code -->

Обратите внимание, что эти методы не изменяют исходную строку, а возвращают новую строку с нужным регистром. Исходная строка остается неизменной, поскольку строки неизменяемы.

<h2 class="wp-block-heading" id="подведем-итоги">Подведем итоги!</h2>

Важно, чтобы вы знали, что в JavScript есть и другие возможности для работы со строками, но эта статья является базовым введением в строки, как они работают и как их можно использовать для простых операций.

Вы можете изучить методы строк, чтобы узнать, как манипулировать строками.

Вы можете ознакомиться с более чем 180 моими статьями, посетив мой сайт. Вы также можете использовать поле поиска, чтобы узнать, написал ли я определенную статью.
