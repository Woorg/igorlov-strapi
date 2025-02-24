---
title: 'Python скрипты автоматизации, которые вам стоит освоить'
meta_title: 'Python скрипты автоматизации, которые вам стоит освоить - Igor Gorlov'
description: >-
  У каждого из нас есть те самые старые скучные задачи, которые мы выполняем
  снова и снова. К счастью, мы можем автоматизировать некоторые из этих
  процессов,...
date: 2023-02-06T11:36:00.000Z
image: ../../assets/images/undefined-Feb-06-2023.avif
categories:
  - Как закодить
author: Igor Gorlov
tags:
  - Python
draft: false
lastmod: 2024-03-20T21:26:46.683Z
---

<!-- wp:rank-math/toc-block {"title":"Оглавление","headings":[{"key":"f38145ee-e5d7-4c2e-9889-d339798a9e2d","content":"Как автоматизировать вычитку в Python","level":2,"link":"#как-автоматизировать-вычитку-в-python","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"5d6669ba-00e2-4598-9d36-244b431793f3","content":"Как автоматизировать воспроизведение случайной музыки","level":2,"link":"#как-автоматизировать-воспроизведение-случайной-музыки","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"087bd649-f400-4cc5-a7d9-5a8a7333bd64","content":"Автоматический конвертер PDF в CSV","level":2,"link":"#автоматический-конвертер-pdf-в-csv","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"bd821d6b-40a8-4b7f-b3b0-d6540060d0d4","content":"Автоматический фотокомпрессор","level":2,"link":"#автоматический-фотокомпрессор","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"b692dce8-56ed-41c9-b107-db02d3a24bc4","content":"Автоматический загрузчик видео с YouTube","level":2,"link":"#автоматический-загрузчик-видео-с-you-tube","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"1543cdd2-5c72-4f13-ad1e-9c3b97137d1f","content":"Автоматический перевод текста в речь","level":2,"link":"#автоматический-перевод-текста-в-речь","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"ecf30567-7e08-46ae-87b7-4d50a79dc07f","content":"Как автоматически конвертировать изображения в PDF","level":2,"link":"#как-автоматически-конвертировать-изображения-в-pdf","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"f94daf19-d867-4f74-a332-67ad04cc2a1e","content":"Как преобразовать одно изображение в PDF:","level":3,"link":"#как-преобразовать-одно-изображение-в-pdf","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"1cf05187-b7cd-48d7-a915-17d3916ffd89","content":"Как преобразовать несколько изображений в PDF:","level":3,"link":"#как-преобразовать-несколько-изображений-в-pdf","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"c8f5e756-2589-48ee-9718-cf3f4170f68c","content":"Автоматическая проверка на плагиат","level":2,"link":"#автоматическая-проверка-на-плагиат","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"01983ca0-0b99-414f-be73-93dff247a60f","content":"Как сделать URL-адреса короче","level":2,"link":"#как-сделать-url-адреса-короче","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"697b5b78-5c4e-4f4f-8689-a43e24970841","content":"Тестер скорости интернета","level":2,"link":"#тестер-скорости-интернета","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"3d00e7a6-dff3-4eff-bc2f-5776e81f3278","content":"Заключение","level":2,"link":"#заключение","disable":false,"isUpdated":false,"isGeneratedLink":true}],"listStyle":"ul"} -->
<div class="wp-block-rank-math-toc-block" id="rank-math-toc"><h2>Оглавление</h2><nav><ul><li class=""><a href="#как-автоматизировать-вычитку-в-python">Как автоматизировать вычитку в Python</a></li><li class=""><a href="#как-автоматизировать-воспроизведение-случайной-музыки">Как автоматизировать воспроизведение случайной музыки</a></li><li class=""><a href="#автоматический-конвертер-pdf-в-csv">Автоматический конвертер PDF в CSV</a></li><li class=""><a href="#автоматический-фотокомпрессор">Автоматический фотокомпрессор</a></li><li class=""><a href="#автоматический-загрузчик-видео-с-you-tube">Автоматический загрузчик видео с YouTube</a></li><li class=""><a href="#автоматический-перевод-текста-в-речь">Автоматический перевод текста в речь</a></li><li class=""><a href="#как-автоматически-конвертировать-изображения-в-pdf">Как автоматически конвертировать изображения в PDF</a><ul><li class=""><a href="#как-преобразовать-одно-изображение-в-pdf">Как преобразовать одно изображение в PDF:</a></li><li class=""><a href="#как-преобразовать-несколько-изображений-в-pdf">Как преобразовать несколько изображений в PDF:</a></li></ul></li><li class=""><a href="#автоматическая-проверка-на-плагиат">Автоматическая проверка на плагиат</a></li><li class=""><a href="#как-сделать-url-адреса-короче">Как сделать URL-адреса короче</a></li><li class=""><a href="#тестер-скорости-интернета">Тестер скорости интернета</a></li><li class=""><a href="#заключение">Заключение</a></li></ul></nav></div>
<!-- /wp:rank-math/toc-block -->

У каждого из нас есть те самые старые скучные задачи, которые мы выполняем снова и снова. К счастью, мы можем автоматизировать некоторые из этих процессов, чтобы сосредоточиться на других вещах, которые действительно требуют нашей энергии и внимания.

В этой статье мы поговорим о некоторых скриптах автоматизации Python, которые вы можете легко использовать для выполнения задач автоматизации. Важно понимать, что все они представляют собой готовые коды, которые могут помочь нам справиться со многими ежедневными повторяющимися задачами.

Я настоятельно рекомендую вам иметь некоторый предварительный опыт работы с языком программирования Python, прежде чем продолжить чтение этой статьи.

Ну что, начнем?

<h2 class="wp-block-heading" id="как-автоматизировать-вычитку-в-python">Как автоматизировать вычитку в Python</h2>

Первое в списке - это корректура. Если вы хотите устранить грамматические и орфографические ошибки в своем тексте, вы можете попробовать этот проект, в котором используется модуль Lmproof.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python"># Python Proofreading
# pip install lmproof
import lmproof
def proofread(text):
    proofread = lmproof.load("en")
    correction = proofread.proofread(text)
    print("Original: {}".format(text))
    print("Correction: {}".format(correction))
    
proofread("Your Text")</code></pre>
<!-- /wp:code -->

Во-первых, вам нужно установить библиотеку lmproof для этой автоматизации. Затем вы можете использовать функцию proofread(), которая принимает текст в качестве параметра. Функция запускается и печатает исходный текст, который был передан в функцию, а также исправленный текст. Ее можно использовать для быстрой вычитки эссе или короткой статьи.

<h2 class="wp-block-heading" id="как-автоматизировать-воспроизведение-случайной-музыки">Как автоматизировать воспроизведение случайной музыки</h2>

Во время работы многие разработчики любят слушать музыку. Поэтому для любителей музыки (вроде меня) этот скрипт случайным образом выбирает песню из папки с песнями и проигрывает ее с помощью модулей OS и random в Python.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">import random, os
music_dir="E:\\music diretory"
songs = os.listdir(music_dir)

song = random.randint(0,len(songs))

# Prints The Song Name
print(songs[song])  

os.startfile(os.path.join(music_dir, songs[0])) </code></pre>
<!-- /wp:code -->

Код обращается к музыкальному каталогу, содержащему все песни, которые вы хотите воспроизвести, и помещает их все в список. Затем он случайным образом проигрывает каждую песню одну за другой. Файл os.startfile воспроизводит песню.

<h2 class="wp-block-heading" id="автоматический-конвертер-pdf-в-csv">Автоматический конвертер PDF в CSV</h2>

Иногда вам нужно преобразовать данные pdf в данные CSV (значения, разделенные запятыми), чтобы использовать их для дальнейшего анализа. В таких случаях может пригодиться этот скрипт.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">import tabula

filename = input("Enter File Path: ")
df = tabula.read_pdf(filename, encoding='utf-8', spreadsheet=True, pages="1")

df.to_csv('output.csv')</code></pre>
<!-- /wp:code -->

Для запуска этого кода вам потребуется установить библиотеку tabula с помощью pip. После установки вы можете передать файл в свой проект.

Библиотека поставляется с функцией read_pdf(), которая принимает файл и считывает его. Вы завершаете автоматизацию, используя функцию to_csv() для преобразования вывода в CSV.

<h2 class="wp-block-heading" id="автоматический-фотокомпрессор">Автоматический фотокомпрессор</h2>

Вы также можете уменьшить размер фотографии путем ее сжатия, сохранив при этом ее качество.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">import PIL
from PIL import Image
from tkinter.filedialog import *

fl=askopenfilenames()
img = Image.open(fl[0])
img.save("output.jpg", "JPEG", optimize = True, quality = 10)</code></pre>
<!-- /wp:code -->

Вы можете использовать PIL (Python Imaging Library) для работы с изображениями, добавления фильтров, размытия, повышения резкости, сглаживания, определения краев, сжатия изображений и других действий с изображениями.

<h2 class="wp-block-heading" id="автоматический-загрузчик-видео-с-you-tube">Автоматический загрузчик видео с YouTube</h2>

Перед вами простой автоматический скрипт для загрузки видео с YouTube. Просто используйте приведенный ниже код для загрузки любого видео без необходимости использования каких-либо сайтов или приложений.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">import pytube

link = input('Youtube Video URL')
video_download = pytube.Youtube(link)
video_download.streams.first().download()
print('Video Downloaded', link)</code></pre>
<!-- /wp:code -->

Библиотека pytube - это очень простая и легкая библиотека, которую можно использовать для загрузки видео с YouTube на локальный компьютер. Все, что вам нужно сделать, это ввести ссылку на видео, а затем метод download() загрузит его на ваш компьютер.

<h2 class="wp-block-heading" id="автоматический-перевод-текста-в-речь">Автоматический перевод текста в речь</h2>

Для этого сценария мы будем использовать API Google Text to Speech. API является актуальным и работает со многими языками, тонами и голосами, которые вы можете выбрать.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">from pygame import mixer
from gtts import gTTS

def main():
   tts = gTTS('Like This Article')
   tts.save('output.mp3')
   mixer.init()
   mixer.music.load('output.mp3')
   mixer.music.play()
   
if __name__ == "__main__":
   main()</code></pre>
<!-- /wp:code -->

<h2 class="wp-block-heading" id="как-автоматически-конвертировать-изображения-в-pdf">Как автоматически конвертировать изображения в PDF</h2>

Это очень распространенная задача, которую вы можете выполнять часто. Вы можете захотеть преобразовать одно изображение или несколько изображений в PDF.

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="как-преобразовать-одно-изображение-в-pdf">Как преобразовать одно изображение в PDF:</h3>

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">import os
import img2pdf
with open("output.pdf", "wb") as file:
   file.write(img2pdf.convert([i for i in os.listdir('path to image') if i.endswith(".jpg")]))</code></pre>
<!-- /wp:code -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="как-преобразовать-несколько-изображений-в-pdf">Как преобразовать несколько изображений в PDF:</h3>

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">from fpdf import FPDF
Pdf = FPDF()

list_of_images = ["wall.jpg", "nature.jpg","cat.jpg"]
for i in list_of_images:
   Pdf.add_page()
   Pdf.image(i,x,y,w,h)
   Pdf.output("result.pdf", "F")</code></pre>
<!-- /wp:code -->

Здесь мы используем библиотеку image2pdf в Python для преобразования нашего изображения в PDF. Мы также можем конвертировать несколько изображений в PDF с помощью всего нескольких строк кода.

<h2 class="wp-block-heading" id="автоматическая-проверка-на-плагиат">Автоматическая проверка на плагиат</h2>

Плагиат - это представление слов или идей другого человека как своих собственных, с разрешения или без разрешения этого человека, путем включения их в свою работу без должной благодарности оригинальному автору.

Этот скрипт может быть весьма полезен, когда вы хотите проверить на плагиат два файла.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">from difflib import SequenceMatcher
def plagiarism_checker(f1,f2):
    with open(f1,errors="ignore") as file1,open(f2,errors="ignore") as file2:
        f1_data=file1.read()
        f2_data=file2.read()
        res=SequenceMatcher(None, f1_data, f2_data).ratio()
        
print(f"These files are {res*100} % similar")
f1=input("Enter file_1 path: ")
f2=input("Enter file_2 path: ")
plagiarism_checker(f1, f2)</code></pre>
<!-- /wp:code -->

<h2 class="wp-block-heading" id="как-сделать-url-адреса-короче">Как сделать URL-адреса короче</h2>

Большие URL-адреса могут быть довольно раздражающими для чтения и обмена. Чтобы сократить URL-адреса, этот скрипт использует API стороннего производителя.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">from __future__ import with_statement
import contextlib
try:
	from urllib.parse import urlencode
except ImportError:
	from urllib import urlencode
try:
	from urllib.request import urlopen
except ImportError:
	from urllib2 import urlopen
import sys

def make_tiny(url):
	request_url = ('http://tinyurl.com/app-index.php?' + 
	urlencode({'url':url}))
	with contextlib.closing(urlopen(request_url)) as response:
		return response.read().decode('utf-8')

def main():
	for tinyurl in map(make_tiny, sys.argv[1:]):
		print(tinyurl)

if __name__ == '__main__':
	main()
    

'''

-----------------------------OUTPUT------------------------ 

python url_shortener.py https://www.wikipedia.org/
https://tinyurl.com/bif4t9

'''
    </code></pre>
<!-- /wp:code -->

<h2 class="wp-block-heading" id="тестер-скорости-интернета">Тестер скорости интернета</h2>

OOKLA speed test API позволяет проверить пинг и скорость интернета. Помимо измерения пинга, этот небольшой автоматизированный проект будет измерять скорость загрузки и выгрузки.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python"># Internet Speed tester
# pip install speedtest-cli
import speedtest as st

# Set Best Server
server = st.Speedtest()
server.get_best_server()

# Test Download Speed
down = server.download()
down = down / 1000000
print(f"Download Speed: {down} Mb/s")

# Test Upload Speed
up = server.upload()
up = up / 1000000
print(f"Upload Speed: {up} Mb/s")

# Test Ping
ping = server.results.ping
print(f"Ping Speed: {ping}")

</code></pre>
<!-- /wp:code -->

Хотя существуют альтернативы, такие как fast.com, с помощью этого скрипта вы можете быстро проверить скорость интернета с помощью скрипта Python.

<h2 class="wp-block-heading" id="заключение">Заключение</h2>

В этой статье мы рассказали о десяти скриптах автоматизации на Python, и я надеюсь, что вы нашли их полезными. Вы также можете пройти дополнительную милю, чтобы проверить используемые библиотеки и расширить свои знания.

Счастливого кодинга!
