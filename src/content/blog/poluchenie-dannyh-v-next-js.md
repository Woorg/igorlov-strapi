---
title: Получение данных в Next.js
meta_title: Получение данных в Next.js - Igor Gorlov
description: >-
  Next.js – это отличный фреймворк React, который отличается высокой скоростью,
  большим количеством настроек, хорошими функциями оптимизации изображений и
  возможностями рендеринга. 
date: 2023-02-25T18:25:27.000Z
author: Igor Gorlov
image: ../../assets/images/undefined-Feb-25-2023.avif
category:
  - Учебник
tag:
  - JavaScript
  - Next.js
lastmod: 2024-03-20T21:26:46.802Z
---

Next.js - это отличный фреймворк React, который отличается высокой скоростью, большим количеством настроек, хорошими функциями оптимизации изображений и возможностями рендеринга. В нем также есть методы, помогающие получать данные с обратной стороны. В этой статье мы рассмотрим, как происходит получение данных на стороне клиента, на стороне сервера и при генерации статического сайта.<br>Сначала давайте рассмотрим, что такое выборка данных и как она выполняется в Next.js.

<!-- wp:rank-math/toc-block {"title":"Оглавление","headings":[{"key":"9bf201b5-5955-40fe-b6a1-a34e53e3bb71","content":"Что такое получение данных?","level":2,"link":"#что-такое-получение-данных","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"92ad73b4-552c-4919-b6fa-d95c2d7b6979","content":"Функции получения данных","level":2,"link":"#функции-получения-данных","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"c94dbb9d-412e-49a4-9a53-3598339f9e9c","content":"Выборка данных на стороне клиента: ","level":2,"link":"#выборка-данных-на-стороне-клиента","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"a029062e-6c32-4523-97c6-e98a79c4b767","content":"Выборка данных на стороне сервера: ","level":2,"link":"#выборка-данных-на-стороне-сервера","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"797172f9-08d2-4216-8266-4e20e39d30b3","content":"Генерация статических сайтов: ","level":2,"link":"#генерация-статических-сайтов","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"c51d6723-0cf9-423a-a429-7694c29ff1b8","content":"Когда использовать каждую функцию?","level":2,"link":"#когда-использовать-каждую-функцию","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"f97f5b24-e5e9-40ac-87e8-5b41be1270b3","content":"Когда необходим рендеринг на стороне клиента?","level":3,"link":"#когда-необходим-рендеринг-на-стороне-клиента","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"0d846955-a38e-4340-8a28-30154977e5e1","content":"Когда использовать рендеринг на стороне сервера?","level":3,"link":"#когда-использовать-рендеринг-на-стороне-сервера","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"51c618cb-4fbe-4af1-b583-113c7b114c20","content":"Когда использовать генерацию статических сайтов?","level":3,"link":"#когда-использовать-генерацию-статических-сайтов","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"310f1717-5967-4bc0-87dd-7f0e874301f8","content":"Методы получения данных в Next.js","level":2,"link":"#методы-получения-данных-в-next-js","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"d04debea-d0a9-4fc3-a076-b69861219636","content":"Использование метода получения данных на стороне клиента","level":2,"link":"#использование-метода-получения-данных-на-стороне-клиента","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"30c65432-72c4-49ac-b3f8-5a702d5ae716","content":"Использование метода выборки данных на стороне сервера","level":2,"link":"#использование-метода-выборки-данных-на-стороне-сервера","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"0234227f-a6ec-44c4-a8f0-ac6f7ec77507","content":"Заключение","level":2,"link":"#заключение","disable":false,"isUpdated":false,"isGeneratedLink":true}],"listStyle":"ul"} -->
<div class="wp-block-rank-math-toc-block" id="rank-math-toc"><h2>Оглавление</h2><nav><ul><li class=""><a href="#что-такое-получение-данных">Что такое получение данных?</a></li><li class=""><a href="#функции-получения-данных">Функции получения данных</a></li><li class=""><a href="#выборка-данных-на-стороне-клиента">Выборка данных на стороне клиента: </a></li><li class=""><a href="#выборка-данных-на-стороне-сервера">Выборка данных на стороне сервера: </a></li><li class=""><a href="#генерация-статических-сайтов">Генерация статических сайтов: </a></li><li class=""><a href="#когда-использовать-каждую-функцию">Когда использовать каждую функцию?</a><ul><li class=""><a href="#когда-необходим-рендеринг-на-стороне-клиента">Когда необходим рендеринг на стороне клиента?</a></li><li class=""><a href="#когда-использовать-рендеринг-на-стороне-сервера">Когда использовать рендеринг на стороне сервера?</a></li><li class=""><a href="#когда-использовать-генерацию-статических-сайтов">Когда использовать генерацию статических сайтов?</a></li></ul></li><li class=""><a href="#методы-получения-данных-в-next-js">Методы получения данных в Next.js</a></li><li class=""><a href="#использование-метода-получения-данных-на-стороне-клиента">Использование метода получения данных на стороне клиента</a></li><li class=""><a href="#использование-метода-выборки-данных-на-стороне-сервера">Использование метода выборки данных на стороне сервера</a></li><li class=""><a href="#заключение">Заключение</a></li></ul></nav></div>
<!-- /wp:rank-math/toc-block -->

<h2 class="wp-block-heading" id="что-такое-получение-данных">Что такое получение данных?</h2>

Выборка данных - это просто способ получения данных. Данные могут быть получены из базы данных, файла JSON или другого программного обеспечения через API, и это может быть сделано во время рендеринга на стороне клиента, рендеринга на стороне сервера или генерации статического сайта.

Получение данных на стороне сервера, на стороне клиента или при генерации статического сайта может иметь некоторые преимущества:

Доступ к данным, поступающим из бэкенда.<br>Он может кэшировать ваши данные, храня их в определенном месте, чтобы сократить время загрузки.<br>Возможность выполнять многократный забор данных.

<h2 class="wp-block-heading" id="функции-получения-данных">Функции получения данных</h2>

В Next.js, существует несколько способов получения данных. Данные поступают либо со стороны клиента, либо со стороны сервера, либо генерируются статическим сайтом.

<h2 class="wp-block-heading" id="выборка-данных-на-стороне-клиента">Выборка данных на стороне клиента: </h2>

При выборке данных на стороне клиента данные выбираются на клиенте, например, в браузере, после отправки пользовательского интерфейса пользователю, даже когда в бэкэнд добавляются новые данные.Это снижает оптимизацию поисковых систем, поскольку пользовательский интерфейс отправляется пользователю без разметки макета. (HTML tags such as <code>&lt;a&gt;</code>, <code>&lt;p&gt;</code>, <code>&lt;h1&gt;</code>, etc. ), и когда данные получены, тогда делается разметка.

<br>Для получения данных на стороне клиента в Next.js используются хуки useState и useEffect из React для рендеринга данных в браузере.

<h2 class="wp-block-heading" id="выборка-данных-на-стороне-сервера">Выборка данных на стороне сервера: </h2>

При выборке данных на стороне сервера данные выбираются, пока пользовательский интерфейс все еще находится на локальной машине, прежде чем отобразить их пользователю. Каждый раз, когда данные добавляются или обновляются, пользовательский интерфейс запрашивает все данные снова, что означает, что при каждом обновлении браузера данные снова запрашиваются перед тем, как отобразить их пользователю. Пользовательский интерфейс создается на локальной машине благодаря фронтенд-библиотекам и фреймворкам, таким как React или Next.js, которые мы используем для создания пользовательского интерфейса. Наша локальная машина выступает в роли сервера. Сбор данных на стороне сервера в Next.js работает с помощью getServerSideProps для получения данных из базы данных или API в качестве бэкенда.

<h2 class="wp-block-heading" id="генерация-статических-сайтов">Генерация статических сайтов: </h2>

Для дальнейшего изложения давайте рассмотрим, что такое генерация статических сайтов. При генерации статического сайта предположим, что у вас есть пользовательский интерфейс, созданный на локальной машине, и API или база данных в качестве бэкенда, содержащая данные, которые должны быть отображены на пользовательском интерфейсе.<br>В этом сценарии данные предварительно извлекаются из бэкенда и отправляются в пользовательский интерфейс до того, как он будет отправлен пользователю. Допустим, мы добавляем новый контент в базу данных; предыдущие данные не нужно извлекать снова, поскольку они уже были предварительно извлечены. Вместо этого выполняется предварительная выборка новых данных и добавление их в пользовательский интерфейс перед отправкой пользователю. Это происходит потому, что предыдущие данные статически хранятся в пользовательском интерфейсе, отсюда и название ”генерация статических сайтов”, и это самый быстрый способ получения данных и отправки их пользователю. Генерация статических сайтов в Next js работает с getStaticProps и getStaticPaths для рендеринга статических страниц.

<h2 class="wp-block-heading" id="когда-использовать-каждую-функцию">Когда использовать каждую функцию?</h2>

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="когда-необходим-рендеринг-на-стороне-клиента">Когда необходим рендеринг на стороне клиента?</h3>

Когда поисковая оптимизация не нужна на вашем сайте, например, на приборной панели сайта.<br>Когда пользовательский интерфейс немного сложен.<br>Когда у сайта много пользователей.

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="когда-использовать-рендеринг-на-стороне-сервера">Когда использовать рендеринг на стороне сервера?</h3>

Он может работать для более динамичных сайтов, таких как сайт электронной коммерции с большим количеством изменяющихся данных.<br>Это противоположность рендерингу на стороне клиента и полезно для сайтов с высокими показателями SEO.<br>Он также хорошо подходит для сайтов с простым пользовательским интерфейсом.

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="когда-использовать-генерацию-статических-сайтов">Когда использовать генерацию статических сайтов?</h3>

Она подходит при создании сайта, данные которого редко меняются, например, сайта-портфолио, где данные редко меняются.<br>Вы можете использовать его для блога с динамическим содержанием данных, которые часто меняются, так как генерация статических сайтов имеет другой тип предварительного рендеринга, инкрементную статическую генерацию.

В конечном итоге, вы можете попробовать эти возможности или функции выборки данных, чтобы выбрать лучшую для вашего сайта или приложения.

<h2 class="wp-block-heading" id="методы-получения-данных-в-next-js">Методы получения данных в Next.js</h2>

В Next.js для получения данных используются некоторые методы получения данных. К этим методам относятся;

useEffect и useState для выборки данных на стороне клиента.<br>getServerSideProps для получения данных на стороне сервера<br>getStaticProps для генерации статического сайта<br>getStaticPath для генерации статического сайта, который использует динамические маршруты.

Поэтому давайте узнаем, как их использовать. Для получения данных я использую внешний API под названием Fake Store API. Внешний API будет выступать для нас в качестве бэкенда или базы данных.

<h2 class="wp-block-heading" id="использование-метода-получения-данных-на-стороне-клиента">Использование метода получения данных на стороне клиента</h2>

Получить данные на стороне клиента довольно просто. Поэтому давайте рассмотрим, как получить данные на стороне клиента.

В папке pages вашего приложения Next.js создайте файл и назовите его index.js.

В файле index.js напишите следующий код. Сначала импортируйте useState и useEffect.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">    import React from 'react'
    import { useEffect, useState } from 'react'</code></pre>
<!-- /wp:code -->

Затем создайте функцию и получите данные, используя URL-адрес API. В нашем случае мы используем API Fake Store, задаем данные в формате JSON и сохраняем их в состоянии. Мы также получим данные с помощью хука useEffect.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">    export default function csr() {
        const [state, setState] = useState([]);
      async function getData() {
        const res = await fetch('https://fakestoreapi.com/products?limit=8');
        const data = await res.json();
        setState(data);
      }
      console.log('i am:',state);
      useEffect(() =&gt; {
        getData();
      }, [])</code></pre>
<!-- /wp:code -->

Наконец, верните данные для отображения пользователю путем сопоставления с данными, хранящимися в состоянии.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">    return (
        &lt;div&gt;
          &lt;h1&gt; Welcome to My blog gallery ssg&lt;/h1&gt;
          &lt;div&gt;
          {
            state.map((e) =&gt; (
                &lt;a key={e.id}&gt;
                &lt;h2&gt; {e.title} &amp;rarr;&lt;/h2&gt;
                &lt;img src={e.image} width={250} height={200}/&gt;
                &lt;p&gt;{e.description}&lt;/p&gt;
                &lt;h3&gt;${e.price}&lt;/h3&gt;
            &lt;/a&gt;
            ))
            }
          &lt;/div&gt;
        &lt;/div&gt;
      )
    }</code></pre>
<!-- /wp:code -->

А затем запустите приложение.

<h2 class="wp-block-heading" id="использование-метода-выборки-данных-на-стороне-сервера">Использование метода выборки данных на стороне сервера</h2>

Теперь давайте поработаем над получением данных на стороне сервера. Во-первых, давайте начнем с getServerSideProps;

Для начала создайте папку в папке pages в вашем приложении Next js.<br>Создайте файл с именем index.js, а затем напишите в нем приведенный ниже код;

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">    import React from 'react'
    export const getServerSideProps = async () =&gt; {
        const res = await fetch('https://fakestoreapi.com/products?limit=8');
        const data = await res.json();
        console.log(data);
        return{
          props: {product: data}
        }
    }
    const index = ({product}) =&gt; {
      return (
        &lt;div&gt;
          &lt;h1&gt; Welcome to My blog gallery ssg&lt;/h1&gt;
            {product.map(item =&gt;(
            &lt;div key={item.id}&gt;
                &lt;a&gt; &lt;h3&gt;{item.title}&lt;/h3&gt; &lt;/a&gt;
                &lt;img src={item.url} /&gt;
            &lt;/div&gt;
        ))}
        &lt;/div&gt;
      )
    }
    export default index</code></pre>
<!-- /wp:code -->

В приведенном выше коде мы используем функцию getServerSideProps для получения данных. Я добавил console.log в функцию, чтобы вывести данные JSON из API. Таким образом, вы можете быть уверены, что данные получены из API. Вы можете удалить console.log; я использовал его только для тестирования.

При получении данных из URL мы устанавливаем ограничение, используя ?limit=8. Это ограничивает количество полученных данных до восьми. Вы можете установить любое число, если оно не превышает общее количество данных или количество элементов.

Самое важное, что нужно отметить, это то, что функция getServerSideProps() не записана в функции компонента, которая называется index. Вместо этого данные передаются как свойство в функцию компонента через возвращаемый объект.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">    return {
      props:{product: data}
    }</code></pre>
