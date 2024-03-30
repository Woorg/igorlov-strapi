---
title: Понимание Cloudflare Workers в Rust
meta_title: Понимание Cloudflare Workers в Rust - Igor Gorlov
description: >-
  Cloudflare Workers – это бессерверная платформа, позволяющая разработчикам
  выполнять код JavaScript на граничной сети серверов Cloudflare. 
date: 2023-04-20T18:39:27.000Z
author: Igor Gorlov
image: ../../assets/images/undefined-Apr-20-2023.avif
categories:
  - Учебник
tags:
  - Rust
draft: false
lastmod: 2024-03-20T21:26:46.237Z
---

Cloudflare Workers - это бессерверная платформа, позволяющая разработчикам выполнять код JavaScript на граничной сети серверов Cloudflare. С помощью Workers программисты могут создавать и распространять проворные, управляемые событиями сценарии и приложения, которые могут реагировать на HTTP-запросы, запланированные события и другие триггеры. Workers можно использовать для изменения HTTP-запросов и ответов, маршрутизации трафика на различные серверы, аутентификации запросов, доставки статических файлов и многого другого.

Разработчики могут писать код Workers на JavaScript или TypeScript и использовать популярные фреймворки, такие как Node.js или React. Workers также можно написать на других языках, таких как Rust, Go и т.д., и преобразовать его в WebAssembly (Wasm).

В этой статье мы создадим бессерверный API с двумя конечными точками и развернем приложение на сервере Cloudflare.

