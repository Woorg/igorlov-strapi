---
title: Создание приложения React Native для переключения тем
meta_title: |
  Создание Приложения React Native Для Переключения Тем -...
description: >
  Почти каждый веб-сайт и мобильное приложение теперь включают темный режим или
  альтернативную цветовую схему по умолчанию. Цветовые схемы предоставляют...
date: 2023-10-27T01:05:14.466Z
image: >-
  ../../assets/images/sozdanie-prilozheniya-react-native-dlya-pereklyucheniya-tem-Oct-27-2023.avif
categories:
  - Как закодить
author: Igor Gorlov
tags:
  - React Native
draft: false
keywords:
  - React Native
type: blog
slug: sozdanie-prilozheniya-react-native-dlya-pereklyucheniya-tem
lastmod: 2024-03-20T21:26:44.574Z
---

Почти каждый веб-сайт и мобильное приложение теперь включают темный режим или альтернативную цветовую схему по умолчанию. Цветовые схемы предоставляют пользователям возможность выбирать дизайн приложения по своему усмотрению. Когда такая опция недоступна, это может разочаровать пользователей.

Цветовые схемы также помогают нам, разработчикам, проектировать для предпочтений каждого пользователя, то есть разрабатывать для пользователей, предпочитающих светлый или темный режим.

В этой статье мы не будем углубляться в дизайн и выбор цветов. Вместо этого мы сосредоточимся только на том, как реализовать переключатель тем в приложении React Native. Это означает переключение между светлым, темным и системным режимами, то есть цветовой схемой мобильного устройства.

Таким образом, наш акцент будет скорее на фрагментах кода и объяснениях вместе с их результатами. Мы рассмотрим:

Вы можете ознакомиться с полным кодом нашего демонстрационного приложения на GitLab.

## Настройка проекта с использованием expo

Если вы предпочитаете разрабатывать приложения React Native с использованием Expo и собираетесь следовать этому учебнику с такой настройкой, вам придется внести небольшие изменения в ваш файл app.json.

В вашем файле app.json добавьте следующие строки;

```json
{
	"expo": {
		"userInterfaceStyle": "automatic",
		"ios": {
			"userInterfaceStyle": "automatic"
		},
		"android": {
			"userInterfaceStyle": "automatic"
		}
	}
}
```

По умолчанию установлен стиль <code>light</code>, поэтому наша цветовая схема всегда будет возвращать тему <code>light</code>. Вы можете изменить это на <code>automatic</code>, как показано выше, чтобы адаптироваться как к темной, так и к светлой теме. Это позволяет нам динамически получать цветовую схему нашего устройства.

## Понимание Hook useColorScheme

Прежде чем мы начнем создавать наш переключатель тем, важно ознакомиться с Hook, с которым мы часто будем сталкиваться и использовать при реализации: <code>useColorScheme</code>.

<code>useColorScheme</code> - это Hook React Native, который позволяет нам подписываться на обновления различных цветовых схем. По сути, он предоставляет доступ к цветовой схеме устройства, которая может быть светлой или темной. Он возвращает значение, которое показывает текущую цветовую схему, предпочитаемую пользователем.

Рассмотрим следующий код:

```javascript
/* App.js */

import React from 'react';
import { Text, StyleSheet, useColorScheme, View } from 'react-native';

const App = () => {
	const colorScheme = useColorScheme();
	return (
		<View style={styles.container}>
			<Text>Current Color Scheme: {colorScheme}</Text>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
export default App;
```

Вывод будет отображать текущую цветовую схему. Например, в моем выводе показана темная цветовая схема, потому что это моя предпочтительная системная тема:

<!-- wp:image {"align":"center","id":176007} -->
<figure class="wp-block-image aligncenter"><img src="http://blog.logrocket.com/wp-content/uploads/2023/08/img1-Current-system-theme-output-dark-mode.jpeg?is-pending-load=1" alt="Экран мобильного устройства с темным режимом и белым текстом, описывающим текущую системную тему как темный режим" class="wp-image-176007"/></figure>
<!-- /wp:image -->

Если ваше устройство находится в светлом режиме, то в вашем выводе будет показана светлая цветовая схема.

## Оформление текста в соответствии с цветовой схемой

С помощью значения, возвращаемого <code>useColorScheme</code>, мы можем проектировать при выборе пользователя темного или светлого режима. Давайте рассмотрим следующий фрагмент кода:

```javascript
/* App.js */

import React from 'react';
import { Text, StyleSheet, useColorScheme, View } from 'react-native';

const App = () => {
	const colorScheme = useColorScheme();

	return (
		<View style={styles.container}>
			<Text
				style={{
					color: colorScheme === 'light' ? '#000' : '#fff',
				}}
			>
				Current Color Scheme: {colorScheme}
			</Text>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
export default App;
```

