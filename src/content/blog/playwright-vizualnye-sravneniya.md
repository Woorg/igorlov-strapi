---
title: Playwright — визуальные сравнения
meta_title: Playwright — визуальные сравнения - Igor Gorlov
description: >-
  Сегодня я хочу поговорить о визуальных сравнениях в Playwright. В некоторых
  проектах очень важно соблюдать одинаковый размер компонента на странице, или
  гарантировать точную визуализацию каждый раз, или обеспечить одинаковый цвет и
  т.д.
date: 2023-02-25T17:27:21.000Z
author: Igor Gorlov
image: ../../assets/images/undefined-Feb-25-2023.avif
categories:
  - Как закодить
tags:
  - E2E
  - Playwright
draft: false
lastmod: 2024-03-20T21:26:46.856Z
---

Здравствуйте,

Сегодня я хочу поговорить о визуальных сравнениях в Playwright.

В некоторых проектах очень важно соблюдать одинаковый размер компонента на странице, или гарантировать точную визуализацию каждый раз, или обеспечить одинаковый цвет и т.д.

Playwright предоставляет эту возможность из коробки. Для этого Playwright использует моментальные снимки и сравнивает конкретный снимок с результатом тестирования, чтобы проверить, что ничего не изменилось.

Но не будем терять времени и посмотрим, как это работает.

Для этого примера я хочу использовать компонент Square, но перед переходом к тесту его нужно рефакторить. Сначала нужно переместить png-изображения X и O из общей папки в папку компонента Square. После этого нужно рефакторить компонент так, чтобы он импортировал эти изображения и использовал их для рендеринга иконки. В результате получится примерно следующее:

<!-- wp:rank-math/toc-block {"title":"Оглавление","headings":[{"key":"94082223-64e1-4206-964d-f88160c3c75a","content":"Структура папок","level":2,"link":"#структура-папок","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"6d5f285d-794e-4bf8-b4c6-55848cba1cf0","content":"Компонент квадрата","level":2,"link":"#компонент-квадрата","disable":false,"isUpdated":false,"isGeneratedLink":true}],"listStyle":"ul"} -->
<div class="wp-block-rank-math-toc-block" id="rank-math-toc"><h2>Оглавление</h2><nav><ul><li class=""><a href="#структура-папок">Структура папок</a></li><li class=""><a href="#компонент-квадрата">Компонент квадрата</a></li></ul></nav></div>
<!-- /wp:rank-math/toc-block -->

<h2 class="wp-block-heading" id="структура-папок">Структура папок</h2>

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript"> Square
    O.png
    Square.module.scss
    Square.tsx
    X.png
</code></pre>
<!-- /wp:code -->

<h2 class="wp-block-heading" id="компонент-квадрата">Компонент квадрата</h2>

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">import { TicTacToeValue } from '../../models/TicTacToeValue';
import { Nullable } from '../../utils/Nullable';
import Icon from '../Icon/Icon';
import OIcon from './O.png';
import styles from './Square.module.scss';
import XIcon from './X.png';

interface SquareProps {
  value: Nullable&lt;TicTacToeValue&gt;;
  onSelect: () =&gt; void
}

export default function Square(
  { value, onSelect }: SquareProps
) {

  const icon = value === 'X' ? XIcon : OIcon;

  return (
    &lt;button
      type='button'
      className={styles.Square}
      onClick={onSelect}&gt;
      {value &amp;&amp; &lt;Icon src={icon} title={value} /&gt;}
    &lt;/button&gt;
  )
}
</code></pre>
<!-- /wp:code -->

Отлично, теперь вы готовы создать свой первый тест для проверки визуальных сравнений.

Прежде чем переходить к коду, вы должны познакомиться с тем, что нужно знать для проведения визуальных сравнений в Playwright, и единственное, что вам нужно знать, это утверждение toHaveScreenshot. Это утверждение - ваш лучший друг, если вы хотите реализовать визуальные сравнения в Playwright, у него есть несколько конфигураций, но самые распространенные вы увидите позже. Итак, не теряйте времени и пачкайте руки.

Прежде всего, необходимо создать новый файл src/components/Square/Square.spec.tsx, который будет содержать ваши тесты. В качестве первого примера можно создать новый тест, который проверяет, показывает ли компонент Square значок X, если значение равно X. Для этого нужно создать тест следующего вида

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">import { expect, test } from '@playwright/experimental-ct-react';
import Square from './Square';

test.describe('Square', () =&gt; {
  test('should show the X icon without regression', async ({ mount, page }) =&gt; {
    await mount(&lt;Square value={'X'} onSelect={() =&gt; { }} /&gt;);
    await expect(page).toHaveScreenshot();
  });
})
</code></pre>
<!-- /wp:code -->

Как вы заметили, в этой статье показано визуальное сравнение при тестировании компонентов, но вы можете использовать его и в e2e тестах.Хорошо, теперь пришло время посмотреть результат, выполнив команду npm run test-ct.Результат не такой, как ожидалось, я полагаю. На самом деле, результат показывает ошибку, как показано ниже:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">Error: A snapshot doesn't exist at playwright-series/snapshots/components/Square/Square.spec.tsx-snapshots/Square-should-show-the-X-icon-without-regression-1-chromium-darwin.png, writing actual.
</code></pre>
<!-- /wp:code -->

Как вы можете себе представить, Playwright пытается запустить ваши тесты, но не находит снимка для сравнения с вашим результатом, поэтому он выдает ошибку для каждой платформы (Chrome, Firefox и WebKit). Однако вы можете заметить, что в вашем проекте появилось три новых файла. Эти файлы являются снимками вашего теста. Вы можете найти их в корне проекта в папке **snapshots** . Отсюда Playwright может запустить ваш тест и проверить, похож ли результат на эти снимки. Чтобы проверить это, вы можете повторно выполнить предыдущую команду и заметить, что результат будет лучше и ваши тесты будут пройдены.

Чтобы дважды проверить, работает ли визуальное сравнение, вы можете изменить размеры иконок в файле Square.module.scss. Например, со 100x100 пикселей на 101x101 пиксель.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="css" class="language-css">.Square {
  width: 101px;
  height: 101px;
  background-color: #fff;
  border: 1px solid #000;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
</code></pre>
<!-- /wp:code -->

Если вы повторно выполните команду npm run test-ct, результат будет выглядеть примерно так:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">3 failed
    [chromium] components/Square/Square.spec.tsx:6:3 Square should show the X icon without regression
    [firefox] components/Square/Square.spec.tsx:6:3 Square should show the X icon without regression
    [webkit] components/Square/Square.spec.tsx:6:3 Square should show the X icon without regression
</code></pre>
<!-- /wp:code -->

И как вы можете себе представить, ваш набор тестов не сработал, потому что результат не совсем такой, как ожидалось.

Когда мы работаем с визуальным сравнением, как вы можете себе представить, ввести регрессию очень просто - пиксель разницы и бум, набор не работает. Playwright знает об этой проблеме и позволяет быть менее строгим в таких случаях. Важно помнить, что по умолчанию Playwright строг и проверяет каждый пиксель разницы, но вы можете настроить его с помощью порога. Наиболее распространенными являются maxDiffPixelRatio, maxDiffPixels или threshold. Каждая конфигурация позволяет вам быть менее строгим в разных случаях. Например, если вы выбрали конфигурацию maxDiffPixels, вы можете написать предыдущий тест таким образом

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">test('should show the X icon without regression', async ({ mount, page }) =&gt; {
  await mount(&lt;Square value={'X'} onSelect={() =&gt; { }} /&gt;);
  await expect(page).toHaveScreenshot({ maxDiffPixels: 500 });
});
</code></pre>
<!-- /wp:code -->

Если вы выполните команду npm run test-ct , то теперь набор тестов пройден, и, как вы можете себе представить, Playwright протестировал ваш новый снимок с использованием конфигурации maxDiffPixels. Таким образом, даже если размер отличается, результат будет нормальным, потому что он соответствует конфигурации maxDiffPixels.

Такие конфигурации могут быть установлены по умолчанию, если вы хотите. Например, вы можете решить, что все тесты визуального сравнения должны иметь maxDiffPixels, равный 500. Для этого можно настроить Playwright на такую конфигурацию по умолчанию. В конфигурационном файле Playwright можно задать метод expect с такой конфигурацией:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">import { defineConfig } from '@playwright/test';
export default defineConfig({
  expect: {
    toHaveScreenshot: { maxDiffPixels: 500 },
  },
});
</code></pre>
<!-- /wp:code -->

И последнее, но не менее важное: иногда требуется изменить структуру компонентов. В этих случаях необходимо изменить снимки, чтобы в будущем у Playwright были новые сравнительные изображения для проверки результатов. Для этого можно запустить тест с опцией --update-snapshots. Это укажет программе Playwright, что снимки старые и что она должна заменить предыдущие результаты новыми.

Итак, я полагаю, что у вас есть хорошее представление о том, как работает визуальное сравнение в Playwright, и вы можете начать играть с ним без проблем. Думаю, это все, что касается визуального сравнения, надеюсь, вам понравилось это содержание, и если у вас есть вопросы, добро пожаловать!

До скорой встречи, народные

Пока-пока

Вы можете найти исходный код этой статьи здесь.
