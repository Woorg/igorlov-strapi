---
title: Глубокое погружение в последние обновления и особенности Laravel
meta_title: Глубокое погружение в последние обновления и особенности Laravel - Igor Gorlov
description: >-
  Спустя более десяти лет после появления популярного фреймворка Laravel,
  задавались ли вы вопросом: Что еще Laravel может предложить
  PHP-разработчикам?.
date: 2023-01-30T17:12:15.000Z
author: Igor Gorlov
image: ../../assets/images/undefined-Jan-30-2023.avif
categories:
  - Учебник
tags:
  - Laravel
draft: false
lastmod: 2024-03-20T21:26:45.419Z
---

Спустя более десяти лет после появления популярного фреймворка Laravel, задавались ли вы вопросом: ”Что еще Laravel может предложить PHP-разработчикам?”.

Учитывая то, насколько он уже упростил разработку PHP как для начинающих, так и для профессиональных разработчиков, некоторые могут даже утверждать, что он испортил разработчикам веру в то, что PHP - самый простой язык программирования.

Так есть ли у Laravel еще сюрпризы в запасе для разработчиков Laravel? Или она исчерпала все возможные средства поддержки PHP-разработчиков?

По крайней мере, мы знаем, что Laravel 10 может многое предложить. Именно это мы и раскроем в этой статье, отправившись в путешествие по новым возможностям Laravel 10, исправлениям, а также свежеутраченным методам и пакетам.

