---
title: Как сделать анимированный счетчик чисел с помощью Tailwind CSS
meta_title: |
  Как Сделать Анимированный Счетчик Чисел С Помощью...
description: >
  Анимированный счетчик - это особый тип эффекта, применяемый к числовым
  элементам, чтобы сделать их динамичными.
date: 2023-10-28T16:52:31.588Z
image: >-
  ../../assets/images/kak-sdelatь-animirovannyj-schetchik-chisel-s-pomoshьyu-tailwind-css-Oct-28-2023.avif
categories:
  - Как закодить
author: Igor Gorlov
tags:
  - Tailwind
draft: false
keywords:
  - Tailwind CSS
type: blog
slug: kak-sdelatь-animirovannyj-schetchik-chisel-s-pomoshьyu-tailwind-css
lastmod: 2024-03-20T21:26:44.993Z
---

Анимированный счетчик - это особый тип эффекта, применяемый к числовым элементам, чтобы сделать их динамичными.

С точки зрения пользовательского опыта этот эффект рекомендуется для привлечения внимания пользователя к важным данным или статистике, но не рекомендуется, если информация не является особенно важной, так как анимация требует некоторого времени для загрузки.

На момент написания этой статьи мы никогда не включали этот элемент в наши шаблоны Tailwind CSS, поэтому мы решили написать учебник, который объяснит, как его создать и добавить на вашу посадочную страницу или веб-сайт (в качестве альтернативы, вы можете использовать готовый вариант, который мы закодировали для вас в этом учебнике - он бесплатен!).

Давайте начнем!

## Объяснение техники

Знаете ли вы, что вы можете создать анимированный счетчик чисел, используя только CSS? Да, вы можете! В этом учебнике мы покажем вам, как это сделать с использованием Tailwind CSS.

Прежде чем погрузиться в код, давайте объясним технику, которую мы будем использовать для создания этой анимации. Некоторое время назад для создания такой анимации требовался JavaScript. Однако благодаря CSS at-rule @property, мы теперь можем анимировать CSS-переменные. Это является значительным развитием в CSS, потому что это позволяет нам анимировать не только числа, но и буквы!

В двух словах, мы определим CSS @property, представляющее наше число, с начальным значением. Это свойство будет анимировано с использованием простого перехода CSS. Наконец, мы будем использовать свойство counter-set для отображения значения счетчика.

Важно: Прежде чем мы продолжим, важно отметить, что на момент написания этой техники работает только в браузерах Chrome и на основе Chromium, таких как Edge и Opera. Несмотря на то, что at-rule @property поддерживается основными браузерами уже некоторое время, Safari пока не поддерживает свойство counter-set, и у Firefox могут возникнуть проблемы с переходом от начального значения к целевому числу. Тем не менее, вы можете с уверенностью использовать этот подход в производстве, поскольку он плавно деградирует, чтобы показать значение без анимации в браузерах, не поддерживающих эту функцию.

## Создание структуры HTML

Хорошо, давайте создадим секцию с сеткой, состоящей из 3 блоков. Каждый блок содержит значок, число, заголовок и описание. Сначала добавьте класс сетки к секции и класс grid-cols-3, чтобы определить 3-колоночное расположение. Кроме того, добавьте класс gap-12, чтобы установить промежуток между столбцами.

