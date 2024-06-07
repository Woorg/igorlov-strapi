---
title: Понимание методов и ошибок MetaMask RPC
meta_title: 'Понимание методов и ошибок MetaMask RPC | Игорь Горлов - Fullstack Developer '
description: >-
  MetaMask  это популярный криптовалютный кошелек, который отправляет, получает
  и подписывает транзакции на блокчейне. Это предпочтительный криптовалютный
  кошел
date: 2023-12-18T00:00:00.000Z
categories:
  - Как пофиксить
author: Игорь Горлов
draft: false
slug: ponymanye-metodov-y-oshybok-metamask-rpc
translatedPosition: 35
tags:
  - metamask
  - RPC
image: ../../assets/images/ponymanye-metodov-y-oshybok-metamask-rpc-Dec-18-2023.avif
lastmod: 2024-03-20T21:26:42.853Z
---

MetaMask - это популярный криптовалютный кошелек, который отправляет, получает и подписывает транзакции на блокчейне. Это предпочтительный криптовалютный кошелек, используемый web3-разработчиками, благодаря его гибкости, передовым и инновационным функциям.

Как разработчик, работающий с MetaMask и его RPC, вы, должно быть, уже заметили, что перехват ошибок MetaMask невозможен с помощью блока try-and-catch. Ситуация может расстроить, особенно когда вы можете четко увидеть ошибку в консоли браузера.

Прежде чем перейти к отлову этих ошибок, мы должны понять, что такое RPC и как MetaMask использует его для своих методов.

## Что такое RPC?

Вызов удаленной процедуры (RPC) - это ориентированный на действия протокол, который взаимодействует с внешними системами и позволяет приложению выполнять программы в другом месте.

В случае с web3 RPC позволяет приложению получать доступ к данным блокчейна, создавать транзакции и взаимодействовать с функциями смарт-контракта через серверный узел. Такие кошельки, как MetaMask, имеют встроенный RPC, известный как JSON-RPC. Он является промежуточным звеном между внешними приложениями и функциями смарт-контракта. Этот тип RPC представляет собой нестационарный и легкий протокол, используемый для агностической передачи данных через WebSockets или HTTP.

Когда пользователи загружают расширение MetaMask, кошелек внедряет объект Ethereum в окно браузера (window.ethereum). Объект содержит все RPC-методы MetaMask, а именно `isConnected`, `on` и `request`.

`ethereum.isConnected`: Этот метод проверяет состояние соединения между сервером узла MetaMask и блокчейном. Он возвращает булево значение. Если он возвращает true, то сервер узла может делать RPC-запросы к Ethereum или другой цепочке, совместимой с Ethereum Virtual Machine (EVM).

`ethereum.on`: Metamask реализует API эмиттера событий Node.js в этом методе для отслеживания событий блокчейна, изменений цепочки и учетных записей пользователей. Метод использует аргументы, содержащие название события, которое нужно отследить, и функцию, содержащую то, что делает ваше React-приложение, когда происходит событие. Некоторые из событий MetaMask по умолчанию - “accountsChanged”:

`window.ethereum.on('accountsChanged',(accounts)=>{ console.log("You switched your account to: ", accounts[0]) })`

И “chainChanged”:

`window.ethereum.on('chainChanged',(chains) => { console.log("You switched chains to: ", chains[0]) })`

`ethereum.request`: Этот метод содержит RPC API MetaMask и открывает вызывающему его пользователю доступ к внешним методам сервера узла, подключенного к MetaMask. Он принимает один JSON-объект, содержащий внешний метод для вызова и его параметры (params).

```ts
window.ethereum.request({
	method: 'eth_sendTransaction',
	params: [
		{
			from: '0x21ab...', //sender address
			to: '0x1432ba...', //receiver address
			gas: '0x5208', //hex representation of 21000
			gasPrice: '0x9184e72a000', // hex of 1e13 wei
			value: '0xDE0B6B3A7640000', // hex for 1e18 wei or 1 Ether
		},
	],
});
```

