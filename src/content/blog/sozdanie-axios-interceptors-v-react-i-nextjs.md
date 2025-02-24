---
title: Создание Axios interceptors в React и NextJs
meta_title: Создание Axios interceptors в React и NextJs - Igor Gorlov
description: >-
  Здравствуйте и добро пожаловать в эту статью о создании перехватчика Axios в
  React и Next.js. В этой статье мы рассмотрим, как настроить и использовать
  Axios, а также как создать перехватчик, который может автоматически обновлять
  токены.
date: 2023-03-19T23:51:51.000Z
author: Igor Gorlov
image: ../../assets/images/undefined-Mar-20-2023.avif
categories:
  - Как закодить
tags:
  - Axios
  - Next.js
  - React
draft: false
lastmod: 2024-03-20T21:26:47.259Z
---

Здравствуйте и добро пожаловать в эту статью о создании перехватчика Axios в React и Next.js. В этой статье мы рассмотрим, как настроить и использовать Axios, а также как создать перехватчик, который может автоматически обновлять токены.

<!-- wp:rank-math/toc-block {"title":"Оглавление","headings":[{"key":"bab2cba0-b090-4f29-9add-7b653dc9b073","content":"Шаг 1: Инициализация проекта","level":2,"link":"#шаг-1-инициализация-проекта","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"ae147fd7-ac3b-4824-a02d-653a2da32748","content":"Шаг 2: Создание файла конфигурации Axios","level":2,"link":"#шаг-2-создание-файла-конфигурации-axios","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"3d288d13-b8ce-42ff-a152-24aad150b99c","content":"Шаг 3: Использование файла конфигурации Axios","level":2,"link":"#шаг-3-использование-файла-конфигурации-axios","disable":false,"isUpdated":false,"isGeneratedLink":true}],"listStyle":"ul"} -->
<div class="wp-block-rank-math-toc-block" id="rank-math-toc"><h2>Оглавление</h2><nav><ul><li class=""><a href="#шаг-1-инициализация-проекта">Шаг 1: Инициализация проекта</a></li><li class=""><a href="#шаг-2-создание-файла-конфигурации-axios">Шаг 2: Создание файла конфигурации Axios</a></li><li class=""><a href="#шаг-3-использование-файла-конфигурации-axios">Шаг 3: Использование файла конфигурации Axios</a></li></ul></nav></div>
<!-- /wp:rank-math/toc-block -->

<h2 class="wp-block-heading" id="шаг-1-инициализация-проекта">Шаг 1: Инициализация проекта</h2>

<br>Сначала нам нужно инициализировать проект с помощью следующей команды: yarn create react-app &lt;имя приложения&gt; или npx create-react-app &lt;имя приложения&gt;. Эта команда создаст новое приложение React с выбранным вами именем.

<h2 class="wp-block-heading" id="шаг-2-создание-файла-конфигурации-axios">Шаг 2: Создание файла конфигурации Axios</h2>

<br>Теперь, когда у нас есть новое приложение React, мы можем создать службу каталогов и создать внутри нее файл с именем axiosConfig.ts. Вот код, который нужно поместить в этот файл:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">import axios from 'axios';
import { getToken, setToken } from '../../../utils/localStorage';
import { redirect } from "react-router-dom";
import { getRefreshToken } from '../login';

const statusCode = [401,402,403]
const HttpAuthInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        "Authorization": "Bearer" + " " + getToken("token").accessToken
    }
})

HttpAuthInstance.interceptors.response.use((response) =&gt; {
    return response;
}, (error) =&gt; {
    if (statusCode.indexOf(error?.response?.status) !== -1) {
        getRefreshToken(getToken("token")?.refreshToken).then(res=&gt;setToken("token",res?.data))
    }
})

export default HttpAuthInstance;
</code></pre>
<!-- /wp:code -->

Этот код устанавливает экземпляр Axios, который включает базовый URL и заголовки с маркером авторизации. Он также устанавливает перехватчик, который проверяет наличие определенных кодов состояния ошибки и при необходимости обновляет маркер.

<h2 class="wp-block-heading" id="шаг-3-использование-файла-конфигурации-axios">Шаг 3: Использование файла конфигурации Axios</h2>

<br>Чтобы использовать экземпляр Axios в своем приложении, просто импортируйте его в файл, в котором необходимо выполнять вызовы API. Вот пример того, как это сделать:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">import HttpAuthInstance from './service/axiosConfig';

HttpAuthInstance.get('/api/users').then(response =&gt; {
    console.log(response.data);
});
</code></pre>
<!-- /wp:code -->

В этом примере мы делаем GET-запрос к конечной точке /api/users и записываем данные ответа в консоль.

Вот и все! С помощью этого перехватчика Axios ваше приложение будет автоматически обновлять токены при необходимости, что сделает его более безопасным и эффективным. Надеюсь, эта статья была полезной и информативной для вас.

Счастливого кодинга!
