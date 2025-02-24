---
title: Создание системы аутентификации без пароля
meta_title: Создание системы аутентификации без пароля - Igor Gorlov
description: >-
  Существует новый способ встраивания аутентификации в ваше внутреннее
  приложение. Этот подход устраняет необходимость в пароле, что привело к
  появлению термина беспарольная аутентификация.
date: 2023-03-21T23:11:19.000Z
author: Igor Gorlov
image: ../../assets/images/undefined-Mar-22-2023.avif
categories:
  - Как закодить
tags:
  - JavaScript
  - Typescript
draft: false
lastmod: 2024-03-20T21:26:45.574Z
---

Существует новый способ встраивания аутентификации в ваше внутреннее приложение. Этот подход устраняет необходимость в пароле, что привело к появлению термина ”беспарольная аутентификация". Системы беспарольной аутентификации становятся все более популярными, поскольку они обладают рядом преимуществ по сравнению с традиционными системами, основанными на паролях. Например, они обеспечивают более удобную работу с пользователями, снижают риск утечки данных и уменьшают затраты на управление паролями.

Система аутентификации без пароля может быть реализована различными способами, включая использование биометрической информации, одноразовых кодов или криптографии с открытым и закрытым ключом. Выбор оптимального варианта зависит от конкретных требований системы и пользователей. Каждый метод имеет свои преимущества и недостатки. В данной статье мы будем использовать одноразовый код, который будет отправлен на электронную почту пользователя.

<!-- wp:rank-math/toc-block {"title":"Оглавление","headings":[{"key":"ce0ce9dd-16ea-4243-a8f6-4ca65abc6676","content":"Сначала давайте запустим наш проект npm","level":2,"link":"#сначала-давайте-запустим-наш-проект-npm","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"0082c66c-5d98-4abb-80bf-2fc0b8b38e02","content":"Давайте создадим наше приложение и запустим наш сервер.","level":2,"link":"#давайте-создадим-наше-приложение-и-запустим-наш-сервер","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"82f89add-c30b-4373-9278-03883e048aa0","content":"Далее мы настроим нашу базу данных с Mongoose, ","level":2,"link":"#далее-мы-настроим-нашу-базу-данных-с-mongoose","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"4d08532c-c575-4fc2-822c-f91d5cfe53a6","content":"Запустите свое приложение","level":2,"link":"#запустите-свое-приложение","disable":false,"isUpdated":false,"isGeneratedLink":true}],"listStyle":"ul"} -->
<div class="wp-block-rank-math-toc-block" id="rank-math-toc"><h2>Оглавление</h2><nav><ul><li class=""><a href="#сначала-давайте-запустим-наш-проект-npm">Сначала давайте запустим наш проект npm</a></li><li class=""><a href="#давайте-создадим-наше-приложение-и-запустим-наш-сервер">Давайте создадим наше приложение и запустим наш сервер.</a></li><li class=""><a href="#далее-мы-настроим-нашу-базу-данных-с-mongoose">Далее мы настроим нашу базу данных с Mongoose, </a></li><li class=""><a href="#запустите-свое-приложение">Запустите свое приложение</a></li></ul></nav></div>
<!-- /wp:rank-math/toc-block -->

<h2 class="wp-block-heading" id="сначала-давайте-запустим-наш-проект-npm">Сначала давайте запустим наш проект npm</h2>

Выполним npm init --y, затем установим наши зависимости, для этого приложения мы будем использовать express.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">npm i express</code></pre>
<!-- /wp:code -->

<h2 class="wp-block-heading" id="давайте-создадим-наше-приложение-и-запустим-наш-сервер">Давайте создадим наше приложение и запустим наш сервер.</h2>

<!-- wp:code -->
<pre class="wp-block-code"><code lang="typescript" class="language-typescript">// index.ts
import express from 'express';

const app = express();

app.listen(3000, () =&gt; console.log(`server running on port 3000`))
</code></pre>
<!-- /wp:code -->

<h2 class="wp-block-heading" id="далее-мы-настроим-нашу-базу-данных-с-mongoose">Далее мы настроим нашу базу данных с Mongoose, </h2>

Для этого сначала нужно установить Mongoose.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">npm i mongoose</code></pre>
<!-- /wp:code -->

Нам необходимо настроить схему и модели mongoose, что мы и сделаем ниже;

<!-- wp:code -->
<pre class="wp-block-code"><code lang="typescript" class="language-typescript">// user.schema.js

import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true
  },
  fistName: String,
  lastName: String,
  otp: number;
}, {
  timestamps: true
})
</code></pre>
<!-- /wp:code -->

