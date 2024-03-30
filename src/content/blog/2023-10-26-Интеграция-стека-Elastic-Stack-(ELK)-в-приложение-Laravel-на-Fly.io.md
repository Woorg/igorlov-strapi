---
title: Интеграция стека Elastic Stack (ELK) в приложение Laravel
meta_title: |
  Интеграция Стека Elastic Stack (ELK) В Приложение Laravel...
description: >
  "Сколько новых пользователей у нас было вчера?" "Больше ли их, чем два дня
  назад?" Если вы когда-либо сталкивались с такими вопросами, то повезло!
  Сегодня мы...
date: 2023-10-25T23:35:17.207Z
image: >-
  ../../assets/images/integraciya-steka-elastic-stack-elk-v-prilozhenie-laravel-Oct-26-2023.avif
categories:
  - Как закодить
author: Igor Gorlov
tags:
  - Laravel
  - Elastic Stack
draft: false
keywords:
  - Elastic Stack
type: blog
slug: integraciya-steka-elastic-stack-elk-v-prilozhenie-laravel
lastmod: 2024-03-20T21:26:46.459Z
---

”Сколько новых пользователей у нас было вчера?” "Больше ли их, чем два дня назад?” Если вы когда-либо сталкивались с такими вопросами, то повезло! Сегодня мы рассмотрим Elastic Stack и узнаем, как его можно запустить рядом с приложением Laravel. Затем я покажу вам, как вести журнал каждого нового пользователя, который регистрируется, чтобы вы могли отслеживать взлет вашего приложения к успеху!”

Elastic Stack - это мощный инструмент, который полезен любому разработчику. Поскольку это введение, я держусь на поверхности, но пожалуйста, дайте знать, если вам интересно узнать больше! Вы можете найти меня в Twitter или в категории Laravel нашего сообщества Fly.io.

## Итак, что такое Elastic Stack?

Просто говоря, Elastic Stack (ранее известный как ELK Stack) - это набор приложений для обработки данных, их обработки и индексирования, а также представления этих данных. Он широко используется для журналирования, поиска, аналитики и многих других задач. Сегодня мы сосредоточимся на части, связанной с журналированием, что является распространенным случаем использования для разработчиков приложений, подобных вам.

Если вам нужно больше информации о Elastic Stack, создатели объясняют всё гораздо яснее, чем я могу, прямо здесь: Что такое набор инструментов Elk?

## Настройка приложений

Давайте начнем с настройки наших приложений. Затем мы добавим логику Laravel для записи журналов, и я покажу вам, как настроить Kibana.

Мы создадим четыре приложения на Fly.io: приложение Laravel с приложением базы данных MySQL, а также приложения Elasticsearch и Kibana. Мы не будем использовать Logstash или Beats, потому что мы можем вести журнал непосредственно из Laravel в Elasticsearch. Кроме того, это сократит объем этой статьи, чтобы вам не пришлось слишком много думать в конце.

### Скромное предложение

Вы свободны настраивать приложения так, как вам нравится, но вот как я их настроил: я создал каталог logging-app, а внутри него я создал каталог для каждого приложения, вот так:

- logging-app
  - laravel
  - mysql
  - elasticsearch
  - kibana

## здание нового приложения Laravel

Для этого примерного приложения мы будем использовать Breeze и Livewire, а также базу данных MySQL. Вы можете найти всю необходимую информацию здесь: https://fly.io/laravel-bytes/full-stack-laravel/

Вкратце, нам нужно создать новое приложение Laravel, установить Breeze и затем подключить его к недавно созданной базе данных MySQL. Не забудьте выполнить миграции после настройки! Подсказка: в статье о полнофункциональном Laravel рассказывается о автоматизации этого в разделе ”Миграция при развертывании".

Как только мы сможем выполнять вход и регистрировать пользователей, мы сможем начать журналирование!

## Настройка Elasticsearch

Как объяснено введении, мы будем настраивать Elasticsearch и Kibana. Для начала перейдите на официальный репозиторий Dockerfile Elastic по адресу https://github.com/elastic/dockerfiles и загрузите репозитории Elastic и Kibana. Нам понадобятся не только файлы Docker, но и всю директорию! Также нам придется внести некоторые изменения, чтобы всё заработало правильно. Не волнуйтесь, я проведу вас через это!

Давайте сначала рассмотрим настроенный Dockerfile Elastic:

