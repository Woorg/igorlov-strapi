---
title: Ввод Stripe Connect с помощью Ruby on Rails
meta_title: Ввод Stripe Connect с помощью Ruby on Rails | Игорь Горлов - Фронтeндер
description: >-
  Stripe Connect предоставляет набор инструментов и API, которые позволяют вам
  создавать, управлять и масштабировать вашу платформу или торговую площадку, а
  такж
date: 2023-12-18T00:00:00.000Z
categories:
  - Как закодить
author: Игорь Горлов
type: blog
draft: false
slug: vvod-stripe-connect-s-pomoschiu-ruby-on-rails
tags:
  - Stripe
  - Rails
image: >-
  ../../assets/images/vvod-stripe-connect-s-pomoschiu-ruby-on-rails-Dec-18-2023.avif
lastmod: 2024-03-20T21:26:47.454Z
---

Stripe Connect предоставляет набор инструментов и API, которые позволяют вам создавать, управлять и масштабировать вашу платформу или торговую площадку, а также осуществлять платежи и выплаты для ваших пользователей. Если вы впервые знакомитесь со Stripe Connect, ознакомьтесь с первыми статьями этого цикла. В этой статье вы узнаете, как интегрировать Stripe Connect Onboarding с Ruby on Rails, чтобы вы могли начать упрощать движение денег для своих пользователей.

Мы рассмотрим пример использования платформы для рассылки электронных писем, где читатели поддерживают своих любимых авторов, внося ежемесячную плату за получение периодических писем. Вы узнаете, как создавать аккаунты Stripe и собирать информацию о бизнесе с помощью хостинга Stripe Connect. Мы также рассмотрим настройку среды Rails и некоторые лучшие практики для плавной интеграции.

## Давайте начнем!

Мы начнем с того, что создадим новое Rails-приложение, использующее Tailwind CSS для стилей и Postgres для базы данных. `-T` означает пропуск добавления инфраструктуры тестирования по умолчанию, а `--main` задает имя ветки git.

`rails new newsletter-platform -c tailwind -j esbuild -d postgresql -T --main`.

Мы будем хранить каждый выпуск рассылки в базе данных, чтобы авторы могли направлять пользователей в свой бэк-каталог, если они захотят прочитать прошлые выпуски. Прежде чем отправить выпуск рассылки читателю, мы проверим, что у читателя есть активная подписка на оплату.

Давайте начнем с настройки этих моделей баз данных.

## Настройка базы данных

Чтобы настроить необходимые модели баз данных для этой платформы рассылки, мы создадим основные модели: User, Newsletter, NewsletterIssue и Subscription. Модель User представляет автора, модель Newsletter соответствует каждой коллекции выпусков, модель NewsletterIssue представляет каждый ежемесячный выпуск рассылки, а модель Subscription связывает читателей с рассылками, на которые у них есть активные платежные подписки. Давайте начнем с генерации этих моделей.

## Генерируем модель User:

Модель User используется для аутентификации. И читатели, и авторы представлены в базе данных как пользователи.

Для читателей мы храним `stripe_customer_id`. Мы будем использовать API Stripe для создания объектов клиентов для всех пользователей, чтобы мы могли отслеживать все подписки и счета, связанные с данным читателем.

Для авторов мы храним `stripe_account_id`. Он представляет собой идентификатор Stripe-аккаунта автора и позволяет нам направлять платежи от читателей к автору. Мы также храним флаги `charges_enabled` и `payouts_enabled`, чтобы знать, когда аккаунт полностью подключен и может успешно получать деньги.

`rails generate model User name:string email:string stripe_customer_id:string stripe_account_id:string charges_enabled:boolean payouts_enabled:boolean`.

## Генерируем модель рассылки новостей:

Новостные рассылки имеют связь по внешнему ключу с ID автора в таблице Users.

`rails generate model Newsletter user:references title:string`.

## Генерирование модели выпуска новостей:

Выпуски рассылки связаны с рассылкой, о которой они пишут, и для начала мы ограничимся заголовком и блоком текста для содержания. Дата `published_at` позволяет нам запланировать выпуск на будущее.

`rails generate model NewsletterIssue newsletter:references subject:string content:text published_at:datetime`.

## Генерация модели подписки:

Когда читатель подписывается на рассылку в первый раз, мы отправляем его через платежный поток с помощью Stripe Checkout, чтобы собрать его платежные данные и запустить подписку Stripe, которая собирает повторяющиеся платежи. Мы будем хранить `stripe_subscription_id` в базе данных, чтобы иметь возможность проверить Stripe API, чтобы узнать, активен ли платеж.

