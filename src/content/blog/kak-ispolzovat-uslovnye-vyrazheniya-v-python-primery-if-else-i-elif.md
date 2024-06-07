---
title: 'Как использовать условные выражения в Python - примеры if, else и elif'
meta_title: >-
  Как использовать условные выражения в Python -  примеры if, else и elif - Igor
  Gorlov
description: >-
  Условные операторы являются неотъемлемой частью программирования на Python.
  Они позволяют принимать решения на основе значений переменных или результатов
  сравнений.
date: 2023-03-07T22:29:52.000Z
author: Igor Gorlov
image: ../../assets/images/undefined-Mar-08-2023.avif
categories:
  - Учебник
tags:
  - Python
lastmod: 2024-03-20T21:26:47.591Z
---

Условные операторы являются неотъемлемой частью программирования на Python. Они позволяют принимать решения на основе значений переменных или результатов сравнений.

В этой статье мы рассмотрим, как использовать операторы if, else и elif в Python, а также примеры их практического применения.

<!-- wp:rank-math/toc-block {"title":"Оглавление","headings":[{"key":"44c09d27-62c9-456d-9835-d8ed904b1472","content":"Как использовать оператор if в Python","level":2,"link":"#как-использовать-оператор-if-в-python","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"ef55a014-a36c-4dba-bbaa-313389a4779f","content":"Как использовать оператор else в Python","level":2,"link":"#как-использовать-оператор-else-в-python","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"67f898cf-e524-402e-8d7a-54c3747b00c9","content":"Как использовать оператор elif в Python","level":2,"link":"#как-использовать-оператор-elif-в-python","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"32112d3b-066f-47fb-adb6-7a2e0f71d872","content":"Примеры использования условных утверждений","level":2,"link":"#примеры-использования-условных-утверждений","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"195b59b5-87c1-45fb-bb3a-0589fd9df028","content":"Пример 1: Проверка, является ли число четным или нечетным.","level":3,"link":"#пример-1-проверка-является-ли-число-четным-или-нечетным","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"f068baa3-b153-4722-8a9a-d5ebec900e11","content":"Пример 2: Присвоение буквенной оценки на основе числового балла","level":3,"link":"#пример-2-присвоение-буквенной-оценки-на-основе-числового-балла","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"390531d3-2f2a-4d45-9fce-14084542e3ee","content":"Пример 3: Проверка того, является ли год високосным","level":3,"link":"#пример-3-проверка-того-является-ли-год-високосным","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"78742607-d4f8-423a-97b2-86df30a8d70a","content":"Пример 4: Проверка наличия в строке определенного символа","level":3,"link":"#пример-4-проверка-наличия-в-строке-определенного-символа","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"63f0aec3-2b54-4534-9930-142e0fb6c8a7","content":"Заключение","level":2,"link":"#заключение","disable":false,"isUpdated":false,"isGeneratedLink":true}],"listStyle":"ul"} -->
<div class="wp-block-rank-math-toc-block" id="rank-math-toc"><h2>Оглавление</h2><nav><ul><li class=""><a href="#как-использовать-оператор-if-в-python">Как использовать оператор if в Python</a></li><li class=""><a href="#как-использовать-оператор-else-в-python">Как использовать оператор else в Python</a></li><li class=""><a href="#как-использовать-оператор-elif-в-python">Как использовать оператор elif в Python</a></li><li class=""><a href="#примеры-использования-условных-утверждений">Примеры использования условных утверждений</a><ul><li class=""><a href="#пример-1-проверка-является-ли-число-четным-или-нечетным">Пример 1: Проверка, является ли число четным или нечетным.</a></li><li class=""><a href="#пример-2-присвоение-буквенной-оценки-на-основе-числового-балла">Пример 2: Присвоение буквенной оценки на основе числового балла</a></li><li class=""><a href="#пример-3-проверка-того-является-ли-год-високосным">Пример 3: Проверка того, является ли год високосным</a></li><li class=""><a href="#пример-4-проверка-наличия-в-строке-определенного-символа">Пример 4: Проверка наличия в строке определенного символа</a></li></ul></li><li class=""><a href="#заключение">Заключение</a></li></ul></nav></div>
<!-- /wp:rank-math/toc-block -->

<h2 class="wp-block-heading" id="как-использовать-оператор-if-в-python">Как использовать оператор if в Python</h2>

Оператор if позволяет выполнить блок кода, если определенное условие истинно. Вот основной синтаксис:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">if condition:
    # code to execute if condition is true
</code></pre>
<!-- /wp:code -->

Условием может быть любое выражение, которое оценивается в булево значение (True или False). Если условие равно True, будет выполнен блок кода, отступ которого находится ниже оператора if. Если условие равно False, блок кода будет пропущен.

Вот пример использования оператора if для проверки положительности числа:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">num = 5

if num &gt; 0:
    print("The number is positive.")
</code></pre>
<!-- /wp:code -->

Вывод:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">The number is positive.
</code></pre>
<!-- /wp:code -->

В этом примере мы используем оператор &gt; для сравнения значения num с 0. Если num больше 0, будет выполнен блок кода, отступленный ниже оператора if, и выведено сообщение ”Число положительное.”.

<h2 class="wp-block-heading" id="как-использовать-оператор-else-в-python">Как использовать оператор else в Python</h2>

Оператор else позволяет выполнить другой блок кода, если условие if равно False. Вот основной синтаксис:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">if condition:
    # code to execute if condition is true
else:
    # code to execute if condition is false
</code></pre>
<!-- /wp:code -->

Если условие равно True, будет выполнен блок кода, отступ которого находится под оператором if, а блок кода, отступ которого находится под оператором else, будет пропущен.

Если условие равно False, будет выполнен блок кода, отступ которого находится под оператором else, а блок кода, отступ которого находится под оператором if, будет пропущен.

Вот пример использования оператора if-else для проверки того, является ли число положительным или отрицательным:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">num = -5

if num &gt; 0:
    print("The number is positive.")
else:
    print("The number is negative.")
</code></pre>
<!-- /wp:code -->

Вывод:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">The number is negative.
</code></pre>
<!-- /wp:code -->

В этом примере мы используем оператор if-else, чтобы проверить, больше ли num 0. Если да, то выводится сообщение ”Число положительное.”. Если нет (то есть num отрицательно или равно нулю), выводится сообщение ”Число отрицательное.”.

<h2 class="wp-block-heading" id="как-использовать-оператор-elif-в-python">Как использовать оператор elif в Python</h2>

Оператор elif позволяет последовательно проверять несколько условий и выполнять различные блоки кода в зависимости от того, какое условие истинно. Вот основной синтаксис:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">if condition1:
    # code to execute if condition1 is true
elif condition2:
    # code to execute if condition1 is false and condition2 is true
elif condition3:
    # code to execute if condition1 and condition2 are false, and condition3 is true
else:
    # code to execute if all conditions are false
</code></pre>
<!-- /wp:code -->

Оператор elif - это сокращение от “else if”, и его можно использовать несколько раз для проверки дополнительных условий.

Вот пример использования оператора if-elif-else для проверки того, является ли число положительным, отрицательным или нулевым:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">num = 0

if num &gt; 0:
    print("The number is positive.")
elif num &lt; 
</code></pre>
<!-- /wp:code -->

<h2 class="wp-block-heading" id="примеры-использования-условных-утверждений">Примеры использования условных утверждений</h2>

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="пример-1-проверка-является-ли-число-четным-или-нечетным">Пример 1: Проверка, является ли число четным или нечетным.</h3>

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">num = 4

if num % 2 == 0:
    print("The number is even.")
else:
    print("The number is odd.")
</code></pre>
<!-- /wp:code -->

Вывод:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">The number is even.
</code></pre>
<!-- /wp:code -->

В этом примере мы используем оператор модуля (%), чтобы проверить, делится ли num на 2.

Если остаток от деления числа num на 2 равен 0, условие num % 2 == 0 равно True, и будет выполнен блок кода, отступленный ниже оператора if. Будет выведено сообщение ”Число четное”.

Если остаток не равен 0, условие равно False, и будет выполнен блок кода, отступленный под оператором else, который выведет сообщение ”Число нечетное”.

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="пример-2-присвоение-буквенной-оценки-на-основе-числового-балла">Пример 2: Присвоение буквенной оценки на основе числового балла</h3>

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">score = 85

if score &gt;= 90:
    grade = "A"
elif score &gt;= 80:
    grade = "B"
elif score &gt;= 70:
    grade = "C"
elif score &gt;= 60:
    grade = "D"
else:
    grade = "F"

print("Your grade is:", grade)
</code></pre>
<!-- /wp:code -->

Вывод:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">Your grade is: B
</code></pre>
<!-- /wp:code -->

В этом примере мы используем оператор if-elif-else для присвоения буквенной оценки на основе числового балла.

Оператор if проверяет, больше или равен ли балл 90. Если да, то оценка устанавливается в “A”. Если нет, то первый оператор elif проверяет, больше или равен ли балл 80. Если да, то выставляется оценка “B”. Если нет, то второй оператор elif проверяет, больше или равен ли балл 70, и так далее. Если ни одно из условий не выполняется, оператор else присваивает оценку “F”.

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="пример-3-проверка-того-является-ли-год-високосным">Пример 3: Проверка того, является ли год високосным</h3>

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">year = 2000

if year % 4 == 0:
    if year % 100 == 0:
        if year % 400 == 0:
            print(year, "is a leap year.")
        else:
            print(year, "is not a leap year.")
    else:
        print(year, "is a leap year.")
else:
    print(year, "is not a leap year.")
</code></pre>
<!-- /wp:code -->

Вывод:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">2000 is a leap year.
</code></pre>
<!-- /wp:code -->

В этом примере мы используем вложенные операторы if, чтобы проверить, является ли год високосным. Год является високосным, если он делится на 4, за исключением годов, которые делятся на 100, но не делятся на 400.

Внешний оператор if проверяет, делится ли год на 4. Если да, то внутренний оператор if проверяет, делится ли он также на 100. Если да, то самый внутренний оператор if проверяет, делится ли он на 400. Если да, то будет выполнен блок кода, отступленный ниже этого оператора, который выведет сообщение ”год високосный”.

Если нет, то будет выполнен блок кода, отступленный под оператором else внутри внутреннего оператора if, который выведет сообщение ”год не високосный”.

Если год не делится на 4, будет выполнен блок кода, отступленный под оператором else внешнего оператора if, который выведет сообщение ”не високосный год”.

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="пример-4-проверка-наличия-в-строке-определенного-символа">Пример 4: Проверка наличия в строке определенного символа</h3>

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">string = "hello, world"
char = "w"

if char in string:
    print("The string contains the character", char)
else:
    print("The string does not contain the character", char)
</code></pre>
<!-- /wp:code -->

Результат:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">The string contains the character w
</code></pre>
<!-- /wp:code -->

В этом примере мы используем оператор in, чтобы проверить, присутствует ли символ char в строке string. Если да, то условие char in string равно True, и будет выполнен блок кода, отступленный ниже оператора if, который выведет сообщение ”Строка содержит символ”, а затем сам символ.

Если char не присутствует в строке, условие равно False, и блок кода, отступленный под оператором else, будет выполнен, выводя сообщение ”Строка не содержит символ”, за которым следует сам символ.

<h2 class="wp-block-heading" id="заключение">Заключение</h2>

Условные операторы (if, else и elif) являются фундаментальными конструкциями программирования, позволяющими управлять ходом выполнения программы на основе заданных вами условий. Они позволяют принимать решения в вашей программе и выполнять различный код на основе этих решений.

В этой статье мы рассмотрели несколько примеров использования этих операторов в Python, включая проверку четности или нечетности числа, присвоение буквенной оценки на основе числового балла, проверку того, является ли год високосным, и проверку того, содержит ли строка определенный символ.

Освоив эти утверждения, вы сможете создавать более мощные и универсальные программы, способные решать широкий круг задач и сценариев.

Важно помнить, что правильный отступ имеет решающее значение при использовании условных операторов в Python, поскольку он определяет, какой блок кода будет выполняться в зависимости от условия.

С практикой вы приобретете навык использования этих операторов для создания более сложных и эффективных программ на Python.
