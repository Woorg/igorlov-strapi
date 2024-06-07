---
title: Как разместить сайт WordPress на Amazon Lightsail
meta_title: Как разместить сайт WordPress на Amazon Lightsail - Igor Gorlov
description: >-
  Lightsail предоставляет все необходимые мощности для размещения наших
  веб-сайтов, как мы привыкли к AWS, но делает это намного проще, чем когда-либо
  прежде
date: 2023-02-25T19:34:44.000Z
author: Igor Gorlov
image: ../../assets/images/undefined-Feb-25-2023.avif
categories:
  - Учебник
tags:
  - AWS
  - Lightsail
  - WordPress
draft: false
lastmod: 2024-03-20T21:26:46.611Z
---

Lightsail предоставляет все необходимые мощности для размещения наших веб-сайтов, как мы привыкли к AWS, но делает это намного проще, чем когда-либо прежде. В этой статье Леонардо Лосовиз рассказывает о том, как быстро и легко запустить сайт WordPress в Lightsail.

Большая часть всех веб-сайтов работает на Amazon Web Services (AWS). На самом базовом уровне сайт обычно использует решения Amazon EC2 и Amazon S3 (для вычислительной мощности и хранения данных, соответственно), а также, скорее всего, Amazon CloudFront (в качестве сети доставки контента [CDN] для распространения активов).

Этот стек работает очень хорошо и является супермощным, но его не так просто настроить, поскольку каждая из этих служб должна быть настроена на взаимодействие друг с другом. И как только это сделано, нам нужно настроить операционную систему, установить CMS и все остальное, необходимое для работы нашего программного обеспечения.

Если все, что нам нужно, - это быстро и легко запустить веб-сайт (например, чтобы показать разрабатываемый сайт клиенту или протестировать плагин WordPress), тратить время на настройку всех этих отдельных служб AWS может быть слишком накладно.

Именно поэтому AWS создала Amazon Lightsail - сервис, который объединяет другие сервисы (EC2, S3, CloudFront и некоторые другие) через упрощенный пользовательский интерфейс для запуска веб-серверов со всем установленным и настроенным (как для аппаратного, так и для основного программного обеспечения) и готовым к использованию.

С помощью Lightsail мы можем запустить наш веб-сайт за считанные минуты.

В отличие от большинства сервисов AWS, Lightsail имеет плоскую структуру ценообразования с фиксированной ценой в месяц. (В отличие от этого, EC2 тарифицируется за количество секунд использования; EBS - который предоставляет тома для хранения данных в EC2 - по размеру и типу диска, а также по любым дополнительным предоставленным IOPS; S3 - по размеру хранимых объектов и продолжительности хранения; и CloudFront - по объему переданных данных). Это значительно облегчает расчет счета AWS в конце месяца.

Примечание: Вы можете бесплатно попробовать Lightsail в течение первых трех месяцев.

В этой статье мы рассмотрим, как быстро и легко запустить сайт WordPress в Lightsail.

<h2 class="wp-block-heading">Создание экземпляра Lightsail с предустановленным WordPress</h2>

Чтобы получить доступ к Lightsail, перейдем по адресу lightsail.aws.amazon.com (нам необходимо войти в систему AWS).

Изначально наша приборная панель будет пуста:

<img sizes="100vw" srcset="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/1-lightsail-dashboard.png 400w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_800/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/1-lightsail-dashboard.png 800w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1200/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/1-lightsail-dashboard.png 1200w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1600/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/1-lightsail-dashboard.png 1600w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_2000/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/1-lightsail-dashboard.png 2000w" width="800" height="627" src="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/1-lightsail-dashboard.png" alt="Lightsail dashboard">Lightsail dashboard. (Большой просмотр)

Давайте нажмем кнопку ”Создать экземпляр" для размещения сайта WordPress.

Мы должны выбрать местоположение сервера, используемую платформу (Linux/Unit или Windows) и программное обеспечение для установки (OS + Apps) с помощью предоставленных чертежей. Обратите внимание, что чертеж WordPress устанавливает последнюю версию и что есть отдельные чертежи для WordPress как для одного сайта и как для нескольких сайтов.

<img sizes="100vw" srcset="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/2-lightsail-dashboard-creating-instance.png 400w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_800/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/2-lightsail-dashboard-creating-instance.png 800w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1200/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/2-lightsail-dashboard-creating-instance.png 1200w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1600/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/2-lightsail-dashboard-creating-instance.png 1600w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_2000/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/2-lightsail-dashboard-creating-instance.png 2000w" width="800" height="627" src="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/2-lightsail-dashboard-creating-instance.png" alt="Creating an instance">Создание экземпляра. (Большой просмотр)

Выберите место, которое находится как можно ближе к вашим пользователям, чтобы уменьшить задержку при доступе к сайту.