<!-- /wp:code -->

В реквизите данные передаются объекту продукта, который, в свою очередь, передается компоненту. Вы также можете записать данные как свойство и передать их компоненту.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">    return {
      props:{data}
    }</code></pre>
<!-- /wp:code -->

Также следует отметить, что по умолчанию передается только функция компонента, но не функция getServerSideProps. Это относится и к другим функциям получения данных в Next js.

В функции компонента, после передачи свойства из getServerSideProps, мы отображаем данные с помощью функции map для получения каждого элемента.

(Не обращайте внимания на стилизацию в div или h1, вы можете использовать свою стилизацию).

Использование метода получения данных для генерации статических сайтов

В этом разделе вы узнаете, как использовать getStaticProps и getStaticPaths для генерации статического сайта.<br>Теперь давайте рассмотрим, как работает getStaticProps(). Честно говоря, это просто и похоже на использование getServerSideProps(), просто измените название функции.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">    import React from 'react'
    
    export const getStaticProps = async () =&gt;{
        const res = await fetch('https://fakestoreapi.com/products?limit=8');
        const data = await res.json()
        
        console.log(data)
        return {
            props: {blog: data}
        }
    }
    const index = ({ blog}) =&gt; {
      return (
        &lt;div className={styles.div}&gt;
          &lt;h1 className={styles.header}&gt; Welcome to My blog gallarey ssg&lt;/h1&gt;
          &lt;div className={styles.content}&gt;
            {blog.map(item =&gt;(
              &lt;div className={styles.card} key={item.id}&gt;
                &lt;img src={item.image} width={200} height={200} /&gt;
                &lt;div className={styles.text}&gt;
                  &lt;a&gt; &lt;h3&gt;{item.title}&lt;/h3&gt; &lt;/a&gt;
                  &lt;p&gt; {item.description}&lt;/p&gt;
                  &lt;h3&gt; ${item.price} &lt;/h3&gt;
                &lt;/div&gt;
              &lt;/div&gt;
            ))}
          &lt;/div&gt; 
        &lt;/div&gt;
      )
    }
    export default index</code></pre>
