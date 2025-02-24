---
title: Постройте систему продажи билетов Web3 с NFTs и обанкротьте Ticketmaster
meta_title: >-
  Постройте систему продажи билетов Web3 с NFTs и обанкротьте Ticketmaster -
  Igor Gorlov
description: >-
  Популярным и практичным примером использования НФТ является генерирование
  билетов на живые мероприятия. Блокчейн, такой как Ethereum, может
  гарантировать право собственности, создателя и подлинность цифрового товара,
  эффективно решая проблему поддельных билетов.
date: 2023-04-24T08:33:43.000Z
author: Igor Gorlov
image: ../../assets/images/undefined-Apr-24-2023.avif
categories:
  - Учебник
tags:
  - Nft
  - Web3
draft: false
lastmod: 2024-03-20T21:26:45.385Z
---

<!-- wp:rank-math/toc-block {"title":"Оглавление","headings":[{"key":"323995b9-ab29-4e46-af0a-72dfbdd08697","content":"Введение","level":2,"link":"#введение","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"8718c371-ced5-48df-b606-052c9b7d61ad","content":"Создание системы продажи билетов NFT на Ethereum","level":2,"link":"#создание-системы-продажи-билетов-nft-на-ethereum","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"d94dd11c-b67c-419c-a43f-1072b01d561a","content":"Шаг 1: Установите MetaMask","level":3,"link":"#шаг-1-установите-meta-mask","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"6f2ba3f6-3856-4815-b19d-a8e1c98226ee","content":"Шаг 2: Получите несколько тестовых ETH","level":3,"link":"#шаг-2-получите-несколько-тестовых-eth","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"4e575f0b-1068-4970-a829-5246cb797c70","content":"Шаг 3: Установите NPM и Node","level":3,"link":"#шаг-3-установите-npm-и-node","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"9f7e6cbc-4222-41bf-8b12-72d3fadcbe6d","content":"Шаг 4: Зарегистрируйте учетную запись Infura","level":3,"link":"#шаг-4-зарегистрируйте-учетную-запись-infura","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"44d39664-425b-450b-ba3f-e96cf084b540","content":"Шаг 5: Создайте проект Node и установите необходимые пакеты","level":3,"link":"#шаг-5-создайте-проект-node-и-установите-необходимые-пакеты","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"6e130254-69b8-4d8f-8558-f75441c6cc36","content":"Шаг 6: Создайте смарт-контракт тикетинга для NFT","level":3,"link":"#шаг-6-создайте-смарт-контракт-тикетинга-для-nft","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"98a56130-a922-40eb-b2aa-aad3409a3347","content":"Шаг 7: Обновление конфигурации Truffle и создание файла .env","level":3,"link":"#шаг-7-обновление-конфигурации-truffle-и-создание-файла-env","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"f351e19f-24fa-4da7-a7bb-98082426eda8","content":"Шаг 8: Развертывание смарт-контракта NFT","level":3,"link":"#шаг-8-развертывание-смарт-контракта-nft","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"dd075783-cc2f-46fb-b375-e45a4456e7de","content":"Шаг 9: Взаимодействие с умным контрактом","level":3,"link":"#шаг-9-взаимодействие-с-умным-контрактом","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"9e687c85-36b4-4fe6-879d-6c5251f45fd4","content":"Верификация с помощью API Infura NFT","level":2,"link":"#верификация-с-помощью-api-infura-nft","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"9a7a3ce9-2acd-40fb-9154-ac9ad979f17f","content":"Заключение","level":2,"link":"#заключение","disable":false,"isUpdated":false,"isGeneratedLink":true}],"listStyle":"ul"} -->
<div class="wp-block-rank-math-toc-block" id="rank-math-toc"><h2>Оглавление</h2><nav><ul><li class=""><a href="#введение">Введение</a></li><li class=""><a href="#создание-системы-продажи-билетов-nft-на-ethereum">Создание системы продажи билетов NFT на Ethereum</a><ul><li class=""><a href="#шаг-1-установите-meta-mask">Шаг 1: Установите MetaMask</a></li><li class=""><a href="#шаг-2-получите-несколько-тестовых-eth">Шаг 2: Получите несколько тестовых ETH</a></li><li class=""><a href="#шаг-3-установите-npm-и-node">Шаг 3: Установите NPM и Node</a></li><li class=""><a href="#шаг-4-зарегистрируйте-учетную-запись-infura">Шаг 4: Зарегистрируйте учетную запись Infura</a></li><li class=""><a href="#шаг-5-создайте-проект-node-и-установите-необходимые-пакеты">Шаг 5: Создайте проект Node и установите необходимые пакеты</a></li><li class=""><a href="#шаг-6-создайте-смарт-контракт-тикетинга-для-nft">Шаг 6: Создайте смарт-контракт тикетинга для NFT</a></li><li class=""><a href="#шаг-7-обновление-конфигурации-truffle-и-создание-файла-env">Шаг 7: Обновление конфигурации Truffle и создание файла .env</a></li><li class=""><a href="#шаг-8-развертывание-смарт-контракта-nft">Шаг 8: Развертывание смарт-контракта NFT</a></li><li class=""><a href="#шаг-9-взаимодействие-с-умным-контрактом">Шаг 9: Взаимодействие с умным контрактом</a></li></ul></li><li class=""><a href="#верификация-с-помощью-api-infura-nft">Верификация с помощью API Infura NFT</a></li><li class=""><a href="#заключение">Заключение</a></li></ul></nav></div>
<!-- /wp:rank-math/toc-block -->

<h2 class="wp-block-heading" id="введение">Введение</h2>

Популярным и практичным примером использования НФТ является генерирование билетов на живые мероприятия. Блокчейн, такой как Ethereum, может гарантировать право собственности, создателя и подлинность цифрового товара, эффективно решая проблему поддельных билетов. Пока крупные игроки, такие как Ticketmaster, борются со скальперами (отчаянно пытающимися контролировать, кто, где и за сколько может перепродавать билеты) и мошенничеством с билетами, у Web3 уже есть решение. Индустрия продажи билетов созрела для разрушения.

В этом руководстве мы рассмотрим, как создать такое решение для продажи билетов с помощью ConsenSys Truffle, Infura и Infura NFT API. Мы развернем смарт-контракт, который действует как служба продажи билетов и создает билеты в виде неиграбельных токенов ERC-20 (NFT). Мы также рассмотрим несколько архитектур потенциальных фронтендов, которые могут взаимодействовать с контрактом и вместе функционировать как интегрированная, полнофункциональная, web3 система продажи билетов.

Давайте приступим к созданию!

<h2 class="wp-block-heading" id="создание-системы-продажи-билетов-nft-на-ethereum">Создание системы продажи билетов NFT на Ethereum</h2>

Базовая архитектура нашей системы предполагает создание смарт-контракта, который выпускает наши билеты в виде неиграбельных токенов (NFT). NFT идеально подходят для того, что мы хотим создать. Это доказательно уникальные цифровые токены, которые позволяют нам гарантировать, что каждый билет уникален и не может быть скопирован или подделан. Это не только гарантирует безопасность билетов для зрителей, но и дает артистам (и организаторам мероприятий) больше возможностей для контроля над распространением, ценообразованием и перепродажей билетов. Использование смарт-контрактов и НФТ даже позволяет создать новые источники дохода, такие как роялти и разделение доходов!

(Если вам нужна справочная информация о любом из этих терминов, технологии blockchain или web3 в целом, ознакомьтесь с этой статьей о том, как стать Web3-разработчиком, изучив стек Web3).

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="шаг-1-установите-meta-mask">Шаг 1: Установите MetaMask</h3>

Первое, что мы собираемся сделать, это установить кошелек MetaMask и добавить в него тестовую сеть Sepolia. MetaMask - это самый популярный в мире, безопасный и простой в использовании цифровой кошелек для самостоятельного хранения средств.

Сначала загрузите расширение MetaMask. После установки расширения MetaMask настроит для вас кошелек. В процессе вам будет предоставлена секретная фраза. Храните ее в безопасности и ни в коем случае не разглашайте.

После того как вы настроите MetaMask, нажмите на вкладку Сеть в правом верхнем углу. Вы увидите опцию показать/скрыть тестовые сети.

Когда вы включите опцию тестовых сетей, вы сможете увидеть тестовую сеть Sepolia в выпадающем меню. Мы хотим использовать сеть Sepolia, чтобы мы могли развернуть и протестировать нашу систему, не тратя реальных денег.

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="шаг-2-получите-несколько-тестовых-eth">Шаг 2: Получите несколько тестовых ETH</h3>

Для того чтобы развернуть наш смарт-контракт и взаимодействовать с ним, нам потребуется немного бесплатных тестовых ETH. Вы можете получить бесплатные ETH Sepolia из крана Sepolia.

Как только вы пополните свой кошелек, вы должны увидеть ненулевой баланс при переключении на тестовую сеть Sepolia на MetaMask.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--Fm0SSMVS--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/x7ddj152imi7itm76fmq.png" alt=""/></figure>
<!-- /wp:image -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="шаг-3-установите-npm-и-node">Шаг 3: Установите NPM и Node</h3>

Как и все Ethereum dapps, мы будем собирать наш проект с помощью node и npm. Если они не установлены на вашей локальной машине, вы можете сделать это здесь.

Чтобы убедиться, что все работает правильно, выполните следующую команду:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">$ node -v
</code></pre>
<!-- /wp:code -->

Если все прошло успешно, вы должны увидеть номер версии Node.

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="шаг-4-зарегистрируйте-учетную-запись-infura">Шаг 4: Зарегистрируйте учетную запись Infura</h3>

Для того чтобы развернуть наш контракт в сети Sepolia, нам понадобится учетная запись Infura. Infura предоставляет нам доступ к конечным точкам RPC, которые обеспечивают быстрый, надежный и простой доступ к выбранному нами блокчейну.

Зарегистрируйтесь для получения бесплатной учетной записи. После создания учетной записи перейдите на приборную панель и выберите ”Создать новый ключ”.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--en8583ED--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/j03krof6jd2xyoh2jsec.png" alt=""/></figure>
<!-- /wp:image -->

Для сети выберите Web3 API и назовите ее Ticketing System или как-нибудь по своему усмотрению.

После того как вы нажмете кнопку Create, Infura сгенерирует для вас ключ API и автоматически предоставит вам конечные точки RPC для Ethereum, Goerli, Sepolia, L2 и не-EVM L1 (и соответствующих им тестовых сетей).

В данном руководстве нас интересует только конечная точка RPC Sepolia. Этот URL имеет вид https://sepolia.infura.io/v3/←API KEY→.

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="шаг-5-создайте-проект-node-и-установите-необходимые-пакеты">Шаг 5: Создайте проект Node и установите необходимые пакеты</h3>

Давайте создадим пустой репозиторий проекта, выполнив следующие команды:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">$ mkdir nft-ticketing &amp;&amp; cd nft-ticketing
$ npm init -y
</code></pre>
<!-- /wp:code -->

Для создания и развертывания нашего криптовалютного смарт-контракта мы будем использовать Truffle, среду разработки мирового класса и механизм тестирования смарт-контрактов EVM. Установите Truffle, выполнив:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">$ npm install —save truffle
</code></pre>
<!-- /wp:code -->

Теперь мы можем создать пустой проект Truffle, выполнив следующую команду:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">$ npx truffle init
</code></pre>
<!-- /wp:code -->

Чтобы проверить, все ли работает правильно, выполните

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">$ npx truffle test
</code></pre>
<!-- /wp:code -->

Теперь мы успешно настроили Truffle. Далее установим пакет контрактов OpenZeppelin. Этот пакет даст нам доступ к базовой реализации ERC-721 (стандарт для неиграбельных токенов), а также к нескольким полезным дополнительным функциям.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">$ npm install @openzeppelin/contracts
</code></pre>
<!-- /wp:code -->

Чтобы позволить Truffle использовать наш кошелек MetaMask, подписывать транзакции и оплачивать газ от нашего имени, нам потребуется еще один пакет под названием hdwalletprovider. Установите его с помощью следующей команды:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">$ npm install @truffle/hdwallet-provider
</code></pre>
<!-- /wp:code -->

Наконец, чтобы сохранить конфиденциальную информацию о нашем кошельке в безопасности, мы будем использовать пакет dotenv.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">$ npm install dotenv
</code></pre>
<!-- /wp:code -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="шаг-6-создайте-смарт-контракт-тикетинга-для-nft">Шаг 6: Создайте смарт-контракт тикетинга для NFT</h3>

Откройте репозиторий проекта в редакторе кода (например: VS Code). В папке contracts создайте новый файл под названием NftTicketing.sol.

Наш билетный контракт будет наследовать все функциональные возможности, предлагаемые ERC721Enumerable реализацией OpenZeppelin. Сюда входят переводы, отслеживание метаданных, данные о владельцах и т.д.

Мы реализуем следующие функции с нуля:

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Публичная первичная продажа: Наш контракт даст своему владельцу право продавать билеты по определенной цене. Владелец будет иметь право открывать и закрывать продажи, обновлять цены на билеты и снимать деньги, отправленные на контракт для покупки билетов. У публики будет возможность купить билеты по цене продажи, когда продажа открыта и билеты еще есть в наличии.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Аэродроппинг: Владелец сможет рассылать билеты по списку адресов кошельков.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Резервирование: Владелец также сможет резервировать билеты для себя без необходимости платить цену публичной продажи.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

Добавьте следующий код в файл NftTicketing.sol.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract NftTicketing is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable  {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;

    // Total number of tickets available for the event
    uint public constant MAX_SUPPLY = 10000;

    // Number of tickets you can book at a time; prevents spamming
    uint public constant MAX_PER_MINT = 5;

    string public baseTokenURI;

    // Price of a single ticket
    uint public price = 0.05 ether;

    // Flag to turn sales on and off
    bool public saleIsActive = false;

    // Give collection a name and a ticker
    constructor() ERC721("My NFT Tickets", "MNT") {}

    // Generate NFT metadata
    function generateMetadata(uint tokenId) public pure returns (string memory) {
        string memory svg = string(abi.encodePacked(
            "&lt;svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio='xMinyMin meet' viewBox='0 0 350 350'&gt;",
            "&lt;style&gt;.base { fill: white; font-family: serif; font-size: 25px; }&lt;/style&gt;",
            "&lt;rect width="100%" height="100%" fill="red" /&gt;",
            "&lt;text x='50%' y='40%' class="base" dominant-baseline="middle" text-anchor="middle"&gt;",
            "&lt;tspan y='50%' x='50%'&gt;NFT Ticket #",
            Strings.toString(tokenId),
            "&lt;/tspan&gt;&lt;/text&gt;&lt;/svg&gt;"
        ));

        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "NFT Ticket #',
                        Strings.toString(tokenId),
                        '", "description": "A ticket that gives you access to a cool event!", "image": "data:image/svg+xml;base64,',
                        Base64.encode(bytes(svg)),
                        '", "attributes": [{"trait_type": "Type", "value": "Base Ticket"}]}'
                    )
                )
            )
        );

        string memory metadata = string(
            abi.encodePacked("data:application/json;base64,", json)
        );
        return metadata;
    }

    // Reserve tickets to creator wallet
    function reserveNfts(uint _count) public onlyOwner {
        uint nextId = _tokenIds.current();

        require(nextId + _count &lt; MAX_SUPPLY, "Not enough NFTs left to reserve");

        for (uint i = 0; i &lt; _count; i++) {
            string memory metadata = generateMetadata(nextId + i);
            _mintSingleNft(msg.sender, metadata);
        }
    }

    // Airdrop NFTs
    function airDropNfts(address[] calldata _wAddresses) public onlyOwner {
        uint nextId = _tokenIds.current();
        uint count = _wAddresses.length;

        require(nextId + count &lt; MAX_SUPPLY, "Not enough NFTs left to reserve");

        for (uint i = 0; i &lt; count; i++) {
            string memory metadata = generateMetadata(nextId + i);
            _mintSingleNft(_wAddresses[i], metadata);
        }
    }

    // Set Sale state
    function setSaleState(bool _activeState) public onlyOwner {
        saleIsActive = _activeState;
    }

    // Allow public to mint NFTs
    function mintNfts(uint _count) public payable {

        uint nextId = _tokenIds.current();

        require(nextId + _count &lt; MAX_SUPPLY, "Not enough NFT tickets left!");
        require(_count &gt; 0 &amp;&amp; _count &lt;= MAX_PER_MINT, "Cannot mint specified number of NFT tickets.");
        require(saleIsActive, "Sale is not currently active!");
        require(msg.value &gt;= price * _count, "Not enough ether to purchase NFTs.");

        for (uint i = 0; i &lt; _count; i++) {
            string memory metadata = generateMetadata(nextId + i);
            _mintSingleNft(msg.sender, metadata);
        }
    }

    // Mint a single NFT ticket
    function _mintSingleNft(address _wAddress, string memory _tokenURI) private {
        // Sanity check for absolute worst case scenario
        require(totalSupply() == _tokenIds.current(), "Indexing has broken down!");
        uint newTokenID = _tokenIds.current();
        _safeMint(_wAddress, newTokenID);
        _setTokenURI(newTokenID, _tokenURI);
        _tokenIds.increment();
    }

    // Update price
    function updatePrice(uint _newPrice) public onlyOwner {
        price = _newPrice;
    }

    // Withdraw ether
    function withdraw() public payable onlyOwner {
        uint balance = address(this).balance;
        require(balance &gt; 0, "No ether left to withdraw");

        (bool success, ) = (msg.sender).call{value: balance}("");
        require(success, "Transfer failed.");
    }

    // Get tokens of an owner
    function tokensOfOwner(address _owner) external view returns (uint[] memory) {

        uint tokenCount = balanceOf(_owner);
        uint[] memory tokensId = new uint256[](tokenCount);

        for (uint i = 0; i &lt; tokenCount; i++) {
            tokensId[i] = tokenOfOwnerByIndex(_owner, i);
        }
        return tokensId;
    }

    // The following functions are overrides required by Solidity.
    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
