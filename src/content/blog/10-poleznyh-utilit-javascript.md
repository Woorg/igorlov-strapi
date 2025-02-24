---
title: 10 полезных утилит JavaScript
meta_title: 10 полезных утилит JavaScript - Igor Gorlov
description: >-
  Сегодня мы рассмотрим 10 пользовательских функций JavaScript, которые могут
  пригодиться в большинстве ваших проектов.
date: 2023-03-04T17:55:40.000Z
author: Igor Gorlov
image: ../../assets/images/undefined-Mar-04-2023.avif
categories:
  - Учебник
tags:
  - JavaScript
draft: false
lastmod: 2024-03-20T21:26:48.062Z
---

Привет! 👋

Сегодня мы рассмотрим 10 пользовательских функций JavaScript, которые могут пригодиться в большинстве ваших проектов.

Да, инструмент, который мы все любим и используем для печати, отладки и т.д. Так почему бы не сократить его, чтобы уменьшить набор текста и сэкономить немного времени?

<!-- wp:rank-math/toc-block {"title":"Оглавление","headings":[{"key":"5fbf1783-5910-4102-8e49-1d6527495f4f","content":"console.log()","level":2,"link":"#console-log","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"bd3c3487-e701-44ac-a8e9-7d6fc016e83a","content":"querySelector()","level":2,"link":"#query-selector","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"74067118-34bb-4ad9-9918-09a344be2814","content":"addEventListener()","level":2,"link":"#add-event-listener","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"f0b92205-c009-4b41-9b0a-5019e8017d43","content":"random()","level":2,"link":"#random","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"03b9bcb8-9c1e-4ff0-ad57-b507299fe6b5","content":"times()","level":2,"link":"#times","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"45503795-cbe9-4074-836b-45a4f0a584bb","content":"slugify()","level":2,"link":"#slugify","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"bbfce2c3-e823-4399-a32e-1aef03faa86f","content":"validateEmail()","level":2,"link":"#validate-email","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"5b056992-a816-4fb1-8900-88a5f504de9b","content":"capitalize()","level":2,"link":"#capitalize","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"8ba2509d-5a3a-4cb0-b44e-0547372eee77","content":"sanitizeHTML()","level":2,"link":"#sanitize-html","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"5c065198-c8db-457b-a40a-910a598053f6","content":"localStorage","level":2,"link":"#local-storage","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"dc281be4-750d-45a9-9b60-1068d921d8fb","content":"Заключение","level":2,"link":"#заключение","disable":false,"isUpdated":false,"isGeneratedLink":true}],"listStyle":"ul"} -->
<div class="wp-block-rank-math-toc-block" id="rank-math-toc"><h2>Оглавление</h2><nav><ul><li class=""><a href="#console-log">console.log()</a></li><li class=""><a href="#query-selector">querySelector()</a></li><li class=""><a href="#add-event-listener">addEventListener()</a></li><li class=""><a href="#random">random()</a></li><li class=""><a href="#times">times()</a></li><li class=""><a href="#slugify">slugify()</a></li><li class=""><a href="#validate-email">validateEmail()</a></li><li class=""><a href="#capitalize">capitalize()</a></li><li class=""><a href="#sanitize-html">sanitizeHTML()</a></li><li class=""><a href="#local-storage">localStorage</a></li><li class=""><a href="#заключение">Заключение</a></li></ul></nav></div>
<!-- /wp:rank-math/toc-block -->

<h2 class="wp-block-heading" id="console-log">console.log()</h2>

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">const { log } = console;

log("Hello world!");
// Expected output: Hello world!

// SAME AS //

console.log("Hello world!");
// Expected output: Hello world!
</code></pre>
<!-- /wp:code -->

Объяснение: мы используем назначение деструктуризации, чтобы иметь возможность извлечь метод log из консоли.

<h2 class="wp-block-heading" id="query-selector"><code>querySelector()</code></h2>

При работе с JavaScript вы могли слышать термин DOM Manipulation и использовать getElementById(), querySelector() и другие методы для доступа к элементам DOM. Итак, давайте упростим работу с ними.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">const select = (selector, scope = document) =&gt; {
  return scope.querySelector(selector);
};

const title = select("h1");
const className = select(".class");
const message = select("#message", formElem);

// SAME AS //

const title = document.querySelector("h1");
const className = document.querySelector(".class");
const message = formElem.querySelector("#message");
</code></pre>
<!-- /wp:code -->

Объяснение: Мы передаем 2 параметра в функции select():

1-й: DOM-элемент, который вы хотите выбрать<br>2-й: Область, из которой вы получаете доступ к этому элементу (по умолчанию = document);

<h2 class="wp-block-heading" id="add-event-listener">addEventListener()</h2>

Обработка событий click, mousemove и других в основном реализуется с помощью метода addEventListener().

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">const listen = (target, event, callback, ...options) =&gt; {
  return target.addEventListener(event, callback, ...options);
};

listen(buttonElem, "click", () =&gt; console.log("Clicked!"));

listen(document, "mouseover", () =&gt; console.log("Mouse over!"));

listen(formElem, "submit", () =&gt; {
    console.log("Form submitted!");
  }, { once: true }
);
</code></pre>
<!-- /wp:code -->

Объяснение: Мы передаем 4 параметра в функции listen():

1-й: Элемент, на который вы хотите нацелиться (например, ‘window’, ‘document’ или конкретный элемент DOM).<br>2-й: Тип события (например, ‘click’, ‘submit’, ‘DOMContentLoaded’ и т.д.).<br>3-й: Функция обратного вызова<br>4-й: Оставшиеся необязательные опции (например, ‘capture’, ‘once’ и т.д.). Кроме того, мы используем синтаксис распространения, чтобы при необходимости можно было использовать другие опции. В противном случае их можно опустить, как и в методе addEventListener.

<h2 class="wp-block-heading" id="random">random()</h2>

Вы, вероятно, знаете о функции Math.random(), которая генерирует случайные числа от 0 до 1. Вы также можете знать о других хаках, таких как Math.random() \* 10, которая теперь должна генерировать случайные числа от 0 до 10. Однако проблема в том, что, несмотря на знание предела, у нас нет особого контроля над минимальным значением.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">const random = (min, max) =&gt; {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

random(5, 10);
// 7
</code></pre>
<!-- /wp:code -->

Объяснение: Вот лучшее объяснение от MDN Docs

<h2 class="wp-block-heading" id="times">times()</h2>

Иногда мы сталкиваемся с необходимостью выполнить определенную функцию несколько раз.

Конечно, мы можем использовать setInterval() для запуска через каждый интервал времени, например, так:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">setInterval(() =&gt; {
  randomFunction();
}, 5000); // runs every 5 seconds
</code></pre>
<!-- /wp:code -->