<!-- wp:rank-math/toc-block {"title":"Оглавление","headings":[{"key":"8b73fdcb-29db-4113-a2d1-6d06dee9a32b","content":"Примеры приложений, созданных с помощью Cloudflare Workers","level":2,"link":"#примеры-приложений-созданных-с-помощью-cloudflare-workers","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"ae49659a-1523-4c32-8cac-580ae1bf3886","content":"Преимущества Cloudflare Workers","level":2,"link":"#преимущества-cloudflare-workers","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"c1f45daa-e6d9-4313-9a70-6cf7ab8679ab","content":" Низкая задержка","level":3,"link":"#низкая-задержка","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"1afd7b35-5b3c-4b94-8c61-33b9181dca2d","content":"Масштабируемость","level":3,"link":"#масштабируемость","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"3ca50f4b-071e-462b-a36c-7076ccc3c43c","content":"Экономически эффективный","level":3,"link":"#экономически-эффективный","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"3a61504f-2da6-4ffe-a50c-2cfab4203c4f","content":"Гибкость","level":3,"link":"#гибкость","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"7c580953-30e3-4a19-9916-fc7c37f1144c","content":"Безопасность","level":3,"link":"#безопасность","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"6f1f5354-24c7-4f48-ba7d-7d8fcb48111a","content":"Опыт разработчиков","level":3,"link":"#опыт-разработчиков","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"92aed77b-5242-4198-a7f5-395c045d0813","content":"Недостатки Cloudflare Workers","level":2,"link":"#недостатки-cloudflare-workers","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"05d820f5-0168-46b3-87a0-428d6bc0f646","content":" Ограниченная среда выполнения","level":3,"link":"#ограниченная-среда-выполнения","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"e872d43e-6566-4c94-a204-b1f51e1dc0d9","content":"Отсутствие постоянного хранилища","level":3,"link":"#отсутствие-постоянного-хранилища","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"b55dfb71-8184-46c8-8df1-f7abaccebb84","content":"Ограниченная отладка и тестирование","level":3,"link":"#ограниченная-отладка-и-тестирование","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"cdbbf5ef-efa2-4c0c-816d-d63d54b3a3ea","content":"Блокировка поставщика","level":3,"link":"#блокировка-поставщика","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"162da68c-8ff4-4250-9788-49973c38baa2","content":"Предварительные условия","level":2,"link":"#предварительные-условия","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"da84e4bf-bd9f-422f-8f8e-c237a273c6fa","content":"Настройка окружения нашего проекта","level":2,"link":"#настройка-окружения-нашего-проекта","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"ceb6445d-1faa-4910-8628-2bc37f6f85ba","content":"Создайте проект","level":3,"link":"#создайте-проект","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"e2ad1e19-a65c-43d3-ada7-a41e55389a38","content":"Построение бессерверного API","level":2,"link":"#построение-бессерверного-api","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"f1735681-d818-44a5-853c-facd801c507c","content":"Заключение","level":2,"link":"#заключение","disable":false,"isUpdated":false,"isGeneratedLink":true}],"listStyle":"ul"} -->
<div class="wp-block-rank-math-toc-block" id="rank-math-toc"><h2>Оглавление</h2><nav><ul><li class=""><a href="#примеры-приложений-созданных-с-помощью-cloudflare-workers">Примеры приложений, созданных с помощью Cloudflare Workers</a></li><li class=""><a href="#преимущества-cloudflare-workers">Преимущества Cloudflare Workers</a><ul><li class=""><a href="#низкая-задержка"> Низкая задержка</a></li><li class=""><a href="#масштабируемость">Масштабируемость</a></li><li class=""><a href="#экономически-эффективный">Экономически эффективный</a></li><li class=""><a href="#гибкость">Гибкость</a></li><li class=""><a href="#безопасность">Безопасность</a></li><li class=""><a href="#опыт-разработчиков">Опыт разработчиков</a></li></ul></li><li class=""><a href="#недостатки-cloudflare-workers">Недостатки Cloudflare Workers</a><ul><li class=""><a href="#ограниченная-среда-выполнения"> Ограниченная среда выполнения</a></li><li class=""><a href="#отсутствие-постоянного-хранилища">Отсутствие постоянного хранилища</a></li><li class=""><a href="#ограниченная-отладка-и-тестирование">Ограниченная отладка и тестирование</a></li><li class=""><a href="#блокировка-поставщика">Блокировка поставщика</a></li></ul></li><li class=""><a href="#предварительные-условия">Предварительные условия</a></li><li class=""><a href="#настройка-окружения-нашего-проекта">Настройка окружения нашего проекта</a><ul><li class=""><a href="#создайте-проект">Создайте проект</a></li></ul></li><li class=""><a href="#построение-бессерверного-api">Построение бессерверного API</a></li><li class=""><a href="#заключение">Заключение</a></li></ul></nav></div>
<!-- /wp:rank-math/toc-block -->

<h2 class="wp-block-heading" id="примеры-приложений-созданных-с-помощью-cloudflare-workers">Примеры приложений, созданных с помощью Cloudflare Workers</h2>

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Бессерверные API: Cloudflare Workers можно использовать для создания и развертывания бессерверных API, что дает множество преимуществ, включая масштабируемость, высокую доступность и низкую задержку API, которые могут быть интегрированы в другие сервисы.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Сокращение URL-адресов: Cloudflare Workers можно использовать для создания сервисов сокращения URL, которые предоставляют пользователям короткие и легко запоминающиеся URL, перенаправляющие на более длинные и сложные URL.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>A/B-тестирование: Cloudflare Workers позволяет создавать фреймворки для A/B-тестирования, которые позволяют разработчикам тестировать различные варианты веб-сайта или приложения и измерять производительность каждой версии.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Манипулирование изображениями: Cloudflare Workers могут работать с изображениями на месте, позволяя изменять размер, обрезать или наносить водяные знаки в режиме реального времени.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Хостинг статических сайтов: Cloudflare Workers может размещать статические веб-сайты, предоставляя разработчикам масштабируемую и надежную платформу для размещения их веб-приложений.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Обмен сообщениями в реальном времени:&nbsp;Cloudflare Workers позволяет создавать приложения для обмена сообщениями в реальном времени, использующие WebSockets для обеспечения связи между клиентами и серверами с низкой задержкой.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Балансировка нагрузки: Cloudflare Workers может балансировать нагрузку между несколькими серверами, гарантируя, что сайт будет оставаться онлайн и отзывчивым даже в периоды высокого трафика.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<h2 class="wp-block-heading" id="преимущества-cloudflare-workers">Преимущества Cloudflare Workers</h2>

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="низкая-задержка"><br>Низкая задержка</h3>

Тот факт, что Cloudflare Workers работают на границе сети, приближает их к пользователям и позволяет им обслуживать контент с меньшим временем задержки. Это приводит к улучшению пользовательского опыта, ускорению загрузки и повышению SEO-результатов.

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="масштабируемость">Масштабируемость</h3>

Разработчикам не нужно беспокоиться о создании и управлении серверами для обработки всплесков трафика, поскольку Cloudflare Workers может автоматически масштабироваться для обработки больших объемов трафика.

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="экономически-эффективный">Экономически эффективный</h3>

Разработчики могут начать использовать платформу без необходимости платить много денег, поскольку Cloudflare Workers предлагает щедрый бесплатный вариант. Она также предлагает доступные цены для приложений, которым требуется больше ресурсов.

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="гибкость">Гибкость</h3>

Будучи бессерверной платформой, Cloudflare Workers освобождает разработчиков от обязанности следить за сетями и серверами. Теперь разработчики могут сосредоточиться на создании приложений и функций, не отвлекаясь на административные хлопоты.

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="безопасность">Безопасность</h3>

Cloudflare Workers интегрируется с набором сервисов безопасности и производительности Cloudflare, что означает, что разработчики могут создавать безопасные и производительные приложения, не заботясь о внедрении функций безопасности самостоятельно.

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="опыт-разработчиков">Опыт разработчиков</h3>

Cloudflare Workers обеспечивают современный опыт разработчика, поддерживая популярные инструменты и фреймворки, такие как webpack, Rollup и Node.js. Это позволяет разработчикам легко начать работу с платформой и быстро создавать приложения.

<h2 class="wp-block-heading" id="недостатки-cloudflare-workers">Недостатки Cloudflare Workers</h2>

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="ограниченная-среда-выполнения"><br>Ограниченная среда выполнения</h3>

Из-за ограничений на конкретную среду выполнения и парадигму программирования Cloudflare Workers можно использовать только для ограниченного круга приложений. Например, Cloudflare Workers построены на JavaScript и нуждаются в определенном наборе библиотек и API, которые могут не подходить для всех случаев использования.

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="отсутствие-постоянного-хранилища">Отсутствие постоянного хранилища</h3>

Отсутствие постоянного хранилища, предлагаемого Cloudflare Workers, может затруднить разработку приложений, требующих длительного хранения данных или сложного манипулирования данными.

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="ограниченная-отладка-и-тестирование">Ограниченная отладка и тестирование</h3>

Cloudflare Workers не предоставляет надежных инструментов отладки и тестирования, что может затруднить диагностику и устранение ошибок в производстве.

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="блокировка-поставщика">Блокировка поставщика</h3>

Cloudflare Workers является проприетарной платформой, что означает, что разработчики, создающие приложения на этой платформе, могут быть заблокированы в использовании сервисов Cloudflare, которые они не собирались использовать.

Cloudflare Workers - относительно новая платформа, и поэтому сообщество разработчиков, которые могут предоставить поддержку или руководство для разработчиков-новичков, может быть ограниченным.

<h2 class="wp-block-heading" id="предварительные-условия">Предварительные условия</h2>

Чтобы следовать этому руководству, вам понадобится следующее:

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Базовые знания Rust</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>установленный Rust</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Учетная запись пользователя Cloudflare</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>IDE или редактор кода, например, Vscode.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<h2 class="wp-block-heading" id="настройка-окружения-нашего-проекта">Настройка окружения нашего проекта</h2>

Чтобы упростить работу с Cloudflare Workers, мы создадим бессерверный API с несколькими конечными точками, а затем развернем его на Cloudflare.

Для начала нам нужно установить CLI-инструмент через Rust Cargo под названием Wrangler, который упрощает сборку и развертывание. Он предназначен для облегчения процесса разработки:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">&gt; cargo install wrangler</code></pre>
<!-- /wp:code -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="создайте-проект">Создайте проект</h3>

Для этого руководства вы можете либо клонировать пример проекта, либо создать его с нуля, на чем мы и сосредоточимся в этом руководстве.

Мы будем использовать Cargo для создания простого проекта Rust, чтобы мы могли написать наш код с нуля:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="rust" class="language-rust">&gt; cargo new --lib worker-app


[package]
name = "worker-app"
version = "0.1.0"
edition = "2021"

[lib]
crate-type = ["cdylib", "rlib"]
[features]
default = ["console_error_panic_hook"]
[dependencies]
worker = "0.0.11"

[profile.release]
# Tell `rustc` to optimize for small code size.
opt-level = "s"</code></pre>
<!-- /wp:code -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>[package]: В этом разделе определяются метаданные о пакете, такие как его имя, версия и редакция. В поле name указывается имя пакета, version - номер версии, а edition - используемая редакция Rust. В данном случае установлено значение "2021".</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>[lib]: Этот раздел определяет опции для сборки библиотечного крейта. Поле crate-type задает типы выходных файлов для генерации, которые в данном случае являются библиотекой разделяемых объектов (cdylib) и статической библиотекой (rlib).</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>[features]: Этот раздел определяет дополнительные функции, которые могут быть включены или отключены для crate. В данном случае функция по умолчанию включена, что включает функцию console_error_panic_hook. Эта функция позволяет выводить панические сообщения в консоль браузера при сбое рабочего процесса.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>[зависимости]: В этом разделе перечислены зависимости, необходимые для работы крейта. В данном случае единственной зависимостью является крейт worker, версия 0.0.11.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>[profile.release]: Этот раздел определяет опции для сборки крейта в режиме релиза. Поле opt-level указывает rustc оптимизировать код для малого размера (s). Это позволяет получить меньший выходной двоичный файл ценой увеличения времени компиляции</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

Добавьте файл конфигурации Wrangler в наш проект, создав файл wrangler.toml и добавив следующие команды. Эти команды обрабатывают наши сборки, которые также помогают запустить наше приложение:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="rust" class="language-rust">name = ""
main = "build/worker/shim.mjs"
compatibility_date = "2022-01-20"
[vars]
WORKERS_RS_VERSION = "0.0.11"
[build]
command = "cargo install --git https://github.com/CathalMullan/workers-rs worker-build &amp;&amp; worker-build --release"</code></pre>
<!-- /wp:code -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>name = "": Эта строка определяет имя рабочего. В данном случае она оставлена пустой, поэтому рабочему будет присвоено имя по умолчанию</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>main = "build/worker/shim.mjs": Эта строка определяет путь к JavaScript shim-файлу, который будет использоваться для взаимодействия с кодом Rust. Файл shim отвечает за создание модуля WebAssembly и раскрытие его функций для среды JavaScript</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>compatibility_date = "2022-01-20": В этой строке указывается дата, с которой совместим рабочий. Это гарантирует, что рабочий будет развернут только в тех центрах обработки данных, которые были обновлены необходимыми зависимостями до этой даты.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>[vars]: Этот раздел определяет переменную WORKERS_RS_VERSION и присваивает ей значение "0.0.11". Эта переменная определяет версию библиотеки workers-rs, которая будет использоваться для сборки рабочего.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>[build]: Этот раздел содержит команду для сборки рабочего с помощью cargo, менеджера пакетов Rust. Команда устанавливает пакет worker-build из репозитория CathalMullan/workers-rs на GitHub, а затем запускает команду worker-build в режиме release. Это скомпилирует код Rust в модуль WebAssembly, который может быть загружен JavaScript shim</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<h2 class="wp-block-heading" id="построение-бессерверного-api">Построение бессерверного API</h2>

Чтобы продолжить, нам нужно отредактировать файл lib.rs и написать приведенный ниже код, который представляет собой маршрут бессерверного HTTP API, использующий worker::\*:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="rust" class="language-rust">use worker::*;

#[event(fetch)]
pub async fn main(req: Request, env: Env, _ctx: worker::Context) -&gt; Result&lt;Response&gt; {
 let r = Router::new();
 r.get("http://blog.logrocket.com/", |_, _| Response::ok("Hello from Logrocket Workers!"))
 .run(req, env).await
</code></pre>
<!-- /wp:code -->

Конечные точки объявляются внутри функции main, которая включает макрос #[event(fetch)], указывающий на API времени выполнения Cloudflare.

Чтобы запустить наше приложение, мы воспользуемся следующей командой. Если вы столкнулись с ошибкой, обновите Rust:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">&gt; wrangler dev
</code></pre>
<!-- /wp:code -->

<!-- wp:image {"align":"center","id":168022} -->
<figure class="wp-block-image aligncenter"><img src="http://blog.logrocket.com/wp-content/uploads/2023/04/running-rust-app.png?is-pending-load=1" alt="Running Rust App" class="wp-image-168022"/></figure>
<!-- /wp:image -->

<!-- wp:image {"align":"center","id":168023} -->
<figure class="wp-block-image aligncenter"><img src="http://blog.logrocket.com/wp-content/uploads/2023/04/rust-app-preview.png?is-pending-load=1" alt="Rust App Preview" class="wp-image-168023"/></figure>
<!-- /wp:image -->

В процессе запуска нашего приложения Wrangler добавляет в наш проект папку build, которая содержит рабочий каталог, index.wasm , shim.mjs и index.js:

Именно файл index.js содержит код JavaScript, реализующий

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">import * as wasm from "./index_bg.wasm";
import { __wbg_set_wasm } from "./index_bg.js";
__wbg_set_wasm(wasm);
export * from "./index_bg.js";
</code></pre>
<!-- /wp:code -->

Давайте добавим больше конечных точек в приложение. Это запрос get, который принимает параметр запроса id и возвращает ответ в формате JSON:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">.get_async("/json/:id", |_, ctx| async move {
            if let Some(id) = ctx.param("id") {
                match id.parse::&lt;u32&gt;() {
                    Ok(id) =&gt; {
                        let json = json!({
                            "id": id,
                            "message": "Hello from Logrocket Workers!",
                            "timestamp": Date::now().to_string(),
                        });
                        return Response::from_json(&amp;json);
                    }
                    Err(_) =&gt; return Response::error("Bad Request", 400),
                }
        };
</code></pre>
<!-- /wp:code -->

Чтобы развернуть наше приложение на Cloudflare, нам необходимо пройти аутентификацию, которая позволит легко развертывать и обновлять наше приложение в продакшене:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">wrangler login
</code></pre>
<!-- /wp:code -->

Команда ниже позволяет нам развернуть наше приложение на Cloudflare. имя будет использоваться в качестве поддомена для приложения:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">wrangler publish --name logrocket
</code></pre>
<!-- /wp:code -->

Вот предварительный вид команды:

Viola 🎉 Ура наше приложение в производстве:

<!-- wp:image {"align":"center","id":168025} -->
<figure class="wp-block-image aligncenter"><img src="http://blog.logrocket.com/wp-content/uploads/2023/04/deploying-app-cloudflare.png?is-pending-load=1" alt="Deploying Our App To Cloudflare" class="wp-image-168025"/></figure>
<!-- /wp:image -->

<!-- wp:image {"align":"center","id":168026} -->
<figure class="wp-block-image aligncenter"><img src="http://blog.logrocket.com/wp-content/uploads/2023/04/rust-app-demo.gif?is-pending-load=1" alt="Rust App Demo" class="wp-image-168026"/></figure>
<!-- /wp:image -->

<h2 class="wp-block-heading" id="заключение">Заключение</h2>

В этом руководстве мы представили Cloudflare Workers в Rust, включая их плюсы и минусы. Затем мы создали бессерверный API и развернули демо-приложение на сервере Cloudlfare.
