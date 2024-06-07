---
title: >-
  Как использовать TanStack-Query для написания более чистого кода React в
  качестве младшего разработчика
meta_title: >-
  Как использовать TanStack-Query для написания более чистого кода React в
  качестве младшего разработчика | Игорь Горлов - Фронтeндер
description: >-
  Отображение данных, полученных из внешних источников, является основной частью
  большинства фронтендприложений.


  Чаще всего данные поступают из API или CMS. Ес
date: 2023-12-16T00:00:00.000Z
categories:
  - Учебник
author: Игорь Горлов
draft: false
slug: >-
  kak-yspolzovat-tanstack-query-dlia-napysanyia-bolee-chystoho-koda-react-v-kachestve-mladsheho-razrabotchyka
tags:
  - React
  - TanStack Query
image: >-
  ../../assets/images/kak-yspolzovat-tanstack-query-dlia-napysanyia-bolee-chystoho-koda-react-v-kachestve-mladsheho-razrabotchyka-Dec-16-2023.avif
lastmod: 2024-03-20T21:26:44.944Z
---

Отображение данных, полученных из внешних источников, является основной частью большинства фронтенд-приложений.

Чаще всего данные поступают из API или CMS. Если объем данных, которые необходимо получить, невелик, это можно легко сделать с помощью хуков react-native в сочетании с fetch api. Однако если поток данных между клиентом и сервером усложняется, мы рискуем создать тонны не поддерживаемого спагетти-кода.

Чтобы избежать этого, нам нужен лучший инструмент для этой работы: React Query.

Вот шаги для начала работы с react query, чтобы улучшить ваш код:

1. Поймите разницу между состоянием клиента и состоянием сервера

Состояние клиента хранится в браузере, например состояние формы, темный режим или то, открыт или закрыт модал. Состояние сервера хранится, вероятно, в какой-то базе данных и обслуживается асинхронно.

Всегда используйте React Query для состояния сервера. Для клиентского состояния используйте нативные хуки, такие как useState или useReducer.

2. Установите React-Query в свой проект

Следуйте инструкциям по установке и не забудьте настроить клиентский провайдер запросов

3. В своем коде замените код получения данных и состояния на хук useQuery

Вместо этого напишите следующее:

```js
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
useEffect(() => {
	async function fetchData() {
		try {
			const response = await fetch('https://rickandmortyapi.com/api/character');
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			const result = await response.json();
			setData(result.results);
		} catch (err) {
			setError(err);
		} finally {
			setLoading(false);
		}
	}
	fetchData();
}, []);
```

напишите это:

```js
function fetchRickAndMortyCharacters() {
	return fetch('https://rickandmortyapi.com/api/character')
		.then((response) => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json();
		})
		.then((data) => data.results);
}
const { data, isLoading, isError, error } = useQuery(
	['rickAndMortyCharacters'],
	fetchRickAndMortyCharacters,
);
```

Данные, которые вам нужно отобразить, будут находиться в деструктурированном файле `data`. Вот пример того, как можно вывести результат:

```js
if (isLoading) return Загрузка...; if (isError) return Ошибка: {error.message}; if (!data) return Нет данных; return ( <ul> {data.map(character => ( <li key={character.id}>{character.name}</li> ))} </ul> );
```

4. Преобразуйте хук useQuery в пользовательский хук

Для лучшего повторного использования абстрагируйте это в пользовательский хук:

```js
export function useRickAndMortyCharacters() {
	return useQuery(['rickAndMortyCharacters'], fetchRickAndMortyCharacters);
}
```

Теперь из любого компонента можно просто вызвать пользовательский хук следующим образом:

```js
const { data, isLoading, isError, error } = useRickAndMortyCharacters();
```

Вот и все! Если вы хотите пойти дальше, почитайте документацию и поиграйте с различными вариантами запросов или мутациями.

Спасибо за чтение!
