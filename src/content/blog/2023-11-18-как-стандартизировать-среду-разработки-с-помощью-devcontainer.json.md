---
title: Как стандартизировать среду разработки с помощью devcontainer.json
meta_title: Как стандартизировать среду разработки с помощью devcontainer.json
description: >
  Современные процессы разработки программного обеспечения сложны и включают в
  себя множество инструментов и зависимостей.
date: 2023-11-17T21:08:57.134Z
image: >-
  ../../assets/images/kak-standartizirovatь-sredu-razrabotki-s-pomoshьyu-devcontainer-json-Nov-18-2023.avif
categories:
  - Учебник
author: Igor Gorlov
tags:
  - devcontainer.json
draft: false
type: blog
slug: kak-standartizirovatь-sredu-razrabotki-s-pomoshьyu-devcontainer-json
lastmod: 2024-03-20T21:26:49.015Z
---

Современные процессы разработки программного обеспечения сложны и включают в себя множество инструментов и зависимостей.

При работе в команде нередко используется несколько различных программ, каждая из которых имеет свои зависимости. Это может быстро привести к путанице, поскольку каждая программа требует различных конфигураций и управления.

Одним из решений является использование виртуальных сред для изоляции зависимостей. При этом все равно может потребоваться установка и управление установкой и конфигурацией.

Но есть и другой, более выгодный вариант: упаковать все - включая базу данных и версию языка кодирования - в один контейнер, который можно использовать в любой момент. На самом деле большинство компаний развертывают свою логику и приложения в производственных контейнерах.

Для разработки можно использовать контейнер Docker в качестве полнофункциональной среды разработки. Он похож на производственную среду, но со всеми компиляторами, отладчиками, инструментами сборки, SDK, средствами повышения производительности и т.д. Это будет контейнер разработки или dev-контейнер.

Здесь `devcontainer.json` выступает в качестве стандарта, который упорядочивает и стандартизирует вашу среду разработки. Он позволяет сконцентрироваться на доставке изменений, а не беспокоиться о зависимостях и установках.

В этом руководстве вы узнаете о стандарте devcontainer.json, его назначении, настройке и использовании в личных или рабочих целях. Это поможет вам повысить производительность труда как инженера.

## Что такое Dev Container?

Контейнеры Dev, также известные как контейнеры разработки, представляют собой полноценную среду разработки, упакованную в контейнер, доступ к которому можно легко получить через выбранную вами IDE с помощью защищенной оболочки (SSH). Такая конфигурация позволяет устранить все препятствия, мешающие рабочему процессу, - от низкой производительности до недостаточной пропускной способности.

Контейнер может работать в различных инфраструктурах, включая частные и публичные облака, кластеры или локальные машины, и позволяет использовать аппаратное обеспечение, которое сложно воспроизвести своими силами.

Аспект изоляции также гарантирует, что ваши зависимости не будут пересекаться и нарушать работу локальной среды. Вся конфигурация контейнера хранится в стандартном файле `.devcontainer.json` от Microsoft, который служит инструкцией по упаковке для вашей среды.

