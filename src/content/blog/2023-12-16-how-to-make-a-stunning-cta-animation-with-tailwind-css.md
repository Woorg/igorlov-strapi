---
title: Как сделать потрясающую CTA-анимацию с помощью Tailwind CSS
meta_title: >-
  Как сделать потрясающую CTA-анимацию с помощью Tailwind CSS | Игорь Горлов -
  Фронтeндер
description: >-
  Призыв к действию  самый важный элемент интерфейса, поскольку он позволяет
  пользователям превратить свои намерения в действия, а продуктам  в достижение
  кон
date: 2023-12-16T00:00:00.000Z
categories:
  - Учебник
author: Игорь Горлов
draft: false
slug: kak-sdelat-potriasaiuschuiu-cta-anymatsyiu-s-pomoschiu-tailwind-css
tags:
  - Tailwind
image: >-
  ../../assets/images/kak-sdelat-potriasaiuschuiu-cta-anymatsyiu-s-pomoschiu-tailwind-css-Dec-16-2023.avif
lastmod: 2024-03-20T21:26:44.180Z
---

Призыв к действию - самый важный элемент интерфейса, поскольку он позволяет пользователям превратить свои намерения в действия, а продуктам - в достижение конкретной цели (например, конвертировать потенциального покупателя в бесплатную пробную версию).

Во всех наших шаблонах Tailwind вы найдете как минимум один призыв к действию. Мы разработали их в неограниченном количестве форм и стилей, с конечной целью создать связь между продуктами и конечными пользователями.

Обычно нам нравится создавать простые и понятные CTA, но для этого урока (который был вдохновлен Glide) мы решили создать анимацию призыва к действию с помощью Tailwind CSS.

Мы создадим фальшивую кнопку, которая будет запускать несколько анимаций при наведении на нее курсора:

## Создание базовой структуры

Итак, давайте начнем с создания базовой структуры для нашего CTA. Мы будем использовать тег `<section>` в качестве контейнера и тег `<a>`, чтобы сделать все кликабельным.

```html
<section class="relative z-0">
	<div class="mx-auto w-full max-w-5xl px-4 py-48 md:px-6">
		<div class="text-center">
			<!-- Link to section 0 -->
			<a
				class="flex flex-col items-center justify-center space-y-4 font-semibold text-slate-900 text-3xl sm:text-4xl md:text-5xl lg:flex-row lg:space-x-6 lg:space-y-0"
				href="#0"
			>
				<!-- Fake button -->
				<span>
					<!-- Default content: "Build the UI you need" -->
					<span>Build the UI you need</span>
					<!-- Hover content: "Create beautiful user interfaces" -->
					<span
						class="before:content-['Create_beautiful_user_interfaces'] after:content-['Create_beautiful_user_interfaces']"
						aria-hidden="true"
					></span>
				</span>
				<!-- Text: "With Kruipom" -->
				<span>With Kruipom</span>
			</a>
		</div>
	</div>
</section>
```

Настройка довольно проста. Единственное, что следует отметить, это то, что мы использовали псевдоатрибуты `before` и `after` для перемещаемого текста. Это позволяет нам дублировать текст без создания еще одного элемента.

## Изменение цветового режима секции при наведении

Прежде чем определять остальные элементы стиля, давайте посмотрим, как изменить цвет фона при наведении мыши. Мы будем использовать псевдоатрибут `before` для создания наложения.

```html
<section class="relative z-0">
	<!-- The main section of the webpage -->
	<div class="mx-auto w-full max-w-5xl px-4 py-48 md:px-6">
		<!-- A container for the content -->
		<div class="text-center">
			<!-- Center-align the content -->
			<a
				class="group flex flex-col items-center justify-center space-y-4 font-semibold text-slate-900 text-3xl before:absolute before:inset-0 before:-z-10 before:transition-colors before:duration-500 hover:before:bg-slate-900 sm:text-4xl md:text-5xl lg:flex-row lg:space-x-6 lg:space-y-0"
				href="#0"
			>
				<!-- A link with some styles -->
				<span>
					<!-- The default content: "Build the UI you need" -->
					<span class="transition-opacity duration-500 ease-in-out group-hover:opacity-0"
						>Build the UI you need</span
					>
					<!-- Hover content: "Создавайте красивые пользовательские интерфейсы" -->
					<span
						class="before:content-['Create_beautiful_user_interfaces'] after:content-['Create_beautiful_user_interfaces']"
						aria-hidden="true"
					></span>
				</span>
				<!-- Text: "с Круипом" -->
				<span>с Круипом</span>
			</a>
		</div>
	</div>
</section>
```

## Создание фальшивого взаимодействия с кнопкой

Чтобы сделать плавный переход между содержимым по умолчанию и hover-контентом, мы расположим последний абсолютно непрозрачно, 0. А с помощью модификатора Tailwind `group-hover:` мы будем переключать непрозрачность.

`<section class="relative z-0"> <div class="w-full max-w-5xl mx-auto px-4 md:px-6 py-48"> <div class="text-center"> <a class="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6 items-center justify-center text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-900 before:absolute before:inset-0 hover:before:bg-slate-900 before:-z-10 before:transition-colors before:duration-500 group" href="#0" > <!-- Фальшивая кнопка --> <span class="relative"> <!-- Содержание по умолчанию: "Build the UI you need" --> <span class="group-hover:opacity-0 transition-opacity duration-500 ease-in-out">Build the UI you need</span> <!-- Hover content: "Создавайте красивые пользовательские интерфейсы" --> <span class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 before:content-['Create_beautiful_user_interfaces'] after:content-['Create_beautiful_user_interfaces']" aria-hidden="true" ></span> </span> <!-- Текст: "с Круипом" --> <span>с Круипом</span> </a> </div> </div> </section>`

