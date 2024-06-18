---
title: Сравнение Vue 3 Options API и Composition API
meta_title: "Vue 3 Подробное Сравнение: Options API vs Composition API"
description: Разбираемся в преимуществах и недостатках Vue 3 Options API и Composition API. Обширный анализ с практическими примерами поможет вам определиться с более подходящим методом создания компонентов для вашего проекта на Vue.js.
date: 2023-08-13T20:53:00.000Z
image: ../../assets/images/undefined-Aug-13-2023.avif
categories:
  - Учебник
author: Igor Gorlov
tags:
  - Vue 3
draft: false
lastmod: 2024-06-11T17:04:53.776Z
---

Одним из важнейших аспектов любого фронтенд-фреймворка является способ создания компонентов. Интересно, что Vue.js предлагает не один, а два метода для этого процесса - Options API и Composition API. Но полезно ли это для разработчиков или нет? Давайте выясним.

В этой статье мы сравним каждый из вариантов создания компонентов и обсудим, как выбрать лучший метод для ваших нужд. Мы рассмотрим:

<!-- wp:rank-math/toc-block {"title":"Оглавление","headings":[{"key":"999818de-1ef3-401a-b214-03e1b2df45a3","content":"Почему Vue.js предоставляет два API для создания компонентов?","level":2,"link":"#почему-vue-js-предоставляет-два-api-для-создания-компонентов","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"b43d1815-a0a5-432d-a2a5-e492fba309cc","content":"Сравнение компонента Vue.js, созданного с помощью API Options, с API Composition","level":2,"link":"#сравнение-компонента-vue-js-созданного-с-помощью-api-options-с-api-composition","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"f56842af-694a-44eb-805e-d3158a556f96","content":"Сравнение возможности повторного использования Composition API и Options API","level":2,"link":"#сравнение-возможности-повторного-использования-composition-api-и-options-api","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"16d4758f-b547-4827-bb34-542ad7521b2b","content":"Выбор между Composition API и Options API для проекта Vue.js","level":2,"link":"#выбор-между-composition-api-и-options-api-для-проекта-vue-js","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"321bb278-667c-47e5-9c0f-def4e3c80aa1","content":"Заключение","level":2,"link":"#заключение","disable":false,"isUpdated":false,"isGeneratedLink":true}],"listStyle":"ul"} -->
<div class="wp-block-rank-math-toc-block" id="rank-math-toc"><h2>Оглавление</h2><nav><ul><li class=""><a href="#почему-vue-js-предоставляет-два-api-для-создания-компонентов">Почему Vue.js предоставляет два API для создания компонентов?</a></li><li class=""><a href="#сравнение-компонента-vue-js-созданного-с-помощью-api-options-с-api-composition">Сравнение компонента Vue.js, созданного с помощью API Options, с API Composition</a></li><li class=""><a href="#сравнение-возможности-повторного-использования-composition-api-и-options-api">Сравнение возможности повторного использования Composition API и Options API</a></li><li class=""><a href="#выбор-между-composition-api-и-options-api-для-проекта-vue-js">Выбор между Composition API и Options API для проекта Vue.js</a></li><li class=""><a href="#заключение">Заключение</a></li></ul></nav></div>
<!-- /wp:rank-math/toc-block -->

В конце статьи мы обобщим полученные знания в виде сравнительной таблицы, на которую вы сможете ориентироваться при выборе API Composition или API Options для своего проекта. Давайте сразу перейдем к делу.

<h2 class="wp-block-heading" id="почему-vue-js-предоставляет-два-api-для-создания-компонентов">Почему Vue.js предоставляет два API для создания компонентов?</h2>

Вы можете задаться вопросом, почему Vue предоставляет два способа создания компонентов и нужны ли они оба. Чтобы ответить на этот вопрос, необходимо обратиться к истокам создания Vue.

Vue возникла как простая и удобная библиотека в противовес сложности Angular и неорганизованности React. Цель Vue заключалась в том, чтобы предложить разработчикам простой способ быстро и легко создавать приложения или добавлять интерактивность в существующие проекты или сайты.

API Options успешно достигает этой цели, предоставляя четкий и понятный способ описания компонента путем группировки его кода в опции. При этом не требуется глубоких размышлений или кодовой инженерии - достаточно поместить код в группу опций.

Эта простота - одна из основных причин, по которой разработчики так любят Vue. Однако по мере того как Vue набирал обороты, он превращался в серьезный фреймворк для создания более сложных и требовательных проектов.

Эта эволюция привела к появлению в Vue 3 API Composition, обеспечивающего более мощный и гибкий подход к созданию многократно используемых компонентов. Многие возражали против этого дополнения, но при ближайшем рассмотрении становится понятна причина появления этой новой возможности.

Composition API был разработан для устранения ограничений Options API, в частности, его организации кода. В более сложных приложениях Options API может привести к ”спагетти" кода и дефрагментации. Приведенное ниже изображение иллюстрирует эти различия:

<!-- wp:image {"align":"center","id":176031} -->
<figure class="wp-block-image aligncenter"><img src="http://blog.logrocket.com/wp-content/uploads/2023/08/Vue-3-Composition-API-vs-Options-API-code-breakdown.png?is-pending-load=1" alt="Цветовое разбиение организации кода с помощью Composition Api и Options Api. Группировка кода в опции с помощью Options Api приводит к дефрагментации кода, в то время как Composition Api улучшает целостность кода" class="wp-image-176031"/></figure>
<!-- /wp:image -->

При использовании Options API мы часто разделяем целостную единицу кода на несколько частей и помещаем их в соответствующие группы опций. Для небольших и простых компонентов такое расположение не представляет особой проблемы.

Однако по мере роста приложения и появления необходимости в более сложных и многофункциональных компонентах код может стать сложным для чтения и сопровождения. API Composition решает эту проблему, позволяя хранить логически связанный код в одном месте, что приводит к большей целостности кода и возможности написания действительно многократно используемого кода.

Как мы уже видели, две стратегии создания компонентов в Vue развивались естественным образом по мере развития языка. Не позволяйте этому сбить вас с толку!

В оставшейся части статьи мы более подробно рассмотрим оба API, их преимущества и недостатки. Надеемся, что это прояснит ваше понимание и поможет выбрать правильный API для ваших конкретных сценариев.

<h2 class="wp-block-heading" id="сравнение-компонента-vue-js-созданного-с-помощью-api-options-с-api-composition">Сравнение компонента Vue.js, созданного с помощью API Options, с API Composition</h2>

Если вы новичок в Vue, то приведенные выше объяснения могут показаться вам несколько абстрактными. Поэтому давайте немного конкретизируем ситуацию. Сначала рассмотрим, как выглядит структура Options API:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">export default {
  data() {
    return {

    }
  },

  computed: {

  },

  methods: {

  }
}
</code></pre>
<!-- /wp:code -->

В приведенном примере data, computed и methods - это так называемые опции:

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>в данных содержатся все переменные</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>computed содержит любые вычисляемые переменные</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>методы содержат все необходимые функции приложения</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

Существуют и другие возможности, но здесь мы покажем только основные из них.

Давайте посмотрим на это в действии на примере простого приложения To-Do List:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">&lt;template&gt;
  &lt;h3&gt; My To Do List &lt;/h3&gt;
  &lt;div&gt;
    &lt;input v-model="newItemText" v-on:keyup.enter="addNewTodo" /&gt;
    &lt;button v-on:click="addNewTodo"&gt;Add&lt;/button&gt;
    &lt;button v-on:click="removeTodo"&gt;Remove&lt;/button&gt;
    &lt;button v-on:click="removeAllTodos"&gt;Remove All&lt;/button&gt;
    &lt;transition-group name="list" tag="ul"&gt;
      &lt;li v-for="task in tasks" v-bind:key="task" &gt;{{ task }}&lt;/li&gt;
    &lt;/transition-group&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
  export default {
    data() { 
      return {
        tasks: ["Write my posts", "Go for a walk", "Meet my friends", "Buy fruit"],
        newItemText: ""
      }
    },
    methods: {
      addNewTodo() {
        if (this.newItemText != "") {
          this.tasks.unshift(this.newItemText)
        }
        this.newItemText = ""
      },
      removeTodo() {
        this.tasks.pop()
      },
      removeAllTodos() {
        this.tasks = []
      }
    }
  }
&lt;/script&gt;

&lt;style&gt;
  button {
    margin: 5px;
  }

  ul {
    margin: 30px 0 0 0;
    padding: 0;
    text-align: left;
  }

  li {
    font-size: 1.2em;
    list-style: none;
  }

  .list-enter-active {
    animation: add-item 1s;
  }

  .list-leave-active {
    position: absolute;
    animation: add-item 1s reverse;
  }

  .list-move {
    transition: transform 1s;
  }

  @keyframes add-item {
    0% {
      opacity: 0;
      transform: translateX(150px);
    }
    50% {
      opacity: 0.5;
      transform: translateX(-10px) skewX(20deg);
    }
    100% {
      opacity: 1;
      transform: translateX(0px);
    }
  }
&lt;/style&gt;
</code></pre>
<!-- /wp:code -->

Приведенный пример содержит две переменные и три функции для добавления и удаления пунктов дел. Все они используются в шаблоне.

Как видите, организация кода довольно простая - хорошо организованная и понятная. Это объясняется тем, что наш пример очень прост, но для более сложного компонента это может быть не так.

Обратите внимание, что я не буду объяснять здесь CSS-код. Он приведен для полноты картины и для улучшения пользовательского интерфейса в нашем примере.

Для сложного компонента лучше использовать API Composition. Вот краткая демонстрация структуры этого API:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">export default {
  setup() {
    // Composition API code
    return {
      // Composition API for use in the template
    }
  }
}
</code></pre>
<!-- /wp:code -->

API Composition используется в функции setup(), которая, что интересно, является еще одним вариантом API Options 🙂 . Эта функция позволяет нам использовать реактивность Vue 3 для создания реактивных переменных.

Давайте посмотрим на это в действии на примере, который повторяет наш предыдущий пример с Options API:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">&lt;script&gt;
  import { ref } from 'vue'

  export default {
    setup() {
      const tasks = ref(["Write my posts", "Go for a walk", "Meet my friends", "Buy fruit"])
      const newItemText = ref("")

      function addNewTodo() {
        if (newItemText.value != "") {
          tasks.value.unshift(newItemText.value)
        }
        newItemText.value = ""
      }
      function removeTodo() {
        tasks.value.pop()
      }
      function removeAllTodos() {
        tasks.value = []
      }

      return {
        tasks,
        newItemText,
        addNewTodo,
        removeTodo,
        removeAllTodos
      }
    }
  }
&lt;/script&gt;
</code></pre>
<!-- /wp:code -->

В данном примере мы используем функцию ref для объявления реактивных переменных. Затем мы создаем необходимые функции. Наконец, мы возвращаем все переменные и функции, которые хотим использовать в шаблоне.

<h2 class="wp-block-heading" id="сравнение-возможности-повторного-использования-composition-api-и-options-api">Сравнение возможности повторного использования Composition API и Options API</h2>

Как я уже говорил, одной из основных причин создания Composition API было повышение возможности повторного использования. Vue достигает этого путем введения нового типа компонентов, называемых композитами (composables).

Составные компоненты - это фрагменты кода, которые можно использовать многократно в одном приложении и совместно использовать в разных проектах. В API Options подобную функциональность предоставляют миксины, но они имеют ряд недостатков по сравнению с композитами. Рассмотрим некоторые примеры.

Допустим, нам нужна функциональность счетчика, которую мы хотим повторно использовать в компонентах нашего приложения. Вот как мы можем создать его с помощью миксина:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">// CounterMixin.js
export default {
  data() {
    return { count: 0 }
  },
  methods: {
    increment() {
      this.count++
    },
    decrement() {
      this.count--
    },
    set(val) {
      this.count = val
    },
    reset() {
      this.count = 0
    }
  }
}
</code></pre>
<!-- /wp:code -->

Как видно, миксин - это просто объект опций. И, как мы увидим в следующем примере, мы можем внедрить этот объект в наш компонент.

Продолжая пример со списком дел, изменим заголовок, чтобы он содержал переменную count:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">&lt;h3&gt; My To Do List ({{ count }}) &lt;/h3&gt;
</code></pre>
<!-- /wp:code -->

Затем замените код в секции script на следующий:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">&lt;script&gt;
  import CounterMixin from './mixins/CounterMixin.js'

  export default {
    mixins: [CounterMixin],
    data() { 
      return {
        tasks: ["Write my posts", "Go for a walk", "Meet my friends", "Buy fruit"],
        newItemText: ""
    }},
    mounted() {
      this.set(this.tasks.length)
    },
    methods: {
      addNewTodo() {
        if (this.newItemText != "") {
          this.tasks.unshift(this.newItemText)
          this.increment()
        }
        this.newItemText = ""
      },
      removeTodo() {
        this.tasks.pop()
        this.decrement()
      },
      removeAllTodos() {
        this.tasks = []
        this.reset()
      }
    }
  }
&lt;/script&gt;
</code></pre>
<!-- /wp:code -->

Здесь мы импортируем миксин, а затем регистрируем его с помощью опции mixins. После этого все свойства объекта mixins объединяются с объектом экземпляра Vue.

Теперь мы можем использовать переменные и функции из CounterMixin. С помощью хука mounted() мы устанавливаем начальный счетчик для задач.

На первый взгляд, миксины могут показаться отличными. Однако они имеют ряд существенных недостатков:

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Миксины не могут принимать параметры, поэтому мы не можем использовать динамическую логику. Это делает их менее гибкими и многократно используемыми по сравнению с композитами</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Данные в миксинах не защищены от мутаций. Потребляющий компонент может "молча" изменить свойство миксина, что может привести к трудно выявляемым ошибкам</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>При использовании миксинов мы не можем однозначно отследить данные компонента до их источника. Это справедливо как для локально, так и для глобально зарегистрированных миксинов</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>При использовании нескольких миксинов могут возникать конфликты имен. Как и в случае с правилом "побеждает последний" в CSS, если у вас есть два свойства с одинаковыми именами из разных миксинов, то победит свойство из последнего миксина.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

Избежать всех этих недостатков можно, используя вместо них композиты. Вот контркомпозит с точно такой же функциональностью:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">// useCounter.js
import { ref, readonly } from 'vue'

export default function useCounter() {
  const count = ref(0)
  const increment = () =&gt; { count.value += 1 }
  const decrement = () =&gt; { count.value -= 1 }
  const set = (val) =&gt; { count.value = val }
  const reset = () =&gt; { count.value = 0 }

  return {
    count: readonly(count),
    increment,
    decrement,
    set,
    reset
  }
}
</code></pre>
<!-- /wp:code -->

Композитные функции создаются по тем же принципам, что и функция setup().

Мы создаем необходимые переменные и функции внутри экспортируемой композитной функции и возвращаем те части, которые мы хотим использовать в дальнейшем. Мы также используем функцию readonly() из Reactivity API, чтобы переменная count не была изменена потребляющим компонентом.

Теперь посмотрим, как применяется этот композит. Заменим содержимое секции скрипта на следующее:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">&lt;script&gt;
  import { ref, onMounted } from 'vue'
  import useCounter from './composables/useCounter.js'

  export default {
    setup() {
      const tasks = ref(["Write my posts", "Go for a walk", "Meet my friends", "Buy fruit"])
      const newItemText = ref("")

      const {count, increment, decrement, set, reset} = useCounter()
      onMounted(() =&gt; set(tasks.value.length))

      function addNewTodo() {
        if (newItemText.value != "") {
          tasks.value.unshift(newItemText.value)
        }
        newItemText.value = ""
        increment()
      }
      function removeTodo() {
        tasks.value.pop()
        decrement()
      }
      function removeAllTodos() {
        tasks.value = []
        reset()
      }

      return {
        count,
        tasks,
        newItemText,
        addNewTodo,
        removeTodo,
        removeAllTodos
      }
    }
  }
&lt;/script&gt;
</code></pre>
<!-- /wp:code -->

Здесь мы импортируем компонент, а затем извлекаем его переменные и функции, используя синтаксис деструктуризации присваивания. Мы используем хук onMounted() для установки начального количества дел.

Как видите, здесь хорошо видно, откуда взялись переменные и функции счетчика и какие именно из них доступны для использования.

По сравнению с миксинами, композиты имеют ряд преимуществ:

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>В composables источник данных для каждого свойства или метода ясен и прослеживается. Мы можем видеть, откуда они импортируются и какие именно свойства или методы мы используем.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>При использовании нескольких составных таблиц можно легко избежать конфликтов имен, переименовывая свойства с одинаковыми именами</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Составные компоненты позволяют использовать свойства, доступные только для чтения, что позволяет избежать случайных мутаций, исходящих от других компонентов, и тем самым сохранить данные в безопасности</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Составные элементы создают новое локальное состояние для каждого компонента, в котором они используются, но они также могут определять глобальное, общее состояние</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

Хорошей новостью является то, что вы можете использовать композиты вместе с API Options. Если вам нужны профессионально созданные и готовые к использованию композиты, я рекомендую обратить внимание на замечательную коллекцию под названием VueUse.

<h2 class="wp-block-heading" id="выбор-между-composition-api-и-options-api-для-проекта-vue-js">Выбор между Composition API и Options API для проекта Vue.js</h2>

Итак, мы убедились, что и Composition API, и Options API являются отличными инструментами со своими преимуществами и недостатками. Так какой же из них выбрать для своего проекта?

Я рекомендую выбрать Composition API, если ваш проект сложен или вы предполагаете его масштабирование, а также если вам необходимо создавать многофункциональные и многократно используемые компоненты Vue.

С другой стороны, API Options отлично подходит, если ваш проект небольшой и простой, и вы не предполагаете его масштабирования. Он идеально подходит для однофункциональных компонентов, не требующих многократного использования, а также для тех случаев, когда необходимо добавить немного интерактивности в существующий проект.

Ознакомьтесь с краткой таблицей сравнения Vue Composition API и Vue Options API, которая поможет вам определиться с выбором:

<h2 class="wp-block-heading" id="заключение">Заключение</h2>

В этой статье мы рассмотрели два способа создания компонентов, предоставляемых Vue, - API Options и API Composition. Как мы убедились, оба способа обеспечивают отличную функциональность, но для разных сценариев.

Основной вывод — принять правильное решение о том, какой из них лучше всего подходит для конкретного проекта, и затем наслаждаться его созданием. Если у вас возникли дополнительные вопросы, не стесняйтесь оставлять комментарии ниже.
