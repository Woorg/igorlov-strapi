---
title: CSS Display
meta_title: CSS Display - Igor Gorlov
description: Каскадные таблицы стилей (CSS)  это важнейшая технология для вебдиза
date: 2023-03-22T19:35:46.000Z
author: Igor Gorlov
image: ../../assets/images/undefined-Mar-22-2023.avif
categories:
  - Учебник
tags:
  - Css
draft: false
lastmod: 2024-03-20T21:26:45.456Z
---

<h2 class="wp-block-heading" id="css-display">CSS Display</h2>

Каскадные таблицы стилей (CSS) - это важнейшая технология для веб-дизайнеров и разработчиков. Она позволяет им создавать стили и макеты веб-страниц, делая их привлекательными и отзывчивыми. Одним из важнейших свойств CSS является свойство display, которое определяет, как элемент должен отображаться на веб-странице. В этой статье мы рассмотрим различные значения свойства display и то, как они влияют на оформление веб-страниц.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--LPMq45f3--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://cdn-images-1.medium.com/max/2560/1%2AxU4mVQEfODZ6TTPwrYguDA.png" alt="Created By [Author](https://medium.com/@rutikkpatel) ([Rutik Patel](https://medium.com/@rutikkpatel))"/></figure>
<!-- /wp:image -->

<h2 class="wp-block-heading" id="1-display-inline">1. display: inline;</h2>

CSS-свойство display: inline; используется для отображения элемента как элемента уровня inline, то есть он будет обтекать текст строки. В отличие от элементов блочного уровня, установка конкретных значений высоты и ширины для элемента inline-уровня не влияет на его внешний вид.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="css" class="language-css">.sub-container{
  display: inline;
  width: 100px; /* does not have any affect */
  height: 100px; /* does not have any affect */
}
</code></pre>
<!-- /wp:code -->

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--ceyIzoJK--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://cdn-images-1.medium.com/max/2000/1%2A1UvYDHjWMF7O_2l-CJCrdw.png" alt="display: inline;"/></figure>
<!-- /wp:image -->

<h2 class="wp-block-heading" id="2-display-inline-block">2. display: inline-block;</h2>

Свойство CSS display: inline-block; используется для отображения элемента в виде блочного элемента на уровне inline. Разработчик может установить значения высоты и ширины в соответствии с требованиями.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="css" class="language-css">.sub-container{
  display: inline-block;
  width: 57px; /* Applied Successfully */
  height: 100px; /* Applied Successfully */
}

</code></pre>
<!-- /wp:code -->

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--eWZy1S-Q--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://cdn-images-1.medium.com/max/2000/1%2AWmQ1mzB20Z6k2NFKq0a9EQ.png" alt="display: inline-block;"/></figure>
<!-- /wp:image -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="→-строчные-элементы-в-html">→ строчные элементы в HTML</h3>

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li><code>- &lt;a&gt;</code></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><code>- &lt;img&gt;</code></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><code>- &lt;em&gt;</code></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><code>- &lt;i&gt;</code></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><code>- &lt;strong&gt;</code></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><code>- &lt;small&gt;</code></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><code>- &lt;span&gt;</code></li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<h2 class="wp-block-heading" id="3-display-block">3. display: block;</h2>

Когда мы используем display: block; для элемента, он будет начинаться с новой строки и занимать всю доступную ширину. Вы также можете задать определенные значения ширины и высоты для элемента.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="css" class="language-css">.sub-container {
  display: block;
  width: 100px;
  height: 40px;
}

</code></pre>
<!-- /wp:code -->

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--Ax1LVmiD--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://cdn-images-1.medium.com/max/2000/1%2AUpeYyHZVp5wQ05QW6Nl4qA.png" alt="display: block;"/></figure>
<!-- /wp:image -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="→-блочные-элементы-в-html">→ блочные элементы в HTML</h3>

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li><code>- &lt;div&gt;</code></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><code>- &lt;h1&gt; to &lt;h6&gt;</code></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><code>- &lt;li&gt;</code></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><code>- &lt;p&gt;</code></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><code>- &lt;section&gt;</code></li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<h2 class="wp-block-heading" id="4-display-flex">4. display: flex;</h2>

Это свойство display: flex также используется для новых методов компоновки, таких как Flexbox.

После использования display: flex; мы получаем доступ ко многим свойствам flexbox :-.

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>flex-direction</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>flex-wrap</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>order</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>flex-grow</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>flex-flow</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>flex-shrink</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>justify-content</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>flex-basis</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>align-items</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>align-self</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<h2 class="wp-block-heading" id="5-display-grid">5. display: grid;</h2>

CSS Grid Layout - это очень полезное свойство для создания макетов веб-сайтов путем разделения страницы на секции и определения того, как эти секции соотносятся друг с другом с точки зрения размера, положения и расположения.

Это может быть сделано с помощью элементов HTML для построения макета, что облегчает создание визуально привлекательных и организованных веб-страниц.

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>grid-template</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>grid-template-columns</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>grid-template-rows</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>grid-template-areas</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>grid-auto-columns</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>grid-auto-rows</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>grid-auto-flow</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>grid-row-start</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>grid-row-end</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>grid-column-start</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>grid-column-end</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>grid-row</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>grid-column</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>grid-area</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>gap</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>row-gap</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>column-gap</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<h2 class="wp-block-heading" id="6-display-none">6. display: none;</h2>

Если мы используем display: none; для скрытия элемента, он не занимает места на странице.

Существует три распространенных способа сделать элемент невидимым с помощью CSS:

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>display: none;</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>opacity: 0;</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>visibility: hidden;</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

Давайте разберемся, в чем разница между этими методами:

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--_zPtNQoF--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://cdn-images-1.medium.com/max/2000/1%2AZy9Gmh7rVAcdB3KibmnCLA.png" alt="Разница между отображением, непрозрачностью и видимостью"/></figure>
<!-- /wp:image -->

Если мы применим opacity: 0; или visibility: hidden к любому содержимому, это приведет к тому, что содержимое просто исчезнет с экрана, но область, покрытая содержимым, останется такой, какая она есть.

<h2 class="wp-block-heading" id="заключение">Заключение:</h2>

Свойство display - это мощный инструмент для веб-дизайнеров и разработчиков, позволяющий контролировать макет и внешний вид веб-страниц. Зная различные значения свойства display и их взаимодействие с другими свойствами CSS, разработчики могут создавать визуально привлекательные и отзывчивые дизайны. Независимо от того, начинающий вы или опытный разработчик, владение свойством display является важнейшим навыком для создания современных динамичных веб-страниц. Поэтому понимание свойства display является жизненно важным для всех, кто хочет преуспеть в веб-дизайне и разработке.
