---
title: "Как исправить SyntaxError: break outside loop в Python"
meta_title: "Как исправить SyntaxError: break outside loop в Python - Igor Gorlov"
description: "Python выдает сообщение “SyntaxError: ‘break’ outside loop” всякий раз, когда встречает оператор break вне цикла. Наиболее распространенные случаи – использование break внутри блока if (который не является частью цикла) или когда вы случайно используете его вместо return для возврата из функции."
date: 2023-02-17T06:19:47.000Z
author: Igor Gorlov
categories:
  - Как закодить
tags:
  - Python
draft: false
lastmod: 2024-06-14T16:49:03.008Z
image: ../../assets/images/undefined-Feb-17-2023.avif
---

Python выдает сообщение “SyntaxError: ‘break’ outside loop” всякий раз, когда встречает оператор break вне цикла. Наиболее распространенные случаи - использование break внутри блока if (который не является частью цикла) или когда вы случайно используете его вместо return для возврата из функции.

Вот как выглядит ошибка:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">File /dwd/sandbox/test.py, line 2
  break
  ^^^^^
SyntaxError: 'break' outside loop
</code></pre>
<!-- /wp:code -->

Оператор break - это функция потока управления, используемая для выхода из внутреннего цикла. Например, при достижении определенного значения. Это очень похоже на язык Си.

Согласно синтаксису Python, ключевое слово break применимо только внутри циклов - for и while.

Вот пример:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">values = [7, 8, 9.5, 12]

for i in values:
    # Break out of the loop if i &gt; 10
    if (i &gt; 10):
        break
    print(i)
</code></pre>
<!-- /wp:code -->

Приведенный выше код выполняет итерацию по списку и выводит значения меньше 10. Как только он достигает значения больше 10, он выходит из цикла.

Как исправить ошибку SyntaxError: ‘break’ outside loop

Ошибка “SyntaxError: ‘break’ outside loop” возникает при двух сценариях:

При использовании break внутри блока if, который не является частью цикла.При использовании break (вместо return) для возврата из функции.

Давайте посмотрим несколько примеров с их решениями.

При использовании break внутри блока if, который не является частью цикла: Одной из наиболее распространенных причин “SyntaxError: ‘break’ outside loop” является использование ключевого слова break в блоке if, который не является частью цикла:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">if item &gt; 100
  break # 🚫 SyntaxError: 'break' outside loop

# some code here
</code></pre>
<!-- /wp:code -->

Нет смысла выходить из блока if. Если условие не выполняется, код все равно не выполняется. Приведенный выше код имеет смысл, только если он находится внутри цикла:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">values = [7, 8, 9.5, 12]

for item in values:
    if (item &gt; 10):
        break
    print(i)
</code></pre>
<!-- /wp:code -->

В противном случае он будет бесполезен и одновременно будет являться ошибкой синтаксиса (SyntaxError)!

Однако, если вы хотите сохранить блок if по синтаксическим причинам, вы можете заменить ключевое слово break на ключевое слово pass.

Оператор pass ничего не делает в Python. Однако вы всегда можете использовать его, когда утверждение требуется синтаксически, но никаких действий не требуется.

При использовании break (вместо return) для возврата из функции: Другой причиной этой ошибки является случайное использование ключевого слова break (вместо return) для возврата из функции:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">def checkAge(age):
    if (age &lt; 12):
        break # 🚫 SyntaxError: 'break' outside loop

    # some code here 
</code></pre>
<!-- /wp:code -->

Чтобы вернуться из функции, вы всегда должны использовать return (со значением или без него):

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">def checkAge(age):
    if (age &lt;= 12):
        return

    # some code here
</code></pre>
<!-- /wp:code -->

Хорошо, я думаю, это поможет. Надеюсь, это краткое руководство помогло вам решить вашу проблему.

Спасибо за прочтение.
