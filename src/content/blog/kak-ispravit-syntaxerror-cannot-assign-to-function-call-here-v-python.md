---
title: 'Как исправить SyntaxError: cannot assign to function call here в Python'
meta_title: >-
  Как исправить SyntaxError: cannot assign to function call here в Python - Igor
  Gorlov
description: >-
  Python выдает сообщение SyntaxError: cannot assign to function call here.
  Возможно, вы имели в виду == вместо =?, когда вызов функции является операндом
  левой стороны в присваивании значения:
date: 2023-02-25T19:45:02.000Z
author: Igor Gorlov
image: ../../assets/images/undefined-Feb-25-2023.avif
categories:
  - Как закодить
tags:
  - Python
draft: false
lastmod: 2024-03-20T21:26:46.317Z
---

Python выдает сообщение “SyntaxError: cannot assign to function call here. Возможно, вы имели в виду ’==’ вместо '='?”, когда вызов функции является операндом левой стороны в присваивании значения:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="php" class="language-php"># Raises 🚫 SyntaxError
f() = 23
</code></pre>
<!-- /wp:code -->

Python также предоставляет вам подсказку, предполагая, что вы хотели использовать оператор равенства (==):

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">File /dwd/sandbox/test.py, line 4
  my_func() = 12
  ^^^^^^^^
SyntaxError: cannot assign to function call here. Maybe you meant '==' instead of '='?
</code></pre>
<!-- /wp:code -->

Чаще всего причиной является опечатка в коде - обычно пропущенное =.

<h2 class="wp-block-heading">Как исправить "SyntaxError: cannot assign to function call"</h2>

Длинная ошибка “SyntaxError: cannot assign to function call here. Возможно, вы имели в виду ’==’ вместо '='?” возникает при различных сценариях:

Использование оператора присваивания (=) вместо оператора равенства (==)Неправильный операнд левой стороныНеполное понимание списка

Рассмотрим несколько примеров.

Использование оператора присваивания (=) вместо оператора равенства (==): Одна из наиболее распространенных причин этой ошибки SyntaxError - использование оператора присваивания (=) вместо оператора равенства (==) при сравнении значений:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">def my_func():
    return 12

# 🚫 SyntaxError
if my_func() = 12:
    print ('Passed')
</code></pre>
<!-- /wp:code -->

В приведенном выше примере мы пытаемся сравнить возвращаемое значение my_func() со значением 12. Однако оператор = не является оператором сравнения.

Чтобы исправить ошибку, вместо него мы используем оператор равенства (==):

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">def my_func():
    return 12

if my_func() == 12:
    print ('Passed')

# Output: Passed
</code></pre>
<!-- /wp:code -->

Неправильный операнд левой стороны (в операторах присваивания): Операторы присваивания связывают имена со значениями. (например, возраст = 25).

Согласно синтаксису и семантике Python, левая часть оператора присваивания (=) всегда должна быть идентификатором - произвольным именем, которое вы выбираете для конкретного значения (оно же переменная). Например, возраст - 25 лет.

Однако если в качестве операнда левой стороны используется вызов функции, вы получите сообщение “SyntaxError: cannot assign to function call here. Возможно, вы имели в виду ’==’ вместо '='?”.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">def get_age():
    return 25

# 🚫 SyntaxError
get_age() = age
</code></pre>
<!-- /wp:code -->

Если ваш код выглядит так, как показано выше, поменяйте сторону:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">def get_age():
    return 25

age = get_age()
</code></pre>
<!-- /wp:code -->

Неполное понимание списка: Запутанный сценарий, который приводит к этой SyntaxError, - это неправильный оператор понимания списка.

Обычно мы используем осмысление списка для создания списка, каждый элемент которого является результатом операции, примененной к каждому члену другой последовательности или итерабельной переменной.

Представьте, что у вас есть объект диапазона от 1 до 10, и вы хотите вычислить квадратный корень из каждого элемента и сохранить их в отдельном списке.

Оператор list comprehension состоит из скобок, содержащих выражение (например, x\*\*2), за которым следует предложение for (например, for x in range(1, 10)).

Мы можем реализовать приведенный выше пример следующим образом:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">squares = [x**2 for x in range(1, 10)]

print(squares)
# Output: [1, 4, 9, 16, 25, 36, 49, 64, 81]
</code></pre>
<!-- /wp:code -->

В приведенном выше примере x\*\*2 применяется к каждому элементу в нашем диапазоне. Теперь, если вы случайно замените ключевое слово for на in, вы получите следующее SyntaxError:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python"># 🚫 SyntaxError
squares = [x**2 in x for range(1, 10)]

print(squares)
</code></pre>
<!-- /wp:code -->

Причина в том, что все, что следует за for, должно быть переменной, которая хранит текущий элемент на каждой итерации.

Хорошо, я думаю, что все получилось. Надеюсь, это краткое руководство помогло вам решить вашу проблему.

Спасибо за прочтение.
