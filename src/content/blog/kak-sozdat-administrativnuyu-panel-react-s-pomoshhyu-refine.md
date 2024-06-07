---
title: Как создать административную панель React с помощью Refine
meta_title: Как создать административную панель React с помощью Refine - Igor Gorlov
description: >-
  React – популярный фреймворк для создания интерактивных пользовательских
  интерфейсов. Он помог совершить революцию в разработке фронтенд-приложений с
  большим объемом данных.
date: 2023-02-26T17:35:48.000Z
author: Igor Gorlov
image: ../../assets/images/undefined-Feb-26-2023.avif
categories:
  - Учебник
tags:
  - React
  - Refine
draft: false
lastmod: 2024-03-20T21:26:45.896Z
---

React - популярный фреймворк для создания интерактивных пользовательских интерфейсов. Он помог совершить революцию в разработке фронтенд-приложений с большим объемом данных.

Декларативная природа React делает создание пользовательских интерфейсов интуитивно понятным. А многократно используемые компоненты React повышают скорость разработки и сокращают время выпуска продукции.

Для дальнейшего улучшения опыта разработки при создании пользовательских интерфейсов появилось несколько фреймворков React. Одним из таких фреймворков является refine.

refine - это основанный на React фреймворк для создания веб-приложений. Он похож на React-admin, Redwood и Retool.

Экосистема refine поставляется с готовыми интеграциями для аутентификации пользователей, маршрутизации, сетевого взаимодействия, интернализации и многого другого.

В этой статье вы изучите refine, создав простую панель администратора. Это поможет выделить основные строительные блоки фреймворка refine. Мы также рассмотрим основные возможности и возможные сценарии использования refine.

