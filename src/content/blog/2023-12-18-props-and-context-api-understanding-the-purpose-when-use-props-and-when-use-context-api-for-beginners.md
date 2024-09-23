---
title: >-
  Props и Context API - понимание цели - когда использовать props и когда
  использовать context api : Для начинающих
meta_title: >-
  Props и Context API - понимание цели - когда использовать props и когда
  использовать context api : Для начинающих | Игорь Горлов - Fullstack Developer
description: >-
  Props и Context API  это механизмы для управления состоянием. Оба могут
  использоваться для манипулирования, организации и обмена данными в приложении
  React. О
date: 2023-12-18T00:00:00.000Z
categories:
  - Учебник
author: Игорь Горлов
draft: false
slug: >-
  props-y-context-api-ponymanye-tsely-kohda-yspolzovat-props-y-kohda-yspolzovat-context-api-dlia-nachynaiuschykh
translatedPosition: 32
tags:
  - React
image: >-
  ../../assets/images/props-y-context-api-ponymanye-tsely-kohda-yspolzovat-props-y-kohda-yspolzovat-context-api-dlia-nachynaiuschykh-Dec-18-2023.avif
lastmod: 2024-03-20T21:26:43.855Z
---

Props и Context API - это механизмы для управления состоянием. Оба могут использоваться для манипулирования, организации и обмена данными в приложении React. Однако новичкам часто трудно определить, какой метод управления состоянием им следует использовать. Цель этого поста - не научить использовать Context API или props, а понять назначение каждого из них.

Ниже приведены два подхода к обмену и изменению состояния с использованием реквизитов и Context API. Основываясь на этих подходах, я интерпретировал решения и определил ограничения каждого механизма, что позволило мне сделать вывод о назначении каждого из них.

## 1. Через props

```ts
// App.js component - this is the parent component
import React, { useState } from 'react';  // Importing the Button component
import Button from './components/Button';

function App() {
    const [name, setName] = useState('Antonio Marques'); // Define the state for 'name'

    // This function will change the state of 'name' based on its current value
    const toggleName = () => setName( name === 'Antonio Marques' ? 'Mario Pollo' : 'Antonio Marques' );

    return (
        <div>
            {/* Interpolation to display the 'name' */}
            Hello: {name}
            {/* Render the Button component and pass the 'toggleName' function as a prop */}
            <Button toggleName={toggleName} name={name}/>
        </div>
    );
}

export default App;
```

```ts
// Button component (Button.js) - this is the child component
export default function Button({ toggleName }) {
  return (
    <>
      {/* This button receives the function handleChangeName as a prop and triggers a change in the 'name' state */}
      <button onClick={toggleName}> toggle Name </button>
    </>
  );
}
```

## 3. Через контекстный API

```ts
// Context.js - Context API component

// Importing the necessary elements to create our context API
import React, { createContext, useContext, useState } from 'react';

// Creating the context with default values
const NameContext = createContext({ name: '', setName: () => '' });

export const NameProvider = ({ children }) => {
  // Initializing the name state
  const [name, setName] = useState('Antonio Marques');
  return (
    <NameContext.Provider value={{ name, setName }}>
      {children}
    </NameContext.Provider>
  );
}

// Hook to access the name context
export const useNameContext = () => useContext(NameContext);
```

```ts
// index.js - Entry point of the application
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Importing the 'NameProvider' context provider from the './context/Context' file
import { NameProvider } from './context/Context';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendering the App component within the context of NameProvider and under StrictMode
root.render(
  <React.StrictMode>
    <NameProvider>
      <App />
    </NameProvider>
  </React.StrictMode>
);

reportWebVitals();
```

```ts
// App.js - Main component of the application

// Importing the useNameContext function from the './context/Context' file
import { useNameContext } from './context/Context';

// Importing the Button component from the './components/Button' file
import Button from './components/Button';

function App() {
  // Using the useNameContext function to get the name context
  const { name } = useNameContext();

  return (
    <div>
      {/* Displaying the 'name' */}
      Hello: {name && (name)}
      <Button/>
    </div>
  );
}

export default App;
```