<!-- /wp:code -->

Разница в том, что при загрузке страницы генерируется предварительно загруженная статическая страница, даже если элемент изменен из базы данных или, в нашем случае, URL API путем изменения ограничения числа на ?limit=7.<br>То есть, предварительно загруженная статическая страница на экране меняется немедленно, в отличие от getServerSideProps, в котором страницу необходимо обновить из браузера, чтобы показать обновленные данные. Это одно из различий между рендерингом на стороне сервера и генерацией статических сайтов.<br>Зная это, давайте рассмотрим генерацию статических путей.

Допустим, вы получаете и показываете список элементов на странице, и вам нужна возможность, при которой пользователь щелкает на любом элементе, и генерируется новая страница, которая отображает информацию о фактическом элементе, который был щелкнут, на основе id элемента. В этом случае вы можете использовать getStaticPaths.

Использование getStaticPaths немного запутанно для некоторых людей, поэтому я разложу это пошагово.

Во-первых, в папке pages вашего приложения Next js создайте папку с названием products. Мы будем использовать это название в качестве примера. На данный момент вы можете использовать любое имя, которое вы хотите использовать в нашем проекте.<br>В папке products создайте файл с именем index.js и еще один с именем [id].js. Этот файл будет использоваться в качестве динамического маршрута для каждого id товара. Вы можете даже назвать его [itemid].js, но для простоты остановитесь на первом, как на изображении ниже.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://blog.openreplay.com/images/data-fetching-in-next-js/images/image01.jpg" alt="1"/></figure>
<!-- /wp:image -->