![image-2](https://www.freecodecamp.org/news/content/images/2023/10/image-2.png)

Структура контейнера Dev Container. От: [containers.dev](https://containers.dev/overview)

В файле используется структурированный формат метаданных JSON with Comments (jsonc), который можно адаптировать под свои нужды. Например, можно добавить инструменты разработчика, такие как git, отладчик, и другие конфигурации, например, различные расширения.

### Где это можно использовать?

Простейшая настройка может заключаться в создании базовой контейнерной среды с языком для экспериментов с различными возможностями. Например, если вы хотите протестировать новую версию языка программирования, вы можете использовать базовый образ этого языка и легко создать новую среду разработки.

Есть несколько вариантов использования и для сложных конфигураций. Например, одной из самых сложных задач часто является создание и настройка базы данных для бесперебойной работы с проектом в процессе настройки среды разработки.

Создав файл Docker compose, можно легко настроить создание базы данных и выставить переменные окружения для создания автономной среды. Такие оркестрованные многоконтейнерные установки (с базой данных и языком программирования) устанавливаются в виде отношений ”родитель-ребенок" и могут использоваться в сложных случаях.

В качестве примера можно привести приведенную ниже конфигурацию, в которой для подключения пространства сборки используется Compose:

```json
{
	"name": "Python 3 & PostgreSQL",
	"dockerComposeFile": "docker-compose.yml",
	"service": "app",
	"workspaceFolder": "/workspaces/${localWorkspaceFolderBasename}"
}
```

В этом примере Dev-контейнер использует файл Docker Compose и ссылается на инструкции для создания интегрированного рабочего пространства Python и PostgreSQL. Такая структура может помочь разрабатывать CRUD-приложения, не пытаясь настроить базу данных и конфигурацию системы для ее поддержки каждым разработчиком.

## Проблемы, которые решают контейнеры Dev

Благодаря таким возможностям dev-контейнеры становятся все более популярными в личных и рабочих целях, поскольку они обеспечивают воспроизводимость и изоляцию. Давайте рассмотрим все их преимущества:

### Решение проблем с настройкой конфигурации

Поддержание и управление локальными средами может быть очень трудоемким. Часто приходится использовать различные инструменты и конфигурации, что делает этот процесс громоздким. Стандартизация этого процесса позволяет сэкономить массу времени.

### Стандартизация инструкций по сборке проекта

Написание документации по обновлению и изменению зависимостей может оказаться сложной задачей. Лучшим подходом было бы использование кода для упрощения процесса, что позволило бы любому пользователю поставлять продукт, не заморачиваясь документацией или тем, что ”это работает на моей машине".

### Обеспечение изоляции сред разработки

Разработчик программного обеспечения может одновременно работать над различными проектами с множеством подвижных частей. А что если изолировать среды, предотвращая конфликты с другим программным обеспечением на хост-системе и обеспечивая чистую, контролируемую среду для разработки? Теперь это возможно :)

### Обеспечение согласованности действий команд разработчиков

Достижение переносимости в нескольких командах и отдельных разработчиках осложняется различиями в технологиях и конфигурациях. Стандартизованная среда разработки может обеспечить единую конфигурацию для всех членов команды, уменьшая при этом несоответствия, вызванные различиями в работе отдельных машин.

### Упрощение процессов внедрения и обучения

Изучение новых вещей очень важно, но может быть сложным. Что может быть лучше для обучения, чем отработка нового языка или фреймворка? Быстрый запуск изолированных сред помогает поддерживать чистоту машин.

Это особенно актуально при представлении докладов или проведении семинаров. Начиная с чистого листа, каждый может следовать за ним, не запутавшись в отсутствующих инструментах и не запутавшись в середине шага.

## Как создать первый контейнер Devcontainer

Теперь, когда вы знаете обо всех преимуществах, я помогу вам создать ваш первый контейнер разработки. Поскольку это вводное руководство, вы узнаете, как это сделать для базовой среды Go.

После того как вы разберетесь с основами, вы сможете расширить свою конфигурацию до более сложных, включающих базы данных, дополнительные инструменты разработчика и кастомизацию. Давайте приступим к созданию такой конфигурации!

### Предварительные условия

Вот необходимые условия для создания шаблона:

1. Инструменты для запуска Dev Container: [Docker](https://www.docker.com/) или любой другой контейнерный движок.
2. Средства для создания шаблонов и подключения к Dev Container: [Visual Studio Code](https://code.visualstudio.com/)
3. Средства для управления логикой подключения и создания: [Расширение Visual Studio Code Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

Примечание: После создания шаблона вы можете переключиться на предпочитаемую вами IDE с различными бэкендами, как мы увидим в последующих разделах. Просто считайте, что файл `.devcontainer.json` является источником истины для среды и может быть легко распространен.

### Как создать простой dev-контейнер

Вы можете либо создать dev-контейнер с нуля, либо воспользоваться утилитой VSCode. Начать работу с утилитой очень просто. Чтобы настроить dev-контейнер, достаточно воспользоваться опцией `Dev Containers: Add Dev Container Configuration Files...` из палитры команд `(Ctrl+Shift+P)`:

![KcLU2UhZfNoxHiKs9wdUBeEVrJGvOviHYrNXlWgqdSq8D1afGSzr_TCnrmwsuTgH4Zm58e_MomNp3i_4LRKnxC6ppJ4v-p2A_mvokmVnk1JSJg_f7hsuZY9cTpn-UjY2gHjdWxA696Fy-bgFnlWheOg](https://lh3.googleusercontent.com/KcLU2UhZfNoxHiKs9wdUBeEVrJGvOviHYrNXlWgqdSq8D1afGSzr_TCnrmwsuTgH4Zm58e_MomNp3i_4LRKnxC6ppJ4v-p2A_mvokmVnk1JSJg_f7hsuZY9cTpn-UjY2gHjdWxA696Fy-bgFnlWheOg)

Пример конфигурации для Dev-контейнеров из палитры команд VSCode

Переходим к следующему шагу - выбору базового образа. Вы можете выбрать любой базовый образ, который вам нравится. В данном случае мы используем базовый образ Go.

![sgFvvnhlbN_nt8eQpk19ZGlWxZ5Dk3TK-nAXAZAdGw314fHKKEz5RkG8WXyxCKRO5x9VHyjtuyNH_-q7Vev2Ue4bszdKm8uACtAnFPFDPZmJiM0zMYZAQazLzvJJaRN4u1A8ItAnwODEOYwaCwjONa4](https://lh5.googleusercontent.com/sgFvvnhlbN_nt8eQpk19ZGlWxZ5Dk3TK-nAXAZAdGw314fHKKEz5RkG8WXyxCKRO5x9VHyjtuyNH_-q7Vev2Ue4bszdKm8uACtAnFPFDPZmJiM0zMYZAQazLzvJJaRN4u1A8ItAnwODEOYwaCwjONa4)

Конфигурация базового контейнера Dev

Однако версий Go может быть очень много, поэтому следующим шагом будет выбор нужной. Последняя доступная версия - `1.21`, поэтому я рекомендую использовать именно ее. Но при желании можно создать образ с нуля или даже выбрать одну из более ранних версий.

Просто прокрутите страницу вниз и сделайте свой выбор.

![Hkg2vqYKxnuBn6A31LrVvETkND4_S0JUsIHqStVzZaKZz-1LtVnKZEAAdtA_BfX2CvHIW6e9-P8PPQObb3B1b2C3SrYjmSWw_st8Wm2ihbuU0efRfHMLy9ynjbnaulrY0aEsNAHw1Fb21NS_lhKzEWk](https://lh5.googleusercontent.com/Hkg2vqYKxnuBn6A31LrVvETkND4_S0JUsIHqStVzZaKZz-1LtVnKZEAAdtA_BfX2CvHIW6e9-P8PPQObb3B1b2C3SrYjmSWw_st8Wm2ihbuU0efRfHMLy9ynjbnaulrY0aEsNAHw1Fb21NS_lhKzEWk)

Версия выбранного базового конфигурационного файла

Следующим шагом является импорт “Features”, которые представляют собой самостоятельные единицы инсталляционного кода, помогающие включить определенные инструменты или контейнеры в конфигурацию dev-контейнера. Эти возможности могут варьироваться от новых инструментов до специфических настроек, о которых вы можете узнать подробнее [здесь](https://containers.dev/features).

Но для базовой и простой среды Go мы пропустим этот шаг.

![YXO8ZA_kH95z7OMTkrYmLz8VMenqCdlyUFpDl2uoRfJdrtvSLFtH-QouD1gToeLrye8MDRFGzGDaQy3yhXujAiC43LKb-TvctMmxWbLqaSwde2U-XlVSdYgexohqkp5Ho_ft7UgkqkPBvvrDx6eN8Fg](https://lh4.googleusercontent.com/YXO8ZA_kH95z7OMTkrYmLz8VMenqCdlyUFpDl2uoRfJdrtvSLFtH-QouD1gToeLrye8MDRFGzGDaQy3yhXujAiC43LKb-TvctMmxWbLqaSwde2U-XlVSdYgexohqkp5Ho_ft7UgkqkPBvrDx6eN8Fg)

Дополнительные функции, позволяющие расширить рабочее пространство

Нажмите кнопку `Ok`, чтобы сгенерировать базовый Go-файл `.devcontainer.json` в каталоге `.devcontainer`:

```bash
~/Code/devcontainer-new main +4 !4 ❯ tree -a
.
├── .devcontainer
│ └── devcontainer.json
```

Поздравляем! Теперь у вас есть изолированная среда, которую можно использовать совместно с кем угодно.

### Как использовать VSCode для настройки dev-контейнера

Для запуска этой конфигурации можно нажать на кнопку `Reopen in Container`, как показано ниже:

![Ndj5FXh3EE09Ab_srEQH7lSQ35yDfQwLWBeJPQQMmx_JDZPVnQOZsCH-jZdTJ_ZXOfTRyc95fzhBPmPSZefUs7O3pT19xi3-FRcxlvtSBsMx5JHNN3hR6jCwPHAz_2BTr-oTzqjp9E4YvHiRAehVlUg](https://lh5.googleusercontent.com/Ndj5FXh3EE09Ab_srEQH7lSQ35yDfQwLWBeJPQQMmx_JDZPVnQOZsCH-jZdTJ_ZXOfTRyc95fzhBPmPSZefUs7O3pT19xi3-FRcxlvtSBsMx5JHNN3hR6jCwPHAz_2BTr-oTzqjp9E4YvHiRAehVlUg)

Пример файла Dev Container с Go 1.21

Расширение извлечет образ ”_mcr.microsoft.com/devcontainers/go:1-1.21-bullseye_” и создаст в нем SSH-сервер.

![NKkI-1yuc-HjQ53zmc2EfxT4zPbjSRf9r7uXSt3IVm2w7WeCLT5v9wwUJPdzIPO_0VT4tluONMOJowZeeQCa2iEZudAPJ_e2H9rchPVfFI5LkspnfT4uTAhU2LwcAangC1EXF0ff1mli5c4nYQyFMYk](https://lh5.googleusercontent.com/NKkI-1yuc-HjQ53zmc2EfxT4zPbjSRf9r7uXSt3IVm2w7WeCLT5v9wwUJPdzIPO_0VT4tluONMOJowZeeQCa2iEZudAPJ_e2H9rchPVfFI5LkspnfT4uTAhU2LwcAangC1EXF0ff1mli5c4nYQyFMYk)

Запуск Dev-контейнера

После успешной сборки Go-версии можно смело входить в среду по SSH и выполнять операции. Вы увидите, что версия Go совпадает с той, которую вы собрали, а подключение происходит из вашего Dev-контейнера, что делает подключение успешным:

![wbxcN6fkTVxkVkn0UftnN2IsdZK79NJ32vSiLTCSlcJrX2woQjZvSjiIYl1Ynoxuil1GDPZ7SZkxYrjzEYWYCZG-Wcq6rEt7rbtB0oJujz8IZJcc5WwYYhGEZtZsXJz4gNEeJVFV8bx0MRKfzE5DP7g](https://lh4.googleusercontent.com/wbxcN6fkTVxkVkn0UftnN2IsdZK79NJ32vSiLTCSlcJrX2woQjZvSjiIYl1Ynoxuil1GDPZ7SZkxYrjzEYWYCZG-Wcq6rEt7rbtB0oJujz8IZJcc5WwYYhGEZtZsXJz4gNEeJVFV8bx0MRKfzE5DP7g)

Dev-контейнер, работающий локально

### Dev Container CLI

[Devcontainers CLI](https://github.com/devcontainers/cli) - это интерфейс командной строки, который помогает выполнять, собирать и запускать контейнер из конфигурации devcontainer.

С помощью этого инструмента можно настроить окружение без использования VSCode, а затем подключиться к нему вручную через SSH, что дает больше свободы.

Несмотря на то, что инструмент интересен, многие функции еще не запущены, как показано ниже:

![YT7slbodThp_21lmmxyzafvWP7atDEn_6lrGTotxdWsF9idTfob0nnu_517dLHizjv9tEeehkzASWF1pPrQehYPf05tSDNDZONUajVhsEGsV93vofapIhZFG9V-v3afR1Qb6Oa-Axk8ZZk6wC1CErx0](https://lh4.googleusercontent.com/YT7slbodThp_21lmmxyzafvWP7atDEn_6lrGTotxdWsF9idTfob0nnu_517dLHizjv9tEeehkzASWF1pPrQehYPf05tSDNDZONUajVhsEGsV93vofapIhZFG9V-v3afR1Qb6Oa-Axk8ZZk6wC1CErx0)

Дорожная карта функций

## Как использовать контейнеры Dev в полной мере

После того как вы распространите `devcontainer.json` среди своих коллег, они смогут легко использовать его для запуска локальных окружений с указанными преимуществами. Но что делать, если вам нужно помочь им запустить среду в облаке, чтобы использовать его мощное оборудование?

Есть несколько вариантов, которые могут вам помочь. Первый из них - [GitHub Codespaces](https://github.com/codespaces), который помогает запустить среду на инфраструктуре, управляемой GitHub в Azure.

Однако может возникнуть необходимость в использовании выделенного оборудования из кластера Kubernetes, частного или публичного облака. Как это сделать? Можно использовать клиентские инструменты с открытым исходным кодом, например [DevPod](https://devpod.sh/), которые помогают развернуть систему на нужной инфраструктуре.

![_nKg6h4V7em9ZORxwFUVuWpgWxAmRLSfv2lWWm6JpSoJBDXDw56bjNfBhmxWtnpb8kGAgbvkZTn4kOo4oouV2vU7ypm-m5H1H9OROlaWESPtJ4SskfXwxSz3n9rO0LA7DgU98EvKaJ0H0CZ4wooSPww](https://lh5.googleusercontent.com/_nKg6h4V7em9ZORxwFUVuWpgWxAmRLSfv2lWWm6JpSoJBDXDw56bjNfBhmxWtnpb8kGAgbvkZTn4kOo4oouV2vU7ypm-m5H1H9OROlaWESPtJ4SskfXwxSz3n9rO0LA7DgU98EvKaJ0H0CZ4wooSPww)

Пользовательский интерфейс DevPod

В настоящее время инструмент имеет более [4,4 тыс. звезд](<https://www.freecodecamp.org/news/p/43b21e57-00ca-4850-9a0f-95ebce575227/(%E2%80%8B%E2%80%8Bhttps://github.com/loft-sh/devpod)>) и стремительно развивается, с каждым днем набирая все большую популярность, под девизом \`**Даем власть пользователю. Любая инфраструктура, любая IDE, и без единого мнения**\`:

![image-4](https://www.freecodecamp.org/news/content/images/2023/10/image-4.png)

История роста GitHub - DevPod

Инструмент является неописуемым, что означает возможность его беспрепятственного использования в различных инфраструктурах, IDE и языках программирования.

Например, если вам нужен определенный бэкенд на облачном провайдере, вы можете сделать это с помощью уже имеющихся провайдеров, а можете [создать свой собственный, как 7 провайдеров сообщества] (https://devpod.sh/docs/developing-providers/quickstart):

![4WvTAJUH_qOmcuGSyDQnGKf4ZDpjQ7um2SwhUAfhaFTPSK5SMwUY0TV1JuSrYXKyyUl7fQvOONHbem1puJ6ohxYn2n_1tCnrHobieQRjlkZ_FupqBobTnD8s3z0nPaVuh2CWsWHygqO27Aatas25R_c](https://lh3.googleusercontent.com/4WvTAJUH_qOmcuGSyDQnGKf4ZDpjQ7um2SwhUAfhaFTPSK5SMwUY0TV1JuSrYXKyyUl7fQvOONHbem1puJ6ohxYn2n_1tCnrHobieQRjlkZ_FupqBobTnD8s3z0nPaVuh2CWsWHygqO27Aatas25R_c)

Провайдеры DevPod

Инструмент также позволяет создать согласованную среду разработки, которую можно многократно использовать в любом месте и подключать к любому редактору кода/IDE, начиная от JetBrains, Jupyter и заканчивая VSCode.

## Как запустить среду разработки с помощью DevPod

Этот инструмент имеет как настольную, так и CLI-версию, поэтому вы можете использовать ту, которая вам больше подходит. При использовании DevPod Desktop для создания среды процесс выглядит следующим образом:

Шаг 1. Установите DevPod из [официальной инструкции](https://devpod.sh/docs/getting-started/install).

Шаг 2: Добавьте провайдера через меню ‘Providers’ &gt; ’+ Add’. Выберите провайдера и выберите ‘Continue’.

![CfrbpPmbH6X4H3SWDLVbc0ujGBakXbGKIauhv-YJ7nNQY6ISnhpU9cJqDzVjR6ylwBvaQ88bbUQSLMKaDG1KKu1B9Ezz_1-nUiZ6fGfqDRuy4X0ju9NTK_gbZvwUgdF3GUEJBgz6pdbiKx9lXzOxfuk](https://lh4.googleusercontent.com/CfrbpPmbH6X4H3SWDLVbc0ujGBakXbGKIauhv-YJ7nNQY6ISnhpU9cJqDzVjR6ylwBvaQ88bbUQSLMKaDG1KKu1B9Ezz_1-nUiZ6fGfqDRuy4X0ju9NTK_gbZvwUgdF3GUEJBgz6pdbiKx9lXzOxfuk)

DevPod AWS Provider

Шаг 3: `Enter Workspace Source` с указанием пути к файлу `devcontainer.json`, который может быть удаленным или локальным репозиторием или образцом:

![B-ovwU1mYLxJu5_ANnbP_-dHKUOgMBa4hFiHUt2QEt6suJYGKV-I5M2YJ5wX714AFYNhzib0UOsMesL1t0XJzoordevJ4En91iVpDDzNcIRcHZrsme7qWwB7BzemNzMyPzppy6I0iRGlOn-9YY8ZYgI](https://lh4.googleusercontent.com/B-ovwU1mYLxJu5_ANnbP_-dHKUOgMBa4hFiHUt2QEt6suJYGKV-I5M2YJ5wX714AFYNhzib0UOsMesL1t0XJzoordevJ4En91iVpDDzNcIRcHZrsme7qWwB7BzemNzMyPzppy6I0iRGlOn-9YY8ZYgI)

Выбор IDE и провайдера

Шаг 4: Выберите IDE по умолчанию и нажмите кнопку `Create Workspace`:

![-etuLcx-G3VOHAwbNoPdcO9PWPiNu-KF3Z6NR0qq3vji5o7FCeDoJqywprmKo7yOmAlv4FV-JrRbopfXEjmK_CqyF0EmPT1zo8xZkfGmj7b0wz-chmyZgACh7Tz2qLxe1TJ2lcs6FJ1wAV0Jpih976s](https://lh3.googleusercontent.com/-etuLcx-G3VOHAwbNoPdcO9PWPiNu-KF3Z6NR0qq3vji5o7FCeDoJqywprmKo7yOmAlv4FV-JrRbopfXEjmK_CqyF0EmPT1zo8xZkfGmj7b0wz-chmyZgACh7Tz2qLxe1TJ2lcs6FJ1wAV0Jpih976s)

Создать рабочее пространство

Теперь можно собрать и настроить приложение на работающем экземпляре:

![FWJpNnACbxTFA3BDD162oIploPPdBUQgYuaNu6dvoqAJEadvdUf5Ep5v_dMBEShFfj6lll085xLxVPpH-bte5tHLX8q2av42JDol9K_i3fnel5LuNR8GVYqHocHIsfFOMtPs1td_XvcWQJksiycanNA](https://lh3.googleusercontent.com/FWJpNnACbxTFA3BDD162oIploPPdBUQgYuaNu6dvoqAJEadvdUf5Ep5v_dMBEShFfj6lll085xLxVPpH-bte5tHLX8q2av42JDol9K_i3fnel5LuNR8GVYqHocHIsfFOMtPs1td_XvcWQJksiycanNA)

Контейнер Dev, запущенный на локальной машине

Поздравляем! Вы успешно установили свой первый Dev-контейнер 🎉.

Если вы чувствуете себя авантюристом и хотите изучить CLI, вы можете узнать больше о том, как использовать его прямо [здесь](https://devpod.sh/docs/developing-in-workspaces/connect-to-a-workspace).

## Заключительные мысли

Такие стандарты, как dev-контейнеры, помогают повысить производительность и улучшить экосистему разработки в целом. Это снижает затраты компаний, поскольку можно предоставить новейшее оборудование, не требуя от всей команды обновлять локальные машины каждые два года.

Кроме того, это помогает без труда вводить в штат новых сотрудников и поддерживать постоянный пользовательский опыт.

Контейнерные средства разработки, такие как DevPod, позволяют повысить уровень безопасности и кастомизации для удовлетворения различных потребностей на любой инфраструктуре при сохранении единого [DevEx](https://loft.sh/blog/why-every-software-team-should-have-a-developer-experience-owner-dxo/). Это позволяет ускорить создание и тестирование с использованием новейшего оборудования и заменить время, затрачиваемое на внедрение, временем разработки.
