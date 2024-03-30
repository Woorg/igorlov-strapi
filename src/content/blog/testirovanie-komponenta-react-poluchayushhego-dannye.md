---
title: 'Тестирование компонента React, получающего данные'
meta_title: 'Тестирование компонента React, получающего данные - Igor Gorlov'
description: >-
  Мы будем использовать Mock Service Worker для имитации API. Поэтому вместо
  прямого вызова API или имитации window.fetch лучше имитировать поведение
  сервера.
date: 2023-03-04T17:25:39.000Z
author: Igor Gorlov
image: ../../assets/images/undefined-Mar-04-2023.avif
categories:
  - Учебник
tags:
  - React
draft: false
lastmod: 2024-03-20T21:26:48.371Z
---

Мы будем использовать Mock Service Worker для имитации API. Поэтому вместо прямого вызова API или имитации window.fetch лучше имитировать поведение сервера.

Это дает нам песочницу для игры с сервером API без загрязнения window.fetch и без необходимости устанавливать тестовый сервер API для тестирования.

Спасибо Артему Захарченко, который сделал полезный инструмент.

<h2 class="wp-block-heading">Введение</h2>

Вы создали красивую функцию Feed на своем сайте и теперь хотите протестировать эту функцию.

Ваш код выглядит следующим образом

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">import React from 'react';

function Feed() {
  const [feeds, setFeeds] = React.useState([]);

  React.useEffect(() =&gt; {
    const ctl = new AbortController();

    fetch('https://api.domain.com/feeds')
      .then(res =&gt; res.json())
      .then(res =&gt; setFeeds(res.data))
      .catch(() =&gt; {
        // Log the error
      });

    return cleanup() {
      ctl.abort();
    };
  }, [])

  return (
    &lt;ul&gt;
      {feeds.map(feed =&gt; (
        &lt;li&gt;{feed.title}&lt;/li&gt;
      ))}
    &lt;/ul&gt;
  );
}
</code></pre>
<!-- /wp:code -->

Хотя, это действительно простая задача, где вы хотите показать пользователям фид в пользовательском интерфейсе.

Вы запутались в том, как протестировать функцию, потому что вы ”должны" получить данные фида из API, но поскольку это тест, вы не будете обращаться непосредственно к API.

<h2 class="wp-block-heading">Путешествие</h2>

Теперь вы ищете возможные решения в Интернете. Поскольку вы используете React и, конечно же, используете Jest и testing-library (это стандартная настройка от CRA), кто-то предлагает вам поиздеваться над объектом window.fetch.

Вы заинтересовались и вставили решение в свой тест следующим образом

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">// Import all dependencies... 

const MOCK_FEEDS = [/** Feed objects here */];

beforeAll(() =&gt; {
  jest.spyOn(window, 'fetch');
});

describe('Feed Feature Test', () =&gt; {
  it('should shows users feed', () =&gt; {
    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () =&gt; ({ data: MOCK_FEEDS }),
    })
    // Your testing goes here... 
  });
});
</code></pre>
<!-- /wp:code -->

Вы тестируете код, и он выглядит зеленым (значит, тест пройден), и вы довольны этим.

Наступило завтра. Вы забыли о пользовательском интерфейсе ”пустое состояние" для функции Feed, и сегодня вы его сделали.

Поскольку UI с пустым состоянием должен выдавать ошибку HTTP NOT FOUND, вам нужно переделать тест.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">// Import all dependencies... 

const MOCK_FEEDS = [/** Feed objects here */];
const MOCK_FEEDS_NOT_FOUND = [];

beforeAll(() =&gt; {
  jest.spyOn(window, 'fetch');
});

beforeEach(() =&gt; {
  jest.restoreAllMocks()
});

describe('Feed Feature Test', () =&gt; {
  it('should shows empty state UI when feeds not found', () =&gt; {
    window.fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () =&gt; ({ data: MOCK_FEEDS_NOT_FOUND }),
    })
    // Your testing goes here... 
  });

  it('should shows users feed', () =&gt; {
    window.fetch.mockResolvedValueOnce({
      ok: false,
      json: async () =&gt; ({ data: MOCK_FEEDS }),
    })
    // Your testing goes here... 
  });
});
</code></pre>
<!-- /wp:code -->

Ваш тест пройден, и вы снова счастливы.

На следующее утро вам позвонил менеджер проекта. Он хочет, чтобы вы добавили кнопку “like (❤️)”, и вы делаете это.

В рамках этой задачи вы должны обновить функцию, чтобы получить две конечные точки API. Сначала вы должны использовать GET /feeds, а затем POST /feeds/{id}/like для выполнения функции “like this feed”.

Добавив несколько кодов, вы снова рефакторите тест, но понимаете, что имитируемая выборка не заботится об URL. К какой бы конечной точке API вы ни обращались, она всегда возвращает один и тот же ответ и потенциальную ошибку на будущее.

Теперь тест выглядит следующим образом

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">// Import all dependencies... 

const MOCK_FEEDS = [/** Feed objects here */];
const MOCK_FEEDS_NOT_FOUND = [];

beforeAll(() =&gt; {
  jest.spyOn(window, 'fetch');
});

