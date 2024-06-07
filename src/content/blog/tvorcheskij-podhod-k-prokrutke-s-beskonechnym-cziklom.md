---
title: Творческий подход к скроллу с бесконечным циклом
meta_title: Творческий подход к прокрутке с бесконечным циклом - Igor Gorlov
description: >-
  Бесконечная прокрутка – это техника веб-дизайна, которая позволяет
  пользователям прокручивать бесконечный список контента путем автоматической
  загрузки новых элементов по мере того, как пользователь достигает нижней части
  страницы. 
date: 2023-01-29T17:24:00.000Z
author: Igor Gorlov
image: ../../assets/images/undefined-Jan-29-2023.avif
categories:
  - Учебник
tags:
  - 3d
  - Animation
  - Gsap
  - Прокрутка
draft: false
lastmod: 2024-03-20T21:26:44.904Z
---

<!-- wp:image {"linkDestination":"custom"} -->
<figure class="wp-block-image"><a href="http://tympanus.net/Tutorials/LoopScrolling/"><img src="https://i7x7p5b7.stackpathcdn.com/codrops/wp-content/uploads/2023/01/loopscroll-1.jpg" alt=""/></a></figure>
<!-- /wp:image -->

Бесконечная прокрутка - это техника веб-дизайна, которая позволяет пользователям прокручивать бесконечный список контента путем автоматической загрузки новых элементов по мере того, как пользователь достигает нижней части страницы. Вместо того чтобы переходить на новую страницу, чтобы увидеть больше контента, он автоматически загружается и добавляется в нижнюю часть страницы по мере того, как пользователь прокручивает страницу. Это может создать плавный и увлекательный просмотр для пользователей, поскольку они могут легко получить доступ к большому количеству контента, не дожидаясь загрузки новых страниц. Забудьте о том, чтобы дойти до нижнего колонтитула!

Петля прокрутки страницы - это процесс автоматического возврата пользователей в начало страницы, когда они достигают конца прокрутки. Это означает, что они смогут постоянно прокручивать один и тот же контент снова и снова, а не получать новый контент по мере прокрутки страницы вниз.

В этой статье мы покажем несколько примеров креативной циклической прокрутки, а затем переделаем этот эффект под бюро DAM. Мы будем использовать Lenis от Studio Freight для реализации эффекта зацикливания и GSAP для анимации.

<h2 class="wp-block-heading">Что такое циклическая прокрутка?</h2>

Когда объем контента ограничен, можно применить творческий подход, используя циклическую прокрутку, которая, по сути, является бесконечной прокруткой с повторяющимся контентом. Отличным примером такого творческого использования является эффект, наблюдаемый в Бюро DAM:

<!-- wp:video -->
<figure class="wp-block-video"><video controls src="https://i7x7p5b7.stackpathcdn.com/codrops/wp-content/uploads/2023/01/dam.mp4"></video></figure>
<!-- /wp:video -->

Несколько отличных идей о том, как зацикливание прокрутки можно использовать творчески и придать сайту дополнительную ценность:

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Это может создать у пользователей эффект погружения. Постоянно прокручивая один и тот же контент, пользователи могут почувствовать себя более погруженными в сайт и вовлеченными в его содержание. Это может быть особенно полезно для сайтов, которые хотят создать сильную эмоциональную связь со своей аудиторией.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Это может быть использовано для создания игры или интерактивного опыта. Добавляя интерактивные элементы к зацикленному контенту, разработчики могут создать игру или интерактивный опыт для пользователей. Например, веб-сайт может использовать зацикливание прокрутки для создания игры с прокруткой или для того, чтобы пользователи могли взаимодействовать с контентом новым способом.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Его можно использовать для создания эффекта "временной петли". Зацикливая прокрутку определенным образом, разработчики могут создать иллюзию "временной петли", когда контент повторяется в непрерывном цикле. Это может быть особенно эффективно для сайтов, которые хотят передать ощущение непрерывности или вневременности.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<h2 class="wp-block-heading">Простой пример</h2>

Давайте создадим простой пример. Мы создадим сетку из 6 изображений, которые будут повторяться при прокрутке. Как мы можем этого добиться? Все просто: нам нужно повторять контент таким образом, чтобы при достижении конца мы могли просто сбросить прокрутку к вершине, и никто этого не заметил! Ранее мы уже рассматривали эту концепцию в нашем CSS-эффекте ”шатра”. В другой демонстрации мы также показываем, как играть с этим видом бесконечной анимации.

