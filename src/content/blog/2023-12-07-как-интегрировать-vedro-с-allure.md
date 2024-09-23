---
title: Как интегрировать Vedro с Allure
meta_title: Как интегрировать Vedro с Allure - Фул Фронт Дев
description: >-
  В современной разработке программного обеспечения комплексный инструмент
  отчетности так же важен, как и сами тестовые примеры.
  [Allure](https://docs.qameta.io/
date: 2023-12-07T16:24:01.269Z
image: ../../assets/images/kak-yntehryrovat-vedro-s-allure-Dec-07-2023.avif
categories:
  - Как закодить
author: Igor Gorlov
tags:
  - Vedro
  - Allure
draft: false
translated: ''
translatedPosition: 0
type: blog
slug: kak-yntehryrovat-vedro-s-allure
lastmod: 2024-03-20T21:26:48.811Z
---

В современной разработке программного обеспечения комплексный инструмент отчетности так же важен, как и сами тестовые примеры. [Allure](https://docs.qameta.io/allure/) стал очень гибким и проницательным инструментом для создания отчетов, который позволяет получить подробное представление о том, что было протестировано и что требует дальнейшего внимания. Если вы используете [Vedro](https://vedro.io/), прагматичный фреймворк для тестирования, его интеграция с Allure может значительно расширить ваши возможности по созданию тестовых отчетов.

## [](https://dev.to/mickeystreicher/how-to-integrate-vedro-with-allure-3jkb#laying-the-groundwork)Закладывая основу

Прежде чем приступить к интеграции, убедитесь, что у вас установлен Vedro:

```bash
pip install vedro
```

Рассмотрим следующий простой сценарий Vedro, который тестирует получение репозиториев для пользователя GitHub:

```py
импорт vedro
импорт httpx

class Scenario(vedro.Scenario):
    subject = "retrieve user repos"

    def given_user(self):
        self.user = "gvanrossum"

    def when_guest_retrieves_repos(self):
        self.response = httpx.get(f "https://api.github.com/users/{self.user}/repos")

    def then_it_should_return_a_successful_response(self):
        assert self.response.status_code == 200
```

Далее давайте интегрируем это с Allure.

## [](https://dev.to/mickeystreicher/how-to-integrate-vedro-with-allure-3jkb#step-1-install-the-allure-plugin-for-vedro)Шаг 1: Установите плагин Allure для Vedro

Чтобы начать работу с Allure в Vedro, сначала установите плагин [Allure Reporter](https://pypi.org/project/vedro-allure-reporter/):

```bash
vedro plugin install vedro-allure-reporter
```

## [](https://dev.to/mickeystreicher/how-to-integrate-vedro-with-allure-3jkb#step-2-execute-tests-and-generate-report-data)Шаг 2: Выполнение тестов и генерация данных отчета

После установки плагина вы можете выполнять тесты и генерировать данные отчетов Allure:

```bash
vedro run -r rich allure
```

По умолчанию эта команда сохраняет данные отчета в каталоге `./allure_reports`. Чтобы указать другой каталог, используйте:

```bash
vedro run -r rich allure --allure-report-dir ./custom_allure_reports
```

## [](https://dev.to/mickeystreicher/how-to-integrate-vedro-with-allure-3jkb#step-3-visualize-the-report-with-the-allure-cli)Шаг 3: Визуализация отчета с помощью Allure CLI

Чтобы просмотреть отчет, сначала нужно установить инструмент командной строки Allure. Следуйте инструкциям по установке, приведенным в [официальном руководстве Allure](https://docs.qameta.io/allure/#_installing_a_commandline).

После установки Allure CLI откройте отчет:

```bash
allure serve ./allure_reports
```

Эта команда сгенерирует и откроет отчет в веб-браузере по умолчанию, обеспечив наглядное и интерактивное представление результатов тестирования.

[![AllureScreenshot](https://res.cloudinary.com/practicaldev/image/fetch/s--bV9Lkaww--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ygaj7sek4a7kfa4ow941.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--bV9Lkaww--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ygaj7sek4a7kfa4ow941.png)

## [](https://dev.to/mickeystreicher/how-to-integrate-vedro-with-allure-3jkb#enhance-reports-through-categorization-and-labeling)Улучшение отчетов за счет категоризации и маркировки

Чтобы улучшить визуализацию и понимание отчетов, подумайте о маркировке тестов. Например, пометьте ранее определенный сценарий, чтобы отнести его к категории ”Тестирование API GitHub”:

```py
импорт vedro
из vedro_allure_reporter import allure_labels, Story, Epic, Feature

@allure_labels(Epic("GitHub API Testing"), Feature("User Repositories"))
class Scenario(vedro.Scenario):
    subject = "retrieve user repos"

    ...
```

Маркировка особенно полезна, когда у вас обширный набор тестов и вам нужно отфильтровать или сгруппировать тесты. Например, чтобы запустить тесты, помеченные под определенной эпопеей, используйте:

```bash
vedro run --allure-labels epic="GitHub API Testing"
```

Таким образом, интеграция Vedro с Allure не только улучшает рабочий процесс тестирования, но и предоставляет комплексную интерактивную отчетность, облегчая отслеживание, фильтрацию и понимание результатов тестирования.
