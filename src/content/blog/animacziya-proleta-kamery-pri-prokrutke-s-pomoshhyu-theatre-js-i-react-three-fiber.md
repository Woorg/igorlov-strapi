---
title: Анимация пролета камеры при прокрутке с помощью Theatre.js и React Three Fiber
meta_title: >-
  Анимация пролета камеры при прокрутке с помощью Theatre.js и React Three Fiber
  - Igor Gorlov
description: >-
  В этом уроке мы покажем вам, как отобразить 3D-сцену на вашей веб-странице и
  провести камеру по ней, пока пользователь прокручивает страницу, всего за 50
  строк кода.
date: 2023-02-16T05:06:00.000Z
image: ../../assets/images/undefined-Feb-16-2023.avif
categories:
  - Учебник
author: Igor Gorlov
tags:
  - Webgl
  - Scroll
  - R3f
  - Theatre.js
draft: false
lastmod: 2024-03-20T21:26:48.616Z
---

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://i7x7p5b7.stackpathcdn.com/codrops/wp-content/uploads/2023/02/cameraflythrough-theatrejs.jpg" alt=""/></figure>
<!-- /wp:image -->

В этом уроке мы покажем вам, как отобразить 3D-сцену на вашей веб-странице и провести камеру по ней, пока пользователь прокручивает страницу, всего за 50 строк кода. Мы будем использовать Theatre.js, React Three Fiber, Drei (библиотека утилит React Three Fiber) и Vite в качестве нашего бандлера.

