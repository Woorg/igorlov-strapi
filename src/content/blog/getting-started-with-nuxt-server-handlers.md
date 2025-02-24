---
title: Начало работы с обработчиками Nuxt Server
meta_title: Начало работы с обработчиками Nuxt Server | Игорь Горлов - Фронтeндер
description: >-
  Компании Nuxt, Next.js, SvelteKit и другие постоянно внедряют инновационные
  решения, основанные на парадигме рендеринга на стороне сервера. Эта парадигма
  генер
date: 2024-02-09T00:00:00.000Z
categories:
  - Учебник
author: Игорь Горлов
type: blog
draft: false
slug: nachalo-rabot-s-obrabotchykamy-nuxt-server
tags:
  - Nuxt
  - Vue
image: >-
  ../../assets/images/nachalo-rabot-s-obrabotchykamy-nuxt-server-Feb-09-2024.avif
lastmod: 2024-03-20T21:26:47.432Z
---

Компании Nuxt, Next.js, SvelteKit и другие постоянно внедряют инновационные решения, основанные на парадигме рендеринга на стороне сервера. Эта парадигма генерирует веб-контент на стороне сервера для каждого запроса, что приводит к повышению производительности веб-приложений, улучшению SEO и улучшению пользовательского опыта.

Помимо простого вывода и генерации контента на веб-странице, заметным дополнением в релизе Nuxt является поддержка обработчиков сервера. Эта возможность позволяет нам определять функции, которые безопасно выполняются на сервере и могут возвращать JSON-данные, обещание или использовать `event.node.res.end()` в качестве ответа. Соответствующие API можно вызывать со страниц и компонентов Nuxt.

В этом посте мы узнаем, как использовать серверные обработчики Nuxt для создания базового приложения todo с использованием бессерверной платформы баз данных Xata. Репозиторий проекта можно найти здесь.

## Необходимые условия

Чтобы следовать этому руководству, необходимо следующее:

- Базовое понимание TypeScript и Nuxt Xata CLI
- Установленный аккаунт Xata

## Настройка проекта

В этом проекте мы будем использовать готовый пользовательский интерфейс, чтобы ускорить разработку. Чтобы начать, давайте клонируем проект, перейдя в нужную директорию и выполнив команду ниже:

```bash
git clone https://github.com/Mr-Malomz/server-handlers.git && cd server-handlers
```

## Запуск проекта

Далее нам нужно установить зависимости проекта, выполнив команду ниже:

`npm i`

Затем запустите приложение:

`npm run dev`

## Настройте базу данных на Xata

Чтобы начать работу, войдите в рабочую область Xata и создайте базу данных `todo`. Внутри базы данных `todo` создайте таблицу `Todo` и добавьте в нее столбец `description` типа `String`.

Получите URL-адрес базы данных и настройте ключ API

Чтобы безопасно подключиться к базе данных, Xata предоставляет уникальный и безопасный URL-адрес для доступа к ней. Чтобы получить URL-адрес базы данных, нажмите кнопку Получить фрагмент кода и скопируйте URL-адрес. Затем нажмите на ссылку API Key, добавьте новый ключ, сохраните и скопируйте API-ключ.

## Настройка переменной окружения

Для этого обновите файл `nuxt.config.ts`, чтобы определить конфигурацию времени выполнения, которую приложение будет использовать для загрузки переменных окружения.

```js
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	css: ['~/../../assets/css/main.css'],
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
	runtimeConfig: {
		public: {
			xataApiKey: '',
			xataDatabaseUrl: '',
		},
	},
});
```

Далее мы должны создать файл `index.d.ts` в корневой директории для ввода нашей конфигурации времени выполнения.

```js
declare module 'nuxt/schema' { interface PublicRuntimeConfig { xataDatabaseUrl: string; xataApiKey: string; } } export {};
```

Наконец, мы должны добавить URL нашей базы данных и ключ API в качестве переменной окружения. Для этого создайте файл `.env` в корневом каталоге и добавьте в него скопированные URL и ключ API.

