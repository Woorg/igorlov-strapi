---
title: Как реализовать функцию поиска с автозаполнением в Laravel
meta_title: Как реализовать функцию поиска с автозаполнением в Laravel - Igor Gorlov
description: >-
  Laravel – это популярный PHP-фреймворк с открытым исходным кодом, который
  широко используется для создания веб-приложений. Он предоставляет множество
  возможностей и функций, которые делают веб-разработку проще и быстрее. Одной
  из таких функций является поиск Typeahead, также известный как автозаполнение.
date: 2023-02-25T16:33:01.000Z
author: Igor Gorlov
image: ../../assets/images/undefined-Feb-25-2023.avif
categories:
  - Как закодить
tags:
  - Laravel
  - Php
draft: false
lastmod: 2024-03-20T21:26:44.231Z
---

Laravel - это популярный PHP-фреймворк с открытым исходным кодом, который широко используется для создания веб-приложений. Он предоставляет множество возможностей и функций, которые делают веб-разработку проще и быстрее. Одной из таких функций является поиск Typeahead, также известный как автозаполнение.

Авто заполняемый поиск — это функция, которая помогает пользователям найти нужный контент, предлагая возможные варианты по мере ввода текста. Это полезный инструмент, который может сделать процесс поиска более интуитивным и удобным для пользователей. В этой статье мы рассмотрим, как реализовать поиск Typeahead в Laravel.

<h2 class="wp-block-heading">Требования:</h2>

Прежде чем мы начнем, убедитесь, что у вас установлен проект Laravel. Если у вас его нет, вы можете следовать руководству по установке Laravel. Вам также необходимо иметь базовые знания HTML, CSS, JavaScript и PHP.

<h2 class="wp-block-heading">Реализация поиска Typeahead в Laravel</h2>

Чтобы реализовать поиск Typeahead в Laravel, нам нужно создать форму поиска и контроллер для обработки поисковых запросов. Мы также будем использовать библиотеку Typeahead для отображения поисковых предложений.

<h2 class="wp-block-heading">Шаг 1: Установка библиотеки Typeahead</h2>

Чтобы установить библиотеку Typeahead, мы можем воспользоваться менеджером пакетов, например npm. Откройте терминал и перейдите в каталог проекта Laravel. Выполните следующую команду для установки плагина jQuery Typeahead:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">npm install jquery-typeahead
</code></pre>
<!-- /wp:code -->

<h2 class="wp-block-heading">Шаг 2: Создание формы поиска</h2>

Для создания формы поиска мы будем использовать элемент формы HTML. Откройте файл resources/views/welcome.blade.php и добавьте следующий код:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="markup" class="language-markup">&lt;head&gt;
    //......

    &lt;link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-typeahead/2.11.2/jquery.typeahead.css"
        integrity="sha512-zPDjm5fHC6JUi5jEnhJetvp1zLvc1Dd5TuMFQQtqRH0KpOzrng4vHiFu2Eva+Xgu7umz0lqGHkmGjUYdeSW54w=="
        crossorigin="anonymous" referrerpolicy="no-referrer" /&gt;
    &lt;script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-typeahead/2.11.2/jquery.typeahead.js"
        integrity="sha512-8+3AF+qMeZ3HSeKKru1YD5pFbXnIxUvMH1UsK8sKbHwbj5ZixBtDP+8oMMkBeaZc8TIIOjHnxN++zCPhHWCrMQ=="
        crossorigin="anonymous" referrerpolicy="no-referrer"&gt;&lt;/script&gt;
&lt;/head&gt;
&lt;body&gt;
  // .....

  &lt;form action="{{ url('search') }}" method="GET"&gt;
     &lt;div class="typeahead__container"&gt;
          &lt;div class="typeahead__field"&gt;
               &lt;div class="typeahead__query"&gt;
                    &lt;input class="typeahead"
                                 name="query"
                                 autocomplete="off"&gt;
                &lt;/div&gt;
                &lt;div class="typeahead__button"&gt;
                     &lt;button type="submit"&gt;
                             &lt;span class="typeahead__search-icon"&gt;&lt;/span&gt;
                     &lt;/button&gt;
                &lt;/div&gt;
           &lt;/div&gt;
     &lt;/div&gt;
  &lt;/form&gt;

  //....

  @vite(['resources/js/app.js'])

&lt;/body&gt;
</code></pre>
<!-- /wp:code -->

В приведенном выше коде мы создали форму с полем ввода текста и кнопкой отправки. Поле ввода имеет класс typeahead, который мы будем использовать в следующем шаге для инициализации библиотеки Typeahead.

<h2 class="wp-block-heading">Шаг 3: Инициализация библиотеки Typeahead</h2>

Для инициализации библиотеки Typeahead мы будем использовать код JavaScript. Откройте файл public/js/app.js и добавьте следующий код:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">import $ from "jquery";
import "jquery-typeahead";

$(function () {
    $.typeahead({
        input: ".typeahead",
        hint:true,
        minLength:2,// default
        source: {
            groupName: {
                // Ajax Request
                ajax:  function (query) {
                    return {
                        type: "GET",
                        url: "/search/suggestions",
                        data: {
                            query: "{{query}}"
                        },
                        callback: {
                            done: function (data) {
                                return data;
                            }
                        }
                    }
                }
            }
        }
    });
});
</code></pre>
<!-- /wp:code -->

