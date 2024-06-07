---
title: 'Обработка ошибок и ведение журнала в NestJS: лучшие практики'
meta_title: >-
  Обработка ошибок и ведение журнала в NestJS: лучшие практики | Игорь Горлов -
  Fullstack Developer
description: >-
  При создании приложений на NestJS обработка ошибок и создание надежных логов
  являются важнейшими аспектами обеспечения надежности и ремонтопригодности
  приложен
date: 2024-02-09T00:00:00.000Z
categories:
  - nestjs
  - uchebniki
author: Игорь Горлов
type: blog
draft: false
slug: obrabotka-oshybok-y-vedenye-zhurnala-v-nestjs-luchshye-praktyky
translatedPosition: 32
tags:
  - NestJS
  - TypeScript
image: >-
  ../../assets/images/obrabotka-oshybok-y-vedenye-zhurnala-v-nestjs-luchshye-praktyky-Feb-09-2024.avif
lastmod: 2024-03-20T21:26:47.674Z
---

![Nestjs](../../assets/images/ylxwslut8avgv8ehp5ih.jpg)

При создании приложений на NestJS обработка ошибок и создание надежных логов являются важнейшими аспектами обеспечения надежности и ремонтопригодности приложения. В этом подробном руководстве мы рассмотрим лучшие практики обработки ошибок и ведения логов в NestJS, специально предназначенные для новичков. Итак, пристегните ремни и давайте отправимся в путешествие, чтобы освоить обработку ошибок и ведение логов в NestJS!

## Понимание обработки ошибок в NestJS

Обработка ошибок - это процесс изящной обработки и управления непредвиденными ситуациями, которые могут возникнуть во время выполнения вашего приложения. NestJS предлагает структурированный подход к эффективной обработке ошибок. Основным механизмом для этого является использование фильтров исключений. Фильтры исключений позволяют перехватывать брошенные исключения и предпринимать соответствующие действия, например, возвращать клиентам содержательные ответы на ошибки.

Давайте рассмотрим, как реализовать фильтр исключений:

```ts
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();
		const status = exception.getStatus();

		response.status(status).json({
			statusCode: status,
			timestamp: new Date().toISOString(),
			path: request.url,
			message: exception.message,
		});
	}
}
```

В этом примере мы создали фильтр HttpExceptionFilter, который перехватывает все HttpException, которые могут возникнуть в нашем приложении. Затем он извлекает соответствующую информацию из исключения и отправляет клиенту структурированный ответ в формате JSON, включая код состояния, временную метку, путь запроса и сообщение об ошибке.

Чтобы применить этот фильтр глобально к вашему приложению, вы можете использовать метод `app.useGlobalFilters()` в вашем файле `main.ts`:

```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './http-exception.filter';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalFilters(new HttpExceptionFilter());
	await app.listen(3000);
}

bootstrap();
```

При такой настройке все `HttpExceptions` будут отлавливаться нашим `HttpExceptionFilter`, обеспечивая согласованные ответы на ошибки во всем приложении.

## Обработка пользовательских исключений

Хотя NestJS предоставляет несколько встроенных исключений, вы часто будете сталкиваться со сценариями, в которых необходимо определить свои собственные исключения. Создание пользовательских исключений очень просто и позволяет предоставить клиенту конкретную информацию об ошибке.

Допустим, мы хотим создать пользовательское исключение `NotFoundException`:

```ts
export class NotFoundException extends HttpException {
	constructor(message: string) {
		super(message, HttpStatus.NOT_FOUND);
	}
}
```

Затем мы можем использовать это пользовательское исключение в службах или контроллерах нашего приложения:

```ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './interfaces/task.interface';

@Injectable()
export class TaskService {
	private tasks: Task[] = [];

	getTaskById(id: string): Task {
		const task = this.tasks.find((task) => task.id === id);
		if (!task) {
			throw new NotFoundException(`Task with ID ${id} not found.`);
		}
		return task;
	}
}
```

В этом примере, если запрошенная задача с определенным идентификатором не найдена, мы бросаем NotFoundException, который будет пойман нашим глобальным фильтром HttpExceptionFilter. Это позволяет нам отправить клиенту удобный ответ без утечки конфиденциальных деталей реализации.

## Ведение журнала в NestJS

Эффективное протоколирование необходимо для мониторинга поведения вашего приложения и диагностики потенциальных проблем. NestJS предоставляет мощный механизм протоколирования из коробки, позволяя вам выбирать из различных уровней протоколирования, форматеров и транспортов.

По умолчанию NestJS использует класс Logger для обработки журналов приложения. Чтобы использовать стандартный `logger` в своих сервисах или контроллерах, вы можете инжектировать его с помощью декоратора `@Logger()`:

```ts
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class TaskService {
  private logger = new Logger(TaskService.name);

  // ...  someMethod() {
  this.logger.log('This is a log message.');
  this.logger.debug('Debugging some process...');
  this.logger.warn('Warning: Something seems off!');
  this.logger.error('Oops! An error occurred.');
}
```

Класс Logger предоставляет методы для различных уровней ведения журнала, таких как log, debug, warn и error. Каждый уровень журнала соответствует определенной степени серьезности, и вы можете настроить поведение журнала в вашем приложении NestJS.

## Настройка поведения журнала

Если вам нужно больше контроля над поведением журнала в вашем приложении, NestJS позволяет создавать пользовательские регистраторы, реализуя интерфейс LoggerService.

Давайте создадим забавный пользовательский логгер, который записывает логи в файл, а также включает в себя эмодзи!

```ts
import { LoggerService } from '@nestjs/common';

export class EmojiLogger implements LoggerService {
	log(message: string) {
		this.writeToFile('📢 ' + message);
	}

	error(message: string, trace: string) {
		this.writeToFile('❌ ' + message);
		this.writeToFile('🔍 Stack Trace: ' + trace);
	}

	warn(message: string) {
		this.writeToFile('⚠️ ' + message);
	}

	debug(message: string) {
		this.writeToFile('🐞 ' + message);
	}

	private writeToFile(message: string) {
		// Implement the logic to write logs to a file here.
		console.log(message); // For demonstration purposes, we'll just log to the console.
	}
}
```

Теперь, чтобы использовать наш EmojiLogger, давайте обновим файл `main.ts`:

```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EmojiLogger } from './emoji-logger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, { logger: new EmojiLogger() });
	await app.listen(3000);
}

bootstrap();
```

При такой настройке наше приложение будет использовать забавный EmojiLogger для записи сообщений. Не стесняйтесь настраивать метод writeToFile для записи логов в файл или любое другое удобное место.

## Заключение

В этой статье мы рассмотрели лучшие практики обработки ошибок и протоколирования в NestJS. Мы узнали, как использовать фильтры исключений для изящной обработки ошибок и отправки структурированных ответов на ошибки клиентам. Кроме того, мы увидели, как создавать пользовательские исключения для более конкретной отчетности об ошибках. Кроме того, мы погрузились в мир логирования и узнали, как использовать стандартный класс Logger и создавать собственные логи, например EmojiLogger.

Освоив обработку ошибок и ведение логов в NestJS, вы уже на пути к созданию надежных и прочных приложений. Так что продолжайте экспериментировать, будьте любознательны и счастливы в кодинге! 🚀🌟
