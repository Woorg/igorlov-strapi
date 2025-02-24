---
title: Как удалить предварительные версии развертываний Vercel из GitHub Actions
meta_title: >-
  Как удалить предварительные версии развертываний Vercel из GitHub Actions -
  Фул Фронт Дев
description: >-
  Недавно я начал свое путешествие по изучению NextJS и платформы Vercel. Как
  опытный разработчик React, за последние 6 лет я разработал несколько
  фронтендприло
date: 2023-12-04T13:42:18.291Z
image: >-
  ../../assets/images/kak-udalyt-predvaryteln-e-versyy-razvert-vanyi-vercel-yz-github-actions-Dec-04-2023.avif
categories:
  - Как закодить
author: Igor Gorlov
tags:
  - Github
  - Vercel
draft: false
type: blog
slug: kak-udalyt-predvaryteln-e-versyy-razvert-vanyi-vercel-yz-github-actions
keywords:
  - Vercel
  - Github
lastmod: 2024-03-20T21:26:46.567Z
---

Недавно я начал свое путешествие по изучению NextJS и платформы Vercel. Как опытный разработчик React, за последние 6 лет я разработал несколько фронтенд-приложений с использованием этой библиотеки, и очень приятно видеть, как вся экосистема React строится/следует за тем, что говорит компания, и взаимодействует с сообществом. Будущее за React, и любое сходство с PHP - не случайность.