<img sizes="100vw" srcset="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/3-lightsail-dashboard-choosing-instance-location.png 400w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_800/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/3-lightsail-dashboard-choosing-instance-location.png 800w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1200/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/3-lightsail-dashboard-choosing-instance-location.png 1200w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1600/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/3-lightsail-dashboard-choosing-instance-location.png 1600w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_2000/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/3-lightsail-dashboard-choosing-instance-location.png 2000w" width="800" height="627" src="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/3-lightsail-dashboard-choosing-instance-location.png" alt="Choosing the instance location">Выбор места расположения экземпляра. (Большой предварительный просмотр)

Lightsail имеет различные цены в зависимости от того, насколько мощным является сервер: Чем больше посещаемость сайта, тем больше ресурсов должно быть у сервера.

Мы можем получить базовый сервер, подходящий для тестирования, за $3,50/месяц; для производства мы предпочтем начать с сервера за $5 или 10/месяц, отслеживать его посещаемость и анализировать (со временем), стоит ли его модернизировать.

<img sizes="100vw" srcset="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/4-lightsail-dashboard-Instance-price.png 400w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_800/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/4-lightsail-dashboard-Instance-price.png 800w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1200/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/4-lightsail-dashboard-Instance-price.png 1200w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1600/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/4-lightsail-dashboard-Instance-price.png 1600w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_2000/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/4-lightsail-dashboard-Instance-price.png 2000w" width="800" height="627" src="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/4-lightsail-dashboard-Instance-price.png" alt="Instance price">Цена экземпляра. (Большой предварительный просмотр)

Наконец, мы присваиваем имя экземпляру и нажимаем ”Создать экземпляр".

Присвоение имени экземпляру. (Большой предварительный просмотр)

Экземпляр будет создан в фоновом режиме. Менее чем через 1 минуту он будет готов, и его статус на приборной панели изменится с “Pending” на “Running”.

Создан экземпляр. (Большой предварительный просмотр)

Обратите внимание на значок ”Терминал" рядом с именем экземпляра. В следующих разделах мы будем использовать его для подключения к экземпляру по SSH и выполнения команд на сервере.

Прикрепление статического IP-адреса

При создании экземпляра назначенный ему IP является ”эластичным", который может измениться (например, при перезагрузке сервера). Поэтому мы должны создать статический IP и прикрепить его к экземпляру, чтобы он никогда не менялся.

Для этого перейдите на вкладку Networking и в разделе “Public IP” нажмите на “Attach static IP”.

Эластичный IP. (Большой предварительный просмотр)

Мы должны указать имя для идентификации статического IP.

Создание статического IP. (Большой предварительный просмотр)

Нажмите кнопку ”Создать и прикрепить", после чего серверу будет присвоен статический IP.

Статический IP, прикрепленный к экземпляру. (Большой предварительный просмотр)

Теперь мы можем получить доступ к нашему сайту WordPress в браузере под http://{PUBLIC_IP}.

Доступ к сайту WordPress. (Большой предварительный просмотр)

Здравствуй, сайт WordPress! 👋

Доступ к администратору WP

Имя пользователя администратора WordPress - user, и нам нужно получить пароль от сервера, подключившись к нему по SSH.

Для этого мы нажимаем на иконку ”Терминал" рядом с именем экземпляра (как видно ранее), после чего в браузере открывается новое окно с CLI, запущенным на данном экземпляре.

<img sizes="100vw" srcset="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/11-connecting-instance-via-SSH.png 400w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_800/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/11-connecting-instance-via-SSH.png 800w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1200/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/11-connecting-instance-via-SSH.png 1200w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1600/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/11-connecting-instance-via-SSH.png 1600w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_2000/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/11-connecting-instance-via-SSH.png 2000w" width="800" height="644" src="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/11-connecting-instance-via-SSH.png" alt="Connecting to the instance via SSH">

Подключение к экземпляру через SSH. (Большой предварительный просмотр)

Выполните следующую команду, чтобы вывести пароль на экран.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">cat bitnami_application_password
</code></pre>
<!-- /wp:code -->

Печать пароля администратора. (Большой предварительный просмотр)

Затем выделите пароль и нажмите на оранжевый значок буфера обмена (в правом нижнем углу), чтобы скопировать пароль из всплывающего окна.

<img sizes="100vw" srcset="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/13-copying-password-clipboard.png 400w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_800/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/13-copying-password-clipboard.png 800w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1200/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/13-copying-password-clipboard.png 1200w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1600/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/13-copying-password-clipboard.png 1600w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_2000/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/13-copying-password-clipboard.png 2000w" width="800" height="644" src="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/13-copying-password-clipboard.png" alt="Copying the password to the clipboard">

Копирование пароля в буфер обмена. (Большой предварительный просмотр)

Перейдите в админку WordPress по адресу http://{PUBLIC_IP}/wp-login.php и введите имя пользователя и пароль.