`rails generate model Subscription user:references newsletter:references stripe_subscription_id:string status:string`.

## Запустите миграцию базы данных:

`rails db:migrate`

Теперь давайте настроим отношения между этими моделями:

В `app/models/user.rb`:

`class User < ApplicationRecord has_many :newsletters has_many :subscriptions end`.

В `app/models/newsletter.rb`:

`class Newsletter < ApplicationRecord belongs_to :user has_many :newsletter_issues end`.

В `app/models/newsletter_issue.rb`:

`class NewsletterIssue < ApplicationRecord belongs_to :newsletter end`.

В `app/models/subscription.rb`:

`class Subscription < ApplicationRecord belongs_to :user belongs_to :newsletter end`.

С этими моделями мы теперь можем представлять авторов, рассылки и их выпуски, а также подписки читателей в нашей базе данных. В следующих шагах мы реализуем логику Stripe Connect Onboarding.

## Настройка Stripe

Используйте stripe-ruby SDK для взаимодействия с API Stripe.

`bundle add stripe`

Получите API-ключи с dashboard.stripe.com и вставьте их в наши учетные данные в Rails.

`EDITOR=vi rails credentials:edit`

Вставьте ключи следующим образом:

`stripe: secret_key: sk_test_51EceeUCZ6qs... publishable_key: pk_test_vAZ3gh1Lc...`.

Добавьте инициализатор в `config/initializers/stripe.rb` для установки API-ключа на уровне платформы. Нетчто у каждого авторского аккаунта Stripe будут свои собственные ключи API, но в Stripe Connect нам никогда не нужны ключи подключенных аккаунтов. Вместо этого мы аутентифицируем запросы к подключенным аккаунтам с помощью комбинации API-ключа нашего уровня платформы и идентификатора подключенного аккаунта. Более подробную информацию см. здесь.

`Stripe.api_key = Rails.application.credentials.dig(:stripe, :secret_key)`.

Теперь мы готовы начать выполнять вызовы API для Stripe из Ruby. Прежде чем мы начнем использовать API Stripe, давайте настроим аутентификацию.

## Настройка аутентификации

Для этого случая пользователям нужен способ аутентификации в приложении. Поскольку мы используем Ruby on Rails, мы будем использовать аутентификацию devise для авторов.

Мы установим гем devise, запустим установочные скрипты и сгенерируем маршруты и миграцию для авторов, чтобы они могли аутентифицироваться в базе данных.

`bundle add devise rails generate devise:install rails g devise:views rails g devise Author`.

И снова мы мигрируем базу данных.

`rails db:migrate`

Запустив `bin/dev`, мы запускаем сервер, чтобы протестировать наш поток регистрации по адресу localhost:3000/authors/sign_up.

Нам представлено нестилизованное представление входа в систему, которое мы очистим позже.

Теперь, когда пользователи могут зарегистрироваться в приложении, нам нужно подключить их к Stripe Connect, чтобы мы могли начать взаимодействовать с API Stripe от их имени.

## Настройка подключения к Connect

Connect поддерживает 3 различных типа аккаунтов: Standard, Express и Custom. Поскольку авторы могут не иметь опыта работы с возвратами и возвратными платежами в данном случае, имеет смысл предоставить им интеграцию, при которой они будут иметь доступ к более простой панели Stripe с подключенным аккаунтом типа Express. Подробнее о преимуществах различных типов аккаунтов можно узнать здесь. Примечание: мы надеемся убрать концепцию типа аккаунта, так что следите за новостями, чтобы не запутать пользователей в разграничении функций Connect.

Для входа в систему у нас будет страница, на которой мы либо покажем данные подключенного аккаунта, либо дадим пользователю кнопку для создания нового аккаунта и прохождения процесса входа в систему. Эти функции будут выполняться новым контроллером StripeAccountsController.

`rails g controller StripeAccounts show`

Мы добавим единичные маршруты ресурсов для /stripe_account, обновив config/routes.rb.

`Rails.application.routes.draw do resource :stripe_account devise_for :users end`.

Далее мы добавим макрос before action из devise, который требует аутентифицированного автора для доступа к этим маршрутам.

`class StripeAccountsController < ApplicationController before_action :authenticate_author! end`.

Представление для маршрута show пока очень простое.

`<% if current_user.stripe_account_id.present? %> <%= current_user.stripe_account.to_json %> <% else %> Не найден аккаунт Stripe <%= button_to "Create a Stripe Account", stripe_account_path, method: :post, data: { turbo: false } %> <% end %>`

