---
title: 'Создание безопасного OpenAPI, ориентированного на базу данных, за 15 минут'
meta_title: >-
  Создание безопасного OpenAPI, ориентированного на базу данных, за 15 минут -
  Igor Gorlov
description: >-
  Если вы являетесь разработчиком, знакомым с RESTful API, вы, возможно, слышали
  о OpenAPI. Это спецификация для описания RESTful API в формате, читаемом
  людьми и машинами. Создание публичного OpenAPI включает в себя три задачи:
date: 2023-03-20T22:10:20.000Z
author: Igor Gorlov
image: ../../assets/images/undefined-Mar-21-2023.avif
categories:
  - Учебник
tags:
  - Openapi
  - Prisma
  - Restapi
  - ZenStack
draft: false
lastmod: 2024-03-20T21:26:45.443Z
---

Если вы являетесь разработчиком, знакомым с RESTful API, вы, возможно, слышали о OpenAPI. Это спецификация для описания RESTful API в формате, читаемом людьми и машинами. Создание публичного OpenAPI включает в себя три задачи:

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Разработка спецификации OpenAPI, которая служит контрактом между поставщиком и потребителем API.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Реализация конечных точек API на основе спецификации.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Опционально, реализация клиентских SDK для использования API.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

В этом посте вы увидите, как выполнить все эти задачи и создать OpenAPI-сервис, ориентированный на базу данных, безопасный и документированный, за 15 минут.

Готовый проект вы можете найти <a href="https://github.com/ymc9/petstore-openapi-zenstack" target="_blank" rel="noreferrer noopener nofollow">здесь</a>.

