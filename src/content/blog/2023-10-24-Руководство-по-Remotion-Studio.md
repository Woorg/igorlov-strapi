---
title: Руководство по Remotion Studio
meta_title: Руководство По Remotion Studio - Фул Фронт Дев
description: >-
  Монтаж видео может быть сложным, особенно если вы хотите добавить такие вещи,
  как анимации или наложение. Remotion упрощает процесс создания видеороликов
  и...
date: 2023-10-24T01:12:37.289Z
image: ../../assets/images/rukovodstvo-po-remotion-studio-Oct-24-2023.avif
categories:
  - Как закодить
author: Igor Gorlov
tags:
  - JavaScript
  - Remotion
draft: false
keywords: ''
type: blog
slug: rukovodstvo-po-remotion-studio
lastmod: 2024-03-20T21:26:47.354Z
---

Монтаж видео может быть сложным, особенно если вы хотите добавить такие вещи, как анимации или наложение. Remotion упрощает процесс создания видеороликов и добавления эффектов, позволяя вам делать это программно. Remotion предоставляет фреймворк с использованием React, который позволяет вам создавать видеоролики, включая такие элементы, как заголовки, звук, наложенные компоненты и многое другое.

С выпуском Remotion 4.0 использование Remotion стало еще проще благодаря Remotion Studio. Версия 4.0 внесла несколько улучшений в Remotion, включая встроенный FFmpeg для создания видеороликов прямо с вашего локального хоста и свойства композиции с схемой Zod.

В этой статье я расскажу, как использовать Remotion Studio и приведу несколько примеров того, что можно сделать. Если вы хотите следовать вместе, пожалуйста, ознакомьтесь с моим образцовым проектом на GitHub.

## Начало работы с Remotion

Прежде чем мы погрузимся в детали Remotion Studio, полезно понять некоторые основы Remotion.

Если вы хотите создать проект с Remotion, достаточно просто открыть терминал и выполнить команду <code>npm init video</code>. После этого вас попросят выбрать один из шаблонов Remotion для начала работы:

<!-- wp:image {"align":"center","id":178510} -->
<figure class="wp-block-image aligncenter"><img src="https://blog.logrocket.com/wp-content/uploads/2023/09/select-remotion-template.png?is-pending-load=1" alt="Выберите шаблон Remotion" class="wp-image-178510"/></figure>
<!-- /wp:image -->

После создания проекта он будет иметь структуру, аналогичную проекту React:

<!-- wp:image {"align":"center","id":178511} -->
<figure class="wp-block-image aligncenter"><img src="https://blog.logrocket.com/wp-content/uploads/2023/09/remotion-structure.png?is-pending-load=1" alt="Структура проекта Remotion" class="wp-image-178511"/></figure>
<!-- /wp:image -->

В папке <code>src</code> хранятся ваши компоненты, а в папке <code>public</code> можно сохранять ресурсы, такие как изображения или даже видеофайлы для вставки в ваш проект. В папке <code>src</code> также есть файл <code>index.ts</code>, который будет вашей точкой входа.

Файл <code>root</code> будет содержать вашу первую <code>Composition</code>, которая представляет собой совокупный набор изображений или видео, которые будет создавать Remotion. Обратите внимание на свойство <code>component</code>, которое будет компонентом React, который вы напишете и передадите:

<!-- wp:image {"align":"center","id":178512} -->
<figure class="wp-block-image aligncenter"><img src="https://blog.logrocket.com/wp-content/uploads/2023/09/root-file-component-prop.png?is-pending-load=1" alt="Файл root с нашим свойством компонента" class="wp-image-178512"/></figure>
<!-- /wp:image -->

Вы будете использовать элементы <code>AbsoluteFill</code> в компоненте React, который вы напишете, которые фактически представляют собой <code>div</code> для отображения Remotion; в Remotion есть несколько встроенных элементов, таких как <code>sequence</code>, <code>series</code> и другие:

<!-- wp:image {"align":"center","id":178513} -->
<figure class="wp-block-image aligncenter"><img src="https://blog.logrocket.com/wp-content/uploads/2023/09/absolutefill-sequence-series-elements.png?is-pending-load=1" alt="AbsoluteFill с элементами sequence и series" class="wp-image-178513"/></figure>
<!-- /wp:image -->

Чтобы создать композицию, вы фактически заполняете свой пользовательский компонент React и можете генерировать такие вещи, как анимации, которые вы можете запустить, просто выполнив команду <code>npm run start</code> в терминале в корне проекта, чтобы открыть Remotion Studio:

<!-- wp:image {"align":"center","id":178514} -->
<figure class="wp-block-image aligncenter"><img src="https://blog.logrocket.com/wp-content/uploads/2023/09/create-composition-react-component.png?is-pending-load=1" alt="Создайте композицию, заполнив свой компонент React" class="wp-image-178514"/></figure>
<!-- /wp:image -->

Сразу же вы заметите созданные вами композиции в файле root слева. Справа вы также заметите свойства, которые вы создали с помощью Zod. Если вы измените свойства справа, вы сможете видеть изменения в реальном времени.

Наконец, когда вы будете готовы создать видеоролик из вашего проекта, вы сможете нажать вкладку Renders справа, чтобы создать файл MP4. Все это встроено в Remotion и будет выводить файл без необходимости устанавливать FFmpeg или какой-либо другой инструмент напрямую.

Смотрите вывод в вашем терминале ниже:

<!-- wp:image {"align":"center","id":178515} -->
<figure class="wp-block-image aligncenter"><img src="https://blog.logrocket.com/wp-content/uploads/2023/09/terminal-output-render.png?is-pending-load=1" alt="Терминальный вывод нашего рендера" class="wp-image-178515"/></figure>
<!-- /wp:image -->

Обратите внимание, что ниже показан дополнительный всплывающий диалог, который позволяет выбрать параметры вашего выходного файла:

<!-- wp:image {"align":"center","id":178516} -->
<figure class="wp-block-image aligncenter"><img src="https://blog.logrocket.com/wp-content/uploads/2023/09/select-output-file.png?is-pending-load=1" alt="Выберите параметры выходного файла" class="wp-image-178516"/></figure>
<!-- /wp:image -->

## Создание свойств композиции с помощью Zod

Свойства композиции могут быть мощными, потому что вы можете непосредственно редактировать их локально и генерировать предварительный просмотр вашего контента в реальном времени. В образцовом проекте, на который я ссылался во введении, я создал четыре композиции:

- <code>HelloWorld</code> (скопирован из стартового проекта, отображает текст и изображение)
- <code>OnlyLogo</code> (скопирован из стартового проекта, с изображением логотипа React, цвет которого можно изменить)- <code>StaticValues</code> (демонстрирует свойства Zod, которые вы можете добавить к своим композициям)
- <code>HarveyPicture</code> (показывает, как вставлять изображение ресурса и динамически изменять его с помощью Zod)

Композиции Zod работают сначала путем определения схемы. В композиции <code>StaticValues</code> у меня есть соответствующий компонент <code>StaticValues</code>. Если вы откроете файл <code>src/compositions/StaticValues.tsx</code>, вы увидите, что я сначала определяю схему Zod в верхней части файла:

```javascript
export const staticValueSchema = z.object({
	fontColor: zColor(),
	numberValue: z.number(),
	arrayValue: z.array(z.string()),
	enumValue: z.enum(['1.jpg', '2.jpg', '3.jpg', '4.jpg']),
	dateValue: z.date(),
});
```

Затем вы заметите, что я ссылкаюсь на эту схему в определении моего компонента и присваиваю алиасы значениям свойств, таким как <code>prop1</code>, <code>prop2</code> и так далее:

```javascript
export const StaticValues: React.FC<z.infer<typeof staticValueSchema>> = ({
  fontColor: prop1,
  numberValue: prop2,
  arrayValue: prop3,
  enumValue: prop4,
  dateValue: prop5,
}) => {
  const frame = useCurrentFrame();
  const opacity = Math.min(1, frame / 60);
  return (
    <AbsoluteFill
      style={{
```

В самой функции рендера компонента у меня есть базовое оформление и отображение свойств:

```javascript
return (
	<AbsoluteFill
		style={{
			display: 'flex',
			flexWrap: 'wrap',
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: 'white',
			fontSize: 80,
			color: prop1,
		}}
	>
		<div style={{ opacity: opacity, padding: '20px', border: 'solid' }}>Hello World!</div>
		<div style={{ opacity: opacity, padding: '20px', border: 'solid' }}>Prop Number: {prop2}</div>
		<div style={{ opacity: opacity, padding: '20px', border: 'solid' }}>
			array: {prop3 && prop3.map((value) => <div>{value}</div>)}
		</div>
		<div style={{ opacity: opacity, padding: '20px', border: 'solid' }}>enumValue: {prop4}</div>
		<div style={{ opacity: opacity, padding: '20px', border: 'solid' }}>
			dateValue: {prop5.toLocaleDateString()}
		</div>
	</AbsoluteFill>
);
```

Я связываю это обратно с файлом root в проекте и передаю значения по умолчанию для свойств:

