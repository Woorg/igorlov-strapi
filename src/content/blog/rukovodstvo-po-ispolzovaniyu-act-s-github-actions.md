---
title: Руководство по использованию act с GitHub Actions
meta_title: Руководство по использованию act с GitHub Actions - Igor Gorlov
description: >-
  Проект act – это мощный инструмент, который можно использовать вместе с GitHub
  Actions для быстрого тестирования и доработки конвейера непрерывной интеграции
  и непрерывной доставки (CI/CD).
date: 2023-03-18T21:57:23.000Z
author: Igor Gorlov
image: ../../assets/images/undefined-Mar-19-2023.avif
categories:
  - Как закодить
tags:
  - JavaScript
draft: false
lastmod: 2024-03-20T21:26:44.884Z
---

Проект act - это мощный инструмент, который можно использовать вместе с GitHub Actions для быстрого тестирования и доработки конвейера непрерывной интеграции и непрерывной доставки (CI/CD). С помощью act вы можете локально использовать контейнеры Docker для прямого запуска этапов в GitHub Actions. act помогает разработчикам запускать независимые этапы конвейера и в целом улучшает цикл обратной связи при построении конвейеров с помощью GitHub Actions.

В этой статье мы представим act на примере проекта, установим его, а затем рассмотрим различные способы, которыми act может улучшить ваш опыт создания и тестирования GitHub Actions. Чтобы проследить за ходом работы, посмотрите мой пример проекта на GitHub. Давайте начнем!

