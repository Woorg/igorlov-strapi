---
title: Использование Elm в Web Worker
meta_title: Использование Elm в Web Worker - Igor Gorlov
description: >-
  Язык программирования Elm – это отличный способ моделирования и написания
  современных веб-приложений. Используя функциональное программирование и
  сильную систему типов, Elm побуждает разработчиков создавать более надежные и
  легко поддерживаемые приложения.
date: 2023-02-26T17:14:37.000Z
author: Igor Gorlov
image: ../../assets/images/undefined-Feb-26-2023.avif
categories:
  - Учебник
tags:
  - Elm
draft: false
lastmod: 2024-03-20T21:26:46.348Z
---

Язык программирования Elm - это отличный способ моделирования и написания современных веб-приложений. Используя функциональное программирование и сильную систему типов, Elm побуждает разработчиков создавать более надежные и легко поддерживаемые приложения. Однако, будучи языком, компилируемым в Javascript, Elm может предложить не так много по умолчанию. Любые задачи, требующие больших вычислений в Javascript, к сожалению, потребуют таких же вычислений и в Elm. Такие большие задачи могут блокировать основной поток в браузерах, вызывая визуальные проблемы и неотзывчивый пользовательский интерфейс. Очевидно, что это не то, чего мы хотим для наших пользователей, так что же мы можем сделать?

Вводим Web Workers. Из MDN:

Web Workers позволяет выполнять операции сценария в фоновом потоке, отдельном от основного потока выполнения веб-приложения. Преимуществом этого является то, что трудоемкая обработка может быть выполнена в отдельном потоке, позволяя основному потоку (обычно UI) работать без блокировки/замедления.

Web Workers - это способ, с помощью которого браузерные приложения могут перенести определенные задачи из основного потока в свою собственную среду. Web Workers имеют ряд ограничений, например, они не могут получить доступ к DOM, но у них есть возможность делать HTTP-запросы через fetch, а также выполнять стандартный код Javascript. Поскольку Elm является компилируемым в JS языком, это означает, что мы можем смонтировать Elm приложение в Web Worker!

Давайте рассмотрим, как будет выглядеть использование Elm внутри Web Worker. Мы рассмотрим два способа сделать это:

Используя ванильный JS, без каких-либо бандлеров или фреймворков, помимо тех, что предоставляет Elm.Использование этих методов в Vite, который предоставляет полезную обертку вокруг Web Worker API.