<!-- wp:rank-math/toc-block {"title":"Оглавление","headings":[{"key":"1bfa4e03-cd88-493d-8848-689f93814fa3","content":"Что такое Refine?","level":2,"link":"#что-такое-refine","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"01982656-76e7-4e72-bd40-1fa29ff7a462","content":"Среда выполнения Node","level":2,"link":"#среда-выполнения-node","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"148aa6d4-2e59-49ac-85cc-742d91cec289","content":"Текстовый редактор","level":3,"link":"#текстовый-редактор","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"e1b20f36-6ce2-40c9-a292-6bfb434a3454","content":"Как настроить Refine Приложение","level":2,"link":"#как-настроить-refine-приложение","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"277dfbd0-17f3-4d97-9cf0-9e3ca13f4c41","content":"Шаг 1 - Создание приложения для уточнения","level":3,"link":"#шаг-1-создание-приложения-для-уточнения","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"ef4a6504-c400-4399-aa27-82caa605092a","content":"Шаг 2 - Откройте проект в текстовом редакторе","level":3,"link":"#шаг-2-откройте-проект-в-текстовом-редакторе","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"fa223853-c84a-4e97-b392-cc6f65fe5a78","content":"Шаг 3 - Запуск сервера разработки","level":3,"link":"#шаг-3-запуск-сервера-разработки","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"f88c4116-8596-46fc-949b-efb82b5bd853","content":"Основные концепции в refine","level":2,"link":"#основные-концепции-в-refine","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"8ce1259d-f5de-4eee-affd-e459e5337679","content":"Поставщики данных","level":3,"link":"#поставщики-данных","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"e54d4a24-4bd5-43e1-be10-e7d4306945a0","content":"Data hooks","level":3,"link":"#data-hooks","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"da2f9b96-7241-4a46-a666-bd77bc296a56","content":"Ресурсы","level":3,"link":"#ресурсы","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"6bfbf3f7-e9a8-462b-8d55-b111a73666fe","content":"Inferencer","level":3,"link":"#inferencer","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"c063c0da-95cc-41f0-911e-9008e77b605c","content":"Как построить панель администратора с помощью refine","level":2,"link":"#как-построить-панель-администратора-с-помощью-refine","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"1be37f73-6c6f-4e6c-8cf9-e7b36b757afa","content":"Шаг 1 - Установка зависимостей Inferencer","level":3,"link":"#шаг-1-установка-зависимостей-inferencer","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"aefac269-346a-469a-8f7a-be68fc877540","content":"Шаг 2 - Импорт MuiInferencer","level":3,"link":"#шаг-2-импорт-mui-inferencer","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"21d6843f-ed9c-46a8-9b8c-89824ed73233","content":"Шаг 3 - Генерация компонентов с помощью Inferencer","level":3,"link":"#шаг-3-генерация-компонентов-с-помощью-inferencer","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"0f4dbf6d-8b46-4e86-ad77-053efad7a72d","content":"Шаг 4 - Предварительный просмотр изменений","level":3,"link":"#шаг-4-предварительный-просмотр-изменений","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"ec1f3a82-9f90-4bba-9fed-8e3e094c3a56","content":"Просмотр списка пользователей","level":4,"link":"#просмотр-списка-пользователей","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"d96e1861-3af3-4bb7-9211-95f4041f3d73","content":"Создание нового пользователя","level":4,"link":"#создание-нового-пользователя","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"4464a629-1f29-49b5-b741-340437717cc8","content":"Обновление существующего пользователя","level":4,"link":"#обновление-существующего-пользователя","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"c09113bd-1cd4-4dbf-8899-99853ef11022","content":"Просмотр конкретного пользователя","level":4,"link":"#просмотр-конкретного-пользователя","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"8b3c66d1-e100-4d1f-a33a-f060c9ffdcad","content":"Шаг 5 - Просмотр кода, сгенерированного Inferencer","level":3,"link":"#шаг-5-просмотр-кода-сгенерированного-inferencer","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"077749eb-e173-4aa3-a011-79eb74a5f205","content":"Шаг 6 - Настройка сгенерированных компонентов","level":3,"link":"#шаг-6-настройка-сгенерированных-компонентов","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"a8a0ad2a-3900-4d8e-bbf4-1cf94d7f0223","content":"Заключение","level":2,"link":"#заключение","disable":false,"isUpdated":false,"isGeneratedLink":true}],"listStyle":"ul"} -->
<div class="wp-block-rank-math-toc-block" id="rank-math-toc"><h2>Оглавление</h2><nav><ul><li class=""><a href="#что-такое-refine">Что такое Refine?</a></li><li class=""><a href="#среда-выполнения-node">Среда выполнения Node</a><ul><li class=""><a href="#текстовый-редактор">Текстовый редактор</a></li></ul></li><li class=""><a href="#как-настроить-refine-приложение">Как настроить Refine Приложение</a><ul><li class=""><a href="#шаг-1-создание-приложения-для-уточнения">Шаг 1 - Создание приложения для уточнения</a></li><li class=""><a href="#шаг-2-откройте-проект-в-текстовом-редакторе">Шаг 2 - Откройте проект в текстовом редакторе</a></li><li class=""><a href="#шаг-3-запуск-сервера-разработки">Шаг 3 - Запуск сервера разработки</a></li></ul></li><li class=""><a href="#основные-концепции-в-refine">Основные концепции в refine</a><ul><li class=""><a href="#поставщики-данных">Поставщики данных</a></li><li class=""><a href="#data-hooks">Data hooks</a></li><li class=""><a href="#ресурсы">Ресурсы</a></li><li class=""><a href="#inferencer">Inferencer</a></li></ul></li><li class=""><a href="#как-построить-панель-администратора-с-помощью-refine">Как построить панель администратора с помощью refine</a><ul><li class=""><a href="#шаг-1-установка-зависимостей-inferencer">Шаг 1 - Установка зависимостей Inferencer</a></li><li class=""><a href="#шаг-2-импорт-mui-inferencer">Шаг 2 - Импорт MuiInferencer</a></li><li class=""><a href="#шаг-3-генерация-компонентов-с-помощью-inferencer">Шаг 3 - Генерация компонентов с помощью Inferencer</a></li><li class=""><a href="#шаг-4-предварительный-просмотр-изменений">Шаг 4 - Предварительный просмотр изменений</a><ul><li class=""><a href="#просмотр-списка-пользователей">Просмотр списка пользователей</a></li><li class=""><a href="#создание-нового-пользователя">Создание нового пользователя</a></li><li class=""><a href="#обновление-существующего-пользователя">Обновление существующего пользователя</a></li><li class=""><a href="#просмотр-конкретного-пользователя">Просмотр конкретного пользователя</a></li></ul></li><li class=""><a href="#шаг-5-просмотр-кода-сгенерированного-inferencer">Шаг 5 - Просмотр кода, сгенерированного Inferencer</a></li><li class=""><a href="#шаг-6-настройка-сгенерированных-компонентов">Шаг 6 - Настройка сгенерированных компонентов</a></li></ul></li><li class=""><a href="#заключение">Заключение</a></li></ul></nav></div>
<!-- /wp:rank-math/toc-block -->

<h2 class="wp-block-heading" id="что-такое-refine">Что такое Refine?</h2>

Refine - это фреймворк на основе React с открытым исходным кодом и лицензией MIT для создания front-end приложений. Он похож на React-admin, Retool и Redwood. Refine - это ”безголовый" фреймворк React. Он не принимает во внимание ваши решения по стилизации и дизайну.

Это означает, что вы можете использовать refine с пользовательским дизайном или библиотекой компонентов пользовательского интерфейса. Он поставляется с интеграциями для самых популярных библиотек компонентов и систем дизайна, таких как Material UI, Chakra UI и Ant design.

refine имеет встроенные провайдеры маршрутизации для самых популярных библиотек маршрутизации, таких как React Router, Remix Router, Next.js Router и React Location. Вы можете выбрать библиотеку маршрутизации, которая отвечает требованиям вашего проекта.

Вы можете использовать refine для создания приложений с интенсивным использованием данных, таких как панели администратора, приборные панели, внутренние инструменты и витрины магазинов. Инструмент командной строки, который является частью экосистемы React, поможет вам быстро настроить приложение refine.

Вы сможете быстро приступить к работе, если у вас есть начальные или средние знания React, поскольку refine - это фреймворк на основе React. Вы также можете использовать refine с другими фреймворками React, такими как Next и Remix.

Для выполнения некоторых примеров в этой статье вам понадобятся следующие инструменты.

<h2 class="wp-block-heading" id="среда-выполнения-node">Среда выполнения Node</h2>

Если у вас нет Node, загрузите и установите его со страницы загрузки Node. После установки выполните приведенную ниже команду в командной строке, чтобы проверить, успешно ли прошла установка.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">node -v
</code></pre>
<!-- /wp:code -->

Команда выше отобразит версию Node на вашей машине, если установка прошла успешно.

Последние версии Node также поставляются с npm. Выполните приведенную ниже команду в терминале, чтобы убедиться, что у вас есть npm. Она должна отобразить версию npm, которую вы установили вместе с Node.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">npm -v
</code></pre>
<!-- /wp:code -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="текстовый-редактор">Текстовый редактор</h3>

Вам понадобится текстовый редактор, например VS Code или Sublime Text. Мне больше всего нравится VS Code. Вы можете загрузить его со страницы загрузки VS Code. Или же загрузите Sublime Text для вашей системы со страницы загрузок Sublime Text.

<h2 class="wp-block-heading" id="как-настроить-refine-приложение">Как настроить Refine Приложение</h2>

Вы можете создать собственное приложение refine или использовать утилиту командной строки refine для быстрой загрузки приложения refine. Если вы только начинаете, я рекомендую вам использовать утилиту командной строки refine для быстрой настройки проекта.

Утилита командной строки создаст проект refine со всеми необходимыми конфигурациями. Выполните следующие шаги, чтобы создать простой проект refine с помощью инструмента командной строки. Для выполнения описанных ниже шагов у вас должны быть инструменты разработки, о которых я рассказывал в предыдущем разделе.

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="шаг-1-создание-приложения-для-уточнения">Шаг 1 - Создание приложения для уточнения</h3>

Перейдите в каталог, где вы хотите создать приложение refine, и выполните приведенную ниже команду в командной строке. Я использую npm в качестве менеджера пакетов. Но вы можете использовать и другой менеджер пакетов.

Также обратите внимание, что если вы впервые создаете проект refine, команда ниже предложит вам установить пакет create-refine-app.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">npm create refine-app@latest</code></pre>
<!-- /wp:code -->

Приведенная выше команда запустит процесс установки. Во время установки отвечайте на подсказки. Я выбрал шаблон проекта refine-react, интеграцию RESTful back-end и Material UI в качестве фреймворка пользовательского интерфейса для этого проекта.

Вы заметите, что я отказался от других конфигураций установки.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">✔ Downloaded remote source successfully.
✔ Choose a project template · refine-react
✔ What would you like to name your project?: · refine-demo
✔ Choose your backend service to connect: · data-provider-custom-json-rest
✔ Do you want to use a UI Framework?: · mui
✔ Do you want to add example pages?: · no
✔ Do you want to add dark mode support?: · no
✔ Do you want to customize the Material UI theme?: · no
✔ Do you want to customize the Material UI layout?: · no
✔ Do you need any Authentication logic?: · none
✔ Do you need i18n (Internationalization) support?: · no
✔ Do you want to add kbar command interface support?: · no
✔ Choose a package manager: · npm
✔ Would you mind sending us your choices so that we can improve superplate? · no
</code></pre>
<!-- /wp:code -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="шаг-2-откройте-проект-в-текстовом-редакторе">Шаг 2 - Откройте проект в текстовом редакторе</h3>

После завершения установки откройте каталог проекта в текстовом редакторе. Если вы используете VS Code, используйте команду code global с именем каталога проекта, чтобы открыть каталог проекта в VS Code.

Команда ниже предполагает, что имя каталога вашего проекта - refine-demo.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">code refine-demo
</code></pre>
<!-- /wp:code -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="шаг-3-запуск-сервера-разработки">Шаг 3 - Запуск сервера разработки</h3>

Вы можете запустить сервер разработки, выполнив приведенную ниже команду в командной строке.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">npm run dev
</code></pre>
<!-- /wp:code -->

Приведенная выше команда запустит сервер разработки для вашего проекта refine в браузере по умолчанию на localhost, порт 3000. Приветственная страница должна выглядеть так, как показано на скриншоте ниже:

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://www.freecodecamp.org/news/content/images/2023/02/refine-project-template-landing-page.png" alt="страница проекта"/></figure>
<!-- /wp:image -->

<h2 class="wp-block-heading" id="основные-концепции-в-refine">Основные концепции в refine</h2>

При работе с refine вы столкнетесь с несколькими, возможно, незнакомыми понятиями. Ниже приведены объяснения некоторых из этих распространенных понятий, с которыми вы можете столкнуться.

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="поставщики-данных">Поставщики данных</h3>

Чаще всего при создании фронтенд-приложений с интенсивным использованием данных на React вам приходится взаимодействовать с API. В отличие от React, refine абстрагирует HTTP-запросы к API в провайдерах данных.

Провайдер данных выполняет сетевые запросы к API и пересылает ответ компоненту, которому он нужен.

В экосистеме refine есть провайдеры данных для REST API, GraphQL API, облачных баз данных, таких как Firebase, и некоторых популярных безголовых систем управления контентом, таких как Strapi.

Вы можете объявить собственный провайдер данных, если не собираетесь использовать провайдеров данных из экосистемы refine. Провайдер данных refine должен обладать приведенными ниже формой и методами.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">const dataProvider = {
    create: ({ resource, variables, metaData }) =&gt; Promise,
    createMany: ({ resource, variables, metaData }) =&gt; Promise,
    deleteOne: ({ resource, id, variables, metaData }) =&gt; Promise,
    deleteMany: ({ resource, ids, variables, metaData }) =&gt; Promise,
    getList: ({
        resource,
        pagination,
        hasPagination,
        sort,
        filters,
        metaData,
    }) =&gt; Promise,
    getMany: ({ resource, ids, metaData }) =&gt; Promise,
    getOne: ({ resource, id, metaData }) =&gt; Promise,
    update: ({ resource, id, variables, metaData }) =&gt; Promise,
    updateMany: ({ resource, ids, variables, metaData }) =&gt; Promise,
    custom: ({
        url,
        method,
        sort,
        filters,
        payload,
        query,
        headers,
        metaData,
    }) =&gt; Promise,
    getApiUrl: () =&gt; "",
};
</code></pre>
<!-- /wp:code -->

Имена методов в провайдере данных не требуют пояснений. Метод create создает элемент в ресурсе, как следует из его названия, и возвращает обещание. Он принимает несколько параметров. Названия других методов также не требуют пояснений.

Ваше приложение refine взаимодействует с поставщиками данных с помощью крючков данных. Чтобы выполнить операцию CRUD, вы можете вызвать методы поставщика данных с помощью крючков данных.

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="data-hooks">Data hooks</h3>

Как указывалось выше, вы можете вызвать любой из методов поставщика данных из компонента с помощью крючков данных. Каждый метод в провайдере данных имеет соответствующий крючок данных. Например, хук useCreate вызывает метод create в вашем провайдере данных.

Вы можете использовать хук useCreate в своем компоненте следующим образом:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">import { useCreate } from "@pankod/refine-core";

const MyComponent = () =&gt; {
  const { mutate } = useCreate();
  const clickHandler = () =&gt; {
    mutate({ resource: "posts", values: { title: "Refine hello world!" } });
  };
  return &lt;button onClick={clickHandler}&gt;Click to Create an item&lt;/button&gt;;
};
</code></pre>
<!-- /wp:code -->

Хотя хук useCreate возвращает объект с несколькими свойствами, в приведенном выше примере нас интересует функция mutate.

Вызов функции mutate, как мы это сделали, запускает метод create в вашем поставщике данных. После этого метод create выполняет сетевой запрос к вашему API и передает ответ вашему компоненту.

Существует несколько крючков данных, которые вы можете найти в документации Refine.

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="ресурсы">Ресурсы</h3>

Как было сказано выше, работа с API неизбежна при создании внешних приложений. API обычно состоит из ресурсов, к которым вы можете получить доступ через конечные точки и выполнить CRUD-операции.

Компонент Refine является точкой входа для любого приложения Refine. Когда вы создаете любое приложение Refine с помощью create-refine-app, в компоненте App.tsx всегда будет отображаться компонент Refine, как показано в примере ниже.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">function App() {
  return (
    &lt;Refine
      dataProvider={dataProvider(apiUrl)}
      routerProvider={routerProvider}
      resources={[
        {
          name: "users",
          list: List,
          show: Show,
          create: Create,
          edit: Edit,
        },
      ]}
    /&gt;
  );
}

</code></pre>
<!-- /wp:code -->

Одним из реквизитов, которые вы передаете компонентуRefine, является реквизит resources. Значение реквизита resources - это массив объектов ресурсов. Каждый объект ресурса должен иметь свойство name.

Как и в примере выше, вы можете передать дополнительные свойства, такие как list, show, create и edit.

Значения list, show, create и edit являются компонентами. В приведенном выше примере значение поля name - “users”.

Поле name определяет маршруты в вашем внешнем приложении. Когда вы перейдете к маршруту /users в вашем приложении, refine отобразит компонент List.

Аналогично, при переходе к маршруту /users/show refine отобразит компонент Show. В таблице ниже приведена связь между полями вышеупомянутого объекта ресурса и маршрутами в вашем приложении.

<!-- wp:table -->
<figure class="wp-block-table"><table><tbody><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td>Resource object property</td><td>Route</td><td>Rendered component</td></tr><tr><td><code>list</code></td><td><code>/users</code></td><td><code>List</code></td></tr><tr><td><code>show</code></td><td><code>/users/show</code></td><td><code>Show</code></td></tr><tr><td><code>create</code></td><td><code>/users/create</code></td><td><code>Create</code></td></tr><tr><td><code>edit</code></td><td><code>/users/edit</code></td><td><code>Edit</code></td></tr></tbody></table></figure>
<!-- /wp:table -->

Вместо того чтобы создавать компоненты с нуля, вы также можете генерировать их на основе ваших ресурсов с помощью Inferencer.

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="inferencer">Inferencer</h3>

Inferencer - один из пакетов в экосистеме пакетов refine. Он увеличивает скорость разработки, генерируя страницы CRUD после анализа вашей модели данных. Затем вы можете настроить автоматически генерируемые компоненты в соответствии с требованиями вашего проекта.

Вместо того чтобы задавать значения свойств объектов ресурсов list, show, create и edit для пользовательского компонента, как в предыдущем подразделе, инференсер может генерировать компоненты за вас. Затем вы можете настроить компоненты в соответствии со своими потребностями.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">import { HeadlessInferencer } from "@pankod/refine-inferencer/headless";

function App() {
  return (
    &lt;Refine
      dataProvider={dataProvider(apiUrl)}
      routerProvider={routerProvider}
      resources={[
        {
          name: "topics",
          list: HeadlessInferencer,
          show: HeadlessInferencer,
          create: HeadlessInferencer,
          edit: HeadlessInferencer,
        },
      ]}
    /&gt;
  );
}
</code></pre>
<!-- /wp:code -->

Приведенный выше код предполагает, что вы используете HeadlessInferencer. Вы также можете использовать MuiInferencer, если вы используете Material UI.

Inferencer полагается на пакеты @pankod/refine-react-hook-form и @pankod/refine-react-table для генерации форм и таблиц. Поэтому не забудьте установить их.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">npm i @pankod/refine-react-table @pankod/refine-react-hook-form
</code></pre>
<!-- /wp:code -->

<h2 class="wp-block-heading" id="как-построить-панель-администратора-с-помощью-refine">Как построить панель администратора с помощью refine</h2>

В этом разделе вы создадите простую панель администратора, модифицировав приложение refine, которое вы создали выше.

Помните, что при загрузке приложения с помощью create-refine-app мы выбрали интеграцию с RESTful API back-end. Поэтому для этой иллюстрации мы будем использовать ненастоящий RESTful API.

В реальном приложении вы будете работать с другой внутренней интеграцией. Это может быть RESTful API, GraphQL API, облачные базы данных, например Firebase, или система управления контентом, например Strapi.

Вам необходимо прочитать документацию refine по использованию различных внутренних интеграций, доступных в экосистеме refine.

Поддельный RESTful API имеет несколько конечных точек для доступа к доступным ресурсам. Мы создадим панель администратора для ресурса пользователей. Выполните следующие шаги, если вы открыли в текстовом редакторе проект refine, который мы создали в начале этой статьи.

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="шаг-1-установка-зависимостей-inferencer">Шаг 1 - Установка зависимостей Inferencer</h3>

Мы будем использовать MuiInferencer для генерации страниц CRUD. Инференсер внутренне опирается на пакеты @pankod/refine-react-hook-form и @pankod/refine-react-table. Выполните приведенную ниже команду в терминале, чтобы установить их.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">npm i @pankod/refine-react-table @pankod/refine-react-hook-form
</code></pre>
<!-- /wp:code -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="шаг-2-импорт-mui-inferencer">Шаг 2 - Импорт MuiInferencer</h3>

После успешной установки необходимых зависимостей откройте файл src/App.tsx и добавьте следующий оператор import в верхней части:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">import { MuiInferencer } from "@pankod/refine-inferencer/mui";
</code></pre>
<!-- /wp:code -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="шаг-3-генерация-компонентов-с-помощью-inferencer">Шаг 3 - Генерация компонентов с помощью Inferencer</h3>

Как объясняется в разделе ”Основные понятия", значения свойств list, show, create и edit объекта ресурса являются компонентами. Вы можете создать эти компоненты с нуля или сгенерировать их с помощью Inferencer. В этом примере мы будем использовать MuiInferencer для их создания.

В файле src/App.tsx компонент App отображает встроенный компонент Refine. Refine - это точка входа для любого приложения Refine. Добавьте свойство resources к компоненту Refine, чтобы компонент App выглядел следующим образом:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">function App() {
  return (
    &lt;ThemeProvider theme={LightTheme}&gt;
      &lt;CssBaseline /&gt;
      &lt;GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} /&gt;
      &lt;RefineSnackbarProvider&gt;
        &lt;Refine
          dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
          notificationProvider={notificationProvider}
          Layout={Layout}
          ReadyPage={ReadyPage}
          catchAll={&lt;ErrorComponent /&gt;}
          routerProvider={routerProvider}
          resources = {[
            {
              name: 'users',
              list: MuiInferencer,
              show: MuiInferencer,
              create: MuiInferencer,
              edit: MuiInferencer

            }
          ]}
        /&gt;
      &lt;/RefineSnackbarProvider&gt;
    &lt;/ThemeProvider&gt;
  );
}
}
</code></pre>
<!-- /wp:code -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="шаг-4-предварительный-просмотр-изменений">Шаг 4 - Предварительный просмотр изменений</h3>

