---
title: Как сделать цифровые часы JavaScript
meta_title: Как сделать цифровые часы JavaScript - Фул Фронт Дев
description: >-
  Добро пожаловать в очередной увлекательный туториал от stakedesigner. Создание
  проектов Digital Clock JavaScript  один из лучших способов изучения
  JavaScript.
date: 2023-12-07T23:37:06.301Z
image: ../../assets/images/kak-sdelat-tsyfrov-e-chas-javascript-Dec-08-2023.avif
categories:
  - Как закодить
author: Igor Gorlov
tags:
  - JavaScript
  - Animations
draft: false
translatedPosition: ''
type: blog
slug: kak-sdelat-tsyfrov-e-chas-javascript
lastmod: 2024-03-20T21:26:46.885Z
---

Добро пожаловать в очередной увлекательный туториал от stakedesigner. Создание проектов Digital Clock JavaScript - один из лучших способов изучения JavaScript. Поэтому сегодня давайте создадим проект Digital Clock JavaScript’. Для создания этого проекта нам понадобятся HTML, CSS, Javascript.

Исходный код [ссылка](https://stakedesigner.com/)

В современный цифровой век знание того, как создать цифровые часы с помощью JavaScript, является ценным навыком для веб-разработчиков. Хотите ли вы отображать текущее время на своем сайте или создать собственное приложение для часов, JavaScript предоставляет необходимые инструменты для этого. В этом уроке мы расскажем вам о том, как создать простые цифровые часы с помощью HTML, CSS и JavaScript.

## [](https://dev.to/stakedesigner/how-to-make-digital-clock-javascript-1o16#prerequisites-for-digital-clock-javascript)Необходимые условия для создания цифровых часов на JavaScript

Прежде чем мы погрузимся в код, убедитесь, что у вас есть следующее:

Базовые знания HTML, CSS и JavaScript.  
Редактор кода (например, Visual Studio Code, Sublime Text).

## [](https://dev.to/stakedesigner/how-to-make-digital-clock-javascript-1o16#project-folder-structure)Структура папок проекта

Давайте рассмотрим структуру папок проекта. Папка проекта состоит из 3 файлов. Файл HTML создает элементы, необходимые для построения структуры и макета нашего проекта. Далее, CSS-файл стилизует элементы, которые мы создали с помощью CSS, и, наконец, Javascript добавляет функциональность нашему проекту.

## [](https://dev.to/stakedesigner/how-to-make-digital-clock-javascript-1o16#html)HTML

Начнем с HTML-кода. Скопируйте приведенный ниже код и вставьте его в свой HTML-документ. Здесь мы создаем div с классом ‘clock’ и внутри него создаем div для отображения часов, минут и секунд. Кроме того, мы также используем теги span для отображения ’:' между div’ами.

```html
<!doctype html>

<html lang="en">
	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Цифровые часы</title>
		<!-- Google Fonts -->
		<link
			href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;800&display=swap"
			rel="stylesheet"
		/>
		<!-- Таблица стилей -->
		<link rel="stylesheet" href="style.css" />
	</head>
	<body>
		<div class="clock">
			<div id="hour"></div>
			<span>:</span>
			<div id="минута"></div>
			<span>:</span>
			<div id="секунды"></div>
		</div>
		<!-- Скрипт -->
		<script src="script.js"></script>
	</body>
</html>
```

Далее мы оформим нашу игру с помощью CSS. Для этого скопируйте код, приведенный ниже, и вставьте его в свою таблицу стилей.

Мы задаем цвет фона для тела, в то время как время отображается на белом фоне. Каждый элемент правильно выровнен и немного изогнут, чтобы он хорошо смотрелся.

## [](https://dev.to/stakedesigner/how-to-make-digital-clock-javascript-1o16#css)CSS:

```css
* {
	padding: 0;
	margin: 0;
	box-sizing: border-box;
	font-family: 'Poppins', sans-serif;
}
body {
	высота: 100vh;
	background-image: linear-gradient(135deg, #8052ec, #d161ff);
}
.clock {
	ширина: 31.25em;
	высота: 8em;
	позиция: абсолютная;
	transform: translate(-50%, -50%);
	top: 50%;
	left: 50%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-weight: 600;
}
.clock div {
	положение: относительное;
	background-color: #ffffff;
	высота: 100%;
	ширина: 3.2em;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 2.5em;
	color: #150c41;
	border-radius: 0.4em;
	box-shadow: 0 1em 2em rgba(0, 0, 0, 0, 0.3);
	межбуквенныйинтервал: 0.05em;
}
.clock span {
	font-weight: 800;
	font-size: 2.5em;
	color: #ffffff;
}
```

## [](https://dev.to/stakedesigner/how-to-make-digital-clock-javascript-1o16#javascript)Javascript:

Наконец, мы добавим функциональность с помощью Javascript. Еще раз скопируйте приведенный ниже код и вставьте его в файл скрипта.

Мы создаем переменную ‘clock’, в которой вызываем функцию ‘time’. Эта функция обновляет время каждую секунду, получая текущее время с помощью объекта JavaScript Date(). Затем из даты извлекаются часы, минуты и секунды и форматируются с помощью функции padStart() с ведущими нулями. Затем отформатированное время отображается на веб-странице в виде ”часов", "минут" и "секунд".

```js
const hour = document.getElementById('hour');
const минута = document.getElementById('минута');
const seconds = document.getElementById('seconds');

const clock = setInterval(function time() {
	const dateNow = new Date();
	let hr = dateNow.getHours();
	let min = dateNow.getMinutes();
	let sec = dateNow.getSeconds();

	hr = hr.toString().padStart(2, '0');
	min = min.toString().padStart(2, '0');
	sec = sec.toString().padStart(2, '0');

	const timeString = `${hr}:${min}:${sec}`;
	hour.textContent = hr;
	minute.textContent = min;
	seconds.textContent = sec;
}, 1000);
```

## [](https://dev.to/stakedesigner/how-to-make-digital-clock-javascript-1o16#support)Поддержка 🤗

[YouTube](https://www.youtube.com/@stakedesigner)
[Веб-сайт](https://stakedesigner.com/)

## [](https://dev.to/stakedesigner/how-to-make-digital-clock-javascript-1o16#thanks-for-reading)Спасибо, что читаете!

Если у вас есть вопросы, претензии или советы, вы можете оставить их здесь, в комментариях. Я буду рад ответить!

😊😊😊 До встречи! 😊😊😊