beforeEach(() =&gt; {
  window.fetch.mockImplementation(async (url, config) =&gt; {
    switch (url) {
      case '/feeds':
        return {
          ok: true,
          json: async () =&gt; MOCK_FEEDS,
        };
      case '/feeds/1/like':
        return {
          ok: true,
          json: async () =&gt; ({ liked: true })
        };
      default:
        throw new Error(`Unhandled request: ${url}`);
    }
  });
});

describe('Feed Feature Test', () =&gt; {
  it('should shows empty state UI when feeds not found', () =&gt; {
    // Your testing goes here... 
  });

  it('should shows users feed', () =&gt; {
    // Your testing goes here... 
  });

  it('should able to like the feed', () =&gt; {
    // Your testing goes here...
  })
});
</code></pre>
<!-- /wp:code -->

Тесты пройдены, кроме первого. Вы спрашиваете ”почему?”, а затем понимаете, что нет обработчика запроса для GET /feeds со статусом 404 http.

<h2 class="wp-block-heading">Решение</h2>

К счастью, существует инструмент под названием Mock Service Worker. Это инструмент для имитации API и работы на сетевом уровне.

Просто представьте, что вы можете подражать вашему API серверу и использовать его внутри вашего теста без головной боли.

И самое интересное:

Поддержка Rest API и GraphQL<br>Поддержка Node и Browser (то есть вы можете использовать его с Express и т.д.).<br>И многое другое…

Хватит объяснять, давайте установим требования и отрефакторим тесты.

Во-первых, установите msw.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">npm i -D msw
</code></pre>
<!-- /wp:code -->

Чтобы использовать MSW, вам нужно сделать обработчики запросов с определенным методом HTTP и URL. Так, он дает вам возможность сделать GET 200 /feeds и GET 404 /feeds. Он также поддерживает параметр URL, такой как /feeds/:feedId/like.

Теперь обновите тест следующим образом…

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">// Import all dependencies... 
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const MOCK_FEEDS = [/** Feed objects here */];
const MOCK_FEEDS_NOT_FOUND = [];

const url = (path) =&gt; `https://api.domain.com/feeds/${path}`;

const defaultHandlers = [
  rest.get(url(path), (req, res, ctx) =&gt; {
    return res(ctx.json(MOCK_FEEDS));
  }),
  rest.get(url(path), () =&gt; {
    return res(
      ctx.status(404),
      ctx.json(MOCK_FEEDS_NOT_FOUND),
    );
  })
];

const server = setupServer(...defaultHandlers);

describe('Feed Feature Test', () =&gt; {
  beforeAll(() =&gt; {
    server.listen();
  });

  afterEach(() =&gt; {
    server.resetHandlers();
  });

  afterAll(() =&gt; {
    server.close();
  });

  it('should shows empty state UI when feeds not found', () =&gt; {
    // Your testing goes here... 
  });

  it('should shows users feed', () =&gt; {
    // Your testing goes here... 
  });

  it('should able to like the feed', () =&gt; {
    // Adds the "POST /feeds/:feedId/like" request handler as a part of this test.
    server.use(
      rest.post(url('feeds/:feedId/like'), (req, rest, ctx) =&gt; {
        return res(
          ctx.json({ liked: true }),
        );
      }),
    );
    // Your testing goes here...
  })
});
</code></pre>
<!-- /wp:code -->

Бум! Ваши тесты пройдены. Не только тесты пройдены, но и улучшен DX, потому что вы можете легко создать мощную маршрутизацию URL.

Вы также можете разделить обработчики в другой файл, чтобы избежать повторного написания обработчиков. Это делает их многократно используемыми во всех тестах.

MSW не только обеспечивает лучший DX, но и предлагает вам HTTP Cookie и другие возможности HTTP. Потрясающе!

<h2 class="wp-block-heading">Заключение</h2>

Издевательство (и тестирование) HTTP-запросов - одна из сложных задач, но MSW предлагает мощные возможности, кросс-платформенность и простой подход к решению этой проблемы.

MSW обеспечивает нативный подход, перехватывая сеть и возвращая созданные нами обработчики вместо настоящих. Это предотвращает загрязнение window.fetch путем издевательства над ним и потенциально может привести к ошибкам.

Бесшовная библиотека мокинга REST/GraphQL API для браузера и Node.js.

Mock Service Worker (MSW) - это бесшовная библиотека мокинга REST/GraphQL API для браузера и Node.js.

<h2 class="wp-block-heading">Особенности</h2>

Бесшовность. Специальный уровень перехвата запросов в вашем распоряжении. Код и тесты вашего приложения не будут знать о том, высмеивается что-то или нет.

Без отклонений. Запрашивайте те же производственные ресурсы и тестируйте реальное поведение вашего приложения. Дополняйте существующий API или разрабатывайте его на ходу, когда его нет.

Знакомый и мощный. Используйте синтаксис маршрутизации, подобный Express, для перехвата запросов. Используйте параметры, подстановочные знаки и регулярные выражения для сопоставления запросов и отвечайте на них необходимыми кодами состояния, заголовками, cookies, задержками или полностью собственными резолверами.

”Я нашел MSW и был в восторге от того, что я не только мог видеть имитированные ответы в своих DevTools, но и от того, что имитаторы не нужно было писать в Service Worker, а можно было жить рядом с остальными приложениями.