<!-- wp:heading {"level":4} -->
<h4 class="wp-block-heading" id="просмотр-списка-пользователей">Просмотр списка пользователей</h4>

После сохранения вышеуказанных изменений refine создаст CRUD-страницы и перенаправит их на маршрут /users. Ваша страница приветствия должна выглядеть как показано на рисунке ниже. Компонент, сгенерированный Inferencer, отображает таблицу пользователей из ресурса users.

Таблица имеет несколько столбцов, некоторые из которых скрыты от глаз, если вы используете маленький экран. Чтобы увидеть их все, прокрутите страницу по горизонтали.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://www.freecodecamp.org/news/content/images/2023/02/users-list-page.png" alt="страница списка пользователей"/></figure>
<!-- /wp:image -->

<!-- wp:heading {"level":4} -->
<h4 class="wp-block-heading" id="создание-нового-пользователя">Создание нового пользователя</h4>

Вы также можете перейти к маршруту users/create для создания нового пользователя, нажав кнопку “CREATE”. refine отобразит компонент, созданный Inferencer. В нем есть форма для создания нового пользователя, которая выглядит как показано на рисунке ниже.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://www.freecodecamp.org/news/content/images/2023/02/create-new-user-page.png" alt="создать страницу нового пользователя"/></figure>
<!-- /wp:image -->