```docker
################################################################################
# This Dockerfile was generated from the template at distribution/src/docker/Dockerfile
#
# Beginning of multi stage Dockerfile
################################################################################

################################################################################
# Build stage 1 `builder`:
# Extract Elasticsearch artifact
################################################################################

FROM ubuntu:20.04 AS builder

# Install required packages to extract the Elasticsearch distribution

RUN for iter in 1 2 3 4 5 6 7 8 9 10; do \
      apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y curl && \
      exit_code=0 && break || \
        exit_code=$? && echo "apt-get error: retry $iter in 10s" && sleep 10; \
    done; \
    exit $exit_code

# `tini` is a tiny but valid init for containers. This is used to cleanly
# control how ES and any child processes are shut down.
#
# The tini GitHub page gives instructions for verifying the binary using
# gpg, but the keyservers are slow to return the key and this can fail the
# build. Instead, we check the binary against the published checksum.
RUN set -eux ; \
    tini_bin="" ; \
    case "$(arch)" in \
        aarch64) tini_bin='tini-arm64' ;; \
        x86_64)  tini_bin='tini-amd64' ;; \
        *) echo >&2 ; echo >&2 "Unsupported architecture $(arch)" ; echo >&2 ; exit 1 ;; \
    esac ; \
    curl --retry 10 -S -L -O https://github.com/krallin/tini/releases/download/v0.19.0/${tini_bin} ; \
    curl --retry 10 -S -L -O https://github.com/krallin/tini/releases/download/v0.19.0/${tini_bin}.sha256sum ; \
    sha256sum -c ${tini_bin}.sha256sum ; \
    rm ${tini_bin}.sha256sum ; \
    mv ${tini_bin} /bin/tini ; \
    chmod 0555 /bin/tini

RUN mkdir /usr/share/elasticsearch
WORKDIR /usr/share/elasticsearch

RUN curl --retry 10 -S -L --output /tmp/elasticsearch.tar.gz https://artifacts-no-kpi.elastic.co/downloads/elasticsearch/elasticsearch-8.4.3-linux-$(arch).tar.gz

RUN tar -zxf /tmp/elasticsearch.tar.gz --strip-components=1

# The distribution includes a `config` directory, no need to create it
COPY config/elasticsearch.yml config/
COPY config/log4j2.properties config/log4j2.docker.properties

#  1. Configure the distribution for Docker
#  2. Create required directory
#  3. Move the distribution's default logging config aside
#  4. Move the generated docker logging config so that it is the default
#  5. Reset permissions on all directories
#  6. Reset permissions on all files
#  7. Make CLI tools executable
#  8. Make some directories writable. `bin` must be writable because
#     plugins can install their own CLI utilities.
#  9. Make some files writable
RUN sed -i -e 's/ES_DISTRIBUTION_TYPE=tar/ES_DISTRIBUTION_TYPE=docker/' bin/elasticsearch-env && \
    mkdir data && \
    mv config/log4j2.properties config/log4j2.file.properties && \
    mv config/log4j2.docker.properties config/log4j2.properties && \
    find . -type d -exec chmod 0555 {} + && \
    find . -type f -exec chmod 0444 {} + && \
    chmod 0555 bin/* jdk/bin/* jdk/lib/jspawnhelper modules/x-pack-ml/platform/linux-*/bin/* && \
    chmod 0775 bin config config/jvm.options.d data logs plugins && \
    find config -type f -exec chmod 0664 {} +

################################################################################
# Build stage 2 (the actual Elasticsearch image):
#
# Copy elasticsearch from stage 1
# Add entrypoint
################################################################################

FROM ubuntu:20.04

# Change default shell to bash, then install required packages with retries.
RUN yes no | dpkg-reconfigure dash && \
    for iter in 1 2 3 4 5 6 7 8 9 10; do \
      export DEBIAN_FRONTEND=noninteractive && \
      apt-get update && \
      apt-get upgrade -y && \
-     apt-get install -y --no-install-recommends \
-       ca-certificates curl netcat p11-kit unzip zip && \
+     # CUSTOM install gosu as well
+     apt-get install -y --no-install-recommends \
+       ca-certificates curl netcat p11-kit unzip zip gosu && \
      apt-get clean && \
      rm -rf /var/lib/apt/lists/* && \
      exit_code=0 && break || \
        exit_code=$? && echo "apt-get error: retry $iter in 10s" && sleep 10; \
    done; \
    exit $exit_code

RUN groupadd -g 1000 elasticsearch && \
    adduser --uid 1000 --gid 1000 --home /usr/share/elasticsearch elasticsearch && \
    adduser elasticsearch root && \
    chown -R 0:0 /usr/share/elasticsearch

ENV ELASTIC_CONTAINER true

WORKDIR /usr/share/elasticsearch

COPY --from=builder --chown=0:0 /usr/share/elasticsearch /usr/share/elasticsearch
COPY --from=builder --chown=0:0 /bin/tini /bin/tini

ENV PATH /usr/share/elasticsearch/bin:$PATH

COPY bin/docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh

+ #CUSTOM copy over my own script
+COPY bin/setup.sh /usr/local/bin/setup.sh

# 1. Sync the user and group permissions of /etc/passwd
# 2. Set correct permissions of the entrypoint
# 3. Ensure that there are no files with setuid or setgid, in order to mitigate "stackclash" attacks.
#    We've already run this in previous layers so it ought to be a no-op.
# 4. Replace OpenJDK's built-in CA certificate keystore with the one from the OS
#    vendor. The latter is superior in several ways.
#    REF: https://github.com/elastic/elasticsearch-docker/issues/171
# 5. Tighten up permissions on the ES home dir (the permissions of the contents are handled earlier)
# 6. You can't install plugins that include configuration when running as `elasticsearch` and the `config`
#    dir is owned by `root`, because the installed tries to manipulate the permissions on the plugin's
#    config directory.
RUN chmod g=u /etc/passwd && \
    chmod 0555 /usr/local/bin/docker-entrypoint.sh && \
+   #CUSTOM: set correct permissions for our own setup.sh script
+   chmod 0555 /usr/local/bin/setup.sh && \
    find / -xdev -perm -4000 -exec chmod ug-s {} + && \
    chmod 0775 /usr/share/elasticsearch && \
    chown elasticsearch bin config config/jvm.options.d data logs plugins

# Update "cacerts" bundle to use Ubuntu's CA certificates (and make sure it
# stays up-to-date with changes to Ubuntu's store)
COPY bin/docker-openjdk /etc/ca-certificates/update.d/docker-openjdk
RUN /etc/ca-certificates/update.d/docker-openjdk

EXPOSE 9200 9300

LABEL org.label-schema.build-date="2022-10-04T10:35:41.162162476Z" \
  org.label-schema.license="Elastic-License-2.0" \
  org.label-schema.name="Elasticsearch" \
  org.label-schema.schema-version="1.0" \
  org.label-schema.url="https://www.elastic.co/products/elasticsearch" \
  org.label-schema.usage="https://www.elastic.co/guide/en/elasticsearch/reference/index.html" \
  org.label-schema.vcs-ref="42f05b9372a9a4a470db3b52817899b99a76ee73" \
  org.label-schema.vcs-url="https://github.com/elastic/elasticsearch" \
  org.label-schema.vendor="Elastic" \
  org.label-schema.version="8.4.3" \
  org.opencontainers.image.created="2022-10-04T10:35:41.162162476Z" \
  org.opencontainers.image.documentation="https://www.elastic.co/guide/en/elasticsearch/reference/index.html" \
  org.opencontainers.image.licenses="Elastic-License-2.0" \
  org.opencontainers.image.revision="42f05b9372a9a4a470db3b52817899b99a76ee73" \
  org.opencontainers.image.source="https://github.com/elastic/elasticsearch" \
  org.opencontainers.image.title="Elasticsearch" \
  org.opencontainers.image.url="https://www.elastic.co/products/elasticsearch" \
  org.opencontainers.image.vendor="Elastic" \
  org.opencontainers.image.version="8.4.3"

+ #CUSTOM entrypoint
+ENTRYPOINT ["/usr/local/bin/setup.sh"]
# Dummy overridable parameter parsed by entrypoint
CMD ["eswrapper"]

-USER elasticsearch:root
+#CUSTOM do not run as elasticsearch but as root
+#USER elasticsearch:root

################################################################################
# End of multi-stage Dockerfile
################################################################################

```

