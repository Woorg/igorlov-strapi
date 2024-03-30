---
title: Как исправить ошибку bool object is not callable в Python
meta_title: Как исправить ошибку bool object is not callable в Python - Igor Gorlov
description: >-
  Ошибка TypeError: bool object is not callable возникает, когда вы пытаетесь
  вызвать булево значение (объект bool), как если бы это была функция!
date: 2023-02-17T06:13:00.000Z
image: ../../assets/images/undefined-Feb-17-2023.avif
categories:
  - Как пофиксить
author: Igor Gorlov
tags:
  - Python
draft: false
lastmod: 2024-03-20T21:26:44.267Z
---

Ошибка “TypeError: ‘bool’ object is not callable” возникает, когда вы пытаетесь вызвать булево значение (объект bool), как если бы это была функция!

## Вот как выглядит ошибка:

```python
Traceback (most recent call last):
  File /dwd/sandbox/test.py, line 3, in <module>
    if is_active() == true:
       ^^^^^^^^^^^
TypeError: 'bool' object is not callable
```

Проще говоря, вот что происходит:

```python
is_active = True

# ⚠️ is_active is a boolean value not a callable
if is_active() == True:
    print('User is active.')
```

Вызов булевого значения как callable - это не то, что вы делаете специально. Обычно это происходит из-за нежелательного присвоения значения. Или случайного переопределения глобального имени функции на True или False!

Чтобы исправить проблему, отследите ошибку до оператора, который изменил вашу функцию на булево значение.

Кроме того, если вы случайно поставите лишнюю скобку после встроенной или определяемой пользователем функции, которая возвращает булево значение, вы получите ошибку:

```python
# 🚫 Raises TypeError: 'bool' object is not callable
bool()()
```

В приведенном выше примере bool() возвращает False, а наличие дополнительной пары скобок аналогично False().

## Как исправить TypeError: ‘bool’ object is not callable?

Во-первых, проверьте значение соответствующей функции и выясните, как она вообще оказалась объектом boolean.

Иногда выяснить это бывает непросто. Ниже приведены три сценария, которые приводят к ошибке “TypeError: ‘bool’ object is not callable”:

Объявление переменной с именем, которое также является именем функции.  
Вызов метода, который также является именем свойства  
Вызов метода, украшенного @property

Давайте рассмотрим каждый сценарий на нескольких примерах.

Объявление переменной с именем, которое также является именем функции: Функция Python - это объект, как и любой другой встроенный объект, такой как int, float, dict, list и т.д.

Все встроенные функции определяются в модуле builtins и получают глобальное имя для облегчения доступа. Например, str() - это **builtins**.str().

Однако переопределение функции (случайное или намеренное) на другое значение технически возможно.

Например, если вы определите переменную с именем str и инициализируете ее значением boolean, она больше не будет указывать на класс str.

```python
# ⚠️ the value of the built-in function str() is changed to True
str = True
score = 15

# 🚫 Raises TypeError
print ('The score is: ' + str(score))
```

Если вы выполните приведенный выше код, Python выдаст ошибку “TypeError: ‘bool’ object is not callable”, поскольку True (новое значение str) не является вызываемым.

У вас есть два способа решить эту проблему:

Переименовать переменную str

Явно обратиться к функции str из модуля builtins (**bultins**.str).

Второй подход не рекомендуется, если вы не разрабатываете модуль. Например, если вы хотите реализовать функцию open(), которая обертывает встроенную open():

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
status = True
score = 15

print ('The score is: ' + str(score))
# Output: The score is: 15
```

⚠️ Короче говоря, вы никогда не должны использовать имя функции (встроенной или определяемой пользователем) для своих переменных!

Переопределение функций (и их последующий вызов) является одной из наиболее распространенных причин ошибки “TypeError: ‘bool’ object is not callable”. Это похоже на вызов целых чисел.

Теперь перейдем к менее распространенным ошибкам, которые приводят к этой ошибке.

Вызов метода, который также является именем свойства: Когда вы определяете свойство в конструкторе класса, оно будет затенять любой другой атрибут с тем же именем.

```python
class Book:
    def __init__(self, title, published):
        self.title = title
        self.published = published

    def published(self):
        return self.published


book = Book('Learning Python', True)

# 🚫 Raises TypeError: 'bool' object is not callable
if book.published():
    print('The book is published.')
```

В приведенном выше коде класс Book содержит свойство published, которое определяет, опубликована книга или нет. Далее, ниже, мы определили метод, также названый published.

В результате любая ссылка на published возвращает свойство, а не метод. И если вы попытаетесь вызвать это свойство, вас ожидает ошибка “TypeError: ‘bool’ object is not callable”.

Имя метода is_published звучит как более безопасная и читабельная альтернатива:

```python
class Book:
    def __init__(self, title, published):
        self.title = title
        self.published = published

    def is_published(self):
        return self.published


book = Book('Learning Python', True)

if book.is_published():
    print('The book is published.')
# Output: The book is published.
```

Вызов метода, украшенного декоратором @property: Декоратор @property превращает метод в “getter” для одноименного атрибута, доступного только для чтения.

```python
class User:
    def __init__(self, user_id, active):
        self._user_id = user_id
        self._active = active

    @property
    def active(self):
        return self._active


user = User(1, True)

# 🚫 Raises TypeError: 'bool' object is not callable
if user.active():
    print('User is active!')
```

Вам нужно получить доступ к методу getter без круглых скобок:

```python
class User:
    def __init__(self, user_id, active):
        self._user_id = user_id
        self._active = active

    @property
    def active(self):
        return self._active


user = User(1, True)

if user.active:
    print('User is active!')

# Output: User is active!
```

## Проблема решена!

Хорошо, я думаю, что все получилось! Надеюсь, это краткое руководство помогло вам решить вашу проблему.

Спасибо, что прочитали.
