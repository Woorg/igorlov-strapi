---
title: Payload CMS - Аутентификация в Nuxt с использованием собственного плагина
meta_title: Payload CMS - Аутентификация В Nuxt С Использованием...
description: Это сопутствующая публикация в блоге для поддержки видео по способу интеграции функций входа, выхода и создания учетной записи Payload CMS в приложении Nuxt JS.
date: 2023-10-18T22:20:07.605Z
image: ../../assets/images/payload-cms-autentifikaciya-v-nuxt-s-ispolьzovaniem-sobstvennogo-plagina-Oct-19-2023.avif
categories:
  - Как закодить
author: Igor Gorlov
tags:
  - Nuxt
  - Payloadcms
draft: false
keywords:
  - Payload CMS
type: blog
slug: payload-cms-autentifikaciya-v-nuxt-s-ispolьzovaniem-sobstvennogo-plagina
lastmod: 2024-03-21T19:50:47.563Z
---

## Обзор

Это сопутствующая публикация в блоге для поддержки видео по способу интеграции функций входа,
выхода и создания учетной записи Payload CMS в приложении Nuxt JS.

Payload CMS – Лучший способ создания современного бэкенда и административного интерфейса. Никакой
черной магии, только TypeScript и полностью с открытым исходным кодом, Payload - это и фреймворк
приложений, и безголовый CMS.

Это включает код для необходимых страниц, собственный плагин для взаимодействия с Payload CMS для
получения информации о текущем пользователе и управления информацией о пользователе, а также
промежуточное программное обеспечение для управления доступом к страницам приложения.

## Видео

https://www.youtube.com/watch?v=pTEmKsAkngg

## Установка и Настройка

### Создайте новое приложение Nuxt

```javascript
npx nuxi@latest init <project-name>
cd /<project-name>
npm install
```

## Добавить документацию модуля Nuxt/UI

### Установите модуль

```javascript
npm install @nuxt/ui
```

### Измените конфигурацию Nuxt

```javascript
export default defineNuxtConfig({
	modules: ['@nuxt/ui'],
});
```

## Код

Я включил основные файлы, которые должны быть изменены, чтобы запустить приложение после удаления
файла App.vue.

### Плагин

