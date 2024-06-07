---
title: Улучшенный обработчик состояний на основе Redux
meta_title: Улучшенный обработчик состояний на основе Redux | Игорь Горлов - Fullstack Developer
description: Любой, кто использовал Redux в проекте, знает, что, хотя он и справляется со своей задачей, он отнимает много времени изза повторяющегося шаблонного кода. По
date: 2023-12-18T00:00:00.000Z
categories:
  - Обзор
author: Игорь Горлов
draft: false
slug: uluchshenn-i-obrabotchyk-sostoianyi-na-osnove-redux
translatedPosition: 86
keywords:
  - Rematch
tags:
  - Rematch
  - React
image: ../../assets/images/uluchshenn-i-obrabotchyk-sostoianyi-na-osnove-redux-Dec-18-2023.avif
lastmod: 2024-03-30T01:35:45.683Z
---

Любой, кто использовал Redux в проекте, знает, что, хотя он и справляется со своей задачей, он отнимает много времени из-за повторяющегося шаблонного кода.

Поверх Redux построена библиотека управления состоянием, известная как Rematch, которая предлагает простой API, избавляющий разработчиков от написания объемного кода, которым славится Redux.

В этой статье показан практический подход к использованию Rematch в качестве инструмента управления состояниями. Предварительные знания о Rematch или Redux не требуются. Будут рассмотрены особенности, архитектура и практическое использование Rematch. Вы узнаете об архитектуре Rematch, одновременно создавая простое приложение на React.

## Что такое реванш?

Rematch - это улучшенная версия Redux с дополнительными возможностями, более оптимизированной архитектурой, лучшими практиками Redux и меньшим количеством шаблонов.

Он упрощает управление состояниями и улучшает работу разработчиков, используя принципы и возможности Redux. Как и Redux, Rematch тоже имеет открытый исходный код.

Его можно легко интегрировать в проекты на Reactjs, Vue.js, AngularJs и ванильном Javascript.

Он также предлагает такие практичные функции, как поддержка React Devtools, поддержка TypeScript, побочные эффекты, плагины, генерация нескольких магазинов и размер менее 2 Кб, что повышает удобство разработки. Полный список возможностей можно найти здесь.

## Создание проекта с помощью Rematch

Выполните приведенную ниже команду в терминале, чтобы создать проект React, установить все необходимые зависимости и проверить, все ли работает нормально:

`npx create-react-app rematch-project cd rematch-project npm install @rematch/core react-redux @rematch/loading npm start`

Добавьте приведенный ниже блок кода в ваш файл `css`:

`body { padding: 2rem; margin: 0; background-color: #eee; }  .container { display: flex; align-items: center; flex-direction: column; }  .title { text-align: center; letter-spacing: 1px; }  .card { box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2); background-color: #fff; padding: 1rem; border-radius: 5px; margin: 1rem 0; width: 40%; }  .card > h3 { text-transform: capitalize; color: #333; }  .card > p { color: #888; }`

Теперь проект создан; следующие разделы будут посвящены следующим возможностям Rematch: Магазин, Модели и Плагины.

1. Магазин

API Rematch предоставляет метод `init`, который инициализирует магазин Rematch (скрытый магазин Redux с дополнительными возможностями).