Итак, для нашего первого примера у нас есть следующая разметка:

<!-- wp:code {"lineNumbers":true} -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript line-numbers">&lt;div class="grid"&gt;
	&lt;div class="grid__item" style="background-image:url(img/1.jpg);"&gt;&lt;/div&gt;
	&lt;div class="grid__item" style="background-image:url(img/4.jpg);"&gt;&lt;/div&gt;
	&lt;div class="grid__item" style="background-image:url(img/3.jpg);"&gt;&lt;/div&gt;
	&lt;div class="grid__item" style="background-image:url(img/5.jpg);"&gt;&lt;/div&gt;
	&lt;div class="grid__item" style="background-image:url(img/2.jpg);"&gt;&lt;/div&gt;
	&lt;div class="grid__item" style="background-image:url(img/6.jpg);"&gt;&lt;/div&gt;
&lt;/div&gt;</code></pre>
<!-- /wp:code -->

Наши стили создадут сетку 3×3:

<!-- wp:code {"lineNumbers":true} -->
<pre class="wp-block-code"><code lang="css" class="language-css line-numbers">.grid {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 5vh;
}

.grid__item {
	height: 47.5vh; /* 50vh minus half of the gap */
	background-size: cover;
	background-position: 50% 20%;
}

.grid__item:nth-child(3n-2) {
	border-radius: 0 2rem 2rem 0;
}

.grid__item:nth-child(3n) {
	border-radius: 2rem 0 0 2rem;
}

.grid__item:nth-child(3n-1) {
	border-radius: 2rem;
}</code></pre>
<!-- /wp:code -->

Lenis поставляется с удобной опцией, позволяющей сделать прокрутку бесконечной. В нашем скрипте мы обязательно повторим видимые элементы сетки (в данном случае это 6):

<!-- wp:code {"lineNumbers":true} -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript line-numbers">const lenis = new Lenis({
    smooth: true,
    infinite: true,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// repeat first six items by cloning them and appending them to the .grid
const repeatItems = (parentEl, total = 0) =&gt; {
    const items = [...parentEl.children];
    for (let i = 0; i &lt;= total-1; ++i) {
        var cln = items[i].cloneNode(true);
        parentEl.appendChild(cln);
    }
};
repeatItems(document.querySelector('.grid'), 6);</code></pre>
<!-- /wp:code -->

В результате получается сетка, которая повторяется при прокрутке:

<!-- wp:video -->
<figure class="wp-block-video"><video controls src="https://i7x7p5b7.stackpathcdn.com/codrops/wp-content/uploads/2023/01/looping1.mp4"></video></figure>
<!-- /wp:video -->

Мы также можем изменить направление прокрутки и пойти вбок!

<!-- wp:video -->
<figure class="wp-block-video"><video controls src="https://i7x7p5b7.stackpathcdn.com/codrops/wp-content/uploads/2023/01/loop_hor.mp4"></video></figure>
<!-- /wp:video -->

<h2 class="wp-block-heading">Игра с анимацией</h2>

Во время прокрутки мы можем добавить несколько причудливых анимаций к элементам сетки. В сочетании с переключением начала преобразования в нужное время мы можем получить что-то игривое, как здесь:

<!-- wp:video -->
<figure class="wp-block-video"><video controls src="https://i7x7p5b7.stackpathcdn.com/codrops/wp-content/uploads/2023/01/loop_scale.mp4"></video></figure>
<!-- /wp:video -->

Мы также можем поиграть со значениями масштаба и непрозрачности, чтобы создать что-то вроде эффекта исчезновения:

<!-- wp:video -->
<figure class="wp-block-video"><video controls src="https://i7x7p5b7.stackpathcdn.com/codrops/wp-content/uploads/2023/01/loop_scaleopac.mp4"></video></figure>
<!-- /wp:video -->

Или добавьте экстремальную растяжимость:

<!-- wp:video -->
<figure class="wp-block-video"><video controls src="Или добавьте экстремальную растяжимость:"></video></figure>
<!-- /wp:video -->

Мы также можем поиграть с 3D-анимацией и дополнительным эффектом фильтра:

<!-- wp:video -->
<figure class="wp-block-video"><video controls src="https://i7x7p5b7.stackpathcdn.com/codrops/wp-content/uploads/2023/01/loop_3d.mp4"></video></figure>
<!-- /wp:video -->

