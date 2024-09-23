---
title: 'Узнайте, как тестировать приложения Flask с помощью Pytest'
meta_title: 'Узнайте, как тестировать приложения Flask с помощью Pytest - Igor Gorlov'
description: >-
  Добро пожаловать в это руководство по тестированию приложений Flask с помощью
  Pytest. Flask – это популярный веб-фреймворк на Python, который позволяет
  разработчикам быстро и легко создавать веб-приложения.
date: 2023-03-22T19:49:09.000Z
author: Igor Gorlov
image: ../../assets/images/undefined-Mar-22-2023.avif
categories:
  - Как закодить
tags:
  - DevOps
  - Python
  - Testing
draft: false
lastmod: 2024-03-20T21:26:46.086Z
---

Добро пожаловать в это руководство по тестированию приложений Flask с помощью Pytest. Flask - это популярный веб-фреймворк на Python, который позволяет разработчикам быстро и легко создавать веб-приложения. Однако по мере роста сложности вашего приложения все большее значение приобретает обеспечение надежности и отсутствия ошибок в коде. Именно здесь на помощь приходит тестирование. Pytest - это мощная и популярная среда тестирования на Python, которая позволяет легко писать и запускать тесты для вашего Flask-приложения. В этом руководстве вы узнаете, как автоматизировать тесты для вашего Flask-приложения с помощью Pytest и как обеспечить надежность и безошибочность вашего кода. Итак, давайте приступим!

<h2 class="wp-block-heading">Требования:</h2>

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li><a href="https://app.harness.io/auth/#/signup/?module=ci&amp;utm_source=internal&amp;utm_medium=social&amp;utm_campaign=devadvocacy&amp;utm_content=pavan_python_article&amp;utm_term=get-started">Бесплатная учетная запись Harness для автоматизации ваших тестов</a></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Образец приложения Flask. Мы уже создали<a href="https://github.com/pavanbelagatti/flask-application" target="_blank" rel="noreferrer noopener"> образец приложения Flask</a>; не стесняйтесь использовать его.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<h2 class="wp-block-heading">Учебник</h2>

Сначала войдите в свою учетную запись Harness. Harness - это платформа непрерывной доставки.

<br><img width="880" height="412" src="https://res.cloudinary.com/practicaldev/image/fetch/s--mOp0adP6--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/6lyk0wxigi9a2kqak2fi.png" alt="signup Harness">

Приступите к созданию своего первого конвейера

<br><img width="880" height="383" src="https://res.cloudinary.com/practicaldev/image/fetch/s--A6bZCza3--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/v6rgri1gpcbmbt8q2jx1.png" alt="first pipeline">

Авторизуйтесь в своей учетной записи GitHub, так как там находится код вашего приложения.

<br><img width="880" height="399" src="https://res.cloudinary.com/practicaldev/image/fetch/s--FgWOamTT--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/pcdkkrm132wok2r37his.png" alt="add github">

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--tUmbOMtD--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/v1efbg84t05szpe9lh1c.png" alt="аутентификация в GitHub"/></figure>
<!-- /wp:image -->

Выберите репозиторий вашего приложения. Приложение Flask, которое вы форкнули выше.

<br><img width="880" height="945" src="https://res.cloudinary.com/practicaldev/image/fetch/s--57CQJstd--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/got6n1t8i50rlsrlaicc.png" alt="select repo">

Выберите ‘Python’ из списка и начните конфигурировать конвейер. Справа на скриншоте ниже вы видите стандартную конфигурацию yaml вашего конвейера.

<br><img width="880" height="545" src="https://res.cloudinary.com/practicaldev/image/fetch/s--h5YnloqO--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/j8xl2kfvazyvroa9li36.png" alt="configure pipeline">

Продолжив движение, вы попадете в студию трубопровода, которая выглядит следующим образом

<br><img width="880" height="554" src="https://res.cloudinary.com/practicaldev/image/fetch/s--KJzKjnc2--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/l32asp8ywxhk2bc167bo.png" alt="pipeline studio">

Нажмите на ‘Build Python App’, и вы должны увидеть шаг, настроенный под выполнение.

<br><img width="880" height="573" src="https://res.cloudinary.com/practicaldev/image/fetch/s--9lfvF2be--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/edrypo47lrh447x7yh26.png" alt="build python app">

Когда вы нажмете на шаг ‘Build Python App’ под выполнением, вы увидите используемые команды.

<br><img width="880" height="729" src="https://res.cloudinary.com/practicaldev/image/fetch/s--TdPBxa1d--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/fddgjmb82on8m6f9ha45.png" alt="build python">

Ничего не меняйте. Примените изменения, сохраните и запустите конвейер.

<br><img width="880" height="762" src="https://res.cloudinary.com/practicaldev/image/fetch/s--4w9S0mqm--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/dlz4u5j8fy48zpv28yop.png" alt="run pipeline">

Вы должны увидеть успешное выполнение трубопровода:)

<br><img width="880" height="810" src="https://res.cloudinary.com/practicaldev/image/fetch/s--MWHUOWFv--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/1wv06fm3qlx4x22djxn3.png" alt="pipeline execution">

Ваш конвейер автоматизирован для запуска тестов всякий раз, когда любой разработчик размещает код в основной ветке.<br>Вы можете убедиться в этом, перейдя на вкладку ‘Triggers’ в студии конвейера.

<br><img width="814" height="196" src="https://res.cloudinary.com/practicaldev/image/fetch/s--RyaJJsW0--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/77vc098k76bzl4hefahf.png" alt="Triggers tab">

Вы можете увидеть уже настроенные триггеры push и pull.

<br><img width="880" height="531" src="https://res.cloudinary.com/practicaldev/image/fetch/s--Cynpx66m--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/2rv41aa068wui3px73nk.png" alt="pull and push triggers">

Давайте перенесем часть кода в основную ветку.

<br>Как только вы вставляете код, запускается сборка, и вы можете увидеть то же самое ниже.

<br><img width="880" height="385" src="https://res.cloudinary.com/practicaldev/image/fetch/s--h6qRRkMA--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/yx488sz92qlnnbl9xuzo.png" alt="build triggered">

Поздравляем! Мы только что настроили автоматизированный конвейер CI для нашего приложения Flask.

Таким образом, вы можете легко автоматизировать свои тесты и выполнять задачи конвейера. Кроме того, вы можете видеть, кто внес последние изменения и какой код они внесли.
