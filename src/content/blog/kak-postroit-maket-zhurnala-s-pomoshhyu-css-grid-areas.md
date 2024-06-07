---
title: Как построить макет журнала с помощью CSS Grid Areas
meta_title: Как построить макет журнала с помощью CSS Grid Areas - Igor Gorlov
description: >-
  Веб-разработка, особенно то, что можно сделать с помощью CSS, становится все
  более сложной. Благодаря дополнительным возможностям CSS Grid теперь можно
  создавать макеты, которые выглядят так, как будто они были созданы вручную.
  Давайте рассмотрим практический пример того, как сделать нечто подобное.
date: 2023-02-06T23:22:32.000Z
author: Igor Gorlov
image: ../../assets/images/undefined-Feb-07-2023.avif
categories:
  - Учебник
tags:
  - Css
draft: false
lastmod: 2024-03-20T21:26:48.875Z
---

Веб-разработка, особенно то, что можно сделать с помощью CSS, становится все более сложной. Благодаря дополнительным возможностям CSS Grid теперь можно создавать макеты, которые выглядят так, как будто они были созданы вручную. Давайте рассмотрим практический пример того, как сделать нечто подобное.

В этой статье я хочу рассказать об удивительных возможностях CSS-сетки и о том, как она позволяет создавать сложные макеты, приближенные к печатным. Дизайн, который мы обсудим, на самом деле является тем, над которым я работал для клиента (немного измененным для демонстрационного примера). Он охватывает два основных варианта использования CSS-сетки:

статическая сетка, в которой мы определяем заданные начальные и конечные точки для каждого элемента; использование областей шаблонов CSS-сетки для изменения порядка простого HTML-макета без обновления HTML.

В качестве бонуса мы также затронем вопросы объектной подгонки и соотношения сторон, которые также могут пригодиться.

<img sizes="100vw" srcset="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/building-print-like-website-layout-css-grid-areas/1-combined-design-desktop-mobile-versions.png 400w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_800/https://files.smashing.media/articles/building-print-like-website-layout-css-grid-areas/1-combined-design-desktop-mobile-versions.png 800w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1200/https://files.smashing.media/articles/building-print-like-website-layout-css-grid-areas/1-combined-design-desktop-mobile-versions.png 1200w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1600/https://files.smashing.media/articles/building-print-like-website-layout-css-grid-areas/1-combined-design-desktop-mobile-versions.png 1600w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_2000/https://files.smashing.media/articles/building-print-like-website-layout-css-grid-areas/1-combined-design-desktop-mobile-versions.png 2000w" width="800" height="681" src="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/building-print-like-website-layout-css-grid-areas/1-combined-design-desktop-mobile-versions.png" alt="Combined designs: desktop on the left, a cropped version for mobile on the right">

Здесь вы можете увидеть дизайн, который мы будем реализовывать: слева - для настольных компьютеров, справа - обрезанная версия для мобильных устройств (представьте себе мобильный вид, чтобы продолжить работу с разделами 3 и 4). Здесь довольно много всего, и ничто не укладывается в аккуратные ряды и колонки. Изображения расположены в неровной сетке, иногда даже накладываются друг на друга, есть узкий текст и элемент нумерации, который является двойным элементом дизайна.

Давайте сначала рассмотрим элементы сетки изображений внутри каждого цветного компонента. Хотя у нас четыре цветных компонента, повторяются только два варианта. Для удобства сравнения я разрезал настольную версию пополам и положил две половинки рядом друг с другом - так их легче сравнивать. Как видите, первый и третий варианты одинаковы, как и второй и четвертый. Если сравнивать только первый и второй варианты, то они отличаются, но основные структурные блоки очень похожи (полноразмерный цвет фона, большой блок изображения, колонка с номером и немного текста). Поэтому мы можем считать, что это один и тот же компонент, просто с двумя альтернативами.