Проблема в том, что мы не можем указать, сколько раз мы хотим его запустить. Итак, давайте это исправим!

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">const times = (func, n) =&gt; {
  Array.from(Array(n)).forEach(() =&gt; {
    func();
  });
};

times(() =&gt; {
  randomFunction();
}, 3); // runs 3 times
</code></pre>
<!-- /wp:code -->

Пояснение:

Array(n) - создает новый массив длиной n.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">Array(5); // =&gt; [,,]
</code></pre>
<!-- /wp:code -->

<code>Array.from() - создает неглубокую копию из массива Array(n). Это помогает нам сделать массив пригодным для использования, заполнив его ‘undefined’. Вы также можете использовать метод Array.prototype.fill() для достижения того же результата.</code>

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">Array.from(Array(3)); // =&gt; [undefined,undefined,undefined]
</code></pre>
<!-- /wp:code -->

Примечание: Исследуя эту служебную функцию, я понял, что некоторые программисты предпочитают сначала помещать параметр n, а затем функцию times(n, func). Но для меня это выглядело довольно странно, поэтому я решил поменять их местами, тем самым сделав синтаксис более похожим на синтаксис функции setInterval():

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">setInterval(func, delay);

times(func, n);
</code></pre>
<!-- /wp:code -->

Кроме того, вы называете его setTimes() вместо times() для согласования с методами setInterval() и setTimeout() в зависимости от ваших предпочтений.

<h2 class="wp-block-heading" id="slugify"><code>slugify()</code></h2>

Вы когда-нибудь сталкивались с необходимостью преобразования заголовков статей вашего блога в “URL-подобный” формат?

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">JS Utility Functions =&gt; js-utility-functions
</code></pre>
<!-- /wp:code -->

Вот небольшая полезная функция, которая это делает:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">const slugify = (string, separator = "-") =&gt; {
  return string
    .toString() // Cast to string (optional)
    .toLowerCase() // Convert the string to lowercase letters
    .trim() // Remove whitespace from both sides of a string (optional)
    .replace(/\s+/g, separator) // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\_/g, separator) // Replace _ with -
    .replace(/\-\-+/g, separator) // Replace multiple - with single -
    .replace(/\-$/g, ""); // Remove trailing -
};

slugify("Hello, World!");
// Expected output: "hello-world"

slugify("Hello, Universe!", "_");
// Expected output: "hello_universe"
</code></pre>
<!-- /wp:code -->

