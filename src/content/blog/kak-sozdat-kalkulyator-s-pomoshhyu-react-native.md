---
title: Как создать калькулятор с помощью React Native
meta_title: Как создать калькулятор с помощью React Native - Igor Gorlov
description: >-
  Приложение-калькулятор - это простое приложение, которое всегда доступно на
  каждом устройстве Android, iOS и настольном компьютере.
date: 2023-02-17T05:30:00.000Z
image: ../../assets/images/undefined-Feb-17-2023.avif
categories:
  - Как закодить
author: Igor Gorlov
tags:
  - React Native
draft: false
lastmod: 2024-03-20T21:26:46.076Z
---

Приложение-калькулятор - это простое приложение, которое всегда доступно на каждом устройстве Android, iOS и настольном компьютере.

В этой статье мы создадим калькулятор с помощью React Native и Expo. Почему мы используем эти инструменты?

React Native - это фреймворк на основе JavaScript, который можно использовать для разработки мобильных приложений сразу на двух операционных системах - Android и iOS. React Native был впервые запущен в 2015 году компанией Facebook и имеет открытый исходный код.

Expo - это набор инструментов, библиотек и сервисов, которые вы можете использовать для упрощения кода React Native. Таким образом, вы можете запускать приложения React Native на эмуляторе Expo.

Прежде чем мы начнем создавать калькулятор, вам сначала нужно установить Node.js, React Native и Expo на свой компьютер.

<!-- wp:rank-math/toc-block {"title":"Оглавление","headings":[{"key":"a0b0df8f-27b8-47f1-9e78-bd79f3f841ea","content":"Предварительные условия","level":2,"link":"#предварительные-условия","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"abc61ff6-a6d4-4d95-8ae4-865335040388","content":"Шаг 1: Создание нового проекта","level":2,"link":"#шаг-1-создание-нового-проекта","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"4ed21fe5-44fb-478e-8482-16098d34c210","content":"Шаг 2: Создание компонента кнопки","level":2,"link":"#шаг-2-создание-компонента-кнопки","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"d67bf53f-ba71-46c7-b6b4-791575fe4eb4","content":"Шаг 3: Создание компонента Row","level":2,"link":"#шаг-3-создание-компонента-row","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"07f91145-eaa2-4d5e-a090-57427c01766b","content":"Заключение","level":2,"link":"#заключение","disable":false,"isUpdated":false,"isGeneratedLink":true}],"listStyle":"ul"} -->
<div class="wp-block-rank-math-toc-block" id="rank-math-toc"><h2>Оглавление</h2><nav><ul><li class=""><a href="#предварительные-условия">Предварительные условия</a></li><li class=""><a href="#шаг-1-создание-нового-проекта">Шаг 1: Создание нового проекта</a></li><li class=""><a href="#шаг-2-создание-компонента-кнопки">Шаг 2: Создание компонента кнопки</a></li><li class=""><a href="#шаг-3-создание-компонента-row">Шаг 3: Создание компонента Row</a></li><li class=""><a href="#заключение">Заключение</a></li></ul></nav></div>
<!-- /wp:rank-math/toc-block -->

<h2 class="wp-block-heading" id="предварительные-условия">Предварительные условия</h2>

Установите Node.js - как установить его, можно посмотреть здесь. Установите React Native - документацию по установке можно посмотреть здесь. Установите Expo - документацию по установке можно посмотреть здесь.

<h2 class="wp-block-heading" id="шаг-1-создание-нового-проекта">Шаг 1: Создание нового проекта</h2>

Первым шагом будет создание нового проекта. Используйте Expo CLI для создания кодовой базы React Native с помощью следующей команды:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">$ expo init calculator-app</code></pre>
<!-- /wp:code -->

Затем у вас будет выбор, какой проект вы хотите запустить. Здесь мы выбираем пустой вариант и используем JavaScript, как показано ниже:

<img srcset="https://www.freecodecamp.org/news/content/images/size/w600/2023/01/image-349.png 600w, https://www.freecodecamp.org/news/content/images/2023/01/image-349.png 690w" width="600" height="400" class="kg-image" src="https://www.freecodecamp.org/news/content/images/2023/01/image-349.png" alt="image-349">выберите шаблон проекта экспо

После этого процесс продолжится загрузкой всех зависимостей.

<h2 class="wp-block-heading" id="шаг-2-создание-компонента-кнопки">Шаг 2: Создание компонента кнопки</h2>

При разработке приложений с использованием React Native обязательно разбивайте компоненты пользовательского интерфейса на более мелкие компоненты, чтобы созданный вами код можно было использовать повторно.

Сначала создайте новую папку “components” для хранения кода компонентов. Первый компонент, который мы создадим, будет кнопкой, поэтому создайте новый файл Button.js. Вот исходный код компонента Button:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">import { Dimensions, StyleSheet, Text, TouchableOpacity } from "react-native";

export default ({ onPress, text, size, theme }) =&gt; {
  const buttonStyles = [styles.button];
  const textStyles = [styles.text];

  if (size === "double") {
    buttonStyles.push(styles.buttonDouble);
  }

  if (theme === "secondary") {
    buttonStyles.push(styles.buttonSecondary);
    textStyles.push(styles.textSecondary);
  } else if (theme === "accent") {
    buttonStyles.push(styles.buttonAccent);
  }

  return (
    &lt;TouchableOpacity onPress={onPress} style={buttonStyles}&gt;
      &lt;Text style={textStyles}&gt;{text}&lt;/Text&gt;
    &lt;/TouchableOpacity&gt;
  );
};</code></pre>
<!-- /wp:code -->

Пояснение к коду:

В строке 3 есть четыре реквизита, которые нам нужны для создания компонента Button: onPress, text, size и theme. Каждый из реквизитов имеет функцию onPress для обработки действий на кнопках. Компонент кнопки, который мы создали, имеет 2 типа тем, secondary и accent, и 1 размер, double. Компонент кнопки использует компонент React Native по умолчанию, TouchableOpacity.

После того как мы сделаем код компонента, не забудьте добавить стилизацию для этого компонента кнопки. Вот код для стилизации компонента:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">// set dimmenstion
const screen = Dimensions.get("window");
const buttonWidth = screen.width / 4;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#333333",
    flex: 1,
    height: Math.floor(buttonWidth - 10),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Math.floor(buttonWidth),
    margin: 5,
  },
  text: {
    color: "#fff",
    fontSize: 24,
  },
  textSecondary: {
    color: "#060606",
  },
  buttonDouble: {
    width: screen.width / 2 - 10,
    flex: 0,
    alignItems: "flex-start",
    paddingLeft: 40,
  },
  buttonSecondary: {
    backgroundColor: "#a6a6a6",
  },
  buttonAccent: {
    backgroundColor: "#ffc107",
  },
});
</code></pre>
<!-- /wp:code -->