<img sizes="100vw" srcset="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/building-print-like-website-layout-css-grid-areas/2-design-desktop-version-cut-in-half.png 400w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_800/https://files.smashing.media/articles/building-print-like-website-layout-css-grid-areas/2-design-desktop-version-cut-in-half.png 800w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1200/https://files.smashing.media/articles/building-print-like-website-layout-css-grid-areas/2-design-desktop-version-cut-in-half.png 1200w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1600/https://files.smashing.media/articles/building-print-like-website-layout-css-grid-areas/2-design-desktop-version-cut-in-half.png 1600w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_2000/https://files.smashing.media/articles/building-print-like-website-layout-css-grid-areas/2-design-desktop-version-cut-in-half.png 2000w" width="800" height="450" src="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/building-print-like-website-layout-css-grid-areas/2-design-desktop-version-cut-in-half.png" alt="Design of the desktop version cut in half and the two halves put next to one another">

В старые времена нам пришлось бы делать сетку изображений в Photoshop, а затем добавлять их на страницу как одно изображение. Очевидно, что это можно сделать и сейчас, но такое решение никогда не было особенно удачным для отзывчивых веб-сайтов, а использование элемента изображения сработает, но нам придется сделать несколько макетов в Photoshop и все переделать, если мы захотим изменить изображение. Нам придется делать это каждый раз, когда этот элемент будет добавляться с разными картинками.

Но мы бы не дошли до этой части статьи, если бы не было альтернативы! Уже некоторое время можно смело использовать CSS grid, и она способна решить эту задачу довольно аккуратно с помощью всего нескольких строк CSS.

CSS Grid позволяет нам задать формальное определение сетки - столбцы и строки - на родительском элементе и указать для дочерних элементов, где они должны располагаться внутри сетки. Мы также получаем те же возможности выравнивания и выравнивания, которые предлагает flex. Это избавляет нас от необходимости обертывать div’ы, а также делает CSS более компактным.

Обратите внимание: в результате графический макет может отличаться от структуры документа в HTML.

Однако программы для чтения с экрана все равно будут опираться на структуру HTML, поэтому поместите самую важную информацию первой и постарайтесь расположить все в разумном порядке.

Теперь перейдем к изображениям. Что нам нужно как минимум? Контейнер для изображений и сами изображения. И знаете что? С CSS Grid этого действительно достаточно - попрощайтесь с пятью слоями оберточных div’ов!

<!-- wp:code {"lineNumbers":false} -->
<pre class="wp-block-code"><code lang="markup" class="language-markup">&lt;div class="grid image-grid-3-m4"&gt;
   &lt;img class="image-0 " src="" /&gt; 
   &lt;img class="image-1 " src="" /&gt;
   &lt;img class="image-2 " src="" /&gt;
   &lt;img class="image-3 " src="" /&gt;
&lt;/div&gt;
</code></pre>
<!-- /wp:code -->

Еще немного о разметке. Чтобы упростить стилизацию, я добавил индекс к каждому изображению (поскольку мы хотим использовать их повторно, это должен быть класс, а не ID) и два класса в окружающем div, которые мы будем использовать для определения базовой стилизации: класс утилиты сетки и второй, используемый для идентификации варианта. Для варианта с тремя изображениями слева и четвертым справа в настольном представлении я потратил некоторое время на размышления о том, как лучше решить проблему четвертого изображения: добавить ли его в контейнер с другими изображениями и попытаться переместить его на другую сторону, или переместить его на мобильном и так далее. В итоге я решил добавить четвертое изображение в контейнер для изображений, но скрыть его на рабочем столе с помощью CSS и выделить отдельный div во втором месте с тем же изображением для отображения в десктопной версии. Использование display:none также скроет эту версию от устройств чтения с экрана.

Теперь, когда у нас есть базовый HTML и изображения, пришло время сосредоточиться на CSS. Если вы совсем новичок в CSS-сетке, эта полезная статья подробно объясняет весь синтаксис. К сожалению, я не могу описать весь синтаксис в этой статье.