<!-- wp:rank-math/toc-block {"title":"Оглавление","headings":[{"key":"18a90d96-3d72-44c8-ae1f-fec3e972c1ff","content":"Написание модулей Elm","level":2,"link":"#написание-модулей-elm","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"ca49c1cd-028a-47a9-acbd-6647c145826d","content":"Scaffold index.html","level":2,"link":"#scaffold-index-html","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"98934510-e73a-4582-ac0e-e9746798420e","content":"Добавление Web Worker","level":2,"link":"#добавление-web-worker","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"e982571f-325d-42c2-b0a5-59dc43a15a03","content":"Отправка сообщения","level":3,"link":"#отправка-сообщения","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"84202846-b273-4235-b87f-67a8941adce5","content":"Веб-рабочие в Vite","level":2,"link":"#веб-рабочие-в-vite","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"80db4078-6e0d-430e-89cc-1541e7eab24e","content":"Заключение","level":2,"link":"#заключение","disable":false,"isUpdated":false,"isGeneratedLink":true}],"listStyle":"ul"} -->
<div class="wp-block-rank-math-toc-block" id="rank-math-toc"><h2>Оглавление</h2><nav><ul><li class=""><a href="#написание-модулей-elm">Написание модулей Elm</a></li><li class=""><a href="#scaffold-index-html">Scaffold index.html</a></li><li class=""><a href="#добавление-web-worker">Добавление Web Worker</a><ul><li class=""><a href="#отправка-сообщения">Отправка сообщения</a></li></ul></li><li class=""><a href="#веб-рабочие-в-vite">Веб-рабочие в Vite</a></li><li class=""><a href="#заключение">Заключение</a></li></ul></nav></div>
<!-- /wp:rank-math/toc-block -->

<h2 class="wp-block-heading" id="написание-модулей-elm">Написание модулей Elm</h2>

Для начала давайте создадим базовую установку для работы. В новой папке запустите elm init, который создаст наш базовый файл elm.json и папку src. Внутри src создайте два файла: Main.elm и Worker.elm. Мы заполним их в ближайшее время. Также создадим index.html в корне нашего рабочего направления (мы вернемся к нему позже).

Сначала создадим очень простой файл Main.elm. Хотя Web Workers в первую очередь полезны для больших задач, в данном примере мы будем придерживаться простоты. В нашем главном файле мы реализуем базовый пример счетчика:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">port module Main exposing (main)

import Browser
import Html exposing (Html, button, div, text)
import Html.Events exposing (onClick)


init : (Int, Cmd msg)
init =
    ( 0, Cmd.none )


type Msg
    = Increment
    | Decrement
    | Set Int


update : Msg -&gt; Int -&gt; ( Int, Cmd Msg )
update msg model =
    case msg of
        Increment -&gt;
            ( model, increment model )

        Decrement -&gt;
            ( model, decrement model )

        Set value -&gt;
            ( value, Cmd.none )


view : Int -&gt; Html Msg
view model =
    div []
        [ button [ onClick Decrement ] [ text "-" ]
        , div [] [ text (String.fromInt model) ]
        , button [ onClick Increment ] [ text "+" ]
        ]


subscriptions : Int -&gt; Sub Msg
subscriptions _ =
    receiveCount Set


main : Program () Int Msg
main =
    Browser.element { init = \_ -&gt; init, update = update, view = view, subscriptions = subscriptions }


port increment : Int -&gt; Cmd msg


port decrement : Int -&gt; Cmd msg


port receiveCount : (Int -&gt; msg) -&gt; Sub msg

</code></pre>
<!-- /wp:code -->

Это довольно простое приложение Elm, но с одним ключевым отличием: вместо обновления состояния здесь, мы возвращаем команду для передачи текущего состояния в порт. У нас также есть порт для получения числа, которое затем обновляет наше локальное состояние.

Поскольку мы собираемся обрабатывать эти очень сложные вычисления в Web Worker, давайте напишем базовый модуль Elm для запуска из Worker.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">port module Worker exposing (main)

import Platform


type Msg
    = Increment Int
    | Decrement Int


init : () -&gt; ( (), Cmd msg )
init _ =
    ( (), Cmd.none )


update : Msg -&gt; () -&gt; ( (), Cmd msg )
update msg _ =
    case msg of
        Increment int -&gt;
            ( (), sendCount (int + 1) )

        Decrement int -&gt;
            ( (), sendCount (int - 1) )


subscriptions : () -&gt; Sub Msg
subscriptions _ =
    Sub.batch
        [ increment Increment
        , decrement Decrement
        ]


main : Program () () Msg
main =
    Platform.worker { init = init, update = update, subscriptions = subscriptions }


port increment : (Int -&gt; msg) -&gt; Sub msg


port decrement : (Int -&gt; msg) -&gt; Sub msg


port sendCount : Int -&gt; Cmd msg
</code></pre>
<!-- /wp:code -->

Что здесь происходит? Во-первых, мы импортируем Platform, которая предоставляет нам функцию Platform.worker. В большинстве случаев, когда мы пишем приложения на Elm, мы опираемся на elm/Browser для создания приложений, которые привязываются к DOM. Но в данном случае у нас нет DOM для привязки, поэтому мы используем Platform для создания базового приложения, которое этого не делает. worker принимает три входа: init, update и подписки (это практически то же самое, что и Browser.element из нашего примера Main.elm).

Мы также создаем два порта для увеличения и уменьшения входных данных (невероятно трудоемкое вычисление даже для современного Javascript) и соединяем их с эквивалентными значениями Msg. В функции update мы отправляем результаты в sendCount, которая выводит нас из Elm на дикий запад Javascript.

Концептуально это выглядит следующим образом:

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Main получает сообщение (Increment)</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>В функции обновления Main мы отправляем текущий счетчик в соответствующий порт (инкремент 0).</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Это значение отправляется (через Javascript) из Main в Worker и подключается к соответствующему порту (также инкремент 0).</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Worker посылает результат своего интенсивного подсчета (sendCount 1).</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Main получает обновленное значение и соответствующим образом обновляет свою модель (receiveCount 1).</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

Если вы знакомы с архитектурой The Elm, то это практически то же самое, но с большим количеством шагов. Также важно отметить, что поскольку мы полагаемся на порты для связи между приложениями Main и Worker, эти вычисления по своей сути асинхронны. Это действительно идеально подходит только для определенных рабочих нагрузок и, вероятно, не должно использоваться 100% времени (особенно для небольших задач, таких как сложение/вычитание).

<h2 class="wp-block-heading" id="scaffold-index-html">Scaffold index.html</h2>

Теперь, когда мы рассмотрели код Elm, давайте посмотрим на Javascript. Поскольку мы используем ванильный JS, а не бандлер, нам сначала нужно собрать наш код Elm. Выполните следующую команду:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">elm make src/Main.elm --output main.js
elm make src/Worker.elm --output elm-worker.js</code></pre>
<!-- /wp:code -->

Это выведет наши файлы main.js и worker.js, которые мы можем импортировать в наш HTML. Кстати говоря, давайте сделаем это! Вот базовый HTML-файл для начала. Все, что он делает, это монтирует наше главное приложение, а к рабочему мы перейдем через некоторое время.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="markup" class="language-markup">&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
  &lt;head&gt;
    &lt;title&gt;Elm Web Workers&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;div id="app"&gt;
      &lt;div&gt;&lt;/div&gt;
    &lt;/div&gt;
    &lt;script src="main.js"&gt;&lt;/script&gt;
    &lt;script&gt;
      const app = Elm.Main.init({
        node: document.getElementById('app')
      });
    &lt;/script&gt;
  &lt;/body&gt;
&lt;/html&gt;
</code></pre>
<!-- /wp:code -->

Если вы откроете HTML-файл в браузере прямо сейчас, он должен правильно отобразить приложение Main, но кнопки, похоже, ничего не делают. Это происходит потому, что вместо обновления нашей модели они отправляют ее в порты. В настоящее время мы ничего не делаем с нашими портами, но прежде чем мы их подключим, давайте добавим нашего Web Worker.

<h2 class="wp-block-heading" id="добавление-web-worker">Добавление Web Worker</h2>

В этом разделе я буду ссылаться на отличное руководство MDN по использованию Web Worker.

Чтобы создать веб-рабочего, нам нужно иметь внешний JS-файл, который может быть импортирован и выполнен как веб-рабочий. Самой простой реализацией рабочего может быть простой console.log. Давайте сначала сделаем это.

Создайте файл worker.js и поместите в него console.log(“Hello, worker!”). Затем в нашем HTML-файле добавьте этот код в верхнюю часть блока сценария:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">const worker = new Worker('worker.js')

const app = Elm.Main.init({
    node: document.getElementById('app')
});</code></pre>
<!-- /wp:code -->

Это указывает браузеру создать рабочего, используя файл Javascript, который находится в указанном месте (в нашем случае worker.js). Если вы откроете свой devtools, то увидите там “Hello, worker!”, сгенерированный из worker.js:1. Отлично!

Теперь давайте добавим некоторое взаимодействие между рабочим и основным JS файлами.

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="отправка-сообщения">Отправка сообщения</h3>

В вашем HTML-файле добавим еще одну строку кода, которая позволит отправить сообщение рабочему. Чтобы отправить сообщение из main в worker, мы используем worker.postMessage().

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">const worker = new Worker('worker.js')

const app = Elm.Main.init({
    node: document.getElementById('app')
});

worker.postMessage(1)
</code></pre>
<!-- /wp:code -->

Чтобы получить сообщение в рабочем, мы задаем onmessage (не переменную) как функцию, которая получает функцию. Удалите содержимое вашего файла worker.js и добавьте следующее:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">onmessage = function ({ data }) {
  console.log(data);
}
</code></pre>
<!-- /wp:code -->

Как и во всех событиях Javascript, существует ряд других значений, передаваемых в функцию onmessage. В рамках данной статьи мы рассмотрим только ключ data. Если вы запустите этот скрипт, то в консоли вы должны увидеть 1. Поздравляем, теперь мы можем передавать данные рабочему! Но как насчет передачи данных в Elm?

Web Workers предоставляют специальный API для импорта скриптов в них:

Рабочие потоки имеют доступ к глобальной функции importScripts(), которая позволяет импортировать скрипты. Она принимает ноль или более URI в качестве параметров ресурсов для импорта.

Используя importScripts(), мы можем импортировать наш рабочий модуль Elm, инициализировать его и начать использовать его порты. Давайте обновим наш worker.js следующим образом:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">importScripts("elm-worker.js")

const app = Elm.Worker.init();

onmessage = function ({ data }) {
  app.ports.increment.send(data);
};

app.ports.sendCount.subscribe(function(int) {
  console.log(int);
})</code></pre>
<!-- /wp:code -->

Для тех, кто менее знаком с Elm, мы инициализируем наш рабочий Elm без узла DOM (потому что в рабочем нет узлов DOM). Затем, используя его порты, когда мы получаем сообщение от главного потока, мы отправляем его в порт increment. Затем Elm выполняет свои невероятно сложные вычисления и возвращает (через порт sendCount) обновленное целое число (которое мы пока записываем в журнал). Отлично!

Прежде чем мы пойдем дальше, давайте обновим main и worker, чтобы они правильно использовали порты инкремента или декремента. В файле index.html обновите блок сценария следующим образом:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">const worker = new Worker('worker.js');
const app = Elm.Main.init({
    node: document.getElementById('app')
});

app.ports.increment.subscribe(int =&gt; worker.postMessage({
    type: 'increment',
    value: int
}))

app.ports.decrement.subscribe(int =&gt; worker.postMessage({
    type: 'decrement',
    value: int
}))</code></pre>
<!-- /wp:code -->

Затем в нашем рабочем обновите его до следующего:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">importScripts("elm-worker.js");

const app = Elm.Worker.init();

onmessage = function ({ data }) {
  const { type, value } = data;

  if (type === "increment") {
    app.ports.increment.send(value);
  }

  if (type === "decrement") {
    app.ports.decrement.send(value);
  }
};

app.ports.sendCount.subscribe(function (int) {
  console.log(int);
});</code></pre>
<!-- /wp:code -->

Если вы обновите страницу, то теперь можете начать нажимать на кнопки и видеть журнал результатов в консоли. Конечно, он покажет только 1 или -1, поэтому давайте передадим данные обратно в основной поток.

У Web Workers есть глобальная функция postMessage, которая позволяет нам передавать данные обратно. Давайте завершим этот код и отправим вычисленный результат в главный поток (и наше приложение Main Elm):

В файле worker.js сделайте следующее:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">importScripts("elm-worker.js");

const app = Elm.Worker.init();

onmessage = function ({ data }) {
  const { type, value } = data;

  if (type === "increment") {
    app.ports.increment.send(value);
  }

  if (type === "decrement") {
    app.ports.decrement.send(value);
  }
};

app.ports.sendCount.subscribe(function (int) {
  console.log(int);
  postMessage(int);
});</code></pre>
<!-- /wp:code -->

В файле index.html обновите блок скриптов:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">const worker = new Worker('worker.js');
const app = Elm.Main.init({
    node: document.getElementById('app')
});

app.ports.increment.subscribe(int =&gt; worker.postMessage({
    type: 'increment',
    value: int
}))

app.ports.decrement.subscribe(int =&gt; worker.postMessage({
    type: 'decrement',
    value: int
}))

worker.onmessage = function( { data }) {
    app.ports.receiveCount.send(data);
}</code></pre>
<!-- /wp:code -->

И с этим мы передаем данные! Поздравляем! Если вам нужно передавать какие-либо сложные данные между основным и рабочим потоками, вам, вероятно, придется обратиться к кодированию/декодированию JSON. При необходимости вы также можете передавать объект с пользовательским сообщением, а не использовать несколько портов и полагаться на Javascript в качестве контроллера.

Вот репозиторий с кодом, который мы рассматривали.

<h2 class="wp-block-heading" id="веб-рабочие-в-vite">Веб-рабочие в Vite</h2>

Использование ванильного HTML и JS - это хорошо, но чаще всего на работе или в больших проектах мы используем какие-то инструменты для сборки, чтобы получить более оптимизированный опыт. Лично я являюсь большим поклонником Vite, инструментального решения для фронтенда от создателя Vue. Я поддерживаю шаблон Vite для создания приложений Elm, в котором используется отличный плагин Elm для Vite для достижения горячей перезагрузки модулей и прямого импорта наших файлов .elm в наш Javascript.

В качестве дополнительного преимущества для нашего случая использования, Vite обеспечивает некоторую абстракцию над Web Worker API, который мы рассмотрели выше. В Vite, когда мы импортируем скрипт, который хотим использовать в качестве веб-рабочего, мы можем добавить параметр запроса, который сигнализирует Vite, что это такое, а затем Vite обернет его в функцию, которая сгенерирует правильную команду рабочего.

Давайте перенесем наш вышеприведенный код в Vite и посмотрим, как это работает. Я буду использовать свой шаблон для создания базового приложения. Чтобы сделать это самостоятельно, выполните следующую команду:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">npx degit lindsaykwardell/vite-elm-template vite-elm-web-worker
cd vite-elm-web-worker
npm install</code></pre>
<!-- /wp:code -->

Это позволит клонировать шаблон локально (без истории Git) в папку vite-elm-web-worker, ввести его и установить необходимые зависимости. Не стесняйтесь переименовать его в то, что вам больше нравится. Затем удалите содержимое папки src и замените его файлами Main.elm и Worker.elm. На этом этапе у вас должна быть установка, которая выглядит следующим образом:

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://lindsaykwardell.com/blog/elm-web-worker-vite-1.png" alt="Дерево файлов в VS Code, показывающее, что папка src содержит два файла: Main.elm и Worker.elm"/></figure>
<!-- /wp:image -->

Далее, давайте перенесем наш worker.js и другие Javascript. Начнем с создания файла worker.js (мы вернемся к нему через некоторое время), а затем обновим наш файл main.js, чтобы включить в него логику рабочего и порта:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">import "./style.css";
import { Elm } from "./src/Main.elm";
import ElmWorker from "./worker?worker";

const root = document.querySelector("#app div");

const worker = new ElmWorker();
const app = Elm.Main.init({ node: root });

app.ports.increment.subscribe((int) =&gt;
  worker.postMessage({
    type: "increment",
    value: int,
  })
);

app.ports.decrement.subscribe((int) =&gt;
  worker.postMessage({
    type: "decrement",
    value: int,
  })
);

worker.onmessage = function ({ data }) {
  app.ports.receiveCount.send(data);
};
</code></pre>
<!-- /wp:code -->

Это должно выглядеть очень похоже на то, что мы делали, но с некоторым дополнительным синтаксисом импорта в верхней части. Это потому, что мы используем Vite, а Vite поддерживает ES-модули по умолчанию во время разработки. Вместо того чтобы включать несколько тегов скриптов (что все еще возможно), мы можем импортировать один ES-модуль (main.js) и импортировать в него другие файлы.

Для рабочего скрипта будет работать большая часть кода, который мы написали ранее, но Vite предоставляет некоторый дополнительный сахар поверх API:

Рабочий скрипт также может использовать операторы импорта вместо importScripts() - обратите внимание, что во время разработки это зависит от нативной поддержки браузера и в настоящее время работает только в Chrome, но в производственной сборке это скомпилировано.

Таким образом, вместо использования importScripts() Vite требует, чтобы мы использовали стандартный синтаксис импорта ES-модуля. Однако здесь возникает проблема: Elm не компилирует по умолчанию в формат, который хорошо работает с ES-модулями. Кроме того, плагин Vite для Elm предполагает, что вы создаете приложение на основе браузера (разумное предположение), и внедряет некоторые помощники по устранению неполадок на основе DOM, которые не работают в рабочем, поскольку рабочий не имеет доступа к DOM.

Например, предположим, что мы обновили наш worker, чтобы использовать синтаксис импорта ES, как показано ниже:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">import { Elm } from './src/Worker.elm'

const app = Elm.Worker.init();

onmessage = function ({ data }) {
  const { type, value } = data;

  if (type === "increment") {
    app.ports.increment.send(value);
  }

  if (type === "decrement") {
    app.ports.decrement.send(value);
  }
};

app.ports.sendCount.subscribe(function (int) {
  console.log(int);
  postMessage(int);
});</code></pre>
<!-- /wp:code -->

Если вы запустите среду разработки сейчас (с помощью npm run dev), вы сразу же увидите ошибку в консоли браузера:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">Uncaught ReferenceError: HTMLElement is not defined</code></pre>
<!-- /wp:code -->

Эту ошибку выдает файл overlay.ts. Этот файл добавляет наложение ошибки, когда Elm не может правильно скомпилироваться. Поэтому если вы работаете в файле Main.elm и вносите изменения, которые не компилируются, вы увидите нечто подобное:

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://lindsaykwardell.com/blog/elm-web-worker-vite-2.png" alt="Ошибка в браузере, предупреждающая о том, что тип &quot;In&quot; не может быть найден."/></figure>
<!-- /wp:image -->

Довольно полезно при разработке приложения, но очень раздражает при попытке загрузить Elm в веб-рабочем. Существует параметр, который можно установить в конфигурации Vite (server.hmr.overlay: false), чтобы отключить наложение, но, к сожалению, он не предотвращает ссылки на HTMLElement в Worker.

Второй подход может заключаться в предварительной компиляции нашего файла Worker.elm и импорте его непосредственно в файл worker.js (как мы делали в нашем примере с ванильным JS). Однако это приводит к тихой ошибке; приложение загрузится без каких-либо очевидных сбоев, но рабочий не будет инициализирован. Попробуйте! Запустите elm make src/Worker.elm --output elm-worker.js, затем обновите файл worker.js до следующего вида:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">import { Elm } from './elm-worker.js'

console.log("I'm here!")

const app = Elm.Worker.init();

onmessage = function ({ data }) {
  const { type, value } = data;

  if (type === "increment") {
    app.ports.increment.send(value);
  }

  if (type === "decrement") {
    app.ports.decrement.send(value);
  }
};

app.ports.sendCount.subscribe(function (int) {
  console.log(int);
  postMessage(int);
});</code></pre>
<!-- /wp:code -->

Если вы снова запустите приложение, вы заметите, что наш console.log даже не запускается. Это потому, что веб-рабочий так и не был инициализирован, что очень нежелательно для наших сложных вычислений.

Каково же решение? На данный момент лучшее решение, которое я нашел, это создать отдельную точку входа для Vite, импортировать туда Worker.elm и скомпилировать его с Vite. Это выполнит преобразование, необходимое нам в Elm, чтобы позволить импорт в Worker.

В папке src создайте файл elm-worker.js и поместите в него следующее:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">import { Elm } from "./Worker.elm";

const app = Elm.Worker.init();

export default app;</code></pre>
<!-- /wp:code -->

Это очень простой файл, все, что он делает, это импортирует наш файл Worker.elm, инициализирует приложение и экспортирует его. Теперь нам нужно скомпилировать этот файл с помощью Vite. На корневом уровне нашего приложения создайте файл worker.config.js. Это будет специальный конфигурационный файл Vite, который мы будем использовать только для компиляции elm-worker.js. Вот хорошая конфигурация для начала:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">import { defineConfig } from "vite";
import elmPlugin from "vite-plugin-elm";
const path = require("path");

export default defineConfig({
  publicDir: false,
  plugins: [elmPlugin()],
  build: {
    outDir: "./elm-worker",
    sourcemap: false,
    lib: {
      entry: path.resolve(__dirname, "./src/elm-worker.js"),
      name: "elm-worker",
      fileName: (format) =&gt; `elm-worker.${format}.js`,
    },
  },
});
</code></pre>
<!-- /wp:code -->

Эта конфигурация указывает, что нас интересует только elm-worker.js, не импортируя никаких других файлов (таких как общая папка), и чтобы эти файлы собирались в папке elm-worker. По умолчанию Vite компилирует как ESM, так и UMD форматы; это, вероятно, не очень полезно для нашего случая, но это не является большой проблемой.

Установив наш конфиг, выполните следующую команду:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">npx vite build --config worker.config.js</code></pre>
<!-- /wp:code -->

Это даст команду Vite выполнить команду сборки, используя наш новый файл конфигурации вместо файла по умолчанию. После завершения сборки вы должны увидеть новую папку elm-worker с двумя файлами внутри: elm-worker.es.js и elm-worker.umd.js.

С нашим новым скомпилированным ES-совместимым файлом в руках мы можем теперь, наконец, импортировать наш Elm worker в наш файл web worker, и все будет работать, как ожидалось. Обновите наш файл worker.js (в корне нашего приложения) до следующего:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">import app from './elm-worker/elm-worker.es.js'

onmessage = function ({ data }) {
  const { type, value } = data;

  if (type === "increment") {
    app.ports.increment.send(value);
  }

  if (type === "decrement") {
    app.ports.decrement.send(value);
  }
};

app.ports.sendCount.subscribe(function (int) {
  console.log(int);
  postMessage(int);
});
</code></pre>
<!-- /wp:code -->

Если теперь вы запустите npm run dev и начнете нажимать на кнопки плюс и минус, вы должны увидеть, как меняется значение, отображаемое на экране. Поздравляем! Теперь у нас есть веб-рабочий, выполняющий Elm внутри Vite!

Это ни в коем случае не простое решение, но оно, по крайней мере, работает, и позволяет нам использовать другие преимущества использования такого инструмента разработки фронтенда, как Vite. Чтобы упростить дальнейшую работу, вы можете добавить в package.json пользовательский скрипт (что-то вроде build:worker) для запуска команды сборки нашего рабочего, и вы даже можете добавить его в наш dev-скрипт, чтобы он запускался каждый раз, поддерживая синхронизацию нашего веб-рабочего с остальным приложением.

Вот репозиторий с нашим рабочим кодом Vite.

<h2 class="wp-block-heading" id="заключение">Заключение</h2>

Очевидно, что базовое сложение и вычитание не стоит дополнительных накладных расходов на использование веб-рабочих. Задачи, требующие больших вычислений (либо сложные вычисления, либо просто разбор большого количества данных), идеально подходят для этой ситуации. В одном из проектов, где я использовал веб-работника, требовалось потенциально обработать более 2 мегабайт данных, что при выполнении в основном потоке приводило к зависанию всего приложения. Перемещение того же вычисления в веб-рабочего не ускорило его, но позволило пользовательскому интерфейсу (и CSS) продолжать работать на полной скорости. Вот веб-работник из побочного проекта, если вам интересно!

Также, если вы беспокоитесь, Web Workers поддерживаются во всех современных браузерах, начиная с IE10, так что не стесняйтесь использовать их в своих новых проектах!

Мне не терпится увидеть, что вы создадите с помощью веб-компонентов!

<!-- wp:acf/acf-donate {"id":"block_64678dc93985f","name":"acf/acf-donate","data":{"title":"Задонатить на поддержку!","_title":"field_646b621e8617c","list_0_name":"Donatepay","_list_0_name":"field_646b623e8617e","list_0_url":"https://new.donatepay.ru/@1117856","_list_0_url":"field_646b62528617f","list_0_address":"","_list_0_address":"field_646b625d86180","list_1_name":"Donationalerts","_list_1_name":"field_646b623e8617e","list_1_url":"https://www.donationalerts.com/c/woorg_","_list_1_url":"field_646b62528617f","list_1_address":"","_list_1_address":"field_646b625d86180","list_2_name":"USDT (TRC20)","_list_2_name":"field_646b623e8617e","list_2_url":"","_list_2_url":"field_646b62528617f","list_2_address":"TR121HxpTDF71TMm9idZkBaZxnjSMcCPWj","_list_2_address":"field_646b625d86180","list_3_name":"ETH","_list_3_name":"field_646b623e8617e","list_3_url":"","_list_3_url":"field_646b62528617f","list_3_address":"0x442721192987047eDeEC69Ca1D4c706f9Adb16B3","_list_3_address":"field_646b625d86180","list_4_name":"BTC","_list_4_name":"field_646b623e8617e","list_4_url":"","_list_4_url":"field_646b62528617f","list_4_address":"36dLKv5uRozphSQa55w2XgsF42AugPu2QT","_list_4_address":"field_646b625d86180","list":5,"_list":"field_646b62308617d"},"align":"","mode":"edit"} /-->
