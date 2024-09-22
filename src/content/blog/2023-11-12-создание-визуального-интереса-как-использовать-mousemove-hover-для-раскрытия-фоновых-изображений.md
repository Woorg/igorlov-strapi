---
title: >-
  Создание визуального интереса: Как использовать MouseMove Hover для раскрытия
  фоновых изображений
meta_title: |
  Создание Визуального Интереса: Как Использовать MouseMove...
description: >
  15 февраля 2023 года компания Canva отметила 15 миллиардов дизайнов на своей
  платформе, что стало огромным событием для компании. В честь этого события...
date: 2023-11-11T23:52:33.980Z
image: >-
  ../../assets/images/sozdanie-vizualьnogo-interesa-kak-ispolьzovatь-mousemove-hover-dlya-raskrytiya-fonovyh-izobrazhenij-Nov-12-2023.avif
categories:
  - Как закодить
author: Igor Gorlov
tags:
  - JavaScript
draft: false
type: blog
slug: >-
  sozdanie-vizualьnogo-interesa-kak-ispolьzovatь-mousemove-hover-dlya-raskrytiya-fonovyh-izobrazhenij
lastmod: 2024-03-20T21:26:45.183Z
---

15 февраля 2023 года компания Canva отметила 15 миллиардов дизайнов на своей платформе, что стало огромным событием для компании. В честь этого события компания создала специальное фоновое изображение с дизайнами, выполненными на платформе. Когда вы перемещаете мышь по странице, изображение раскрывается, создавая интересный эффект. Этот эффект показался мне интересным, и я решил воссоздать его с помощью HTML, CSS и JavaScript. В этой статье мы пошагово расскажем, как воссоздать этот эффект.

