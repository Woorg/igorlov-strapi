---
title: Как управлять процессами в Linux
meta_title: Как управлять процессами в Linux - Igor Gorlov
description: >-
  Все мы следуем определенным процессам для достижения своих целей. Аналогично,
  каждая система имеет свои собственные процессы для выполнения задач.
date: 2023-02-17T07:09:52.000Z
author: Igor Gorlov
image: ../../assets/images/undefined-Feb-17-2023.avif
categories:
  - Учебник
tags:
  - Linux
draft: false
lastmod: 2024-03-20T21:26:48.401Z
---

Все мы следуем определенным процессам для достижения своих целей. Аналогично, каждая система имеет свои собственные процессы для выполнения задач.

Каждая программа или команда, выполняемая в системе Linux, называется процессом.

В этом учебнике мы рассмотрим процессы и то, как мы можем управлять ими в Linux.

Теоретически процесс называется выполняемой программой. По сути, это задача, над которой в данный момент работает система.

Каждое ваше действие в системе приводит к появлению нового процесса. Например, открытие браузера инициирует процесс.

Проще говоря, процесс - это экземпляр программы. Действие пользователя преобразуется в команду, и при выполнении команды создается новый процесс.

Процессы работают в соответствии с иерархией ”родитель-ребенок”. Как следует из названия иерархии, процесс, инициированный командой/программой, называется родительским процессом, а процесс, созданный родительским процессом, называется дочерним процессом.

<h2 class="wp-block-heading">Типы процессов в Linux</h2>

В дистрибутивах Linux процессы делятся на 2 типа:

Процессы переднего планаПроцессы заднего планаПроцессы переднего плана

Процесс, который требует, чтобы пользователь запустил его с помощью команды терминала или программы, называется фоновым процессом. Это означает, что процессы переднего плана требуют входного сигнала от пользователя. Поэтому каждый процесс переднего плана запускается вручную.

Если процесс запущен на переднем плане, другие процессы должны дождаться завершения текущего процесса.

Лучший пример для демонстрации этого - команда sleep. Команда sleep не позволяет пользователю взаимодействовать с терминалом, пока не пройдет заданное количество секунд.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">sleep 10</code></pre>
<!-- /wp:code -->

Команда терминала для засыпания на 10 секунд<img width="507" height="186" class="kg-image" src="https://lh6.googleusercontent.com/Utfn4bYW2zEfEniaJ4QpFXeMIC9Cru1Ex-2OyRKAk2iGo9b7UBhnEspS3STn7HNOHyfSr081dWR1YgIRYGzkAH5UhfceLH3Xt5RofCs-B71b125bJtKi8vKqRC-IsGWM6N2TVpCapSvkdFclakrqq2LY1zfn4kq2ECAaoL8LAApPoM3ZLKeJahVVCF4qQw" alt="Utfn4bYW2zEfEniaJ4QpFXeMIC9Cru1Ex-2OyRKAk2iGo9b7UBhnEspS3STn7HNOHyfSr081dWR1YgIRYGzkAH5UhfceLH3Xt5RofCs-B71b125bJtKi8vKqRC-IsGWM6N2TVpCapSvkdFclakrqq2LY1zfn4kq2ECAaoL8LAApPoM3ZLKeJahVVCF4qQw">

<code>sleep команда терминала, работающая на переднем плане и блокирующая ввод пользователя</code>

Мы должны подождать 10 секунд, чтобы получить доступ к терминалу для выполнения другой команды.

<h2 class="wp-block-heading">Фоновые процессы</h2>

Процесс, который запускается независимо от ввода данных пользователем, называется фоновым процессом. В отличие от процессов переднего плана, в фоновом процессе можно запускать несколько процессов одновременно.

Чтобы запустить процесс в фоновом режиме, поставьте амперсанд (&amp;) в конце команды, которую вы используете для запуска процесса.

Вот небольшой пример, демонстрирующий это:

Выполним команду sleep в фоновом процессе. Она будет работать в фоновом режиме и вернет нам терминал для выполнения других команд.

