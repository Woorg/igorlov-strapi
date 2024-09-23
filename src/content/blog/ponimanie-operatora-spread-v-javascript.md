---
title: Понимание оператора Spread (…) в JavaScript
meta_title: Понимание оператора Spread (…) в JavaScript - Igor Gorlov
description: >-
  В сегодняшнем эпизоде разговора об удивительных возможностях JavaScript мы
  обратим наше внимание на оператор Spread(…) или синтаксис Spread.
date: 2023-02-26T10:36:19.000Z
author: Igor Gorlov
image: ../../assets/images/undefined-Feb-26-2023.avif
categories:
  - Учебник
tags:
  - JavaScript
draft: false
lastmod: 2024-03-20T21:26:45.510Z
---

В сегодняшнем эпизоде разговора об удивительных возможностях JavaScript мы обратим наше внимание на оператор Spread(…) или синтаксис Spread. В конце этой статьи вы найдете список ссылок на другие статьи, которые я писал в прошлом о некоторых других концепциях и возможностях JavaScript. А пока давайте сосредоточимся на операторе Spread(…), на том, что он собой представляет и как его использовать для написания лучшего кода JavaScript.

Синтаксис Spread - это функция JavaScript, которая позволяет распаковывать или расширять объекты и итеративные переменные (такие, как массивы и строки), что может быть использовано для создания неглубоких копий структур данных для повышения удобства манипулирования данными. Он часто используется в сочетании с деструктуризацией.

<h2 class="wp-block-heading">Для чего используется оператор Spread?</h2>

Этот оператор можно использовать для простого выполнения многих рутинных задач. Оператор spread может быть использован для выполнения следующих действий:

Давайте рассмотрим пример каждого из этих случаев использования.

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Копирование массива</h3>

Использование оператора Spread - это удобный способ копирования массива или объединения массивов, с его помощью можно даже добавлять новые элементы.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">const animals = ['🦁','🐘','🐈','🐕‍🦺','🐇']
const moreAnimals = [...animals];
console.log(moreAnimals) // Array(5) ['🦁','🐘','🐈','🐕‍🦺','🐇']
</code></pre>
<!-- /wp:code -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Объединение или конкатенация массивов</h3>

Оператор spread можно использовать для быстрого объединения двух массивов.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">const myArray = [1,2,3];
const yourArray = [4,5];
const ourArray = [...myArray,...yourArray];

console.log(ourArray); // Array(5) [ 1, 2, 3, 4, 5 ]
</code></pre>
<!-- /wp:code -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Использование математических функций</h3>

На мой взгляд, лучший способ понять использование оператора spread - это рассмотреть встроенные функции Math.min() и Math.max(), которые оба ожидают список аргументов, а не массив. Если у вас есть массив чисел и вы хотите получить наименьшее или наибольшее число в этом массиве, вам придется воспользоваться Math.min() или Math.max(), но передача массива в любую из этих функций вернет NaN, а это не тот ответ, на который вы рассчитывали. Вместо этого следует использовать оператор (…), чтобы развернуть массив как список аргументов в функции Math, как показано в примере ниже:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">const numbers = [28, -6, 19, 0]
console.log(Math.min(numbers)) // NaN
console.log(Math.min(...numbers)) // -6
console.log(Math.max(...numbers)) // 28
</code></pre>
<!-- /wp:code -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Использование массива в качестве аргументов</h3>

Вы можете использовать оператор spread, чтобы превратить массив в список аргументов. Смотрите пример ниже:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">function sandwich(a, b, c) {
  console.log(a); // '🍞'
  console.log(b); // '🥬'
  console.log(c); // '🥓'
}

const food = ['🍞', '🥬', '🥓'];

// Old way
sandwich.apply(null, food);

// ✅ ES6 way
sandwich(...food);
</code></pre>
<!-- /wp:code -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Добавление элемента в список</h3>

Оператор spread может добавить элемент в другой массив с естественным, простым для понимания синтаксисом:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">const numbers = [1, 2, 3, 4]
const moreNumbers = [...numbers, 5, 6, 7, 8]

console.log(moreNumbers) // Array(8) [1, 2, 3, 4, 5, 6, 7, 8]
</code></pre>
<!-- /wp:code -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Объединение объектов</h3>

Посмотрите, как оператор спреда объединяет эти два объекта:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">const myVehicle = {
  brand: 'Ford',
  model: 'Mustang',
  color: 'red'
}

const updateMyVehicle = {
  type: 'car',
  year: 2021, 
  color: 'yellow'
}

const myUpdatedVehicle = {...myVehicle, ...updateMyVehicle}
</code></pre>
<!-- /wp:code -->

Обратите внимание, что свойства, которые не совпали, были объединены, но свойство, которое совпало, цвет, было перезаписано последним переданным объектом, updateMyVehicle. В результате цвет стал желтым.

<h2 class="wp-block-heading">Заключение</h2>

Появление ES6 сделало JavaScript не только более эффективным, но и более интересным благодаря появлению таких замечательных функций, как оператор spread и другие. Ниже приведен список статей, который я обещал в начале этой статьи.
