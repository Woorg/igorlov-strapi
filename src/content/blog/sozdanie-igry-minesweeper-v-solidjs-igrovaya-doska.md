---
title: Создание игры Minesweeper в SolidJS - Игровая доска
meta_title: Создание игры Minesweeper в SolidJS Игровая доска - Igor Gorlov
description: >-
  Прошло некоторое время с тех пор, как я в последний раз что-то писал. Я
  подумал, что если поделиться с вами чем-то приятным, это может послужить
  средством для возвращения к этому.
date: 2023-03-18T00:17:22.000Z
author: Igor Gorlov
image: ../../assets/images/undefined-Mar-18-2023.avif
categories:
  - Как закодить
tags:
  - Gamedev
  - JavaScript
  - Solidjs
draft: false
lastmod: 2024-03-20T21:26:43.423Z
---

Прошло некоторое время с тех пор, как я в последний раз что-то писал. Я подумал, что если поделиться с вами чем-то приятным, это может послужить средством для возвращения к этому. Таким образом, я терпеливо ждал чего-то, что могло бы возродить мое вдохновение и интерес, что в конечном итоге пришло в виде старой, но затягивающей игры Minesweeper :)

Моя дочь недавно открыла для себя Minesweeper на своем компьютере, и, к моему удивлению, она стала для нас увлекательным совместным занятием. Я сижу рядом с ней, время от времени предлагая свои два цента, и поражаюсь тому, как быстро она уловила логику игры. Она играет все быстрее и быстрее, с каждым днем ставя рекорды.

Сидя там, я не мог не задуматься о коде, лежащем в основе игры. В частности, я размышлял о расположении игрового поля. Это двумерный массив или плоский массив? Как вычисляются числа? Каким волшебником нужно быть, чтобы создать такую штуку?

Этого достаточно, чтобы разжечь огонь под моей задницей и заставить меня действовать :)

Итак, хотите поучаствовать в создании игры Minesweeper с помощью SolidJS?<br>Поехали!

Эй! Для получения большего количества материалов, подобных тому, что вы собираетесь прочитать, проверьте @mattibarzeev на Twitter 🍻

Код можно найти в этом репозитории GitHub:<br>https://github.com/mbarzeev/solid-minesweeper

<h2 class="wp-block-heading">Игровая доска</h2>

Доска сделана из массива с 16 ячейками. Это позволит нам создать доску 4х4. В настоящее время она жестко закодирована, позже мы сможем сделать на ней несколько случайных расположений:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">const boardArray: number[] = [0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0];
</code></pre>
<!-- /wp:code -->

Содержимое массива состоит из 0 и 1, где 1 означает плитку с миной, а 0 - пустую плитку.<br>Для отображения я использую компонент <code>&lt;For&gt;</code> из Solid:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="jsx" class="language-jsx">const App: Component = () =&gt; {
   return (
       &lt;div class={styles.App}&gt;
           &lt;header class={styles.header}&gt;
               &lt;For each={boardArray}&gt;
                   {(item: number, index: () =&gt; number) =&gt; &lt;div&gt;{item}&lt;/div&gt;}
               &lt;/For&gt;
           &lt;/header&gt;
       &lt;/div&gt;
   );
};
</code></pre>
<!-- /wp:code -->

В результате получается вот что:

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--9Khjud6X--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/8vb97fmms941jy0u2uhn.png" alt="Описание изображения"/></figure>
<!-- /wp:image -->

Подождите… дальше будет лучше.

Очевидно, нам нужен способ расположить их в сетке 4x4, и для этого я использую … css-сетку :)<br>Я помещу мой &lt;For …&gt; тег внутрь div, который имеет класс board css, и вот определение этого класса:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="css" class="language-css">.board {
 --tile-dimension: 30px;
 --row-length: 4;


 display: grid;
 grid-template-columns: repeat(auto-fit, minmax(var(--tile-dimension), 1fr));
 max-width: calc(var(--row-length) * var(--tile-dimension));
}
</code></pre>
<!-- /wp:code -->