В приведенном выше коде мы оформляем наш текст в соответствии с цветовой схемой. Когда пользователи выбирают темный режим, мы оформляем текст белым цветом, чтобы он был виден в темном режиме. Напротив, мы оформляем текст черным цветом, когда пользователи находятся в светлом режиме.

Мы также можем использовать объект <code>Color</code>, предоставляемый <code>react-native/Libraries/NewAppScreen</code>, чтобы оформить наш текст. <code>NewAppScreen</code> - это компонент по умолчанию, который предоставляет нам React Native в качестве отправной точки для создания наших экранов. Он функционирует как шаблон и может использоваться, как показано ниже:

```javascript
/* App.js */

import React from 'react';
import { Text, StyleSheet, useColorScheme, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const App = () => {
	const colorScheme = useColorScheme();
	const color = colorScheme === 'light' ? Colors.darker : Colors.lighter;

	return (
		<View style={styles.container}>
			<Text style={{ color: color }}>Current Color Scheme: {colorScheme}</Text>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
export default App;
```

В приведенном выше коде мы импортировали модуль <code>NewAppScreen</code>. Используя объект <code>Color</code>, который имеет набор предопределенных значений или <code>Colors</code>, мы назначаем цвет текста <code>lighter</code>, когда пользователь находится в темном режиме, и цвет <code>darker</code>, когда пользователь выбирает светлый режим:

<!-- wp:image {"align":"center","id":176007} -->
<figure class="wp-block-image aligncenter"><img src="http://blog.logrocket.com/wp-content/uploads/2023/08/img1-Current-system-theme-output-dark-mode.jpeg?is-pending-load=1" alt="Экран мобильного устройства с темным режимом и белым текстом, описывающим текущую системную тему как темный режим" class="wp-image-176007"/></figure>
<!-- /wp:image -->

Если мы изменим тему устройства на светлый режим, наш вывод будет выглядеть следующим образом:

<figure class="wp-block-image aligncenter"><img src="http://blog.logrocket.com/wp-content/uploads/2023/08/img2-Color-scheme-switched-light.jpeg?is-pending-load=1" alt="Экран мобильного устройства с светлым режимом и черным текстом, описывающим текущую системную тему как светлый режим" class="wp-image-176008"/></figure>

## Переключение между светлой и темной темами динамически

До сих пор мы изучили, как проверить текущий режим или цветовую схему нашего устройства. Мы также кратко рассмотрели, как использовать возвращаемое значение Hook <code>useColorScheme</code> для стилизации нашего приложения соответственно.

В этом разделе мы рассмотрим, как динамически переключаться между темами и как сохранять текущее состояние нашей темы.

Сначала давайте установим пакет <code>async-storage</code>. Этот пакет позволяет нам сохранять JSON-строки в локальном хранилище устройства. Он работает аналогично локальному хранилищу, сеансовому хранилищу и куки в Интернете:

```bash
/* npm */
npm install @react-native-async-storage/async-storage

/* yarn */
yarn add @react-native-async-storage/async-storage

/* expo */
npx expo install @react-native-async-storage/async-storage

```

В файле <code>App.js</code> скопируйте и вставьте следующий код:

```javascript
/* App.js */

import React from 'react';
import Home from './src/Home';
import { ThemeProvider } from './context/ThemeContext';

const App = () => {
	return (
		<ThemeProvider>
			<Home />
		</ThemeProvider>
	);
};
export default App;
```

В приведенном выше коде мы импортировали два компонента - <code>ThemeContext</code> и <code>Home</code>. Наш компонент <code>ThemeContext</code> будет содержать контекст нашей темы и текущее состояние, а <code>Home</code> будет нашей домашней страницей.

Мы оборачиваем страницу <code>Home</code> в <code>ThemeContext</code>, потому что мы хотим, чтобы темы были доступны для остальной части приложения.

## Создание нашего context для управления темой

Затем создайте папку с именем <code>context</code>. Внутри этой папки создайте файл с именем <code>ThemeContext.js</code> с следующим кодом:

```javascript
/* context/ThemeContext.js */

import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState('light');

	useEffect(() => {
		// Load saved theme from storage
		const getTheme = async () => {
			try {
				const savedTheme = await AsyncStorage.getItem('theme');
				if (savedTheme) {
					setTheme(savedTheme);
				}
			} catch (error) {
				console.log('Error loading theme:', error);
			}
		};
		getTheme();
	}, []);

	const toggleTheme = (newTheme) => {
		setTheme(newTheme);
		AsyncStorage.setItem('theme', newTheme);
	};

	return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};
export default ThemeContext;
```

