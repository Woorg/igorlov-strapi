---
title: Аудиореактивные шейдеры с помощью Three.js и Shader Park
meta_title: Аудиореактивные шейдеры с помощью Three.js и Shader Park - Igor Gorlov
description: >-
  В этом уроке мы рассмотрим, как создать аудиореактивный шейдер с помощью
  Three.js и Shader Park. Предварительные требования включают базовое понимание
  Three.js, но никаких предварительных знаний о Shader Park или шейдерах не
  требуется.
date: 2023-02-26T09:06:33.000Z
author: Igor Gorlov
image: ../../assets/images/undefined-Feb-26-2023.avif
categories:
  - Как закодить
draft: false
tags:
  - JavaScript
  - Shader Park
  - Three.js
  - Webgl
lastmod: 2024-03-20T21:26:46.379Z
---

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://i7x7p5b7.stackpathcdn.com/codrops/wp-content/uploads/2023/02/Shaderpark.jpg" alt=""/></figure>
<!-- /wp:image -->

В этом уроке мы рассмотрим, как создать аудиореактивный шейдер с помощью Three.js и Shader Park. Предварительные требования включают базовое понимание Three.js, но никаких предварительных знаний о Shader Park или шейдерах не требуется.

Смотрите видеоурок и следуйте за ним!

<!-- wp:embed {"url":"https://www.youtube.com/watch?v=ApHFmZpEnqw","type":"video","providerNameSlug":"youtube","responsive":true,"className":"wp-embed-aspect-16-9 wp-has-aspect-ratio"} -->
<figure class="wp-block-embed is-type-video is-provider-youtube wp-block-embed-youtube wp-embed-aspect-16-9 wp-has-aspect-ratio"><div class="wp-block-embed__wrapper">
https://www.youtube.com/watch?v=ApHFmZpEnqw
</div></figure>
<!-- /wp:embed -->

Демо-версию можно посмотреть здесь.

<!-- wp:buttons -->
<div class="wp-block-buttons"><!-- wp:button -->
<div class="wp-block-button"><a class="wp-block-button__link wp-element-button" href="https://audio-reactive-shader-three-js-shader-park.glitch.me/" target="_blank" rel="noreferrer noopener">Demo</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons -->

Shader Park - это библиотека JavaScript для создания интерактивных процедурных 2D и 3D шейдеров, которая позволяет изучить программирование шейдеров через интерфейс JavaScript без сложности GLSL. Язык вдохновлен P5.js и в настоящее время поддерживает плагины для Three.js, Hydra и TouchDesigner. Документацию по библиотеке Shader Park можно найти здесь. Здесь вы можете найти несколько обучающих видео по началу работы, которые очень полезно изучить, прежде чем погружаться в этот учебник.

<h2 class="wp-block-heading">Начало работы</h2>

Вы можете следовать учебнику на YouTube и этому учебнику, используя начальный шаблон. Есть также Завершенный проект, над которым мы будем работать, который вы также можете использовать, чтобы сделать любой шейдер из Shader Park аудиореактивным. Если у вас есть вопросы, пожалуйста, обращайтесь в Shader Park Discord. Документацию по Shader Park можно найти здесь.

Для начала создайте аккаунт на Glitch.com, откройте стартовый шаблон и нажмите кнопку Remix в правом верхнем углу страницы, чтобы вы могли начать работать дальше.

Обратите внимание, что в начальном шаблоне у нас уже настроена базовая сцена в Three.js. Она включает в себя сцену, камеру, рендерер и элементы управления орбитой, а также геометрию сферы с наложенным на нее материалом.

В этом уроке мы создадим свой собственный материал с помощью Shader Park, настроим аудиореактивность и объединим их вместе.

Сначала мы поменяем материал и сетку для геометрии сферы на сгенерированные Shader Park. Обратите внимание, что в верхней части стартового шаблона мы уже импортировали функцию createSculptureWithGeometry из shader-park-core.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">import { createSculptureWithGeometry } from 'https://unpkg.com/shader-park-core/dist/shader-park-core.esm.js';</code></pre>
<!-- /wp:code -->

Давайте удалим существующий материал и сетку. Закомментируем строки 35 и 36 и разкомментируем 38-45, чтобы создать наш шейдер (показано ниже).

createSculptureWithGeometry принимает следующие параметры:

геометрия из three.js (это может быть любая геометрия)

