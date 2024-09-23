---
title: Как исправить исключения NullPointerExceptions в Android
meta_title: Как исправить исключения NullPointerExceptions в Android - Igor Gorlov
description: >-
  Вы только что закончили создание приложения на базе Android и пытаетесь его
  выполнить. Насколько вы знаете, приложение в порядке, синтаксических ошибок
  нет, и код должен работать нормально.
date: 2023-04-20T18:11:34.000Z
author: Igor Gorlov
image: ../../assets/images/undefined-Apr-20-2023.avif
categories:
  - Учебник
tags:
  - Java
  - Kotlin
draft: false
lastmod: 2024-03-20T21:26:43.341Z
---

Вы только что закончили создание приложения на базе Android и пытаетесь его выполнить. Насколько вы знаете, приложение в порядке, синтаксических ошибок нет, и код должен работать нормально. Но когда вы запускаете его, приложение завершает работу, сообщая, что возникло не пойманное исключение RuntimeException. Пытаясь докопаться до причины, вы находите нечто, что дает вам подсказку: произошло NullPointerException.

С этого вы начинаете свое путешествие в мир обработки исключений в Android, в частности, обработки NullPointerException. В этой статье мы обсудим, как исправить NullPointerException в приложениях Android.

<!-- wp:rank-math/toc-block {"title":"Оглавление","headings":[{"key":"95a4fdc7-3690-4dc0-a2f2-e926c87a6915","content":"Что такое NullPointerException?","level":2,"link":"#что-такое-null-pointer-exception","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"01133239-676d-4d82-8630-33da20dcaa7e","content":"Почему возникают исключения NullPointerException?","level":2,"link":"#почему-возникают-исключения-null-pointer-exception","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"f2be2bf8-0fd9-4df5-b6cd-6fd2c8a7c6e5","content":"Избегание исключений NullPointerExceptions в Java","level":2,"link":"#избегание-исключений-null-pointer-exceptions-в-java","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"e2673878-a98f-4bde-bc01-bd1abd53ab9b","content":"Использование SmartCast","level":2,"link":"#использование-smart-cast","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"a347ceb8-23ed-4e0b-8171-fff427916b03","content":"Использование оператора Elvis","level":2,"link":"#использование-оператора-elvis","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"380124fe-f6d5-4245-9f73-49c8a53aff7f","content":"Избегание исключений NullPointerException в Kotlin","level":2,"link":"#избегание-исключений-null-pointer-exception-в-kotlin","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"657bc2a6-e300-4aff-806c-c783c073887e","content":"Использование logcat для обнаружения и устранения NullPointerException в Android Studio","level":2,"link":"#использование-logcat-для-обнаружения-и-устранения-null-pointer-exception-в-android-studio","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"03ca4da3-b665-496e-b356-a7858415f34e","content":"Установка точек останова для отладки NullPointerExceptions","level":2,"link":"#установка-точек-останова-для-отладки-null-pointer-exceptions","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"3cb435ec-3d09-4dac-a30d-c1251c3f5ef1","content":"Заключение","level":2,"link":"#заключение","disable":false,"isUpdated":false,"isGeneratedLink":true}],"listStyle":"ul"} -->
<div class="wp-block-rank-math-toc-block" id="rank-math-toc"><h2>Оглавление</h2><nav><ul><li class=""><a href="#что-такое-null-pointer-exception">Что такое NullPointerException?</a></li><li class=""><a href="#почему-возникают-исключения-null-pointer-exception">Почему возникают исключения NullPointerException?</a></li><li class=""><a href="#избегание-исключений-null-pointer-exceptions-в-java">Избегание исключений NullPointerExceptions в Java</a></li><li class=""><a href="#использование-smart-cast">Использование SmartCast</a></li><li class=""><a href="#использование-оператора-elvis">Использование оператора Elvis</a></li><li class=""><a href="#избегание-исключений-null-pointer-exception-в-kotlin">Избегание исключений NullPointerException в Kotlin</a></li><li class=""><a href="#использование-logcat-для-обнаружения-и-устранения-null-pointer-exception-в-android-studio">Использование logcat для обнаружения и устранения NullPointerException в Android Studio</a></li><li class=""><a href="#установка-точек-останова-для-отладки-null-pointer-exceptions">Установка точек останова для отладки NullPointerExceptions</a></li><li class=""><a href="#заключение">Заключение</a></li></ul></nav></div>
<!-- /wp:rank-math/toc-block -->

<h2 class="wp-block-heading" id="что-такое-null-pointer-exception">Что такое NullPointerException?</h2>

Во-первых, давайте быстро освежим в памяти информацию об исключениях. Это события или аномальные условия в программе, которые возникают во время выполнения и нарушают нормальный ход программы.

Исключение может возникнуть по разным причинам, например:

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>пользователь вводит недопустимые данные в поле</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>файл, который должен быть открыт, не может быть найден</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Сетевое соединение потеряно в середине коммуникации</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>в JVM закончилась память.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

Когда внутри метода возникает ошибка, он выбрасывает исключение. Исключение NullPointerException является одним из наиболее распространенных исключений во время выполнения.

В Java null - это специальное значение, которое представляет собой отсутствие значения. Когда вы пытаетесь использовать нулевое значение, вы получаете исключение NullPointerException, потому что операция, которую вы пытаетесь выполнить, не может быть завершена для нулевого значения.

В Kotlin null - это не значение, а собственный тип, называемый nullable. По умолчанию каждый объект в Kotlin не имеет null, что означает, что он не может иметь нулевое значение.

<h2 class="wp-block-heading" id="почему-возникают-исключения-null-pointer-exception">Почему возникают исключения NullPointerException?</h2>

Вы можете столкнуться с NullPointerException при попытке получить доступ к представлению, ресурсу или данным, которые еще не были должным образом инициализированы или загружены. Согласно спецификации языка Java, некоторые из ситуаций, в которых может возникнуть NullPointerException, включают:

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Попытка доступа к элементам нулевого массива</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Использование switch с нулевым выражением</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Доступ к полям экземпляра нулевых ссылок</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>вызов методов экземпляра нулевой ссылки</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>использование целочисленного оператора или оператора с плавающей точкой, один из операндов которого является нулевой ссылкой в квадрате</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Попытка преобразования без вставки с вложенным значением в виде null</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Вызов super для нулевой ссылки</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<h2 class="wp-block-heading" id="избегание-исключений-null-pointer-exceptions-в-java">Избегание исключений NullPointerExceptions в Java</h2>

Ниже приведены некоторые лучшие практики для предотвращения NullPointerExceptions в Java:

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Сравнение строк с литералами</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Избегайте возврата null из ваших методов</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Постоянно проверяйте аргументы методов</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Используйте String.valueOf(), а не toString()</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Используйте примитивные типы данных как можно чаще</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Избегайте цепочек вызовов методов</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Используйте тернарный оператор</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

В отличие от него, Kotlin является более умным и современным языком, который был разработан для предотвращения NullPointerExceptions с помощью нескольких механизмов, таких как:

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>использование нуллируемых и ненуллируемых типов</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>использование функции SmartCast</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Безопасные вызовы</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Оператор Elvis</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

В Kotlin все регулярные типы являются ненулевыми, если только вы явно не пометите их как нулевые с помощью вопросительного знака ?, например, String?

Рассмотрим приведенный ниже код Kotlin:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="kotlin" class="language-kotlin">fun getlen(name: String) = name.length
</code></pre>
<!-- /wp:code -->

Имя параметра имеет тип String, что означает, что оно всегда должно содержать экземпляр String и не может содержать null. Этот код гарантирует, что исключение NullPointerException во время выполнения вряд ли произойдет.

Вместо этого любая попытка передать нулевое значение в функцию getlen(name: String) приведет к ошибке компиляции: Null не может быть значением ненулевого типа String. Это происходит потому, что компилятор ввел правило, согласно которому аргументы функции getlen() не могут быть нулевыми.

Рассмотрим приведенный ниже фрагмент, в котором код очевиден для нас, но может быть не сразу очевиден для компилятора:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="kotlin" class="language-kotlin">class TestNPE {
    companion object {
        @JvmStatic
        fun main(args: Array&lt;String&gt;) {
        var m : String? // here, m is declared as nullable
println("m is : $m")
var x: Int
x = 150
if (x == 150)
    println("Value of m is : $m")
        }
    }
}
</code></pre>
<!-- /wp:code -->

<!-- wp:image {"align":"center","id":167767} -->
<figure class="wp-block-image aligncenter"><img src="https://blog.logrocket.com/wp-content/uploads/2023/04/compiler-error-m-not-initialized.png?is-pending-load=1" alt="A compiler error is raised because m is not initialized" class="wp-image-167767"/></figure>
<!-- /wp:image -->

Компилятор выдает ошибку компилятора, поскольку m не инициализирован:

Таким образом, вместо того, чтобы перейти к выполнению и затем выдать исключение, он останавливается на этапе компиляции с ошибкой компилятора.

<h2 class="wp-block-heading" id="использование-smart-cast">Использование SmartCast</h2>

Для того чтобы использовать типы с нулевыми значениями, в Kotlin есть возможность, называемая safe cast, или smart cast. Благодаря этой функции компилятор Kotlin будет отслеживать ситуации внутри if и других условных выражений. Таким образом, если компилятор обнаружит переменную, принадлежащую к ненулевому типу, он позволит вам безопасно получить доступ к этой переменной.

В некоторых случаях компилятор не может выполнить приведение типов, в этом случае он выбросит исключение; это называется небезопасным приведением. Рассмотрим строку с нулевым типом (String?), которую нельзя привести к строке без нуля (String). Это приведет к исключению.

Kotlin решает эту проблему, предоставляя оператор safe cast as? для безопасного приведения к другому типу. Если приведение невозможно, он возвращает null, а не выбрасывает исключение ClassCastException.

Пример:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="kotlin" class="language-kotlin">val aInt: Int? = a as? Int
</code></pre>
<!-- /wp:code -->

<h2 class="wp-block-heading" id="использование-оператора-elvis">Использование оператора Elvis</h2>

В Kotlin также есть расширенный оператор, называемый оператором Elvis (?:), который возвращает либо ненулевое значение, либо значение по умолчанию, даже если условное выражение равно null. Он также проверяет нулевую безопасность значений.

Рассмотрим пример:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="kotlin" class="language-kotlin">val count = attendance?.length ?: -1
</code></pre>
<!-- /wp:code -->

Это значит:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="kotlin" class="language-kotlin">val count: Int = if (attendance != null) attendance.length else -1
</code></pre>
<!-- /wp:code -->

Несмотря на это, исключение NullPointerException все равно может возникнуть в Android-приложениях на базе Kotlin.

Рассмотрим предыдущий пример класса TestNPE. Теперь код изменен таким образом, что m инициализируется, но используется с оператором утверждения non-null (!!), который преобразует заданное значение к типу non-null и выбрасывает исключение, если значение равно null.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="kotlin" class="language-kotlin">class TestNPE {
    companion object {
        @JvmStatic
        fun main(args: Array&lt;String&gt;) {
            var m: String?=null // here, m is declared
//as nullable
            var x: Int
            x = 150
            if (x == 150)
            println("m is : $m")
            var mlen = m!!.length
            println("length of m is : $mlen")
        }
    }
}
</code></pre>
<!-- /wp:code -->

<!-- wp:image {"align":"center","id":167769} -->
<figure class="wp-block-image aligncenter"><img src="https://blog.logrocket.com/wp-content/uploads/2023/04/nullpointerexception-thrown.png?is-pending-load=1" alt="A NullPointerException is thrown" class="wp-image-167769"/></figure>
<!-- /wp:image -->

В этом случае возникнет исключение NullPointerException, как показано здесь:

<!-- wp:image {"sizeSlug":"large"} -->
<figure class="wp-block-image size-large"><img src="https://blog.logrocket.com/wp-content/uploads/2023/04/nullpointerexception-thrown.png" alt=""/></figure>
<!-- /wp:image -->

<h2 class="wp-block-heading" id="избегание-исключений-null-pointer-exception-в-kotlin">Избегание исключений NullPointerException в Kotlin</h2>

Несколько причин возникновения NullPointerException в Kotlin:

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Явный вызов throw NullPointerException()</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Использование оператора !!!</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Несогласованность данных при инициализации</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Взаимодействие с Java</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

Чтобы предотвратить NullPointerException, вы всегда должны убедиться, что ваши переменные и объекты правильно инициализированы перед их использованием. Вы также можете использовать проверки на нулевые значения или блоки try … catch для обработки возможных нулевых значений и предотвращения сбоя вашего приложения.

Ниже приведен чрезвычайно упрощенный пример использования try … catch:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="kotlin" class="language-kotlin">class TestNPE {
    companion object {
        @JvmStatic
        fun main(args: Array&lt;String&gt;) {
            var m: String?=null // here, m is declared 
//as nullable
           try {
               var x: Int
               x = 150
               if (x == 150)
                   println("m is : $m")
               var mlen = m!!.length
               println("length of m is : $mlen")
           }catch( ne: NullPointerException)
           {
               println("Null Pointer Exception has 
occurred. ")
           }
        }
    }
}
</code></pre>
<!-- /wp:code -->

Код, который может вызвать NullPointerException, заключен в блок try … catch.

Преимущество этого блока в том, что разработчик контролирует, что должно быть сделано, когда исключение будет выброшено. Здесь выводится простое сообщение. В практических сценариях перед завершением программы можно закрыть все открытые в данный момент ресурсы, например, файлы.

<h2 class="wp-block-heading" id="использование-logcat-для-обнаружения-и-устранения-null-pointer-exception-в-android-studio">Использование logcat для обнаружения и устранения NullPointerException в Android Studio</h2>

При сбое приложения Android в консоль записывается трассировка стека, содержащая важную информацию, которая может помочь определить и решить проблему. Есть два способа получить эту трассировку:

С помощью утилиты adb shell от Google получить файл logcat, который может помочь объяснить причину сбоя приложения:

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">adb logcat &gt; logcat.txt
</pre>
<!-- /wp:preformatted -->

Откройте файл logcat.txt и найдите имя приложения. В нем будет информация о том, почему приложение потерпело неудачу, а также другие подробности, такие как номер строки, имя класса и т.д.

В Android Studio либо нажмите Alt+6, либо нажмите кнопку Logcat в строке состояния. Убедитесь, что ваш эмулятор или устройство выбраны на панели ”Устройства", затем найдите трассировку стека.

В журнале может быть много записей, поэтому вам, возможно, придется немного прокрутить журнал, или вы можете очистить журнал через опцию ”Корзина" и снова дать приложению упасть, чтобы самый последний след стека в журнале оказался наверху.

Важно отметить, что если ваше приложение уже работает, то вы не сможете использовать logcat.

Последняя версия Android Studio Electric Eel имеет обновленный logcat, который облегчает разбор, запрос и отслеживание журналов. Новый logcat также:

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Форматирует журналы для удобного сканирования на наличие тегов, сообщений и другой полезной информации</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Определяет различные типы журналов, такие как предупреждения и ошибки.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>упрощает отслеживание журналов вашего приложения при сбоях и перезагрузках приложения.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

Когда logcat заметит, что процесс вашего приложения останавливался и перезапускался, вы увидите в выводе сообщение, подобное приведенному ниже:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">PROCESS ENDED</code></pre>
<!-- /wp:code -->

Or:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">PROCESS STARTED</code></pre>
<!-- /wp:code -->

Разработчики могут точно настроить команду, чтобы, например, указать временную метку сообщения:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">adb logcat -v time</code></pre>
<!-- /wp:code -->

С помощью logcat можно определить, объявлен ли виджет или компонент, но еще не определен, или переменная является нулевой и используется. Иногда может случиться так, что контекст становится нулевым во время перехода между экранами, и вы пытаетесь использовать этот контекст, не понимая, что он нулевой.

<h2 class="wp-block-heading" id="установка-точек-останова-для-отладки-null-pointer-exceptions">Установка точек останова для отладки NullPointerExceptions</h2>

Если у вас большое приложение, его отладка может быть довольно сложной. Вы можете установить в коде точки останова, которые позволят вам отлаживать код блок за блоком.

Точка останова служит знаком остановки для отмеченного фрагмента кода. Когда точка останова встречается во время отладки приложения, она приостанавливает выполнение, что позволяет разработчикам детально изучить происходящее и при необходимости использовать другие инструменты отладки.

Чтобы использовать точки останова:

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Добавьте точку останова, щелкнув по желобу в редакторе кода рядом с номером строки, на которой вы хотите приостановить выполнение.Рядом с номером строки появится точка, а сама строка будет выделена. См. ниже; добавлены две точки останова:</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Click Run &gt; Debug ‘app’</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:image {"align":"center","id":167776} -->
<figure class="wp-block-image aligncenter"><img src="https://blog.logrocket.com/wp-content/uploads/2023/04/debug-window-android-studio.png?is-pending-load=1" alt="The Debug window in Android Studio" class="wp-image-167776"/></figure>
<!-- /wp:image -->

Программа останавливается на первой точке останова, и вы можете просмотреть значения в окне Debug в нижней части Android Studio.

<!-- wp:image {"align":"center","id":167779} -->
<figure class="wp-block-image aligncenter"><img src="https://blog.logrocket.com/wp-content/uploads/2023/04/step-over-step-into-buttons.png?is-pending-load=1" alt="The Step Over and Step Into buttons" class="wp-image-167779"/></figure>
<!-- /wp:image -->

Существуют различные кнопки, такие как Step Over и Step Into, которые помогут вам ориентироваться дальше.

Помимо изучения текущих значений определенных операндов и выражений, вы также можете оценивать выражения с помощью опции Evaluate.

<!-- wp:image {"align":"center","id":167782} -->
<figure class="wp-block-image aligncenter"><img src="https://blog.logrocket.com/wp-content/uploads/2023/04/result-current-value-x.png?is-pending-load=1" alt="Getting the result of the current value of X" class="wp-image-167782"/></figure>
<!-- /wp:image -->

В приведенном ниже примере я хотел узнать, каким будет значение x, прибавленное к 100. В окне отображается результат, основанный на текущем значении x:

Здесь приведено подробное объяснение различных терминов, связанных с отладкой в Android Studio.

<h2 class="wp-block-heading" id="заключение">Заключение</h2>

В заключение следует отметить, что в разработке Android существуют различные механизмы, доступные в Java и Kotlin, которые призваны помочь разработчикам избежать NullPointerExceptions. В тех случаях, когда эти исключения все же возникают, у вас теперь должен быть целый ряд инструментов, которые помогут определить причину и отладить код.
