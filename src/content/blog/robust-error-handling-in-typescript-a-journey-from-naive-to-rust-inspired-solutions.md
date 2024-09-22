---
title: >-
  Надежная обработка ошибок в TypeScript: Путешествие от нативных решений к
  решениям, вдохновленным Rust
meta_title: >-
  Надежная обработка ошибок в TypeScript: Путешествие от нативных решений к
  решениям, вдохновленным Rust | Игорь Горлов - Фронтeндер
description: >-
  В динамичном мире разработки программного обеспечения надежная обработка
  ошибок  не просто лучшая практика, она необходима для надежного программного
  обеспече
date: 2024-02-09T00:00:00.000Z
categories:
  - Учебник
author: Игорь Горлов
type: blog
draft: false
slug: >-
  nadezhnaia-obrabotka-oshybok-v-typescript-puteshestvye-ot-natyvn-kh-reshenyi-k-reshenyiam-vdokhnovlenn-m-rust
translatedPosition: 28
tags:
  - TypeScript
image: >-
  ../../assets/images/nadezhnaia-obrabotka-oshybok-v-typescript-puteshestvye-ot-natyvn-kh-reshenyi-k-reshenyiam-vdokhnovlenn-m-rust-Feb-09-2024.avif
lastmod: 2024-03-20T21:26:47.236Z
---

В динамичном мире разработки программного обеспечения надежная обработка ошибок - не просто лучшая практика, она необходима для надежного программного обеспечения. Хорошо написанный код может столкнуться с неожиданными проблемами, особенно в процессе производства. Как разработчики, мы должны подготовить наши приложения к изящной обработке этих неопределенностей. В этом посте рассматривается улучшение обработки ошибок в TypeScript, вдохновленное паттерном Result языка Rust - переход к более устойчивому и явному управлению ошибками.

Опасности, связанные с игнорированием обработки ошибок

## Рассмотрим эту функцию деления на TypeScript:

`const divide = (a: number, b: number) => a / b;`

Эта функция кажется простой, но при нулевом значении `b` она не работает, возвращая `бесконечность`. Такие упущенные случаи могут привести к нелогичным результатам:

```ts
const calculateAverageSpeed = (distance: number, time: number) => {
	const averageSpeed = divide(distance, time);
	return `${averageSpeed} km/h`;
};

// will be "Infinity km/h"
console.log('Average Speed: ', calculateAverageSpeed(50, 0));
```

### Принятие явной обработки ошибок

TypeScript предлагает различные методы управления ошибками. Принятие более явного подхода, вдохновленного Rust, может повысить безопасность и предсказуемость кода.

### Паттерн типа ”Результат": Подход на основе Rust в TypeScript

Rust известен своей явной обработкой ошибок с помощью типа `Result`. Давайте повторим это в TypeScript:

```ts
type Success<T> = { kind: 'success'; value: T };
type Failure<E> = { kind: 'failure'; error: E };
type Result<T, E> = Success<T> | Failure<E>;

function divide(a: number, b: number): Result<number, string> {
	if (b === 0) {
		return { kind: 'failure', error: 'Cannot divide by zero' };
	}
	return { kind: 'success', value: a / b };
}
```

Обработка результата в TypeScript

```ts
const handleDivision = (result: Result<number, string>) => {
	if (result.kind === 'success') {
		console.log('Division result:', result.value);
	} else {
		console.error('Division error:', result.error);
	}
};

const result = divide(10, 0);
handleDivision(result); // "Division error: Cannot divide by zero"
```

## Родная реализация Rust для сравнения

В Rust тип `Result` представляет собой перечисление с вариантами для успеха и ошибки:

```rust
fn divide(a: i32, b: i32) -> std::result::Result<i32, String> {
    if b == 0 {
        std::result::Result::Err("Cannot divide by zero".to_string())
    } else {
        std::result::Result::Ok(a / b)
    }
}

fn main() {
    match divide(10, 2) {
        std::result::Result::Ok(result) => println!("Division result: {}", result),
        std::result::Result::Err(error) => println!("Error: {}", error),
    }
}
```

### Почему именно Rust Way?

Явная обработка: Требует обработки обоих исходов, повышая устойчивость кода.

- Ясность: Замысел кода становится более очевидным.
- Безопасность: Снижает вероятность возникновения не пойманных исключений.
- Функциональный подход: Соответствует функциональному стилю программирования TypeScript.

## Использование ts-results для обработки ошибок в стиле Rust

Для разработчиков TypeScript библиотека ts-results - это отличный инструмент для применения шаблона обработки ошибок Rust, упрощающий реализацию типа `Result’ в TypeScript.

## Заключение

Использование паттерна `Result” из Rust в TypeScript с помощью таких инструментов, как ts-results, значительно улучшает стратегии обработки ошибок. Такой подход позволяет эффективно бороться с ошибками, сохраняя целостность и удобство приложений, превращая их из функциональных в отказоустойчивые.

Давайте примем эти надежные методы, чтобы создать программное обеспечение, которое выдержит испытания временем и неопределенностью.