</code></pre>
<!-- /wp:code -->

Убедитесь, что контракт компилируется правильно, выполнив команду:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">npx truffle compile
</code></pre>
<!-- /wp:code -->

Наш контракт уже довольно сложный, но можно добавить некоторые дополнительные функции по вашему усмотрению.

Например, вы можете реализовать механизм защиты от скальпирования в вашем контракте. Это можно сделать следующим образом:

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Определите связку Solidity, которая действует как список разрешений для кошельков, на которых может храниться более одного билета.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Создайте функцию, позволяющую владельцу добавлять адреса в этот список.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Ввести проверку в _beforeTokenTransfer, которая разрешает майнить или переводить деньги на кошелек, уже имеющий билет, только если он находится в списке разрешенных адресов.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

Добавьте следующий фрагмент ниже конструктора контракта:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">mapping(address =&gt; bool) canMintMultiple;

    // Function that allowlists addresses to hold multiple NFTs.
    function addToAllowlist(address[] calldata _wAddresses) public onlyOwner {
        for (uint i = 0; i &lt; _wAddresses.length; i++) {
            canMintMultiple[_wAddresses[i]] = true;
        }
    }
</code></pre>
<!-- /wp:code -->

Наконец, измените функцию \_beforeTokenTranfer следующим образом:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">// The following functions are overrides required by Solidity.
    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        override(ERC721, ERC721Enumerable)
    {
        if (balanceOf(to) &gt; 0) {
            require(to == owner() || canMintMultiple[to], "Not authorized to hold more than one ticket");
        }
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }
</code></pre>
<!-- /wp:code -->

