---
title: Как работать с данными с помощью расширений схемы клиента GraphQL Relay
meta_title: >-
  Как работать с данными с помощью расширений схемы клиента GraphQL Relay |
  Игорь Горлов - Фронтeндер
description: >-
  GraphQL Relay  один из самых мощных клиентов GraphQL, которые можно найти в
  вебсреде. Он предоставляет вам множество возможностей, которые позволяют вашей
  ра
date: 2024-02-10T00:00:00.000Z
categories:
  - Учебник
author: Игорь Горлов
type: blog
draft: false
slug: kak-rabotat-s-dann-my-s-pomoschiu-rasshyrenyi-skhem-klyenta-graphql-relay
translatedPosition: 40
tags:
  - React
  - GraphQL
image: >-
  ../../assets/images/kak-rabotat-s-dann-my-s-pomoschiu-rasshyrenyi-skhem-klyenta-graphql-relay-Feb-10-2024.avif
lastmod: 2024-03-20T21:26:44.917Z
---

GraphQL Relay - один из самых мощных клиентов GraphQL, которые можно найти в веб-среде. Он предоставляет вам множество возможностей, которые позволяют вашей разработке протекать в масштабируемом режиме.

Одной из таких замечательных возможностей являются расширения клиентских схем - это способ расширить ваши данные, поступающие с сервера, с помощью данных, управляемых на стороне клиента так, как вы хотите.

В этом сценарии мы сочли клиентские расширения схем более простым способом удовлетворить все наши потребности в потреблении данных: они должны легко потребляться через все приложение и управляться инфраструктурой Relay, в основном в Relay Store.

Этот подход позволит вам синхронизировать внешнее хранилище, такое как Redux, Zustand или любая другая сторонняя библиотека управления глобальными состояниями, в удобном для Relay виде.

## Расширение моей схемы GraphQL

Первый шаг к работе с расширениями клиентских схем в вашей кодовой базе - это настройка расширений схем. Для этого вам потребуется обновить файл `relay.config.js`:

`// relay.config.js module.exports = { // ... schemaExtensions: ['./src/'], }`

В этом случае `schemaExtensions` будет нацелена на набор путей, указывающих на каталоги, содержащие файл `*.graphql` для расширения.

После этого нужно просто написать новый файл `*.graphql`, в который будет добавлен новый тип, и скомпилировать его с помощью `relay-компилятора`.

```gql
# client-schema.gql
type User {
	name: String!
	age: Int
}

type UserEdge {
	node: User
	cursor: String!
}

type UserConnection {
	count: Int
	totalCount: Int
	startCursorOffset: Int!
	endCursorOffset: Int!
	pageInfo: PageInfoExtended!
	edges: [UserEdge]!
}

extend type Query {
	users(first: Int, after: String, last: Int, before: String): UserConnection!
}
```

В данном случае мы расширяем тип `Query` нашей схемы новым запросом под названием `users`, который позволит нам запросить всех `пользователей` в нашем Relay Store и выдать все пагинированные данные, основанные на шаблоне Connection Pagination Pattern.

Теперь вы сможете запускать команду `relay-compiler` с расширением схемы.

## Управление данными в магазине

Теперь, когда у вас есть расширенная схема, вы можете управлять всеми клиентскими данными с помощью Relay Store. Для этого вам понадобится вспомогательная функция `commitLocalUpdate`, которая предоставит вам все инструменты для фиксации и обновления данных в вашем Relay Store.

```jsx
import { commitLocalUpdate, ConnectionHandler } from 'react-relay';

const appendNewUser = (environment, data) => {
	commitLocalUpdate((store) => {
		const root = store.getRoot();
		const connection = ConnectionHandler.getConnection(root, 'UserListClientQuery_users');
		const edgeNumber = connection.getLinkedRecords('edges').length;
		const dataId = createRelayDataId(row.id, 'User');
		const node = store.create(dataId, row.__typename);
		node.setValue(dataId, 'id');
		const edgeId = `client:root:users:${node.getDataID().match(/[^:]+$/)[0]}:edges:${edgeNumber}`;

		Object.keys(data).forEach((key) => {
			const value = data[key];
			recordProxy.setValue(value, key);
		});

		const edge = store.create(edgeId, 'UserEdge');
		edge.setLinkedRecord(node, 'node');

		const newEndCursorOffset = connection.getValue('endCursorOffset');
		connection.setValue(newEndCursorOffset + 1, 'endCursorOffset');

		const newCount = connection.getValue('count');
		connection.setValue(newCount + 1, 'count');

		ConnectionHandler.insertEdgeAfter(connection, edge);
	});
};
```

Функция выше - это просто помощник для абстракции того, как мы будем добавлять новых пользователей в Relay Store. Написав ее, вы можете использовать ее следующим образом:

```jsx
// UserList.tsx
import { useRelayEnvironment, useClientQuery, graphql } from 'relay-react';

const UserList = () => {
	const environment = useRelayEnvironment();
	const query =
		useClientQuery <
		UserListClientQuery >
		(graphql`
			query UserListClientQuery {
				users(first: 10) @connection(key: "UserListClientQuery_users", filters: []) {
					edges {
						node {
							id
							name
							age
						}
					}
				}
			}
		`,
		{});

	const handleAddNewUser = () => {
		appendNewUser(environment, {
			id: randomUserId(), // just a function to randomize an id
			name: randomUserName(), // just a function to randomize name
			age: randomUserAge(), // just a function to randomize age
		});
	};

	return (
		<>
			<button onClick={handleAddNewUser}>Add User</button>
			<div>
				{query.users.edges.map((node) => (
					<p key={node.id}>
						{node.name} - {node.age}

				))}
			</div>
		</>
	);
};
```

`useClientQuery` - это полезный хук, позволяющий запрашивать ТОЛЬКО клиентские данные. В этом компоненте мы делаем две вещи: выводим список всех пользователей из Relay Store и регистрируем новых пользователей в Relay Store.

Теперь все данные, связанные с `UserConnection`, которые были сохранены в вашем хранилище, легко управляются вашим компонентом.

## Инициализация локальных данных

По умолчанию все данные в хранилище начинаются со значения `undefined`. В сценариях, где это не соответствует желаемому ожиданию, как в нашем примере с массивом соединений, мы можем легко инициализировать локальные данные другим значением.

Для этого вам нужно использовать `commitLocalUpdate` перед запросом любых локальных данных, в этом случае вы можете использовать его при настройке вашего Relay `Environment`. Смотрите пример ниже:

```jsx
// relay/Environment.tsx
import { Environment, commitLocalUpdate } from 'relay-runtime';

const env = new Environment({
	// ...
});

commitLocalUpdate(env, (store) => {
	const connection = store.create('client:root:users', 'UserConnection');
	connection.setLinkedRecords([], 'edges'); // add an edge field with empty __refs
	connection.setValue(0, 'count');

	const root = store.getRoot();
	root.setLinkedRecord(
		connection,
		'__UserListClientQuery_users_connection', // this is the key of queried connection when persisted in the relay store
	);
});
```

При таком подходе вы сможете получить доступ к клиентскому запросу в первом рендере с пустым соединением. Эту идею можно повторить и для других подобных данных.

## Другие ресурсы

Если вам интересно, насколько мощными являются расширения клиентских схем, я предлагаю вам почитать о них в документации Client Schema Extensions, это даст вам представление о том, как их использовать.

Woovi - это стартап, который позволяет покупателям платить так, как им удобно. Чтобы сделать это возможным, Woovi предоставляет продавцам решения для мгновенной оплаты, позволяющие принимать заказы.

Если вы хотите работать с нами, мы принимаем на работу!
