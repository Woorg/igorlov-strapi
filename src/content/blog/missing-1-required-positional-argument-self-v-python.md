---
title: 'Missing 1 required positional argument: self в Python'
meta_title: 'Missing 1 required positional argument: self в Python - Igor Gorlov'
description: >-
  Ошибка Python TypeError: missing 1 required positional argument: ‘self’ обычно
  возникает, если вы вызываете метод непосредственно на классе – а не на
  экземпляре этого класса.
date: 2023-02-26T15:47:11.000Z
author: Igor Gorlov
image: ../../assets/images/undefined-Feb-26-2023.avif
categories:
  - Как закодить
tags:
  - Python
draft: false
lastmod: 2024-03-20T21:26:47.214Z
---

Ошибка Python TypeError: missing 1 required positional argument: ‘self’ обычно возникает, если вы вызываете метод непосредственно на классе - а не на экземпляре этого класса.

Вот как выглядит ошибка:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">Traceback (most recent call last):
 File /dwd/sandbox/test.py, line 9, in &lt;module&gt;
  print(movie.get_title())
     ^^^^^^^^^^^^^^^^^
TypeError: Movie.get_title() missing 1 required positional argument: self
</code></pre>
<!-- /wp:code -->

Когда вы вызываете метод на объекте Python, в качестве первого аргумента ему неявно передается параметр (условно названный self).

Параметр self представляет собой состояние объекта и эквивалентен ключевому слову this в JavaScript, PHP и C++.

Поэтому всегда следует резервировать первый параметр нестатических методов для экземпляра объекта.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">class Movie:
    # self defined as the first parameter for the constructor 
    def __init__ (self, name):
        self.name = name

    def get_title(self):
        return self.name
</code></pre>
<!-- /wp:code -->

В отличие от аргументов ключевых слов, в Python порядок позиционных аргументов имеет значение, и вам придется передавать их соответствующему методу в том порядке, в котором они определены.

Если вы вызовете метод get_title() непосредственно на классе Movie, экземпляр объекта (self) не будет передан ему. А поскольку он ожидает его, Python выдаст ошибку “TypeError: missing 1 required positional argument: ‘self’”.

Чтобы исправить это, инстанцируйте класс и вызовите свой метод на инстанцированном объекте. И ошибка исчезнет.

В качестве альтернативы вы можете использовать статические методы, если вам не нужен параметр self.

Давайте разберемся немного глубже.

Как исправить отсутствие 1 необходимого позиционного аргумента: ‘self’

Как упоминалось ранее, есть два варианта исправления ошибки:

Инстанцировать класс<br>Использовать статические методы

Давайте рассмотрим каждый подход на примерах.

Инстанцировать класс: Параметр self передается методам только в том случае, если они вызываются на объекте. Тем не менее, вы можете исправить ошибку, инстанцировав класс и вызвав метод на экземпляре объекта.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">class Movie:
    def __init__ (self, name):
        self.name = name

    def get_title(self):
        return self.name

movie = Movie()
print(movie.get_title())
</code></pre>
<!-- /wp:code -->

Или без хранения экземпляра объекта в переменной:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python"># Instantiating the class without storing the instance
print(Movie().get_title())
</code></pre>
<!-- /wp:code -->

Используйте статические методы: Если в вашем методе нет ссылки на параметр self, вы можете сделать его статическим. В результате вы сможете вызывать его непосредственно в классе:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">class Movie:
    def __init__ (self, name):
        self.name = name

    @staticmethod
    def play_movie():
        return 'playing ...'

print(Movie.play_movie())
</code></pre>
<!-- /wp:code -->

Обратите внимание, что вам необходимо удалить self в определении метода. В противном случае метод будет продолжать ожидать параметр self.

Вот так можно исправить ошибку этого типа! Надеюсь, это краткое руководство помогло вам решить проблему.

Спасибо за прочтение.
