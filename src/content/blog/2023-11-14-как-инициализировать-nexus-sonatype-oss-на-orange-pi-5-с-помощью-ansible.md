---
title: Как инициализировать Nexus Sonatype OSS на Orange PI 5 с помощью Ansible
meta_title: |
  Как Инициализировать Nexus Sonatype OSS На Orange PI 5 С...
description: >
  Nexus 3 OSS - это менеджер артефактов с открытым исходным кодом, который может
  работать с различными форматами, такими как образы контейнеров, Python PIP,...
date: 2023-11-13T22:51:43.564Z
image: >-
  ../../assets/images/kak-inicializirovatь-nexus-sonatype-oss-na-orange-pi-5-s-pomoshьyu-ansible-Nov-14-2023.avif
categories:
  - Как закодить
author: Igor Gorlov
tags:
  - Nexus Sonatype OSS
  - Orange PI 5
  - Ansible
draft: false
type: blog
slug: kak-inicializirovatь-nexus-sonatype-oss-na-orange-pi-5-s-pomoshьyu-ansible
keywords:
  - Nexus Sonatype OSS
lastmod: 2024-03-20T21:26:43.698Z
---

Nexus 3 OSS - это менеджер репозиториев артефактов с открытым исходным кодом, который может работать с различными форматами, такими как образы контейнеров, Python PIP, Java jar и многими другими.

Зачем нужен локальный менеджер артефактов? На это есть много причин:

- Используйте свою частную инфраструктуру: Возможно, у вас есть собственный код, который необходимо защитить.
- Более высокая скорость загрузки артефактов: Если вы постоянно загружаете одни и те же артефакты через Интернет, вы можете кэшировать их в центральном хранилище, что будет выгодно вашим многочисленным пользователям, работающим на нескольких серверах, за счет кэширования.
- Контролируйте, какие артефакты попадают в цепочку сборки: Централизовать расположение артефактов, убедиться в том, что они одобрены для использования, а также подтвердить, что они не содержат вредоносного кода.
- Разграничьте круг лиц, имеющих доступ к артефактам: Возможно, в вашей организации существуют более строгие требования к тому, кто может иметь доступ к тем или иным артефактам.

В этой статье я покажу, как можно загрузить, установить и настроить OSS-версию Nexus 3 с помощью плейбука Ansible.

Nexus 3 будет работать на компьютере Orange PI 5 с 8 ГБ оперативной памяти, но эта настройка может быть выполнена на любой машине с минимальными требованиями. Часть настройки будет заключаться в установке прокси для PyPI.org для машин, перечисленных в моем инвентарном файле.

## Что нужно для выполнения кода из этого учебника

- Подключение к Интернету для загрузки исходного кода модулей Ansible playbook, Nexus и PIP
- Две или более Linux-машины (я использовал Debian, Armbian и Fedora IOT), с не менее чем 8 ГБ оперативной памяти. В моем кластере используется смесь Raspberry PI 4 и OrangePI 5.
- Контроллер Ansible будет работать на машине Fedora, но в качестве контроллера может выступать любой сервер. Инструкции по установке Ansible просты и понятны.

## Организация Playbook

Я разделил задачи на группы, и получившийся playbook выглядит следующим образом:

```bash
[josevnz@dmaf5 Nexus3OnOrangePI]$ tree -N ansible/
ansible/
├── inventories
│   └── home
│       └── hosts.yaml
├── roles
│   ├── clients
│   │   ├── tasks
│   │   │   └── main.yaml
│   │   └── templates
│   │       └── pip.conf.j2
│   └── nexus
│       ├── files
│       │   └── swagger.json
│       ├── tasks
│       │   ├── download.yaml
│       │   ├── install.yaml
│       │   ├── main.yaml
│       │   ├── post_install.yaml
│       │   ├── pre_install.yaml
│       │   ├── repositories.yaml
│       │   ├── third_party.yaml
│       │   └── user.yaml
│       └── templates
│           ├── logrotate.nexus3.j2
│           ├── nexus3.service.j2
│           ├── nexus.rc.j2
│           └── nexus.vmoptions.j2
├── site.yaml
├── vars
│   ├── clients.yaml
│   └── nexus.yaml
└── vault
    ├── nexus_password.enc
    └── README.md

13 directories, 21 files

```

