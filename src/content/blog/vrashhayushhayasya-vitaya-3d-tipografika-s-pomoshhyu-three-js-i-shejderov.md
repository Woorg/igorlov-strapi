---
title: Вращающаяся витая 3D-типографика с помощью Three.js и шейдеров
meta_title: Вращающаяся витая 3D-типографика с помощью Three.js и шейдеров - Igor Gorlov
description: >-
  Всем нравятся круги. Мне лично нравится все округлое. И невозможно любить
  круги, не любя SINes и COSines! Поверьте мне. Потому что кругом одно и то же
  (каламбур!).
date: 2023-01-29T17:26:47.000Z
author: Igor Gorlov
image: ../../assets/images/undefined-Jan-29-2023.avif
categories:
  - Учебник
tags:
  - 3d
  - Animations
  - three.js
  - Typography
draft: false
lastmod: 2024-03-20T21:26:45.085Z
---

<!-- wp:image {"linkDestination":"custom"} -->
<figure class="wp-block-image"><a href="http://tympanus.net/Development/TwistedText/"><img src="https://i7x7p5b7.stackpathcdn.com/codrops/wp-content/uploads/2023/01/circulartext.jpg" alt=""/></a></figure>
<!-- /wp:image -->

Всем нравятся круги. Мне лично нравится все округлое. И невозможно любить круги, не любя SINes и COSines! Поверьте мне. Потому что кругом одно и то же (каламбур!).

<!-- wp:video -->
<figure class="wp-block-video"><video controls src="https://i7x7p5b7.stackpathcdn.com/codrops/wp-content/uploads/2023/01/sincosin.mp4"></video></figure>
<!-- /wp:video -->

Синус и косинус тесно связаны с понятием окружности, поскольку описывают ее колебания и вращения. Однако давайте переключим наше внимание на увлекательную тему манипулирования пространством. Тригонометрия может показаться пугающей, но с помощью небольших, управляемых шагов мы можем овладеть трехмерной вселенной.

<h2 class="wp-block-heading">Создайте текст</h2>

В Three.js есть встроенный модуль для создания текстовых геометрий. Они даже назвали этот модуль TextGeometry, чтобы вы не путали его с TextAlgebra и TextCalculus 👀.

Вы не можете напрямую использовать файлы .ttf или .woff, вместо этого вам придется сначала преобразовать их в так называемый формат typeface.json.

<!-- wp:code {"lineNumbers":true} -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript line-numbers">new FontLoader().load('font.json', (font) =&gt; {
    let textGeo = new TextGeometry(this.settings.text, {
        font: font,
        size: 1, // fontsize
        height: 1, // extrusion
        curveSegments: 10, // how smooth the text is
        bevelEnabled: false,
    });
}   </code></pre>
<!-- /wp:code -->

И вот так просто вы можете генерировать геометрический текст!&nbsp;

<!-- wp:image {"id":69838} -->
<figure class="wp-block-image"><img src="https://i7x7p5b7.stackpathcdn.com/codrops/wp-content/uploads/2023/01/basictext-800x456.png" alt="" class="wp-image-69838"/></figure>
<!-- /wp:image -->

&nbsp;Обычно он не центрируется. Поэтому вы можете просто добавить:

<!-- wp:code {"lineNumbers":true} -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript line-numbers">textGeo.center()</code></pre>
<!-- /wp:code -->

Теперь текст будет находиться в центре! Это важно, потому что упрощает дальнейшие преобразования.

<!-- wp:image {"id":69839} -->
<figure class="wp-block-image"><img src="https://i7x7p5b7.stackpathcdn.com/codrops/wp-content/uploads/2023/01/centered-800x515.png" alt="" class="wp-image-69839"/></figure>
<!-- /wp:image -->

<h2 class="wp-block-heading">Теперь давайте покрутим!</h2>

Существует множество способов повернуть что-либо в Three.js. Например, можно исказить сам геометрический объект. Но самый производительный способ - это, конечно, использовать вершинные шейдеры!

И вообще, что такое поворот? Это просто вращение вершин вокруг одной оси, но с разными углами поворота по этой оси. Таким образом, мы можем вращать всю сетку вокруг этой оси с одинаковым углом:

<!-- wp:video -->
<figure class="wp-block-video"><video controls src="https://i7x7p5b7.stackpathcdn.com/codrops/wp-content/uploads/2023/01/rotate.mp4"></video></figure>
<!-- /wp:video -->

Но мы также можем вращать в зависимости от UV или любого другого параметра:

<!-- wp:video -->
<figure class="wp-block-video"><video controls src="https://i7x7p5b7.stackpathcdn.com/codrops/wp-content/uploads/2023/01/twist.mp4"></video></figure>
<!-- /wp:video -->

Уже существует множество фрагментов для вращения предметов. Интересно, что для вращения в 3D нам даже не нужно 3D-вращение, если мы вращаем вокруг одной из осей X, Y или Z.

Обычно в основе любого вращения лежит матрица два на два:

<!-- wp:code {"lineNumbers":true} -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript line-numbers">mat2 rotate2d(in float radians){
    float c = cos(radians);
    float s = sin(radians);
    return mat2(c, -s, s, c);
}</code></pre>
<!-- /wp:code -->

Видите, просто куча синусов и косинусов! Это в GLSL, который предназначен для шейдеров. Но на самом деле она универсальна, потому что это математическая формула. Так что если вы умножите эту матрицу на вектор (точку), вы получите вращение этого вектора.

Теперь, когда у нас есть центрированная геометрия с нашим текстом, мы можем использовать шейдер, чтобы повернуть его вокруг оси X:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">pos.yz = rotate2d(ANGLE)*pos.yz;</code></pre>
<!-- /wp:code -->

