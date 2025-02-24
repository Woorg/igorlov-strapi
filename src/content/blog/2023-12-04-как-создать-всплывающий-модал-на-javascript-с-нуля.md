---
title: Как создать всплывающий модал на JavaScript с нуля
meta_title: Как создать всплывающий модал на JavaScript с нуля - Фул Фронт Дев
description: >-
  В этом уроке мы научимся создавать JavaScriptмодалы (всплывающие окна) без
  использования фреймворка, например Bootstrap, или сторонних библиотек. Мы
  создадим
date: 2023-12-04T12:35:00.339Z
image: >-
  ../../assets/images/kak-sozdat-vspl-vaiuschyi-modal-na-javascript-s-nulia-Dec-04-2023.avif
categories:
  - Как закодить
author: Igor Gorlov
tags:
  - JavaScript
  - Css
draft: false
type: blog
slug: kak-sozdat-vspl-vaiuschyi-modal-na-javascript-s-nulia
lastmod: 2024-03-20T21:26:44.061Z
---

В этом уроке мы научимся создавать JavaScript-модалы (всплывающие окна) без использования фреймворка, например Bootstrap, или сторонних библиотек. Мы создадим все с нуля, что даст нам полный контроль над тем, как это работает и выглядит.

## JavaScript Modal Demo

Вот демо, которое мы создадим:

https://codepen.io/tutsplus/pen/vqRXPv

## 1. Начнем с разметки страницы

Сначала мы создадим модал. Для этого мы добавим класс `.modal` и уникальный ID в контейнер. Затем мы зададим диалог, установив элемент `.modal-dialog` в качестве прямого дочернего элемента `.modal`. Диалог будет содержать модальное содержимое. Это может быть любой вид контента: текст, изображения, лайтбоксы, уведомления/оповещения пользователя и т.д.