Пояснение: Вот обсуждение сообщества GitHub

<h2 class="wp-block-heading" id="validate-email"><code>validateEmail()</code></h2>

Когда вы работаете над небольшими проектами и пробуете валидацию электронной почты для вашей формы, вы можете использовать этот супер простой метод для достижения вашей цели. Кроме того, он может быть очень удобен для небольших тестов.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">const validateEmail = (email) =&gt; {
  const regex = /^\S+@\S+\.\S+$/;
  return regex.test(email);
};

validateEmail("youremail@org.com"); // true
validateEmail("youremail@com"); // false
validateEmail("youremail.org@com"); // false
</code></pre>
<!-- /wp:code -->

Пояснение: Здесь вы можете поиграть с regex.

RegExp.test() проверяет, совпадает ли предоставленное выражение regex со строкой.

Примечание: Для больших проектов я бы рекомендовал использовать такие библиотеки, как validator.js, чтобы они выполняли тяжелую работу за вас.

<h2 class="wp-block-heading" id="capitalize">capitalize()</h2>

В JavaScript есть встроенные методы toUpperCase() и toLowerCase(). Однако у нас нет встроенной поддержки капитализации. Так давайте же создадим ее!

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">const capitalize = (str) =&gt; {
  const arr = str.trim().toLowerCase().split(" ");

  for (let i = 0; i &lt; arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }

  return arr.join(" ");
};

capitalize("hello, world!");
// Expected output: "Hello, World!"
</code></pre>
<!-- /wp:code -->

Пояснение:

split() - превращает строку в массив

arr[i].charAt(0).toUpperCase() - переводит в верхний регистр первую букву каждого слова

arr[i].slice(1) - возвращает оставшиеся буквы слова.

arr.join(” ") - превращает массив обратно в строку

<h2 class="wp-block-heading" id="sanitize-html">sanitizeHTML()</h2>

Вы когда-нибудь слышали об атаках межсайтового скриптинга (XSS)? Если нет, то это тип атаки, который встречается на большинстве веб-сайтов. Например, при отправке формы злоумышленник может попытаться отправить вредоносные сценарии для взлома системы. Чтобы этого не произошло в ваших формах, вы можете использовать эту удобную функцию, которая ”санирует" код скрипта.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">const sanitizeHTML = (str) =&gt; {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
};

sanitizeHTML("&lt;h1&gt;Hello, World!&lt;/h1&gt;");
// Expected output: "&amp;lt;h1&amp;gt;Hello, World!&amp;lt;/h1&amp;gt;"
</code></pre>
<!-- /wp:code -->

Пояснения: В отличие от innerHTML, textContent не разбирает строку как HTML, в то время как innerText показывает только ”человекочитаемые" элементы.

Более того, использование textContent может предотвратить XSS-атаки. - MDN Docs

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--3MaymP4x--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/31d5llsbw6rru33i0d2v.png" alt="Случай использования дезинфицированного HTML в реальной жизни"/></figure>
<!-- /wp:image -->

<h2 class="wp-block-heading" id="local-storage">localStorage</h2>

Возможно, вы использовали localStorage в своих приложениях для составления списка дел или любых других проектах для сохранения определенных данных в памяти компьютера пользователя. При получении и установке элементов приходится использовать методы JSON parse() и stringify() для достижения желаемого результата. Итак, давайте упростим работу с ними.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">const storage = {
  get: (key, defaultValue = null) =&gt; {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : defaultValue;
  },
  set: (key, value) =&gt; localStorage.setItem(key, JSON.stringify(value)),
  remove: (key) =&gt; localStorage.removeItem(key),
  clear: () =&gt; localStorage.clear(),
};

storage.set("motto", "Eat, Sleep, Code, Repeat");
storage.get("motto");
</code></pre>
<!-- /wp:code -->

Пояснение: Если вы не знаете о методах JSON parse() и stringify(), посмотрите MDN Docs для лучшего объяснения.

Примечание: Мне было довольно сложно придумать хорошее название, которое имело бы гораздо больше смысла, чем просто хранилище. Потому что на первый взгляд разработчики могут не понять, относится ли это к ‘localStorage’ или к чему-то другому. Однако вы можете назвать его как угодно. Также, если вы нашли хорошие названия, пожалуйста, сообщите мне об этом в разделе комментариев.

<h2 class="wp-block-heading" id="заключение">Заключение</h2>

Если у вас есть вопросы или предложения, раздел комментариев в вашем распоряжении. Возможно, мы сделаем вторую часть этой статьи с вашими предложениями.

Спасибо за чтение! 🙂
