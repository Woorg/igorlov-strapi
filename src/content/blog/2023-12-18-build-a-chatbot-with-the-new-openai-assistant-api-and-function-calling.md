---
title: Создайте чатбота с помощью нового API OpenAI Assistant и вызова функций
meta_title: >-
  Создайте чатбота с помощью нового API OpenAI Assistant и вызова функций |
  Игорь Горлов - Фронтeндер
description: >-
  Прошла всего неделя с конференции OpenAI Dev Conf 2023, и на ней было сделано
  неожиданное открытие: API помощника. Представленный в последнем сообщении
  блога O
date: 2023-12-18T00:00:00.000Z
categories:
  - Учебник
author: Игорь Горлов
type: blog
draft: false
slug: sozdaite-chatbota-s-pomoschiu-novoho-api-openai-assistant-y-v-zova-funktsyi
tags:
  - Open AI
image: >-
  ../../assets/images/sozdaite-chatbota-s-pomoschiu-novoho-api-openai-assistant-y-v-zova-funktsyi-Dec-18-2023.avif
lastmod: 2024-03-20T21:26:43.304Z
---

Прошла всего неделя с конференции OpenAI Dev Conf 2023, и на ней было сделано неожиданное открытие: API помощника. Представленный в последнем сообщении блога OpenAI, API Ассистента знаменует собой значительный шаг в расширении возможностей разработчиков по созданию агентоподобного опыта в своих приложениях.

По их собственным словам:

Сегодня мы выпускаем API Assistants - это наш первый шаг к тому, чтобы помочь разработчикам создавать агентоподобный опыт в своих приложениях. Ассистент - это специально созданный ИИ, который имеет конкретные инструкции, использует дополнительные знания и может вызывать модели и инструменты для выполнения задач.

Что же это значит для нас? По сути, это означает, что теперь у нас есть возможность создавать собственные ИИ-ассистенты с помощью API OpenAI. Это позволяет нам использовать возможности модели GPT-4 для выполнения задач и ответов на вопросы с помощью дополнительных знаний и контекста, которые мы предоставляем через загруженные документы (без необходимости привлечения сторонних разработчиков!), интерпретатор кода Python, работающий в изолированной среде, и функцию, которая действительно привлекла мое внимание: вызов функций.

Сами по себе функции не являются чем-то новым, но то, как они реализованы, действительно выделяется. Раньше вызов функции означал неуверенность в том, что модель вернется, и требовал постобработки для получения желаемого результата - и даже тогда успех не был гарантирован. Теперь мы можем указать желаемый выход функции, и модель будет стремиться предоставить ответ, соответствующий предоставленной схеме.

Этот новый инструмент дает нам огромную гибкость и мощь, позволяя нашему помощнику выполнять практически любые задачи - от отправки электронных писем до звонков и запросов к базам данных. Возможности безграничны.

Хотя доступных документов и примеров пока немного, мое любопытство заставило меня погрузиться в работу и изучить потенциал. В этом путешествии я решил создать простого математического помощника, который послужит доказательством концепции реализации вызовов функций в новом API Assistant в Node.js.

В этом примере мы сначала создадим простую викторину, чтобы протестировать вызов функций, а затем сможем продолжить разговор с помощником, чтобы задать больше вопросов, сохраняя при этом контекст разговора.

## Реализация

Для этого примера я использовал пример книги рецептов, предоставленный OpenAI, и стратегию командной строки из этого поста от Ральфа Эльфвинга, и немного подправил ее, чтобы сделать более интерактивной.

Нам понадобится всего несколько основных вещей:

## API-ключ OpenAI Среда Node.js

Для начала работы нам понадобятся пакеты `openai` и `dotenv`:

`npm install openai dotenv`.

Объявите ваш ключ API как переменную окружения: в вашем .env

`OPENAI_API_KEY=your-api-key`

После этого мы можем приступить к работе с кодом:

`// импортируем необходимые зависимости require('dotenv').config(); const OpenAI = require('openai'); const readline = require('readline').createInterface({ input: process.stdin, output: process.stdout, }); // Создаем соединение OpenAI const secretKey = process.env.OPENAI_API_KEY; const openai = new OpenAI({ apiKey: secretKey, });`.

Создадим метод и `readline` для ожидания пользовательского ввода

``async function askRLineQuestion(question: string) { return new Promise<string>((resolve, _reject) => { readline.question(question, (answer: string) => { resolve(`${answer}\n`); }); }); }``

Теперь мы создадим функцию `main` для запуска нашей программы.

## Начнем с создания помощника.

