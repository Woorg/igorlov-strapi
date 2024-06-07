---
title: Как обрабатывать загрузку файлов на задней стороне в Node.js и Nuxt
meta_title: Как обрабатывать загрузку файлов на задней стороне в Node.js и Nuxt
description: >-
  Сегодня мы обратимся к задней части, чтобы получить эти запросы
  multipart/form-data и получить доступ к двоичным данным из этих файлов.
date: 2023-04-21T06:58:33.000Z
image: ../../assets/images/undefined-Apr-21-2023.avif
categories:
  - Как закодить
author: Igor Gorlov
tags:
  - JavaScript
  - Node.js
  - Nuxt
draft: false
lastmod: 2024-03-20T21:26:48.687Z
---

Сегодня мы обратимся к задней части, чтобы получить эти запросы multipart/form-data и получить доступ к двоичным данным из этих файлов.

<!-- wp:rank-math/toc-block {"title":"Оглавление","headings":[{"key":"caa3f4a9-4252-4f73-bbc4-9ecfbae373a8","content":"Немного истории","level":2,"link":"#немного-истории","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"f155d040-2112-4428-9706-5065210b66b1","content":"Как работать с multipart/form-data в Node.js","level":2,"link":"#как-работать-с-multipart-form-data-в-node-js","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"43be08f5-684d-4d76-b9e3-3ae85b3f6b08","content":"Как использовать библиотеку для потоковой передачи данных на диск","level":2,"link":"#как-использовать-библиотеку-для-потоковой-передачи-данных-на-диск","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"fd13de20-6da4-4d48-994f-2b074e170a45","content":"📯📯📯 Завершающий этап","level":2,"link":"#📯-📯-📯-завершающий-этап","disable":false,"isUpdated":false,"isGeneratedLink":true}],"listStyle":"ul"} -->
<div class="wp-block-rank-math-toc-block" id="rank-math-toc"><h2>Оглавление</h2><nav><ul><li class=""><a href="#немного-истории">Немного истории</a></li><li class=""><a href="#как-работать-с-multipart-form-data-в-node-js">Как работать с multipart/form-data в Node.js</a></li><li class=""><a href="#как-использовать-библиотеку-для-потоковой-передачи-данных-на-диск">Как использовать библиотеку для потоковой передачи данных на диск</a></li><li class=""><a href="#📯-📯-📯-завершающий-этап">📯📯📯 Завершающий этап</a></li></ul></nav></div>
<!-- /wp:rank-math/toc-block -->

<h2 class="wp-block-heading" id="немного-истории">Немного истории</h2>

Большинство концепций в этом руководстве должны широко применяться к различным фреймворкам, средам выполнения и языкам, но примеры кода будут более конкретными.

Я буду работать в рамках проекта Nuxt.js, который работает в среде Node.js. Nuxt имеет некоторые специфические способы определения маршрутов API, которые требуют вызова глобальной функции defineEventHandler.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">/**
 * @see https://nuxt.com/docs/guide/directory-structure/server
 * @see https://nuxt.com/docs/guide/concepts/server-engine
 * @see https://github.com/unjs/h3
 */
export default defineEventHandler((event) =&gt; {
  return { ok: true };
});</code></pre>
<!-- /wp:code -->

Аргумент event предоставляет доступ к работе непосредственно с базовым объектом запроса Node.js (он же IncomingMessage) через event.node.req. Таким образом, мы можем написать наш специфичный для Node код в виде абстракции, например, функцию doSomethingWithNodeRequest, которая получает этот объект запроса Node и что-то с ним делает.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">export default defineEventHandler((event) =&gt; {
  const nodeRequestObject = event.node.req;

  doSomethingWithNodeRequest(event.node.req);

  return { ok: true };
});

/**
 * @param {import('http').IncomingMessage} req
 */
function doSomethingWithNodeRequest(req) {
  // Do not specific stuff here
}</code></pre>
<!-- /wp:code -->

Работа непосредственно с Node таким образом означает, что код и концепции будут применимы независимо от того, с каким фреймворком более высокого уровня вы работаете. В конце концов, завершите работу в Nuxt.js.

<h2 class="wp-block-heading" id="как-работать-с-multipart-form-data-в-node-js">Как работать с multipart/form-data в Node.js</h2>

В этом разделе мы рассмотрим некоторые низкоуровневые концепции, которые полезно понимать, но не обязательно. Не стесняйтесь пропустить этот раздел, если вы уже знакомы с чанками, потоками и буферами в Node.js.

Загрузка файла требует отправки запроса multipart/form-data. В этих запросах браузер разбивает данные на небольшие ”куски” и отправляет их через соединение по одному куску за раз. Это необходимо, поскольку файлы могут быть слишком большими, чтобы отправлять их одним массивным блоком.

Куски данных, передаваемые в течение определенного времени, образуют так называемый ”поток”. Потоки довольно сложно понять с первого раза, по крайней мере, мне так показалось. Они заслуживают отдельной статьи (или многих), поэтому я поделюсь отличным руководством web.dev, если вы хотите узнать больше.

По сути, поток - это что-то вроде конвейера данных, где каждый фрагмент может быть обработан по мере поступления. Если говорить о HTTP-запросе, то бэкенд будет получать части запроса, по одному биту за раз.

Node.js предоставляет нам API обработчика событий через метод on объекта request, который позволяет нам слушать события ”данных” по мере их поступления в бэкенд.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">/**
 * @param {import('http').IncomingMessage} req
 */
function doSomethingWithNodeRequest(req) {
  req.on("data", (data) =&gt; {
    console.log(data);
  }
}</code></pre>
<!-- /wp:code -->

Например, когда я загружаю фотографию Наггета с милым зевающим лицом, а затем смотрю на консоль сервера, я вижу несколько странных вещей, которые выглядят следующим образом:

<img width="1080" height="103" class="kg-image" src="https://austingil.com/wp-content/uploads/image-63-1080x103.png" alt="Screenshot of a terminal with two logs of text that begin with &quot;<Buffer&quot;, then a long list of two digit hex values, and end with a large number and &quot;... more bytes>&quot;">Я использовал здесь скриншот, чтобы вспомогательные технологии не смогли прочитать эту тарабарщину вслух. Можете себе представить?

Эти два куска беспорядочной чепухи называются ”буферами” и представляют собой два куска данных, которые составили поток запросов, содержащий милую фотографию Наггет.

Буфер - это хранилище в физической памяти, используемое для временного хранения данных во время их передачи из одного места в другое. - MDN

Буферы - это еще одна странная, низкоуровневая концепция, которую мне приходится объяснять, когда я говорю о работе с файлами в JavaScript.

JavaScript не работает напрямую с двоичными данными, поэтому нам приходится изучать буферы. Ничего страшного, если эти понятия все еще кажутся немного расплывчатыми. Понимание всего полностью - не самое важное сейчас, и по мере дальнейшего изучения передачи файлов вы будете лучше понимать, как все это работает вместе.

Работа с одним неполным куском данных не очень полезна. Вместо этого мы можем переписать нашу функцию так, чтобы с ней можно было работать:

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Возвращать Promise, чтобы облегчить работу с асинхронным синтаксисом. Предоставить массив для хранения фрагментов данных, чтобы использовать их позже. </li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Слушать событие "data" и добавлять фрагменты в нашу коллекцию по мере их поступления. </li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Слушать событие "end" и преобразовывать фрагменты в то, с чем мы можем работать. </li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Разрешить Promise с конечным полезным грузом запроса. </li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Мы также не должны забывать обрабатывать события "error".</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">/**
 * @param {import('http').IncomingMessage} req
 */
function doSomethingWithNodeRequest(req) {
  return new Promise((resolve, reject) =&gt; {
    /** @type {any[]} */
    const chunks = [];
    req.on('data', (data) =&gt; {
      chunks.push(data);
    });
    req.on('end', () =&gt; {
      const payload = Buffer.concat(chunks).toString()
      resolve(payload);
    });
    req.on('error', reject);
  });
}</code></pre>
<!-- /wp:code -->

И каждый раз, когда запрос получает какие-то данные, он помещает эти данные в массив чанков.

Итак, настроив эту функцию, мы можем ожидать возвращения Promise до тех пор, пока запрос не закончит получать все данные из потока запросов, и записать разрешенное значение в консоль.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">export default defineEventHandler((event) =&gt; {
  const nodeRequestObject = event.node.req;

  const body = await doSomethingWithNodeRequest(event.node.req);
  console.log(body)

  return { ok: true };
});</code></pre>
<!-- /wp:code -->

