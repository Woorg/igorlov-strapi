---
title: Redux Кто? Занимайтесь своим собственным состоянием
meta_title: >-
  Redux Кто? Занимайтесь своим собственным состоянием | Игорь Горлов - Fullstack
  Developer
description: >-
  Библиотек управления состояниями для React существует великое множество.
  Redux. Recoil. MobX. Выбор одной из них  сложная задача даже для самых опытных
  разраб
date: 2023-12-18T00:00:00.000Z
categories:
  - Учебник
author: Игорь Горлов
draft: false
slug: redux-kto-zanymaites-svoym-sobstvenn-m-sostoianyem
translatedPosition: 38
tags:
  - React
  - Redux
image: >-
  ../../assets/images/redux-kto-zanymaites-svoym-sobstvenn-m-sostoianyem-Dec-18-2023.avif
lastmod: 2024-03-20T21:26:47.613Z
---

Библиотек управления состояниями для React существует великое множество. Redux. Recoil. MobX. Выбор одной из них - сложная задача даже для самых опытных разработчиков, но задумывались ли вы когда-нибудь о том, чтобы вообще отказаться от выбора?

Некоторые приложения нуждаются в расширенном управлении состоянием. Действительно нуждаются! Если вы работаете с сотнями различных переменных, которые меняются в зависимости от других значений состояния, то вам определенно будет легче масштабироваться, если вы используете библиотеку вроде Recoil. Однако я готов предположить, что вашему приложению она не нужна.

В этой статье я расскажу о том, как можно работать с состоянием даже в масштабе, размещая его в одном месте и сохраняя простоту.

На фоне всех Redux легко забыть, что React поставляется с собственной системой управления состояниями! Давайте посмотрим, как она выглядит.

`const [count, setCount] = React.useState(0);`

Если вам нужно обработать любое значение, которое меняется со временем, вы добавляете вызов хука useState. Это отлично работает для простых значений, которые изменяются по одному.

## Вместо этого запомните

Некоторые данные даже не обязательно хранить в штате! Возьмем этот пример:

```ts
const [filter, setFilter] = React.useState('none');
const [filteredItems, setFilteredItems] = React.useState(props.items);

function onFilterChange(newFilter) {
	setFilter(newFilter);
	setFilteredItems(props.items.filter((item) => item.someProperty === newFilter));
}
```

Здесь нет никакой реальной причины хранить отфильтрованные элементы в состоянии! Вместо этого мы могли бы мемоизировать фильтрацию и пересчитывать новые отфильтрованные элементы только при изменении фильтра (или элементов для фильтрации).

```ts
const [filter, setFilter] = React.useState('none');
const filteredItems = React.useMemo(
	() => items.filter((item) => item.someProperty === newFilter),
	[props.items, filter],
);
function onFilterChange(newFilter) {
	setFilter(newFilter);
}
```

## Использовать редуктор

Если у вас есть более продвинутое состояние, вы также можете использовать более гибкий хук `useReducer`!

```ts
const [request, dispatch] = React.useReducer(
	(state, action) => {
		switch (action.type) {
			case 'loading':
				return { state: 'loading' };
			case 'success':
				return { state: 'success', data: action.data };
			case 'error':
				return { state: 'error', error: action.error };
			case 'reset':
				return { state: 'idle' };
			default:
				throw new Error(`Unknown action ${action.type}`);
		}
	},
	{ state: 'idle' },
);
```

То же самое можно сделать с помощью нескольких вызовов `useState`, но когда несколько изменений происходят одновременно, я предпочитаю использовать `useReducer`. К счастью, это случается не слишком часто.

## Разделяйте состояние между компонентами

Теперь, если вам нужно это состояние в нескольких местах, вам нужно ”поднять" его до первого общего компонента-предка.

Если между ними не так много слоев компонентов, вы можете просто передать значение и функцию обновления в качестве реквизитов.

