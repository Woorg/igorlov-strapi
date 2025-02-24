---
title: Преобразование строки Python в дату с помощью Strptime
meta_title: Преобразование строки Python в дату с помощью Strptime - Igor Gorlov
description: >-
  Python предлагает множество встроенных модулей, которые вы можете включить в
  свою программу. Модуль — это файл Python, содержащий код, необходимый для
  выполнения отдельной функции.
date: 2023-02-25T16:42:17.000Z
author: Igor Gorlov
image: ../../assets/images/undefined-Feb-25-2023.avif
categories:
  - Как закодить
tags:
  - Python
draft: false
lastmod: 2024-03-20T21:26:44.462Z
---

Python предлагает множество встроенных модулей, которые вы можете включить в свою программу.

Модуль — это файл Python, содержащий код, необходимый для выполнения отдельной функции. Этот файл импортируется в ваше приложение, чтобы помочь вам выполнить определенную задачу.

Одним из таких модулей является модуль datetime для работы и манипулирования временем и датами.

Модуль datetime включает класс datetime, который, в свою очередь, предоставляет метод класса strptime(). Метод strptime() создает объект datetime из строкового представления соответствующей даты и времени.

В этой статье вы узнаете, как использовать метод datetime.strptime() для преобразования строк в объекты datetime.