В приведенном выше коде мы использовали функцию jQuery $(function () {}), чтобы убедиться, что библиотека Typeahead инициализируется после загрузки страницы. Мы также использовали функцию $.typeahead() для инициализации библиотеки Typeahead на поле ввода текста с классом typeahead.В функцию typeahead мы также передали объект с некоторыми опциями конфигурации. Опции следующие:

hint: Этот параметр имеет значение true, поэтому если в списке результатов есть элемент, начинающийся с запроса пользователя, появится текст с предложением, а нажатие стрелки вправо в конце текста ввода поиска приведет к автозаполнению запроса с предложенной подсказкой.

Выделение: Этот параметр устанавливается в true, чтобы выделить совпадающую часть предложения.

minLength: Этот параметр задает минимальное количество символов, которое необходимо набрать, прежде чем начнут появляться предложения.

source : Опция source соответствует набору(ам) данных, которые Typeahead будет просматривать для поиска совпадений со строкой запроса пользователя. Внутри source вы можете иметь несколько списков данных (групп). Вы можете настроить source.group:

ajax : Эта функция выполняет AJAX-запрос к конечной точке /search/suggestions с запросом для получения предложений.

<h2 class="wp-block-heading">Шаг 4: Создание контроллера</h2>

Для обработки поисковых запросов нам необходимо создать контроллер. Выполните следующую команду для создания контроллера:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">php artisan make:controller SearchController
</code></pre>
<!-- /wp:code -->

Эта команда создаст класс SearchController в каталоге app/Http/Controllers. Откройте файл app/Http/Controllers/SearchController.php и добавьте следующий код:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="php" class="language-php">&lt;?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class SearchController extends Controller
{
    public function index(Request $request)
    {
        $query = $request-&gt;input('query');
        $products = Product::where('name', 'like', "%$query%")-&gt;get();

        return view('search', compact('products'));
    }

    public function suggestions(Request $request)
    {
        $query = $request-&gt;input('query');
        $suggestions = Product::where('name', 'like', "%$query%")-&gt;pluck('name');

        return response()-&gt;json($suggestions);
    }
}
</code></pre>
<!-- /wp:code -->

Мы рассматриваем модель Product (использованную в предыдущем блоге). Вы можете использовать любую другую модель по своему усмотрению.

В приведенном выше коде мы создали два метода в классе SearchController. Метод index обрабатывает поисковые запросы и извлекает продукты с названиями, которые соответствуют запросу. Метод suggestions возвращает предложения для поиска Typeahead.

<h2 class="wp-block-heading">Шаг 5: Создание маршрутов</h2>

Чтобы связать форму поиска с классом SearchController, нам нужно создать маршруты. Откройте файл routes/web.php и добавьте следующий код:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="php" class="language-php">Route::get("https://dev.to/", function () {
    return view('welcome');
});
Route::get('search', [SearchController::class,'index']);
Route::get('search/suggestions', [SearchController::class,'suggestions']);
</code></pre>
<!-- /wp:code -->

В приведенном выше коде мы создали два маршрута. Первый маршрут привязывает конечную точку / к главному представлению. Второй маршрут связывает конечную точку поиска с методом index класса SearchController. Третий маршрут связывает конечную точку поиска/предложений с методом suggestions класса SearchController.

<h2 class="wp-block-heading">Шаг 6: Создание представления</h2>

Для отображения результатов поиска нам необходимо создать представление. Создайте новый файл resources/views/search.blade.php и добавьте в него следующий код:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="markup" class="language-markup">&lt;table class="table"&gt;
    &lt;thead&gt;
        &lt;tr&gt;
            &lt;th&gt;ID&lt;/th&gt;
            &lt;th&gt;Name&lt;/th&gt;
            &lt;th&gt;Price&lt;/th&gt;
        &lt;/tr&gt;
    &lt;/thead&gt;
    &lt;tbody&gt;
        @foreach ($products as $product)
            &lt;tr&gt;
                &lt;td&gt;{{ $product-&gt;id }}&lt;/td&gt;
                &lt;td&gt;{{ $product-&gt;name }}&lt;/td&gt;
                &lt;td&gt;{{ $product-&gt;price }}&lt;/td&gt;
            &lt;/tr&gt;
        @endforeach
    &lt;/tbody&gt;
&lt;/table&gt;
</code></pre>
<!-- /wp:code -->

В приведенном выше коде мы создали таблицу для отображения результатов поиска. Переменная $products содержит результаты поиска, которые передаются из класса SearchController. Цикл @foreach итерирует массив $products и отображает информацию о продукте в таблице.

<h2 class="wp-block-heading">Шаг 7: Тестирование приложения</h2>

Наконец, мы готовы протестировать приложение. Запустите сервер разработки, выполнив следующую команду:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">php artisan serve</code></pre>
<!-- /wp:code -->

Откройте веб-браузер и перейдите на сайт http://localhost:8000. Вы увидите форму поиска Typeahead. Начните вводить текст в форму поиска, и вы увидите предложения, которые появятся под полем ввода. Выберите предложение, и вы будете перенаправлены на страницу результатов поиска, где будут показаны подходящие товары.

<h2 class="wp-block-heading">Заключение</h2>

В этом руководстве мы узнали, как реализовать функцию поиска Typeahead в Laravel. Мы использовали плагин jQuery Typeahead и создали форму поиска, контроллер, маршруты и представление для обработки поисковых запросов и отображения результатов. Следуя шагам этого руководства, вы сможете реализовать функцию поиска Typeahead в своих приложениях Laravel.
