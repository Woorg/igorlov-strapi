---
title: Как добавить ESLint в проект React
meta_title: Как добавить ESLint в проект React - Фул Фронт Дев
description: >-
  Для разработчиков React поддержание качества кода очень важно для создания
  надежных и поддерживаемых приложений. К счастью, существует мощный
  инструмент...
date: 2023-08-19T15:47:00.000Z
image: ../../assets/images/undefined-Aug-19-2023.avif
categories:
  - Учебник
author: Igor Gorlov
tags:
  - React
draft: false
lastmod: 2024-03-20T21:26:47.572Z
---

Для разработчиков React поддержание качества кода очень важно для создания надежных и поддерживаемых приложений. К счастью, существует мощный инструмент ESLint, который позволяет значительно повысить качество ваших React-проектов.

В этой статье мы рассмотрим принцип работы ESLint и создадим компонент кнопки регистрации, чтобы продемонстрировать его преимущества.

<h2 class="wp-block-heading">Что такое ESLint?</h2>

ESLint - это популярная утилита для линтинга JavaScript с открытым исходным кодом. Она анализирует ваш код на предмет потенциальных ошибок и обеспечивает соблюдение стандартов кодирования, повышая качество кода.

Она также поможет вам как разработчику выявить и исправить типичные ошибки, использовать лучшие практики и поддерживать согласованность кода.

Вы можете легко интегрировать ESLint в свои проекты React, обеспечивая обратную связь в реальном времени и повышая общее качество кода.

<h2 class="wp-block-heading">Как настроить проект</h2>

Начнем с настройки нового проекта React и установки ESLint. Для демонстрации этого мы создадим приложение для регистрации в React.

Представьте, что мы хотим хранить наш проект на рабочем столе, поэтому сначала настроим файловую структуру. Начнем с создания корневого каталога для нашего проекта на рабочем столе (в данном случае eslintExample).

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">mkdir eslintExample 
cd eslintExample</code></pre>
<!-- /wp:code -->

<h2 class="wp-block-heading">Установка приложения React</h2>

Теперь с помощью create-react-app мы установим наше приложение React.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">npx create-react-app signup-app</code></pre>
<!-- /wp:code -->

<h2 class="wp-block-heading">Установить ESLint</h2>

Для установки ESLint можно воспользоваться следующей командой:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">npm install eslint eslint-plugin-react eslint-plugin-react-hooks --save-dev</code></pre>
<!-- /wp:code -->

Структура каталогов должна выглядеть следующим образом:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">eslintExample/
  └── signup-app/
      └── node_modules/
      └── public/
      └── src/
          └── App.css
          └── App.js
          └── App.test.js
          └── SignupButton.js
          └── index.css
          └── logo.svg
          └── reportWebVitals.js
          └── setupTests.js
      └── .eslintrc.json
      └── .gitignore
      └── package-lock.json
      └── package.json
      └── README.md
</code></pre>
<!-- /wp:code -->

<h2 class="wp-block-heading">Как настроить ESLint в проекте React</h2>

Для работы с ESLint в нашем React-проекте необходимо его настроить. Для этого необходимо создать файл .eslintrc.json в корневом каталоге проекта и добавить в него следующий код:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">{
    "env": {
      "browser": true,
      "es2021": true
    },
    "extends": ["eslint:recommended", "plugin:react/recommended", "plugin:react-hooks/recommended"],
    "parserOptions": {
      "ecmaVersion": 12,
      "sourceType": "module",
      "ecmaFeatures": {
        "jsx": true
      }
    },
    "plugins": ["react", "react-hooks"],
    "rules": {
      //add customize rules here as per your project's needs
    }
}  </code></pre>
<!-- /wp:code -->

Приведенная выше конфигурация настраивает ESLint на работу с React и React Hooks с использованием рекомендуемых конфигураций. Вы можете добавить или настроить правила в соответствии с конкретными требованиями вашего проекта.

<img width="822" height="359" class="kg-image" src="https://lh5.googleusercontent.com/nEAJArNZ75TidB33XK-0_p4BQea9aTppnnFrk0u7znVKIpsmCortCwaZ0KFYbw_1OOkz_QcXC0cr1WGih89a1OY2REUCSIWKckpaGESNchz8xakqTAntBbpgDXabbrcf6kWZzwxpAZ14PC5xQb9h_A" alt="How to Add ESLint to Your React Project">Создали файл.eslintrc.json и добавили в него конфигурацию, позволяющую ESLint работать с React.

<h2 class="wp-block-heading">Как создать компонент Signup Button</h2>

Теперь создадим простой компонент Signup Button (SignupButton.js) в папке “src”.

