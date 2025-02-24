---
title: Виджет чата с помощью Persist в Livewire 3
meta_title: |
  Виджет Чата С Помощью Persist В Livewire 3 - Фул Фронт Дев
description: >
  Мы собираемся создать новое приложение, добавить Livewire 3 и показать, как
  сохранить виджет чата при перемещении по приложению.
date: 2023-10-26T00:55:27.366Z
image: >-
  ../../assets/images/vidzhet-chata-s-pomoshьyu-persist-v-livewire-3-Oct-26-2023.avif
categories:
  - Как закодить
author: Igor Gorlov
tags:
  - Laravel
  - Persist
draft: false
keywords:
  - Persist В Livewire 3
type: blog
slug: vidzhet-chata-s-pomoshьyu-persist-v-livewire-3
lastmod: 2024-03-20T21:26:45.235Z
---

Мы собираемся создать новое приложение, добавить Livewire 3 и показать, как сохранить виджет чата при перемещении по приложению.

Вот [GitHub-репозиторий](https://github.com/fideloper/livewire3-persist) с окончательным кодом.

```bash
composer create-project laravel/laravel livewire3-persist
cd livewire3-persist

composer require livewire/livewire:^3.0@beta calebporzio/sushi

```

✨ Нам больше не нужно обновлять наш файл макета, чтобы включить Livewire JS и стили - это будет происходить автоматически (если не настроено иначе). Однако обратите внимание, что это происходит автоматически только на страницах, на которых происходят определенные события Livewire, такие как использование компонента или наличие новой опции @persist.

Мы создадим быстрый макет в файле resources/views/components/layout.blade.php:

```html
<!doctype html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>My Video Collection</title>
		<script src="https://cdn.tailwindcss.com?plugins=typography"></script>
	</head>
	<body class="bg-gray-50 min-h-screen font-sans text-black antialiased">
		{{ $slot }}
	</body>
</html>
```

Затем мы можем создать ”главную" страницу в файле resources/views/home.blade.php, компонент списка видео в файле resources/views/components/videos.blade.php и затем страницу для одного видео в файле resources/views/video.blade.php.

На данный момент это все обычный Laravel, без использования Livewire!

![](https://fly.io/laravel-bytes/chat-widget-with-livewire-s-persist/../../assets/livewire3-persist-img1.webp)

## Чат-виджет

Давайте создадим компонент Livewire - это будет чат-виджет. Нашей целью является сохранение этого чат-виджета на протяжении всего сайта, чтобы не терять состояние при навигации по сайту.

```php
php artisan livewire:make Chat

```

Это создает файлы app/Livewire/Chat.php и resources/views/livewire/chat.blade.php.

✨ Обратите внимание, что компоненты больше не находятся в пространстве имен Http!

Сам чат-виджет не имеет ничего особенного. На самом деле, для этой демонстрации мы просто позволяем пользователю вводить свою сторону беседы. Работу с остальной частью можно оставить вам.

То, что нас интересует, - это сохранение состояния чата.

Вот код компонента:

```php

<?php

namespace App\Livewire;

use Livewire\Component;

class Chat extends Component
{
    /**
     * @var string[]
     */
    public array $messages = [];

    public string $message = '';

    public function addMessage()
    {
        $this->messages[] = $this->message;
        $this->reset('message');
    }

    public function render()
    {
        return view('livewire.chat');
    }
}

```

У нас есть массив $messages. Каждый раз, когда мы вызываем метод addMessage(), мы просто добавляем сообщение к этому списку сообщений.

На стороне HTML видно, как вызывается метод addMessage() и передается значение $message при отправке формы

```html
<div class="absolute bottom-0 right-12 h-60 w-60">
	<div class="flex h-full w-full flex-col overflow-auto rounded border bg-white">
		<div x-ref="chatBox" class="flex flex-1 flex-col gap-y-1 p-4 text-sm">
			<div class="text-gray-400 italic">Chat history</div>
			@foreach($messages as $message)
			<div><span class="text-blue-400">You:</span> {{ $message }}</div>
			@endforeach
		</div>
		<div>
			<form wire:submit="addMessage">
				<input
					wire:model="message"
					x-ref="messageInput"
					type="text"
					name="message"
					id="message"
					class="text-gray-900 ring-gray-300 placeholder:text-gray-400 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
				/>
			</form>
		</div>
	</div>
</div>
```

Этот виджет чата имеет абсолютное позиционирование и закреплен к нижней части экрана. Поскольку мы хотим видеть его на каждой странице, мы добавим его в наш макетный файл (layout file).

```html
<!doctype html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>My Video Collection</title>
		<script src="https://cdn.tailwindcss.com?plugins=typography,forms"></script>
	</head>
	<body class="bg-gray-50 min-h-screen font-sans text-black antialiased">
		<header>
			<nav class="mx-auto flex max-w-2xl items-center p-6">
				<a href="/">Home</a>
			</nav>
		</header>
		{{ $slot }}

		<livewire:chat />
	</body>
</html>
```

Мы добавили навигацию с кнопкой ”Главная" и включили наш новый компонент <livewire:chat />.

![](https://fly.io/laravel-bytes/chat-widget-with-livewire-s-persist/../../assets/livewire3-chat.gif)
