---
title: API с Typescript + Nest + TypeORM + Postgres + Docker
meta_title: API с Typescript + Nest + TypeORM + Postgres + Docker - Igor Gorlov
description: >-
  В этой статье я покажу вам, как создать проект с использованием TypeScript,
  Nest, Postgres, Docker и как запустить базу данных.
date: 2023-03-21T23:05:08.000Z
author: Igor Gorlov
image: ../../assets/images/undefined-Mar-22-2023.avif
categories:
  - Как закодить
tags:
  - Docker
  - Nest
  - Postgres
  - TypeOrm
draft: false
lastmod: 2024-03-20T21:26:44.144Z
---

В этой статье я покажу вам, как создать проект с использованием TypeScript, Nest, Postgres, Docker и как запустить базу данных.

<strong>TypeScript </strong>- это статически типизированный язык, который является строгим синтаксическим супермножеством JavaScript. Он предлагает улучшенную безопасность типов и поддержку инструментария, что делает его популярным выбором для крупномасштабных проектов.

<strong>Nest </strong>- это фреймворк для создания эффективных, масштабируемых серверных приложений Node.js. Он предоставляет структуру и ряд функций, облегчающих разработку и тестирование приложений.

<strong>Postgres </strong>- мощная реляционная система управления базами данных с открытым исходным кодом, которая хорошо подходит для сложных структур данных и крупномасштабной обработки данных.

<strong>TypeORM </strong>- это инструмент объектно-реляционного отображения (ORM) с открытым исходным кодом, который обеспечивает взаимодействие с реляционными базами данных, такими как MySQL, PostgreSQL и SQLite. Он помогает вам писать код, связанный с базами данных, используя объектно-ориентированное программирование на TypeScript или JavaScript, вместо того чтобы писать необработанные SQL-запросы. TypeORM предлагает множество функций, таких как управление транзакциями, миграция баз данных, пул соединений и т.д., что упрощает работу с базами данных в ваших приложениях.

<strong>Docker </strong>- это платформа контейнеризации, которая упрощает развертывание и запуск приложений в различных средах. Мы запустим базу данных Postgres и поддерживающий ее сервис в docker.

<!-- wp:rank-math/toc-block {"title":"Оглавление","headings":[{"key":"e022f00e-ff13-479b-87c5-fc0e32c46552","content":"Требования","level":2,"link":"#требования","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"82a17ab7-29e4-434b-957b-ae40bfa18be9","content":"Nest:","level":3,"link":"#nest","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"48e3fec4-5550-4fe9-baf7-22844e63c612","content":"База данных PostgreSQL","level":3,"link":"#база-данных-postgre-sql","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"ae8286b9-1d2b-4bad-895f-380873a3ebda","content":"TypeORM","level":3,"link":"#type-orm","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"f00625fe-7992-4037-ba32-2e711cdcde9d","content":"Откройте проект в вашей IDE","level":2,"link":"#откройте-проект-в-вашей-ide","disable":false,"isUpdated":false,"isGeneratedLink":true}],"listStyle":"ul"} -->
<div class="wp-block-rank-math-toc-block" id="rank-math-toc"><h2>Оглавление</h2><nav><ul><li class=""><a href="#требования">Требования</a><ul><li class=""><a href="#nest">Nest:</a></li><li class=""><a href="#база-данных-postgre-sql">База данных PostgreSQL</a></li><li class=""><a href="#type-orm">TypeORM</a></li></ul></li><li class=""><a href="#откройте-проект-в-вашей-ide">Откройте проект в вашей IDE</a></li></ul></nav></div>
<!-- /wp:rank-math/toc-block -->

<h2 class="wp-block-heading" id="требования">Требования</h2>

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="nest"><strong>Nest</strong>:</h3>

Сначала установите nest-cli<code>npm i -g @nestjs/cli</code>

Затем создайте новый проект с помощью команды nest cli<code>nest new project-name</code>

Выберите: npm для менеджера пакетов,

Далее, введите в папку проекта<code>cd project-name</code>

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="база-данных-postgre-sql"><strong>База данных PostgreSQL</strong></h3>

Установите pg<code>npm install pg --save</code>

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="type-orm"><strong>TypeORM</strong></h3>

Установите TypeOrm<code>npm install --save @nestjs/typeorm typeorm postgres</code>

<h2 class="wp-block-heading" id="откройте-проект-в-вашей-ide">Откройте проект в вашей IDE</h2>

В app.module.ts добавьте подключение к базе данных с помощью TypeOrmModule.forRoot():

<!-- wp:code -->
<pre class="wp-block-code"><code lang="typescript" class="language-typescript">// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'password',
      database: 'postgres',
      entities: [`${__dirname}/typeorm/entities/*{.js,.ts}`],
      synchronize: true, // do not use in prod
    }),
  ],
})
export class AppModule {}
</code></pre>
<!-- /wp:code -->

