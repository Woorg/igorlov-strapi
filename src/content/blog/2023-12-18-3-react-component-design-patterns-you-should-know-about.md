---
title: '3 шаблона проектирования компонентов React, о которых вы должны знать'
meta_title: >-
  3 шаблона проектирования компонентов React, о которых вы должны знать | Игорь
  Горлов - Фронтeндер
description: >-
  React, пожалуй, самая популярная библиотека JavaScript для создания
  пользовательских интерфейсов, и одной из причин этого является ее
  беспристрастный характер.
date: 2023-12-18T00:00:00.000Z
categories:
  - Учебник
author: Игорь Горлов
type: blog
draft: false
slug: 3-shablona-proektyrovanyia-komponentov-react-o-kotor-kh-v-dolzhn-znat
tags:
  - React
image: >-
  ../../assets/images/3-shablona-proektyrovanyia-komponentov-react-o-kotor-kh-v-dolzhn-znat-Dec-18-2023.avif
lastmod: 2024-03-20T21:26:45.530Z
---

React, пожалуй, самая популярная библиотека JavaScript для создания пользовательских интерфейсов, и одной из причин этого является ее беспристрастный характер. Независимо от того, рассматриваете ли вы React как фреймворк или как библиотеку, можно согласиться с одним - это ее свободный подход к тому, как разработчики должны создавать приложения на React, что дает разработчикам и командам разработчиков свободу решать, как они хотят сделать свои приложения. Поработав над разными React-приложениями в разных командах и изучив другие созданные React-приложения, вы заметите несколько общих паттернов проектирования.

В этой статье мы рассмотрим три популярных паттерна проектирования для создания React-приложений.

## 1. Паттерн презентационных и контейнерных компонентов

Этот паттерн был придуман Дэном Абрамовым. В этом шаблоне компоненты делятся на:

Презентационные компоненты: Это компоненты, которые отвечают за внешний вид пользовательского интерфейса. Они не имеют зависимостей от какой-либо части приложения и используются для отображения данных. Примером может служить список:

```js
function ItemList(props) {
	return (
		<ul>
			{props.items.map(({ id, url, name }) => (
				<li key={id}>
					<a href={url}>{name}</a>
				</li>
			))}
		</ul>
	);
}
```

В приведенном выше примере наш компонент `ItemsList` отвечает только за отображение данных, переданных в качестве `props` , в пользовательском интерфейсе. Презентационные компоненты также называют функциональными компонентами без состояния, но они могут быть написаны как компоненты классов и могут содержать состояние, относящееся к пользовательскому интерфейсу

```js
class TextInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: '',
		};
	}

	handleChange = (event) => {
		this.setState({
			value: event.target.value,
		});
	};

	render() {
		return <input value={this.state.value} onChange={this.handleChange} />;
	}
}
```

В примере выше мы создали компонент класса Presentational, `TextInput` , отвечающий за управление его состоянием.

Компоненты-контейнеры: В отличие от презентационных компонентов, контейнерные компоненты в большей степени отвечают за то, как все работает. Обычно это компоненты класса, содержащие методы жизненного цикла и компоненты Presentational. В них также происходит выборка данных.

```js
class TvShowsContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			shows: [],
			loading: false,
			error: '',
		};
	}

	componentDidMount() {
		this.setState({
			loading: true,
			error: '',
		});

		fetch('https://api.tvmaze.com/schedule/web?date=2020-05-29')
			.then((res) => res.json())
			.then((data) =>
				this.setState({
					loading: false,
					shows: data,
				}),
			)
			.catch((error) =>
				this.setState({
					loading: false,
					error: error.message || error,
				}),
			);
	}

	render() {
		const { loading, error, shows } = this.state;

		return (
			<div>
				<h1> Tv Shows </h1> {loading && <p> Loading... </p>}{' '}
				{!loading && shows && <ItemsList items={shows} />} {!loading && error && <p> {error} </p>}{' '}
			</div>
		);
	}
}
```

