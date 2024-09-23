---
title: Как реализовать перегрузку функции Typescript
meta_title: Как реализовать перегрузку функции Typescript | Игорь Горлов - Фронтeндер
description: "\U0001F44B Привет, друзья! В этом посте я хочу затронуть тему перегрузки функций и объяснить, почему так важно понимать эту концепцию и почему не стоит бояться ее испо"
date: 2023-12-15T19:26:57.884Z
image: >-
  ../../assets/images/kak-realyzovat-perehruzku-funktsyy-typescript-Dec-15-2023.avif
categories:
  - Учебник
author: Igor Gorlov
tags:
  - TypeScript
draft: false
translated: ''
translatedPosition: ''
type: blog
slug: kak-realyzovat-perehruzku-funktsyy-typescript
lastmod: 2024-03-20T21:26:43.572Z
---

👋 Привет, друзья! В этом посте я хочу затронуть тему перегрузки функций и объяснить, почему так важно понимать эту концепцию и почему не стоит бояться ее использовать!

## [](https://dev.to/dealwith/how-to-implement-typescript-function-overload-1ogb#wiki-definition)📃 Вики-определение

> Перегрузка функций или перегрузка методов - это возможность создания нескольких одноименных функций с разными реализациями. При вызове перегруженной функции будет выполняться определенная версия этой функции, соответствующая контексту вызова.

## [](https://dev.to/dealwith/how-to-implement-typescript-function-overload-1ogb#wiki-definition-explanation)🧐 Викификация Пояснение

В двух словах _перегрузка функции_ - это функция с несколькими сигнатурами вызова. Это означает, что существует несколько способов вызова функции.

Пример:
Давайте рассмотрим пример функции, которая может быть вызвана несколькими способами с разными аргументами

```ts
type ProductParams = {
	promo?: boolean;
	isArchived?: boolean;
};

function getProducts(params: ProductParams) {
	const url = new URL('/api/v1/products');
	const urlParams = new URLSearchParams();

	if ('promo' in params) {
		urlParams.append('promo', params.promo.toString());
	}

	if ('isArchived' in params) {
		urlParams.append('isArchived', params.isArchived.toString());
	}

	url.search = urlParams.toString();

	return fetch(url.toString()).then((res) => res.json());
}
```

Вы можете вызвать эту `функцию` двумя разными способами, с двумя разными параметрами. Наша функция будет возвращать из `API` продукты, которые могут быть `promo` или `archived`, или как `promo`, так и `archived`.

## [](https://dev.to/dealwith/how-to-implement-typescript-function-overload-1ogb#multiple-function-signatures)🔍 Множественные подписи функций

Подход Typescript к перегрузке функций довольно сильно отличается от некоторых других языков. Вместо нескольких определений функций в TypeScript используется несколько сигнатур функций, за которыми следует одно тело функции.

Программа проверки типов оценивает эти сигнатуры сверху вниз. Этот порядок имеет значение, потому что TypeScript будет использовать первую сигнатуру, которая соответствует вызову функции. Например, если вызов функции может соответствовать двум перегруженным сигнатурам, TypeScript выберет ту, которая указана первой. Поэтому рекомендуется перечислять более конкретные сигнатуры выше, а более широкие - ниже.

## [](https://dev.to/dealwith/how-to-implement-typescript-function-overload-1ogb#lets-implement-the-overloading-for-the-example-function)💻 Давайте реализуем перегрузку для примера функции

```ts
// Интерфейсы продуктов
интерфейс PromoProducts {
	//... некоторые свойства, специфичные для промо-продуктов
}

интерфейс ArchivedProducts {
	//... некоторые свойства, характерные для архивных продуктов
}

интерфейс PromoAndArchivedProducts {
	//... некоторые свойства, объединяющие промо- и архивные продукты
}

type ProductParams = {
	promo?: boolean;
	isArchived?: boolean;
};

// Сигнатуры перегрузки функций
function getProducts(params: { promo: true }): Promise<PromoProducts>;
function getProducts(params: { isArchived: true }): Promise<ArchivedProducts>;
function getProducts(params: { promo: true; isArchived: true }): Promise<PromoAndArchivedProducts>;

function getProducts(params: ProductParams) {
	const url = new URL('/api/v1/products');
	const urlParams = new URLSearchParams();

	if ('promo' in params) {
		urlParams.append('promo', params.maxPrice.toString());
	}

	if ('isArchived' in params) {
		urlParams.append('isArchived', params.isArchived.toString());
	}

	url.search = urlParams.toString();

	return fetch(url.toString()).then((res) => res.json());
}
```

После реализации мы сможем использовать нашу `функцию` различными способами и будем иметь определенный тип безопасности.

## [](https://dev.to/dealwith/how-to-implement-typescript-function-overload-1ogb#finish)🏁 Finish

Я рекомендую не бояться использовать перегрузку функций. Это очень полезно, когда вы предоставляете интерфейсы с большим количеством типов и стремитесь к лучшей читаемости и безопасности кода.
