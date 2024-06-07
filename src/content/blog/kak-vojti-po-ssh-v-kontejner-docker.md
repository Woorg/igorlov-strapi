---
title: Как войти по SSH в контейнер Docker
meta_title: Как войти по SSH в контейнер Docker - Фул Фронт Дев
description: >-
  Контейнеры Docker представляют собой изолированные среды для запуска
  приложений, обеспечивающие согласованность и переносимость. При работе с
  контейнерами...
date: 2023-08-19T17:38:00.000Z
image: ../../assets/images/undefined-Aug-19-2023.avif
categories:
  - Учебник
author: Igor Gorlov
tags:
  - Docker
  - Ssh
draft: false
lastmod: 2024-03-20T21:26:47.091Z
---

Контейнеры Docker представляют собой изолированные среды для запуска приложений, обеспечивающие согласованность и переносимость. При работе с контейнерами Docker очень важно иметь возможность просматривать их оболочки и подключаться к ним. Это позволяет выполнять команды, устранять неполадки и следить за поведением контейнеров в режиме реального времени.

В этой статье мы рассмотрим, как получить доступ к локальным и удаленным контейнерам Docker для их обслуживания и обновления.

<!-- wp:rank-math/toc-block {"title":"Оглавление","headings":[{"key":"75afb3fe-7306-455b-93c6-9fc7005030d0","content":"Зачем нужен доступ к контейнерам","level":2,"link":"#зачем-нужен-доступ-к-контейнерам","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"acf5de47-307f-4ce8-b643-970762a868f4","content":"Как и зачем использовать команду docker exec","level":3,"link":"#как-и-зачем-использовать-команду-docker-exec","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"b2819741-a013-4185-bb72-0e409f2466b5","content":"Как и зачем использовать команду docker run","level":3,"link":"#как-и-зачем-использовать-команду-docker-run","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"9f836164-bf89-45be-bf3b-08a30b510f8e","content":"Как и зачем использовать команду docker attach","level":3,"link":"#как-и-зачем-использовать-команду-docker-attach","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"b69aace4-16e1-4465-8a8e-9038c9fc7cd3","content":"Как и зачем использовать Docker Compose","level":3,"link":"#как-и-зачем-использовать-docker-compose","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"c977be5c-319b-467b-8936-11fc97bd4b41","content":"Как добавить SSH-сервер в контейнер Docker","level":2,"link":"#как-добавить-ssh-сервер-в-контейнер-docker","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"a4de7c25-123e-401b-92b7-1966133c8572","content":"Включение SSH-сервера при сборке контейнера Docker","level":3,"link":"#включение-ssh-сервера-при-сборке-контейнера-docker","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"511c0edf-986b-48c5-a098-c45c28ccaae4","content":"Временное добавление SSH-сервера к запущенному контейнеру Docker","level":3,"link":"#временное-добавление-ssh-сервера-к-запущенному-контейнеру-docker","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"37530487-f9a3-4f33-8e95-d6129a760e7a","content":"Подключение к SSH-серверу контейнера","level":3,"link":"#подключение-к-ssh-серверу-контейнера","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"93f375b4-c225-42dd-82b3-375857543239","content":"Резюме","level":2,"link":"#резюме","disable":false,"isUpdated":false,"isGeneratedLink":true}],"listStyle":"ul"} -->
<div class="wp-block-rank-math-toc-block" id="rank-math-toc"><h2>Оглавление</h2><nav><ul><li class=""><a href="#зачем-нужен-доступ-к-контейнерам">Зачем нужен доступ к контейнерам</a><ul><li class=""><a href="#как-и-зачем-использовать-команду-docker-exec">Как и зачем использовать команду docker exec</a></li><li class=""><a href="#как-и-зачем-использовать-команду-docker-run">Как и зачем использовать команду docker run</a></li><li class=""><a href="#как-и-зачем-использовать-команду-docker-attach">Как и зачем использовать команду docker attach</a></li><li class=""><a href="#как-и-зачем-использовать-docker-compose">Как и зачем использовать Docker Compose</a></li></ul></li><li class=""><a href="#как-добавить-ssh-сервер-в-контейнер-docker">Как добавить SSH-сервер в контейнер Docker</a><ul><li class=""><a href="#включение-ssh-сервера-при-сборке-контейнера-docker">Включение SSH-сервера при сборке контейнера Docker</a></li><li class=""><a href="#временное-добавление-ssh-сервера-к-запущенному-контейнеру-docker">Временное добавление SSH-сервера к запущенному контейнеру Docker</a></li><li class=""><a href="#подключение-к-ssh-серверу-контейнера">Подключение к SSH-серверу контейнера</a></li></ul></li><li class=""><a href="#резюме">Резюме</a></li></ul></nav></div>
<!-- /wp:rank-math/toc-block -->

<h2 class="wp-block-heading" id="зачем-нужен-доступ-к-контейнерам">Зачем нужен доступ к контейнерам</h2>

Доступ к контейнерам необходим для эффективного управления и устранения неполадок в контейнерных средах. Он позволяет анализировать журналы и информацию о времени выполнения контейнера, легко выявлять и устранять ошибки.

Доступ к контейнерам также позволяет выполнять команды для быстрого обновления конфигурации, установки пакетов и других административных задач. При отсутствии доступа пришлось бы перестраивать весь образ контейнера с обновленной конфигурацией, что может занять много времени и быть неэффективным.

Контейнеры также должны иметь возможность взаимодействовать друг с другом в распределенной экосистеме приложений. Поэтому необходим доступ к контейнерам для выполнения диагностических команд и обеспечения нормальной связи между контейнерами.

Хотя доступ к контейнерам можно получить и через традиционный протокол Secure Shell (SSH), Docker предоставляет несколько встроенных методов, позволяющих сэкономить время и повысить эффективность. К ним относятся:

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>docker exec</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>docker run</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>docker attach</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>docker compose exec</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>docker compose run</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

Каждый метод имеет свои особенности и преимущества. Знание того, какая команда подходит для конкретного случая, поможет оптимизировать подход.

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="как-и-зачем-использовать-команду-docker-exec">Как и зачем использовать команду docker exec</h3>

Команда docker exec позволяет получить доступ к сеансу оболочки работающего контейнера и выполнять команды без необходимости запуска нового экземпляра. Обратите внимание, что эта команда не является постоянной, то есть она не будет повторно выполнена, если контейнер выключится или перезапустится.

Чтобы получить доступ к запущенному контейнеру, необходимо знать его имя или идентификатор (его можно получить, выполнив команду docker ps -a). Затем введите его в следующую команду:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">docker exec -it  /bin/bash</code></pre>
<!-- /wp:code -->

<img width="1154" height="635" src="https://kinsta.com/wp-content/uploads/2023/07/ssh-docker-access-container-docker-exec.jpg" alt="The docker exec command executed in the terminal to spawn a bash shell inside a container.">Доступ к контейнеру с помощью docker exec

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="как-и-зачем-использовать-команду-docker-run">Как и зачем использовать команду docker run</h3>

Команда docker run позволяет запустить новый контейнер и сразу же получить доступ к его оболочке. По умолчанию этот контейнер не прикрепляется к текущему сеансу оболочки, но его можно прикрепить с помощью опции -it.

Следующая команда позволяет запустить новый контейнер, присоединить его к текущему сеансу оболочки и вызвать оболочку bash:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">docker run -it  /bin/bash</code></pre>
<!-- /wp:code -->

<img width="1153" height="633" src="https://kinsta.com/wp-content/uploads/2023/07/ssh-docker-access-container-docker-run.jpg" alt="The docker run command executed in the terminal to start a container and spawn a bash shell in it.">Доступ к контейнеру при помощи docker run.

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="как-и-зачем-использовать-команду-docker-attach">Как и зачем использовать команду docker attach</h3>

Команда docker attach полезна для мониторинга и отладки работы контейнеров. Она позволяет подключаться к работающему контейнеру и просматривать его стандартные потоки ввода, вывода и ошибок в режиме реального времени.

Для ее использования запустите контейнер с помощью команды docker run. Затем отсоединитесь от него, нажав Ctrl+P и Ctrl+Q. Вместо этого можно установить флаг -d для данного контейнера.

После запуска контейнера в фоновом режиме доступ к нему можно получить с помощью следующей команды:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">docker attach </code></pre>
<!-- /wp:code -->

<img width="1152" height="633" src="https://kinsta.com/wp-content/uploads/2023/07/ssh-docker-access-container-docker-attach.jpg" alt="The docker attach executed in the terminal to access a container.">Использование docker attach для доступа к контейнеру.

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="как-и-зачем-использовать-docker-compose">Как и зачем использовать Docker Compose</h3>

Docker Compose позволяет создавать и исполнять многоконтейнерные Docker-приложения. С его помощью можно определить сервисы, из которых состоит приложение, в YAML-файле, а затем использовать этот файл для запуска и управления всеми контейнерами вместе. Он подходит для сред разработки и тестирования, где необходимо быстро запускать сложные среды.

Чтобы получить доступ к конкретному уже запущенному контейнеру, выполните следующую команду docker compose, после которой укажите имя сервиса и команду, которую необходимо запустить:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">docker compose exec app /bin/bash</code></pre>
<!-- /wp:code -->

Эта команда запускает новый процесс внутри контейнера, выполняющий указанную команду. С ее помощью можно запустить любую команду внутри контейнера, включая интерактивные оболочки типа bash.

Аналогично, если вы хотите запустить новый контейнер с помощью Docker Compose и получить к нему немедленный доступ, выполните следующую команду:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">docker compose run app /bin/bash</code></pre>
<!-- /wp:code -->

Обратите внимание, что docker compose имеет два различных синтаксиса: docker-compose (версия 1) и code&gt;docker compose (версия 2). Синтаксис версии 2 является более гибким и мощным, поэтому рекомендуется использовать его при любой возможности.

<img width="1147" height="603" src="https://kinsta.com/wp-content/uploads/2023/07/ssh-docker-access-container-docker-compose.jpg" alt="The docker compose run and docker compose exec commands executed in the terminal to access containers.">Использование Docker Compose для доступа к контейнерам

<h2 class="wp-block-heading" id="как-добавить-ssh-сервер-в-контейнер-docker">Как добавить SSH-сервер в контейнер Docker</h2>

Добавление SSH-сервера к контейнеру Docker помогает управлять контейнерными приложениями и устранять их неисправности. SSH-сервер позволяет удаленно получать доступ к контейнерам, управлять ими, выполнять команды и просматривать журналы из любого места.

Добавить SSH-сервер можно, включив его в Dockerfile перед сборкой контейнера, а затем подключив его с помощью SSH-клиента. Также можно добавить временный доступ к SSH, породив оболочку внутри работающего контейнера и установив в ней SSH-сервер.

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="включение-ssh-сервера-при-сборке-контейнера-docker">Включение SSH-сервера при сборке контейнера Docker</h3>

При сборке контейнера Docker включение SSH-сервера внутрь контейнера может быть полезно, если требуется постоянный SSH-доступ к нему. Это позволяет получить удаленный доступ к контейнеру и отладить его в процессе разработки или устранения неполадок. Также включение SSH-сервера позволяет безопасно передавать файлы в контейнер и из него.

Чтобы включить SSH-сервер во время сборки, внесите несколько изменений в Dockerfile контейнера. Вот пример Dockerfile, включающего SSH-сервер:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">FROM debian:latest

RUN apt-get update &amp;&amp; apt-get install -y openssh-server
RUN mkdir /var/run/sshd
RUN echo 'root:root123' | chpasswd
RUN sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config

EXPOSE 22

CMD ["/usr/sbin/sshd", "-D"]</code></pre>
<!-- /wp:code -->

<img width="1153" height="635" src="https://kinsta.com/wp-content/uploads/2023/07/ssh-docker-build-ssh-server.jpg" alt="An SSH command executed in the terminal to access a container.">Контейнер Docker, построенный с использованием SSH-сервера

Этот код собирает контейнер с последним образом Debian и устанавливает SSH-сервер. Он также создает новый каталог для SSH-сервера, устанавливает пароль root и включает вход root через конфигурацию SSH.

Наконец, он открывает порт 22, порт по умолчанию SSH.

Для использования этого Dockerfile необходимо собрать контейнер с помощью команды docker build, а затем запустить его с помощью docker run. Вот пример:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">docker build . -t ssh-container 
docker run -d -p 2222:22 ssh-container</code></pre>
<!-- /wp:code -->

Эта команда создает контейнер с помощью Dockerfile и помечает его именем ssh-container. Для запуска контейнера в отсоединенном режиме используйте команду -d. Далее с помощью команды -p пропишите порт 22 внутри контейнера на порт 2222 на хост-машине.

После запуска контейнера можно подключиться к нему по SSH с помощью команды ssh:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">ssh root@localhost-p 2222</code></pre>
<!-- /wp:code -->

Когда появится запрос на ввод пароля, введите пароль, заданный в файле YAML. В данном случае это “root123”. Теперь вы подключены к SSH-серверу, запущенному внутри контейнера. Это означает, что вы можете выполнять удаленную отладку или передавать файлы в контейнер и из него.

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="временное-добавление-ssh-сервера-к-запущенному-контейнеру-docker">Временное добавление SSH-сервера к запущенному контейнеру Docker</h3>

Также можно добавить SSH-сервер в работающий контейнер с помощью команды docker exec:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">docker exec &lt;container_name_or_id&gt; /bin/bash</code></pre>
<!-- /wp:code -->

Получив доступ к контейнеру, установите сервер OpenSSH и запустите демон SSH:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">apt update &amp;&amp; apt install openssh-server &amp;&amp; /usr/sbin/openssh -D</code></pre>
<!-- /wp:code -->

Это открывает новый экземпляр SSH-сервера внутри контейнера. Теперь вы можете подключиться к нему с помощью SSH-клиента на своей локальной машине.

Обратите внимание, что подключиться к контейнеру по SSH можно только в том случае, если вы или ваша команда открыли порт SSH на этапе выполнения или сборки.

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="подключение-к-ssh-серверу-контейнера">Подключение к SSH-серверу контейнера</h3>

Начните с определения IP-адреса или имени хоста контейнера с помощью платформы или сервиса управления контейнерами.

Для подключения к IP-адресу используйте команду ssh:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">ssh [username]@[container-ip-address]</code></pre>
<!-- /wp:code -->

В ответ на запрос введите пароль для указанного имени пользователя. Вместо пароля некоторые SSH-серверы могут использовать защиту на основе ключей.

Теперь вы должны иметь удаленный терминальный сеанс, подключенный к контейнеру.

<h2 class="wp-block-heading" id="резюме">Резюме</h2>

По мере роста популярности Docker важно иметь возможность проверять контейнеры, работающие в вашей среде. Такая возможность позволяет диагностировать и устранять проблемы в процессе разработки.

Docker также предоставляет универсальный набор встроенных команд для решения различных задач разработки. С помощью этих команд можно оптимизировать рабочий процесс, не прибегая к традиционным методам SSH.
