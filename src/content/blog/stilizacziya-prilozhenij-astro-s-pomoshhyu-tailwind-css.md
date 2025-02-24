---
title: Стилизация приложений Astro с помощью Tailwind CSS
meta_title: Стилизация приложений Astro с помощью Tailwind CSS - Igor Gorlov
description: >-
  Tailwind CSS – это популярный CSS-фреймворк, который значительно облегчает
  работу разработчиков при создании пользовательских интерфейсов. Он позволяет
  разработчикам быстро и легко добавлять стили в свои приложения без написания
  большого количества CSS-кода. Эта статья научит вас использовать его
  преимущества в полной мере!
date: 2023-05-23T14:10:34.000Z
author: Igor Gorlov
image: ../../assets/images/undefined-May-23-2023.avif
categories:
  - Учебник
tags:
  - Astro
  - Tailwind
draft: false
lastmod: 2024-03-20T21:26:43.967Z
---

<!-- wp:quote -->
<blockquote class="wp-block-quote">
Tailwind CSS - это популярный CSS-фреймворк, который значительно облегчает работу разработчиков при создании пользовательских интерфейсов. Он позволяет разработчикам быстро и легко добавлять стили в свои приложения без написания большого количества CSS-кода. Эта статья научит вас использовать его преимущества в полной мере!
</blockquote>
<!-- /wp:quote -->

В этом руководстве мы рассмотрим, как установить и использовать Tailwind CSS с Astro, универсальным веб-фреймворком, который набирает популярность благодаря своей легкости и молниеносной скорости работы сайтов, ориентированных на контент. Он содержит необходимые строительные блоки, такие как полезные классы, режим JIT, API привязки прокрутки и многое другое, что позволяет разработчикам приступить к работе в считанные минуты. Кроме того, мы научимся делать API-запросы в Astro, создав демонстрационное приложение Astro, стилизация которого будет выполнена с помощью Tailwind CSS.

<h2 class="wp-block-heading">Зачем использовать Tailwind CSS?</h2>

Tailwind CSS ускоряет создание и сопровождение кода вашего приложения за счет использования служебных классов для регулирования padding, margin, color, font, shadow и других характеристик вашего приложения. Он помогает повысить эффективность работы команды, сокращая время на переключение между файлами и написание пользовательских классов CSS. Поскольку он поощряет единообразный подход, он также упрощает отладку наших стилей.

Он упрощает создание сложных отзывчивых макетов; благодаря использованию классов-утилит вы можете использовать любое количество точек останова для условного оживления дизайна без необходимости использования глобальных стилей.

Tailwind CSS очень легко настраивается. Он имеет встроенную конфигурацию по умолчанию, которую можно просто настроить, внеся изменения в файл tailwind.config.js. Его конфигурационный файл дает разработчикам доступ ко всему (включая цветовые схемы и таблицы стилей). Он также открывает мир возможностей для сторонних разработчиков, позволяя им расширять или добавлять пользовательские плагины.

<h2 class="wp-block-heading">Создание нового проекта Astro</h2>

Чтобы создать приложение Astro, выполните приведенную ниже команду в терминале:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">// NPM
npm create astro@latest

// YARN
yarn create astro</code></pre>
<!-- /wp:code -->

Эта команда проведет вас через все этапы создания нового проекта Astro. Вы можете выбрать один из различных официальных стартовых шаблонов или создать новый проект из существующего репозитория Astro GitHub, выполнив приведенную ниже команду:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">// NPM
npm create astro@latest -- --template &lt;github-username&gt;/&lt;github-repo&gt;
    
// YARN
yarn create astro --template &lt;github-username&gt;/&lt;github-repo&gt;</code></pre>
<!-- /wp:code -->

Примечание: вы также можете просмотреть их коллекцию тем и стартеров, чтобы найти темы для целевых страниц, блогов, портфолио и многого другого!