> "Всплывающее окно (или модальное окно) - это небольшой элемент пользовательского интерфейса, который появляется на переднем плане веб-сайта и обычно срабатывает как подсказка пользователю, что нужно сделать" - [Adi Purdila](https://webdesign.tutsplus.com/the-best-way-to-use-pop-ups-modals-in-your-web-design--cms-33070t)

Чтобы открыть модал, нам понадобится любой элемент с атрибутом `data-open` (обычно это `кнопка`). Значением этого атрибута должен быть ID желаемого модала.

По умолчанию модальное окно закроется, если мы щелкнем за его пределами или нажмем клавишу `Esc`. Но мы также можем закрыть его, если нажмем на любой элемент с атрибутом `data-close` (обычно это `кнопка`).

Изначально модальное окно будет появляться/исчезать с эффектом затухания. Но у нас есть возможность настроить эффект анимации диалога с помощью атрибута `data-animation`. Значение этого атрибута, которое должно быть добавлено к `.modal`, может быть любым из следующих значений:

- `slideInOutDown`
- `slideInOutTop`
- `slideInOutLeft`
- `slideInOutRight`
- `зумInOut`
- `поворотInOutDown`
- `mixInAnimations`

Мы подробнее рассмотрим эти значения в следующем разделе.

А пока давайте познакомимся с разметкой, необходимой для представления одного модала:

```html
<button type="button" class="open-modal" data-open="modal1">...</button>
<div class="modal" id="modal1">
	<div class="modal-dialog">
		<header class="modal-header">
			...
			<button class="close-modal" aria-label="close modal" data-close>✕</button>
		</header>
		<section class="modal-content">...</section>
		<footer class="modal-footer">...</footer>
	</div>
</div>
```

## 2. Определим основные стили

Когда разметка готова, мы зададим несколько переменных CSS и сбросим стили:

```css
:root {
	--lightgray: #efefef;
	--blue: steelblue;
	--white: #fff;
	--black: rgba(0, 0, 0, 0.8);
	--bounceEasing: cubic-bezier(0.51, 0.92, 0.24, 1.15);
}
* {
	padding: 0;
	margin: 0;
}
button {
	cursor: pointer;
	background: transparent;
	border: none;
	outline: none;
	font-size: inherit;
}
```

Далее мы выровняем содержимое страницы по горизонтали и вертикали. Кроме того, мы придадим несколько стилей кнопке, отвечающей за открытие модала:

```css
/*CUSTOM VARIABLES HERE*/
body {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100vh;
	font: 16px/1.5 sans-serif;
}
.btn-group {
	text-align: center;
}
.open-modal {
	font-weight: bold;
	background: var(--blue);
	color: var(--white);
	padding: 0.75rem 1.75rem;
	margin-bottom: 1rem;
	border-radius: 5px;
}
```

На этом этапе мы сосредоточим свое внимание на стилях модала.

Каждый модал будет иметь следующие характеристики:

- Он будет полноэкранным с фиксированным положением. То есть он будет выглядеть как накладка, занимающая всю ширину и высоту окна.
- У него будет темный цвет фона.
- По умолчанию он будет скрыт.
- Диалог будет центрирован по горизонтали и вертикали.

```css
*CUSTOM VARIABLES HERE*/ .modal {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 1rem;
	background: var(--black);
	cursor: pointer;
	visibility: hidden;
	opacity: 0;
	transition: all 0.35s ease-in;
}
```

Диалог будет иметь максимальную ширину и максимальную высоту. Его высота будет равна 80% от высоты окна. В случаях, когда его высота превышает это значение, появится вертикальная полоса прокрутки:

```css
/*CUSTOM VARIABLES HERE*/
.modal-dialog {
	position: relative;
	max-width: 800px;
	max-height: 80vh;
	border-radius: 5px;
	background: var(--white);
	overflow: auto;
	cursor: default;
}
```

Напоследок зададим несколько простых стилей для отдельных разделов содержимого:

```css
/*CUSTOM VARIABLES HERE*/
.modal-dialog > * {
	padding: 1rem;
}
.modal-header,
.modal-footer {
	background: var(--lightgray);
}
.modal-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.modal-header .modal-close {
	font-size: 1.5rem;
}
.modal p + p {
	margin-top: 1rem;
}
```

## 3. Toggle JavaScript Modal

На странице может быть более одного JavaScript-модала. Но, как уже говорилось ранее, все модалы изначально будут скрыты.

### Open JavaScript Modal

Аналогично, на странице может быть более одного открытого триггера (элементы с атрибутом `data-open`). Каждый раз, когда триггер нажимается, связанный с ним модал должен становиться видимым с затухающей анимацией. Помните, что значение атрибута `data-open` должно совпадать с ID модала.

Вот скрипт, который открывает модальное окно:

```javascript
const openEls = document.querySelectorAll('[data-open]');
const isVisible = 'is-visible';
for (const el of openEls) {
	el.addEventListener('click', function () {
		const modalId = this.dataset.open;
		document.getElementById(modalId).classList.add(isVisible);
	});
}
```

И соответствующие классы CSS:

```css
.modal {
	visibility: hidden;
	opacity: 0;
	transition: all 0.35s ease-in;
}
.modal.is-visible {
	visibility: visible;
	opacity: 1;
}
```

### Close JavaScript Modal

В нашей реализации одновременно может отображаться только один модал (этот код не поддерживает вложенные модалы). Как упоминалось в разделе разметки выше, есть три метода скрыть его с эффектом затухания.

Давайте вспомним.

Во-первых, щелкните на пользовательском элементе `[data-close]`, который находится внутри модала:

```javascript
const closeEls = document.querySelectorAll('[data-close]');
const isVisible = 'is-visible';
for (const el of closeEls) {
	el.addEventListener('click', function () {
		this.parentElement.parentElement.parentElement.classList.remove(isVisible);
	});
}
```

Во-вторых, щелкнув на всем, что находится за пределами модала:

```javascript
const isVisible = 'is-visible';
document.addEventListener('click', (e) => {
	if (e.target == document.querySelector('.modal.is-visible')) {
		document.querySelector('.modal.is-visible').classList.remove(isVisible);
	}
});
```

В этом случае модал (оверлей) ведет себя как гигантская кнопка закрытия. По этой причине мы дали ему `курсор: указатель`.

И наконец, нажатием клавиши `Esc`:

```javascript
const isVisible = 'is-visible';
document.addEventListener('keyup', (e) => {
	if (e.key == 'Escape' && document.querySelector('.modal.is-visible')) {
		document.querySelector('.modal.is-visible').classList.remove(isVisible);
	}
});
```

Теперь самое время посмотреть на то, что мы уже создали:

https://codepen.io/tutsplus/pen/MMVbJv

Модал выглядит довольно неплохо! Обратите внимание, что каждый раз, когда мы нажимаем на открытый триггер, загружается только соответствующий модал.

Давайте сделаем еще один шаг вперед и рассмотрим некоторые идеи по анимации его диалога.

## 4. Добавление анимации диалогов

Как мы уже говорили, по умолчанию модальное окно затухает и исчезает. Но есть возможность настроить эффект анимации всплывающего окна.

Я уже создал кучу анимационных эффектов, которые вы можете использовать в качестве альтернативы эффекту затухания. Для этого просто передайте атрибут `data-animation="yourDesiredAnimation"` в `.modal`.

Например, если вы хотите, чтобы диалог отображался с анимацией скольжения слева направо, вам понадобится эффект `slideInOutLeft`.

За кулисами есть два правила, которые выполняют эту желаемую анимацию:

```css
/*CUSTOM VARIABLES HERE*/
[data-animation='slideInOutLeft'] .modal-dialog {
	opacity: 0;
	transform: translateX(-100%);
	transition: all 0.5s var(--bounceEasing);
}
[data-animation='slideInOutLeft'].is-visible .modal-dialog {
	opacity: 1;
	transform: none;
	transition-delay: 0.2s;
}
```

Посмотрите модальный диалог с таким типом анимации здесь:

https://codepen.io/tutsplus/pen/vqRyeo

Остальные анимации можно посмотреть на вкладке **CSS** финального демо-проекта. В зависимости от сложности анимации, я использовал для ее создания либо CSS-переходы, либо анимацию.

Я также использовал функцию `cubic-bezier()` для установки временной функции для всех переходов. Если вам не нравится эффект отскока, который получается, не стесняйтесь изменить его на что-то более плавное с помощью CSS-переменной `--bounceEasing`.

Посмотрите финальную демонстрацию со всеми анимационными эффектами здесь:

https://codepen.io/tutsplus/pen/vqRXPv

## 5. Полноэкранный модал

В качестве приятного дополнения к этому руководству была добавлена полноэкранная версия модификатора.

Давайте пойдем еще дальше и сделаем наш модал полноэкранным. Для этого сценария я создал новую демонстрацию, чтобы вам было проще разобраться в стилях. С точки зрения функциональности модала ничего не изменится.

https://codepen.io/tutsplus/pen/gOqYXeL

На этот раз у диалога не будет максимальной ширины и высоты, он будет расширяться, чтобы покрыть размер области просмотра. Кроме того, это будет гибкий контейнер, и его нижний колонтитул будет оставаться внизу независимо от содержимого модала.

Если пойти еще дальше, давайте рассмотрим альтернативную реализацию нашего полноэкранного JavaScript-модала, где мы размещаем изображение слева, а текст - справа (на мобильных устройствах они располагаются стопкой). Кроме того, здесь нет ни верхнего, ни нижнего колонтитула, а кнопка закрытия размещается как абсолютно позиционируемый элемент в правом верхнем углу.

https://codepen.io/tutsplus/pen/gOqYXeL

Поиграйте с ним, изменив размер окна браузера, чтобы увидеть, как он адаптируется к разным экранам.

Конечно, вы можете развить этот простой модальный макет и сделать его сетку более гибкой с помощью фреймворка, например [Tailwind CSS](https://tailwindcss.com/) или [Bootstrap](https://getbootstrap.com/). Вы также можете превратить модальную панель в лайтбокс, показывая сетку изображений, как мы делали в [этом руководстве](https://webdesign.tutsplus.com/masonry-layouts-with-css-grid-and-object-fit-cover--cms-37989t?_ga=2.219503569.991891258.1694331067-134669035.1678436241).

## Заключение

Вот и все, друзья! В этом уроке мы научились создавать пользовательские анимированные модальные диалоги на JavaScript, не полагаясь на какой-либо фронтенд-фреймворк. Надеюсь, вам понравился конечный результат, и его создание помогло освежить ваши навыки работы с внешним интерфейсом.

Имейте в виду, что мы не рассматривали доступность, так что если вы хотите улучшить эту демонстрацию, это, безусловно, может быть следующим шагом.

Как всегда, спасибо за чтение!