Теперь немного пояснений:

- Существует две роли: “nexus” и “clients”. Роль nexus используется для настройки программы управления артефактами, а роль client устанавливает настройки pip на каждой машине.
- Vars содержит переменные, используемые в каждой роли, разделенные по файлам, чтобы сделать их использование более понятным
- У нас есть пароли, и мы управляли ими с помощью функции Ansible vault.
- Файл ’ site.yaml’ Оркестрирует выполнение роли:

```yaml
- hosts: all
  tags: clients
  vars_files:
    - vars/clients.yaml
  roles:
    - clients
- hosts: nexus_server
  tags: nexus
  become_user: root
  become: true
  vars_files:
    - vars/nexus.yaml
  roles:
    - nexus
```

Теперь перейдем к рассмотрению вселенной, в которой будет выполняться игровой процесс.

## Инвентаризация хоста

В моем случае все довольно просто - у меня есть две основные группы: ”клиенты" и машина, на которой будет работать сам сервер Nexus 3:

```yaml
all:
  children:
    nexus_server:
      hosts:
        orangepi5.home:
    home_lab:
      hosts:
        dmaf5.home:
        raspberrypi.home:
        orangepi5.home:
```

Следующей важной задачей является загрузка и настройка Nexus 3.

## Как установить Nexus 3

Файл main.yaml описывает порядок и назначение каждой задачи установки для роли Nexus:

```yaml
# Tasks listed here are related to the remote Nexus 3 server
# Included tasks are called in order
---
- include_tasks: third_party.yaml
- include_tasks: pre_install.yaml
- include_tasks: download.yaml
- include_tasks: install.yaml
- include_tasks: post_install.yaml
- include_tasks: user.yaml
- include_tasks: repositories.yaml
```

Рассмотрим сначала то, что я люблю называть ”основными задачами":

- third_party.yaml: Здесь мы устанавливаем OpenJDK8 (Nexus 3 написан на Java) и logrotate, чтобы позаботиться о неактуальных журналах.
- pre_install.yaml: Здесь происходит много событий, например, создание необходимых директорий для nexus, выделение непривилегированного пользователя, который будет запускать процесс.
- download.yaml: Как видно из названия, мы получаем свежую версию ПО Nexus 3 OSS и убеждаемся, что она имеет правильную контрольную сумму. Мы не хотим устанавливать вредоносное ПО из Интернета.

Далее следуют задачи, относящиеся к группе ”индивидуальная установка":

- install.yaml: Распакуйте программное обеспечение, подготовьте блок systemd для его автоматического запуска, настройте параметры JVM для Nexus и разверните конфигурацию logrotate.
- post_install.yaml: Здесь происходят интересные события - программа устанавливается, и мы запускаем ее в первый раз. Мы также меняем пароль по умолчанию с помощью REST API, чтобы перейти к этапу настройки.
- user.yaml: Здесь мы готовимся предоставить нашим конечным пользователям соответствующий доступ к сервисам, предлагаемым Nexus. Для этого мы используем комбинацию REST-API и клиентского кода Ansible:

```yaml
# https://help.sonatype.com/repomanager3/installation-and-upgrades/post-install-checklist
# https://help.sonatype.com/repomanager3/integrations/rest-and-integration-api
---
- name: Enable anonymous user
  tags: anonymous
  ansible.builtin.uri:
    user: ''
    password: ''
    url: '/v1/security/anonymous'
    method: PUT
    body_format: raw
    status_code: [200, 202, 204]
    headers:
      Content-Type: application/json
    body: |-
      { "enabled" : true, "userId" : "anonymous", "realmName" : "NexusAuthorizingRealm" }
    force_basic_auth: true
    return_content: true
  any_errors_fatal: true
- name: Enable Docker security realm
  tags: docker_realm
  ansible.builtin.uri:
    user: ''
    password: ''
    url: '/v1/security/realms/active'
    method: PUT
    body_format: raw
    status_code: [200, 202, 204]
    headers:
      Content-Type: application/json
    body: |-
      [ "NexusAuthenticatingRealm", "NexusAuthorizingRealm", "DockerToken" ]
    force_basic_auth: true
    return_content: true
  any_errors_fatal: true
```

