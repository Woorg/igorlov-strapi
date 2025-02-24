---
title: Python range() Пример функции
meta_title: Python range() Пример функции - Igor Gorlov
description: >-
  В этой статье вы узнаете, как использовать функцию range() в Python с
  некоторыми примерами кода по ходу дела.
date: 2023-03-19T22:07:12.000Z
author: Igor Gorlov
image: ../../assets/images/undefined-Mar-20-2023.avif
categories:
  - Учебник
tags:
  - Python
draft: false
lastmod: 2024-03-20T21:26:46.370Z
---

В этой статье вы узнаете, как использовать функцию range() в Python с некоторыми примерами кода по ходу дела.

Что такое функция range() в Python? Разбивка синтаксиса функции range()

Встроенная в Python функция range() в основном используется при работе с циклами for - с ее помощью вы можете перебирать определенные блоки кода заданное количество раз.

<!-- wp:rank-math/toc-block {"title":"Оглавление","headings":[{"key":"99f12ddb-6bcd-4486-b2d0-ba7bb52ef366","content":"Как использовать функцию range() только с аргументом stop","level":2,"link":"#как-использовать-функцию-range-только-с-аргументом-stop","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"9a427252-2962-4a30-9667-d55d1f661115","content":"Как использовать функцию range() с аргументами start и stop","level":2,"link":"#как-использовать-функцию-range-с-аргументами-start-и-stop","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"21b2667d-e1cb-4d06-b2fb-f6b9235bd0af","content":"Как создать список чисел с помощью функции range()","level":2,"link":"#как-создать-список-чисел-с-помощью-функции-range","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"3ffbf150-33a8-4b46-81b5-d9e1ad69a964","content":"Как использовать функцию len() с range() в Python","level":2,"link":"#как-использовать-функцию-len-с-range-в-python","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"f253006e-8efd-4cd6-949c-d8d84569f70b","content":"Заключение","level":2,"link":"#заключение","disable":false,"isUpdated":false,"isGeneratedLink":true}],"listStyle":"ul"} -->
<div class="wp-block-rank-math-toc-block" id="rank-math-toc"><h2>Оглавление</h2><nav><ul><li class=""><a href="#как-использовать-функцию-range-только-с-аргументом-stop">Как использовать функцию range() только с аргументом stop</a></li><li class=""><a href="#как-использовать-функцию-range-с-аргументами-start-и-stop">Как использовать функцию range() с аргументами start и stop</a></li><li class=""><a href="#как-создать-список-чисел-с-помощью-функции-range">Как создать список чисел с помощью функции range()</a></li><li class=""><a href="#как-использовать-функцию-len-с-range-в-python">Как использовать функцию len() с range() в Python</a></li><li class=""><a href="#заключение">Заключение</a></li></ul></nav></div>
<!-- /wp:rank-math/toc-block -->

Функция range() принимает три аргумента — один обязательный, а два необязательных.

По умолчанию синтаксис функции range() выглядит следующим образом:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">range(stop)
</code></pre>
<!-- /wp:code -->

<code class="language-range(stop)"><code class="language-range(stop)"></code></code>

Аргумент stop является обязательным.

Функция range() возвращает последовательность чисел, начинающуюся с 0, увеличивающуюся на 1 и заканчивающуюся на значении, которое вы указали в качестве stop (не включительно).

Но что если вы хотите выполнить итерацию по диапазону из двух указанных вами чисел и не хотите начинать отсчет с 0?

Вы можете передать второй необязательный аргумент start, start, чтобы указать начальное число. Синтаксис для этого выглядит следующим образом:

<code class="language-range(stop)"><code class="language-range(stop)"></code></code>

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">range(start, stop)
</code></pre>
<!-- /wp:code -->

<code class="language-range(stop)"><code class="language-range(stop)"></code></code>

Этот синтаксис генерирует последовательность чисел на основе значений start (включительно) и stop (не включительно), которые увеличиваются на 1.

И наконец, если вы не хотите, чтобы по умолчанию инкремент был равен 1, вы можете указать третий необязательный аргумент, step. Синтаксис для этого выглядит следующим образом:

<code class="language-range(stop)"><code class="language-range(stop)"></code></code>

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">range(start, stop, step)
</code></pre>
<!-- /wp:code -->

<code class="language-range(stop)"><code class="language-range(stop)"></code></code>

Этот синтаксис генерирует последовательность чисел, которая начинает отсчет с start (включительно) и увеличивается в соответствии с шагом, пока не достигнет stop (не включительно).

<h2 class="wp-block-heading" id="как-использовать-функцию-range-только-с-аргументом-stop">Как использовать функцию range() только с аргументом stop</h2>

При использовании только аргумента stop в функции range() подсчет начинается с 0 и увеличивается на 1. Подсчет останавливается при достижении значения, указанного в качестве stop.

Помните, что указанное значение stop не является полным!

Если вы укажете аргумент stop, равный 5, диапазон будет включать числа 0 - 4, а не 0 - 5 - подсчет остановится на 4, а не на 5.

Давайте посмотрим на пример ниже:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">for num in range(5):
    print(num)
    
# output 

# 0
# 1
# 2
# 3
# 4
</code></pre>
<!-- /wp:code -->

В этом примере я указал range(5).

Функция начала отсчет с 0, увеличивала на 1 на каждой итерации и закончила на 4.

<h2 class="wp-block-heading" id="как-использовать-функцию-range-с-аргументами-start-и-stop">Как использовать функцию range() с аргументами start и stop</h2>

Если вы хотите получить диапазон из двух чисел, вы используете два аргумента - start и stop. Имейте в виду, что значение start является инклюзивным, а значение stop - нет.

Если вам нужен диапазон значений от 5 включительно до 10 включительно, вы напишете range(5,11) следующим образом:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">for num in range(5,11):
  print(num)
  
# output

# 5
# 6
# 7
# 8
# 9
# 10
</code></pre>
<!-- /wp:code -->

В range() можно передавать и отрицательные целые значения:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">for num in range(-5, 1):
  print(num)

# output

# -5
# -4
# -3
# -2
# -1
# 0
</code></pre>
<!-- /wp:code -->

Следует отметить, что в range() нельзя передавать значения с плавающей точкой.

В этом примере, когда я передаю два значения с плавающей точкой в качестве аргументов, возникает ошибка:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">for num in range(5.2, 4.3):
  print(num)

# output

# Traceback (most recent call last):
#  File "main.py", line 1, in &lt;module&gt;
#    for num in range(5.2, 4.3):
# TypeError: 'float' object cannot be interpreted as an integer
</code></pre>
<!-- /wp:code -->

В качестве аргументов start и stop можно передавать как отрицательные, так и положительные целые числа.

Как использовать функцию range() с аргументами start, stop и step

По умолчанию значение инкремента равно 1 и не указывается. Однако его можно изменить, передав в функцию range() аргумент step.

Давайте рассмотрим следующий пример:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">for num in range(10,21,2):
  print(num)
  
# output

# 10
# 12
# 14
# 16
# 18
# 20
</code></pre>
<!-- /wp:code -->

В приведенном примере я создал последовательность чисел от 10 до 20 и увеличил шаги на 2. Я достиг этого, указав значение шага 2.

Следует отметить, что step может быть как отрицательным, так и положительным числом, но он не может быть равен 0.

Вот как можно сгенерировать диапазон с отрицательным аргументом step:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">for num in range(20, 11, -2):
  print(num)

# output

# 20
# 18
# 16
# 14
# 12
</code></pre>
<!-- /wp:code -->

Приведенный выше код генерирует последовательность чисел в обратном порядке.

Посмотрите, что происходит, когда шаг равен 0:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">for num in range(10, 21 0):
  print(num)

# output

#  File "main.py", line 1
#    for num in range(10, 21 0):
                            ^
# SyntaxError: invalid syntax
</code></pre>
<!-- /wp:code -->

<h2 class="wp-block-heading" id="как-создать-список-чисел-с-помощью-функции-range">Как создать список чисел с помощью функции range()</h2>

Вы можете создать список чисел, передав функцию range() в качестве аргумента конструктору list() следующим образом:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">my_numbers_list = list(range(5))

print(my_numbers_list)

# output

# [0, 1, 2, 3, 4]
</code></pre>
<!-- /wp:code -->

В приведенном выше примере я создал список чисел от 0 до 4.

<h2 class="wp-block-heading" id="как-использовать-функцию-len-с-range-в-python">Как использовать функцию len() с range() в Python</h2>

Допустим, у вас есть список элементов и вы хотите что-то сделать с элементами в зависимости от длины списка.

Для этого вы можете использовать функцию range() и передать ей в качестве аргумента длину списка.

Чтобы вычислить длину списка, используйте функцию len().

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">programming_languages = ["Python", "JavaScript", "Java", "C++"]

programming_languages_length = len(programming_languages)

for languages in range(programming_languages_length):
  print("Hello World")
  
# output

# Hello World
# Hello World
# Hello World
# Hello World
</code></pre>
<!-- /wp:code -->

<h2 class="wp-block-heading" id="заключение">Заключение</h2>

Вот и все! Теперь вы знаете, как использовать функцию range() в Python.

Спасибо, что дочитали, и счастливого кодинга!