## Вызов функции

Вызов функции смарт-контракта может быть осуществлен с помощью одного из RPC-методов MetaMask. Однако лучшим способом вызова функций и установления соединения с кошельком MetaMask и другими кошельками является использование пакетов библиотек web3, таких как web3modal и ether.js. Чтобы установить эти пакеты, выполните следующую команду в терминале:

`npm install --save web3modal ethers`

Мы будем вызывать функцию из базового смарт-контракта erc20 под названием “approve”. Эта функция смарт-контракта позволяет нам дать стороннему адресу разрешение на использование токенов erc20 от нашего имени. Но сначала давайте разберемся с ABI. Application Binary Interface (ABI) - это стандартный способ взаимодействия со смарт-контрактами в сети Ethereum.

ABI для функции “approve” выглядит как `function approve(address _spender, uint256 _value) public returns (bool success)`.

Теперь, когда у нас есть ABI, мы можем легко вызвать функцию с помощью установленных зависимостей web3modal и ethers.

Приведенный ниже код устанавливает безопасное соединение с MetaMask с помощью провайдера кэша из web3modal. Таким образом, каждый раз, когда страница обновляется, приложение остается подключенным к MetaMask. Безопасное соединение оборачивается в эфиры и используется для вызова подписанта транзакции (владельца кошелька MetaMask).

```ts
import Web3Modal from "web3modal";
import { ethers } from "ethers";

export const Approve = () => {
  const abi = [
    "function approve(address _spender, uint256 value) public returns (bool success)",
  ];
  const usdtAddress = "0xdac17f958d2ee523a2206206994597c13d831ec7";
  const thirdPartyAddress = "0xdac17f958d2ee523a2206206994597c13d831ec7";
  const web3Modal =
    typeof window !== "undefined" && new Web3Modal({ cacheProvider: true });

  async function handleApproveSubmit() {
    const connection = web3Modal && (await web3Modal.connect());
    const provider = new ethers.providers.Web3Provider(connection);
    const contract = new ethers.Contract(usdtAddress, abi, provider.getSigner());
    contract.approve(thirdPartyAddress, 20);
  }

  return <button onClick={handleApproveSubmit}>Approve</button>;
};
```

The `handleApproveSubmit()` function will open up MetaMask with a transaction to be signed.

Функция `handleApproveSubmit()` откроет MetaMask с транзакцией, которую нужно подписать.

Блока try-and-catch достаточно, чтобы перехватить все ошибки, возникающие при вызове функции смарт-контракта.

```ts
try {
	const connection = web3Modal && (await web3Modal.connect());
	const provider = new ethers.providers.Web3Provider(connection);
	const contract = new ethers.Contract(usdtAddress, abi, provider.getSigner());
	contract.approve(thirdPartyAddress, 20);
} catch (error) {
	console.log(error.message);
}
```

Однако он не может обнаружить ошибки в RPC MetaMask.

Чтобы отловить ошибки MetaMask, нужно добавить обещание после вызова функции. Это обещание ожидает хэш транзакции, которая будет транслироваться в блокчейн. Если транзакция транслируется успешно, выводим в консоль сообщение об успехе и хэш транзакции, если нет - выводим ошибку.

```ts
contract
	.approve(thirdPartyAddress, 20)
	.then((tx) => {
		return provider.waitForTransaction(tx.hash);
	})
	.then(() => {
		console.log('success');
		console.log(tx.hash);
	})
	.catch((error) => {
		console.log(error.message);
	});
```

Такой подход позволяет отловить все возможные ошибки RPC MetaMask, включая 4001: “User Denied Transaction Signature”.

## Заключение

С помощью подхода, описанного в этой статье, вы сможете более эффективно обрабатывать ошибки MetaMask в своем React-приложении. Этот подход также применим к другим кошелькам с аналогичными RPC, таким как TrustWallet, Exodus или MyEtherWallet(MEW).