Создайте новый файл `src/store.js и вставьте в него приведенный ниже код для инициализации магазина:

`import { init } from "@rematch/core";  const store = init({ // config goes here });  export default store;`

Метод `init` получает объект `config`, который имеет следующие свойства:

`name`: Имя магазина, так как у вас может быть несколько магазинов. `models`: Объект моделей; где каждая модель имеет состояние, редуктор и эффекты. `plugins`: Массив плагинов; плагины - это конфигурации, расширяющие функциональность Rematch. `redux`: Объект, содержащий конфигурации Redux, такие как промежуточные модули.

Чтобы подключить только что созданный `store` к приложению, замените код в `src/index.js` на блок кода ниже:

```ts
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import './index.css';

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
```

2. Models

Модели - это ключевая особенность Rematch, позволяющая сократить объем кода; в рамках одной модели вы определяете начальное `состояние`, `редукторы` и `эффекты`.

Это означает объединение типов действий, создателей действий, редукторов и состояния в одну объектную модель.

Вместо того чтобы иметь все три отдельные модели, как в Redux, они добавляются в одну модель, Javascript `Object`.

При этом код становится меньше, но применяется та же логика Redux.

Чтобы добавить модель в наше приложение, создайте новый файл `src/models.js и вставьте в него блок кода, приведенный ниже, для создания модели:

`export const posts = { state: [], reducers: { loadedPosts: (state, payload) => payload, }, };`

Объект модели обладает следующими свойствами:

`state`: Используется для определения начального состояния. `reducers`: Объект чистых функций для изменения состояния модели. `effects`: Функция, используемая для обработки асинхронных действий.

Перейдите в `src/store.js и добавьте модель.

`import { posts } from "./models"  const store = init({ models: { posts }, })`

Если вы проведете проверку с помощью инструментов разработки Redux, то увидите, что начальное состояние модели было добавлено в хранилище.

Также нам придется добавить Side Effects: функции с доступом к состоянию модели и редукторам; `effects` используются для обработки асинхронных действий.

В этом проекте данные для подражания будут извлекаться из постов jsonplaceholder.

Для обработки этого действия будет создан `эффект`.

Обновите файл `src/models.js, добавив в него блок кода, приведенный ниже:

```ts
export const posts = {
	state: [],
	reducers: {
		loadedPosts: (state, payload) => payload,
	},
	effects: (dispatch) => ({
		async load() {
			const data = await loadPosts();
			dispatch.posts.loadedPosts(data);
		},
	}),
};

const loadPosts = async () => {
	const posts = await fetch('https://jsonplaceholder.typicode.com/posts');
	const data = await posts.json();
	return data;
};
```

Асинхронная функция `loadPosts` извлекает данные.

Внутри объекта `model` создается `effect`. Он вызывает `loadPosts` и добавляет возвращаемое значение в редуктор `loadedPosts` в качестве `payload`.

3. Плагины

Еще одна особенность Rematch - плагины. В зависимости от ваших потребностей, доступно несколько плагинов, расширяющих функциональность Rematch. Кроме того, вы можете создать свой собственный плагин.

Вот некоторые из доступных плагинов:

## Давайте реализуем плагин загрузки.

Обновите файл`src/store.js, реализовав в нем `loadingPlugin`.

`import loadingPlugin from "@rematch/loading"  const store = init({ models: { posts }, plugins: [loadingPlugin()], // Add loading plugin })`

Этот плагин обнаруживает, когда срабатывает `эффект`, и устанавливает `загрузку` в `true`. Когда наш компонент будет собран, плагин загрузки будет реализован для определения, когда `загрузка` будет `true` в компоненте.

## Создание компонента

Теперь, когда Rematch настроен, давайте приступим к созданию компонента приложения.

Обновите файл `src/App.js, добавив в него блок кода, приведенный ниже:

```ts
import { connect } from "react-redux";

function App({ posts, loading }) {
  console.log(posts, loading);
  return (
    <div className="container">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <h1 className="title">Posts</h1>
          {posts.map((post, index) => (
            <div className="card" key={index}>
              <h3>{post.title.slice(0, 20)}</h3>
              {post.body}
            </div>
          ))}
        </>
      )}
    </div>
  );
}

const mapState = (state) => ({
  posts: state.posts,
  loading: state.loading.models.posts,
});

const mapDispatch = (dispatch) => ({
  load: dispatch.posts.load(),
});

export default connect(mapState, mapDispatch)(App);
```

## Некоторые объяснения:

Метод `connect` связывает компонент `App` с магазином, предоставляя ему доступ к `state` и `dispatch` магазина.

`export default connect(mapState, mapDispatch)(App); // mapState and mapDispatch functions are passed as the first two parameters within connect`

`mapState` получает состояние магазина и будет вызываться каждый раз, когда состояние магазина изменится. `mapDispatch` будет получать `диспетчер` вашего магазина, предоставляя вашему компоненту доступ к `редукторам` и `эффектам` магазина. Эффект `load` является асинхронным, поэтому при его срабатывании `loading` автоматически устанавливается в `true`. Внутри компонента состояние и действия легко деструктурируются как `props`.

`function App({ posts, loading }) { // }`

## Заключение

Rematch не только понятен, чист и прост, его функциональность можно расширить с помощью API плагинов.

Приступить к работе с Rematch очень просто, а разработчики получают потрясающий опыт, независимо от того, являетесь ли вы новичком в управлении состояниями или опытным пользователем Redux.

Рассмотрите возможность использования Rematch в качестве инструмента управления состоянием для вашего следующего проекта и поделитесь своим опытом работы с ним в разделе комментариев ;)

## Ресурсы

Чтобы узнать больше о `react-redux` `connect()`, посетите документацию.