Это тело запроса. Разве оно не прекрасно?

<img width="1080" height="479" class="kg-image" src="https://austingil.com/wp-content/uploads/image-64-1080x479.png" alt="Sceenshot of a terminal containing a long string of unintelligible text including alphanumerical values as well as symbols and characters that cannot be rendered. It legitimately looks like alien writing">Честно говоря, я даже не знаю, что бы сделал скринридер, если бы это был обычный текст.

Если вы загрузите файл изображения, это будет выглядеть так, как будто инопланетянин взломал ваш компьютер. Не волнуйтесь, это не так. Буквально так выглядит текстовое содержимое этого файла. Вы даже можете попробовать открыть файл изображения в обычном текстовом редакторе и увидеть то же самое.

Если я загружу более простой пример, например, файл .txt с обычным текстом, тело файла может выглядеть следующим образом:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">Content-Disposition: form-data; name="file"; filename="dear-nugget.txt"
Content-Type: text/plain

I love you!
------WebKitFormBoundary4Ay52hDeKB5x2vXP--</code></pre>
<!-- /wp:code -->

Обратите внимание, что запрос разбит на различные секции для каждого поля формы. Разделы разделены ”границей формы”, которую браузер вводит по умолчанию.

Я не буду вдаваться в излишние подробности, поэтому если вы хотите прочитать больше, ознакомьтесь с Content-Disposition на MDN. Важно знать, что запросы multipart/form-data гораздо сложнее, чем просто пары ключ/значение.