Основное событие здесь — это [пользовательский плагин Nuxt](https://nuxt.com/docs/guide/directory-structure/plugins)
. Я создал пользовательский плагин в Nuxt и настроил его так, чтобы он запускался первым, начиная
его имя с 01.

Плагин проверяет наличие пользователя, используя конечную точку Payload CMS customers/me для
проверки наличия пользователя; если пользователь существует, он будет возвращен, в противном
случае возвращается null.

Затем плагин сохраняет информацию о пользователе и информацию об аутентификации в переменных
состояния с использованием функции Nuxt useState.

Также к плагину добавлены две дополнительные функции:

- updateUser устанавливает информацию о текущем пользователе после успешного входа в систему
- clearUser очищает информацию о пользователе и информацию об аутентификации после выхода пользователя из системы

  Как я упомянул в видео, рефакторинг плагина для включения функций signIn и signOut сделает эти две
  функции ненужными.

Плагин

```javascript
// nuxt-app/plugins/01.payload-auth.ts
import { Customer } from "~/payload-types";

export interface CurrentUserAuthInfo {
  token: string;
  exp: number;
}

export interface CurrentPayloadUserInfo extends CurrentUserAuthInfo {
  user: Customer;
}

export default defineNuxtPlugin(async () => {
  const currentUser = useState<Customer | null>("currentUser", () => null);
  const userAuthInfo = useState<null | CurrentUserAuthInfo>("authInfo", () => {
    return {
      token: "",
      exp: 0,
    };
  });

  async function getUser() {
    if (currentUser.value) {
      return currentUser.value;
    }
    try {
      const resp = await fetch("http://localhost:3100/api/customers/me", {
        method: "GET",
        credentials: "include",
        headers: {
          ...useRequestHeaders(),
        },
      });

      if (!resp.ok) {
        const errorMsg = (await resp.json())?.errors[0].message;
        throw new Error(errorMsg);
      }
      const userInfo = (await resp.json()) as CurrentPayloadUserInfo;
      console.log(userInfo);
      userAuthInfo.value = {
        token: userInfo.token,
        exp: userInfo.exp,
      };
      currentUser.value = userInfo?.user;
      return userInfo?.user;
    } catch (error: any) {
      console.log("getUser - error", error);
      currentUser.value = null;
      return currentUser.value;
    }
  }

  await getUser();
  console.log("In Payload plugin", currentUser);

  return {
    provide: {
      payloadAuth: {
        currentUser,
        userAuthInfo,
        /**
         * called to make sure we have the current user
         * information set in the composable.
         */
        updateUser: async () => {
          await getUser();
        },
        /**
         * clear user information from the composable
         */
        clearUser: () => {
          currentUser.value = null;
          userAuthInfo.value = null;
        },
      },
    },
  };
});


```

## Промежуточное программное обеспечение

Промежуточное программное обеспечение auth.ts выполняет единственную задачу, а именно
перенаправление пользователя на страницу входа.

Это достигается путем доступа к плагину с использованием хука useNuxtApp для получения доступа к
ранее обсуждаемому плагину $payloadAuth.

```javascript
// nuxt-app/middleware/auth.ts

import { defineNuxtRouteMiddleware } from '#app';

export default defineNuxtRouteMiddleware(async (to, from) => {
	const { $payloadAuth } = useNuxtApp();
	const user = $payloadAuth.currentUser?.value;
	console.log('middleware user', user);
	if (!user) {
		// Redirect to login page
		return navigateTo('/login');
	}
});
```

## Страница входа

Страница входа использует NuxtUI, чтобы сделать ее более привлекательной с точки зрения дизайна,
но также имеет функциональность проверки, предоставленную NuxtUI, которую мы используем, чтобы
убедиться, что нам предоставлены значения электронной почты и пароля для использования в вызове
API Payload CMS.

Важно отметить, как мы получаем доступ к плагину после успешного входа в систему, чтобы обновить
информацию о пользователе в плагине с информацией о текущем аутентифицированном пользователе с
помощью вызова $payloadAuth.updateUser().

```javascript
<template>
  <UContainer class="mt-6">
    <UCard class="m-4">
      <template #header>
        <h3>Login</h3>
      </template>

      <UForm
        ref="loginInputForm"
        :validate="validate"
        :state="loginInput"
        @submit.prevent="submit"
      >
        <UFormGroup label="Email" name="email">
          <UInput v-model="loginInput.email" />
        </UFormGroup>
        <UFormGroup label="Password" name="password">
          <UInput v-model="loginInput.password" type="password" />
        </UFormGroup>
        <UButton type="submit" class="mt-8"> Submit </UButton>
      </UForm>

      <template #footer />
    </UCard>
  </UContainer>
</template>
<script setup lang="ts">
import { FormError } from "@nuxt/ui/dist/runtime/types/form";
import { ref } from "vue";

const {$payloadAuth} = useNuxtApp();

type LoginInput = {
  email: string;
  password: string;
};
const loginInputForm = ref();
const loginInput = ref<LoginInput>({
  email: "",
  password: "",
});

/**
 * validate form information
 *
 * @param state
 */
const validate = (state: LoginInput): FormError[] => {
  const errors = [];
  if (!state.email) errors.push({ path: "email", message: "Required" });
  if (!state.password) errors.push({ path: "password", message: "Required" });

  return errors;
};

/**
 *
 */
async function submit() {
  try {
    const resp = await fetch("http://localhost:3100/api/customers/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...useRequestHeaders()
      },
      body: JSON.stringify({
        email: loginInput.value.email,
        password: loginInput.value.password,
      }),
    });

    if (!resp.ok) {
      const errorMsg = (await resp.json())?.errors[0].message;
      throw new Error(errorMsg);
    }
    const user = await resp.json();
    console.log(user);

    // set user globally
    await $payloadAuth.updateUser()

    // goto home
    await navigateTo("/");
  } catch (error: any) {
    alert("Sign In Error " + error.message);
  }
}
</script>


```

## The Index/Home страница

На главной странице отображается информация о текущем пользователе. Мы получаем эту информацию из
плагина $payloadAuth, который мы создали.

У нас есть функция logOut, которая вызывает API Payload CMS, и после завершения выхода мы снова
используем плагин, чтобы очистить информацию о пользователе с помощью $payloadAuth.clearUser().

```javascript
<template>
  <UContainer class="mt-6">
    HELLO
    {{ $payloadAuth.currentUser }}
    <UButton @click="handleLogout">SIGN OUT</UButton>
  </UContainer>
</template>
<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
  alias: ["/", "/index"],
});
const {$payloadAuth} = useNuxtApp();

/**
 *
 */
async function handleLogout() {

  try {
    const resp = await fetch("http://localhost:3100/api/customers/logout", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!resp.ok) {
      const errorMsg = (await resp.json())?.errors[0].message;
      throw new Error(errorMsg);
    }

    // clear user
    $payloadAuth.clearUser()

    // redirect
    navigateTo("/login")

  } catch (error: any) {
    alert("Sign Out Error " + error.message);
  }
}
</script>
```
