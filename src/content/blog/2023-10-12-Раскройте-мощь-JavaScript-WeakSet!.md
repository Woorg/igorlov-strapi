---
title: Раскройте мощь JavaScript WeakSet!
meta_title: Раскройте Мощь JavaScript WeakSet! - Фул Фронт Дев
description: >-
  В огромном пространстве JavaScript многие мощные возможности часто остаются
  незамеченными. Одной из таких скрытых возможностей является WeakSet -
  невоспетый...
date: 2023-10-12T12:32:04.209Z
image: ../../assets/images/raskrojte-moshь-javascript-weakset-Oct-12-2023.avif
categories:
  - Учебник
author: Igor Gorlov
tags:
  - Es6
  - JavaScript
  - Weakset
draft: false
keywords:
  - JavaScript WeakSet
type: blog
slug: raskrojte-moshь-javascript-weakset
lastmod: 2024-03-20T21:26:43.811Z
---

В огромном пространстве JavaScript многие мощные возможности часто остаются незамеченными. Одной из таких скрытых возможностей является WeakSet - невоспетый герой языка, который может помочь вам оптимизировать код и более эффективно управлять памятью. В этой статье мы подробно рассмотрим WeakSet, раскроем их потенциал и научимся эффективно использовать их в наших JavaScript-проектах.

<!-- wp:rank-math/toc-block {"title":"Оглавление","headings":[{"key":"cfd4a8b7-658c-4372-80d2-3ae629b4d72f","content":"Краткое введение в WeakSet","level":2,"link":"#краткое-введение-в-weak-set","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"06bf999d-a337-47cc-899b-49cac0f8452e","content":"Создание и использование WeakSet","level":2,"link":"#создание-и-использование-weak-set","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"d4e5d6c0-4ce6-4a5d-9e58-b86fd38626df","content":"Примеры использования WeakSets","level":2,"link":"#примеры-использования-weak-sets","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"c2c5f5fc-4f75-4261-832d-b469fd5bc804","content":"1. Управление элементами DOM","level":3,"link":"#1-управление-элементами-dom","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"5764eb94-9c7b-4643-8547-c36f3e7b9668","content":"2. Закрытое хранилище данных","level":3,"link":"#2-закрытое-хранилище-данных","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"940aaaac-47f9-4d2c-9651-4a492c426a27","content":"В заключение","level":2,"link":"#в-заключение","disable":false,"isUpdated":false,"isGeneratedLink":true}],"listStyle":"ul"} -->
<div class="wp-block-rank-math-toc-block" id="rank-math-toc"><h2>Оглавление</h2><nav><ul><li class=""><a href="#краткое-введение-в-weak-set">Краткое введение в WeakSet</a></li><li class=""><a href="#создание-и-использование-weak-set">Создание и использование WeakSet</a></li><li class=""><a href="#примеры-использования-weak-sets">Примеры использования WeakSets</a><ul><li class=""><a href="#1-управление-элементами-dom">1. Управление элементами DOM</a></li><li class=""><a href="#2-закрытое-хранилище-данных">2. Закрытое хранилище данных</a></li></ul></li><li class=""><a href="#в-заключение">В заключение</a></li></ul></nav></div>
<!-- /wp:rank-math/toc-block -->

<h2 class="wp-block-heading" id="краткое-введение-в-weak-set">Краткое введение в WeakSet</h2>

WeakSet - это коллекция объектов, аналогичная более распространенному Set.

Однако между ними есть существенное различие: WeakSet хранит только слабые ссылки на хранящиеся в нем объекты. Это означает, что если на объект ссылается только WeakSet, он все равно может быть собран в мусор, освобождая ценные ресурсы памяти.

Это уникальное свойство WeakSet делает его отличным выбором для управления определенными типами отношений данных, в основном когда управление памятью является приоритетным.

<h2 class="wp-block-heading" id="создание-и-использование-weak-set">Создание и использование WeakSet</h2>

Чтобы создать WeakSet, инстанцируйте новый экземпляр класса WeakSet:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">const weakSet = new WeakSet();
</code></pre>
<!-- /wp:code -->

Добавлять объекты в WeakSet очень просто. Достаточно воспользоваться методом add:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">const obj1 = {};
const obj2 = {};

weakSet.add(obj1);
weakSet.add(obj2);
</code></pre>
<!-- /wp:code -->

WeakSets также предоставляет методы для проверки наличия объекта (has) и удаления объектов (delete):

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">console.log(weakSet.has(obj1)); // true
weakSet.delete(obj1);
console.log(weakSet.has(obj1)); // false
</code></pre>
<!-- /wp:code -->

Однако в отличие от множеств, WeakSets не имеют методов для итерации по их содержимому или определения их размера. Это связано с тем, что они имеют слабые ссылки, что не позволяет узнать, сколько объектов еще хранится в памяти.

<h2 class="wp-block-heading" id="примеры-использования-weak-sets">Примеры использования WeakSets</h2>

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="1-управление-элементами-dom">1. Управление элементами DOM</h3>

WeakSet могут быть невероятно полезны при работе с DOM. Вы можете хранить ссылки на элементы DOM, не беспокоясь об утечке памяти. Когда элемент удаляется из DOM, ссылка в WeakSet автоматически собирается в мусор.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">const domElements = new WeakSet();
const element = document.querySelector('.my-element');
domElements.add(element);

// Later, when the element is removed from the DOM
domElements.has(element); // false (garbage collected)
</code></pre>
<!-- /wp:code -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="2-закрытое-хранилище-данных">2. Закрытое хранилище данных</h3>

WeakSet можно использовать для хранения приватных данных, связанных с объектом, не раскрывая их. Поскольку ссылки являются слабыми, данные будут автоматически удалены, когда объект перестанет быть доступным.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">const privateData = new WeakSet();

class MyClass {
  constructor() {
    privateData.add(this);
  }

  #data = 'I am private data';

  getData() {
    if (privateData.has(this)) {
      return this.#data;
    }
    return undefined;
  }
}
</code></pre>
<!-- /wp:code -->

Чтобы увидеть WeakSets в действии, не упустите возможность посмотреть мой видеоролик о них на YouTube.

<h2 class="wp-block-heading" id="в-заключение">В заключение</h2>

Возможно, WeakSet - не самая известная функция JavaScript, но она обладает уникальными возможностями, которые могут оказаться бесценными в определенных ситуациях. Понимая и принимая WeakSet, вы сможете оптимизировать свой код, улучшить управление памятью и раскрыть весь потенциал этой скрытой жемчужины во вселенной JavaScript.
