---
title: Ключевые метрики Google Search Console
meta_title: Ключевые метрики Google Search Console - Igor Gorlov
description: >-
  Чтобы проверить, хорошо ли ваш сайт работает в области SEO и ранжирования,
  необходимо знать, как работает Google Search Console и какие данные он может
  вам предоставить, и в этой статье мы расскажем вам обо всем этом.
date: 2023-04-27T22:51:42.000Z
author: Igor Gorlov
image: ../../assets/images/undefined-Apr-28-2023.avif
categories:
  - Учебник
tags:
  - Search console
  - SEO
draft: false
lastmod: 2024-03-20T21:26:43.920Z
---

Чтобы проверить, хорошо ли ваш сайт работает в области SEO и ранжирования, необходимо знать, как работает Google Search Console и какие данные он может вам предоставить, и в этой статье мы расскажем вам обо всем этом.

Google предлагает бесплатный сервис Google Search Console, который помогает отслеживать, поддерживать и устранять неполадки, связанные с присутствием сайта в результатах поиска Google. Вам не нужно регистрироваться, чтобы попасть в результаты поиска. Скорее, Search Console помогает понять и улучшить то, как Google воспринимает ваш сайт.

Что касается SEO и ранжирования, Google Search Console является одним из самых ценных инструментов. Следующая статья посвящена Google Search Console и ее важным метрикам, в ней вы найдете более глубокое понимание всех ключевых показателей, что даст вам понимание того, как их можно использовать.