Логика работы проста: по использованию http-метода ‘PUT’ можно определить, что это операция модификации (то есть существующие роли и пользователи уже существуют). Обнаружение ошибок осуществляется путем получения HTTP-кодов, возвращаемых Nexus.

Следующий шаг - подготовка локального прокси-сервера PyPi. Эта задача состоит из нескольких этапов и будет подробно описана далее.

## Как настроить прокси-сервер PyPI на Nexus 3

Последним файлом роли Nexus 3 является ’ repositories.yaml’. В нем мы выполняем следующие шаги:

- Проверка того, был ли уже настроен прокси (операция GET или только чтение)
- Если его не существует, создайте новый (метод POST с полезной нагрузкой JSON с деталями для создания нового репозитория)

Обратите внимание, что в этом плейбуке нет возможности обновления настроек репозитория. Это можно сделать с помощью REST API, но я оставлю это на усмотрение читателя.

Задачи по подготовке прокси-сервера PyPi приведены ниже:

```yaml
# Create proxy for repositories
# https://help.sonatype.com/repomanager3/integrations/rest-and-integration-api
# PyPi: https://pip.pypa.io/en/stable/user_guide/
---
- name: Check if the PyPi proxy exists
  tags: pypi_proxy_exists
  ansible.builtin.uri:
    user: ''
    password: ''
    url: '/v1/repositories/pypi/proxy/python_proxy'
    method: GET
    body_format: raw
    status_code: [200, 202, 204, 404]
    headers:
      Content-Type: application/json
    force_basic_auth: true
    return_content: true
  any_errors_fatal: true
  register: python_local
- name: Create PyPI proxy
  tags: pypi_proxy_create
  ansible.builtin.uri:
    user: ''
    password: ''
    url: '/v1/repositories/pypi/proxy'
    method: POST
    body_format: raw
    status_code: [201]
    headers:
      Content-Type: application/json
    body: |-
      {
        "name": "python_proxy",
        "online": true,
        "storage": {
          "blobStoreName": "default",
          "strictContentTypeValidation": true
        },
        "proxy": {
          "remoteUrl": "https://pypi.org/",
          "contentMaxAge": -1,
          "metadataMaxAge": 1440
        },
        "negativeCache": {
          "enabled": true,
          "timeToLive": 1440
        },
        "httpClient": {
          "blocked": false,
          "autoBlock": true,
          "connection": {
            "retries": 0,
            "timeout": 60,
            "enableCircularRedirects": false,
            "enableCookies": true,
            "useTrustStore": false
          }
        }
      }
    force_basic_auth: true
    return_content: true
  any_errors_fatal: true
  when: python_local.status == 404
```

Мы почти достигли цели. Теперь нам нужно сообщить нашим клиентам PyPi, что для получения библиотек Python следует использовать наш локальный Nexus, а не прямой сайт PyPi.

## Как настроить клиентов

Роль клиента гораздо проще и требует только развертывания шаблона pip.conf с информацией, достаточной для принудительного поиска в нашем новом хранилище:

```yaml
# Tasks here are meant to be used on our clients user
---
- name: Create installation directory for pip.conf
  tags: pip_basedir
  ansible.builtin.file:
    state: directory
    path: ''
    owner: ''
    group: ''
    mode: 'u+rwx,go-rwx'
- name: Copy pip.conf file
  tags: pip_copy
  ansible.builtin.template:
    src: pip.conf.j2
    dest: '/pip.conf'
    owner: ''
    group: ''
    mode: u=rxw,g=r,o=r
```

Полученный файл разворачивается в ’~/.config/pip/pip.conf’ каждой машины:

```yaml
# https://pip.pypa.io/en/stable/topics/configuration/
[global]
timeout = 60
[install]
index = http://orangepi5.home:8081/repository/python_proxy/pypi
index-url = http://orangepi5.home:8081/repository/python_proxy/simple/
trusted-host = orangepi5.home

```

В приведенном выше файле показан пример того, как будет выглядеть окончательный вариант файла после развертывания на моем кластере (ваш будет отличаться от него разрешенным URL).

Настало время запустить весь игровой процесс и посмотреть, как он выглядит.

## Как запустить Playbook

Для запуска программы мы передаем несколько аргументов:

- Местонахождение инвентаризации нашего хоста
- расположение файла с зашифрованным паролем и мастер-файла, содержащего мастер-пароль для разблокирования содержимого защищенного файла
- И, наконец, расположение нашего основного файла playbook

