---
title: >-
  Ошибка деплоймента Netlify: 'Treating warnings as errors because
  process.env.CI=true'
meta_title: >-
  Ошибка деплоймента Netlify: 'Treating warnings as errors because
  process.env.CI=true' - Igor Gorlov
description: >-
  Netlify - это облачная платформа, на которой разработчики программного
  обеспечения могут легко размещать свои веб-сайты и веб-приложения, и они
  мгновенно...
date: 2023-02-17T05:52:00.000Z
image: ../../assets/images/undefined-Feb-17-2023.avif
categories:
  - Как закодить
author: Igor Gorlov
tags:
  - Javascript
  - React
  - Netlify
draft: false
lastmod: 2024-03-20T21:26:42.467Z
---

Netlify - это облачная платформа, на которой разработчики программного обеспечения могут легко размещать свои веб-сайты и веб-приложения, и они мгновенно развертываются.

В этой статье я расскажу, как исправить ошибку Treating warnings as errors because process.env.CI=true, с которой столкнулся при попытке развернуть приложение React.

<h2 class="wp-block-heading">Проблема:</h2>

Я пытался развернуть приложение, созданное с помощью react, и выбрал Netlify в качестве платформы, на которой оно должно было быть размещено. Я выбрал опцию Import an existing project from a Git repository. Netlify отображает терминал журнала развертывания, когда приложение развертывается, и в этом разделе можно увидеть сообщения о ходе развертывания проекта. После развертывания приложения эти сообщения об ошибках были отображены в качестве отчета о ходе развертывания.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--a1MG4SSf--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/c2q41kmrqbkv68lgnmh3.png" alt="изображение журнала развертывания из netlify с сообщением об ошибке Treating warnings as errors because process.env.CI=true"/></figure>
<!-- /wp:image -->

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--zyobMqF6--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/4whn4o10bjzu9a6rd1rb.png" alt="изображение журнала деплоймента из netlify с сообщением об ошибке build.failed"/></figure>
<!-- /wp:image -->

Причина этой ошибки заключается в том, что Netlify автоматически устанавливает переменную среды сборки в true, при этом определенные функции в приложении, которые ранее воспринимались как предупреждения (в терминале в локальной среде) и не изменяли сборку приложения в локальной среде, теперь будут обнаружены в новой среде. По умолчанию, установленному Netlify, ваше приложение из-за используемой библиотеки будет интерпретировать переменную окружения CI как true, то есть CI=true, где CI означает Continuous Integration, а затем интерпретировать предупреждения как ошибки, отсюда и предупреждение: “Treating warnings as errors because process.env.CI=true”, и это прерывает развертывание приложения.

<h2 class="wp-block-heading">Что такое переменные среды?</h2>

Переменные среды - это значения, которые помогают в настройке и контроле среды, в которой развертывается ваше приложение.

<h2 class="wp-block-heading">Решение:</h2>

Чтобы исправить эту ошибку, первым шагом будет настройка команды сборки вашего приложения.

Перейдите к настройкам сайта приложения, которое вы собираетесь развернуть.

В разделе Build and Deployment выберите Continuous Deployment и прокрутите вниз до раздела Build Settings, нажмите Edit Settings.

Установите команду сборки в CI= npm run build .

Следующим шагом будет установка переменной окружения, которая контролирует среду, в которую развертывается ваше приложение, для этого следуйте следующим инструкциям:

В разделе Build and Deploy выберите Environment.

Нажмите на Edit Variables и в поле ввода key введите CI, в поле ввода value введите false.

Это снимет настройки среды Netlify по умолчанию с CI=true на CI=false. После этого предупреждения во время непрерывной интеграции или развертывания больше не будут восприниматься как ошибки, которые могут остановить развертывание веб-приложения.

Следование этим инструкциям приведет к успешной сборке и развертыванию вашего приложения, как это произошло со мной. Вы увидите эти сообщения в журналах развертывания:

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--O5mdbR87--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ri0b1h4y8xz793bch6ik.png" alt="изображение журнала развертывания из Netlify с сообщением об успехе Команда сборки из приложения Netlify"/></figure>
<!-- /wp:image -->

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s---pzxHooJ--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/al349pgdg937s98ybqyg.png" alt="изображение журнала развертывания из Netlify с сообщением об успехе Netlify build complete, которое подтверждает успех развертывания приложения"/></figure>
<!-- /wp:image -->

Примечание: Эти настройки также могут быть применены при развертывании приложения в Vercel.

<!-- wp:acf/acf-donate {"id":"block_64678dc93985f","name":"acf/acf-donate","data":{"title":"Задонатить на поддержку!","_title":"field_646b621e8617c","list_0_name":"Donatepay","_list_0_name":"field_646b623e8617e","list_0_url":"https://new.donatepay.ru/@1117856","_list_0_url":"field_646b62528617f","list_0_address":"","_list_0_address":"field_646b625d86180","list_1_name":"Donationalerts","_list_1_name":"field_646b623e8617e","list_1_url":"https://www.donationalerts.com/c/woorg_","_list_1_url":"field_646b62528617f","list_1_address":"","_list_1_address":"field_646b625d86180","list_2_name":"USDT (TRC20)","_list_2_name":"field_646b623e8617e","list_2_url":"","_list_2_url":"field_646b62528617f","list_2_address":"TR121HxpTDF71TMm9idZkBaZxnjSMcCPWj","_list_2_address":"field_646b625d86180","list_3_name":"ETH","_list_3_name":"field_646b623e8617e","list_3_url":"","_list_3_url":"field_646b62528617f","list_3_address":"0x442721192987047eDeEC69Ca1D4c706f9Adb16B3","_list_3_address":"field_646b625d86180","list_4_name":"BTC","_list_4_name":"field_646b623e8617e","list_4_url":"","_list_4_url":"field_646b62528617f","list_4_address":"36dLKv5uRozphSQa55w2XgsF42AugPu2QT","_list_4_address":"field_646b625d86180","list":5,"_list":"field_646b62308617d"},"align":"","mode":"edit"} /-->