<!-- wp:rank-math/toc-block {"title":"Оглавление","headings":[{"key":"04b56b4e-d896-48d8-8d6a-b42fb042b168","content":"Сценарий","level":2,"link":"#сценарий","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"24abe9ca-8e50-4154-a54d-bee6e113a53d","content":"Бизнес-правила:","level":3,"link":"#бизнес-правила","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"38223229-5507-49e2-b7e2-5f3d8e6943a3","content":"Создание","level":2,"link":"#создание","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"55c406cf-78a0-4805-a7e5-f202eec6531e","content":"1. Создание проекта","level":3,"link":"#1-создание-проекта","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"3fff40e2-e558-46b6-9acc-e1d88e72e674","content":"2. Моделирование данных","level":3,"link":"#2-моделирование-данных","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"a1e6e4a5-c358-46c6-acbe-09e046943b64","content":"3. Реализация API","level":3,"link":"#3-реализация-api","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"a1291175-1fcc-43b6-af83-3554fd6c8dec","content":"4. Добавление аутентификации","level":3,"link":"#4-добавление-аутентификации","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"bcf2cb13-3de4-492e-aea5-ceb16a593b06","content":"5. Добавление авторизации","level":3,"link":"#5-добавление-авторизации","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"3e017b73-20d6-483f-8877-0783f19e2fa3","content":"Генерация спецификации OpenAPI","level":2,"link":"#генерация-спецификации-open-api","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"25bd31ec-14b1-4d50-abf7-4fd2f233cf2f","content":"Генерация SDK клиента","level":2,"link":"#генерация-sdk-клиента","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"f4cc7c12-be85-4a52-a74d-f27cc864569b","content":"Подведение итогов","level":2,"link":"#подведение-итогов","disable":false,"isUpdated":false,"isGeneratedLink":true}],"listStyle":"ul"} -->
<div class="wp-block-rank-math-toc-block" id="rank-math-toc"><h2>Оглавление</h2><nav><ul><li class=""><a href="#сценарий">Сценарий</a><ul><li class=""><a href="#бизнес-правила">Бизнес-правила:</a></li></ul></li><li class=""><a href="#создание">Создание</a><ul><li class=""><a href="#1-создание-проекта">1. Создание проекта</a></li><li class=""><a href="#2-моделирование-данных">2. Моделирование данных</a></li><li class=""><a href="#3-реализация-api">3. Реализация API</a></li><li class=""><a href="#4-добавление-аутентификации">4. Добавление аутентификации</a></li><li class=""><a href="#5-добавление-авторизации">5. Добавление авторизации</a></li></ul></li><li class=""><a href="#генерация-спецификации-open-api">Генерация спецификации OpenAPI</a></li><li class=""><a href="#генерация-sdk-клиента">Генерация SDK клиента</a></li><li class=""><a href="#подведение-итогов">Подведение итогов</a></li></ul></nav></div>
<!-- /wp:rank-math/toc-block -->

<h2 class="wp-block-heading" id="сценарий">Сценарий</h2>

Для облегчения понимания я буду использовать в качестве примера простой API зоомагазина. API будет иметь следующие ресурсы:

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Пользователь: который может зарегистрироваться, войти в систему и заказать питомца.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Питомец: который может быть перечислен и заказан пользователями.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Заказ: который создается пользователями и содержит список питомцев.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="бизнес-правила">Бизнес-правила:</h3>

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Анонимные пользователи могут регистрироваться и входить в систему.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Анонимные пользователи могут перечислять непроданных питомцев.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Аутентифицированные пользователи могут перечислять непроданных питомцев и питомцев, заказанных ими.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Аутентифицированные пользователи могут создавать заказы на непроданных питомцев.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Аутентифицированные пользователи могут просматривать свои заказы.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<h2 class="wp-block-heading" id="создание">Создание</h2>

Мы будем использовать Express.js в качестве фреймворка для создания сервиса. Однако можно использовать и другие фреймворки, например Fastify, и общий процесс будет аналогичным.

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="1-создание-проекта">1. Создание проекта</h3>

Сначала создадим новый проект Express.js с помощью Typescript.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">mkdir express-petstore
cd express-petstore
npm init -y
npm install express
npm install -D typescript tsx @types/node @types/express
npx tsc --init
</code></pre>
<!-- /wp:code -->

Создайте код точки входа в сервис app.ts со следующим содержимым:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">// app.ts
import express from 'express';

const app = express();

// enable JSON body parser
app.use(express.json());

app.get('/', (req, res) =&gt; {
    res.send('Hello World!');
});

app.listen(3000, () =&gt; console.log('🚀 Server ready at: http://localhost:3000'));
</code></pre>
<!-- /wp:code -->

Запустите сервер:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">npx tsx watch app.ts
</code></pre>
<!-- /wp:code -->

Теперь в новом окне оболочки выберите конечную точку службы и убедитесь, что она работает:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">curl localhost:3000
</code></pre>
<!-- /wp:code -->

Hello World!

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="2-моделирование-данных">2. Моделирование данных</h3>

Моделирование данных - это самая важная часть построения ресурсно-ориентированного API. В этом руководстве мы будем использовать Prisma и ZenStack для моделирования базы данных. Prisma - это набор инструментов, обеспечивающий декларативное моделирование данных, а ZenStack - это мощный пакет для Prisma, предоставляющий такие возможности, как контроль доступа, генерация спецификаций, автоматическое создание сервисов и многие другие улучшения.

Давайте сначала инициализируем наш проект для моделирования данных:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">npm install -D prisma
npm install @prisma/client
npx zenstack@latest init
</code></pre>
<!-- /wp:code -->

zenstack CLI устанавливает Prisma и другие зависимости и создает шаблонный файл schema.zmodel. Обновите его следующим содержимым, чтобы отразить наши требования:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="typescript" class="language-typescript">// schema.zmodel
datasource db {
    provider = 'sqlite'
    url = 'file:./petstore.db'
}

generator client {
    provider = "prisma-client-js"
}

model User {
    id String @id @default(cuid())
    email String @unique
    password String
    orders Order[]
}

model Pet {
    id String @id @default(cuid())
    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt
    name String
    category String
    order Order? @relation(fields: [orderId], references: [id])
    orderId String?
}

model Order {
    id String @id @default(cuid())
    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt
    pets Pet[]
    user User @relation(fields: [userId], references: [id])
    userId String
}
</code></pre>
<!-- /wp:code -->

Выполните следующую команду, чтобы сгенерировать схему Prisma и поместить ее в базу данных:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">npx zenstack generate
npx prisma db push
</code></pre>
<!-- /wp:code -->

Также создайте файл prisma/seed.ts, который заполняет базу данных некоторыми данными. Затем, когда вы перезагрузите локальную базу данных, вы сможете повторно запустить сценарий для заполнения данных.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="typescript" class="language-typescript">// prisma/seed.ts
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const petData: Prisma.PetCreateInput[] = [
    {
        id: 'luna',
        name: 'Luna',
        category: 'kitten',
    },
    {
        id: 'max',
        name: 'Max',
        category: 'doggie',
    },
    {
        id: 'cooper',
        name: 'Cooper',
        category: 'reptile',
    },
];

async function main() {
    console.log(`Start seeding ...`);
    for (const p of petData) {
        const pet = await prisma.pet.create({
            data: p,
        });
        console.log(`Created Pet with id: ${pet.id}`);
    }
    console.log(`Seeding finished.`);
}

main()
    .then(async () =&gt; {
        await prisma.$disconnect();
    })
    .catch(async (e) =&gt; {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
</code></pre>
<!-- /wp:code -->

Запустите скрипт, чтобы засеять нашу базу данных:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">npx tsx prisma/seed.ts
</code></pre>
<!-- /wp:code -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="3-реализация-api">3. Реализация API</h3>

ZenStack значительно упрощает разработку API, ориентированных на базы данных, предоставляя встроенную реализацию RESTful. Вы можете использовать адаптер, специфичный для фреймворка, для установки RESTful-сервисов в ваше приложение. Давайте посмотрим, как это сделать с помощью Express.js.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">npm install @zenstackhq/server
</code></pre>
<!-- /wp:code -->

Интеграция с Express.js осуществляется с помощью фабрики промежуточного ПО ZenStackMiddleware. Используйте его для монтирования RESTful API по выбранному вами пути. Обратный вызов getPrisma используется для получения экземпляра клиента Prisma для текущего запроса. Пока мы просто вернем глобальный клиент Prisma.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="typescript" class="language-typescript">// app.ts
import { PrismaClient } from '@prisma/client';
import { ZenStackMiddleware } from '@zenstackhq/server/express';
import express from 'express';

const app = express();
app.use(express.json());

const prisma = new PrismaClient();
app.use('/api', ZenStackMiddleware({ getPrisma: () =&gt; prisma }));

app.listen(3000, () =&gt; console.log('🚀 Server ready at: http://localhost:3000'));
</code></pre>
<!-- /wp:code -->

С помощью этих нескольких строк кода у вас есть CRUD API для всех ресурсов - пользователя, питомца и заказа. Протестируйте его, получив всех питомцев:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">curl localhost:3000/api/pet/findMany
</code></pre>
<!-- /wp:code -->

<!-- wp:code -->
<pre class="wp-block-code"><code lang="json" class="language-json">[
    {
        "id": "luna",
        "createdAt": "2023-03-18T08:09:41.417Z",
        "updatedAt": "2023-03-18T08:09:41.417Z",
        "name": "Luna",
        "category": "kitten"
    },
    {
        "id": "max",
        "createdAt": "2023-03-18T08:09:41.419Z",
        "updatedAt": "2023-03-18T08:09:41.419Z",
        "name": "Max",
        "category": "doggie"
    },
    {
        "id": "cooper",
        "createdAt": "2023-03-18T08:09:41.420Z",
        "updatedAt": "2023-03-18T08:09:41.420Z",
        "name": "Cooper",
        "category": "reptile"
    }
]
</code></pre>
<!-- /wp:code -->

Легко, не правда ли? Автоматически созданные API имеют отображение 1:1 на методы клиента Prisma - findMany, findUnique, create, update, aggregate и т.д. Они также имеют ту же структуру, что и PrismaClient, для входных аргументов и ответов. Для запросов POST и PUT входные аргументы отправляются непосредственно как тело запроса (application/json). Для запросов GET и DELETE входные аргументы сериализуются в JSON и отправляются как параметры запроса q (url-кодировка). Например, вы можете получить отфильтрованный список домашних животных по:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">curl 'http://localhost:3000/api/pet/findMany?q=%7B%22where%22%3A%7B%22category%22%3A%22doggie%22%7D%7D'
</code></pre>
<!-- /wp:code -->

URL закодирован так: http://localhost:3000/api/pet/findMany?q={“where”:{“category”: “doggie”}}.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="json" class="language-json">[
    {
        "id": "max",
        "createdAt": "2023-03-18T08:09:41.419Z",
        "updatedAt": "2023-03-18T08:09:41.419Z",
        "name": "Max",
        "category": "doggie"
    }
]
</code></pre>
<!-- /wp:code -->

Наш API уже работает, но у него есть одна большая проблема: он не защищен никакими мерами безопасности. Любой может читать и обновлять любые данные. Давайте исправим это в следующих разделах в два этапа: аутентификация и авторизация.

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="4-добавление-аутентификации">4. Добавление аутентификации</h3>

Для этого простого сервиса мы примем аутентификацию на основе email/пароля и будем выдавать JWT-токен для каждого успешного входа.

Сначала рассмотрим часть, связанную с регистрацией. Поскольку ресурс User уже имеет CRUD API, нам не нужно реализовывать отдельный API для регистрации, так как регистрация - это просто создание пользователя. Единственное, о чем нам нужно позаботиться, это убедиться, что мы храним хэшированные пароли, а не простой текст. Достичь этого просто: достаточно добавить атрибут @password к полю пароля. ZenStack автоматически хэширует поле перед сохранением его в базе данных. Обратите внимание, что мы также добавили атрибут @omit, чтобы пометить поле password, которое будет удалено из ответа, поскольку мы не хотим, чтобы оно когда-либо возвращалось клиенту.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="typescript" class="language-typescript">// schema.prisma
model User {
    id String @id @default(cuid())
    email String @unique
    password String @password @omit
    orders Order[]
}
</code></pre>
<!-- /wp:code -->

Вход в систему требует проверки учетных данных, и нам необходимо реализовать ее вручную. Установите несколько новых зависимостей:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">npm install bcryptjs jsonwebtoken dotenv
npm install -D @types/jsonwebtoken
</code></pre>
<!-- /wp:code -->

Создайте файл .env под корнем и поместите в него переменную окружения JWT_SECRET. Вы всегда должны использовать сильный секрет в производстве.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">JWT_SECRET=abc123
</code></pre>
<!-- /wp:code -->

Добавьте маршрут /api/login следующим образом:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="typescript" class="language-typescript">//app.ts
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { compareSync } from 'bcryptjs';

// load .env environment variables
dotenv.config();

app.post('/api/login', async (req, res) =&gt; {
    const { email, password } = req.body;
    const user = await prisma.user.findFirst({
        where: { email },
    });
    if (!user || !compareSync(password, user.password)) {
        res.status(401).json({ error: 'Invalid credentials' });
    } else {
        // sign a JWT token and return it in the response
        const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET!);
        res.json({ id: user.id, email: user.email, token });
    }
});
</code></pre>
<!-- /wp:code -->

Наконец, измените обратный вызов getPrisma в ZenStackMiddleware на улучшенный клиент Prisma, возвращаемый вызовом withPresets, чтобы атрибуты @password и @omit могли вступить в силу.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="typescript" class="language-typescript">// app.ts
import { withPresets } from '@zenstackhq/runtime';
app.use('/api', ZenStackMiddleware({ getPrisma: () =&gt; withPresets(prisma) }));
</code></pre>
<!-- /wp:code -->

Имейте в виду, что в расширенном клиенте Prisma все операции CRUD по умолчанию запрещены, если вы не откроете их явно. Давайте откроем операции создания и чтения для User, чтобы поддержать поток регистрации/входа в систему:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">// schema.prisma
model User {
    id String @id @default(cuid())
    email String @unique
    password String @password @omit
    orders Order[]

    // everybody can signup
    @@allow('create', true)

    // user profile is publicly readable
    @@allow('read', true)
}
</code></pre>
<!-- /wp:code -->

Теперь перегенерируйте схему Prisma и перенесите изменения в базу данных:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">npx zenstack generate &amp;&amp; npx prisma db push
</code></pre>
<!-- /wp:code -->

Перезапустите сервер разработчиков, и мы сможем протестировать наш поток регистрации/входа в систему.

Зарегистрируйте пользователя:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">curl -X POST localhost:3000/api/user/create \
    -H 'Content-Type: application/json' \
    -d '{ "data": { "email": "tom@pet.inc", "password": "abc123" } }'
</code></pre>
<!-- /wp:code -->

<!-- wp:code -->
<pre class="wp-block-code"><code lang="json" class="language-json">{
    "id": "clfan0lys0000vhtktutornel",
    "email": "tom@pet.inc"
}
</code></pre>
<!-- /wp:code -->

Логин:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">curl -X POST localhost:3000/api/login \
    -H 'Content-Type: application/json' \
    -d '{ "email": "tom@pet.inc", "password": "abc123" }'
</code></pre>
<!-- /wp:code -->

<!-- wp:code -->
<pre class="wp-block-code"><code lang="json" class="language-json">{
    "id": "clfan0lys0000vhtktutornel",
    "email": "tom@pet.inc",
    "token": "..."
}
</code></pre>
<!-- /wp:code -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="5-добавление-авторизации">5. Добавление авторизации</h3>

Теперь, когда аутентификация установлена, мы можем добавить правила контроля доступа в нашу схему, чтобы защитить нашу службу CRUD. Внесите следующие изменения в модели Pet и Order:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">// schema.prisma
model Pet {
    id String @id @default(cuid())
    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt
    name String
    category String
    order Order? @relation(fields: [orderId], references: [id])
    orderId String?

    // unsold pets are readable to all; sold ones are readable to buyers only
    @@allow('read', orderId == null || order.user == auth())

    // only allow update to 'orderId' field if it's not set yet (unsold)
    @@allow('update', name == future().name &amp;&amp; category == future().category &amp;&amp; orderId == null )
}

model Order {
    id String @id @default(cuid())
    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt
    pets Pet[]
    user User @relation(fields: [userId], references: [id])
    userId String

    // users can read their orders
    @@allow('read,create', auth() == user)
}
</code></pre>
<!-- /wp:code -->

Синтаксис для @@allow и @@deny довольно понятен. Несколько моментов, на которые следует обратить внимание:

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Функция auth() возвращает текущего аутентифицированного пользователя. Вскоре вы увидите, как она подключается.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Функция future() возвращает значение сущности после применения обновления.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Второе правило @@allow в модели Pet выглядит немного сложным. Оно необходимо, потому что мы хотим запретить создание заказов, включающих проданных питомцев. На уровне базы данных это означает, что поле orderId модели Pet может быть обновлено только в том случае, если оно равно null (то есть животное еще не продано). Мы также использовали функцию future(), чтобы запретить обновление других полей.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

Подробнее о политиках доступа вы можете узнать <a href="https://zenstack.dev/docs/guides/understanding-access-policy" target="_blank" rel="noreferrer noopener nofollow">здесь</a>.

Декларативно определяя политики доступа в схеме, вам больше не нужно реализовывать эти правила в API. Легче обеспечить согласованность, что делает схему единым источником истины для формы ваших данных и правил безопасности.

Однако одной детали все еще не хватает: нам нужно подключить аутентифицированную личность пользователя к системе, чтобы функция auth() работала. Для этого мы потребуем от вызывающих API передавать токен JWT в качестве маркера предъявителя в заголовке авторизации. Затем на стороне сервера мы извлекаем его из текущего запроса и передаем в вызов withPresets в качестве контекста.

Добавляем помощник getUser для декодирования пользователя из токена и передаем его в вызов withPresets:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="typescript" class="language-typescript">// app.ts
import type { Request } from 'express';

function getUser(req: Request) {
    const token = req.headers.authorization?.split(' ')[1];
    console.log('TOKEN:', token);
    if (!token) {
        return undefined;
    }
    try {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
        return { id: decoded.sub };
    } catch {
        // bad token
        return undefined;
    }
}

app.use(
    '/api',
    ZenStackMiddleware({
        getPrisma: (req) =&gt; {
            return withPresets(prisma, { user: getUser(req) });
        },
    })
);
</code></pre>
<!-- /wp:code -->

Теперь механизм политики имеет доступ к аутентифицированному пользователю и может применять правила авторизации. Перезапустите генерацию кода и перезапустите сервер dev. Теперь давайте протестируем авторизацию.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">npx zenstack generate &amp;&amp; npx prisma db push
</code></pre>
<!-- /wp:code -->

6. Тестирование авторизации

Войдите в систему, чтобы получить токен:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">curl -X POST localhost:3000/api/login \
    -H 'Content-Type: application/json' \
    -d '{ "email": "tom@pet.inc", "password": "abc123" }'
</code></pre>
<!-- /wp:code -->

<!-- wp:code -->
<pre class="wp-block-code"><code lang="json" class="language-json">{
    "id": "&lt;user id&gt;",
    "email": "tom@pet.inc",
    "token": "&lt;token&gt;"
}
</code></pre>
<!-- /wp:code -->

Сохраните возвращенные идентификатор пользователя и токен в переменных окружения для дальнейшего использования:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">userId=&lt;user id&gt;
token=&lt;token&gt;
</code></pre>
<!-- /wp:code -->

Создание заказа:

Разместите заказ на кошку ”Луна”. Обратите внимание, что мы передаем маркер в заголовке авторизации.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">curl -X POST localhost:3000/api/order/create \
    -H 'Content-Type: application/json' -H "Authorization: Bearer $token"  \
    -d "{ \"data\": { \"userId\": \"$userId\", \"pets\": { \"connect\": { \"id\": \"luna\" } } } }"
</code></pre>
<!-- /wp:code -->

<!-- wp:code -->
<pre class="wp-block-code"><code lang="json" class="language-json">{
    "id": "clfapaykz0002vhwr634sd9l7",
    "createdAt": "2023-03-16T05:59:04.586Z",
    "updatedAt": "2023-03-16T05:59:04.586Z",
    "userId": "clfan0lys0000vhtktutornel"
}
</code></pre>
<!-- /wp:code -->

Разместите список домашних животных анонимно:

”Луна” больше нет, потому что она продана.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">curl localhost:3000/api/pet/findMany
</code></pre>
<!-- /wp:code -->

<!-- wp:code -->
<pre class="wp-block-code"><code lang="json" class="language-json">[
    {
        "id": "clfamyjp90002vhql2ng70ay8",
        "createdAt": "2023-03-16T04:53:26.205Z",
        "updatedAt": "2023-03-16T04:53:26.205Z",
        "name": "Max",
        "category": "doggie"
    },
    {
        "id": "clfamyjpa0004vhql4u0ys8lf",
        "createdAt": "2023-03-16T04:53:26.206Z",
        "updatedAt": "2023-03-16T04:53:26.206Z",
        "name": "Cooper",
        "category": "reptile"
    }
]
</code></pre>
<!-- /wp:code -->

Перечислите питомцев с учетными данными:

“Luna” снова видна (с указанием OrderId), потому что пользователь, который делает заказ, может читать питомцев в нем.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">curl localhost:3000/api/pet/findMany -H "Authorization: Bearer $token"
</code></pre>
<!-- /wp:code -->

<!-- wp:code -->
<pre class="wp-block-code"><code lang="json" class="language-json">[
    {
        "id": "clfamyjp60000vhql266hko28",
        "createdAt": "2023-03-16T04:53:26.203Z",
        "updatedAt": "2023-03-16T05:59:04.586Z",
        "name": "Luna",
        "category": "kitten",
        "orderId": "clfapaykz0002vhwr634sd9l7"
    },
    {
        "id": "clfamyjp90002vhql2ng70ay8",
        "createdAt": "2023-03-16T04:53:26.205Z",
        "updatedAt": "2023-03-16T04:53:26.205Z",
        "name": "Max",
        "category": "doggie"
    },
    {
        "id": "clfamyjpa0004vhql4u0ys8lf",
        "createdAt": "2023-03-16T04:53:26.206Z",
        "updatedAt": "2023-03-16T04:53:26.206Z",
        "name": "Cooper",
        "category": "reptile"
    }
]
</code></pre>
<!-- /wp:code -->

Повторное создание заказа для “Luna” приведет к ошибке:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">curl -X POST localhost:3000/api/order/create \
    -H 'Content-Type: application/json' -H "Authorization: Bearer $token"  \
    -d "{ \"data\": { \"userId\": \"$userId\", \"pets\": { \"connect\": { \"id\": \"luna\" } } } }"
</code></pre>
<!-- /wp:code -->

<!-- wp:code -->
<pre class="wp-block-code"><code lang="json" class="language-json">{
    "prisma": true,
    "rejectedByPolicy": true,
    "code": "P2004",
    "message": "denied by policy: Pet entities failed 'update' check, 1 entity failed policy check"
}
</code></pre>
<!-- /wp:code -->

Вы можете продолжить тестирование с моделью Order и посмотреть, соответствует ли ее поведение политике доступа.

<h2 class="wp-block-heading" id="генерация-спецификации-open-api">Генерация спецификации OpenAPI</h2>

На данный момент мы реализовали безопасный REST-подобный API. Он не полностью соответствует дизайну конечной точки RESTful API, ориентированному на ресурсы, но полностью сохраняет гибкость запросов к данным Prisma.

Чтобы назвать его OpenAPI, мы должны предложить формальную спецификацию. К счастью, ZenStack может генерировать спецификации OpenAPI V3 для вас. Вам нужно только включить плагин в вашей схеме:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">npm install -D @zenstackhq/openapi
</code></pre>
<!-- /wp:code -->

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">// schema.prisma
plugin openapi {
    provider = '@zenstackhq/openapi'
    prefix = '/api'
    title = 'Pet Store API'
    version = '0.1.0'
    description = 'My awesome pet store API'
    output = 'petstore-api.json'
}
</code></pre>
<!-- /wp:code -->

Когда вы запустите zenstack generate, он сгенерирует для вас файл petstore-api.json. Вы можете передать его потребителю API с помощью таких инструментов, как Swagger UI.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">npx zenstack generate
</code></pre>
<!-- /wp:code -->

Однако здесь есть оговорка: помните, мы вручную реализовали конечную точку /api/login? ZenStack не знает этого, и сгенерированная спецификация JSON не включает ее. Однако мы можем использовать некоторые дополнительные инструменты, чтобы исправить это.

Сначала установите некоторые новые зависимости:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">npm install swagger-ui-express express-jsdoc-swagger
npm install -D @types/swagger-ui-express
</code></pre>
<!-- /wp:code -->

Затем добавьте JSDoc для указания его входа и выхода в маршрут /api/login:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="typescript" class="language-typescript">// app.ts
/**
 * Login input
 * @typedef {object} LoginInput
 * @property {string} email.required - The email
 * @property {string} password.required - The password
 */

/**
 * Login response
 * @typedef {object} LoginResponse
 * @property {string} id.required - The user id
 * @property {string} email.required - The user email
 * @property {string} token.required - The access token
 */

/**
 * POST /api/login
 * @tags user
 * @param {LoginInput} request.body.required - input
 * @return {LoginResponse} 200 - login response
 */
app.post('/api/login', async (req, res) =&gt; {
    ...
}
</code></pre>
<!-- /wp:code -->

JSDoc прикрепляет метаданные OpenAPI к маршруту /api/login. Затем мы можем использовать express-jsdoc-swagger и swagger-ui-express, чтобы объединить эти два фрагмента спецификации API и создать для них Swagger UI:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="typescript" class="language-typescript">// app.ts
import expressJSDocSwagger from 'express-jsdoc-swagger';

// load the CRUD API spec from the JSON file generated by `zenstack`
const crudApiSpec = require('./petstore-api.json');

// options for loading the extra OpenAPI from JSDoc
const swaggerOptions = {
    info: {
        version: '0.1.0',
        title: 'Pet Store API',
    },
    filesPattern: './app.ts', // scan app.ts for OpenAPI JSDoc
    baseDir: __dirname,
    exposeApiDocs: true,
    apiDocsPath: '/v3/api-docs', // serve the merged JSON specifcation at /v3/api-docs
};

// merge two specs and serve the UI
expressJSDocSwagger(app)(swaggerOptions, crudApiSpec);
</code></pre>
<!-- /wp:code -->

Теперь, если вы нажмете http://localhost:3000/api-docs, вы увидите пользовательский интерфейс документации API. Вы также можете получить доступ к необработанной спецификации JSON по адресу http://localhost:3000/v3/api-docs.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--lQJdusGZ--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://zenstack.dev/../../assets/images/2023-03-18-09-21-50-3f15967125aa8e93df52098d8c1594cb.png" alt="Swagger UI"/></figure>
<!-- /wp:image -->

<h2 class="wp-block-heading" id="генерация-sdk-клиента">Генерация SDK клиента</h2>

Отлично! У нас есть работающий сервис с формальной спецификацией. Теперь потребители могут реализовать клиентов для общения с ним, используя любой HTTP-клиент. Благодаря спецификации OpenAPI мы можем сделать еще один шаг и создать для них SDK с сильным типом клиента.

В этом примере мы достигнем этого, используя <a href="https://github.com/drwpow/openapi-typescript" target="_blank" rel="noreferrer noopener nofollow">openapi-typescript</a> и <a href="https://github.com/drwpow/openapi-typescript-fetch" target="_blank" rel="noreferrer noopener nofollow">openapi-typescript-fetch</a>.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">npm install -D openapi-typescript @types/node-fetch
npm install node-fetch openapi-typescript-fetch
npx openapi-typescript http://localhost:3000/v3/api-docs --output ./client-types.ts
</code></pre>
<!-- /wp:code -->

Затем мы можем использовать сгенерированные типы для выполнения вызовов API с сильной типизацией (как для ввода, так и для вывода). Создайте файл client.ts, чтобы опробовать его:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="typescript" class="language-typescript">// client.ts
import fetch, { Headers, Request, Response } from 'node-fetch';
import { Fetcher } from 'openapi-typescript-fetch';
import { paths } from './client-types';

// polyfill `fetch` for node
if (!globalThis.fetch) {
    globalThis.fetch = fetch as any;
    globalThis.Headers = Headers as any;
    globalThis.Request = Request as any;
    globalThis.Response = Response as any;
}

async function main() {
    const fetcher = Fetcher.for&lt;paths&gt;();
    fetcher.configure({
        baseUrl: 'http://localhost:3000',
    });

    const login = fetcher.path('/api/login').method('post').create();
    const { data: loginResult } = await login({
        email: 'tom@pet.inc',
        password: 'abc123',
    });
    // loginResult is typed as { id: string, email: string, token: string }
    console.log('Login result:', JSON.stringify(loginResult, undefined, 2));
    const token = loginResult.token;

    // get orders together with their pets
    const getOrders = fetcher.path(`/api/order/findMany`).method('get').create();
    const { data: orders } = await getOrders(
        { q: JSON.stringify({ include: { pets: true } }) },
        { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log('Orders:', JSON.stringify(orders, undefined, 2));
}

main();
</code></pre>
<!-- /wp:code -->

Вы можете запустить его с:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">npx tsx client.ts
</code></pre>
<!-- /wp:code -->

<h2 class="wp-block-heading" id="подведение-итогов">Подведение итогов</h2>

Создание сервиса OpenAPI, ориентированного на базу данных, включает множество задач: проектирование модели данных, составление спецификации, реализация сервиса и создание клиентского SDK. Но, как вы видите, это не обязательно должно быть сложно и долго.

Главный вывод: если вы можете использовать единый источник истины для представления схемы данных и правил доступа, на его основе можно создать множество других артефактов. Это сэкономит ваше драгоценное время на написание шаблонного кода, а также значительно упростит синхронизацию всего процесса.

Готовый проект можно найти <a href="https://github.com/ymc9/petstore-openapi-zenstack" target="_blank" rel="noreferrer noopener nofollow">здесь</a>.

P.S. Мы создаем <a href="https://zenstack.dev/?utm_campaign=devto&amp;utm_medium=organic&amp;utm_content=openapi" target="_blank" rel="noreferrer noopener nofollow">ZenStack</a>, набор инструментов, который усиливает Prisma ORM мощным слоем управления доступом и раскрывает его полный потенциал для фуллстэк разработки.