Мы управляем нашим состоянием и сохраняем текущее значение состояния в файле <code>ThemeContext.js</code> с использованием <code>async-storage</code>. Поскольку строки, переданные в локальное хранилище, остаются неизменными, пока не будут изменены или удалены, мы всегда можем извлечь последнее сохраненное значение и установить его как текущее состояние темы, как показано в приведенном выше коде.

Наконец, мы передаем наше состояние темы и функцию <code>toggleTheme</code> в <code>ThemeContext.Provider</code>. Это делает его доступным для остальной части приложения, так что мы можем вызывать функцию <code>toggleTheme</code> для выполнения наших переключений.

## Извлечение и переключение темы с использованием компонента button

Далее давайте создадим файл <code>Home.js</code> и скопируем в него следующий код:

```javascript
/* Home */

import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ThemeContext from '../context/ThemeContext';

const Home = () => {
	const { theme, toggleTheme } = useContext(ThemeContext);

	const handleToggleTheme = () => {
		const newTheme = theme === 'light' ? 'dark' : 'light';
		toggleTheme(newTheme);
	};

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			alignItems: 'center',
			justifyContent: 'center',
			backgroundColor: theme === 'dark' ? 'black' : 'white',
		},
		text: {
			color: theme === 'dark' ? 'white' : 'black',
		},
		button: {
			color: theme === 'dark' ? 'black' : 'white',
		},
	});

	return (
		<View style={styles.container}>
			<Text style={styles.text}>Home page</Text>
			<TouchableOpacity
				onPress={handleToggleTheme}
				style={{
					marginTop: 10,
					paddingVertical: 5,
					paddingHorizontal: 10,
					backgroundColor: theme === 'dark' ? '#fff' : '#000',
				}}
			>
				<Text style={styles.button}>Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme</Text>
			</TouchableOpacity>
		</View>
	);
};
export default Home;
```

В коде выше мы извлекаем значение <code>theme</code> и функцию <code>toggleTheme</code>, которые мы передали в наше API контекста. Используя возвращенное значение, мы можем стилизовать наши дизайны страниц в зависимости от значения <code>theme</code>. Мы также передаем нашу функцию <code>toggleTheme</code> в компонент <code>button</code>.

Вывод будет выглядеть следующим образом:

<!-- wp:image {"align":"center","id":176009} -->
<figure class="wp-block-image aligncenter"><img src="http://blog.logrocket.com/wp-content/uploads/2023/08/img3-Пользователь-переключает-кнопку-светлой-и-темной-тем.gif?is-pending-load=1" alt="Экран мобильного устройства, отображающий темный режим с белым текстом на главной странице над кнопкой для переключения на светлую тему. Пользователь показан переключающим кнопку, затем отображается светлый режим с черным текстом на главной странице над кнопкой для переключения на темную тему" class="wp-image-176009"/></figure>
<!-- /wp:image -->

## Автоматическое адаптирование темы приложения к настройкам системы

Мы увидели, как переключаться между темами, в частности, между светлой и темной темами. Последний шаг - обнаружить цветовую схему системы и точно переключить тему приложения соответственно.

Это означает, что если ваше мобильное устройство находится в светлом режиме, тема приложения также будет в светлом режиме. Затем, если вы переключите свою систему или мобильное устройство в темный режим, приложение автоматически адаптирует свое состояние темы к темной теме. Мы также обсудим сохранение состояния.

Для этого мы модифицируем код, который у нас уже есть выше. В файле <code>ThemeContext.js</code> скопируйте и вставьте следующий код:

```javascript
/* ThemeContext */

import React, { createContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
	const colorScheme = useColorScheme();
	const [theme, setTheme] = useState(colorScheme || 'light');

	useEffect(() => {
		// Load saved theme from storage
		const getTheme = async () => {
			try {
				const savedTheme = await AsyncStorage.getItem('theme');
				if (savedTheme) {
					setTheme(savedTheme);
				}
			} catch (error) {
				console.log('Error loading theme:', error);
			}
		};
		getTheme();
	}, []);

	useEffect(() => {
		// set theme to system selected theme
		if (colorScheme) {
			setTheme(colorScheme);
		}
	}, [colorScheme]);

	const toggleTheme = (newTheme) => {
		setTheme(newTheme);
		// Save selected theme to storage
		AsyncStorage.setItem('theme', newTheme);
	};

	return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};
export default ThemeContext;
```

В приведенном выше коде, когда мы выбираем тему, мы также сохраняем ее в нашем локальном хранилище. Это означает, что при загрузке нашего приложения мы можем проверить, существует ли уже тема в нашем локальном хранилище. Если существует, то устанавливаем эту тему в качестве предпочтительной. В противном случае мы не устанавливаем никакой темы.