<!-- wp:rank-math/toc-block {"title":"Оглавление","headings":[{"key":"d5644107-754e-4248-931d-f2971ada237f","content":"Google Search Console: Обзор","level":2,"link":"#google-search-console-обзор","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"4dc970a9-90dc-4d20-808a-3b90c8b8005b","content":"Ключевые метрики консоли поиска Google","level":2,"link":"#ключевые-метрики-консоли-поиска-google","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"7138baf9-376c-400c-b7a9-a68defe474eb","content":"Результаты поиска","level":2,"link":"#результаты-поиска","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"350147ae-949e-40f7-bc36-39ca087230ed","content":"Клики ","level":3,"link":"#клики","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"e414fc13-85a7-41d3-8b5b-fb5c9413499b","content":"Впечатления ","level":3,"link":"#впечатления","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"a2ba523e-1ee8-4baf-843a-a72d92dd7c57","content":"CTR","level":3,"link":"#ctr","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"450f14df-17d7-4d2d-adba-4980e17ad642","content":"Avg. Позиция","level":3,"link":"#avg-позиция","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"b598002e-090e-4973-be5f-fc954f9503b7","content":"Инструмент проверки URL","level":2,"link":"#инструмент-проверки-url","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"14aea201-5d57-44cc-9249-37549f487258","content":"Индексация страницы","level":2,"link":"#индексация-страницы","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"a4ed4996-89ec-4e64-b679-9548f0f9b100","content":"Ошибка перенаправления","level":3,"link":"#ошибка-перенаправления","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"5e580ee0-eeca-432a-b194-fd788cff8818","content":"URL заблокирован файлом robots.txt","level":3,"link":"#url-заблокирован-файлом-robots-txt","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"cf39fba6-0dd9-49c3-89bd-9b3a2eebb162","content":"URL с пометкой 'noindex'","level":3,"link":"#url-с-пометкой-noindex","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"dfdee331-0f92-4e38-ab08-e44050547f22","content":"Sitemaps","level":2,"link":"#sitemaps","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"13232ad8-8ff0-4ab8-bfe8-dd0e9b24fd4a","content":"Removals","level":2,"link":"#removals","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"0d44b014-9cdc-4575-9dc3-09ea17bdbc80","content":"Основные показатели веб-страниц","level":2,"link":"#основные-показатели-веб-страниц","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"93625e16-3ca3-4d46-ac3c-066fb4ee1bc7","content":"LCP или Largest Contentful Paint","level":3,"link":"#lcp-или-largest-contentful-paint","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"8f96abef-6c21-4af7-8c07-ac84ee6380fb","content":"FID или задержка первого ввода","level":3,"link":"#fid-или-задержка-первого-ввода","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"a70663da-eda8-421c-8467-bb76c16592c1","content":"CLS или кумулятивный сдвиг макета","level":3,"link":"#cls-или-кумулятивный-сдвиг-макета","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"69dbb32b-2224-43c1-b48c-a17b325e20f1","content":"Ускоренные мобильные страницы (AMP)","level":2,"link":"#ускоренные-мобильные-страницы-amp","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"07c2d568-9894-4056-bd72-83bf40744324","content":"Мобильное удобство","level":2,"link":"#мобильное-удобство","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"735e994d-d698-4565-ad0b-9a275e404594","content":"Ссылки","level":2,"link":"#ссылки","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"a5e18147-f35d-4ce6-a209-f6f632bf6306","content":"Ручное действие","level":2,"link":"#ручное-действие","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"7829e6ce-10ee-4471-9bfd-4bbfae3b8578","content":"Crawl Stats","level":2,"link":"#crawl-stats","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"4c0e522c-bcc2-4df1-8235-0c377498da04","content":"Заключение","level":2,"link":"#заключение","disable":false,"isUpdated":false,"isGeneratedLink":true}],"listStyle":"ul"} -->
<div class="wp-block-rank-math-toc-block" id="rank-math-toc"><h2>Оглавление</h2><nav><ul><li class=""><a href="#google-search-console-обзор">Google Search Console: Обзор</a></li><li class=""><a href="#ключевые-метрики-консоли-поиска-google">Ключевые метрики консоли поиска Google</a></li><li class=""><a href="#результаты-поиска">Результаты поиска</a><ul><li class=""><a href="#клики">Клики </a></li><li class=""><a href="#впечатления">Впечатления </a></li><li class=""><a href="#ctr">CTR</a></li><li class=""><a href="#avg-позиция">Avg. Позиция</a></li></ul></li><li class=""><a href="#инструмент-проверки-url">Инструмент проверки URL</a></li><li class=""><a href="#индексация-страницы">Индексация страницы</a><ul><li class=""><a href="#ошибка-перенаправления">Ошибка перенаправления</a></li><li class=""><a href="#url-заблокирован-файлом-robots-txt">URL заблокирован файлом robots.txt</a></li><li class=""><a href="#url-с-пометкой-noindex">URL с пометкой 'noindex'</a></li></ul></li><li class=""><a href="#sitemaps">Sitemaps</a></li><li class=""><a href="#removals">Removals</a></li><li class=""><a href="#основные-показатели-веб-страниц">Основные показатели веб-страниц</a><ul><li class=""><a href="#lcp-или-largest-contentful-paint">LCP или Largest Contentful Paint</a></li><li class=""><a href="#fid-или-задержка-первого-ввода">FID или задержка первого ввода</a></li><li class=""><a href="#cls-или-кумулятивный-сдвиг-макета">CLS или кумулятивный сдвиг макета</a></li></ul></li><li class=""><a href="#ускоренные-мобильные-страницы-amp">Ускоренные мобильные страницы (AMP)</a></li><li class=""><a href="#мобильное-удобство">Мобильное удобство</a></li><li class=""><a href="#ссылки">Ссылки</a></li><li class=""><a href="#ручное-действие">Ручное действие</a></li><li class=""><a href="#crawl-stats">Crawl Stats</a></li><li class=""><a href="#заключение">Заключение</a></li></ul></nav></div>
<!-- /wp:rank-math/toc-block -->

<h2 class="wp-block-heading" id="google-search-console-обзор">Google Search Console: Обзор</h2>

Google Search Console - это набор инструментов, который помогает отслеживать работу сайта, находить проблемы и повышать рейтинг сайта. Этот инструмент является мощным, но в то же время сложным. Этот инструмент является бесценным ресурсом для маркетологов, поскольку он предлагает помощь в обеспечении высокой эффективности веб-сайтов.

Помимо статистических данных и информации, которые он предлагает, инструмент также предоставляет веб-мастерам инструменты для устранения проблем, которые могут помешать успешной работе сайта. Search Console, в отличие от Google Analytics, предоставляет информацию о трафике, который поступает только из веб-поиска, а не из других сегментов, таких как трафик из рекламы, прямой трафик и так далее.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://i.imgur.com/3tStBNm.png" alt=""/></figure>
<!-- /wp:image -->

<h2 class="wp-block-heading" id="ключевые-метрики-консоли-поиска-google">Ключевые метрики консоли поиска Google</h2>

В консоли поиска Google доступны несколько метрик для измерения производительности сайта и помощи веб-мастерам в анализе проблем сайта. В этом блоге вы найдете самые важные метрики консоли поиска Google.

<h2 class="wp-block-heading" id="результаты-поиска">Результаты поиска</h2>

Результаты поиска можно найти на левой боковой панели. Раздел дает представление о том, как сайт выглядит на странице результатов поисковой системы. Сюда входят данные о показах, кликах, количестве переходов, позиции и о том, по каким запросам показывается сайт.

Верхние фильтры позволяют сортировать данные на основе местоположения, вида поиска, данных и так далее. Эти данные имеют первостепенное значение, когда речь идет о понимании влияния усилий SEO.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://i.imgur.com/HjWjzZ7.png" alt=""/></figure>
<!-- /wp:image -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="клики">Клики </h3>

Любой клик для большинства типов результатов, который направляет пользователя на страницу вне Google Поиск, Новости или Discover, считается кликом. Помните, что щелчок по ссылке внутри Google не считается щелчком.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://i.imgur.com/SW0C68n.png" alt=""/></figure>
<!-- /wp:image -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="впечатления">Впечатления </h3>

Впечатления означают, что пользователь видел или, возможно, видел ссылку на сайт в Discover, Search или News. Впечатление в целом учитывается каждый раз, когда элемент появляется на текущей странице результатов, независимо от того, прокручивается ли он, при условии, что пользователь не нажимает кнопку мыши для просмотра других результатов. Прокрутка вперед и назад в течение одного сеанса или запроса не считается многократным впечатлением.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://i.imgur.com/4WCSvDy.png" alt=""/></figure>
<!-- /wp:image -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="ctr">CTR</h3>

Коэффициент кликов — это количество пользователей, которые кликнули на результат и перешли на сайт. Он рассчитывается как количество кликов, деленное на количество показов, умноженное на сто и представленное в процентах.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://i.imgur.com/WggsUY0.png" alt=""/></figure>
<!-- /wp:image -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="avg-позиция">Avg. Позиция</h3>

Позиция рассчитывается только для результатов поиска Google. Страница результатов состоит из нескольких элементов результатов. Как правило, позиция в Google Поиске рассчитывается сверху вниз на стороне первичной страницы, затем сверху вниз на вторичной странице.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://i.imgur.com/b9MI7Ik.png" alt=""/></figure>
<!-- /wp:image -->

<h2 class="wp-block-heading" id="инструмент-проверки-url">Инструмент проверки URL</h2>

Инструмент URL Inspection предоставляет информацию об индексированной версии определенной страницы в Google. Кроме того, он позволяет проверить, может ли URL быть индексируемым. Информация включает сведения о видео, структурированных данных, индексации/индексируемости и связанном AMP.

Доступ к инструменту осуществляется двумя способами:

Ввод полностью квалифицированного URL-адреса для проверки в строке поиска в верхней части любого экрана Search Console.

Щелкните и проверьте ссылку рядом с URL-адресом страницы в большинстве отчетов.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://i.imgur.com/dq7VAQD.gif" alt=""/></figure>
<!-- /wp:image -->

<h2 class="wp-block-heading" id="индексация-страницы">Индексация страницы</h2>

URL перенаправляет на другой URL и поэтому не был проиндексирован. Конечная цель URL может быть проиндексирована и должна появиться в отчете. Количество проиндексированных URL можно увидеть в сводке Индексирование страниц.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://i.imgur.com/VEjlP5n.jpg" alt=""/></figure>
<!-- /wp:image -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="ошибка-перенаправления">Ошибка перенаправления</h3>

Когда вы видите ”страницу с перенаправлением" в отчете о покрытии, это означает, что Google нашел на сайте страницу с перенаправленным URL и не стал ее индексировать. Это происходит для того, чтобы избежать дублирования результатов, или для обнаружения ошибок.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://i.imgur.com/6DVjRFT.png" alt=""/></figure>
<!-- /wp:image -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="url-заблокирован-файлом-robots-txt">URL заблокирован файлом robots.txt</h3>

Это означает, что Google проиндексировал URL, даже если файл robots.txt заблокировал его. Поскольку Google не уверен, хотите ли вы, чтобы эти URL индексировались, он покажет предупреждение для них.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://i.imgur.com/rSq1jhe.jpg" alt=""/></figure>
<!-- /wp:image -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="url-с-пометкой-noindex">URL с пометкой 'noindex'</h3>

Это означает, что Google обнаружил в XML sitemap URL, помеченные как noindex. Это приводит к тому, что Google не индексирует их, поскольку они часто следуют директивам robots.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://i.imgur.com/wz7mguE.png" alt=""/></figure>
<!-- /wp:image -->

<h2 class="wp-block-heading" id="sitemaps">Sitemaps</h2>

Карта сайта - это файл, в котором вы предоставляете информацию о страницах, видео, а также других файлах на сайте и их взаимосвязи. Карта сайта подскажет Google, какие страницы и файлы вы считаете важными для вашего сайта, а также предоставит ценную информацию о них.

Карта сайта может содержать информацию о конкретных типах содержимого на страницах, включая изображения, видео и новостные материалы.

Пример URL-адреса карты сайта: https://example.com/sitemap.xml

Внутри XML-файла sitemap вы увидите следующую информацию.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"&gt;
  &lt;url&gt;
    &lt;loc&gt;https://www.example.com/foo.html&lt;/loc&gt;
    &lt;lastmod&gt;2022-06-04&lt;/lastmod&gt;
  &lt;/url&gt;
&lt;/urlset&gt;</code></pre>
<!-- /wp:code -->

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://i.imgur.com/XEOponA.png" alt=""/></figure>
<!-- /wp:image -->

<h2 class="wp-block-heading" id="removals">Removals</h2>

Этот инструмент позволяет временно блокировать страницы из результатов поиска Google на принадлежащих вам сайтах. Кроме того, с его помощью можно просмотреть историю запросов на удаление страниц от владельцев и не владельцев. Он также позволяет увидеть все URL-адреса, о которых сообщалось, что они содержат материалы для взрослых на вашем сайте.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://i.imgur.com/ofQ6q0p.png" alt=""/></figure>
<!-- /wp:image -->

<h2 class="wp-block-heading" id="основные-показатели-веб-страниц">Основные показатели веб-страниц</h2>

Отчет Core Web Vitals показывает, как работают страницы, основываясь на реальном использовании данных. Узнайте больше о различных аспектах основных веб-показателей ниже.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://i.imgur.com/5XJYJF6.png" alt=""/></figure>
<!-- /wp:image -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="lcp-или-largest-contentful-paint">LCP или Largest Contentful Paint</h3>

Это количество времени на отрисовку самого большого элемента, видимого в области просмотра с момента запроса URL пользователем. Обычно это видео, изображение или даже большой текстовый элемент на уровне блока.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://i.imgur.com/9BMeAal.png" alt=""/></figure>
<!-- /wp:image -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="fid-или-задержка-первого-ввода">FID или задержка первого ввода</h3>

Время, в течение которого пользователь взаимодействует со страницей - от щелчка по ссылке или нажатия кнопки до момента, когда браузер реагирует на это взаимодействие. Это важно для страниц, на которых пользователям нужно что-то сделать, поскольку именно в этот момент страница становится интерактивной.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://i.imgur.com/1LSkEMV.png" alt=""/></figure>
<!-- /wp:image -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="cls-или-кумулятивный-сдвиг-макета">CLS или кумулятивный сдвиг макета</h3>

Измеряет сумму всех индивидуальных оценок сдвига макета для каждого неожиданного сдвига макета, произошедшего за все время существования страницы. Сумма баллов варьируется от нуля до любого положительного числа. Ноль означает отсутствие сдвига, а большее число указывает на большее количество сдвигов макета на странице. CLS имеет большое значение, поскольку смещение элементов страницы в тот момент, когда пользователь пытается взаимодействовать с ней, не очень приятно для пользователя.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://i.imgur.com/llzwhsK.png" alt=""/></figure>
<!-- /wp:image -->

<h2 class="wp-block-heading" id="ускоренные-мобильные-страницы-amp">Ускоренные мобильные страницы (AMP)</h2>

Помогает исправить ошибки, которые мешают вашим AMP-страницам появляться в результатах поиска Google, с помощью функций, специфичных для AMP. Вид на верхнем уровне показывает критические проблемы, которые влияют на AMP-страницы сайта.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://i.imgur.com/9Kn0hSz.png" alt=""/></figure>
<!-- /wp:image -->

<h2 class="wp-block-heading" id="мобильное-удобство">Мобильное удобство</h2>

Отчет ”Мобильное удобство" показывает страницы с проблемами удобства использования при просмотре на мобильных устройствах. Нажмите на конкретную проблему, чтобы увидеть подробности проблемы, например, примерный список страниц, затронутых проблемой, информацию о ее устранении и процесс уведомления Google о внесенных исправлениях.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://i.imgur.com/nyaQASr.png" alt=""/></figure>
<!-- /wp:image -->

<h2 class="wp-block-heading" id="ссылки">Ссылки</h2>

Ссылки помогают увидеть, кто больше всего ссылается на ваш сайт, ваши страницы с наибольшим количеством ссылок и т.д.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://i.imgur.com/guHDauM.png" alt=""/></figure>
<!-- /wp:image -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Внешние ссылки Это гиперссылки, которые указывают на любой домен, отличный от домена, на котором существует ссылка. Проще говоря, если другой сайт ссылается на ваш сайт, это считается внешней ссылкой. Точно так же, если вы ссылаетесь на другой сайт, это тоже считается внешней ссылкой.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Внутренние ссылки Внутренние ссылки относятся к другой странице на том же сайте. Обычно это реализуется через навигацию страницы или элементы, такие как похожие статьи, списки хитов и так далее. Кроме того, в тексте можно напрямую ссылаться на страницы, относящиеся к теме.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Топ ссылающихся сайтов Вы можете увидеть, какие сайты ссылаются на вас чаще всего. В отчете отображается корневой домен сайтов, которые чаще всего ссылаются на ваш сайт.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Top Linking Text Отчет показывает якорный текст, который используется внешними сайтами. Якорный текст" содержит ссылку и имеет двойное значение. Он вносит вклад в контекстную релевантность страницы, на которую ведет ссылка, а также в релевантность страницы, на которую ведет ссылка.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<h2 class="wp-block-heading" id="ручное-действие">Ручное действие</h2>

Ручные действия предпринимаются Google в отношении веб-сайта, когда человеческий эксперт определяет, что страницы сайта не соответствуют рекомендациям Google по качеству для веб-мастеров. Многие ручные действия связаны с попытками манипулирования поисковым индексом. Кроме того, большинство проблем, о которых здесь сообщается, приводят к тому, что сайты или страницы занимают более низкие позиции или даже исключаются из результатов поиска.

Отчет с ручным действием

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://i.imgur.com/o0DnlhD.png" alt=""/></figure>
<!-- /wp:image -->

<h2 class="wp-block-heading" id="crawl-stats">Crawl Stats</h2>

Отчет отображает статистику, касающуюся истории ползания по вашему сайту в Google. Например, вы можете увидеть, сколько запросов было сделано и когда, ответ сервера и наличие возникших проблем.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://i.imgur.com/tW1WgyX.png" alt=""/></figure>
<!-- /wp:image -->

Отчет можно использовать для определения того, сталкивается ли Google с проблемами обслуживания при просмотре вашего сайта. Отчет предназначен для опытных пользователей. Для страниц, на которых менее тысячи страниц, этот отчет не нужен.

<h2 class="wp-block-heading" id="заключение">Заключение</h2>

Отчет Google Search Console позволяет получить более глубокое представление о работе вашего сайта. А также с помощью ключевых показателей, упомянутых выше, вы сможете устранить проблемы SEO вашего сайта, что в конечном итоге поможет вашему сайту добиться хороших результатов в поисковой системе Google.