<!-- wp:heading {"level":4} -->
<h4 class="wp-block-heading" id="обновление-существующего-пользователя">Обновление существующего пользователя</h4>

Чтобы обновить существующий ресурс, перейдите к маршруту /users/edit/:id. Параметр маршрута id должен быть идентификатором объекта в ресурсе users.

Чтобы отредактировать данные пользователя, чей id равен 1, перейдите к конечной точке /users/edit/1, нажав на кнопку редактирования первой записи в таблице пользователей.

Кнопка редактирования находится под последней колонкой с надписью ”Действия". Страница редактирования должна выглядеть так, как показано на рисунке ниже.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://www.freecodecamp.org/news/content/images/2023/02/edit-an-existing-user-page.png" alt="обновление существующей страницы пользователя"/></figure>
<!-- /wp:image -->

<!-- wp:heading {"level":4} -->
<h4 class="wp-block-heading" id="просмотр-конкретного-пользователя">Просмотр конкретного пользователя</h4>

Для просмотра сведений о пользователе с определенным идентификатором перейдите по маршруту /users/show/:id. В качестве id должен быть указан существующий объект в ресурсе users.

Чтобы просмотреть сведения о первом пользователе, нажмите кнопку show первой записи в таблице users. Кнопка show находится под последней колонкой с надписью “Actions”.