Скомпилируйте контракт еще раз, используя приведенную выше команду Truffle.

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="шаг-7-обновление-конфигурации-truffle-и-создание-файла-env">Шаг 7: Обновление конфигурации Truffle и создание файла .env</h3>

Создайте новый файл в корневом каталоге проекта под названием .env и добавьте в него следующее содержимое:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">INFURA_API_KEY = "https://sepolia.infura.io/v3/&lt;Your-API-Key&gt;"
MNEMONIC = "&lt;Your-MetaMask-Secret-Recovery-Phrase&gt;"
</code></pre>
<!-- /wp:code -->

Далее добавим информацию о нашем кошельке, конечной точке RPC Infura и сети Sepolia в файл конфигурации Truffle. Замените содержимое файла truffle.config.js на следующее:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');
const { INFURA_API_KEY, MNEMONIC } = process.env;

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    },
    sepolia: {
      provider: () =&gt; new HDWalletProvider(MNEMONIC, INFURA_API_KEY),
      network_id: '5',
    }
  }
};
</code></pre>
<!-- /wp:code -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="шаг-8-развертывание-смарт-контракта-nft">Шаг 8: Развертывание смарт-контракта NFT</h3>

Теперь давайте напишем скрипт для развертывания нашего контракта на блокчейне Sepolia.