Теперь это выглядит следующим образом:

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--gazEyZBV--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/aa4n0ag2w4dofudp903g.png" alt="Описание изображения"/></figure>
<!-- /wp:image -->

Да, больше похоже на это.<br>Мы знаем, что эти пустые клетки должны указывать на количество мин, которые находятся рядом с ними во всех 8 направлениях. Как мы это сделаем?

<h2 class="wp-block-heading">Простой алгоритм игры Minesweeper</h2>

Здесь я использую подход ”грубой силы”, хотя может оказаться, что это самый эффективный способ достижения цели. Я проверяю каждую плитку на наличие мин рядом с ней, но поскольку массив плоский, нам нужно быть умными. Позвольте мне сначала поместить здесь код, а затем объяснить, что происходит в функции “getMinesCount()".<br>Вот рендеринг, где мы передаем индекс текущей ячейки в функцию getMinesCount:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="jsx" class="language-jsx">&lt;div class={styles.board}&gt;
                   &lt;For each={boardArray} fallback={&lt;div&gt;Loading...&lt;/div&gt;}&gt;
                       {(item: number, index: () =&gt; number) =&gt; (
                           &lt;div style={{width: '30px', height: '30px'}}&gt;{getMinesCount(index())}&lt;/div&gt;
                       )}
                   &lt;/For&gt;
               &lt;/div&gt;
</code></pre>
<!-- /wp:code -->

А вот реализация функции getMinesCount:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">function getMinesCount(index: number) {
   const cell = boardArray[index];
   if (cell === 1) {
       return 'x';
   } else {
       let minesCount = 0;
       const hasLeftCells = index % ROW_LENGTH &gt; 0;
       const hasRightCells = (index + 1) % ROW_LENGTH !== 0;
       const bottomCellIndex = index + ROW_LENGTH;
       const topCellIndex = index - ROW_LENGTH;


       if (boardArray[bottomCellIndex] === 1) {
           minesCount++;
       }


       if (boardArray[topCellIndex] === 1) {
           minesCount++;
       }


       if (hasLeftCells) {
           boardArray[index - 1] === 1 &amp;&amp; minesCount++;
           boardArray[topCellIndex - 1] === 1 &amp;&amp; minesCount++;
           boardArray[bottomCellIndex - 1] === 1 &amp;&amp; minesCount++;
       }


       if (hasRightCells) {
           boardArray[index + 1] === 1 &amp;&amp; minesCount++;
           boardArray[topCellIndex + 1] &amp;&amp; minesCount++;
           hasRightCells &amp;&amp; boardArray[bottomCellIndex + 1] &amp;&amp; minesCount++;
       }


       return minesCount;
   }
}
</code></pre>
<!-- /wp:code -->

Логика довольно проста - мы вычисляем верхнюю и нижнюю ячейки, выясняем, есть ли у ячейки соседи слева или справа, и соответственно увеличиваем minesCount.

На самом деле это не так уж плохо, учитывая, что у нас сложность O(n).

Вот как это выглядит сейчас:

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--qDz0QldX--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/n3cf3cyfmtmqsbx2uqvt.png" alt="Описание изображения"/></figure>
<!-- /wp:image -->

Символ “X” обозначает мины, а цифры показывают, сколько мин находится рядом с клеткой. Пора создать компонент Tile.

Вы, наверное, заметили, что я использую константу “ROW_LENGTH” для вычисления размеров доски, и я также имею это значение в CSS как переменную, и это немного раздражает меня, что изменение размеров сетки требует изменения как CSS, так и JS, а не только в одном месте.<br>Для этого я решил определить переменную CSS в коде рендеринга, например, так:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="jsx" class="language-jsx">&lt;div class={styles.App} style={{'--row-length': ROW_LENGTH}}&gt;
           &lt;header class={styles.header}&gt;
               &lt;div class={styles.board}&gt;
                   &lt;For each={boardArray}&gt;
                       {(item: number, index: () =&gt; number) =&gt; &lt;Tile {...getTileData(index())} /&gt;}
                   &lt;/For&gt;
               &lt;/div&gt;
           &lt;/header&gt;
       &lt;/div&gt;
