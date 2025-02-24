---
title: Как получить изображения через Unsplash API с помощью Javascript
meta_title: >-
  Как получить изображения через Unsplash API с помощью Javascript - Фул Фронт
  Дев
description: >-
  В программировании часто возникают ситуации, когда приходится загружать
  изображения на хостинг для использования в своих проектах, что может отнимать
  драгоценн
date: 2023-11-20T01:30:49.250Z
image: >-
  ../../assets/images/kak-poluchyt-yzobrazhenyia-cherez-unsplash-api-s-pomoschiu-javascript-Nov-20-2023.avif
categories:
  - Как закодить
author: Igor Gorlov
tags:
  - JavaScript
  - Unsplash
  - API
draft: false
type: blog
slug: kak-poluchyt-yzobrazhenyia-cherez-unsplash-api-s-pomoschiu-javascript
lastmod: 2024-03-20T21:26:42.668Z
---

В программировании часто возникают ситуации, когда приходится загружать изображения на хостинг для использования в своих проектах, что может отнимать драгоценное время и замедлять процесс кодирования. В этом руководстве я расскажу вам о том, как легко запрашивать изображения из API для непосредственного использования в ваших проектах, используя в качестве основного примера API Unsplash.

## [](https://dev.to/maxixo/how-to-fetch-images-with-unsplash-api-with-javascript-5gf0#prerequisite)Prerequisite

