---
title: Git Stash – краткий обзор
meta_title: Git Stash краткий обзор - Igor Gorlov
description: >-
  Прерывания — довольно частое явление при работе над большим проектом. Для меня
  они даже обычны, когда я работаю в одиночку. Для меня эти прерывания часто
  имеют форму: Пожалуйста, переключись на работу над другой вещью. Что
  происходит, когда это происходит в тот момент, когда я еще не готов к
  фиксации? Git stash на помощь! 
date: 2023-04-21T07:06:01.000Z
image: ../../assets/images/undefined-Apr-21-2023.avif
categories:
  - Учебник
author: Igor Gorlov
tags:
  - Git
draft: false
lastmod: 2024-03-20T21:26:47.696Z
---

Прерывания — довольно частое явление при работе над большим проектом. Для меня они даже обычны, когда я работаю в одиночку. Для меня эти прерывания часто имеют форму: Пожалуйста, переключись на работу над другой вещью. Что происходит, когда это происходит в тот момент, когда я еще не готов к фиксации? Git stash на помощь! Как видно из названия, git stash позволяет хранить изменения для последующего использования. После сохранения изменений дерево исходников возвращается в состояние последней фиксации. В этот момент я могу работать над другим набором необходимых изменений. Когда я буду готов вернуться к изменениям, которые я припрятал, я могу просто вытащить их из тайника с помощью git stash pop и продолжить работу.