<!-- wp:rank-math/toc-block {"title":"Оглавление","headings":[{"key":"e967d4f0-3f05-4e2f-938f-976a3e18089c","content":"Давайте же приступим!","level":2,"link":"#давайте-же-приступим","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"2cdfc7dc-a167-45a3-8f60-5b29624966f8","content":"Как мне этого добиться?","level":2,"link":"#как-мне-этого-добиться","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"4e6a7fb3-c603-462b-af5b-8d0c4ae6b56f","content":"Как преобразовать строку в объект datetime.date() в Python","level":2,"link":"#как-преобразовать-строку-в-объект-datetime-date-в-python","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"5875ea97-c7ab-484f-a228-18f5d057491c","content":"Как преобразовать строку в объект datetime.time() в Python","level":2,"link":"#как-преобразовать-строку-в-объект-datetime-time-в-python","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"c490d0af-3e9d-4a36-ad2b-e3b13981463a","content":"Заключение","level":2,"link":"#заключение","disable":false,"isUpdated":false,"isGeneratedLink":true}],"listStyle":"ul"} -->
<div class="wp-block-rank-math-toc-block" id="rank-math-toc"><h2>Оглавление</h2><nav><ul><li class=""><a href="#давайте-же-приступим">Давайте же приступим!</a></li><li class=""><a href="#как-мне-этого-добиться">Как мне этого добиться?</a></li><li class=""><a href="#как-преобразовать-строку-в-объект-datetime-date-в-python">Как преобразовать строку в объект datetime.date() в Python</a></li><li class=""><a href="#как-преобразовать-строку-в-объект-datetime-time-в-python">Как преобразовать строку в объект datetime.time() в Python</a></li><li class=""><a href="#заключение">Заключение</a></li></ul></nav></div>
<!-- /wp:rank-math/toc-block -->

<h2 class="wp-block-heading" id="давайте-же-приступим">Давайте же приступим!</h2>

Что такое метод datetime.strptime() в Python? Разбивка синтаксиса метода datetime.strptime()

Общий синтаксис метода datetime.strptime() выглядит примерно следующим образом:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">datetime.strptime(date_string, format_code)</code></pre>
<!-- /wp:code -->

Давайте разберемся.

Во-первых, datetime - это имя класса.

Затем, strptime() - это имя метода. Метод принимает два обязательных строковых аргумента.

Первым обязательным аргументом является date_string - строковое представление даты, которую вы хотите преобразовать в объект datetime.<br>Вторым обязательным аргументом является format_code - определенный формат, который поможет вам преобразовать строку в объект времени.

Ниже приведен краткий список наиболее часто используемых форматов кода, с которыми вы можете столкнуться:

%d - день месяца в виде десятичного числа с нулевой добавкой, например 28.<br>%a - сокращенное название дня, например Sun.<br>%A - полное название дня, например воскресенье.<br>%m - месяц в виде десятичного числа с нулевой добавкой, например 01.<br>%b - сокращенное название месяца, например, янв.<br>%B - полное название месяца, например, январь.<br>%y - год без века, например 23.<br>%Y - год с веком, например 2023.<br>%H - часы дня в 24-часовом формате, например 08.<br>%I - часы дня в 12-часовом формате.<br>%M - минуты в часе, например 20.<br>%S - секунды в минуте, например 00.

Чтобы просмотреть таблицу с кодами формата для функции datetime.strptime(), обратитесь к документации по Python.

Как использовать метод datetime.strptime() в Python? Как преобразовать строку в объект времени в Python

Допустим, у меня есть следующая строка, которая представляет собой дату и время:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">28/01/23  08:20:00</code></pre>
<!-- /wp:code -->

И я хочу получить следующий результат:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">2023-01-28 08:20:00</code></pre>
<!-- /wp:code -->

<h2 class="wp-block-heading" id="как-мне-этого-добиться">Как мне этого добиться?</h2>

Давайте посмотрим на приведенный ниже код:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python"># import the datetime class from the datetime module
from datetime import datetime

date_time_str = "28/01/23  08:20:00"

# check data type of date_time_str
print(type(date_time_str))

# output

# &lt;class 'str'&gt;
</code></pre>
<!-- /wp:code -->

Сначала я импортирую модуль datetime с помощью оператора from datetime import datetime.

Затем я сохраняю строку, которую хочу преобразовать в объект datetime, в переменной с именем date_time_str и проверяю ее тип с помощью функции type(). Результат показывает, что это строка.

Теперь преобразуем строку в объект datetime с помощью метода strptime() класса datetime и проверим тип данных:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">from datetime import datetime

date_time_str = "28/01/23  08:20:00"

date_time_object = datetime.strptime(date_time_str, "%d/%m/%y %H:%M:%S")

print(date_time_object)

# check date_time_object_type
print(type(date_time_object))

# output

# 2023-01-28 08:20:00
# &lt;class 'datetime.datetime'&gt;
</code></pre>
<!-- /wp:code -->

Коды формата для строки 28/01/23 08:20:00 - %d/%m/%y %H:%M:%S.

Коды формата %d,%m,%y,%H,%M,%S представляют день месяца, месяц как десятичное число с нулевой добавкой, год без века, час дня, минуты дня и секунды дня соответственно.

Теперь давайте немного изменим исходную строку.

Изменим ее с 28/01/23 на 28 января 2023 года и проверим тип данных date_time_str:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">from datetime import datetime

date_time_str = "28 January 2023 08:20:00"

#check data type
print(type(date_time_str))

# output

# &lt;class 'str'&gt;
</code></pre>
<!-- /wp:code -->

Теперь давайте преобразуем date_time_str в объект datetime - имейте в виду, что поскольку строка отличается, вы также должны изменить коды формата:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">from datetime import datetime

date_time_str = "28 January 2023 08:20:00"

date_object = datetime.strptime(date_time_str, "%d %B %Y %H:%M:%S")

print(date_object)

#check data type
print(type(date_object))

# output

# 2023-01-28 08:20:00
# &lt;class 'datetime.datetime'&gt;
</code></pre>
<!-- /wp:code -->

Коды формата для строки 28 января 2023 года 08:20:00 - %d %B %Y %H:%M:%S.

Поскольку я изменил месяц января с десятичного представления числа с нулевым добавлением, 01, на его полное название, январь, мне также нужно было изменить его форматный код - с %m на %B.

<h2 class="wp-block-heading" id="как-преобразовать-строку-в-объект-datetime-date-в-python">Как преобразовать строку в объект datetime.date() в Python</h2>

Что если вам нужно преобразовать только дату, но не время из строки?

Возможно, вам нужно преобразовать в объект только часть 28/01/23 строки 28/01/23 08:20:00.

Чтобы преобразовать строку в объект даты, вы будете использовать метод strptime(), как вы видели в предыдущем разделе, но вы также будете использовать метод datetime.date() для извлечения только даты.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">from datetime import datetime

date_time_str = "28 January 2023 08:20:00"

date_object = datetime.strptime(date_time_str, "%d %B %Y %H:%M:%S").date()

print(date_object)

#check data type
print(type(date_object))

# output

# 2023-01-28
# &lt;class 'datetime.date'&gt;
</code></pre>
<!-- /wp:code -->

<h2 class="wp-block-heading" id="как-преобразовать-строку-в-объект-datetime-time-в-python">Как преобразовать строку в объект datetime.time() в Python</h2>

А чтобы преобразовать только часть времени,08:20:00 из строки 28/01/23 08:20:00, вы будете использовать метод datetime.time() для извлечения только времени:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">from datetime import datetime

date_time_str = "28 January 2023 08:20:00"

date_object = datetime.strptime(date_time_str, "%d %B %Y %H:%M:%S").time()

print(date_object)
print(type(date_object))

# output

# 08:20:00
# &lt;class 'datetime.time'&gt;
</code></pre>
<!-- /wp:code -->

Почему при использовании метода datetime.strptime() в Python возникает ошибка ValueError?

Следует помнить, что строка, которую вы передаете в качестве аргумента методу strptime(), должна иметь определенный формат - не любая строка будет преобразована в объект datetime.

В частности, год, месяц и день в строке должны соответствовать коду формата.

Например, код формата для месяца в строке 28/01/23 должен быть %m, который представляет месяц как десятичное число с нулевой добавкой.

Что произойдет, если вместо этого использовать код формата %B?

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">from datetime import datetime

date_time_str = "28/01/23  08:20:00"

date_time_object = datetime.strptime(date_time_str, "%d/%B/%y %H:%M:%S")

print(date_time_object)

# output

# raise ValueError("time data %r does not match format %r" %
# ValueError: time data '28/01/23  08:20:00' does not match format '%d/%B/%y # %H:%M:%S'
</code></pre>
<!-- /wp:code -->

Я получаю ошибку ValueError!

Код формата %B представляет полное название месяца, например, январь, а не 01.

Поэтому, если строка, переданная в strptime(), не соответствует указанному формату, возникает ошибка ValueError.

Чтобы помочь в этом, вы можете проверить и обработать ошибку с помощью блока try-except, например, так:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">from datetime import datetime

date_time_str = "28/01/23  08:20:00"

try:
  date_time_object = datetime.strptime(date_time_str, "%d/%B/%y %H:%M:%S")
except ValueError as error:
  print('A ValueError is raised because :', error)
  
# output

# A ValueError is raised because : time data '28/01/23  08:20:00' does not # match format '%d/%B/%y %H:%M:%S'
</code></pre>
<!-- /wp:code -->

<h2 class="wp-block-heading" id="заключение">Заключение</h2>

Надеемся, эта статья помогла вам понять, как преобразовать строку в объект времени в Python с помощью метода strptime().

Спасибо за чтение, и удачного кодинга!
