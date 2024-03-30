---
title: Как исправить ошибку int object is not callable в Python
meta_title: Как исправить ошибку int object is not callable в Python - Igor Gorlov
description: >-
  Ошибка TypeError: int'object is not callable возникает, когда вы пытаетесь
  вызвать целое число (объект int), как если бы это была функция!
date: 2023-01-29T03:20:00.000Z
image: ../../assets/images/undefined-Jan-29-2023.avif
categories:
  - Как пофиксить
author: Igor Gorlov
tags:
  - Python
draft: false
lastmod: 2024-03-20T21:26:43.878Z
---

Ошибка “TypeError: ‘int’ object is not callable” возникает, когда вы пытаетесь вызвать целое число (объект int), как если бы это была функция!

Вот как выглядит ошибка

```python
Traceback (most recent call last):
 File "/dwd/sandbox/test.py", line 4, in
  round = round(result)
          ^^^^^^^^^^^^^
TypeError: 'int' object is not callable
```

Проще говоря, вот что происходит:

```python
result = 33 / 5
round = round(result)
# ⚠️ The value of round is 7 from now on
# it's no longer pointing to the round() built-in function

result = 34 / 8

# ⛔ Calling round at this point is equivalent to calling 7()
round = round(result)
```

Кроме того, если после такой функции, как round(), поставить дополнительную круглую скобку, вы получите ту же ошибку TypeError:

```python
print(round(14.5)())
```

Причина в том, что функция round() возвращает объект int, а наличие лишней пары скобок означает вызов возвращаемого значения.

Как исправить TypeError: ‘int’ object is not callable?

Эта ошибка возникает при различных сценариях:

Объявление переменной с именем, которое также является именем функции  
Вызов метода, который также является именем свойства  
Вызов метода, украшенного @property  
Отсутствие математического оператора

Давайте рассмотрим каждый сценарий на примерах.

Объявление переменной с именем, которое также является именем функции: Функция Python - это объект, как и любой другой встроенный объект, такой как int, float, dict, list и т.д.

Все встроенные функции определяются в модуле builtins и получают глобальное имя для облегчения доступа. Например, sum() относится к функции \_\_builtins\_\_.sum().

Однако переопределение функции (случайное или намеренное) на другое значение технически возможно.

Например, если вы определите переменную с именем sum и инициализируете ее целым значением, sum больше не будет указывать на класс sum.

```python
# this overrides the sum value to 0
sum = 0
values = [34, 43, 2, 8, 1]

# ⛔ Raises TypeError: 'int' object is not callable
sum = sum(values)
```

Если вы выполните приведенный выше код, Python выдаст ошибку “TypeError: ‘int’ object is not callable”, поскольку 0 (новое значение sum) не является вызываемым.

У вас есть два способа решить эту проблему:

1. Переименовать переменную sum
2. Явно обратиться к функции sum() из модуля builtins (\_\_bultins\_\_.sum).

Второй подход не рекомендуется, если вы не разрабатываете модуль. Например, если вы хотите реализовать функцию open(), которая оборачивает встроенную open():

```python
# Custom open() function using the built-in open() internally
def open(filename):
     # ...
     __builtins__.open(filename, 'w', opener=opener)
     # ...
```

Почти во всех других случаях следует избегать именования переменных как существующих функций и методов. Но если вы это сделали, переименование переменной решит проблему.

Таким образом, приведенный выше пример можно исправить следующим образом:

```python
sum_of_values = 0
values = [34, 43, 2, 8, 1]

sum_of_values = sum(values)
print(sum_of_values)
# output: 88
```

Вот еще один пример с использованием встроенной функции max():

```python
max = 0
items = [1, 45, 54, 165, 0, 2]

# ⛔ Raises "TypeError: 'int' object is not callable"
max = max(items)
```

И чтобы исправить это, мы переименуем имя переменной max в max_value:

```python
max_value = 0
items = [1, 45, 54, 165, 0, 2]

max_value = max(items)
print('The biggest number is:', max_value)
# output: The biggest number is: 165
```

⚠️ Короче говоря, вы никогда не должны использовать имя функции (встроенной или определяемой пользователем) для своих переменных!

Переопределение функций (и их последующий вызов) является наиболее распространенной причиной ошибки “TypeError: ‘int’ object is not callable”.

Теперь перейдем к менее распространенным ошибкам, которые приводят к этой ошибке.

Вызов метода, который также является именем свойства: Когда вы определяете свойство в конструкторе класса, все дальнейшие объявления с тем же именем (например, методы) будут игнорироваться.

```python
class Book:
    def __init__(self, book_code, book_title):
        self.title = book_title
        self.code = book_code

    def code(self):
        return self.code

book = Book(1, 'Head First Python')

# ⛔ Raises "TypeError: 'int' object is not callable"
print(book.code())
```

В приведенном выше примере, поскольку у нас есть свойство с именем code, метод code() игнорируется. В результате любая ссылка на code вернет свойство code. Очевидно, что вызов code() подобен вызову 1(), который вызывает ошибку “TypeError: ‘int’ object is not callable”.

Чтобы исправить эту ошибку TypeError, нам нужно изменить имя метода:

```python
class Book:
    def __init__(self, book_code, book_title):
        self.title = book_title
        self.code = book_code

    def get_code(self):
        return self.code

book = Book(1, 'Head First Python')
print(book.get_code())
```

Вызов метода, украшенного декоратором @property: Декоратор @property превращает метод в “getter” для одноименного атрибута, доступного только для чтения.

```python
class Book:
    def __init__(self, book_code, book_title):
        self._title = book_title
        self._code = book_code

    @property
    def code(self):
        """Get the book code"""
        return self._code

book = Book(1, 'Head First Python')

# ⛔ Raises "TypeError: 'int' object is not callable"
print(book.code())
```

Вам нужно получить доступ к методу getter без круглых скобок:

```python
book = Book(1, 'Head First Python')

print(book.code)
# Output: 1
```

Отсутствие математического оператора: В алгебре мы можем убрать оператор умножения, чтобы избежать двусмысленности в наших выражениях. Например, a × b может быть ab, или a × (b + c) может стать a(b + c).

Но только не в Python!

В приведенном выше примере, если убрать оператор умножения в a \* (b + c), интерпретатор Python посчитает это вызовом функции! А так как значение a является числовым (в данном случае целое число), он выдаст ошибку “TypeError: ‘int’ object is not callable”.

Поэтому если в вашем коде есть что-то подобное:

```python
a = 12
b = 3
c = 6

# ⛔ raises  TypeError: 'int' object is not callable
result = a (b + c)
```

Вы должны изменить его таким образом:

```python
a = 12
b = 3
c = 6

result = a * (b + c)

print(result)
# output: 108
```

Проблема решена!

Хорошо, я думаю, что все получилось! Надеюсь, это краткое руководство помогло вам решить вашу проблему.

Спасибо за прочтение.