<img width="584" height="288" class="kg-image" src="https://lh4.googleusercontent.com/99ky8Jj_UgNSPmaxJC1k7KOQdfbN-_hhRh31cfAxpyxECAvJFHJjuHSrRF03epnMcUn14p_-w6I4obtRHBLPmIefL8CWT14hYr4_7WI6H3t6lzOCQWJWtajR_MVFfSiP986loc_qhxToalcOttf99gr6pyGJDgGU80hu3sMkJpJLLNu-VgbKugMiNrqnqQ" alt="99ky8Jj_UgNSPmaxJC1k7KOQdfbN-_hhRh31cfAxpyxECAvJFHJjuHSrRF03epnMcUn14p_-w6I4obtRHBLPmIefL8CWT14hYr4_7WI6H3t6lzOCQWJWtajR_MVFfSiP986loc_qhxToalcOttf99gr6pyGJDgGU80hu3sMkJpJLLNu-VgbKugMiNrqnqQ">

Пример команды терминала для фонового процесса

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">sleep 10 &amp;</code></pre>
<!-- /wp:code -->

Команда терминала для сна в течение 10 секунд в фоновом режиме.

Теперь мы видим, что приведенная выше команда выполняется в фоновом режиме. Она создала процесс с PID ( 19003 ). Поэтому мы можем одновременно запустить другую команду (команду pwd).

Как изменить процесс на переднем плане на процесс в фоновом режиме

Если мы запустили процесс на переднем плане и хотим перевести его в фоновый режим, мы можем сделать это с помощью команды bg. Давайте посмотрим, как изменить процесс на переднем плане на фоновый.

Если процесс запущен, нажмите клавишу CTRL+Z. Эта команда приостановит текущий процесс.

<img srcset="https://www.freecodecamp.org/news/content/images/size/w600/2023/01/image-372.png 600w, https://www.freecodecamp.org/news/content/images/size/w1000/2023/01/image-372.png 1000w, https://www.freecodecamp.org/news/content/images/2023/01/image-372.png 1048w" width="1048" height="319" class="kg-image" src="https://www.freecodecamp.org/news/content/images/2023/01/image-372.png" alt="image-372">Выdод процесса на передний план

Затем выполните команду bg. Она принимает в качестве аргумента идентификатор процесса и переводит его в фоновый режим. Если аргумент пуст, то в фоновый режим будет переведен текущий приостановленный процесс.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">bg &lt;process_id&gt;</code></pre>
<!-- /wp:code -->

Команда для перевода процесса в фоновый режим

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">bg</code></pre>
<!-- /wp:code -->

Команда для перевода последнего процесса в фоновый режим<img srcset="https://www.freecodecamp.org/news/content/images/size/w600/2023/01/image-373.png 600w, https://www.freecodecamp.org/news/content/images/2023/01/image-373.png 649w" width="649" height="224" class="kg-image" src="https://www.freecodecamp.org/news/content/images/2023/01/image-373.png" alt="image-373">Выход процесса переднего плана в фоновый процесс

Мы видим, как приостановленная команда ( sudo apt update) возобновляется в фоновом режиме.

Прежде чем мы рассмотрим, как это сделать, вы должны знать, зачем вам может понадобиться список процессов. Вот несколько причин:

Чтобы знать, какой процесс потребляет больше времени.Чтобы знать, какой процесс занимает больше памяти и процессора.Чтобы знать команду запуска для запущенного процесса.

Чтобы увидеть процессы, запущенные в данный момент, мы можем использовать команду ps (Process Status):

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">ps</code></pre>
<!-- /wp:code -->

Команда терминала для вывода списка запущенных процессов

Команда ps, показывающая список запущенных процессов

Чтобы вывести список всех процессов каждого вошедшего в систему пользователя, мы можем использовать команду w. Эта команда представляет собой комбинацию команд who, uptime и ps -a в Linux.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">w</code></pre>
<!-- /wp:code -->

