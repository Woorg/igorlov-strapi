---
title: Как забыть об ошибках типов в реквизитах React с помощью PropTypes
meta_title: >-
  Как забыть об ошибках типов в реквизитах React с помощью PropTypes | Игорь
  Горлов - Fullstack Developer
description: >-
  Вы пишете или поддерживаете код на React? Тогда вы наверняка знакомы с
  постоянной отладкой, которая происходит в процессе создания и после создания
  приложения.
date: 2023-12-18T00:00:00.000Z
categories:
  - Обзор
author: Игорь Горлов
draft: false
slug: kak-zab-t-ob-oshybkakh-typov-v-rekvyzytakh-react-s-pomoschiu-proptypes
translatedPosition: 58
tags:
  - React
  - TypeScript
image: >-
  ../../assets/images/kak-zab-t-ob-oshybkakh-typov-v-rekvyzytakh-react-s-pomoschiu-proptypes-Dec-18-2023.avif
lastmod: 2024-03-20T21:26:44.983Z
---

Вы пишете или поддерживаете код на React? Тогда вы наверняка знакомы с постоянной отладкой, которая происходит в процессе создания и после создания приложения. Если вы хотите значительно сократить время отладки, то этот пост для вас. В этой статье мы рассмотрим, как ускорить процесс отладки с помощью prop-типов в React, что это такое, как они связаны с TypeScript и как они используются на практических примерах.

## Что такое типы реквизита

React prop type - это библиотека, поддерживаемая React, которая позволяет определять типы реквизитов в ваших компонентах. Прототипы - это простой способ проверки или гарантии того, что данные, которые мы передаем от одного компонента к другому или от одного элемента к другому, являются именно тем типом данных, который мы собираемся передать. В React одним из способов передачи данных являются свойства, и поэтому, как вы увидите далее в этом посте, важно проверять эти типы. Поскольку React - это фреймворк JavaScript, и мы знаем, что он динамически типизирован, то типы свойств в JavaScript определяются во время выполнения. Проверка типов - это то, чем хорошо известен TypeScript как язык, и поэтому вам может быть интересно, как они связаны с типами свойств React.

По мере того как ваше приложение становится все больше и больше, шансы на появление ошибок возрастают, а знать, что вы можете легко отловить многие из них с помощью проверки типов, - это очень здорово. С Proptypes, независимо от того, пишете ли вы, читаете или поддерживаете кодовую базу, компоненты всегда будут предсказуемы для вас.

## Как это связано с TypeScript

TypeScript - это статически типизированная версия JavaScript, которая решает проблемы динамической типизации, связанные с необходимостью знать или применять типы не только для свойств, но и почти для всего остального в JavaScript. Однако в TypeScript типы проверяются во время компиляции, что означает, что при написании кода вы получаете предупреждения в режиме реального времени. В Proptypes эти проверки происходят во время выполнения, поэтому они направлены на взаимодействие компонентов и отладку. Использование prop-типов в React дает вам немного опыта TypeScript во время выполнения без необходимости использовать TypeScript.

## Проблема

Интересным примером использования здесь является то, что вы можете передать любой тип данных, и он компилируется без каких-либо предупреждений в React. Это может быть очень дорогостоящим, так как это становится трудно заметить при отладке, и чаще всего именно на такие вещи первым обращает внимание пользователь приложения.

## Что мы будем строить

Это простой список автомобилей, отображаемый в виде карточки. Если вы следовали этому посту с самого начала, вы должны были создать проект “propstest”, который мы будем использовать на протяжении всего этого урока. Перейдите в выбранную вами папку и откройте ее в VS Code, выполните в терминале следующую команду:

```bash
npx create-react-app propstest

```

В папке с исходным кодом создайте папку components, затем файл функционального компонента, назовите его `Car.js` и скопируйте в него приведенный ниже блок кода:

```ts
import React from "react";

const Car = (prop) => {
  return (
    <div className="container responsive">
      <div className="car">
        <h2>This {prop.brand} {prop.model}</h2>
        <h4>has a millage of {prop.milage}</h4>
        <h4>It is an electric vehicle - {prop.isElectric}</h4>
        <ul>
          {prop.owners.map((owner, key) => {
            return <li key={key}>{owner}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default Car;
```

