---
title: useState когда использовать?
meta_title: 'useState когда использовать? | Игорь Горлов - Fullstack Developer '
description: >-
  ## 1. Управление простым состоянием: import React, { useState } from react;
  function Example() {const [count, setCount]  useState(0); return (
date: 2023-12-18T00:00:00.000Z
categories:
  - Учебник
author: Игорь Горлов
draft: false
slug: usestate-kohda-yspolzovat
translatedPosition: 12
tags:
  - React
  - useState
image: ../../assets/images/usestate-kohda-yspolzovat-Dec-18-2023.avif
lastmod: 2024-03-20T21:26:47.709Z
---

## 1. Управление простым состоянием:

```js
import React, { useState } from 'react';

function Example() {
	const [count, setCount] = useState(0);

	return (
		<div>
			You clicked {count} times
			<button onClick={() => setCount(count + 1)}>Click me</button>
		</div>
	);
}
```

## 3. Управление булевым состоянием:

```js
import React, { useState } from 'react';

function Example() {
	const [isOn, setIsOn] = useState(false);

	return (
		<div>
			The light is {isOn ? 'on' : 'off'}
			<button onClick={() => setIsOn(!isOn)}>{isOn ? 'Turn off' : 'Turn on'}</button>
		</div>
	);
}
```

## 4. Управление сложным государством:

```js
import React, { useState } from 'react';

function Example() {
	const [person, setPerson] = useState({ name: '', age: 0 });

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setPerson({ ...person, [name]: value });
	};

	return (
		<div>
			Name: {person.name}
			Age: {person.age}
			<input type="text" name="name" value={person.name} onChange={handleInputChange} />
			<input type="number" name="age" value={person.age} onChange={handleInputChange} />
		</div>
	);
}
```

## 5. Управление состоянием массива:

```js
import React, { useState } from 'react';

function Example() {
	const [todos, setTodos] = useState([]);

	const handleAddTodo = () => {
		setTodos([...todos, { id: Date.now(), text: 'New todo' }]);
	};

	return (
		<div>
			<ul>
				{todos.map((todo) => (
					<li key={todo.id}>{todo.text}</li>
				))}
			</ul>
			<button onClick={handleAddTodo}>Add todo</button>
		</div>
	);
}
```

## 6. Обновление состояния на основе предыдущего состояния:

```js
import React, { useState } from 'react';

function Example() {
	const [count, setCount] = useState(0);

	const handleIncrement = () => {
		setCount((prevCount) => prevCount + 1);
	};

	return (
		<div>
			You clicked {count} times
			<button onClick={handleIncrement}>Click me</button>
		</div>
	);
}
```

Это лишь несколько примеров из множества вариантов использования хука useState. Хук очень универсален и может быть использован для управления любым состоянием в компоненте React.
