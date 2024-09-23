---
title: Как использовать EmailJS для страницы Contact Us
meta_title: |
  Как Использовать EmailJS Для Страницы Contact Us - Фул...
description: >-
  Помню, как некоторое время назад я работал над одним сайдпроектом. В рамках
  проекта мне предстояло реализовать простую страницу контактов. Первоначально я
  исп
date: 2023-11-09T15:47:30.933Z
image: >-
  ../../assets/images/kak-ispolьzovatь-emailjs-dlya-stranicy-contact-Nov-09-2023.avif
categories:
  - Как закодить
author: Igor Gorlov
tags:
  - Emailjs
  - React
  - TypeScript
draft: false
type: blog
slug: kak-ispolьzovatь-emailjs-dlya-stranicy-contact
keywords:
  - React
  - EmailJS
lastmod: 2024-03-20T21:26:46.973Z
---

Помню, как некоторое время назад я работал над одним сайд-проектом. В рамках проекта мне предстояло реализовать простую страницу контактов. Первоначально я использовал Google Firebase для хранения ответов. Затем я нашел EmailJS, и он оказался таким простым в использовании и очень эффективным.

В этой статье вы узнаете, как настроить учетную запись EmailJS и интегрировать ее в приложение на ReactJS/NextJS.

## Для начала давайте создадим новый проект React с помощью Vite.

Откройте VSCode или любой другой редактор кода, откройте терминал и введите:
yarn create vite или npm create vite@latest и следуйте подсказкам. В данном примере я буду использовать React с Typescript.

## Далее давайте установим некоторые зависимости.

В терминале введите yarn add @emailjs/browser react-hook-form. Затем запустите yarn dev для запуска проекта.

Я удалю некоторые файлы по умолчанию в каталоге и изменю некоторые стили, как показано ниже.