Это простой функциональный компонент, который рендерит и экспортирует шаблон Car с некоторыми заголовками и списком. В папке с исходниками вы можете увидеть файл компонента приложения (App.js), скопируйте приведенный ниже блок кода в файл `app.js`:

```ts
import './App.css';
import Car from './Components/Car';

function App() {
  return (
    <div className="App">
      <Car
        brand="Tesla"
        model="CyberTruck"
        milage={5000}
        isElectric={true}
        owners={["Lotanna"]}
      />
      <Car
        brand="Ford"
        model="Explorer"
        milage={8000}
        isElectric={false}
        owners={["Runor", "Elijah"]}
      />
      <Car
        brand="Benz"
        model="CLA250"
        milage={7500}
        isElectric={false}
        owners={["Gilbert", "Herbert", "Frank", "Mazior"]}
      />
      <Car
        brand="Toyota"
        model="Camry"
        milage={3000}
        isElectric={false}
        owners={["Ebuka", "Ikenna", "Ekene"]}
      />
    </div>
  );
}

export default App;
```

Здесь мы вводим определенные шаблоны и говорим React, чтобы он отобразил их четыре раза с нашими собственными предопределенными свойствами. Эти свойства включают марку автомобиля, модель, пробег и владельцев машины. Когда вы запускаете команду dev server:

`npm start`

Вы увидите, что информация разбросана, добавьте немного CSS-правил, чтобы она выглядела презентабельно, перейдите в файл app.css и скопируйте эти стили ниже:

```css
.App {
	text-align: center;
}

.container {
	position: relative;
}

ul {
	list-style-type: none;
	text-align: center;
}

.car {
	top: 50%;
	text-align: center;
	border-radius: 25px;
	border: 2px solid #73ad21;
	padding: 20px;
	width: 600px;
	height: 250px;
	margin-left: 25%;
	margin-bottom: 15px;
}
```

Запустив команду dev server еще раз, вы заметите, что в браузере по адресу http: //localhost:3000/ он выглядит точно так же, как демонстрационный gif, который мы приводили выше. Теперь мы можем зайти в файл компонента приложения и изменить строку Tesla на число, скажем 5000, а пробег на Rabbit, приложение по-прежнему работает нормально, без ошибок и предупреждений.

Такие вещи очень сложно отловить во время отладки, это может произойти из-за человеческой ошибки, прямого пользовательского ввода или данных из другого компонента или API, особенно если вы не являетесь автором кодовой базы. Мы можем пойти еще дальше и изменить сторону владельца с массива, содержащего “lotanna”, на просто строку.

Приложение падает при компиляции, но не из-за типа, а только потому, что у нас есть функция map для владельцев, а map работает только со списком (в нашем случае с массивом) ## Решение: типы prop Отличным решением этой проблемы является определение типов для каждого реквизита, который вы хотите использовать. Синтаксис типов prop в функциональном компоненте выглядит следующим образом:

```ts
import PropTypes from 'prop-types';

function HelloWorldComponent({ name }) {
  return <div>Hello, {name} </div>;
}

HelloWorldComponent.propTypes = {
  name: PropTypes.string
};

export default HelloWorldComponent;
```

Давайте посмотрим, как это работает в нашем приложении. Для начала установите пакет prop types в свой проект с помощью этой команды:

`npm install proptypes`

Внутри компонента, в котором вы хотите определить типы, импортируйте установленные типы prop, в нашем случае в файл `Car.js`:

```ts
import React from "react";
import PropTypes from "prop-types";

const Car = (props) => {
  return (
    <div className="container responsive">
      <div className="car">
        <h2>
          This {props.brand} {props.model}
        </h2>
        <h4>
          has a millage of {props.milage}
        </h4>
        <h4>
          It is an electric vehicle - {props.isElectric}
        </h4>
        <ul>
          {props.owners.map((owner, key) => {
            return <li key={key}>{owner}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

Car.propTypes = {
  brand: PropTypes.string,
  model: PropTypes.string,
  milage: PropTypes.number,
  isElectric: PropTypes.string,
  owners: PropTypes.arrayOf(PropTypes.node)
};

export default Car;
```

Обратите внимание на то, что типы свойств определены до экспорта компонента, это очень важно, потому что если вы экспортируете компонент до определения типов свойств, он не будет работать в dev-сервере.