Большинство серверных фреймворков предоставляют встроенные инструменты для доступа к телу запроса. Поэтому мы фактически заново изобрели колесо. Например, Nuxt предоставляет глобальную функцию readBody. Поэтому мы могли бы сделать то же самое без написания собственного кода:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">export default defineEventHandler((event) =&gt; {
  const nodeRequestObject = event.node.req;

  const body = await readBody(event.node.req);
  console.log(body)

  return { ok: true };
});</code></pre>
<!-- /wp:code -->

Это прекрасно работает для других типов содержимого, но для multipart/form-data возникают проблемы. Все тело запроса считывается в память как одна огромная строка текста. Сюда входит информация Content-Disposition, границы формы, поля и значения формы. Неважно, что файлы даже не записываются на диск.

Главная проблема здесь заключается в том, что если загрузить очень большой файл, он может занять всю память приложения и привести к его аварийному завершению.

Решением снова является работа с потоками.

Когда наш сервер получает фрагмент данных из потока запросов, вместо того чтобы хранить его в памяти, мы можем направить его в другой поток. Точнее, мы можем отправить его в поток, который записывает данные в файловую систему с помощью createWriteStream. По мере поступления фрагментов из запроса эти данные записываются в файловую систему, а затем освобождаются из памяти.

На этом я хочу углубиться в низкоуровневые концепции. Давайте вернемся к решению проблемы, не изобретая велосипед.

<h2 class="wp-block-heading" id="как-использовать-библиотеку-для-потоковой-передачи-данных-на-диск">Как использовать библиотеку для потоковой передачи данных на диск</h2>

Вероятно, мой лучший совет по работе с загрузкой файлов - это обратиться к библиотеке, которая сделает всю эту работу за вас:

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Разбирает запросы multipart/form-data</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Отделяет файлы от других полей формы</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Передает данные файла в файловую систему</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Предоставляет вам данные полей формы, а также полезные данные о файлах.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

Сегодня я буду использовать библиотеку под названием formidable. Вы можете установить ее с помощью npm install formidable, а затем импортировать в свой проект.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">import formidable from 'formidable';</code></pre>
<!-- /wp:code -->

Formidable работает непосредственно с объектом запроса Node, который мы удобно уже захватили из события Nuxt (”Вау, какая удивительная прозорливость!!!” 🤩).

Поэтому мы можем изменить нашу функцию doSomethingWithNodeRequest, чтобы вместо нее использовать formidable. Она все равно должна возвращать обещание, потому что formidable использует обратные вызовы, но с обещаниями приятнее работать. В остальном мы можем в основном заменить содержимое функции на formidable.

Нам нужно будет создать экземпляр formidable и использовать его для разбора объекта запроса. Если не возникнет ошибки, мы сможем разрешить обещание с помощью одного объекта, содержащего поля формы и файлы.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">/**
 * @param {import('http').IncomingMessage} req
 */
function doSomethingWithNodeRequest(req) {
  return new Promise((resolve, reject) =&gt; {
    /** @see https://github.com/node-formidable/formidable/ */
    const form = formidable({ multiples: true })
    form.parse(req, (error, fields, files) =&gt; {
      if (error) {
        reject(error);
        return;
      }
      resolve({ ...fields, ...files });
    });
  });
}</code></pre>
<!-- /wp:code -->

Это дает нам удобную функцию для разбора multipart/form-data с помощью promises и доступа к обычным полям формы запроса, а также к информации о файлах, которые были записаны на диск с помощью потоков.

Теперь мы можем изучить тело запроса:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">export default defineEventHandler((event) =&gt; {
  const nodeRequestObject = event.node.req;

  const body = await doSomethingWithNodeRequest(event.node.req);
  console.log(body)

  return { ok: true };
});</code></pre>
<!-- /wp:code -->

