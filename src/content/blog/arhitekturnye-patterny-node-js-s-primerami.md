---
title: Архитектурные паттерны Node.js с примерами
meta_title: 'Осваиваем Архитектурные Паттерны Node.js: Инструкция с Примерами Кода'
description: >-
  Покорите вершины Node.js используя архитектурные паттерны: от MVC до
  микросервисов. Игорь Лов предоставляет наглядные примеры кода, которые
  прокладывают путь к чистой и эффективной структуре ваших приложений. Узнайте,
  как правильно структурировать проекты для максимальной производительности и
  легкости обслуживания.
date: 2023-09-09T20:32:00.000Z
categories:
  - Учебник
author: Igor Gorlov
tags:
  - Node.js
  - Паттерны
draft: false
keywords:
  - Архитектурные паттерны Node.js
lastmod: 2024-06-14T14:56:32.452Z
slug: arkhytekturn-e-pattern-node-js-s-prymeramy
image: ../../assets/images/arkhytekturn-e-pattern-node-js-s-prymeramy.avif
---

Изучение архитектурных паттернов Node.js на примерахNode.js с его неблокирующей, управляемой событиями архитектурой стал популярным выбором для создания широкого спектра приложений. При разработке на Node.js очень важно выбрать правильный архитектурный паттерн, соответствующий требованиям проекта. В этой статье мы рассмотрим несколько архитектурных паттернов Node.js и приведем примеры, иллюстрирующие их использование.