<img sizes="100vw" srcset="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/14-logging-into-wp-admin.png 400w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_800/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/14-logging-into-wp-admin.png 800w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1200/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/14-logging-into-wp-admin.png 1200w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1600/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/14-logging-into-wp-admin.png 1600w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_2000/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/14-logging-into-wp-admin.png 2000w" width="800" height="684" src="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/14-logging-into-wp-admin.png" alt="Logging into the wp-admin">

Вход в wp-admin. (Большой предварительный просмотр)

Вуаля, мы вошли.

Войдите в wp-admin. (Большой предварительный просмотр)Использование пользовательского домена

Доступ к сайту прямо с публичного IP не идеален, поэтому давайте создадим пользовательский домен.

В службе DNS создайте запись A, сопоставляющую ваш домен или поддомен с публичным IP-адресом экземпляра (если у вас нет домена, вы также можете зарегистрировать новый через Lightsail). Я использую AWS Route 53, но подойдет любая служба DNS.

<img sizes="100vw" srcset="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/16-create-DNS-record-Route-53.png 400w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_800/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/16-create-DNS-record-Route-53.png 800w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1200/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/16-create-DNS-record-Route-53.png 1200w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1600/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/16-create-DNS-record-Route-53.png 1600w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_2000/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/16-create-DNS-record-Route-53.png 2000w" width="800" height="627" src="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/16-create-DNS-record-Route-53.png" alt="Creating a DNS record on Route 53">

Создание DNS-записи на маршруте 53. (Большой предварительный просмотр)

Теперь мы можем получить доступ к веб-сайту через выбранный домен.

<img sizes="100vw" srcset="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/17-access-site-under-custom-domain.png 400w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_800/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/17-access-site-under-custom-domain.png 800w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1200/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/17-access-site-under-custom-domain.png 1200w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1600/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/17-access-site-under-custom-domain.png 1600w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_2000/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/17-access-site-under-custom-domain.png 2000w" width="800" height="684" src="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/17-access-site-under-custom-domain.png" alt="Accessing site under custom domain">

Доступ к сайту под пользовательским доменом. (Большой предварительный просмотр)Установка SSL

До сих пор мы получали доступ к сайту по протоколу http. Если мы пробуем https, нам сообщают, что сайт небезопасен.

<img sizes="100vw" srcset="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/18-site-under-https-unsafe.png 400w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_800/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/18-site-under-https-unsafe.png 800w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1200/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/18-site-under-https-unsafe.png 1200w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1600/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/18-site-under-https-unsafe.png 1600w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_2000/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/18-site-under-https-unsafe.png 2000w" width="800" height="683" src="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/18-site-under-https-unsafe.png" alt="Site under https is unsafe">

Сайт под https небезопасен. (Большой предварительный просмотр)

Итак, пришло время установить SSL-сертификат, предоставленный через Let’s Encrypt. Для этого нам нужно снова войти в терминал и ввести следующую команду:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">sudo /opt/bitnami/bncert-tool
</code></pre>
<!-- /wp:code -->

Программа попросит ввести список доменов, для которых нужно создать сертификат (таким образом, вы можете добавить yourdomain.com и www.yourdomain.com).

<img sizes="100vw" srcset="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/19-wordpress-demo-installing-ssl.png 400w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_800/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/19-wordpress-demo-installing-ssl.png 800w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1200/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/19-wordpress-demo-installing-ssl.png 1200w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1600/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/19-wordpress-demo-installing-ssl.png 1600w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_2000/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/19-wordpress-demo-installing-ssl.png 2000w" width="800" height="644" src="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/19-wordpress-demo-installing-ssl.png" alt="Wordpress demo installing ssl">

(Большой предварительный просмотр)