```html
<section class="grid gap-12 md:grid-cols-3 md:gap-16">
	<!-- Block #1 -->
	<article>
		<div
			class="mb-6 flex h-14 w-14 rotate-3 items-center justify-center rounded bg-white shadow-md"
		>
			<svg xmlns="http://www.w3.org/2000/svg" width="31" height="20">
				<defs>
					<linearGradient id="icon1-a" x1="50%" x2="50%" y1="0%" y2="100%">
						<stop offset="0%" stop-color="#A5B4FC" />
						<stop offset="100%" stop-color="#4F46E5" />
					</linearGradient>
					<linearGradient id="icon1-b" x1="50%" x2="50%" y1="0%" y2="100%">
						<stop offset="0%" stop-color="#EEF2FF" />
						<stop offset="100%" stop-color="#C7D2FE" />
					</linearGradient>
				</defs>
				<g fill="none" fill-rule="nonzero">
					<path
						fill="url(#icon1-a)"
						d="M20.625 0H9.375a9.375 9.375 0 0 0 0 18.75h11.25a9.375 9.375 0 0 0 0-18.75Z"
						transform="translate(.885 .885)"
					/>
					<path
						fill="url(#icon1-b)"
						d="M9.375 17.5A8.125 8.125 0 0 1 1.25 9.375 8.125 8.125 0 0 1 9.375 1.25 8.125 8.125 0 0 1 17.5 9.375 8.125 8.125 0 0 1 9.375 17.5Z"
						transform="translate(.885 .885)"
					/>
				</g>
			</svg>
		</div>
		<h2>
			<span class="mb-2 flex font-extrabold text-slate-900 text-5xl"> 40K+ </span>
			<span
				class="mb-2 inline-flex bg-gradient-to-r from-indigo-500 to-indigo-300 bg-clip-text font-semibold text-transparent"
				>Variations</span
			>
		</h2>
		<p class="text-slate-500 text-sm">
			Many desktop publishing packages and web page editors now use Pinky as their default model
			text.
		</p>
	</article>

	<!-- Block #2 -->
	<!-- Block #3 -->
</section>
```

Здесь нет много, что объяснять. Код выше определяет структуру одного блока. Но число все равно статичное, поэтому давайте посмотрим, как его анимировать!

## Определение анимации счетчика с помощью CSS

Как упоминалось ранее, мы будем использовать свойство CSS @property для анимации числа. В идеале вы определили бы это свойство в отдельном файле CSS, но для простоты мы определим его непосредственно в нашем HTML-файле. Поэтому добавим следующий код внутри тега <style>:

```css
@property --num {
	syntax: '<integer>';
	initial-value: 0;
	inherits: false;
}
```

Как видите, мы определили свойство с именем --num для представления нашего числа. Мы установили начальное значение в 0, и значение может быть только целым числом. Наконец, мы указали, что это свойство не может быть унаследовано.

Теперь, чтобы анимировать число, нам нужно определить переход. На этом этапе, поскольку мы хотим запустить анимацию при загрузке страницы, нам нужно определить анимацию с помощью @keyframes. Добавьте следующий код в наш тег <style> и измените наш стиль в строке 29 следующим образом:

```css
<style>
    @property --num {
        syntax: '<integer>';
        initial-value: 0;
        inherits: false;
    }
    @keyframes counter {
        from {
            --num: 0;
        }
        to {
            --num: 40;
        }
    }
</style>
```

Мы определили анимацию с именем “counter”, которая идет от 0 до 40. Теперь нам нужно изменить часть HTML, содержащую число, чтобы анимация работала. Измените наш встроенный стиль следующим образом:

```html
<h2>
	<span
		class="mb-2 flex animate-[counter_3s_ease-out_forwards] font-extrabold tabular-nums text-slate-900 text-5xl [counter-set:_num_var(--num)] before:content-[counter(num)]"
	>
		<span class="sr-only">40</span>K+
	</span>
	<span
		class="mb-2 inline-flex bg-gradient-to-r from-indigo-500 to-indigo-300 bg-clip-text font-semibold text-transparent"
		>Variations</span
	>
</h2>
```

Давайте рассмотрим классы, которые мы добавили:

- animate-[counter_3s_ease-out_forwards]: Этот класс определяет имя анимации, продолжительность и функцию сглаживания. Он генерируется на лету благодаря произвольным вариантам Tailwind CSS.
- [counter-set:_num_var(--num)]: Этот класс определяет значение счетчика, которое определяется свойством --num, которое мы определили ранее.
- before:content-[counter(num)]: Этот класс позволяет нам отображать число как содержимое псевдоэлемента ::before. Чтобы использовать эту технику, мы оборачиваем число в <span> и скрываем его из виду с помощью класса sr-only.
- Наконец, мы добавили класс tabular-nums, который обеспечивает равномерное распределение пространства для каждого числа. Это свойство CSS существенно для поддержания одинаковой ширины блока во время анимации, что обеспечивает более плавное визуальное восприятие.