Основное изменение по сравнению с исходным Dockerfile заключается в том, что мы будем использовать наш собственный скрипт в качестве точки входа (entrypoint), который затем запустит ”официальный" скрипт. Таким образом, мы сможем выполнять наш собственный скрипт с правами суперпользователя (root), а "официальный" скрипт - с правами пользователя Elasticsearch. Запуск от имени суперпользователя позволяет настроить все необходимые параметры. Не волнуйтесь, я объясню дополнительно, когда дойдем до этого. Давайте сначала рассмотрим каждое изменение по сравнению с исходным файлом:

- Строки 89-91: На этапе сборки 2 мы также устанавливаем gosu, чтобы выполнять команды от имени другого пользователя.
- Строки 115-116: Мы копируем собственный скрипт setup.sh.
- Строки 131-132: Устанавливаем разрешения для нашего собственного скрипта, чтобы его можно было правильно выполнить.
- Строки 164-165: Здесь мы используем наш собственный скрипт setup.sh в качестве точки входа.
- Строки 169-170: Здесь мы комментируем команду USER, чтобы точка входа выполнялась не от имени пользователя Elasticsearch, а от имени суперпользователя (root).

После этого нам нужно создать собственный скрипт setup.sh. Он выполняет настройку некоторых параметров на фактической виртуальной машине, где выполняется приложение, а затем запускает оригинальный скрипт точки входа от имени пользователя Elasticsearch. Убедитесь, что вы создаете этот скрипт в каталоге bin/, так как Dockerfile будет ожидать его скопирования оттуда! Вот как он выглядит:

```bash
#!/bin/bash

# set some parameters that will be checked when ElasticSearch bootstraps
ulimit -n 65535
ulimit -u 4096
sysctl -w vm.max_map_count=262144

gosu elasticsearch:root /usr/local/bin/docker-entrypoint.sh


```

Этот скрипт настраивает конфигурацию виртуальной машины (VM), где он будет запущен, а затем использует gosu для выполнения оригинальной точки входа от имени пользователя Elasticsearch. Мы делаем это в несколько необычном порядке из-за того, что Elasticsearch выполняет некоторые проверки при запуске, и без этого скрипта они завершатся неудачно. По умолчанию Fly.io настроит эти параметры более строго, и проверки завершатся неудачно. Если по какой-то причине вы не можете заснуть, вы можете прочитать об этих проверках здесь: Проверки при запуске Elasticsearch.

Наконец, нам также нужно внести небольшие изменения в конфигурационный файл elasticsearch.yml. Вот как он должен выглядеть:

```yaml
cluster.name: 'docker-cluster'
network.host: 0.0.0.0
# add these:
xpack.security.enabled: false
discovery.type: single-node
```

Установка параметра xpack.security.enabled в значение false отключит большую часть безопасности и позволит использовать протокол HTTP вместо HTTPS. Это упростит настройку, так как нам не придется заниматься сертификатами и подобными вещами, но это всё равно остается вопросом безопасности. Поскольку приложение будет работать в частной сети, которая не доступна публично, я не слишком беспокоюсь об этом.

Все настройки завершены, и мы готовы к запуску! Запустите приложение с помощью команды fly launch, но еще не разворачивайте его, так как у нас есть последнее изменение для внесения. При запуске приложения автоматически будет создан новый файл fly.toml. Откройте его и в разделе [[services]] измените параметр internal_port на 9200, как показано ниже:

```yaml
# ...
[[services]]
  # ...
  internal_port = 9200
  # ...


```

Этот порт будет использоваться для проверки фактической работоспособности приложения. Оно считается здоровым, если приложение отвечает на запросы на этом порту, в противном случае оно считается нездоровым (вы можете найти больше информации здесь). А почему нам именно нужно, чтобы это был порт 9200? Ну, юный падаван, потому что это порт, используемый Elasticsearch по умолчанию.

Единственное, что остается сделать, это предоставить приложению немного больше памяти с помощью команды fly scale memory 1024, иначе оно может ”подвиснуть" при развертывании. Теперь вы можете развернуть приложение и приготовить кофе или чай, пока оно настраивается. Как только вы окрепнете после напитка и ваше приложение будет работать, мы сможем настроить последний элемент головоломки: веб-интерфейс Kibana.

## Настройка Kibana

Теперь мы в самом разгаре! Осталось настроить всего одно приложение, и это, вероятно, самое простое. Вам нужно всего лишь открыть каталог Kibana (вы знаете, тот, который я сказал вам загрузить с GitHub) и найти файл kibana.yml. Внутри этого файла вы найдете переменную с именем elasticsearch.hosts. В настоящее время она установлена на <http://elasticsearch:9200>, но это не сработает. Измените часть URL с elasticsearch на имя вашего приложения Elasticsearch и добавьте .internal после этого:

```yaml
# Default Kibana configuration for docker target
server.host: '0.0.0.0'
server.shutdownTimeout: '5s'
# add your elasticsearch app's name here:
elasticsearch.hosts: ['http://*YOUR_ELASTICSEARCH_APP_NAME_HERE*.internal:9200']
monitoring.ui.container.elasticsearch.enabled: true
```

Помните, я говорил, что использование HTTP не так уж и важно, так как наши приложения находятся в частной сети? Вот почему мы добавляем .internal. В моем случае, мое приложение Elasticsearch называется logging-elasticsearch, поэтому мой URL хостов выглядит как <http://logging-elasticsearch.internal:9200>.

После этого вы можете запустить приложение, но, как и с Elasticsearch, вы не можете развернуть его пока. В сгенерированном файле fly.toml измените параметры internal_port на 5601, это порт Kibana по умолчанию. Таким образом, Fly сможет сообщить, что приложение успешно работает!

Также, как и с Elasticsearch, увеличьте объем памяти до 1024 МБ и разверните приложение!

Давайте быстро проверим, как работает приложение, выполнив команду fly open, которая откроет общедоступный URL приложения, чтобы мы могли убедиться, что всё работает как надо.

Уф, это было немало информации. А теперь перейдем к разделу, где мы действительно будем писать код, а не только настраивать приложения, связывать скрипты, настраивать конфигурации и выполнять команды в терминале. Поехали!

## Логирование при регистрации нового пользователя

Прошло некоторое время, так что вот напоминание о том, что мы на самом деле собрались сделать: мы хотим вести журнал каждого нового пользователя, который регистрируется в вашем приложении, в Elasticsearch, чтобы вы могли отслеживать, сколько новых пользователей зарегистрировалось.

### Одно (1) изменение в настройках окружения

Я предполагаю, что у вас уже есть настройки базы данных, но нам нужно внести еще одно изменение, чтобы наши логи работали должным образом. Если вы откроете fly.toml файл приложения Laravel, вы увидите некоторые переменные в разделе [env]. Закомментируйте LOG_CHANNEL и LOG_LEVEL:

```
    ...
- LOG_CHANNEL = "stderr"
- LOG_LEVEL = "info"
+ #remove these from the env so they won't override the default .env file.
+ #LOG_CHANNEL = "stack"
+ #LOG_LEVEL = "info"
    ...

```

Вот почему: переменные окружения в файле fly.toml переопределят те, которые находятся в файле .env. Таким образом, переменная LOG_CHANNEL будет установлена по умолчанию в stderr, это способ, с помощью которого Fly может захватывать и отображать логи работающего приложения. Мы закомментируем ее и настроим канал stderr позже. Не волнуйтесь, я вас напомню. Закомментировав эти переменные, наше приложение будет брать их из файла .env, а не из fly.toml, что, на мой взгляд, имеет больше смысла.

## Настройка канала логирования

Теперь давайте подключим наше приложение Laravel к логированию ELK.

Тут есть хорошие и плохие новости. Давайте начнем с хороших: Laravel предоставляет несколько каналов логирования ”из коробки". Плохая новость заключается в том, что нет канала логирования по умолчанию, который работал бы с Elasticsearch. Но не переживайте, мы сами создадим такой!

Для этого сначала установите SDK для работы с Elasticsearch в PHP:

```bash
composer require elasticsearch/elasticsearch

```

Чтобы создать канал логирования, нам понадобится некоторая информация о том, как работают эти каналы и как они настраиваются. Под капотом Laravel использует библиотеку Monolog для логирования, которая позволяет логировать данные в различные конечные точки. Для этого Monolog использует обработчики (handlers). К счастью для нас, доступен обработчик ElasticsearchHandler. Вы можете найти документацию по нему здесь, в разделе ”Логирование в базы данных": документация.

Все настроенные каналы логирования можно найти в файле config/logging.php. Все, что нам нужно сделать, чтобы добавить собственный канал логирования в массив каналов, и мы готовы к работе. Мы будем использовать “custom” в качестве драйвера, таким образом, мы сможем использовать фабрику для создания нашего канала логирования. Добавьте следующий код в массив каналов в файле config/logging.php:

```php
'elasticsearch' => [
            'driver' => 'custom',
            'via' => \App\Logging\CreateElasticsearchLogger::class,
            ],

```

Это создаст канал логирования с именем “elasticsearch”. Обработчик для этого канала будет создан с использованием класса CreateElasticsearchLogger. Давайте создадим этот класс:

Создайте новый класс в каталоге app/Logging с именем CreateElasticsearchLogger. В этом классе нам нужен только один метод: \_\_invoke(). Этот класс принимает массив и должен возвращать экземпляр Monolog. Вот как это должно выглядеть:

```php
namespace App\Logging;

use Elastic\Elasticsearch\ClientBuilder;
use Monolog\Handler\ElasticsearchHandler;
use Monolog\Logger;

class CreateElasticsearchLogger
{
    /**
     * Create a custom Monolog instance.
     *
     * @param  array  $config
     * @return \Monolog\Logger
     */
    public function __invoke(array $config)
    {
        $logger = new Logger('elasticsearch');

        //create the client
        $client = ClientBuilder::create()
                    ->setHosts(['http://logging-elasticsearch.internal:9200'])
                    ->build();

        //create the handler
        $options = [
            'index' => 'user_logs',
            'type' => '_doc'
        ];
        $handler = new ElasticsearchHandler($client, $options, Logger::INFO, true);

        $logger->setHandlers(array($handler));

        return $logger;
    }
}


```

Одним из важных моментов стоит отметить индекс в массиве $options. В Elasticsearch индекс подобен базе данных в MySQL. При настройке наших представлений, мы сможем установить шаблон индекса, который указывает, какие индексы нам нужно сопоставить. Здесь есть ОЧЕНЬ много гибкости: вы можете создавать индекс на каждый день, чтобы фильтровать логирование по дням. Или, возможно, индекс на каждого пользователя, чтобы видеть, как каждый пользователь использует ваше приложение. В настоящее время мы оставим это простым и установим индекс в значение “user_logs”.

Если вы хотите использовать несколько индексов, я бы порекомендовал изучить каналы по запросу (on-demand channels). Это каналы, которые создаются в тот момент, когда приложению это необходимо, и они были бы хорошим способом использования нескольких индексов.

Логирование сообщения при регистрации нового пользователя
Вы, наверное, помните, что мы настроили все это для того, чтобы следить за тем, сколько новых пользователей вы получаете каждый день, неделю или месяц. Поэтому мы добавим лог при каждой регистрации пользователя. События и слушатели отлично подходят для этого, и, к счастью для нас, Breeze уже имеет событие Registered! Вы можете найти его здесь: Laravel/vendor/laravel/framework/src/Illuminate/Auth/Events/Registered.php. Это событие срабатывает каждый раз, когда новый пользователь регистрируется и связано со слушателем, который отправляет электронное письмо для подтверждения адреса электронной почты пользователю. Мы просто добавим наш собственный слушатель к тому же событию, легко! Вот как:

```bash
php artisan make:listener LogRegisteredUser --event=Registered


```

Флаг --event настроит наш слушатель для использования с событием Registered. Убедитесь, что все ссылки на Registered указывают на Illuminate/Auth/Events/Registered.

Чтобы увидеть, какие слушатели связаны с событием Registered, перейдите в EventServiceProvider. В массиве $listen слушатели связаны со своими событиями. Добавьте наш новый слушатель там:

```php
protected $listen = [
    Registered::class => [
        SendEmailVerificationNotification::class,
        # Add this line
+       LogRegisteredUser::class,
    ],
];

```

Теперь нам просто нужно указать, что слушатель LogRegisteredUser должен фактически выполнять. Перейдите в LogRegisteredUser и добавьте следующий код в предварительно настроенный метод handle:

```php
public function handle(Registered $event)
{
+   // add an 'info' log with our new user:
+   Log::info("New user '{$event->user->name}' registered", $event->user->toArray());
}

```

Log::info будет использовать канал регистрации по умолчанию, указанный в logging.php. Если мы проверим этот файл, мы увидим, что он использует переменную среды LOG_CHANNEL, а в качестве резервного варианта - stack. Давайте настроим это в нашем .env-файле: найдите переменную LOG_CHANNEL и установите ее значение на stack. По моему мнению, настройка этого рода должна быть в .env-файле.