## Стилизация кнопки

Теперь давайте придадим стиль кнопке. Сначала определим стиль для текста по умолчанию. Мы используем множество классов-утилит Tailwind, чтобы задать отступы, градиенты фона, градиенты границ и многое другое.

```html
<!-- Фальшивая кнопка -->
<span
	class="relative flex items-center justify-center overflow-hidden rounded-full bg-slate-200 p-0.5 transition duration-500 group-hover:bg-slate-800"
>
	<span class="relative whitespace-nowrap">
		<!-- Содержание по умолчанию: "Build the UI you need" -->
		<span
			class="z-10 block rounded-full bg-gradient-to-r from-slate-200 to-slate-100 px-8 py-6 transition-opacity duration-500 ease-in-out group-hover:opacity-0"
		>
			Build the UI you need
		</span>
		<!-- Hover content: "Создавайте красивые пользовательские интерфейсы" -->
		<span
			class="absolute inset-0 opacity-0 transition-opacity duration-500 before:content-['Create_beautiful_user_interfaces'] after:content-['Create_beautiful_user_interfaces'] group-hover:opacity-100"
			aria-hidden="true"
		></span>
	</span>
</span>
```

После того, как мы разобрались с этим, мы можем перейти к стилизации “hover content”:

```html
<!-- Фальшивая кнопка -->
<span
	class="relative flex items-center justify-center overflow-hidden rounded-full bg-slate-200 p-0.5 transition duration-500 group-hover:bg-slate-800"
>
	<span class="relative whitespace-nowrap">
		<!-- Содержание по умолчанию: "Build the UI you need" -->
		<span
			class="z-10 block rounded-full bg-gradient-to-r from-slate-200 to-slate-100 px-8 py-6 transition-opacity duration-500 ease-in-out group-hover:opacity-0"
			>Build the UI you need</span
		>
		<!-- Hover content: "Создавайте красивые пользовательские интерфейсы" -->
		<span
			class="absolute inset-0 z-10 inline-flex items-center overflow-hidden whitespace-nowrap rounded-full bg-gradient-to-r from-slate-900 to-slate-800 opacity-0 transition-opacity duration-500 before:bg-gradient-to-r before:from-indigo-500 before:to-indigo-300 before:bg-clip-text before:px-2 before:text-transparent before:content-['Create_beautiful_user_interfaces'] after:bg-gradient-to-r after:from-indigo-500 after:to-indigo-300 after:bg-clip-text after:px-2 after:text-transparent after:content-['Create_beautiful_user_interfaces'] group-hover:opacity-100"
			aria-hidden="true"
		></span>
	</span>
</span>
```

И наконец, мы добавим еще несколько классов, чтобы определить стиль последней части текста:

```html
<span class="transition-colors duration-500 ease-in-out group-hover:text-slate-300"
	>with Cruip</span
>
```

Вот и все! Мы создали плавный переход от светлого к темному режиму при наведении на кнопку и добавили классный эффект кроссфейда.

Теперь мы можем перейти к самой интересной части: созданию анимации прокрутки текста и эффекта сияния границ кнопки.

## Создание анимации прокрутки текста

Чтобы создать этот эффект, нам нужно всего лишь определить пользовательскую анимацию в файле конфигурации Tailwind. Мы назовем ее `infinite-scroll` и настроим на прокрутку справа налево. Вот код:

```js
tailwind.config = { theme: { extend: { animation: { 'infinite-scroll': 'infinite-scroll 6s linear infinite', }, keyframes: { 'infinite-scroll': { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-100%)' }, }, }, }, }, }, };
```

После того как мы настроили анимацию, мы можем легко применить ее к нашему псевдоэлементу, используя класс `animate-infinite-scroll`. Например:

```html
<!-- Hover content: "Создаем красивые пользовательские интерфейсы" -->
<span
	class="before:animate-infinite-scroll after:animate-infinite-scroll absolute inset-0 z-10 inline-flex items-center overflow-hidden whitespace-nowrap rounded-full bg-gradient-to-r from-slate-900 to-slate-800 opacity-0 transition-opacity duration-500 before:bg-gradient-to-r before:from-indigo-500 before:to-indigo-300 before:bg-clip-text before:px-2 before:text-transparent before:content-['Create_beautiful_user_interfaces'] after:bg-gradient-to-r after:from-indigo-500 after:to-indigo-300 after:bg-clip-text after:px-2 after:text-transparent after:content-['Create_beautiful_user_interfaces'] group-hover:opacity-100"
	aria-hidden="true"
></span>
```

## Создание эффекта блеска

Это последний шаг, завершающий создание нашего CTA. Чтобы создать эффект блеска, мы используем линейный градиент и применим его к псевдоатрибуту before элемента кнопки. Поскольку этот градиент немного сложный, мы воспользуемся функцией произвольных значений Tailwind, чтобы достичь его.

Чтобы сделать эффект блеска более ярким, мы также добавим к градиенту бесконечное вращение. Для этого нам не нужно создавать собственную анимацию. Мы можем просто использовать `animate-spin` от Tailwind и использовать пользовательский класс для изменения времени вращения по умолчанию, как показано здесь: `animate-[spin_3s_linear_infinite]`.

Итак, вот обновленный код:

## Выводы

С новой функцией произвольных значений в третьей версии Tailwind CSS стал невероятно гибким инструментом. Он позволяет создавать сложные эффекты, подобные тому, что мы вам показали, не написав ни одной строки CSS.

Если вы хотите увидеть больше подобных CSS-анимаций, рекомендуем ознакомиться с нашими учебниками по Tailwind. Например, у нас есть руководство о том, как сделать анимированный счетчик чисел, а также о том, как создать анимацию бесконечной горизонтальной прокрутки.
