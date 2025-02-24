---
title: Индикатор прогресса с Livewire
meta_title: Индикатор прогресса с Livewire - Igor Gorlov
description: Сегодня мы реализуем индикатор прогресса с помощью Livewire.
date: 2023-02-26T15:09:49.000Z
author: Igor Gorlov
image: ../../assets/images/undefined-Feb-26-2023.avif
categories:
  - Как закодить
tags:
  - Laravel
draft: false
lastmod: 2024-03-20T21:26:44.715Z
---

<img class="post-cover" src="https://fly.io/laravel-bytes/2023-02-16/loading-chunks-cover.png" alt="We are shown an image with a background of pastel, green color. Encompassing most of the image's center is a seemingly electric stove, on top of which chunks of brown cube ingredients are cooked in a grey frying pan. On the body of the stove, right below the cooking frying pan, is a label and a progress bar indicating the term LOADING."> Изображение Annie Ruygt

Сегодня мы реализуем индикатор прогресса с помощью Livewire. Fly.io, сделайте ваше приложение на Laravel за считанные минуты!

В статье Загрузка файлов с помощью Livewire мы легко загрузили файл отдельными, более мелкими частями с помощью функции загрузки Livewire. Сегодня мы создадим индикатор прогресса, чтобы наши пользователи знали, насколько продвинулась загрузка файла.

<h2 class="wp-block-heading">Что такое прогресс?</h2>

Мы можем представить себе прогресс как накопление ”маленьких побед”, ведущих к определенному ожиданию. Это портрет, который суммирует, насколько далеко мы продвинулись от завершения наших маленьких побед к ”ожидаемой цели".

Прогресс может быть измеримым - если мы можем определить нашу ”ожидаемую цель” и перечислить ”маленькие победы", которые к ней приближают.

Сегодня прогресс, который мы подсчитываем, - это успешная загрузка каждого фрагмента из общего количества фрагментов файла, который нужно загрузить. Каждый загруженный фрагмент - это маленькая победа на пути к полной загрузке файла.

Наш расчет будет выглядеть следующим образом: Процент прогресса = ”Количество маленьких побед на данный момент” / ”Ожидаемое общее количество побед" \* 100%.

Это означает, что нам понадобится $chunkCount, чтобы знать, сколько фрагментов мы ожидаем (”Ожидаемые общие победы”), $uploadedCount, чтобы отслеживать, сколько фрагментов было успешно загружено (”Количество маленьких побед"), и, наконец, отдельный $progressPercentage для нашего индикатора прогресса ("Прогресс!”).

<h2 class="wp-block-heading">Шаг на пути к прогрессу</h2>

Чтобы отобразить прогресс отдельных побед для нашей загрузки файлов, важно накапливать каждую победу и сообщать клиенту общий прогресс.

Именно здесь на помощь приходит Livewire. Livewire предоставляет нам именно тот механизм обмена данными, который нужен для отслеживания завершенных загрузок фрагментов, и крючки жизненного цикла данных для пересчета прогресса и реализации индикатора прогресса:

Мы захотим автоматически обмениваться переменными прогресса между клиентом и сервером, поэтому мы объявим публичные атрибуты $chunkCount, $uploadedCount и $progressPercentage. В качестве индикатора прогресса мы будем использовать элемент progress bar в нашем html и свяжем его значение со значением $progressPercentage Каждый раз, когда чанк будет успешно загружен, мы перехватываем завершение загрузки на сервере с помощью обновленного хука Livewire. Отсюда мы можем увеличить $uploadedCount и пересчитать $progressPercentage прямо перед тем, как компонент Livewire отправит ответ об успехе в представление Livewire. Как только представление Livewire получит обновление значения $progressPercentage, оно должно вызвать повторный рендеринг элемента , связанного с нашим атрибутом, тем самым обновляя отображаемый прогресс для наших пользователей! Индикатор прогресса

Прогресс можно вычислить, поэтому сначала нам нужно объявить переменные, которые мы будем использовать для вычисления этого значения в нашем компоненте Livewire:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="php" class="language-php">// app/Http/Livewire/ChunkedFileUpload.php

public $chunkCount;
public $uploadedCount;
public $progressPercentage;
</code></pre>
<!-- /wp:code -->

Здесь мы опираемся на настройку нашей статьи, где наши пользователи могут выбрать файл и нажать на кнопку, чтобы вызвать пользовательскую функцию JavaScript uploadChunks() для нарезки и загрузки фрагментов из выбранного файла:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="php" class="language-php">&lt;!-- app/resources/views/livewire/chunked-file-upload.php --&gt;

