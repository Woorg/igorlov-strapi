---
title: Сколько JavaScript достаточно для изучения ReactJS?
meta_title: >-
  Сколько JavaScript достаточно для изучения ReactJS? | Игорь Горлов -
  Фронтeндер
description: >-
  Начав изучать ReactJS, я столкнулся с распространенной проблемой: синдромом
  самозванца. Интернет был наводнен различными мнениями, и я не был уверен, что
  сейча
date: 2023-12-21T00:00:00.000Z
categories:
  - Учебник
author: Игорь Горлов
draft: false
slug: skolko-javascript-dostatochno-dlia-yzuchenyia-reactjs
tags:
  - React
  - JavaScript
image: >-
  ../../assets/images/skolko-javascript-dostatochno-dlia-yzuchenyia-reactjs-Dec-21-2023.avif
lastmod: 2024-03-20T21:26:44.365Z
---

Начав изучать ReactJS, я столкнулся с распространенной проблемой: синдромом самозванца. Интернет был наводнен различными мнениями, и я не был уверен, что сейчас самое подходящее время для изучения ReactJS. Среди всей этой неразберихи мне бросилось в глаза одно высказывание: ”Если вы будете ждать, чтобы понять все в JavaScript, то в итоге можете так и не выучить ReactJS”. В основе этого совета лежит необъятность JavaScript и признание того, что никто не может претендовать на то, чтобы знать все.

## Понимание JavaScript и ReactJS

### JavaScript

JavaScript - это язык сценариев/программирования, позволяющий реализовывать сложные функции на веб-страницах.

### ReactJS

ReactJS - это библиотека JavaScript, предназначенная для ускорения разработки веб-приложений и повышения общей производительности.

## Основы JavaScript для ReactJS

### 1. Функции высшего порядка, функции обратного вызова

Функция высшего порядка (HOF):

Функция, которая возвращает другую функцию или принимает другую функцию в качестве аргумента.

a. Функция, возвращающая другую функцию:

`function implement() { return function () { console.log("Добро пожаловать сюда!!!"); }; }`.

b. Функция, принимающая другую функцию в качестве аргумента:

`function implement(func) { func(); }`.

Функция обратного вызова:

Любая функция, передаваемая в качестве параметра другой функции.

Пример использования в ReactJS:
`useEffect` в ReactJS - это пример функции высшего порядка, позволяющей использовать побочные эффекты и выполнять код в ответ на определенные события.

`useEffect(() => { // блок кода });`.

### 2. Функции-стрелки и анонимные функции

Стрелочная функция:

Лаконичный способ написания функций без ключевого слова `function`.

`const greet = () => { console.log("Hello!"); }; const add = (a, b) => a + b;`.

Анонимная функция:

Любая функция без имени.

```javascript
// Анонимная функция, использующая ключевое слово function
(function () {
	console.log('Добро пожаловать в OpenReplay');
})();

// Анонимная функция, использующая синтаксис стрелочной функции
(() => {
	console.log('Добро пожаловать в OpenReplay');
})();
```

Пример использования в ReactJS:
Анонимные функции часто используются в компонентах React, особенно при определении обработчиков событий.

```javascript
const componentA = () => {
	return (
		<div>
			<button
				onClick={function () {
					console.log('Hello');
				}}
			>
				{' '}
				Нажмите на меня!!!{' '}
			</button>
			<button
				onClick={() => {
					console.log('Hello');
				}}
			>
				{' '}
				Нажмите на меня!!!{' '}
			</button>
		</div>
	);
};
```

## 3. Деструктуризация объектов и массивов

Деструктуризация объектов:

Извлечение определенных свойств из объекта.

`const person = { имя: 'John', возраст: 25, страна: 'USA' }; const { имя, возраст } = person;`

Применение в ReactJS:
Деструктуризация часто используется при работе с реквизитами или состоянием в компонентах React.

`const MyComponent = ({ name, age }) => { return ( <div> Name: {name} Age: {age} </div> ); };`

Деструктуризация массивов:

Распаковка значений из массивов.

`const numbers = [1, 2, 3]; const [firstNumber, secondNumber] = numbers;`.

Пример использования в ReactJS:
`useState` в React часто используется вместе с деструктуризацией массивов для управления состоянием компонентов.

```javascript
const Counter = () => {
	const [count, setCount] = useState(0);

	return (
		<div>
			Count: {count}
			<button onClick={() => setCount(count + 1)}>Increment</button>
		</div>
	);
};
```

## 4. Операторы спреда и отдыха

Оператор спреда:

Распространение элементов массива или объекта на новый массив или объект.

```javascript
const originalArray = [1, 2, 3];
const copyArray = [...originalArray];
const originalObject = { key1: 'value1', key2: 'value2' };
const copyObject = { ...originalObject };
```

Пример использования в ReactJS:
Распространение удобно при передаче реквизитов компонентам.

```javascript
const UserComponent = ({ имя, возраст, национальность }) => {
	return (
		<div>
			<h1>{имя}</h1>
			<h1>{возраст}</h1>
			<h1>{национальность}</h1>
		</div>
	);
};
```

