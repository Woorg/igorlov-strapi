---
title: Стилизация сообщений тостов с помощью React-Toastify
meta_title: Стилизация сообщений тостов с помощью React-Toastify - Igor Gorlov
description: >-
  Уведомления являются важной частью разработки любого приложения React, они
  обеспечивают своевременную и ненавязчивую передачу информации пользователям. 
date: 2023-02-25T18:12:07.000Z
author: Igor Gorlov
image: ../../assets/images/undefined-Feb-25-2023.avif
categories:
  - Учебник
tags:
  - JavaScript
  - React
  - React-Toastify
draft: false
type: blog
lastmod: 2024-03-20T21:26:47.913Z
---

Уведомления являются важной частью разработки любого приложения React, они обеспечивают своевременную и ненавязчивую передачу информации пользователям. Уведомления могут предоставлять пользователям обновления в реальном времени, предупреждать их о важном событии или напоминать о предстоящей задаче.

Существует целый ряд ресурсов, которые могут помочь нам достичь этой цели. Одним из интересных инструментов, которые мы можем использовать, является React-Toastify. Используя React-Toastify, разработчики могут создать лучший пользовательский опыт и держать пользователей в курсе событий.

Это руководство познакомит читателей с React-Toastify и поможет им отображать уведомления, сообщения и всплывающие окна в приложениях React.

