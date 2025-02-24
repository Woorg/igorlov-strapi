---
title: Как использовать DataDog для определения использования тома AWS EBS
meta_title: >-
  Как использовать DataDog для определения использования тома AWS EBS - Igor
  Gorlov
description: >-
  В этом блоге мы расскажем, как использовать DataDog для определения загрузки
  диска. Но перед этим расскажите мне, зачем это нужно.
date: 2023-04-22T07:00:29.000Z
author: Igor Gorlov
image: ../../assets/images/undefined-Apr-22-2023.avif
categories:
  - Учебник
tags:
  - AWS
  - Datadog
draft: false
lastmod: 2024-03-20T21:26:45.278Z
---

Здравствуйте, разработчики,

В этом блоге мы расскажем, как использовать DataDog для определения загрузки диска. Но перед этим расскажите мне, зачем это нужно.

При использовании машин EC2 у нас обычно есть подключенный том EBS или дополнительный том EBS. Вы могли много раз видеть ошибку “No space left on device” или иногда 100% utilisation state подобного рода. При возникновении этой ошибки вы могли принять меры, добавив дополнительный том или изменив размер текущего тома EBS. Но иногда эти действия могут быть предприняты с опозданием, потому что мы узнаем об этом очень поздно, и это может привести к ухудшению пользовательского опыта. Иногда вы превышаете размер тома и в итоге платите дополнительные расходы. Как этого избежать?

Здесь я объясню, как избежать этого и контролировать использование диска тома EBS с помощью Datadog. Как это может уберечь вас от любых инцидентов и сэкономить ваши расходы.

Давайте сначала разберемся, почему использование диска имеет большое значение.

