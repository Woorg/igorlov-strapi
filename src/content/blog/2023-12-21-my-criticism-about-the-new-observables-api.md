---
title: Моя критика по поводу нового API Observables
meta_title: Моя критика по поводу нового API Observables | Игорь Горлов - Фронтeндер
description: >-
  Observable  это общий паттерн для составления конвейера синхронных и
  асинхронных операций. Смысл этого паттерна в том, чтобы дать возможность
  упростить разд
date: 2023-12-21T00:00:00.000Z
categories:
  - uchebniki
author: Игорь Горлов
draft: false
slug: moia-krytyka-po-povodu-novoho-api-observables
tags:
  - Паттерны
  - Observable
image: >-
  ../../assets/images/moia-krytyka-po-povodu-novoho-api-observables-Dec-21-2023.avif
lastmod: 2024-03-20T21:26:47.226Z
---

“Observable” - это общий паттерн для составления конвейера синхронных и асинхронных операций. Смысл этого паттерна в том, чтобы дать возможность упростить разделение кода, которое является важным и мощным архитектурным приемом. Он уже используется в различных библиотеках и кажется довольно надежным.

Так стоит ли делать его частью платформы? Я так не думаю, и вот почему…

Эта статья - краткое изложение моих мыслей по этим вопросам: https://github.com/WICG/observable/issues/56 и https://github.com/WICG/observable/issues/41.

Когда мы создаем всемирную платформу, не имеющую возможности для внесения изменений, мы должны очень тщательно выбирать новые примитивы. Давайте изучим все ”за” и "против".

## Преимущества

Важно понимать, что мы говорим не о “Observable” как таковом, а именно о добавлении его в платформу и о том, какие преимущества может дать нам эта стандартизация.

Улучшения в бандле, но предлагаемые основные функции занимают всего ~1 кб, что не так уж и много.

Стандартизация API для лучшей совместимости с экосистемой - важный момент, но интерфейс и так прост, и существует не так много способов сделать его неправильно.

надежность события и улучшение котельного шаблона - самые полезные и важные моменты этого предложения, но паттерн Observable - не единственный способ их достижения.

## Недостатки

Что может пойти не так, если мы добавим Observables в платформу?

Это приведет к появлению еще одного способа выполнения одной и той же задачи, что запутает новичков и сделает платформу более сложной. У нас уже есть обратные вызовы, обещания, async/await, события, потоки и генераторы. Операторов всегда будет не хватать. Обязательно посмотрите rxjs.dev/api. Мы не уверены в том, как это должно работать. Популярная библиотека observables RxJS постоянно совершенствуется и меняется. Ее внутренняя логика и кодовая база непросты. Так почему же мы считаем, что предлагаемого сейчас API будет достаточно для нас в будущем?

Последний вопрос - самый важный для веб-платформы.

Я исследую и разрабатываю реактивные примитивы уже более 5 лет, и в чем я уверен, так это в том, что мы все еще не знаем об этом достаточно.

Многие проблемы, с которыми сталкиваются разработчики, связаны с проблемой глюков. Существует множество способов справиться с ней, но универсального решения нет. Вот краткий обзор из темы “Angular Reactivity with Signals”.

Даже Angular недавно перенес часть ”реактивной работы” из observables в новые (или старые?) "сигналы". Это начало или конец пути?

Хорошая реактивная платформа должна охватывать множество случаев: глюки, планирование приоритетов, контекстное выполнение, прерывание и обработка ошибок. И в этих вопросах нет никаких стандартов, мы все еще находимся в середине исследования и работы над этим.

Итак, хорошо, мы добавим текущее предложение в платформу. Будет ли оно по-прежнему актуально через 5 или 10 лет?

## Требования

Мы можем принять эту новую парадигму на платформу только в том случае, если она будет хорошо изучена и интегрирована.

У нас должны быть сильные руководства (или API) для решения проблем. В целом, это сильно связано с планированием и новым API приоритетного планирования задач, который в настоящее время поддерживается только в Chromium.

Я уверен, что люди не будут удовлетворены текущими встроенными методами и продолжат импортировать библиотеки с патчами-прототипами (вот опять)! Точный набор методов - это деликатная тема, и я не думаю, что здесь может быть хороший дизайн. Единственным разумным вариантом является повторное использование существующих методов из других API, поэтому итераторы-помощники должны быть исследованы и реализованы в первую очередь.

Это мое объективное мнение как опытного разработчика и руководителя команды.

Теперь я хочу поделиться своим личным мнением как автор библиотеки.

## Обходной путь

Не поймите меня неправильно, но для меня потоки - это очень специфическая и архаичная модель программирования, которая может хорошо работать только со строгим конвейером операций. Когда в конвейере появляются условия, все становится намного сложнее.

Один из самых сложных аспектов потоков заключается в том, что вы не можете поставить точку отладчика на строку исходного кода и увидеть все связанные с ней переменные. В обычной async-функции вы можете легко просмотреть все переменные в закрытиях, но отладка потоков гораздо сложнее и не так удобна.

Я много лет искал пути решения этой проблемы, и в какой-то момент понял, что нам вовсе не нужны дополнительные декораторы. Мы можем использовать обычные функции и нативные `async`/`await`, если примем контекст отмены для всех наших вычислений. Эта проблема отлично решается с помощью нового предложения AsyncContext. Код выглядит намного проще, но остается более гибким для проверок и рефакторинга.