<!-- wp:rank-math/toc-block {"title":"Оглавление","headings":[{"key":"ebcfa2ad-7802-4324-8496-6e5ae4bcf7fc","content":"Что такое тостовое уведомление?","level":2,"link":"#что-такое-тостовое-уведомление","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"462d4089-500a-4e00-b5ca-4ff78718676f","content":"Что такое React-Toastify?","level":2,"link":"#что-такое-react-toastify","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"58fc7447-7c0c-4145-994f-0c8be273fcee","content":"Почему именно React-Toastify?","level":2,"link":"#почему-именно-react-toastify","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"3b56c0ba-d224-4490-814f-b14048c86a5e","content":"Установка и настройка пакета Toastify на вашем приложении React","level":2,"link":"#установка-и-настройка-пакета-toastify-на-вашем-приложении-react","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"213ba1a1-20f6-480e-9df1-476a7d1c7779","content":"Определение различных типов тостовых уведомлений","level":2,"link":"#определение-различных-типов-тостовых-уведомлений","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"70c43bb1-6270-42b7-bfdb-763ca40d79a2","content":"Как создать пользовательское тостовое уведомление.","level":2,"link":"#как-создать-пользовательское-тостовое-уведомление","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"9f329229-87bf-454b-a2a4-73c3f0719443","content":" Как создать обещанный тост с помощью React-Toastify","level":2,"link":"#как-создать-обещанный-тост-с-помощью-react-toastify","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"43fca094-cb32-4a44-8eda-e50db61e4169","content":"Заключение","level":2,"link":"#заключение","disable":false,"isUpdated":false,"isGeneratedLink":true}],"listStyle":"ul"} -->
<div class="wp-block-rank-math-toc-block" id="rank-math-toc"><h2>Оглавление</h2><nav><ul><li class=""><a href="#что-такое-тостовое-уведомление">Что такое тостовое уведомление?</a></li><li class=""><a href="#что-такое-react-toastify">Что такое React-Toastify?</a></li><li class=""><a href="#почему-именно-react-toastify">Почему именно React-Toastify?</a></li><li class=""><a href="#установка-и-настройка-пакета-toastify-на-вашем-приложении-react">Установка и настройка пакета Toastify на вашем приложении React</a></li><li class=""><a href="#определение-различных-типов-тостовых-уведомлений">Определение различных типов тостовых уведомлений</a></li><li class=""><a href="#как-создать-пользовательское-тостовое-уведомление">Как создать пользовательское тостовое уведомление.</a></li><li class=""><a href="#как-создать-обещанный-тост-с-помощью-react-toastify"> Как создать обещанный тост с помощью React-Toastify</a></li><li class=""><a href="#заключение">Заключение</a></li></ul></nav></div>
<!-- /wp:rank-math/toc-block -->

<h2 class="wp-block-heading" id="что-такое-тостовое-уведомление">Что такое тостовое уведомление?</h2>

От слова toast - уведомления называются ”тостовыми”, потому что они предназначены для краткого сообщения, отображения некоторой информации, которая ненадолго появляется на экране, подобно тосту, выскакивающему из тостера. Термин ”тост" в данном контексте относится к сообщению, которое появляется на короткое время и затем исчезает, подобно тому, как тост выскакивает из тостера.

Уведомление может быть ошибкой, предупреждением, успехом, информационным сообщением и так далее, как показано на рисунке ниже:

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://blog.openreplay.com/images/styling-toast-messages-with-react-toastify/images/image01.png" alt="1"/></figure>
<!-- /wp:image -->

<h2 class="wp-block-heading" id="что-такое-react-toastify">Что такое React-Toastify?</h2>

React-Toastify - это библиотека для React, которая позволяет разработчикам легко создавать и отображать уведомления о тостах в своих React-приложениях. Она предоставляет простой в использовании и настраиваемый интерфейс для создания тостовых уведомлений для проектов React.

React Toastify поддерживает различные параметры стиля, такие как положение, цвет, ширина и анимация. Он также поддерживает обратные вызовы и многое другое. Библиотека React-Toastify также совместима с другими библиотеками, такими как Redux.

<h2 class="wp-block-heading" id="почему-именно-react-toastify">Почему именно React-Toastify?</h2>

Toastify - это библиотека React.js, созданная независимо, чтобы хорошо работать с вашим проектом React.js. Она популярна среди разработчиков, и некоторые из причин этого следующие:

Тосты - это отличный способ быстро предоставить обратную связь и уведомить пользователей о важных изменениях или обновлениях в вашем веб-приложении.<br>Toastify позволяет настраивать внешний вид и оформление уведомлений. Вы можете изменять цвета, размер шрифта и положение тостов.<br>Toastify - легковесная библиотека, ее легко установить и использовать. Она также не требует никаких зависимостей.<br>Toastify обладает широкими возможностями настройки, позволяя вам настраивать текст, цвета и продолжительность тоста.

<h2 class="wp-block-heading" id="установка-и-настройка-пакета-toastify-на-вашем-приложении-react">Установка и настройка пакета Toastify на вашем приложении React</h2>

После создания приложения React используйте любую из приведенных ниже команд для установки пакета React-Toastify.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">    // NPM
    $ npm install --save react-toastify
    
    // YARN
    $ yarn add react-toastify</code></pre>
<!-- /wp:code -->

После установки пакета мы импортируем его в ваш компонент, как показано ниже. Кроме того, мы импортируем CSS-файл, предоставленный React-Toastify, чтобы инструмент работал правильно.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">    import { ToastContainer, toast } from 'react-toastify';
    import 'react-toastify/dist/ReactToastify.css';</code></pre>
<!-- /wp:code -->

Стилизация уведомлений тостов с помощью React-Toastify

Здесь мы импортируем функцию тоста, компонент ToastContainer и его CSS-файл из библиотеки react-toastify. Мы также обернем наше приложение компонентом ToastContainer, что позволит нам отображать тосты в любом месте вашего приложения.

Далее мы создадим функцию notifyMe в App.js. Мы создадим кнопку для прослушивания события - notifyMe.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">    import React from 'react';
    import { ToastContainer, toast } from 'react-toastify';
    import 'react-toastify/dist/ReactToastify.css';
      
      function App(){
        const notifyMe = () =&gt; toast("Welcome user!");
    
        return (
          &lt;div&gt;
          &lt;button onClick={notifyMe} className="button"&gt;Notify me!&lt;/button&gt;
            &lt;ToastContainer /&gt;
          &lt;/div&gt;
        );
      }</code></pre>
<!-- /wp:code -->

При нажатии на кнопку будет выведено уведомление с сообщением ”Добро пожаловать, пользователь!”, как показано ниже.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://blog.openreplay.com/images/styling-toast-messages-with-react-toastify/images/image02.png" alt="2"/></figure>
<!-- /wp:image -->

<h2 class="wp-block-heading" id="определение-различных-типов-тостовых-уведомлений">Определение различных типов тостовых уведомлений</h2>

С помощью эмиттера тостов можно создавать различные тостовые сообщения для передачи конкретной информации пользователям. Использование различных типов тостов может помочь пользователям понять смысл и важность отображаемой информации.

Этот метод использует различные цвета и символы для передачи важности каждого типа тостовых сообщений, чтобы помочь пользователям быстро идентифицировать и понять информацию, которую они видят.

Например, при входе в приложение обычно используется зеленое тостовое сообщение для обозначения успешного ответа, красное тостовое сообщение обычно означает ошибку, а синее тостовое сообщение передает некоторую информацию, как показано ниже.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">    import React from "react";
    import { ToastContainer, toast } from 'react-toastify';
    import 'react-toastify/dist/ReactToastify.css';
    function App() {
      const toastMessage = () =&gt; {
          toast.success('Success Notification !', {
              position: toast.POSITION.TOP_RIGHT
          });
          toast.error('Error Notification !', {
            position: toast.POSITION.TOP_LEFT
        });
        toast.info('Info Notification !', {
          position: toast.POSITION.BOTTOM_RIGHT
      });
      toast.warning('Warning Notification !', {
        position: toast.POSITION.BOTTOM_LEFT
    });
      };
      return (
          &lt;div&gt;
              &lt;button onClick={toastMessage} className="button"&gt;Notify&lt;/button&gt;
              &lt;ToastContainer /&gt;
          &lt;/div&gt;
      );
    }
    export default App;</code></pre>
<!-- /wp:code -->

Блок кода выводит четыре основных уведомления о тостах - успех, ошибка, информация и предупреждение.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://blog.openreplay.com/images/styling-toast-messages-with-react-toastify/images/image03.png" alt="3"/></figure>
<!-- /wp:image -->

Важно отметить, что эти соглашения не являются универсальными, и различные приложения могут использовать разные цвета для своих уведомлений о тостах. Рекомендуется выбирать цвета, которые легко читаются и хорошо контрастируют с цветом фона уведомления о тосте.

Позиционирование тостовых уведомлений

По умолчанию все тосты располагаются в правом верхнем углу браузера. Тосту можно назначить другое положение. React-Toastify позволяет использовать шесть различных позиций:

Правый верхний угол<br>Вверху по центру<br>Слева вверху<br>Снизу-справа<br>Внизу по центру<br>Слева внизу

Теперь мы можем расположить наши тосты в любом из указанных выше положений, как показано на рисунке.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">    const notifyMe = () =&gt; {
        toast.info('Welcome user !', {
          position: toast.POSITION.TOP_RIGHT
      });
      toast.info('You have 15 unread mail !', {
          position: toast.POSITION.TOP_CENTER
      });
      toast.info('15 minutes to lunch break!', {
          position: toast.POSITION.TOP_LEFT
      });
      toast.info(' Meeting in 10 minutes !', {
          position: toast.POSITION.BOTTOM_RIGHT
      });
      toast.info('Pick up your kids !', {
          position: toast.POSITION.BOTTOM_CENTER
      });
      toast.info('Counsel the interns !', {
          position: toast.POSITION.BOTTOM_LEFT
      });
      }</code></pre>
<!-- /wp:code -->

Этот блок кода отобразит различные позиции для уведомлений о тостах.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://blog.openreplay.com/images/styling-toast-messages-with-react-toastify/images/image04.png" alt="4"/></figure>
<!-- /wp:image -->

<h2 class="wp-block-heading" id="как-создать-пользовательское-тостовое-уведомление">Как создать пользовательское тостовое уведомление.</h2>

Пользовательский тост - это уведомление, которое можно изменить в соответствии с предпочитаемым стилем. Вы можете настроить внешний вид и поведение тоста, передавая опции функции toast. Например, вы можете указать продолжительность, высоту, иконку, шрифт, размер шрифта, положение, hideProgressBar, closeOnClick, autoClose, pauseOnHover и стиль анимации тоста.

В процессе настройки пакет также позволяет внедрить внутрь него свою HTML-структуру. Для наглядности мы создадим пользовательский тост с возможностью увольнения. Тост будет автоматически отключаться через определенное время. Мы также создадим кнопку с ролью ”отмена”, и эта кнопка будет отменять тост. Чтобы отклонить тост после создания, вызовите метод dismiss().

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">    const CustomToast = ({text}) =&gt; (
      &lt;div&gt;
       &lt;p className="text"&gt;{text}&lt;/p&gt;
      &lt;button className="button1" onClick={() =&gt; toast.dismiss()}&gt;Dismiss&lt;/button&gt;
      &lt;/div&gt;
    );
    const customToast = () =&gt; {
      toast(&lt;CustomToast  text="This is a custom toast" /&gt;);
    };
    
    const App = () =&gt; (
      
      &lt;div&gt;
        &lt;button onClick={customToast} className="button"&gt;Custom toast&lt;/button&gt;
        &lt;ToastContainer /&gt;
      &lt;/div&gt;
    );
    export default App;</code></pre>
<!-- /wp:code -->

Здесь мы придадим стиль нашему пользовательскому тосту с помощью CSS.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="css" class="language-css">    .button{
     display: flex;
     margin: 350px auto;
     padding: 15px 50px;
     letter-spacing: 1px;
     font-size: 17px;
    }
    .button1{
     border-radius: 3px;
     border: none;
     padding: 9px;
     margin: 20px 0;
    }
    .text{
     font-size: 30px;
     color: #844C40;
     margin: 20px 0;
    }</code></pre>
<!-- /wp:code -->

Результат ниже будет отображен в вашем браузере.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://blog.openreplay.com/images/styling-toast-messages-with-react-toastify/images/image05.gif" alt="5"/></figure>
<!-- /wp:image -->

Session Replay для разработчиков

Выявить разочарования, понять ошибки и устранить замедления как никогда раньше можно с помощью OpenReplay - пакета воспроизведения сессий с открытым исходным кодом для разработчиков. Его можно установить на собственном хостинге за считанные минуты, что дает вам полный контроль над данными ваших клиентов.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://blog.openreplay.com/../../assets/overview_Z17Qdyg.png" alt="OpenReplay"/></figure>
<!-- /wp:image -->

Счастливой отладки! Попробуйте использовать OpenReplay уже сегодня.

<h2 class="wp-block-heading" id="как-создать-обещанный-тост-с-помощью-react-toastify"><br>Как создать обещанный тост с помощью React-Toastify</h2>

Обещание тоста в React - это тип обещания, которое позволяет выполнять асинхронный код. Оно может вызвать определенное действие или событие при отображении тоста, например, перенаправить пользователя на другую страницу или вывести предупреждающее сообщение, при этом любые ошибки обрабатываются должным образом.

Например, обещание тоста может быть использовано для обеспечения того, чтобы во время получения данных из API отображался волчок загрузки, а затем удалялся после успешной загрузки данных.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">    import React from "react";
    import { ToastContainer, toast } from 'react-toastify'; 
    import 'react-toastify/dist/ReactToastify.css';
    import { useEffect } from "react";
    
    function App() {
        const store = new Promise((res) =&gt;
        fetch("https://fakestoreapi.com/products/")
          .then((res) =&gt; res.json())
          .then((json) =&gt; setTimeout(() =&gt; res(json), 5000))
      );
      useEffect(() =&gt; {
        toast.promise(store, {
          pending: "logging in ...",
          success: "Welcome user",
          error: "Error logging in"
        });
      },[]);
      return(
        &lt;&gt;
        &lt;ToastContainer/&gt;
        &lt;/&gt;
      )
    }
     
    export default App;</code></pre>
<!-- /wp:code -->

Из приведенного выше блока кода следует, что при разрешении тоста React promise на экране пользователя появляется уведомление о тосте, указывающее на то, что обещание было выполнено. Уведомление о тосте может содержать сообщение об успехе, сообщение об ошибке или другой тип информации.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://blog.openreplay.com/images/styling-toast-messages-with-react-toastify/images/image06.gif" alt="6"/></figure>
<!-- /wp:image -->

Как использовать эффект перехода для тостовых уведомлений.

Эффекты перехода для уведомлений о тостах - это анимация, которая используется для перехода уведомления о тостах. Наиболее распространенными эффектами перехода для тостовых уведомлений являются затухание, скольжение, подпрыгивание и масштабирование. Эти эффекты перехода придают уведомлению о тосте более динамичный и плавный вид.

Чтобы добавить эффекты перехода к уведомлениям о тостах в react-toastify, вы можете использовать параметр transition компонента ToastContainer. Параметр transition должен представлять собой строку, в которой указывается название эффекта перехода.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">    import React from 'react';
    import { ToastContainer, toast } from 'react-toastify';
    import { Slide, Zoom, Flip, Bounce } from 'react-toastify';
    import 'react-toastify/dist/ReactToastify.css';
    
    function App() {
      const toastNotify = () =&gt; {
        toast.success("Slide Effect!", {
          transition: Slide,
          position: "top-left",
        });
          toast.error("Zoom Effect!", {
              transition: Zoom,
              position: "top-right",
            })
            toast.warning("Flip Effect!", {
                  transition: Flip,
                  position: "bottom-left",
                })
            toast.info("Bounce Effect!", {
                      transition: Bounce,
                      position: "bottom-right",
                    })
      };
      
      return (
        &lt;div className='App'&gt;
          &lt;h1 className="heading"&gt;Transition Effect with Toastify React&lt;/h1&gt;
          &lt;button className='button' onClick={toastNotify}&gt;Pop that toast!&lt;/button&gt;
          &lt;ToastContainer /&gt;
        &lt;/div&gt;
      );
    }
    export default App;</code></pre>
<!-- /wp:code -->

Из приведенного выше блока кода мы импортируем эффекты перехода Slide, Zoom, Flip и Bounce из пакета react-toastify. Мы можем добавить эти эффекты перехода в наши тосты. В вашем браузере это будет выглядеть следующим образом.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://blog.openreplay.com/images/styling-toast-messages-with-react-toastify/images/image07.gif" alt="7"/></figure>
<!-- /wp:image -->

Как очищать одиночные и многократные тосты.

Очистка React Toast - это удаление уведомления Toast с экрана. Это делается с помощью метода dismiss() компонента Toast.

Для удаления одного тоста мы передадим аргумент в функцию toast.dismiss. Чтобы убрать все тосты, можно вызвать функцию toast.dismiss без аргументов.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">    const toastId = React.useRef(null);
      const message = () =&gt; toastId.current = toast("welcome user");
      const clear = () =&gt;  toast.dismiss(toastId.current);
      const clearAll = () =&gt;  toast.dismiss();
      return (
        &lt;div className='App'&gt;
          &lt;h1 className="heading"&gt;Clearing Single and Multiple Toasts&lt;/h1&gt;
          &lt;button className="button" onClick={message}&gt;Notify&lt;/button&gt;
          &lt;button className="button" onClick={clear}&gt;Dismiss&lt;/button&gt;
          &lt;button className="button" onClick={clearAll}&gt;Dismiss All&lt;/button&gt;
          &lt;ToastContainer /&gt;
        &lt;/div&gt;</code></pre>
<!-- /wp:code -->

Из приведенного выше блока кода следует, что один тост убирается при нажатии кнопки отмены, а все уведомления о тостах убираются с экрана при нажатии кнопки отмены всех.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://blog.openreplay.com/images/styling-toast-messages-with-react-toastify/images/image08.gif" alt="8"/></figure>
<!-- /wp:image -->

useNotificationCenter в React-Toastify v9

Хук useNotificationCenter - это новая функция React-Toastify v9. Он управляет уведомлениями, например, отображает их, обновляет и удаляет. Хук позволяет разработчикам легко управлять своими уведомлениями и отслеживать их в централизованном месте.

UseNotificationCenter представляет собой коллекцию всех уведомлений, что позволяет нам использовать функции массива, такие как фильтрация, сортировка, сопоставление и т.д. Он также создает экземпляр центра уведомлений, который позволяет добавлять, удалять и обновлять уведомления из любой точки приложения.

Чтобы использовать хук useNotificationCenter, мы импортируем из react-toastify/addons/use-notification-center.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">    import { useNotificationCenter } from 'react-toastify/addons/use-notification-center';</code></pre>
<!-- /wp:code -->

”Он также предоставляет способ получения текущего количества уведомлений, хранения данных уведомлений в состоянии и отслеживания активных уведомлений”. Хорошим примером является корзина электронного магазина.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">    import React from "react";
    import { useNotificationCenter } from "react-toastify/addons/use-notification-center";
    import { toast, ToastContainer } from "react-toastify";
    import "react-toastify/dist/ReactToastify.css";
    const App = () =&gt; {
      const { notifications } = useNotificationCenter();
      const message = () =&gt; {
        toast("Added to your cart !", );
      };
      return (
        &lt;div className="container"&gt;
          &lt;p className="counter"&gt;
            You've added &lt;span&gt;{notifications.length}&lt;/span&gt; items to your cart.
            
          &lt;/p&gt;
          &lt;button className="btn" onClick={message}&gt;
            Add to cart
          &lt;/button&gt;
          &lt;ToastContainer /&gt;
        &lt;/div&gt;
      );
    };
    export default App;</code></pre>
<!-- /wp:code -->

Из приведенного выше блока кода при нажатии на кнопку добавления в корзину всплывает тост-уведомление с сообщением ”Добавлено в корзину”.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://blog.openreplay.com/images/styling-toast-messages-with-react-toastify/images/image09.gif" alt="9"/></figure>
<!-- /wp:image -->

<h2 class="wp-block-heading" id="заключение">Заключение</h2>

В этом руководстве мы обсудили, как настроить React-Toastify в нашем приложении React. Мы также обсудили использование, позиционирование и настройку сообщений тостов в нашем приложении React. Использование React-Toastify для сообщений тостов имеет много преимуществ, таких как большое сообщество, простота, легкость, свойства настройки и согласованность во всем приложении.

Мы также рассмотрели, как использовать promise toast и хук useNotificationCenter для создания центра уведомлений и отображения всех наших уведомлений.

В целом, React-Toastify - это ценный и мощный инструмент для создания и отображения тостовых уведомлений в приложении React, который может помочь вам улучшить пользовательский опыт и дизайн вашего приложения.
