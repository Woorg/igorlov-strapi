---
title: Как настроить typescript в проекте
meta_title: |
  Как Настроить Typescript В Проекте - Фул Фронт Дев
description: |
  Чтобы настроить TypeScript в проекте, необходимо выполнить следующие шаги:
date: 2023-10-29T16:52:39.391Z
image: ../../assets/images/kak-nastroitь-typescript-v-proekte-Oct-29-2023.avif
categories:
  - Как закодить
author: Igor Gorlov
tags:
  - TypeScript
draft: false
type: blog
slug: kak-nastroitь-typescript-v-proekte
lastmod: 2024-03-20T21:26:45.679Z
---

Чтобы настроить TypeScript в проекте, необходимо выполнить следующие шаги:

## Установить typescript

Установить TypeScript можно с помощью npm (Node Package Manager), выполнив следующую команду в каталоге проекта:

```bash
npm install --save-dev typescript
```

Это позволит установить последнюю версию TypeScript и сохранить ее в качестве зависимости разработки в вашем проекте.

## Создайте файл tsconfig.json

В этом файле указываются параметры компилятора TypeScript для вашего проекта. Вы можете создать базовый файл tsconfig.json, выполнив следующую команду:

```bash
npx tsc --init
```

В результате в каталоге проекта будет создан файл tsconfig.json по умолчанию.

## Настройте файл tsconfig.json

В файле tsconfig.json можно указать такие параметры, как целевая версия JavaScript, система модулей, исходный каталог, выходной каталог и другие. Также можно включить или исключить из компиляции определенные файлы. Ниже приведен пример базового файла tsconfig.json:

```json
{
	"compilerOptions": {
		"target": "es5",
		"module": "commonjs",
		"sourceMap": true,
		"outDir": "./dist"
	},
	"include": ["src/**/*.ts"],
	"exclude": ["node_modules"]
}
```

В этом примере мы указываем, что хотим ориентироваться на ECMAScript 5, использовать систему модулей CommonJS, генерировать карты исходных текстов и выводить скомпилированные файлы в каталог dist. Мы также включаем все .ts-файлы в каталог src и исключаем каталог node_modules.

## `Добавьте сценарий сборки typescript в файл package.json`

Вы можете добавить сценарий сборки, запускающий компилятор TypeScript, используя команду tsc. Вот пример:

```json
{
	"scripts": {
		"build": "tsc"
	}
}
```

Это приведет к компиляции TypeScript-кода и выводу скомпилированных JavaScript-файлов в каталог, указанный в файле tsconfig.json.

Выполнив эти шаги, вы должны настроить TypeScript в своем проекте и быть готовыми приступить к написанию TypeScript-кода.
