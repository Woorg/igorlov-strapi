---
title: Как запускать Laravel Pint при сохранении в PhpStorm
meta_title: |
  Как Запускать Laravel Pint При Сохранении В PhpStorm -...
description: >
  Вот ваше краткое руководство по настройке PhpStorm для запуска Laravel Pint
  при сохранении, чтобы форматировать ваши PHP-файлы. Я использую это для
  каждого...
date: 2023-10-24T21:05:07.934Z
image: >-
  ../../assets/images/kak-zapuskatь-laravel-pint-pri-sohranenii-v-phpstorm-Oct-25-2023.avif
categories:
  - Как закодить
author: Igor Gorlov
tags:
  - Laravel
  - Php
  - Pint
draft: false
keywords:
  - Laravel Pint
type: blog
slug: kak-zapuskatь-laravel-pint-pri-sohranenii-v-phpstorm
lastmod: 2024-03-20T21:26:48.961Z
---

Вот ваше краткое руководство по настройке PhpStorm для запуска Laravel Pint при сохранении, чтобы форматировать ваши PHP-файлы. Я использую это для каждого проекта, чтобы поддерживать чистоту моих PHP-файлов.

## Установка Laravel Pint

Laravel Pint устанавливается при создании нового проекта Laravel, поэтому, возможно, его установка не потребуется. Проверьте файл composer.json, чтобы убедиться, что он там.

Если нет, вы можете установить Laravel Pint следующим образом:

```bash
composer require laravel/pint --dev


```

Готовы? Погнали.

## Настройка PhpStorm

Чтобы запустить Laravel Pint вручную, выполните следующую команду:

```bash
./vendor/bin/pint

```

Если вы, как и я, не хотите выполнять эту команду каждый раз, когда хотите отформатировать ваши файлы, настройте PhpStorm так, чтобы эта команда выполнялась каждый раз при нажатии кнопки ”Сохранить”.

Откройте настройки PhpStorm (команда + ,) и перейдите в “Tools” (Инструменты) &gt; “Actions on Save” (Действия при сохранении) &gt; “File Watcher” (Слежение за файлами) &gt; “Configure” (Настроить), и заполните следующие поля:

<!-- wp:table -->
<figure class="wp-block-table"><table><thead><tr><th>Поле</th><th>Значение</th></tr></thead><tbody><tr><td>Тип файла</td><td>PHP</td></tr><tr><td>Область</td><td>Файлы проекта</td></tr><tr><td>Программа</td><td>$ProjectFileDir$/vendor/bin/pint</td></tr><tr><td>Аргументы</td><td>$FileRelativePath$</td></tr><tr><td>Обновляемые пути</td><td>$FileRelativePath$</td></tr><tr><td>Рабочий каталог</td><td>$ProjectFileDir$</td></tr><tr><td>Запускать слежение при внешних изменениях</td><td>Отмечено</td></tr><tr><td>И, наконец, включите параметры "Reformat code" (Упорядочивание кода) (убедитесь, что вы исключили PHP-файлы), "Optimize imports" (Оптимизация импортов) (по желанию) и "Rearrange code" (Перестановка кода) (по желанию).</td><td></td></tr></tbody></table></figure>
<!-- /wp:table -->

При сохранении Laravel Pint теперь должен форматировать ваш код.

Если у вас есть какие-либо вопросы или отзывы, не стесняйтесь обращаться ко мне.

Спасибо!