<!-- wp:rank-math/toc-block {"title":"Оглавление","headings":[{"key":"eda815ef-0d93-4682-9ffe-35e826e419fa","content":"Почему использование диска имеет значение?","level":2,"link":"#почему-использование-диска-имеет-значение","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"728a76b8-1b8f-4a40-8928-0b3d46ce0f8c","content":"DataDog ?","level":2,"link":"#data-dog","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"03ad0ed5-f48d-4e1a-953d-6aac1b1beee8","content":"Как Datadog может помочь в использовании дисков?","level":3,"link":"#как-datadog-может-помочь-в-использовании-дисков","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"d3a4fd1b-9d16-4db4-886f-f580dd204635","content":"Как это сделать?","level":3,"link":"#как-это-сделать","disable":false,"isUpdated":false,"isGeneratedLink":true}],"listStyle":"ul"} -->
<div class="wp-block-rank-math-toc-block" id="rank-math-toc"><h2>Оглавление</h2><nav><ul><li class=""><a href="#почему-использование-диска-имеет-значение">Почему использование диска имеет значение?</a></li><li class=""><a href="#data-dog">DataDog ?</a><ul><li class=""><a href="#как-datadog-может-помочь-в-использовании-дисков">Как Datadog может помочь в использовании дисков?</a></li><li class=""><a href="#как-это-сделать">Как это сделать?</a></li></ul></li></ul></nav></div>
<!-- /wp:rank-math/toc-block -->

<h2 class="wp-block-heading" id="почему-использование-диска-имеет-значение">Почему использование диска имеет значение?</h2>

Ваш диск - это не что иное, как жесткий диск или том облачного экземпляра. Он используется не только для сохранения данных или кода, но и играет важную роль в операциях записи и чтения. Он имеет такой же вес, как процессор или оперативная память. Каждый жесткий диск способен выполнять множество операций чтения и записи, которые определяют скорость IOPS. Это приведет к замедлению работы вашего экземпляра или ПК. Клиенты или конечные пользователи могут столкнуться с проблемами при доступе к приложениям. Использование диска может достичь предела в 90% или 100% только потому, что код или приложение требует больше операций чтения и записи, которые вы не можете сократить.

Поэтому метрики использования диска важны для потребителей, чтобы знать, сколько хранилища используется недостаточно или чрезмерно, чтобы оптимизировать затраты на диск. А также преодолеть любой инцидент. Наблюдая за метриками использования диска, можно выяснить, какая модель использования ожидается в общем приложении, и соответственно изменить размер диска.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--FdAoYAeI--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_800/https://cdn.hashnode.com/res/hashnode/image/upload/v1682072630932/bcde720e-3c82-402a-a8f1-86520734dfb8.gif" alt=""/></figure>
<!-- /wp:image -->

Но вопрос в том, как я могу получить раннее уведомление, когда использование диска достигает некоторого порога? Как я могу узнать, каково среднее использование диска? Здесь может помочь Datadog.

<h2 class="wp-block-heading" id="data-dog">DataDog ?</h2>

Datadog - одна из лучших платформ для мониторинга и управления журналами. Вы можете интегрировать свои локальные или облачные экземпляры, или сервисы, чтобы получить все журналы и метрики в одном месте. Datadog обеспечивает мониторинг в режиме реального времени и инициирование событий на основе пороговых значений метрик или сообщений журналов для принятия соответствующих мер. — официальный сайт Datadog

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="как-datadog-может-помочь-в-использовании-дисков">Как Datadog может помочь в использовании дисков?</h3>

Datadog предоставляет агенты установки, которые должны быть установлены на сервере или экземпляре. Этот агент будет продолжать сбрасывать данные регистрации и метрики на приборную панель Datadog. Datadog имеет механизм сборки на основе пороговых показателей, например, когда ”использование процессора более 80%” или ”использование диска более 70%” может вызвать уведомление соответствующей команды или члена команды по электронной почте или Slack или ops genie и т.д. Также на основе модели использования вы можете настроить масштабирование диска.

Давайте рассмотрим на примере тома AWS EBS. AWS EBS volume предоставляет метрики CloudWatch, которые легко интегрируются с Datadog. Также, как было сказано выше, можно установить агент и получать журналы в течение 15 секунд.

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="как-это-сделать">Как это сделать?</h3>

Давайте разберемся, как DataDog может быть интегрирован с томом AWS EBS и получать необходимые метрики. Для этого необходимо, чтобы у вас уже был запущен AWS EC2 с подключенным томом по умолчанию.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--eQBg8HEK--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://cdn.hashnode.com/res/hashnode/image/upload/v1682072904442/94cb90e3-9b6b-44d8-addd-2f99e166fd17.png" alt=""/></figure>
<!-- /wp:image -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Во-первых, если у вас еще нет учетной записи в Datadog, создайте ее на сайте Datadog.com, там предоставляется 14-дневный пробный период.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>После создания учетной записи вам нужно выбрать платформу, которую вы собираетесь интегрировать, например AWS, Google, Docker, Azure и т.д.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--5gVF1IlV--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://cdn.hashnode.com/res/hashnode/image/upload/v1682073065823/99767f9c-4b7b-416e-a005-6305364eeb50.png" alt=""/></figure>
<!-- /wp:image -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Выберите экземпляр семейства ОС.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Начните выполнять шаги, указанные на странице. Когда все будет завершено, нажмите кнопку Finish.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--Fea3re4p--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://cdn.hashnode.com/res/hashnode/image/upload/v1682073074055/f26bdfb7-712d-4fc3-b7c3-124ddcc85ad1.png" alt=""/></figure>
<!-- /wp:image -->

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s---4x8CgXB--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://cdn.hashnode.com/res/hashnode/image/upload/v1682073268807/4dfc1b5b-1e07-4865-98c7-480c10dfd757.png" alt=""/></figure>
<!-- /wp:image -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Вы будете перенаправлены на сайт https://app.datadoghq.com/. Первый экран приветствия будет выглядеть следующим образом, если вы делаете это в первый раз.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--1ujK90hy--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://cdn.hashnode.com/res/hashnode/image/upload/v1682073280457/49dc62d8-89fb-47b9-9567-0b281976e295.png" alt=""/></figure>
<!-- /wp:image -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>В левой части навигации нажмите на Метрики -&gt; Проводник -&gt; Добавить запрос</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Выберите запрос, связанный с дисками. Для использования диска можно выбрать system.disk.in_use , system.disk.free и system.disk.used</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--CXGg3s-9--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://cdn.hashnode.com/res/hashnode/image/upload/v1682073316797/ff2e7d2c-68fb-4ed5-be3e-70b549b9c88c.png" alt=""/></figure>
<!-- /wp:image -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>После выполнения запроса можно увидеть метрики, отображаемые на странице. Нажмите кнопку "Сохранить в приборной панели"</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--fDFlRH_V--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://cdn.hashnode.com/res/hashnode/image/upload/v1682073610825/fa4b7201-a7d7-497e-b9b0-25a751e619a0.png" alt=""/></figure>
<!-- /wp:image -->

.

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>В поисковом запросе можно поиграть с добавлением формул.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--mBDuPXjD--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://cdn.hashnode.com/res/hashnode/image/upload/v1682073677439/dd47bf51-e62a-45d0-a9d8-bf9f790875fe.png" alt=""/></figure>
<!-- /wp:image -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Как и несколько других метрик, которые вы можете опробовать в соответствии с пунктом #7.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>В разделе "Монитор" вы можете создать оповещение, когда дисковое пространство превышает порог или используется недостаточно. (необязательный шаг)</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

На этом интеграция Datadog с экземпляром завершена, и мы можем просматривать метрики объема EBS и отслеживать закономерности для принятия решения об оптимизации затрат :)

Надеюсь, этот блог поможет вам в обучении. Не стесняйтесь обращаться ко мне в Twitter @AvinashDalvi\_ или оставлять комментарии в блоге.
