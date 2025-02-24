---
title: Создание карт React Native с помощью Mapbox
meta_title: Создание карт React Native с помощью Mapbox - Фул Фронт Дев
description: >-
  В современном цифровом мире карты стали неотъемлемой частью мобильных
  приложений. Интеграция карт в приложение, будь то навигация, определение
  местоположения...
date: 2023-08-19T16:15:00.000Z
image: ../../assets/images/undefined-Aug-19-2023.avif
categories:
  - Учебник
author: Igor Gorlov
tags:
  - React Native
  - Mapbox
draft: false
lastmod: 2024-03-20T21:26:45.026Z
---

В современном цифровом мире карты стали неотъемлемой частью мобильных приложений. Интеграция карт в приложение, будь то навигация, определение местоположения близлежащих объектов или предоставление услуг на основе местоположения, может значительно повысить удобство работы пользователя. React Native, популярный фреймворк для создания кроссплатформенных мобильных приложений, предоставляет возможность создания интерактивных карт с использованием различных картографических платформ. В этой статье мы расскажем о том, как создать карту в приложении React Native с помощью библиотеки Mapbox.

Mapbox - популярная картографическая платформа, предлагающая разработчикам мощные инструменты и сервисы. Благодаря обширному набору API и SDK Mapbox позволяет разработчикам создавать потрясающие и многофункциональные карты в своих React Native-приложениях. От отображения вида карты до интеграции местоположения пользователя и добавления пользовательских маркеров - Mapbox предоставляет все инструменты для создания захватывающего и интересного картографического опыта.

В этой статье мы рассмотрим шаги, необходимые для настройки Mapbox в проекте, отображения вида карты, получения местоположения пользователя и добавления пользовательских маркеров для расширения функциональности карты.