Для этого помощника потребуются инструменты `code_interpreter` и `function`, и мы будем использовать модель `gpt-4-1106-preview`. Я экспериментировал с моделью `gpt-3.5-turbo-1106`, но, похоже, она работает не так хорошо, как модель `gpt-4-1106-preview`.

Я переделал вызов функции в функцию `quizJson`, которая возвращает JSON-объект с вопросами и ответами викторины, чтобы было легче читать.

`const quizJson = { name: "display_quiz", description: "Отображает викторину для ученика и возвращает его ответ. В одном тесте может быть несколько вопросов.", parameters: { type: "object", properties: { title: { type: "string" }, questions: { type: "array", description: "Массив вопросов, каждый из которых имеет заголовок и потенциально возможные варианты ответов (при множественном выборе).", items: { type: "object", properties: { question_text: { type: "string" }, question_type: { type: "string", enum: ["MULTIPLE_CHOICE", "FREE_RESPONSE"], }, choices: { type: "array", items: { type: "string" } }, }, required: ["question_text"], }, }, }, }, required: ["title", "questions"], }, }; async function main() { try { const assistant = await openai.beta.assistants.create({ name: "Math Tutor", instructions: "Вы - персональный репетитор по математике. Отвечайте на вопросы кратко, в одном предложении или меньше.", tools: [ { { type: "code_interpreter" }, { type: "function", function: quizJson, }, ], // будет работать гораздо лучше с новой моделью model: "gpt-4-1106-preview", // model: "gpt-3.5-turbo-1106", }); // Записываем первое приветствие console.log("\nЗдравствуйте, я личный помощник Фернандо по математике. Начнем с небольшогоl quiz.\n", );`

После создания ассистента мы создадим поток, который будет хранить состояние нашего разговора, чтобы нам не приходилось предоставлять контекст каждый раз, когда мы задаем вопрос. Помните, что модель не имеет состояния, поэтому нам нужно предоставлять контекст каждый раз, когда мы задаем вопрос.

`const thread = await openai.beta.threads.create();`

Чтобы приложение могло выполняться многократно, мы используем цикл `while`. Этот цикл будет оценивать вводимые пользователем данные после каждого вопроса, чтобы определить, намерен ли он продолжать или нет. У нас также будет переменная `isQuizAnswered` для отслеживания состояния викторины.

`// метод main // создаем помощника и поток, как упоминалось выше let continueConversation = true; let isQuizAnswered = false; while (continueConversation) { // логика // после завершения вопроса-ответа проверяем, хочет ли пользователь продолжить const continueAsking = await askRLineQuestion( "Хотите ли вы продолжить разговор? (да/нет) ", ); continueConversation = continueAsking.toLowerCase() === "yes"; // Если состояние continueConversation является ложным, покажите сообщение о завершении разговора if (!continueConversation) { console.log("Ну что ж, надеюсь, вы чему-то научились!\n"); } }`

Логика процесса "вопрос-ответ" будет выглядеть следующим образом:

`while (continueConversation) { // сначала задаем вопрос и ждем ответа // начинаем с викторины, а затем продолжаем разговор const userQuestion = isQuizAnswered ? await askRLineQuestion("Ваш следующий вопрос к модели: \n") // это заставит модель построить викторину, используя предоставленную нами функцию : "Make a quiz with 2 questions: Один открытый, другой с множественным выбором" + "Затем дайте мне обратную связь для ответов."; // Передаем вопрос пользователя в существующий поток await openai.beta.threads.messages.create(thread.id, { role: "user", content: userQuestion, }); // Используем прогоны для ожидания ответа ассистента и последующего его получения // Создание прогона укажет ассистенту, что он должен начать просматривать сообщения в потоке и предпринять действия, вызвав инструменты или модель. const run = await openai.beta.threads.runs.create(thread.id, { assistant_id: assistant.id, }); // затем извлекаем фактический прогон let actualRun = await openai.beta.threads.runs.retrieve( // используем созданный ранее поток thread.id, run.id, );`.

Далее следует стратегия опроса для ожидания завершения обработки ответа моделью. Это немного хак, но на данный момент он работает. Мы будем ждать, пока модель закончит обработку ответа, а затем получим его.

Ожидаемый цикл выглядит следующим образом:

Предшествует викторине: Модель будет возвращать статус `queued`, затем статус `in_progress`, пока обрабатывает ответ После того как `tool_calls` будут добавлены для последующего использования, модель будет возвращать статус `requires_action`. Здесь мы фактически выполним функцию. Как только функция будет выполнена, мы передадим результаты работы инструмента в прогон, чтобы продолжить разговор. Наконец, модель вернет статус `completed`, и мы получим ответ. Если пользователь захочет продолжить разговор, мы повторим процесс, но на этот раз пропустим викторину и просто зададим вопрос пользователю.

