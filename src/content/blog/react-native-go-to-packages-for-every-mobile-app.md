---
title: Пакеты React Native для каждого мобильного приложения
meta_title: Пакеты React Native для каждого мобильного приложения - Igor Gorlov
description: Некоторые модули npm буквально завладели моим сердцем
date: 2023-06-05T21:45:41.000Z
author: Igor Gorlov
image: ../../assets/images/undefined-Jun-06-2023.avif
categories:
  - Список
tags:
  - React Native
draft: false
lastmod: 2024-03-20T21:26:47.582Z
---

Некоторые модули npm буквально завладели моим сердцем

<!-- wp:rank-math/toc-block {"title":"Оглавление","headings":[{"key":"16336c53-87e6-49a4-b507-eb472abb8e04","content":"Под колпаком","level":2,"link":"#под-колпаком","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"1d3e0a38-48bb-484a-b4a2-4926b85e0cd2","content":"Иконки","level":2,"link":"#иконки","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"18e55db8-3845-4d73-be3d-81c4fd333126","content":"Expo","level":2,"link":"#expo","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"431a9c17-f8ab-4eca-a278-f0c0c9cbfd76","content":"Tailwind CSS Colors","level":2,"link":"#tailwind-css-colors","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"25a30748-22ec-42fc-99a0-daa7cd6c2b65","content":"React Native Paper или Elements","level":2,"link":"#react-native-paper-или-elements","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"fe478b3f-43b0-47b5-b5df-4f44305913a7","content":"React Navigation","level":2,"link":"#react-navigation","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"7b34d44b-450c-4f9c-b4f9-05bfa5b208bc","content":"React Native Raw Bottom Sheet","level":2,"link":"#react-native-raw-bottom-sheet","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"e6f908ca-66a4-4356-a325-b614678957e7","content":"Redux","level":2,"link":"#redux","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"a591b02d-5f32-4dc8-a2f8-24807fbf4412","content":"Чат GPT","level":2,"link":"#чат-gpt","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"99f1aa68-3bad-44e3-80fd-6bb1c83d07ef","content":"Заключение","level":2,"link":"#заключение","disable":false,"isUpdated":false,"isGeneratedLink":true}],"listStyle":"ul"} -->
<div class="wp-block-rank-math-toc-block" id="rank-math-toc"><h2>Оглавление</h2><nav><ul><li class=""><a href="#под-колпаком">Под колпаком</a></li><li class=""><a href="#иконки">Иконки</a></li><li class=""><a href="#expo">Expo</a></li><li class=""><a href="#tailwind-css-colors">Tailwind CSS Colors</a></li><li class=""><a href="#react-native-paper-или-elements">React Native Paper или Elements</a></li><li class=""><a href="#react-navigation">React Navigation</a></li><li class=""><a href="#react-native-raw-bottom-sheet">React Native Raw Bottom Sheet</a></li><li class=""><a href="#redux">Redux</a></li><li class=""><a href="#чат-gpt">Чат GPT</a></li><li class=""><a href="#заключение">Заключение</a></li></ul></nav></div>
<!-- /wp:rank-math/toc-block -->

<h2 class="wp-block-heading" id="под-колпаком">Под колпаком</h2>

Большинство моих последних историй связаны с react-native, потому что в настоящее время я работаю над ним более 8 часов в день.

Я создаю react-native web3 приложение для кошелька без опеки, по сути, мобильное приложение metamask или uniswap.

Теперь каждый раз, когда я создаю мобильное приложение, я предпочитаю некоторые модули в качестве готовых пакетов, и это вдохновило меня на эту идею.

<h2 class="wp-block-heading" id="иконки">Иконки</h2>

Модуль React Native vector icons npm можно пропустить, если у вас не будет собственных иконок, сделанных на заказ.

Конечно, вы можете использовать изображения из Flaticon и Google, но это занимает время, а для MVP я предпочитаю векторные иконки для быстрой разработки.

<h2 class="wp-block-heading" id="expo">Expo</h2>

Это спорный вопрос, я до сих пор не могу использовать Expo для какого-либо производственного приложения. Я сомневаюсь или, скажем так, не очень доверяю Expo для приложений высокого уровня.

Основная причина — поддержка сообщества, а Expo все еще новый, и его совместимость с множеством пакетов в будущем - это то, в чем я сомневаюсь больше всего.

Но все же, для быстрой и легкой разработки Expo будет моим любимым пакетом.

Я имею в виду, что я не хочу тратить время на установку проекта react-native и запуск его в эмуляторе — это глупая трата времени.

<h2 class="wp-block-heading" id="tailwind-css-colors">Tailwind CSS Colors</h2>

Я нашел эту любовь недавно, потому что я использую Tailwind во фронтенде или во всех моих фронтенд-проектах, поэтому автоматически, когда дело доходит до работы с цветами в react-native, я выбираю Tailwind CSS colors.

<h2 class="wp-block-heading" id="react-native-paper-или-elements">React Native Paper или Elements</h2>

React Native Elements - также хорошая попытка использовать то, что подходит для проекта.

<h2 class="wp-block-heading" id="react-navigation">React Navigation</h2>

Вы не можете жить без нее. Не совсем понятно, почему react-native не делает ее обязательной или не устанавливает в голый проект react-native.

Неважно, у вас будет более одного экрана, а для навигации у нас есть только одна библиотека.

<h2 class="wp-block-heading" id="react-native-raw-bottom-sheet">React Native Raw Bottom Sheet</h2>

Я уверен, что все мы любим эти нижние ящики, и ощущение от использования ящика - это классное чувство, так почему бы не добавить их в большинство проектов?

<h2 class="wp-block-heading" id="redux">Redux</h2>

Управление состояниями необходимо и обязательно, и снова у нас есть только хороший пакет для производственных приложений, которому можно доверять.

Redux играет эту роль, и я не добавляю ссылку, которую вы можете легко найти в Google.

<h2 class="wp-block-heading" id="чат-gpt">Чат GPT</h2>

Да, это мой новый модуль npm.

Если я хочу разработать вкладки, я спрашиваю код.

Если я хочу разработать пользовательский ящик или аватар или экран пользовательского интерфейса, он даст мне код.

Так почему бы и нет, прочитайте последнюю статью о том, как чат GPT может заменить небольшие модули npm?

Я также рассказал о том, как я использую Chat GPT для быстрой разработки и уменьшения размера приложения.

<h2 class="wp-block-heading" id="заключение">Заключение</h2>

Пакеты, которые я предпочитаю использовать почти в каждом проекте или мобильном приложении

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>React Native Vector Icons</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>React Native Raw Bottom Sheet</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>React Native Navigation</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Redux</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Chat GPT&nbsp;</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->