Прежде всего, нам нужно определить нашу сетку. Поскольку у меня был дизайн для работы, я использовал инструмент, который позволил мне нанести линии поверх изображения, расположить по одной линии на каждом краю изображения и увидеть размеры в пикселях между ними. Было бы здорово, если бы дизайнер уже использовал формальную сетку и рассказал мне об этом, но, к сожалению, этого не произошло, поэтому я использовал пропорциональные размеры как приблизительное представление о том, что я должен использовать в сетке. По сути, я спросил себя, какое наименьшее общее делимое число будет для каждого из них - с некоторым запасом - и использовал его. (Добро пожаловать на урок математики). Моя цель заключалась в том, чтобы все столбцы и строки сетки были одинакового размера и при этом можно было гибко подходить к количеству столбцов и строк.

<img sizes="100vw" srcset="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/building-print-like-website-layout-css-grid-areas/3-css-grid-design-layout-ruler-overlay.png 400w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_800/https://files.smashing.media/articles/building-print-like-website-layout-css-grid-areas/3-css-grid-design-layout-ruler-overlay.png 800w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1200/https://files.smashing.media/articles/building-print-like-website-layout-css-grid-areas/3-css-grid-design-layout-ruler-overlay.png 1200w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1600/https://files.smashing.media/articles/building-print-like-website-layout-css-grid-areas/3-css-grid-design-layout-ruler-overlay.png 1600w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_2000/https://files.smashing.media/articles/building-print-like-website-layout-css-grid-areas/3-css-grid-design-layout-ruler-overlay.png 2000w" width="800" height="547" src="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/building-print-like-website-layout-css-grid-areas/3-css-grid-design-layout-ruler-overlay.png" alt="Image with a ruler overlay">

С помощью этого метода я определил, что хочу иметь 14 колонок на мобильном устройстве и 7 строк плюс некоторые равномерные промежутки. Это позволило мне приблизить распределение в макете, сохранив соотношение сторон близким к задуманному. Исходя из этого, мы получаем следующий CSS:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="css" class="language-css">.grid {
  display: grid;
}

.image-grid-3-m4 {
  grid-template-rows: repeat(7, 1fr);
  grid-template-columns: repeat(14, 1fr);
    gap: 0.5rem;
}
</code></pre>
<!-- /wp:code -->

С помощью этих четырех строк CSS мы получили сетку, которая готова к заполнению. Если вы следите за развитием событий, то заметите, что изображения теперь заполняют по одной ячейке сетки в первом ряду. Это механизм автоматической верстки, который использует браузер, и в зависимости от того, что вы хотите сделать, он может быть идеальным для определения равномерно расположенного дизайна за считанные секунды.

