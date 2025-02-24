---
title: >-
  Несколько способов справиться с побочным эффектом запроса, которые вы должны
  знать
meta_title: >-
  Несколько способов справиться с побочным эффектом запроса, которые вы должны
  знать | Игорь Горлов - Fullstack Developer
description: >-
  В React useEffect обычно используется для обработки побочных эффектов, включая
  обработку побочных эффектов запроса.


  Однако, когда дело доходит до обработки за
date: 2023-12-18T00:00:00.000Z
categories:
  - Как пофиксить
author: Игорь Горлов
draft: false
slug: neskolko-sposobov-spravytsia-s-pobochn-m-ffektom-zaprosa-kotor-e-v-dolzhn-znat
translatedPosition: 17
tags:
  - React
  - useEffect
image: >-
  ../../assets/images/neskolko-sposobov-spravytsia-s-pobochn-m-ffektom-zaprosa-kotor-e-v-dolzhn-znat-Dec-18-2023.avif
lastmod: 2024-03-20T21:26:48.908Z
---

В React useEffect обычно используется для обработки побочных эффектов, включая обработку побочных эффектов запроса.

Однако, когда дело доходит до обработки запросов, обычно используется async/await, но передача async-функции в качестве первого аргумента useEffect приведет к ошибке.

Это происходит потому, что useEffect ожидает функцию, возвращающую void, а async-функции возвращают promise.

Поэтому существует несколько способов обработки побочных эффектов запроса без ошибок, которые вы должны знать.

## 1. используйте выражение async-функции

```js
const [data, setData] = useState(null);

useEffect(() => {
	const fetchData = async () => {
		const result = await fetch('YOUR_URL_HERE');
		setData(result.data);
	};
	fetchData();
}, []);
```

Вы также можете абстрагировать выражение функции в хук useCallback вне useEffect, чтобы использовать его в других местах:

```js
const [data, setData] = useState(null);

const fetchData = useCallback(async () => {
	const result = await fetch('YOUR_URL_HERE');
	setData(result.data);
}, []);

useEffect(() => {
	fetchData();
}, [fetchData]);
```

## 2. использовать IIFE

```js
const [data, setData] = useState(null);
useEffect(() => {
	(async () => {
		const result = await fetch('YOUR_URL_HERE');
		setData(result.data);
	})();
}, []);
```

## 3. использовать Promise.then

```js
const [data, setData] = useState(null);

useEffect(() => {
	fetch('YOUR_URL_HERE').then((result) => setData(result.data));
}, []);
```

## 4. использовать объявление функций

```js
const [data, setData] = useState(null);

useEffect(() => {
	async function fetchData() {
		const result = await fetch('YOUR_URL_HERE');
		setData(result.data);
	}

	fetchData();
}, []);
```

Кроме того, вы можете абстрагировать это объявление функции в хук useCallback вне useEffect, чтобы использовать его в других местах.

Надеюсь, эти способы подойдут и вам :).
