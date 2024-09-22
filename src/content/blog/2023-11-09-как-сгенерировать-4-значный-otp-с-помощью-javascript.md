---
title: Как сгенерировать 4-значный otp с помощью javascript
meta_title: |
  Как сгенерировать 4-значный otp с помощью javascript -...
description: |-
  Вы хотите сгенерировать OTPкоды для аутентификации в своем приложении?
  Выполните следующие несколько шагов, и вы сможете это сделать.

  ## ШАГ 1

  Сгенерируйте
date: 2023-11-09T15:09:27.971Z
image: >-
  ../../assets/images/kak-sgenerirovatь-4-znachnyj-otp-s-pomoshьyu-javascript-Nov-09-2023.avif
categories:
  - Как закодить
author: Igor Gorlov
tags:
  - JavaScript
draft: false
type: blog
slug: kak-sgenerirovatь-4-znachnyj-otp-s-pomoshьyu-javascript
lastmod: 2024-03-20T21:26:43.674Z
---

Вы хотите сгенерировать OTP-коды для аутентификации в своем приложении?
Выполните следующие несколько шагов, и вы сможете это сделать.

## ШАГ 1

Сгенерируйте случайное число в диапазоне от 0 до 9000

```javascript
const randomNum = Math.random() * 9000;
console.log(randomNum);

// will log random numbers like (1758.36816277815,8591.126356595876,380.85504639047053)
```

## ШАГ 2

Отформатируйте случайное число, чтобы исключить десятичные знаки

```javascript
const randomNum = Math.random() * 9000;
const formattedRandomNum = Math.floor(randomNum);
console.log(formattedRandomNum);

// will log random numbers like (1758,8591,380)
```

## ШАГ 3

Добавьте 1000 к сгенерированному значению, чтобы длина всегда была равна 4.

Примечание: Math.random() генерирует случайные числа в диапазоне от 0 до 8999, поэтому при добавлении 1000 к этому случайному числу максимальное значение может быть только 9999, поэтому максимальная длина, равная 4, всегда будет обеспечена и сохранена.

```javascript
const randomNum = Math.random() * 9000;
const token = Math.floor(1000 + randomNum);
console.log(token);

// will log random numbers like (2758,9591,1380)
```

## ШАГ 4

Рефакторинг в функцию, которую можно вызывать каждый раз, когда требуется сгенерировать токен.

```javascript
function generateToken() {
	const randomNum = Math.random() * 9000;
	return Math.floor(1000 + randomNum);
}

// will log random numbers like (2758,9591,1380)
```

## ШАГ 5

Вызовите функцию, и ваш токен будет сгенерирован, после чего можно приступать к хэшированию кода/использованию его по назначению.

```javascript
function generateToken() {
	const randomNum = Math.random() * 9000;
	return Math.floor(1000 + randomNum);
}

generateToken();
// will return random numbers like (2758,9591,1380)
```
