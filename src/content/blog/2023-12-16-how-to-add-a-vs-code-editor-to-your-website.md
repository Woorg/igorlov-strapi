---
title: Как добавить редактор кода VS на ваш сайт
meta_title: Как добавить редактор кода VS на ваш сайт | Игорь Горлов - Фронтeндер
description: >-
  Редактор Monaco от Microsoft представляет собой компонент редактора кода,
  который можно легко интегрировать в вебсайты. С помощью всего нескольких строк
  кода
date: 2023-12-16T00:00:00.000Z
image: ../../assets/images/kak-dobavyt-redaktor-koda-vs-na-vash-sait-Dec-16-2023.avif
categories:
  - Как закодить
author: Игорь Горлов
draft: false
slug: kak-dobavyt-redaktor-koda-vs-na-vash-sait
tags:
  - Monaco editor
lastmod: 2024-03-20T21:26:43.043Z
---

Редактор Monaco от Microsoft представляет собой компонент редактора кода, который можно легко интегрировать в веб-сайты. С помощью всего нескольких строк кода вы можете добавить в свое веб-приложение полнофункциональный редактор, похожий на VS Code. В этом уроке мы рассмотрим, как это сделать.

## Начало работы

Чтобы использовать Monaco, нам нужно включить его в нашу страницу. Мы можем получить его из CDN:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.23.0/min/vs/loader.min.js"></script>
```

Это позволит загрузить библиотеку Monaco асинхронно. Далее нам нужен `<div>` в нашем HTML, где мы можем инстанцировать редактор:

```html
<div id="editor"></div>
```

Теперь в нашем JavaScript-коде мы можем инициализировать Monaco и создать редактор:

```js
require.config({
	paths: {
		vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.23.0/min/vs',
	},
});

require(['vs/editor/editor.main'], function () {
	const editor = monaco.editor.create(document.getElementById('editor'), {
		value: [
			'<!DOCTYPE html>',
			'<html>',
			' <body>',
			'   <h1>Hello World!</h1>',
			' </body>',
			'</html>',
		].join('\n'),
		language: 'html',
	});
});
```

Это создаст редактор с образцом HTML-контента.

## Добавление темы

Чтобы редактор выглядел как VS Code, нам нужно добавить CSS темы:

```html
<link
	href="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.23.0/min/vs/editor/editor.main.css"
	rel="stylesheet"
/>
```

В файле `editor.main.css` содержатся основные стили редактора. Для темной темы VS Code включите в него:

```js
const editor = monaco.editor.create(..., { theme: 'vs-dark' });
```

Вот и все! Теперь на нашей странице есть редактор, похожий на VS Code.

## Настройка языков

Чтобы добавить поддержку языков, передайте параметр `language` при создании редактора:

```js
const editor = monaco.editor.create(..., { language: 'javascript' });
```

Monaco поставляется с интеллектуальным завершением кода, подсветкой синтаксиса и проверкой для таких популярных языков, как HTML, CSS, JavaScript и других.

## Заключение

С помощью всего нескольких строк кода Monaco позволяет легко интегрировать редактор кода в ваше веб-приложение. Настраиваемые темы и поддержка языков выводят его на новый уровень, обеспечивая полноценную среду кодирования для ваших пользователей.

Дайте мне знать, если вы хотите, чтобы я расширил или изменил что-либо в этой статье!
