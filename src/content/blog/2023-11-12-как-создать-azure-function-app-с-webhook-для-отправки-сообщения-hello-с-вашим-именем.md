---
title: >-
  Как создать Azure Function App с Webhook для отправки сообщения "Hello" с
  вашим именем
meta_title: |
  Как Создать Azure Function App С Webhook Для Отправки...
description: >
  Azure Function App - это архитектура, управляемая событиями, бессерверное
  вычислительное решение, позволяющее запускать коды только при наличии события.
  Это...
date: 2023-11-11T23:37:49.181Z
image: >-
  ../../assets/images/kak-sozdatь-azure-function-app-s-webhook-dlya-otpravki-soobsheniya-s-vashim-imenem-Nov-12-2023.avif
categories:
  - Как закодить
author: Igor Gorlov
tags:
  - Azure Function App
  - Event driven
  - Webhooks
draft: false
type: blog
slug: >-
  kak-sozdatь-azure-function-app-s-webhook-dlya-otpravki-soobsheniya-s-vashim-imenem
lastmod: 2024-03-20T21:26:48.221Z
---

Azure Function App - это архитектура, управляемая событиями, бессерверное вычислительное решение, позволяющее запускать коды только при наличии события. Это позволяет сократить операционные расходы на управление бизнесом.
С помощью функционального приложения можно организовать функции в логические блоки для упрощения управления ресурсами, развертывания, масштабирования и совместного использования.

Чтобы создать функциональное приложение Azure с Webhook для отправки сообщения “Hello” с вашим именем, выполните следующие действия:

## Войдите в Azure Portal и найдите Function App в поле Search.

![](https://res.cloudinary.com/practicaldev/image/fetch/s--7_I9iIRz--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/2j22o75b2h6r33k3pq8g.png)

![](https://res.cloudinary.com/practicaldev/image/fetch/s--bKQrGGkU--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/p140ftk3o0fdszbeu1la.png)

## Нажмите кнопку Создать

![](https://res.cloudinary.com/practicaldev/image/fetch/s--MunT0ql4--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/5fhg18okl4o021d6lzi6.png)

![](https://res.cloudinary.com/practicaldev/image/fetch/s--Q_UtpeuK--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/aj2p76gxu532o2zwttf3.png)

## Заполнить реквизиты в разделе ”Детали проекта":

Subscription: Выберите подходящую подписку. Здесь я буду использовать Azure Pass Sponsorship
Resource Group (Группа ресурсов): Вы можете выбрать любую из существующих групп ресурсов, которую хотите использовать, или просто создать новую и назвать ее. У меня есть существующая группа AprilWorkload

![](https://res.cloudinary.com/practicaldev/image/fetch/s--vsDNkNYh--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/9gzb6q85tzixb8inzj22.png)

## Заполните данные об экземпляре следующим образом:

- Function App Name: Я назову его Yemifunction (Вы можете использовать любое имя по своему усмотрению) и заполните остальные поля следующим образом
- Вы хотите развернуть код или образ контейнера? Код
- Стек времени выполнения: .NET
- Версия: 6
- Регион: Восток США
- Операционная система: Windows
- Варианты хостинга и планы: Потребление (услуги)

![](https://res.cloudinary.com/practicaldev/image/fetch/s--QqWcWF-Z--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/29bitysrkgmstuzb9z3h.png)

![](https://res.cloudinary.com/practicaldev/image/fetch/s--BO1cbcF4--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/43kdrmtzp1fzo9otcdpx.png)

## Нажмите на кнопку Просмотр и создание

![](https://res.cloudinary.com/practicaldev/image/fetch/s--O8Rqc9Jj--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/5ddxob682grvozslpdt5.png)

## Нажмите кнопку создания и дождитесь завершения процесса развертывания

![](https://res.cloudinary.com/practicaldev/image/fetch/s--PP0UgBmf--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/75xssgzmfvs29igj82nd.png)

![](https://res.cloudinary.com/practicaldev/image/fetch/s--VDn6o0RF--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/3ytlf7k6xvd1mgknrqzc.png)

## Перейдите в раздел Ресурсы и нажмите на кнопку Функция

![](https://res.cloudinary.com/practicaldev/image/fetch/s--eNshGUHd--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/f2fp42w92dpzalysezz6.png)

![](https://res.cloudinary.com/practicaldev/image/fetch/s--xXJfq0d7--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/w5p8mwox2k1ny68noztr.png)

## Нажмите кнопку Создать

![](https://res.cloudinary.com/practicaldev/image/fetch/s---aXhVt6h--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/bn5v1pkdzz3snyszvvse.png)

## Прокрутите вниз, чтобы выбрать шаблон для выбора триггера.

Здесь я выберу HTTP-триггер, который представляет собой триггер, тестируемый в веб-браузере

![](https://res.cloudinary.com/practicaldev/image/fetch/s--HsJWXSmA--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/98qz1d118y0gykrp0ws7.png)

Прокрутите вниз до пункта New function Name (Имя новой функции). Я оставлю это значение по умолчанию, т.е. HTTP Trigger 1

![](https://res.cloudinary.com/practicaldev/image/fetch/s--q8bq8CJ4--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/votif5f5kj2gcqcj0y8s.png)

Нажмите кнопку Создать

![](https://res.cloudinary.com/practicaldev/image/fetch/s--jtQWMC_Y--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/bo6pr4ap50pz3k1o8fg7.png)

## Нажмите на кнопку “Code + Test” и прокрутите вниз появившееся окно, чтобы узнать, что требуется добавить в URL функции при копировании в браузер триггера.

![](https://res.cloudinary.com/practicaldev/image/fetch/s--08jfDqYQ--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/x9lnuryjvjgthxz4mem7.png)

Перейдите к строке 20, в ней указано, что именно Name необходимо добавить к URL функции при ее копировании в браузер.

![](https://res.cloudinary.com/practicaldev/image/fetch/s--6BNgTnM5--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/d2wcofx5snreerf5q55o.png)

## Перейдите в раздел Обзор и нажмите на кнопку Получить URL-адрес функции, после чего появится окно

![](https://res.cloudinary.com/practicaldev/image/fetch/s--7yk-rR6L--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/diu8n3zkyw51kcjvxjbb.png)

## Скопируйте URL-адрес функции и вставьте его в веб-браузер

![](https://res.cloudinary.com/practicaldev/image/fetch/s--iNdWcJaD--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/0abg5dng0fsxvazv2mzm.png)

Добавьте &name=Yemmy и нажмите клавишу Enter на клавиатуре (Вы можете выбрать любое имя).

![](https://res.cloudinary.com/practicaldev/image/fetch/s--b5t5pAO9--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/a4u7nugn45b8f4lcm2t3.png)

![](https://res.cloudinary.com/practicaldev/image/fetch/s--kKjLED_u--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/g34afr13q1pmz51lip1u.png)

Мы на месте! Появилось сообщение “Hello” с именем,
Hello Yemmy