```ts
const CommonAncestor = () => {
  const [filter, setFilter] = React.useState('none');

  return (
    <div>
      <FilterSelector filter={filter} setFilter={setFilter} />
      <FilteredItems filter={filter} />
    </div>
  );
};
```

## Используйте контексты, когда это уместно.

Если между первым общим предком и вашими компонентами существует множество слоев, или если вы создаете многократно используемые, общие компоненты, к которым нельзя применить реквизиты напрямую, вам нужно создать контекст.

В случае, если вам нужно создать контекст, необходимо добавить компонент `Provider` и хук для потребления контекста.

```ts
const FilterContext = React.createContext();
const FilterProvider = (props) => {
  const [filter, setFilter] = React.useState('none');
  return (
    <FilterContext.Provider value={{ filter, setFilter }} {...props} />
  );
};
const useFilter = () => {
  const context = React.useContext(FilterContext);
  if (!context) {
    throw new Error("Wrap your component in a FilterProvider");
  }
  return context;
};
```

Теперь мы можем изменить ваш компонент общего предка, чтобы он выглядел следующим образом:

`const CommonAncestor = () => { return ( <FilterProvider> <FilterSelector /> <FilteredItems /> </FilterProvider> ); };`

Мы перенесли весь код, связанный с фильтрами, в `FilterProvider`, и удалили все реквизиты, передаваемые в `FilterSelector` и `FilteredItems`. Два последних теперь могут выглядеть следующим образом:

```ts
const FilterSelector = () => {
  const { filter, setFilter } = useFilter();
  return (...);
};

const FilteredItems = () => {
  const { filter } = useFilter();
  const items = getItemsSomehow();
  const filteredItems = React.useMemo(
    () => items.filter(item => item.someProperty === filter),
    [filter, items]
  );
  return (...);
};
```

Ошибка, которую я вижу у многих людей, - это создание большого количества глобальных контекстов, когда они на самом деле не нужны. Эту ошибку легко совершить - особенно если вы привыкли к образу мышления Redux. Это раздражает, потому что в итоге вы получаете огромную вложенность, а я здесь, чтобы сказать вам, что, скорее всего, она вам не нужна.

## Кэш сервера не является государственным.

На мой взгляд, сохранение - или кэширование - данных с вашего сервера - это не состояние. Это кэш. Поэтому я думаю, что вам следует использовать какой-нибудь хук для получения данных (например, useSWR или react-query), который будет обрабатывать все это за вас. Конечно, вы можете написать свой собственный, и очень простая версия этого будет выглядеть примерно так:

```ts
const cache = {};
const useFetch = (key, fetcher) => {
	const [request, dispatch] = React.useReducer(requestReducerFromEarlier, { state: 'idle' });

	const goFetch = async () => {
		try {
			dispatch({ type: 'loading' });
			const result = await fetcher(key);
			dispatch({ type: 'success', data: result });
			cache[key] = result;
		} catch (e) {
			dispatch({ type: 'error', error: e });
		}
	};

	if (cache[key]) {
		goFetch();
		return { data: cache[key], ...request };
	}

	return request;
};
```

С помощью этой библиотеки (или, что более вероятно, библиотеки, которая лучше справляется с этой задачей) вы можете одним махом удалить большинство этих глобальных контекстов и расположить требования к данным там, где они используются.

Размещайтесь вместе, когда это возможно

И, кстати говоря, убедитесь в том, что все штаты расположены там, где они используются. Избегайте использования глобальных контекстов, когда это возможно. Когда вы это делаете, вы уверены, что удалите все связанное состояние, когда удаляете какую-то функцию. Его легче найти, и в нем гораздо меньше магии.

По возможности занимайтесь своим штатом. Вот и все, это вывод. Кроме того, перестаньте по умолчанию использовать трудноизучаемые библиотеки управления состоянием, а используйте инструменты, которые React предоставляет из коробки.

```

```
