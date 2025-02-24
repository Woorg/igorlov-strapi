---
title: Как легко перенести базу данных Heroku Postgres между приложениями.
meta_title: >-
  Как легко перенести базу данных Heroku Postgres между приложениями. | Игорь
  Горлов - Фронтeндер
description: >-
  Существует два способа копирования данных между базами данных: восстановление
  резервной копии или команда копирования.


  Мы будем выполнять миграцию базы данных
date: 2023-12-16T00:00:00.000Z
categories:
  - Как закодить
author: Игорь Горлов
draft: false
slug: kak-lehko-perenesty-bazu-dann-kh-heroku-postgres-mezhdu-prylozhenyiamy
tags:
  - Heroku
  - Postgres
image: >-
  ../../assets/images/kak-lehko-perenesty-bazu-dann-kh-heroku-postgres-mezhdu-prylozhenyiamy-Dec-16-2023.avif
lastmod: 2024-03-20T21:26:43.144Z
---

Существует два способа копирования данных между базами данных: восстановление резервной копии или команда копирования.

Мы будем выполнять миграцию базы данных из приложения `myapp-prod` в приложение `myapp-test`, копируя схему (структуру) и данные из источника в цель.

## Восстановление резервной копии

Копирует указанную резервную версию базы данных.

`heroku pg:backups:capture --app myapp-prod`

Создает резервную копию в приложении `myapp-prod`. В этом случае консоль Heroku сообщит вам идентификатор резервной копии версии b001.

`heroku pg:backups:restore myapp-prod::b001 DATABASE_URL --app myapp-test`

Вторая команда: Скопируйте из резервной копии приложения `myapp-prod` id b001 (последняя резервная копия) в стандартный DATABASE_URL приложения `myapp-test`.

## Прямое копирование

Копирует последнее состояние базы данных.

`heroku pg:copy myapp-prod::DATABASE_URL DATABASE_URL --app myapp-test`.

Копирует из приложения `myapp-prod` последнюю базу данных по умолчанию DATABASE_URL в приложение `myapp-test` базу данных по умолчанию DATABASE_URL.

Здесь `DATABASE_URL` - это имя базы данных по умолчанию в ваших приложениях Heroku.

Спасибо :)

Ссылка
<https://devcenter.heroku.com/articles/heroku-postgres-backups#restore-a-backup>