Итак, полный код нашего компонента кнопки выглядит следующим образом:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">import { Dimensions, StyleSheet, Text, TouchableOpacity } from "react-native";

export default ({ onPress, text, size, theme }) =&gt; {
  const buttonStyles = [styles.button];
  const textStyles = [styles.text];

  if (size === "double") {
    buttonStyles.push(styles.buttonDouble);
  }

  if (theme === "secondary") {
    buttonStyles.push(styles.buttonSecondary);
    textStyles.push(styles.textSecondary);
  } else if (theme === "accent") {
    buttonStyles.push(styles.buttonAccent);
  }

  return (
    &lt;TouchableOpacity onPress={onPress} style={buttonStyles}&gt;
      &lt;Text style={textStyles}&gt;{text}&lt;/Text&gt;
    &lt;/TouchableOpacity&gt;
  );
};

// set dimmenstion
const screen = Dimensions.get("window");
const buttonWidth = screen.width / 4;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#333333",
    flex: 1,
    height: Math.floor(buttonWidth - 10),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Math.floor(buttonWidth),
    margin: 5,
  },
  text: {
    color: "#fff",
    fontSize: 24,
  },
  textSecondary: {
    color: "#060606",
  },
  buttonDouble: {
    width: screen.width / 2 - 10,
    flex: 0,
    alignItems: "flex-start",
    paddingLeft: 40,
  },
  buttonSecondary: {
    backgroundColor: "#a6a6a6",
  },
  buttonAccent: {
    backgroundColor: "#ffc107",
  },
});
</code></pre>
<!-- /wp:code -->

<h2 class="wp-block-heading" id="шаг-3-создание-компонента-row">Шаг 3: Создание компонента Row</h2>

Следующим компонентом, который мы создадим, будет компонент Row. Этот компонент полезен для создания строк, когда мы хотим обработать макеты.

Вот код для компонента Row и его код стилизации:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">import { StyleSheet, View } from "react-native";

const Row = ({ children }) =&gt; {
  return &lt;View style={styles.container}&gt;{children}&lt;/View&gt;;
};

// create styles of Row
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});

export default Row;
</code></pre>
<!-- /wp:code -->

Вот что происходит:

В компоненте row есть 1 параметр, который нам нужен: children.Компонент row использует компонент View по умолчанию из React Native.flexDirection: “row” в этом стиле используется для того, чтобы сделать макет рядом.Шаг 4: Создание логики калькулятора

Создайте новую папку util и новый файл calculator.js. Здесь мы создадим логику функций в приложении калькулятора, которую позже реализуем в файле App.js. Вот полный код:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">export const initialState = {
  currentValue: "0",
  operator: null,
  previousValue: null,
};

export const handleNumber = (value, state) =&gt; {
  if (state.currentValue === "0") {
    return { currentValue: `${value}` };
  }

  return {
    currentValue: `${state.currentValue}${value}`,
  };
};

const handleEqual = (state) =&gt; {
  const { currentValue, previousValue, operator } = state;

  const current = parseFloat(currentValue);
  const previous = parseFloat(previousValue);
  const resetState = { operator: null, previousValue: null };

  switch (operator) {
    case "+":
      return {
        currentValue: `${previous + current}`,
        ...resetState,
      };
    case "-":
      return {
        currentValue: `${previous - current}`,
        ...resetState,
      };
    case "*":
      return {
        currentValue: `${previous * current}`,
        ...resetState,
      };
    case "/":
      return {
        currentValue: `${previous / current}`,
        ...resetState,
      };

    default:
      return state;
  }
};

// calculator function
const calculator = (type, value, state) =&gt; {
  switch (type) {
    case "number":
      return handleNumber(value, state);
    case "clear":
      return initialState;
    case "posneg":
      return {
        currentValue: `${parseFloat(state.currentValue) * -1}`,
      };
    case "percentage":
      return {
        currentValue: `${parseFloat(state.currentValue) * 0.01}`,
      };
    case "operator":
      return {
        operator: value,
        previousValue: state.currentValue,
        currentValue: "0",
      };
    case "equal":
      return handleEqual(state);
    default:
      return state;
  }
};

export default calculator;
</code></pre>
<!-- /wp:code -->

И вот что происходит:

initialState используется, чтобы дать значение по умолчанию нашему приложению калькулятора.Функция handleNumber служит для возврата значения калькулятора и имеет 2 реквизита - value и state.Функция handle Equal служит для обработки заданного значения каждого математического оператора и возвращает его значение.Функция calculator проверяет каждый заданный оператор. Например, если число вызывает функцию handleNumber, то если она чиста, то вернет значение состояния по умолчанию из initiaState, и так далее.Шаг 5: Рефакторинг файла App.js

После того как мы создали все компоненты и логический процесс, следующим шагом будет внесение изменений в код в файле App.js. Вот полный код:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">import React, { Component } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Button from "./components/Button";
import Row from "./components/Row";
import calculator, { initialState } from "./util/calculator";

// create class component of App
export default class App extends Component {
  state = initialState;

  // handle tap method
  HandleTap = (type, value) =&gt; {
    this.setState((state) =&gt; calculator(type, value, state));
  };

  // render method
  render() {
    return (
      &lt;View style={styles.container}&gt;
        {/* Status bae here */}
        &lt;SafeAreaView&gt;
          &lt;Text style={styles.value}&gt;
            {parseFloat(this.state.currentValue).toLocaleString()}
          &lt;/Text&gt;

          {/* Do create componentRow */}
          &lt;Row&gt;
            &lt;Button
              text="C"
              theme="secondary"
              onPress={() =&gt; this.HandleTap("clear")}
            /&gt;

            &lt;Button
              text="+/-"
              theme="secondary"
              onPress={() =&gt; this.HandleTap("posneg")}
            /&gt;

            &lt;Button
              text="%"
              theme="secondary"
              onPress={() =&gt; this.HandleTap("percentage")}
            /&gt;

            &lt;Button
              text="/"
              theme="accent"
              onPress={() =&gt; this.HandleTap("operator", "/")}
            /&gt;
          &lt;/Row&gt;

          {/* Number */}
          &lt;Row&gt;
            &lt;Button text="7" onPress={() =&gt; this.HandleTap("number", 7)} /&gt;
            &lt;Button text="8" onPress={() =&gt; this.HandleTap("number", 8)} /&gt;
            &lt;Button text="9" onPress={() =&gt; this.HandleTap("number", 9)} /&gt;
            &lt;Button
              text="X"
              theme="accent"
              onPress={() =&gt; this.HandleTap("operator", "*")}
            /&gt;
          &lt;/Row&gt;

          &lt;Row&gt;
            &lt;Button text="5" onPress={() =&gt; this.HandleTap("number", 5)} /&gt;
            &lt;Button text="6" onPress={() =&gt; this.HandleTap("number", 6)} /&gt;
            &lt;Button text="7" onPress={() =&gt; this.HandleTap("number", 7)} /&gt;
            &lt;Button
              text="-"
              theme="accent"
              onPress={() =&gt; this.HandleTap("operator", "-")}
            /&gt;
          &lt;/Row&gt;

          &lt;Row&gt;
            &lt;Button text="1" onPress={() =&gt; this.HandleTap("number", 1)} /&gt;
            &lt;Button text="2" onPress={() =&gt; this.HandleTap("number", 2)} /&gt;
            &lt;Button text="3" onPress={() =&gt; this.HandleTap("number", 3)} /&gt;
            &lt;Button
              text="+"
              theme="accent"
              onPress={() =&gt; this.HandleTap("operator", "+")}
            /&gt;
          &lt;/Row&gt;

          &lt;Row&gt;
            &lt;Button text="0" onPress={() =&gt; this.HandleTap("number", 0)} /&gt;
            &lt;Button text="." onPress={() =&gt; this.HandleTap("number", ".")} /&gt;
            &lt;Button
              text="="
              theme="primary"
              onPress={() =&gt; this.HandleTap("equal", "=")}
            /&gt;
          &lt;/Row&gt;
        &lt;/SafeAreaView&gt;
      &lt;/View&gt;
    );
  }
}

