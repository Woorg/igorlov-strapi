---
title: >-
  Как создать чат-бот на основе искусственного интеллекта с помощью OpenAI,
  ChatGPT, Node.js и React
meta_title: |
  Как Создать Чат-Бот На Основе Искусственного Интеллекта С...
description: >
  Искусственный интеллект (ИИ) в последнее время набирает обороты, а ChatGPT
  произвел революцию в Интернете благодаря функции завершения чата.
date: 2023-11-13T23:26:00.123Z
author: Igor Gorlov
image: >-
  ../../assets/images/kak-sozdatь-chat-bot-na-osnove-iskusstvennogo-intellekta-s-pomoshьyu-openai-chatgpt-node-js-i-react-Nov-14-2023.avif
categories:
  - Как закодить
tags:
  - React
  - ChatGPT
draft: false
type: blog
slug: >-
  kak-sozdatь-chat-bot-na-osnove-iskusstvennogo-intellekta-s-pomoshьyu-openai-chatgpt-node-js-i-react
lastmod: 2024-03-20T21:26:43.865Z
---

Искусственный интеллект (ИИ) в последнее время набирает обороты, а ChatGPT произвел революцию в Интернете благодаря функции завершения чата.

С его помощью можно сделать многое: составить письмо или другой документ, ответить на вопросы по набору документов, создать разговорного агента, придать программному обеспечению естественный языковой интерфейс, обучать различным предметам, переводить языки и т.д.

В этой статье мы расскажем об основах создания чат-приложения с использованием функции завершения чата, чтобы каждый программист мог легко с ней справиться. Это не так сложно, как кажется на первый взгляд. Вы убедитесь в этом, следуя данному руководству.

Вы узнаете следующее:

- Как создать чат-приложение с CLI, используя только Node.js.
- Как создать чат-приложение, используя только React.
- Как объединить React и Node.js для создания лучшего программного обеспечения с искусственным интеллектом для чатов.

В данном учебном пособии будет использована модель gpt-3.5-turbo .

https://www.youtube.com/watch?v=T-9-_1w82Jg

## Предварительные условия

Этот учебник требует базовых знаний JavaScript, CSS, React и Node.js.

Также необходима учетная запись на платформе OpenAI, где размещен chatGPT. Она бесплатна, и вы можете создать ее здесь.

## Как создать приложение искусственного интеллекта для чата с помощью CLI на Node.js

В этом разделе мы рассмотрим создание чат-приложения, которое будет работать только в терминале, с использованием Node.js.

https://www.youtube.com/watch?v=4uTO3xZx5r4

Начните с создания каталога для проекта:

```bash
mkdir nodejs-chatgpt-tutorial
```

Перейдите в папку:

```bash
cd nodejs-chatgpt-tutorial
```

Инициализация проекта:

```bash
npm init -y


```

В результате будет создан файл package.json для хранения деталей проекта

Добавьте в файл следующую строку кода:

```json
"type": "module"
```

Это позволит использовать оператор импорта модулей ES6.

Установите OpenAI с помощью приведенной ниже команды:

```bash
npm i openai


```

Создайте файл, в котором будет находиться весь код. Назовите его index.js :

```bash
touch index.js


```

Импортируйте Configuration и OpenAIApi из модуля OpenAI и readline из модуля readline:

```javascript
import { Configuration, OpenAIApi } from 'openai';
import readline from 'readline';
```

Постройте конфигурацию OpenAI следующим образом:

```javascript
const configuration = new Configuration({
	organization: 'org-0nmrFWw6wSm6xIJXSbx4FpTw',
	apiKey: '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',
});
```

Этот код создает новый экземпляр объекта Configuration . Внутри него вы введете значения для ваших organization и apiKey . Данные о вашей организации можно найти в настройках, а информацию о вашем apiKey - в API-ключах. Если у вас нет существующего ключа API, вы можете его создать.

Введите следующий код после конфигурации для создания нового экземпляра OpenAI API:

```javascript
const openai = new OpenAIApi(configuration);
```

Вы будете использовать его на протяжении всего проекта.