Еще одна важная деталь: методы Log::… могут принимать один или два параметра, второй из которых - контекст. Мы передаем наш объект User, который будет очень полезен в Kibana. Не волнуйтесь, это будет понятно, когда мы дойдем до этого.

Наконец, перейдите в файл logging.php и найдите канал stack. Этот канал включает в себя несколько подканалов, так что журналы могут быть отправлены в разные места в зависимости от уровня журнала. В массиве channels добавьте stderr и elasticsearch. Вот как теперь должен выглядеть канал stack:

```php
'stack' => [
    'driver' => 'stack',
-   'channels' => ['single'],
+   'channels' => ['single','elasticsearch','stderr'], # also log to elasticsearch and fly logs
    'ignore_exceptions' => false,
],


```

Если вы помните, канал stderr - это тот, который делает рабочими журналы Fly, и мы убрали его из раздела env в файле fly.toml, поэтому не забудьте добавить его здесь!

Теперь перезагрузите изменения в Fly, чтобы обновить работающее приложение с помощью fly deploy. Затем зарегистрируйте нового пользователя, чтобы запустить наш слушатель. После этого перейдите в Kibana, чтобы посмотреть на наши журналы! Не забудьте, что вы можете сделать это, перейдя по URL вашего приложения, найденному в панели управления Fly, или с помощью команды fly open в каталоге, где находится файл fly.toml для Kibana. Увидимся на другой стороне!

## Настройка Kibana

Это то, чего вы ждали. Последняя глава. Это момент, когда мы… будем отображать журналы в Kibana! Хорошо, я, возможно, немного переборщил с драмой. В любом случае, давайте посмотрим, как мы можем отобразить наши журналы:

В Kibana откройте меню слева, прокрутите вниз и перейдите во вкладку управления стеком. Затем выберите data views слева. Вы должны увидеть, что Kibana немного насмехается и говорит, что сначала нам нужны данные. Кто он такой, чтобы делать такие замечания? Но у него есть своя логика, нам действительно нужны данные, и мы их получим!

Откройте свое приложение Laravel в новой вкладке и зарегистрируйте нового пользователя. Это должно вызвать событие Register, которое в свою очередь запустит наш слушатель LogRegisteredUser. После этого перейдите на вкладку Kibana и, если все настроено правильно, мы должны увидеть, что Kibana успокоился и говорит нам, что у нас есть данные в Elasticsearch. Все, что нам нужно сделать сейчас, это создать data view. Нажмите на голубую кнопку ”создать data view” посередине страницы. Здесь мы можем увидеть, как data view связан с индексами в Elasticsearch: шаблон соответствует одному или нескольким индексам. Используя правильный шаблон, вы можете получить все журналы за месяц, для конкретного пользователя или для конкретной функции в вашем приложении. Возможности в основном безграничны, вы просто настраиваете индексы и data view так, как вам нужно!

На данный момент просто используйте шаблон, например, user\* . В качестве поля с отметкой времени мы можем использовать context.created_at. Помните, когда я говорил о контексте и о том, что мы должны добавить его в наши журналы? Вот почему: поскольку мы добавили объект User как контекст, Elasticsearch видит все поля объекта User и отображает их в таблицах, графиках, диаграммах и, в общем, везде. Классно!

После создания data view перейдите в Analytics - discover в боковой панели слева. Здесь вы можете увидеть все журналы в определенном временном диапазоне.

![](https://fly.io/laravel-bytes/integrating-the-elastic-stack-elk-into-a-laravel-app-on-fly/../../assets/kibana_screenshot.webp)

Слева вы видите все поля, которые Elasticsearch обнаружил. Мы зарегистрировали полный объект пользователя в поле контекста, поэтому мы можем отображать здесь все, что нам нужно, даже если мы внесем изменения в модель пользователя позже!

Здесь есть еще многое, что можно исследовать. Мы только окунули кончик ноги в глубокие воды стека Elastic. Этого было достаточно для простого случая использования, поэтому я завершу здесь. Возможно, вы могли бы настроить панель управления, которая показывает, сколько новых пользователей зарегистрировалось в каждый день за последнюю неделю? Я оставлю вам это для самостоятельного решения.

Большое спасибо за чтение, и не стесняйтесь сообщать мне, если что-то не работает, если есть странные опечатки или если вы хотели бы, чтобы я продолжил писать о стеке Elastic!