Анимация теперь работает отлично. Однако начинать анимацию сразу после загрузки страницы может быть не самой лучшей идеей, особенно если счетчик находится внизу страницы. В этом случае анимация начнется немедленно и может остаться незамеченной пользователем.

В идеале мы бы хотели, чтобы анимация начиналась только тогда, когда пользователь дойдет до блока с счетчиком. Для достижения этой цели нам понадобится немного JavaScript.

## Запуск анимации с помощью JavaScript

Если вы следили за нашими другими учебниками, вам, возможно, знакома библиотека Alpine.js. Это легкая библиотека JavaScript, которая позволяет добавить интерактивность на ваш сайт, не писать ни одной строки JavaScript. Ее очень легко использовать, и мы покажем вам, как сделать так, чтобы анимация запускалась, когда пользователь прокручивает к ней.

В первую очередь давайте добавим библиотеку в наш проект. Вставьте следующий код внутри тега <head>:

```html
<script defer src="https://cdn.jsdelivr.net/npm/@alpinejs/intersect@3.x.x/dist/cdn.min.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
```

Помимо Alpine.js, мы также импортировали библиотеку @alpinejs/intersect, которая позволяет нам запускать действие, когда элемент входит или выходит из видимой области. Это именно то, что нам нужно для запуска анимации счетчика.

Следующим шагом является определение переменной с именем shown, изначально установленной в false. Мы изменим это значение на true, когда элемент войдет в видимую область. Наконец, мы обновим класс блока, содержащего счетчик, в зависимости от значения переменной shown. Обновите наш HTML следующим образом:

```html
<h2>
	<span
		class="mb-2 flex font-extrabold tabular-nums text-slate-900 transition-[_--num] duration-[3s] ease-out text-5xl [counter-set:_num_var(--num)] supports-[counter-set]:before:content-[counter(num)]"
		x-data="{ shown: false }"
		x-intersect="shown = true"
		:class="shown && '[--num:40]'"
	>
		<span class="supports-[counter-set]:sr-only">40</span>K+
	</span>
	<span
		class="mb-2 inline-flex bg-gradient-to-r from-indigo-500 to-indigo-300 bg-clip-text font-semibold text-transparent"
		>Variations</span
	>
</h2>
```

С этим сделанным, мы можем удалить правило @keyframes, поскольку класс [--num:40] теперь определяет конечное значение счетчика.

Обратите внимание, что мы также добавили класс supports-[counter-set] к блоку, содержащему счетчик. Этот класс позволяет отображать число как содержимое псевдо-элемента ::before только в том случае, если браузер поддерживает свойство counter-set. Таким образом, если браузер не поддерживает это свойство, число все равно будет отображаться, хоть и без анимации.

И вот окончательный код:

```html
<-- Inline style -->
<style>
	@property --num {
		syntax: '<integer>';
		initial-value: 0;
		inherits: false;
	}
</style>

<-- Counters -->
<section class="grid gap-12 md:grid-cols-3 md:gap-16">
	<!-- Block #1 -->
	<article>
		<div
			class="mb-6 flex h-14 w-14 rotate-3 items-center justify-center rounded bg-white shadow-md"
		>
			<svg xmlns="http://www.w3.org/2000/svg" width="31" height="20">
				<defs>
					<linearGradient id="icon1-a" x1="50%" x2="50%" y1="0%" y2="100%">
						<stop offset="0%" stop-color="#A5B4FC" />
						<stop offset="100%" stop-color="#4F46E5" />
					</linearGradient>
					<linearGradient id="icon1-b" x1="50%" x2="50%" y1="0%" y2="100%">
						<stop offset="0%" stop-color="#EEF2FF" />
						<stop offset="100%" stop-color="#C7D2FE" />
					</linearGradient>
				</defs>
				<g fill="none" fill-rule="nonzero">
					<path
						fill="url(#icon1-a)"
						d="M20.625 0H9.375a9.375 9.375 0 0 0 0 18.75h11.25a9.375 9.375 0 0 0 0-18.75Z"
						transform="translate(.885 .885)"
					/>
					<path
						fill="url(#icon1-b)"
						d="M9.375 17.5A8.125 8.125 0 0 1 1.25 9.375 8.125 8.125 0 0 1 9.375 1.25 8.125 8.125 0 0 1 17.5 9.375 8.125 8.125 0 0 1 9.375 17.5Z"
						transform="translate(.885 .885)"
					/>
				</g>
			</svg>
		</div>
		<h2>
			<span
				class="mb-2 flex font-extrabold tabular-nums text-slate-900 transition-[_--num] duration-[3s] ease-out text-5xl [counter-set:_num_var(--num)] supports-[counter-set]:before:content-[counter(num)]"
				x-data="{ shown: false }"
				x-intersect="shown = true"
				:class="shown && '[--num:40]'"
			>
				<span class="supports-[counter-set]:sr-only">40</span>K+
			</span>
			<span
				class="mb-2 inline-flex bg-gradient-to-r from-indigo-500 to-indigo-300 bg-clip-text font-semibold text-transparent"
				>Variations</span
			>
		</h2>
		<p class="text-slate-500 text-sm">
			Many desktop publishing packages and web page editors now use Pinky as their default model
			text.
		</p>
	</article>
	<!-- Block #2 -->
	<article>
		<div
			class="mb-6 flex h-14 w-14 -rotate-3 items-center justify-center rounded bg-white shadow-md"
		>
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="19">
				<defs>
					<linearGradient id="icon2-a" x1="50%" x2="50%" y1="0%" y2="100%">
						<stop offset="0%" stop-color="#A5B4FC" />
						<stop offset="100%" stop-color="#4F46E5" />
					</linearGradient>
					<linearGradient id="icon2-b" x1="50%" x2="50%" y1="0%" y2="100%">
						<stop offset="0%" stop-color="#E0E7FF" />
						<stop offset="100%" stop-color="#A5B4FC" />
					</linearGradient>
				</defs>
				<g fill="none" fill-rule="nonzero">
					<path
						fill="url(#icon2-a)"
						d="M5.5 0a5.5 5.5 0 0 0 0 11c.159 0 .314-.01.469-.024a15.896 15.896 0 0 1-2.393 6.759A.5.5 0 0 0 4 18.5h1a.5.5 0 0 0 .362-.155C7.934 15.64 11 11.215 11 5.5A5.506 5.506 0 0 0 5.5 0Z"
					/>
					<path
						fill="url(#icon2-b)"
						d="M18.5 0a5.5 5.5 0 0 0 0 11c.159 0 .314-.01.469-.024a15.896 15.896 0 0 1-2.393 6.759.5.5 0 0 0 .424.765h1a.5.5 0 0 0 .363-.155C20.934 15.64 24 11.215 24 5.5A5.506 5.506 0 0 0 18.5 0Z"
					/>
				</g>
			</svg>
		</div>
		<h2>
			<span
				class="mb-2 flex font-extrabold tabular-nums text-slate-900 transition-[_--num] duration-[3s] ease-out text-5xl [counter-set:_num_var(--num)] supports-[counter-set]:before:content-[counter(num)]"
				x-data="{ shown: false }"
				x-intersect="shown = true"
				:class="shown && '[--num:70]'"
			>
				<span class="supports-[counter-set]:sr-only">70</span>K+
			</span>
			<span
				class="mb-2 inline-flex bg-gradient-to-r from-indigo-500 to-indigo-300 bg-clip-text font-semibold text-transparent"
				>Lessons</span
			>
		</h2>
		<p class="text-slate-500 text-sm">
			Many desktop publishing packages and web page editors now use Pinky as their default model
			text.
		</p>
	</article>
	<!-- Block #3 -->
	<article>
		<div
			class="mb-6 flex h-14 w-14 rotate-3 items-center justify-center rounded bg-white shadow-md"
		>
			<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26">
				<defs>
					<radialGradient
						id="icon3-a"
						cx="68.15%"
						cy="27.232%"
						r="67.641%"
						fx="68.15%"
						fy="27.232%"
					>
						<stop offset="0%" stop-color="#E0E7FF" />
						<stop offset="100%" stop-color="#A5B4FC" />
					</radialGradient>
				</defs>
				<g fill="none" fill-rule="nonzero">
					<circle cx="13" cy="13" r="13" fill="url(#icon3-a)" />
					<path
						fill="#4F46E5"
						fill-opacity=".56"
						d="M0 13a12.966 12.966 0 0 0 4.39 9.737l1.15-1.722s.82-.237.997-.555c.554-.997-.43-2.733-.43-2.733a5.637 5.637 0 0 0-.198-1.23c-.148-.369-1.182-.874-1.182-.874S3.73 13.998 3.73 13a1.487 1.487 0 0 1 1.404-1.55 2.424 2.424 0 0 0 1.588-1.146s1.256-.332 1.551-.847c.295-.515-.332-2.36-.332-2.36a3.086 3.086 0 0 0-.012-1.481 2.8 2.8 0 0 0-.93-1.12 6.143 6.143 0 0 0-1.447-2.148A12.981 12.981 0 0 0 0 13ZM13 0c-.35 0-.696.018-1.04.045-.112.35-.695 1.248-.548 1.653.147.406 1.353.783 1.353.783s-.32 1.25.235 1.692c.554.443 1.44-.148 1.773-.037.331.111.258 2.29.258 2.29s1.07 1.181 2.124 1.33c1.053.147 2.656-1.64 2.656-1.64a21.131 21.131 0 0 0 3.448-1.102A12.974 12.974 0 0 0 13 0Z"
					/>
					<path
						fill="#6366F1"
						fill-opacity=".4"
						d="M21.398 13.848c.296.702-.555 2.494-1.256 2.843a4.76 4.76 0 0 0-1.82 1.452c-.259.406-.598 2.082-1.447 2.415-.85.332-2.863 2.228-3.934 1.932-1.071-.296-1.071-2.842-.333-3.988.441-.683-.074-2.179-.113-2.695-.039-.517-1.586-1.478-1.586-1.994 0-.813 1.772-2.955 1.772-2.955s1.453-.48 1.896-.37c.448.164.877.374 1.28.628.782.058 1.552.22 2.29.48l.848.775s2.107.777 2.403 1.477Z"
					/>
				</g>
			</svg>
		</div>
		<h2>
			<span
				class="mb-2 flex font-extrabold tabular-nums text-slate-900 transition-[_--num] duration-[3s] ease-out text-5xl [counter-set:_num_var(--num)] supports-[counter-set]:before:content-[counter(num)]"
				x-data="{ shown: false }"
				x-intersect="shown = true"
				:class="shown && '[--num:149]'"
			>
				<span class="supports-[counter-set]:sr-only">149</span>+
			</span>
			<span
				class="mb-2 inline-flex bg-gradient-to-r from-indigo-500 to-indigo-300 bg-clip-text font-semibold text-transparent"
				>Workshops</span
			>
		</h2>
		<p class="text-slate-500 text-sm">
			Many desktop publishing packages and web page editors now use Pinky as their default model
			text.
		</p>
	</article>
</section>
```

## Вывод

В этом учебнике мы использовали нестандартный подход, используя только CSS для создания анимации счетчика. Если для вас приоритетом не является достижение однородных результатов во всех браузерах, этот метод предоставляет более интересную альтернативу для подобных задач.

Если вам понравился этот учебник, ознакомьтесь с нашей полной серией учебников по Tailwind CSS или с готовыми шаблонами, если вы ищете готовый интерфейс для вашего следующего проекта.
