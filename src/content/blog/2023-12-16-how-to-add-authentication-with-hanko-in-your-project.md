---
title: Как добавить аутентификацию с помощью HANKO в свой проект?
meta_title: >-
  Как добавить аутентификацию с помощью HANKO в свой проект? | Игорь Горлов -
  Фронтeндер
description: "Добро пожаловать \U0001F44B в этот блог. В этом блоге мы узнаем, как интегрировать аутентификацию Hanko в ваше приложение. В этом блоге я использую проект Image, код к"
date: 2023-12-16T00:00:00.000Z
categories:
  - Как закодить
author: Игорь Горлов
draft: false
slug: kak-dobavyt-autentyfykatsyiu-s-pomoschiu-hanko-v-svoi-proekt
tags:
  - HANKO
  - Auth
image: >-
  ../../assets/images/kak-dobavyt-autentyfykatsyiu-s-pomoschiu-hanko-v-svoi-proekt-Dec-16-2023.avif
lastmod: 2024-03-20T21:26:46.824Z
---

Добро пожаловать 👋 в этот блог. В этом блоге мы узнаем, как интегрировать аутентификацию Hanko в ваше приложение. В этом блоге я использую проект Image, код которого можно найти здесь.

## Структура файла репозитория

Это проект `ReactJS`, созданный с помощью

`project-directory/ │ ├──── public/ │ ├──── favicon.ico │ ├──── index.html │ ├──── logo192.png │ ├──── logo512.png │ ├──── manifest.json │ ├──── robots.txt │ ├──── src/ │ │ │ ├──── components/ │ │ ├──── HankoAuth.jsx │ │ ├──── Header.jsx │ │ ├──── Hero.jsx │ │ ├──── HighlightTextHero.jsx │ │ ├──── List.jsx │ │ ├──── MainDrawer.jsx │ │ │ ├──── config/ │ │ ├──── config.js │ │ │ ├──── pages/ │ │ ├──── AboutUsPage.jsx │ │ ├──── AuthPage.jsx │ │ ├──── ContactUsPage.jsx │ │ ├──── HelpAndSupport.jsx │ │ ├──── IndexPage.jsx │ │ │ ... ...`.

App.jsx

Это код `App.jsx`.

```js
import './App.css'; import { ChakraProvider } from '@chakra-ui/react' import IndexPage from './pages/IndexPage'; import AboutUsPage from './pages/AboutUsPage'; import HelpAndSupport from './pages/HelpAndSupport'; import { BrowserRouter, Routes, Route } from "react-router-dom"; import ContactUsPage from './pages/ContactUsPage'; import List from './components/List'; function App() { return ( <ChakraProvider> <BrowserRouter> <Routes> <Route path="https://dev.to/" element={<IndexPage />} /> <Route path="/help&support" element={<HelpAndSupport />} /> <Route path="/aboutus" element={<AboutUsPage />} /> <Route path="/contactus" element={<ContactUsPage />} /> <Route path="/list" element={<List />} /> </Routes> </BrowserRouter> </ChakraProvider> ) } export default App;
```

Для создания компонента аутентификации у нас есть `HankoAuth.jsx`.

Код выглядит следующим образом

```js
import { useEffect } from 'react';
import { register } from '@teamhanko/hanko-elements';
import { useNavigate } from 'react-router-dom';

const apiKey = process.env.REACT_APP_KEY;

export default function HankoAuth() {
	const navigate = useNavigate();

	useEffect(() => {
		// Register with Hanko API
		register(apiKey)
			.catch(() => {
				// Handle error
			})
			.then(() => {
				// Handle registration
				navigate('/');
			});
	}, []);

	return (
		<div className="flex min-h-screen items-center justify-center">
			<hanko-auth />
		</div>
	);
}
```

Вы можете получить свой `hankoApi`, войдя в облачную консоль Hanko.

## Пора интегрировать в ваше приложение

Вот код `IndexPage` или `MainPage`.

```js
import React, { useState, useEffect } from "react"; import MainDrawer from "../components/MainDrawer"; import Hero from "../components/Hero"; import Header from "../components/Header"; import HankoAuth from "../components/HankoAuth"; import userId from "./config/config.js" function IndexPage() { const [user, setUser] = useState(null); useEffect(() => { if (userId !== null) { setUser(userId); } }, [userId]); return ( <> <Header setUser={setUser} /> {!user && <HankoAuth />} {user && <> <MainDrawer /> <Hero /> </>}  </> ) } export default IndexPage;
```

Эти блоки кода в основном отвечают за условный рендеринг компонентов аутентификации.

`{!user && <HankoAuth />} {user && <> <MainDrawer /> <Hero /> </>}`

Как получить данные вошедшего в систему `пользователя`

Эта логика реализована в `config.js`. Мы можем получить данные пользователя, используя `SDK`.  
Читать далее

```js
import { Hanko } from '@teamhanko/hanko-elements';
let userId = null;
const hankoApi = process.env.REACT_APP_KEY;
const hanko = new Hanko(hankoApi);
try {
	const { id } = await hanko.user.getCurrent();
	if (id) {
		userId = id;
	}
} catch (error) {
	console.error('Произошла ошибка при получении данных о пользователе:', error);
}
export default userId;
```

Вот как мы можем интегрировать Hanko Auth в наше веб-приложение.

У вас получилось 🤩

Вы узнали, как интегрировать Hanko Auth в ваше веб-приложение. Спасибо, что дочитали до конца. Если у вас есть какие-либо отзывы, раздел комментариев в вашем распоряжении. Если вы считаете этот блог полезным, вы можете завести этот репозиторий и связаться со мной.