Выше мы объявили схему пользователей, схема пользователей определяет некоторые основные свойства, которыми должен обладать пользователь, самое главное - электронная почта, которую мы установили обязательной для всех пользователей, мы также гарантируем, что два пользователя не могут иметь одинаковые электронные адреса, обеспечивая уникальность электронных адресов. Давайте создадим модель пользователя для обработки всей логики.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">// user.model.js

import { UserSchema } from './user.schema';
import { model } from 'mongoose';

UserSchema.statics.createAccount = async function ({
  email, 
  firstName,
  lastName
}) {
  try {
    const user = await this.create({ 
      email,
      firstName,
      lastName
    })
    // Generate OTP for user
    const otp = Math.floor(Math.random() * 1000000);
    await user.updateOne({ otp });
    sendEmailSomehow(`Your otp is ${otp}`)
    return [user, null]
  } catch(error) {
    return [null, error.message]
  }
}

</code></pre>
<!-- /wp:code -->

Приведенный выше фрагмент создает для нас нового пользователя, мы генерируем otp, который будет служить в качестве одноразового кода доступа, который мы будем использовать для верификации пользователя, мы используем службу электронной почты для отправки пользователю письма, я предполагаю, что у вас есть сторонняя служба, которая будет заниматься доставкой электронной почты.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">
UserSchema.statics.login = async function (email) {
  try {
    const user = await this.findOne({ email });
    const otp = Math.floor(Math.random() * 1000000);
    await user.updateOne({ otp });
    sendEmailSomehow(`Your otp is ${otp}`);
    return [user, null]
  } catch (error) {
     return [null, error.message]
  }
}

</code></pre>
<!-- /wp:code -->

Этот фрагмент выше обрабатывает процесс входа в систему, мы проверяем, есть ли пользователь с электронной почтой, которая совпадает с указанной, если такой пользователь есть, мы создаем для него otp и отправляем его на его электронную почту. Давайте напишем функцию, которая будет проверять их otp.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">
UserSchema.statics.verifyOTP = async function (otp, email) {
  try {
    const user = await this.findOne({ email, otp });
    return [user, null];
  } catch (error) {
    return [null, error.message]
  }
}

export const Users = await model('user', UserSchema);
</code></pre>
<!-- /wp:code -->

Теперь у нас есть базовая настройка, нам нужно импортировать модель Users в наши контроллеры, которые мы создадим ниже.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">// user.controller.js

import { Users } from 'user.model';

export const createAccount = async (req, res) =&gt; {
  const { firstName, lastName, email } = req.body;
  const [user, err] = await Users.createAccount({
    firstName,
    lastName,
    email,
  });
  if (err) res.status(400).json({ error: err })
  res.status(201).json({ user })
}

</code></pre>
<!-- /wp:code -->

У нас есть первый контроллер, который обрабатывает регистрацию пользователей, ниже мы настроим другие контроллеры для входа в систему и проверки нашего пользовательского токена.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">
export const login = async (req, res) =&gt; {
  const { email } = req.body;
  const [user, err] = await Users.login(email);
  if (err) res.status(400).json({ error: err });
  res.status(201).json({ user });
}

export const verifyOTP = async (req, res) =&gt; {
  const { otp } = req.body;
  const [user, err] = await Users.verifyOTP(otp);
  if (err) res.status(400).json({ error: err });
  res.status(201).json({ user });
}
</code></pre>
<!-- /wp:code -->

Мы создали и экспортировали наши функции контроллера, теперь нам нужно сопоставить каждую функцию контроллера с маршрутом, это будет сделано внутри файла маршрута.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">// router.js
import { createAccount, login, verifyOTP } from './user.controller';
import { Router } from 'express';

export const router = Router();

router.post('/register', createAccount);
router.post('/login', login);
router.post('/otp', verifyOTP);

</code></pre>
<!-- /wp:code -->

Наше приложение уже готово, теперь нам нужно импортировать наш маршрутизатор и применить его к нашему приложению.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">// index.js continued
import { router } from 'router';

app.use(router);

</code></pre>
<!-- /wp:code -->

<h2 class="wp-block-heading" id="запустите-свое-приложение">Запустите свое приложение</h2>

И у вас есть базовая настройка для системы аутентификации без пароля, хотите посмотреть, как мы можем сделать это, но с TypeORM и MySQL в качестве нашей базы данных и fastify в качестве нашего фреймворка.

Увидимся в следующей статье
