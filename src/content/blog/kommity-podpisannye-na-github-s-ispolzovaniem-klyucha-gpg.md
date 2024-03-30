---
title: 'Коммиты, подписанные на GITHUB с использованием ключа GPG'
meta_title: 'Коммиты, подписанные на GITHUB с использованием ключа GPG - Фул Фронт Дев'
description: >-
  Подписанные GPG коммиты на GitHub - это безопасный способ обеспечить
  обновление и целостность вашего вклада в репозиторий.
date: 2023-09-09T11:38:00.000Z
image: ../../assets/images/undefined-Sep-09-2023.avif
categories:
  - Как закодить
author: Igor Gorlov
tags:
  - Git
  - Github
draft: false
lastmod: 2024-03-20T21:26:44.103Z
---

Подписанные GPG коммиты на GitHub - это безопасный способ обеспечить обновление и целостность вашего вклада в репозиторий.

<!-- wp:rank-math/toc-block {"title":"Оглавление","headings":[{"key":"c4f2f814-3b89-4ac9-9bb3-fd457f7e331b","content":"ШАГ 0: первая установка GPG","level":2,"link":"#шаг-0-первая-установка-gpg","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"fbbc972e-b689-400e-9c07-7658b7196a75","content":"Шаг 1: Проверка существующих ключей GPG","level":2,"link":"#шаг-1-проверка-существующих-ключей-gpg","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"f24722bc-7b1b-4bcc-a101-0b18c70c9248","content":"Шаг 2: Создание нового ключа GPG","level":2,"link":"#шаг-2-создание-нового-ключа-gpg","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"01fee222-ad60-4948-a418-d2f286d75205","content":"Шаг 3: Экспорт ключа GPG","level":2,"link":"#шаг-3-экспорт-ключа-gpg","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"0747f113-b5eb-4509-8e28-6b41ef7ddb34","content":"Шаг 4: Добавление GPG-ключа в GitHub","level":2,"link":"#шаг-4-добавление-gpg-ключа-в-git-hub","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"bce958cd-9693-4b28-86ab-ccfd2aceca38","content":"Шаг 5: Настройка Git","level":2,"link":"#шаг-5-настройка-git","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"269562a6-23c6-4d97-ba9d-14fc202b17db","content":"Шаг 6: Включение автоматической подписи коммитов и тегов","level":2,"link":"#шаг-6-включение-автоматической-подписи-коммитов-и-тегов","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"873a6f69-6adb-43f7-b7be-e0d9242468cf","content":"Шаг 7: Проверка подписи фиксации","level":2,"link":"#шаг-7-проверка-подписи-фиксации","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"237fffd9-4ff6-41e2-8f40-8efb6310045c","content":"Шаг 8: Настройка других адресов электронной почты","level":2,"link":"#шаг-8-настройка-других-адресов-электронной-почты","disable":false,"isUpdated":false,"isGeneratedLink":true}],"listStyle":"ul"} -->
<div class="wp-block-rank-math-toc-block" id="rank-math-toc"><h2>Оглавление</h2><nav><ul><li class=""><a href="#шаг-0-первая-установка-gpg">ШАГ 0: первая установка GPG</a></li><li class=""><a href="#шаг-1-проверка-существующих-ключей-gpg">Шаг 1: Проверка существующих ключей GPG</a></li><li class=""><a href="#шаг-2-создание-нового-ключа-gpg">Шаг 2: Создание нового ключа GPG</a></li><li class=""><a href="#шаг-3-экспорт-ключа-gpg">Шаг 3: Экспорт ключа GPG</a></li><li class=""><a href="#шаг-4-добавление-gpg-ключа-в-git-hub">Шаг 4: Добавление GPG-ключа в GitHub</a></li><li class=""><a href="#шаг-5-настройка-git">Шаг 5: Настройка Git</a></li><li class=""><a href="#шаг-6-включение-автоматической-подписи-коммитов-и-тегов">Шаг 6: Включение автоматической подписи коммитов и тегов</a></li><li class=""><a href="#шаг-7-проверка-подписи-фиксации">Шаг 7: Проверка подписи фиксации</a></li><li class=""><a href="#шаг-8-настройка-других-адресов-электронной-почты">Шаг 8: Настройка других адресов электронной почты</a></li></ul></nav></div>
<!-- /wp:rank-math/toc-block -->

<h2 class="wp-block-heading" id="шаг-0-первая-установка-gpg">ШАГ 0: первая установка GPG</h2>

Для наиболее простой установки GPG следует использовать менеджер пакетов Homebrew. Подобно менеджерам пакетов apt или rpm в Linux, он позволяет выполнить быструю установку в одну строку.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">brew install gnupg
</code></pre>
<!-- /wp:code -->

Проверка установки

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">gpg --version
</code></pre>
<!-- /wp:code -->

💡 ПРИМЕЧАНИЕ: Если вы используете Linux, просто используйте apt get вместо brew, если вы используете Windows, ищите в Google.

<h2 class="wp-block-heading" id="шаг-1-проверка-существующих-ключей-gpg">Шаг 1: Проверка существующих ключей GPG</h2>

Прежде чем создавать новый GPG-ключ, следует проверить, есть ли у вас уже такой ключ. Используйте следующую команду для получения списка ключей GPG:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">gpg --list-secret-key --keyid-format LONG
</code></pre>
<!-- /wp:code -->

💡 ПРИМЕЧАНИЕ: Если ничего не отображается, это означает, что у вас еще нет ни одного ключа.

<h2 class="wp-block-heading" id="шаг-2-создание-нового-ключа-gpg">Шаг 2: Создание нового ключа GPG</h2>

Если у вас нет ключа GPG или вы хотите создать новый, выполните следующие действия:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">gpg --full-generate-key
</code></pre>
<!-- /wp:code -->

Вам будет предложено сделать несколько вариантов:

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Тип ключа: Мы рекомендуем RSA.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Размер ключа: Как правило, безопасным является 4096 бит.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Срок действия ключа: Выберите параметр, наиболее соответствующий вашим потребностям. Например, '0' - никогда не истекает или '1y' - один год.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Настоящее имя: Ваше имя.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Адрес электронной почты: Адрес электронной почты, связанный с вашей учетной записью GitHub.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Комментарий: Дополнительный комментарий.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Подтвердите свой выбор.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

Вам будет предложено создать пароль и подтвердить его.

<h2 class="wp-block-heading" id="шаг-3-экспорт-ключа-gpg">Шаг 3: Экспорт ключа GPG</h2>

Теперь экспортируйте ключ GPG в формате ASCII, чтобы добавить его в GitHub:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">gpg --armor --export &lt;Key ID&gt;
</code></pre>
<!-- /wp:code -->

💡 ПРИМЕЧАНИЕ: Замените идентификатор GPG-ключа, который вы хотите экспортировать.

<h2 class="wp-block-heading" id="шаг-4-добавление-gpg-ключа-в-git-hub">Шаг 4: Добавление GPG-ключа в GitHub</h2>

Зайдите на GitHub, перейдите к настройкам своего профиля и нажмите кнопку “GPG Keys” в левом меню. Вставьте в это поле ключ GPG, экспортированный в предыдущем шаге, и нажмите кнопку ”Добавить ключ GPG”.

<h2 class="wp-block-heading" id="шаг-5-настройка-git">Шаг 5: Настройка Git</h2>

Теперь настройте Git на использование вашего GPG-ключа для подписи коммитов. Для этого выполните следующие команды:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">git config --global user.signingkey &lt;Key ID&gt;
</code></pre>
<!-- /wp:code -->

💡 ПРИМЕЧАНИЕ: Замените идентификатор GPG-ключа, который вы хотите экспортировать.

Вам нужно экспортировать переменную GPG_TTY, поэтому не нужно делать это каждый раз, просто отредактируйте свой профиль bash (в моем случае я использую .bashrc) и вставьте это:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">export GPG_TTY=$(tty)
</code></pre>
<!-- /wp:code -->

<h2 class="wp-block-heading" id="шаг-6-включение-автоматической-подписи-коммитов-и-тегов">Шаг 6: Включение автоматической подписи коммитов и тегов</h2>

Включите автоматическую подпись коммитов и тегов с помощью следующих команд:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">git config --global commit.gpgsign true
git config --global tag.gpgsign true
</code></pre>
<!-- /wp:code -->

<h2 class="wp-block-heading" id="шаг-7-проверка-подписи-фиксации">Шаг 7: Проверка подписи фиксации</h2>

Проверить подпись фиксации можно с помощью следующей команды:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">git log --show-signature -1
</code></pre>
<!-- /wp:code -->

На экране появится информация о фиксации и связанной с ней GPG-подписи.

💡 ПРИМЕЧАНИЕ: вы должны находиться в каталоге, в котором запущен git.

<h2 class="wp-block-heading" id="шаг-8-настройка-других-адресов-электронной-почты">Шаг 8: Настройка других адресов электронной почты</h2>

Если вы хотите подписывать коммиты с помощью других адресов электронной почты, выполните следующие действия:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">gpg --edit-key &lt;Key ID&gt;
</code></pre>
<!-- /wp:code -->

💡 ПРИМЕЧАНИЕ: Замените на идентификатор GPG-ключа, который вы хотите экспортировать.

Эта команда откроет новый интерфейс, позволяющий добавить новые возможности

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">adduid
</code></pre>
<!-- /wp:code -->

Затем следуйте инструкциям по добавлению нового имени и адреса электронной почты. Вы также можете настроить доверие для новой идентификации.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">uid 2
</code></pre>
<!-- /wp:code -->

💡 ПРИМЕЧАНИЕ: Вы видите, что теперь отмечена другая опция.

Теперь введите команду trust и следуйте инструкциям.Пример: trust option 5 = I trust ultimately and y

После добавления дополнительных идентификаторов не забудьте сохранить изменения с помощью команды save.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">save
</code></pre>
<!-- /wp:code -->

Спасибо за прочтение!