Внутри файла src создайте файл SignupButton.js. Он должен выглядеть следующим образом: src/SignupButton.js. Внутри файла SignupButton.js вставьте следующий код:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">import React from "react";

const SignupButton = () =&gt; {
  const handleSignup = () =&gt; {
    alert("Sign up successful!");
  };

  return (
    &lt;button onClick={handleSignup} className="signup-button"&gt;
      Sign Up
    &lt;/button&gt;
  );
};</code></pre>
<!-- /wp:code -->

Приведенный выше компонент представляет собой базовую кнопку, при нажатии на которую срабатывает оповещение, имитирующее процесс регистрации. Теперь можно выполнить следующую команду:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">npm start</code></pre>
<!-- /wp:code -->

Это запустит наше приложение React в корне проекта. После этого вы должны увидеть ошибку, приведенную ниже:

Мы запустили локальный сервер и видим ошибку, исходящую из файла app.js. Необходимо импортировать React в файл app.js. Нам необходимо экспортировать наш компонент кнопки.

Эта ошибка может сбить вас с толку, поскольку вы можете не понять, откуда она взялась. Мы видим эту ошибку, потому что мы настроили ESLint в нашем проекте, и он просканировал наш проект, чтобы сказать нам, что React должен быть импортирован в файл app.js.

Но давайте запустим ESLint, чтобы увидеть, откуда именно возникает ошибка.

<h2 class="wp-block-heading">Как запустить ESLint</h2>

Настроив ESLint, давайте запустим его, чтобы проанализировать наш компонент SignupButton на предмет потенциальных проблем. Откройте терминал и выполните следующую команду в корне проекта:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">npx eslint src/SignupButton.js</code></pre>
<!-- /wp:code -->

ESLint проанализирует файл SignupButton.js и отобразит все найденные проблемы ниже.

<img srcset="https://www.freecodecamp.org/news/content/images/size/w600/2023/08/image-101.png 600w, https://www.freecodecamp.org/news/content/images/size/w1000/2023/08/image-101.png 1000w, https://www.freecodecamp.org/news/content/images/2023/08/image-101.png 1089w" width="1089" height="572" class="kg-image" src="https://www.freecodecamp.org/news/content/images/2023/08/image-101.png" alt="How to Add ESLint to Your React Project">Выполним команду eslint, которая покажет, где у нас возникают ошибки: в кнопке регистрации и в app.js

<h2 class="wp-block-heading">Как исправить проблемы с ESLint</h2>

Из вышеприведенного видно, что ESLint определил, где у нас возникают ошибки. Мы не импортировали React в наш файл App.js и не экспортировали наш компонент кнопки регистрации. Давайте исправим это.

<img srcset="https://www.freecodecamp.org/news/content/images/size/w600/2023/08/image-100.png 600w, https://www.freecodecamp.org/news/content/images/size/w1000/2023/08/image-100.png 1000w, https://www.freecodecamp.org/news/content/images/2023/08/image-100.png 1089w" width="1089" height="572" class="kg-image" src="https://www.freecodecamp.org/news/content/images/2023/08/image-100.png" alt="How to Add ESLint to Your React Project">Мы импортировали React в файл app.js и экспортировали компонент SignupButton.

Как видно, теперь наш код был успешно собран.

Мы смогли экспортировать наш компонент SignupButton и импортировать React в компонент App.js. Это решает нашу проблему.

Если ESLint обнаружит еще какие-либо проблемы в нашем компоненте SignupButton, он покажет их вместе с предложениями по их устранению.

Например, ESLint может обнаружить отсутствие точек с запятой, неиспользуемые переменные или нарушение лучших практик React, таких, как импорт React из “react” в файле app.js.

Устранив проблемы, выявленные ESLint, мы можем гарантировать, что наш код будет соответствовать лучшим практикам, будет легче читаться и содержать меньше потенциальных ошибок.

<h2 class="wp-block-heading">Заключение</h2>

ESLint - это незаменимый инструмент для разработчиков React, позволяющий поддерживать качество кода и повышать производительность. Интегрировав ESLint в свои React-проекты, вы сможете выявлять ошибки на ранней стадии, следовать стандартам кодирования и развивать сотрудничество в команде.

В этой статье я рассказал, как настроить ESLint в React-проекте, и продемонстрировал его преимущества на примере простого компонента Signup Button. Эффективное использование ESLint позволит вам писать более чистый, последовательный код и создавать более качественные React-приложения.

Так зачем ждать? Начните использовать ESLint в своих React-проектах и увидите, как повысится качество кода. Счастливого кодирования! 🚀