</code></pre>
<!-- /wp:code -->

Таким образом, мне нужно только изменить константу “ROW_LENGTH”, и все выравнивается идеально.

<h2 class="wp-block-heading">Компонент плитки</h2>

<!-- wp:code -->
<pre class="wp-block-code"><code lang="jsx" class="language-jsx">import {Component, createSignal} from 'solid-js';
import styles from './Tile.module.css';


export type TileData = {
   isMine: boolean;
   value?: number;
};


const Tile: Component&lt;TileData&gt; = (data: TileData) =&gt; {
   const [isOpen, setIsOpen] = createSignal(false);
   const [isMarked, setIsMarked] = createSignal(false);


   const onTileClicked = (event: MouseEvent) =&gt; {
       !isMarked() &amp;&amp; setIsOpen(true);
   };


   const onTileContextClick = (event: MouseEvent) =&gt; {
       event.preventDefault();
       !isOpen() &amp;&amp; setIsMarked(!isMarked());
   };


   const value = data.isMine ? 'X' : data.value;


   return (
       &lt;div class={styles.Tile} onclick={onTileClicked} onContextMenu={onTileContextClick}&gt;
           &lt;div class={styles.value} classList={{[styles.exposed]: isOpen() || isMarked()}}&gt;
               {isMarked() ? '🚩' : value !== 0 ? value : ''}
           &lt;/div&gt;
       &lt;/div&gt;
   );
};


export default Tile;
</code></pre>
<!-- /wp:code -->

Как вы можете видеть, щелчок правой кнопкой мыши отмечает плитку, а обычный щелчок открывает ее. Отметку можно переключить, но после открытия плитка уже открыта.

И мы используем это так в основном приложении:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="jsx" class="language-jsx">&lt;For each={boardArray} fallback={&lt;div&gt;Loading...&lt;/div&gt;}&gt;
                       {(item: number, index: () =&gt; number) =&gt; &lt;Tile {...getTileData(index())} /&gt;}
                   &lt;/For&gt;
</code></pre>
<!-- /wp:code -->

И вот что мы получили: доска с ”пустыми” плитками, при нажатии на которые они открываются - те, что с цифрами, показывают цифры, те, что с минами, показывают “X”, а отмеченные - флажки.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--RdcRT0Tl--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ftfnehlrip7489sa8uny.png" alt="Описание изображения"/></figure>
<!-- /wp:image -->

<h2 class="wp-block-heading">Доска Случайностей</h2>

Пора добавить немного случайности в котел. Я хотел бы сгенерировать плоский массив 20x20 (400 клеток), в котором разбросаны 40 мин. Вот код для этого:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="jsx" class="language-jsx">const totalMines = 40;
const ROW_LENGTH = 20;
const TOTAL_TILES = Math.pow(ROW_LENGTH, 2);


const boardArray = [...Array(TOTAL_TILES)].fill(0);


let count = 0;
while (count &lt; totalMines) {
   const randomCellIndex = Math.floor(Math.random() * TOTAL_TILES);
   if (boardArray[randomCellIndex] !== 1) {
       boardArray[randomCellIndex] = 1;
       count++;
   }
}
</code></pre>
<!-- /wp:code -->

Вот как это выглядит без скрытия значения плитки для наглядности:

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--V81u5Fs1--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/36ikyg2dn601nal1abp5.png" alt="Описание изображения"/></figure>
<!-- /wp:image -->

На этом пока все.

У нас есть игровое поле, которое позволяет нам настраивать его размеры и количество мин, которые мы хотим включить. В настоящее время у нас есть возможность раскрывать или помечать отдельные плитки.

Следующий шаг - понять логику, лежащую в основе функции ”автораскрытия”, когда несколько плиток раскрываются одним щелчком мыши. Нам нужно определить соответствующую логику для открытия соседних плиток при нажатии на одну плитку. Нам также необходимо решить остальные вопросы механики игры, чтобы обеспечить ее бесперебойную работу.

Код можно найти в этом репозитории GitHub:<br>https://github.com/mbarzeev/solid-minesweeper