В файле index.js мы напишем следующий код для получения и отображения всех списков элементов/продуктов на странице. Мы сделаем это с помощью getStaticProps.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">    import React from "react";
    import Link from "Next/link";
    export const getStaticProps = async () =&gt; {
      const res = await fetch("http://localhost:3000/api/data");
      const data = await res.json();
      return {
        props: { products: data },
        revalidate: 20,
      };
    };
    const index = ({ products }) =&gt; {
      return (
        &lt;div&gt;
          {products.map((product) =&gt; (
            &lt;Link href={`products/${product.id}`}&gt;
              &lt;div key={product.id}&gt;
                &lt;h1&gt;{product.title}&lt;/h1&gt;
                &lt;p&gt;{[product.description]}&lt;/p&gt;
              &lt;/div&gt;
            &lt;/Link&gt;
          ))}
        &lt;/div&gt;
      );
    };
    export default index;</code></pre>
<!-- /wp:code -->

Теперь, чтобы сгенерировать статические страницы для отображения информации о каждом элементе на основе id, в файле [id].js мы получим данные с помощью getStaticProps().

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">    export const getStaticProps = async ({params}) =&gt; {
        const res = await fetch(`https://fakestoreapi.com/products/${params.id}`);
        const data = await res.json();
        console.log(params)
        console.log(data)
        return{
            props: {item: data}
        }
    }</code></pre>