Когда пользователь нажимает на кнопку "Создать аккаунт Stripe", мы сначала совершаем API-вызов в Stripe для создания нового аккаунта Express, затем обновляем базу данных с идентификатором аккаунта и, наконец, перенаправляем через поток регистрации аккаунта с помощью ссылки на аккаунт.

Цель состоит в том, чтобы свести к минимуму количество информации, которую автор должен вводить повторно. Например, у нас уже есть адрес электронной почты автора, поэтому мы можем заполнить его на уровне аккаунта и отдельного пользователя. Мы также предположим, что все авторы - частные лица, а не компании. Мы можем заполнить mcc (merchant category code) бизнес-профиля цифровыми товарами, чтобы каждому автору не приходилось копаться в списке типов услуг в поисках цифровых товаров.

`def create account = Stripe::Account.create( type: 'standard', email: current_user.email, business_type: 'individual', business_profile: { mcc: '5818', }, individual: { email: current_user.email, }, metadata: { author_id: current_user.id, } ) current_user.update(stripe_account_id: account.id) account_link = Stripe::AccountLink.create( account: account.id, refresh_url: stripe_account_url, return_url: stripe_account_url, type: 'account_onboarding' ) redirect_to account_link.url, status: :see_other, allow_other_host: true end`

Когда в Stripe происходят события, связанные с аккаунтами Stripe, приложение может быть уведомлено с помощью веб-крючков. Нам нужно прослушать тип события `account.updated` webhook, чтобы знать, когда аккаунт успешно завершил онбординг.

## Настройка веб-хуков

Нам нужен контроллер для обработки входящих POST-запросов от Stripe.

`rails g controller Webhooks`

Мы добавим простой маршрут /webhooks для обработки POST-запросов.

`resources :webhooks, only: [:create]`.

Поскольку запросы приходят от Stripe, мы не можем проверить CSRF-токен, поэтому пропустим эту проверку в верхней части контроллера.

`class WebhooksController < ApplicationController skip_before_action :verify_authenticity_token`

Затем мы добавим метод create для обработки пост-запросов от Stripe, чтобы десериализовать тело события и переключаться в зависимости от типа уведомления о событии.

`def create payload = request.body.read event = nil begin event = Stripe::Event.construct_from( JSON.parse(payload, symbolize_names: true) ) rescue JSON::ParserError => e # Invalid payload puts "⚠️ Webhook error while parsing basic request. #{e.message})" render json: { message: 'failed' }, status: 400 return end case event.type when 'account.updated' account = event.data.object # содержит Stripe::Account # TODO: Handle account updates else puts "Unhandled event type: #{event.type}" end render json: { message: 'success' } end`

Каждый раз, когда мы получаем событие account.updated, мы хотим обновить флаги нашего локального автора, чтобы узнать, включены ли начисления и выплаты.

`when 'account.updated' account = event.data.object # содержит Stripe::Account author = User.find_by(stripe_account_id: account.id) author.update( charges_enabled: account.charges_enabled, payouts_enabled: account.payouts_enabled )`.

Для локального создания и тестирования веб-крючков мы будем использовать Stripe CLI. Команда `listen` позволяет нам перенаправлять события веб-хуков как от аккаунта, так и от соединения. События аккаунта, они же прямые события, - это события, которые происходят на нашем аккаунте, события подключения - это события, которые происходят на подключенных аккаунтах.

## Запустите слушатель с помощью команды:

`stripe listen --forward-to localhost:3000/webhooks --forward-connect-to localhost:3000/webhooks`.

Для удобства работы с Rails я добавляю новый процесс в Procfile.dev, чтобы он запускался каждый раз, когда мы запускаем bin/dev. Мой Procfile.dev выглядит следующим образом:

`web: bin/rails server -p 3000 js: yarn build --watch css: yarn build:css --watch stripe: stripe listen --forward-to localhost:3000/webhooks --forward-connect-to localhost:3000/webhooks`.

Теперь мы можем пройти через поток onboarding и ввести детали теста. Используйте магические тестовые строки из этой документации, чтобы обеспечить верификацию тестового аккаунта. Обратите внимание, что для активации учетной записи вам также потребуется подтвердить свой email, поэтому используйте реальный адрес электронной почты, к которому у вас есть доступ при создании новой учетной записи для подключения.

Если все прошло по плану, вы видите JSON для аккаунта Stripe в браузере, у вашего Автора есть идентификатор аккаунта Stripe, начисления включены в true, а выплаты включены в true в базе данных.

[Источник](https://dev.to/stripe/stripe-connect-onboarding-with-ruby-on-rails-32i4)