```javascript
     <Composition
        id="StaticValues"
        component={StaticValues}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={staticValueSchema}
        defaultProps={{
          fontColor: '#0c0d0d',
          numberValue: 4,
          arrayValue: ['one', 'two', 'three'],
          enumValue: '4.jpg' as const,
          dateValue: new Date('2023-09-15T18:09:01.793Z'),
        }}
      />
```

Запустив локальный сервер, я теперь могу устанавливать эти значения и наблюдать их изменение в реальном времени:

<!-- wp:image {"align":"center","id":178517} -->
<figure class="wp-block-image aligncenter"><img src="https://blog.logrocket.com/wp-content/uploads/2023/09/set-values-real-time-changes.png?is-pending-load=1" alt="Установите значения в интерфейсе и увидьте изменения в реальном времени" class="wp-image-178517"/></figure>
<!-- /wp:image -->

Это довольно мощно, так как вы можете указать все, начиная от обычных строк до фактических перечислений. Это делает процесс создания видеороликов очень интуитивным.

## Динамическое изменение фоновых изображений

Созданный мной выше компонент <code>StaticValues</code> показывает, как можно использовать схему Zod для создания свойств и редактировать их на лету. Более реалистичным примером было бы иметь фоновое изображение, которое можно было бы динамически изменять.

В композиции <code>HarveyPicture</code> у меня фактически есть заголовок и фоновое изображение моей собаки Харви. Если вы запустите ваш локальный сервер, вы увидите видеоролик с заголовком и краткой анимацией вращения изображения:

<!-- wp:image {"align":"center","id":178518} -->
<figure class="wp-block-image aligncenter"><img src="https://blog.logrocket.com/wp-content/uploads/2023/09/harvey-picture-composition.png?is-pending-load=1" alt="Наша композиция HarveyPicture" class="wp-image-178518"/></figure>
<!-- /wp:image -->

Свойство <code>imageName</code> фактически является перечислением! Я определил эту схему в файле <code>src/compositions/HarveyPicture.tsx</code> следующим образом:

```javascript
export const harveyPictureSchema = z.object({
	titleText: z.string(),
	titleColor: zColor(),
	imageName: z.enum(['1.jpg', '2.jpg', '3.jpg', '4.jpg']),
});
```

Файлы изображений находятся в папке <code>public</code> вашего проекта:

<!-- wp:image {"align":"center","id":178519} -->
<figure class="wp-block-image aligncenter"><img src="https://blog.logrocket.com/wp-content/uploads/2023/09/public-image-files.png?is-pending-load=1" alt="Изображения находятся в папке public" class="wp-image-178519"/></figure>
<!-- /wp:image -->

Теперь я могу динамически изменить это фоновое изображение для создаваемого мной видеоролика. Этот пример очень прост, но с немного большим кодом вы могли бы создать набор из таких элементов или хотя бы изменить фон на любую последовательность анимаций, которую вы хотите.

## Рендеринг FFmpeg

Как я упоминал во введении, Remotion 4.0 включает в себя FFmpeg в составе. Это очень мощно, поскольку теперь вы можете создавать видеофайлы напрямую из вашего локального проекта. В предыдущих версиях Remotion вам приходилось использовать выходные ресурсы и отдельно устанавливать FFmpeg для создания видеофайла. В последней версии студия позволяет вам создавать видео напрямую.

Вернемся к моему примеру с Харви. Если я нажму&nbsp;<strong>Рендер видео</strong>, мне покажется всплывающее окно, в котором будут присутствовать свойства, которые я определил, а также несколько других параметров, которые я могу настроить для своего видео:

<!-- wp:image {"align":"center","id":178520} -->
<figure class="wp-block-image aligncenter"><img src="https://blog.logrocket.com/wp-content/uploads/2023/09/render-video-button.png" alt="Новая кнопка Рендер видео в Remotion Studio" class="wp-image-178520"/></figure>
<!-- /wp:image -->

После того как я сделаю свой выбор, нажатие на&nbsp;<strong>Рендер видео</strong>&nbsp;запустит процесс создания видео, и я смогу следить за его выполнением в моем локальном терминале:

<!-- wp:image {"align":"center","id":178521} -->
<figure class="wp-block-image aligncenter"><img src="https://blog.logrocket.com/wp-content/uploads/2023/09/terminal-view-render-progress.png" alt="Вид на терминал с отображением процесса рендеринга" class="wp-image-178521"/></figure>
<!-- /wp:image -->

## Подведение итогов

С этим вы можете создавать видеоролики, включая анимации и наложение, с использованием Remotion Studio и библиотеки React. Это делает создание видеороликов гораздо более доступным и понятным, чем ручное монтажное редактирование. Надеюсь, эта статья была полезной, и вы попробуете создать свои видеоролики с использованием Remotion Studio.