<!-- /wp:code -->

Цель использования getStaticProps() здесь заключается в том, что Next js необходимо получить id каждого элемента, чтобы создать путь для отображения содержимого каждого элемента на основе его id на странице.<br>Параметр params используется в коде в качестве контекста.

После этого можно добавить функцию компонента, которая отобразит все данные с помощью функции map.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">    const product = ({item}) =&gt; {
      return (
        &lt;&gt;
            &lt;Head&gt;
                &lt;title&gt;
                    Products page
                &lt;/title&gt;
            &lt;/Head&gt;
            &lt;h1&gt;Product / Item&lt;/h1&gt;
            &lt;h2&gt;{item.title}&lt;/h2&gt;
            &lt;img src={item.image} width={200} height={200}/&gt;
            &lt;p&gt;{item.description}&lt;/p&gt;
            &lt;p&gt;price: {item.price}&lt;/p&gt;
        &lt;/&gt;
      )
    }
    export default product</code></pre>
<!-- /wp:code -->

Над функцией компонента мы добавим функцию getStaticPaths для работы с путями.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">    export const getStaticPaths = async () =&gt;{
        const res = await fetch('https://fakestoreapi.com/products');
        const prod = await res.json();
        return{
            paths: prod.map(post =&gt; (
                {
                    params:{id: post.id.toString()}
                }
            )),
            fallback: true,
        }
    }</code></pre>