// create styles of app
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#202020",
    justifyContent: "flex-end",
  },
  value: {
    color: "#fff",
    fontSize: 42,
    textAlign: "right",
    marginRight: 20,
    marginBottom: 10,
  },
});
</code></pre>
<!-- /wp:code -->

Несколько кратких заметок:

handleTap - это созданная нами функция, которая предназначена для предоставления значений состояния и вызова utils/calculator.Здесь мы вызываем два компонента, Button и Row, для оформления внешнего вида калькулятора, таких как его числа, математические операции и процесс вычисления.Шаг 6: Запуск приложения

На этом шаге мы попытаемся запустить приложение калькулятора на устройстве или можем использовать эмулятор. Здесь я использую симулятор iPhone из MacOS. Выполните приведенную ниже команду, чтобы запустить программу:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">$ yarn ios</code></pre>
<!-- /wp:code -->

Здесь запущенный процесс использует Expo, как показано ниже:

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://www.freecodecamp.org/news/content/images/2023/01/image-350.png" alt="изображение-350"/></figure>
<!-- /wp:image -->

Если процесс компиляции завершен, то отображение приложения калькулятора, которое мы запрограммировали, будет выглядеть следующим образом:

<h2 class="wp-block-heading" id="заключение">Заключение</h2>

Этого достаточно для данной статьи. Вы узнали о стилизации, компонентах, реквизитах и состояниях в React Native и создали функциональное приложение-калькулятор.

Если вам нужен полный исходный код, вы можете посетить мой репозиторий GitHub здесь: https://github.com/bangadam/calculator-app.

Спасибо за прочтение!

<!-- wp:acf/acf-donate {"id":"block_64678dc93985f","name":"acf/acf-donate","data":{"title":"Задонатить на поддержку!","_title":"field_646b621e8617c","list_0_name":"Donatepay","_list_0_name":"field_646b623e8617e","list_0_url":"https://new.donatepay.ru/@1117856","_list_0_url":"field_646b62528617f","list_0_address":"","_list_0_address":"field_646b625d86180","list_1_name":"Donationalerts","_list_1_name":"field_646b623e8617e","list_1_url":"https://www.donationalerts.com/c/woorg_","_list_1_url":"field_646b62528617f","list_1_address":"","_list_1_address":"field_646b625d86180","list_2_name":"USDT (TRC20)","_list_2_name":"field_646b623e8617e","list_2_url":"","_list_2_url":"field_646b62528617f","list_2_address":"TR121HxpTDF71TMm9idZkBaZxnjSMcCPWj","_list_2_address":"field_646b625d86180","list_3_name":"ETH","_list_3_name":"field_646b623e8617e","list_3_url":"","_list_3_url":"field_646b62528617f","list_3_address":"0x442721192987047eDeEC69Ca1D4c706f9Adb16B3","_list_3_address":"field_646b625d86180","list_4_name":"BTC","_list_4_name":"field_646b623e8617e","list_4_url":"","_list_4_url":"field_646b62528617f","list_4_address":"36dLKv5uRozphSQa55w2XgsF42AugPu2QT","_list_4_address":"field_646b625d86180","list":5,"_list":"field_646b62308617d"},"align":"","mode":"edit"} /-->
