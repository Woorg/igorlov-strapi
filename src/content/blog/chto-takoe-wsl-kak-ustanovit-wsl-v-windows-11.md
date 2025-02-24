---
title: Что такое WSL? Как установить WSL в Windows 11?
meta_title: Что такое WSL? Как установить WSL в Windows 11? - Igor Gorlov
description: >-
  WSL расшифровывается как Windows Subsystem for Linux. Это функция в Windows 10
  и windows 11, которая позволяет разработчикам запускать дистрибутивы Linux на
  своих машинах Windows без необходимости использования виртуальной машины или
  двойной загрузки.
date: 2023-04-30T11:48:13.000Z
image: ../../assets/images/undefined-Apr-30-2023.avif
author: Igor Gorlov
categories:
  - Как закодить
tags:
  - Wsl
draft: false
lastmod: 2024-03-20T21:26:44.641Z
---

<h2 class="wp-block-heading" id="что-такое-wsl">Что такое WSL?</h2>

WSL расшифровывается как Windows Subsystem for Linux. Это функция в Windows 10 и windows 11, которая позволяет разработчикам запускать дистрибутивы Linux на своих машинах Windows без необходимости использования виртуальной машины или двойной загрузки. Это означает, что разработчики могут использовать инструменты и приложения Linux на машине Windows без необходимости переключаться между операционными системами или создавать сложные среды виртуализации.

В настоящее время доступны две версии WSL: WSL 1 и WSL 2. WSL 1 основана на уровне трансляции, который преобразует системные вызовы Linux в системные вызовы Windows, в то время как WSL 2 запускает полное ядро Linux в легковесной виртуальной машине. WSL 2 обеспечивает лучшую производительность и совместимость с приложениями Linux.

