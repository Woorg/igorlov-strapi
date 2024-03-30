---
title: Примеры программ на Python - простые примеры кода для начинающих
meta_title: Примеры программ на Python - простые примеры кода для начинающих - Igor Gorlov
description: >-
  Простые примеры кода — это отличный способ для начинающих намочить ноги и
  изучить основы программирования. В этой статье я приведу серию простых
  примеров кода, которые идеально подходят для начинающих пользователей Python.
date: 2023-03-17T23:07:03.000Z
author: Igor Gorlov
image: ../../assets/images/undefined-Mar-18-2023.avif
categories:
  - Как закодить
tags:
  - Python
draft: false
lastmod: 2024-03-20T21:26:42.623Z
---

<!-- wp:quote -->
<blockquote class="wp-block-quote">
Марк Твен сказал, что секрет успеха заключается в том, чтобы начать. Программирование может показаться сложным для новичков, но лучший способ начать — это погрузиться в него и начать писать код.
</blockquote>
<!-- /wp:quote -->

Простые примеры кода — это отличный способ для начинающих намочить ноги и изучить основы программирования. В этой статье я приведу серию простых примеров кода, которые идеально подходят для начинающих пользователей Python.

Эти примеры охватывают целый ряд концепций программирования и помогут вам заложить прочный фундамент в программировании. Если вы новичок в программировании или просто хотите подтянуть свои навыки, эти примеры кода помогут вам начать свой путь в программировании.

Если вам нужно изучить основы Python, я добавил несколько полезных ресурсов в конце этого руководства.

