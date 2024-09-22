---
title: Работа с маршрутами защищенных страниц в NextJS с помощью NextAuth
meta_title: >-
  Работа с маршрутами защищенных страниц в NextJS с помощью NextAuth | Игорь
  Горлов - Фронтeндер
description: >-
  В этой статье мы будем использовать технику промежуточного ПО.


  Для использования этого функционала у вас должны быть установлены как минимум
  `NextAuth.js 4.2.
date: 2023-12-18T00:00:00.000Z
categories:
  - Учебник
author: Игорь Горлов
type: blog
draft: false
slug: rabota-s-marshrutamy-zaschyschenn-kh-stranyts-v-nextjs-s-pomoschiu-nextauth
tags:
  - Next.js
image: >-
  ../../assets/images/rabota-s-marshrutamy-zaschyschenn-kh-stranyts-v-nextjs-s-pomoschiu-nextauth-Dec-18-2023.avif
lastmod: 2024-03-20T21:26:47.812Z
---

В этой статье мы будем использовать технику промежуточного ПО.

Для использования этого функционала у вас должны быть установлены как минимум `NextAuth.js 4.2.0` и `Next.js 12`.

## Конфигурация

Давайте настроим сервер, добавив новую переменную окружения в файл `.env.local`.

`NEXTAUTH_SECRET=addAnythingYouLike`.

## Создайте Middleware

Создайте файл с именем `middleware.js` или `.tsx` в папке `src`.

Примечание: если у вас нет папки `src, создайте файл `middleware.js` в корневой папке.

## Добавим код для промежуточного ПО

### Защита всех маршрутов

Используйте приведенный ниже код, чтобы сделать все страницы защищенными.

`export { default } from "next-auth/middleware";`.

### Защита выборочных маршрутов

Давайте защитим маршруты профиля и сообщений с помощью `matcher`. Вы можете поместить маршрут в соответствии с вашими требованиями

`export { default } from "next-auth/middleware"; export const config = { matcher: ["/profile", "/posts"] }; `.

### Защита маршрутов внутри директории

Защитим все маршруты внутри папки dashboard.

`export { default } from "next-auth/middleware"; export const config = { matcher: ["/dashboard/", "/dashboard/:path*"] }; `

Подробнее о matcher и NextAuth Middleware

Вот и все!

Счастливого кодинга!