```bash
cd ansible
ansible-playbook --inventory  inventories --extra-vars @vault/nexus_password.enc --vault-password-file $HOME/vault/ansible_vault_pass site.yaml
```

https://asciinema.org/a/579355

## Как протестировать новый прокси-сервер PyPI

Чтобы протестировать наш новый прокси, мы установим Python Rich с помощью pip и виртуального окружения.

```bash
josevnz@orangepi5:~$ python3 -m venv ~/virtualenv/rich
(rich) josevnz@orangepi5:~$ . ~/virtualenv/rich/bin/activate
(rich) josevnz@orangepi5:~$ pip install rich
Looking in indexes: http://orangepi5.home:8081/repository/python_proxy/simple/
Collecting rich
  Downloading http://orangepi5.home:8081/repository/python_proxy/packages/rich/13.3.4/rich-13.3.4-py3-none-any.whl (238 kB)
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 238.7/238.7 KB 14.8 MB/s eta 0:00:00
Collecting pygments<3.0.0,>=2.13.0
  Downloading http://orangepi5.home:8081/repository/python_proxy/packages/pygments/2.15.0/Pygments-2.15.0-py3-none-any.whl (1.1 MB)
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 1.1/1.1 MB 23.8 MB/s eta 0:00:00
Collecting markdown-it-py<3.0.0,>=2.2.0
  Downloading http://orangepi5.home:8081/repository/python_proxy/packages/markdown-it-py/2.2.0/markdown_it_py-2.2.0-py3-none-any.whl (84 kB)
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 84.5/84.5 KB 6.9 MB/s eta 0:00:00
Collecting mdurl~=0.1
  Downloading http://orangepi5.home:8081/repository/python_proxy/packages/mdurl/0.1.2/mdurl-0.1.2-py3-none-any.whl (10.0 kB)
Installing collected packages: pygments, mdurl, markdown-it-py, rich
Successfully installed markdown-it-py-2.2.0 mdurl-0.1.2 pygments-2.15.0 rich-13.3.4

```

А затем мы можем подтвердить, что кэш действительно был использован, увидев новые артефакты в новом хранилище:

![Новые артефакты в PyPI-репозитории Python_proxy](https://tutorials.kodegeek.com/Nexus3OnOrangePI/sonatype_browse_python_proxy.png)
См. артефакты PyPi

Давайте посмотрим демонстрацию клиента в действии, установив что-то другое:

https://asciinema.org/a/579357

## Дальнейшая настройка с использованием REST-API

Каждая установка Nexus позволяет загрузить JSON-файл, описывающий API, поддерживаемый сервером. Например, в моем сервере с сервера orangepi5.home можно получить такую копию:

```bash
curl --fail --remote-name http://orangepi5.home:8081/service/rest/swagger.json
```

Кроме того, пользовательский интерфейс позволяет попробовать другие конечные точки REST API для настройки установки.

![Документация по API Swagger на Nexus 3](https://tutorials.kodegeek.com/Nexus3OnOrangePI/api-swagger.png)
Тестирование REST API

## Заключение

Я рекомендую потратить некоторое время и прочитать книгу по Nexus 3, чтобы ознакомиться с возможностями, которые может предложить этот инструмент.

Сообщество подготовило инсталляторы [Debian и RPM](https://github.com/sonatype-nexus-community/nexus-repository-installer), если вам нужна именно такая настройка, а не использование Ansible.

Nexus 3 имеет множество настраиваемых параметров. Здесь мы рассмотрели только его поверхность. В процессе подготовки этой статьи я нашел репозиторий ThoTeam Nexus3-oss с очень полным и актуальным playbook, но он оказался гораздо сложнее того, что мне требовалось для домашней лаборатории.

[Archiva](https://archiva.apache.org/) - еще один менеджер артефактов с открытым исходным кодом, более ограниченный по функциональности, но и более простой в настройке.

Имеется [контрольный список](https://help.sonatype.com/repomanager3/installation-and-upgrades/post-install-checklist) после установки, содержащий некоторые задачи, которые мне не потребовалось выполнять для моей домашней лаборатории. Пожалуйста, ознакомьтесь с ним, чтобы убедиться, что ваша установка завершена.
