---
title: >-
  На этой неделе в React #173: Million, Storybook, visionOS, Expo, Conform,
  Next.js, Remix, Astro, Apollo, useFormStatus...
meta_title: >-
  На этой неделе в React #173: Million, Storybook, visionOS, Expo, Conform,
  Next.js, Remix, Astro, Apollo, useFormStatus... | Игорь Горлов - Фронтeндер
description: >-
  Привет всем! На этой неделе у нас много отличных статей о React и несколько
  интересных релизов. Кажется, что React постоянно критикуют, но в целом
  аргументы в
date: 2024-02-09T00:00:00.000Z
categories:
  - Новости
author: Игорь Горлов
type: blog
draft: false
slug: >-
  na-toi-nedele-v-react-173-million-storybook-visionos-expo-conform-next-js-remix-astro-apollo-useformstatus
tags:
  - React
image: >-
  ../../assets/images/na-toi-nedele-v-react-173-million-storybook-visionos-expo-conform-next-js-remix-astro-apollo-useformstatus-Feb-09-2024.avif
lastmod: 2024-03-20T21:26:43.617Z
---

Привет всем!

На этой неделе у нас много отличных статей о React и несколько интересных релизов. Кажется, что React постоянно критикуют, но в целом аргументы всегда одни и те же, и многие из них кажутся немного устаревшими, и никогда не признают, что React делает лучше, чем другие решения.

Мир React Native захвачен официальным запуском Vision Pro!