В папке migrations создайте новый файл под названием 1_deploy_contract.js и добавьте следующий код:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">// Get instance of the NFT contract
const nftContract = artifacts.require("NftTicketing");

module.exports = async function (deployer) {
    // Deploy the contract
    await deployer.deploy(nftContract);
    const contract = await nftContract.deployed();

    // Mint 5 tickets
    await contract.reserveNfts(5);
    console.log("5 NFT Tickets have been minted!")
};
</code></pre>
<!-- /wp:code -->

Все готово! Разверните контракт, выполнив следующую команду:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">truffle migrate --network sepolia
</code></pre>
<!-- /wp:code -->

Если все прошло успешно, вы должны увидеть результат (содержащий адрес контракта), который выглядит примерно так:

<!-- wp:code -->

# <pre class="wp-block-code"><code lang="javascript" class="language-javascript">Starting migrations…

&gt; Network name: ‘sepolia’
&gt; Network id: 5
&gt; Block gas limit: 30000000 (0x1c9c380)

# 1_deploy_contract.js

Deploying ‘NftTicketing’

---

&gt; transaction hash: …
&gt; Blocks: 2 Seconds: 23
…
&gt; Saving artifacts

---

&gt; Total cost: 0.1201 ETH
Summary
=======
&gt; Total deployments: 1
&gt; Final cost: 0.1201 ETH
</code></pre>

