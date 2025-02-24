---
title: Бот для краткого изложения разговоров в Telegram с ChatGPT и Flask (Quart)
meta_title: >-
  Бот для краткого изложения разговоров в Telegram с ChatGPT и Flask (Quart) -
  Igor Gorlov
description: >-
  Сейчас все говорят о ChatGPT. Исключительно умный ИИ продолжает поражать
  интернет даже спустя пару месяцев после своего выхода. Наличие ChatGPT на
  сайте - это здорово, но настоящее веселье начинается, когда вы получаете
  доступ к API. Это дает вам прекрасную возможность интегрировать
  интеллектуальный ИИ в свои проекты и приложения, чтобы сделать их более
  мощными и внедрить удивительные функции.
date: 2023-04-23T08:24:48.000Z
author: Igor Gorlov
image: ../../assets/images/undefined-Apr-23-2023.avif
categories:
  - Учебник
tags:
  - Flask
  - Python
draft: false
lastmod: 2024-03-20T21:26:48.719Z
---

Сейчас все говорят о ChatGPT. Исключительно умный ИИ продолжает поражать интернет даже спустя пару месяцев после своего выхода. Наличие ChatGPT на сайте - это здорово, но настоящее веселье начинается, когда вы получаете доступ к API. Это дает вам прекрасную возможность интегрировать интеллектуальный ИИ в свои проекты и приложения, чтобы сделать их более мощными и внедрить удивительные функции.

В этой статье мы расскажем вам о том, как создать собственного Telegram-бота и интегрировать с ним ChatGPT, используя библиотеку OpenAI для Python. Это может показаться простейшей задачей, но давайте немного оживим ее, введя команду summarize, которая позволит вам получить сводку нескольких сообщений в чате.

В этом посте предполагается, что у вас есть базовые знания Python. Однако я рекомендую ознакомиться с треками Hyperskill по Python и Flask, чтобы узнать больше о Python и разработке веб-приложений с помощью Flask.