![Главная страница Canva отмечает 15 миллиардов дизайнерских работ](https://res.cloudinary.com/practicaldev/image/fetch/s--PY0LV80B--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/y9g12a49e8j054v4y8n8.gif)

## Предварительные условия

В данной статье предполагается, что вы обладаете базовыми знаниями HTML, CSS и JavaScript. Вам также понадобится редактор кода и веб-браузер. Я буду использовать VS Code и Chrome, но вы можете использовать любой другой.

Чтобы продолжить работу, клонируйте или скачайте стартовые файлы [здесь](https://github.com/israelmitolu/Reveal-Background-Image-Mousemove)

## Начало работы

Сначала создайте HTML-разметку для контейнера и фонового изображения. Контейнер - это место, где фоновое изображение будет отображаться при наведении.

```html
<div class="container">
	<h1>Thanks for <u>15 billion designs!</u></h1>
	<input type="text" placeholder="Search your content or Canva's" />
	<div class="hover"></div>
</div>
```

Контейнер - это место, где будет находиться все содержимое. Пока что hover div пуст, но мы добавим фоновое изображение с помощью CSS.

## Стилизация контейнера

Далее скопируйте следующий CSS в файл styles.css. Это придаст стиль контейнеру и другим элементам приложения.

```css
.container {
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	margin: auto;
	width: 100%;
	height: 25rem;
	background: linear-gradient(119.42deg, #cc00c4 8.94%, #7d2ae8 54.02%, #00c4cc 95.49%);
	border-radius: 8px;
	text-align: center;
	padding: 0.5rem;
	overflow: hidden;
}

h1 {
	color: #fff;
	font-size: 3rem;
	position: relative;
	z-index: 10;
	margin-top: 1rem;
}

input {
	position: relative;
	margin-top: 2rem;
	padding: 9px 4px 9px 40px;
	border: 1px solid #2b3b4a4d;
	outline: none;
	color: #0d1216;
	padding: 0 12px;
	font-size: 1rem;
	border-radius: 4px;
	height: 2.5rem;
	width: 40rem;
	max-width: 100%;
	z-index: 10;
}
```

В приведенном выше CSS мы установили для контейнера значение position: relative, чтобы можно было позиционировать фоновое изображение внутри него. Мы также установили свойство overflow на hidden, чтобы фоновое изображение не переполняло контейнер.

Свойство z-index элементов h1 и input мы также установим равным 10, чтобы они отображались над или поверх фонового изображения.

Вот что мы имеем на данный момент:

![Статический дизайн сайта, который читают Спасибо за 15 миллиардов дизайнов!](https://res.cloudinary.com/practicaldev/image/fetch/s--QSNz3u93--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/2fj8sywc4t6phv76bygx.png)

## Добавление фонового изображения

Далее мы нацелим класс .hover и добавим фоновое изображение. Мы также установим свойство position в абсолютное значение, чтобы можно было позиционировать изображение внутри контейнера.

Скопируйте следующий CSS в файл styles.css:

```css
.hover {
	opacity: 0;
	position: absolute;
	transition: all 0.5s ease;
	width: 10rem;
	height: 10rem;
	background: url(img/giphy.gif) 50% 50% fixed;
	border-radius: 50%;
	box-shadow: 0 0 30px 30px rgba(255, 255, 255, 0.15);
	filter: blur(1px);
	z-index: 5;
}
```

Свойство opacity установлено в 0, чтобы изображение было скрыто по умолчанию. Мы будем использовать JavaScript для изменения значения непрозрачности на 1, когда пользователь наведет курсор на контейнер.

Кроме того, для свойства background мы использовали сокращенный синтаксис, чтобы задать фоновое изображение, позицию, размер и повтор. Мы также установили фиксированное значение для свойства background-attachment, чтобы изображение оставалось на месте при перемещении мыши.

При желании можно использовать длинный синтаксис для задания фонового изображения, позиции, размера и повтора:

```css
background-image: url(img/giphy.gif);
background-position: 50% 50%;
background-attachment: fixed;
```

## Раскрытие фонового изображения

Для раскрытия фонового изображения мы будем использовать JavaScript для отслеживания движения курсора мыши пользователя и изменения непрозрачности фонового изображения.

Создайте новый файл app.js и добавьте в него следующий код:

```javascript
const hover = document.querySelector('.hover');
const hoverWHalf = hover.offsetWidth / 1.5;
const container = document.querySelector('.container');

container.addEventListener('mousemove', (e) => {
	hover.style.left = e.pageX - hoverWHalf + 'px';
	hover.style.top = e.pageY - hoverWHalf + 'px';
	hover.style.opacity = '1';
});
```

В приведенном выше коде мы сначала выбираем элементы .hover и .container с помощью метода querySelector.

Затем мы добавляем слушатель событий для элемента container. Слушатель событий прослушивает событие mousemove, поэтому при каждом перемещении пользователя мышью по контейнеру код будет вычислять положение элемента .hover и динамически обновлять его положение и полупрозрачность.

В частности, он вычисляет горизонтальную и вертикальную среднюю точку элемента .hover с помощью свойства offsetWidth, а затем вычитает половину этого значения из свойств pageX и pageY события mousemove, чтобы определить положение элемента .hover относительно курсора мыши.

Не забудьте связать файл app.js с файлом index.html ;)

```html
<script src="app.js"></script>
```

Таким образом, мы успешно создали эффект наведения мыши. Вот окончательный результат:

Ознакомьтесь с [демо](https://reveal-background-image.netlify.app/) и исходным кодом на [Github](https://github.com/israelmitolu/Reveal-Background-Image-Mousemove).

![Наша реплика эффекта раскрытия фонового изображения](https://res.cloudinary.com/practicaldev/image/fetch/s--6Abte2NW--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/rk33w6mzj8wykbuabtrr.gif)

## Заключение

Вот и все! Вы добрались до конца этой статьи, посвященной созданию визуального интереса с помощью эффекта наведения MouseMove в HTML, CSS и JavaScript. К этому моменту вы должны отлично понимать, как использовать эту технику для создания интересных и креативных элементов на вашем сайте.

Помните, что существует бесчисленное множество способов изменить этот эффект и сделать его своим собственным. Не бойтесь экспериментировать с различными изображениями, цветами и анимацией, чтобы создать образ, идеально соответствующий вашему бренду или личному стилю.

Продолжая совершенствовать свои навыки веб-дизайна, следите за новыми и интересными тенденциями в этой области. Кто знает, может быть, вы откроете для себя что-то новое :)