Это очень напоминает мне библиотеки валидаторов форм, они тоже в основном структурированы подобным образом. Мы добавили несколько типов реквизитов в этот компонент Car, и вот некоторые из них:

Proptype.string: Определяет тип требуемого реквизита, который здесь имеет тип string. Proptype.number: Определяет необходимый тип реквизита типа number. Proptype.arrayOf: Определяет необходимый тип реквизита как тип массива, внутри которого теперь можно точно указать тип дочерних элементов. Proptype.node: Определяет тип всего, что может быть отображено в пользовательском интерфейсе. Сюда входят числа, строки, элементы, массивы и даже фрагменты.

Существуют и другие типы, о которых вы можете прочитать в документации здесь.

## Проверка типов реквизита

Теперь, если вы запустите приложение на своем dev-сервере, вы увидите, что все работает отлично, но когда вы попытаетесь изменить Tesla на число, приложение по-прежнему будет работать, но на этот раз оно покажет предупреждение в консоли.

Эти предупреждения очень описательны, и, прочитав их, вы точно знаете, что пошло не так и что нужно исправить.

## Больше примеров использования: Пример OneOf

Это становится еще интереснее: с помощью oneOf вы можете указать точное значение, которое хотите получить из реквизита, поэтому неважно, где находится источник данных, если он не соответствует вашим спецификациям, вы получите предупреждение. Давайте определим точные значения в компоненте Car следующим образом:

```ts
import React from "react";
import PropTypes from "prop-types";

const Car = (prop) => {
  return (
    <div className="container responsive">
      <div className="car">
        <h2>This {prop.brand} {prop.model}</h2>
        <h4>has a millage of {prop.milage}</h4>
        <h4>It is an electric vehicle - {prop.isElectric}</h4>
        <ul>
          {prop.owners.map((owner, key) => {
            return <li key={key}>{owner}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

Car.propTypes = {
  brand: PropTypes.oneOf(['Ford', 'Benz', 'Toyota']),
  model: PropTypes.string,
  milage: PropTypes.number,
  isElectric: PropTypes.string,
  owners: PropTypes.arrayOf(PropTypes.node)
};

export default Car;
```

Вы можете видеть, что мы указали точные значения, которые нам нужны, и я намеренно опустил Tesla, поэтому, когда мы снова запускаем приложение, вот какое предупреждение мы получаем.

## Типы реквизитов в компонентах класса

Типы Prop также хорошо работают в компонентах класса React, давайте быстро создадим один компонент класса. Откройте папку components и создайте новый файл компонента, назовите его `Sample.js`, а внутри него скопируйте блок кода ниже:

```ts
import React from "react";
import PropTypes from 'prop-types';

class Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.brand}</h1>
    );
  }
}

Greeting.propTypes = {
  brand: PropTypes.string
};

export default Greeting;
```

Внутри файла компонента приложения (App.js) импортируйте Greeting и добавьте соответствующий шаблон, как показано ниже:

```ts
import './App.css';
import Car from './Components/Car';
import Greeting from './Components/Sample';

function App() {
  return (
    <div className="App">
      <Greeting brand="Reader" />
      <Car
        brand={4555}
        model="CyberTruck"
        milage={5000}
        isElectric={"true"}
        owners={["Lotanna"]}
      />
      <Car
        brand="Ford"
        model="Explorer"
        milage={8000}
        isElectric={"false"}
        owners={["Runor", "Elijah", 3]}
      />
      <Car
        brand="Benz"
        model="CLA250"
        milage={7500}
        isElectric={"false"}
        owners={["Gilbert", "Herbert", "Frank", "Mazior"]}
      />
      <Car
        brand="Toyota"
        model="Camry"
        milage={3000}
        isElectric={"false"}
        owners={["Ebuka", "Ikenna", "Ekene"]}
      />
    </div>
  );
}

export default App;
```

## Подведение итогов

В этом уроке мы рассмотрели типы реквизитов в React, почему они важны и как их можно соотнести с TypeScript. Мы также рассмотрели, как они используются, на различных примерах и рабочей демонстрации. Я надеюсь, что в будущем вы примете на вооружение prop-типы, чтобы упростить отладку и поддержку вашего кода. Счастливого хакинга!
