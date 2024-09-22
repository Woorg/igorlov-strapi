---
title: >-
  Пошаговое руководство по использованию Next Auth в Next.js 13 с помощью
  обработчиков маршрутов.
meta_title: |
  Пошаговое Руководство По Использованию Next Auth В...
description: >-
  Next.js  это JavaScriptфреймворк, позволяющий разработчикам создавать
  фронтендвебприложения, запускаемые на сервере. Это фреймворк на основе React,
  который
date: 2023-11-09T15:39:33.271Z
image: >-
  ../../assets/images/poshagovoe-rukovodstvo-po-ispolьzovaniyu-auth-v-js-13-s-pomoshьyu-obrabotchikov-marshrutov-Nov-09-2023.avif
categories:
  - Как закодить
author: Igor Gorlov
tags:
  - Next.js
  - Auth
draft: false
type: blog
slug: >-
  poshagovoe-rukovodstvo-po-ispolьzovaniyu-auth-v-js-13-s-pomoshьyu-obrabotchikov-marshrutov
keywords:
  - Next Auth
lastmod: 2024-03-20T21:26:42.709Z
---

Next.js - это JavaScript-фреймворк, позволяющий разработчикам создавать фронтенд-веб-приложения, запускаемые на сервере. Это фреймворк на основе React, который прост в использовании и предоставляет ряд возможностей, таких как рендеринг на стороне сервера, разделение кода и статический экспорт.

В Next.js также есть пакет аутентификации Next Auth, который позволяет легко добавить аутентификацию в приложение Next.js. В этом руководстве мы покажем, как использовать Next Auth и Next.js 13 для создания приложения React с базовой аутентификацией на стороне сервера.

## Зачем использовать Next Auth?

Next Auth - это безопасная система аутентификации для приложений Next.js. Она основана на JSON Web Tokens (JWT) и обеспечивает аутентификацию и авторизацию для приложений Next.js.

## Что такое обработчики маршрутов?

В Next.js 13 обработчики маршрутов — это новая функция, позволяющая разработчикам создавать пользовательские обработчики запросов для заданного маршрута с помощью API Web Request и Response. Обработчики маршрутов заменяют собой предыдущие API-маршруты в Next.js.

## Как настроить Next Auth

Чтобы настроить NextAuth в приложении Next.js, необходимо выполнить несколько шагов. Во-первых, необходимо создать файл с именем
route.js в каталоге app/api/auth/[…nextauth]. Этот файл содержит обработчик динамических маршрутов для NextAuth.

Далее необходимо настроить провайдеров аутентификации. NextAuth поддерживает широкий спектр провайдеров, включая Google, Facebook, Twitter и другие. Настроить провайдеров можно, задав соответствующие переменные окружения или передав их в качестве опций в массив providers в конфигурации NextAuth.
Ниже приведен пример настройки Google в качестве провайдера аутентификации в NextAuth:

```javascript
// app/api/auth/[...nextauth]/route.js

import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const options={
    GoogleProvider({
         clientId: process.env.GOOGLE_CLIENT_ID,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      })
}

const handler=NextAuth(options)

export {handler as GET , handler as POST}

```

## Как использовать обработчики маршрутов с Next Auth

```javascript
import { options } from 'app/api/auth/[...nextauth]/route.js';
import { getServerSession } from 'next-auth/next';

async function page() {
	const session = await getServerSession(options);
	console.log(session.user);
}
```

## Заключение

У меня есть 6-минутное видео об этом, надеюсь, оно поможет, если вам понравилось видео, не забудьте подписаться и нажать кнопку ”Мне нравится”.
