---
title: Как загрузить неограниченное количество бесплатных эфиров в кошелек Metamask
meta_title: >-
  Как загрузить неограниченное количество бесплатных эфиров в кошелек Metamask -
  Igor Gorlov
description: >-
  Вы хотите тестировать свои смарт-контракты Ethereum, не беспокоясь о том, что
  у вас закончатся эфиры? В этом руководстве мы покажем вам, как пополнить свой
  кошелек Metamask любым количеством бесплатных эфиров.
date: 2023-03-17T22:56:15.000Z
author: Igor Gorlov
image: ../../assets/images/undefined-Mar-18-2023.avif
categories:
  - Как закодить
tags:
  - blockchain
  - ethereum
  - metamask
  - Web3
draft: false
lastmod: 2024-03-20T21:26:47.194Z
---

<!-- wp:rank-math/toc-block {"title":"Оглавление","headings":[{"key":"7c27b967-d11a-4502-8070-c52326acc807","content":"Введение","level":2,"link":"#введение","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"ccc99eed-300b-43dc-a2bb-990a3850db1d","content":"Необходимые условия","level":2,"link":"#необходимые-условия","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"81d4eff1-e924-4424-b52a-818bd2744e93","content":"Метод Hardhat","level":2,"link":"#метод-hardhat","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"aea686e5-cf61-4ebe-89c0-b862ce18b7f9","content":"ШАГ 1: Настройка структуры проекта","level":3,"link":"#шаг-1-настройка-структуры-проекта","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"f5afbb45-0af1-4ccb-951a-e91a2cf89626","content":"ШАГ 2: Создание проекта Hardhat","level":3,"link":"#шаг-2-создание-проекта-hardhat","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"5d5fed9f-1dcc-458f-b8a8-024091d18368","content":"ШАГ 3: Запуск сервера Hardhat","level":3,"link":"#шаг-3-запуск-сервера-hardhat","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"3d585a61-ed5b-47ec-b8c3-b00c25679e61","content":"ШАГ 4: Доступ к Metamask","level":3,"link":"#шаг-4-доступ-к-metamask","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"ba569472-d44b-4f23-a11f-6a9c95df1aab","content":"ШАГ 5: Настройка сети","level":3,"link":"#шаг-5-настройка-сети","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"929b2b1d-8d6d-4e46-8058-e2af2be9c745","content":"ШАГ 6: Импорт учетных записей","level":3,"link":"#шаг-6-импорт-учетных-записей","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"4809e919-8a68-4abd-8ba1-90e475b9845c","content":"Метод Ganache","level":2,"link":"#метод-ganache","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"db1b8c2e-ea1c-4155-86da-f9035ac1f51c","content":"ШАГ 1: Установка сервера Ganache","level":3,"link":"#шаг-1-установка-сервера-ganache","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"82f5f498-b205-4095-b016-e06178928e8c","content":"ШАГ 2: Запуск сервера Ganache","level":3,"link":"#шаг-2-запуск-сервера-ganache","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"5abe34d0-a995-4562-b931-3dfba9e1d326","content":"ШАГ 3: Настройка сети","level":3,"link":"#шаг-3-настройка-сети","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"c7576d85-fc93-4dde-8b84-2852a3cb766f","content":"ШАГ 4: Импорт учетных записей","level":3,"link":"#шаг-4-импорт-учетных-записей","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"d869b722-49e3-4290-bf64-579cc609b0ad","content":"Заключение","level":2,"link":"#заключение","disable":false,"isUpdated":false,"isGeneratedLink":true}],"listStyle":"ul"} -->
<div class="wp-block-rank-math-toc-block" id="rank-math-toc"><h2>Оглавление</h2><nav><ul><li class=""><a href="#введение">Введение</a></li><li class=""><a href="#необходимые-условия">Необходимые условия</a></li><li class=""><a href="#метод-hardhat">Метод Hardhat</a><ul><li class=""><a href="#шаг-1-настройка-структуры-проекта">ШАГ 1: Настройка структуры проекта</a></li><li class=""><a href="#шаг-2-создание-проекта-hardhat">ШАГ 2: Создание проекта Hardhat</a></li><li class=""><a href="#шаг-3-запуск-сервера-hardhat">ШАГ 3: Запуск сервера Hardhat</a></li><li class=""><a href="#шаг-4-доступ-к-metamask">ШАГ 4: Доступ к Metamask</a></li><li class=""><a href="#шаг-5-настройка-сети">ШАГ 5: Настройка сети</a></li><li class=""><a href="#шаг-6-импорт-учетных-записей">ШАГ 6: Импорт учетных записей</a></li></ul></li><li class=""><a href="#метод-ganache">Метод Ganache</a><ul><li class=""><a href="#шаг-1-установка-сервера-ganache">ШАГ 1: Установка сервера Ganache</a></li><li class=""><a href="#шаг-2-запуск-сервера-ganache">ШАГ 2: Запуск сервера Ganache</a></li><li class=""><a href="#шаг-3-настройка-сети">ШАГ 3: Настройка сети</a></li><li class=""><a href="#шаг-4-импорт-учетных-записей">ШАГ 4: Импорт учетных записей</a></li></ul></li><li class=""><a href="#заключение">Заключение</a></li></ul></nav></div>
<!-- /wp:rank-math/toc-block -->

<h2 class="wp-block-heading" id="введение">Введение</h2>

Вы хотите тестировать свои смарт-контракты Ethereum, не беспокоясь о том, что у вас закончатся эфиры? В этом руководстве мы покажем вам, как пополнить свой кошелек Metamask любым количеством бесплатных эфиров. Используя эту технику, вы сможете иметь обильный запас эфиров, доступных для использования в тестировании и разработке. Вам понадобится только NodeJs, расширение Chrome для Metamask и несколько простых шагов.

<h2 class="wp-block-heading" id="необходимые-условия">Необходимые условия</h2>

Чтобы следовать этому руководству и загрузить бесплатные эфиры в ваш Metamask, вам понадобятся следующие пакеты:

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li><a href="https://nodejs.org/en/download/" target="_blank" rel="noreferrer noopener nofollow">NodeJs</a></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><a href="https://metamask.io/download/" target="_blank" rel="noreferrer noopener nofollow">Metamask</a></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><a href="https://www.google.com/chrome/" target="_blank" rel="noreferrer noopener nofollow">Chrome Browser</a></li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

Вы можете посмотреть видеоурок на YouTube с помощью видео ниже.

<!-- wp:embed {"url":"https://www.youtube.com/watch?v=qnudOwva0fM","type":"video","providerNameSlug":"youtube","responsive":true,"className":"wp-embed-aspect-16-9 wp-has-aspect-ratio"} -->
<figure class="wp-block-embed is-type-video is-provider-youtube wp-block-embed-youtube wp-embed-aspect-16-9 wp-has-aspect-ratio"><div class="wp-block-embed__wrapper">
https://www.youtube.com/watch?v=qnudOwva0fM
</div></figure>
<!-- /wp:embed -->

Теперь давайте рассмотрим шаги и методы, которые вам понадобятся, чтобы загрузить неограниченное количество бесплатных эфиров в кошелек Metamask.

<h2 class="wp-block-heading" id="метод-hardhat">Метод Hardhat</h2>

Благодаря своей гибкости, расширяемости и скорости, многие разработчики и профессионалы web3 приняли Hardhat в качестве основного фреймворка для разработки приложений в сети Ethereum.

Ниже описаны шаги по загрузке Эфиров в Metamask с помощью Hardhat.

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="шаг-1-настройка-структуры-проекта">ШАГ 1: Настройка структуры проекта</h3>

Создайте проект под названием **freeTestEthers**, это может быть любой проект на JavaScript, например NodeJs, ReactJs, VueJs или даже проект NextJs. В данном примере мы будем использовать проект NodeJs.

Далее откройте папку проекта в терминале или просто перейдите в эту директорию и выполните следующие команды.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">cd freeTestEthers
npm init --y
</code></pre>
<!-- /wp:code -->

Приведенная выше команда инициирует папку как проект nodeJs. Смотрите изображение ниже.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--VVb2g4gI--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://paper-attachments.dropboxusercontent.com/s_9DD2504C64828909145D2BE2D627F89C45E2B1827EB8577EFA3A98F1F4F74EA0_1678986517062_Screenshot%2B2023-03-16%2Bat%2B6.08.29%2BPM.png" alt="файл package.json"/></figure>
<!-- /wp:image -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="шаг-2-создание-проекта-hardhat">ШАГ 2: Создание проекта Hardhat</h3>

Установите пакеты Hardhat, которые позволят вам запустить сервер блокчейна, в терминале выполните следующие команды:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">npm install hardhat
</code></pre>
<!-- /wp:code -->

После установки выполните приведенную ниже команду hardhat.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">npx hardhat
</code></pre>
<!-- /wp:code -->

Теперь следуйте подсказкам, как показано на изображении ниже, чтобы завершить установку:

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--iaaNkamG--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://paper-attachments.dropboxusercontent.com/s_9DD2504C64828909145D2BE2D627F89C45E2B1827EB8577EFA3A98F1F4F74EA0_1678987143815_Screenshot%2B2023-03-16%2Bat%2B6.18.58%2BPM.png" alt="Hardhat Мастер установки "/></figure>
<!-- /wp:image -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="шаг-3-запуск-сервера-hardhat">ШАГ 3: Запуск сервера Hardhat</h3>

После завершения установки снова выполните эту команду, чтобы запустить блокчейн-сервер Hardhat:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">npx hardhat node
</code></pre>
<!-- /wp:code -->

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--jSwxLgpG--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://paper-attachments.dropboxusercontent.com/s_9DD2504C64828909145D2BE2D627F89C45E2B1827EB8577EFA3A98F1F4F74EA0_1678987455880_Screenshot%2B2023-03-16%2Bat%2B6.24.09%2BPM.png" alt="Hardhat Сервер"/></figure>
<!-- /wp:image -->

Приведенная выше команда должна запустить сервер, похожий на тот, что показан на изображении выше. Обратите внимание на разницу между учетными записями и их приватными ключами. Позже мы будем использовать приватные ключи для импорта Эфиров в Metamask.

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="шаг-4-доступ-к-metamask">ШАГ 4: Доступ к Metamask</h3>

Когда Metamask уже установлен, откройте браузер и перейдите по следующей ссылке, которая полностью откроет интерфейс расширения Metamask. Он должен выглядеть так, как показано на рисунке ниже.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--pH9CjSF4--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://paper-attachments.dropboxusercontent.com/s_9DD2504C64828909145D2BE2D627F89C45E2B1827EB8577EFA3A98F1F4F74EA0_1678988039167_Screenshot%2B2023-03-16%2Bat%2B6.33.53%2BPM.png" alt="Интерфейс Metamask"/></figure>
<!-- /wp:image -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="шаг-5-настройка-сети">ШАГ 5: Настройка сети</h3>

Теперь нам нужно указать Metamask использовать сервер Hardhat, запущенный на шаге 3 этого раздела. Metamask обычно поставляется с сетью Localhost по умолчанию, в которой настроен Hardhat, поэтому нам не нужно настраивать сеть с нуля.

Перейдите на страницу сетей в Metamask и убедитесь, что ваша настройка находится на той же странице, что и моя.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--2dnV1Q17--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://paper-attachments.dropboxusercontent.com/s_9DD2504C64828909145D2BE2D627F89C45E2B1827EB8577EFA3A98F1F4F74EA0_1678988420912_Screenshot%2B2023-03-16%2Bat%2B6.39.10%2BPM.png" alt="Шаг первый"/></figure>
<!-- /wp:image -->

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--WO3D6y8_--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://paper-attachments.dropboxusercontent.com/s_9DD2504C64828909145D2BE2D627F89C45E2B1827EB8577EFA3A98F1F4F74EA0_1678988478007_Screenshot%2B2023-03-16%2Bat%2B6.41.12%2BPM.png" alt="Шаг второй"/></figure>
<!-- /wp:image -->

Вы заметили конфигурацию сети на изображении выше?

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Имя сети: Означает псевдоним, который вы предпочитаете дать своей сети блокчейн.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Новый URL RPC: Указывает на конечную точку HTTP, с которой можно получить доступ к службе блокчейна, включает в себя хост и порт сервера блокчейна.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Chain Id: Указывает уникальный идентификационный номер для конкретной блокчейн-сети, для сервера Hardhat это всегда 31337.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Символ валюты: Указывает вид криптовалюты, используемой в конкретной сети блокчейн.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="шаг-6-импорт-учетных-записей">ШАГ 6: Импорт учетных записей</h3>

Из шага 3 скопируйте первый закрытый ключ для нулевого (0) аккаунта, как показано на следующем изображении.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--1EEG3gHk--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://paper-attachments.dropboxusercontent.com/s_9DD2504C64828909145D2BE2D627F89C45E2B1827EB8577EFA3A98F1F4F74EA0_1679047349275_Screenshot%2B2023-03-17%2Bat%2B11.02.22%2BAM.png" alt="Шаг первый"/></figure>
<!-- /wp:image -->

Теперь убедитесь, что вы выбрали Localhost в качестве предпочитаемой сети и нажмите на кнопку ”импортировать учетную запись”, как показано на изображении ниже.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--IjFkb3tf--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://paper-attachments.dropboxusercontent.com/s_9DD2504C64828909145D2BE2D627F89C45E2B1827EB8577EFA3A98F1F4F74EA0_1679048149522_Screenshot%2B2023-03-17%2Bat%2B11.15.09%2BAM.png" alt="Шаг второй"/></figure>
<!-- /wp:image -->

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--N0xsvidD--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://paper-attachments.dropboxusercontent.com/s_9DD2504C64828909145D2BE2D627F89C45E2B1827EB8577EFA3A98F1F4F74EA0_1679048383974_Screenshot%2B2023-03-17%2Bat%2B11.18.56%2BAM.png" alt="Шаг третий"/></figure>
<!-- /wp:image -->

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--HoGNNitV--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://paper-attachments.dropboxusercontent.com/s_9DD2504C64828909145D2BE2D627F89C45E2B1827EB8577EFA3A98F1F4F74EA0_1679048956638_Screenshot%2B2023-03-17%2Bat%2B11.28.16%2BAM.png" alt="Шаг четвертый"/></figure>
<!-- /wp:image -->

Поздравляем, вы смогли импортировать новый аккаунт, используя его закрытый ключ, теперь сравните, как через закрытый ключ адрес аккаунта 5 совпадает с тем, что изображен на картинке ниже.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--NLOc7H01--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://paper-attachments.dropboxusercontent.com/s_9DD2504C64828909145D2BE2D627F89C45E2B1827EB8577EFA3A98F1F4F74EA0_1679049127419_Screenshot%2B2023-03-17%2Bat%2B11.31.24%2BAM.png" alt="Адрес кошелька и баланс Импортировано"/></figure>
<!-- /wp:image -->

Теперь вы можете повторить этот процесс, чтобы импортировать больше аккаунтов с вашего сервера Hardhat.

После реализации этого одноразового процесса при каждом запуске блокчейн-сервера Hardhat ваш счет будет пополняться свежим балансом в 10 000 ETH. Теперь вы можете использовать все эти эфиры для своих процессов разработки Hardhat.

<h2 class="wp-block-heading" id="метод-ganache">Метод Ganache</h2>

Truffle - один из самых полных наборов инструментов для разработки смарт-контрактов. Для сервера блокчейна у них есть Ganache.

С Ganache вам не нужно устанавливать его на конкретный проект, вам просто нужно настроить его глобально один раз на вашей локальной машине. Вот шаги по загрузке Эфиров в Metamask с помощью Ganache.

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="шаг-1-установка-сервера-ganache">ШАГ 1: Установка сервера Ganache</h3>

Чтобы установить Ganache глобально на вашей машине, выполните следующую команду в терминале:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">npm install ganache --global //or
sudo npm install ganache --global
</code></pre>
<!-- /wp:code -->

После установки вы должны увидеть результат, подобный приведенному ниже изображению.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--krHDeOhf--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://paper-attachments.dropboxusercontent.com/s_9DD2504C64828909145D2BE2D627F89C45E2B1827EB8577EFA3A98F1F4F74EA0_1679050371774_Screenshot%2B2023-03-17%2Bat%2B11.52.46%2BAM.png" alt="Установка"/></figure>
<!-- /wp:image -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="шаг-2-запуск-сервера-ganache">ШАГ 2: Запуск сервера Ganache</h3>

После завершения установки выполните приведенную ниже команду, чтобы запустить блокчейн-сервер Ganache:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">ganache -d
</code></pre>
<!-- /wp:code -->

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--9GKgXwjs--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://paper-attachments.dropboxusercontent.com/s_9DD2504C64828909145D2BE2D627F89C45E2B1827EB8577EFA3A98F1F4F74EA0_1679051105851_Screenshot%2B2023-03-17%2Bat%2B12.05.00%2BPM.png" alt="Сервер Ganache"/></figure>
<!-- /wp:image -->

С помощью вышеупомянутой команды необходимо создать сервер, похожий на тот, что показан на изображении выше. Обратите внимание на то, как различаются учетные записи и их приватные ключи. Закрытые ключи в конечном итоге будут использоваться для импорта Эфиров в Metamask так же, как мы это делали с Hardhat.

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="шаг-3-настройка-сети">ШАГ 3: Настройка сети</h3>

Еще раз мы должны указать Metamask подключиться к серверу Ganache, который был активен в шаге 3 этого раздела. На этот раз совершенно новая сеть будет добавлена с нуля.

Убедитесь, что ваша конфигурация находится на той же странице, что и моя, на странице сетей Metamask.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--2dnV1Q17--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://paper-attachments.dropboxusercontent.com/s_9DD2504C64828909145D2BE2D627F89C45E2B1827EB8577EFA3A98F1F4F74EA0_1678988420912_Screenshot%2B2023-03-16%2Bat%2B6.39.10%2BPM.png" alt="Шаг первый"/></figure>
<!-- /wp:image -->

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--c65L1X40--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://paper-attachments.dropboxusercontent.com/s_9DD2504C64828909145D2BE2D627F89C45E2B1827EB8577EFA3A98F1F4F74EA0_1679056112789_Screenshot%2B2023-03-17%2Bat%2B1.25.30%2BPM.png" alt="Шаг второй"/></figure>
<!-- /wp:image -->

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--FtKrylXJ--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://paper-attachments.dropboxusercontent.com/s_9DD2504C64828909145D2BE2D627F89C45E2B1827EB8577EFA3A98F1F4F74EA0_1679056130998_Screenshot%2B2023-03-17%2Bat%2B1.27.24%2BPM.png" alt="Шаг третий"/></figure>
<!-- /wp:image -->

Теперь следует знать, что единственным различием между серверами Hardhat и Ganache является их идентификатор цепи. В то время как Hardhat имеет идентификатор цепи 31337, Ganache имеет 1337. Убедитесь, что вы нажали кнопку сохранения, чтобы добавить его в список сетей.

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="шаг-4-импорт-учетных-записей">ШАГ 4: Импорт учетных записей</h3>

Из шага 3 скопируйте первый закрытый ключ для учетной записи ноль (0), как показано на следующем изображении.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--HOVZTwNx--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://paper-attachments.dropboxusercontent.com/s_9DD2504C64828909145D2BE2D627F89C45E2B1827EB8577EFA3A98F1F4F74EA0_1679057172001_Screenshot%2B2023-03-17%2Bat%2B1.45.36%2BPM.png" alt="Шаг первый"/></figure>
<!-- /wp:image -->

Теперь убедитесь, что вы выбрали Localhost в качестве предпочитаемой сети и нажмите на кнопку ”импортировать учетную запись”, как показано на изображении ниже.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--JDZafJP3--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://paper-attachments.dropboxusercontent.com/s_9DD2504C64828909145D2BE2D627F89C45E2B1827EB8577EFA3A98F1F4F74EA0_1679057263011_Screenshot%2B2023-03-17%2Bat%2B1.47.04%2BPM.png" alt="Шаг второй"/></figure>
<!-- /wp:image -->

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--N0xsvidD--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://paper-attachments.dropboxusercontent.com/s_9DD2504C64828909145D2BE2D627F89C45E2B1827EB8577EFA3A98F1F4F74EA0_1679048383974_Screenshot%2B2023-03-17%2Bat%2B11.18.56%2BAM.png" alt="Шаг третий"/></figure>
<!-- /wp:image -->

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--T0SH4jjs--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://paper-attachments.dropboxusercontent.com/s_9DD2504C64828909145D2BE2D627F89C45E2B1827EB8577EFA3A98F1F4F74EA0_1679057330464_Screenshot%2B2023-03-17%2Bat%2B1.48.20%2BPM.png" alt="Шаг четвертый"/></figure>
<!-- /wp:image -->

Поздравляем, вы смогли импортировать новый аккаунт, используя его закрытый ключ, теперь сравните, как через закрытый ключ адрес аккаунта 5 совпадает с тем, что изображен на картинке ниже.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--zxSWY-Qp--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://paper-attachments.dropboxusercontent.com/s_9DD2504C64828909145D2BE2D627F89C45E2B1827EB8577EFA3A98F1F4F74EA0_1679057451319_Screenshot%2B2023-03-17%2Bat%2B1.50.32%2BPM.png" alt="Адрес кошелька и баланс Импортировано"/></figure>
<!-- /wp:image -->

Вы можете импортировать счета в свой кошелек Metamask таким образом. Выполнив эту процедуру сейчас, вы сможете импортировать больше аккаунтов сервера Ganache.

После завершения этой одноразовой процедуры каждый раз, когда вы включаете блокчейн-сервер Hardhat, на вашем счете будет обновляться баланс на 1 000 ETH. Все эти Эфиры теперь доступны для использования в ваших процедурах разработки Hardhat.

<h2 class="wp-block-heading" id="заключение">Заключение</h2>

В заключение, данное руководство предлагает два метода, Hardhat и Ganache, для добавления неограниченного количества бесплатных Эфиров на кошелек Metamask в целях тестирования и разработки. Оба метода требуют установки NodeJs, расширения Chrome для Metamask и использования фреймворка Hardhat или Ganache. Следуя шагам, описанным в руководстве, пользователи смогут легко загружать Эфиры на свой кошелек Metamask и иметь обильный запас для тестирования и разработки смарт-контрактов Ethereum.

На этом мы закончили этот урок, спасибо за внимание, до встречи в следующем уроке!