Команда терминала для вывода списка процессов всех вошедших в систему пользователей<img width="1501" height="127" class="kg-image" src="https://lh3.googleusercontent.com/ws5Ip77K3CiODb9gfhjRSP5VQgaegkcabCw_rFcREWfHCnBDYlevoosQagnJ4tNfIG__yAV2OIG_BjzPWdTPx9WF4tMF2PfdTixR0aYu-7oo6vFUASwz-ZiHYxamFJU_nHpKNOlRMsVIthGrVMJtTXATBybJBlHBuTld4F-94PXVOlWJhashtH_f9bkDcg" alt="ws5Ip77K3CiODb9gfhjRSP5VQgaegkcabCw_rFcREWfHCnBDYlevoosQagnJ4tNfIG__yAV2OIG_BjzPWdTPx9WF4tMF2PfdTixR0aYu-7oo6vFUASwz-ZiHYxamFJU_nHpKNOlRMsVIthGrVMJtTXATBybJBlHBuTld4F-94PXVOlWJhashtH_f9bkDcg"><code>Команда w, отображающая список процессов всех пользователейКак составить список процессов в древовидном представлении</code>

Когда запускается программа/команда, она инициирует главный процесс, называемый родительским процессом. Родительский процесс может зависеть от другой команды/программы, которая создаст дочерний процесс.

Вот пример скриншота.

<img width="478" height="258" class="kg-image" src="https://lh5.googleusercontent.com/Dwa-k101f5l6-Sy3ec8BotbvFggPF4x_UjXdmWpc_YB7AsFb_iKXT-RAjzwA3GhXQI3wa5hdwRBr8hL3eUh4TnyKft_LCPgC0XYDOtLEYeRRBKBGrjZNw3m9irt3XUkaV_7y86LXdRNCssT_Qa1eclk" alt="Dwa-k101f5l6-Sy3ec8BotbvFggPF4x_UjXdmWpc_YB7AsFb_iKXT-RAjzwA3GhXQI3wa5hdwRBr8hL3eUh4TnyKft_LCPgC0XYDOtLEYeRRBKBGrjZNw3m9irt3XUkaV_7y86LXdRNCssT_Qa1eclk">

Дочерние процессы родительского процесса (firefox)

На скриншоте выше Firefox является родительским процессом, а остальные процессы - его дочерними процессами.

Давайте рассмотрим, как вывести список процессов в древовидной структуре.

pstree - это команда Linux для вывода списка текущих запущенных процессов всех пользователей в виде древовидной структуры. Она используется как более наглядная альтернатива команде ps.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">pstree</code></pre>
<!-- /wp:code -->

Команда терминала для составления списка процессов в виде дерева<img width="865" height="412" class="kg-image" src="https://lh6.googleusercontent.com/g1gTo5zkfs92067V3p01xndG6c3XOHPjpHJAZTeT1U4wP1DDLopuxPKlgunnTpFDGZwl5BFIbFuaN5oJoRtiSi9xJcKcQihn_hhNth8R_FKpOdjm-VlQzwO7435ZTmCb2GLXILPO444ZwMxz0ZQVRk4" alt="g1gTo5zkfs92067V3p01xndG6c3XOHPjpHJAZTeT1U4wP1DDLopuxPKlgunnTpFDGZwl5BFIbFuaN5oJoRtiSi9xJcKcQihn_hhNth8R_FKpOdjm-VlQzwO7435ZTmCb2GLXILPO444ZwMxz0ZQVRk4"><code>Команда pstree перечисляет процессы в древовидном представлении</code>

Как мы видим, запущенные процессы представлены в виде дерева. Это может быть полезно для визуализации процессов.

Добавление флага -p к команде отобразит каждую ветвь с ее идентификатором процесса.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">pstree -p</code></pre>
<!-- /wp:code -->