<!-- wp:rank-math/toc-block {"title":"Оглавление","headings":[{"key":"e77e8f79-e401-46f6-81e4-c0ecdd4946bf","content":"Настройка всего","level":2,"link":"#настройка-всего","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"e66651b0-5cba-4129-b66d-17fb7b98916f","content":"Написание скелета","level":2,"link":"#написание-скелета","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"b135e493-c673-4159-b2e1-3270711285f3","content":"Добавление мозга","level":2,"link":"#добавление-мозга","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"eeb3df44-811d-4803-b9f9-7c776f157748","content":"Подведите итог!","level":2,"link":"#подведите-итог","disable":false,"isUpdated":false,"isGeneratedLink":true}],"listStyle":"ul"} -->
<div class="wp-block-rank-math-toc-block" id="rank-math-toc"><h2>Оглавление</h2><nav><ul><li class=""><a href="#настройка-всего">Настройка всего</a></li><li class=""><a href="#написание-скелета">Написание скелета</a></li><li class=""><a href="#добавление-мозга">Добавление мозга</a></li><li class=""><a href="#подведите-итог">Подведите итог!</a></li></ul></nav></div>
<!-- /wp:rank-math/toc-block -->

<h2 class="wp-block-heading" id="настройка-всего">Настройка всего</h2>

Прежде чем приступить к работе над кодом, вам нужно будет выполнить некоторые подготовительные действия, чтобы получить все необходимые доступы.

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Зарегистрируйте своего бота в Telegram и получите токен доступа Telegram (используя @botfather в Telegram).</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Получите доступ к Telegram Core API и получите api_hash и app_id.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Зарегистрируйтесь в OpenAI и получите токен доступа к API.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

Сохраните эти секретные строки и охраняйте их своей жизнью. Никто посторонний не должен получить к ним доступ: это может привести к нарушению безопасности.

<h2 class="wp-block-heading" id="написание-скелета">Написание скелета</h2>

Примечание: полный финальный код проекта (разбитый на этапы с коммитами) доступен на моем GitHub, за подробностями обращайтесь сюда: https://github.com/yellalena/telegram-gpt-summarizer.

Библиотеки Python, которые необходимо установить для этого шага: flask, pydantic, requests и pyngrok.

Давайте начнем с написания кода для самого базового бота Telegram. Он должен получать сообщения из чата и уметь отвечать на них.&nbsp;Первым делом создайте каталог для вашего проекта и инициализируйте виртуальную среду Python. Кстати, если вы используете PyCharm, он создаст виртуальную среду за вас.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--FlAbnDWt--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/fkl10ma3mai74jcl3v2c.png" alt="Скриншот PyCharm"/></figure>
<!-- /wp:image -->

На данном этапе цель разделена на четыре части:

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Создать простое приложение Flask с одним корневым маршрутом для обработки webhook с сообщениями Telegram.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Создать класс для бота Telegram и сделать его способным отправлять сообщения в чат.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Сделайте приложение видимым для большого интернета.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Зарегистрируйте адрес приложения в Telegram.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

Вот как выглядит main.py на этом этапе:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">app = Flask(__name__)

@app.route("https://dev.to/", methods=["GET", "POST"])
def handle_webhook():
    update = Update(**request.json)
    chat_id = update.message.chat.id

    response = f"This is a response for message: {update.message.text}"
    app.bot.send_message(chat_id, response)

    return "OK", 200

def run_ngrok(port=8000):
    http_tunnel = ngrok.connect(port)
    return http_tunnel.public_url

def main():
    app.bot = TelegramBot(Config.TELEGRAM_TOKEN)
    host = run_ngrok(Config.PORT)
    app.bot.set_webhook(host)
    app.run(port=Config.PORT, debug=True, use_reloader=False)

if __name__ == "__main__":
    main()
</code></pre>
<!-- /wp:code -->

Несколько моментов требуют разъяснения:

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Я люблю складывать все конфигурационные вещи в одном месте, поэтому я создал файл config.py, который будет собирать и хранить наши токены и другую полезную информацию из экспортируемых переменных окружения.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Telegram отправляет обновления в виде вложенного JSON, поэтому давайте создадим набор pydantic-моделей для разбора входных данных, чтобы потом было удобнее.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Чтобы вывести приложение в веб, я использую ngrok. Он делает определенный порт вашего локального хоста видимым для всех остальных, предоставляя ему временный публичный адрес. Вот почему важно убедиться, что вы открываете тот же порт, на котором запущено ваше приложение Flask.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Наконец, я инициализирую бота и устанавливаю webhook на публичный URL ngrok, чтобы бот знал, что он должен обращаться к этому URL всякий раз, когда получает какое-либо сообщение.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

Чтобы установить webhook, вам нужно отправить запрос на адрес API telegram бота, созданный с использованием полученного секретного токена. Код бота telegram выглядит следующим образом:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">import requests
from config import Config

class TelegramBot:
    def __init__(self, token):
        self.token = token
        self.bot_api_url = f"{Config.TELEGRAM_API}/bot{self.token}"

    def set_webhook(self, host):
        host = host.replace("http", "https")
        set_webhook_url = f"{self.bot_api_url}/setWebhook?url={host}"
        response = requests.get(set_webhook_url)
        response.raise_for_status()

    def send_message(self, chat_id, message):
        send_message_url = f"{self.bot_api_url}/sendMessage"
        response = requests.post(send_message_url, json={"chat_id": chat_id,
                                                          "text": message})
        response.raise_for_status()
</code></pre>
<!-- /wp:code -->

Теперь, когда все готово (не забудьте, что я опустил часть основного кода, вы можете найти его в репозитории), экспортируйте токен вашего бота в переменную окружения и нажмите кнопку “Run”!

<img width="752" height="1104" src="https://res.cloudinary.com/practicaldev/image/fetch/s--8tQb2A7B--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/hpftf0yg66jum85bxdl9.png" alt="Telegram chat screenshot">Ура! Он жив!

<h2 class="wp-block-heading" id="добавление-мозга">Добавление мозга</h2>

Удивительно, но следующим шагом теперь должно стать добавление щепотки интеллекта нашему умному боту. Установите официальную либу OpenAI для Python с помощью pip: pip install openai.После этого мы сможем создать класс-помощник для общения с ИИ.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">import openai

class OpenAiHelper:
    def __init__(self, token, model="gpt-3.5-turbo"):
        openai.api_key = token
        self.model = model

    def get_response(self, message_text):
        response = openai.ChatCompletion.create(model=self.model,
                                                messages=[{"role": "user", "content": message_text}])
        return response.choices[0].message.content
</code></pre>
<!-- /wp:code -->

API предлагает множество моделей, которые можно использовать для вашего проекта. Самыми популярными, конечно, являются GPT. В последнее время больше всего шума наделал GPT-4, но (и из-за этого) доступ к нему сейчас ограничен, поэтому для удобства тестирования я выбрал GPT-3. Ничего страшного, вы всегда можете выбрать тот, который вам больше нравится, просто измените имя строки, которое вы передаете помощнику.

Не забудьте добавить свойство OPENAI_TOKEN в конфиг и давайте используем хелпер в коде.

Сначала, конечно, инстанцируем его в методе main():

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--mJGGiDE2--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/p1f3de8zn1abu4lc36g6.png" alt="Инициализация помощника OpenAI в main"/></figure>
<!-- /wp:image -->

А затем вызовите его из функции представления, вот так:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">response = app.openai_helper.get_response(update.message.text)
</code></pre>
<!-- /wp:code -->

Ух! Волшебство свершилось!

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--cLQokZ0Z--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/f32ivkvhncjpb0tkfs1n.png" alt="Скриншот чата Telegram с ответом OpenAI"/></figure>
<!-- /wp:image -->

<h2 class="wp-block-heading" id="подведите-итог">Подведите итог!</h2>

Библиотеки Python, которые необходимо установить для этого шага: quart, telethon.

Наверняка у вас такое бывало - вас добавили в чат с группой друзей, которые любят обсуждать интересные вещи или делиться какими-то новостями или идеями. У вас было много дел, и вы пропустили все веселье в чате. Следующее, что вы видите - сотню непрочитанных сообщений. Разве не было бы здорово, если бы кто-то мог дать вам краткий обзор того, что там произошло, вместо того, чтобы читать все это? Ну, GPT, конечно, может это сделать. Нужно только попросить его об этом.

Вот тут-то и начинается самое интересное. По какой-то причине API ботов Telegram не позволяет ботам читать историю разговоров. У нас есть веб-крючки и явный метод GetUpdates(), но они работают, только если кто-то упомянул бота. Другой вариант - сделать так, чтобы бот получал все обновления, если он добавлен как администратор, но у этого подхода тоже есть несколько минусов. Во-первых, вам придется создать целое хранилище для сообщений. Во-вторых, что если вы хотите подытожить разговор, который шел до того, как бот был добавлен в чат? Не наш случай.

Очевидно, это не повод опускать руки. Telegram предоставляет Core API, и он может помочь с извлечением истории чата. Единственное, что он асинхронный. И самая популярная библиотека Python для него, Telethon, тоже асинхронная. А Flask - синхронная. О-о-о.

И вот тут-то на сцену выходит загадочный Quart, упомянутый в заголовке. Quart - это API Flask, реализованный с использованием асинхронности, ожидания и веб-сервера ASGI (а не синхронности и WSGI). Его главное преимущество в нашем случае заключается в том, что синтаксис в основном тот же. Давайте проведем быструю реорганизацию кода.

Изменения просты. Во-первых, настройте импорт и замените каждую колбу на кварту:<img width="758" height="112" src="https://res.cloudinary.com/practicaldev/image/fetch/s--g2O0iASr--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/w7r5vc1ckx1fj4qqpqcj.png" alt="Image description">

Затем сделайте все методы веб-приложения асинхронными. И ожидайте все свойства и методы, которые теперь стали асинхронными:<img width="800" height="222" src="https://res.cloudinary.com/practicaldev/image/fetch/s--Ph4MPLwp--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/q6lb038yazuqd32llzuc.png" alt="Image description">

Если вы не уверены в том, что такое async Python, я советую вам ознакомиться с этой частью документации Telethon по основам asyncio.

Я также переместил ngrok и TelegramBot, чтобы запустить их в отдельном методе, украшенном @app.before_serving. Это встроенный в Quart декоратор, который гарантирует, что все внутри этого метода будет запущено до того, как веб-приложение будет запущено и будет обслуживаться. Он необходим для того, чтобы бот и помощник инициализировались в том же цикле событий, что и основное приложение.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">@app.before_serving
async def startup():
    host = run_ngrok(Config.PORT)
    app.bot = TelegramBot(Config.TELEGRAM_TOKEN)
    app.bot.set_webhook(host)
    app.openai_helper = OpenAiHelper(Config.OPENAI_TOKEN)
</code></pre>
<!-- /wp:code -->

Запуск приложения тоже немного изменился, но не сильно. Hypercorn - это ASGI-сервер, используемый для асинхронного запуска Quart, и если мы хотим указать порт приложения, нам нужно сделать это в конфиге. Обратите внимание, что main() теперь тоже асинхронный и выполняется с помощью asyncio:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">async def main():
    quart_cfg = hypercorn.Config()
    quart_cfg.bind = [f"127.0.0.1:{Config.PORT}"]
    await hypercorn.asyncio.serve(app, quart_cfg)

if __name__ == "__main__":
    asyncio.run(main())
</code></pre>
<!-- /wp:code -->

Вот и все. Давайте проверим, прошли ли изменения гладко для нашего бота. Запуск, текст, ввод:<img width="758" height="264" src="https://res.cloudinary.com/practicaldev/image/fetch/s--F6hWyDFy--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/inid8ehg07sfi7adjf7r.png" alt="Image description">

Он говорит. Отлично. Теперь получим историю чата, чтобы ИИ подвел итог. Воспользуемся Core API Telegram с помощью либы Telethon. Там нам понадобятся две последние секретные строки, которые у вас есть - экспортируйте их как переменные окружения.

TelegramBot имеет небольшие изменения в методе **init**: он должен иметь новое свойство core_api_client, которое инициализирует клиент Telethon, и, конечно, вам нужно передать секреты Core API в качестве аргументов.

<img width="800" height="295" src="https://res.cloudinary.com/practicaldev/image/fetch/s--F5rH6NpK--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/hp9z3k1nooimp6i5smfm.png" alt="Image description">

И этот крошечный метод будет отвечать за извлечение истории:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">async def get_chat_history(self, chat_id, limit=30):
        if not self.core_api_client:
            return []
        history = await self.core_api_client.get_messages(chat_id, limit)
        result = [f"{message.sender.first_name} {message.sender.last_name}: {message.message} \n"
                  for message in history if not message.action]
        result.reverse()
        return '\n'.join(result)
</code></pre>
<!-- /wp:code -->

У функции get_messages в Telethon есть еще много различных параметров, которые можно передавать помимо параметров ограничения. Например, он может отменить историю или ограничить ее по дате, а не по количеству сообщений. С этим интересно играть, и вы можете настроить своего бота так, как вам захочется.

Ну, мы почти закончили. Осталось добавить опцию подведения итогов в обработчик webhook. Вот как выглядит получение ответа:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python"># process "summarize" command
    if update.message.text.startswith("/summarize"):
        history = await app.bot.get_chat_history(chat_id)
        response = app.openai_helper.get_response("Please, briefly summarize the following conversation history:\n" +\
                                                  history)
    else:
        response = app.openai_helper.get_response(update.message.text)

    app.bot.send_message(chat_id, response)
</code></pre>
<!-- /wp:code -->

Давайте посмотрим, как он расцветает!

После того как вы запустите приложение в первый раз, оно попросит вас войти в Telegram. Это нормально: это необходимо для получения доступа к истории сообщений и другим приватным данным, которые может предложить нам Core API. Введите тот же номер телефона, который вы использовали для получения доступа к Telegram Core API. Вы получите проверочный код внутри приложения, после чего все будет готово.

<img width="800" height="98" src="https://res.cloudinary.com/practicaldev/image/fetch/s--E7OlWnhO--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/jctn0wyfbrwmlnlddy9m.png" alt="Image description">

Добавьте бота в разговор с друзьями и попросите подвести итоги:

<img width="800" height="846" src="https://res.cloudinary.com/practicaldev/image/fetch/s--3h6zIt3t--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/208g8h5fqyd5k2bmajnd.png" alt="Image description">

Вот и все! Вы можете продолжить бесконечный список вещей: добавить обработку других типов сообщений, кроме текстовых, настроить количество сообщений для суммирования из чата и т.д. Дерзайте и не забудьте выложить свой код на GitHub. Счастливого кодинга!&nbsp;:)

Не забудьте зайти на сайт Hyperskill, чтобы продолжить изучение разработки веб-приложений с помощью Python и Flask. Вот ссылки на некоторые темы, которые могут пригодиться вам именно для этого проекта:

Обработчики ошибок: Если вы не обработаете ошибки должным образом, велика вероятность того, что ваше приложение не будет работать во время выполнения или покажет пользователю некрасивые трассировки. Чтобы избежать этого, прочитайте о типах ошибок и о том, как их лучше всего обрабатывать в приложении Flask.

Логирование: Это одна из самых важных вещей, когда речь идет о тестировании и отладке вашего приложения. Составление содержательных и читабельных журналов - обязательное условие для разработчика программного обеспечения. Ознакомьтесь с этой темой, чтобы узнать, как выполнять логирование в Python.

Знакомство с SQLAlchemy: Когда вы решите, что хотите хранить некоторые данные приложения, будь то информация о пользователе или история разговоров, вам нужно будет связаться с базой данных. Эта тема познакомит вас с основами SQLAlchemy, которая делает работу с базами данных простой и удобной.

Hyperskill - это платформа обучения на основе проектов, которая предлагает персонализированную учебную программу и разнообразные направления, чтобы помочь людям с разным уровнем подготовки получить актуальные для рынка навыки через онлайн-образование. Она не только дает вам прочные теоретические знания, но и позволяет сразу же отработать навыки на практике - а практика делает обучение идеальным.

Вы нашли этот пост полезным? Нажимайте на кнопку и следуйте за Hyperskill и мной, чтобы прочитать больше о них позже :)
