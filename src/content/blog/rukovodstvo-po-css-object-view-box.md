---
title: Руководство по CSS object-view-box
meta_title: Руководство по CSS object-view-box - Igor Gorlov
description: >-
  Как фронтенд-разработчику, мне часто приходится работать с изображениями. И
  иногда возникает сложность, когда изображение масштабируется и располагается
  по-разному в приложении.
date: 2023-03-07T22:59:42.000Z
author: Igor Gorlov
image: ../../assets/images/undefined-Mar-08-2023.avif
categories:
  - Учебник
tags:
  - Css
draft: false
lastmod: 2024-03-20T21:26:46.503Z
---

Написано Пиюшем Sinha✏️

Как фронтенд-разработчику, мне часто приходится работать с изображениями. И иногда возникает сложность, когда изображение масштабируется и располагается по-разному в приложении. Например, на сайте электронной коммерции может потребоваться увеличенная версия изображения на странице товара и увеличенная версия того же изображения при отображении списка товаров.

До выхода Chrome 104 для обрезки/масштабирования изображения я использовал его как background-image в div, а затем настраивал свойства background-position и background-size. Вот пример:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="markup" class="language-markup">&lt;div id="cropped"&gt;&lt;/div&gt;
</code></pre>
<!-- /wp:code -->

<!-- wp:code -->
<pre class="wp-block-code"><code lang="css" class="language-css">#cropped {
  width: 500px;
  aspect-ratio: 3/2;
  background-image: url("https://images.unsplash.com/photo-1611604548018-d56bbd85d681?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=2070&amp;q=80");
  background-size: 1250px;
  background-position: 66% 67%;
  background-repeat: no-repeat;
}
</code></pre>
<!-- /wp:code -->

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--Ny4wh52G--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://blog.logrocket.com/wp-content/uploads/2023/02/cropping-image-using-background-size-position.png" alt="Обрезка изображения с помощью свойств Background-Size и Background-Position"/></figure>
<!-- /wp:image -->

Он работает нормально, но, скажем так, это решение для обрезки/масштабирования изображений оставляет желать лучшего. Это не совсем то, что можно назвать опрятным. Кроме того, это не будет работать только с <code>&lt;img/&gt;</code> тегом. Существуют и другие обходные пути, но ни один из них не является таким простым и чистым, как object-view-box.

<!-- wp:rank-math/toc-block {"title":"Оглавление","headings":[{"key":"c0e5f0ee-2dc7-4e4f-9dc9-99f691eb1b01","content":"Что такое свойство object-view-box?","level":2,"link":"#что-такое-свойство-object-view-box","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"4560dd38-efec-4984-8728-61acf6e9e5fb","content":"Как использовать object-view-box?","level":2,"link":"#как-использовать-object-view-box","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"acc4934a-45fd-48c0-8599-dd9993ca179e","content":"Возможные искажения","level":2,"link":"#возможные-искажения","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"87504ffd-e2bf-406c-bb25-a2d9f026acf8","content":"Почему мы должны приветствовать это обновление?","level":2,"link":"#почему-мы-должны-приветствовать-это-обновление","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"bbba29e7-4967-427c-a8b2-090470191637","content":"Когда использовать object-view-box?","level":2,"link":"#когда-использовать-object-view-box","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"3b142f5f-30d5-4696-b299-b5b6dc35701f","content":"Заключение","level":2,"link":"#заключение","disable":false,"isUpdated":false,"isGeneratedLink":true}],"listStyle":"ul"} -->
<div class="wp-block-rank-math-toc-block" id="rank-math-toc"><h2>Оглавление</h2><nav><ul><li class=""><a href="#что-такое-свойство-object-view-box">Что такое свойство object-view-box?</a></li><li class=""><a href="#как-использовать-object-view-box">Как использовать object-view-box?</a></li><li class=""><a href="#возможные-искажения">Возможные искажения</a></li><li class=""><a href="#почему-мы-должны-приветствовать-это-обновление">Почему мы должны приветствовать это обновление?</a></li><li class=""><a href="#когда-использовать-object-view-box">Когда использовать object-view-box?</a></li><li class=""><a href="#заключение">Заключение</a></li></ul></nav></div>
<!-- /wp:rank-math/toc-block -->

<h2 class="wp-block-heading" id="что-такое-свойство-object-view-box">Что такое свойство object-view-box?</h2>

В выпуске Chrome 104 появился собственный подход к масштабированию или панорамированию содержимого элемента. Свойство CSS object-view-box делает это возможным, задавая окно просмотра над элементом и позволяя нам настроить позиционирование и масштабирование в соответствии с нашими конкретными потребностями.

Проще говоря, подобно тому, как объектив камеры можно настроить для увеличения или уменьшения масштаба, или панорамирования по внешнему виду, свойство object-view-box позволяет нам увеличивать масштаб определенных частей элемента или панорамировать для отображения различных частей элемента.

<h2 class="wp-block-heading" id="как-использовать-object-view-box">Как использовать object-view-box?</h2>

Чтобы задать поле просмотра над элементом, object-view-box использует функцию inset() для управления четырьмя краями.

inset() - это сокращенный способ указать значения для свойств элемента top, right, bottom и left, в таком порядке. Она имеет тот же синтаксис, что и свойства padding и margin, что позволяет ей принимать от одного до четырех значений:

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>1 значение: Применяется ко всем четырем краям</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>2 значения: Первое значение применяется к верхнему и нижнему краям, а второе - к левому и правому краям</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>3 значения: Первое значение применяется к верхнему краю, второе - к левому и правому краям, а третье - к нижнему краю.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>4 значения: Применяется к верхнему, правому, нижнему и левому краям соответственно</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--xxKcpTW8--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://blog.logrocket.com/wp-content/uploads/2023/02/using-inset-function-control-four-edges-1.png" alt="Использование функции &quot;Вставка&quot; для управления четырьмя краями изображения"/></figure>
<!-- /wp:image -->

Эти значения могут быть выражены с помощью любой допустимой единицы длины CSS, например, пикселей (px), эм (em), рем (rem), процентов (%) и др.

Давайте применим это свойство к тому же изображению выше и попробуем добиться того же результата:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="markup" class="language-markup">&lt;img id="cropped" src="https://images.unsplash.com/photo-1611604548018-d56bbd85d681?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=2070&amp;q=80" alt="toys"&gt;
</code></pre>
<!-- /wp:code -->

<!-- wp:code -->
<pre class="wp-block-code"><code lang="css" class="language-css">#cropped {
  width: 500px;
  object-view-box: inset(40% 20% 20% 40%);
}
</code></pre>
<!-- /wp:code -->

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--Ny4wh52G--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://blog.logrocket.com/wp-content/uploads/2023/02/cropping-image-using-background-size-position.png" alt="Обрезка изображения с помощью свойств Background-Size и Background-Position"/></figure>
<!-- /wp:image -->

<h2 class="wp-block-heading" id="возможные-искажения">Возможные искажения</h2>

Если обрезанная версия изображения представляет собой квадрат, изображение будет выглядеть искаженным, т.е. растянутым или сжатым:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="css" class="language-css">#cropped {
  aspect-ratio: 1;
  width: 500px;
  object-view-box: inset(40% 20% 20% 40%);
}
</code></pre>
<!-- /wp:code -->

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--qntIFepv--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://blog.logrocket.com/wp-content/uploads/2023/02/distorted-square-image.png" alt="Искаженное изображение появляется, когда обрезанное изображение имеет квадратную форму"/></figure>
<!-- /wp:image -->

Здесь мы можем воспользоваться помощью свойства object-fit, которое определяет, как элемент должен быть изменен по размеру, чтобы соответствовать своему контейнеру. Свойство может иметь одно из следующих значений: fill, contain, cover, none или scale-down.

Для нашего сценария мы можем использовать cover, которое изменяет размер изображения в соответствии с соотношением сторон контейнера, а если соотношение сторон изображения не совпадает с соотношением сторон контейнера, то оно будет обрезано:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="css" class="language-css">#cropped-fit-cover {
  aspect-ratio: 1;
  width: 500px;
  object-fit: cover;
  object-view-box: inset(40% 20% 20% 40%);
}
</code></pre>
<!-- /wp:code -->

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--guhxIdVy--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://blog.logrocket.com/wp-content/uploads/2023/02/cropped-fit-cover.png" alt="Обрезка изображения с помощью свойства Cropped-Fit-Cover"/></figure>
<!-- /wp:image -->

