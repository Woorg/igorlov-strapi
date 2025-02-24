---
title: '5 советов по улучшению интеграции бэкенда, React с Axios'
meta_title: '5 советов по улучшению интеграции бэкенда, React с Axios - Фул Фронт Девv'
description: Учебник
date: 2023-01-29T17:18:00.000Z
image: ../../assets/images/undefined-Jan-29-2023.avif
categories:
  - Учебник
author: Igor Gorlov
tags:
  - Javascript
  - React
  - Axios
draft: false
lastmod: 2024-03-20T21:26:47.387Z
---

<!-- wp:rank-math/toc-block {"title":"Оглавление","headings":[{"key":"9b8f5744-91bf-4ee6-84a8-79d18fc824f2","content":"Введение","level":2,"link":"#введение","disable":false,"isUpdated":true,"isGeneratedLink":true},{"key":"eec44656-a15c-43f7-aace-bbeed1380adf","content":"Инкапсулировать услугу","level":2,"link":"#инкапсулировать-услугу","disable":false,"isUpdated":true,"isGeneratedLink":true},{"key":"979970a8-e4b8-4e34-b838-9d3668d75127","content":"Добавьте заголовки ко всем запросам","level":2,"link":"#добавьте-заголовки-ко-всем-запросам","disable":false,"isUpdated":true,"isGeneratedLink":true},{"key":"940056ca-2fbc-44e1-b856-07c4f9f687b0","content":"Перенаправление неавторизованного или не прошедшего аутентификацию пользователя","level":2,"link":"#перенаправление-неавторизованного-или-не-прошедшего-аутентификацию-пользователя","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"71344839-a4d9-4754-89b7-a082e5a57720","content":"Шаблон повторного запроса","level":2,"link":"#шаблон-повторного-запроса","disable":false,"isUpdated":true,"isGeneratedLink":true},{"key":"fc6588b6-7ccf-4f29-b00e-f4b19d3c40ab","content":"Обновить токен","level":2,"link":"#обновить-токен","disable":false,"isUpdated":true,"isGeneratedLink":true}],"listStyle":"ul"} -->

<div class="wp-block-rank-math-toc-block" id="rank-math-toc"><h2>Оглавление</h2><nav><ul><li class=""><a href="#введение">Введение</a></li><li class=""><a href="#инкапсулировать-услугу">Инкапсулировать услугу</a></li><li class=""><a href="#добавьте-заголовки-ко-всем-запросам">Добавьте заголовки ко всем запросам</a></li><li class=""><a href="#перенаправление-неавторизованного-или-не-прошедшего-аутентификацию-пользователя">Перенаправление неавторизованного или не прошедшего аутентификацию пользователя</a></li><li class=""><a href="#шаблон-повторного-запроса">Шаблон повторного запроса</a></li><li class=""><a href="#обновить-токен">Обновить токен</a></li></ul></nav></div>
<!-- /wp:rank-math/toc-block -->

<h2 class="wp-block-heading" id="введение"><a name="introduction" href="#introduction"><br></a><br>Введение</h2>

В большинстве фронтенд-приложений мы должны интегрироваться с бэкендом, и с этим приходит несколько библиотек, которые мы можем использовать, такие как fetch, ajax, axios и другие, и каждая из них имеет свои характеристики, преимущества и недостатки.

<!-- wp:image {"linkDestination":"custom"} -->
<figure class="wp-block-image"><a class="article-body-image-wrapper" href="https://res.cloudinary.com/practicaldev/image/fetch/s--9PL0Knci--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/n99dh3eb9oews0mbisou.png"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--9PL0Knci--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/n99dh3eb9oews0mbisou.png" alt="Библиотеки для интеграции с бэкендом"/></a></figure>
<!-- /wp:image -->

Но независимо от того, какой из них мы собираемся использовать в нашем приложении, мы должны продумать моменты, которые помогут нам в обслуживании и лучшей коммуникации, чтобы не повлиять на удобство работы пользователя.

В этой заметке я буду использовать axios с react и применять концепции, которые я считаю чрезвычайно важными и которые мы должны использовать в наших приложениях. Я приму во внимание, что у вас уже есть проект react с установленным axios.

<!-- wp:image {"linkDestination":"custom"} -->
<figure class="wp-block-image"><a class="article-body-image-wrapper" href="https://res.cloudinary.com/practicaldev/image/fetch/s--DQ_L4IQw--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/geuh8vey6x62vuavporf.jpeg"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--DQ_L4IQw--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/geuh8vey6x62vuavporf.jpeg" alt="Логотип axios"/></a></figure>
<!-- /wp:image -->

<h2 class="wp-block-heading" id="инкапсулировать-услугу"><a name="1-encapsulate-service" href="#1-encapsulate-service"><br></a><br>Инкапсулировать услугу</h2>

Мы должны создать общий сервис с именем библиотеки, которую мы решили использовать для интеграции, и просто использовать его в приложении, с той же идеей компонентов, таких как карточка, входы и другие, что мы уже делаем.

<!-- wp:image {"linkDestination":"custom"} -->
<figure class="wp-block-image"><a class="article-body-image-wrapper" href="https://i.giphy.com/media/qYytk8KxBPA1q/giphy.gif"><img src="https://i.giphy.com/media/qYytk8KxBPA1q/giphy.gif" alt="Сервис"/></a></figure>
<!-- /wp:image -->

Сначала мы должны создать файл http.js или http.ts (помня, что вы можете задать другое имя, если хотите) для экспорта axios с уже настроенным базовым url нашего бэкенда.

<!-- wp:code {"textColor":"base","lineNumbers":true} -->
<pre class="wp-block-code has-base-color has-text-color"><code lang="javascript" class="language-javascript line-numbers">import Axios from 'axios';

const http = Axios.create({
  baseURL: process.env.REACT_APP_URL,
});

export default http;
</code></pre>
<!-- /wp:code -->

Теперь мы должны создать еще один файл index.js или index.ts, куда мы экспортируем наиболее часто используемые http-методы, уже обернутые в try catch blog, чтобы разобраться с ошибками вызовов прямо здесь. Здесь мы уже используем созданный нами выше файл http.ts для запуска axios с параметрами, в последующих постах мы будем развивать этот файл.

<!-- wp:code {"lineNumbers":true} -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript line-numbers">import http from './http';

export default {
  async get(url: string) {
    try {
      const response = await http.get(url);
      return response;
    } catch (err: any) {
      return false;
    }
  },
  async post(url: string, send: object) {
    try {
      const response = await http.post(url, send);
      return response;
    } catch (err: any) {
      return false;
    }
  },
  async put(url: string, send: object) {
    try {
      const response = await http.put(url, send);
      return response;
    } catch (err: any) {
      return false;
    }
  },
  async delete(url: string) {
    try {
      await http.delete(url);
      return true;
    } catch (err: any) {
      return false;
    }
  },
};
</code></pre>
<!-- /wp:code -->

В итоге мы получим следующую структуру папок.

<!-- wp:image {"linkDestination":"custom"} -->
<figure class="wp-block-image"><a class="article-body-image-wrapper" href="https://res.cloudinary.com/practicaldev/image/fetch/s--VjIueyxS--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ic98la9owmmyhnzehcy5.png"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--VjIueyxS--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ic98la9owmmyhnzehcy5.png" alt="Структура папок"/></a></figure>
<!-- /wp:image -->

Таким образом, мы сможем вызывать метод на наших компонентах.

<code>await services.post( ’/authenticate’, { email, password } );</code>

Но почему необходимо использовать именно такой подход?

<!-- wp:image {"linkDestination":"custom"} -->
<figure class="wp-block-image"><a class="article-body-image-wrapper" href="https://i.giphy.com/media/CaiVJuZGvR8HK/giphy.gif"><img src="https://i.giphy.com/media/CaiVJuZGvR8HK/giphy.gif" alt="Почему стоит использовать"/></a></figure>
<!-- /wp:image -->

Когда мы работаем с общим сервисом и только импортируем его в наше приложение, его становится проще поддерживать и изменять в дальнейшем. Ниже показано, как мы можем это сделать.

<h2 class="wp-block-heading" id="добавьте-заголовки-ко-всем-запросам"><a name="2-add-headers-to-all-requests" href="#2-add-headers-to-all-requests"><br></a>Добавьте заголовки ко всем запросам</h2>

Теперь давайте настроим заголовки для всех наших запросов, нам понадобится этот пункт для передачи токена и другой информации, которая может понадобиться вашему бэкенду в качестве бизнес-правил.

Давайте создадим для этого перехватчики axios, так как это лучший способ не повторять код. Смотрите пример ниже.

<!-- wp:code {"lineNumbers":true} -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript line-numbers">import Axios, { AxiosRequestConfig } from 'axios';

const http = Axios.create({
  baseURL: process.env.REACT_APP_URL,
});

http.interceptors.request.use((config: AxiosRequestConfig) =&gt; {
  const token = window.localStorage.getItem('token');
  if (!token) return config;
  if (config?.headers) {
    config.headers = { Authorization: `Bearer ${token}` };
  }
  return config;
});

export default http;
</code></pre>
<!-- /wp:code -->

Здесь мы уже извлекли токен localstorage и добавили его во все обращения к бэкенду.

<h2 class="wp-block-heading" id="перенаправление-неавторизованного-или-не-прошедшего-аутентификацию-пользователя">Перенаправление неавторизованного или не прошедшего аутентификацию пользователя</h2>

Мы должны иметь стратегии перенаправления пользователей, когда у пользователя нет авторизации или разрешения, чтобы у него не было необходимости делать это в наших компонентах.

Для этого мы должны создать еще один перехватчик, который будет заниматься этим процессом.

<!-- wp:code {"lineNumbers":true} -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript line-numbers">import Axios, { AxiosRequestConfig } from 'axios';

const http = Axios.create({
  baseURL: process.env.REACT_APP_URL,
});

http.interceptors.request.use((config: AxiosRequestConfig) =&gt; {
  const token = window.localStorage.getItem('token');
  if (!token) return config;
  if (config?.headers) {
    config.headers = { Authorization: `Bearer ${token}` };
  }
  return config;
});

http.interceptors.response.use(
  (value) =&gt; {
    return Promise.resolve(value);
  },
  (error) =&gt; {
    const { isAxiosError = false, response = null } = error;

    if (isAxiosError &amp;&amp; response &amp;&amp; response.status === 401) {
      // User redirection rule for login page
      return Promise.reject(error);
    }
    if (isAxiosError &amp;&amp; response &amp;&amp; response.status === 403) {
      // User redirection rule for disallowed page
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default http;
</code></pre>
<!-- /wp:code -->

Оставьте открытым место, куда вы хотите отправить пользователя для 401(Unauthenticated) и 403(Unauthorized). Таким образом, даже если пользователю удастся получить доступ к странице, на которую он не мог попасть, когда запрос от бэкенда вернется с кодом статуса, система уже направит его. Этот подход также работает для случаев, когда срок действия токена истекает, с чем мы разберемся позже.

<h2 class="wp-block-heading" id="шаблон-повторного-запроса"><a name="4-request-retry-pattern" href="#4-request-retry-pattern"><br></a><br>Шаблон повторного запроса</h2>

Теперь нам нужно применить шаблон повторных попыток к нашим запросам, чтобы наш конечный пользователь не страдал от нестабильности приложения, поскольку в момент вызова оно может находиться в процессе развертывания или автоматического масштабирования инфраструктуры. Для этого мы определяем количество попыток в случае, если система возвращает ошибку 500 или выше. Пример ниже.

<!-- wp:code {"lineNumbers":true} -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript line-numbers">import Axios, { AxiosRequestConfig } from 'axios';

const http = Axios.create({
  baseURL: process.env.REACT_APP_URL,
});

http.interceptors.request.use((config: AxiosRequestConfig) =&gt; {
  const token = window.localStorage.getItem('token');
  if (!token) return config;
  if (config?.headers) {
    config.headers = { Authorization: `Bearer ${token}` };
  }
  return config;
});

http.interceptors.response.use(
  (value) =&gt; {
    return Promise.resolve(value);
  },
  (error) =&gt; {
    const { isAxiosError = false, response = null } = error;

    if (isAxiosError &amp;&amp; response &amp;&amp; response.status === 401) {
      // Regra de redirecionamento de usuário para página de login
      return Promise.reject(error);
    }
    if (isAxiosError &amp;&amp; response &amp;&amp; response.status === 403) {
      // Regra de redirecionamento de usuário para página de não permitido
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

let counter = 1;

http.interceptors.response.use(
  (response) =&gt; {
    return response;
  },
  (error) =&gt; {
    if (
      error.response.status &gt;= 500 &amp;&amp;
      counter &lt; Number(process.env.REACT_APP_RETRY)
    ) {
      counter++;
      return http.request(error.config);
    }
    counter = 1;
    return Promise.reject(error);
  }
);

export default http;
</code></pre>
<!-- /wp:code -->

Перехватчик был создан таким образом, что он имеет повторную попытку в соответствии с количеством, определенным в process.env.REACT_APP_RETRY раз, когда запрос имеет код состояния больше 500.

<h2 class="wp-block-heading" id="обновить-токен"><a name="5-refresh-token" href="#5-refresh-token"><br></a><br>Обновить токен</h2>

Когда мы работаем с аутентификацией, хорошей практикой и правилом безопасности является наличие токенов, срок действия которых истекает, чтобы пользователь не оставался залогиненным навсегда, даже не используя приложение.

Однако мы должны решить проблему, что если срок действия токена истекает, когда пользователь не может просто попросить его войти снова, для этого у нас есть маршруты для обновления токена.

Мы можем улучшить наш файл index.ts так, чтобы он делал это автоматически во время вызовов маршрутов вашего приложения.

<!-- wp:code {"lineNumbers":true} -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript line-numbers">import http from './http';

async function refreshToken() {
  const value = Number(localStorage.getItem('expired'));
  if (value &amp;&amp; new Date(value) &lt; new Date()) {
    const result = await http.get('/refresh');
    localStorage.setItem('token', result.data.token);
    localStorage.setItem(
      'expired',
      String(new Date().setSeconds(result.data.expired))
    );
  }
}

export default {
  async get(url: string) {
    try {
      await refreshToken();
      const response = await http.get(url);
      return response;
    } catch (err: any) {
      return false;
    }
  },
  async post(url: string, send: object) {
    try {
      await refreshToken();
      const response = await http.post(url, send);
      return response;
    } catch (err: any) {
      return false;
    }
  },
  async put(url: string, send: object) {
    try {
      await refreshToken();
      const response = await http.put(url, send);
      return response;
    } catch (err: any) {
      return false;
    }
  },
  async delete(url: string) {
    try {
      await refreshToken();
      await http.delete(url);
      return true;
    } catch (err: any) {
      return false;
    }
  },
};
</code></pre>
<!-- /wp:code -->

Мы создали функцию refreshToken(), которая всегда будет вызываться перед всеми вызовами нашего приложения. Она будет проверять, не истек ли уже срок действия токена, и если да, то делать новый вызов бэкенда, обновляя токен и его срок действия. Помня, что эта логика работает в зависимости от бэкенда, а маршрут обновления, например, имеет ограничение по времени после перехода от истечения срока действия к обновлению токена, это будет скорее бизнес-правило.

В этом посте мы рассмотрели пять способов улучшить нашу связь с бэкендом, принимая во внимание лучший опыт для конечного пользователя, существует множество других подходов, которые могут улучшить нашу службу обращений к бэкенду, но просто реализовав эти концепции, мы получим лучшее обслуживание и удобство использования нашей системы. В следующих статьях мы рассмотрим, как еще больше улучшить этот сервис.

<!-- wp:image {"linkDestination":"custom"} -->
<figure class="wp-block-image"><a class="article-body-image-wrapper" href="https://i.giphy.com/media/ICOgUNjpvO0PC/giphy.gif"><img src="https://i.giphy.com/media/ICOgUNjpvO0PC/giphy.gif" alt="Спасибо вам до следующего раза"/></a></figure>
<!-- /wp:image -->

Axios - <a href="https://axios-http.com/docs/intro" target="_blank" rel="noreferrer noopener nofollow">https://axios-http.com/docs/intro</a><br>React - <a href="https://reactjs.org/" target="_blank" rel="noreferrer noopener nofollow">https://reactjs.org/</a>