```js
XATA_DATABASE_URL= <ЗАМЕНИТЬ НА СКОПИРОВАННЫЙ URL БАЗЫ ДАННЫХ> XATA_API_KEY= <ЗАМЕНИТЬ НА СКОПИРОВАННЫЙ API КЛЮЧ>
```

## Интеграция Xata с Nuxt

Чтобы легко интегрировать Xata с Nuxt, Xata предоставляет CLI для установки необходимых зависимостей и генерации полностью безопасного для типов API-клиента. Для этого нам нужно выполнить приведенную ниже команду:

`xata init`

После выполнения команды нам придется ответить на несколько вопросов. Ответьте на них, как показано ниже:

`Generate code and types from your Xata database <TypeScript> Choose the output path for the generated code lib/xata.ts`.

После этого в корневом каталоге должен появиться файл `lib/xata.ts`.

Лучше всего не модифицировать сгенерированный код, а создать вспомогательную функцию для его использования. Для этого создайте в корневом каталоге файл `utils/xataClient.ts` и вставьте в него фрагмент, приведенный ниже:

```js
import { XataClient } from '~/lib/xata';

export const xataClient = () => {
  const config = useRuntimeConfig();
  const xata = new XataClient({
    databaseURL: config.public.xataDatabaseUrl,
    apiKey: config.public.xataApiKey,
    branch: 'main',
  });
  return xata;
};

export interface ApiResponse<T> {
  status: number;
  message: string;
  data?: T;
  error?: {
    message: string;
  };
}
```

Приведенный выше фрагмент импортирует класс `XataClient` из сгенерированного кода и настраивает клиента с необходимыми параметрами. Кроме того, мы определяем интерфейс `ApiResponse` для описания типа ответа аутентификации.

## Building приложение todo

Когда создается новый проект Nuxt, он включает в себя каталог `server`. Этот каталог предназначен для регистрации обработчиков сервера для нашего приложения. Процесс включает в себя создание каталогов и файлов внутри каталога сервера. Nuxt автоматически просканирует и зарегистрирует эти файлы и каталоги как Server Handlers с поддержкой Hot Module Replacement.

В наших приложениях todo мы будем использовать обработчики сервера для выполнения следующих действий:

- Создать todo
- Получить todo
- Обновить todo
- Удалить todo
- Список todo

## Создать тодо

Чтобы создать todo, нам нужно создать `api/createTodo.ts` в папке `server` и вставить в него фрагмент, приведенный ниже:

```js
import { TodoRecord } from '~/lib/xata';
import { ApiResponse, xataClient } from '~/utils/xataClient';

export default defineEventHandler(async (event) => {
  const xata = xataClient();
  const { description } = await readBody(event);
  const response = await xata.db.Todo.create({ description });

  if (response.description) {
    const successResponse: ApiResponse<TodoRecord> = {
      status: 201,
      message: 'success',
      data: response,
    };
    return successResponse;
  } else {
    const failureResponse: ApiResponse<string> = {
      status: 500,
      message: 'failed',
      error: { сообщение: 'Error creating todo' },
    };
    return failureResponse;
  }
});
```

Приведенный выше фрагмент выполняет следующие действия:

Импортирует необходимые зависимости Создает обработчик, который извлекает необходимую информацию и использует `xataClient` для создания todo. Функция также использует интерфейс `ApiResponse` для возврата соответствующего ответа

## Получить тодо

Чтобы получить todo, нам нужно создать файл динамического маршрута `api/[id].ts` и вставить в него фрагмент, приведенный ниже:

```js
import { TodoRecord } from '~/lib/xata';
import { ApiResponse, xataClient } from '~/utils/xataClient';

export default defineEventHandler(async (event) => {
  const xata = xataClient();
  const id = event.context.params!.id;

  if (!id) {
    const emptyDescriptionResponse: ApiResponse<string> = {
      status: 400,
      message: 'failed',
      error: {
        message: 'No id provided.',
      },
    };
    return emptyDescriptionResponse;
  }

  const response = await xata.db.Todo.read(id);

  if (response) {
    const successResponse: ApiResponse<TodoRecord> = {
      status: 200,
      message: 'success',
      data: response,
    };
    return successResponse;
  } else {
    const failureResponse: ApiResponse<string> = {
      status: 500,
      message: 'failed',
      error: {
        message: 'Error getting todo',
      },
    };
    return failureResponse;
  }
});
```

Приведенный выше фрагмент получает динамический параметр, проверяет, доступен ли он, использует его для получения сведений о связанном с ним todo и возвращает соответствующий ответ.

## Обновление тодо

Чтобы обновить todo, нам нужно создать файл `api/updateTodo.ts` и вставить в него фрагмент, приведенный ниже:

```js
import { TodoRecord } from '~/lib/xata';
import { ApiResponse, xataClient } from '~/utils/xataClient';

export default defineEventHandler(async (event) => {
  const xata = xataClient();
  const { description, id } = await readBody(event);
  const response = await xata.db.Todo.update(id, { description });

  if (response) {
    const successResponse: ApiResponse<TodoRecord> = {
      status: 200,
      message: 'success',
      data: response,
    };
    return successResponse;
  } else {
    const failureResponse: ApiResponse<string> = {
      status: 500,
      message: 'failed',
      error: { сообщение: 'Error updating todo' },
    };
    return failureResponse;
  }
});
```

Приведенный выше фрагмент выполняет действие, аналогичное функции создания todo, но обновляет todo путем поиска соответствующего todo и его обновления.

## Удаление todo

Чтобы удалить todo, нам нужно создать файл `api/deleteTodo.ts` и вставить в него фрагмент, приведенный ниже:

```js
import { ApiResponse, xataClient } from '~/utils/xataClient';

export default defineEventHandler(async (event) => {
  const xata = xataClient();
  const { id } = await readBody(event);
  const response = await xata.db.Todo.delete(id);

  if (response) {
    const successResponse: ApiResponse<string> = {
      status: 200,
      message: 'success',
      data: 'Todo удален успешно',
    };
    return successResponse;
  } else {
    const failureResponse: ApiResponse<string> = {
      status: 500,
      message: 'failed',
      error: {
        message: 'Error deleting todo',
      },
    };
    return failureResponse;
  }
});
```

В приведенном выше фрагменте мы получаем `id` todo и используем `xataClient` для удаления соответствующего todo.

## Список тодо

Чтобы получить список тодо, нам нужно создать файл `api/listTodo.ts` и вставить в него фрагмент, приведенный ниже:

```js
import { TodoRecord } from '~/lib/xata';
import { ApiResponse, xataClient } from '~/utils/xataClient';

export default defineEventHandler(async (event) => {
  const xata = xataClient();
  const response = await xata.db.Todo.getAll();

  if (response) {
    const successResponse: ApiResponse<TodoRecord[]> = {
      status: 200,
      message: 'success',
      data: response,
    };
    return successResponse;
  } else {
    const failureResponse: ApiResponse<string> = {
      status: 500,
      message: 'failed',
      error: {
        message: 'Error getting todo list',
      },
    };
    return failureResponse;
  }
});
```

В приведенном выше фрагменте используется `xataClient` для получения списка тодо и возвращает соответствующие ответы.

## Собираем все вместе!

После этого мы можем начать использовать обработчики в пользовательском интерфейсе.

Обновление компонента создания тодо

Для этого нам нужно изменить файл `components/TodoForm.vue`, как показано ниже:

```js
<script setup lang="ts">
  const description = ref<string>("");
  const errorMsg = ref<string>("");
  const emit = defineEmits();

  const onSubmit = async () => {
    const response = await $fetch("/api/createTodo", {
      method: "POST",
      body: { description: description.value }
    });

    if (response.status === 201) {
      emit("todo-created", response.data);
      description.value = "";
      errorMsg.value = "";
    } else {
      errorMsg.value = String(response.error?.message);
    }
  }
</script>

<template>
  <form @submit.prevent="onSubmit">
    <p class="text-sm text-red-500 text-center" v-if="errorMsg !== ''">{{ errorMsg }}</p>
    <textarea
      name="description"
      cols={30}
      rows={2}
      class="w-full border rounded-lg mb-2 p-4"
      placeholder="Input todo details"
      required
      v-model="description"
    />
    <div class="flex justify-end">
      <div>
        <button class="py-1 px-4 w-full h-10 rounded-lg text-white bg-zinc-800 hover:bg-zinc-900">Создать</button>
      </div>
    </div>
  </form>
</template>
```

Приведенный выше фрагмент использует серверный обработчик `createTodo`, обращаясь к нему через маршрут `/api/createTodo` для создания тодо.

## Обновление компонента редактирования todo

Чтобы обновить todo, сначала нужно изменить файл `components/EditTodoForm.vue`, как показано ниже:

```js
<script setup lang="ts">
import type { TodoRecord } from '~/lib/xata';
const props = defineProps<{ todo: TodoRecord }>();
const description = ref<string>("");
const errorMsg = ref<string>("");

watchEffect(() => {
  if (props.todo) {
    description.value = props.todo.description || "";
  }
});

const onSubmit = async () => {
  const response = await $fetch("/api/updateTodo", {
    method: "PUT",
    body: {
      id: props.todo.id,
      description: description.value
    }
  });

  if (response.status === 200) {
    description.value = "";
    errorMsg.value = "";
    await navigateTo('/');
  } else {
    errorMsg.value = String(response.error?.message);
  }
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <p class="text-sm text-red-500 text-center" v-if="errorMsg !== ''">{{ errorMsg }}</p>
    <textarea
      name="description"
      cols={30}
      rows={2}
      className="w-full border rounded-lg mb-2 p-4"
      placeholder="Input todo details"
      required
      v-model="description"
    />
    <div className="flex justify-end">
      <div>
        <button class="py-1 px-4 w-full h-10 rounded-lg text-white bg-zinc-800 hover:bg-zinc-900">Обновить</button>
      </div>
    </div>
  </form>
</template>
```

Приведенный выше фрагмент выполняет следующие действия:

Импортирует необходимую зависимость Модифицирует компонент для принятия свойства `todo` Создает функцию onSubmit, которая использует обработчик сервера `updateTodo`, обращаясь к нему через маршрут `/api/updateTodo` для обновления todo

Наконец, мы должны изменить файл `pages/[todo]/[id].vue`, чтобы получить значение подходящего todo и передать требуемый prop компоненту `EditTodoForm`.

```js
<script setup lang="ts">
  import { X } from 'lucide-vue-next';
  import type { TodoRecord } from '~/lib/xata';
  const route = useRoute();
  const todo = ref<TodoRecord>();
  const errorMsg = ref<string>("");

  const fetchData = async () => {
    try {
      const response = await $fetch<ApiResponse<TodoRecord>>(`/api/${route.params.id}`, {
        method: "GET",
      });
      if (response.status === 200) {
        todo.value = response.data;
      } else {
        errorMsg.value = response.error!.message;
      }
    } catch (error) {
      errorMsg.value = "Error fetching data";
    }
  };

  onMounted(() => {
    fetchData();
  });
</script>

<template>
  <div class="relative z-10">
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
    <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
      <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <NuxtLink to="/" class="flex justify-end mb-2">
              <X class="cursor-pointer" />
            </NuxtLink>
            <edit-todo-form :todo="todo!" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
```

Обновите главную страницу, чтобы получить список тодо и удалить тодо

Для этого нам сначала нужно изменить файл `components/TodoComp.vue`, как показано ниже:

```js
<script setup lang="ts">
  import { Pencil, Trash2 } from 'lucide-vue-next';
  import type { TodoRecord } from '~/lib/xata';
  const router = useRouter();
  const props = defineProps<{ todos: TodoRecord[] }>();
  const errorMsg = ref<string>("");

  const onDelete = async (id: string) => {
    const response = await $fetch("/api/deleteTodo", {
      method: "DELETE",
      body: { id }
    });

    if (response.status === 200) {
      router.go(0);
    } else {
      errorMsg.value = String(response.error?.message);
    }
  }
</script>

<template>
  <div class='flex border p-2 rounded-lg mb-2' v-for="todo in props.todos" :key="todo.id">
    <div class='ml-4'>
      <header class='flex items-center mb-2'>
        <h5 class='font-medium'>Todo item {{ todo.id }}</h5>
        <p class='mx-1 font-light'>|</p>
        <p class='text-sm'>{{ todo.xata.createdAt.toString().slice(0, 10) }}</p>
      </header>
      <p class='text-sm text-zinc-500 mb-2'> {{ todo.description }} </p>
      <div class='flex gap-4 items-center'>
        <NuxtLink :to="`todo/${todo.id}`" class='flex items-center border py-1 px-2 rounded-lg hover:bg-zinc-300'>
          <Pencil class='h-4 w-4' />
          <p class='ml-2 text-sm'>Редактировать</p>
        </NuxtLink>
        <button @click="onDelete(todo.id)" class='flex items-center border py-1 px-2 rounded-lg hover:bg-red-300'>
          <Trash2 class='h-4 w-4' />
          <p class='ml-2 text-sm'>Удалить</p>
        </button>
      </div>
    </div>
  </div>
</template>
```

Приведенный выше сниппет выполняет следующие действия:

Импортирует необходимую зависимость Модифицирует компонент для приема свойства `todos` Создает функцию `onDelete`, которая использует обработчик сервера `deleteTodo`, обращаясь к нему через маршрут `/api/deleteTodo` для удаления todo Использует свойство для цикла и отображения необходимой информации

Наконец, нам нужно обновить файл `pages/index.vue`, как показано ниже:

```js
<script setup lang="ts">
  import type { TodoRecord } from '~/lib/xata';
  const todos = ref<TodoRecord[]>([]);
  const errorMsg = ref<string>("");

  const fetchData = async () => {
    try {
      const response = await $fetch<ApiResponse<TodoRecord[]>>("/api/listTodo", {
        method: "GET",
      });
      if (response.status === 200) {
        todos.value = response.data!;
      } else {
        errorMsg.value = response.error!.message;
      }
    } catch (error) {
      errorMsg.value = "Error fetching data";
    }
  };

  const handleTodoCreated = (createdTodo: TodoRecord) => {
    todos.value.push(createdTodo);
  };

  onMounted(() => {
    fetchData();
  });
</script>

<template>
  <main class="min-h-screen w-full bg-[#fafafa]">
    <nav-bar />
    <div class="w-full mt-6 flex justify-center">
      <div class="w-full lg:w-1/2">
        <todo-form @todo-created="handleTodoCreated" />
        <section class="border-t border-t-zinc-200 mt-6 px-2 py-4">
          <p class="text-sm text-red-500 text-center" v-if="errorMsg !== ''">{{ errorMsg }}
          <p className='text-sm text-zinc-500 text-center' v-else-if="todos.length === 0">Нет пока никаких тодо!
          <todo-comp v-else :todos="todos" />
        </section>
      </div>
    </div>
  </div>
  </main>
</template>
```

Приведенный выше фрагмент получает список todos и передает необходимые реквизиты компонентам.

После этого мы можем протестировать наше приложение, выполнив следующую команду:

`npm run dev`.

Посмотрите демо-версию ниже:

![giphy.gif](../../assets/images/giphy.gif)

## Заключение

В этом посте мы рассмотрели, как использовать Nuxt Server Handlers для создания базового приложения todo. Серверный каталог позволяет пользователям создавать API, которые безопасно работают на сервере.