Мы создали компонент `TvShowsContainer` , который получает данные из API, когда компонент монтируется в приведенном выше примере. Он также передает эти данные презентационному компоненту `ItemsList` , который мы создали ранее. Преимуществом этого паттерна является разделение проблем и возможность повторного использования компонентов. Другие компоненты Container могут повторно использовать презентационный компонент `ItemList` для отображения данных, поскольку он не связан жестко с `TvShowsListContainer` . Рабочее приложение можно посмотреть здесь.

Обратите внимание, что Дэн также упоминает, что он больше не продвигает этот паттерн, поскольку изменил свое мнение по этому вопросу с момента его появления. Тем не менее, вы можете найти его полезным для своего конкретного случая, поэтому я счел нужным упомянуть его в этом списке.

## 2. Паттерн провайдера

Одна из основных проблем, с которой сталкиваются разработчики React, - это Prop drilling. Prop drilling - это сценарий, в котором данные (props) передаются в различные компоненты, пока не попадут в тот компонент, где они нужны. Хотя prop-drilling не так уж плох, он становится проблемой, когда несвязанные компоненты совместно используют данные, что приводит нас к паттерну Provider. Паттерн Provider позволяет нам хранить данные в центральном месте, например, в объекте React Context или в хранилище Redux. Затем поставщик/хранилище контекста может передавать эти данные любому компоненту, которому они нужны, напрямую, без использования реквизитов.

Представьте, что в веб-приложении реализован темный режим, а несвязанные компоненты реагируют на смену темы, вызванную другим компонентом. Мы можем добиться этого, используя паттерн Provider. Мы создаем объект React context для хранения значения темы.

```js
import { createContext } from 'react';

const ThemeContext = createContext({
	theme: 'light',
	setTheme: () => {},
});

export default ThemeContext;
```

В файле App.js мы оборачиваем импортируемые компоненты с помощью ThemeContext. Provider. Это дает различным компонентам и их дочерним элементам доступ к созданному объекту Context

```js
import React, { useState, useMemo } from 'react';
import Header from './Header';
import Main from './Main';
import ThemeContext from './context';
import './styles.css';

export default function App() {
	const [theme, setTheme] = useState('');
	const value = useMemo(
		() => ({
			theme,
			setTheme,
		}),
		[theme],
	);

	return (
		<ThemeContext.Provider value={value}>
			<div className="container">
				<Header />
				<Main />
			</div>{' '}
		</ThemeContext.Provider>
	);
}
```

По умолчанию ThemeContext является stateless и не может быть обновлен. Чтобы решить эту проблему, мы можем подключить `ThemeContext` к состоянию и предоставить функцию обновления в `ThemeContext` для изменения состояния.

Чтобы получить доступ к `ThemeContext` в компонентах, мы можем воспользоваться хуком useContext, представленным в React 16.9

```js
import {
    useContext
} from "react";
import ThemeContext from "./context";

const Header = () => {
    const {
        theme,
        setTheme
    } = useContext(ThemeContext);

    const toggleTheme = () => {
        if (theme === "dark") {
            setTheme("");
            return;
        }
        setTheme("dark");
        return;
    };

    return ( <
        header className = {
            theme === "dark" && "dark"
        } >
        <
        h1 > Тв - шоу < /h1> <
        button onClick = {
            toggleTheme
        } > Toggle Theme < /button> <
        /header>
    );
};

export default Header;

import {
    useContext
} from "react";
import ThemeContext from "./context";

const Main = () => {
    const {
        theme
    } = useContext(ThemeContext);

    return ( <
        main className = {
            theme === "dark" && "dark"
        } >
        <
        h2 > {
            ""
        } {
            theme === "dark" ? "Включена темная тема" : "Включена светлая тема"
        } <
        /h2> <
        /main>
    );
};

export default Main;
```

Хотя Context упрощает передачу данных между компонентами, рекомендуется использовать этот подход осторожно, поскольку он затрудняет повторное использование компонентов. Рабочее приложение приведенного выше примера можно посмотреть здесь. Шаблон Provider используется в React Router и React-Redux.

## 3. Паттерн составных компонентов

Составные компоненты - это компоненты, которые имеют общее состояние и работают вместе для достижения общей цели. Примером могут служить элементы HTML `<select>` и `<option>` . В сочетании они создают выпадающее меню, но сами по себе они мало чего достигают.