код парка шейдеров в виде строки (это JavaScript, но он преобразуется в GLSL, язык программирования, который будет работать на видеокарте вашего компьютера)

функция обратного вызова, возвращающая словарь форм (мы рассмотрим их в ближайшее время, а пока считайте, что это входные данные для вашего шейдера, которые мы можем обновлять извне с помощью JavaScript)

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">// let material = new MeshBasicMaterial( { color: 0x33aaee} );
// let mesh = new Mesh(geometry, material);

let mesh = createSculptureWithGeometry(geometry, spCode(), () =&gt; {
  return {
    time: state.time,
    // pointerDown: state.pointerDown,
    mouse: state.mouse,
    // audio: state.audio,
  }
})</code></pre>
<!-- /wp:code -->

<!-- wp:image {"id":70253} -->
<figure class="wp-block-image"><img src="https://i7x7p5b7.stackpathcdn.com/codrops/wp-content/uploads/2023/02/image-324x300.png" alt="" class="wp-image-70253"/></figure>
<!-- /wp:image -->

Обратите внимание, что теперь мы получаем 3D-куб, но куда делась геометрия нашей сферы?

Перейдите в sp-code.js (здесь мы размещаем код Shader Park) и вы увидите определение для нашей коробки. Попробуйте увеличить масштаб коробки примерно до 1,5.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">export function spCode() {
  return `
      box(vec3(1.5));
  `;
}</code></pre>
<!-- /wp:code -->

<!-- wp:image {"id":70254} -->
<figure class="wp-block-image"><img src="https://i7x7p5b7.stackpathcdn.com/codrops/wp-content/uploads/2023/02/image-1-312x300.png" alt="" class="wp-image-70254"/></figure>
<!-- /wp:image -->

Итак, сфера вернулась, и если вы щелкните в панели предварительного просмотра и перетащите сферу вокруг, вы можете начать видеть края нашей коробки. Что же здесь происходит?

Мы по-прежнему используем нашу геометрию сферы в качестве ограничивающей рамки, но теперь Shader Park сгенерировал для нас материал за кулисами и применил его к геометрии. Что действительно интересно, так это то, что мы можем моделировать 3D-шейдер внутри материала, и это дает нам несколько действительно интересных техник, о которых мы расскажем в ближайшее время.

<h2 class="wp-block-heading">Добавление входов / форм в наш шейдер</h2>

По умолчанию позиция мыши и время недоступны в шейдере. Чтобы сделать их доступными, нам нужно передать их. При работе со встроенным редактором Shader Park настройка выполняется автоматически, но в коде Three.js нам нужно вручную добавить входы (обычно называемые униформами в шейдерах) в обратном вызове createSculptureWithGeometry. Позже мы будем использовать форму под названием “audio”, чтобы передать анализ звука из Three.js в наш шейдер.

Давайте протестируем создание входа / формы, добавив в файл sp-code.js вход под названием “size” и используя его для изменения размера коробки:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">export function spCode() {
  return `
      let size = input();
      box(vec3(size));
  `;
}</code></pre>
<!-- /wp:code -->

Далее в нашем файле script.js нужно добавить форму под названием “size” и передать значение для размера. Важно отметить, что название может быть любым, но оно должно совпадать как в коде Shader Park, так и в функции обратного вызова createSculptureWithGeometry.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">let mesh = createSculptureWithGeometry(geometry, spCode(), () =&gt; {
  return {
    time: state.time,
    size: .5,
    // pointerDown: state.pointerDown,
    mouse: state.mouse,
    // audio: state.audio,
  }
})</code></pre>
<!-- /wp:code -->

Обратите внимание, что существует также объект state, который вы можете использовать для хранения переменных, аналогично тому, как мы используем time. Обратите внимание на state.time.

Давайте удалим форму размера из нашего кода Shader Park и createSculptureWithGeometry. Давайте добавим события щелчка, используя событие pointerDown. Пройдите вперед и откомментируйте указатель вниз из createSculptureWithGeometry в строке 41, а также в объекте state в строке 26 и currPointerdown в строке 27.

Нам нужно будет определить это в нашем sp-code.js. Попробуйте использовать его в качестве размера коробки.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">export function spCode() {
  return `
      let pointerDown = input();
      box(vec3(pointerDown));
  `;
}</code></pre>
<!-- /wp:code -->

