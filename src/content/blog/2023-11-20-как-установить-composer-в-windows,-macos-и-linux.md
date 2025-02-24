---
title: 'Как установить Composer в Windows, macOS и Linux'
meta_title: 'Как установить Composer в Windows, macOS и Linux -  Фул Фронт Дев'
description: >-
  Если вы знакомы с языком программирования PHP, то наверняка использовали
  библиотеки [PHP](https://kinsta.com/knowledgebase/whatisphp/) для упрощения и
  облегч
date: 2023-11-19T23:20:19.445Z
image: >-
  ../../assets/images/kak-ustanovitь-composer-v-windows-macos-i-linux-Nov-20-2023.avif
categories:
  - Как закодить
author: Igor Gorlov
tags:
  - Composer
  - Php
draft: false
type: blog
slug: kak-ustanovitь-composer-v-windows-macos-i-linux
lastmod: 2024-03-20T21:26:44.300Z
---

Если вы знакомы с языком программирования PHP, то наверняка использовали библиотеки [PHP](https://kinsta.com/knowledgebase/what-is-php/) для упрощения и облегчения работы с кодом. Composer - это полезный инструмент с открытым исходным кодом, который любой разработчик может использовать для управления этими зависимостями и библиотеками. Многие известные фреймворки, такие как [Laravel](https://kinsta.com/knowledgebase/install-laravel/) и [Drupal](https://kinsta.com/blog/wordpress-vs-drupal/), имеют процессы разработки, которые начинаются с установки Composer.

Вот как добавить Composer в среду разработки под Windows, Linux и macOS, а также как развернуть PHP-приложение на базе Composer на хостинговой платформе, например на платформе Kinsta.

## Что такое Composer?[](https://kinsta.com/blog/install-composer/#what-is-composer)

[Composer](https://getcomposer.org/) отвечает за управление библиотеками на основе каждого проекта. Он может быть установлен непосредственно в каталог проекта, либо может быть установлен глобально и доступен из любой точки системы. Он позволяет объявить библиотеки, от которых зависит код. Кроме того, он определяет версию необходимых пакетов и устанавливает их за вас.

Требования каждого проекта объявляются в JSON-файле (с именем **composer.json**), что позволяет Composer оценить, какая версия пакета лучше всего подходит для зависимости от приложения. Это позволяет оптимизировать процесс разработки, то есть разработчик может посвятить больше времени созданию и совершенствованию основного приложения.

## Инструкции по установке Composer[](https://kinsta.com/blog/install-composer/#composer-installation-instructions)

Для работы с Composer необходимо [установить PHP](https://kinsta.com/blog/install-php/) на вашу систему.

В зависимости от используемой системы, существуют различные варианты установки Composer, каждый из которых включает в себя несколько различных шагов. В следующих разделах описана установка Composer на следующие операционные системы:

- Linux
- Windows
- macOS

### Установка Composer в Linux[](https://kinsta.com/blog/install-composer/#installing-composer-on-linux)

В Linux Composer может быть установлен с помощью терминала. В данном руководстве в качестве примера используется [Ubuntu](https://kinsta.com/knowledgebase/check-ubuntu-version/). Если вы используете другой дистрибутив Linux, то следуйте инструкциям по загрузке Composer, приведенным на сайте этого дистрибутива.

Чтобы установить Composer на Ubuntu, сначала загрузите Composer с ее сайта:

```bash
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
```

Теперь можно приступать к локальной или глобальной установке Composer на вашу систему.

Для локальной установки выполните следующую команду:

```bash
php composer-setup.php
```

Установив Composer локально, вы можете убедиться, что PHP-проект совместим с установленной версией Composer. Это поможет избежать проблем с совместимостью и обеспечит бесперебойную работу PHP-проекта на такой хостинговой платформе, как Kinsta.

В качестве альтернативы можно воспользоваться следующими командами для глобальной установки Composer, что позволит запускать менеджер зависимостей в любом месте системы без указания полного пути:

```bash
php composer-setup.php --install-dir=/usr/local/bin --filename=composer
```

После завершения установки выбранным способом удалите программу установки с компьютера, выполнив следующие команды:

```bash
php -r "unlink('composer-setup.php');"
```

Наконец, выполните в терминале следующую команду, чтобы проверить, успешно ли установлен Composer:

```bash
composer
```

При запуске Composer без аргументов выводится справка по программе, начинающаяся примерно так:

![Скриншот отображения справки по программе Composer.](https://kinsta.com/wp-content/uploads/2023/09/composer-help-screen-after-install.png)

Пример отображения справки Composer.

### Установка Composer под Windows[](https://kinsta.com/blog/install-composer/#installing-composer-on-windows)

Установка Compose под Windows достаточно проста. Откройте браузер и перейдите на сайт [Composer](https://getcomposer.org/), затем нажмите кнопку **Getting Started**.

В оглавлении перейдите к разделу **Using the Installer** под заголовком **Installation - Windows**.

Щелкните на ссылке **Composer-Setup.exe**, чтобы загрузить программу установки:

![Программа установки Windows на сайте Composer.](https://kinsta.com/wp-content/uploads/2023/09/download-windows-composer-installer.png)

Нахождение программы установки Windows на официальном сайте Composer.

Запустите программу установки и следуйте инструкциям по установке Composer. После установки можно убедиться, что все работает, открыв командную строку и набрав следующее:

``bash
composer

```

Вы должны увидеть список доступных команд Composer, что означает успешную установку Composer под Windows.

### Установка Composer на macOS[](https://kinsta.com/blog/install-composer/#installing-composer-on-macos)

Установить Composer на macOS можно, открыв терминал и следуя приведенным ниже инструкциям.

Сначала загрузите программу установки Composer:

``bash
sudo php -r "copy('https://getcomposer.org/installer','composer-setup.php');"
```

Далее запустите программу установки для локальной установки:

``bash
php composer-setup.php

```

После установки удалите установочный файл:

``bash
php -r "unlink('composer-setup.php');"
```

Наконец, запустите Composer, чтобы проверить, правильно ли он был установлен:

``bash
composer

```

**Примечание:** Вы также можете установить Composer глобально, вручную указав каталог установки, который находится в вашем PATH:

``bash
php composer-setup.php --install-dir=/usr/local/bin --filename=composer
```

## Развертывание приложений на базе Composer на Kinsta[](https://kinsta.com/blog/install-composer/#deploying-composerbased-applications-on-kinsta)

Сервис [Application Hosting](https://kinsta.com/application-hosting/) компании Kinsta может развернуть ваш PHP-проект с выбранного вами Git-провайдера ([Bitbucket](https://kinsta.com/docs/granting-kinsta-access-to-bitbucket/), [GitHub](https://kinsta.com/docs/authorizing-kinsta-on-github/) или [GitLab](https://kinsta.com/docs/authorizing-kinsta-on-gitlab/)), установив зависимые модули, указанные в вашем файле **composer.json**.

Вы можете создать у нас хостинг-аккаунт без риска, зарегистрировавшись в [MyKinsta dashboard](https://kinsta.com/mykinsta/). Вы можете потренироваться в развертывании приложения на базе Composer, скопировав стартовое приложение Kinsta [Hello World - PHP](https://github.com/kinsta/hello-world-php) и загрузив его на свой аккаунт у Git-провайдера.

После того как PHP-приложение будет доступно в вашей учетной записи Git-провайдера, вы можете выполнить шаги по [добавлению приложения](https://kinsta.com/docs/add-an-application/) в MyKinsta. Это включает в себя авторизацию MyKinsta для подключения к Git-провайдеру и настройку среды сборки:

![Configure your application's build environment.](https://kinsta.com/wp-content/uploads/2022/08/add-application-build-environment-3.png 'Настройте среду сборки вашего приложения.')

Настройте среду сборки вашего приложения.

Kinsta автоматически настраивает веб-сервер Apache, который обслуживает ваш файл **index.php** из главной директории вашего приложения.

## Summary[](https://kinsta.com/blog/install-composer/#summary)

В этой статье вы узнали о Composer и о том, как установить его на Windows, Linux и macOS. Вы также увидели, как можно легко развернуть приложения на базе Composer на платформе Kinsta Application Hosting.

У нас есть [примеры быстрого запуска](https://kinsta.com/docs/application-hosting/quick-start-examples/) для ряда приложений на базе PHP и других распространенных [языков веб-программирования](https://kinsta.com/docs/supported-frameworks-and-languages/).