<!-- wp:rank-math/toc-block {"title":"Оглавление","headings":[{"key":"5229c9ec-7773-4428-8047-6e70d5f94715","content":"Что такое WSL?","level":2,"link":"#что-такое-wsl","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"ecdc9e2b-12b4-4444-9f88-4b5e25bb2225","content":"Преимущества:","level":2,"link":"#преимущества","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"b7dd49f2-b515-41c1-adac-ef9f21c1f73a","content":"Шаги по установке WSL2","level":2,"link":"#шаги-по-установке-wsl-2","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"ae7b5419-c91a-4253-b730-a9444ba76b41","content":"1. Установите WSL","level":3,"link":"#1-установите-wsl","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"2701a734-3eba-4c0c-9ff5-bf833c16f5b0","content":"2. Установка WSL с определенным дистрибутивом","level":3,"link":"#2-установка-wsl-с-определенным-дистрибутивом","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"7f4fc354-3f39-4be8-8c82-17e4b5c1fd1d","content":"3. Список доступных дистрибутивов Linux","level":3,"link":"#3-список-доступных-дистрибутивов-linux","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"0351dfea-4b50-4465-a719-3b723ab03bd3","content":"4. Список установленных дистрибутивов Linux","level":3,"link":"#4-список-установленных-дистрибутивов-linux","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"ab798c13-bef1-4f90-a1ea-798ea26c17ca","content":"5. Изменить по умолчанию","level":3,"link":"#5-изменить-по-умолчанию","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"18e22d64-25f9-49fa-a793-b2788bfa841d","content":"6. Обновление WSL","level":3,"link":"#6-обновление-wsl","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"b1a2a313-c023-45f7-afd3-3d2a2e4d7478","content":"7. Снять с регистрации WSL","level":3,"link":"#7-снять-с-регистрации-wsl","disable":false,"isUpdated":false,"isGeneratedLink":true}],"listStyle":"ul"} -->
<div class="wp-block-rank-math-toc-block" id="rank-math-toc"><h2>Оглавление</h2><nav><ul><li class=""><a href="#что-такое-wsl">Что такое WSL?</a></li><li class=""><a href="#преимущества">Преимущества:</a></li><li class=""><a href="#шаги-по-установке-wsl-2">Шаги по установке WSL2</a><ul><li class=""><a href="#1-установите-wsl">1. Установите WSL</a></li><li class=""><a href="#2-установка-wsl-с-определенным-дистрибутивом">2. Установка WSL с определенным дистрибутивом</a></li><li class=""><a href="#3-список-доступных-дистрибутивов-linux">3. Список доступных дистрибутивов Linux</a></li><li class=""><a href="#4-список-установленных-дистрибутивов-linux">4. Список установленных дистрибутивов Linux</a></li><li class=""><a href="#5-изменить-по-умолчанию">5. Изменить по умолчанию</a></li><li class=""><a href="#6-обновление-wsl">6. Обновление WSL</a></li><li class=""><a href="#7-снять-с-регистрации-wsl">7. Снять с регистрации WSL</a></li></ul></li></ul></nav></div>
<!-- /wp:rank-math/toc-block -->

<h2 class="wp-block-heading" id="преимущества">Преимущества:</h2>

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>1. <strong>Простая установка:</strong>WSL можно легко установить через Windows Store или командную строку PowerShell.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>2. <strong>Интеграция с Windows:</strong>WSL хорошо интегрируется с Windows, обеспечивая простой обмен файлами между средами Linux и Windows.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>3. <strong>Знакомство с инструментами Windows:</strong>Разработчики могут использовать инструменты Windows, такие, как Visual Studio Code, и при этом пользоваться инструментами командной строки Linux.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>4. <strong>Отсутствие необходимости в отдельной машине или виртуализации:</strong>WSL позволяет запускать команды и инструменты Linux в Windows без необходимости создания отдельной машины или среды виртуализации.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>5. <strong>Поддержка графического интерфейса:</strong>В WSL2 вы можете использовать приложения с графическим интерфейсом, используя драйверы, поддерживаемые вашим ноутбуком.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<h2 class="wp-block-heading" id="шаги-по-установке-wsl-2">Шаги по установке WSL2</h2>

Если вы заинтересованы в установке и использовании WSL2, есть несколько важных команд, которые вы должны знать. В этой статье мы рассмотрим команды для установки WSL2 в вашей системе windows.

Прежде чем приступить к работе, важно отметить, что все эти команды необходимо запускать из открытой командной строки или терминала PowerShell. Для этого просто щелкните правой кнопкой мыши на значке Command Prompt или PowerShell и выберите ”Запуск от имени администратора”.

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="1-установите-wsl">1. Установите WSL</h3>

Чтобы установить WSL, выполните следующую команду:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">wsl --install
</code></pre>
<!-- /wp:code -->

Это позволит загрузить и установить последнюю версию WSL на вашу систему. По умолчанию будет установлен Ubuntu вместе с wsl2.

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="2-установка-wsl-с-определенным-дистрибутивом">2. Установка WSL с определенным дистрибутивом</h3>

Если вы хотите установить WSL с определенным дистрибутивом Linux, вы можете использовать следующую команду:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">wsl --install -d DISTRO-NAME
</code></pre>
<!-- /wp:code -->

Замените “DISTRO-NAME” на имя дистрибутива Linux, который вы хотите установить. Например, чтобы установить Debian, вы должны использовать:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">wsl --install -d Debian
</code></pre>
<!-- /wp:code -->

После установки wsl перезагрузите систему и запустите WSL, нажав на значок дистрибутива Linux в вашей системе или просто набрав wsl в cmd или powershell. Это запустит среду linux в вашей системе windows и попросит вас создать имя пользователя и пароль для wsl.

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="3-список-доступных-дистрибутивов-linux">3.&nbsp;Список доступных дистрибутивов Linux</h3>

Чтобы просмотреть список доступных дистрибутивов Linux, которые вы можете установить, используйте следующую команду:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">wsl --list --online
</code></pre>
<!-- /wp:code -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="4-список-установленных-дистрибутивов-linux">4.&nbsp;Список установленных дистрибутивов Linux</h3>

Чтобы просмотреть список установленных в системе дистрибутивов Linux, используйте следующую команду:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">wsl --list --verbose
</code></pre>
<!-- /wp:code -->

Вы также можете использовать следующую команду для получения списка установленных дистрибутивов:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">wsl -l -v
</code></pre>
<!-- /wp:code -->

Первое имя в списке - это дистрибутив по умолчанию, который WSL будет использовать, если вы не укажете имя дистрибутива.

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="5-изменить-по-умолчанию">5.&nbsp;Изменить по умолчанию</h3>

Чтобы изменить дистрибутив Linux по умолчанию, выполните следующую команду:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">wsl --set-default DISTRO-NAME
</code></pre>
<!-- /wp:code -->

Замените “DISTRO-NAME” на имя дистрибутива Linux, который вы хотите установить по умолчанию.

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="6-обновление-wsl">6.&nbsp;Обновление WSL</h3>

Чтобы обновить установку WSL, выполните следующую команду:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">wsl --update
</code></pre>
<!-- /wp:code -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="7-снять-с-регистрации-wsl">7.&nbsp;Снять с регистрации WSL</h3>

Если вы хотите удалить какой-либо дистрибутив WSL, сначала снимите его с регистрации в системе. Чтобы снять с регистрации дистрибутив Linux, выполните следующую команду:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">wsl --unregister DISTRO-NAME
</code></pre>
<!-- /wp:code -->

В заключение, знание этих основных команд WSL поможет вам начать работу по установке и управлению WSL на машине Windows. С помощью WSL вы сможете воспользоваться преимуществами экосистем Windows и Linux, что делает ее мощным инструментом для разработчиков.
