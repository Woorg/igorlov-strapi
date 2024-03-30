---
title: Лучшие библиотеки пагинации с открытым исходным кодом для Vue 3
meta_title: Лучшие библиотеки пагинации с открытым исходным кодом для Vue 3 - Igor Gorlov
description: >-
  Сегодня как никогда важно отображать данные эффективным способом, который не
  вызывает задержек при загрузке или проблем с рендерингом. 
date: 2023-06-04T20:50:09.000Z
author: Igor Gorlov
image: ../../assets/images/undefined-Jun-04-2023.avif
categories:
  - Как закодить
tags:
  - Vue 3
draft: false
lastmod: 2024-03-20T21:26:45.605Z
---

Сегодня как никогда важно отображать данные эффективным способом, который не вызывает задержек при загрузке или проблем с рендерингом. Пагинация — это техника, которая разбивает большие страницы данных на более мелкие разделы контента, облегчая пользователю навигацию и поиск нужной информации. Пагинация улучшает UX веб-приложения, а также повышает производительность приложения за счет сокращения общего времени загрузки страниц.

Однако внедрение пагинации с нуля может быть трудоемкой задачей, требующей много усилий и ресурсов. К счастью, существует несколько отличных библиотек с открытым исходным кодом, которые могут упростить этот процесс и повысить эффективность вашей работы. Использование библиотеки пагинации может сэкономить ваше время и усилия, позволяя вам сосредоточиться на создании других, более важных функций вашего приложения.

В этой статье мы рассмотрим некоторые из лучших библиотек пагинации для Vue 3, проанализируем их возможности, популярность и поддержку. Эти библиотеки оснащены готовыми компонентами, стилями и функциональностью, что упрощает разработчикам задачу быстрого добавления пагинации в свои проекты. Давайте приступим!