<!-- wp:rank-math/toc-block {"title":"Оглавление","headings":[{"key":"44a7c64a-0998-495e-abe7-b780bbb3df33","content":"График выхода Laravel","level":2,"link":"#график-выхода-laravel","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"9c0c7fb7-288e-4ce2-bf1d-bce091d0fd81","content":"Стоит ли вам переходить на Laravel 10?","level":2,"link":"#стоит-ли-вам-переходить-на-laravel-10","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"5caa1e74-9135-4fd3-90c7-dddb866e8653","content":"Горячие обновления Laravel 10","level":2,"link":"#горячие-обновления-laravel-10","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"0891b3b4-d3ca-46f3-8b94-1509f5aa70a4","content":"Новые возможности и обновления в Laravel 10","level":3,"link":"#новые-возможности-и-обновления-в-laravel-10","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"59ea8877-d4b2-434c-a2fb-fa9f1476b350","content":"PHP 8.1: В основе Laravel 10","level":4,"link":"#php-8-1-в-основе-laravel-10","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"43abd7e2-fa37-42d1-858f-72d483c25683","content":"Поддержка PHP 8.2","level":4,"link":"#поддержка-php-8-2","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"a28e5bc1-ae7f-489c-9049-9ab1759b0077","content":"Обновление стартовых комплектов Laravel","level":4,"link":"#обновление-стартовых-комплектов-laravel","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"10986ac7-92dc-4487-832f-6d4dba66e8ff","content":"Обновление версии Predis","level":4,"link":"#обновление-версии-predis","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"2cf3fb21-afc9-4345-b412-34ddcc0677ea","content":"Декларации нативных типов","level":4,"link":"#декларации-нативных-типов","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"b05bf5e9-f9f7-4466-8f04-60f7361ec583","content":"Все правила валидации вызываются по умолчанию","level":4,"link":"#все-правила-валидации-вызываются-по-умолчанию","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"db0e80a3-3a75-4ba5-994b-0725aceb94fc","content":"Поддержка модификации нативных колонок","level":4,"link":"#поддержка-модификации-нативных-колонок","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"0b29fc3c-e1e5-4963-b8c6-4985d3398cd7","content":"Тип колонки Нативное извлечение","level":4,"link":"#тип-колонки-нативное-извлечение","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"2b066437-67f4-4b24-a2f0-447d0bb001dd","content":"Более быстрый алгоритм хэширования","level":4,"link":"#более-быстрый-алгоритм-хэширования","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"65995ab7-4df4-451e-a6ee-7e1727f82069","content":"Поддержка метода whereExists() для Eloquent Builder","level":4,"link":"#поддержка-метода-where-exists-для-eloquent-builder","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"eb45bc3a-5ce5-4735-9cc3-cb2c2a9049b6","content":"Оптимизация загрузки","level":4,"link":"#оптимизация-загрузки","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"0c6a82de-5afd-40cf-b1c4-04b564ed1d69","content":"Устаревшие методы и пакеты в Laravel 10","level":3,"link":"#устаревшие-методы-и-пакеты-в-laravel-10","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"7565d898-bed2-4918-940b-95778399a35b","content":"Laravel 10 попрощается с PHP 8.0","level":4,"link":"#laravel-10-попрощается-с-php-8-0","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"9af4b038-d484-4e24-95ee-ddf981a64a33","content":"Удаление устаревших методов","level":4,"link":"#удаление-устаревших-методов","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"52f99061-3184-43c1-9a53-5c3ace310669","content":"Как установить Laravel 10","level":2,"link":"#как-установить-laravel-10","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"08fba12d-42db-4120-89f3-c643ae407a7d","content":"Как обновить проект до Laravel 10","level":2,"link":"#как-обновить-проект-до-laravel-10","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"1fd44ee4-9f4b-4a7e-8d31-ce536c8a6e5f","content":"Как развернуть проект Laravel 10","level":2,"link":"#как-развернуть-проект-laravel-10","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"1e614591-13c8-421b-a8d3-82de890ec885","content":"Как внести вклад в Laravel 10","level":2,"link":"#как-внести-вклад-в-laravel-10","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"13573e54-f892-4557-979d-5287754e8529","content":"Конкурс по поиску ошибок в Laravel 10","level":3,"link":"#конкурс-по-поиску-ошибок-в-laravel-10","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"aee1e6bc-65fd-4730-acb2-71d3d202d0d0","content":"Резюме","level":2,"link":"#резюме","disable":false,"isUpdated":false,"isGeneratedLink":true}],"listStyle":"ul"} -->
<div class="wp-block-rank-math-toc-block" id="rank-math-toc"><h2>Оглавление</h2><nav><ul><li class=""><a href="#график-выхода-laravel">График выхода Laravel</a></li><li class=""><a href="#стоит-ли-вам-переходить-на-laravel-10">Стоит ли вам переходить на Laravel 10?</a></li><li class=""><a href="#горячие-обновления-laravel-10">Горячие обновления Laravel 10</a><ul><li class=""><a href="#новые-возможности-и-обновления-в-laravel-10">Новые возможности и обновления в Laravel 10</a><ul><li class=""><a href="#php-8-1-в-основе-laravel-10">PHP 8.1: В основе Laravel 10</a></li><li class=""><a href="#поддержка-php-8-2">Поддержка PHP 8.2</a></li><li class=""><a href="#обновление-стартовых-комплектов-laravel">Обновление стартовых комплектов Laravel</a></li><li class=""><a href="#обновление-версии-predis">Обновление версии Predis</a></li><li class=""><a href="#декларации-нативных-типов">Декларации нативных типов</a></li><li class=""><a href="#все-правила-валидации-вызываются-по-умолчанию">Все правила валидации вызываются по умолчанию</a></li><li class=""><a href="#поддержка-модификации-нативных-колонок">Поддержка модификации нативных колонок</a></li><li class=""><a href="#тип-колонки-нативное-извлечение">Тип колонки Нативное извлечение</a></li><li class=""><a href="#более-быстрый-алгоритм-хэширования">Более быстрый алгоритм хэширования</a></li><li class=""><a href="#поддержка-метода-where-exists-для-eloquent-builder">Поддержка метода whereExists() для Eloquent Builder</a></li><li class=""><a href="#оптимизация-загрузки">Оптимизация загрузки</a></li></ul></li><li class=""><a href="#устаревшие-методы-и-пакеты-в-laravel-10">Устаревшие методы и пакеты в Laravel 10</a><ul><li class=""><a href="#laravel-10-попрощается-с-php-8-0">Laravel 10 попрощается с PHP 8.0</a></li><li class=""><a href="#удаление-устаревших-методов">Удаление устаревших методов</a></li></ul></li></ul></li><li class=""><a href="#как-установить-laravel-10">Как установить Laravel 10</a></li><li class=""><a href="#как-обновить-проект-до-laravel-10">Как обновить проект до Laravel 10</a></li><li class=""><a href="#как-развернуть-проект-laravel-10">Как развернуть проект Laravel 10</a></li><li class=""><a href="#как-внести-вклад-в-laravel-10">Как внести вклад в Laravel 10</a><ul><li class=""><a href="#конкурс-по-поиску-ошибок-в-laravel-10">Конкурс по поиску ошибок в Laravel 10</a></li></ul></li><li class=""><a href="#резюме">Резюме</a></li></ul></nav></div>
<!-- /wp:rank-math/toc-block -->

<h2 class="wp-block-heading" id="график-выхода-laravel">График выхода Laravel</h2>

Раньше основная команда Laravel выпускала две основные версии в год - по одной каждые шесть месяцев.

Однако цикл выпуска был изменен, когда Тейлор Отвелл, создатель Laravel, объявил, что теперь каждый год будет выпускаться одна основная версия. Это позволило основной команде и сообществу уделять больше времени и усилий конкретной версии фреймворка и внедрять новые мощные функции без внесения каких-либо ломающих изменений.

Поскольку Laravel 9 выйдет 8 февраля 2022 года, ожидаемый график выпуска выглядит следующим образом:

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li><strong>Laravel 10</strong>: 7 февраля 2023 года</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Laravel 11</strong>: 6 февраля 2024 года</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

Кроме того, согласно политике поддержки, исправления ошибок предлагаются в течение 18 месяцев, а обновления безопасности - в течение двух лет для всех версий Laravel.

Ниже приведен график ожидаемых исправлений ошибок и обновлений безопасности:

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Laravel 9 будет продолжать получать исправления ошибок до 8 августа 2023 года и исправления безопасности до 6 февраля 2024 года.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Laravel 10 будет получать исправления ошибок до 6 августа 2024 года и исправления безопасности до 4 февраля 2025 года.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Ожидается, что Laravel 11 будет получать исправления ошибок до 4 августа 2025 года и исправления безопасности до 2 февраля 2026 года.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<kinsta-advanced-cta language="en_US" type-int-post="144748" type-int-position="0"></kinsta-advanced-cta>

<h2 class="wp-block-heading" id="стоит-ли-вам-переходить-на-laravel-10">Стоит ли вам переходить на Laravel 10?</h2>

Важно помнить, что нам не всегда нужно обновлять версию Laravel для нашего приложения до последней версии, как только выходит новая версия.

Laravel - это фреймворк с открытым исходным кодом, что означает, что каждый раз, когда мы устанавливаем новый экземпляр Laravel на нашу машину, мы становимся владельцами кодовой базы фреймворка. Это означает, что даже если версия фреймворка, которую использует наше приложение, больше не поддерживается, приложение все равно будет работать; нам просто придется поддерживать его самостоятельно.

В результате широко распространено мнение, что стабильность приложения должна быть приоритетнее обновления фреймворка.

Короче говоря, вам следует рассмотреть возможность перехода на Laravel 10, если:

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Приложение стабильно в своей текущей версии и функционирует без проблем.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Новая версия либо добавляет функцию, которая необходима вашему приложению, либо устраняет проблему, с которой сталкивается ваше приложение.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Приложение будет хорошо протестировано, прежде чем изменения в обновлении будут запущены в производство.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>into production.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<h2 class="wp-block-heading" id="горячие-обновления-laravel-10">Горячие обновления Laravel 10</h2>

<!-- wp:image {"id":144753} -->
<figure class="wp-block-image" id="attachment_144753"><img src="https://kinsta.com/wp-content/uploads/2023/01/laravel-10-banner-1024x576.png" alt="Логотип Laravel 10" class="wp-image-144753"/><figcaption class="wp-element-caption">Изображение логотипа Laravel 10.</figcaption></figure>
<!-- /wp:image -->

Как вы уже знаете, Laravel 10 еще не выпущен. Однако мы будем постоянно обновлять эту статью свежей информацией об ожидаемом релизе. Поэтому мы рекомендуем сохранить эту страницу в закладках и время от времени заглядывать на нее.

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="новые-возможности-и-обновления-в-laravel-10">Новые возможности и обновления в Laravel 10</h3>

Несомненно, самая захватывающая часть любого нового релиза - это добавление новых функций. Поэтому без лишних слов давайте начнем с обзора новых возможностей и обновлений в Laravel 10.

<!-- wp:heading {"level":4} -->
<h4 class="wp-block-heading" id="php-8-1-в-основе-laravel-10">PHP 8.1: В основе Laravel 10</h4>

PHP 8.1 - это минимально необходимая версия PHP в Laravel 10. Судя по сравнению ветки Laravel 9 и основной ветки фреймворка на GitHub, некоторые функции PHP 8.1, такие как свойства readonly и array_is_list, будут представлены в Laravel 10.

<!-- wp:heading {"level":4} -->
<h4 class="wp-block-heading" id="поддержка-php-8-2">Поддержка PHP 8.2</h4>

PHP 8.2 был выпущен 8 декабря 2022 года, всего за два месяца до даты выхода Laravel 10. Тем не менее, это не должно останавливать вас от использования возможностей PHP 8.2, поскольку, не делая ничего лишнего, Laravel 10 будет готов к PHP 8.2.

На самом деле, вся экосистема Laravel, включая Forge, Vapor и Envoyer, поддерживает PHP 8.2, и вы даже можете использовать PHP 8.2 в Laravel 9. Как это круто!

<!-- wp:heading {"level":4} -->
<h4 class="wp-block-heading" id="обновление-стартовых-комплектов-laravel">Обновление стартовых комплектов Laravel</h4>

Laravel Breeze и Jetstream готовы к использованию Laravel 10 после его выхода. Кроме того, они уже обновлены до Inertiajs 1, а JetStream ждет сюрприз - полная поддержка темного режима.

<!-- wp:heading {"level":4} -->
<h4 class="wp-block-heading" id="обновление-версии-predis">Обновление версии Predis</h4>

Predis - это надежный клиент Redis для PHP, который может помочь вам получить максимальную отдачу от кэширования для обеспечения фантастического пользовательского опыта. Раньше Laravel поддерживал обе версии 1 и 2, но начиная с Laravel 10, фреймворк больше не поддерживает Predis 1.

Хотя в документации Laravel упоминается Predis как пакет для взаимодействия с Redis, вы также можете использовать официальное расширение PHP. Это расширение предоставляет API для взаимодействия с серверами Redis.

<!-- wp:heading {"level":4} -->
<h4 class="wp-block-heading" id="декларации-нативных-типов">Декларации нативных типов</h4>

Раньше Laravel использовал DocBlocks в своем скелетном коде, чтобы уточнить, что делает тот или иной фрагмент кода и какие параметры или ответы следует ожидать. Однако благодаря нативным объявлениям типов в Laravel 10 это изменится.

Лучше всего объяснить это изменение на простом примере. Вместо того чтобы функция выглядела следующим образом:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="php" class="language-php">/**
* Determine whether the user can create models.
*
* @param  \{{ namespacedUserModel }}  $user
* @return \Illuminate\Auth\Access\Response|bool
*/
public function create({{ user }} $user)
{
    //
}</code></pre>
<!-- /wp:code -->

…вместо этого будет выглядеть так:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="php" class="language-php">/**
* Determine whether the user can create models.
*/
public function create({{ user }} $user): bool
{
    //
}</code></pre>
<!-- /wp:code -->

Это изменение сделано исключительно для удобства разработчиков, так как IDE будут знать форму ожидаемого параметра и ответа. Это обеспечит лучшую ясность типов, когда это невозможно через родные типы PHP. Следовательно, это поможет редакторам кода лучше работать с функциями автозаполнения.

<!-- wp:heading {"level":4} -->
<h4 class="wp-block-heading" id="все-правила-валидации-вызываются-по-умолчанию">Все правила валидации вызываются по умолчанию</h4>

Если бы вы хотели создать invokable правило валидации в Laravel 9, вам нужно было бы добавить флаг --invokable после команды artisan. Теперь в этом нет необходимости, так как все правила Laravel 10 по умолчанию являются вызываемыми. Итак, вы можете выполнить следующую команду для создания нового правила с возможностью вызова в Laravel 10:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">php artisan make:rule CustomRule</code></pre>
<!-- /wp:code -->

<!-- wp:heading {"level":4} -->
<h4 class="wp-block-heading" id="поддержка-модификации-нативных-колонок">Поддержка модификации нативных колонок</h4>

В попытке устранить необходимость использования пакета doctrine/dbal при использовании change() для изменения колонок, в Laravel 10 появится новая возможность. Эта возможность позволит разработчикам использовать метод change() и изменять столбцы в MySQL, PostgreSQL и SQL Server без необходимости использования дополнительных пакетов. Это значительное и рискованное изменение, но мы считаем, что оно того стоит, поскольку устранит необходимость в дополнительном пакете.

Чтобы лучше понять новую функцию, смотрите пример ниже:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="php" class="language-php">$table
-&gt;integer('user_balance')
-&gt;unsigned()
-&gt;default(0)
-&gt;comment('balance'); 
// `user_balance` is an integer, unsigned, defaults to '0', and column comment is 'balance'</code></pre>
<!-- /wp:code -->

Итак, мы предполагаем, что у нас есть колонка user_balance и мы хотим изменить ее тип. Начиная с Laravel 10 мы можем просто сделать это:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="php" class="language-php">$table
-&gt;bigInteger('user_balance')
-&gt;change(); 
// This will change `user_balance` to bigInteger instead of just integer</code></pre>
<!-- /wp:code -->

Приведенный выше код успешно изменит тип столбца, но при этом выпадут атрибуты UNSIGNED, DEFAULT и COMMENT. Поэтому важно помнить о добавлении всех атрибутов при изменении типа столбца:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="php" class="language-php">$table
-&gt;bigInteger('user_balance')
-&gt;unsigned()
-&gt;default(0)
-&gt;comment('balance')
-&gt;change();</code></pre>
<!-- /wp:code -->

В случае, если у вас несколько соединений с базами данных и вы уже установили doctrine/dbal, рекомендуется вызвать метод Schema::useNativeSchemaOperationsIfPossible() в методе boot в App\Providers\AppServiceProvider, чтобы иметь возможность использовать родные операции схемы и использовать родные операции, прежде чем полагаться на пакет (SQLite, например, еще не поддерживает это):

<!-- wp:code -->
<pre class="wp-block-code"><code lang="php" class="language-php">use IlluminateSupportFacadesSchema;
 
class AppServiceProvider extends ServiceProvider
{
    public function boot()
    {
        Schema::useNativeSchemaOperationsIfPossible();
    }
}</code></pre>
<!-- /wp:code -->

<!-- wp:heading {"level":4} -->
<h4 class="wp-block-heading" id="тип-колонки-нативное-извлечение">Тип колонки Нативное извлечение</h4>

Еще одной примечательной особенностью Laravel 10 является возможность использовать метод Schema::getColumnType без необходимости полагаться на пакет doctrine/dbal. В настоящее время мы используем Schema::getColumnType с doctrine/dbal для получения типа колонки. doctrine/dbal сопоставляет каждый собственный тип колонки с эквивалентным ему типом doctrine/dbal, и он не поддерживает многие типы колонок, используемые Laravel в различных базах данных.

С другой стороны, в Laravel 10 новый метод Schema::getColumnType будет возвращать реальный тип колонки, а не его эквивалент в doctrine/dbal. Это также позволит вам писать интеграционные тесты для новой встроенной функции модификации столбцов. Вы можете использовать эту функцию для получения либо имени типа данных, либо полного определения типа указанного столбца:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="php" class="language-php">Schema::getColumnType('products', 'price'); // decimal</code></pre>
<!-- /wp:code -->

<!-- wp:heading {"level":4} -->
<h4 class="wp-block-heading" id="более-быстрый-алгоритм-хэширования">Более быстрый алгоритм хэширования</h4>

xxHash - это невероятно быстрый алгоритм хэширования. Он отличается большой случайностью и дисперсией вывода, а также уникальностью для уменьшения коллизий. Поскольку PHP 8.1 обеспечивает поддержку xxh128, а Laravel 10 работает на PHP 8.1, наличие такого надежного хэш-алгоритма в Laravel 10 является идеальным.

Стоит отметить, что Тейлор подчеркнул во время рассмотрения этого изменения, что некоторые пакеты сторонних разработчиков могут полагаться на то, что имена файлов будут иметь точный формат хэша SHA-1, который является алгоритмом, используемым Laravel для хэширования. Поэтому, если вы планируете обновление до Laravel 10, было бы разумно дважды проверить это в любых сторонних пакетах, которые вы используете в своем приложении.

<!-- wp:heading {"level":4} -->
<h4 class="wp-block-heading" id="поддержка-метода-where-exists-для-eloquent-builder">Поддержка метода whereExists() для Eloquent Builder</h4>

В настоящее время использование whereExists() требует настройки вложенного запроса с помощью закрытия. К счастью, в Laravel 10 появилась возможность включать Eloquent Builder в качестве вложенного запроса. Это позволяет использовать пользовательские методы построителя, области действия модели и так далее.

Например, мы обычно делаем это, если хотим использовать whereExists():

<!-- wp:code -->
<pre class="wp-block-code"><code lang="php" class="language-php">Order::whereExists(function ($query) {
    $query-&gt;from('products')-&gt;whereColumn('products.order_id', 'orders.id');
});</code></pre>
<!-- /wp:code -->

В Laravel 10 мы можем сделать именно это:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="php" class="language-php">Order::whereExists(
    Product::whereColumn('products.order_id', 'orders.id')
);</code></pre>
<!-- /wp:code -->

<!-- wp:heading {"level":4} -->
<h4 class="wp-block-heading" id="оптимизация-загрузки">Оптимизация загрузки</h4>

Одной из интересных новых возможностей Laravel 10 является оптимизация нетерпеливой загрузки, когда нет ни одного ключа, который необходимо загрузить. Это изменение является скорее исправлением, чем функцией, поскольку оно решает текущую проблему, при которой нетерпеливая загрузка отношений приводит к выполнению большого количества невозможных запросов.

В настоящее время при нетерпеливой загрузке отношений, у которых нет ключей для загрузки, Laravel все равно выполнит запрос, подобный этому select \* from `table_name` where 0 = 1. Однако новое обновление Laravel 10 проверяет, есть ли ключи в наличии, и если нет, предоставляет пустую коллекцию, устраняя необходимость в ненужных запросах к базе данных.

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="устаревшие-методы-и-пакеты-в-laravel-10">Устаревшие методы и пакеты в Laravel 10</h3>

<!-- wp:heading {"level":4} -->
<h4 class="wp-block-heading" id="laravel-10-попрощается-с-php-8-0">Laravel 10 попрощается с PHP 8.0</h4>

Фреймворк Laravel откажется от поддержки PHP 8.0 в Laravel 10. Следовательно, если вы планируете обновить свое приложение до Laravel 10, вам необходимо сначала обновить версию PHP до PHP 8.1 или PHP 8.2.

<!-- wp:heading {"level":4} -->
<h4 class="wp-block-heading" id="удаление-устаревших-методов">Удаление устаревших методов</h4>

Мы видим, что команда разработчиков ядра Laravel удаляет устаревшие методы Laravel 9 из ветки Laravel 10. Мы прогнозируем, что команда обновит руководство по обновлению документации, чтобы включить все устаревшие методы и пакеты, как только выйдет Laravel 10.

Если вы собираетесь перевести текущий проект на Laravel 10, любой код, использующий устаревший метод, должен быть переписан в новом подходе для достижения того же результата.

Здесь приведен список всех исправлений и исключений, которые мы обнаружили при сравнении Laravel 9 с основной веткой:

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Метод Route::home (устарел в Laravel 9)</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Устаревшие функции и методы вокруг dispatchNow. Это сделано для того, чтобы побудить разработчиков использовать dispatchSync, который является единственным поддерживаемым способом немедленной отправки.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>getBaseQuery, поскольку у него есть эквивалент toBase.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Класс MaintenanceModeException, который больше не используется.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>черта MocksApplicationServices</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Метод Mail::failures подделки почты</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Устаревшее свойство $dates, вместо него рекомендуется использовать $casts</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Метод assertTimesSent()</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Прекращена поддержка Predis 1 и doctrine/dbal 2</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Все связанные устаревания в doctrine/dbal после того, как Laravel прекратил поддержку версии 2</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<h2 class="wp-block-heading" id="как-установить-laravel-10">Как установить Laravel 10</h2>

Laravel 10 уже доступен для ознакомления и тестирования его возможностей. Флаг -dev в программе установки Laravel устанавливает мастер-ветку из репозитория laravel/laravel. Все, что вам нужно будет сделать, это выполнить эту команду в терминале:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">laravel new example-kinsta-app --dev</code></pre>
<!-- /wp:code -->

Или, если вы предпочитаете использовать Composer:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">composer create-project --prefer-dist laravel/laravel example-kinsta-app dev-master</code></pre>
<!-- /wp:code -->

Чтобы лучше понять команду Composer, вот краткое объяснение:

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li><strong>laravel/laravel</strong>: Пакет для установки Laravel</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>example-kinsta-app</strong>: Новый каталог для вашего нового проекта (может быть изменен)</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>dev-master</strong>: Следующая версия Laravel (в данном случае Laravel 10)</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

После установки Laravel 10 вы можете подтвердить версию, перейдя в новый каталог example-kinsta-app и выполнив команду artisan:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">$ php artisan --version
Laravel Framework 10.x-dev</code></pre>
<!-- /wp:code -->

<h2 class="wp-block-heading" id="как-обновить-проект-до-laravel-10">Как обновить проект до Laravel 10</h2>

У вас есть соблазн перейти на Laravel 10? Основная команда Laravel упорно трудится над документацией, чтобы предоставить беспроблемное и понятное руководство по обновлению, охватывающее все возможные изменения. Не стесняйтесь ознакомиться с руководством по обновлению Laravel 10, поскольку некоторая информация о процессе обновления доступна уже сейчас.

Вам также следует следить за Laravel Shift после выхода Laravel 10. Он предлагает простой и автоматизированный подход к обновлению вашей версии Laravel.

В дополнение к документации Laravel и Laravel Shift мы в Kinsta опубликуем полное руководство по обновлению с реальными примерами. Поэтому не забудьте сохранить эту страницу в закладках и вернуться к ней после выхода Laravel 10.

<h2 class="wp-block-heading" id="как-развернуть-проект-laravel-10">Как развернуть проект Laravel 10</h2>

Развертывание Laravel 10 не должно сильно отличаться от развертывания проекта Laravel 9. Вот каковы, по нашему мнению, могут быть требования к серверу:

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>PHP &gt;= 8.1</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>BCMath PHP Extension</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Ctype PHP Extension</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>cURL PHP Extension</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>DOM PHP Extension</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Fileinfo PHP Extension</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>JSON PHP Extension</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Mbstring PHP Extension</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>OpenSSL PHP Extension</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>PCRE PHP Extension</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>PDO PHP Extension</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Tokenizer PHP Extension</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>XML PHP Extension</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

Вы можете развернуть и разместить свой проект Laravel 10 на Kinsta в считанные минуты, поскольку Laravel является одним из длинного списка поддерживаемых фреймворков для размещаемых приложений.

<h2 class="wp-block-heading" id="как-внести-вклад-в-laravel-10">Как внести вклад в Laravel 10</h2>

Хотя Laravel поддерживается основной командой, его активно развивают более 3 000 добровольных участников.

Хотите ли вы стать одним из них и помочь сформировать будущее Laravel? Если вы ответили ”да”, вы сможете помочь разработчикам по всему миру, добавив новую функцию, исправив ошибку или даже переписав запутанную часть документации.

Чтобы внести свой вклад в Laravel 10, вот что вам нужно сделать:

<!-- wp:list {"ordered":true} -->
<ol><!-- wp:list-item -->
<li>Зайдите в репозиторий Laravel на GitHub и проверьте запросы на доработку, помеченные в заголовке [10.x]. Это даст вам четкое представление обо всех запросах на доработку для Laravel 10. Если один из PR касается вклада, который вы собирались внести, посмотрите, можете ли вы его улучшить.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Если запланированный вами вклад еще не был рассмотрен кем-то другим, то вы можете создать PR самостоятельно.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Не все стоит добавлять в кодовую базу фреймворка. Поэтому старайтесь вносить только те улучшения, которые будет легко поддерживать в будущем и которые помогут большинству членов сообщества Laravel.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Соблюдайте рекомендации Laravel по внесению вкладов, чтобы ваши изменения были внесены в фреймворк.</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

Еще одна причина полюбить Laravel 10 - это возможность выиграть деньги за свой вклад с помощью охоты на ошибки! Мы рассмотрим их далее.

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="конкурс-по-поиску-ошибок-в-laravel-10">Конкурс по поиску ошибок в Laravel 10</h3>

<!-- wp:image {"id":144782} -->
<figure class="wp-block-image" id="attachment_144782"><img src="https://kinsta.com/wp-content/uploads/2023/01/laravel-10-bug-contest-1024x576.png" alt="Конкурс по поиску ошибок в Laravel 10" class="wp-image-144782"/><figcaption class="wp-element-caption">Конкурс по поиску ошибок в Laravel 10.</figcaption></figure>
<!-- /wp:image -->

Laravel 10 объявил замечательный конкурс, в котором случайный участник имеет шанс выиграть 1000 долларов.

Это будет первый конкурс такого рода в истории Laravel. Он был разработан, чтобы поощрить сообщество к поиску и исправлению скрытых ошибок в Laravel 10.

Правила конкурса просты:

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>К рассмотрению принимаются только PR, отправленные в ветку 10.x репозитория laravel/framework.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Будут рассматриваться только "настоящие" исправления ошибок. Новые функции, рефакторинг и исправление опечаток не рассматриваются.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Каждое исправление должно быть подкреплено тестом.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Принятые исправления будут отмечены на GitHub, а в конце конкурса будет объявлен случайный победитель.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

Конкурс завершится, когда будет выпущена первая стабильная версия Laravel 10. Любые запросы на исправление, которые к тому времени еще не будут рассмотрены или будут поданы после выхода Laravel 10, не будут участвовать в конкурсе.

<h2 class="wp-block-heading" id="резюме">Резюме</h2>

Это еще не все для этой статьи! Вплоть до даты релиза будут происходить новые изменения. Но на данный момент Laravel 10 выглядит чрезвычайно многообещающим, и мы с нетерпением ждем возможности рассказать обо всех тех дарах, которые он принесет в мир PHP.
