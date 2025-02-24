---
title: Создайте свой собственный HTTP-сервер на языке ruby
meta_title: >-
  Создайте свой собственный HTTP-сервер на языке ruby | Игорь Горлов -
  Фронтeндер
description: >-
  Фундаментальные вещи слишком часто упускаются из виду в нашей программной
  инженерии. Я имею в виду, что я знаю мало людей, которые хотят погрузиться в
  протокол
date: 2023-12-18T00:00:00.000Z
categories:
  - Как закодить
author: Игорь Горлов
type: blog
draft: false
slug: sozdaite-svoi-sobstvenn-i-http-server-na-yaz-ke-ruby
tags:
  - Ruby
image: >-
  ../../assets/images/sozdaite-svoi-sobstvenn-i-http-server-na-yaz-ke-ruby-Dec-18-2023.avif
lastmod: 2024-03-20T21:26:45.405Z
---

Фундаментальные вещи слишком часто упускаются из виду в нашей программной инженерии. Я имею в виду, что я знаю мало людей, которые хотят погрузиться в протоколы и то, как работают серверы. В то время как я считаю, что это ключевые и захватывающие знания о том, как все работает.

В этой статье мы рассмотрим, как создать собственный HTTP-сервер на Ruby.

## HTTP

Мы не собираемся глубоко погружаться в каждый уголок протокола. Но, по крайней мере, определение очень важно: HTTP - это протокол прикладного уровня, основанный на TCP.

В этой статье мы сосредоточимся на HTTP 1.1.

## От TCP-сервера

Это глупо, но в чем заключается роль сервера? Получать запросы от клиентов и давать им соответствующий ответ. HTTP-сообщения имеют определенную структуру. В запросе есть глагол, путь, к которому они хотят получить доступ, и, наконец, версия протокола.

Итак, первым делом нашему серверу нужно будет принять соединение, как мы уже говорили, HTTP основан на TCP. Поэтому нам нужно будет открыть TCP-сокет на нашей машине.

В Ruby все не так просто, мы можем использовать библиотеку сокетов. А поскольку Ruby любит ООП, мы обернем все в класс.

`# http_server.rb require 'socket' class HttpServer def initialize(port) @server = TCPServer.new port end end`.

Затем нам нужно будет принять соединение, как мы уже говорили, и держать его открытым для любого клиента В нашем классе HttpServer определим метод accept_connection.

`def accept_connection while session = @server.accept end end`.

## К HTTP-серверу

Теперь, когда мы принимаем соединение по TCP, мы можем проанализировать полученное сообщение. Во-первых, мы видим, что полученное сообщение - это HTTP-запрос.

И это гораздо проще, чем мы думаем. Сокеты - это потоки данных, которые вы можете записывать и читать из них по мере поступления данных.

Поэтому мы собираемся читать из нашего потока с помощью функции gets.

Затем нам нужно будет сделать кое-что действительно важное для всех HTTP-серверов: разобрать HTTP-запрос, чтобы знать, что ответить клиенту.

`def accept_connection while session = @server.accept request = session.gets verb,path,protocol = request.split(' ') if protocol === 'HTTP/1.1' session.print response_hello_world else session.print 'Connection Refuse' end end end`.

Для ответа мы можем определить что-то вроде этого:

`def response_hello_world <<-HTTPRESPONSE HTTP/1.1 200 Content-Type: text/html Hello World HTTPRESPONSE end`.

Давайте создадим HTTP-клиент, чтобы посмотреть, как ведет себя наш сервер.

## HTTP-клиент

Как вы можете себе представить, нам снова понадобится TCP-сокет. Мы должны подключиться к уже открытому TCP-сокету нашего веб-сервера, а затем отправить HTTP-запрос.

`# tcp_client.rb require 'socket' server = TCPSocket.new 'localhost', 5678 request = <<-HTTPMSQ GET /test HTTP/1.1 HTTPMSQ server.puts request while line = server.gets puts line end server.close`.

Здесь мы поместили правильный HTTP-запрос с методом, заголовком и протоколом. Но если бы мы этого не сделали, то, как мы видели ранее, мы бы получили `отказ в подключении`, как определено в `accept_connection`.

## Маршрутизация и контроллеры

Итак, все, что мы сделали, было довольно просто, мы добавили только один путь и случай. Теперь что произойдет, если мы захотим выбрать другой путь?

Мы можем определить класс route, который позаботится о чтении пути и маршрутизации к нужным ресурсам.

`class Router def initialize(path) @path = path end def route if path === '/test' "hello tester" elsif path === '/world' "hello world" end end end`.

Затем мы можем определить конструктор для HTTP-ответа:

`class HttpResponse def self.build(response) <<-HTTPRESPONSE HTTP/1.1 200 Content-Type: text/html #{response} HTTPRESPONSE end end`.

Давайте немного изменим наш метод `accept_connection`:

`def accept_connection while session = @server.accept request = session.gets verb,path,protocol = request.split(' ') if protocol === "HTTP/1.1" response = Router.new(path).route http_response = HttpResponse.build(response) session.print http_response else session.print 'Connection Refuse' end session.close end`.

Но мы можем сделать и что-то более сложное, как в Rails с ActiveController и ActionPack.

## Еще дальше

Это немного, но мы можем сделать даже что-то более сложное с CRUD-маршрутами и контроллерами. Это вдохновлено этой статьей: https://tommaso.pavese.me/2016/07/26/a-rack-application-from-scratch-part-2-routes-and-controllers/ и как ActionPack и ActionController работают в Rails.

`class TestController def index "Hello Test" end end class Router def initialize(path) @path = path end def camelize(string) string = string.sub(/^[a-z\d]*/) { |match| match.capitalize! || match } string.gsub!(/(_)([a-z\d]*)/i) do word = $2 substituted = word.capitalize! || слово подставленная строка end def constantize(camel_cased_word) Object.const_get(camel_cased_word) end def route controller_name = camelize(@path.split("https://dev.to/")[1]) << "Контроллер" controller = constantize(controller_name) controller.new.send('index') end end`

## Заключение

Это очень круто - прогуляться по основам Web и понять, что происходит на самом деле. Но ведь есть еще столько всего, что можно понять только с помощью. Например, заголовки или Cookies.

Но, по крайней мере, теперь мы знаем, как веб-сервер может обслуживать ответ от нашего веб-приложения. Конечно, это упрощенная версия, и в ней не хватает многих вещей.

Мы также не использовали Rack для взаимодействия нашего веб-приложения и веб-серверов. Но я хотел сделать ее как можно более простой, чтобы понять суть веб-серверов.
