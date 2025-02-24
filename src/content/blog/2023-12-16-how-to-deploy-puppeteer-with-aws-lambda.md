---
title: Как развернуть Puppeteer с помощью AWS Lambda
meta_title: Как развернуть Puppeteer с помощью AWS Lambda | Игорь Горлов - Фронтeндер
description: |-
  Прежде чем мы погрузимся в детали, убедитесь, что у вас есть все необходимое:

  Аккаунт AWS с доступом к AWS Lambda и другим необходимым сервисам.
date: 2023-12-16T00:00:00.000Z
image: >-
  ../../assets/images/kak-razvernut-puppeteer-s-pomoschiu-aws-lambda-Dec-16-2023.avif
categories:
  - how-to-3
author: Игорь Горлов
draft: false
slug: kak-razvernut-puppeteer-s-pomoschiu-aws-lambda
tags:
  - Node.js
  - Puppeteer
  - AWS Lambda
lastmod: 2024-03-20T21:26:45.962Z
---

Прежде чем мы погрузимся в детали, убедитесь, что у вас есть все необходимое:

Аккаунт AWS с доступом к AWS Lambda и другим необходимым сервисам. Проект Node.js, в котором вы можете развернуть свою функцию Lambda. Знакомство с Puppeteer и основными концепциями AWS Lambda.

## Настройка окружения

Первым шагом будет настройка среды разработки. В ваш проект Node.js необходимо установить \*\*chrome-aws-lambda \*\*пакет. Этот пакет содержит безголовый бинарник Chromium, оптимизированный для сред AWS Lambda.

```bash
npm install chrome-aws-lambda
```

После установки пакета вы можете создать функцию Lambda для запуска кода Puppeteer.

## Создание функции AWS Lambda

В этом примере мы создадим Lambda-функцию, которая будет переходить на веб-страницу и возвращать ее заголовок. Вот пример Lambda-функции:

```js
const puppeteer = require('chrome-aws-lambda');
exports.handler = async (event, context) => {
	let result = null;
	let browser = null;
	try {
		browser = await puppeteer.launch({
			args: puppeteer.args,
			defaultViewport: puppeteer.defaultViewport,
			executablePath: await puppeteer.executablePath,
			headless: puppeteer.headless,
			ignoreHTTPSErrors: true,
		});
		const page = await browser.newPage();
		await page.goto(event.url || 'https://example.com');
		result = await page.title();
	} catch (error) {
		console.error(error);
	} finally {
		if (browser !== null) {
			await browser.close();
		}
	}
	return result;
};
```

Давайте разберем ключевые части этой лямбда-функции:

Мы импортируем пакет chrome-aws-lambda, который предоставляет оптимизированный бинарник Chromium для AWS Lambda.  
Внутри обработчика Lambda мы запускаем браузер Puppeteer с помощью метода chromium.puppeteer.launch. Мы передаем различные параметры, такие как аргументы командной строки и путь к бинарному файлу Chromium.

- 1 - Мы создаем новую страницу, переходим по URL (можно указать URL в качестве параметра события) и получаем заголовок страницы.
- 2- Если в процессе возникают какие-либо ошибки, мы записываем их в консоль.
- 3- Наконец, мы возвращаем результат, который в данном примере является заголовком страницы.

## Развертывание функции Lambda

Для развертывания функции Lambda можно использовать консоль управления AWS Management Console, AWS CLI или инструмент вроде Serverless Framework. Здесь мы будем использовать AWS CLI в качестве примера:
Убедитесь, что у вас настроен AWS CLI с необходимыми разрешениями.  
Создайте пакет развертывания, упаковав в него код Node.js и его зависимости. В каталоге проекта выполните следующую команду:

```bash
zip -r function.zip node_modules/ your-function.js
```

- 1-Замените файл your-function.js на имя вашего файла функции Lambda.

Создайте функцию Lambda с помощью AWS CLI. Замените на соответствующий ARN роли IAM, который дает Lambda разрешения на доступ к другим ресурсам AWS.

```bash
aws lambda create-function --function-name YourFunctionName \ --zip-file fileb://function.zip \ --handler your-function.handler \ --runtime nodejs14.x \ --role <ROLE_ARN>
```

- 2 Вызовите свою функцию Lambda с помощью AWS CLI или любым другим способом, который вам больше нравится:

```bash
aws lambda invoke --function-name YourFunctionName output.txt
```

Замените YourFunctionName на имя вашей лямбда-функции. Вы должны увидеть название веб-страницы в файле output.txt.

## Заключение

Запуск Puppeteer в функции AWS Lambda может стать мощным способом автоматизации задач браузера в бессерверной инфраструктуре. С помощью chrome-aws-lambda вы можете использовать оптимизированный бинарник Chromium, что сокращает время холодного старта и повышает общую производительность ваших функций Lambda. Это может быть полезно для различных сценариев использования, включая веб-скраппинг, автоматизированное тестирование и генерацию PDF-файлов из веб-страниц. Не забывайте, что AWS Lambda имеет некоторые ограничения, такие как лимиты времени выполнения и памяти, поэтому важно разрабатывать свои функции соответствующим образом.