Если все прошло успешно и вам будет показано сообщение ”Готов к запуску!”, переместитесь в только что созданную папку проекта с помощью команды cd, чтобы начать использовать Astro:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">cd &lt;project name&gt;</code></pre>
<!-- /wp:code -->

Далее, чтобы увидеть ваш новый сайт в действии, выполните следующую команду в терминале:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">yarn run dev</code></pre>
<!-- /wp:code -->

Если на порту 3000 не запущено никакое другое приложение, приведенная выше команда запускает локальный сервер разработки.

Посетите сайт http://localhost:3000/, чтобы увидеть приложение в действии.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://blog.openreplay.com/images/styling-astro-apps-with-tailwind-css/images/qGMCSfH.png" alt="-"/></figure>
<!-- /wp:image -->

<h2 class="wp-block-heading">Интеграция Tailwind CSS в наше приложение Astro</h2>

Tailwind CSS хорошо работает с Astro, и его также легко интегрировать в ваше приложение. Чтобы интегрировать его в наш только что созданный проект Astro, выполните в терминале приведенную ниже команду:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">yarn astro add tailwind</code></pre>
<!-- /wp:code -->

Установка автоматизирована с помощью инструмента командной строки astro add. Приведенная выше команда создает файл конфигурации tailwind.config.cjs и автоматически устанавливает соответствующий пакет (@astrojs/tailwind) в вашем файле astro.config.mjs. Это позволит нам настроить Tailwind CSS в соответствии со стандартом.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  // ...
  integrations: [tailwind()],
});</code></pre>
<!-- /wp:code -->

Благодаря этому наши файлы .astro, React, Vue, Svelte и другие теперь могут использовать классы Tailwind CSS. Теперь давайте включим классы в теги h1 и span нашего файла pages/index.astro, чтобы проверить, что наша установка сработала, как ожидалось:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">&lt;h1 class="text-blue-600 bg-black tracking-tight"&gt;
  Welcome to
  &lt;span class="text-yellow-500"&gt;Astro&lt;/span&gt;
&lt;/h1&gt;</code></pre>
<!-- /wp:code -->

Теперь перезапустите сервер разработки, чтобы увидеть изменения.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://blog.openreplay.com/images/styling-astro-apps-with-tailwind-css/images/MkiL4Ar.png" alt="-"/></figure>
<!-- /wp:image -->

Кроме того, вы можете вручную добавить Tailwind CSS на свой сайт или приложение Astro, установив следующие зависимости:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">npm install @astrojs/tailwind tailwindcss</code></pre>
<!-- /wp:code -->

Затем интегрируйте Tailwind CSS в файл astro.config.\* с помощью свойства integrations:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  // ...
  integrations: [tailwind()],
});</code></pre>
<!-- /wp:code -->

<h2 class="wp-block-heading">Создание и стилизация нашего приложения Astro с помощью Tailwind CSS</h2>

В этом разделе мы создадим и оформим простое приложение Astro, которое выполнит вызов API к API Consumet и получит список самых популярных аниме. Мы оформим и отобразим результаты с помощью Tailwind CSS.

Consumet - это API поисковой системы для получения доступа к данным и ссылкам для многочисленных форм развлечений, включая фильмы, романы, аниме и другие медиа.

Наше конечное приложение должно выглядеть следующим образом:

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://blog.openreplay.com/images/styling-astro-apps-with-tailwind-css/images/5u2pnHE.png" alt="-"/></figure>
<!-- /wp:image -->

<h2 class="wp-block-heading">Создание макета</h2>

Мы будем использовать компонент Layout для создания раздела навигации. Он будет содержать логотип нашего приложения и поисковый ввод для целевой страницы нашего приложения. Внутри файла layouts/Layout.astro добавьте следующий код:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">--- 

export interface Props {
  title: string;
}
const { title } = Astro.props;
---</code></pre>
<!-- /wp:code -->

