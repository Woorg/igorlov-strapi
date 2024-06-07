---
title: Защита приложений Next.js от CSRF-атак
meta_title: Защита приложений Next.js от CSRF-атак - Igor Gorlov
description: >-
  В этой статье мы рассмотрим атаки Cross-Site Request Forgery (CSRF) в
  контексте приложения Next.js и способы защиты от них. Сначала мы рассмотрим
  концепцию CSRF-атак и то, как они могут повлиять на веб-приложение в целом.
  Для этого мы опишем сценарий, в котором мы запустим CSRF-атаку на наше
  приложение Next.js.
date: 2023-04-27T21:56:07.000Z
author: Igor Gorlov
image: ../../assets/images/undefined-Apr-28-2023.avif
categories:
  - Учебник
tags:
  - Next.js
draft: false
lastmod: 2024-03-20T21:26:46.771Z
---

В этой статье мы рассмотрим атаки Cross-Site Request Forgery (CSRF) в контексте приложения Next.js и способы защиты от них. Сначала мы рассмотрим концепцию CSRF-атак и то, как они могут повлиять на веб-приложение в целом. Для этого мы опишем сценарий, в котором мы запустим CSRF-атаку на наше приложение Next.js. Затем мы используем пакет next-csrf и определенные теги безопасности cookie, чтобы показать, как защититься от этих атак. Исходный код этой заметки можно найти здесь.

