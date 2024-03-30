---
title: >-
  Самостоятельное тестирование API с помощью Hoppscotch для API с открытым
  исходным кодом
meta_title: >-
  Самостоятельное тестирование API с помощью  Hoppscotch платформа для API с
  открытым исходным кодом - Фул Фронт Дев
description: >-
  Самостоятельное размещение Hoppscotch дает вам  полный контроль над процессом
  разработки API и позволяет  запускать Hoppscotch на собственных серверах,
  обеспечив
date: 2023-11-19T22:42:12.874Z
image: >-
  ../../assets/images/samostoyatelьnoe-testirovanie-api-s-pomoshьyu-hoppscotch-dlya-api-s-otkrytym-ishodnym-kodom-Nov-20-2023.avif
categories:
  - Как закодить
author: Igor Gorlov
tags:
  - Hoppscotch
draft: false
type: blog
slug: >-
  samostoyatelьnoe-testirovanie-api-s-pomoshьyu-hoppscotch-dlya-api-s-otkrytym-ishodnym-kodom
keywords:
  - Hoppscotch
lastmod: 2024-03-20T21:26:48.594Z
---

Самостоятельное размещение Hoppscotch дает вам полный контроль над процессом разработки API и позволяет запускать Hoppscotch на собственных серверах, обеспечивая больший контроль над данными и безопасностью.