Давайте посмотрим на пример кода из предложения Observable.

```js
input
	.on('input')
	.debounce(1000)
	.switchMap((promiseOptions /* ??? */) =>
		fetch(`/somelookup?q=${input.value}`, { signal: promiseOptions.signal }),
	)
	.switchMap((response) => response.json())
	.forEach(updateLookaheadList);
```

Вот как это можно сделать по-другому.

```js
input.oninput = concurrent(async () => {
	await sleep(1000);
	const response = await bind(
		fetch(`/somelookup?q=${input.value}`, { signal: asyncAbort.get().signal }),
	);
	updateLookaheadList(await bind(response.json()));
});
```

Реализация утилиты довольно проста.

```js
let controller = new AbortController();
const asyncAbort = new AsyncContext.Variable(controller);

function concurrent(cb) {
	controller.abort();
	return asyncAbort.run((controller = new AbortController()), cb);
}

async function bind(promise) {
	const result = await promise;
	asyncAbort.get().throwIfAborted();
	return result;
}
```

В приведенном выше коде стиль кода “async” более наивен и нативен, что значительно облегчает его проверку и отладку. Также проще добавлять условия в логику без использования дополнительных операторов. Вы можете использовать регулярные `if`, `switch`, пользовательское сопоставление шаблонов или что угодно. Вам нужно заботиться только об интерфейсе `async`/`Promise`, который уже давно является более общей частью платформы.

Вы можете легко добавить выборку (`takeUntil`).

```js
input.oninput = concurrent(async () => {
	await promisifyEvent(input, 'blur');
	const response = await bind(
		fetch(`/somelookup?q=${input.value}`, { signal: asyncAbort.get().signal }),
	);
	updateLookaheadList(await bind(response.json()));
});
```

## Утилиты.

```js
function promisifyEvent(target, type) {
	const { promise, resolve, reject } = Promise.withResolvers();
	const unsubscribeEvent = onEvent(target, type, resolve);
	const unsubscribeAbort = onEvent(asyncAbort.get().signal, 'abort', reject);

	return promise.finally(() => {
		unsubscribeEvent();
		unsubscribeAbort();
	});
}

function onEvent(target, type, cb) {
	target.addEventListener(type, cb);
	return () => target.removeEventListener(type, cb);
}
```

Но как насчет реактивности? Это сложная тема с множеством крайних случаев, и я считаю, что лучше положиться на опыт авторов библиотек, чтобы иметь возможность выбрать нужное поведение именно для вашей задачи.

Вот пример с моей собственной библиотекой, которая использует явный `ctx` в качестве первого аргумента во всех методах вместо неявного “AsyncContext”.

## Оригинальный пример Observable.

```js
const socket = new WebSocket('wss://example.com');

function multiplex({ startMsg, stopMsg, match }) {
	if (socket.readyState !== WebSocket.OPEN) {
		return socket.on('open').flatMap(() => multiplex({ startMsg, stopMsg, match }));
	} else {
		socket.send(JSON.stringify(startMsg));
		return socket
			.on('message')
			.filter(match)
			.takeUntil(socket.on('close'))
			.takeUntil(socket.on('error'))
			.map((e) => JSON.parse(e.data))
			.finally(() => {
				socket.send(JSON.stringify(stopMsg));
			});
	}
}

function streamStock(ticker) {
	return multiplex({
		startMsg: { ticker, type: 'sub' },
		stopMsg: { ticker, type: 'unsub' },
		match: (data) => data.ticker === ticker,
	});
}

const googTrades = streamStock('GOOG');
const googController = new AbortController();
const googSubscription = googTrades.subscribe({ next: updateView, signal: googController.signal });
```

## Реализация Reatom (документация).

```js
const socket = new WebSocket('wss://example.com');
const reatomStock = (ticker) => {
	const stockAtom = atom(null, `${ticker}StockAtom`);
	onConnect(stockAtom, async (ctx) => {
		if (socket.readyState !== WebSocket.OPEN) {
			await onEvent(ctx, socket, 'open');
		}
		socket.send(JSON.stringify({ ticker, type: 'sub' }));
		onEvent(ctx, socket, 'message', (event) => {
			if (event.data.ticker === ticker) stockAtom(ctx, JSON.parse(event.data));
		});
		onEvent(ctx, socket, 'close', () => ctx.controller.abort());
		onEvent(ctx, socket, 'error', () => ctx.controller.abort());
		onCtxAbort(ctx, () => socket.send(JSON.stringify({ ticker, type: 'unsub' })));
	});
	return stockAtom;
};

const googStockAtom = reatomStock('GOOG');
ctx.subscribe(googStockAtom, updateView);
```

Вы можете делиться `googStockAtom` любым программным обеспечением, подписываться на него, реагировать на его жизненный цикл. Весь этот код занимает 3,15 кБ (gzip)!

Я не рекламирую свою библиотеку, я просто хочу показать вам, что все возможно во многих отношениях. Выбор правильного примитива для такой огромной платформы, как у нас, - важное решение. Я не думаю, что Observable будет достаточно выгодным. На мой взгляд, он только добавит дополнительную умственную нагрузку для новичков.