// Использование с оператором spread <UserComponent {…property1}/>
Оператор Rest:

Представление неограниченного числа аргументов в виде массива.

```javascript
// Без оператора покоя
function addition(a, b) {
	return a + b;
}

// С оператором остатка
function addition(...input) {
	let sum = 0;
	for (let i of input) {
		sum += i;
	}
	return sum;
}
```

Пример использования в ReactJS:
Оператор rest часто используется в параметрах функций для работы с переменным количеством аргументов.

```javascript
const DynamicList = ({ title, ...items }) => {
	// Динамическое отображение списка с использованием пар ключ-значение
	return (
		<div>
			<h2>{title}</h2>
			<ul>
				{Object.entries(items).map(([key, value]) => (
					<li key={key}>
						{key}: {value}
					</li>
				))}
			</ul>
		</div>
	);
};
```

## 5. Методы массивов

Методы массивов - это функции, используемые с массивами для выполнения определенных задач или операций над элементами массива.

Метод карты:

Создает новый массив путем применения функции к каждому элементу существующего массива.

```javascript
const numbers = [1, 2, 3];
const doubledNumbers = numbers.map((number) => number * 2);
```

Пример использования в ReactJS:
Маппинг часто используется для преобразования массивов в массивы элементов JSX.

```javascript
const NumberList = ({ numbers }) => {
	const renderedNumbers = numbers.map((number) => <li key={number}>{number}</li>);
	return <ul>{renderedNumbers}</ul>;
};
```

Метод фильтрации:

Создает новый массив с элементами, удовлетворяющими заданному условию.

`const numbers = [1, 2, 3, 4, 5]; const EvenNumbers = numbers.filter(number => number % 2 === 0);`

Применение в ReactJS:
Фильтрация полезна для выборочного отображения или манипулирования элементами на основе какого-либо критерия.

```javascript
const EvenNumbers = ({ numbers }) => {
	const evenNumbersElements = numbers
		.filter((number) => number % 2 === 0)
		.map((evenNumber) => <p key={evenNumber}>Четное число: {evenNumber}</p>);

	return <div>{evenNumbersElements}</div>;
};
```

## 6. Модули (импорт и экспорт)

Модули - это способ структурировать код и сделать его более управляемым. Ключевое слово `export` используется для того, чтобы сделать определенный код многоразовым, а ключевое слово `import` используется для того, чтобы перенести этот код в другой файл.

```javascript
// printName.js
export function printName(name) {
	console.log(name);
}

// user.js
import { printName } from './printName.js';
```

Пример использования в Reactjs
Это очень похоже на использование в javascript, так же, как мы использовали выше. Вместо того чтобы копировать и вставлять различные многократно используемые функции, вы можете просто импортировать их
Примечание: Не забывайте о ключевом слове `export`.

## 7. Fetch API, Promises, Async/Await

Fetch API - это современный JavaScript API, который позволяет выполнять сетевые запросы, обеспечивая более мощный и гибкий способ обработки HTTP-запросов.

```javascript
// Пример использования Fetch API
fetch('https://api.example.com/data')
	.then((response) => response.json())
	.then((data) => console.log(data))
	.catch((error) => console.error('Error:', error));
```

Обещания - это механизм для обработки асинхронных операций в JavaScript. Обещание может находиться в одном из трех состояний: в ожидании, разрешено (выполнено) или отклонено. Это сродни обещанию, например, взять на себя обязательство помыть машину.

```javascript
// Пример обещания
const fetchData = new Promise((resolve, reject) => {
  if (/* data is successfully fetched */) {
    resolve(data);
  } else {
    reject('Error fetching data');
  }
});

fetchData
  .then(data => console.log('Data:', data))
  .catch(error => console.error('Error:', error));
```

Async/await - это синтаксический сахар, построенный поверх promises, благодаря которому асинхронный код выглядит и ведет себя более похоже на синхронный. Он обеспечивает более читабельный и лаконичный способ работы с асинхронными функциями.

```javascript
// Пример использования Async/Await с Fetch API
async function fetchData() {
	try {
		const response = await fetch('https://api.example.com/data');
		const data = await response.json();
		console.log('Data:', data);
	} catch (error) {
		console.error('Error:', error);
	}
}

fetchData();
```

Понимание Fetch API, обещаний и async/await очень важно для работы с получением данных и асинхронными операциями в приложениях ReactJS. Эти концепции позволяют эффективно управлять сетевыми запросами и поддерживать отзывчивый пользовательский интерфейс.

## Заключение

На пути изучения ReactJS освоение основ JavaScript является ключевым моментом. В этой статье мы предложили исчерпывающий обзор основных концепций JavaScript и их практического применения в разработке на React. Не чувствуйте себя подавленными - не спешите впитывать эти понятия.

Знания, полученные здесь, несомненно, сделают ваше путешествие по изучению ReactJS более насыщенным. Счастливого кодинга! 😎
