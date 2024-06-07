---
title: React UseMemo
meta_title: React UseMemo - Igor Gorlov
description: >-
  useMemo – это хук React, который позволяет кэшировать результат вычислений
  между рендерами.
date: 2023-04-27T21:33:56.000Z
author: Igor Gorlov
image: ../../assets/images/undefined-Apr-28-2023.avif
categories:
  - Учебник
tags:
  - React
  - UseMemo
draft: false
lastmod: 2024-03-20T21:26:43.081Z
---

<!-- wp:rank-math/toc-block {"title":"Оглавление","headings":[{"key":"242daa84-d47e-4fcf-8f32-b48da1c91e50","content":"Что такое useMemo?","level":2,"link":"#что-такое-use-memo","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"3831aac3-eec1-4ba3-83b3-338b19d80671","content":"Простое объяснение","level":3,"link":"#простое-объяснение","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"30cdf427-75f2-42a1-af4f-3c8612a5ab1d","content":"Как использовать UseMemo?","level":2,"link":"#как-использовать-use-memo","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"4992e287-549b-42e3-9a62-1774716df832","content":"Полный пример","level":2,"link":"#полный-пример","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"8395b331-cbaf-43e3-bf58-a0ccd75e3576","content":"Без useMemo","level":3,"link":"#без-use-memo","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"a98fc6dd-97c5-4be7-bb34-b7dce8488147","content":"С помощью UseMemo","level":3,"link":"#с-помощью-use-memo","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"d25b5615-eced-4f1d-b6e6-cd0c2537f24a","content":"Напоминание: Не используйте UseMemo повсеместно!","level":2,"link":"#напоминание-не-используйте-use-memo-повсеместно","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"88ae6210-1443-4cd3-a778-695191ad0e17","content":"Ссылка","level":2,"link":"#ссылка","disable":false,"isUpdated":false,"isGeneratedLink":true}],"listStyle":"ul"} -->
<div class="wp-block-rank-math-toc-block" id="rank-math-toc"><h2>Оглавление</h2><nav><ul><li class=""><a href="#что-такое-use-memo">Что такое useMemo?</a><ul><li class=""><a href="#простое-объяснение">Простое объяснение</a></li></ul></li><li class=""><a href="#как-использовать-use-memo">Как использовать UseMemo?</a></li><li class=""><a href="#полный-пример">Полный пример</a><ul><li class=""><a href="#без-use-memo">Без useMemo</a></li><li class=""><a href="#с-помощью-use-memo">С помощью UseMemo</a></li></ul></li><li class=""><a href="#напоминание-не-используйте-use-memo-повсеместно">Напоминание: Не используйте UseMemo повсеместно!</a></li><li class=""><a href="#ссылка">Ссылка</a></li></ul></nav></div>
<!-- /wp:rank-math/toc-block -->

<h2 class="wp-block-heading" id="что-такое-use-memo">Что такое useMemo?</h2>

useMemo - это хук React, который позволяет кэшировать результат вычислений между рендерами.

Как правило, useMemo уменьшает объем работы, которую необходимо выполнить при данном рендере. useMemo может мемоизировать функцию и ее результат, что означает, что если входы функции не изменяются, React вернет мемоизированное значение вместо повторного вычисления, что потенциально ускорит процесс рендеринга.

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="простое-объяснение">Простое объяснение</h3>

Допустим, у нас есть очень медленная функция, которая занимает огромное количество времени на вычисление в процессе рендеринга:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">// a really slow function...
const slowFunction = (num) =&gt; {
  for (let i = 0; i &lt; 1000000000; i++) { }
  return num * 2;
}
</code></pre>
<!-- /wp:code -->

И нам нужен результат этой slowFunction для рендеринга веб-страницы, например, переменная complexResult:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">const complexResult = slowFunction(input);
</code></pre>
<!-- /wp:code -->

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">&lt;p&gt; { complexResult } &lt;/p&gt;
</code></pre>
<!-- /wp:code -->

В этом случае вызов slowFunction в каждом рендере значительно замедлит работу вашего приложения. Вот здесь и пригодится useMemo.

Мы можем обернуть slowFunction внутри useMemo и предоставить массив зависимостей. Массив зависимостей используется для определения того, нужно ли пересчитывать мемоизированное значение. Если какая-либо из зависимостей изменится, useMemo пересчитает мемоизированное значение, или просто будет использовать предыдущее ”мемоизированное” значение.

Простая метафора может быть такой:

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>если я решаю головоломку в первый раз, мне нужно потратить время на прохождение всех шагов, пока я не решу ее и не дам ответ.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Если вы попросите меня решить ту же головоломку во второй раз, мне не придется проходить все шаги еще раз. Вместо этого я просто дам вам ответ прямо, потому что он уже есть в моем мозгу.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Если вы попросите меня решить другую головоломку, мне все равно придется потратить время на прохождение всех шагов.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

Вот:

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>процесс решения головоломки — это slowFunction</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>ответ - complexResult</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>проблема головоломки — зависимость.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<h2 class="wp-block-heading" id="как-использовать-use-memo">Как использовать UseMemo?</h2>

Прототип приведен ниже:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">const cachedValue = useMemo(calculateValue, dependencies);
</code></pre>
<!-- /wp:code -->

где

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>calculateValue: Функция, вычисляющая значение, которое вы хотите кэшировать. (обычно это медленные функции)</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>зависимости: Список всех реактивных значений, на которые ссылается код calculateValue.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>cachedValue: тот же результат вызова calculateValue.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

Вернемся к нашему примеру, ранее мы имели:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">const complexResult = slowFunction(input);
</code></pre>
<!-- /wp:code -->

А с помощью UseMemo эту строку можно изменить на:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">const complexResult = useMemo(() =&gt; {
  return slowFunction(input)
}, [input])
</code></pre>
<!-- /wp:code -->

В приведенном выше примере complexResult будет пересчитан только в том случае, если изменится зависимость ввода. Если входные данные останутся прежними, React вернет ранее мемоизированное значение, что избавит нас от необходимости снова и снова вызывать slowFunction.

<h2 class="wp-block-heading" id="полный-пример">Полный пример</h2>

Если вы все еще считаете эту концепцию абстрактной или вам просто нужно немного контекста для размышлений. Ниже приведен немного более сложный пример.

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="без-use-memo">Без useMemo</h3>

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">import { useState } from "react";

const slowFunction = (num) =&gt; {
  console.log("running slow double calculation...");
  for (let i = 0; i &lt; 1000000000; i++) {}
  return num * 2;
};

const Demo = () =&gt; {
  const [number, setNumber] = useState(0);
  const [color, setColor] = useState("black");

  const doubledNumber = slowFunction(number);

  return (
    &lt;div&gt;
      &lt;input
        type="number"
        value={number}
        onChange={(e) =&gt; setNumber(e.target.value)}
      /&gt;
      &lt;button onClick={() =&gt; setColor(color === "black" ? "green" : "black")}&gt;
        Change Color!
      &lt;/button&gt;
      &lt;p style={{ color: color }}&gt;{doubledNumber}&lt;/p&gt;
    &lt;/div&gt;
  );
};

export default Demo;
</code></pre>
<!-- /wp:code -->

Что произошло после нажатия кнопки изменения цвета?

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>setColor вызвал повторный рендеринг</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Пересчет удвоенного числа занимает много времени</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Приводит к медленному рендерингу удвоенного числа</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="с-помощью-use-memo">С помощью UseMemo</h3>

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">import { useState, useMemo } from "react";

const slowFunction = (num) =&gt; {
  console.log("running slow double calculation...");
  for (let i = 0; i &lt; 1000000000; i++) {}
  return num * 2;
};

const Demo = () =&gt; {
  const [number, setNumber] = useState(0);
  const [color, setColor] = useState("black");

  const doubledNumber = useMemo(() =&gt; {
    return slowFunction(number);
  }, [number]);

  return (
    &lt;div&gt;
      &lt;input
        type="number"
        value={number}
        onChange={(e) =&gt; setNumber(e.target.value)}
      /&gt;
      &lt;button onClick={() =&gt; setColor(color === "black" ? "green" : "black")}&gt;
        Change Color!
      &lt;/button&gt;
      &lt;p style={{ color: color }}&gt;{doubledNumber}&lt;/p&gt;
    &lt;/div&gt;
  );
};

export default Demo;
</code></pre>
<!-- /wp:code -->

Благодаря UseMemo нам больше не придется долго ждать установки цвета после изменения номера.

<h2 class="wp-block-heading" id="напоминание-не-используйте-use-memo-повсеместно">Напоминание: Не используйте UseMemo повсеместно!</h2>

Причины следующие:

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Чрезмерное использование useMemo может снизить производительность и внести ненужные накладные расходы.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Мемоизация наиболее эффективна для дорогих вычислений, которые дают одинаковый результат при одинаковых входных данных.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Чрезмерное использование useMemo может сделать ваш код более сложным для чтения и сопровождения.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<h2 class="wp-block-heading" id="ссылка">Ссылка</h2>

useMemo. React. (n.d.). Получено 25 апреля 2023 года с https://react.dev/reference/react/useMemo.