- Для работы с приведенным ниже примером необходимо базовое понимание HTML, CSS и Javascript.
- Если у вас нет установленной IDE, вы можете использовать онлайн-редактор, например [Codepen](https://codepen.io/pen/) или [JSFiddle](https://jsfiddle.net/).

## [](https://dev.to/maxixo/how-to-fetch-images-with-unsplash-api-with-javascript-5gf0#setting-up-the-api)Настройка API

Для начала нам необходимо создать учетную запись разработчика у провайдера API. В данном случае мы используем API Unsplash. Теперь перейдите по ссылке [documentation](https://unsplash.com/documentation#creating-a-developer-account). Вы должны увидеть страницу, представленную ниже. Перейдите к разделу ”Создание учетной записи разработчика" и нажмите кнопку "Регистрация", следуя инструкциям, и примите условия использования API.

Примечание: Сначала необходимо создать учетную запись в Unsplash.

[!['Unslpash developers page '](https://res.cloudinary.com/practicaldev/image/fetch/s--Bmtlzc5J--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/0tg7yv335kgsntb3lcf1.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--Bmtlzc5J--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/0tg7yv335kgsntb3lcf1.png)
После настройки демонстрационного приложения у вас должен быть ключ API, как показано ниже

[!['Unsplash API key'](https://res.cloudinary.com/practicaldev/image/fetch/s--j-n7WNoa--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/genwwuvjdt26q1fkdnkw.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--j-n7WNoa--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/genwwuvjdt26q1fkdnkw.png)

Важно также знать, что для демонстрационных приложений можно делать только **50 запросов** в час, а для приложений, находящихся в эксплуатации, - **5 000 запросов** в час. Если вам необходимо сделать больше запросов, вы можете увеличить лимит или обратиться в службу поддержки. В нашем учебном пособии мы получаем изображения только для нашей простой галереи.

Перейдем к кодированию.

## [](https://dev.to/maxixo/how-to-fetch-images-with-unsplash-api-with-javascript-5gf0#coding-amp-explanation)Кодирование и пояснения

Во-первых, мы начнем с нашей HTLM-части кода, которая должна выглядеть следующим образом

```html
<section id="gallery">
	<div><img class="image" alt="" /></div>
	<div><img class="image" alt="" /></div>
	<div><img class="image" alt="" /></div>
	<div><img class="image" alt="" /></div>
	<div><img class="image" alt="" /></div>
	<div><img class="image" alt="" /></div>
	<div><img class="image" alt="" /></div>
	<div><img class="image" alt="" /></div>
	<div><img class="image" alt="" /></div>
	<div><img class="image" alt="" /></div>
</section>
```

Вход в полноэкранный режим

В этом блоке кода у нас есть секция, содержащая 10 элементов div, каждый из которых содержит элемент изображения. В настоящее время эти элементы изображений пусты, но позже мы добавим исходные файлы для изображений.

### [](https://dev.to/maxixo/how-to-fetch-images-with-unsplash-api-with-javascript-5gf0#styling-our-gallery)Стилизация нашей галереи

Теперь нам необходимо придать стиль нашим изображениям, чтобы они выглядели более уместно. Вставьте следующий код в часть CSS в вашей кодовой панели

```css
/* Портфолио */
#gallery {
	width: 1200px;
	margin-left: 30px;
	margin: auto;
	padding-bottom: 30px;
	display: grid;
	grid-gap: 20px;
	grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	box-shadow: 0 1px 5px rgba(104, 104, 104, 0.8);
}
#gallery img {
	height: 150px;
	width: 100%;
	box-shadow: 0 1px 5px rgba(104, 104, 104, 0.8);
}
```

Вход в полноэкранный режим

В этом CSS-блоке мы создаем галерею шириной 1200 пикселей с 30-пиксельным левым полем для горизонтального центрирования. Мы используем отзывчивый макет сетки, который адаптируется к минимальной ширине колонок в 200 пикселей с 20-пиксельным зазором между div, содержащими изображения. Наконец, мы применяем бокс-тень к изображениям и элементам div для обеспечения их видимости.

### [](https://dev.to/maxixo/how-to-fetch-images-with-unsplash-api-with-javascript-5gf0#fetching-the-images)Получение изображений

Наш код был бы неполным без Javascript-аспекта для взаимодействия с API и получения изображений. Наш блок JS-кода должен выглядеть следующим образом:

```js
// Запрос API Unsplash Images

const apiKey = 'Ваш ключ API';
const images = document.querySelectorAll('.image');

fetch(`https://api.unsplash.com/photos/random?query=restaurant&count=10&client_id=${apiKey}`)
	.then((response) => response.json())
	.then((data) => {
		data.forEach((photo, index) => {
			images[index].src = photo.urls.regular;
		});
	});
```

Вход в полноэкранный режим

Здесь должен быть вывод всех кодов вместе взятых

[!['Простая галерея из 10 изображений'](https://res.cloudinary.com/practicaldev/image/fetch/s--ewNxh0Lw--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/xkhhy2peul4nra44jh00.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--ewNxh0Lw--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/xkhhy2peul4nra44jh00.png)

Можно сделать еще один шаг вперед, обернув наш запрос в функцию ‘getImages’. Теперь мы можем настроить эту функцию на запрос изображений через разные промежутки времени, например :

```js
//функция getImages
function getImages() {
	fetch(`https://api.unsplash.com/photos/random?query=food&count=10&client_id=${apiKey}`)
		.then((response) => response.json())
		.then((data) => {
			data.forEach((photo, index) => {
				images[index].src = photo.urls.regular;
			});
		});
}

// Установить интервал
getImages();
setInterval(getImages, 10000);
```

Вход в полноэкранный режим

Здесь мы запрашиваем новые изображения с интервалом в 10 секунд (10000 миллисекунд).

## [](https://dev.to/maxixo/how-to-fetch-images-with-unsplash-api-with-javascript-5gf0#conclusion)Заключение

Мы рассмотрели основные аспекты получения изображений. Это может быть применимо и к другим API, кроме Unslpash. Это тот же самый метод, все, что вам нужно, это API-ключ для запроса к серверу. Теперь вы можете приступить к реализации этого метода в своих будущих проектах или приложениях.

Если вам понравилась эта статья, поддержите меня здесь и на моем [GitHub](https://github.com/maxixo)

Счастливого кодинга!