<!-- wp:rank-math/toc-block {"title":"Содержание статьи","headings":[{"key":"4f85db18-28c9-44ad-b366-53420a626ac2","content":"Vue Awesome Paginate","level":2,"link":"#vue-awesome-paginate","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"62e5d105-ef9e-4cf0-80de-f6d6cdac5f40","content":"v-page","level":2,"link":"#v-page","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"fa02079e-d237-42a6-9b5a-752d7a84f25c","content":"vuejs-paginate-next","level":2,"link":"#vuejs-paginate-next","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"6f0ae40c-4eaa-4067-bbf1-6e826c5a6ef0","content":"Заключение","level":2,"link":"#заключение","disable":false,"isUpdated":false,"isGeneratedLink":true}],"listStyle":"ul"} -->
<div class="wp-block-rank-math-toc-block" id="rank-math-toc"><h2>Содержание статьи</h2><nav><ul><li class=""><a href="#vue-awesome-paginate">Vue Awesome Paginate</a></li><li class=""><a href="#v-page">v-page</a></li><li class=""><a href="#vuejs-paginate-next">vuejs-paginate-next</a></li><li class=""><a href="#заключение">Заключение</a></li></ul></nav></div>
<!-- /wp:rank-math/toc-block -->

<h2 class="wp-block-heading" id="vue-awesome-paginate">Vue Awesome Paginate</h2>

Библиотека Vue Awesome Paginate - это современная и мощная библиотека с множеством легких, настраиваемых и простых в использовании компонентов пагинации. Построенная на TypeScript и Vite, Vue Awesome Paginate предоставляет все функциональные возможности пагинации в одном пакете с нулевыми зависимостями, что делает ее простой в установке и использовании.

Vue Awesome Paginate предлагает полную поддержку настройки для каждого компонента с помощью чистого CSS, что позволяет вам настроить внешний вид и функциональность компонентов пагинации в соответствии с дизайном вашего сайта. Он также обеспечивает поддержку RTL (справа налево), поддержку SEO и поддержку различных локализаций:

<img srcset="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" width="600" height="474" data-attachment-id="170657" data-permalink="http://blog.logrocket.com/best-open-source-pagination-libraries-vue-3/attachment/vue-awesome-paginate-components/" data-orig-file="https://blog.logrocket.com/wp-content/uploads/2023/05/vue-awesome-paginate-components.gif" data-orig-size="600,474" data-comments-opened="1" data-image-meta="{&quot;aperture&quot;:&quot;0&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;0&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;0&quot;,&quot;iso&quot;:&quot;0&quot;,&quot;shutter_speed&quot;:&quot;0&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;0&quot;}" data-image-title="vue-awesome-paginate-components" data-image-description="" data-image-caption="" data-medium-file="https://blog.logrocket.com/wp-content/uploads/2023/05/vue-awesome-paginate-components.gif?w=300" data-large-file="https://blog.logrocket.com/wp-content/uploads/2023/05/vue-awesome-paginate-components.gif?w=600" class="wp-image-170657 size-full jetpack-lazy-image" src="http://blog.logrocket.com/wp-content/uploads/2023/05/vue-awesome-paginate-components.gif?is-pending-load=1" alt="Vue Awesome Paginate Components">

Примеры компонентов Vue Awesome Paginate

По умолчанию Vue Awesome Paginate использует следующие реквизиты и события, которые вы можете настроить в соответствии со своими предпочтениями:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript"> &lt;vue-awesome-paginate
    :total-items="100"
    :items-per-page="5"
    :max-pages-shown="5"
    v-model="currentPage"
    :on-click="onClickHandler"
  /&gt;
</code></pre>
<!-- /wp:code -->

<h2 class="wp-block-heading" id="v-page"><code>v-page</code></h2>

V-page - это простая и гибкая библиотека пагинации Vue 3, которая предлагает пользователям ряд возможностей для настройки компонентов пагинации. С v-page вы можете использовать только те компоненты, которые вам нужны, в дополнение к скопированным слотам для более настраиваемых опций.

Вы можете добавить опцию All в список размеров страницы для отображения всех данных без постраничного просмотра, задать текущую страницу, общее количество записей, язык пагинации, меню размеров страницы, направление выравнивания и многое другое с помощью реквизитов.

Когда данные пагинации изменяются, библиотека v-page запускает событие изменения. В целом, v-page - это полезная библиотека для разработчиков Vue, желающих реализовать пагинацию в своих приложениях с различными возможностями настройки. Она поставляется в следующем формате по умолчанию, поэтому вы можете легко добавить дополнительные реквизиты:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript"> &lt;Page
    :total-row="21"
    @change="changeBasic"
  /&gt;
</code></pre>
<!-- /wp:code -->

<img srcset="https://blog.logrocket.com/wp-content/uploads/2023/05/v-page-vue-pagination-library-demo.png 730w, https://blog.logrocket.com/wp-content/uploads/2023/05/v-page-vue-pagination-library-demo.png?resize=300,30 300w" width="730" height="72" data-attachment-id="170658" data-permalink="http://blog.logrocket.com/best-open-source-pagination-libraries-vue-3/attachment/v-page-vue-pagination-library-demo/" data-orig-file="https://blog.logrocket.com/wp-content/uploads/2023/05/v-page-vue-pagination-library-demo.png" data-orig-size="730,72" data-comments-opened="1" data-image-meta="{&quot;aperture&quot;:&quot;0&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;0&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;0&quot;,&quot;iso&quot;:&quot;0&quot;,&quot;shutter_speed&quot;:&quot;0&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;0&quot;}" data-image-title="v-page-vue-pagination-library-demo" data-image-description="" data-image-caption="" data-medium-file="https://blog.logrocket.com/wp-content/uploads/2023/05/v-page-vue-pagination-library-demo.png?w=300" data-large-file="https://blog.logrocket.com/wp-content/uploads/2023/05/v-page-vue-pagination-library-demo.png?w=730" data-lazy-sizes="(max-width: 730px) 100vw, 730px" class="wp-image-170658 size-full jetpack-lazy-image" src="http://blog.logrocket.com/wp-content/uploads/2023/05/v-page-vue-pagination-library-demo.png?is-pending-load=1" alt="V Page Vue Pagination Library Demo">

Пример пользовательского интерфейса v-страницы

<h2 class="wp-block-heading" id="vuejs-paginate-next">vuejs-paginate-next</h2>

Vuejs-paginate-next - это надежная библиотека Vue, которая упрощает процесс реализации пагинации в приложениях Vue 3. Чтобы обеспечить полную поддержку Vue 3, библиотека vuejs-paginate-next была создана на основе существующей библиотеки vuejs-paginate, которая поддерживает только Vue 2:

<img srcset="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" width="640" height="76" data-attachment-id="171026" data-permalink="http://blog.logrocket.com/best-open-source-pagination-libraries-vue-3/attachment/vuejs-paginate-next/" data-orig-file="https://blog.logrocket.com/wp-content/uploads/2023/06/vuejs-paginate-next.gif" data-orig-size="640,76" data-comments-opened="1" data-image-meta="{&quot;aperture&quot;:&quot;0&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;0&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;0&quot;,&quot;iso&quot;:&quot;0&quot;,&quot;shutter_speed&quot;:&quot;0&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;0&quot;}" data-image-title="vuejs-paginate-next" data-image-description="" data-image-caption="" data-medium-file="https://blog.logrocket.com/wp-content/uploads/2023/06/vuejs-paginate-next.gif?w=300" data-large-file="https://blog.logrocket.com/wp-content/uploads/2023/06/vuejs-paginate-next.gif?w=640" class="wp-image-171026 size-full jetpack-lazy-image" src="http://blog.logrocket.com/wp-content/uploads/2023/06/vuejs-paginate-next.gif?is-pending-load=1" alt="Vue js Paginate Next">vuejs-paginate-next демо

Библиотека предоставляет простой в использовании API, который упрощает разработчикам реализацию пагинации без необходимости написания сложного кода. Она поставляется со стилями по умолчанию из Bootstrap v5, но может быть легко настроена с помощью CSS, что позволяет легко интегрировать ее в существующий дизайн приложения.

Vuejs-paginate-next предоставляет ряд опций для настройки, включая количество отображаемых страниц, количество элементов на странице и текущую страницу. Вы можете использовать его в компоненте в следующем формате:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">&lt;paginate
  :page-count="20"
  :click-handler="functionName"
  :prev-text="Prev"
  :next-text="Next"
  :container-class="className"
/&gt;
</code></pre>
<!-- /wp:code -->

Vue Использование функции useOffsetPagination

На момент написания статьи Vue 3 все еще относительно новый, что означает ограниченный выбор библиотек пагинации, доступных для Vue 3. Однако разработчикам все еще доступны быстрые альтернативы; один из подходов - использование внешних библиотек, предоставляющих композитные функции, например, библиотеки Vue Use.

Vue Use предоставляет ряд полезных композитных функций, включая функцию пагинации, которая работает для приложений Vue 3. Библиотека Vue Use имеет небольшой вес, что делает ее быстрым и эффективным решением для реализации пагинации в Vue 3.

В приведенном ниже фрагменте кода показан пример использования функции useOffsetPagination. Сначала мы устанавливаем и импортируем библиотеку в компонент:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">npm i @vueuse/core


import { useOffsetPagination } from '@vueuse/core'
</code></pre>
<!-- /wp:code -->

В зависимости от варианта использования, мы можем определить различные необходимые опции, параметры и функции:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">// Creates a function that gets the current pages data from the database
function fetch(page: number, pageSize: number) {
  return new Promise&lt;User[]&gt;((resolve, reject) =&gt; {
    const start = (page - 1) * pageSize
    const end = start + pageSize
    setTimeout(() =&gt; {
      resolve(database.value.slice(start, end))
    }, 100)
  })
}

const data: Ref&lt;User[]&gt; = ref([])
const page = ref(1)
const pageSize = ref(10)
fetchData({
  currentPage: page.value,
  currentPageSize: pageSize.value,
})

// This function then calls the fetch function to get the data for the current page
function fetchData({ currentPage, currentPageSize }: { currentPage: number; currentPageSize: number }) {
  fetch(currentPage, currentPageSize).then((responseData) =&gt; {
    data.value = responseData
  })
}
</code></pre>
<!-- /wp:code -->

Next, we can pass the values into the composition function:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">//This shows the implementation of the pagination composable function,the customized values are in as parameters in the function
const {
  currentPage,
  currentPageSize,
  pageCount,
  isFirstPage,
  isLastPage,
  prev,
  next,
} = useOffsetPagination({
  total: database.value.length,
  page: 1,
  pageSize,
  onPageChange: fetchData,
  onPageSizeChange: fetchData,
})
</code></pre>
<!-- /wp:code -->

Как только это будет сделано, мы сможем непосредственно интегрировать его в шаблон:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">&lt;div&gt;
  &lt;div&gt;
      total: {{ database.length }}
  &lt;/div&gt;
  &lt;div&gt;
    &lt;button :disabled="isFirstPage" @click="prev"&gt; prev &lt;/button&gt;
    &lt;button
      v-for="item in pageCount"
      :key="item"
      :disabled="currentPage === item"
      @click="currentPage = item"
    &gt;
      {{ item }}
    &lt;/button&gt;
    &lt;button :disabled="isLastPage" @click="next"&gt;
      next
    &lt;/button&gt;
  &lt;/div&gt;
</code></pre>
<!-- /wp:code -->

С помощью этого мы легко реализовали функцию постраничного просмотра списка базы данных, которая позволяет нам просматривать сегментированные части списка постранично.

<h2 class="wp-block-heading" id="заключение">Заключение</h2>

Независимо от того, создаете ли вы простое веб-приложение или сложное корпоративное приложение, внедрение функции пагинации может значительно улучшить пользовательский опыт и повысить производительность вашего приложения. С помощью библиотеки пагинации вы можете сделать это легко и эффективно.

В этой статье мы рассмотрели три отличные библиотеки пагинации с открытым исходным кодом, а также композитную функцию useOffsetPagination из библиотеки Vue Use.&nbsp;Когда дело доходит до выбора подходящей библиотеки пагинации, очень важно учитывать конкретные требования вашего проекта и желаемые функции. У каждой библиотеки есть свои сильные и слабые стороны, поэтому перед принятием решения вам следует потратить время на анализ функциональности каждой библиотеки и учесть потребности вашего проекта.

Выбранная библиотека должна соответствовать общему дизайну веб-приложения, чтобы функция пагинации воспринималась как естественная часть пользовательского интерфейса.

Если у вас возникли вопросы, вы можете связаться со мной в Twitter или оставить комментарий ниже.

Спасибо за чтение!
