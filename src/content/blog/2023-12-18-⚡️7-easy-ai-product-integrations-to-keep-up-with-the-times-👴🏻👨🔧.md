---
title: ⚡️7 простые интеграции AI-продуктов (чтобы идти в ногу со временем ).
meta_title: >-
  ⚡️7 простые интеграции AI-продуктов (чтобы идти в ногу со временем ). | Игорь
  Горлов - Фронтeндер
description: >-
  TL;DR


  Список лучших простых в построении интеграций AIпродуктов.


  Они могут придать вашему проекту магическую силу, так что не забудьте выразить
  им поддержку
date: 2023-12-18T00:00:00.000Z
categories:
  - Обзор
author: Игорь Горлов
type: blog
draft: false
slug: 7-prost-e-yntehratsyy-ai-produktov-chtob-ydty-v-nohu-so-vremenem
tags:
  - Ai
image: >-
  ../../assets/images/7-prost-e-yntehratsyy-ai-produktov-chtob-ydty-v-nohu-so-vremenem-Dec-18-2023.avif
lastmod: 2024-03-20T21:26:45.775Z
---

TL;DR

Список лучших простых в построении интеграций AI-продуктов.

Они могут придать вашему проекту магическую силу, так что не забудьте выразить им поддержку 🌟

А теперь давайте отправимся на дорогу ИИ 👨‍🌾.

![3cat30m677e7c0vv8bpn.gif](../../assets/images/3cat30m677e7c0vv8bpn.gif)

## 1. CopilotPortal: Внедрите чатбота LLM в ваше приложение

![x31tl645tfa3sw5lwwzv.jpg](../../assets/images/x31tl645tfa3sw5lwwzv.jpg)

Контекстно-ориентированный LLM-чатбот внутри вашего приложения, который отвечает на вопросы и выполняет действия.

Получите работающий чат-бот с помощью нескольких строк кода, а затем настраивайте и внедряйте его так глубоко, как вам нужно.

```js
import "@copilotkit/react-ui/styles.css";
import { CopilotProvider } from "@copilotkit/react-core";
import { CopilotSidebarUIProvider } from "@copilotkit/react-ui";

export default function App(): JSX.Element {
  return (
    <CopilotProvider chatApiEndpoint="/api/copilotkit/chat">
      <CopilotSidebarUIProvider>
        <YourContent />
      </CopilotSidebarUIProvider>
    </CopilotProvider>
  );
}
```

## 2. LinguiJS - автоматическая и простая интернационализация

![80f1yb9etnzf3z4pk7t3.png](../../assets/images/80f1yb9etnzf3z4pk7t3.png)

Простая и мощная библиотека интернационализации с открытым исходным кодом.

Легко интегрируемый фреймворк для создания многоязычных реактивных приложений.

```js
import { Trans } from '@lingui/macro';

function App() {
	return (
		<Trans id="msg.docs">
			Читайте <a href="https://lingui.dev">документацию</a> для получения дополнительной информации.
		</Trans>
	);
}
```

## 3. Pezzo.ai - наблюдаемость, стоимость и оперативность инженерной платформы

![nxvbgi5zkghkb0t64npw.jpeg](../../assets/images/nxvbgi5zkghkb0t64npw.jpeg)

Централизованная платформа для управления вашими вызовами OpenAI.

Оптимизируйте ваши подсказки и использование токенов. Следите за использованием искусственного интеллекта.

Бесплатно и легко интегрируется.

```js
const prompt = await pezzo.getPrompt('AnalyzeSentiment');
const response = await openai.chat.completions.create(prompt);
```

## 4. CopilotTextarea - написание текста с помощью искусственного интеллекта в приложениях React

![uye8z6aac1015iiqd3lk.png](../../assets/images/uye8z6aac1015iiqd3lk.png)

Замена для любого react `<textarea>` с возможностями Github CopilotX.

Автозавершение, вставка, редактирование.

Может получать любой контекст в реальном времени или от разработчика заранее.

```js
import { CopilotTextarea } from '@copilotkit/react-textarea';
import { CopilotProvider } from '@copilotkit/react-core';

// Remove comments and unused imports
// Standardize variable names
// Improve readability by adding proper indentation
// Remove debugging statements
function MyComponent() {
	return (
		<CopilotProvider>
			<CopilotTextarea />
		</CopilotProvider>
	);
}
```

## 5. LangChain - собирает AI в цепочки

![8s87kvm5jt5wmsv702r1.png](../../assets/images/8s87kvm5jt5wmsv702r1.png)

Простой в использовании API и библиотека для добавления LLM в приложения.

Свяжите вместе различные компоненты и модели ИИ.

Легко встраивайте контекст и семантические данные для мощных интеграций.

## 6. SwirlSearch - поиск с использованием искусственного интеллекта

![extnr9oxhubs6m9x817a.png](../../assets/images/extnr9oxhubs6m9x817a.png)

Поиск на основе LLM, резюме и вывод.

Одновременный поиск по нескольким источникам контента в интегрированном виде.

Мощный инструмент для индивидуальной интеграции различных источников данных в приложении.

## 7. ReactAgent - экспериментальный LLM-агент для генерации компонентов react из пользовательских историй

![o2gbb71oqobdeuh1pgnp.jpg](../../assets/images/o2gbb71oqobdeuh1pgnp.jpg)

Экспериментальный инструмент, использующий GPT-4 для превращения пользовательских историй в работающие компоненты React.

Вводим в него локальные дизайны, чтобы добиться последовательного вывода и языка дизайна.

Спасибо всем!