Команда терминала для отображения дочерних процессов родительского процесса в древовидной структуре<img width="641" height="226" class="kg-image" src="https://lh6.googleusercontent.com/elX0V2qolKRLEhXmJuPc549_YdTr80Vz5t60XRucXDrYC3_LFKKRDlB_-kP_uJSYvepwX3n6_XQ8jLvzMohI76-gfhSPDO7eD1KEexqRqEfw49K4E2ZpPodobGvnPA0paKsGXHdxDQ1CjVpfTOSduGI" alt="elX0V2qolKRLEhXmJuPc549_YdTr80Vz5t60XRucXDrYC3_LFKKRDlB_-kP_uJSYvepwX3n6_XQ8jLvzMohI76-gfhSPDO7eD1KEexqRqEfw49K4E2ZpPodobGvnPA0paKsGXHdxDQ1CjVpfTOSduGI">Команда терминала, отображающая список процессов в древовидном виде с PID

Чтобы перечислить дочерние процессы определенного процесса, передайте идентификатор процесса в качестве аргумента команде pstree.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">pstree 3149</code></pre>
<!-- /wp:code -->

Команда терминала для вывода списка процессов с идентификатором процесса 3149

<img width="509" height="295" class="kg-image" src="https://lh5.googleusercontent.com/L_OeZYxLZCDFFxMqelMfvxXWc2g3eKbKlt4EPV1bPfUBGZ5-STfSv9gxSEOksHsWuufeniSgbGS1-w5DL9uzEuQhWRMb7MOXuKpIn3Nr40wBJbDQkOnswClwvLhY0f9o-fuxV_OUwUqY6gDIc6koa0Q" alt="L_OeZYxLZCDFFxMqelMfvxXWc2g3eKbKlt4EPV1bPfUBGZ5-STfSv9gxSEOksHsWuufeniSgbGS1-w5DL9uzEuQhWRMb7MOXuKpIn3Nr40wBJbDQkOnswClwvLhY0f9o-fuxV_OUwUqY6gDIc6koa0Q">

Перечисление процессов в древовидном представлении для конкретного процесса

Ранее я упоминал, что команда pstree выводит список процессов всех пользователей. Передача имени пользователя вместе с командой pstree перечисляет только процессы, запущенные пользователем.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">pstree root</code></pre>
<!-- /wp:code -->

Перечисление процессов в древовидном представлении для определенного пользователя

На скриншоте выше показаны процессы, запущенные пользователем root.

Как посмотреть процессы конкретной программы

Многие разработчики могли столкнуться со следующим сценарием:

Работая над проектами веб-разработки, мы используем такие браузеры, как Chrome, Firefox и другие, чтобы проверить результат в разных браузерах.

Некоторые разработчики продолжают открывать вкладки и никогда не закрывают открытые. Из-за большой нагрузки (если открыто 150+ вкладок) браузеры иногда не отвечают 😣, что приводит к зависанию системы. Хуже всего может быть то, что мы не сможем закрыть браузер 😂.

В отличие от Windows, в Linux у нас нет диспетчера задач, чтобы закрыть браузер.

Эта проблема может быть легко решена и в Linux. Давайте посмотрим, как эксперт Linux справляется с этим сценарием.

Мы знаем, что каждая программа (включая браузер) запускается как процесс. Значит, нужно просто найти идентификатор процесса и убить его.

Давайте посмотрим, как найти идентификатор процесса нужной вам команды/программы.

В моей системе запущен Chrome, теперь мы можем получить PID Chrome, выполнив следующую команду:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">pidof chrome</code></pre>
<!-- /wp:code -->

Команда терминала для поиска идентификатора процесса<img width="489" height="87" class="kg-image" src="https://lh3.googleusercontent.com/TUL8R945bAnPXPIZ61Cs6VKzDVLAoRiOGbfZWD-x4u_Jzja72eGqGTXJjC14lhNqa4uF2-jKT3ttOtBJ6f-rbaxqGtEQoI2yPPwanl1ieftWpqMTMFGCn11pfRl2q3s98rehfm0-X7353cJ5KkoM1j2zLxk1CKAM6X-4NMxr_14M0WWdStMC9QhfqbbRrg" alt="TUL8R945bAnPXPIZ61Cs6VKzDVLAoRiOGbfZWD-x4u_Jzja72eGqGTXJjC14lhNqa4uF2-jKT3ttOtBJ6f-rbaxqGtEQoI2yPPwanl1ieftWpqMTMFGCn11pfRl2q3s98rehfm0-X7353cJ5KkoM1j2zLxk1CKAM6X-4NMxr_14M0WWdStMC9QhfqbbRrg">