Чтобы получить необходимое нам количество кручения, мы можем рассчитать границы сетки:

<!-- wp:code {"lineNumbers":true} -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript line-numbers">geo.computeBoundingBox();
material.uniforms.uMin.value = geo.boundingBox.min;
material.uniforms.uMax.value = geo.boundingBox.min;</code></pre>
<!-- /wp:code -->

Затем в шейдере мы делаем следующее:

<!-- wp:code {"lineNumbers":true} -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript line-numbers">float theta = mapRange(position.x, uMin.x, uMax.x, -PI, PI); // basically number of pivots we want
pos.yz = rotate2d(ANGLE)*pos.yz; // twist</code></pre>
<!-- /wp:code -->

Так что с помощью всего лишь небольшого количества тригонометрии мы уже получили витой текст. Прекрасно!

<h2 class="wp-block-heading">Искривление пространства для формирования круглой формы</h2>

Теперь пойдем дальше. У нас есть параметр <code>theta</code>, который находится между -PI и PI. Это означает, что мы можем отобразить каждую горизонтальную точку нашего текста на окружность, используя sin+cos!&nbsp;

Таким образом, для каждой точки на оси X у нас будет угол Тета [0,2PI], и мы можем вычислить соответствующую точку виртуальной окружности:

<!-- wp:code {"lineNumbers":true} -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript line-numbers">vec3 circlePoint = vec3(sin(theta), cos(theta),0.);  // because circles!
// z is 0, because i want my circle to be in X-Y plane, in front of my camera which is at (0,0,2)</code></pre>
<!-- /wp:code -->

Но это, конечно, даст нам 0 ширины на 3D-объекте, это просто круг. Потому что THETA зависит только от X. Нам нужно учесть координаты y,z исходной сетки. Мы сделаем это в два шага, сначала мы переместимся в нашу ”точку окружности" с некоторым радиусом, а затем добавим смещение y-z исходных позиций:

<!-- wp:code {"lineNumbers":true} -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript line-numbers">vec3 newPosition = circlePoint*RADIUS + circlePoint*pos.y + vec3(0.,0.,pos.z);</code></pre>
<!-- /wp:code -->

Еще раз повторим: сначала мы сопоставляем нашу ось x с `circlePoint*RADIUS`, затем добавляем смещение оси y с `circlePoint*pos.y`. По сути, я хочу переместить Y в том же направлении, что и точку на окружности, но с оригинальным смещением Y вершины.

А затем мы просто добавляем оригинальный z, который на самом деле не меняется во время этого преобразования. Важно, что все это основано на геометрии вдоль оси X, а мы хотим, чтобы наша окружность находилась в плоскости X-Y.

Возможно, это было слишком много X-Y-Z в одном абзаце, но лучший способ понять это - попробовать самому и поиграть с параметрами в этой формуле. Просто произвольно умножьте некоторые из них, скажем, на 3 или 42, и посмотрите, что получится. Весь код со скручиванием и превращением в круг будет выглядеть следующим образом:

<!-- wp:code {"lineNumbers":true} -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript line-numbers">vec3 pos = position; // copy original
float theta = mapRange(position.x, uMin.x, uMax.x, -PI, PI);
// twist
pos.yz = rotate2D(theta)*pos.yz;
// bend into circle
vec3 circlePoint = vec3(sin(theta), cos(theta),0.);
pos = circlePoint*RADIUS + circlePoint*pos.y + vec3(0.,0.,pos.z);</code></pre>
<!-- /wp:code -->

<!-- wp:video -->
<figure class="wp-block-video"><video controls src="https://i7x7p5b7.stackpathcdn.com/codrops/wp-content/uploads/2023/01/final.mp4"></video></figure>
<!-- /wp:video -->

Чтобы все выглядело красиво, нам также нужно повторить все шаги трансформации для НОРМАЛЕЙ объекта. Потому что, пока мы играем с вершинами геометрии, нормали остаются неизменными. А они нам нужны для правильного освещения. Но это на 99% тот же код, что и для вершин, за исключением преобразования нормалей.

И вот, пожалуйста, прекрасный пример в React Three Fiber, с которым вы можете поиграть. Просто найдите часть шейдера и начните менять числа, чтобы узнать, как это работает:

<iframe style="width: 100%; height: 500px; border: 0; border-radius: 4px; overflow: hidden;" src="https://codesandbox.io/embed/using-render-texture-through-decals-forked-vuq7hn?fontsize=14&amp;hidenavigation=1&amp;theme=dark" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

<h2 class="wp-block-heading">Конец</h2>

Надеюсь, вам понравилось это краткое исследование манипуляций с пространством. Это лишь вершина айсберга, когда речь идет о возможностях, которых вы можете достичь. Я призываю вас поэкспериментировать с файлами и открыть для себя возможности формирования пространства в соответствии с вашими желаниями. Владея тригонометрией, даже невозможное может стать возможным. Хорошего дня и будьте осторожны!

Дополнение: Посмотрите это видео о невозможной анимации Мёбиуса с помощью Three.js:

<!-- wp:embed {"url":"https://www.youtube.com/watch?v=Y5EiKACFemI","type":"video","providerNameSlug":"youtube","responsive":true,"className":"wp-embed-aspect-16-9 wp-has-aspect-ratio"} -->
<figure class="wp-block-embed is-type-video is-provider-youtube wp-block-embed-youtube wp-embed-aspect-16-9 wp-has-aspect-ratio"><div class="wp-block-embed__wrapper">
https://www.youtube.com/watch?v=Y5EiKACFemI
</div></figure>
<!-- /wp:embed -->