&lt;input type="file" id="myFile"/&gt;
&lt;button type="button" id="submit" onclick="uploadChunks()"&gt;Submit&lt;/button&gt;
</code></pre>
<!-- /wp:code -->

Каждый раз, когда файл отправляется на загрузку, мы будем инициализировать наши переменные прогресса, чтобы они соответствовали прогрессу нового файла. uploadChunks() срабатывает каждый раз, когда пользователь запрашивает загрузку файла, поэтому давайте добавим сюда нашу повторную инициализацию прогресса:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">&lt;script&gt;
...
function uploadChunks(){

    // File Details
    const file = document.querySelector('#myFile').files[0];
+   @this.set('chunkCount', Math.ceil(file.size/@js($chunkSize)));
+   @this.set('uploadedCount', 0);
+   @this.set('progressPercentage', 0);
    ...
}
&lt;/script&gt;
</code></pre>
<!-- /wp:code -->

Далее добавим в представление Livewire индикатор прогресса. Мы соединим его с атрибутом $progressPercentage, объявленным выше. Таким образом, любое изменение атрибута $progressPercentage будет обновлять и вычислять значение нашего индикатора прогресса.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="php" class="language-php">&lt;!-- app/resources/views/livewire/chunked-file-upload.php --&gt;

&lt;input type="file" id="myFile"/&gt;
&lt;button type="button" id="submit" onclick="uploadChunks()"&gt;Submit&lt;/button&gt;

+ @if( $progressPercentage  )
+  &lt;progress max="100" wire:model="progressPercentage" /&gt;&lt;/progress&gt;
+ @endif
</code></pre>
<!-- /wp:code -->

Теперь, когда у нас есть индикатор прогресса, пляшущий под дудку атрибута $progressPercentage, мы готовы обновлять этот прогресс каждый раз, когда мы одерживаем маленькую победу - то есть каждый раз, когда мы успешно загружаем фрагмент нашего файла.

Разместите свои серверы поближе к пользователям - и восхититесь скоростью близкого расположения. Глобальное развертывание на Fly за считанные минуты!

Разверните свое приложение Laravel!&nbsp;&nbsp;→

<img srcset="https://fly.io/static/images/cta-rabbit@2x.jpg 2x" src="https://fly.io/static/images/cta-rabbit.jpg" alt="">Вот как мы развиваемся

Мы будем обновлять наш прогресс каждый раз, когда чанк будет успешно загружен. Для этого нам нужно ответить на два вопроса: как узнать, когда чанк завершает загрузку, и как реагировать на это завершение?

Мы создаем установку, которая использует функцию загрузки Livewire для загрузки нашего чанка файла:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">@this.upload('fileChunk', chunk, ...);
</code></pre>
<!-- /wp:code -->

Обратите внимание на атрибуты, переданные в функцию: chunk - это переменная JavaScript, которая хранит ссылку на фрагмент нашего файла, а fileChunk соответствует публичному атрибуту в нашем компоненте Livewire, объявленному как $fileChunk.

Когда эта функция выполняется, представление Livewire выполняет процесс загрузки переменной chunk во временную папку на нашем сервере. После завершения загрузки фрагмента файла он обновляет отображаемый атрибут $fileChunk с подробной информацией о загруженном фрагменте. Livewire удобно предоставляет нам обновленный хук, который мы можем использовать для внедрения логики после этого ”обновления” нашей переменной.

С помощью этого хука мы можем пересчитать значение $progressPercentage. Каждый раз, когда загружается чанк, мы увеличиваем количество загруженных чанков $uploadedCount. Затем мы разделим это число на ожидаемое количество чанков: $chunkCount, и умножим его на 100, чтобы получить $progressPercentage:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="php" class="language-php">public function updatedFileChunk()
{
    // Update progress here
    $this-&gt;uploadedCount += 1;
    $this-&gt;progressPercentage 
    = ($this-&gt;uploadedCount / $this-&gt;chunkCount) * 100;
    ...
}
</code></pre>
<!-- /wp:code -->

Наш хук updatedFileChunk() пересчитывает и обновляет наш $progressPercentage прямо перед тем, как компонент Livewire отвечает клиенту об успешной загрузке.

Изменение $progressPercentage, отправленное компонентом Livewire, обновляет связанный с ним элемент новым значением, перемещая наш индикатор прогресса.

Вот и все! Попробуйте загрузить свой файл сейчас и увидите, как индикатор прогресса движется к отметке 100!