Теперь при щелчке на панели предварительного просмотра вы увидите, как изменяется размер поля. Обратите внимание, что код для обработки события опускания указателя определен в строках 54, 55, а также в цикле рендеринга в строке 77 применяется смягчение / линейная интерполяция. Вы также можете сделать что-то подобное, если захотите создать шейдер, который будет реагировать на событие прокрутки страницы. Далее давайте добавим аудиореактивность.

<h2 class="wp-block-heading">Добавление аудиореактивности</h2>

Посмотрите документацию на сайте Three.js по аудиоанализатору. Мы добавим его в наш проект, но вместо использования глобально определенного THREE, мы просто импортируем все отдельные компоненты из Three.js, чтобы наш сайт был легче. Обязательно посмотрите на функцию getFrequencyData, которую мы будем использовать для извлечения низких нот из нашего аудио.

Мы также настроим кнопку загрузки аудио, которую вы можете нажать для воспроизведения аудио, поскольку для запуска аудио на мобильных устройствах необходимо физическое действие.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">// create an Audio source
const sound = new Audio( listener );

let button = document.querySelector('.button');
button.innerHTML = "Loading Audio..."
// Notice that we removed display none

// load a sound and set it as the Audio object's buffer
const audioLoader = new AudioLoader();
audioLoader.load( 'https://cdn.glitch.global/59b80ec2-4e5b-4b54-b910-f3441cac0fd6/OP1Beat.wav?v=1667175863547', function( buffer ) {
  sound.setBuffer( buffer );
  sound.setLoop(true);
  sound.setVolume(0.5);
  button.innerHTML = "Play Audio"
  button.addEventListener('pointerdown', () =&gt; {
    sound.play();
    button.style.display = 'none';
  }, false);
});

// create an AudioAnalyser, passing in the sound and desired fftSize
// get the average frequency of the sound
const analyser = new AudioAnalyser( sound, 32 );
</code></pre>
<!-- /wp:code -->

Чтобы добавить аудиофайл в Glitch, перейдите в раздел активов, затем перетащите песню. После загрузки нажмите на актив, и вы получите URL-адрес медиафайла. Вы можете заменить существующий URL, который является первым параметром audioLoader.load().

<!-- wp:image {"id":70266} -->
<figure class="wp-block-image"><img src="https://i7x7p5b7.stackpathcdn.com/codrops/wp-content/uploads/2023/02/image-7-800x318.png" alt="" class="wp-image-70266"/></figure>
<!-- /wp:image -->

Откомментируйте аудио и currAudio из state в строках 28 и 29 и из createSculptureWithGeometry в строках 41 и 43. Мы будем использовать их для отслеживания… вы угадали… нашего аудио :). Мы будем использовать аудио из предыдущего кадра для добавления смягчения / линейной интерполяции, чтобы наши визуальные эффекты выглядели гладкими и маслянистыми.

Далее нам нужно получить анализ аудио, поэтому мы можем добавить следующее в наш цикл рендеринга в строке 78:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">if(analyser) {
  state.currAudio += Math.pow((analyser.getFrequencyData()[2] / 255) * .81, 8) + clock.getDelta() * .5;
  state.audio = .2 * state.currAudio + .8 * state.audio;
}</code></pre>
<!-- /wp:code -->

Функция getFrequencyData()[2] вернет нам данные из второго бина аудиоанализа, который представляет низкие ноты. Значения находятся в диапазоне 0-255, поэтому мы делим на 255, чтобы нормализовать их от 0-1. Затем мы немного уменьшим масштаб значений и поднимем их до степени 8. Поднятие аудиоанализа до степени позволяет добиться более значительных изменений в звуке, чтобы выходное значение приблизилось к 1, например, при ударе ударной установки. Это выглядит хорошо для моей песни, но может потребоваться подстройка для вашей собственной, поэтому обязательно поиграйте с этими значениями. Далее мы добавим clock.getDelta().\*5, чтобы у нас всегда было небольшое движение, даже если звук не воспроизводится.

Во второй строке кода мы устанавливаем фактическую аудио переменную, которую мы будем передавать в шейдер, используя линейную интерполяцию, так что мы получаем 20% текущего аудио и 80% аудио предыдущего кадра. Это добавляет приятное сглаживание. Также обратите внимание, что мы += state.currAudio, поэтому он будет постоянно отсчитываться. Это значение будет хорошо работать только в анимации, где мы обычно используем время в нашем коде Shader Park.

