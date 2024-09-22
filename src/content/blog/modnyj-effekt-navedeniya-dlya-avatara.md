---
title: Модный эффект наведения для аватара
meta_title: Модный эффект наведения для аватара - Igor Gorlov
description: >-
  Знаете ли вы такой эффект, когда чья-то голова просовывается сквозь круг или
  отверстие? Знаменитая анимация Порки Пига, где он машет на прощание,
  выскакивая...
date: 2023-02-16T06:14:00.000Z
image: ../../assets/images/undefined-Feb-16-2023.avif
categories:
  - Учебник
author: Igor Gorlov
tags:
  - Css
  - Gradients
draft: false
lastmod: 2024-03-20T21:26:44.540Z
---

Знаете ли вы такой эффект, когда чья-то голова просовывается сквозь круг или отверстие? Знаменитая анимация Порки Пига, где он машет на прощание, выскакивая из серии красных колец, является идеальным примером, и Килиан Валкхоф фактически воссоздал этот эффект здесь, на CSS-Tricks, некоторое время назад.

У меня есть похожая идея, но реализованная другим способом и с добавлением анимации. Я думаю, что это довольно практично и создает аккуратный эффект наведения курсора, который можно использовать на чем-нибудь вроде вашего собственного аватара.

<!-- wp:rank-math/toc-block {"title":"Оглавление","headings":[{"key":"3715a9d5-528c-4539-846b-a4f76d002cfd","content":"The HTML: Just one element","level":2,"link":"#the-html-just-one-element","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"bfbb05d4-9655-4702-843f-5dc5c4d4c8e9","content":"Приступаем к работе!","level":2,"link":"#приступаем-к-работе","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"4bfe7e81-8cb1-4f17-8220-53ebe771198d","content":"Эффект масштаба","level":3,"link":"#эффект-масштаба","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"eb67516e-861a-4ca6-820e-ac15643c8306","content":"Круг","level":2,"link":"#круг","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"759d21ac-5eeb-4512-86c3-709ab81d499d","content":"Нижняя граница","level":2,"link":"#нижняя-граница","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"526d6117-5682-4099-a555-d34c31213386","content":"Добавление CSS-маски","level":2,"link":"#добавление-css-маски","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"a1fb25b7-b5d2-4513-9a20-523995355ecf","content":"Вот наш окончательный вариант CSS:","level":2,"link":"#вот-наш-окончательный-вариант-css","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"0c11c847-7ef9-460a-a05e-a7608af418e6","content":"Завершение работы","level":2,"link":"#завершение-работы","disable":false,"isUpdated":false,"isGeneratedLink":true}],"listStyle":"ul"} -->
<div class="wp-block-rank-math-toc-block" id="rank-math-toc"><h2>Оглавление</h2><nav><ul><li class=""><a href="#the-html-just-one-element">The HTML: Just one element</a></li><li class=""><a href="#приступаем-к-работе">Приступаем к работе!</a><ul><li class=""><a href="#эффект-масштаба">Эффект масштаба</a></li></ul></li><li class=""><a href="#круг">Круг</a></li><li class=""><a href="#нижняя-граница">Нижняя граница</a></li><li class=""><a href="#добавление-css-маски">Добавление CSS-маски</a></li><li class=""><a href="#вот-наш-окончательный-вариант-css">Вот наш окончательный вариант CSS:</a></li><li class=""><a href="#завершение-работы">Завершение работы</a></li></ul></nav></div>
<!-- /wp:rank-math/toc-block -->

<!-- wp:embed {"url":"https://codepen.io/t_afif/pen/MWBjraa","type":"wp-embed","providerNameSlug":"codepen"} -->
<figure class="wp-block-embed is-type-wp-embed is-provider-codepen wp-block-embed-codepen"><div class="wp-block-embed__wrapper">
https://codepen.io/t_afif/pen/MWBjraa
</div></figure>
<!-- /wp:embed -->

Видите это? Мы сделаем анимацию масштабирования, при которой аватар как бы выскочит из круга, в котором он находится. Круто, правда? Не смотрите на код, давайте вместе шаг за шагом создадим эту анимацию.

<h2 class="wp-block-heading" id="the-html-just-one-element">The HTML: Just one element</h2>

Если вы не проверили код демо-версии и вам интересно, сколько div’ов это займет, то остановитесь прямо здесь, потому что наша разметка - это всего лишь один элемент изображения:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="markup" class="language-markup">&lt;img src="" alt=""&gt;</code></pre>
<!-- /wp:code -->

Да, один элемент! Самое сложное в этом упражнении - использовать как можно меньшее количество кода. Если вы следите за мной некоторое время, вы должны быть привычны к этому. Я изо всех сил стараюсь найти CSS-решения, которые можно реализовать с помощью минимально возможного, наиболее удобного в обслуживании кода.

Я написал серию статей на CSS-Tricks, в которых я исследую различные эффекты наведения, используя одну и ту же HTML-разметку, содержащую один элемент. Я подробно рассказываю о градиентах, маскировке, обтравке, контурах и даже о технике компоновки. Я настоятельно рекомендую ознакомиться с ними, потому что многие приемы я повторно использую в этом посте.

Для нашей работы лучше всего подойдет квадратный файл изображения с прозрачным фоном. Вот тот, который я использую, если вы хотите начать с него.

<img sizes="(min-width: 735px) 864px, 96vw" srcset="https://i0.wp.com/css-tricks.com/wp-content/uploads/2023/01/s_4BDCAE75E12C1EF4B0F3D6ACE87A49C2ED374481A0BCA5961B57D20797041FE3_1673429708961_av1.png?w=1600&amp;ssl=1 1600w, https://i0.wp.com/css-tricks.com/wp-content/uploads/2023/01/s_4BDCAE75E12C1EF4B0F3D6ACE87A49C2ED374481A0BCA5961B57D20797041FE3_1673429708961_av1.png?resize=300%2C300&amp;ssl=1 300w, https://i0.wp.com/css-tricks.com/wp-content/uploads/2023/01/s_4BDCAE75E12C1EF4B0F3D6ACE87A49C2ED374481A0BCA5961B57D20797041FE3_1673429708961_av1.png?resize=1024%2C1024&amp;ssl=1 1024w, https://i0.wp.com/css-tricks.com/wp-content/uploads/2023/01/s_4BDCAE75E12C1EF4B0F3D6ACE87A49C2ED374481A0BCA5961B57D20797041FE3_1673429708961_av1.png?resize=150%2C150&amp;ssl=1 150w, https://i0.wp.com/css-tricks.com/wp-content/uploads/2023/01/s_4BDCAE75E12C1EF4B0F3D6ACE87A49C2ED374481A0BCA5961B57D20797041FE3_1673429708961_av1.png?resize=768%2C768&amp;ssl=1 768w, https://i0.wp.com/css-tricks.com/wp-content/uploads/2023/01/s_4BDCAE75E12C1EF4B0F3D6ACE87A49C2ED374481A0BCA5961B57D20797041FE3_1673429708961_av1.png?resize=1536%2C1536&amp;ssl=1 1536w" width="200" height="200" data-recalc-dims="1" class="wp-image-376677" src="https://i0.wp.com/css-tricks.com/wp-content/uploads/2023/01/s_4BDCAE75E12C1EF4B0F3D6ACE87A49C2ED374481A0BCA5961B57D20797041FE3_1673429708961_av1.png?resize=200%2C200&amp;ssl=1" alt="">

Разработано Кангом

Я надеюсь увидеть множество примеров этого, по возможности, с использованием реальных изображений - поэтому, пожалуйста, поделитесь своим конечным результатом в комментариях, когда вы закончите, чтобы мы могли собрать коллекцию!

Прежде чем перейти к CSS, давайте сначала разберем эффект. Изображение увеличивается при наведении, поэтому мы наверняка используем transform: scale(). За аватаром находится круг, и радиальный градиент должен помочь. Наконец, нам нужен способ создать границу в нижней части круга, которая создаст видимость аватара за кругом.

<h2 class="wp-block-heading" id="приступаем-к-работе">Приступаем к работе!</h2>

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="эффект-масштаба">Эффект масштаба</h3>

Начнем с добавления трансформации:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="css" class="language-css">img {
  width: 280px;
  aspect-ratio: 1;
  cursor: pointer;
  transition: .5s;
}
img:hover {
  transform: scale(1.35);
}</code></pre>
<!-- /wp:code -->

<!-- wp:embed {"url":"https://codepen.io/t_afif/pen/JjBNozR/9731ac6d1db49eab010b2b1b133abe30","type":"wp-embed","providerNameSlug":"codepen"} -->
<figure class="wp-block-embed is-type-wp-embed is-provider-codepen wp-block-embed-codepen"><div class="wp-block-embed__wrapper">
https://codepen.io/t_afif/pen/JjBNozR/9731ac6d1db49eab010b2b1b133abe30
</div></figure>
<!-- /wp:embed -->

Пока ничего сложного, верно? Давайте двигаться дальше.

<h2 class="wp-block-heading" id="круг">Круг</h2>

Мы сказали, что фон будет радиальным градиентом. Это идеально, потому что мы можем создавать жесткие остановки между цветами радиального градиента, что создает впечатление, что мы рисуем круг со сплошными линиями.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="css" class="language-css">img {
  --b: 5px; /* border width */

  width: 280px;
  aspect-ratio: 1;
  background:
    radial-gradient(
      circle closest-side,
      #ECD078 calc(99% - var(--b)),
      #C02942 calc(100% - var(--b)) 99%,
      #0000
    );
  cursor: pointer;
  transition: .5s;
}
img:hover {
  transform: scale(1.35);
}</code></pre>
<!-- /wp:code -->

Обратите внимание на переменную CSS, --b, которую я использую. Она представляет собой толщину ”границы”, которая на самом деле используется для определения жестких цветовых ограничителей для красной части радиального градиента.

<!-- wp:embed {"url":"https://codepen.io/t_afif/pen/yLqbNYB/de195eef4df8dfe4c45dee3f6dcd507f","type":"wp-embed","providerNameSlug":"codepen"} -->
<figure class="wp-block-embed is-type-wp-embed is-provider-codepen wp-block-embed-codepen"><div class="wp-block-embed__wrapper">
https://codepen.io/t_afif/pen/yLqbNYB/de195eef4df8dfe4c45dee3f6dcd507f
</div></figure>
<!-- /wp:embed -->

Следующим шагом будет игра с размером градиента при наведении. Круг должен сохранять свой размер при увеличении изображения. Поскольку мы применяем преобразование scale(), нам нужно уменьшить размер круга, так как в противном случае он увеличивается вместе с аватаром. Поэтому, пока изображение увеличивается, нам нужно, чтобы градиент уменьшался.

Давайте начнем с определения переменной CSS, --f, которая определяет ”коэффициент масштабирования”, и используем ее для установки размера круга. Я использую 1 в качестве значения по умолчанию, так как это начальный масштаб для изображения и круга, от которого мы трансформируем.

Вот демонстрация, иллюстрирующая этот трюк. Наведите курсор, чтобы увидеть, что происходит за кулисами:

<!-- wp:embed {"url":"https://codepen.io/t_afif/pen/ExpmjXW/288f0e4bdc2b062d4f03b7db6d56da03","type":"wp-embed","providerNameSlug":"codepen"} -->
<figure class="wp-block-embed is-type-wp-embed is-provider-codepen wp-block-embed-codepen"><div class="wp-block-embed__wrapper">
https://codepen.io/t_afif/pen/ExpmjXW/288f0e4bdc2b062d4f03b7db6d56da03
</div></figure>
<!-- /wp:embed -->

Я добавил третий цвет к радиальному градиенту, чтобы лучше определить область градиента при наведении:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="css" class="language-css">radial-gradient(
  circle closest-side,
  #ECD078 calc(99% - var(--b)),
  #C02942 calc(100% - var(--b)) 99%,
  lightblue
);</code></pre>
<!-- /wp:code -->

Теперь нам нужно расположить наш фон в центре круга и убедиться, что он занимает всю высоту. Мне нравится объявлять все непосредственно в свойстве background shorthand, поэтому мы можем добавить позиционирование фона и убедиться, что оно не повторяется, добавив эти значения сразу после radial-gradient():

<!-- wp:code -->
<pre class="wp-block-code"><code lang="css" class="language-css">background: radial-gradient() 50% / calc(100% / var(--f)) 100% no-repeat;</code></pre>
<!-- /wp:code -->

Фон размещается в центре (50%), имеет ширину, равную calc(100%/var(--f)), и высоту, равную 100%.

Ничего не масштабируется, когда --f равно 1 - опять же, наш начальный масштаб. Тем временем градиент занимает всю ширину контейнера. Когда мы увеличиваем --f, размер элемента увеличивается - благодаря преобразованию scale() - а размер градиента уменьшается.

Вот что мы получим, если применим все это к нашему демонстрационному примеру:

<!-- wp:embed {"url":"https://codepen.io/t_afif/pen/eYjWNed/cf9da694f79514eb6a619439de6896c3","type":"wp-embed","providerNameSlug":"codepen"} -->
<figure class="wp-block-embed is-type-wp-embed is-provider-codepen wp-block-embed-codepen"><div class="wp-block-embed__wrapper">
https://codepen.io/t_afif/pen/eYjWNed/cf9da694f79514eb6a619439de6896c3
</div></figure>
<!-- /wp:embed -->

Мы подошли ближе! У нас есть эффект перелива в верхней части, но нам все еще нужно скрыть нижнюю часть изображения, чтобы оно выглядело так, как будто выскакивает из круга, а не сидит перед ним. Это самая сложная часть всей этой работы, и именно этим мы займемся дальше.

<h2 class="wp-block-heading" id="нижняя-граница">Нижняя граница</h2>

Сначала я попытался решить эту задачу с помощью свойства border-bottom, но мне не удалось найти способ согласовать размер границы с размером круга. Вот лучшее, что у меня получилось, и вы сразу видите, что это неправильно:

<!-- wp:embed {"url":"https://codepen.io/t_afif/pen/zYLwvxp/46302a3bb090e857947572e12795dfac","type":"wp-embed","providerNameSlug":"codepen"} -->
<figure class="wp-block-embed is-type-wp-embed is-provider-codepen wp-block-embed-codepen"><div class="wp-block-embed__wrapper">
https://codepen.io/t_afif/pen/zYLwvxp/46302a3bb090e857947572e12795dfac
</div></figure>
<!-- /wp:embed -->

Реальное решение - использовать свойство outline. Да, контура, а не границы. В предыдущей статье я показал, что свойство outline является мощным и позволяет нам создавать классные эффекты наведения. В сочетании с outline-offset у нас есть именно то, что нужно для нашего эффекта.

Идея заключается в том, чтобы установить контур на изображение и настроить его смещение для создания нижней границы. Смещение будет зависеть от коэффициента масштабирования так же, как и размер градиента.

<!-- wp:embed {"url":"https://codepen.io/t_afif/pen/eYjWpZG/d748690660aa7fff5982f911fa622ace","type":"wp-embed","providerNameSlug":"codepen"} -->
<figure class="wp-block-embed is-type-wp-embed is-provider-codepen wp-block-embed-codepen"><div class="wp-block-embed__wrapper">
https://codepen.io/t_afif/pen/eYjWpZG/d748690660aa7fff5982f911fa622ace
</div></figure>
<!-- /wp:embed -->

Теперь у нас есть нижняя ”граница” (фактически контур) в сочетании с "границей", созданной градиентом, чтобы создать полный круг. Нам все еще нужно скрыть части контура (сверху и по бокам), к чему мы перейдем через некоторое время.

Вот наш код на данный момент, включая еще пару переменных CSS, которые можно использовать для настройки размера изображения (--s) и цвета ”границы” (--c):

<!-- wp:code -->
<pre class="wp-block-code"><code lang="css" class="language-css">img {
  --s: 280px; /* image size */
  --b: 5px; /* border thickness */
  --c: #C02942; /* border color */
  --f: 1; /* initial scale */

  width: var(--s);
  aspect-ratio: 1;
  cursor: pointer;
  border-radius: 0 0 999px 999px;
  outline: var(--b) solid var(--c);
  outline-offset: calc((1 / var(--f) - 1) * var(--s) / 2 - var(--b));
  background: 
    radial-gradient(
      circle closest-side,
      #ECD078 calc(99% - var(--b)),
      var(--c) calc(100% - var(--b)) 99%,
      #0000
    ) 50% / calc(100% / var(--f)) 100% no-repeat;
  transform: scale(var(--f));
  transition: .5s;
}
img:hover {
  --f: 1.35; /* hover scale */
}</code></pre>
<!-- /wp:code -->

Поскольку нам нужна круговая нижняя граница, мы добавили границу-радиус с нижней стороны, что позволяет контуру соответствовать кривизне градиента.

Вычисления, используемые в outline-offset, гораздо более просты, чем кажется. По умолчанию контур рисуется за пределами рамки элемента. А в нашем случае нам нужно, чтобы он перекрывал элемент. Точнее, нам нужно, чтобы он следовал за окружностью, созданной градиентом.

<!-- wp:image {"id":376678} -->
<figure class="wp-block-image"><img src="https://i0.wp.com/css-tricks.com/wp-content/uploads/2023/01/s_4BDCAE75E12C1EF4B0F3D6ACE87A49C2ED374481A0BCA5961B57D20797041FE3_1673437632687_image.png?resize=727%2C569&amp;ssl=1" alt="Диаграмма фонового перехода." class="wp-image-376678"/></figure>
<!-- /wp:image -->

Когда мы масштабируем элемент, мы видим пространство между кругом и краем. Не будем забывать, что идея заключается в том, чтобы сохранить круг в том же размере после выполнения преобразования масштаба, что оставляет нам пространство, которое мы будем использовать для определения смещения контура, как показано на рисунке выше.

Не стоит забывать, что второй элемент масштабируется, поэтому наш результат также масштабируется… что означает, что нам нужно разделить результат на f, чтобы получить реальное значение смещения:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="css" class="language-css">Offset = ((f - 1) * S/2) / f = (1 - 1/f) * S/2</code></pre>
<!-- /wp:code -->

Мы добавляем отрицательный знак, так как нам нужно, чтобы контур шел от внешней стороны к внутренней:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="css" class="language-css">Offset = (1/f - 1) * S/2</code></pre>
<!-- /wp:code -->

Вот быстрый демонстрационный пример, показывающий, как контур следует за градиентом:

<!-- wp:embed {"url":"https://codepen.io/t_afif/pen/VwBbvRw/4474e963f2823899e5b24635c56998fc","type":"wp-embed","providerNameSlug":"codepen"} -->
<figure class="wp-block-embed is-type-wp-embed is-provider-codepen wp-block-embed-codepen"><div class="wp-block-embed__wrapper">
https://codepen.io/t_afif/pen/VwBbvRw/4474e963f2823899e5b24635c56998fc
</div></figure>
<!-- /wp:embed -->

Возможно, вы уже видите это, но нам все еще нужно, чтобы нижний контур перекрывал круг, а не проникал сквозь него. Мы можем сделать это, удалив размер границы из смещения:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="css" class="language-css">outline-offset: calc((1 / var(--f) - 1) * var(--s) / 2) - var(--b));</code></pre>
<!-- /wp:code -->

<!-- wp:embed {"url":"https://codepen.io/t_afif/pen/qBymOGz/a4b0f3652cc89ed1613fc78ec89912a4","type":"wp-embed","providerNameSlug":"codepen"} -->
<figure class="wp-block-embed is-type-wp-embed is-provider-codepen wp-block-embed-codepen"><div class="wp-block-embed__wrapper">
https://codepen.io/t_afif/pen/qBymOGz/a4b0f3652cc89ed1613fc78ec89912a4
</div></figure>
<!-- /wp:embed -->

Теперь нам нужно найти, как удалить верхнюю часть из контура. Другими словами, нам нужна только нижняя часть контура изображения.

Сначала добавим пространство в верхней части с помощью padding, чтобы избежать перекрытия в верхней части:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="css" class="language-css">img {
  --s: 280px; /* image size */
  --b: 5px;   /* border thickness */
  --c: #C02942; /* border color */
  --f: 1; /* initial scale */

  width: var(--s);
  aspect-ratio: 1;
  padding-block-start: calc(var(--s)/5);
  /* etc. */
}
img:hover {
  --f: 1.35; /* hover scale */
}</code></pre>
<!-- /wp:code -->

<!-- wp:embed {"url":"https://codepen.io/t_afif/pen/VwBbaYM/380b4bfb346acea592849f6a1d511c23","type":"wp-embed","providerNameSlug":"codepen"} -->
<figure class="wp-block-embed is-type-wp-embed is-provider-codepen wp-block-embed-codepen"><div class="wp-block-embed__wrapper">
https://codepen.io/t_afif/pen/VwBbaYM/380b4bfb346acea592849f6a1d511c23
</div></figure>
<!-- /wp:embed -->

Нет никакой особой логики в этом верхнем отступе. Идея заключается в том, чтобы контур не касался головы аватара. Я использовал размер элемента для определения этого пространства, чтобы оно всегда имело одинаковую пропорцию.

Обратите внимание, что я добавил значение content-box к фону:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="css" class="language-css">background:
  radial-gradient(
    circle closest-side,
    #ECD078 calc(99% - var(--b)),
    var(--c) calc(100% - var(--b)) 99%,
    #0000
  ) 50%/calc(100%/var(--f)) 100% no-repeat content-box;</code></pre>
<!-- /wp:code -->

Нам это нужно, потому что мы добавили подложку, и мы хотим, чтобы фон был установлен только на поле содержимого, поэтому мы должны явно указать фону остановиться на этом месте.

<h2 class="wp-block-heading" id="добавление-css-маски">Добавление CSS-маски</h2>

Мы добрались до последней части! Все, что нам нужно сделать, это скрыть некоторые части, и все готово. Для этого мы воспользуемся свойством mask и, конечно же, градиентами.

Вот рисунок, иллюстрирующий то, что нам нужно скрыть или что нам нужно показать, чтобы быть более точным

<!-- wp:image {"id":376679} -->
<figure class="wp-block-image"><img src="https://i0.wp.com/css-tricks.com/wp-content/uploads/2023/01/s_4BDCAE75E12C1EF4B0F3D6ACE87A49C2ED374481A0BCA5961B57D20797041FE3_1673443822002_image.png?resize=932%2C526&amp;ssl=1" alt="Показывает, как маска применяется к нижней части круга." class="wp-image-376679"/></figure>
<!-- /wp:image -->

Левое изображение - это то, что мы имеем сейчас, а правое - то, что мы хотим получить. Зеленая часть иллюстрирует маску, которую мы должны применить к исходному изображению, чтобы получить конечный результат.

Мы можем выделить две части нашей маски:

круглая часть внизу, которая имеет те же размеры и кривизну, что и радиальный градиент, который мы использовали для создания круга за аватаром.

прямоугольник в верхней части, который охватывает область внутри контура. Обратите внимание, что контур находится за пределами зеленой области в верхней части - это самая важная часть, поскольку она позволяет обрезать контур так, чтобы была видна только нижняя часть.

<h2 class="wp-block-heading" id="вот-наш-окончательный-вариант-css">Вот наш окончательный вариант CSS:</h2>

<!-- wp:code -->
<pre class="wp-block-code"><code lang="css" class="language-css">img {
  --s: 280px; /* image size */
  --b: 5px; /* border thickness */
  --c: #C02942; /* border color */
  --f: 1; /* initial scale */

  --_g: 50% / calc(100% / var(--f)) 100% no-repeat content-box;
  --_o: calc((1 / var(--f) - 1) * var(--s) / 2 - var(--b));

  width: var(--s);
  aspect-ratio: 1;
  padding-top: calc(var(--s)/5);
  cursor: pointer;
  border-radius: 0 0 999px 999px;
  outline: var(--b) solid var(--c);
  outline-offset: var(--_o);
  background: 
    radial-gradient(
      circle closest-side,
      #ECD078 calc(99% - var(--b)),
      var(--c) calc(100% - var(--b)) 99%,
      #0000) var(--_g);
  mask:
    linear-gradient(#000 0 0) no-repeat
    50% calc(-1 * var(--_o)) / calc(100% / var(--f) - 2 * var(--b)) 50%,
    radial-gradient(
      circle closest-side,
      #000 99%,
      #0000) var(--_g);
  transform: scale(var(--f));
  transition: .5s;
}
img:hover {
  --f: 1.35; /* hover scale */
}</code></pre>
<!-- /wp:code -->

Давайте разберем это свойство маски. Для начала, обратите внимание, что там находится аналогичный радиальный градиент() из свойства background. Я создал новую переменную, --\_g, для общих частей, чтобы сделать ситуацию менее беспорядочной.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="css" class="language-css">--_g: 50% / calc(100% / var(--f)) 100% no-repeat content-box;

mask:
  radial-gradient(
    circle closest-side,
    #000 99%,
    #0000) var(--_g);</code></pre>
<!-- /wp:code -->

Далее, там же есть linear-gradient():

<!-- wp:code -->
<pre class="wp-block-code"><code lang="css" class="language-css">--_g: 50% / calc(100% / var(--f)) 100% no-repeat content-box;

mask:
  linear-gradient(#000 0 0) no-repeat
    50% calc(-1 * var(--_o)) / calc(100% / var(--f) - 2 * var(--b)) 50%,
  radial-gradient(
    circle closest-side,
    #000 99%,
    #0000) var(--_g);</code></pre>
<!-- /wp:code -->

Это создает прямоугольную часть маски. Его ширина равна ширине радиального градиента минус удвоенная толщина границы:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="css" class="language-css">calc(100% / var(--f) - 2 * var(--b))</code></pre>
<!-- /wp:code -->

Высота прямоугольника равна половине, 50%, размера элемента.

Нам также нужен линейный градиент, размещенный в центре горизонтали (50%) и смещенный от вершины на ту же величину, что и смещение контура. Я создал еще одну переменную CSS, --\_o, для смещения, которое мы определили ранее:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="css" class="language-css">--_o: calc((1 / var(--f) - 1) * var(--s) / 2 - var(--b));</code></pre>
<!-- /wp:code -->

Одна из непонятных вещей здесь заключается в том, что нам нужно отрицательное смещение для контура (чтобы переместить его снаружи внутрь), но положительное смещение для градиента (чтобы переместить его сверху вниз). Поэтому, если вам интересно, почему мы умножаем смещение, --\_o, на -1, то теперь вы знаете!

Вот демонстрация, иллюстрирующая конфигурацию градиента маски:

<!-- wp:embed {"url":"https://codepen.io/t_afif/pen/RwBVRNO/dd563d0f41b9c22fcb9aac141bbef029","type":"wp-embed","providerNameSlug":"codepen"} -->
<figure class="wp-block-embed is-type-wp-embed is-provider-codepen wp-block-embed-codepen"><div class="wp-block-embed__wrapper">
https://codepen.io/t_afif/pen/RwBVRNO/dd563d0f41b9c22fcb9aac141bbef029
</div></figure>
<!-- /wp:embed -->

Наведите курсор и посмотрите, как все движется вместе. Средняя рамка иллюстрирует слой маски, состоящий из двух градиентов. Представьте его как видимую часть левого изображения, и вы получите конечный результат справа!

<h2 class="wp-block-heading" id="завершение-работы">Завершение работы</h2>

Вот мы и закончили! И мы не только получили замечательную анимацию наведения, но и сделали все это с помощью одного элемента HTML. Только это и менее 20 строк CSS!

Конечно, мы использовали некоторые маленькие хитрости и математические формулы, чтобы добиться такого сложного эффекта. Но мы точно знали, что делать, потому что заранее определили все необходимые элементы.

Могли бы мы упростить CSS, если бы позволили себе больше HTML? Безусловно. Но мы здесь для того, чтобы научиться новым трюкам CSS! Это было хорошее упражнение для изучения градиентов CSS, маскировки, поведения свойств контура, трансформаций и многого другого. Если в какой-то момент вы почувствуете себя потерянным, обязательно посмотрите мою серию, в которой используются те же общие понятия. Иногда полезно увидеть больше примеров и примеров использования, чтобы донести суть.

На прощание я покажу вам последнюю демонстрацию, в которой используются фотографии популярных разработчиков CSS. Не забудьте показать мне демо с вашим собственным изображением, чтобы я мог добавить его в коллекцию!

<!-- wp:acf/acf-donate {"id":"block_64678dc93985f","name":"acf/acf-donate","data":{"title":"Задонатить на поддержку!","_title":"field_646b621e8617c","list_0_name":"Donatepay","_list_0_name":"field_646b623e8617e","list_0_url":"https://new.donatepay.ru/@1117856","_list_0_url":"field_646b62528617f","list_0_address":"","_list_0_address":"field_646b625d86180","list_1_name":"Donationalerts","_list_1_name":"field_646b623e8617e","list_1_url":"https://www.donationalerts.com/c/woorg_","_list_1_url":"field_646b62528617f","list_1_address":"","_list_1_address":"field_646b625d86180","list_2_name":"USDT (TRC20)","_list_2_name":"field_646b623e8617e","list_2_url":"","_list_2_url":"field_646b62528617f","list_2_address":"TR121HxpTDF71TMm9idZkBaZxnjSMcCPWj","_list_2_address":"field_646b625d86180","list_3_name":"ETH","_list_3_name":"field_646b623e8617e","list_3_url":"","_list_3_url":"field_646b62528617f","list_3_address":"0x442721192987047eDeEC69Ca1D4c706f9Adb16B3","_list_3_address":"field_646b625d86180","list_4_name":"BTC","_list_4_name":"field_646b623e8617e","list_4_url":"","_list_4_url":"field_646b62528617f","list_4_address":"36dLKv5uRozphSQa55w2XgsF42AugPu2QT","_list_4_address":"field_646b625d86180","list":5,"_list":"field_646b62308617d"},"align":"","mode":"edit"} /-->