<!-- wp:rank-math/toc-block {"title":"Оглавление","headings":[{"key":"bf8ad0c5-04fc-4ab6-b0ec-ed0688b5586a","content":"TL;DR - Какие команды мне нужно знать для git stash?","level":2,"link":"#tl-dr-какие-команды-мне-нужно-знать-для-git-stash","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"56a808a9-aae0-4ff4-a581-4168444c5f7e","content":"Давайте посмотрим несколько примеров","level":2,"link":"#давайте-посмотрим-несколько-примеров","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"59ee3e92-1d79-4a88-985f-a18d6831bba1","content":"Заключение","level":2,"link":"#заключение","disable":false,"isUpdated":false,"isGeneratedLink":true}],"listStyle":"ul"} -->
<div class="wp-block-rank-math-toc-block" id="rank-math-toc"><h2>Оглавление</h2><nav><ul><li class=""><a href="#tl-dr-какие-команды-мне-нужно-знать-для-git-stash">TL;DR - Какие команды мне нужно знать для git stash?</a></li><li class=""><a href="#давайте-посмотрим-несколько-примеров">Давайте посмотрим несколько примеров</a></li><li class=""><a href="#заключение">Заключение</a></li></ul></nav></div>
<!-- /wp:rank-math/toc-block -->

<h2 class="wp-block-heading" id="tl-dr-какие-команды-мне-нужно-знать-для-git-stash">TL;DR - Какие команды мне нужно знать для git stash?</h2>

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>git stash - Это сохранит ваши текущие изменения и очистит ваш рабочий каталог. Это то же самое, что и git stash push</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>git stash -m - То же самое, что и выше, но вместо ID коммита к тайнику прикрепляется сообщение.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>git stash list - Показать список тайников для данного хранилища.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>git stash apply - Применить изменения из тайника и оставить тайник в списке тайников.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>git stash pop - То же, что и apply, но удалить тайник из списка.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>git stash drop - Удалить тайник из списка.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

Хотя для git stash доступно больше опций, этот список содержит большинство из того, что необходимо для нормального использования. В документации приведен полный список опций для git stash.

<h2 class="wp-block-heading" id="давайте-посмотрим-несколько-примеров">Давайте посмотрим несколько примеров</h2>

Я создал простой репозиторий с одним файлом, чтобы показать несколько примеров использования git stash. Здесь у меня есть изменения в файле, готовые к постановке или сохранению.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--KwuHNPNO--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/4xxc3xyafhy3znew7b3b.png" alt="Статус Git, показывающий одно внесенное изменение."/></figure>
<!-- /wp:image -->

На следующем снимке экрана показано использование git stash без каких-либо аргументов. Вы увидите, что комментарий по умолчанию будет состоять из идентификатора фиксации и сообщения о фиксации.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--tclk_BgG--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/oa2133hw20hviorjxebk.png" alt="команда git stash"/></figure>
<!-- /wp:image -->

Это результат git stash list, показывающий один тайник с его идентификатором тайника и комментарием по умолчанию.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--xeTHBZko--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/vpr7pbla7bwurmraccll.png" alt="Вывод списка git stash list, показывающий один тайник."/></figure>
<!-- /wp:image -->

Если присутствует только сообщение о предыдущем коммите, оно не отражает фактических изменений, которые были сделаны и сохранены. Было бы лучше иметь сообщение, отражающее внесенные изменения и причину их сохранения. Здесь мы видим пример сохранения изменений с сообщением.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--ftcPOSUO--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/x6qhtpqiwt81tsrs64cw.png" alt="Статус Git, показывающий изменение и сохраняющий изменение с сообщением."/></figure>
<!-- /wp:image -->

Теперь мы видим, что есть второй коммит и что он был перемещён в начало списка. Обратите внимание, что наш первоначальный коммит, который изначально был stash@{0}, теперь стал stash@{1}. Изменение, которое мы только что спрятали, заняло место в позиции 0.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--ano5TcoI--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/p2nj4kmaxv0aqwym3plq.png" alt="Список тайников показывает два тайника."/></figure>
<!-- /wp:image -->

Если бы вы запустили git stash pop, то получили бы изменения, которые мы только что зафиксировали. А что, если вы захотите начать работу над набором изменений, которые не находятся в начале списка? Это так же просто, как вызвать git stash pop . В данном случае я указал 1 в качестве идентификатора. Вы можете увидеть внизу вывода git, что он говорит, что сбросил ссылку на stash@{1}.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--nLxe3klP--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/h2anan3ogphyi86ifrk4.png" alt="Git stash pop with a stash id"/></figure>
<!-- /wp:image -->

Выполнив git stash list, мы видим, что в списке осталось только одно изменение. Первоначальное изменение, которое мы спрятали, было удалено из списка с момента появления первого изменения.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--NwVyDdQK--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/8b4le456w8zxg142lxm5.png" alt="Git stash list, показывающий только наше второе изменение"/></figure>
<!-- /wp:image -->

Здесь мы используем опцию push вместе с сообщением. В листинге показано, что оба изменения снова сохранены.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--vYhWEvYC--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/gx0z1r13534l76oq03j6.png" alt="Запуск git stash с опцией push и сообщением"/></figure>
<!-- /wp:image -->

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--lrCUPDp7--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/b9oos6tcnbrfghk72g0u.png" alt="Список тайников показывает, что оба тайника все еще сохранены."/></figure>
<!-- /wp:image -->

Теперь мы воспользуемся опцией apply, чтобы показать, что мы можем применить тайник, не удаляя его из списка тайников.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--dXuRSZkN--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/vs6bobbspzygotj5nqnp.png" alt="Использование git stash apply для применения определенного коммита без его удаления."/></figure>
<!-- /wp:image -->

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--C7Ol0znk--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/bo8kefn3q79o9c0k4zsk.png" alt="Список тайников показывает, что оба тайника все еще сохранены."/></figure>
<!-- /wp:image -->

В заключение давайте покажем, что происходит, когда мы хотим удалить определенный тайник.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--hYiYWmUy--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/wrtuetxou320xd2r356x.png" alt="Использование git stash drop для удаления тайника"/></figure>
<!-- /wp:image -->

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--maZkE_wm--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/yqm0as8eyibyp93dzh7g.png" alt="Список тайников Git показывает только один оставшийся тайник"/></figure>
<!-- /wp:image -->

<h2 class="wp-block-heading" id="заключение">Заключение</h2>

Git stash - это удобный способ сохранить набор изменений, над которыми вы работаете. Конечно, существуют и другие способы сохранения изменений (например, ветвление). Я обычно использую git stash, когда мне нужно объединить набор изменений из другой ветки и я не готов зафиксировать то, над чем работаю в данный момент.

<!-- wp:acf/acf-donate {"id":"block_64678dc93985f","name":"acf/acf-donate","data":{"title":"Задонатить на поддержку!","_title":"field_646b621e8617c","list_0_name":"Donatepay","_list_0_name":"field_646b623e8617e","list_0_url":"https://new.donatepay.ru/@1117856","_list_0_url":"field_646b62528617f","list_0_address":"","_list_0_address":"field_646b625d86180","list_1_name":"Donationalerts","_list_1_name":"field_646b623e8617e","list_1_url":"https://www.donationalerts.com/c/woorg_","_list_1_url":"field_646b62528617f","list_1_address":"","_list_1_address":"field_646b625d86180","list_2_name":"USDT (TRC20)","_list_2_name":"field_646b623e8617e","list_2_url":"","_list_2_url":"field_646b62528617f","list_2_address":"TR121HxpTDF71TMm9idZkBaZxnjSMcCPWj","_list_2_address":"field_646b625d86180","list_3_name":"ETH","_list_3_name":"field_646b623e8617e","list_3_url":"","_list_3_url":"field_646b62528617f","list_3_address":"0x442721192987047eDeEC69Ca1D4c706f9Adb16B3","_list_3_address":"field_646b625d86180","list_4_name":"BTC","_list_4_name":"field_646b623e8617e","list_4_url":"","_list_4_url":"field_646b62528617f","list_4_address":"36dLKv5uRozphSQa55w2XgsF42AugPu2QT","_list_4_address":"field_646b625d86180","list":5,"_list":"field_646b62308617d"},"align":"","mode":"edit"} /-->