<!-- wp:rank-math/toc-block {"title":"Оглавление","headings":[{"key":"4b7356b6-7329-4787-81cd-83785d550505","content":"Что такое CSRF-атака?","level":2,"link":"#что-такое-csrf-атака","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"97832a5c-d9e4-4a93-b727-60fd2c46f982","content":"Как защититься от атаки CSRF","level":2,"link":"#как-защититься-от-атаки-csrf","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"4ca4ccfb-19b3-45cd-a4c8-8ea9c9f8d0f7","content":"Использование файлов cookie SameSite","level":3,"link":"#использование-файлов-cookie-same-site","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"1e304f63-79c6-4611-9529-318bddf3ca98","content":"Использование файлов cookie только для HTTP","level":3,"link":"#использование-файлов-cookie-только-для-http","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"858b3d02-40bb-4ecb-a4fd-14b8559bf639","content":"Использование CSRF-токенов","level":3,"link":"#использование-csrf-токенов","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"ec202a38-3224-4eb1-afe7-344bd1031c58","content":"Как проводить CSRF-атаки на незащищенных веб-страницах","level":2,"link":"#как-проводить-csrf-атаки-на-незащищенных-веб-страницах","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"9a276f0e-a309-4b76-a3b5-f00077a51fc8","content":"Страница входа в систему выглядит следующим образом:","level":2,"link":"#страница-входа-в-систему-выглядит-следующим-образом","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"0db8a956-18a4-4c6f-8dc7-02ff3eba54dd","content":"Как защитить приложение Next.js от CSRF-атак","level":2,"link":"#как-защитить-приложение-next-js-от-csrf-атак","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"373820f0-c063-45f5-bb17-443918cbc2f8","content":" Использование маркеров SameSite и HttpOnly","level":3,"link":"#использование-маркеров-same-site-и-http-only","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"3546e4b0-eddc-499d-bde2-47d64e6e1430","content":"Использование CSRF-токенов","level":3,"link":"#использование-csrf-токенов-1","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"84109be8-f6fa-4203-9566-46e5bdc369e4","content":"Заключение","level":2,"link":"#заключение","disable":false,"isUpdated":false,"isGeneratedLink":true}],"listStyle":"ul"} -->
<div class="wp-block-rank-math-toc-block" id="rank-math-toc"><h2>Оглавление</h2><nav><ul><li class=""><a href="#что-такое-csrf-атака">Что такое CSRF-атака?</a></li><li class=""><a href="#как-защититься-от-атаки-csrf">Как защититься от атаки CSRF</a><ul><li class=""><a href="#использование-файлов-cookie-same-site">Использование файлов cookie SameSite</a></li><li class=""><a href="#использование-файлов-cookie-только-для-http">Использование файлов cookie только для HTTP</a></li><li class=""><a href="#использование-csrf-токенов">Использование CSRF-токенов</a></li></ul></li><li class=""><a href="#как-проводить-csrf-атаки-на-незащищенных-веб-страницах">Как проводить CSRF-атаки на незащищенных веб-страницах</a></li><li class=""><a href="#страница-входа-в-систему-выглядит-следующим-образом">Страница входа в систему выглядит следующим образом:</a></li><li class=""><a href="#как-защитить-приложение-next-js-от-csrf-атак">Как защитить приложение Next.js от CSRF-атак</a><ul><li class=""><a href="#использование-маркеров-same-site-и-http-only"> Использование маркеров SameSite и HttpOnly</a></li><li class=""><a href="#использование-csrf-токенов-1">Использование CSRF-токенов</a></li></ul></li><li class=""><a href="#заключение">Заключение</a></li></ul></nav></div>
<!-- /wp:rank-math/toc-block -->

<h2 class="wp-block-heading" id="что-такое-csrf-атака">Что такое CSRF-атака?</h2>

Представьте, что вы вошли на сайт онлайн-банкинга, который устанавливает cookie в вашем браузере для поддержания вашей личной сессии. Этот файл cookie содержит маркер аутентификации, который используется для идентификации вашей сессии и аутентификации ваших запросов.

Очень упрощенный, но возможный HTTP-запрос для отправки денег может быть следующим:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">POST /transfer HTTP/1.1
Host: vulnerable-bank.com
Content-Type: application/json
Content-Length: 30
Cookie: session=454544

amount=1000$
name=friendlyuser@gmail.com
iban=DE7823778237873</code></pre>
<!-- /wp:code -->

В то же время при CSRF-атаке у вас в браузере открыта еще одна вкладка, на которой загружен вредоносный сайт. Этот вредоносный сайт может содержать скрытую форму или код JavaScript, который отправляет запрос на сайт онлайн-банка, используя наш маркер аутентификации.

Поскольку запрос инициируется из одного и того же браузера, веб-приложение не может отличить законный запрос, инициированный нами, от поддельного запроса, отправленного злоумышленником. Веб-приложение обработает запрос и выполнит непредусмотренное действие без нашего ведома или согласия.

<h2 class="wp-block-heading" id="как-защититься-от-атаки-csrf">Как защититься от атаки CSRF</h2>

В этом разделе мы обсудим несколько различных способов защиты от CSRF-атак.

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="использование-файлов-cookie-same-site">Использование файлов cookie SameSite</h3>

Возможный способ защитить ваше приложение Next.js от CSRF-атак - это определить значение SameSite внутри файлов cookie, которые вы используете на своем сайте. Google ввел это значение в 2006 году с целью предотвратить автоматическую отправку файлов cookie вместе с межсайтовыми запросами браузера, как это происходило ранее, что позволило бы минимизировать риск потери конфиденциальной информации и обеспечить защиту от подделки межсайтовых запросов.

Атрибут SameSite может принимать значение strict или lax. В строгом режиме защищенный файл cookie не отправляется ни с одним межсайтовым запросом. Это уже применимо к щелчку на простой ссылке, но если применить это к нашему примеру с онлайн-банкингом, то это означает, что вам придется заново проходить аутентификацию каждый раз, когда вы будете перенаправлены на страницу онлайн-банкинга.

Это не соответствует обычному поведению веб-приложений, поскольку пользователи не хотят постоянно заново входить в систему. К счастью, режим lax несколько смягчает такое поведение и позволяет отправлять cookie вместе с некоторыми ”безопасными" межсайтовыми запросами. Это влияет только на безопасные методы HTTP, доступные только для чтения, и навигацию верхнего уровня (действия, которые приводят к изменению URL в адресной строке браузера, например, ссылки).

Ниже приведен обзор различных типов запросов и их различных вариантов, которые влияют на то, будет ли отправлен файл cookie или нет. Большой палец вверх означает, что cookie будет отправлен. Например, вы можете видеть, что в строгом режиме cookie никогда не будет отправлен вместе с межсайтовым запросом.

<!-- wp:table -->
<figure class="wp-block-table"><table><tbody><tr><td>Тип запроса</td><td>Пример</td><td>Без SameSite</td><td>нестрогий режим</td><td>строгий режим</td></tr><tr><td>a-tag</td><td>&lt;a href=”..”&gt;</td><td>👍</td><td>👍</td><td>👎</td></tr><tr><td>form (get)</td><td>&lt;form method=”get”…&gt;</td><td>👍</td><td>👍</td><td>👎</td></tr><tr><td>form (post)</td><td>&lt;form method=”post”…&gt;</td><td>👍</td><td>👎</td><td>👎</td></tr><tr><td>iframe</td><td>&lt;iframe src=”..”&gt;</td><td>👍</td><td>👎</td><td>👎</td></tr><tr><td>ajax</td><td>$.get(“…”)</td><td>👍</td><td>👎</td><td>👎</td></tr><tr><td>image-tag</td><td>&lt;img src=”…”&gt;</td><td>👍</td><td>👎</td><td>👎</td></tr></tbody></table></figure>
<!-- /wp:table -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="использование-файлов-cookie-только-для-http">Использование файлов cookie только для HTTP</h3>

Установив флаг HttpOnly cookie, вы можете снизить вероятность CSRF-атаки, поскольку HTTP-only cookie не могут быть получены JavaScript через сценарии на стороне клиента.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">res.setHeader("Set-Cookie", `session=${sessionId}; Path=/;   Max-Age=600; SameSite=Strict; HttpOnly`);
</code></pre>
<!-- /wp:code -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="использование-csrf-токенов">Использование CSRF-токенов</h3>

Одним из способов защиты вашего веб-приложения от CSRF-атаки является использование так называемых CSRF-токенов. CSRF-токен - это уникальное случайное значение, которое генерируется на стороне сервера и включается в каждый запрос, отправляемый клиентом. Если маркер, отправленный клиентом, совпадает с маркером, хранящимся на стороне сервера, запрос считается легитимным и обрабатывается сервером. В противном случае запрос будет отклонен.

Важно отметить, что CSRF-токены обеспечивают эффективную защиту от CSRF-атак до тех пор, пока токен генерируется случайным образом и не может быть легко угадан или предсказан. Кроме того, срок действия токена должен истекать через определенный период времени или после однократного использования, чтобы предотвратить повторное использование злоумышленниками старых токенов.

<h2 class="wp-block-heading" id="как-проводить-csrf-атаки-на-незащищенных-веб-страницах">Как проводить CSRF-атаки на незащищенных веб-страницах</h2>

В этом разделе мы рассмотрим код примера страницы онлайн-банкинга и то, как она уязвима для CSRF-атак. После этого мы реализуем защиту от CSRF с помощью пакета next-csrf и установки значения SameSite в куки сессии.

Наш демонстрационный онлайн-банк состоит из двух основных маршрутов: маршрут входа и маршрут перевода. Маршрут перевода доступен только после успешной аутентификации через маршрут входа. Для этого я создал простой API-маршрут для обработки запроса на вход:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">// pages/api/login.js

export default function login(req, res) {
  // check the user's credentials
  const { username, password } = req.body;
  let authenticated;

  if (username === "test" &amp;&amp; password === "123456") {
    authenticated === true 
  } else {
    authenticated === false
  }
     

  if (authenticated) {
    // set a cookie with the a random sessionId
    const sessionId = 454544;
    res.setHeader("Set-Cookie", `session=${sessionId}; Path=/;   Max-Age=600`);

    // send a success response
    res.status(200).json({ message: "Login successful" });
  } else {
    // send an error response
    res.status(401).json({ message: "Invalid credentials" });
  }
}</code></pre>
<!-- /wp:code -->

<!-- wp:image {"align":"center","id":167883} -->
<figure class="wp-block-image aligncenter"><img src="https://blog.logrocket.com/wp-content/uploads/2023/04/login-page.png?is-pending-load=1" alt="The login page" class="wp-image-167883"/></figure>
<!-- /wp:image -->

<h2 class="wp-block-heading" id="страница-входа-в-систему-выглядит-следующим-образом">Страница входа в систему выглядит следующим образом:</h2>

Самой важной строкой кода в приведенном выше коде, вероятно, является:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript"><code>res.setHeader("Set-Cookie", `session=${sessionId}; Path=/; Max-Age=600`);</code></code></pre>
<!-- /wp:code -->

Это устанавливает cookie с идентификатором сессии и продолжительностью 10 минут. Для простоты мы используем жестко закодированные идентификаторы сеанса, имена пользователей и пароли.

После успешной аутентификации вы должны увидеть страницу перевода средств на нашем демонстрационном сайте онлайн-банкинга:

Соответствующий упрощенный API-маршрут для обработки банковских переводов выглядит следующим образом:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">// pages/api/transfer.js

export default function handler(req, res) {
  // Check that the request method is POST
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  // Check that the request has a valid session cookie
  if (!req.cookies.session) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  // Parse the JSON data from the request body
  const { amount, name, iban } = req.body;

  // TODO: Implement transfer logic

  // Return a success message
  res.status(200).json({ message: 'Transfer successful' });
}</code></pre>
<!-- /wp:code -->

В приведенном выше коде мы выполняем две проверки: Одна для метода запроса, а другая проверяет сессионный файл cookie.

Мы не собираемся создавать вредоносный сайт; вместо этого мы будем имитировать отправку данных через форму или код JavaScript на этом вредоносном сайте. Поскольку запрос инициируется из того же браузера, к нему автоматически будет прикреплен сеансовый cookie, и наш бэкенд не сможет отличить легитимный запрос, инициированный нами как аутентифицированным пользователем, от поддельного запроса, отправленного злоумышленником.

Все, что нам нужно отправить через этот CURL-запрос, это данные формы (сумма, имя, iban) и сессионный cookie. Соответствующий запрос выглядит следующим образом:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">curl -X POST \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Cookie: session=1234" \
  -d "iban=1736123125&amp;amount=10000000&amp;name=Criminal" \
  http://localhost:3000/api/transfer</code></pre>
<!-- /wp:code -->

Незащищенный маршрут api/transfer приведет к такому ответу:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">{"name":"Criminal","iban":"1736123125","amount":"10000000"}</code></pre>
<!-- /wp:code -->

Этот ответ означает, что мы только что успешно выполнили CSRF-атаку на странице онлайн-банкинга.

<h2 class="wp-block-heading" id="как-защитить-приложение-next-js-от-csrf-атак">Как защитить приложение Next.js от CSRF-атак</h2>

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="использование-маркеров-same-site-и-http-only"><br>Использование маркеров SameSite и HttpOnly</h3>

Давайте сначала реализуем атрибуты SameSite и HttpOnly нашего сессионного cookie, поскольку это легко сделать за один шаг. Помните, что мы установили cookie в нашем маршруте API входа в систему, расположенном в src/pages/api/login.js. Давайте настроим параметр cookie в соответствующем маршруте:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">res.setHeader("Set-Cookie", `session=${sessionId}; Path=/;   Max-Age=600; SameSite=Strict; HttpOnly`);
</code></pre>
<!-- /wp:code -->

Это все, что вам нужно сделать, чтобы настроить сессионный файл cookie. Выбор строгой или мягкой политики зависит от того, насколько высоки ваши требования к безопасности и чем вы готовы пожертвовать в плане пользовательского опыта.

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="использование-csrf-токенов-1">Использование CSRF-токенов</h3>

Как уже упоминалось в разделах выше, существует пакет next-csrf, который позволяет легко реализовать следующие шаги для обеспечения защиты от CSRF-атак:

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Сервер генерирует и отправляет клиенту токен csrf</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Клиент/браузер отправляет форму с токеном</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Сервер проверяет, действителен ли токен или нет</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

Для успешного проведения атаки CSRF злоумышленнику необходимо получить маркер CSRF с вашего сайта и использовать JavaScript для доступа к нему. Это означает, что если на вашем сайте не разрешен кросс-оригинальный обмен ресурсами (CORS), злоумышленник не сможет получить доступ к маркеру CSRF, что эффективно нейтрализует угрозу.

Чтобы установить пакет next-csrf, выполните следующую команду в корне вашего проекта Next.js:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">npm i next-csrf --save</code></pre>
<!-- /wp:code -->

На первом этапе давайте инициализируем next-csrf, создав установочный файл. Это создаст промежуточное программное обеспечение для создания и проверки CSRF-токенов:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">// "lib/csrf"
import { nextCsrf } from "next-csrf";

const { csrf, setup } = nextCsrf({
 // eslint-disable-next-line no-undef
 secret: "12345",
});

export { csrf, setup };</code></pre>
<!-- /wp:code -->

В производственной среде вы, конечно же, будете хранить свой секрет в файле окружения.

Чтобы установить CSRF-токен, мы будем использовать страницу с рендерингом на стороне сервера, как наша страница входа в систему, потому что вы используете смягчение CSRF для защиты ваших запросов от аутентифицированных пользователей.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">import Head from "next/head";
import { setup } from "lib/csrf";

export default function Home() {
 return (
   ...
 );
}

export const getServerSideProps = setup(async ({ req, res }) =&gt; {
 return {
   props: {},
 };
});</code></pre>
<!-- /wp:code -->

После этого единственное, что нам нужно сделать для защиты маршрута API, — это обернуть соответствующий маршрут API нашим промежуточным программным обеспечением csrf:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">// src/pages/api/transfer.js
import { csrf } from "../../../lib/csrf";

const handler = (req, res) =&gt; {
   // Check that the request method is POST
   if (req.method !== 'POST') {
     res.status(405).json({ error: 'Method Not Allowed' });
     return;
   }
    // Check that the request has a valid session cookie
   if (!req.cookies.session) {
     res.status(401).json({ error: 'Unauthorized' });
     return;
   }
    // Parse the JSON data from the request body
   const { name, iban, amount } = req.body;
   console.log(name, iban, amount)
   console.log(req.cookies.session);
    // Return a success message
   res.status(200).json({ name, iban, amount });
 }

 export default csrf(handler);</code></pre>
<!-- /wp:code -->

Перед выполнением логики запроса промежуточное ПО csrf выполнит проверку CSRF-токенов и в случае неудачной проверки выдаст ошибку:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">{"message":"Invalid CSRF token"}</code></pre>
<!-- /wp:code -->

<h2 class="wp-block-heading" id="заключение">Заключение</h2>

В этой статье мы рассмотрели тему защиты вашего приложения Next.js от CSRF-атак и подробно рассмотрели пакет next-csrf, который позволяет реализовать защиту от CSRF с помощью CSRF-токенов. Кроме того, мы рассмотрели конфигурацию cookie-файлов и способы повышения безопасности путем установки определенных значений cookie-файлов.