В данном руководстве рассматриваются основы самостоятельного хостинга Hoppscotch, включая необходимые конфигурации и настройки, которые понадобятся для начала работы. Вы можете установить и запустить Hoppscotch на любой операционной системе, способной работать с [Docker Engine](https://docs.docker.com/engine), но для создания докер-образов вам потребуется машина с 4 процессорными ядрами и не менее 16 ГБ оперативной памяти. Однако для размещения сгенерированных выходных файлов можно использовать машину с 1 процессорным ядром и 2 ГБ оперативной памяти.

Прежде чем приступить к настройке, мы рады сообщить, что работаем над корпоративной версией Hoppscotch. Заполните форму [здесь](https://hoppscotch.io/beta), чтобы первыми узнать о ее запуске!

## [](https://dev.to/hoppscotch/self-host-your-api-testing-with-hoppscotch-the-open-source-api-platform-1e5#prerequisites)Необходимые условия

Для того чтобы начать самостоятельную работу с Hoppscotch, убедитесь, что у вас есть следующие необходимые условия:

1. node.js & npm
2. pnpm
3. docker
4. git

Посетите наш раздел [документация](https://docs.hoppscotch.io/documentation/self-host/prerequisites) для получения подробного руководства по установке необходимого программного обеспечения.

## [](https://dev.to/hoppscotch/self-host-your-api-testing-with-hoppscotch-the-open-source-api-platform-1e5#cloning-the-repository)Клонирование репозитория

Теперь, когда у вас есть все необходимые инструменты для начала установки, давайте начнем с клонирования репозитория Hoppscotch на GitHub. Вы можете клонировать репозиторий локально с помощью git, выполнив в терминале следующую команду:

```
git clone https://github.com/hoppscotch/hoppscotch.git
```

Вход в полноэкранный режим

В качестве альтернативы можно использовать GitHub CLI для клонирования репозитория:

```
gh repo clone hoppscotch/hoppscotch
```

Вход в полноэкранный режим

## [](https://dev.to/hoppscotch/self-host-your-api-testing-with-hoppscotch-the-open-source-api-platform-1e5#configuring-environment-variables)Настройка переменных окружения

Перед сборкой образа Docker и локальным использованием Hoppscotch необходимо настроить несколько переменных окружения. Создайте новый файл в корневом каталоге репозитория с именем `.env` и вставьте в него следующие конфигурации:

```
#-----------------------Backend Config------------------------------#
# Prisma Config
DATABASE_URL=postgresql://postgres:testpass@hoppscotch-db:5432/hoppscotch # или заменить на URL вашей базы данных

# Auth Tokens Config
JWT_SECRET="secretcode123"
TOKEN_SALT_COMPLEXITY=10
MAGIC_LINK_TOKEN_VALIDITY= 3
REFRESH_TOKEN_VALIDITY="604800000" # Срок действия по умолчанию составляет 7 дней (604800000 мс) в мс
ACCESS_TOKEN_VALIDITY="86400000" # Срок действия по умолчанию 1 день (86400000 мс) в мс
SESSION_SECRET='anothersecretcode123'

# Конфигурация домена приложения Hoppscotch
REDIRECT_URL="http://localhost:3000"
WHITELISTED_ORIGINS = "http://localhost:3170,http://localhost:3000,http://localhost:3100"

# Конфигурация Google Auth
GOOGLE_CLIENT_ID="*****"
GOOGLE_CLIENT_SECRET="*****"
GOOGLE_CALLBACK_URL="http://localhost:3170/v1/auth/google/callback"
GOOGLE_SCOPE="email,profile"

# Конфигурация Github Auth
GITHUB_CLIENT_ID="*****"
GITHUB_CLIENT_SECRET="*****"
GITHUB_CALLBACK_URL="http://localhost:3170/v1/auth/github/callback"
GITHUB_SCOPE="user:email"

# Конфигурация Microsoft Auth
MICROSOFT_CLIENT_ID="*****"
MICROSOFT_CLIENT_SECRET="*****"
MICROSOFT_CALLBACK_URL="http://localhost:3170/v1/auth/microsoft/callback"
MICROSOFT_SCOPE="user.read"

# Конфигурация почтового сервера
MAILER_SMTP_URL="smtps://user@domain.com:pass@smtp.domain.com"
MAILER_ADDRESS_FROM=''From Name Here'' <from@example.com>'

# Конфигурация ограничения скорости
RATE_LIMIT_TTL=60 # В секундах
RATE_LIMIT_MAX=100 # Максимальное количество запросов с одного IP

#-----------------------Frontend Config------------------------------#

# Базовые URL
VITE_BASE_URL=http://localhost:3000
VITE_SHORTCODE_BASE_URL=http://localhost:3000
VITE_ADMIN_URL=http://localhost:3100

# Backend URLs
VITE_BACKEND_GQL_URL=http://localhost:3170/graphql
VITE_BACKEND_WS_URL=wss://localhost:3170/graphql
VITE_BACKEND_API_URL=http://localhost:3170/v1

# Ссылки на условия предоставления услуг и политику конфиденциальности (необязательно)
VITE_APP_TOS_LINK=https://docs.hoppscotch.io/terms
VITE_APP_PRIVACY_POLICY_LINK=https://docs.hoppscotch.io/privacy
```

Вход в полноэкранный режим

Более подробно о значении каждой переменной можно прочитать в нашей [документации](https://docs.hoppscotch.io/documentation/self-host/install-and-build#configuring-the-environment). Однако есть три ключевые переменные, которые необходимо настроить для начала построения изображения:

1. Конфигурация базы данных
2. Конфигурация SMTP
3. Конфигурация OAuth

### [](https://dev.to/hoppscotch/self-host-your-api-testing-with-hoppscotch-the-open-source-api-platform-1e5#database-configuration)Конфигурация базы данных

По умолчанию Hoppscotch поставляется с Docker-контейнером, в котором предварительно настроена база данных Postgres. Однако если вам необходимо настроить собственную базу данных Postgres в облаке, убедитесь, что у вас есть корректный URL в формате `postgresql://username:password@url:5432/dbname`, и замените существующее значение `DATABASE_URL` в файле окружения.

### [](https://dev.to/hoppscotch/self-host-your-api-testing-with-hoppscotch-the-open-source-api-platform-1e5#smtp-configuration)Конфигурация SMTP

Для того чтобы предложить своей команде использовать Hoppscotch и включить функции электронной почты, необходимо настроить правильную конфигурацию SMTP, как описано ниже. Замените текущее значение параметра `MAILER_SMTP_URL` на правильный SMTP-адрес в формате `smtps://user@domain.com:pass@smtp.domain.com`.

Вы также можете использовать Mailcatcher в качестве простого SMTP-сервера. Чтобы установить Mailcatcher и запустить сервер, выполните следующую команду:

```
brew install mailcatcher # установить Mailcatcher
mailcatcher -f
```

Вход в полноэкранный режим

Вы также можете установить mailcatcher с помощью gem

```
gem install mailcatcher
```

Вход в полноэкранный режим

Mailcatcher будет запускаться по адресу `smtp://127.0.0.1:1025`. При настройке переменной окружения задайте `MAILER_SMTP_URL` как `smtp://host.docker.internal:1025` и задайте `MAILER_ADDRESS_FROM` как любой из ваших текущих почтовых адресов, например `frodo@shire.com`.

### [](https://dev.to/hoppscotch/self-host-your-api-testing-with-hoppscotch-the-open-source-api-platform-1e5#oauth-configuration)Конфигурация OAuth

Вы можете использовать приложение Hoppscotch без входа в систему, но если вам нужно войти в систему или получить доступ к панели администратора, необходимо настроить OAuth-провайдер. В этом документе мы настроим GitHub в качестве OAuth-провайдера. Конфигурации GitHub OAuth содержат следующие переменные:

```
GITHUB_CLIENT_ID="*****"
GITHUB_CLIENT_SECRET="*****"
GITHUB_CALLBACK_URL="http://localhost:3170/v1/auth/github/callback"
GITHUB_SCOPE="user:email"
```

Вход в полноэкранный режим

Чтобы настроить GitHub в качестве провайдера OAuth, выполните следующие действия:

1. Щелкните на фотографии своего профиля в правом верхнем углу любой страницы, а затем нажмите кнопку Настройки.
2. На левой боковой панели прокрутите вниз и выберите Настройки разработчика.
3. На левой боковой панели выберите пункт OAuth Apps.
4. Нажмите кнопку Новое приложение OAuth.
5. Укажите необходимую информацию и URL-адрес обратного вызова, как указано в конфигурации.
6. После регистрации приложения скопируйте Client ID и Client Secret и добавьте их в файл окружения.

## [](https://dev.to/hoppscotch/self-host-your-api-testing-with-hoppscotch-the-open-source-api-platform-1e5#installing-dependencies-amp-building-the-image)Установка зависимостей и сборка образа

После настройки необходимых переменных окружения установите необходимые зависимости для Hoppscotch, выполнив следующую команду в корневом каталоге репозитория:

```
pnpm install
```

Вход в полноэкранный режим

Далее с помощью Docker выполните сборку образов. Этот процесс может занять некоторое время, поэтому мы рекомендуем использовать для сборки образа систему с объемом оперативной памяти не менее 16 ГБ:

```
docker compose build
```

Вход в полноэкранный режим

## [](https://dev.to/hoppscotch/self-host-your-api-testing-with-hoppscotch-the-open-source-api-platform-1e5#running-migrations)Запуск миграции

Для того чтобы начать использовать Hoppscotch, необходимо запустить миграции на базе данных Postgres.

Если вы используете базу данных по умолчанию, поставляемую с Hoppscotch, вам необходимо получить идентификатор процесса контейнера и запустить миграции внутри контейнера, выполнив следующие команды.

```
docker ps # скопировать идентификатор hoppscotch-backend
docker exec -it id bash
pnpm exec prisma migrate deploy
```

Вход в полноэкранный режим

Однако если вы используете собственную размещенную базу данных, то запустить миграцию можно с помощью следующих команд:

```
cd packages/hoppscotch-backend
pnpm exec prisma migrate deploy
cd ... # убедитесь, что вы вернулись в корневой каталог
```

Вход в полноэкранный режим

## [](https://dev.to/hoppscotch/self-host-your-api-testing-with-hoppscotch-the-open-source-api-platform-1e5#running-hoppscotch)Запуск игры Hoppscotch

Теперь, когда все настроено и миграции запущены, можно приступить к использованию Hoppscotch, выполнив команду

```
docker compose up
```

Вход в полноэкранный режим

Теперь приложение Hoppsoctch будет доступно по адресу `http://localhost:3000`.

[![Приложение "Хопспочта"](https://res.cloudinary.com/practicaldev/image/fetch/s--I3-Q9Swc--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/az34pbvfklwtwiud3hnl.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--I3-Q9Swc--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/az34pbvfklwtwiud3hnl.png)

Вы также можете получить доступ к панели администратора по адресу `http://localhost:3100`.

[![Hoppscotch admin dashboard](https://res.cloudinary.com/practicaldev/image/fetch/s--dTZ1gS1e--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/loqylvprn2zoy11teh5v.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--dTZ1gS1e--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/loqylvprn2zoy11teh5v.png)

В заключение следует отметить, что самостоятельное размещение тестирования API на хостинге Hoppscotch обеспечивает полный контроль над рабочим процессом разработки API. В данном руководстве рассмотрены основы самостоятельного хостинга Hoppscotch, включая необходимые конфигурации и настройки, которые понадобятся для начала работы. Если вы предпочитаете не размещать Hoppscotch самостоятельно, вы можете ознакомиться с нашим облачным инстансом по адресу [hoppscotch.io](https://hoppscotch.io/). Также не забудьте заглянуть в наш [GitHub-репозиторий](https://hoppscotch.io/github) и оставить отзыв!
