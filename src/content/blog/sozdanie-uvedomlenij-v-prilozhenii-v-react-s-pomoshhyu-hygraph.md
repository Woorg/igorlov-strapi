---
title: Создание уведомлений в приложении в React с помощью Hygraph
meta_title: Создание уведомлений в приложении в React с помощью Hygraph - Фул Фронт Дев
description: >-
  С уведомлениями сегодня знаком практически каждый. Их можно разделить на две
  большие группы: push-уведомления и уведомления в приложении.
date: 2023-09-09T14:53:00.000Z
image: ../../assets/images/undefined-Sep-09-2023.avif
categories:
  - Учебник
author: Igor Gorlov
tags:
  - Hygraph
  - React
  - Webhooks
  - WebSockets
draft: false
lastmod: 2024-03-20T21:26:45.784Z
---

С уведомлениями сегодня знаком практически каждый. Их можно разделить на две большие группы: push-уведомления и уведомления в приложении.

Поскольку push-уведомления обрабатываются мобильным устройством или браузером пользователя, они должны быть реализованы особым образом. В свою очередь, уведомления в приложении отображаются в приложении, поэтому решение о том, как они будут реализованы - от внешнего вида до технологии, лежащей в их основе, - полностью зависит от вас.

Такая настраиваемость in-app уведомлений имеет то преимущество, что они глубоко интегрированы с вашим приложением, что позволяет улучшить пользовательский опыт по сравнению с типовыми push-уведомлениями. Однако из-за того, что уведомления in-app различаются в каждом конкретном случае, их бывает сложно реализовать. Не существует единого ”правильного способа".

Однако общим для большинства уведомлений является то, что они позволяют отправлять контент пользователям, которые активно работают с вашим приложением. Это лучшее окно возможностей для того, чтобы поделиться с ними новостями, такими как новые функции, распродажи или рекламные акции.

В этом руководстве вы узнаете, как создать простые уведомления в приложении, используя мощную систему контента Hygraph, веб-крючки и WebSockets с фронтендом React.js. Уведомления в приложении будут отображать пользователю несколько текстовых полей и цвет, указывающий на важность уведомления.