Итак, давайте начнем. Поскольку я строю свой стартап, мы решили создать фронтенд + бэкенд с помощью NextJS. Это лучшее решение для нашего продукта - монолит, включающий бэкенд и фронтенд... и некоторые другие преимущества, такие как SSR и кэширование. Так как мы хотим иметь быструю итерацию в продукте, наличие такого сервиса, как [Vercel](https://vercel.com/), помогает нам создавать наш продукт, не заботясь об инфраструктуре (AWS, GCP). Цены очень скромные, честно говоря, я считаю, что заплатить $20 за инфраструктуру полного стека с включенным экземпляром Postgres вполне достойно.

Вместо того чтобы использовать их автоматическую сборку после переноса коммита в ветку, я решил отключить эту функцию и запускать сборку из GitHub Actions.

## Шаг 1 - Соберите необходимые идентификаторы

Для взаимодействия с **Vercel API** вам нужны значения `projectId` и `teamId`. Чтобы получить эти значения:

- Перейдите на приборную панель Vercel и выберите команду

[![Изображение приборной панели](https://res.cloudinary.com/practicaldev/image/fetch/s--4bPV11o1--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ofl50td3m474o3vd9ikq.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--4bPV11o1--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ofl50td3m474o3vd9ikq.png)

- Нажмите на настройки

[![Изображение настроек](https://res.cloudinary.com/practicaldev/image/fetch/s--G87aNuDK--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/3egqxv1i9b6g9v8dkpvm.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--G87aNuDK--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/3egqxv1i9b6g9v8dkpvm.png)

- Скопируйте идентификатор вашей команды

[![Изображение идентификатора команды](https://res.cloudinary.com/practicaldev/image/fetch/s--rDh02g3C--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/alb9jm63be1mu6d1702v.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--rDh02g3C--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/alb9jm63be1mu6d1702v.png)

- Выберите проект, над которым вы работаете, нажав на Обзор

[![Изображение обзора](https://res.cloudinary.com/practicaldev/image/fetch/s--wsdhw64k--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/z5owhuyuzo2to2naiops.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--wsdhw64k--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/z5owhuyuzo2to2naiops.png)

- Нажмите в настройках

[![Изображение настроек](https://res.cloudinary.com/practicaldev/image/fetch/s--IGjqX1Xi--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/pm31gwpql6ryd04djs7q.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--IGjqX1Xi--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/pm31gwpql6ryd04djs7q.png)

- Скопируйте идентификатор вашего проекта

[![Изображение идентификатора проекта](https://res.cloudinary.com/practicaldev/image/fetch/s--GlHi6NsD--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/3cix8uxpb8aeoaw1m89g.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--GlHi6NsD--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/3cix8uxpb8aeoaw1m89g.png)

- Создайте токен администратора Создайте токен администратора, посетив страницу [Tokens](https://vercel.com/account/tokens). Не забудьте выбрать опцию **Full Scope**. Это важно, поскольку данный токен будет отвечать за удаление развертываний.

[![Токен администратора](https://res.cloudinary.com/practicaldev/image/fetch/s--Ue_UuqX2--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/p066rfzzt94ne5u73qjr.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--Ue_UuqX2--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/p066rfzzt94ne5u73qjr.png)

Подводя итог, можно сказать, что вам понадобятся 3 токена от vercel:

| Токен             | Описание                  | Имя переменной    |
| ----------------- | ------------------------- | ----------------- |
| VERCEL_ORG_ID     | Это идентификатор команды | VERCEL_ORG_ID     |
| VERCEL_PROJECT_ID | Это идентификатор проекта | VERCEL_PROJECT_ID |
| VERCEL_TOKEN      | Это токен ключа API       | VERCEL_TOKEN      |

## Шаг 1 - Создайте переменные окружения в GitHub Actions

Зайдите в настройки репозитория и создайте там переменные окружения.

[![Секреты GitHub Actions](https://res.cloudinary.com/practicaldev/image/fetch/s--yLzUY6mm--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/a5f748dsn1oxx29jh8b1.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--yLzUY6mm--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/a5f748dsn1oxx29jh8b1.png)

## Шаг 2 - Настройка рабочего процесса `deploy_preview.yml`.

1. Зайдите в свой проект, создайте новый рабочий процесс с именем `deploy_preview.yml` в папке `.github/workflows`.
2. Вставьте следующее содержимое рабочего процесса:

```yaml
имя: Развертывание предварительного просмотра Vercel

env:
  VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
  VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
  VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}

разрешения:
  содержимое: читать
  статусы: запись
  pull-requests: write

на:
  pull_request:
    типы:
      - открытый
      - синхронизировать

задания:
  deploy-preview:
    работает на: ubuntu-latest
    шаги:
      - использует: actions/checkout@v2

      - имя: Извлечь имя ветки
        оболочка: bash
        выполнить: echo "branch=${GITHUB_HEAD_REF:-${GITHUB_REF#refs/heads/}}" >> $GITHUB_OUTPUT
        id: extract_branch

      - name: Hash имя ветки
        используется: pplanel/hash-calculator-action@v1.3.1
        id: hash_branch
        с:
          input: ${{ steps.extract_branch.outputs.branch }}
          метод: MD5

      - имя: Установить Vercel CLI
        выполнить: npm install --global vercel@latest

      - название: Зависимости кэша
        используется: actions/cache@v2
        id: cache-npm
        с:
          путь: ~/.npm
          ключ: npm-${{ hashFiles('package-lock.json') }}
          restore-keys: npm-

      - имя: Установить зависимости
        if: ${{ steps.cache-npm.outputs.cache-hit != 'true' }}
        выполнить: npm ci --ignore-scripts

      - имя: Вытащить информацию об окружении Vercel
        run: vercel pull --yes --environment=preview --token=$VERCEL_TOKEN

      - имя: Развертывание артефактов проекта в Vercel
        id: vercel
        env:
          META_TAG: ${{ steps.hash_branch.outputs.digest }}-${{ github.run_number }}-${ github.run_attempt}}
        run: |
          vercel --version
          vercel pull --yes --environment=preview --token=$VERCEL_TOKEN
          vercel build --token=$VERCEL_TOKEN
          vercel deploy --prebuilt --archive=tgz --token=$VERCEL_TOKEN --meta base_hash=${{ env.META_TAG }}

          vercel ls --token=$VERCEL_TOKEN --meta base_hash=${{ env.META_TAG }} &> vercel-output
          url=$(cat vercel-output | grep http | awk '{print $2}')
          echo "Новый URL-адрес предварительного просмотра: $url"
          echo "META_TAG=$META_TAG"
          echo "VERCEL_URL=$url" >> "$GITHUB_OUTPUT"

      - использует: mshick/add-pr-comment@v2
        с:
          сообщение: |
            Ваша сборка завершена!

            [Предварительное развертывание](${{ steps.vercel.outputs.VERCEL_URL }})
```

Вход в полноэкранный режим

Этот рабочий процесс является базовым, который будет выполняться каждый раз, когда создается или синхронизируется (получает новый коммит) запрос на вытягивание. Выполняются следующие шаги:

1. Извлечение содержимого PR в рабочую директорию.
2. Получите имя ветки.
3. Создайте уникальный хэш для имени ветки. Это важно, потому что Vercel разрешает использовать мета-теги в сборках, это поможет нам позже определить, когда нужно будет удалить все предварительные развертывания из определенной ветки.
4. Установите Vercel CLI.
5. Проверьте кэш для модулей npm (ускорение сборки).
6. Установите зависимости, если необходимо
7. Извлеките переменные окружения, определенные в Vercel
8. Сборка и развертывание артефактов. Обратите внимание на переменную `META_TAG`. Это важно, так как она будет использоваться в качестве метаданных для идентификации каждого развертывания превью.
9. Прокомментируйте URL-адрес предварительного просмотра.

В рамках этого шага вы создадите автоматические ссылки на предварительный просмотр при каждом запуске в вашу ветку.

## Шаг 3 - Настройка рабочего процесса и сценария `remove_deploy_preview.yml`

Этот рабочий процесс будет обязательным в том случае, если вы захотите удалить все сборки превью, созданные проектом.

### Bash-скрипт для удаления сборок из Vercel

В корневой папке проекта создайте файл `scripts/delete-deployment-preview.sh`.

```bash
#!/bin/bash
# Установите опцию pipefail.
set -o pipefail

# Получение конечных точек API Vercel.
GET_DEPLOYMENTS_ENDPOINT="https://api.vercel.com/v6/deployments"
DELETE_DEPLOYMENTS_ENDPOINT="https://api.vercel.com/v13/deployments"

# Создайте список развертываний.
deployments=$(curl -s -X GET "$GET_DEPLOYMENTS_ENDPOINT/?projectId=$VERCEL_PROJECT_ID&teamId=$VERCEL_ORG_ID" -H "Authorization: Bearer $VERCEL_TOKEN ")

# Отфильтруйте список развертываний по meta.base_hash === meta tag.
filtered_deployments=$(echo $deployments | jq --arg META_TAG "$META_TAG" '[.deployments[] | select(.meta.base_hash | type == "string" and contains($META_TAG)) | .uid] | join(",")')
filtered_deployments="${filtered_deployments//\"/}" # Удалите двойные кавычки

# Очистите значения из filtered_deployments
IFS=',' read -ra values <<<"$filtered_deployments"

echo "META_TAG ${META_TAG}"
echo "Отфильтрованные развертывания ${filtered_deployments}"

# Итерация по списку отфильтрованных развертываний.
for uid in "${values[@]}"; do
    echo "Удаление ${uid}"

    delete_url=${DELETE_DEPLOYMENTS_ENDPOINT}/${uid}?teamId=${VERCEL_ORG_ID}
    echo $delete_url

    # Выполните DELETE-запрос к конечной точке /v13/deployments/{id}.
    curl -X DELETE $delete_url -H "Authorization: Bearer $VERCEL_TOKEN"

    echo "Удалено!"
done

```

Вход в полноэкранный режим

Не забудьте запустить `chmod`:
`chmod a+x ./scripts/delete-deployment-preview.sh`.

### [](https://dev.to/thereis/how-to-remove-vercel-deployments-from-github-actions-4nfh#deployment-workflow)Рабочий процесс развертывания

Создайте файл `remove_deploy_preview.yml` в папке `.github/workflows` и вставьте в него следующее содержимое:

```yaml
имя: Удалить предварительный просмотр развертывания

разрешения:
  содержимое: читать
  статусы: запись
  pull-requests: write

env:
  VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
  VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
  VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}

on:
  pull_request:
    типы:
      - закрытый

задания:
  delete-deployments:
    работает на: ubuntu-latest
    шаги:
      - uses: actions/checkout@v2

      - имя: Извлечь имя ветки
        оболочка: bash
        выполнить: echo "branch=${GITHUB_HEAD_REF:-${GITHUB_REF#refs/heads/}}" >> $GITHUB_OUTPUT
        id: extract_branch

      - name: Hash имя ветки
        используется: pplanel/hash-calculator-action@v1.3.1
        id: hash_branch
        с:
          input: ${{ steps.extract_branch.outputs.branch }}
          метод: MD5

      - имя: Вызов скрипта delete-deployment-preview.sh
        env:
          META_TAG: ${{ steps.hash_branch.outputs.digest }}
        run: |
          bash ./scripts/delete-deployment-preview.sh
```

Вход в полноэкранный режим

Этот рабочий процесс будет запущен, когда существующий PR будет закрыт или объединен. Поэтому имейте в виду, что эта работа, возможно, будет выполнена без удаления превью.

Рабочий процесс состоит из следующих шагов:

1. Загрузите содержимое PR в рабочее пространство.
2. Получение имени ветви запроса.
3. Создайте для нее хэш.
4. Выполните скрипт `bash`, который мы создали ранее с переменной окружения `META_TAG`.

Сценарий выполнит GET-запрос к конечной точке `https://api.vercel.com/v6/deployments` и получит все имеющиеся у вас предварительные развертывания. Затем мы используем `jq` для создания списка `uid`, который совпадает с `meta.base_hash`, который мы передали ранее при создании нового превью.

Если есть свободные развертывания, мы удаляем их. Если нет, то все в порядке, не стоит беспокоиться (если только у вас вообще ничего нет).

[![Удалить предварительный просмотр развертывания](https://res.cloudinary.com/practicaldev/image/fetch/s--PRAiS5GR--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/zb5fgmr5dudotwl8q740.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--PRAiS5GR--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/zb5fgmr5dudotwl8q740.png)

На этом все, надеюсь, вы разберетесь с этим. Оставляйте комментарии, если вам понравилось, и следите за мной (за моими жалобами) в Twitter.

[dev_reis on Twitter](https://twitter.com/dev_reis)
[dev_reis on Instagram](https://instagram.com/dev_reis)
