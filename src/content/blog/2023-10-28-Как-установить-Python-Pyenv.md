---
title: Как установить Python Pyenv
meta_title: |
  Как Установить Python Pyenv - Фул Фронт Дев
description: >
  Одним из самых сложных процессов при изучении Python для начинающих является
  установка Python. Иногда возникают проблемы с версиями, машина не
  распознает...
date: 2023-10-28T17:42:30.884Z
image: ../../assets/images/kak-ustanovitь-python-pyenv-Oct-28-2023.avif
categories:
  - Как закодить
author: Igor Gorlov
tags:
  - Python
  - Pyenv
draft: false
keywords:
  - Python Pyenv
type: blog
slug: kak-ustanovitь-python-pyenv
lastmod: 2024-03-20T21:26:47.785Z
---

Одним из самых сложных процессов при изучении Python для начинающих является установка Python. Иногда возникают проблемы с версиями, машина не распознает команды и так далее.

Я также столкнулся с подобными проблемами. Моим решением в тот момент была установка пакета Anaconda. Но так как размер пакета Anaconda слишком велик для моих потребностей, я почувствовал, что это избыточно.

После поиска в течение некоторого времени, я нашел решение этой проблемы, и решение заключается в использовании Pyenv.

## Что такое Pyenv?

Фактически, Pyenv - это инструмент, предназначенный для упрощения процесса установки и изменения версий Python. Он помогает разработчикам быстро устанавливать или менять версии Python без необходимости изменения всей системы.

В этой статье я покажу вам, как установить Pyenv и управлять версиями Python.

## Установка Homebrew

Если Homebrew еще не установлен на вашем компьютере, выполните следующую команду в терминале.

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

```

Это займет какое-то время. После завершения процесса установки, вы увидите сообщение, похожее на это.

!['Установка Homebrew'](https://res.cloudinary.com/practicaldev/image/fetch/s--qMQHrn-5--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/er8qhw3e034jrz8ukqpq.png)

Для следующего шага нам понадобится скопировать выделенный текст ниже и вставить его в терминал.

```bash
echo '# Set PATH, MANPATH, etc., for Homebrew.' >> /Users/fahminurfikri/.zprofile
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> /Users/fahminurfikri/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

После завершения процесса перезагрузите терминал, и Homebrew уже установлен на вашем компьютере.

## Установка PyEnv с использованием Homebrew

После установки Homebrew мы можем использовать его для установки Pyenv. Для этого выполните следующую команду:

```bash
brew install pyenv

```

После завершения процесса установки вы можете проверить его, используя команду pyenv versions в вашем терминале. Вывод будет выглядеть следующим образом.

![установка pyenv](https://res.cloudinary.com/practicaldev/image/fetch/s--qYvIjFkj--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/cu1fpwaoyhc9lt4owmfl.png)

Если вывод не содержит ошибок, мы можем продолжить установку Python. Чтобы увидеть доступные версии Python, вы можете использовать эту команду.

```bash
pyenv install --list
```

Например, я установлю Python 3.9.15. Поэтому команда будет выглядеть так.

```bash
pyenv install 3.9.15
```

Не волнуйтесь, если ваш терминал ничего не возвращает, процесс занимает некоторое время. Возможно, вы можете уйти на некоторое время, чтобы приготовить кофе или что-то в этом роде.

Если установка уже завершена, вы можете проверить, установлена ли версия Python. Вы можете использовать следующую команду:

```bash
pyenv versions
```

И результат будет выглядеть примерно так:

```bash
* system (set by /home/user/.pyenv/version)
  3.9.15
```

Звездочка (\*) означает, что система использует версию Python по умолчанию. Чтобы установить Python 3.9.15 в качестве версии Python по умолчанию, используйте следующую команду:

```bash
pyenv global 3.9.15
```

После этого проверьте версию Python.

```bash
python --version  # or python -V
```

Если версия Python - 3.9.15 или любая другая версия Python, которую вы устанавливали, то установка Python прошла успешно. Если вы хотите добавить другую версию Python, вы можете использовать команду pyenv install <version>, и если вы хотите изменить версию Python, вы можете просто использовать команду pyenv global <version>.