Введите приведенный ниже код для проверки функции createChatCompletion :

```javascript
openai
	.createChatCompletion({
		model: 'gpt-3.5-turbo',
		messages: [{ role: 'user', content: 'Hello' }],
	})
	.then((res) => {
		console.log(res.data.choices[0].message.content);
	})
	.catch((e) => {
		console.log(e);
	});
```

Этот код вызывает функцию createChatCompletion , которая запускает конечную точку ( https://api.openai.com/v1/chat/completions ). Функция принимает объект аргументов (используемый model chatGPT и массив messages между пользователем и ИИ. В следующем разделе мы рассмотрим, как использовать массив messages для ведения истории чата и улучшения приложения).

Каждое сообщение представляет собой объект, содержащий значение role (то есть кто отправил сообщение. Это значение может быть assistant , если оно исходит от ИИ, или user , если сообщение исходит от человека) и content (отправленная информация).

Наконец, код печатает ответ ( res.data.choices[0].message.content ) от ИИ. Запустите файл в терминале с помощью этой команды:

```bash
node index
```

Это приведет к получению ответа от искусственного интеллекта через несколько секунд.

И это все, что нужно для создания чатбота!

Однако было бы полезно сделать приложение более интерактивным, запрашивая ввод от пользователя, а не жестко кодируя содержимое сообщения в коде. В этом нам поможет модуль readline.

Чтобы сделать его интерактивным, удалите последний набранный код и добавьте следующий:

```javascript
const userInterface = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});
```

Этот код создает в терминале пользовательский интерфейс, позволяющий пользователям вводить свои вопросы.

Затем предложите пользователю ввести сообщение, используя приведенный ниже код:

```javascript
userInterface.prompt();
```

Наконец, введите следующий код:

```javascript
userInterface.on('line', async (input) => {
	await openai
		.createChatCompletion({
			model: 'gpt-3.5-turbo',
			messages: [{ role: 'user', content: input }],
		})
		.then((res) => {
			console.log(res.data.choices[0].message.content);
			userInterface.prompt();
		})
		.catch((e) => {
			console.log(e);
		});
});
```

В приведенном выше коде,

- Когда пользователь набирает текст и нажимает Enter , в приведенном выше коде срабатывает функция обратного вызова.
- В качестве input передается все, что было набрано пользователем.
- В качестве input теперь используется content .
- После вывода на экран ответа ИИ пользователю предлагается ввести еще одно сообщение в блоке then .

Весь код можно посмотреть на [GitHub](https://github.com/EBEREGIT/nodejs-chatgpt-tutorial).

Запустите файл и проведите беседу с ИИ. Он будет выглядеть так, как показано на рисунке ниже:

![CLI-чат с искусственным интеллектом](https://paper-attachments.dropboxusercontent.com/s_D592C23061BDAFBA9E611AEDC8048F685A5679FCF2C57746CD5AE80A3DAD15B0_1682935202577_Screenshot+2023-05-01+at+10.58.02.png)
CLI-чат с искусственным интеллектом

Отлично! Это интерактивный CLI-чат.

Это полезно нескольким людям (например, инженерам), но имеет хорошую безопасность, поскольку находится на стороне сервера.

Но как быть с теми, кто не понимает, как использовать CLI-приложение? Им нужно что-то более простое в использовании, с лучшим пользовательским интерфейсом (UI) и пользовательским опытом (UX). Следующий раздел посвящен созданию такого приложения с использованием React.

## Как создать приложение для чата с помощью React

Этот раздел призван помочь фронтенд-разработчикам освоить API ChatGPT для создания чат-приложения и построить более совершенный пользовательский интерфейс, чтобы обеспечить пользователям лучший опыт. Полученные здесь знания можно применить к другим фронтенд-фреймворкам или библиотекам.

https://www.youtube.com/watch?v=JrfaQ5dYbWg

Первое, что необходимо сделать, - настроить базовый котел React. Для этого я буду использовать Vite. Vite можно использовать для построения любого современного фронтенд-проекта на JavaScript. Используйте команду, приведенную ниже:

```bash
npm create vite@latest


```

Эта команда предложит вам создать имя и папку для проекта, а также выбрать фреймворк или библиотеку (в данном учебном пособии используется React). После этого нужно перейти в папку и выполнить следующую команду:

```bash
npm install
npm run dev

```

Эти команды установят необходимые зависимости и запустят локальный сервер на порту 5173

Затем установите OpenAI с помощью приведенной ниже команды:

```bash
npm i openai


```

Этот модуль предоставляет доступ ко всему, что необходимо для создания приложения чата.

Теперь мы готовы приступить к написанию кода!

Перейдите в файл src/App.jsx и удалите все его содержимое. Затем добавьте следующие операторы импорта:

```javascript
import { useState } from 'react';
import { Configuration, OpenAIApi } from 'openai';
```

Приведенный выше код импортирует Configuration для установки значений конфигурации и OpenAIApi для предоставления доступа к функциям завершения чата.

После этого постройте конфигурацию следующим образом:

```javascript
const configuration = new Configuration({
	organization: 'org-0nmrFWw6wSm6xIJXSbx4FpTw',
	apiKey: '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',
});
```

Этот код создает новый экземпляр объекта Configuration . Внутри него вы вводите значения для своих organization и apiKey . Сведения о вашей организации можно найти в настройках, а информацию о вашем apiKey - в API-ключах. Если у вас нет существующего ключа API, вы можете его создать.

Введите следующий код после конфигурации для создания нового экземпляра OpenAI API:

```javascript
const openai = new OpenAIApi(configuration);
```

Мы будем использовать его на протяжении всего проекта.

Создание и экспорт функции по умолчанию:

```javascript
function App() {

  return (
    <main>
      <h1>Chat AI Tutorial</h1>
    <main/>
  );
}
export default App;
```

В этой функции будет находиться остальной код.

Перед оператором return установите следующие состояния:

```javascript
const [message, setMessage] = useState('');
const [chats, setChats] = useState([]);
const [isTyping, setIsTyping] = useState(false);
```

- В message будет храниться информация, передаваемая из приложения в ИИ.
- В массиве chats будут храниться все сообщения, отправленные обеими сторонами (пользователем и ИИ).
- Переменная isTyping будет сообщать пользователю, набирает ли бот текст или нет.

Введите следующие строки кода под тегом h1

```jsx
<div className={isTyping ? '' : 'hide'}>
	<i>{isTyping ? 'Typing' : ''}</i>
</div>
```

Приведенный выше код будет отображать Typing всякий раз, когда пользователь ожидает ответа от ИИ.

Создайте форму, в которой пользователь может ввести сообщение, добавив в элемент main приведенный ниже код:

```javascript
<form action="" onSubmit={(e) => chat(e, message)}>
	<input
		type="text"
		name="message"
		value={message}
		placeholder="Type a message here and hit Enter..."
		onChange={(e) => setMessage(e.target.value)}
	/>
</form>
```

Этот код создает форму с одним входом. Всякий раз, когда форма отправляется нажатием клавиши Enter , срабатывает функция chat .

Функция chat будет принимать два (2) аргумента ( e и message ) следующим образом:

```javascript
const chat = async (e, message) => {};
```

Введите в функцию следующие строки:

```javascript
e.preventDefault();

if (!message) return;
setIsTyping(true);
```

Приведенный выше код не позволяет form перезагрузить веб-страницу, проверяет, было ли набрано сообщение перед отправкой, и устанавливает isTyping в true , чтобы указать, что приложение начало работать с введенными данными.

В ChatGPT существует формат, в котором должны быть сообщения. Он принимает следующий вид:

```
{role: user | assistant, content: message to be sent


```

Каждое сообщение ( content ) должно показывать, кто его отправил. Роль assistant указывается, если сообщение отправлено искусственным интеллектом, но user - если человеком. Поэтому, прежде чем отправить сообщение, не забудьте правильно его оформить и добавить в массив ( chats ) следующим образом:

```javascript
let msgs = chats;
msgs.push({ role: 'user', content: message });
setChats(msgs);

setMessage('');
```

Последняя строка очищает ввод, чтобы пользователь мог набрать еще одну заметку.

Теперь вызовем конечную точку createChatCompletion , вызвав функцию createChatCompletion с помощью приведенного ниже кода:

```javascript
await openai.createChatCompletion({
	model: 'gpt-3.5-turbo',
	messages: [
		{
			role: 'system',
			content: 'You are a EbereGPT. You can help with graphic design tasks',
		},
		...chats,
	],
});
```

Функция createChatCompletion принимает не менее двух (2) аргументов ( model и messages ):

- Модель определяет используемую версию chatGPT.
- Сообщения - это список всех сообщений между пользователем и искусственным интеллектом на данный момент, а также системное сообщение, которое дает ИИ представление о том, какую помощь он может оказать.

```json
{
	"role": "system",
	"content": "You are a EbereGPT. You can help with graphic design tasks"
}
```

Вы можете менять содержание по своему усмотрению.

В массиве messages не обязательно должно быть более одного объекта. Это может быть просто одно сообщение.

Но если это массив, то в нем содержится история сообщений, на которую ИИ может опираться, чтобы в будущем давать более точные ответы, и это заставляет пользователя набирать меньше текста, поскольку, возможно, нет необходимости постоянно давать слишком подробные описания.

Функция createChatCompletion возвращает обещание. Поэтому для получения ответа используйте блок then…catch… .

```javascript
   .then((res) => {
        msgs.push(res.data.choices[0].message);
        setChats(msgs);
        setIsTyping(false);
      })
      .catch((error) => {
        console.log(error);
      });
```

Этот код добавляет сообщение, полученное от ИИ, в массив chats и устанавливает значение isTyping в false, указывая на то, что ИИ закончил отвечать.

Теперь при отправке сообщения вы должны получать обратную связь ( Typing ):

![Чат-приложение, выдающее обратную связь, когда ИИ собирается ответить](https://paper-attachments.dropboxusercontent.com/s_D592C23061BDAFBA9E611AEDC8048F685A5679FCF2C57746CD5AE80A3DAD15B0_1682702095176_Screenshot+2023-04-28+at+18.14.08.png)
Чат-приложение, выдающее обратную связь, когда ИИ собирается ответить

Пришло время отобразить историю чата для просмотра пользователем.

Введите следующий код непосредственно под тегом h1 :

```javascript
<section>
	{chats && chats.length
		? chats.map((chat, index) => (
				<p key={index} className={chat.role === 'user' ? 'user_msg' : ''}>
					<span>
						<b>{chat.role.toUpperCase()}</b>
					</span>
					<span>:</span>
					<span>{chat.content}</span>

		  ))
		: ''}
</section>
```

Приведенный выше код перебирает все chats и последовательно выводит их пользователю. Он выводит role в верхнем регистре и content сообщения рядом.

Вот как должен выглядеть вывод:

![ChatBot работает как положено без CSS](https://paper-attachments.dropboxusercontent.com/s_D592C23061BDAFBA9E611AEDC8048F685A5679FCF2C57746CD5AE80A3DAD15B0_1682702531307_Screenshot+2023-04-28+at+18.21.23.png)
ChatBot работает как положено без CSS

Это выглядит круто!

Но если добавить некоторые элементы оформления, то приложение приобретет привлекательный вид, как в WhatsApp или Messenger.

Замените содержимое файла src/index.css на следующее:

```css
:root {
	font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
	line-height: 1.5;
	font-weight: 400;
	color-scheme: light dark;
	color: rgba(255, 255, 255, 0.87);
	background-color: #242424;
	font-synthesis: none;
	text-rendering: optimizeLegibility;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	-webkit-text-size-adjust: 100%;
}
h1 {
	font-size: 3.2em;
	line-height: 1.1;
	text-align: center;
	position: sticky;
	top: 0;
	background-color: #242424;
}
main {
	max-width: 500px;
	margin: auto;
}
p {
	background-color: darkslategray;
	max-width: 70%;
	padding: 15px;
	border-radius: 50px;
}
p span {
	margin: 5px;
}
p span:first-child {
	margin-right: 0;
}
.user_msg {
	text-align: right;
	margin-left: 30%;
	display: flex;
	flex-direction: row-reverse;
}
.hide {
	visibility: hidden;
	display: none;
}
form {
	text-align: center;
	position: sticky;
	bottom: 0;
}
input {
	width: 100%;
	height: 40px;
	border: none;
	padding: 10px;
	font-size: 1.2rem;
}
input:focus {
	outline: none;
}
```

И удалите все стили из файла src/App.css .

Полный код можно найти на [GitHub](https://github.com/EBEREGIT/react-chatgpt-tutorial).

Теперь приложение должно иметь новый вид:

![Чат-бот работает так, как ожидалось, с помощью CSS](https://paper-attachments.dropboxusercontent.com/s_D592C23061BDAFBA9E611AEDC8048F685A5679FCF2C57746CD5AE80A3DAD15B0_1682704193641_Screenshot+2023-04-28+at+18.48.44.png)
Чат-бот работает так, как ожидалось, с помощью CSS

На этом создание чатбота с помощью React и ChatGPT завершено. Это не так сложно, как кажется.

Но фронтенд-приложения, подобные этому, лучше использовать для демонстрации, а не для производства. Проблема создания приложения таким образом заключается в том, что фронтенд подвергает API-ключ кибернетическим атакам.

Для решения этой проблемы целесообразно сохранить API Key и Organisation Id в безопасном месте в облаке и ссылаться на них, либо создать бэкенд для своего приложения с более высокой степенью защиты.

В следующем разделе будет рассмотрена эта проблема.

## Как объединить React и Node.js для создания Fullstack-программы искусственного интеллекта для чата

В этом разделе мы объединим все возможности предыдущих разделов, чтобы создать более безопасное приложение с улучшенным пользовательским интерфейсом и UX.

Мы улучшим раздел Node, используя сервер для выставления конечной точки для потребления фронтендом и упростим взаимодействие фронтенда с бэкендом вместо прямого обращения к OpenAI.

https://www.youtube.com/watch?v=OJ7AgZVH118

### Как настроить проект

В этой части будут созданы необходимые для проекта папки и файлы.

Создайте каталог проекта:

```bash
mkdir react-node-chatgpt-tutorial

```

Перейдите в папку:

```bash
cd react-node-chatgpt-tutorial


```

Установите React с помощью Vite и назовите папку frontend . Используйте эту команду:

```bash
npm create vite@latest


```

После этого перейдите в папку и выполните следующую команду:

```bash
npm install
npm run dev

```

Эти команды установят необходимые зависимости и запустят локальный сервер на порту 5173 .

Создайте папку backend:

```bash
mkdir backend


```

Теперь перейдите в папку backend и инициализируйте проект с помощью этой команды:

```bash
npm init -y


```

При этом будет создан файл package.json для хранения деталей проекта.

Добавьте в файл следующую строку кода:

```json
"type": "module"

```

Это позволит использовать оператор импорта модулей ES6.

Установите OpenAI и другие зависимости с помощью приведенной ниже команды:

```bash
npm i openai body-parser cors express


```

Создайте файл, в котором будет находиться весь код. Назовите его index.js :

```bash
touch index.js


```

На этом настройка проекта завершена. Теперь есть две папки ( frontend и backend ).

### Как построить сервер

В этой части мы рассмотрим создание локального сервера для прослушивания порта 8000 .

Первое, что нужно сделать, - импортировать необходимые модули следующим образом:

```javascript
import { Configuration, OpenAIApi } from 'openai';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
```

Далее установите express , port для прослушивания, body-parser для приема входных данных и cors для свободного обмена данными между фронтендом и бэкендом. Используйте приведенный ниже код:

```javascript
const app = express();
const port = 8000;
app.use(bodyParser.json());
app.use(cors());
```

Наконец, введите следующий код:

```javascript
app.listen(port, () => {
	console.log(`listening on port ${port}`);
});
```

На этом настройка сервера завершена.

При выполнении команды index.js должен быть получен следующий результат:

```
listening on port 8000


```

### Как создать конечную точку

В этой части мы создадим конечную точку, которая будет принимать сообщения от фронтенда, используя тело запроса, и возвращать ответ вызывающей стороне.

Начните с установки параметров конфигурации, как мы это делали в предыдущих разделах:

```javascript
const configuration = new Configuration({
	organization: 'org-0nmrFWw6wSm6xIJXSbx4FpTw',
	apiKey: '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',
});
const openai = new OpenAIApi(configuration);
```

Далее создайте асинхронный POST-маршрут, используя приведенный ниже код:

```javascript
app.post('/', async (request, response) => {});
```

Вызов этой конечной точки будет осуществляться с помощью http://localhost:8000/

В функции обратного вызова введите приведенный ниже код для получения входных данных chats из тела запроса ( request.body ):

```javascript
const { chats } = request.body;
```

Теперь вызовите конечную точку createChatCompletion , как мы это делали в разделе React:

```javascript
const result = await openai.createChatCompletion({
	model: 'gpt-3.5-turbo',
	messages: [
		{
			role: 'system',
			content: 'You are a EbereGPT. You can help with graphic design tasks',
		},
		...chats,
	],
});
```

Разница заключается в том, что вместо использования блока then…catch… мы присвоили его переменной ( result ) и вернули ответ с помощью response.json() , как показано в следующем коде:

```javascript
response.json({
	output: result.data.choices[0].message,
});
```

Код этой части можно найти на [GitHub](https://github.com/EBEREGIT/react-nodejs-chatgpt-tutorial/tree/master/backend).

Вот вывод при тестировании на Postman:

![Вывод от почтальона](https://paper-attachments.dropboxusercontent.com/s_D592C23061BDAFBA9E611AEDC8048F685A5679FCF2C57746CD5AE80A3DAD15B0_1682943795836_Screenshot+2023-05-01+at+13.22.17.png)
Вывод от почтальона

На этом часть кода, посвященная бэкенду, завершена. В следующей части будет выполнено подключение фронтенда к бэкенду с помощью только что созданной конечной точки ( http://localhost:8000/ ).

### Как подключиться к бэкенду из фронтенда.

В этой части мы переходим на фронтенд, где создадим форму. Форма будет отправлять сообщение на бэкенд через конечную точку API и получать ответ через ту же среду.

Перейдите в файл frontend/src/App.jsx и введите следующий код:

```javascript
import { useState } from 'react';

function App() {
	const [message, setMessage] = useState('');
	const [chats, setChats] = useState([]);
	const [isTyping, setIsTyping] = useState(false);

	const chat = async (e, message) => {
		e.preventDefault();

		if (!message) return;
		setIsTyping(true);

		let msgs = chats;
		msgs.push({ role: 'user', content: message });
		setChats(msgs);

		setMessage('');

		alert(message);
	};

	return (
		<main>
			<h1>FullStack Chat AI Tutorial</h1>

			<section>
				{chats && chats.length
					? chats.map((chat, index) => (
							<p key={index} className={chat.role === 'user' ? 'user_msg' : ''}>
								<span>
									<b>{chat.role.toUpperCase()}</b>
								</span>
								<span>:</span>
								<span>{chat.content}</span>

					  ))
					: ''}
			</section>

			<div className={isTyping ? '' : 'hide'}>

					<i>{isTyping ? 'Typing' : ''}</i>

			</div>

			<form action="" onSubmit={(e) => chat(e, message)}>
				<input
					type="text"
					name="message"
					value={message}
					placeholder="Type a message here and hit Enter..."
					onChange={(e) => setMessage(e.target.value)}
				/>
			</form>
		</main>
	);
}
export default App;
```

Этот код аналогичен коду из предыдущего раздела. Но мы удалили конфигурации OpenAI, так как в этом разделе они нам больше не понадобятся.

На данный момент при отправке формы на экран выводится предупреждение. Через некоторое время это изменится.

В функции чата избавьтесь от сообщения alert и наберите следующее:

```javascript
fetch('http://localhost:8000/', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
	},
	body: JSON.stringify({
		chats,
	}),
})
	.then((response) => response.json())
	.then((data) => {
		msgs.push(data.output);
		setChats(msgs);
		setIsTyping(false);
	})
	.catch((error) => {
		console.log(error);
	});
```

Приведенный выше код вызывает созданную нами конечную точку и передает ей для обработки массив chats . Затем он возвращает ответ, который добавляется в массив chats и отображается в пользовательском интерфейсе.

Ниже показано, как выглядит пользовательский интерфейс на данный момент:

![Fullstack Чат UI до стайлинга
](https://paper-attachments.dropboxusercontent.com/s_D592C23061BDAFBA9E611AEDC8048F685A5679FCF2C57746CD5AE80A3DAD15B0_1682945738011_Screenshot+2023-05-01+at+13.55.10.png)
Fullstack Чат UI до стайлинга

Пользовательский интерфейс может выглядеть лучше, если добавить в файл frontend/src/index.css следующие стили:

```css
:root {
	font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
	line-height: 1.5;
	font-weight: 400;

	color-scheme: light dark;
	color: rgba(255, 255, 255, 0.87);
	background-color: #242424;

	font-synthesis: none;
	text-rendering: optimizeLegibility;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	-webkit-text-size-adjust: 100%;
}

html,
body {
	scroll-behavior: smooth;
}

h1 {
	font-size: 3.2em;
	line-height: 1.1;
	text-align: center;
	position: sticky;
	top: 0;
	background-color: #242424;
}

main {
	max-width: 800px;
	margin: auto;
}

p {
	background-color: darkslategray;
	max-width: 70%;
	padding: 15px;
	border-radius: 50px;
}

p span {
	margin: 5px;
}

p span:first-child {
	margin-right: 0;
}

.user_msg {
	text-align: right;
	margin-left: 30%;
	display: flex;
	flex-direction: row-reverse;
}

.hide {
	visibility: hidden;
	display: none;
}

form {
	text-align: center;
	position: sticky;
	bottom: 0;
}

input {
	width: 100%;
	height: 40px;
	border: none;
	padding: 10px;
	font-size: 1.2rem;
	background-color: rgb(28, 23, 23);
}

input:focus {
	outline: none;
}
```

И удалите все стили из файла frontend/src/App.css .

Код для этой части находится на [GitHub](https://github.com/EBEREGIT/react-nodejs-chatgpt-tutorial/tree/master/frontend).

А вот и конечный результат:

![FullStack ChatBot, работающий в соответствии с ожиданиями с помощью CSS](https://paper-attachments.dropboxusercontent.com/s_D592C23061BDAFBA9E611AEDC8048F685A5679FCF2C57746CD5AE80A3DAD15B0_1682946018213_Screenshot+2023-05-01+at+13.59.37.png)
FullStack ChatBot, работающий в соответствии с ожиданиями с помощью CSS

Поздравляю с завершением проекта!

Работа над чатботом с полным стеком была более трудоемкой, но она помогла нам разделить проблемы, создать более безопасное и привлекательное приложение и предложить пользователям лучший опыт. Так что это стоило затраченных усилий.

Код для этой секции можно найти на [GitHub](https://github.com/EBEREGIT/react-nodejs-chatgpt-tutorial).

## Заключение

Этот учебник, надеюсь, показал вам, что любой человек, обладающий базовыми знаниями в области программирования, может создавать программное обеспечение на основе искусственного интеллекта. Вы узнали, как создать чатбота с помощью React и Nodejs, а также обсудили плюсы и минусы каждой технологии.

В итоге мы создали решение, которое было функциональным, безопасным и визуально привлекательным.

После прочтения этого руководства вы сможете изучить такие функциональные возможности AI, как работа с изображениями и взаимодействие со звуком. Потратьте время на изучение документации и посмотрите, как можно расширить то, что мы здесь рассмотрели.
