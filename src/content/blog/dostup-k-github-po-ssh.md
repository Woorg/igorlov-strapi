---
title: Доступ к Github по SSH
meta_title: Доступ к Github по SSH - Igor Gorlov
description: Доступ к удаленному репозиторию через SSH без необходимости указывать имя пользователя и пароль каждый раз, когда я делаю pull или push.
date: 2023-01-30T17:48:10.000Z
author: Igor Gorlov
image: ../../assets/images/undefined-Jan-30-2023.avif
categories:
  - Как закодить
tags:
  - Github
  - Ssh
draft: false
lastmod: 2024-03-27T12:36:10.853Z
---

<h2 class="wp-block-heading">SSH-ключ</h2>

Доступ к удаленному репозиторию через SSH без необходимости указывать имя пользователя и пароль каждый раз, когда я делаю pull или push.

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Перейдите в интерпретатор командной строки (например, установленный ранее GitHub CLI) и запустите его:</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">ssh-keygen</code></pre>
<!-- /wp:code -->

Используйте ту же команду для Windows, только с расширением .exe.

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Просто нажмите Enter для каждого из заданных вопросов…</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Он создаст каталог .ssh/ в вашем домашнем каталоге с парой ключей внутри, в виде 2 файлов:<!-- wp:list -->
<ul><!-- wp:list-item -->
<li><code>id_rsa - это закрытый ключ, который я всегда храню локально на своем компьютере.</code></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><code>id_rsa.pub - это открытый ключ, который я могу опубликовать где-нибудь в Интернете.</code></li>
<!-- /wp:list-item --></ul>
<!-- /wp:list --></li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">ls ~/.ssh</code></pre>
<!-- /wp:code -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Просмотрите и скопируйте содержимое файла id-rsa.pub (в зависимости от используемой ОС, используйте соответствующий редактор или средство просмотра файлов, здесь я использую команду Linux cat или less. В Windows можно использовать Notepad).</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">cat ~/.ssh/id-rsa.pub</code></pre>
<!-- /wp:code -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Скопируйте содержимое файла</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Вернитесь на страницу своей учетной записи GitHub: Нажмите Настройка-&gt;SSH и GPG ключи-&gt;Новый SSH ключ-&gt;вставьте открытый ключ в текстовое поле Ключ, укажите название-&gt; Добавить SSH ключ.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Когда это будет сделано, мне не нужно будет указывать имя пользователя и пароль каждый раз, когда я общаюсь с удаленным репозиторием.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->
