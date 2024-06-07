---
title: Загрузка файлов в виде кусков с помощью Livewire
meta_title: Загрузка файлов в виде кусков с помощью Livewire - Igor Gorlov
description: >-
  Сегодня мы загрузим файл по частям с помощью Livewire. Загружайте файлы рядом
  с пользователями с помощью Fly.io, и вы сможете запустить свое приложение
  Laravel за считанные минуты!
date: 2023-02-16T05:25:00.000Z
image: ../../assets/images/undefined-Feb-16-2023.avif
categories:
  - Как закодить
author: Igor Gorlov
tags:
  - Laravel
  - Livewire
draft: false
lastmod: 2024-03-20T21:26:45.202Z
---

<!-- <img class="post-cover" src="https://fly.io/laravel-bytes/2023-02-08/slicing-chunks-cover.jpg" alt="A close up on a chopping board. Three carrots, and three fruits are located on the left space near the board, and three potatoes on its right. Human hands are shown using a knife to cut cubes out of a presumably potato ingredient on top of the chopping board."> Изображение Annie Ruygt -->

Сегодня мы загрузим файл по частям с помощью Livewire. Загружайте файлы рядом с пользователями с помощью Fly.io, и вы сможете запустить свое приложение Laravel за считанные минуты!

Серверы настроены на ограничение размера запросов, которые они могут принимать. Это делается для того, чтобы избежать длительного времени обработки, недоступности и потенциальных рисков безопасности, которые возникают при обработке больших запросов за один раз.

Что произойдет, если пользователь попросит загрузить файл, превышающий установленные ограничения? Соответственно, загрузка завершится неудачей, либо с написанным нами пользовательским сообщением, либо со стандартной ошибкой с кодом состояния 413, возвращаемой нашим сервером.

Мы сталкиваемся с проблемой, с которой сталкивались разработчики до нас и будут сталкиваться еще долго после нас: обработка больших загрузок файлов.