BTW: вы можете удалить app.service и app.controller

Теперь мы должны создать наш первый модуль с помощью nest cli:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">nest g resource modules/users</code></pre>
<!-- /wp:code -->

выберите REST API в терминалевыберите ‘yes’ для генерации точек входа CRUD

После создания модуля мы должны организовать наш проект следующим образом:

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>1) создайте несколько папок с названиями: typeorm &gt; database / entities / seeds</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>2) создайте data-source.ts, main.seed.ts и user.seed.ts</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>3) переместите пользовательскую сущность в папки с сущностями</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">/src/typeorm
├── database
│   └── data-source.ts
├── seeds
│   └── main.seed.ts
└── entities
    └── user.entity.ts *(generated by the script)*
</code></pre>
<!-- /wp:code -->

вставьте в файлы приведенный ниже код:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="typescript" class="language-typescript">// users.entity.ts
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  active: boolean;

  @Column()
  birthday: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
</code></pre>
<!-- /wp:code -->

<!-- wp:code -->
<pre class="wp-block-code"><code lang="typescript" class="language-typescript">// users.service.ts
import { Injectable } from '@nestjs/common';
import { User } from 'src/typeorm/entities/user.entity';
import { DataSource } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private dataSource: DataSource) {}
  private userRepository = this.dataSource.getRepository(User);

  async create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  async findAll(): Promise&lt;User[]&gt; {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    let user = await this.findOne(id);
    user = { ...user, ...updateUserDto };
    return await this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    return await this.userRepository.softRemove(user);
  }
}
</code></pre>
<!-- /wp:code -->

<!-- wp:code -->
<pre class="wp-block-code"><code lang="typescript" class="language-typescript">// data-source.ts
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'root',
  password: 'password',
  database: 'postgres',
  entities: ['src/**/*.entity{.js,.ts}'],
};

export default new DataSource(dataSourceOptions);
</code></pre>
<!-- /wp:code -->

<!-- wp:code -->
<pre class="wp-block-code"><code lang="typescript" class="language-typescript">// main.seed.ts
import { DataSource } from 'typeorm';
import { dataSourceOptions } from '../database/data-source';
import { User } from '../entities/user.entity';

const dataSource = new DataSource(dataSourceOptions);
const userRepository = dataSource.getRepository(User);

async function connect() {
  try {
    if (dataSource.isInitialized) {
      await dataSource.destroy();
    }
    await dataSource.initialize();
    console.log('Data Source has been initialized!');
  } catch (err) {
    console.error('Error during Data Source connect', err);
  }
}

async function disconnect() {
  try {
    await dataSource.destroy();

    console.log('Data Source disconnected!');
  } catch (err) {
    console.error('Error during Data Source disconnect', err);
  }
}

async function seed() {
  const UserSeed = () =&gt; [
    {
      name: 'John Doe',
      email: 'john@doe.com',
      active: true,
      birthday: '1990-01-01',
    },
    {
      name: 'Jane Doe',
      email: 'jane@doe.com',
      active: false,
      birthday: '1990-01-31',
    },
    {
      name: 'Josh Doe',
      email: 'josh@doe.com',
      active: true,
      birthday: '2020-12-31',
    },
  ];

  await userRepository.save(UserSeed());
  console.log('created seeds');
}

async function runSeed() {
  await connect();
  console.log('connected');
  await seed();
  console.log('seed done');
  await disconnect();
  console.log('disconnected');
}

runSeed();

</code></pre>
<!-- /wp:code -->

Теперь мы должны создать наш файл ‘docker-compose.yml’ в корневой папке, а затем запустить sudo docker-compose up:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="docker" class="language-docker">version: '3.1'

services:
  db:
    image: postgres:14.2-alpine
    restart: always
    environment:
      POSTGRES_USER: "root"
      POSTGRES_PASSWORD: "password"
      POSTGRES_DB: "postgres"
    ports:
      - "5432:5432"
</code></pre>
<!-- /wp:code -->

Несколько полезных команд docker:

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li><code>sudo docker ps</code> to list all containers</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><code>sudo docker stop my_container_name</code> to stop a specific container</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

Теперь добавьте скрипт в файл package.json

<!-- wp:code -->
<pre class="wp-block-code"><code lang="json" class="language-json">// package.json
"seed":"npx ts-node src/typeorm/seeds/main.seed.ts",
</code></pre>
<!-- /wp:code -->

в новом терминале на IDE запустите код <code>npm start</code> для синхронизации базы данных

Завершите приложение, а затем запустите скрипт<code> npm run seed</code> для заполнения базы данных.

Готово! Теперь, если вы запустите <code>npm start</code> и отправите GET-запрос на <code>localhost:3000/users</code>, вы должны получить всех пользователей из seed.
