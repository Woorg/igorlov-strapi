---
title: Загрузка файлов в Laravel 10
meta_title: Загрузка файлов в Laravel 10 - Igor Gorlov
description: >-
  Загрузка файлов – одна из распространенных функций, которую использует
  большинство приложений, и все же это одна из тех вещей, с которыми, как я
  вижу, многие люди испытывают трудности.
date: 2023-03-07T23:06:30.000Z
author: Igor Gorlov
image: ../../assets/images/undefined-Mar-08-2023.avif
categories:
  - Как закодить
tags:
  - Laravel
  - Php
draft: false
lastmod: 2024-03-20T21:26:45.372Z
---

Загрузка файлов - одна из распространенных функций, которую использует большинство приложений, и все же это одна из тех вещей, с которыми, как я вижу, многие люди испытывают трудности.

Laravel предлагает простой API для работы с локальной файловой системой:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="php" class="language-php">Storage::putFileAs('images', $request-&gt;file('file'));
</code></pre>
<!-- /wp:code -->

Часто пользователю необходимо обработать проверку файла, его размер, размеры, имя, видимость, путь, диск и т.д.

Мы хотим создать форму, которая позволит нам загрузить файл и отправить его - а маршрут будет принимать эту форму, проверять вводимые данные и обрабатывать загрузку.

В этой статье я сделаю пошаговое руководство по загрузке файлов на Laravel 10 с использованием пакета erlandmuchasaj/laravel-file-uploader.&nbsp;<br>В этом учебнике мы создадим 2 маршрута.<br>Один для создания формы, куда пользователь будет загружать файл, а другой маршрут для загрузки файла с помощью пакета.<br>Мы создадим простую форму, используя компоненты Bootstrap Form UI.

Прежде всего, создадим новый проект Laravel.<br>Откройте инструмент командной строки и выполните следующую команду, чтобы создать проект Laravel с нуля.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">composer create-project laravel/laravel --prefer-dist laravel-file-uploader
</code></pre>
<!-- /wp:code -->

Затем мы заходим в только что созданный каталог проекта:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">cd laravel-file-uploader
</code></pre>
<!-- /wp:code -->

Затем мы устанавливаем пакет laravel-file-uploader.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">composer require erlandmuchasaj/laravel-file-uploader
</code></pre>
<!-- /wp:code -->

После этого мы создаем символическую ссылку для доступа к файлам, которые будут общедоступными.<br>По умолчанию публичный диск использует локальный драйвер и хранит свои файлы в storage/app/public.

Чтобы сделать эти файлы доступными из интернета, необходимо создать символическую ссылку с public/storage на storage/app/public.

Для создания символической ссылки можно использовать команду storage:link Artisan:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">php artisan storage:link
</code></pre>
<!-- /wp:code -->

<h2 class="wp-block-heading">Создайте маршруты.</h2>

Перейдите в route/web.php и создайте 2 дополнительных маршрута. Первый обрабатывает визуализацию формы, а второй - POST-запрос формы.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="php" class="language-php">use ErlandMuchasaj\LaravelFileUploader\FileUploader; // &lt;= import the package
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;


// visualize the form
Route::get('/files', function (Request $request) {
    return view('files');
})-&gt;name('files');

// handle the post request
Route::post('/files', function (Request $request) {

    $max_size = (int) ini_get('upload_max_filesize') * 1000;

    $extensions = implode(',', FileUploader::images());

    $request-&gt;validate([
        'file' =&gt; [
            'required',
            'file',
            'image',
            'mimes:' . $extensions,
            'max:'.$max_size,
        ]
    ]);

    $file = $request-&gt;file('file');

    $response = FileUploader::store($file);

    return redirect()
            -&gt;back()
            -&gt;with('success','File has been uploaded.')
            -&gt;with('file', $response);
})-&gt;name('files.store');
</code></pre>
<!-- /wp:code -->

<h2 class="wp-block-heading">Создание файлов лезвия в Laravel.</h2>