<!-- wp:rank-math/toc-block {"title":"Оглавление","headings":[{"key":"47c2e1f9-d8f6-4c60-80de-5a370fd24326","content":"Проблема","level":2,"link":"#проблема","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"2e940318-75c9-4cee-ac90-89a9429f703a","content":"Решение","level":2,"link":"#решение","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"5856e3e2-6c99-44a8-b0fc-78264c6cf1f1","content":"План","level":2,"link":"#план","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"06bd4b96-c098-4cf9-a960-2be8cdd45d70","content":"Вид","level":2,"link":"#вид","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"95bca40f-8667-4280-9c70-0c56eb766d58","content":"Ожидания от совместного использования","level":2,"link":"#ожидания-от-совместного-использования","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"350fff3b-0596-412f-964b-dc8dc9eb7fc9","content":"Как вырезать фрагмент из нашего файла?","level":2,"link":"#как-вырезать-фрагмент-из-нашего-файла","disable":false,"isUpdated":false,"isGeneratedLink":true}],"listStyle":"ul"} -->
<div class="wp-block-rank-math-toc-block" id="rank-math-toc"><h2>Оглавление</h2><nav><ul><li class=""><a href="#проблема">Проблема</a></li><li class=""><a href="#решение">Решение</a></li><li class=""><a href="#план">План</a></li><li class=""><a href="#вид">Вид</a></li><li class=""><a href="#ожидания-от-совместного-использования">Ожидания от совместного использования</a></li><li class=""><a href="#как-вырезать-фрагмент-из-нашего-файла">Как вырезать фрагмент из нашего файла?</a></li></ul></nav></div>
<!-- /wp:rank-math/toc-block -->

<h2 class="wp-block-heading" id="проблема">Проблема</h2>

Очевидным подходом к решению проблемы является обновление наших ограничений конфигурации. Мы можем увеличить несколько ограничений конфигурации в самом сервере и в PHP.

Проблема в том, что это не совсем динамично. Размер загружаемых файлов может увеличиться со временем, и тогда нам придется заново настраивать наши ограничения. А с увеличением ограничений увеличивается и время обработки запроса.

Есть ли способ избежать этой вечной перенастройки и увеличения времени обработки запросов?

<h2 class="wp-block-heading" id="решение">Решение</h2>

Решение не всегда заключается в увеличении ограничений, иногда достаточно просто скорректировать существующий подход, чтобы спасти ситуацию. Вместо того чтобы отправлять весь файл целиком, почему бы не отправлять его партиями?

Именно так! Сегодня мы не будем изменять нашу конфигурацию под давлением развивающихся ограничений. Вместо этого мы решим эту проблему без изменения нашей конфигурации.

Сегодня мы нарежем, нарежем и объединим фрагменты файлов - с помощью Livewire!

<h2 class="wp-block-heading" id="план">План</h2>

У нас есть трехэтапный план по нарезке и объединению:

Сначала мы сообщим Livewire ожидаемый общий размер $fileSize, который мы получим от всех объединенных кусков. Затем мы начнем нарезать, загружать и объединять фрагменты в ”конечный файл" на нашем сервере один за другим с помощью Livewire. Как только размер конечного файла достигнет заданного $fileSize, это означает, что все куски были объединены. Поэтому мы передаем конечный файл классу TemporaryUploadedFile в Livewire, чтобы использовать возможности Livewire по загрузке файлов.

Чтобы собрать все воедино, вы можете посетить readme нашего репозитория и просмотреть соответствующие файлы.

<h2 class="wp-block-heading" id="вид">Вид</h2>

Давайте начнем с создания Livewire-компонента, выполнив команду php artisan make:livewire chunked-file-upload. После этого обновите наше представление Livewire, чтобы включить тег формы, содержащий элемент ввода файла и кнопку для отправки.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="markup" class="language-markup">&lt;form wire:submit.prevent="submit"&gt;
  &lt;input type="file" id="myFile"/&gt;
  &lt;button type="button" onClick="uploadChunks()"&gt;Submit&lt;/button&gt;
&lt;/form&gt;
</code></pre>
<!-- /wp:code -->

Каждый раз, когда пользователь нажимает на кнопку отправки, наша пользовательская функция JavaScript uploadChunks() будет разрезать выбранный файл на фрагменты и запрашивать Livewire для загрузки каждого фрагмента.

<h2 class="wp-block-heading" id="ожидания-от-совместного-использования">Ожидания от совместного использования</h2>

Для того чтобы загрузить большой файл, мы будем нарезать его на более мелкие фрагменты, не выходящие за пределы размера запроса нашего сервера. Мы будем загружать каждый фрагмент один за другим, чтобы сразу объединить загруженный фрагмент в ”конечный файл".

Но как именно сервер узнает, что все фрагменты были объединены в наш конечный файл? Конечно же, ему нужно знать ожидаемый конечный размер нашего конечного файла!

Свойства Livewire идеально подходят для обмена информацией от клиента к серверу, поэтому давайте включим информацию о нашем файле, такую как его $fileName и $fileSize, в качестве публичных атрибутов в наш компонент Livewire. Сегодня мы разделим наш файл на куски по 1 МБ, поэтому объявим отдельный атрибут для загружаемого куска $fileChunk и ожидаемого максимального размера куска $chunkSize:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="powershell" class="language-powershell">// app/Http/Livewire/ChunkedFileUpload.php
public $chunkSize = 1000000; // 1 MB
public $fileChunk; 

public $fileName;
public $fileSize; 
</code></pre>
<!-- /wp:code -->

Давайте вернемся к нашему представлению Livewire и изменим функцию uploadChunks(), вызываемую нашей кнопкой отправки. Каждый раз, когда пользователь отправляет файл для загрузки, мы будем устанавливать значения для $fileName и $fileSize, которые позже будут отправлены в наш компонент Livewire:

Обратите внимание, что мы используем метод set в Livewire. Это позволяет нам установить публичный атрибут в нашем клиенте, но не делать немедленного вызова на сервер.

Изменения $fileName и $fileSize будут отправлены в Livewire в следующем немедленном запросе компонента.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="php" class="language-php">// resources/views/livewire/chunked-file-upload.blade.php
function uploadChunks()
{
    const file = document.querySelector('#myFile').files[0];

    // Send the following later at the next available call to component
    @this.set('fileName', file.name, true);
    @this.set('fileSize', file.size, true);
</code></pre>
<!-- /wp:code -->

Теперь, когда наши окончательные данные о файле готовы для передачи компоненту Livewire, мы можем взглянуть на наш первый фрагмент, начиная с 0-го байта файла:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="php" class="language-php">    livewireUploadChunk( file, 0 );
}
</code></pre>
<!-- /wp:code -->

Нарезка фрагмента

<h2 class="wp-block-heading" id="как-вырезать-фрагмент-из-нашего-файла">Как вырезать фрагмент из нашего файла?</h2>

Нам нужно знать, где начинается кусок и где он заканчивается. Для первого куска нашего файла начальная точка - это данность: 0. Но как насчет того, где кусок заканчивается?

Конец куска всегда будет находиться на расстоянии 1 МБ (наш $chunkSize) от начальной точки куска или размера файла - в зависимости от того, что меньше:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="php" class="language-php">// resources/views/livewire/chunked-file-upload.blade.php
function livewireUploadChunk( file, start ){
    const chunkEnd  = Math.min( start + @js($chunkSize), file.size );
    const chunk     = file.slice( start, chunkEnd ); 
</code></pre>
<!-- /wp:code -->

Теперь, когда у нас есть наш чанк, нам нужно отправить его на наш сервер. Мы можем использовать функцию Livewire upload JavaScript для загрузки и связать чанк с нашим атрибутом $fileChunk, объявленным выше:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="php" class="language-php">    @this.upload('fileChunk', chunk);
</code></pre>
<!-- /wp:code -->

После загрузки первого чанка давайте отправим и следующий. Нам нужно убедиться, что текущий фрагмент полностью загружен, для этого мы можем подключиться к обратному вызову события прогресса функции upload:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="php" class="language-php">-    @this.upload('fileChunk', chunk);
+    @this.upload('fileChunk', chunk,(uName)=&gt;{}, ()=&gt;{}, (event)=&gt;{
+        if( event.detail.progress == 100 ){
+          // We recursively call livewireUploadChunk from within itself
+          start = chunkEnd;
+          if( start &lt; file.size ){
+            livewireUploadChunk( file, start );
+          }
+        }
+    });
}
</code></pre>
<!-- /wp:code -->

Загрузка завершается, когда значение event.detail.progress достигает 100. После этого мы рекурсивно вызываем текущую функцию livewireUploadChunk(), чтобы загрузить следующий чанк.

Диапазон метода file.slice исключает chunkEnd. Например, диапазон slice(0,10) на самом деле означает от 0 до 9, но не 10! Это означает, что наша следующая начальная точка будет chunkEnd.

Переместите свои серверы поближе к пользователям - и восхититесь скоростью близкого расположения. Глобальное развертывание на Fly за считанные минуты!

Разверните свое приложение Laravel!&nbsp;&nbsp;→

<!-- <img srcset="https://fly.io/static/images/cta-turtle@2x.jpg 2x" src="https://fly.io/static/images/cta-turtle.jpg" alt="">Сохранение и объединение -->

Теперь, когда JavaScript нашего представления Livewire настроен для нарезки и загрузки фрагментов, мы подошли к заключительной части нашего путешествия по нарезке фрагментов: сохранению и объединению фрагментов в компоненте Livewire!

Мы будем использовать свойство WithFileUploads компонента Livewire, чтобы облегчить загрузку файлов. Этот признак позволяет нам объявить атрибут, который можно загружать - в нашем случае $fileChunk!

<!-- wp:code -->
<pre class="wp-block-code"><code lang="php" class="language-php">// app/Http/Livewire/ChunkedFileUpload.php

+ use WithFileUploads;

// Chunks info
public $chunkSize = 1000000; // 1M
public $fileChunk;

// Final file 
public $fileName;
public $fileSize;

+ public $finalFile;
</code></pre>
<!-- /wp:code -->

После загрузки фрагмента Livewire должен объединить его в ”конечный файл". Чтобы сделать это, нам нужно перехватить поток Livewire после загрузки нашего фрагмента.

К счастью для нас, Livewire предоставляет ”крючки", которые мы можем использовать для перехвата потока жизненного цикла Livewire для наших публичных атрибутов. В нашем конкретном случае мы можем подключиться к обновленному хуку для нашего атрибута $fileChunk.

Из нашего крючка updatedFileChunk мы получим имя файла, созданное Livewire для текущего чанка, используя метод getFileName():

<!-- wp:code -->
<pre class="wp-block-code"><code lang="php" class="language-php">public function updatedFileChunk()
{
    $chunkFileName = $this-&gt;fileChunk-&gt;getFileName();
</code></pre>
<!-- /wp:code -->

Затем мы объединим этот фрагмент в наш окончательный файл и удалим фрагмент после объединения:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="php" class="language-php">      $finalPath = Storage::path('/livewire-tmp/'.$this-&gt;fileName);
      $tmpPath   = Storage::path('/livewire-tmp/'.$chunkFileName);
      $file = fopen($tmpPath, 'rb');
      $buff = fread($file, $this-&gt;chunkSize);
      fclose($file);

      $final = fopen($finalPath, 'ab');
      fwrite($final, $buff);
      fclose($final);
      unlink($tmpPath);
</code></pre>
<!-- /wp:code -->

В конечном итоге все фрагменты будут поступать один за другим и объединяться в наш конечный файл. Чтобы определить, все ли фрагменты были объединены, мы просто сравним размер конечного файла с ожидаемым $fileSize.

Конечно, этот вновь созданный файл является нашим пользовательским файлом. Нам нужно будет заключить его в класс TemporaryUploadedFile в Livewire, чтобы использовать возможности Livewire по работе с загруженными файлами.

Не забудьте импортировать класс TemporaryUploadedFile и объявить новый публичный атрибут $finalFile!

<!-- wp:code -->
<pre class="wp-block-code"><code lang="php" class="language-php">      $curSize = Storage::size('/livewire-tmp/'.$this-&gt;fileName);
      if( $curSize == $this-&gt;fileSize ){
          $this-&gt;finalFile = 
          TemporaryUploadedFile::createFromLivewire("https://fly.io/".$this-&gt;fileName);
      }
}
</code></pre>
<!-- /wp:code -->

Скажем, например, предварительный просмотр нового, временного изображения в нашем представлении выглядит следующим образом:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="markup" class="language-markup">@if ($finalFile)
    Photo Preview:
    &lt;img src="{{ $finalFile-&gt;temporaryUrl() }}"&gt;
@endif
</code></pre>
<!-- /wp:code -->

Implementations are generally just so much more smooth with Livewire, uploading file chunks is no different!

<!-- <img srcset="" class="w-16 h-16 object-cover rounded-xl" src="https://fly.io/static/images/kathryn.jpg" alt="Kathryn Anne Tan">  -->

Имя Кэтрин Энн Тан