<!-- wp:rank-math/toc-block {"title":"Оглавление","headings":[{"key":"8335dfe0-b70d-4fd5-8bba-14ee5acde823","content":"1. MVC (Model-View-Controller)","level":2,"link":"#1-mvc-model-view-controller","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"ae940db5-09e1-493d-8467-a95e0e98a53c","content":"2. RESTful API","level":2,"link":"#2-res-tful-api","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"269ab5b4-40f4-49a9-9dd0-df34badac1c0","content":"3. Микросервисы","level":2,"link":"#3-микросервисы","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"3b63c35d-848f-4b31-92b6-9603480e17e6","content":"4. Приложения реального времени","level":2,"link":"#4-приложения-реального-времени","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"de5f5bd1-a15c-4e13-83e5-de93eacc17cd","content":"5. Архитектура, управляемая событиями","level":2,"link":"#5-архитектура-управляемая-событиями","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"f4d61bbf-cf34-4ad0-8f57-0bffb6fd9b63","content":"7. Многослойная архитектура","level":2,"link":"#7-многослойная-архитектура","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"7236be1c-76dc-49b0-91b1-715c2ccd0677","content":"8. CQRS (Разделение ответственности командного запроса)","level":2,"link":"#8-cqrs-разделение-ответственности-командного-запроса","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"bfd41651-6756-4981-94d8-8221b1fc62ef","content":"9. Гексагональная архитектура","level":2,"link":"#9-гексагональная-архитектура","disable":false,"isUpdated":false,"isGeneratedLink":true}],"listStyle":"ul"} -->
<div class="wp-block-rank-math-toc-block" id="rank-math-toc"><h2>Оглавление</h2><nav><ul><li class=""><a href="#1-mvc-model-view-controller">1. MVC (Model-View-Controller)</a></li><li class=""><a href="#2-res-tful-api">2. RESTful API</a></li><li class=""><a href="#3-микросервисы">3. Микросервисы</a></li><li class=""><a href="#4-приложения-реального-времени">4. Приложения реального времени</a></li><li class=""><a href="#5-архитектура-управляемая-событиями">5. Архитектура, управляемая событиями</a></li><li class=""><a href="#7-многослойная-архитектура">7. Многослойная архитектура</a></li><li class=""><a href="#8-cqrs-разделение-ответственности-командного-запроса">8. CQRS (Разделение ответственности командного запроса)</a></li><li class=""><a href="#9-гексагональная-архитектура">9. Гексагональная архитектура</a></li></ul></nav></div>
<!-- /wp:rank-math/toc-block -->

<h2 class="wp-block-heading" id="1-mvc-model-view-controller">1. MVC (Model-View-Controller)</h2>

Паттерн Model-View-Controller (MVC) - это широко распространенный архитектурный паттерн для веб-приложений. Он разделяет приложение на три компонента:

Модель: Обрабатывает данные и бизнес-логику.Представление: Представляет данные и пользовательский интерфейс.Контроллер: Управляет взаимодействием между моделью и представлением.

Вот простой пример Node.js MVC с использованием Express.js:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">const express = require('express');
const app = express();

// Model
const items = [];

// View
app.get('/items', (req, res) =&gt; {
  res.json(items);
});

// Controller
app.post('/items', (req, res) =&gt; {
  const newItem = req.body;
  items.push(newItem);
  res.status(201).json(newItem);
});

app.listen(3000, () =&gt; {
  console.log('Server is running on port 3000');
});
</code></pre>
<!-- /wp:code -->

<h2 class="wp-block-heading" id="2-res-tful-api">2. RESTful API</h2>

Node.js является популярным выбором для построения RESTful API. Архитектура RESTful следует таким принципам, как отсутствие статичности и единообразие интерфейсов.

Приведем пример простого REST API с использованием Express.js:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">const express = require('express');
const app = express();

app.get('/api/books', (req, res) =&gt; {
  // Return a list of books
});

app.get('/api/books/:id', (req, res) =&gt; {
  // Return details of a specific book
});

app.post('/api/books', (req, res) =&gt; {
  // Create a new book
});

app.put('/api/books/:id', (req, res) =&gt; {
  // Update a book
});

app.delete('/api/books/:id', (req, res) =&gt; {
  // Delete a book
});

app.listen(3000, () =&gt; {
  console.log('RESTful API server is running on port 3000');
});
</code></pre>
<!-- /wp:code -->

<h2 class="wp-block-heading" id="3-микросервисы">3. Микросервисы</h2>

Архитектура микросервисов предполагает разбиение сложного приложения на небольшие независимые сервисы. Каждый сервис обладает собственной функциональностью и взаимодействует с другими через API. Node.js хорошо подходит для построения микросервисов благодаря своей легкости и масштабируемости.

Приведем упрощенный пример:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">// Service 1
const express = require('express');
const app = express();
// Define service 1 routes and functionality

// Service 2
const express2 = require('express');
const app2 = express2();
// Define service 2 routes and functionality

// ...

app.listen(3001, () =&gt; {
  console.log('Service 1 is running on port 3001');
});

app2.listen(3002, () =&gt; {
  console.log('Service 2 is running on port 3002');
});
</code></pre>
<!-- /wp:code -->

<h2 class="wp-block-heading" id="4-приложения-реального-времени">4. Приложения реального времени</h2>

Node.js - отличный выбор для приложений реального времени, требующих связи между сервером и клиентами с малой задержкой. Такие библиотеки, как Socket.io, позволяют легко реализовать функции реального времени.

Вот пример базового приложения для чата:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) =&gt; {
  console.log('A user connected');

  socket.on('chat message', (message) =&gt; {
    io.emit('chat message', message);
  });

  socket.on('disconnect', () =&gt; {
    console.log('A user disconnected');
  });
});

server.listen(3000, () =&gt; {
  console.log('Chat server is running on port 3000');
});
</code></pre>
<!-- /wp:code -->

<h2 class="wp-block-heading" id="5-архитектура-управляемая-событиями">5. Архитектура, управляемая событиями</h2>

Событийный характер Node.js делает его подходящим для архитектуры, управляемой событиями. С помощью модуля EventEmitter можно строить системы, реагирующие на события и асинхронные действия.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

myEmitter.on('event', () =&gt; {
  console.log('An event occurred!');
});

myEmitter.emit('event');
</code></pre>
<!-- /wp:code -->

6. GraphQL

GraphQL - это язык запросов для API, позволяющий клиентам запрашивать именно те данные, которые им нужны. На базе Node.js можно создавать серверы GraphQL, что позволяет использовать его в ситуациях, когда клиенты предъявляют различные требования к данным.

Приведем упрощенный пример с использованием библиотеки Apollo Server:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () =&gt; 'Hello, world!',
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) =&gt; {
  console.log(`GraphQL server ready at ${url}`);
});
</code></pre>
<!-- /wp:code -->

<h2 class="wp-block-heading" id="7-многослойная-архитектура">7. Многослойная архитектура</h2>

Подобно MVC, вы можете организовать свое приложение Node.js на такие уровни, как представление, бизнес-логика и доступ к данным. Это способствует разделению проблем и удобству сопровождения.

<h2 class="wp-block-heading" id="8-cqrs-разделение-ответственности-командного-запроса">8. CQRS (Разделение ответственности командного запроса)</h2>

В паттерне CQRS (Command Query Responsibility Segregation - разделение ответственности командных запросов) вы разделяете читающую и записывающую части вашего приложения. Node.js может быть использован для создания API как для командной, так и для запросной частей системы.

<h2 class="wp-block-heading" id="9-гексагональная-архитектура">9. Гексагональная архитектура</h2>

Гексагональная архитектура подчеркивает разделение проблем и использование портов и адаптеров для изоляции основного приложения от внешних зависимостей. В этом паттерне может эффективно использоваться Node.js.

Выбор архитектурного паттерна зависит от специфических требований проекта, потребностей в масштабируемости и знакомства команды с паттерном. Часто в рамках одного приложения используется комбинация этих паттернов для эффективного решения различных задач.

Изучите эти архитектурные паттерны и выберите тот, который лучше всего подходит для вашего проекта на Node.js, чтобы обеспечить масштабируемость, удобство обслуживания и производительность.