<!-- wp:rank-math/toc-block {"title":"Оглавление","headings":[{"key":"1ecabd5b-d88b-4ced-93ad-1411fdffa302","content":"Обзор проекта","level":2,"link":"#обзор-проекта","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"a34c0c79-f9e3-4b37-966f-476bccc8db9c","content":"Требования","level":2,"link":"#требования","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"f3d16f03-0e54-4dad-86db-f6b1e3f9307a","content":"Создание бэкенда","level":2,"link":"#создание-бэкенда","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"481d0a31-82b0-4cdc-ab01-e1fb61199a5f","content":"#Настройка ngrok","level":2,"link":"#настройка-ngrok","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"ee57f6cb-b391-4b73-abbe-5b6e44f0ddd8","content":"#Создание фронтенда","level":2,"link":"#создание-фронтенда","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"adad6295-612f-4044-bcf1-f7d7821ce734","content":"Подведение итогов","level":2,"link":"#подведение-итогов","disable":false,"isUpdated":false,"isGeneratedLink":true}],"listStyle":"ul"} -->
<div class="wp-block-rank-math-toc-block" id="rank-math-toc"><h2>Оглавление</h2><nav><ul><li class=""><a href="#обзор-проекта">Обзор проекта</a></li><li class=""><a href="#требования">Требования</a></li><li class=""><a href="#создание-бэкенда">Создание бэкенда</a></li><li class=""><a href="#настройка-ngrok">#Настройка ngrok</a></li><li class=""><a href="#создание-фронтенда">#Создание фронтенда</a></li><li class=""><a href="#подведение-итогов">Подведение итогов</a></li></ul></nav></div>
<!-- /wp:rank-math/toc-block -->

<h2 class="wp-block-heading" id="обзор-проекта">Обзор проекта</h2>

Прежде чем приступить к работе, просмотрите эту диаграмму последовательности действий, чтобы понять, как будут взаимодействовать различные компоненты:

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://media.graph../../assets.com/FL8vM0zBSC6Ug4UwN7Bc" alt=""/></figure>
<!-- /wp:image -->

Hygraph может быть настроен на отправку запросов на конечную точку webhook при наступлении определенных событий. Поскольку бэкенд будет выполняться локально, ngrok позволяет вывести его через туннель в Интернет, который Hygraph может использовать в качестве конечной точки webhook. Когда бэкенд получает запрос на конечной точке webhook, он будет рассылать полученные данные всем подключенным клиентам через WebSockets. Наконец, когда фронтенд получает сообщение WebSocket, содержащее уведомление, он его отображает.

Готовый код этого руководства можно найти в этом публичном репозитории GitHub.

<h2 class="wp-block-heading" id="требования">Требования</h2>

Для выполнения этого руководства вам потребуется несколько вещей:

Node.jsРедактор кода. VS Code - хороший выбор, если у вас нет предпочтений.Учетная запись HygraphУчетная запись Ngrok и соответствующая загрузка для выбранной вами ОСОпционально: Google Chrome или браузер на базе Chrome для запуска определенного расширения браузера для тестирования WebSocket-соединения. Если у вас нет Chrome или вы не хотите его устанавливать, этот пункт можно пропустить.#Настройка Hygraph

Первая часть головоломки - Hygraph. Hygraph - это платформа для работы с контентом, которая обладает большой гибкостью. В этом руководстве вы будете использовать ее для публикации фрагментов контента и их автоматической отправки через webhook в бэкенд вашего приложения.

Если вы еще не сделали этого, создайте учетную запись. После входа в систему выберите на главном экране опцию создания нового пустого проекта. Дайте ему название, например Notification demo, и нажмите кнопку Add project:

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://media.graph../../assets.com/wIV3hLDZR0uquACLOTUk" alt=""/></figure>
<!-- /wp:image -->

После того как новый проект создан и вы попали на панель управления проектом, в левом меню выберите пункт Schema. В появившемся меню нажмите кнопку Add рядом с Enumerations. Откроется диалоговое окно, в котором необходимо ввести некоторые данные. Перечисление, которое вы создаете, будет обозначать ”намерение" ваших уведомлений, чтобы можно было показывать уведомления с разной степенью серьезности. Заполните диалог этими данными, как показано на скриншоте ниже:

Display name: Use intent.API ID: Использовать Intent.Description: Это необязательно; вы можете оставить его пустым.Значения перечисления: Используйте info, warning, error и success, нажимая Enter после каждого значения.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://media.graph../../assets.com/UH3UNQJaQqqj9imvtzJS" alt=""/></figure>
<!-- /wp:image -->

Затем нажмите кнопку Add Enumeration (Добавить перечисление):

Далее в верхней части меню Schema нажмите кнопку Add рядом с Models. В результате откроется новый диалог, позволяющий создать модель, представляющую ваши уведомления. Заполните диалог этими данными, как показано на скриншоте ниже:

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Display name: Use Notification.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>API ID: Use Notification.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Plural API ID: Использовать Notifications.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Description: Это необязательный параметр; его можно оставить пустым.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://media.graph../../assets.com/UBlvBrE2Sne4ygAM9Yzr" alt=""/></figure>
<!-- /wp:image -->

Затем нажмите кнопку Добавить модель.

Hygraph переведет вас на новую страницу, где вам будет предложено добавить поля в вашу модель. Поля можно выбрать из правого меню. В данном учебном пособии добавлены следующие поля:

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Однострочный текст: В качестве имени поля используйте "Заголовок".</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Многострочный текст: В качестве имени поля используйте Message (Сообщение).</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Dropdown (Выпадающее поле): В качестве имени поля используйте Intent. Для этого поля выберите в качестве значения поля Enumeration перечисление Intent.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

После создания этих полей ваша модель должна выглядеть следующим образом:

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://media.graph../../assets.com/81Hsv03JRcuTd7fm2fTx" alt=""/></figure>
<!-- /wp:image -->

Далее необходимо настроить веб-крючок для этой модели, чтобы убедиться, что все работает как надо.

Выберите Webhooks в нижней части левого меню, а затем выберите Add Webhook. Откроется форма, позволяющая настроить веб-крючок.

Поскольку бэкэнд еще не создан, для проверки работоспособности можно использовать простую службу тестирования webhook. В новой вкладке перейдите на страницу https://webhook.site/, где вам будет предоставлен уникальный URL. Скопируйте этот URL и используйте его в качестве значения Url в форме веб-хука Hygraph.

В разделе Triggers выберите модель (уведомление), а также стадию (Published) и действие (Publish), на которые она должна срабатывать. Заполненная форма должна выглядеть примерно так:

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://media.graph../../assets.com/iTk2oWUDTrOC2QKYgpZ9" alt=""/></figure>
<!-- /wp:image -->

Отправьте форму, нажав кнопку Добавить в правом верхнем углу.

Далее в левом меню выберите пункт Content и затем Add entry. Заполните три поля — используйте My title для Title, My message для Message и Success для Intent, как показано ниже, — и нажмите Save &amp; publish.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://media.graph../../assets.com/1dhZD8hHRtqyNlg0yqCk" alt=""/></figure>
<!-- /wp:image -->

После сохранения вернитесь на вкладку webhook.site. Вы должны увидеть, что на нее пришло сообщение, содержащее указанные вами значения:

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://media.graph../../assets.com/KyjIiwKSTqqfJfMUe5PA" alt=""/></figure>
<!-- /wp:image -->

При этом проверяется, что все в Hygraph настроено правильно.

После создания бэкенда вы измените URL webhook, а пока можете оставить его как есть.

<h2 class="wp-block-heading" id="создание-бэкенда">Создание бэкенда</h2>

Следующее, что необходимо создать, - это сервис backend, который будет выполнять две задачи. Во-первых, он будет получать веб-крючки POST-запросов от Hygraph. Во-вторых, он будет размещать WebSocket-сервер и рассылать сообщения всем подключенным клиентам, содержащие информацию об уведомлениях, полученных через webhook.

Это простая, надуманная форма того, что в реальных условиях, скорее всего, было бы более сложным приложением, но она служит для демонстрации используемых архитектурных паттернов.

Чтобы начать работу, создайте новую директорию, в которой будет храниться код этого руководства. Внутри этого каталога создайте еще один каталог, в котором будет храниться код для сервера:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">mkdir -p hygraph-notifications/server
cd hygraph-notifications/server</code></pre>
<!-- /wp:code -->

Попав в этот каталог, необходимо установить несколько зависимостей. Сначала инициализируйте новый проект npm (можно принять значения по умолчанию для всех вопросов, которые он задаст), а затем установите следующие зависимости:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">npm init 
npm i -D typescript @types/ws @types/express 
npm i body-parser express ws</code></pre>
<!-- /wp:code -->

Далее создайте файл tsconfig.json и придайте ему следующее содержание:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">{
    "compilerOptions": {
        "esModuleInterop": true,
        "target": "es6",
        "module": "commonjs",
        "outDir": "./dist/server",
        "strict": true,
        "sourceMap": true,
        "typeRoots": [
            "node_modules/@types"
        ]
    },
    "exclude": [
        "dist",
        "node_modules"
    ]
</code></pre>
<!-- /wp:code -->

Наконец, создайте файл index.ts и придайте ему следующее содержание:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">import express from "express";
import http from "http";
import WebSocket from "ws";
import bodyParser from "body-parser";
import { randomUUID } from "crypto";

// Create a new express app instance
const app = express();

// Parse JSON bodies
const jsonParser = bodyParser.json();

// Create a new HTTP server
const server = http.createServer(app);

// Create a new WebSocket server
const wss = new WebSocket.Server({ server });

app.post("/webhook", jsonParser, (req, res) =&gt; {
  // Broadcast the notification to all connected clients
  // In a real app, you would probably want to send to specific clients
  wss.clients.forEach((client) =&gt; {
    if (client.readyState === WebSocket.OPEN) {
      client.send(
        JSON.stringify({
          id: randomUUID(), // Generate a random ID for the message
          type: "notification", // Give the message a type
          // Encode the data from the webhook into the message
          data: {
            title: req.body.data.title,
            message: req.body.data.message,
            intent: req.body.data.intent,
          },
        })
      );
    }
  });
  res.sendStatus(200);
});

// Handle new WebSocket connections
wss.on("connection", (ws: WebSocket) =&gt; {
  // Acknowledge connection
  ws.send(JSON.stringify({ id: randomUUID(), type: "connection", data: null }));
});

const port = process.env.PORT || 8999;

// Start the server
server.listen(port, () =&gt; {
  console.log(`Server started on port ${port}`);
});</code></pre>
<!-- /wp:code -->

Комментарии в этом коде описывают, что делает каждая секция, но суть заключается в том, что создается веб-сервер для обработки входящих веб-хуков и соединений WebSocket, как описано выше.

Поскольку код написан на TypeScript, перед выполнением его необходимо транспонировать. Для этого выполните следующие команды:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">./node_modules/.bin/tsc
node dist/server/index.js</code></pre>
<!-- /wp:code -->

В терминале должно появиться сообщение о том, что сервер запущен на порту 8999.

На этом этапе целесообразно проверить, все ли работает. Самый простой способ сделать это еще до создания фронтенда - использовать расширение Simple WebSocket Client для Google Chrome.

Установите это расширение, а затем щелкните на значке, который оно добавляет в омнибар. В результате откроется простой пользовательский интерфейс с полем URL:. В этом поле введите ws://localhost:8999 и нажмите кнопку Открыть. Должно получиться что-то вроде этого:

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://media.graph../../assets.com/9vciztKSR9K99SDZYa2y" alt=""/></figure>
<!-- /wp:image -->

Этот вывод указывает на то, что клиент успешно подключился к вашему WebSocket-серверу.

<h2 class="wp-block-heading" id="настройка-ngrok">#Настройка ngrok</h2>

Далее вы используете ngrok для того, чтобы вывести ваш сервер в Интернет, чтобы Hygraph мог отправлять на него webhook-запросы.

Если вы еще не сделали этого, создайте учетную запись в ngrok, следуйте инструкциям по загрузке бинарного файла ngrok для выбранной вами ОС и авторизуйтесь с помощью учетной записи ngrok.

После этого выполните следующую команду, чтобы запустить сессию ngrok на вашей машине:

Вы должны увидеть примерно такой вывод:

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://media.graph../../assets.com/RBc2rnQsQ5O2abMn4U0L" alt=""/></figure>
<!-- /wp:image -->

Скопируйте URL-адрес из строки Forwarding (размыто выше) и вернитесь в Hygraph. Перейдите к пункту меню Webhooks в нижней части левого меню и отредактируйте существующий webhook. Замените предыдущий URL на скопированный вами ngrok URL с суффиксом /webhook, поскольку именно по этому маршруту ваш сервер настроен на прослушивание. Сохраните изменения в конфигурации webhook, нажав кнопку Update в правом верхнем углу.

Далее вернитесь в меню Content. Нажмите Add Entry и создайте еще одно уведомление, заполнив и отправив форму.

Если вы посмотрите в терминал ngrok, то увидите, что он зарегистрировал POST-запрос к конечной точке /webhook. Если это так, посмотрите в WebSocket-клиенте, где также должно появиться уведомление:

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://media.graph../../assets.com/NKNKaqpPQ9eZUpOaNFps" alt=""/></figure>
<!-- /wp:image -->

Если сообщение не появилось, проверьте, что все перечисленное ниже верно:

Сервер запущен локально.ngrok запущен.URL, переданный ngrok, является URL, настроенным в Hygraph, и что вы добавили к нему суффикс /webhook.

Чтобы возобновить соединение, нажмите Close и затем снова Open в клиенте WebSocket.

Если все работает, то можно переходить к последней части - фронтенду.

<h2 class="wp-block-heading" id="создание-фронтенда">#Создание фронтенда</h2>

Теперь у вас есть данные, поступающие от Hygraph через веб-хук и отправляемые на WebSocket-клиент. Если реализовать обработку этих WebSocket-сообщений в приложении React, то можно показывать уведомления в приложении, управляемые системой контента Hygraph. Это React-приложение будет создано с использованием TypeScript, Vite и Tailwind.

Чтобы начать работу, вернитесь в корневой каталог проекта и создайте новый проект Vite с помощью следующей команды:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript"># From hygraph-notifications/
npm create vite@latest frontend --template react-ts
# If you are using the most recent versions of npm, use the following command instead:
# npm create vite@latest frontend -- --template react-ts
cd frontend
npm install</code></pre>
<!-- /wp:code -->

Далее необходимо установить некоторые другие зависимости для Tailwind и для работы с WebSockets:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">npm i react-use-websocket
npm i -D tailwindcss postcss autoprefixer
npx tailwindcss init -p</code></pre>
<!-- /wp:code -->

Эта команда должна была создать новый файл tailwind.config.js. Откройте этот файл и замените его содержимое на следующее, чтобы убедиться, что Tailwind следит за соответствующими файлами:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};</code></pre>
<!-- /wp:code -->

Далее необходимо добавить Tailwind в базовый CSS-файл и несколько правил сброса. Откройте файл src/index.css и замените его содержимое на следующее:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">@tailwind base;
@tailwind components;
@tailwind utilities;

html, body {
  padding: 0;
  margin: 0;
}

#root {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}</code></pre>
<!-- /wp:code -->

Наконец, откройте файл src/App.tsx и замените его содержимое на следующее:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">import { useCallback, useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";

// Define some types for better autocomplete
type Intent = "success" | "warning" | "error" | "info";

type MessageType = "notification" | "connection";

type MessageData = {
  notification: {
    title: string;
    message: string;
    intent: Intent;
  };
  connection: null;
};

type Message&lt;T extends MessageType&gt; = {
  id: string;
  type: T;
  data: MessageData[T];
};

// Define a map of intents to Tailwind CSS classes to color your notifications
const intentMap: Record&lt;Intent, string&gt; = {
  success: "bg-green-500",
  warning: "bg-yellow-500",
  error: "bg-red-500",
  info: "bg-blue-500",
};

function App() {
  // Store the message history in state
  const [messageHistory, setMessageHistory] = useState&lt;Message&lt;MessageType&gt;[]&gt;(
    []
  );

  // Connect to the websocket server
  const [socketUrl] = useState("ws://localhost:8999");
  const { lastMessage } = useWebSocket(socketUrl);

  // When a new message is received, parse it and add it to the message history
  useEffect(() =&gt; {
    if (lastMessage !== null) {
      const parsedData = JSON.parse(lastMessage.data);
      setMessageHistory((prev) =&gt; prev.concat(parsedData));
    }
  }, [lastMessage, setMessageHistory]);

  // Define a function to dismiss a notification
  const handleDismiss = useCallback(
    (message: Message&lt;"notification"&gt;) =&gt; {
      setMessageHistory((prev) =&gt; prev.filter((m) =&gt; m.id !== message.id));
    },
    [setMessageHistory]
  );

  // Filter the message history to only include notifications
  const notifications = messageHistory.filter(
    (data): data is Message&lt;"notification"&gt; =&gt; data.type === "notification"
  );

  // Render the notifications
  if (notifications.length &gt; 0) {
    return (
      &lt;div className="bg-gray-800 text-white flex justify-center items-center h-full w-full flex-col p-12"&gt;
        &lt;h1 className="text-3xl font-bold font-sans mb-4"&gt;Notifications&lt;/h1&gt;
        &lt;ul className="w-full"&gt;
          {notifications.map((message, idx) =&gt; (
            &lt;li
              key={message.id}
              className={`w-full p-2 rounded-md my-2 flex items-start justify-start flex-col ${
                intentMap[message.data.intent]
              }`}
            &gt;
              &lt;div className="font-bold flex justify-between w-full"&gt;
                &lt;span&gt;{message.data?.title}&lt;/span&gt;
                &lt;button onClick={() =&gt; handleDismiss(message)}&gt;x&lt;/button&gt;
              &lt;/div&gt;
              &lt;div&gt;{message.data?.message}&lt;/div&gt;
            &lt;/li&gt;
          ))}
        &lt;/ul&gt;
      &lt;/div&gt;
    );
  }

  // If there are no notifications, render a waiting message
  return (
    &lt;div className="bg-gray-800 text-white flex justify-center items-center h-full w-full"&gt;
      &lt;div&gt;Waiting for notifications...&lt;/div&gt;
    &lt;/div&gt;
  );
}

export default App;</code></pre>
<!-- /wp:code -->

В приведенном выше коде есть комментарии, описывающие действия каждого элемента, но, по сути, он подключается к серверу WebSocket, работающему на порту 8999, и ожидает получения сообщения с типом ”уведомление".

Как только одно из таких уведомлений получено, оно отображается с помощью простых стилей. Цвет уведомления зависит от намерения, выбранного в Hygraph при создании записи, а на отрисованном уведомлении имеется кнопка для его отмены.

Кроме этого, в коде присутствуют некоторые типы для работы с автозаполнением. В реальном приложении все это, скорее всего, было бы разбросано по нескольким файлам, но в данном надуманном примере для краткости все это собрано в одном файле.

В терминале выполните следующую команду, чтобы запустить фронтенд-приложение:

В выводе должно быть указано, на каком порту оно работает. Перейдите по этому адресу в браузере, где вы увидите примерно следующее:

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://media.graph../../assets.com/R71w1QVTHORflV3uPgOl" alt=""/></figure>
<!-- /wp:image -->

Если вы ранее останавливали службу backend или ngrok, убедитесь, что они работают и что URL, который выдает ngrok, по-прежнему настроен для ваших веб-крючков в Hygraph. Если все эти компоненты работают, опубликуйте уведомление из Hygraph. Оно должно появиться в виде уведомления в приложении:

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://media.graph../../assets.com/xFaK0mxRQcuaaLpspbIy" alt=""/></figure>
<!-- /wp:image -->

С помощью мощных инструментов Hygraph для работы с контентом вы можете отправлять уведомления в приложении на фронтенд React в режиме реального времени.

<h2 class="wp-block-heading" id="подведение-итогов">Подведение итогов</h2>

В этом руководстве мы рассмотрели, как использовать Hygraph, webhooks, WebSockets и React для реализации базовых уведомлений в реальном времени.

В этом примере все было очень просто - всего несколько текстовых полей и перечисление. Однако Hygraph поддерживает множество полезных типов полей, включая геокоординаты, загрузку файлов и ввод текста. Благодаря такой гибкости, а также инструментам и методам, рассмотренным в этом учебном пособии, нет предела возможностям, которые вы можете привнести в свои приложения, работающие в реальном времени и управляемые контентом.
