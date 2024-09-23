---
title: "Бесплатный хостинг приложений с Github Actions \U0001F92F\U0001F680"
meta_title: "Бесплатный Хостинг Приложений С Github Actions \U0001F92F\U0001F680 - Фул..."
description: "Когда я впервые узнал, что могу бесплатно размещать свои приложения на GitHub, мое сознание было совершенно потрясено \U0001F92F."
date: 2023-10-12T12:35:29.754Z
image: "../../assets/images/besplatnyj-hosting-prilozhenij-s-github-actions-\U0001F92F\U0001F680-Oct-12-2023.avif"
categories:
  - Как закодить
author: Igor Gorlov
tags:
  - DevOps
draft: false
keywords:
  - Github Actions
type: blog
slug: "besplatnyj-hosting-prilozhenij-s-github-actions-\U0001F92F\U0001F680"
lastmod: 2024-03-20T21:26:48.574Z
---

Когда я впервые узнал, что могу бесплатно размещать свои приложения на GitHub, мое сознание было совершенно потрясено 🤯.

Давайте узнаем, как запланированные рабочие процессы могут свести ваш счет за облачный хостинг к $0

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://i.giphy.com/media/uj8JYrjroFGYmn82Ab/giphy.gif" alt="смешная гифка"/></figure>
<!-- /wp:image -->

<h2 class="wp-block-heading">Настройка</h2>

Я не хочу тратить ваше время — это работает только в том случае, если ваше приложение не должно работать круглосуточно, а скорее по фиксированному расписанию. Если ваше приложение основано на данных, которые вам нужно собирать ежедневно, или если вы хотите автоматически отправлять своей девушке сообщение с добрым утром, это отлично сработает! Не то чтобы я рекомендовал автоматизировать ваши отношения 🫠.

Для этого примера мы автоматизируем мой старый инструмент, который собирает данные с новостного сайта. В репозитории вы найдете очень простой скрипт на NodeJS (v18), имеющий несколько зависимостей и один шаг сборки. Если вы хотите запустить его, выполните npm install, npm run build и, наконец, npm run start. После этого скрипт соберет данные, обобщит их, отправит мне сообщение в Telegram и, наконец, остановится. Поскольку этот скрипт будет обобщать новости для меня, я хочу, чтобы он запускался каждое утро. С учетом этих требований мы можем построить наш рабочий процесс GitHub Action:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">
name: Daily Report

on:
  schedule:
    - cron: "0 6 * * *" # Use a tool like www.cronmaker.com
  workflow_dispatch: # Enable manual trigger

jobs:
  build-and-start:
    runs-on: ubuntu-latest # Base Image
    steps:
      - uses: actions/checkout@v3 # Get code from repo
      - uses: actions/setup-node@v3 # Install Node.JS
        with:
          node-version: 18.x # Use any major version 18
      - run: npm install # Install dependencies
      - run: npm run build # Compile Code

      - run: npm run start # Start Code
        env: # Runtime secrets are defined in Repository Settings
          GOOGLE_API_KEY: ${{ secrets.GOOGLE_API_KEY }}
          GOOGLE_PROJECT_ID: ${{ secrets.GOOGLE_PROJECT_ID }}
          TELEGRAM_API_KEY: ${{ secrets.TELEGRAM_API_KEY }}
          TELEGRAM_CHAT_ID: ${{ secrets.TELEGRAM_CHAT_ID }}
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
</code></pre>
<!-- /wp:code -->

Если вы все сделали правильно, то теперь GitHub будет выполнять этот рабочий процесс каждый день. Вы увидите результаты и журналы в своем репозитории <a href="https://github.com/Code42Cate/daily-report/actions/workflows/daily-run.yml">здесь</a>

<img width="800" height="296" src="https://res.cloudinary.com/practicaldev/image/fetch/s--kMBjsXAj--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/hrnos39pbzf1exree2w9.png" alt="GitHub Actions Result">

<h2 class="wp-block-heading">Заключение</h2>

Это было просто потрясающе, правда? Конечно, вы можете сделать это для своих собственных программ и даже использовать совершенно другие языки или настройки. Если вам нужна помощь в настройке, пожалуйста, сообщите мне об этом в комментариях! Всегда рад помочь :)

PS: Хотите недорого разместить свои долго работающие Docker-приложения? Обратите внимание на Sliplane!