<!-- wp:rank-math/toc-block {"title":"Оглавление","headings":[{"key":"13a05215-43ad-4725-8c96-6d91af34702a","content":"Требования:","level":2,"link":"#требования","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"3e8b975a-56d4-43f8-8185-2fa96fda9c0f","content":"Создание анимации","level":2,"link":"#создание-анимации","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"5e9258e4-f5fe-4aab-8850-fe705ccba549","content":"Готовимся к производству","level":2,"link":"#готовимся-к-производству","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"0c9d174f-cce0-4b48-b07e-9e12497ab9ce","content":"Развертывание в производство","level":2,"link":"#развертывание-в-производство","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"f087eec8-1371-4a62-960d-bde56d45fc66","content":"Пользовательские камеры Three.js от Theatre","level":2,"link":"#пользовательские-камеры-three-js-от-theatre","disable":false,"isUpdated":false,"isGeneratedLink":true}],"listStyle":"ul"} -->
<div class="wp-block-rank-math-toc-block" id="rank-math-toc"><h2>Оглавление</h2><nav><ul><li class=""><a href="#требования">Требования:</a></li><li class=""><a href="#создание-анимации">Создание анимации</a></li><li class=""><a href="#готовимся-к-производству">Готовимся к производству</a></li><li class=""><a href="#развертывание-в-производство">Развертывание в производство</a></li><li class=""><a href="#пользовательские-камеры-three-js-от-theatre">Пользовательские камеры Three.js от Theatre</a></li></ul></nav></div>
<!-- /wp:rank-math/toc-block -->

<h2 class="wp-block-heading" id="требования">Требования:</h2>

Для начала создайте новый проект React с помощью Vite, выполнив команду

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">yarn create vite</code></pre>
<!-- /wp:code -->

и выбираем шаблон React.

Удалите все файлы из каталога /src, чтобы мы начали с чистого листа. Теперь мы можем приступить к реализации нашего приложения.

Давайте начнем с добавления всех зависимостей, которые мы будем использовать. Мы будем использовать 6 тесно связанных библиотек:

Three.js: библиотека JavaScript, используемая для создания и отображения анимированной трехмерной компьютерной графики в веб-браузере с помощью WebGL. Она включает функции для создания 3D-геометрии, управления камерой, освещения, отображения текстур, анимации и многого другого. Его можно использовать для создания интерактивных 3D-воздействий и игр, а также для создания 3D-визуализации данных.

React Three Fiber: рендерер React для Three.js, обеспечивающий интуитивно понятный декларативный подход к созданию 3D-сцен и компонентов. React Three Fiber упрощает работу с Three.js, позволяя разработчикам создавать трехмерный опыт, пользуясь при этом компонентно-ориентированной структурой и управлением состояниями React.

Drei: библиотека React Three Fiber, состоящая из полезных компонентов и крючков. Она включает компоненты для загрузки объектов и текстур Three.js, управления камерой, освещением, анимацией и многое другое. Она позволяет разработчикам быстро создавать трехмерные эффекты без необходимости вручную создавать и подключать компоненты Three.js.

Theatre.js: библиотека анимации с профессиональным набором инструментов для создания движений. Она поможет вам создать любую анимацию, от кинематографических сцен в THREE.js до восхитительных взаимодействий пользовательского интерфейса.&nbsp;@theatre/core - это основная библиотека анимации, @theatre/studio - это анимационная студия времени разработки, которую мы будем использовать для создания анимации Theatre.js, а @theatre/r3f - это расширение Theatre.js, обеспечивающее глубокую интеграцию с React Three Fiber.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash"># three.js, r3f, drei
yarn add three @react-three/fiber @react-three/drei

# theatre.js
yarn add @theatre/core @theatre/studio @theatre/r3f
</code></pre>
<!-- /wp:code -->

Затем загрузите файл environment.glb и поместите его в папку /public. Этот файл содержит 3D-сцену, через которую мы будем пролетать с камерой. Конечно, вы можете использовать любой другой GLTF-файл для вашей сцены.

Соединяем все части

Установив все зависимости, создайте 3 файла в папке /src

main.jsx - Высокоуровневый код настройки для React и Theatre.js

App.jsx - код нашего приложения

main.css - Немного CSS для правильного позиционирования нашего холста.

main.jsx будет выглядеть очень похоже на то, что Vite создает по умолчанию:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">import studio from "@theatre/studio";
import extension from "@theatre/r3f/dist/extension";
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./main.css";

studio.extend(extension);
studio.initialize();

ReactDOM.createRoot(document.getElementById("root")).render(
  &lt;React.StrictMode&gt;
    &lt;Suspense fallback={null}&gt;
      &lt;App /&gt;
    &lt;/Suspense&gt;
  &lt;/React.StrictMode&gt;
);
</code></pre>
<!-- /wp:code -->

Единственные 2 отличия

Мы настраиваем React Suspense в строке 13, чтобы мы могли загружать наши 3D-модели.

Мы настраиваем Theatre.js Studio в строках 8-9, сначала расширив его расширением r3f, а затем вызвав initialize().

Мы собираемся использовать main.css для заполнения экрана холстом, который мы создадим в следующем шаге с помощью React Three Fiber:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="css" class="language-css">html,
body,
#root {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

body {
  display: flex;
  align-items: center;
  align-content: center;
}
</code></pre>
<!-- /wp:code -->

Далее, давайте заполним App.jsx кодом нашего приложения:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">import { Canvas, useFrame } from "@react-three/fiber";
import { Gltf, ScrollControls, useScroll } from "@react-three/drei";
import { getProject, val } from "@theatre/core";

import {
  SheetProvider,
  PerspectiveCamera,
  useCurrentSheet,
} from "@theatre/r3f";

export default function App() {
  const sheet = getProject("Fly Through").sheet("Scene");

  return (
    &lt;Canvas gl={{ preserveDrawingBuffer: true }}&gt;
      &lt;ScrollControls pages={5}&gt;
        &lt;SheetProvider sheet={sheet}&gt;
          &lt;Scene /&gt;
        &lt;/SheetProvider&gt;
      &lt;/ScrollControls&gt;
    &lt;/Canvas&gt;
  );
}

function Scene() {
  const sheet = useCurrentSheet();
  const scroll = useScroll();

  // our callback will run on every animation frame
  useFrame(() =&gt; {
    // the length of our sequence
    const sequenceLength = val(sheet.sequence.pointer.length);
    // update the "position" of the playhead in the sequence, as a fraction of its whole length
    sheet.sequence.position = scroll.offset * sequenceLength;
  });

  const bgColor = "#84a4f4";

  return (
    &lt;&gt;
      &lt;color attach="background" args={[bgColor]} /&gt;
      &lt;fog attach="fog" color={bgColor} near={-4} far={10} /&gt;
      &lt;ambientLight intensity={0.5} /&gt;
      &lt;directionalLight position={[-5, 5, -5]} intensity={1.5} /&gt;
      &lt;Gltf src="/environment.glb" castShadow receiveShadow /&gt;
      &lt;PerspectiveCamera
        theatreKey="Camera"
        makeDefault
        position={[0, 0, 0]}
        fov={90}
        near={0.1}
        far={70}
      /&gt;
    &lt;/&gt;
  );
}
</code></pre>
<!-- /wp:code -->

Давайте разберемся, что здесь происходит.

В компоненте App (строки 11-23) мы устанавливаем все зависимости для нашего компонента Scene:

getProject(“Fly Through”).sheet(“Scene”) извлекает наш лист анимации. Листы - это контейнеры для анимируемых объектов. Мы собираемся сделать этот лист доступным для расширения Theatre.js r3f через SheetProvider, который будет автоматически использовать его, поэтому нам не нужно беспокоиться о его специфике.

Компонент Canvas из r3f создает элемент WebGL canvas, который растягивается до своего родительского элемента (элемента body, размер которого мы определили в предыдущем шаге, чтобы заполнить весь экран), и устанавливает цикл рендеринга. Позже мы подключимся к этому циклу рендеринга с помощью крючка useFrame.

Компонент ScrollControls из Drei устанавливает невидимый контейнер прокрутки, который мы будем использовать для привязки позиции прокрутки к воспроизведению анимации без фактической прокрутки видимого элемента HTML.

В компоненте Scene (строки 25-56):

Мы используем useCurrentSheet(), useScroll() и useFrame() для обновления позиции анимации с актуальной позицией прокрутки на каждом кадре.

Мы создаем сцену Three.js:

Мы создаем атмосферу, похожую на небо, используя объекты цвета и тумана (строки 41-42).

Мы создаем несколько огней (строки 43-44).

Мы отображаем нашу модель GLTF, которую мы ранее поместили в общую папку (строка 45).

Мы создаем нашу камеру с помощью PerspectiveCamera, которую мы будем анимировать с помощью Theatre.js. Этот компонент импортирован из библиотеки @theatre/r3f, благодаря чему Theatre.js Studio автоматически подхватывает его без каких-либо настроек. Хотя мы задаем здесь некоторые параметры по умолчанию, все они могут быть изменены или анимированы в пользовательском интерфейсе Studio.

Если все правильно, то после выполнения всех этих шагов вы должны увидеть следующее при запуске yarn dev:

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.craft.do/user/full/19b7adfa-234e-603e-dc22-061aa5a2817b/doc/1B44EC76-B04F-4755-A241-A6E2DDF668EB/7048CE9B-B2ED-4C6E-9A6A-776783C642BC_2/4GuzfUcC3cw51g0OWFu2ni1xlpTztnLYO1CJxai0mXIz/Vite%20%20React%20%20TS%202023-02-13T16.53.532x.png" alt="Vite + React + TS 2023-02-13T16.53.53@2x.png"/></figure>
<!-- /wp:image -->

Не так много, чтобы смотреть на это, но мы скоро это изменим.

<h2 class="wp-block-heading" id="создание-анимации">Создание анимации</h2>

Откройте редактор моментальных снимков, нажав на кнопку моментального снимка на панели инструментов:

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.craft.do/user/full/19b7adfa-234e-603e-dc22-061aa5a2817b/doc/1B44EC76-B04F-4755-A241-A6E2DDF668EB/1FF91453-2B89-4559-B78E-59C4E9A1AF1A_2/Y5H6Jcz4xQmKaEt0bQqDBVhqhxe3J5sUiSn80Y8imAMz/Vite%20%20React%20%20TS%202023-02-13T16.54.122x.png" alt="Vite + React + TS 2023-02-13T16.54.12@2x.png"/></figure>
<!-- /wp:image -->

При открытом редакторе снимков выберите объект Камера и переместите его в начало сцены.

Выбрав камеру, щелкните правой кнопкой мыши на свойстве position на панели справа и выберите Sequence all.

<!-- wp:image {"id":70470} -->
<figure class="wp-block-image"><img src="https://i7x7p5b7.stackpathcdn.com/codrops/wp-content/uploads/2023/02/Vite-React-TS-2023-02-13T16.59.022x.png" alt="" class="wp-image-70470"/></figure>
<!-- /wp:image -->

Появится редактор последовательности:

<!-- wp:image {"id":70471} -->
<figure class="wp-block-image"><img src="https://i7x7p5b7.stackpathcdn.com/codrops/wp-content/uploads/2023/02/Vite-React-TS-2023-02-13T18.25.492x.jpg" alt="" class="wp-image-70471"/></figure>
<!-- /wp:image -->

Поместите первый ключевой кадр, нажав на значок ключевого кадра рядом со свойством position на панели деталей:

<!-- wp:image {"id":70473} -->
<figure class="wp-block-image"><img src="https://i7x7p5b7.stackpathcdn.com/codrops/wp-content/uploads/2023/02/Vite-React-TS-2023-02-13T18.26.162x-800x400.png" alt="" class="wp-image-70473"/></figure>
<!-- /wp:image -->

Затем прокрутите немного вниз. Обратите внимание, что индикатор головки воспроизведения переместился вперед в редакторе последовательности:

Обратите внимание, обычно вы можете перетаскивать головку воспроизведения по временной шкале, однако в данном случае, поскольку мы привязали положение головки воспроизведения к положению прокрутки, это невозможно. Вы можете временно восстановить эту функциональность, закомментировав хук useFrame в строках 30-33 в App.jsx.

Теперь немного подвигайте камеру в редакторе моментальных снимков. Обратите внимание, что для вас был создан новый набор ключевых кадров. Если теперь вы попытаетесь прокрутить кадр вверх и вниз, камера будет двигаться вместе с ним.

Повторив эти действия, попробуйте переместить камеру в другой конец сцены. Аналогичным образом можно создать ключевые кадры для вращения камеры, чтобы заставить ее оглядеться вокруг.

Когда вы закончите, вы можете заметить, что движение камеры немного дрожит. Это происходит потому, что стандартное смягчение по умолчанию смягчает движение между каждым ключевым кадром. Чтобы получить плавное движение по всему пути камеры, нужно установить линейную интерполяцию. Для этого выделите все ключевые кадры положения, удерживая Shift, и перетащите поле выделения на ключевые кадры. Когда все они будут выделены, щелкните на любой из соединительных линий и выберите линейный вариант.

Чтобы проверить, как выглядит наша страница без Студии, вы можете нажать Alt/Option + \, чтобы скрыть ее. Также вы можете закомментировать studio.initialize().

После завершения анимации ваша готовая сцена может выглядеть примерно так, когда вы начнете прокрутку:

<h2 class="wp-block-heading" id="готовимся-к-производству">Готовимся к производству</h2>

Пока что все созданные вами ключевые кадры сохраняются в localStorage браузера, так что ваша анимация будет запоминаться между обновлениями страницы.

Чтобы распространить анимацию как часть вашего сайта, экспортируйте проект Theatre.js, нажав на “Fly Through” в контурном меню в верхней левой части пользовательского интерфейса, а затем нажмите кнопку “Export Fly Through to JSON” справа.

В результате будет загружен файл JSON. Мы можем переместить этот файл в наш каталог src и импортировать его.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">import flyThrougState from "./state.json"
</code></pre>
<!-- /wp:code -->

Чтобы использовать его, достаточно заменить следующую строку (строка 12):

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">const sheet = getProject("Fly Through").sheet("Scene");
</code></pre>
<!-- /wp:code -->

Со следующими:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">const sheet = getProject("Fly Through", {state: flyThroughState}).sheet("Scene");
</code></pre>
<!-- /wp:code -->

Теперь мы передаем сохраненное состояние анимации в getProject. Благодаря этому проект Theatre.js будет инициализирован с сохраненной анимацией из state.json, а не с анимацией, сохраненной в localStorage. Не волнуйтесь, все изменения, внесенные в анимацию в Studio, будут сохранены в localStorage после того, как вы это сделаете (ваши правки сохранятся после обновления страницы).

<h2 class="wp-block-heading" id="развертывание-в-производство">Развертывание в производство</h2>

Когда мы закончили и готовы развернуть нашу веб-страницу на производстве, нам нужно сделать только две вещи.

Убедитесь, что у нас есть последнее состояние проекта, экспортированное в JSON-файл и переданное в getProject.

Удалить studio.initialize и studio.extend (строки 8-9 в main.jsx).

Советы для дальнейшего изучения

Утилита редактирования

Импортируйте экспорт editable из @theatre/r3f.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">import { editable as e } from "@theatre/r3f"
</code></pre>
<!-- /wp:code -->

После этого, если вы хотите сделать другие объекты threejs редактируемыми в редакторе снапшотов, например, свет или туман, просто добавьте к ним префикс e., и добавьте реквизит theatreKey=”ваше имя здесь":

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">&lt;color attach="background" args={[bgColor]} /&gt;
&lt;e.fog theatreKey="Fog" attach="fog" color={bgColor} near={-4} far={10} /&gt;
&lt;ambientLight intensity={0.5} /&gt;
&lt;e.directionalLight theatreKey="Sun" position={[-5, 5, -5]} intensity={1.5} /&gt;
&lt;Gltf src="/environment.glb" castShadow receiveShadow /&gt;
&lt;PerspectiveCamera
  theatreKey="Camera"
  makeDefault
  position={[0, 0, 0]}
  fov={90}
  near={0.1}
  far={70}
/&gt;
</code></pre>
<!-- /wp:code -->

После этого вы можете свободно регулировать или даже анимировать их свойства в редакторе, как мы это делали с камерой.

<h2 class="wp-block-heading" id="пользовательские-камеры-three-js-от-theatre">Пользовательские камеры Three.js от Theatre</h2>

PerspectiveCamera и OrthogramphicCamera от @theatre/r3f имеют идентичный API, что и камеры, экспортируемые @react-three/drei, с одной дополнительной фишкой: вы можете передать Vector3 или любой объект Three.js ref в свойство lookAt, чтобы камера сфокусировалась на нем. Это можно использовать для упрощения работы с камерой, например, так:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">&lt;PerspectiveCamera
  lookAt={cameraTargetRef}
  theatreKey="Camera"
  makeDefault
/&gt;
&lt;e.mesh theatreKey="Camera Target" visible="editor" ref={cameraTargetRef}&gt;
  &lt;octahedronBufferGeometry args={[0.1, 0]} /&gt;
  &lt;meshPhongMaterial color="yellow" /&gt;
&lt;/e.mesh&gt;
</code></pre>
<!-- /wp:code -->
