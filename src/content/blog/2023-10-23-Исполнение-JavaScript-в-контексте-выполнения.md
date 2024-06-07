---
title: Исполнение JavaScript в контексте выполнения
meta_title: |
  Исполнение JavaScript В Контексте Выполнения - Фул Фронт Дев
description: >
  При написании кода на JavaScript это больше, чем просто набор инструкций. Код
  создает последовательность событий и выполняет их в определенном порядке.
date: 2023-10-22T22:28:59.282Z
image: >-
  ../../assets/images/ispolnenie-javascript-v-kontekste-vypolneniya-Oct-23-2023.avif
categories:
  - Как закодить
author: Igor Gorlov
tags:
  - JavaScript
draft: false
keywords: ''
type: blog
slug: ispolnenie-javascript-v-kontekste-vypolneniya
lastmod: 2024-03-20T21:26:45.055Z
---

<!-- wp:rank-math/toc-block {"title":"Содержание","headings":[{"key":"bd7b44fc-a772-4322-8563-02a96b1e1dc3","content":"Введение","level":2,"link":"#введение","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"d53891be-fd27-4c13-8f43-29d78a1b0cfc","content":"Что такое контекст выполнения?","level":2,"link":"#что-такое-контекст-выполнения","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"dbaf3175-a2a3-4848-b5fb-d21459151a4b","content":"Как выполняется код JavaScript?","level":2,"link":"#как-выполняется-код-java-script","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"e577b54a-074c-4df0-b6f9-71771202852e","content":"Лексический контекст:","level":2,"link":"#лексический-контекст","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"d8bd4bfb-8d06-4073-b1dc-574cc67a77a1","content":"Как создаются контексты выполнения?","level":2,"link":"#как-создаются-контексты-выполнения","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"f179e2b1-d06b-4343-9ca1-6fa8ee7ce17d","content":"Типы контекста выполнения:","level":3,"link":"#типы-контекста-выполнения","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"addaf832-8310-4aa2-96af-276f4b205147","content":"Контекст выполнения функции:","level":2,"link":"#контекст-выполнения-функции","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"8cc03f01-b344-4145-9081-75789ecf2961","content":"В заключение:","level":2,"link":"#в-заключение","disable":false,"isUpdated":false,"isGeneratedLink":true}],"listStyle":"ul"} -->
<div class="wp-block-rank-math-toc-block" id="rank-math-toc"><h2>Содержание</h2><nav><ul><li class=""><a href="#введение">Введение</a></li><li class=""><a href="#что-такое-контекст-выполнения">Что такое контекст выполнения?</a></li><li class=""><a href="#как-выполняется-код-java-script">Как выполняется код JavaScript?</a></li><li class=""><a href="#лексический-контекст">Лексический контекст:</a></li><li class=""><a href="#как-создаются-контексты-выполнения">Как создаются контексты выполнения?</a><ul><li class=""><a href="#типы-контекста-выполнения">Типы контекста выполнения:</a></li></ul></li><li class=""><a href="#контекст-выполнения-функции">Контекст выполнения функции:</a></li><li class=""><a href="#в-заключение">В заключение:</a></li></ul></nav></div>
<!-- /wp:rank-math/toc-block -->

<h2 class="wp-block-heading" id="введение">Введение</h2>

При написании кода на JavaScript это больше, чем просто набор инструкций. Код создает последовательность событий и выполняет их в определенном порядке.

Но как JavaScript решает, в каком порядке выполнять эти события?

Ответ прост: с помощью контекста выполнения JavaScript.

В этой статье мы рассмотрим, что это такое, как оно работает, лексические контексты и множество других концепций! Так что, без лишних слов, давайте начнем!

<h2 class="wp-block-heading" id="что-такое-контекст-выполнения">Что такое контекст выполнения?</h2>

Давайте попробуем понять это по частям слова!

Выполнение = выполнение кода,

Контекст = окружение.

Итак, контекст выполнения - это окружение, в котором хранится и выполняется наш конкретный код.

Не поняли? Не беспокойтесь!

Теперь давайте понять, как выполняется код JavaScript. Тогда концепция станет ясной для вас.

<h2 class="wp-block-heading" id="как-выполняется-код-java-script">Как выполняется код JavaScript?</h2>

Браузер не может нативно понимать код JavaScript, который мы пишем в нашем приложении. Для того чтобы сделать его понятным, браузер преобразует код JavaScript в машинный код.

Звучит интересно, верно?

Давайте погрузимся в это глубже!

Когда мы открываем веб-страницу, браузер запрашивает необходимые файлы (в основном файлы HTML, CSS и JavaScript) с веб-сервера.

При чтении HTML, если браузер находит код JavaScript, который нужно выполнить через тег &lt;script&gt; или атрибут, содержащий код JavaScript, например, onClick, он отправляет его в свой движок JavaScript.

Затем движок JavaScript браузера создает специальное окружение для преобразования кода JavaScript в машинный код. Это окружение называется "контекстом выполнения JavaScript".

💡 У каждого браузера есть своя собственная версия движка JavaScript. Chrome использует движок V8, Firefox использует SpiderMonkey, а Safari использует JavaScriptCore.

Затем движок JavaScript читает код посимвольно, формирует абстрактное синтаксическое дерево (AST), сохраняет переменные и функции в памяти и выполняет код.

<h2 class="wp-block-heading" id="лексический-контекст">Лексический контекст:</h2>

Прежде чем понимать разные типы контекстов выполнения, давайте разберемся с лексическим контекстом.

Слово "лексический" означает связанный с чем-то. Лексическая среда означает то, как и где ваш код физически находится.

```javascript
function outer() {
	const x = 10;
	function inner() {
		console.log(x); // 'x' is accessible here because of lexical context.
	}
	inner();
}
```

В этом фрагменте кода лексический контекст позволяет внутренней функции обращаться к переменной x, объявленной в ее родительской области видимости, outer.

Лексический контекст помогает создать абстрактное синтаксическое дерево (AST) и позволяет вложенным функциям правильно работать внутри своих родительских областей видимости.

<h2 class="wp-block-heading" id="как-создаются-контексты-выполнения">Как создаются контексты выполнения?</h2>

Контексты выполнения создаются в две фазы.

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Фаза создания</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Фаза выполнения</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="типы-контекста-выполнения">Типы контекста выполнения:</h3>

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Существует два вида контекста выполнения в JavaScript:</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Глобальный контекст выполнения:</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

Когда мы выполняем код JavaScript, создается глобальный контекст выполнения (также известный как базовый контекст выполнения). Вы можете представлять его себе как контейнер, который содержит другие контексты выполнения.

Создается глобальный объект (объект window в случае браузера) и глобальная переменная с именем this.

💡 Примечание: для каждого файла JavaScript может существовать только один GEC.

Давайте разберем это на примерах,

Первый пример:

Сначала создайте файл HTML Demo,

```html
<html>
	<head>
		<script src="index.js" />
	</head>
	<body>
		Hello! I'm Arindam
	</body>
</html>
```

Теперь запустите этот простой код и откройте консоль браузера. Затем введите это и посмотрите, что произойдет.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--2KPHDSDI--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://cdn.hashnode.com/res/hashnode/image/upload/v1690664546434/c2ef0bc2-823b-4c6e-96f4-b0a1679fd1b5.png" alt=""/></figure>
<!-- /wp:image -->

Мы получили объект окна. Теперь введите <code>window</code> и посмотрите, что произойдет.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s---qkN2vdl--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://cdn.hashnode.com/res/hashnode/image/upload/v1690664726636/7f33fa72-c312-44be-9da7-595646f420bf.png" alt=""/></figure>
<!-- /wp:image -->

Догадайтесь, что? Мы снова получили объект окна!

Таким образом, из этого примера мы понимаем, что в глобальном контексте выполнения <code>this</code> и объект <code>window</code> идентичны.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--7qOsRinJ--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://cdn.hashnode.com/res/hashnode/image/upload/v1690664966164/b26c8506-9540-4b31-9e0d-518c84d6f48a.png" alt=""/></figure>
<!-- /wp:image -->

Давайте разберемся на примере:

Второй пример:

```javascript
var name = 'Ronaldo';
function sayName() {
	console.log(this.name); // Ronaldo
}
```

В этом примере код выполняется в две фазы.

В фазе создания переменные и функции объявляются и инициализируются (выделяется память для соответствующих переменных и функций). Они поднимаются вверх своих областей видимости и создают глобальный объект this (в случае браузера - объект window).

В фазе выполнения код выполняется последовательно. Сначала переменной name присваивается значение Ronaldo. Затем выполняется функция sayName() и выводится результат (в данном случае это Ronaldo).

<h2 class="wp-block-heading" id="контекст-выполнения-функции">Контекст выполнения функции:</h2>

Контекст выполнения функции создается при вызове функции. Он создается в рамках контекста выполнения глобального объекта. Внутри локального контекста выполнения движок JavaScript создает объект arguments и объект this по умолчанию.

💡 Примечание: для каждого вызова функции будет создан контекст выполнения функции.

Давайте разберем это на примере.

```javascript
function greet(name) {
	var message = 'Hello, ' + name;
	console.log(message);
}
greet('Aritree'); // Output: "Hello, Aritree"
```

В этом коде, когда вызывается функция greet(), она создает свой контекст выполнения функции (FEC). Внутри области видимости функции происходит то же самое, что и в контексте выполнения глобального объекта (GEC).

На этапе создания FEC объявляются и инициализируются переменные и вложенные функции (если они есть).

На этапе выполнения переменной name присваивается значение, переданное через аргумент функции (в данном случае - Aritree). Затем объявляется и инициализируется переменная message строкой "Hello, Aritree". Затем она выводит значение переменной message.

<h2 class="wp-block-heading" id="в-заключение">В заключение:</h2>

Если вы нашли этот блог полезным, пожалуйста, подумайте о том, чтобы поделиться им с другими, кому это может пригодиться. Вы также можете следить за мной, чтобы получать больше контента о JavaScript и других темах веб-разработки.

Спасибо за чтение :)

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--A5JE--Qv--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://cdn.hashnode.com/res/hashnode/image/upload/v1690696967432/c331d64c-b5dc-44ff-b888-26ec14e51b97.png" alt=""/></figure>
<!-- /wp:image -->