Объект Astro.props - это контейнер, в котором хранятся все значения, переданные компоненту в качестве атрибутов.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
  &lt;head&gt;
    &lt;meta charset="UTF-8" /&gt;
    &lt;meta name="viewport" content="width=device-width" /&gt;
    &lt;link rel="icon" type="image/svg+xml" href="/favicon.svg"/&gt;
    &lt;meta name="generator" content="{Astro.generator}" /&gt;
    &lt;title&gt;{title}&lt;/title&gt;
  &lt;/head&gt;
  &lt;body class="w-full"&gt;
    &lt;nav
      class="py-4 px-[200px] border-gray-200 bg-gradient-to-tr from-gray-700 via-gray-900 to-black"
    &gt;
      &lt;div class= "flex flex-wrap items-center justify-between mx-auto"&gt;
        &lt;a href="#" class="flex items-center"&gt;
          &lt;span class= "self-center text-xl font-semibold whitespace-nowrap text-white"
            &gt;Tailwind CSS Anime Hub&lt;/span
          &gt;
        &lt;/a&gt;
        &lt;div class= "hidden w-full md:block md:w-auto"&gt;
          &lt;input
            type= "search"
            id= "search"
            class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg"
            placeholder= "Search"
          /&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/nav&gt;
    &lt;slot /&gt;
  &lt;/body&gt;
&lt;/html&gt;</code></pre>
<!-- /wp:code -->

Имя класса <code>w-screen</code> устанавливает наше тело на 100vw. Мы добавили flex для установки логотипа и поля ввода рядом друг с другом.

<h2 class="wp-block-heading">Компонент Hero</h2>

Теперь давайте создадим наш компонент Hero и добавим к нему стили. В папке components создайте файл Hero.astro и приведенный ниже код:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">&lt;header class="bg-gradient-to-tr from-gray-700 via-gray-900 to-black w-full"&gt;
  &lt;div class="py-16 px-[200px] text-white"&gt;
    &lt;h1 class="text-4xl mb-4"&gt;Welcome to our Anime Hub&lt;/h1&gt;
    &lt;p&gt;
      It was built using API generated from
      &lt;a
        href="https://docs.consumet.org/"
        class="py-1 px-3 text-gray-700 bg-white rounded"
      &gt;
        Consumet
      &lt;/a&gt;
    &lt;/p&gt;
  &lt;/div&gt;
&lt;/header&gt;;</code></pre>
<!-- /wp:code -->

В приведенном выше коде мы добавили цвет фона для раздела Hero, используя следующие имена классов bg-gradient-to-tr, from-gray-700, via-gray-900, to-black, а также указали крупный шрифт text-4xl для тега h1 и padding top и bottom 4rem с помощью py-16 и padding left и right 200px с помощью px-[200px] для нашего div. Класс text-4xl увеличивает размер шрифта до 36px, text-white меняет цвет текста на белый, а py-16 добавляет отступ 64px сверху и снизу текста.

<h2 class="wp-block-heading">Создание нашего компонента Card</h2>

Далее мы создадим простой компонент Card, который будет содержать изображение обложки, название и URL аниме. Данные, отображаемые здесь, будут браться с индексной страницы. Теперь в папке components создайте файл Card.astro и добавьте в него приведенный ниже код:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">--- 

const { anime } = Astro.props;
---</code></pre>
<!-- /wp:code -->

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">&lt;a
  href={anime.url}
  class="group h-72 md:h-96 flex justify-end items-end bg-gray-100 overflow-hidden rounded-xl shadow-lg relative hover:shadow-xl"
&gt;
  &lt;figure class="w-full h-full flex object-cover object-center absolute inset-0 group-hover:scale-110 transition duration-200 text-transparent"&gt;
    &lt;img src={anime.image} alt={`${anime.title} cover image`} /&gt;
  &lt;/figure&gt;
  &lt;div class="bg-gradient-to-t from-black via-transparent to-transparent opacity-20 absolute inset-0 pointer-events-none group-hover:opacity-0 transition duration-200" /&gt;
  &lt;span class="inline-block text-gray-200 text-xs md:text-sm border border-gray-500 rounded-lg backdrop-blur relative px-2 md:px-3 py-1 mr-3 mb-3 group-hover:opacity-0 transition duration-200"&gt;
    {anime.title}
  &lt;/span&gt;