Мы должны увидеть объект, содержащий все поля формы и их значения, но для каждого ввода файла мы увидим объект, представляющий загруженный файл, а не сам файл. Этот объект содержит всевозможную полезную информацию, включая путь к файлу на диске, имя, mimetype и многое другое.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">{
  file-input-name: PersistentFile {
    _events: [Object: null prototype] { error: [Function (anonymous)] },
    _eventsCount: 1,
    _maxListeners: undefined,
    lastModifiedDate: 2023-03-21T22:57:42.332Z,
    filepath: '/tmp/d53a9fd346fcc1122e6746600',
    newFilename: 'd53a9fd346fcc1122e6746600',
    originalFilename: 'file.txt',
    mimetype: 'text/plain',
    hashAlgorithm: false,
    size: 13,
    _writeStream: WriteStream {
      fd: null,
      path: '/tmp/d53a9fd346fcc1122e6746600',
      flags: 'w',
      mode: 438,
      start: undefined,
      pos: undefined,
      bytesWritten: 13,
      _writableState: [WritableState],
      _events: [Object: null prototype],
      _eventsCount: 1,
      _maxListeners: undefined,
      [Symbol(kFs)]: [Object],
      [Symbol(kIsPerformingIO)]: false,
      [Symbol(kCapture)]: false
    },
    hash: null,
    [Symbol(kCapture)]: false
  }
}</code></pre>
<!-- /wp:code -->

Вы также заметите, что newFilename - это хэшированное значение. Это сделано для того, чтобы в случае загрузки двух файлов с одинаковыми именами вы не потеряли данные. Конечно, вы можете изменить способ записи файлов на диск.

Обратите внимание, что в стандартном приложении хорошо бы хранить часть этой информации в постоянном месте, например в базе данных, чтобы можно было легко найти все загруженные файлы. Но это не суть важно для данной статьи.

Сейчас я хочу исправить еще одну вещь. Я хочу обрабатывать с помощью formidable только запросы multipart/form-data. Все остальное может быть обработано встроенным парсером тела, подобным тому, что мы видели выше.

Поэтому я сначала создам переменную “body”, затем проверю заголовки запроса и присвою значение body на основе “Content-Type”. Я также переименую свою функцию в parseMultipartNodeRequest, чтобы более четко определить, что она делает.

Вот как все это выглядит (обратите внимание, что getRequestHeaders - это еще одна встроенная функция Nuxt):

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">import formidable from 'formidable';

/**
 * @see https://nuxt.com/docs/guide/concepts/server-engine
 * @see https://github.com/unjs/h3
 */
export default defineEventHandler(async (event) =&gt; {
  let body;
  const headers = getRequestHeaders(event);

  if (headers['content-type']?.includes('multipart/form-data')) {
    body = await parseMultipartNodeRequest(event.node.req);
  } else {
    body = await readBody(event);
  }
  console.log(body);

  return { ok: true };
});

/**
 * @param {import('http').IncomingMessage} req
 */
function parseMultipartNodeRequest(req) {
  return new Promise((resolve, reject) =&gt; {
    /** @see https://github.com/node-formidable/formidable/ */
    const form = formidable({ multiples: true })
    form.parse(req, (error, fields, files) =&gt; {
      if (error) {
        reject(error);
        return;
      }
      resolve({ ...fields, ...files });
    });
  });
}</code></pre>
<!-- /wp:code -->

Таким образом, мы получаем API, который достаточно надежен, чтобы принимать запросы в формате multipart/form-data, обычный текст или URL-код.

<h2 class="wp-block-heading" id="📯-📯-📯-завершающий-этап">📯📯📯 Завершающий этап</h2>

Здесь нет рожка эмодзи, поэтому придется обойтись этими. Мы рассказали довольно много, поэтому давайте сделаем небольшой обзор.

Когда мы загружаем файл с помощью запроса multipart/form-data, браузер отправляет данные по одному куску за раз, используя поток. Это происходит потому, что мы не можем поместить в объект запроса весь файл сразу.

В Node.js мы можем слушать событие “data” запроса, чтобы работать с каждым куском данных по мере их поступления. Это дает нам доступ к потоку запросов.

Хотя мы можем перехватить все эти данные и хранить их в памяти, это плохая идея. Загрузка большого файла может занять всю память сервера, что приведет к его аварийному завершению.

Вместо этого мы можем направить этот поток в другое место, чтобы каждый фрагмент принимался, обрабатывался, а затем освобождался из памяти. Один из вариантов - использовать fs.createWriteStream для создания WritableStream, который может записывать в файловую систему.

Вместо того чтобы писать собственный низкоуровневый синтаксический анализатор, мы должны использовать такой инструмент, как formidable. Но нам нужно убедиться, что данные поступают из запроса multipart/form-data. В противном случае мы можем использовать стандартный парсер тела.

Мы рассмотрели множество низкоуровневых концепций и остановились на высокоуровневом решении. Надеюсь, все это имеет смысл, и вы нашли это полезным.

Если у вас возникли вопросы или что-то было непонятно, пожалуйста, обращайтесь ко мне. Я всегда рад помочь.

Большое спасибо, что прочитали.