<h2 class="wp-block-heading">Создание нашего шейдера в Shader Park</h2>

Перейдите к встроенному веб-редактору Shader Park. Если вы еще не создали учетную запись, вы можете быстро зарегистрировать ее, чтобы сохранить свой проект.

И снова я настоятельно рекомендую вам ознакомиться с учебниками по началу работы в Shader Park, чтобы вы могли лучше освоить язык. Вы можете найти серию видеоуроков здесь.

Давайте начнем с добавления boxFrame и сферы и смешивания геометрии с входом. По умолчанию мы находимся в режиме объединения геометрии, когда вы можете добавлять в сцену все, что угодно, но здесь мы можем использовать mixGeo, чтобы легко смешивать две геометрии. Мы используем вход / форму под названием pointerDown, чтобы позже, когда мы добавим ее на сайт, мы могли использовать наши события щелчка.

Далее мы можем добавить цвет. Значения цвета варьируются от 0 до 1 в формате RGB. Есть также помощник HSV, если вы хотите. Здесь мы используем базовый синий цвет и добавляем небольшое количество нормалей 3D-объекта, чтобы получить некоторое разнообразие в цвете.

Для создания эффекта пульсации нам нужно использовать шум, который может генерировать случайные значения, непрерывные и плавные. Это может создать вид гор или поверхности воды.

Шуму нужна позиция в пространстве для выборки. Поэтому мы будем использовать getSpace(). Если вы занимаетесь программированием шейдеров, это наш fragCoord с прикрепленным к нему значением z, так что вы получите обратно позицию xyz.

Мы можем использовать нашу функцию noise для окрашивания нашей формы, а также для смещения нашей формы.

Обратите внимание, что мы добавляем vec3 к s. Это позволяет нам переводить место выборки функции шума. В данном случае мы переводим в направлении z с небольшим промежутком времени, чтобы движение казалось случайным. Мы также добавляем наш шум n к размеру нашей сферы и масштабируем ее вниз. Обратите внимание, что вы можете использовать функцию шума для изменения цвета и смещения объекта.

Мы также можем сэмплировать наш шум с направлением лучей, что дает нам угол, под которым камера направлена к объекту.

Давайте создадим еще одну переменную шума под названием n1 и сделаем выборку шума с помощью функции getRayDirection(). Также измените размер сферы, чтобы использовать n1 вместо n.

По-настоящему классная техника - взять координату из одного шума и передать ее в позицию другого.

Возьмем n1 и передадим ее в позицию для n. Изменим размер сферы, чтобы снова использовать n вместо n1.

Далее мы увеличим размер нашего boxFrame, сместим координатное пространство с помощью мыши, чтобы оно реагировало на движение мыши, и добавим красивое освещение с помощью металла и блеска.

Затем мы можем уменьшить количество итераций, которые использует базовый механизм марширования лучей. Техника марширования лучей позволяет нам создать 3D-шейдер, уменьшив количество итераций до 5, мы получим что-то более близкое к 2D-шейдеру. Это также улучшает производительность.

Наконец, мы создадим вход для аудио и заменим переменную time на аудио во всем шейдере.

<!-- wp:image {"id":70291} -->
<figure class="wp-block-image"><img src="https://i7x7p5b7.stackpathcdn.com/codrops/wp-content/uploads/2023/02/Screen-Shot-2023-02-04-at-9.56.08-PM-800x500.png" alt="" class="wp-image-70291"/></figure>
<!-- /wp:image -->

Последний шаг — вернуть этот код в наш проект. Вы можете скопировать код Shader Park и поместить его в файл sp-code.js:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">export function spCode() {
  return `
      let pointerDown = input();
      let audio = input()

      setMaxIterations(5)

      let s = getSpace();
      let r = getRayDirection();

      let n1 = noise(r * 4 + vec3(0, 0, audio*.1));
      let n = noise(s + vec3(0, 0, audio*.1) + n1);

      metal(n*.5+.5);
      shine(n*.5+.5);

      displace(mouse.x*2, mouse.y*2, 0)
      color(normal * .1 + vec3(0, 0, 1));
      boxFrame(vec3(2), abs(n) * .1 + .04 );
      mixGeo(pointerDown);
      sphere(n * .5 + .8);
  `;
}</code></pre>
<!-- /wp:code -->

Вот и все!

Надеюсь, вам понравился этот урок. Мне не терпится увидеть, что вы создадите с его помощью!