Смотрите Pen [Basic CSS for the grid [forked]](https://codepen.io/smashingmag/pen/gOjKgqM) by Pfenya.

См. Pen [Basic CSS for the grid [forked]]() by Pfenya.

Но, очевидно, мы хотим пофантазировать, поэтому ровные макеты нам не нужны. Для этого нам нужно еще несколько правил CSS: grid-column и grid-row, если быть точным. Они позволяют нам указать, как элемент должен располагаться в сетке. Добавьте к этому мои надежные линии и кривую математику, и я смогу разместить каждое изображение. Например, первое изображение начинается в левом верхнем углу, поэтому мы начинаем с 1 строки столбца сетки и 1 строки, и оно должно занимать 6 из 14 столбцов и 4 строк. Вместо того чтобы указывать элементу, сколько ячеек он должен охватить, можно также указать конечное значение. Лично я предпочитаю вариант span, так как его легче отслеживать и читать.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="css" class="language-css">.image-0 {
  grid-column: 1 / span 6;
  grid-row: 1 / span 4;
}
</code></pre>
<!-- /wp:code -->

В дополнение к информации о том, где будут размещаться изображения, есть еще три правила, которые делают здесь очень тяжелую работу:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="css" class="language-css">img {
  object-fit:cover;
  height: 100%;
  width: 100%;
}
</code></pre>
<!-- /wp:code -->

С их помощью мы говорим браузеру, чтобы изображения всегда занимали весь контейнер, размер которого определяется сеткой. Затем мы используем функцию object-fit, чтобы убедиться, что все пространство будет занято изображением со скрытым переполнением (если вы хотите узнать больше об объектной подгонке, вот отличный учебник). Очевидно, это означает, что некоторые части изображений не будут отображаться, и вам нужно иметь это в виду при выборе изображений для этого - особенно если их соотношение сторон не идеально.

Говоря о соотношении сторон, правое верхнее изображение выглядит квадратным. Было бы здорово, если бы мы могли указать ему квадратную форму, независимо от размера самого изображения. Теперь мы можем это сделать. Существует свойство CSS под названием aspect-ratio, которое именно это и делает, и в данном случае оно позволяет нам сказать изображению, что оно должно быть квадратным (что, как мы все знаем, прекрасно). (Однако обратная совместимость является проблемой, особенно на iOS. Поэтому в некоторых случаях вам может понадобиться полифилл). Но свойство aspect-ratio - это то, что будет очень полезно в будущем, и вы можете прочитать о нем более подробно в этой статье Стефани Эклз.

Теперь, когда все это готово, мы можем посмотреть, как это выглядит со всеми четырьмя изображениями:

See the Pen [Untitled [forked]](https://codepen.io/smashingmag/pen/yLqEgrK) by Pfenya.

See the Pen Untitled [forked] by Pfenya.

Для настольной версии все, что мы действительно хотим сделать, это сместить начало и конец изображения. Для этого нам нужен медиазапрос, в котором мы переопределим сетку и расположение. Я снова рассчитал, сколько строк и столбцов мне понадобится и где расположить каждый элемент, и добавил информацию для каждого из них в свой CSS.

See the Pen [Untitled [forked]](https://codepen.io/smashingmag/pen/yLqEgdj) by Pfenya.

Смотрите Pen Untitled [forked] by Pfenya.

Теперь у нас есть сетка изображений, которая меняет свое расположение в зависимости от области просмотра, и как только мы поместим ее в элемент с гибкой шириной, изображения будут обновлять свой размер отображения соответственно.

Самое сложное здесь - понять синтаксис и разобраться с явным позиционированием элементов. Но как только вы это сделаете, перед вами откроется целый мир возможностей. Очевидно, что это не всегда можно делать, особенно при наличии многократно используемых компонентов, но для конкретных случаев использования это может добавить что-то особенное или решить сложную проблему.

Смещение блоков в главном компоненте

Теперь, когда самая сложная часть изображений выполнена, пришло время взглянуть на сам компонент. И снова мы остановились на CSS Grid, и на этот раз мы будем работать с grid-template-areas. Лично я в восторге от этой функциональности, потому что она дает нам тонну гибкости для основной структурной компоновки между настольными и мобильными компьютерами без необходимости добавлять множество инкапсулирующих div’ов или дублирующей информации. Этот компонент - отличная витрина, так что давайте займемся им.

Если мы снова обратимся к дизайну, то здесь всего несколько элементов. У нас есть несколько изображений, которые в больших видовых экранах можно разделить на две части: номер в белом поле и все текстовые элементы.

<img sizes="100vw" srcset="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/building-print-like-website-layout-css-grid-areas/4-css-grid-sections-design-layout.png 400w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_800/https://files.smashing.media/articles/building-print-like-website-layout-css-grid-areas/4-css-grid-sections-design-layout.png 800w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1200/https://files.smashing.media/articles/building-print-like-website-layout-css-grid-areas/4-css-grid-sections-design-layout.png 1200w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1600/https://files.smashing.media/articles/building-print-like-website-layout-css-grid-areas/4-css-grid-sections-design-layout.png 1600w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_2000/https://files.smashing.media/articles/building-print-like-website-layout-css-grid-areas/4-css-grid-sections-design-layout.png 2000w" width="800" height="445" src="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/building-print-like-website-layout-css-grid-areas/4-css-grid-sections-design-layout.png" alt="Desktop design layout with two sections: the number in a white box and all text elements">

Каков минимальный HTML для этого? Опять же, нам не нужно много дополнительных элементов; окружающий div и затем по одному для каждой части - это все, что нам нужно:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="markup" class="language-markup">&lt;div class="container"&gt;
  &lt;div class="images"&gt;&lt;/div&gt;
  &lt;div class="numbering"&gt;&lt;/div&gt;
  &lt;div class="text"&gt;&lt;/div&gt;
  &lt;div class="single-image"&gt;&lt;/div&gt;
&lt;/div&gt;
</code></pre>
<!-- /wp:code -->

В нашем примере все области имеют название класса, которое определяет, что они будут содержать в дальнейшем. Однако если мы посмотрим на макет для мобильных устройств, то номер находится поверх изображений! Самое замечательное в CSS-сетке то, что элементы можно располагать слоями. Мы уже использовали это для изображений выше. Как видите, два из них накладываются друг на друга, и мы также можем сделать это для целых областей. Слоистость будет контролироваться нашим старым другом, z-индексом. Правила те же, что и всегда: более высокий z-индекс побеждает и выходит на первый план.

Учитывая это, давайте создадим две области: одну вверху с изображениями, заполняющими область, и номером в качестве верхнего слоя, большая часть которого прозрачна, чтобы показать изображения, и вторую область внизу для текста. Мы можем использовать синтаксис столбцов и строк сетки, который мы использовали ранее, но в этом случае мы можем еще больше облегчить себе жизнь с помощью grid-template-areas. С его помощью вы можете добавить имена к частям сетки и затем решить для каждого элемента, в какой области сетки он должен отображаться. Особенно для страницы или каркаса компонента, это гораздо более простой и быстрый способ работы и возможность прочитать все это позже, чем использование всех этих непишущих чисел.

Я думаю, что это будет легче понять на примере.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="css" class="language-css">.container {  
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(2, 1fr);
  gap: 1.2rem;
  grid-auto-flow: row;
  grid-template-areas:
    "numerology"
    "text";
}

.images { grid-area: numerology; }

.numbering { grid-area: numerology; }

.text { grid-area: text; }
.single-image {display:none}
</code></pre>
<!-- /wp:code -->

Мы снова определяем контейнер как сетку, добавляем в него два ряда, а затем используем ‘grid-template-areas’, чтобы дать этим рядам имя. Синтаксис для этого очень необычен для CSS, но он дает вам мини-представление о вашем макете: Numerology - это название ячейки в первом ряду, а Text - во втором.

Теперь, когда у этих рядов есть имена, мы можем легко расположить наши элементы. Изображения и контейнер для числа помещаются в первый ряд, а текст - во второй. Итак, в приведенном выше примере мы добавляем grid-area в CSS для класса, который мы применили к div в HTML. Этими несколькими строками мы определили макет.

Чтобы добиться эффекта наложения для числа, белое поле будет находиться в своем контейнере и получит фиксированную ширину и высоту. Затем мы можем использовать flex для центрирования его в контейнере.

Но как нам перейти от этого к настольной версии, спросите вы? На самом деле, довольно легко! Для общего дизайна сайта мы уже используем 14-колоночную сетку для всех элементов на рабочем столе. Если мы наложим на дизайн некоторые маркеры сетки, мы увидим, какой ширины должны быть все элементы.

<img sizes="100vw" srcset="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/building-print-like-website-layout-css-grid-areas/5-column-grid-desktop-overlay.png 400w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_800/https://files.smashing.media/articles/building-print-like-website-layout-css-grid-areas/5-column-grid-desktop-overlay.png 800w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1200/https://files.smashing.media/articles/building-print-like-website-layout-css-grid-areas/5-column-grid-desktop-overlay.png 1200w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_1600/https://files.smashing.media/articles/building-print-like-website-layout-css-grid-areas/5-column-grid-desktop-overlay.png 1600w,
https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_2000/https://files.smashing.media/articles/building-print-like-website-layout-css-grid-areas/5-column-grid-desktop-overlay.png 2000w" width="800" height="418" src="https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/building-print-like-website-layout-css-grid-areas/5-column-grid-desktop-overlay.png" alt="Desktop design with a 14 column grid for all elements">

Очевидно, что наши именованные области из мобильного представления не очень помогут нам в этой версии, но мы можем просто обновить их в медиа-запросе для нашего настольного представления, а также определить другие имена областей:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="css" class="language-css">.container {  
  display: grid;
  grid-template-columns: repeat(14, minmax(0, 1fr));
  grid-template-rows: repeat(2, 1fr);
  gap: 1.2rem;
  grid-auto-flow: row;
  grid-template-areas:
    "images images images images images . numbering numbering numbering single-image single-image single-image single-image single-image"
    "images images images images images . text text text single-image single-image single-image single-image single-image";
}

.images { grid-area: images; }

.numbering { grid-area: numbering; }

.text { grid-area: text; }

.single-image { grid-area: single-image; }
</code></pre>
<!-- /wp:code -->

Позвольте мне первым сказать, что да, это действительно не очень красивый способ определения, но, к сожалению, синтаксис шаблона-области не включает ключевое слово repeat, как это делает определение столбца.

Но взгляните на это поближе. Вы видите, что мы определяем первые пять столбцов для имен изображений в обеих строках, затем у нас есть точка, что означает, что сюда ничего не входит, затем у нас есть три столбца для нумерации в первой строке и три для текста во второй строке, и в конце - пять столбцов для одного изображения. Лично мне нравится использовать онлайн-генератор, который позволяет визуально определить эти области и скопировать необходимый CSS.

Теперь с помощью чуть менее 20 строк кода мы полностью изменили макет, не трогая очень простую структуру HTML! Но как насчет альтернативной версии для 2 и 4? Они используют только немного другой макет, так почему бы не добавить несколько классов для .version-a и .version-b в контейнер и не задать области сетки-шаблона на рабочем столе? Все очень просто. Посмотрите на следующее:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="css" class="language-css">  .version-1 {
      grid-template-areas:
    "images images images images images . numbering numbering numbering single-image single-image single-image single-image single-image"
    "images images images images images . text text text single-image single-image single-image single-image single-image";
  }
.version-1 .single-image {
  grid-area: single-image;
  display:block;
 }  
  .version-2 {
        grid-template-areas:
    ". numbering numbering numbering . . images images images images images images images images"
    ". text text text . . images images images images images images images images";
  }
</code></pre>
<!-- /wp:code -->

Честно говоря, для меня это все еще довольно безумно. В течение долгого времени подобный макет был бы совершенно недоступен или очень сложен для создания, а совместное использование HTML между версиями 1 и 2 было бы практически невозможно, по крайней мере, для полного HTML. Теперь мы можем просто взмахнуть волшебной палочкой и обновить то, что должно появиться. Очень крутая штука.

Другим практическим примером, где это мне очень помогло, было определение областей для страницы подробного описания товара на сайте электронной коммерции. Возможность перемещать элементы так, чтобы они имели смысл в разных контекстах - это потрясающе, но это также означает, что вам нужно немного изменить свою ментальную модель, чтобы понять, как связаны HTML и CSS. И это еще только начало. С контейнерными запросами и слоями на горизонте маячит много нового, что откроет гораздо больше возможностей в будущем, и я полностью за это!

Наконец, вот полная версия дизайна, где все собрано воедино:

Посмотреть Pen https://codepen.io/smashingmag/pen/VwBdpma) by Pfenya.