Затем программа запросит дополнительную информацию (включая ваш email) и спросит, нужно ли перенаправить HTTP-трафик на HTTPS (рекомендуется ответить ”да"). Как только все это будет предоставлено, сертификат будет создан.

Теперь доступ к сайту по протоколу https работает нормально:

<img sizes="100vw" srcset="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/20-website-under-https-OK.png 400w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_800/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/20-website-under-https-OK.png 800w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1200/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/20-website-under-https-OK.png 1200w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1600/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/20-website-under-https-OK.png 1600w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_2000/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/20-website-under-https-OK.png 2000w" width="800" height="682" src="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/20-website-under-https-OK.png" alt="Site under https is OK">

Сайт под https в порядке (большой предварительный просмотр).

Осталось сделать последний шаг: Измените URL сайта в WordPress с http на https, чтобы все ссылки на сайте указывали на безопасное место, и мы избежали перенаправления с HTTP на HTTPS.

Перейдя на экран общих настроек WordPress, мы видим, что входы ”Адрес WordPress (URL)" и "Адрес сайта (URL)" не могут быть отредактированы.

<img sizes="100vw" srcset="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/21-wordpress-demo-general-settings.png 400w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_800/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/21-wordpress-demo-general-settings.png 800w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1200/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/21-wordpress-demo-general-settings.png 1200w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1600/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/21-wordpress-demo-general-settings.png 1600w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_2000/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/21-wordpress-demo-general-settings.png 2000w" width="800" height="627" src="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/21-wordpress-demo-general-settings.png" alt="General Settings in WordPress">

Общие настройки в WordPress. (Большой предварительный просмотр)

Чтобы изменить эту конфигурацию, нам нужно отредактировать файл wp-config.php через терминал.

Затем снова подключитесь к терминалу и выполните эту команду:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">sudo nano /opt/bitnami/wordpress/wp-config.php
</code></pre>
<!-- /wp:code -->

Команда открывает файл в текстовом редакторе nano.

<img sizes="100vw" srcset="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/22-editing-wpconfig-php-file-with-nano.png 400w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_800/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/22-editing-wpconfig-php-file-with-nano.png 800w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1200/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/22-editing-wpconfig-php-file-with-nano.png 1200w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1600/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/22-editing-wpconfig-php-file-with-nano.png 1600w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_2000/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/22-editing-wpconfig-php-file-with-nano.png 2000w" width="800" height="644" src="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/22-editing-wpconfig-php-file-with-nano.png" alt="Editing the wpconfig.php file with nano">

Редактирование файла wpconfig.php с помощью nano. (Большой предварительный просмотр)

Прокрутите вниз, пока не найдете этот код:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="php" class="language-php">define('WP_SITEURL', 'http://' . $_SERVER['HTTP_HOST'] . '/');
define('WP_HOME', 'http://' . $_SERVER['HTTP_HOST'] . '/');
</code></pre>
<!-- /wp:code -->

И замените его этим кодом:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="php" class="language-php">define('WP_SITEURL', 'https://' . $_SERVER['HTTP_HOST'] . '/');
define('WP_HOME', 'https://' . $_SERVER['HTTP_HOST'] . '/');
if (isset($_SERVER['HTTP_CLOUDFRONT_FORWARDED_PROTO']) &amp;&amp; $_SERVER['HTTP_CLOUDFRONT_FORWARDED_PROTO'] === 'https') {
    $_SERVER['HTTPS'] = 'on';
}
</code></pre>
<!-- /wp:code -->

Затем нажмите Ctrl + O (для сохранения) и Ctrl + X (для выхода). Перезагрузив экран общих настроек WordPress, мы увидим, что URL-адрес сайта теперь использует https.

<img sizes="100vw" srcset="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/23-wordpress-demo-general-settings-update-https.png 400w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_800/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/23-wordpress-demo-general-settings-update-https.png 800w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1200/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/23-wordpress-demo-general-settings-update-https.png 1200w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1600/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/23-wordpress-demo-general-settings-update-https.png 1600w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_2000/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/23-wordpress-demo-general-settings-update-https.png 2000w" width="800" height="627" src="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/23-wordpress-demo-general-settings-update-https.png" alt="General Settings in WordPress updated with https">

Общие настройки в WordPress обновлены с https. (Большой предварительный просмотр)Изменение имени пользователя администратора

Lightsail устанавливает имя пользователя администратора как user. Поскольку WordPress не позволяет изменять имя пользователя после регистрации, если мы хотим изменить его, нам нужно сделать это непосредственно в базе данных MySQL.

Для этого выполните следующую команду в терминале (в данном случае изменив имя пользователя на leo):

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">mysql -u root -p$(cat /home/bitnami/bitnami_application_password) -e 'UPDATE wp_users set user_login = "leo" where ID = 1;' bitnami_wordpress
</code></pre>
<!-- /wp:code -->

Перейдя в профиль пользователя admin, мы видим, что имя пользователя было обновлено.

<img sizes="100vw" srcset="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/24-updated-admin-username-wordpress-demo.png 400w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_800/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/24-updated-admin-username-wordpress-demo.png 800w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1200/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/24-updated-admin-username-wordpress-demo.png 1200w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1600/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/24-updated-admin-username-wordpress-demo.png 1600w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_2000/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/24-updated-admin-username-wordpress-demo.png 2000w" width="800" height="627" src="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/24-updated-admin-username-wordpress-demo.png" alt="Updated admin username">

Обновлено имя пользователя администратора. (Большой предварительный просмотр)Хранение изображений в ведре S3

При загрузке изображений (или любых медиа-активов) в WordPress они хранятся в папке wp-content/uploads на сервере и в дальнейшем обслуживаются оттуда.

Это вызывает беспокойство, поскольку сервер должен считаться расходным материалом, чтобы в случае его поломки и необходимости восстановления данные не были потеряны. Мы можем создать снимок сервера для резервного копирования данных, и он будет содержать папку с изображениями, но только начиная с того момента, когда был сделан снимок; любое изображение, загруженное после этого, будет потеряно.

Другая проблема может возникнуть при размещении сайта на нескольких серверах. Если наш трафик возрастет, мы можем увеличить вычислительную мощность Lightsail, запустив дополнительные серверы (доступ к которым осуществляется через балансировщик нагрузки, и все они читают/пишут в одну и ту же управляемую базу данных).

Однако изображения, размещенные на одном сервере, хранятся только на этом сервере; если запрос на это изображение будет обрабатываться на другом сервере, изображение будет отсутствовать.

Решение состоит в том, чтобы разместить изображения в ведре S3 и заставить сайт WordPress обслуживать изображения непосредственно из этого ведра.

Давайте сделаем это. В Lightsail перейдите на вкладку ”Хранилище" и нажмите "Создать ведро".

<img sizes="100vw" srcset="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/25-amazon-lightsail-storage-dashboard.png 400w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_800/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/25-amazon-lightsail-storage-dashboard.png 800w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1200/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/25-amazon-lightsail-storage-dashboard.png 1200w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1600/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/25-amazon-lightsail-storage-dashboard.png 1600w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_2000/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/25-amazon-lightsail-storage-dashboard.png 2000w" width="800" height="627" src="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/25-amazon-lightsail-storage-dashboard.png" alt="Storage dashboard">

Приборная панель для хранения. (Большой предварительный просмотр)

Lightsail предлагает такую же плоскую структуру ценообразования для ведер S3, как и для экземпляров EC2: В зависимости от наших потребностей в хранении и передаче данных, мы можем выбрать план стоимостью 1, 3 или 5 долларов в месяц.

<img sizes="100vw" srcset="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/26-amazon-lightsail-choosing-plan-when-creating-bucket.png 400w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_800/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/26-amazon-lightsail-choosing-plan-when-creating-bucket.png 800w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1200/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/26-amazon-lightsail-choosing-plan-when-creating-bucket.png 1200w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1600/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/26-amazon-lightsail-choosing-plan-when-creating-bucket.png 1600w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_2000/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/26-amazon-lightsail-choosing-plan-when-creating-bucket.png 2000w" width="800" height="627" src="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/26-amazon-lightsail-choosing-plan-when-creating-bucket.png" alt="Choosing the plan when creating a bucket">

Выбор плана при создании ведра. (Большой предварительный просмотр)

Убедитесь, что для ведра выбран тот же регион AWS, что и для сервера (чтобы уменьшить задержки при загрузке изображений).

<img sizes="100vw" srcset="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/27-amazon-lightsail-choosing-location-when-creating-bucket.png 400w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_800/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/27-amazon-lightsail-choosing-location-when-creating-bucket.png 800w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1200/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/27-amazon-lightsail-choosing-location-when-creating-bucket.png 1200w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1600/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/27-amazon-lightsail-choosing-location-when-creating-bucket.png 1600w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_2000/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/27-amazon-lightsail-choosing-location-when-creating-bucket.png 2000w" width="800" height="627" src="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/27-amazon-lightsail-choosing-location-when-creating-bucket.png" alt="Choosing the location when creating a bucket">

Выбор местоположения при создании ведра. (Большой предварительный просмотр)

Наконец, укажите уникальное имя для ведра и нажмите ”Создать ведро".

<img sizes="100vw" srcset="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/28-bucket-created-amazon-lightsail.png 400w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_800/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/28-bucket-created-amazon-lightsail.png 800w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1200/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/28-bucket-created-amazon-lightsail.png 1200w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1600/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/28-bucket-created-amazon-lightsail.png 1600w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_2000/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/28-bucket-created-amazon-lightsail.png 2000w" width="800" height="627" src="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/28-bucket-created-amazon-lightsail.png" alt="Creating the bucket">

Создание ведра. (Большой предварительный просмотр)

Ведро создано, но нам все еще нужно настроить его, чтобы обновить разрешения и сделать загруженные активы общедоступными.

Нажмите на имя ведра и на вкладке ”Разрешения" выберите "Отдельные объекты можно сделать общедоступными и доступными только для чтения".

<img sizes="100vw" srcset="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/29-amazon-lightsail-wordpress-bucket-access-permissions.png 400w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_800/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/29-amazon-lightsail-wordpress-bucket-access-permissions.png 800w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1200/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/29-amazon-lightsail-wordpress-bucket-access-permissions.png 1200w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1600/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/29-amazon-lightsail-wordpress-bucket-access-permissions.png 1600w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_2000/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/29-amazon-lightsail-wordpress-bucket-access-permissions.png 2000w" width="800" height="627" src="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/29-amazon-lightsail-wordpress-bucket-access-permissions.png" alt="Bucket permissions">

Разрешения на ведро. (Большой предварительный просмотр)

В разделе ”Доступ к ресурсам" прикрепите сервер к ведру (тогда мы сможем избежать определения наших учетных данных AWS на сайте WordPress).

<img sizes="100vw" srcset="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/30-amazon-lightsail-attaching-instance-to-bucket.png 400w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_800/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/30-amazon-lightsail-attaching-instance-to-bucket.png 800w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1200/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/30-amazon-lightsail-attaching-instance-to-bucket.png 1200w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1600/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/30-amazon-lightsail-attaching-instance-to-bucket.png 1600w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_2000/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/30-amazon-lightsail-attaching-instance-to-bucket.png 2000w" width="800" height="627" src="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/30-amazon-lightsail-attaching-instance-to-bucket.png" alt="Attaching the instance to the bucket">

Прикрепление экземпляра к ведру. (Большой предварительный просмотр)

Наша конфигурация Lightsail завершена. Далее нам нужно настроить сайт WordPress на загрузку изображений в ведро.

Это можно сделать с помощью WP Offload Media Lite, бесплатного плагина WordPress, который автоматически загружает на S3 любой актив, добавленный в медиатеку WordPress.

Перейдите на страницу плагинов, найдите “WP Offload Media Lite for Amazon S3”, установите и активируйте плагин из результатов поиска.

<img sizes="100vw" srcset="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/31-wordpress-demo-installing-WP-offload-media-lite.png 400w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_800/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/31-wordpress-demo-installing-WP-offload-media-lite.png 800w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1200/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/31-wordpress-demo-installing-WP-offload-media-lite.png 1200w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1600/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/31-wordpress-demo-installing-WP-offload-media-lite.png 1600w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_2000/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/31-wordpress-demo-installing-WP-offload-media-lite.png 2000w" width="800" height="627" src="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/31-wordpress-demo-installing-WP-offload-media-lite.png" alt="Installing WP Offload Media Lite">

Установка WP Offload Media Lite. (Большой предварительный просмотр)

После активации перейдите в Настройки &gt; WP Offload Media, чтобы настроить плагин.

<img sizes="100vw" srcset="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/32-wordpress-demo-site-settings-WP-offload-media-lite.png 400w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_800/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/32-wordpress-demo-site-settings-WP-offload-media-lite.png 800w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1200/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/32-wordpress-demo-site-settings-WP-offload-media-lite.png 1200w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1600/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/32-wordpress-demo-site-settings-WP-offload-media-lite.png 1600w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_2000/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/32-wordpress-demo-site-settings-WP-offload-media-lite.png 2000w" width="800" height="627" src="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/32-wordpress-demo-site-settings-WP-offload-media-lite.png" alt="Settings for WP Offload Media Lite">

Настройки для WP Offload Media Lite. (Большой предварительный просмотр)

В разделе ”Метод подключения" выберите "Мой сервер находится на Amazon Web Services, и я хотел бы использовать IAM Roles” и сохраните изменения.

<img sizes="100vw" srcset="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/33-connection-method-WP-offload-media-lite.png 400w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_800/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/33-connection-method-WP-offload-media-lite.png 800w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1200/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/33-connection-method-WP-offload-media-lite.png 1200w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1600/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/33-connection-method-WP-offload-media-lite.png 1600w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_2000/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/33-connection-method-WP-offload-media-lite.png 2000w" width="800" height="627" src="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/33-connection-method-WP-offload-media-lite.png" alt="Connection Method for WP Offload Media Lite">

Метод подключения для WP Offload Media Lite. (Большой предварительный просмотр)

Далее отредактируйте файл wp-config.php через терминал (как объяснялось ранее) и вставьте следующий код в любом месте сверху:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="php" class="language-php">define( 'AS3CF_SETTINGS', serialize( array(
    'provider' =&gt; 'aws',
    'use-server-roles' =&gt; true,
) ) );
</code></pre>
<!-- /wp:code -->

Вернемся к настройкам плагина, там есть вкладка Storage Provider &gt; Bucket, где мы должны выбрать ведро, которое мы создали для размещения наших изображений.

<img sizes="100vw" srcset="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/34-selecting-bucket-WP-offload-media-lite.png 400w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_800/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/34-selecting-bucket-WP-offload-media-lite.png 800w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1200/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/34-selecting-bucket-WP-offload-media-lite.png 1200w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1600/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/34-selecting-bucket-WP-offload-media-lite.png 1600w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_2000/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/34-selecting-bucket-WP-offload-media-lite.png 2000w" width="800" height="627" src="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/34-selecting-bucket-WP-offload-media-lite.png" alt="Selecting the bucket for WP Offload Media Lite">

Выбор ведра для WP Offload Media Lite. (Большой предварительный просмотр)

На следующем экране мы можем настроить разрешения на доступ к активам или нажать на “Keep Bucket Security As Is”, что завершит настройку ведра.

Наконец, давайте сделаем так, чтобы плагин всегда получал активы, используя HTTPS. На вкладке ”Настройки доставки" выберите “Force HTTPS”, а затем "Сохранить изменения".

<img sizes="100vw" srcset="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/35-media-force-https-on.png 400w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_800/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/35-media-force-https-on.png 800w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1200/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/35-media-force-https-on.png 1200w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1600/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/35-media-force-https-on.png 1600w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_2000/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/35-media-force-https-on.png 2000w" width="800" height="627" src="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/35-media-force-https-on.png" alt="Media Force HTTPS switched on">

Media Force HTTPS включен. (Большой предварительный просмотр)

Настройки плагина завершены. Мы протестируем его, перейдя в Media &gt; Add New, загрузив изображение и проверив URL его файла. Если все идет хорошо, он должен начинаться с URL bucket.

<img sizes="100vw" srcset="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/36-wordpress-demo-settings-image-upload-bucket.png 400w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_800/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/36-wordpress-demo-settings-image-upload-bucket.png 800w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1200/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/36-wordpress-demo-settings-image-upload-bucket.png 1200w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1600/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/36-wordpress-demo-settings-image-upload-bucket.png 1600w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_2000/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/36-wordpress-demo-settings-image-upload-bucket.png 2000w" width="800" height="627" src="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/36-wordpress-demo-settings-image-upload-bucket.png" alt="Image uploaded to bucket">

Изображение загружено в bucket. (Большой предварительный просмотр)Распространение изображений через CDN

Мы почти закончили настройку сайта. Осталось сделать только одну вещь: Добавить CDN для доступа к изображениям, чтобы они обслуживались из ближайшего к пользователю места, уменьшая задержку и улучшая общую производительность сайта.

Для этого перейдите на вкладку ”Сеть" и нажмите "Создать дистрибутив".

<img sizes="100vw" srcset="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/37-amazon-lightsail-networking-dashboard-wordpress.png 400w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_800/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/37-amazon-lightsail-networking-dashboard-wordpress.png 800w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1200/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/37-amazon-lightsail-networking-dashboard-wordpress.png 1200w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1600/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/37-amazon-lightsail-networking-dashboard-wordpress.png 1600w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_2000/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/37-amazon-lightsail-networking-dashboard-wordpress.png 2000w" width="800" height="627" src="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/37-amazon-lightsail-networking-dashboard-wordpress.png" alt="Networking dashboard">

Сетевая приборная панель. (Большой предварительный просмотр)

На экране ”Создание дистрибутива" выберите ведро в качестве источника дистрибутива.

Примечание: Запрос изображения будет обработан граничным местоположением рядом с пользователем, которое сначала получит актив из ведра, кэширует его и в дальнейшем будет обслуживать его из этого местоположения.

<img sizes="100vw" srcset="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/38-amazon-lightsail-choosing-origin-CDN-distribution.png 400w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_800/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/38-amazon-lightsail-choosing-origin-CDN-distribution.png 800w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1200/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/38-amazon-lightsail-choosing-origin-CDN-distribution.png 1200w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1600/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/38-amazon-lightsail-choosing-origin-CDN-distribution.png 1600w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_2000/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/38-amazon-lightsail-choosing-origin-CDN-distribution.png 2000w" width="800" height="627" src="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/38-amazon-lightsail-choosing-origin-CDN-distribution.png" alt="Choosing the origin for the CDN distribution">

Выбор места происхождения для распространения CDN. (Большой предварительный просмотр)

Структура ценообразования плоская. Выберите тарифный план на 50 ГБ по цене $2,50/месяц, который предоставляется бесплатно в течение первого года.

Затем укажите уникальное имя для дистрибутива и нажмите ”Создать дистрибутив".

<img sizes="100vw" srcset="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/39-amazon-lightsail-creating-CDN-distribution.png 400w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_800/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/39-amazon-lightsail-creating-CDN-distribution.png 800w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1200/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/39-amazon-lightsail-creating-CDN-distribution.png 1200w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1600/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/39-amazon-lightsail-creating-CDN-distribution.png 1600w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_2000/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/39-amazon-lightsail-creating-CDN-distribution.png 2000w" width="800" height="627" src="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/39-amazon-lightsail-creating-CDN-distribution.png" alt="Creating a CDN distribution">

Создание дистрибутива CDN. (Большой предварительный просмотр)

Теперь дистрибутив создан. В правом верхнем углу мы видим домен, с которого будет осуществляться доступ к нашим активам, в форме {subdomain}.cloudfront.net (мы можем изменить его на пользовательский домен на вкладке Пользовательские домены).

<img sizes="100vw" srcset="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/40-amazon-lightsail-visualizing-CDN-distribution-doman.png 400w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_800/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/40-amazon-lightsail-visualizing-CDN-distribution-doman.png 800w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1200/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/40-amazon-lightsail-visualizing-CDN-distribution-doman.png 1200w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1600/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/40-amazon-lightsail-visualizing-CDN-distribution-doman.png 1600w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_2000/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/40-amazon-lightsail-visualizing-CDN-distribution-doman.png 2000w" width="800" height="627" src="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/40-amazon-lightsail-visualizing-CDN-distribution-doman.png" alt="Visualizing the CDN distribution domain">

Визуализация домена распространения CDN. (Большой предварительный просмотр)

Мы должны изменить настройки WP Offload Media Lite, чтобы указать, что изображения будут передаваться из CDN.

Для этого перейдите на вкладку Delivery Settings и отредактируйте провайдера (в настоящее время это Amazon S3).

<img sizes="100vw" srcset="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/41-amazon-lightsail-delivery-settings-WP-offload-media-lite.png 400w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_800/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/41-amazon-lightsail-delivery-settings-WP-offload-media-lite.png 800w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1200/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/41-amazon-lightsail-delivery-settings-WP-offload-media-lite.png 1200w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1600/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/41-amazon-lightsail-delivery-settings-WP-offload-media-lite.png 1600w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_2000/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/41-amazon-lightsail-delivery-settings-WP-offload-media-lite.png 2000w" width="800" height="627" src="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/41-amazon-lightsail-delivery-settings-WP-offload-media-lite.png" alt="Delivery Settings for WP Offload Media Lite">

Настройки доставки для WP Offload Media Lite. (Большой предварительный просмотр)

Выберите “Amazon CloudFront” и нажмите ”Сохранить поставщика доставки".

<img sizes="100vw" srcset="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/42-amazon-lightsail-updating-delivery-provider-WP-offload-media-lite.png 400w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_800/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/42-amazon-lightsail-updating-delivery-provider-WP-offload-media-lite.png 800w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1200/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/42-amazon-lightsail-updating-delivery-provider-WP-offload-media-lite.png 1200w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1600/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/42-amazon-lightsail-updating-delivery-provider-WP-offload-media-lite.png 1600w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_2000/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/42-amazon-lightsail-updating-delivery-provider-WP-offload-media-lite.png 2000w" width="800" height="627" src="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/42-amazon-lightsail-updating-delivery-provider-WP-offload-media-lite.png" alt="Updating the Delivery Provider for WP Offload Media Lite">

Обновление поставщика доставки для WP Offload Media Lite. (Большой предварительный просмотр)

Теперь вернитесь на вкладку ”Настройки доставки", там есть новый раздел "Использовать пользовательское доменное имя (CNAME)". Вставьте туда домен доставки и нажмите "Сохранить изменения".

<img sizes="100vw" srcset="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/43-amazon-lightsail-updating-distribution-doman-wordpress-settings.png 400w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_800/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/43-amazon-lightsail-updating-distribution-doman-wordpress-settings.png 800w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1200/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/43-amazon-lightsail-updating-distribution-doman-wordpress-settings.png 1200w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1600/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/43-amazon-lightsail-updating-distribution-doman-wordpress-settings.png 1600w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_2000/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/43-amazon-lightsail-updating-distribution-doman-wordpress-settings.png 2000w" width="800" height="627" src="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/43-amazon-lightsail-updating-distribution-doman-wordpress-settings.png" alt="Updating the distribution domain">

Обновление домена распределения. (Большой предварительный просмотр)

Чтобы проверить это, еще раз перейдите в Media &gt; Add New, загрузите изображение и проверьте, что URL файла теперь начинается с домена распространения.

<img sizes="100vw" srcset="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/44-wordpress-site-settings-validating-image-served-from-CDN.png 400w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_800/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/44-wordpress-site-settings-validating-image-served-from-CDN.png 800w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1200/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/44-wordpress-site-settings-validating-image-served-from-CDN.png 1200w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1600/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/44-wordpress-site-settings-validating-image-served-from-CDN.png 1600w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_2000/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/44-wordpress-site-settings-validating-image-served-from-CDN.png 2000w" width="800" height="627" src="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/44-wordpress-site-settings-validating-image-served-from-CDN.png" alt="Validating that the image is served from the CDN">

Проверка того, что изображение передается из CDN. (Большой предварительный просмотр)

Успех! Доступ к нашему сайту WordPress теперь будет обслуживаться AWS CDN, что значительно увеличит производительность сайта.

<img sizes="100vw" srcset="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/45-wordpress-blog-post-with-image.png 400w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_800/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/45-wordpress-blog-post-with-image.png 800w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1200/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/45-wordpress-blog-post-with-image.png 1200w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1600/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/45-wordpress-blog-post-with-image.png 1600w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_2000/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/45-wordpress-blog-post-with-image.png 2000w" width="800" height="683" src="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/wordpress-site-hosted-by-amazon-lightsail/45-wordpress-blog-post-with-image.png" alt="WordPress blog post with image">

Запись в блоге WordPress с изображением. (Большой предварительный просмотр)Мы закончили, теперь ваша очередь

Lightsail предоставляет все необходимые мощности для размещения наших веб-сайтов, как мы привыкли к AWS, но делает это намного проще, чем когда-либо прежде. В этой статье мы рассмотрели, как быстро и легко запустить сайт WordPress (весь процесс занял у меня от 15 до 30 минут).

Lightsail удобно предлагает плоскую структуру ценообразования, которая убирает все сюрпризы из наших счетов. И вы можете попробовать его, не потратив ни копейки: первые три месяца бесплатно. Так что проверьте!
