---
title: 'Как создать простой аудиоплеер на HTML, JavaScript и CSS'
meta_title: >-
  Как создать простой аудиоплеер на HTML, JavaScript и CSS | Игорь Горлов -
  Фронтeндер
description: >-
  Создание базового аудиоплеера с помощью HTML, JavaScript и CSS


  Аудиоплееры часто встречаются на многих сайтах, и создание простого плеера с
  помощью HTML, Java
date: 2023-12-16T00:00:00.000Z
categories:
  - Учебник
author: Игорь Горлов
draft: false
slug: kak-sozdat-prostoi-audyopleer-na-html-javascript-y-css
tags:
  - Css
  - Html
  - JavaScript
image: >-
  ../../assets/images/kak-sozdat-prostoi-audyopleer-na-html-javascript-y-css-Dec-16-2023.avif
lastmod: 2024-03-20T21:26:46.389Z
---

Создание базового аудиоплеера с помощью HTML, JavaScript и CSS

Аудиоплееры часто встречаются на многих сайтах, и создание простого плеера с помощью HTML, JavaScript и CSS - несложный проект. В этом руководстве мы расскажем вам о создании базового аудиоплеера с элементами управления воспроизведением и паузой. В конце вы также можете скачать исходный код этого примера.

## Структура HTML

Сначала давайте создадим HTML-структуру для нашего аудиоплеера. Вам нужен элемент `<audio>` для воспроизведения аудио, и, по желанию, вы можете добавить пользовательские элементы управления. Вот HTML-код для нашего аудиоплеера:

```html
<!doctype html>
<html>
	<head>
		<title>Простой аудиоплеер</title>
		<link rel="stylesheet" type="text/css" href="style.css" />
	</head>
	<body>
		<div class="audio-player">
			<audio controls>
				<source src="your-audio-file.mp3" type="audio/mpeg" />
				Ваш браузер не поддерживает элемент audio.
			</audio>
		</div>
		<script src="script.js"></script>
	</body>
</html>
```

В этом коде мы включили элемент `<audio>` с атрибутом “controls”, который предоставляет стандартные регуляторы воспроизведения, паузы и громкости для аудио. Замените `"your-audio-file.mp3"` на реальный путь к вашему аудиофайлу.

## Стилизация с помощью CSS

Теперь давайте добавим несколько основных стилей, чтобы сделать наш аудиоплеер визуально привлекательным. Создайте CSS-файл (style.css) и добавьте в него правила стилизации. Вот минимальный пример:

```css
/* Вы можете стилизовать аудиоплеер здесь */
.audio-player {
	width: 300px;
	margin: 20px;
}
```

Вы можете настроить CSS в соответствии с предпочтениями дизайна вашего сайта. В этом примере мы установили фиксированную ширину и добавили немного полей для создания интервалов.

## Добавление пользовательских элементов управления с помощью JavaScript

Если вы хотите включить пользовательские элементы управления, такие как кнопки воспроизведения и паузы, вы можете использовать JavaScript для расширения функциональности. Создайте файл JavaScript (script.js) и добавьте в него пользовательские элементы управления:

```js
const audioElement = document.querySelector('audio');
const playButtonElement = document.getElementById('play-button');
const pauseButtonElement = document.getElementById('pause-button');

playButtonElement.addEventListener('click', () => {
	audioElement.play();
});

pauseButtonElement.addEventListener('click', () => {
	audioElement.pause();
});
```

В этом JavaScript-коде мы выделяем элемент `<audio>` и создаем слушателей событий для пользовательских кнопок воспроизведения и паузы. При нажатии на кнопку воспроизведения аудио воспроизводится, а при нажатии на кнопку паузы аудио приостанавливается.

Обратите внимание, что для корректного тестирования аудиоплеера вам может потребоваться предоставить эти файлы через веб-сервер или локальную среду разработки из-за ограничений безопасности, которые не позволяют воспроизводить аудио при открытии HTML-файлов непосредственно в браузере.

Благодаря этому руководству и исходному коду у вас есть основа для создания базового аудиоплеера для ваших веб-проектов. В дальнейшем вы можете усовершенствовать его, добавив дополнительные функции и стилистику в соответствии с вашими потребностями и дизайном. Вы можете попробовать расширенную версию.

## Расширенная версия

Создание расширенной версии аудиоплеера на HTML, JavaScript и CSS может включать такие дополнительные функции, как настраиваемый индикатор выполнения, регулировка громкости и отображение времени. Ниже приведен пример расширенной версии аудиоплеера:

HTML (index.html):

```html
<!doctype html>
<html>
	<head>
		<title>Advanced Audio Player</title>
		<link rel="stylesheet" type="text/css" href="style.css" />
	</head>
	<body>
		<div class="audio-player">
			<audio id="audio" controls>
				<source src="your-audio-file.mp3" type="audio/mpeg" />
				Ваш браузер не поддерживает элемент audio.
			</audio>
			<div class="controls">
				<button id="play-pause-button">Play</button>
				<input type="range" id="volume-control" min="0" max="1" step="0.01" value="1" />
			</div>
			<div class="progress"><div class="progress-bar" id="progress-bar"></div></div>
			<div id="current-time">0:00</div>
			<div id="total-time">0:00</div>
		</div>
		<script src="script.js"></script>
	</body>
</html>
```

CSS (style.css):

```css
/* Настройте внешний вид расширенного аудиоплеера здесь */
.audio-player {
	width: 400px;
	margin: 20px;
}
.controls {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 10px;
}
.progress {
	height: 10px;
	background-color: #ccc;
	margin-top: 10px;
}
.progress-bar {
	width: 0;
	height: 100%;
	background-color: #4caf50;
}
#current-time,
#total-time {
	margin-top: 10px;
}
```

JavaScript (script.js):

```js
const audioElement = document.getElementById('audio');
const playPauseButton = document.getElementById('play-pause-button');
const volumeControl = document.getElementById('volume-control');
const progressBar = document.getElementById('progress-bar');
const currentTimeDisplay = document.getElementById('current-time');
const totalTimeDisplay = document.getElementById('total-time');
let isPlaying = false;

playPauseButton.addEventListener('click', () => {
	if (isPlaying) {
		audioElement.pause();
		playPauseButton.textContent = 'Play';
	} else {
		audioElement.play();
		playPauseButton.textContent = 'Pause';
	}
	isPlaying = !isPlaying;
});

volumeControl.addEventListener('input', () => {
	audioElement.volume = volumeControl.value;
});

audioElement.addEventListener('timeupdate', () => {
	const currentTime = audioElement.currentTime;
	const duration = audioElement.duration;
	const currentMinutes = Math.floor(currentTime / 60);
	const currentSeconds = Math.floor(currentTime % 60);
	const totalMinutes = Math.floor(duration / 60);
	const totalSeconds = Math.floor(duration % 60);

	currentTimeDisplay.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;
	totalTimeDisplay.textContent = `${totalMinutes}:${totalSeconds < 10 ? '0' : ''}${totalSeconds}`;

	const progress = (currentTime / duration) * 100;
	progressBar.style.width = `${progress}%`;
});
```

Этот продвинутый аудиоплеер включает в себя пользовательскую кнопку воспроизведения/паузы, ползунок регулировки громкости, индикатор выполнения, а также отображение текущего и общего времени. Он обеспечивает более интерактивное и информативное воспроизведение аудио для пользователей. Обязательно замените `"your-audio-file.mp3"` на путь к вашему реальному аудиофайлу. Вы можете дополнительно настроить стиль и функциональность в соответствии со специфическими требованиями вашего проекта.

В приведенном мной примере создания аудиоплеера на HTML используется несколько HTML-тегов. Вот список основных HTML-тегов, использованных в этом примере:

- `<html>`: Корневой элемент, в котором заключен весь HTML-документ.
- `<head>`: Содержит метаинформацию о документе, например, заголовок и ссылки на внешние ресурсы, такие как таблицы стилей и скрипты.
- `<title>`: Задает заголовок веб-страницы, который отображается в строке заголовка браузера или на вкладке.
- `<link>`: Указывает внешние ресурсы, например таблицы стилей, которые будут использоваться в документе.
- `<body>`: Содержит содержимое веб-страницы, видимое пользователю.
- `<div>`: Контейнер блочного уровня, который часто используется для группировки и стилизации HTML-элементов.
- `<audio>`: Элемент HTML5, используемый для вставки аудиоконтента, предоставляющий встроенные элементы управления аудио и поддержку различных аудиоформатов.
- `<source>`: Используется в элементе `<audio>` для указания различных источников или форматов аудио для выбора браузером.
- `<button>`: Создает кликабельную кнопку, которая может вызывать действия JavaScript.
- `<input>`: Представляет элемент управления вводом, например, диапазон для ползунка регулятора громкости.
  Эти HTML-теги объединяются для создания структуры веб-страницы и аудиоплеера с его элементами управления и элементами для взаимодействия и отображения.