На этой неделе мы попробуем кое-что новое, создав первый [твиттер-поток, посвященный React Native](https://twitter.com/bndkt/status/1755203992039424377). Дайте нам знать, нравится ли вам это.

На следующей неделе в рассылке будет перерыв. Мы вернемся 21 февраля 👋.

Я также хотел бы попросить вас о небольшом одолжении: не могли бы вы ответить на это письмо простым ”привет" или комментарием? Это поможет повысить эффективность доставки наших писем. Спасибо!

**[CMS с встроенным визуальным редактированием для Next.js с маршрутизацией приложений](https://reactbricks.com?utm_source=twir&utm_campaign=twir_2024&utm_medium=email)**.

[**Установите проект всего за 1 минуту**](https://reactbricks.com/sign-up?utm_source=twir&utm_campaign=twir_2024&utm_medium=email) с помощью CLI и определите свои собственные визуальные блоки как компоненты React, чтобы передать ваш пиксельно идеальный корпоративный бренд, используя любой CSS фреймворк. Попробуйте новый стартовый Next.js с серверными компонентами!

Редакторы контента могут легко использовать блоки контента для визуальной компоновки страниц, как в текстовом процессоре, без ущерба для дизайна.

React Bricks готов к корпоративному использованию: управление цифровыми активами, улучшенное SEO, совместная работа в реальном времени, публикация по расписанию, мультиязычность, интеграция с внешними API, рабочий процесс утверждения, несколько сред, история изменений и многое другое.

Доверяют такие корпоративные клиенты, как The Weather Channel, Deel.com, La Banque Postale, ведущие сайты электронной коммерции и более 9 000 пользователей по всему миру.

[**Начните работать сегодня!**](https://reactbricks.com/sign-up?utm_source=twir&utm_campaign=twir_2024&utm_medium=email)

---

## [](#react)⚛️ React

![million 3](../../assets/images/million.jpg)

**[Миллион 3.0](https://million.dev/blog/million-3)**.

Million - это оптимизирующий компилятор для React. Эта новая версия полностью переписана, в ней исправлены недочеты предыдущих версий, добавлены новые граничные случаи, оптимизирована система гидрации и улучшена стабильность.

Похоже, что Million планирует помочь нам отлаживать и поддерживать отличную веб-производительность в течение долгого времени. Согласно их 🐦 [стартовому трейлеру](https://twitter.com/aidenybai/status/1753456530652107072), Million linter находится в дорожной карте.

---

- 💸 [Product for Engineers - рассылка PostHog, помогающая инженерам развивать свои навыки работы с продуктами](https://newsletter.posthog.com/?utm_source=twir&utm_campaign=twir)
- 👀 [React Types PR - комментарии к JSDoc](https://github.com/DefinitelyTyped/DefinitelyTyped/pull/68409): Мэтт Покок работает над увеличением наших DX при использовании React с TypeScript.
- 📜 [Avoid using React’s `useFormStatus`](https://allanlasser.com/posts/2024-01-26-avoid-using-reacts-useformstatus): Интересная статья о недостатках этого нового хука React. Он требует использования под элементом `<form>`, в то время как размещение кнопки submit `<button>` вне формы является вполне корректным HTML. В качестве альтернативы предлагается использовать асинхронный переход.
- 📜 [Direction-aware animations in Framer Motion](https://sinja.io/blog/direction-aware-animations-in-framer-motion): Приятная интерактивная статья, показывающая, как анимировать представления списка/деталей и слайды карусели в правильном направлении для анимации входа/выхода.
- 📜 [Open Sourcing the Remix Website](https://remix.run/blog/oss-remix-dot-run): Команда Remix считает, что от открытого исходного кода их сайта больше преимуществ, чем недостатков. Теперь вы можете изучить, как реализована прокрутка домашней страницы, или как они используют SSR для страниц документации.
- 📜 [Dockerizing a Next.js Application with GitHub Actions](https://mxd.codes/articles/ci-cd-for-nextjs-with-github-actions): Собирает Dockerfile по умолчанию, предоставляемый Vercel, с соответствующими переменными env, и публикует его в реестре контейнеров.
- 📜 [Удаление React - это просто слабость, которая покидает вашу кодовую базу](https://begin.com/blog/posts/2024-01-26-removing-react-is-just-weakness-leaving-your-codebase): Интересная критика, с которой я не могу согласиться 😅 Как по мне, React не так часто меняется, существующий код не нужно переписывать, а CSS-in-JS, ну мы знаем, что runtime-based libs - это проблема на некоторое время… И даже React разработчики сегодня все больше и больше полагаются на веб-фундамент, чем когда-либо.
- 📜 [Такое ощущение, что в последнее время React получает небольшой пинок](https://piccalil.li/blog/react-is)-getting-a-bit-of-a-kicking-recently/): Более тонкий ответ на критику выше. React не идеален, но никуда не денется, а веб-платформа на данный момент не дает нам всех необходимых инструментов.
- 📜 [How to stream files from Next.js Route Handlers](https://www.ericburel.tech/blog/nextjs-stream-files): Показывает, как обслуживать динамические/генерируемые файлы, не загружая их в память. Вам может понадобиться преобразовать потоки Node.js в веб-потоки.
- 📜 [How to Detect Clicks Anywhere on a Page in React](https://spacejelly.dev/posts/how-to-detect-clicks-anywhere-on-a-page-in-react): TIL об API event.composedPath().
- 📜 [Как потоковая передача данных помогает создавать более быстрые веб-приложения](https://vercel.com/blog/how-streaming-helps-build-faster-web-applications)
- 📜 [Lessons Learned from Developing DevCycle’s Next.js SDK](https://blog.devcycle.com/feature-flagging-with-next-js-lessons-learned-from-developing-devcycles-sdk/): SDK должен был поддерживать компоненты сервер/клиент, потоковую передачу и Suspense.
- 📜 [Как генерировать отзывчивые изображения на Remix с помощью Unpic](https://unpic.pics/blog/responsive-images-on-remix/)
- 📜 [Улучшение масштабируемости React-приложений с помощью Storybook и Chromatic](https://dainemawer.com/articles/enhance-your-react-apps-scalability-using-storybook-and-chromatic)
- 📜 [История одного рефактора - платежная система](https://commerce.nearform.com/blog/2024/tale-of-a-refactor/)
- 📜 [Как мы увеличили поисковый трафик в 20 раз за 4 месяца с помощью Next.js App Router](https://hardcover.app/blog/next-js-app-router-seo)
- 📜 [Как я генерирую изображения Open Graph для своего блога на базе Astro](https://techsquidtv.com/blog/generating-open-graph-images-for-astro/)
- 📜 [Создание блога с помощью Next.js App Router и MDX](https://www.alexchantastic.com/building-a-blog-with-next-and-mdx)
- 📜 [React Intersection Observer - практическое руководство](https://www.builder.io/blog/react-intersection-observer)
- 📦 [Storybook 8 Beta - поддержка RSC, компилятор SWC, Vitest, значительные улучшения производительности и совместимости, визуальные тесты на лету…](https://storybook.js.org/blog/storybook-8-beta/)
- 📦 [Conform 1.0 - Библиотека валидации форм с прогрессивным улучшением, безопасная для типов, для Remix и Next.js](https://github.com/edmundhung/conform/releases/tag/v1.0.0)
- 📦 [Safe NextJS Navigation - безопасная для типов навигация для NextJS App Router](https://github.com/lukemorales/next-safe-navigation)
- 📦 [Astro 4.3 - i18n домены, управление выводом html, тип утилиты ComponentProps…](https://astro.build/blog/astro-430/)
- 📦 [Apollo Client 3.9 - Suspense data-fetching, предварительная загрузка запросов, оптимизация памяти, хук useQueryRefHandlers…](https://www.apollographql.com/blog/whats-new-in-apollo-client-3-9)
- 📦 [Remix 2.6.0 - поддержка Cloudflare для плагина Vite (нестабильно)](https://github.com/remix-run/remix/blob/main/CHANGELOG.md)
- 📦 [Sonner 1.4 - компонент Toast](https://github.com/emilkowalski/sonner/releases/tag/v1.4.0)
- 📦 [Ariakit 0.4 - улучшена поддержка CSS-анимаций и переходов](https://ariakit.org/changelog#040)
- 📦 [React-resizable-panels 2.0 - поддержка изменения размера нескольких панелей](https://github.com/bvaughn/react-resizable-panels/releases/tag/2.0.0)
- 🎥 [Lee Robinson - Next.js App Router Authentication (Sessions, Cookies, JWTs)](https://www.youtube.com/watch?v=DJvM2lSPn6w)
- 🎥 [Jack Herrington - Five Application Killing React Anti-Patterns](https://www.youtube.com/watch?v=ZkQPxP4wlE8)
- 🎙️ [Дэн Абрамов о React, RSC и будущем](https://podrocket.logrocket.com/dan-abramov-react-rscs-future)

## [](#reactnative)📱 React-Native

Этот раздел теперь написан в соавторстве с [Benedikt](https://twitter.com/bndkt), а также у нас появилась новая [React Native thread on Twitter](https://twitter.com/bndkt/status/1755203992039424377)! Пожалуйста, дайте нам знать, если вам это нравится, и поддержите нас лайком или ретвитом 😍.

**[Анонс React Native для Apple Vision Pro](https://www.callstack.com/blog/announcing-react-native-for-apple-vision-pro)**.

На прошлой неделе Apple выпустила свой Apple Vision Pro, и по крайней мере часть сообщества React Native с нетерпением ждет новой платформы, для которой они смогут создавать опыт с помощью своего любимого фреймворка. Существует два разных подхода (🐦 [сравнение бок о бок](https://twitter.com/o_kwasniewski/status/1754520654219493408)) к переносу React Native на visionPro:

- Подобно тому, как вы можете запустить приложение для iOS на macOS, вы можете установить флажок в App Store Connect и разрешить своему приложению работать на visionOS ”как есть", используя режим совместимости. Посмотрите, как 🐦 [Эван Бэкон подготовил, собрал и установил приложение Expo на visionPro менее чем за 10 минут] (https://twitter.com/Baconbrix/status/1753927218697208102). Приложения в режиме совместимости не используют возможности "пространственных вычислений" visionOS, они просто отображают экран iPad в комнате.
- Чтобы создать приложения, действительно оптимизированные для этого нового мира, необходимо адаптировать дополнительные встроенные возможности. Именно этим и занимается новая платформа visionOS, разработанная Оскаром Квасьневским и представленная нам компанией Callstack.

Пока еще все только начинается, но очень здорово видеть, как RN так быстро принимает новую платформу! Самое первое приложение React Native для visionOS [Spacial Noise] (https://apps.apple.com/us/app/spatial-noise/id6477335349) уже доступно в App Store.

---

- 💸 [Moropo - Mobile Testing Infrastructure That Integrates Seamlessly With Expo EAS](https://www.moropo.com?utm_source=newsletter&utm_medium=emails&utm_campaign=twir-20240207)
- 👀 [RFC - React Native Frameworks](https://github.com/react-native-community/discussions-and-proposals/pull/759): Вы когда-нибудь задумывались, где проходит граница между React Native, Expo и другими инструментами сообщества? Границы размыты, и этот RFC призван прояснить ситуацию, введя понятие “React Native Frameworks”.
- 👀 [Функции цвета CSS4](https://github.com/facebook/react-native/pull/42831) и [Цвет DisplayP3](https://github.com/facebook/react-native/pull/42830): В React Native появится больше цветовых опций (например, Wide Gamut).
- 🐦 [Компания Expo в своем новом блоге нахваливает Expo Web и Expo Router](https://twitter.com/Baconbrix/status/1755026874047123843)
- 🐦 [Shopify продолжает делать ставку на React Native](https://x.com/mustafa01ali/status/1753477532668600653?s=20)
- 📖 [Expo Docs - Build Expo apps for TV](https://x.com/expo/status/1754208200935518292?s=20): “React Native везде” становится все более правдивым с каждым днем. Благодаря плагинам Expo config, экспериментальная поддержка Apple TV и Android TV теперь доступна напрямую. Это супер захватывающее развитие, которое, я уверен, продолжится в macOS, visionOS, …
- 📖 [Улучшенная документация по Metro bundler с Expo](https://docs.expo.dev/guides/customizing-metro/): Объяснение того, как работают разбиение на пакеты, встряхивание деревьев и минификация, а также того, как Metro теперь используется и для веба.
- 📜 [Что должен знать каждый разработчик об использовании переменных окружения](https://expo.dev/blog/what-are-environment-variables): Правильная работа с переменными окружения в RN очень важна, так как в противном случае вы рискуете передать (и, следовательно, раскрыть) секреты клиенту.
- 📜 [Fingerprint your native runtime with @expo/fingerprint](https://expo.dev/blog/fingerprint-your-native-runtime): Определить, требует ли обновление JS-пакета приложения RN новой нативной сборки, - непростой вопрос. В SDK 50 Expo выпустила Fingerprint, который, по сути, создает одно хэш-значение, представляющее всю ”родную площадь" RN-приложения, и может быть использован для запуска новой нативной сборки.
- 📜 [6 причин использовать EAS Update](https://expo.dev/blog/6-reasons-to-use-eas-update): Знаете ли вы о функции повторной публикации? Я не знал, пока не прочитал эту статью. В случае неудачного обновления вы можете быстро опубликовать предыдущее (рабочее) обновление!
- 📜 [Как добавить новую цель в файл с помощью плагина Expo config?](https://www.reactnativecrossroads.com/posts/config-plugin-expo-add-target)
- 📦 [React Native Storybook 7 - CSF 3, TypeScript, Markdown, автоматическая загрузка истории, автогенерация элементов управления](https://storybook.js.org/blog/react-native-storybook-7/)
- 📦 [React Native Test App 3.1 - Поддержка безмостового режима](https://github.com/microsoft/react-native-test-app/releases/tag/3.1.0)
- 🎥 [William Candillon - JavaScript Animations in 2024](https://www.youtube.com/watch?v=AHh3Bt7JpRs): Следующая версия Reanimated будет поддерживать JavaScript-генераторы. Уильям переписывает 3 своих пользовательских примера анимации Reanimated в генераторы, используя выходы в цикле while (true).
- 🎥 [Simon Grimm - The Time for React Native is Now](https://www.youtube.com/watch?v=COH_XhlMyZ4)
- 🎙️ [RNR 287 - Специальный гость - Чарли Чивер](https://reactnativeradio.com/episodes/rnr-287-special-guest-charlie-cheever): Для меня всегда было ясно, чточто Expo задумывалась как слой поверх React Native. Но знаете ли вы, что Чарли Чивер и Джеймс Иде начали работать над Expo еще до появления React Native?
- 🎙️ [Rocket Ship 28 - Expo Router & Universal React Native Apps с Эваном Бэконом](https://share.transistor.fm/s/e9f2b98e)
- 🎙️ [The React Native Show 34 - Результаты опроса State of React Native 2023](https://www.callstack.com/podcasts/state-of-react-native-2023)

Увидимся! 👋