Когда вы перейдете к конечной точке /users/show/1, вы должны увидеть подробную информацию о первом пользователе, чей id равен 1.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://www.freecodecamp.org/news/content/images/2023/02/show-user-page.png" alt="просмотр страницы пользователя"/></figure>
<!-- /wp:image -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="шаг-5-просмотр-кода-сгенерированного-inferencer">Шаг 5 - Просмотр кода, сгенерированного Inferencer</h3>

Inferencer создал для нас компоненты, используя ответ от конечной точки /users нашего поддельного RESTful API. На каждой из страниц, которые вы посетили выше, в правом нижнем углу есть кнопка с надписью “SHOW CODE”.

Нажмите ее, чтобы отобразить код, сгенерированный Inferencer для каждой страницы.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://www.freecodecamp.org/news/content/images/2023/02/view-generated-code.png" alt="view code generated by Inferencer"/></figure>
<!-- /wp:image -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="шаг-6-настройка-сгенерированных-компонентов">Шаг 6 - Настройка сгенерированных компонентов</h3>

В предыдущих шагах вы создали CRUD-страницы с помощью MuiInferencer. Использование MuiInferencer поможет вам начать работу, сгенерировав шаблонный код. Но в реальном приложении вы почти всегда захотите настроить компоненты под свои нужды.