В этом шаге мы создадим представление, в котором будет размещена форма загрузчика файлов.<br>Создайте новый файл в resources/views/files.blade.php и поместите в него следующее содержимое:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="markup" class="language-markup">&lt;!DOCTYPE html&gt;
&lt;html lang="{{ str_replace('_', '-', app()-&gt;getLocale()) }}"&gt;
    &lt;head&gt;
        &lt;meta charset="utf-8"&gt;
        &lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;
        &lt;title&gt;File uploader&lt;/title&gt;
        &lt;link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous"&gt;
    &lt;/head&gt;
    &lt;body class="antialiased"&gt;
        &lt;div class="container"&gt;
            &lt;div class="row"&gt;
                &lt;div class="col-12"&gt;
                    @if ($message = Session::get('success'))
                        &lt;div class="alert alert-success alert-dismissible fade show" role="alert"&gt;
                            &lt;button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"&gt;&lt;/button&gt;
                            &lt;strong&gt;{{ $message }}&lt;/strong&gt;
                        &lt;/div&gt;
                    @endif
                    @if (count($errors) &gt; 0)
                        &lt;div class="alert alert-danger alert-dismissible fade show" role="alert"&gt;
                            &lt;button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"&gt;&lt;/button&gt;
                            &lt;ul class="mb-0 p-0"&gt;
                                @foreach ($errors-&gt;all() as $error)
                                    &lt;li&gt;{{ $error }}&lt;/li&gt;
                                @endforeach
                            &lt;/ul&gt;
                        &lt;/div&gt;
                    @endif
                &lt;/div&gt;
                &lt;div class="col-12 py-5"&gt;
                    &lt;div class="card my-5"&gt;
                        &lt;div class="card-header"&gt;
                           &lt;h3&gt;Laravel File Uploader&lt;/h3&gt;
                        &lt;/div&gt;
                        &lt;div class="card-body"&gt;
                            &lt;form method="POST" action="{{ route('files.store')  }}" enctype="multipart/form-data"&gt;
                                @method('POST')
                                @csrf
                                &lt;div class="mb-3"&gt;
                                    &lt;label for="formFileLg" class="form-label"&gt;File input example&lt;/label&gt;
                                    &lt;input name="file" class="form-control form-control-lg" id="formFileLg"
                                           type="file"&gt;
                                &lt;/div&gt;
                                &lt;div class="mb-3"&gt;
                                    &lt;button type="submit" value="submit" class="btn btn-primary"&gt;Upload&lt;/button&gt;
                                &lt;/div&gt;
                            &lt;/form&gt;
                        &lt;/div&gt;
                    &lt;/div&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;
        &lt;script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"&gt;&lt;/script&gt;
    &lt;/body&gt;
&lt;/html&gt;
</code></pre>
<!-- /wp:code -->

Это покажет пользователю форму для загрузки файлов. Форма в этом шаблоне представления указывает на маршрут с именем files.store, который мы создали ранее в файле routes/web.php.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--lQuV-tq5--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/sl3omphhlp1cty6y2c7i.png" alt="Laravel форма загрузки"/></figure>
<!-- /wp:image -->

Это все для данного руководства.

Если вам нужна дополнительная информация об используемом пакете, вы можете прочитать ниже:

Простой, но мощный пакет Laravel для загрузки файлов

Laravel File Uploader предлагает простой способ загрузки файлов на различные диски.<br>Основная цель пакета - убрать повторяющийся и громоздкий код и упростить его до нескольких простых методов.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">composer require erlandmuchasaj/laravel-file-uploader</code></pre>
<!-- /wp:code -->

<h2 class="wp-block-heading">Был ли он полезен?</h2>

Дайте мне знать в разделе комментариев ниже, если вы когда-либо использовали этот пакет в каком-либо из своих проектов.

Не забудьте поставить лайк и прокомментировать.

Следите за мной, чтобы получить больше советов по веб-разработке, новые пакеты и многое другое.

Спасибо за чтение.