![Каталог проекта](https://res.cloudinary.com/practicaldev/image/fetch/s--_f8f45Ut--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/t4beoelzcbi8nj759btr.png)

## Далее в своем App.tsx я размещу базовую форму для связи с нами.

```javascript
import styles from "./app.module.css";
import { useForm } from "react-hook-form";
import { useState } from "react";

interface IFormInput {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}
function App() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>();
  const onSubmit = async (data: IFormInput) => {
    console.log(data);
  };

  return (
    <div className={styles.contact_form}>
      <h1>Contact Form</h1>
      Our friendly team would love to hear from you.

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.group}>
          <div className={styles.input_group}>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              {...register("firstName", { required: true })}
              placeholder="Enter your first name"
            />
            {errors.firstName && (
              <span className={styles.error}>This field is required</span>
            )}
          </div>
          <div className={styles.input_group}>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              {...register("lastName", { required: true })}
              placeholder="Enter your last name"
            />
            {errors.lastName && (
              <span className={styles.error}>This field is required</span>
            )}
          </div>
        </div>
        <div className={styles.input_group}>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            {...register("email", { required: true })}
            placeholder="Enter your email address"
          />
          {errors.email && (
            <span className={styles.error}>This field is required</span>
          )}
        </div>
        <div className={styles.input_group}>
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            {...register("phone", { required: true })}
            placeholder="+2348123456789"
          />
          {errors.phone && (
            <span className={styles.error}>This field is required</span>
          )}
        </div>
        <div className={styles.input_group}>
          <label htmlFor="message">Message</label>
          <textarea
            {...register("message", { required: true })}
            placeholder="Leave us a message..."
          />
          {errors.message && (
            <span className={styles.error}>This field is required</span>
          )}
        </div>

        <button disabled={loading} className={styles.button} type="submit">
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}

export default App;
```

В приведенном выше фрагменте кода я использую CSS-модуль для компонента и react-hook-form для валидации формы. Я объявил состояние загрузки, установленное по умолчанию на false.

## Далее я хочу перейти на [официальный сайт EmailJS](https://www.emailjs.com/) и зарегистрировать бесплатную учетную запись.

Процесс регистрации очень прост.

![Веб-сайт EmailJS](https://res.cloudinary.com/practicaldev/image/fetch/s--t2avM2P7--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/aq0zzvj9hgt9j2rmb7iw.png)

- Далее я войду в свою учетную запись и настрою новую службу электронной почты. В данном примере мы будем использовать только Gmail.
- На панели управления выберите Add New Service (Добавить новую службу) и выберите Gmail.
- Затем выберите Подключить службу.
- В результате вы перейдете к своей учетной записи Gmail, чтобы связать ее с Emailjs.
- После этого выберите Create Service (Создать службу).

![Добавить новую услугу](https://res.cloudinary.com/practicaldev/image/fetch/s--uFEbMaj6--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/4prun37s7rk684wbvpyi.png)

![Сервис Gmail](https://res.cloudinary.com/practicaldev/image/fetch/s--i6Mo-2UM--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/p6r2p9pgiychaqvq0k0s.png)

![Подключение и создание сервиса](https://res.cloudinary.com/practicaldev/image/fetch/s--SRhqbK4l--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/kqdzf9j87csnygktby38.png)

## Далее необходимо создать шаблон электронной почты.

- На панели управления выберите Шаблоны электронной почты
- и выберите Создать новый шаблон.

В бесплатной версии можно создать только 2 шаблона электронной почты.

![Новый шаблон](https://res.cloudinary.com/practicaldev/image/fetch/s--IdUCuVTC--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/qlkte646tgwvhlf9fakb.png)

Вы можете настроить шаблон электронной почты по своему усмотрению.

![Настройка шаблона](https://res.cloudinary.com/practicaldev/image/fetch/s--XLT0bHbA--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/c9hmrruajc7hk4d60qha.png)

На рисунке выше тело шаблона соответствует полезной нагрузке, которую я отправляю из своего приложения. Также необходимо указать email получателя и можно добавить дополнительные Bcc и CC.

## Далее нам необходимо получить 3 важных учетных данных. ID сервиса, ID шаблона и ваш открытый ключ.

Чтобы получить идентификатор шаблона, перейдите на вкладку настроек шаблона и найдите ключ шаблона. Здесь же можно изменить имя шаблона.

![Идентификатор шаблона](https://res.cloudinary.com/practicaldev/image/fetch/s--lQ4zJmDM--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/yf1q0adla8gcw1hy50fo.png)

Далее перейдите на экран Email Services и найдите идентификатор службы, которую мы подключили ранее.

![Сервисный идентификатор](https://res.cloudinary.com/practicaldev/image/fetch/s--zkanSFIi--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/3tnw0e0fvgrk0rytlpqz.png)

Далее перейдите в раздел Account (Учетная запись) и на вкладке General (Общие) найдите свои открытый и закрытый ключи. Нам нужен только открытый ключ.

![Открытый и закрытый ключ](https://res.cloudinary.com/practicaldev/image/fetch/s--K66deUlQ--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/n5z0yh08h28r3v4uupwa.png)

Наконец, вернемся к нашему коду, обновим функцию onSubmit и интегрируем emailjs в наш код.

Для этого в файле App.tsx импортируйте emailjs из ”@emailjs/browser”;

Затем измените функцию onSubmit следующим образом:

![Функция onSubmit](https://res.cloudinary.com/practicaldev/image/fetch/s--MXSK-q9A--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/khfc2oqhmfdpyt4ceq06.png)

## Наконец, ваш App.tsx должен выглядеть следующим образом:

```javascript
import styles from "./app.module.css";
import { useForm } from "react-hook-form";
import { useState } from "react";
import emailjs from "@emailjs/browser";

interface IFormInput {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}
function App() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>();
  const onSubmit = (data: IFormInput) => {
    setLoading(true);

    const templateParams = {
      ...data,
    };

    emailjs
      .send(
        "your_service_id",
        "your_template_id",
        templateParams,
        "your_public_key"
      )
      .then(() => {
        reset();
        setLoading(false);
        alert("One of our agents will contact you soon!");
      });
  };

  return (
    <div className={styles.contact_form}>
      <h1>Contact Form</h1>
      Our friendly team would love to hear from you.

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.group}>
          <div className={styles.input_group}>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              {...register("firstName", { required: true })}
              placeholder="Enter your first name"
            />
            {errors.firstName && (
              <span className={styles.error}>This field is required</span>
            )}
          </div>
          <div className={styles.input_group}>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              {...register("lastName", { required: true })}
              placeholder="Enter your last name"
            />
            {errors.lastName && (
              <span className={styles.error}>This field is required</span>
            )}
          </div>
        </div>
        <div className={styles.input_group}>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            {...register("email", { required: true })}
            placeholder="Enter your email address"
          />
          {errors.email && (
            <span className={styles.error}>This field is required</span>
          )}
        </div>
        <div className={styles.input_group}>
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            {...register("phone", { required: true })}
            placeholder="+2348123456789"
          />
          {errors.phone && (
            <span className={styles.error}>This field is required</span>
          )}
        </div>
        <div className={styles.input_group}>
          <label htmlFor="message">Message</label>
          <textarea
            {...register("message", { required: true })}
            placeholder="Leave us a message..."
          />
          {errors.message && (
            <span className={styles.error}>This field is required</span>
          )}
        </div>

        <button disabled={loading} className={styles.button} type="submit">
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}

export default App;
```

Вот и все. Теперь вы можете получать новые сообщения ”Свяжитесь с нами" непосредственно на указанный вами адрес электронной почты.

Спасибо, что прочитали. Если это было полезно, оставьте лайк.