Команда терминала для поиска идентификатора процесса chromeКак убить процесс

В Linux существует команда kill, которая используется для уничтожения любого процесса путем передачи PID (Process id) или имени процесса.

Вот синтаксис команды kill:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">kill &lt;pid/processname&gt;</code></pre>
<!-- /wp:code -->

Синтаксис команды kill

Давайте сохраним PID Chrome и убьем его с помощью команды kill:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">a=$(pidof chrome)
kill $a</code></pre>
<!-- /wp:code -->

Команда для уничтожения процесса<img width="500" height="108" class="kg-image" src="https://lh5.googleusercontent.com/KJP27zaj4YOe4BlWlDQskMlX5ymEUfdcATwD-yyD6LpORFMrV7uTC-E8AlvbmQXpTYNKnytLhAmBgORLpCYCRHeTVnjU9lQfIISxcmFpUJtY13rnnPJT5sdYBz3oPkgr9MnXjqx8F8wdU_bAZTM6EhffPLIA9GhD8lrI3o4ysM-QWZdDLptnyEeadAM9HA" alt="KJP27zaj4YOe4BlWlDQskMlX5ymEUfdcATwD-yyD6LpORFMrV7uTC-E8AlvbmQXpTYNKnytLhAmBgORLpCYCRHeTVnjU9lQfIISxcmFpUJtY13rnnPJT5sdYBz3oPkgr9MnXjqx8F8wdU_bAZTM6EhffPLIA9GhD8lrI3o4ysM-QWZdDLptnyEeadAM9HA">

Команда терминала для уничтожения процесса

Приведенная выше команда уничтожит веб-браузер Chrome.

<h2 class="wp-block-heading">Для вида перечислить все процессы</h2>

Мы можем увидеть все процессы Linux с помощью команды top. Она показывает обновления каждого процесса в реальном времени для всех пользователей.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">top</code></pre>
<!-- /wp:code -->

Команда терминала для вывода списка всех процессов в режиме реального времени<img width="805" height="330" class="kg-image" src="https://lh6.googleusercontent.com/aDFrfxMKy6yydKH81T7o4S-Z5cV552h0qTq34UH_oUuzj-Oml8CQVlzc2rrBUMNCawgMTxxePSFiI0uCTAHWVUMqaxe__JIGJFCbTn8TRoYWqzoDFxeUfmLHH4tphdUr8DYGyLPx-1vfEP-ZaMzfSlLvcNx-qaGTqxSc9JepmJRmbE5Crd6EI52sOt6JRQ" alt="aDFrfxMKy6yydKH81T7o4S-Z5cV552h0qTq34UH_oUuzj-Oml8CQVlzc2rrBUMNCawgMTxxePSFiI0uCTAHWVUMqaxe__JIGJFCbTn8TRoYWqzoDFxeUfmLHH4tphdUr8DYGyLPx-1vfEP-ZaMzfSlLvcNx-qaGTqxSc9JepmJRmbE5Crd6EI52sOt6JRQ">Команда терминала, отображающая все процессы в режиме реального времени

Давайте разберемся в заголовке, чтобы понять основные данные.

PID представляет уникальный идентификатор процесса.USER представляет имя пользователя владельца задачи.PR представляет приоритет процесса. Если число меньше, то приоритет выше.NI представляет собой приятное значение задачи. Отрицательное значение Nice Value означает более высокий приоритет, а положительное Nice Value означает более низкий приоритет.VIRT представляет общую виртуальную память, используемую задачей.RES представляет RAM Usage процесса в килобайтах.SHR представляет Shared Memory Size ( Kb ), используемый процессом.S представляет статус процесса:- D: Непрерывный сон- R: Работает- S: Спящий- T: Отслеживается (остановлен)- Z: ZombieCPU представляет использование процессора.MEM представляет использование памяти задачи.TIME представляет процессорное время.COMMAND представляет команду, которая использовалась для запуска процесса.