В итоге приложение для переключения темы в React Native будет выглядеть следующим образом:

<!-- wp:image {"align":"center","id":176010} -->
<figure class="wp-block-image aligncenter"><img src="http://blog.logrocket.com/wp-content/uploads/2023/08/img4-User-toggling-device-system-theme-show-app-theme-changes-automatically-match.gif?is-pending-load=1" alt="Пользователь показан, как переключает тему системы устройства в настройках между светлым и темным режимами и как тема приложения автоматически меняется, чтобы соответствовать" class="wp-image-176010"/></figure>
<!-- /wp:image -->

В некоторых сценариях мы можем захотеть предоставить пользователям несколько вариантов тем, таких как:

- Темная тема
- Светлая тема
- Системная тема

Например, некоторые пользователи могут использовать светлую тему для своих мобильных устройств, но им может быть удобнее их приложение использовать с темной темой. В этом случае мы не хотим использовать светлую тему системы для приложения. Вместо этого мы хотим указать темную тему.

Для этого скопируйте следующий код в ваш файл <code>ThemeContext.js</code>:

```javascript
/* ThemeContext.js */

  ....

  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
    AsyncStorage.setItem('theme', newTheme); // Save selected theme to storage
  };

  const useSystemTheme = () => {
    setTheme(colorScheme);
    AsyncStorage.setItem('theme', colorScheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, useSystemTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
export default ThemeContext;
```

Первая функция позволяет нам переключаться между темными и светлыми темами, как мы видели в других примерах. Вторая функция позволяет нам использовать системную или тему по умолчанию устройства — мы устанавливаем нашу тему такой, какой она есть на устройстве в данный момент.

Затем в вашем файле <code>Home.js</code> мы создадим три кнопки для выбора каждой темы. Вот код:

```javascript
/*Home.js*/

....imports....

const Home = () => {
  const systemTheme = useColorScheme();
  const { theme, toggleTheme, useSystemTheme } = useContext(ThemeContext);

const styles = StyleSheet.create({
  ......
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Current Theme: {theme}</Text>
      <Text style={styles.text}>System Theme: {systemTheme}</Text>
      <TouchableOpacity
        onPress={() => toggleTheme('light')}
        style={{
          marginTop: 10,
          paddingVertical: 5,
          paddingHorizontal: 10,
          backgroundColor: theme === 'dark' ? '#fff' : '#000',
        }}
      >
        <Text style={styles.button}>Light Theme</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => toggleTheme('dark')}
        style={{
          marginTop: 20,
          paddingVertical: 5,
          paddingHorizontal: 10,
          backgroundColor: theme === 'dark' ? '#fff' : '#000',
        }}
      >
        <Text style={styles.button}>Dark Theme</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => useSystemTheme()}
        style={{
          marginTop: 20,
          paddingVertical: 5,
          paddingHorizontal: 10,
          backgroundColor: theme === 'dark' ? '#fff' : '#000',
        }}
      >
        <Text style={styles.button}>System Theme</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Home;
```

С этими тремя кнопками мы можем выбирать любую тему. Код выше также позволяет нам видеть текущую тему нашего приложения — другими словами, тему, которую мы выбрали в данный момент — а также тему системы, которая может отличаться от текущей темы.

С этим мы можем либо выбрать использовать тему системы автоматически, либо выбрать другую тему для нашего приложения:

<!-- wp:image {"align":"center","id":176011} -->
<figure class="wp-block-image aligncenter"><img src="http://blog.logrocket.com/wp-content/uploads/2023/08/img5-Three-buttons-light-dark-system-theme-output-displaying-current-theme-system-theme-persist-close-app.gif?is-pending-load=1" alt="Экран мобильного приложения, на котором отображается текст, описывающий тему приложения и тему системы выше трех стопок кнопок для переключения между светлой темой, темной темой и совпадающей с темой системы. Показано, как пользователь выходит из приложения, чтобы показать, что выбранное состояние сохраняется после закрытия приложения" class="wp-image-176011"/></figure>
<!-- /wp:image -->

Как видите, наша выбранная тема будет сохраняться даже после закрытия и повторного открытия приложения.

## Заключение

В этой статье мы увидели, как реализовать функцию переключения, сохранить состояние каждого выбора и переключиться между темами на основе выбора пользователя по системе.

Переключение между темами — это обычная функция в разработке приложений сегодня. Предоставление пользователям выбора их предпочтительной темы и сохранение ее даже после закрытия приложения улучшает пользовательский опыт и делает ваше приложение более привлекательным.

Полный [код проекта доступен на GitLab](https://gitlab.com/Vic-Orlands/react-native-theme-changer). Если у вас остались вопросы, не стесняйтесь задавать их ниже. В противном случае, до следующей статьи, пока!