```ts
// Button.js - Child component that interacts with the context
/* Importing the useNameContext function from the '../context/Context' file */
import { useNameContext } from '../context/Context';

export default function Button() {
  /* Using the useNameContext function to get the name context */
  const { name, setName } = useNameContext();

  // Function to change the name based on its current value
  const toogleName = () => setName(name === 'Antonio Marques' ? 'Mario Pollo' : 'Antonio Marques');

  return (
    /* Button that, when clicked, triggers the toogleName function. This function is responsible for changing the name based on its logic. */
    <button onClick={toogleName}> Change name </button>
  )
}
```

В представленных кодах рассматривается конкретный сценарий: необходимо изменить состояние ‘name’, отображаемого в компоненте App.js, через взаимодействие с кнопкой, содержащейся в дочернем компоненте Button.js.

Анализируя оба подхода, на первый взгляд видно, что визуально код, использующий механизм реквизитов, проще, чем код, использующий Context API. Давайте разберемся в этом подробнее:

## через реквизиты:

Код включает в себя всего два файла, App.js (родительский) и Button.js (дочерний). Кроме того, чтобы изменить состояние ‘name’ через действие клика по кнопке, необходимо было создать функцию в App.js и передать ее в Button.js через props.

## через контекстный API:

В этом случае код пошел еще дальше. Вместо того чтобы работать только с двумя файлами (App.js - родительский и Button.js - дочерний), пришлось создать третий файл, context.js. Он включает в себя другие файлы, которые отображают их данные, и в данном случае это App.js. Используя Context API, компоненты могут легко получить доступ к ‘name’ и ‘setName’, что позволяет легко манипулировать данными и изменять состояние.

Чтобы проиллюстрировать немного более сложную проблему, давайте создадим дочерний компонент для Button.js, где сам Button.js является дочерним компонентом app.js. На этот раз задача состоит в том, чтобы дочерний компонент Button.js также изменял состояние ‘name’, отображаемое в app.js.

1. через Props

```ts
// App.js component - this is the parent component
import React, { useState } from 'react';  // Importing the Button component
import Button from './components/Button';

function App() {
  const [name, setName] = useState('Antonio Marques'); // Define the state for 'name'

  // This function will change the state of 'name' based on its current value
  const toggleName = () => setName( name === 'Antonio Marques' ? 'Mario Pollo' : 'Antonio Marques' );

  return (
    <div>
      {/* Interpolation to display the 'name' */}
      Hello: {name}
      {/* Render the Button component and pass the 'toggleName' function as a prop */}
      <Button toggleName={toggleName} name={name}/>
    </div>
  );
}

export default App;
```

```ts
// Button component (Button.js) - this is the child component
// importing the child component - componet OtherButton.js
import OtherButton from "./OtherButton/OtherButton";

export default function Button({ toggleName }) {
  return (
    <>
      {/* This button receives the function handleChangeName as a prop and triggers a change in the 'name' state */}
      <button onClick={toggleName}> toggle Name </button>
      {/* Render the Button component child and pass the 'toggleName' function as a prop from App.js*/}
      <OtherButton toggleName={toggleName} />
    </>
  );
}
```

```ts
// Компонент Button (Button.js) - это дочерний компонент
// импортируем дочерний компонент - компонент OtherButton.js
import OtherButton from "./OtherButton/OtherButton";

export default function Button({ toggleName }) {
  return (
    <>
      {/* Эта кнопка получает функцию handleChangeName как prop и запускает изменение состояния 'name' */}
      <button onClick={toggleName}> toggle Name </button>
      {/* Рендеринг дочернего компонента Button и передача функции 'toggleName' в качестве свойства из App.js*/}
      <OtherButton toggleName={toggleName} />
    </>
  );
}
```

