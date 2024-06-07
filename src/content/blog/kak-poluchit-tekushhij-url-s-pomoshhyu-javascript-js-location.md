---
title: Как получить текущий URL с помощью JavaScript -JS Location
meta_title: Как получить текущий URL с помощью JavaScript -JS Location - Igor Gorlov
description: >-
  Если вы являетесь веб-разработчиком, вы будете работать с JavaScript при
  создании динамических и интерактивных веб-приложений. Одна из распространенных
  задач, которую вам придется выполнять, – это получение текущего URL
  веб-страницы.
date: 2023-04-27T20:40:10.000Z
author: Igor Gorlov
image: ../../assets/images/undefined-Apr-27-2023.avif
categories:
  - Учебник
tags:
  - JavaScript
draft: false
lastmod: 2024-03-20T21:26:48.278Z
---

Если вы являетесь веб-разработчиком, вы будете работать с JavaScript при создании динамических и интерактивных веб-приложений. Одна из распространенных задач, которую вам придется выполнять, - это получение текущего URL веб-страницы.

В этой статье вы узнаете, как получить текущий URL с помощью объекта Location в JavaScript. Я покажу вам несколько примеров, а также несколько лучших практик.

<!-- wp:rank-math/toc-block {"title":"Оглавление","headings":[{"key":"6aaa1017-b86c-4af0-a1c3-f2632a99b45a","content":"Как использовать объект Location","level":2,"link":"#как-использовать-объект-location","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"4c33a3e7-e99d-4509-9fc7-b2fc23552013","content":"Как получить доступ к текущему URL с помощью JavaScript","level":2,"link":"#как-получить-доступ-к-текущему-url-с-помощью-java-script","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"e3472d66-553c-4f29-8a9c-418a410fbfae","content":"Как разобрать текущий URL с помощью JavaScript","level":2,"link":"#как-разобрать-текущий-url-с-помощью-java-script","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"9d9742c3-145b-49c5-8627-cdb36cb6235a","content":"Как обновить текущий URL с помощью JavaScript","level":2,"link":"#как-обновить-текущий-url-с-помощью-java-script","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"5089416a-7304-4059-8afd-467b450ba9e2","content":"Лучшие практики при работе с объектом Location","level":2,"link":"#лучшие-практики-при-работе-с-объектом-location","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"8c498d76-7cc1-4af8-ace4-11d6e8c83d45","content":"Заключение","level":2,"link":"#заключение","disable":false,"isUpdated":false,"isGeneratedLink":true}],"listStyle":"ul"} -->
<div class="wp-block-rank-math-toc-block" id="rank-math-toc"><h2>Оглавление</h2><nav><ul><li class=""><a href="#как-использовать-объект-location">Как использовать объект Location</a></li><li class=""><a href="#как-получить-доступ-к-текущему-url-с-помощью-java-script">Как получить доступ к текущему URL с помощью JavaScript</a></li><li class=""><a href="#как-разобрать-текущий-url-с-помощью-java-script">Как разобрать текущий URL с помощью JavaScript</a></li><li class=""><a href="#как-обновить-текущий-url-с-помощью-java-script">Как обновить текущий URL с помощью JavaScript</a></li><li class=""><a href="#лучшие-практики-при-работе-с-объектом-location">Лучшие практики при работе с объектом Location</a></li><li class=""><a href="#заключение">Заключение</a></li></ul></nav></div>
<!-- /wp:rank-math/toc-block -->

<h2 class="wp-block-heading" id="как-использовать-объект-location">Как использовать объект Location</h2>

Объект Location - это встроенный объект JavaScript, который предоставляет информацию о текущем URL веб-страницы. Он содержит различные свойства, позволяющие получать доступ и изменять различные части URL.

Для доступа к объекту Location можно использовать свойство window.location. Оно возвращает объект Location для текущей веб-страницы. Этот объект содержит множество данных, таких как URL, имя пути, происхождение, хост, данные поиска и другие.

Например:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">{
  "ancestorOrigins": {
    "0": "https://codepen.io"
  },
  "href": "https://cdpn.io/cpe/boomboom/index.html?editors=0012&amp;key=index.html-f1981af8-7dc2-f8b6-669a-8980d4a8d02a",
  "origin": "https://cdpn.io",
  "protocol": "https:",
  "host": "cdpn.io",
  "hostname": "cdpn.io",
  "port": "",
  "pathname": "/cpe/boomboom/index.html",
  "search": "?editors=0012&amp;key=index.html-f1981af8-7dc2-f8b6-669a-8980d4a8d02a",
  "hash": ""
}
</code></pre>
<!-- /wp:code -->

<h2 class="wp-block-heading" id="как-получить-доступ-к-текущему-url-с-помощью-java-script">Как получить доступ к текущему URL с помощью JavaScript</h2>

Одним из распространенных вариантов использования объекта Location является получение текущего URL веб-страницы. Это можно сделать, обратившись к свойству href объекта Location.

Свойство href содержит полный URL текущей веб-страницы:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">const currentUrl = window.location.href;
console.log(currentUrl);
</code></pre>
<!-- /wp:code -->

Это приведет к записи текущего URL веб-страницы в консоль.

<h2 class="wp-block-heading" id="как-разобрать-текущий-url-с-помощью-java-script">Как разобрать текущий URL с помощью JavaScript</h2>

Помимо получения текущего URL, вам может понадобиться разобрать его, чтобы извлечь определенные части. Например, вы можете захотеть извлечь из URL протокол, хост или путь.

Чтобы разобрать текущий URL, вы можете использовать различные свойства объекта Location. Например, вы можете использовать свойство protocol, чтобы получить протокол текущего URL:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">const protocol = window.location.protocol;
console.log(protocol);
</code></pre>
<!-- /wp:code -->

В результате в консоль будет выведен протокол текущего URL (например, “http:” или “https:”).

Другие свойства объекта Location, которые можно использовать для извлечения частей текущего URL, включают хост, имя хоста, порт, имя пути, поиск и хэш.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">const host = window.location.host;
const pathname = window.location.pathname;
const search = window.location.search;
const hash = window.location.hash;
</code></pre>
<!-- /wp:code -->

Используя эти свойства, вы можете извлекать различные части текущего URL.

<h2 class="wp-block-heading" id="как-обновить-текущий-url-с-помощью-java-script">Как обновить текущий URL с помощью JavaScript</h2>

Помимо получения и разбора текущего URL, вам может потребоваться его обновление. Например, вам может понадобиться перенаправить пользователя на другой URL или динамически изменить текущий URL.

Для обновления текущего URL можно использовать различные методы объекта Location. Например, вы можете использовать метод replace() для замены текущего URL на новый URL:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">const newUrl = "https://example.com/new-page.html";
window.location.replace(newUrl);
</code></pre>
<!-- /wp:code -->

Это заменит текущий URL на новый, перенаправляя пользователя на новую страницу.

<h2 class="wp-block-heading" id="лучшие-практики-при-работе-с-объектом-location">Лучшие практики при работе с объектом Location</h2>

При работе с объектом Location есть несколько лучших практик, которым следует следовать, чтобы избежать возможных ошибок. Например, перед использованием объекта Location следует всегда проверять, доступен ли он.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">if (window.location) {
  // Access or modify the Location object
}
</code></pre>
<!-- /wp:code -->

Вы также должны быть осторожны при изменении текущего URL-адреса, поскольку это может повлиять на работу пользователя в браузере. Например, не следует изменять протокол, хост или порт URL, если это не является абсолютно необходимым.

<h2 class="wp-block-heading" id="заключение">Заключение</h2>

В этой статье вы узнали, как получить текущий URL веб-страницы с помощью объекта Location в JavaScript. Поняв, как работать с объектом Location, вы сможете создавать более динамичные и интерактивные веб-приложения, обеспечивающие лучший пользовательский опыт.

Спасибо за прочтение, и я надеюсь, что вы нашли эту статью информативной и полезной. Для получения дополнительной информации о работе с URL-адресами в JavaScript вы можете прочитать статью о том, как обновить страницу с помощью JavaScript.

Если вы хотите узнать больше о JavaScript и веб-разработке, просмотрите 200+ экспертных статей по веб-разработке, написанных мной, а также загляните в мой блог, где вы найдете еще больше увлекательных материалов.

Успехов в кодировании!