<!-- /wp:code -->

Вы можете найти адрес вашего контракта на сайте Sepolia etherscan и увидеть его в реальном времени.

Поздравляем! Вы успешно развернули контракт в Sepolia.

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="шаг-9-взаимодействие-с-умным-контрактом">Шаг 9: Взаимодействие с умным контрактом</h3>

У нас есть наш смарт-контракт! Следующим шагом будет развертывание фронтендов, которые будут взаимодействовать с контрактом и позволят любому человеку вызвать функцию mint, чтобы сделать пожертвование и отчеканить билет для себя.

Для полнофункциональной службы продажи билетов вам, как правило, понадобятся следующие фронтенды:

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Веб-сайт (с отличным пользовательским интерфейсом), где публичные пользователи могут оплачивать и чеканить свои билеты.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Портал администратора, где владелец может резервировать билеты, обновлять цены, передавать роль администратора на другой кошелек, снимать доходы от продаж, открывать и закрывать продажи и т.д.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Инструмент, который проверяет наличие у человека конкретного билета как онлайн, так и IRL.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

Создание этих систем с нуля не входит в задачи данного руководства, но мы оставим вам несколько ресурсов и советов.

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>В качестве отправной точки для сайта майнинга посмотрите фронтенд, который я создал в руководстве "Спасибо NFT".</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Если вы верифицируете свой контракт на Etherscan, он автоматически предоставит вам административный портал, где вы сможете вызвать любую функцию на вашем контракте. Это хороший первый шаг, прежде чем вы решите создать собственное решение.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Проверить, что в кошельке есть билет из вашей коллекции, очень просто с помощью функции balanceOf. Если кто-то может доказать, что он владеет кошельком, содержащим один из наших билетов, то это, по сути, является доказательством того, что у него есть билет. Этого можно достичь с помощью цифровых подписей.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<h2 class="wp-block-heading" id="верификация-с-помощью-api-infura-nft">Верификация с помощью API Infura NFT</h2>