&lt;/a&gt;;</code></pre>
<!-- /wp:code -->

В приведенном выше блоке кода Astro позволяет нам писать код javascript и Typescript внутри блока ---. Он также позволяет нам использовать Astro.props для передачи данных по всему компоненту Astro. Затем мы оформили наше приложение с помощью классов Tailwind CSS. Мы использовали объекты cover и object-center, чтобы изображение обложки занимало всю ширину и высоту, указанные в теге a, и располагалось в центре. Мы добавили градиентный фон и использовали класс backdrop-blur, чтобы сделать фон хотя бы частично прозрачным и размытым. Префиксы sm, md, lg и xl используются для создания компонентов и макетов для разных размеров экрана.

<h2 class="wp-block-heading">Получение и упорядочивание данных</h2>

Теперь мы будем использовать нашу индексную страницу для получения аниме из Consumet, а затем создадим категории для их упорядочивания. Сначала импортируем наши компоненты и макет, добавив следующий блок кода в файл pages/index.astro:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">--- 

import Layout from "../layouts/Layout.astro";
import Card from "../components/Card.astro";
import Hero from "../components/Hero.astro";

const response = await fetch(
  "https://api.consumet.org/anime/gogoanime/top-airing"
);
const data = await response.json();
const animes = data.results;
---</code></pre>
<!-- /wp:code -->

На основе приведенного выше кода мы импортировали наши компоненты, а затем использовали функцию fetch(), чтобы сделать API-запрос к API Consumet. Метод fetch выполняется во время сборки, и компоненты получат доступ к данным для создания динамического HTML.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">&lt;Layout title= "Anime Hub."&gt;
  &lt;main&gt;
    &lt;Hero /&gt;
    &lt;ul
      role= "list"
      class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 xl:gap-8 max-w-screen-xl px-4 md:px-8 mx-auto"
    &gt;
      {animes.length ? (
        animes.map((anime) =&gt; &lt;Card anime="{anime}" /&gt;)
      ) : (
        &lt;p&gt;No anime at the moment&lt;/p&gt;
      )}
    &lt;/ul&gt;
  &lt;/main&gt;
&lt;/Layout&gt;;</code></pre>
<!-- /wp:code -->

Здесь мы обернули наш сайт с помощью компонента Layout. Мы используем теги ul для итерации данных из API и отображения их между компонентами Card. sm:grid-cols-3 устанавливает сетку в 3 колонки на маленьком экране, а lg:grid-cols-4 устанавливает сетку в 4 колонки на большом экране. На случай, если аниме не будет доступно из нашего API, мы также добавили уведомление. Несмотря на то, что это крайне маловероятно, это хорошая практика.

В итоге у нас получился симпатичный макет и анимация нашего сайта.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://blog.openreplay.com/images/styling-astro-apps-with-tailwind-css/images/owXkkSz.gif" alt="-"/></figure>
<!-- /wp:image -->

Хотя это приложение довольно простое, в Tailwind CSS есть множество различных классов, которые можно использовать, чтобы сделать его гораздо более сложным. Посетите официальную документацию для получения более подробной информации обо всех классах Tailwind CSS, которые предлагаются, и о том, как их использовать.

<h2 class="wp-block-heading">Заключение</h2>

В целом, Tailwind CSS - это мощный и гибкий инструмент, позволяющий легко добавлять стили в приложения Astro. Используя предоставляемые им классы, вы можете быстро и легко создать последовательный и отполированный внешний вид вашего приложения без необходимости писать много CSS самостоятельно. Его подход, основанный на практичности, возможности настройки, низкая специфичность и быстрая разработка делают его популярным выбором для создания современных и отзывчивых пользовательских интерфейсов.