<!-- wp:rank-math/toc-block {"title":"Оглавление","headings":[{"key":"53bf7fee-22bc-436a-9bf3-739ee6707ff1","content":"Что такое GitHub Actions?","level":2,"link":"#что-такое-git-hub-actions","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"8cf7873a-462c-42bf-92e9-beacd097727b","content":"Как использовать act?","level":2,"link":"#как-использовать-act","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"4f6d5a56-d3e0-4372-9795-4c04bcf77db0","content":"Смотрим на Act в действии","level":2,"link":"#смотрим-на-act-в-действии","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"f3fd93a8-039b-4a00-8891-782fc7fb80b4","content":"Заключение","level":2,"link":"#заключение","disable":false,"isUpdated":false,"isGeneratedLink":true}],"listStyle":"ul"} -->
<div class="wp-block-rank-math-toc-block" id="rank-math-toc"><h2>Оглавление</h2><nav><ul><li class=""><a href="#что-такое-git-hub-actions">Что такое GitHub Actions?</a></li><li class=""><a href="#как-использовать-act">Как использовать act?</a></li><li class=""><a href="#смотрим-на-act-в-действии">Смотрим на Act в действии</a></li><li class=""><a href="#заключение">Заключение</a></li></ul></nav></div>
<!-- /wp:rank-math/toc-block -->

<h2 class="wp-block-heading" id="что-такое-git-hub-actions">Что такое GitHub Actions?</h2>

Прежде чем приступить к работе с act, мы должны получить базовое представление о том, как работают GitHub Actions. Подобно CI/CD инструментам, таким как CircleCI, Jenkins и другим, GitHub Actions позволяют вам определить конвейер в YAML-файле. Затем GitHub будет запускать ваш конвейер при определенных событиях, которые могут включать открытие запроса на притяжение или слияние с основной веткой.

Синтаксис GitHub Actions выглядит следующим образом:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="yaml" class="language-yaml">name: Node.js CI
'on':
  push:
    branches:
      - master
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Use Node.js 16.x
        uses: actions/setup-node@v3
        with:
          node-version: 16.x
          cache: npm
      - run: npm install
      - run: npm run build</code></pre>
<!-- /wp:code -->

В приведенном выше примере действие GitHub Action определено с заданием сборки, которое проверяет ваш код, выполняет установку npm и собирает проект. У вас могут быть дополнительные задания, которые зависят от этого, но шаги могут быть и собственными действиями. Например, если вы хотите кэшировать модули node, вы можете просто добавить следующий код:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="yaml" class="language-yaml">     - run: npm install
      - run: npm run build
      - name: Cache node modules
        uses: actions/cache@v3
        env:
          cache-name: cache-node-modules
        with:
          path: ~/.npm
          key: &gt;-
            ${{ runner.os }}-build-${{ env.cache-name }}-${{
            hashFiles('**/package-lock.json') }}
          restore-keys: |
            ${{ runner.os }}-build-${{ env.cache-name }}-</code></pre>
<!-- /wp:code -->

actions/cache@v3 - это собственное действие, которое выполняется как шаг в этом конвейере. Вы также можете создать эти действия. Например, включив их в своем репозитории GitHub, вы можете запускать CI/CD на pushes to master и другие события. В GitHub это выглядит следующим образом:

<!-- wp:image {"align":"center","id":163206} -->
<figure class="wp-block-image aligncenter"><img src="https://blog.logrocket.com/wp-content/uploads/2023/03/1-github-actions-build-syntax.jpeg?is-pending-load=1" alt="Синтаксис сборки GitHub Actions Build" class="wp-image-163206"/></figure>
<!-- /wp:image -->

Вы можете подробно рассмотреть различные этапы и даже просмотреть историю действий по мере их выполнения. В документации GitHub Actions есть подробное определение этого синтаксиса; я рекомендую ознакомиться с ним.

В следующих разделах мы научимся делать все это локально, а не полагаться на консоль GitHub и события для тестирования нашего конвейера.

<h2 class="wp-block-heading" id="как-использовать-act">Как использовать act?</h2>

act работает как CLI на вашей локальной машине, поддерживая Linux, Mac и Windows. Я работаю на Mac, поэтому я использовал brew для установки act следующей командой:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">brew install act</code></pre>
<!-- /wp:code -->

Чтобы узнать больше об установке, ознакомьтесь с инструкциями в репозитории GitHub.

После установки act использовать его очень просто. Внутри папки .github в вашем репозитории вызовите CLI непосредственно с помощью act из терминала внутри проекта, в котором настроен YAML-файл действия GitHub. Если у вас еще не настроены действия GitHub, нажмите на опцию actions в верхней части вашего проекта GitHub, и GitHub проведет вас через создание начального YAML-файла:

<!-- wp:image {"align":"center","id":163208} -->
<figure class="wp-block-image aligncenter"><img src="https://blog.logrocket.com/wp-content/uploads/2023/03/2-github-actions-set-up-yaml-file.jpeg?is-pending-load=1" alt="Github Actions Настройка Yaml-файла" class="wp-image-163208"/></figure>
<!-- /wp:image -->

<!-- wp:image {"align":"center","id":163210} -->
<figure class="wp-block-image aligncenter"><img src="https://blog.logrocket.com/wp-content/uploads/2023/03/3-github-actions-edit-yaml-file.jpeg?is-pending-load=1" alt="GitHub Actions Редактирование файла YAML" class="wp-image-163210"/></figure>
<!-- /wp:image -->

Существует множество различных вариантов, но наиболее полезными мне показались следующие:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash"># List all the actions in your YAML file
act -l

# List actions for a specific event (here the event is push)
act push -l

# Get Act to run the workflow as if a specific push to master event occured
act push

# Get Act to run a specific job
act -j test

# pass secrets into a job so that the GitHub action can consume them
act -s MY_TOKEN_SECRET=&lt;token&gt; -s MY_NETLIFY_SITE_ID=&lt;site_id&gt; 

# run a GitHub action that uses artifacts between jobs
act --artifact-server-path /tmp/artifacts push
</code></pre>
<!-- /wp:code -->

При выполнении этих команд act создает контейнер Docker для запуска ваших действий на GitHub. Образы, перечисленные в проекте act на GitHub, включают следующие:

<!-- wp:image {"align":"center","id":163212} -->
<figure class="wp-block-image aligncenter"><img src="https://blog.logrocket.com/wp-content/uploads/2023/03/4-github-actions-builds-docker-container.jpeg?is-pending-load=1" alt="Github Actions Создание Docker-контейнера" class="wp-image-163212"/></figure>
<!-- /wp:image -->

Если в задании GitHub Action указан образ для использования, оно извлекает этот образ и запускает его в контейнере act для выполнения работы.

<h2 class="wp-block-heading" id="смотрим-на-act-в-действии">Смотрим на Act в действии</h2>

Как я уже говорил во вступлении, я использовал пример проекта с Act для проверки некоторых функций. Проект представляет собой очень простое, базовое приложение для составления списка дел на React. Я включил один тест, для которого я мог создать этап в конвейере, а также включил этап для развертывания в Netlify.

Код ниже представляет собой фактический YAML-файл, который я создал для GitHub Actions в этом проекте:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="yaml" class="language-yaml">name: Node.js CI
'on':
  push:
    branches:
      - master
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/[email&nbsp;protected]
      - name: Use Node.js 16.x
        uses: actions/[email&nbsp;protected]
        with:
          node-version: 16.x
          cache: npm
      - run: npm install
      - run: npm run build
      - name: Cache node modules
        uses: actions/[email&nbsp;protected]
        env:
          cache-name: cache-node-modules
        with:
          path: ~/.npm
          key: &gt;-
            ${{ runner.os }}-build-${{ env.cache-name }}-${{
            hashFiles('**/package-lock.json') }}
          restore-keys: |
            ${{ runner.os }}-build-${{ env.cache-name }}-
      - name: Archive production artifacts
        uses: actions/[email&nbsp;protected]
        with:
          name: built-project
          path: build
          retention-days: 1
  test:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/[email&nbsp;protected]
      - name: Use Node.js 16.x
        uses: actions/[email&nbsp;protected]
        with:
          node-version: 16.x
          cache: npm
      - name: Download build for testing
        uses: actions/[email&nbsp;protected]
        with:
          name: built-project
      - run: npm install
      - run: npm run pipeline-test
  deploy:
    needs: [build, test]
    runs-on: ubuntu-latest
    name: 'Deploy to Netlify'
    steps:
      - uses: actions/[email&nbsp;protected]
      - name: Download build for deployment
        uses: actions/[email&nbsp;protected]
        with:
          name: built-project
      - uses: jsmrcaga/[email&nbsp;protected]
        with:
          NETLIFY_AUTH_TOKEN: ${{ secrets.MY_TOKEN_SECRET }}
          NETLIFY_SITE_ID: ${{ secrets.MY_NETLIFY_SITE_ID }}
          NETLIFY_DEPLOY_TO_PROD: true
          build_command: "echo build command not required since we are using artifacts"
</code></pre>
<!-- /wp:code -->

Как видите, у меня три разных работы:

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>build: Собирает проект, кэширует модули узла и кэширует собранные активы.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>test: Запускает связанные с проектом тесты. В данном случае это только один файл App.test.tsx.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>deploy: Берет активы, которые были собраны в первом задании, и затем развертывает их в Netlify с помощью Netlify Deploy GitHub Action.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

Задание тестирования зависит от задания сборки, а задание развертывания зависит от заданий тестирования и сборки. Я также использовал кэширование и хранение артефактов между этапами. Эти темы выходят за рамки данной статьи, но для справки я рекомендую ознакомиться с документацией по Actions на GitHub.

Используя Act в этом конвейере, я смог сделать несколько вещей, включая независимый запуск заданий, а также прямой просмотр данных о заданиях. Мне это показалось очень полезным, поскольку я мог строить конвейер без необходимости напрямую взаимодействовать с консолью GitHub. Это сэкономило значительное время, которое в противном случае я бы потратил на развертывание и обновление YAML-файла, а затем на ожидание завершения работы консоли.

В примере проекта я перечислил связанные задания следующим образом:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">➜  getting-started-with-act git:(master) act -l
WARN  ⚠ You are using Apple M1 chip and you have not specified container architecture, you might encounter issues while running act. If so, try running it with '--container-architecture linux/amd64'. ⚠  
Stage  Job ID  Job name           Workflow name  Workflow file  Events
0      build   build              Node.js CI     node.js.yml    push  
1      test    test               Node.js CI     node.js.yml    push  
2      deploy  Deploy to Netlify  Node.js CI     node.js.yml    push  
</code></pre>
<!-- /wp:code -->

Предупреждающее сообщение указывает на то, что Act заметил тип машины, которую я использую. Если бы я захотел, я мог бы указать архитектуру и избежать появления этого сообщения. Далее я рассмотрю зависимости заданий от события push:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">➜  getting-started-with-act git:(master) act push -l
WARN  ⚠ You are using Apple M1 chip and you have not specified container architecture, you might encounter issues while running act. If so, try running it with '--container-architecture linux/amd64'. ⚠  
Stage  Job ID  Job name           Workflow name  Workflow file  Events
0      build   build              Node.js CI     node.js.yml    push  
1      test    test               Node.js CI     node.js.yml    push  
2      deploy  Deploy to Netlify  Node.js CI     node.js.yml    push  
</code></pre>
<!-- /wp:code -->

Если я просто хочу запустить задание сборки независимо, я использую приведенный ниже код:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">➜  getting-started-with-act git:(master) act -j build
WARN  ⚠ You are using Apple M1 chip and you have not specified container architecture, you might encounter issues while running act. If so, try running it with '--container-architecture linux/amd64'. ⚠  
[Node.js CI/build] 🚀  Start image=node:16-buster-slim
[Node.js CI/build]   🐳  docker pull image=node:16-buster-slim platform= username= forcePull=false
[Node.js CI/build]   🐳  docker create image=node:16-buster-slim platform= entrypoint=["tail" "-f" "/dev/null"] cmd=[]
[Node.js CI/build]   🐳  docker run image=node:16-buster-slim platform= entrypoint=["tail" "-f" "/dev/null"] cmd=[]
[Node.js CI/build]   ☁  git clone 'https://github.com/actions/setup-node' # ref=v3
[Node.js CI/build]   ☁  git clone 'https://github.com/actions/cache' # ref=v3
[Node.js CI/build]   ☁  git clone 'https://github.com/actions/upload-artifact' # ref=v3
[Node.js CI/build] ⭐ Run Main actions/[email&nbsp;protected]
[Node.js CI/build]   🐳  docker cp src=/Users/andrewevans/Documents/projects/getting-started-with-act/. dst=/Users/andrewevans/Documents/projects/getting-started-with-act
[Node.js CI/build]   ✅  Success - Main actions/[email&nbsp;protected]
[Node.js CI/build] ⭐ Run Main Use Node.js 16.x
[Node.js CI/build]   🐳  docker cp src=/Users/andrewevans/.cache/act/[email&nbsp;protected]/ dst=/var/run/act/actions/[email&nbsp;protected]/
[Node.js CI/build]   🐳  docker exec cmd=[node /var/run/act/actions/[email&nbsp;protected]/dist/setup/index.js] user= workdir=
[Node.js CI/build]   💬  ::debug::isExplicit: 
[Node.js CI/build]   💬  ::debug::explicit? false
</code></pre>
<!-- /wp:code -->

Если я хочу запустить задания сборки и тестирования вместе, мне нужно указать местоположение для артефактов. Действие GitHub Action, передающее артефакты между заданиями, использует местоположение по умолчанию на серверах GitHub.

Поскольку я запускаю его локально в контейнере Docker, мне нужно указать местоположение, которое он будет использовать в контейнере. На изображениях ниже вы можете видеть, как задание запускается, а затем успешно создается и сохраняется артефакт:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">[Node.js CI/build]   🐳  docker exec cmd=[bash --noprofile --norc -e -o pipefail /var/run/act/workflow/3] user= workdir=
| 
| &gt; [email&nbsp;protected] build
| &gt; react-scripts build
| 
| Creating an optimized production build...
| Compiled successfully.
| 
| File sizes after gzip:
| 
|   47.11 kB  build/static/js/main.172f414d.js
|   1.79 kB   build/static/js/787.de4328d8.chunk.js
|   313 B     build/static/css/main.51a848c0.css
| 
| The project was built assuming it is hosted at /.
| You can control this with the homepage field in your package.json.
| 
| The build folder is ready to be deployed.
| You may serve it with a static server:
| 
|   npm install -g serve
|   serve -s build
| 
| Find out more about deployment here:
| 
|   https://cra.link/deployment
| 
[Node.js CI/build]   ✅  Success - Main npm run build
[Node.js CI/build] ⭐ Run Main Cache node modules
</code></pre>
<!-- /wp:code -->

Часто у вас есть секреты, которые нужно передать определенным заданиям. При работе с act это можно сделать непосредственно в командной строке с помощью следующего кода:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">act -s MY_SECRET=&lt;first_secret&gt; push 
</code></pre>
<!-- /wp:code -->

Есть много других вещей, которые можно делать с помощью act в процессе разработки. Мне показалось очень полезным иметь возможность запускать задания независимо для отладки возникающих проблем.

Как я уже говорил ранее, я также включил этап развертывания для загрузки артефактов в Netlify. У меня были некоторые проблемы с передачей маркеров, и в конечном итоге я понял, что это была проблема со способом генерации маркера в Netlify. Тем не менее, вы можете видеть, как можно использовать этап развертывания. Вы можете протестировать это с другими провайдерами, такими как AWS, Azure и т.д.

<h2 class="wp-block-heading" id="заключение">Заключение</h2>

Эта статья - лишь вершина айсберга того, что вы можете сделать с помощью act. Запустив Docker вместе с act, я смог увидеть запущенные контейнеры и образы, которые были стянуты. Я также прошел через множество итераций, выполняя части заданий, а затем обращаясь к документации, чтобы очистить код. Это очень помогло в разработке конвейера, даже если он был очень простым.

Я настоятельно рекомендую ознакомиться с проектом act и прочитать о нем больше в README репозитория. Я обнаружил, что у act довольно сильное сообщество, поэтому все проблемы, которые я видел, обычно имели связанную с ними проблему на GitHub, к которой я мог обратиться за помощью.

Спасибо за чтение!
