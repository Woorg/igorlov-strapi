---
title: >-
  Что означает символ начала в регулярных выражениях? Метасимвол ^ в регулярных
  выражениях
meta_title: >-
  Что означает символ начала в регулярных выражениях? Метасимвол каретка ^ в
  регулярных выражениях - Igor Gorlov
description: >-
  Каретка ^ - это один из многих символов для создания шаблонов в регулярных
  выражениях.
date: 2023-04-21T07:19:43.000Z
image: ../../assets/images/undefined-Apr-21-2023.avif
author: Igor Gorlov
categories:
  - Учебник
tags:
  - Regex
lastmod: 2024-03-20T21:26:43.779Z
---

Каретка (^) - это один из многих символов для создания шаблонов в регулярных выражениях.

Каретка соответствует началу строки или определенной строке. Но это еще не все, что связано с символом каретки (^).

Символ каретки (^) часто называют ”якорем", поскольку он привязывает шаблон к началу строки или линии. Таким образом, его можно назвать "якорем начала строки".

Другой якорь — это знак доллара ($), который привязывает шаблон к концу строки, что означает ”якорь конца строки".

<!-- wp:rank-math/toc-block {"title":"Оглавление","headings":[{"key":"2ac17447-f8b1-4303-9f7a-9923277d3190","content":"Что делает символ каретки в RegEx?","level":2,"link":"#что-делает-символ-каретки-в-reg-ex","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"609b5301-c65f-47f1-b0cc-00756fb27804","content":"Как сопоставить начало строки с символом каретки","level":2,"link":"#как-сопоставить-начало-строки-с-символом-каретки","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"5a1f0afe-62e6-4848-9648-e9b6deafee22","content":"Как отрицать набор символов с помощью каретки","level":2,"link":"#как-отрицать-набор-символов-с-помощью-каретки","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"6ed53b80-e71c-4080-b508-0ece1c4e8a41","content":"Как сопоставить каретку как символ в строке","level":2,"link":"#как-сопоставить-каретку-как-символ-в-строке","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"4535caf5-ccfc-49cc-b537-f4a8f140f2b8","content":"Заключение","level":2,"link":"#заключение","disable":false,"isUpdated":false,"isGeneratedLink":true}],"listStyle":"ul"} -->
<div class="wp-block-rank-math-toc-block" id="rank-math-toc"><h2>Оглавление</h2><nav><ul><li class=""><a href="#что-делает-символ-каретки-в-reg-ex">Что делает символ каретки в RegEx?</a></li><li class=""><a href="#как-сопоставить-начало-строки-с-символом-каретки">Как сопоставить начало строки с символом каретки</a></li><li class=""><a href="#как-отрицать-набор-символов-с-помощью-каретки">Как отрицать набор символов с помощью каретки</a></li><li class=""><a href="#как-сопоставить-каретку-как-символ-в-строке">Как сопоставить каретку как символ в строке</a></li><li class=""><a href="#заключение">Заключение</a></li></ul></nav></div>
<!-- /wp:rank-math/toc-block -->

<h2 class="wp-block-heading" id="что-делает-символ-каретки-в-reg-ex">Что делает символ каретки в RegEx?</h2>

Есть две основные вещи, которые делает символ каретки - он соответствует началу строки или началу строки, и он отрицает набор символов, когда вы помещаете его внутрь квадратных скобок.

Кроме того, вы можете захотеть сопоставить сам символ каретки, поскольку он используется и для других целей, помимо регулярных выражений. В этом случае его нужно экранировать.

<h2 class="wp-block-heading" id="как-сопоставить-начало-строки-с-символом-каретки">Как сопоставить начало строки с символом каретки</h2>

Чтобы сопоставить начало строки с символом каретки, добавьте его к вашему шаблону.

В примере ниже я использовал шаблон /^hello\s\*world/igm, который будет соответствовать только тексту hello world, находящемуся в начале строки. Любой другой текст hello world между строками или в конце строки не будет соответствовать:

<img width="963" height="589" src="https://www.freecodecamp.org/news/content/images/2023/04/Screenshot-2023-04-20-at-14.21.33.png" alt="Screenshot-2023-04-20-at-14.21.33">

Кроме того, шаблон /^c/igm будет соответствовать словам, начинающимся с буквы c, только если они находятся в начале строки:

<img width="970" height="629" src="https://www.freecodecamp.org/news/content/images/2023/04/Screenshot-2023-04-20-at-14.22.33.png" alt="Screenshot-2023-04-20-at-14.22.33">

<h2 class="wp-block-heading" id="как-отрицать-набор-символов-с-помощью-каретки">Как отрицать набор символов с помощью каретки</h2>

Еще одна вещь, которую можно сделать с помощью каретки, — это отрицание набора символов. Например, если вы хотите отрицать гласные, вы можете поместить их в набор символов и добавить к ним карету:

<img width="967" height="588" src="https://www.freecodecamp.org/news/content/images/2023/04/Screenshot-2023-04-20-at-14.29.46.png" alt="Screenshot-2023-04-20-at-14.29.46">

Видно, что все гласные не совпали.

<h2 class="wp-block-heading" id="как-сопоставить-каретку-как-символ-в-строке">Как сопоставить каретку как символ в строке</h2>

Каретку можно использовать и для других целей, например, для экспоненциации в математике или побитового оператора XOR в C++.

Если вы хотите сопоставить его, вы должны экранировать его обратной косой чертой \, так как он распознается как метасимвол движками RegEx:

<img width="978" height="591" src="https://www.freecodecamp.org/news/content/images/2023/04/Screenshot-2023-04-20-at-14.39.07.png" alt="Screenshot-2023-04-20-at-14.39.07">

Метасимвол каретки отлично работает в JavaScript. В приведенном ниже фрагменте кода показано, как я тестирую его с некоторыми строками:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">const text1 = `There's hello world in every programming language
Hello world is what starts many programming language courses.
Many programmers don't know any other hello apart from hello world.`;

const text2 = `caret is anchors your pattern to the start of a line
To match the caret itself, you have to escape it.`;

const text3 = '4 raised to power 2 in mathematics is 4 ^ 2';

const re1 = /^hello\s*world/gim;
const re2 = /^c/gim;
const re3 = /\^/;

console.log(re1.test(text1)); //true
console.log(re2.test(text2)); //true
console.log(re3.test(text3)); //true
</code></pre>
<!-- /wp:code -->

<h2 class="wp-block-heading" id="заключение">Заключение</h2>

В этой статье вы узнали, как можно использовать ”якорь начала строки" (метасимвол каретки ^) для привязки шаблона к началу строки или строки как в механизмах RegEx, так и в JavaScript.

Чтобы узнать о якоре конца строки ($), вы можете прочитать эту статью.

Счастливого кодирования!

<a href="https://www.freecodecamp.org/news/what-does-the-caret-mean-in-regex-how-to-match-the-start-of-a-line-in-regular-expressions/" target="_blank" rel="noreferrer noopener nofollow">Источник</a>
