---
title: JavaScript Switch - объяснение с примерами
meta_title: JavaScript Switch - объяснение с примерами - Igor Gorlov
description: >-
  Операторы switch в JavaScript имеют поведение, называемое fall-through,
  которое может привести к неожиданным результатам. Я объясню, что это за
  поведение, как его избежать, а также примеры его использования.
date: 2023-02-25T19:51:14.000Z
author: Igor Gorlov
image: ../../assets/images/undefined-Feb-25-2023.avif
categories:
  - Учебник
tags:
  - JavaScript
draft: false
lastmod: 2024-03-20T21:26:42.478Z
---

Операторы switch в JavaScript имеют поведение, называемое fall-through, которое может привести к неожиданным результатам. Я объясню, что это за поведение, как его избежать, а также примеры его использования.

Операторы Switch позволяют создавать условные операторы в JavaScript. У вас есть условное выражение, и в зависимости от возвращаемого значения этого выражения вы можете иметь различные случаи. Будет выполнен тот случай, который соответствует этому выражению.

Давайте рассмотрим поведение операторов switch при выпадении.

<!-- wp:rank-math/toc-block {"title":"Оглавление","headings":[{"key":"5acb33b4-fe72-4c94-8957-10e51df70d9e","content":"Что это за поведение выпадения?","level":2,"link":"#что-это-за-поведение-выпадения","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"351c2db2-cfac-496d-9080-df6580ab3795","content":"Что вы заметили?","level":2,"link":"#что-вы-заметили","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"f1eaecf0-9c8f-4db3-ab6d-2b60511de69c","content":"Ключевое слово Break в утверждениях Switch","level":2,"link":"#ключевое-слово-break-в-утверждениях-switch","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"216b9112-513b-407d-a69c-507b7b0494f2","content":"Нужно ли прерывание в случае по умолчанию?","level":2,"link":"#нужно-ли-прерывание-в-случае-по-умолчанию","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"35d285a1-4801-49d9-a7cd-033722dd2559","content":"Преимущества поведения Fall-through Behavior","level":2,"link":"#преимущества-поведения-fall-through-behavior","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"43794022-e726-4db0-b5b9-424185aba937","content":"Подведение итогов","level":2,"link":"#подведение-итогов","disable":false,"isUpdated":false,"isGeneratedLink":true}],"listStyle":"ul"} -->
<div class="wp-block-rank-math-toc-block" id="rank-math-toc"><h2>Оглавление</h2><nav><ul><li class=""><a href="#что-это-за-поведение-выпадения">Что это за поведение выпадения?</a></li><li class=""><a href="#что-вы-заметили">Что вы заметили?</a></li><li class=""><a href="#ключевое-слово-break-в-утверждениях-switch">Ключевое слово Break в утверждениях Switch</a></li><li class=""><a href="#нужно-ли-прерывание-в-случае-по-умолчанию">Нужно ли прерывание в случае по умолчанию?</a></li><li class=""><a href="#преимущества-поведения-fall-through-behavior">Преимущества поведения Fall-through Behavior</a></li><li class=""><a href="#подведение-итогов">Подведение итогов</a></li></ul></nav></div>
<!-- /wp:rank-math/toc-block -->

<h2 class="wp-block-heading" id="что-это-за-поведение-выпадения">Что это за поведение выпадения?</h2>

Взгляните на пример оператора switch:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">const expression = 10 - 5

switch (expression) {
  case 1:
    console.log("The result is 1")
    break

  case 5:
    console.log("The result is 5")
    break

  case 10:
    console.log("The result is 10")
    break

  default:
    console.log("The result does not exist")
}

// The result is 5
</code></pre>
<!-- /wp:code -->

Здесь у нас есть выражение: 10 - 5. Используя оператор switch, мы переключаемся между различными случаями, один из которых соответствует возвращаемому значению выражения.

В примере случай 5 соответствует выражению, поэтому в этом случае будет выполнен код console.log(“The result is 5”).

Как вы можете видеть, результат регистрации - ”Результат равен 5”.

Если наше выражение было 10 - 1, то результатом будет 9. Поскольку для этого значения нет случая, будет запущен случай по умолчанию, и результат будет записан в журнал:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">// The result does not exist
</code></pre>
<!-- /wp:code -->

Одно общее утверждение, которое встречается во всех случаях, - это утверждение break. Что если бы этого утверждения не было в этих случаях? Давайте посмотрим, что произойдет:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">const expression = 10 - 5

switch (expression) {
  case 1:
    console.log("The result is 1")

  case 5:
    console.log("The result is 5")

  case 10:
    console.log("The result is 10")

  default:
    console.log("The result does not exist")
}

// The result is 5
// The result is 10
// The result does not exist
</code></pre>
<!-- /wp:code -->

<h2 class="wp-block-heading" id="что-вы-заметили">Что вы заметили?</h2>

Выполняются случаи 5, 10 и случай по умолчанию. Это и есть поведение выпадения.

Когда у вас есть случаи и выражение, оператор switch находит первый случай, который соответствует выражению. Он начинает с первого случая, случая 1. Этот случай не совпадает, поэтому оператор switch продолжает поиск. Затем он находит случай 5. Этот случай соответствует выражению.

Когда оператор switch находит этот первый случай, который соответствует выражению, он выполняет перебор, в котором после найденного случая выполняются остальные случаи. Неважно, соответствуют ли оставшиеся случаи выражению или нет, они будут выполнены.

У меня есть видео, объясняющее это поведение, которое вы можете посмотреть.

Вы, вероятно, думаете: ”В чем преимущество такого поведения?”. Мы рассмотрим это позже в этой статье.

<h2 class="wp-block-heading" id="ключевое-слово-break-в-утверждениях-switch">Ключевое слово Break в утверждениях Switch</h2>

Ключевое слово break, как вы видели в первом примере, - это способ сообщить оператору switch: не проваливайся; остановись здесь. Без этого слова произойдет провал, то есть будет выполнен случай, соответствующий выражению, а также все последующие случаи.

Допустим, у нас есть прерывание в нашем case 10:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">const expression = 10 - 5

switch (expression) {
  case 1:
    console.log("The result is 1")

  case 5:
    console.log("The result is 5")

  case 10:
    console.log("The result is 10")
    break

  default:
    console.log("The result does not exist")
}

// The result is 5
// The result is 10
</code></pre>
<!-- /wp:code -->

Что вы заметили в журнале? Выполняется случай 5, совпадающий случай. В журнале записано ”Результат 5”. Здесь нет оператора break, поэтому switch продолжает выполнение последующих случаев.

Выполняется случай 10, следующий после случая 5. Записывается ”Результат - 10”. Затем оператор switch встречает прерывание, которое является его сигналом к остановке. Поэтому оставшиеся случаи не выполняются.

Теперь вы понимаете, почему мы использовали прерывание в каждом случае:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">const expression = 10 - 5

switch (expression) {
  case 1:
    console.log("The result is 1")
    break

  case 5:
    console.log("The result is 5")
    break

  case 10:
    console.log("The result is 10")
    break

  default:
    console.log("The result does not exist")
}

// The result is 5
</code></pre>
<!-- /wp:code -->

Это необходимо для того, чтобы мы могли выполнить только тот случай, который соответствует нашему выражению.

<h2 class="wp-block-heading" id="нужно-ли-прерывание-в-случае-по-умолчанию">Нужно ли прерывание в случае по умолчанию?</h2>

В нашем примере в каждом случае есть прерывание, но в случае по умолчанию его нет. Нужен ли он в случае по умолчанию? Это зависит от места, где размещен случай по умолчанию.

В нашем примере случай по умолчанию является последним. Когда этот случай выполняется (поскольку для выражения нет ни одного подходящего случая), ожидается, что произойдет выпадение, поскольку нет оператора break.

Но поскольку случай по умолчанию является последним, то нет другого случая, который бы следовал за ним, в котором оператор switch мог бы провалиться.

Но давайте предположим, что у нас другой порядок для случая по умолчанию:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">const expression = 10 - 1

switch (expression) {
  case 1:
    console.log("The result is 1")

  default:
    console.log("The result does not exist")

  case 5:
    console.log("The result is 5")

  case 10:
    console.log("The result is 10")
}

// The result does not exist
// The result is 5
// The result is 10
</code></pre>
<!-- /wp:code -->

Здесь выражение равно 10 - 1, и мы убрали все разрывы. Случай по умолчанию - второй в операторе switch. Что вы заметили в журналах?

Поскольку нет случая, соответствующего выражению, выполняется случай по умолчанию. Но у этого случая нет прерывания, и под ним есть другие случаи. Таким образом, случаи (5 и 10) после случая по умолчанию также выполняются.

Вот почему я сказал, что это зависит от того, где расположен случай по умолчанию. В данном примере было бы важно добавить разрыв в default. А затем мы можем пропустить прерывание в случае 10, поскольку это последний случай:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">const expression = 10 - 1

switch (expression) {
  case 1:
    console.log("The result is 1")
    break

  default:
    console.log("The result does not exist")
    break

  case 5:
    console.log("The result is 5")
    break

  case 10:
    console.log("The result is 10")
}

// The result does not exist
</code></pre>
<!-- /wp:code -->

<h2 class="wp-block-heading" id="преимущества-поведения-fall-through-behavior">Преимущества поведения Fall-through Behavior</h2>

Это поведение может выглядеть как ошибка, но на самом деле это не так. Оно имеет свои преимущества. Вы можете воспользоваться этим поведением, чтобы сгруппировать связанные случаи. Вот пример:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">const expression = 10 - 2

switch (expression) {
  case 2:
    console.log("The result is less than 8")
    break;

  case 5:
    console.log("The result is less than 8")
    break;

  case 8:
    console.log("The result is 8")
    break;

  default:
    console.log("The result does not exist")
}

// The result is 8
</code></pre>
<!-- /wp:code -->

Здесь у нас есть условие 10 - 2. Случай 8 соответствует этому выражению, поэтому в консоль выводится ”Результат равен 8”.

Если мы изменим условие на 10 - 8, случай 2 будет соответствовать выражению, и мы получим ”Результат меньше 8” в консоли.

Если мы изменим условие на 10 - 5, случай 5 будет соответствовать выражению, и мы получим ”Результат меньше 8” в консоли.

Заметили, что код для этого случая похож на код для случая 2? Тогда вместо того, чтобы писать их отдельно, мы можем сгруппировать их вместе.

Вот как:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">const expression = 10 - 5

switch (expression) {
  case 2:

  case 5:
    console.log("The result is less than 8")
    break;

  case 8:
    console.log("The result is 8")
    break;

  default:
    console.log("The result does not exist")
}

// The result is less than 8
</code></pre>
<!-- /wp:code -->

Удалив код и ключевое слово break из case 2, мы можем объединить case 2 и case 5. С условием 10 - 5, case 5 совпадает, и мы получаем ”Результат меньше 8” в консоли.

С условием 10 - 8 совпадает case 2. В case 2 нет кода, поэтому ничего не будет выполнено. Кроме того, нет прерывания, поэтому произойдет fall-through, что означает, что будет выполнен следующий случай, case 5.

После выполнения на консоль будет выведено сообщение ”Результат меньше 8”. Оператор switch встречает здесь ключевое слово break, поэтому он знает, что нужно остановиться.

Мы смогли сгруппировать случаи 2 и 5, поскольку они связаны между собой, воспользовавшись поведением выпадения. Существует множество сценариев, в которых вы можете использовать это поведение.

<h2 class="wp-block-heading" id="подведение-итогов">Подведение итогов</h2>

В этой статье мы рассмотрели поведение fall-through в операторах switch. Это поведение подразумевает выполнение других случаев после совпадающего случая выражения. Это происходит по умолчанию, но может быть предотвращено с помощью ключевого слова break, как мы видели в различных примерах.

Мы также видели пользу от такого поведения, поскольку оно помогает группировать связанные случаи.

Когда я начал изучать JavaScript, я научился всегда использовать break в случаях с переключателями, но я никогда до конца не понимал, почему. Я думал, что это просто синтаксис операторов switch.

Но только спустя некоторое время я понял, что делает оператор break - предотвращает выпадения.

Возможно, у вас похожая история, или нет, но я надеюсь, что эта статья научит вас чему-то об операторах switch. Пожалуйста, поделитесь ею, если она была вам полезна.