Чтобы настроить сгенерированный код, создайте каталог src/users. В каталоге src/users создайте четыре файла со следующими именами. Вы можете назвать их по-другому, если хотите.

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li><code>List.tsx</code></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><code>Create.tsx</code></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><code>Edit.tsx</code></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><code>Show.tsx</code></li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

В предыдущем шаге вы узнали, как просмотреть сгенерированный код для каждой страницы.

Скопируйте и вставьте код для страницы /users в созданный вами файл List.tsx. Таким же образом скопируйте и вставьте код для страницы /users/create в файл Create.tsx. То же самое проделайте для других страниц и соответствующих им компонентов.

Импортируйте компоненты, которые вы создали выше, в файл App.tsx следующим образом:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">import { UserList } from "users/List";
import { UserCreate } from "users/Create";
import { UserShow  } from "users/Show";
import { UserEdit } from "users/Edit";
</code></pre>
<!-- /wp:code -->

В файле App.tsx компонент App отображает встроенный компонент Refine. Измените реквизит resources, который вы передаете компоненту Refine, так, чтобы он выглядел следующим образом:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">&lt;Refine
  ...
  resources={[
    {
      name: "users",
      list: UserList,
      show: UserShow,
      create: UserCreate,
      edit: UserEdit,
    },
  ]}