<!-- wp:rank-math/toc-block {"title":"Оглавление","headings":[{"key":"2d3af192-d18b-4d75-80cc-24acd6352b24","content":"Предварительные условия","level":2,"link":"#предварительные-условия","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"c2db12e8-49e4-4370-ac34-459d2b903ccd","content":"Настройка приложения","level":2,"link":"#настройка-приложения","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"df8c3b9c-e344-4a2c-b89f-3d068b0f56a4","content":"Установка и настройка Mapbox","level":2,"link":"#установка-и-настройка-mapbox","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"113233d0-8cef-4299-a448-fa6d1957e62a","content":"Построение приложения с использованием EAS","level":2,"link":"#построение-приложения-с-использованием-eas","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"8216628c-686b-4dca-beaa-80065d5012fe","content":"Получение местоположения пользователя","level":2,"link":"#получение-местоположения-пользователя","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"623287b0-ab7d-48cc-959e-712d4422195b","content":"Добавление маркера к местоположению пользователя","level":2,"link":"#добавление-маркера-к-местоположению-пользователя","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"1fc9dac4-372a-4ded-a084-57f5dcec9a26","content":"Заключение","level":2,"link":"#заключение","disable":false,"isUpdated":false,"isGeneratedLink":true}],"listStyle":"ul"} -->
<div class="wp-block-rank-math-toc-block" id="rank-math-toc"><h2>Оглавление</h2><nav><ul><li class=""><a href="#предварительные-условия">Предварительные условия</a></li><li class=""><a href="#настройка-приложения">Настройка приложения</a></li><li class=""><a href="#установка-и-настройка-mapbox">Установка и настройка Mapbox</a></li><li class=""><a href="#построение-приложения-с-использованием-eas">Построение приложения с использованием EAS</a></li><li class=""><a href="#получение-местоположения-пользователя">Получение местоположения пользователя</a></li><li class=""><a href="#добавление-маркера-к-местоположению-пользователя">Добавление маркера к местоположению пользователя</a></li><li class=""><a href="#заключение">Заключение</a></li></ul></nav></div>
<!-- /wp:rank-math/toc-block -->

<h2 class="wp-block-heading" id="предварительные-условия">Предварительные условия</h2>

Прежде чем мы начнем, убедитесь, что у вас есть следующие предварительные условия:

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>На вашем компьютере установлены Node.js и npm.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Expo CLI.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Учетная запись Mapbox. Бесплатный аккаунт можно зарегистрировать на сайте mapbox.com.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Требуется учетная запись EAS (Expo Application Services).</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Если вы разрабатываете под iOS, вам потребуется учетная запись разработчика Apple, за которую необходимо платить около 100 долл. в год.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Кроме того, если вы разрабатываете приложение для Android, вам потребуется симулятор Android или физический телефон с Android.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<h2 class="wp-block-heading" id="настройка-приложения">Настройка приложения</h2>

Чтобы создать новое приложение React с помощью Expo CLI, откройте терминал, перейдите в каталог, в который вы хотите установить проект, и выполните следующую команду:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">npx create-expo-app mapbox_app
cd mapbox_app</code></pre>
<!-- /wp:code -->

<h2 class="wp-block-heading" id="установка-и-настройка-mapbox">Установка и настройка Mapbox</h2>

Чтобы установить пакет Mapbox в папку проекта, выполните приведенную ниже команду:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">npm i @rnmapbox/maps</code></pre>
<!-- /wp:code -->

Для того чтобы @rnmapbox/maps работал на платформе IOS, необходимо добавить в файл ios/Podfile следующие конфигурации.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">pre_install do |installer|
   $RNMapboxMaps.pre_install(installer)
   ... other pre install hooks
   end
post_install do |installer|
   $RNMapboxMaps.post_install(installer)
   ... other post install hooks
   end</code></pre>
<!-- /wp:code -->

Теперь давайте установим зависимость Mapbox для iOS. В папке ios вашего проекта выполните в терминале следующую команду:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">pod install</code></pre>
<!-- /wp:code -->

Затем войдите на свою страницу панели Mapbox, чтобы сгенерировать токен Mapbox API. На приборной панели нажмите на кнопку Create a Token.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://blog.openreplay.com/images/create-a-react-native-map-using-mapbox/images/image1.png" alt="-"/></figure>
<!-- /wp:image -->

На странице Create an Access Token введите имя приложения, отметьте опцию DOWNLOAD:READ и нажмите на кнопку Create Token, как показано на рисунке ниже:

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://blog.openreplay.com/images/create-a-react-native-map-using-mapbox/images/image2.png" alt="-"/></figure>
<!-- /wp:image -->

Далее вы будете перенаправлены обратно на страницу приборной панели, где можно получить доступ к публичному токену API и секретному токену, как показано ниже:

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://blog.openreplay.com/images/create-a-react-native-map-using-mapbox/images/image3.png" alt="-"/></figure>
<!-- /wp:image -->

Отображение вида карты

Чтобы отобразить вид карты в нашем приложении React Native, мы должны сначала импортировать пакет Mapbox в наш код. Откройте файл app.js и добавьте следующий код.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">import React from "react";
import { StyleSheet, View } from "react-native";
import Mapbox from "@rnmapbox/maps";
// . .  .</code></pre>
<!-- /wp:code -->

Далее мы должны установить маркер доступа Mapbox и создать переменную defaultStyle. Переменная defaultStyle содержит сведения о том, как будет загружаться и настраиваться карта, такие как источник, минимальный и максимальный уровни масштабирования, цвет фона карты и тип карты.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">// . . .
// Mapbox.setWellKnownTileServer("Mapbox");
Mapbox.setAccessToken("Your Access  Token here");
const defaultStyle = {
 version: 8,
 name: "Land",
 sources: {
   map: {
     type: "raster",
     tiles: ["https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"],
     tileSize: 256,
     minzoom: 1,
     maxzoom: 19,
   },
 },
 layers: [
   {
     id: "background",
     type: "background",
     paint: {
       "background-color": "#f2efea",
     },
   },
   {
     id: "map",
     type: "raster",
     source: "map",
     paint: {
       "raster-fade-duration": 100,
     },
   },
 ],
};
// . . .</code></pre>
<!-- /wp:code -->

В приведенном выше коде обновите токен доступа на свой токен доступа из панели Mapbox.<br>Теперь мы будем использовать компонент Mapbox MapView для отображения карты в нашем приложении, передав переменную defaultStyle в атрибут styleJSON с помощью кода, приведенного ниже.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">// . . .
const App = () =&gt; {
 return (
   &lt;View style={styles.page}&gt;
     &lt;View style={styles.container}&gt;
       &lt;Mapbox.MapView
         style={styles.map}
         styleJSON={JSON.stringify(defaultStyle)}
       /&gt;
     &lt;/View&gt;
   &lt;/View&gt;
 );
};
export default App;
const styles = StyleSheet.create({
 page: {
   flex: 1,
   justifyContent: "center",
   alignItems: "center",
 },
 container: {
   height: 700,
   width: 390,
 },
 map: {
   flex: 1,
 },
});</code></pre>
<!-- /wp:code -->

<h2 class="wp-block-heading" id="построение-приложения-с-использованием-eas">Построение приложения с использованием EAS</h2>

EAS (Expo Application Services) - это набор инструментов и сервисов, предоставляемых Expo, популярной платформой для создания и развертывания React Native-приложений. EAS предлагает ряд функций и сервисов для оптимизации процесса разработки, тестирования и развертывания Expo-проектов.<br>Мы не можем протестировать приложение с помощью Expo, поскольку Mapbox не поддерживает Expo. Чтобы протестировать приложение для работы с картами, необходимо собрать его с помощью EAS.<br>Чтобы установить EAS в каталог проекта, выполните в терминале следующие команды.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">npm install -g eas-cli
npx expo install expo-dev-client expo-location</code></pre>
<!-- /wp:code -->

Чтобы настроить приложение для сборки, создайте в корневой папке проекта файл eas.json и добавьте в него следующие конфигурации для Android и iOS.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">{
 "build": {
   "development-simulator": {
     "developmentClient": true,
     "distribution": "internal",
     "android": {
       "simulator": true
     },
     "ios": {
       "simulator": true
     }
   }
 }
}</code></pre>
<!-- /wp:code -->

Далее выполните приведенный ниже код для создания приложения на выбранной вами платформе.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">eas build --profile development-simulator --platform android
# OR
eas build --profile development-simulator --platform ios</code></pre>
<!-- /wp:code -->

Выполнение приведенной выше команды сборки может занять некоторое время. Подождите, пока процесс не завершится.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://blog.openreplay.com/images/create-a-react-native-map-using-mapbox/images/image4.png" alt="-"/></figure>
<!-- /wp:image -->

После завершения сборки воспользуйтесь ссылкой на сборку для загрузки и установки приложения на устройство.<br>Нам необходимо запустить проект Expo с помощью команды сервера разработки. Выполните приведенную ниже команду в терминале.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">npx expo start --dev-client</code></pre>
<!-- /wp:code -->

Теперь откройте установленное приложение, и оно должно отобразить карту, как показано на рисунке ниже.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://blog.openreplay.com/images/create-a-react-native-map-using-mapbox/images/image5.png" alt="-"/></figure>
<!-- /wp:image -->

<h2 class="wp-block-heading" id="получение-местоположения-пользователя">Получение местоположения пользователя</h2>

Одной из распространенных функций картографического приложения является определение местоположения пользователя по его координатам и отображение их на карте. expo-location - это пакет для определения местоположения пользователя.<br>Установите пакет expo-location с помощью следующей команды.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">npx expo install expo-location</code></pre>
<!-- /wp:code -->

Чтобы получить координаты пользователя, откройте файл app.js и замените в нем код на следующий.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">import React, { useState, useEffect } from "react";
import { Platform, Text, View, StyleSheet } from "react-native";
import Mapbox from "@rnmapbox/maps";
import * as Location from "expo-location";
Mapbox.setWellKnownTileServer("Mapbox");
Mapbox.setAccessToken(
 "Access Token Here"
);
export default function App() {
 const [location, setLocation] = useState(null);
 useEffect(() =&gt; {
   (async () =&gt; {
     let { status } = await Location.requestForegroundPermissionsAsync();
     if (status !== "granted") {
       setErrorMsg("Permission to access location was denied");
       return;
     }
     let location = await Location.getCurrentPositionAsync({});
     setLocation(location);
   })();
 }, []);
// . . .</code></pre>
<!-- /wp:code -->

В приведенном выше коде мы сначала запрашиваем у пользователей разрешение на доступ приложения к данным об их местоположении с помощью функции Location.requestForegroundPermissionsAsync().<br>После получения разрешения на определение местоположения мы используем Location.getLastKnownPositionAsync() для получения координат пользователя и сохранения их в переменной location.

<h2 class="wp-block-heading" id="добавление-маркера-к-местоположению-пользователя">Добавление маркера к местоположению пользователя</h2>

Добавление пользовательского маркера к местоположению пользователя полезно для выделения его местоположения на карте. Mapbox предоставляет API для добавления маркеров на карту с помощью компонента Mapbox’s PointAnnotation.<br>Чтобы указать местоположение пользователя с помощью маркера на карте, добавьте следующий код в файл app.js.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">return (
 &lt;Mapbox.MapView style={{ flex: 1 }}&gt;
   {location &amp;&amp; (
     &lt;Mapbox.PointAnnotation
       id="userLocation"
       coordinate={[location.coords.longitude, location.coords.latitude]}
     &gt;
       &lt;Mapbox.Callout title="You are here!" /&gt;
     &lt;/Mapbox.PointAnnotation&gt;
   )}
 &lt;/Mapbox.MapView&gt;
)};</code></pre>
<!-- /wp:code -->

Теперь перезагрузите приложение, и вам будет предложено разрешить приложению доступ к вашему местоположению. После получения разрешения на карте появятся маркеры местоположения, указывающие на текущее местоположение, как показано на рисунке ниже.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://blog.openreplay.com/images/create-a-react-native-map-using-mapbox/images/image6.png" alt="-"/></figure>
<!-- /wp:image -->

<h2 class="wp-block-heading" id="заключение">Заключение</h2>

В этой статье мы рассмотрели создание карты React Native с использованием Mapbox. Мы рассмотрели процесс установки и настройки, отображение вида карты на платформах iOS и Android, отображение местоположения пользователя и добавление маркера к местоположению пользователя.

Выполнив эти шаги, вы сможете усовершенствовать свои приложения React Native, интегрировав в них мощные картографические возможности с помощью Mapbox. Экспериментируйте с различными функциями и API, предоставляемыми Mapbox, для создания интересных и интерактивных приложений на основе карт.