```ts
/* OtherButton component (Button1.js) - this is the child component of Button.js component */
export default function OtherButton({ toggleName }) {
  return (
    <button onClick={toggleName}>toggle name again</button>
  );
}
```

2. через Context api

```ts
// Context.js - Context API component
// Importing the necessary elements to create our context API
import React, { createContext, useContext, useState } from 'react';

// Creating the context with default values
const NameContext = createContext({ name: '', setName: () => '' });

export const NameProvider = ({ children }) => {
  // Initializing the name state
  const [name, setName] = useState('Antonio Marques');

  return (
    <NameContext.Provider value={{ name, setName }}>
      {children}
    </NameContext.Provider>
  );
}

// Hook to access the name context
export const useNameContext = () => useContext(NameContext);
```

```ts
// index.js - Entry point of the application
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import reportWebVitals from './reportWebVitals';
// Importing the 'NameProvider' context provider from the './context/Context' file
import { NameProvider } from './context/Context';

const root = ReactDOM.createRoot(document.getElementById('root'));
// Rendering the App component within the context of NameProvider and under StrictMode
root.render(
  <React.StrictMode>
    <NameProvider>
      <App />
    </NameProvider>
  </React.StrictMode>
);

reportWebVitals();
```

```ts
// App.js - Main component of the application
// Importing the useNameContext function from the './context/Context' file
import { useNameContext } from './context/Context';
// Importing the Button component from the './components/Button' file
import Button from './components/Button';

function App() {
  // Using the useNameContext function to get the name context
  const { name } = useNameContext();

  return (
    <div>
      {/* Displaying the 'name' */}
      Hello: {name && (name)}
      <Button/>
    </div>
  );
}

export default App;
```

```ts
// Button.js - Child component that interacts with the context
/* Importing the useNameContext function from the '../context/Context' file */
import { useNameContext } from '../context/Context';
import OtherButton from './OtherButton/OtherButton';

export default function Button() {
  /* Using the useNameContext function to get the name context */
  const { name, setName } = useNameContext();

  // Function to change the name based on its current value
  const toogleName = () => setName(name === 'Antonio Marques' ? 'Mario Pollo' : 'Antonio Marques');

  return (
    <>
      {/* Button that, when clicked, triggers the toogleName function. This function is responsible for changing the name based on its logic. */}
      <button onClick={toogleName}> toogle name </button>
      <OtherButton />
    </>
  )
}
```

```ts
/*
OtherButton component (Button1.js) - this is the child component of Button.js component
*/
import { useNameContext } from "../../context/Context";

export default function OtherButton() {
  const { name, setName } = useNameContext();

  const toggleName = () => setName(name === 'Antonio Marques' ? 'Mario Pollo' : 'Antonio Marques');

  return (
    <button onClick={toggleName}> toggle name again </button>
  );
}
```

Проанализируйте два решения:

### Через реквизиты:

Мы видим, что передача данных должна строго соответствовать иерархии компонентов. Другими словами, дочерний компонент может получать данные только от родительского компонента. Данные, передаваемые app.js, должны сначала попасть в Button.js, а затем передаваться в OtherButton.js. Таким образом, по мере увеличения сложности задачи решение с помощью реквизитов, которое казалось простым в первом решении, становится несколько неорганизованным. Компоненты зависят от своих родительских компонентов для доступа к данным.

### Через контекстный API:

В этом случае мы сохраняем код из первого решения и создаем только OtherButton.js. Мы импортируем createContext, чтобы получить доступ к setName для внесения изменений.

## В заключение:

Реквизиты: В первую очередь это механизм для локального управления состоянием, он понятен и прост, но может стать сложным для поддержки в масштабе из-за своей иерархической природы передачи данных.

Контекстный API: Предоставляет возможность глобального обмена данными в приложении, повышая чистоту кода и удобство обслуживания. Однако он может излишне усложнить код, что приведет к чрезмерному сцеплению между компонентами и усложнит понимание и сопровождение кодовой базы.
