---
title: Раскрываем области видимости JavaScript
meta_title: |
  Раскрываем Области Видимости JavaScript - Фул Фронт Дев
description: >
  Области видимости — одно из фундаментальных понятий JavaScript. Многие
  разработчики сталкиваются с проблемой понимания поведения переменных.
date: 2023-10-22T22:34:18.430Z
image: ../../assets/images/raskryvaem-oblasti-vidimosti-javascript-Oct-23-2023.avif
categories:
  - Учебник
author: Igor Gorlov
tags:
  - JavaScript
draft: false
keywords:
  - области видимости JavaScript
type: blog
slug: raskryvaem-oblasti-vidimosti-javascript
lastmod: 2024-03-20T21:26:47.269Z
---

<h2 class="wp-block-heading" id="введение">Введение:</h2>

Области видимости — одно из фундаментальных понятий JavaScript. Многие разработчики сталкиваются с проблемой понимания поведения переменных.

Если вы тоже сталкиваетесь с этой проблемой, не волнуйтесь! Вы находитесь в правильном месте!

В этом блоге мы рассмотрим, что такое область видимости и какие существуют ее типы с примерами.

<h2 class="wp-block-heading" id="что-такое-область-видимости">Что такое область видимости?</h2>

Область видимости в JavaScript относится к текущему контексту кода, который определяет доступность переменных в JavaScript.

Мы можем обращаться к переменным только в пределах их областей видимости, иначе будет сгенерирована ошибка.

Не поняли?

Не волнуйтесь!

Давайте разберемся в этом с помощью примеров.

```javascript
var Hero = 'Iron Man';

function Wish() {
	console.log(`My Favourite hero is ${Hero}`);
	var Villain = 'Thanos';
}
Wish(); //Invokes the function
console.log(`I was scared of ${Villain}`);
```

Итак, какой будет результат выполнения этого кода?

```javascript
// My Favourite hero is Iron Man
// Uncaught ReferencaeError: Villain is not defined
```

Почему же появляется сообщение “Villain не определен”, несмотря на то, что мы объявили эту переменную? Вот где в игру вступает скоуп.

Позвольте мне объяснить, почему это происходит. Мы определили переменную Villain с помощью функции, поэтому область видимости этой переменной ограничена функцией, что означает, что мы можем обратиться к переменной только внутри этой функции.

<h2 class="wp-block-heading" id="типы-областей-видимости">Типы областей видимости</h2>

В JavaScript существует три основных типа областей видимости:

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--gftg_j75--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://cdn.hashnode.com/res/hashnode/image/upload/v1690267524457/e56d6bff-1ae7-4eb3-9982-0307b36f8871.png" alt=""/></figure>
<!-- /wp:image -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="глобальная-область-видимости">Глобальная область видимости:</h3>

Если переменная объявлена вне функции, то у нее глобальная область видимости. К ней можно обратиться из любой части вашего кода на JavaScript.

```javascript
let name = 'Arindam'; // global scope

function func1() {
	console.log(name); // Arindam
}

function func2() {
	console.log(name); // Arindam
}
```

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="область-видимости-функции">Область видимости функции:</h3>

Переменная, объявленная внутри функции, имеет область видимости функции. К ней можно обратиться только из этой функции.

```javascript
function func1() {
	let name = 'Ronaldo'; // function scope

	console.log(name); // Ronaldo
}

console.log(name); // Throws a ReferenceError
```

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="область-видимости-блока">Область видимости блока:</h3>

Если вы объявляете переменную с помощью <code>let</code> и <code>const</code>, она доступна только в пределах блока, в котором она объявлена - между фигурными скобками <code>{ }</code>. Давайте разберем это на примерах:

```javascript
{
	let name = 'Roni';
}

console.log(name); // Throws a ReferenceError
```

Вызывает ошибку ссылки, потому что областью видимости переменной являются фигурные скобки.

Теперь перейдем к следующему примеру.

```javascript
{
	var name = 'Messi';
}

console.log(name);
```

Каков будет вывод здесь?

Неопределенный??

Нет, вывод будет “Messi”. Это происходит потому, что переменная, определенная с ключевым словом var, не имеет блочной области видимости.

💡 Примечание: Var имеет ’область видимости функции', в то время как let и const имеют 'блочную область видимости'.

<h2 class="wp-block-heading" id="заключение">Заключение:</h2>

Если вы нашли этот блог полезным, пожалуйста, подумайте о том, чтобы поделиться им с другими, кому он может пригодиться. Вы также можете следить за мной, чтобы получать больше контента по JavaScript и другим темам веб-разработки.

Спасибо за чтение :)

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--vb0Mcjx_--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://cdn.hashnode.com/res/hashnode/image/upload/v1690284520449/09bb9835-905d-42c6-995c-5078ee2fed46.png" alt=""/></figure>
<!-- /wp:image -->