Шаблон Compound Components используется в популярных библиотеках React UI, например, Ant Design и Material UI. Ниже приведена реализация компонента Menu в Material UI

```js
import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function MaterialMenu() {
	return (
		<div>
			<Button> Menu </Button>{' '}
			<Menu>
				<MenuItem> Profile </MenuItem> <MenuItem> My account </MenuItem>{' '}
				<MenuItem> Logout </MenuItem>{' '}
			</Menu>{' '}
		</div>
	);
}
```

Без составных компонентов нам пришлось бы передавать реквизиты родительскому компоненту, а затем родительский компонент передавал бы данные дочерним компонентам

`<Элементы меню={['Профиль','Мой аккаунт','Выход']} />`

Вышеописанное выглядит просто, но у нас начинаются проблемы с передачей большего количества реквизитов дочернему компоненту. Например, представьте, что нам нужен выбранный по умолчанию пункт меню

`<Пункты меню={['Профиль','Мой аккаунт','Выход']} defaultSelected={1} />`

По мере увеличения количества требований компонент начинает становиться беспорядочным и непригодным для использования. Шаблон составного компонента обеспечивает более чистый способ достижения этой цели.

Существует два способа создания компонента React с использованием паттерна составного компонента:

### `React.cloneElement` React Context

В примере ниже я буду использовать подход React Context

```js
import React, { createContext, useState, useCallback, useMemo, useContext } from 'react';
import './styles.css';

const MenuContext = createContext();

const Menu = ({ children, defaultSelected }) => {
	const [selectedItem, setSelectedItem] = useState(defaultSelected);

	const toggleSelectedItem = useCallback(
		(item) => {
			if (item !== selectedItem) {
				setSelectedItem(item);
				return;
			}
			setSelectedItem('');
		},
		[selectedItem, setSelectedItem],
	);

	const value = useMemo(
		() => ({
			toggleSelectedItem,
			selectedItem,
		}),
		[toggleSelectedItem, selectedItem],
	);

	return (
		<MenuContext.Provider value={value}>
			<menu className="menu"> {children} </menu>{' '}
		</MenuContext.Provider>
	);
};
```

Мы создали объект контекста `MenuContext` для компонента `Menu` с помощью функции `createContext` , предоставляемой React Context API. Он будет хранить общее состояние для компонентов `Menu` и `MenuItem` . Мы также создали состояние для выбранного пункта меню. Это позволит нам обновлять контекст аналогично тому, как мы делали это в паттерне Provider, поскольку Context API по своей конструкции не имеет состояния.

Следующим шагом будет создание компонента MenuItem.

```js
const useMenuContext = () => {
	const context = useContext(MenuContext);

	if (!context) {
		throw new Error('Компонент пункта меню не может быть использован вне компонента Menu.');
	}

	return context;
};

const MenuItem = ({ value, children }) => {
	const { toggleSelectedItem, selectedItem } = useMenuContext();

	return (
		<button
			onClick={() => toggleSelectedItem(value)}
			id={`${value}-menu-item`}
			className={`menu__item ${selectedItem === value && 'active'}`}
		>
			{children}{' '}
		</button>
	);
};
```

Первое, что здесь делается, это создание cuстом хук useMenuContext для проверки, не используется ли MenuItem вне компонента Menu, и выброса ошибки в этом случае. После этого мы создаем наш MenuItem, используя общее состояние с компонентом Menu, чтобы определить, какой стиль применить к выбранному MenuItem, и изменить выбранный элемент при щелчке на пункте меню.

В завершение мы соединяем эти компоненты вместе в компоненте App

```js
export default function App() {
	return (
		<Menu defaultSelected="My account">
			<MenuItem value="Profile">Profile</MenuItem>
			<MenuItem value="My account">My account</MenuItem>
			<MenuItem value="Logout">Logout</MenuItem>
		</Menu>
	);
}
```

## Заключение

В этой статье мы рассмотрели различные паттерны проектирования, которые можно использовать при создании расширяемых и многократно используемых компонентов React. Хотя этот список не является исчерпывающим, он применим к большинству проблем, с которыми вы, вероятно, столкнетесь при создании компонентов.