Для отображения определенных пользовательских процессов необходимо использовать флаг -u:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">top -u &lt;username&gt;</code></pre>
<!-- /wp:code -->

Синтаксис команды терминала для списка процессов конкретного пользователя

Чтобы просмотреть процессы, запущенные пользователем gogosoon, выполните следующую команду:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">top -u gogosoon</code></pre>
<!-- /wp:code -->

Команда терминала для списка процессов, запущенных пользователем gogosoon<img width="817" height="521" class="kg-image" src="https://lh4.googleusercontent.com/yDIUnMQBUbjn9xRm0E3pv7yITR_0Kx5bZrxL1L1jrm3dBa_9qidIG_uBpllEZp33BetqHcl6un4lRJR-BI8iXQL7QJE0eI4Q-4BI8vDhXT7arh7m5KPXAlCLMJEQoCCX0uL6RgA5elm3rjkDRVVanBk_djmIGtHbD-Xkf63HVjbtmmhdC39cx8AOANBHyg" alt="yDIUnMQBUbjn9xRm0E3pv7yITR_0Kx5bZrxL1L1jrm3dBa_9qidIG_uBpllEZp33BetqHcl6un4lRJR-BI8iXQL7QJE0eI4Q-4BI8vDhXT7arh7m5KPXAlCLMJEQoCCX0uL6RgA5elm3rjkDRVVanBk_djmIGtHbD-Xkf63HVjbtmmhdC39cx8AOANBHyg">Вывод терминала всех процессов, запущенных пользователем gogosoon

Вас может смутить вывод командной строки 😆. Будет трудновато отлаживать процессы в реальном времени.

Здесь на помощь приходит удобный инструмент GUI для работы с процессами в Linux. Но мы должны установить его вручную. Это будет работать как диспетчер задач в Windows.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">sudo apt install gnome-system-monitor</code></pre>
<!-- /wp:code -->

Команда терминала для установки приложения для мониторинга системы

После установки просто введите название программы в терминале:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">gnome-system-monitor</code></pre>
<!-- /wp:code -->

Команда для открытия списка процессов в графическом интерфейсе

Это откроет все процессы в новом окне с достойным графическим интерфейсом:

<img width="1165" height="222" class="kg-image" src="https://lh3.googleusercontent.com/_fiYn6xqNuqSEBnqVTkEWhOVPYKoFUxqCkEdE427eWJEsY7WTx1OwuD7p09PG0sZFqrhqdNpYCoM4vhDR7qNB1pe8-uvZVigTUJ0E6BxyU8lgoRzORm4HlihLVsHk1bXgMo0rwHyaGBoajQDb6WQU25NdDRO-U82sYrMg5kxJx7bJrxYKV5yrdlAN2xMcQ" alt="_fiYn6xqNuqSEBnqVTkEWhOVPYKoFUxqCkEdE427eWJEsY7WTx1OwuD7p09PG0sZFqrhqdNpYCoM4vhDR7qNB1pe8-uvZVigTUJ0E6BxyU8lgoRzORm4HlihLVsHk1bXgMo0rwHyaGBoajQDb6WQU25NdDRO-U82sYrMg5kxJx7bJrxYKV5yrdlAN2xMcQ">Gnome-System-Monitor&nbsp;

Когда мы щелкаем правой кнопкой мыши на любом процессе, отображаются такие действия, как kill, stop, end и так далее.

На вкладке Ресурсы отображаются следующие утилиты:

История процессора

История памяти и свопа

История сети

Эти графики будут полезны для определения нагрузки в вашей системе.

Заключение

В этой статье вы познакомились с основами процессов в Linux. Надеюсь, теперь вы лучше понимаете, как они работают. Я рекомендую вам попробовать эти команды в вашей системе. &nbsp;

Чтобы узнать больше о Linux, подпишитесь на мою рассылку на моем сайте и следите за мной в социальных сетях.