Еще один совет: как только у вас есть смарт-контракт и фронтенд (или даже до того, как фронтенд завершен, и вы хотите доказать, что все работает), вы можете использовать Infura NFT API для проверки того, что ваш новый NFT существует. Infura NFT API - это быстрый способ заменить множество кода, связанного с NFT, одним вызовом API.

Например, информация, необходимая для подтверждения права собственности на наш NFT, легко доступна нам через API. Все, что нам нужно, это адрес кошелька. Код будет выглядеть следующим образом:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">const walletAddress = &lt;your wallet address&gt;
const chainId = "1"

const baseUrl = "https://nft.api.infura.io"
const url = `${baseUrl}/networks/${chainId}/accounts/${walletAddress}/../../assets/nfts`

// API request
const config = {
    method: 'get',
    url: url,
    auth: {
        username: '&lt;-- INFURA_API_KEY –&gt;',
        password: '&lt;-- INFURA_API_SECRET –&gt;',
    }
};

// API Request
axios(config)
    .then(response =&gt; {
        console.log(response['data'])
    })
    .catch(error =&gt; console.log('error', error));
</code></pre>
<!-- /wp:code -->

Run it …

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">$ node &lt;filename&gt;.js
</code></pre>
<!-- /wp:code -->

И вы должны увидеть что-то вроде этого:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">{
  total: 1,
  pageNumber: 1,
  pageSize: 100,
  network: 'ETHEREUM',
  account: &lt;account address&gt;,
  cursor: null,
  ../../assets: [
    {
      contract: &lt;NFT contract address&gt;,
      tokenId: '0',
      supply: '1',
      type: 'ERC20',
      metadata: [Object]
    },
   …
  ]
}
</code></pre>
<!-- /wp:code -->

<h2 class="wp-block-heading" id="заключение">Заключение</h2>

В этом руководстве мы развернули полностью функциональный сервис продажи билетов NFT, используя Truffle, Infura и Infura NFT API. Это, конечно, не все, что вам понадобится для того, чтобы разорить Ticketmaster, но это надежное начало и отличное доказательство концепции! Даже если вы не возьмете этот код и не создадите свою собственную платформу для продажи билетов NFT, надеюсь, вы узнали немного о web3 в процессе.