`while ( actualRun.status === "queued" || actualRun.status === "in_progress" || actualRun.status === "requires_action" ) { // requires_action означает, что помощник ждет добавления функций if (actualRun.status === "requires_action") { // дополнительный вызов одного инструмента const toolCall = actualRun.required_action?.submit_tool_outputs?.tool_calls[0]; const name = toolCall?.function.name; const args = JSON.parse(toolCall?.function?.arguments || "{}"); const questions = args.questions; const responses = await displayQuiz(name || "cool quiz", questions); // переключаем флаг, устанавливающий начальный тест isQuizAnswered = true; // для продолжения работы мы должны отправить выходы инструментов в запуск await openai.beta.threads.runs.submitToolOutputs( thread.id, run.id, { tool_outputs: [ { { tool_call_id: toolCall?.id, output: JSON.stringify(responses), }, ], }, ); } // продолжаем опрос до завершения выполнения await new Promise((resolve) => setTimeout(resolve, 2000)); actualRun = await openai.beta.threads.runs.retrieve(thread.id, run.id); }`.

К этому моменту мы должны получить ответ от модели, поэтому отобразим его пользователю, а затем спросим, хочет ли он продолжить разговор.

`// после завершения выполнения выводим ответ console.log(actualRun.results[0].assistant_messages[0].content); // затем спрашиваем, хочет ли пользователь продолжить const continueAsking = await askRLineQuestion("Хотите ли вы продолжить разговор? (да/нет) ", ); continueConversation = continueAsking.toLowerCase() === "yes"; // Если состояние continueConversation является ложным, покажите завершающее сообщение if (!continueConversation) { console.log("Ну что ж, надеюсь, вы чему-то научились!\n"); } }`

Наконец, мы добавим `displayQuiz`. функция. Эта функция примет название викторины и вопросы и отобразит их пользователю. Затем она будет ждать, пока пользователь ответит на вопросы, и вернет ответы.

``// Получаем последнее сообщение ассистента из массива сообщений const messages = await openai.beta.threads.messages.list(thread.id); // Находим последнее сообщение для текущего запуска const lastMessageForRun = messages.data .filter( (message) => message.run_id === run.id && message.role === "assistant", ) .pop(); // Если сообщение ассистента найдено, console.log() it if (lastMessageForRun) { // видимо, массив `content` неправильно набран // content возвращает an of objects do contain a text object const messageValue = lastMessageForRun.content[0] as { text: { value: string }; }; console.log(`${messageValue?.text?.value} \n`); }``

Для поддержания разговора у нас есть возможность снова прочитать пользовательский ввод, что позволит отключить - при необходимости - флаг `continueConversation` или повторить процесс в разговорной манере.

`// затем спрашиваем, хочет ли пользователь продолжить const continueAsking = await askRLineQuestion( "Хотите ли вы продолжить разговор? (да/нет) ", ); continueConversation = continueAsking.toLowerCase().includes("yes"); // Если состояние continueConversation является ложным, покажите завершающее сообщение if (!continueConversation) { console.log("Ну что ж, надеюсь, вы чему-то научились!\n"); } }`

Не забудьте закрыть интерфейс `readline`.

`readline.close(); } catch (error) { console.error(error); } }`

## Наконец, мы вызовем функцию `main`, чтобы запустить программу.

`// вызов функции main после ее объявления main();`

А полная функция `main` будет выглядеть так:

`async function main() { try { const assistant = await openai.beta.assistants.create({ name: "Math Tutor", instructions: "Вы - персональный репетитор по математике. Отвечайте на вопросы кратко, не более одного предложения.", инструменты: [ { { type: "code_interpreter" }, { type: "function", function: quizJson, }, ], // будет работать гораздо лучше с новой моделью model: "gpt-4-1106-preview", // model: "gpt-3.5-turbo-1106", }); // Записываем первое приветствие console.log("\nЗдравствуйте, я личный помощник Фернандо по математике. Начнем с небольшой викторины.\n", ); // Создаем поток const thread = await openai.beta.threads.create(); // Используем continueConversation как состояние для продолжения задавания вопросов let continueConversation = true; while (continueConversation) { const userQuestion = isQuizAnswered ? await askRLineQuestion("Ваш следующий вопрос к модели: \n") // Это заставит модель построить викторину с помощью нашей функции: "Сделать викторину с 2 вопросами: Один открытый, другой с множественным выбором" + "Затем дайте мне обратную связь для ответов."; // Передаем вопрос пользователя в существующий поток await openai.beta.threads.messages.create(thread.id, { role: "user", content: userQuestion, }); // Используем прогоны для ожидания ответа помощника и последующего его получения const run = await openai.beta.threads.runs.create(thread.id, { assistant_id: assistant.id, }); let actualRun = await openai.beta.threads.runs.retrieve( thread.id, run.id, ); // Механизм опроса для проверки завершения actualRun while ( actualRun.status === "queued" || actualRun.status === "in_progress" || actualRun.status === "requires_action" ) { // requires_action означает, что помощник ждет добавления функций if (actualRun.status === "requires_action") { // дополнительный вызов одного инструмента const toolCall = actualRun.required_action?.submit_tool_outputs?.tool_calls[0]; const name = toolCall?.function.name; const args = JSON.parse(toolCall?.function?.arguments || "{}"); const questions = args.questions; const responses = await displayQuiz(name || "cool quiz", questions); // переключаем флаг, устанавливающий начальный тест isQuizAnswered = true; // для продолжения работы мы должны отправить выходы инструментов в запуск await openai.beta.threads.runs.submitToolOutputs( thread.id, run.id, { tool_outputs: [ { { tool_call_id: toolCall?.id, output: JSON.stringify(responses), }, ], }, ); } // продолжаем опрос до завершения выполнения await new Promise((resolve) => setTimeout(resolve, 2000)); actualRun = await openai.beta.threads.runs.retrieve(thread.id, run.id); }  // Получаем последнее сообщение ассистента из массива сообщений const messages = await openai.beta.threads.messages.list(thread.id); // Находим последнее сообщение для текущего запуска const lastMessageForRun = messages.data .filter( (message) => message.run_id === run.id && message.role === "assistant", ) .pop(); // Если сообщение ассистента найдено, console.log() it if (lastMessageForRun) { // видимо, массив `content` неправильно набран // content возвращает an of objects do contain a text object const messageValue = lastMessageForRun.content[0] as { text: { value: string }; }; console.log(`${messageValue?text?value} \n`); }  // Затем спрашиваем, хочет ли пользователь задать еще один вопрос, и обновляем состояние continueConversation const continueAsking = await askRLineQuestion("Хотите ли вы продолжить разговор? (да/нет) ", ); continueConversation = continueAsking.toLowerCase().includes("yes"); // Если состояние continueConversation falsy, покажите сообщение о завершении разговора if (!continueConversation) { console.log("Ну что ж, надеюсь, вы чему-то научились!\n"); } }  // закрываем readline readline.close(); } catch (error) { console.error(error); } }`

Если вы создали новый проект node с помощью `npm init` - рекомендуется - вы можете добавить скрипт для запуска вашего проекта следующим образом

`{ "scripts": { "start": "ts-node yourFileName.ts" } }`

Теперь мы можем запустить нашу программу с помощью `npm start` и получить следующий результат:

`Здравствуйте, я личный помощник Фернандо по математике. Начнем с небольшой викторины. > Викторина: display_quiz Вопрос: Что такое производная от 3x^2? f'(x) = 6x Вопрос: Что такое интеграл от x dx? Варианты: 0,5x^2 + C,x^2 + C,2x + C,Ни один из них 0,5x^2 + C Ваши ответы из викторины: ["f'(x) = 6x\n", '0.5x^2 + C\n' ] Отличная работа над тестом! Ваш ответ на первый вопрос, производная ( 3x^2 ), верен; это ( 6x ). Во втором вопросе вы правильно выбрали ( 0.5x^2 + C ) как интеграл от ( x ) относительно ( x ). Отличная работа! Продолжайте в том же духе! Хотите ли вы продолжить разговор? (да/нет) да Следующий вопрос вы задаете модели: Почему вы задали вопрос о производных и интегралах. Прошло много лет с тех пор, как я занимался этим. Приношу свои извинения за выбор этих математических тем. Обычно в математическом контексте используются вопросы по калькуляции, но я понимаю, что они могут быть не у всех в памяти. Если у вас есть другие области интересов или конкретные темы, которые вы хотели бы рассмотреть или узнать, пожалуйста, дайте мне знать, и я смогу адаптировать содержание соответствующим образом. Хотите ли вы продолжить разговор? (да/нет) нет Хорошо, надеюсь, вы чему-то научились!`

Вот и все! Мы создали простой математический помощник, который может отвечать на вопросы и поддерживать беседу. Это всего лишь пример концепции, но он демонстрирует потенциал нового API Assistant. Я уверен, что в ближайшем будущем мы увидим больше примеров и вариантов использования.

Если вы хотите посмотреть полный код, вы можете найти его в этом репо
