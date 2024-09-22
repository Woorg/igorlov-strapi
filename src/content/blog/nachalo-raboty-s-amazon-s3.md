---
title: Начало работы с Amazon S3
meta_title: Начало работы с Amazon S3 - Igor Gorlov
description: >-
  Amazon Simple Storage Service (S3) – это высокомасштабируемая, долговечная и
  малозамедленная служба хранения объектов, предоставляемая AWS.
date: 2023-03-15T20:46:40.000Z
author: Igor Gorlov
image: ../../assets/images/undefined-Mar-15-2023.avif
categories:
  - Учебник
tags:
  - Amazon S3
  - AWS
draft: false
lastmod: 2024-03-20T21:26:47.151Z
---

Amazon Simple Storage Service (S3) - это высокомасштабируемая, долговечная и малозамедленная служба хранения объектов, предоставляемая AWS. Она предназначена для хранения и извлечения любого объема данных, что делает ее важным компонентом для многих веб-приложений, озер данных и аналитики больших данных.

В этом руководстве мы рассмотрим основы работы с Amazon S3, включая создание ведра S3, загрузку и извлечение объектов, а также настройку контроля доступа.

Перед началом работы вы должны иметь:

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Учетная запись AWS: Если у вас еще нет учетной записи AWS, зарегистрируйте ее.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>AWS CLI: Загрузите и установите AWS CLI. Обязательно настройте его на ключ доступа и секретный ключ AWS с помощью команды aws configure.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<h2 class="wp-block-heading">Создание S3 Bucket</h2>

Бакет — это контейнер для объектов, хранящихся в Amazon S3. Ведра служат фундаментальной единицей организации и контроля доступа к данным в S3.

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Использование консоли управления AWS</h3>

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Войдите в консоль управления AWS Management Console.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Перейдите к консоли Amazon S3 Console.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Нажмите кнопку "Создать бакет".</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Введите уникальное имя bucket и выберите регион.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Настройте остальные параметры по своему усмотрению, затем нажмите кнопку "Создать бакет".</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Использование AWS CLI</h3>

Чтобы создать ведро с помощью AWS CLI, выполните следующую команду:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">aws s3api create-bucket --bucket YOUR_BUCKET_NAME --region YOUR_REGION --create-bucket-configuration LocationConstraint=YOUR_REGION
</code></pre>
<!-- /wp:code -->

Замените YOUR_BUCKET_NAME на уникальное имя вашего bucket и YOUR_REGION на желаемый регион AWS.

<h2 class="wp-block-heading">Загрузка и извлечение объектов</h2>

Загрузка и скачивание файлов в бакет S3 с помощью консоли довольно просты: для загрузки файла нажмите на кнопку Upload и выберите нужный файл, а для скачивания выберите файл из ведра S3 и нажмите на кнопку Download.

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Загрузка объектов с помощью CLI</h3>

Чтобы загрузить локальный файл в S3 bucket с помощью AWS CLI, выполните следующую команду:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">aws s3 cp LOCAL_FILE_PATH s3://YOUR_BUCKET_NAME/DESTINATION_KEY
</code></pre>
<!-- /wp:code -->

Замените LOCAL_FILE_PATH на путь к вашему локальному файлу, YOUR_BUCKET_NAME на имя вашего S3 bucket, а DESTINATION_KEY на ключ (путь), который вы хотите присвоить объекту в bucket.

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Извлечение объектов с помощью CLI</h3>

Чтобы загрузить объект из вашего S3 bucket с помощью AWS CLI, выполните следующую команду:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">aws s3 cp s3://YOUR_BUCKET_NAME/SOURCE_KEY LOCAL_FILE_PATH
</code></pre>
<!-- /wp:code -->

Замените YOUR_BUCKET_NAME на имя вашего ведра S3, SOURCE_KEY на ключ объекта, который вы хотите загрузить, а LOCAL_FILE_PATH на локальный путь, по которому вы хотите сохранить загруженный файл.

<h2 class="wp-block-heading">Настройка контроля доступа с помощью политик ведра</h2>

Политики ведра - это документы JSON, определяющие правила предоставления прав доступа к вашему ведру S3. Вы можете использовать политику ведра для предоставления или запрета доступа к определенным действиям или ресурсам.

Чтобы прикрепить политику ведра с помощью консоли управления AWS Management Console:

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Перейдите в Amazon S3 Console.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Щелкните на своем ведре, затем перейдите на вкладку "Разрешения".</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Нажмите "Bucket Policy" и вставьте документ политики JSON в редактор.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Нажмите "Сохранить".</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

Вот и все! В этом руководстве для начинающих мы лишь поцарапали поверхность удивительного мира Amazon S3. Имея за плечами S3, вы уже на пути к созданию невероятных решений для хранения данных в ваших проектах. Помните, что практика делает совершенным, поэтому не бойтесь погружаться и изучать S3 дальше.