<!-- wp:rank-math/toc-block {"title":"Оглавление","headings":[{"key":"7f5dfbe2-b81b-471d-8ccb-0d7c92c24220","content":"Как создать игру для угадывания чисел на Python","level":2,"link":"#как-создать-игру-для-угадывания-чисел-на-python","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"16de61bf-dd9e-4210-a1aa-1ea33d419f6a","content":"Как построить простой генератор паролей на Python","level":2,"link":"#как-построить-простой-генератор-паролей-на-python","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"c3253f0e-447b-4e4e-bf6e-f8b2b7d11d6c","content":"Как создать программу проверки паролей в Python","level":2,"link":"#как-создать-программу-проверки-паролей-в-python","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"97de6289-ea3c-4061-a010-4246c9d5281a","content":"Как создать веб-скрапер в Python","level":2,"link":"#как-создать-веб-скрапер-в-python","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"524e45d5-5602-41b2-846b-693cfd5f4f65","content":"Как построить конвертер валют в Python","level":2,"link":"#как-построить-конвертер-валют-в-python","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"1d0097bf-c77e-4c49-935f-3069ed905839","content":"Заключение","level":2,"link":"#заключение","disable":false,"isUpdated":false,"isGeneratedLink":true}],"listStyle":"ul"} -->
<div class="wp-block-rank-math-toc-block" id="rank-math-toc"><h2>Оглавление</h2><nav><ul><li class=""><a href="#как-создать-игру-для-угадывания-чисел-на-python">Как создать игру для угадывания чисел на Python</a></li><li class=""><a href="#как-построить-простой-генератор-паролей-на-python">Как построить простой генератор паролей на Python</a></li><li class=""><a href="#как-создать-программу-проверки-паролей-в-python">Как создать программу проверки паролей в Python</a></li><li class=""><a href="#как-создать-веб-скрапер-в-python">Как создать веб-скрапер в Python</a></li><li class=""><a href="#как-построить-конвертер-валют-в-python">Как построить конвертер валют в Python</a></li><li class=""><a href="#заключение">Заключение</a></li></ul></nav></div>
<!-- /wp:rank-math/toc-block -->

<h2 class="wp-block-heading" id="как-создать-игру-для-угадывания-чисел-на-python">Как создать игру для угадывания чисел на Python</h2>

В этом проекте вы создадите простую игру по угадыванию чисел, которая позволит пользователю угадать случайное число от 1 до 100. Программа будет давать пользователю подсказки после каждого угадывания, указывая, было ли его угадывание слишком высоким или слишком низким, пока пользователь не угадает правильное число.

Код:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">import random

secret_number = random.randint(1, 100)

while True:
    guess = int(input("Guess the number between 1 and 100: "))
    
    if guess == secret_number:
        print("Congratulations! You guessed the number!")
        break
    elif guess &lt; secret_number:
        print("Too low! Try again.")
    else:
        print("Too high! Try again.")
</code></pre>
<!-- /wp:code -->

Пояснения:

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Начните с импорта модуля random, который позволит вам генерировать случайное число.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Сгенерируйте случайное число от 1 до 100 с помощью функции randint() из модуля random и присвойте его переменной.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Создайте цикл, позволяющий пользователю угадывать число, пока он не угадает его правильно. Внутри цикла предложите пользователю ввести его предположение с помощью функции input() и преобразуйте его в целое число с помощью функции int(). </li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Добавьте условный оператор внутри цикла, который проверяет, является ли предположение пользователя правильным, слишком высоким или слишком низким. Если угадано верно, выведите поздравительное сообщение и выйдите из цикла. Если угадано слишком много или слишком мало, выведите сообщение-подсказку, чтобы помочь пользователю правильно угадать число. </li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Запустите программу и сыграйте в игру по угадыванию чисел! </li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<h2 class="wp-block-heading" id="как-построить-простой-генератор-паролей-на-python">Как построить простой генератор паролей на Python</h2>

Генератор паролей, как следует из названия, генерирует случайный пароль определенной длины, используя различные комбинации символов и специальные знаки.

Код:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">import random
import string

def generate_password(length):
    """This function generates a random password
    of a given length using a combination of
    uppercase letters, lowercase letters,
    digits, and special characters"""
    
    # Define a string containing all possible characters
    all_chars = string.ascii_letters + string.digits + string.punctuation
    
    # Generate a password using a random selection of characters
    password = "".join(random.choice(all_chars) for i in range(length))
    
    return password

# Test the function by generating a password of length 10
password = generate_password(10)
print(password)
</code></pre>
<!-- /wp:code -->

Пояснение:

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Мы импортируем модули random и string, которые используются для генерации случайных значений и работы со строками соответственно. </li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Далее мы определяем функцию generate_password, которая принимает единственный параметр length, задающий длину пароля, который необходимо сгенерировать. </li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Внутри функции мы определяем строку all_chars, которая содержит все возможные символы, которые могут быть использованы для генерации пароля. Для создания этой строки мы используем константы string.ascii_letters, string.digits и string.punctuation. </li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Затем мы используем функцию list comprehension для создания списка случайных символов длины из строки all_chars с помощью функции random.choice(). Наконец, мы объединяем эти символы в одну строку с помощью функции "".join() и возвращаем результат. </li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Для проверки функции мы вызываем ее с аргументом 10, чтобы создать пароль длины 10 и вывести результат.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

Обратите внимание, что это очень простой генератор паролей, и он может не подойти для использования в реальных сценариях, где безопасность является проблемой.

<h2 class="wp-block-heading" id="как-создать-программу-проверки-паролей-в-python">Как создать программу проверки паролей в Python</h2>

В этом разделе мы создадим программу проверки паролей. Его задача - проверить, является ли пароль достаточно надежным, основываясь на некоторых заданных нами критериях. Он выведет ошибку, если какой-либо из критериев пароля не будет выполнен.

Код:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python"># Define a function to check if the password is strong enough
def password_checker(password):
    # Define the criteria for a strong password
    min_length = 8
    has_uppercase = False
    has_lowercase = False
    has_digit = False
    has_special_char = False
    special_chars = "!@#$%^&amp;*()-_=+[{]}\|;:',&lt;.&gt;/?"
    
    # Check the length of the password
    if len(password) &lt; min_length:
        print("Password is too short!")
        return False
    
    # Check if the password contains an uppercase letter, lowercase letter, digit, and special character
    for char in password:
        if char.isupper():
            has_uppercase = True
        elif char.islower():
            has_lowercase = True
        elif char.isdigit():
            has_digit = True
        elif char in special_chars:
            has_special_char = True
    
    # Print an error message for each missing criteria
    if not has_uppercase:
        print("Password must contain at least one uppercase letter!")
        return False
    if not has_lowercase:
        print("Password must contain at least one lowercase letter!")
        return False
    if not has_digit:
        print("Password must contain at least one digit!")
        return False
    if not has_special_char:
        print("Password must contain at least one special character!")
        return False
    
    # If all criteria are met, print a success message
    print("Password is strong!")
    return True

# Prompt the user to enter a password and check if it meets the criteria
password = input("Enter a password: ")
password_checker(password)
</code></pre>
<!-- /wp:code -->

Пояснения:

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>В этом коде мы определяем функцию password_checker(), которая принимает пароль в качестве аргумента и проверяет, соответствует ли он определенным критериям надежности. </li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Сначала мы определяем критерии надежного пароля - минимальная длина 8 символов, минимум одна заглавная буква, одна строчная буква, одна цифра и один специальный символ. </li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Если пароль не соответствует какому-либо из критериев, мы выводим сообщение об ошибке и возвращаем False, чтобы показать, что пароль недостаточно надежен. В противном случае мы выводим сообщение об успехе и возвращаем True.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Наконец, мы предлагаем пользователю ввести пароль с помощью функции input() и передаем его функции password_checker(), чтобы проверить, соответствует ли он критериям.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<h2 class="wp-block-heading" id="как-создать-веб-скрапер-в-python">Как создать веб-скрапер в Python</h2>

Веб-скрапер собирает/получает данные с веб-страниц и сохраняет их в любом нужном нам формате, будь то .csv или .txt. В этом разделе мы создадим простой веб-скрапер, используя библиотеку Python под названием Beautiful Soup.

Код:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">import requests
from bs4 import BeautifulSoup

# Set the URL of the webpage you want to scrape
url="https://www.example.com"

# Send an HTTP request to the URL and retrieve the HTML content
response = requests.get(url)

# Create a BeautifulSoup object that parses the HTML content
soup = BeautifulSoup(response.content, 'html.parser')

# Find all the links on the webpage
links = soup.find_all('a')

# Print the text and href attribute of each link
for link in links:
    print(link.get('href'), link.text)
</code></pre>
<!-- /wp:code -->

Пояснения:

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>В этом коде мы сначала импортируем модули requests и BeautifulSoup, которые используются для выполнения HTTP-запросов и разбора HTML-содержимого, соответственно. </li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Затем мы задаем URL веб-страницы, которую мы хотим соскоблить, в переменной url. </li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Затем мы используем функцию requests.get() для отправки HTTP GET-запроса на URL и получения HTML-содержимого веб-страницы в качестве ответа.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Мы создаем объект BeautifulSoup под названием soup, который анализирует HTML-содержимое ответа с помощью парсера html.parser. </li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Затем мы используем метод soup.find_all(), чтобы найти все ссылки на веб-странице и сохранить их в переменной links.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Наконец, мы используем цикл for для перебора каждой ссылки в links и выводим текст и атрибут href каждой ссылки с помощью метода link.get().</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<h2 class="wp-block-heading" id="как-построить-конвертер-валют-в-python">Как построить конвертер валют в Python</h2>

Конвертер валют - это программа, которая помогает пользователям конвертировать стоимость одной валюты в другую. Вы можете использовать его для различных целей, например, для расчета стоимости международных покупок, оценки расходов на путешествия или анализа финансовых данных.

Примечание: для получения данных об обменном курсе мы будем использовать API ExchangeRate-API, который является бесплатным API с открытым исходным кодом для курсов валют. Однако существуют и другие API, которые могут иметь различные ограничения или требования к использованию.

Код:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python"># Import the necessary modules
import requests

# Define a function to convert currencies
def currency_converter(amount, from_currency, to_currency):
    # Set the API endpoint for currency conversion
    api_endpoint = f"https://api.exchangerate-api.com/v4/latest/{from_currency}"
    
    # Send a GET request to the API endpoint
    response = requests.get(api_endpoint)
    
    # Get the JSON data from the response
    data = response.json()
    
    # Extract the exchange rate for the target currency
    exchange_rate = data["rates"][to_currency]
    
    # Calculate the converted amount
    converted_amount = amount * exchange_rate
    
    # Return the converted amount
    return converted_amount

# Prompt the user to enter the amount, source currency, and target currency
amount = float(input("Enter the amount: "))
from_currency = input("Enter the source currency code: ").upper()
to_currency = input("Enter the target currency code: ").upper()

# Convert the currency and print the result
result = currency_converter(amount, from_currency, to_currency)
print(f"{amount} {from_currency} is equal to {result} {to_currency}")
</code></pre>
<!-- /wp:code -->

Пояснения:

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>В этом коде мы определяем функцию currency_converter(), которая принимает в качестве аргументов сумму, код исходной валюты и код целевой валюты и возвращает конвертированную сумму.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Сначала мы задаем конечную точку API для конвертации валюты с помощью параметра from_currency и модуля requests для отправки GET-запроса к конечной точке.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Затем мы извлекаем обменный курс для целевой валюты из данных JSON, возвращенных API, используя параметр to_currency, и вычисляем конвертированную сумму путем умножения обменного курса на параметр amount. </li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Наконец, мы предлагаем пользователю ввести сумму, from_currency и to_currency с помощью функции input() и передаем их в функцию currency_converter() для конвертации валюты. Затем конвертированная сумма выводится на печать с использованием форматирования строки.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<h2 class="wp-block-heading" id="заключение">Заключение</h2>

Все эти проекты очень просты и легко создаются. Если вы действительно хотите улучшить свои навыки работы с Python, я бы посоветовал вам взять этот код, изменить и отредактировать его и развивать его. При желании многие из этих простых проектов можно превратить в гораздо более сложные приложения.

Счастливого кодинга!