<!-- /wp:code -->

Данные извлекаются в приведенном выше коде, а ответ отправляется в формате JSON. В возвращаемом объекте мы используем paths, а не props, затем выполняем map через него, чтобы получить id в качестве параметров. Затем мы устанавливаем fallback в true. Если не установить fallback, это может привести к ошибке. Поэтому вы должны установить его.<br>Кроме того, мы получаем id динамически, а не жестко кодируем. Вы можете посмотреть в документации Next js, как это делается жестко.

Всегда передавайте параметры как строки, используя toString().

Весь исходный код файла [id].js будет выглядеть так, как показано ниже.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">    import Head from 'next/head';
    import React from 'react'
    
    export const getStaticProps = async ({params}) =&gt; {
        const res = await fetch(`https://fakestoreapi.com/products/${params.id}`);
        const data = await res.json();
        console.log(params)
        console.log(data)
        return{
            props: {item: data}
        }
    }
    export const getStaticPaths = async () =&gt;{
        const res = await fetch('https://fakestoreapi.com/products');
        const prod = await res.json();
        return{
            paths: prod.map(post =&gt; (
                {
                    params:{id: post.id.toString()}
                }
            )),
            fallback: true,
        }
    }
    const product = ({item}) =&gt; {
      return (
        &lt;&gt;
            &lt;Head&gt;
                &lt;title&gt;
                    Products page
                &lt;/title&gt;
            &lt;/Head&gt;
            &lt;h1&gt;Product / Item&lt;/h1&gt;
            &lt;h2&gt;{item.title}&lt;/h2&gt;
            &lt;img src={item.image} width={200} height={200}/&gt;
            &lt;p&gt;{item.description}&lt;/p&gt;
            &lt;p&gt;price: {item.price}&lt;/p&gt;
        &lt;/&gt;
      )
    }
    export default product</code></pre>
<!-- /wp:code -->

Когда вы запустите свое приложение, вы можете изменить id из URL или щелкнув по списку, как показано на скринкасте ниже.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://blog.openreplay.com/images/data-fetching-in-next-js/images/image02.gif" alt="2"/></figure>
<!-- /wp:image -->

<h2 class="wp-block-heading" id="заключение">Заключение</h2>

Получение данных в Next js - это просто, хотя и может быть сложным, но если следовать основам и понимать их, то все получится. Надеюсь, эта статья поможет вам, когда вы захотите создать свой магазин электронной коммерции или сайт портфолио, где данные хранятся в базе данных или из API.