<h2 class="wp-block-heading">Пример Бюро DAM</h2>

Теперь давайте посмотрим, как мы можем переделать анимацию Bureau DAM. Поскольку здесь у нас нет сетки, все немного упрощается. Как и в этом случае, мы будем использовать SVG для типографского элемента, так как хотим растянуть его на весь экран:

<!-- wp:code {"lineNumbers":true} -->
<pre class="wp-block-code"><code lang="markup" class="language-markup line-numbers">&lt;div class="grid"&gt;
	&lt;div class="grid__item grid__item--stack"&gt;
		&lt;svg class="grid__item-logo" width="100%" height="100%" viewBox="0 0 503 277" preserveAspectRatio="none"&gt;
		&lt;path d="M56.3 232.3 56.3 193.8C56.3 177.4 54.7 174.1 48.5 165.9 35.4 148.8 17.6 133 8.5 120.8.7 110.3.1 103.7.1 85.6L.1 45.2C.1 14.9 13.5.5 41 .5 68.8.5 79.1 15.3 79.1 45.2L79.1 94.5 56.9 94.5 56.9 48.5C56.9 35 53.5 25.8 40.7 25.8 29.8 25.8 24.1 32.4 24.1 45.2L24.1 85.3C24.1 96.8 25.1 100.1 29.8 106.3 41 121.8 59.1 137.6 68.8 150.4 77.2 161.6 80 169.8 80 193.5L80 232.3C80 260.9 68.8 277 40.4 277 12.3 277 .1 261.5.1 232.3L.1 174.7 22.9 174.7 22.9 228.7C22.9 243.1 26.9 252.3 40.1 252.3 51.6 252.3 56.3 245.1 56.3 232.3ZM176.5 277 101.5 277 101.5.5 127.1.5 127.1 251.8 176.5 251.8 176.5 277ZM290 277 264.5 277 258.4 230.6 217.1 230.6 211 277 186.2 277 224.1.5 254.1.5 290 277ZM218.1 207.1 253.4 207.1C247.7 159.7 241.6 114 236.3 65.3 230.5 114 224.5 159.7 218.1 207.1ZM399.6 277 374 277 326.3 75.1C326.6 117.1 326.6 155.7 326.6 197.7L326.6 277 304.5 277 304.5.5 335 .5 377.4 203.1C377 165.1 377 129.2 377 91.2L377 .5 399.6.5 399.6 277ZM471.5 277 446.3 277 446.3 26.3 415.3 26.3 415.3.5 502.4.5 502.4 26.3 471.5 26.3 471.5 277Z" id="SLANT" fill="#fff"&gt;&lt;/path&gt;
		&lt;/svg&gt;
		&lt;p class="grid__item-text credits"&gt;An infinite scrolling demo based on &lt;a href="https://www.bureaudam.com/"&gt;Bureau DAM&lt;/a&gt;&lt;/p&gt;
	&lt;/div&gt;
	&lt;div class="grid__item"&gt;
		&lt;div class="grid__item-inner"&gt;
			&lt;div class="grid__item-img" style="background-image:url(img/1.jpg);"&gt;&lt;/div&gt;
			&lt;p class="grid__item-text"&gt;&lt;a href="#"&gt;View all projects →&lt;/a&gt;&lt;/p&gt;
		&lt;/div&gt;
	&lt;/div&gt;
&lt;/div&gt;</code></pre>
<!-- /wp:code -->

В нашем CSS мы зададим несколько стилей, которые обеспечат растягивание элементов на весь экран:

<!-- wp:code {"lineNumbers":true} -->
<pre class="wp-block-code"><code lang="css" class="language-css line-numbers">.grid {
    display: flex;
    flex-direction: column;
    gap: 5vh;
}

.grid__item {
    height: 100vh; 
	place-items: center;
    display: grid;
}

.grid__item-inner {
	display: grid;
	gap: 1rem;
	place-items: center;
	text-align: center;
}

.grid__item--stack {
	display: grid;
	gap: 2rem;
	grid-template-rows: 1fr auto;
}

.grid__item-logo {
	padding: 8rem 1rem 0;
}

.grid__item-img {
	background-size: cover;
    background-position: 50% 50%;
	height: 70vh;
	aspect-ratio: 1.5;
}

.grid__item-text {
	margin: 0;
}</code></pre>
<!-- /wp:code -->

Правильная настройка происхождения трансформации гарантирует, что мы получим нужный визуальный эффект:

<!-- wp:code {"lineNumbers":true} -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript line-numbers">gsap.registerPlugin(ScrollTrigger);

// repeat first three items by cloning them and appending them to the .grid
const repeatItems = (parentEl, total = 0) =&gt; {
    const items = [...parentEl.children];
    for (let i = 0; i &lt;= total-1; ++i) {
        var cln = items[i].cloneNode(true);
        parentEl.appendChild(cln);
    }
};

const lenis = new Lenis({
    smooth: true,
    infinite: true
});

lenis.on('scroll',()=&gt;{
    ScrollTrigger.update() // Thank you Clément!
})

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

imagesLoaded( document.querySelectorAll('.grid__item'), { background: true }, () =&gt; {

    document.body.classList.remove('loading');

    repeatItems(document.querySelector('.grid'), 1);

    const items = [...document.querySelectorAll('.grid__item')];

    // first item
    const firtsItem = items[0];
    gsap.set(firtsItem, {transformOrigin: '50% 100%'})
    gsap.to(firtsItem, {
        ease: 'none',
        startAt: {scaleY: 1},
        scaleY: 0,
        scrollTrigger: {
            trigger: firtsItem,
            start: 'center center',
            end: 'bottom top',
            scrub: true,
            fastScrollEnd: true,
            onLeave: () =&gt; {
                gsap.set(firtsItem, {scaleY: 1,})
            },
        }
    });

    // last item  
    const lastItem = items[2];
    gsap.set(lastItem, {transformOrigin: '50% 0%', scaleY: 0})
    gsap.to(lastItem, {
        ease: 'none',
        startAt: {scaleY: 0},
        scaleY: 1,
        scrollTrigger: {
            trigger: lastItem,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            fastScrollEnd: true,
            onLeaveBack: () =&gt; {
                gsap.set(lastItem, {scaleY: 1})
            }
        }
    });
    
    // in between
    let ft;
    let st;
    const middleItem = items[1];
        
    ft = gsap.timeline()
    .to(middleItem, {
        ease: 'none',
        onStart: () =&gt; {
            if (st) st.kill()
        },
        startAt: {scale: 0},
        scale: 1,
        scrollTrigger: {
            trigger: middleItem,
            start: 'top bottom',
            end: 'center center',
            scrub: true,
            onEnter: () =&gt; gsap.set(middleItem, {transformOrigin: '50% 0%'}),
            onEnterBack: () =&gt; gsap.set(middleItem, {transformOrigin: '50% 0%'}),
            onLeave: () =&gt; gsap.set(middleItem, {transformOrigin: '50% 100%'}),
            onLeaveBack: () =&gt; gsap.set(middleItem, {transformOrigin: '50% 100%'}),
        },
    });

    st = gsap.timeline()
    .to(middleItem, {
        ease: 'none',
        onStart: () =&gt; {
            if (ft) ft.kill()
        },
        startAt: {scale: 1},
        scale: 0,
        scrollTrigger: {
            trigger: middleItem,
            start: 'center center',
            end: 'bottom top',
            scrub: true,
            onEnter: () =&gt; gsap.set(middleItem, {transformOrigin: '50% 100%'}),
            onEnterBack: () =&gt; gsap.set(middleItem, {transformOrigin: '50% 100%'}),
            onLeave: () =&gt; gsap.set(middleItem, {transformOrigin: '50% 0%'}),
            onLeaveBack: () =&gt; gsap.set(middleItem, {transformOrigin: '50% 0%'}),
        },
    });
    
    requestAnimationFrame(raf);
    
    const refresh = () =&gt; {
        ScrollTrigger.clearScrollMemory();
        window.history.scrollRestoration = 'manual';
        ScrollTrigger.refresh(true);
    }

    refresh();
    window.addEventListener('resize', refresh);

});</code></pre>
<!-- /wp:code -->

В результате получается сминаемая и сжимаемая последовательность радости:

<!-- wp:image {"id":69501,"linkDestination":"custom"} -->
<figure class="wp-block-image"><img src="https://i7x7p5b7.stackpathcdn.com/codrops/wp-content/uploads/2023/01/loopingfinal.gif" alt="" class="wp-image-69501"/><figcaption class="wp-element-caption"><a href="https://tympanus.net/Tutorials/LoopScrolling" target="_blank" rel="noreferrer noopener nofollow">Check out the demo</a></figcaption></figure>
<!-- /wp:image -->