/&gt;;

</code></pre>
<!-- /wp:code -->

Надеюсь, вы заметили, что значения свойств list, show, create и edit объекта ресурса изменились с MuiInferencer на UserList, UserShow, UserCreate и UserEdit соответственно. Теперь вы можете изменять код в созданных вами компонентах.

Вот так просто можно создавать приборные панели и панели администратора с помощью refine.

В течение нескольких минут вы создали шаблон проекта на основе вашей модели данных. Затем вы можете его доработать. Создание такого проекта с нуля потребовало бы много работы.

<h2 class="wp-block-heading" id="заключение">Заключение</h2>

Refine - это фреймворк на основе React с открытым исходным кодом и лицензией MIT для создания внешних приложений. Он пригодится при создании приборных панелей, панелей администратора, внутренних инструментов и витрин магазинов. Вы можете использовать его практически в любом приложении, использующем React.

refine поставляется с готовыми функциями для работы в сети, аутентификации, маршрутизации и интернационализации. Он также имеет интеграции для самых популярных облачных баз данных, таких как Firebase и Supabase, и систем управления контентом, таких как Strapi.

Если вы хотите начать использовать refine, воспользуйтесь инструментом командной строки. С помощью инструмента командной строки вы можете выбрать безголовую настройку или использовать один из встроенных компонентов или систем дизайна, таких как Material UI и Ant design.

Надеюсь, эта статья познакомила вас с самыми основами refine. У refine есть еще несколько функций и вариантов использования, которые я не осветил здесь. Ознакомьтесь с документацией, чтобы полностью понять refine и его возможности.