Разве это не удобный способ обрезать/масштабировать изображение? Для этого требуется только одно свойство, и его легко визуализировать. Никаких дополнительных свойств или элементов не требуется, в отличие от обходных путей.

<h2 class="wp-block-heading" id="почему-мы-должны-приветствовать-это-обновление">Почему мы должны приветствовать это обновление?</h2>

Использование свойства object-view-box - это оригинальное решение; браузер делает тяжелую работу, а разработчики получают чистое решение.

Среди разработчиков существуют популярные обходные пути, например, использование элемента HTML - например, <code>&lt;div/&gt;</code> — и применения свойств CSS для получения обрезанного изображения. Но это все равно лишь обходной путь, нетрадиционное решение для преодоления ограничений браузера.

В этом обновлении браузер поработал над этим ограничением и предлагает встроенное решение.

Существует опасение, что для того, чтобы это работало, необходимо знать точные размеры исходного и нового контейнера. Но разве это не является необходимым условием для обрезки изображения? Чтобы определить, сколько нужно обрезать, нам всегда нужна эта информация.

Итак, как это будет работать при изменении размеров контейнера (изменение области просмотра)?

Поскольку объект-видовое окно использует функцию inset() для рисования видового окна над изображением, обрезка всегда происходит по внутреннему размеру (исходной ширине и высоте) изображения. Чтобы сделать его отзывчивым, мы можем использовать это свойство вместе с медиа-запросами и обрезать соответствующим образом.

<h2 class="wp-block-heading" id="когда-использовать-object-view-box">Когда использовать object-view-box?</h2>

Возможность обрезать/масштабировать изображение может пригодиться во многих случаях:

Когда изображение необходимо масштабировать и позиционировать по-разному во всем приложении.<br>Интерактивная функция, когда пользователи могут увеличивать и панорамировать изображение, обычно встречается на сайтах электронной коммерции.<br>В небольших экранах просмотра изображения часто обрезаются. С помощью этого свойства и медиазапросов мы можем контролировать, какая часть изображения остается в поле зрения.

<h2 class="wp-block-heading" id="заключение">Заключение</h2>

В прошлом существовали обходные пути для обрезки и масштабирования изображений, но я приветствую это оригинальное и удобное решение. Также, пожалуйста, имейте в виду, что это экспериментальный выпуск, и поэтому он может не поддерживаться всеми браузерами. Посетите сайт caniuse.com для получения актуальных таблиц поддержки браузеров.
