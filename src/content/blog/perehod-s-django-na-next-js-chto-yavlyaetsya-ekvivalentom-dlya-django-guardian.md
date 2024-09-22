---
title: 'Переход с Django на Next.js: Что является эквивалентом для Django-Guardian?'
meta_title: >-
  Переход с Django на Next.js: Что является эквивалентом для Django-Guardian? -
  Igor Gorlov
description: >-
  Django – это популярный веб-фреймворк на основе Python. Это огромный так
  называемый “battery-included” фреймворк, охватывающий многие аспекты
  веб-разработки: аутентификацию, ORM, формы, панели администратора и т.д.
date: 2023-03-26T20:54:02.000Z
author: Igor Gorlov
image: ../../assets/images/undefined-Mar-26-2023.avif
categories:
  - Как закодить
tags:
  - Next.js
  - Python
  - ZenStack
draft: false
lastmod: 2024-03-20T21:26:48.543Z
---

Django - это популярный веб-фреймворк на основе Python. Это огромный так называемый “battery-included” фреймворк, охватывающий многие аспекты веб-разработки: аутентификацию, ORM, формы, панели администратора и т.д. Это также фреймворк с сильным мнением, который предлагает шаблоны почти для всего, что вы делаете, что позволяет вам чувствовать себя хорошо управляемым во время разработки.

Однако в последние несколько лет Django, как и большинство не-JS стеков, уступает свои позиции JS-фреймворкам, таким как Next.js, Remix, Nuxt и др.

Переход от одного фреймворка к другому требует тщательного планирования и исполнения, особенно если вы одновременно меняете язык. Популярным и мощным Javascript/Typescript эквивалентным стеком для Django может быть следующая комбинация:

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li><a href="https://nextjs.org/" target="_blank" rel="noreferrer noopener nofollow">Next.js</a>: маршрутизация URL, SSR и создание страниц с помощью ReactJS (слой представления + шаблонов Django).</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><a href="https://next-auth.js.org/" target="_blank" rel="noreferrer noopener nofollow">NextAuth</a>: аутентификация (аутентификация Django)</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><a href="https://prisma.io/" target="_blank" rel="noreferrer noopener nofollow">Prisma</a>: ORM + миграция баз данных (слой моделей Django).</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

Эти части очень хорошо сочетаются друг с другом и достаточны для замены большинства возможностей, которые предоставляет Django. Однако одного элемента не хватает. В Django есть встроенная функция разрешений, но она ограничена контролем на уровне модели, т.е. если пользователь или группа имеют доступ X к модели типа Y. Многие пользователи используют популярный пакет django-guardian для реализации разрешений на уровне строк. Он позволяет устанавливать разрешения между пользователями/группами и объектами, управляет базовыми таблицами базы данных разрешений и предоставляет API для настройки и проверки таких разрешений.

К счастью, если вы решите использовать Prisma ORM в своем новом стеке, вы можете использовать ZenStack для достижения аналогичных функций с меньшими усилиями. ZenStack - это набор инструментов, созданный как расширение возможностей Prisma ORM, и одним из его основных направлений является контроль доступа. В этом посте мы кратко сравним, как django-guardian и ZenStack решают проблему разрешений на уровне строк, соответственно.

<!-- wp:rank-math/toc-block {"title":"Оглавление","headings":[{"key":"6c2e2155-5c6f-46b8-a725-c875e5ba69ee","content":"Назначение разрешений","level":2,"link":"#назначение-разрешений","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"3c7b5e0d-0af6-4f5b-ba46-6c16b31adcdb","content":"Проверка разрешений","level":2,"link":"#проверка-разрешений","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"66f76b88-468a-44c9-b85c-dc47902dcdb0","content":"Подведение итогов","level":2,"link":"#подведение-итогов","disable":false,"isUpdated":false,"isGeneratedLink":true}],"listStyle":"ul"} -->
<div class="wp-block-rank-math-toc-block" id="rank-math-toc"><h2>Оглавление</h2><nav><ul><li class=""><a href="#назначение-разрешений">Назначение разрешений</a></li><li class=""><a href="#проверка-разрешений">Проверка разрешений</a></li><li class=""><a href="#подведение-итогов">Подведение итогов</a></li></ul></nav></div>
<!-- /wp:rank-math/toc-block -->

<h2 class="wp-block-heading" id="назначение-разрешений">Назначение разрешений</h2>

Предположим, мы создаем сайт для ведения блогов и имеем модель Post. В Django уже есть встроенные модели User и Group и предопределенные CRUD разрешения для каждой модели. С помощью django-guardian вы можете использовать API assign_perm для назначения разрешений:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">from django.contrib.auth.models import User, Group
from guardian.shortcuts import assign_perm

# establishing permission between a user and a post
user1 = User.objects.create(username='user1')
post1 = Post.object.create(title='My Post', slug='post1')
assign_perm('view_post', user1, post1)
assign_perm('change_post', user1, post1)

# establishing permission between a group and a post
group1 = Group.objects.create(name='group1')
user1.groups.add(group1)
assign_perm('view_post', group1, post1)
assign_perm('change_post', group1, post1)
</code></pre>
<!-- /wp:code -->

В отличие от Django, Next.js + Prisma + ZenStack является неориентированным фреймворком и не имеет встроенных моделей для User и Group. Вам необходимо явно смоделировать их с помощью схемы ZenStack:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">model User {
  id Int @id @default(autoincrement())
  username String
  groups Group[]
}

model Group {
  id Int @id @default(autoincrement())
  name String
  users User[]
}
</code></pre>
<!-- /wp:code -->

Схема не только моделирует типы данных и отношения, но и позволяет выразить в ней полномочия. Давайте посмотрим, как смоделировать разрешения пользователя и группы на пост:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">model User {
  id Int @id @default(autoincrement())
  username String
  groups Group[]
  posts Post[]
}

model Group {
  id Int @id @default(autoincrement())
  name String
  users User[]
  posts Post[]
}

model Post {
  id Int @id @default(autoincrement())
  title String
  slug String @unique
  groups Group[]
  users User[]

  // if the current user is in the user list of the post, update is allowed
  @@allow('read,update', users?[id == auth().id])

  // if the current user is in any group of the group list of the post, 
  // update is allowed
  @@allow('read,update', groups?[users?[id == auth().id]])

  // ... other permissions
}
</code></pre>
<!-- /wp:code -->

Некоторые разъяснения:

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Синтаксис @@allow добавляет метаданные контроля доступа к модели. Действие разрешено, если любое из правил @@allow имеет значение true.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>auth() представляет текущего пользователя для входа в систему. Вскоре вы увидите, как он подключается.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Синтаксис model?[expression] представляет собой предикат над отношением to-many. users?[id == auth().id] читается как "имеет ли любой элемент в коллекции users id, равный id текущего пользователя".</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

Как вы можете видеть, подход к моделированию разрешений совершенно разный для django-guardian и ZenStack. Django-guardian использует императивный код для управления разрешениями в коде приложения, в то время как ZenStack предпочитает декларативный стиль в схеме данных. Кроме того, в django-guardian установка и проверка разрешений (показанные в следующем разделе) разделены, в то время как в ZenStack вы моделируете данные о разрешениях и правила в одном месте.

<h2 class="wp-block-heading" id="проверка-разрешений">Проверка разрешений</h2>

Как и в случае с назначением разрешений, в django-guardian проверка разрешений также выполняется явно в коде приложения, в основном одним из двух способов:

<strong>1. Используя императивный код</strong>

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">user1 = User.objects.get(username='user1')
post1 = Post.objects.get(slug='post1')

from guardian.core import ObjectPermissionChecker
checker = ObjectPermissionChecker(user1)
if checker.has_perm('change_post', post1):
  # update logic here
</code></pre>
<!-- /wp:code -->

<strong>2. Использование декораторов</strong>

Вы также можете использовать декораторы для включения автоматической проверки разрешений в представлениях:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">from guardian.decorators import permission_required_or_403

@permission_required_or_403('change_post', (Post, 'slug', 'post_slug'))
def edit_post(request, post_slug):
  # update logic here
</code></pre>
<!-- /wp:code -->

Независимо от того, какой метод вы используете, вы должны обеспечить добавление проверки везде, где необходимо проверить разрешения.

В ZenStack проверка разрешений намного проще, поскольку правила выражены на уровне ORM, поэтому они автоматически применяются при вызове уровня данных:

Когда перечисляются посты, возвращаются только те, которые принадлежат текущему пользователю или его группе.<br>Когда пост обновляется, операция отклоняется, если пользователь не принадлежит к посту или какой-либо группе этого поста.

Единственная необходимая настройка - создать клиентскую обертку Prisma с контролем доступа и текущим пользователем в качестве контекста:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">// update-post.ts: function for updating a post
import { prisma } from './db';
import { getSessionUser } from './auth';

export function updatePost(request: Request, slug: string, data: PostUpdateInput) {
  const user = await getSessionUser(req);

  // get an access-control enabled Prisma wrapper
  // the "user" context value supports the `auth()` 
  // function in the permission rules
  const db = withPresets(prisma, { user });

  // error will be thrown if the current user doesn't
  // have permission
    return db.post.update({ where: { slug }, data });
}
</code></pre>
<!-- /wp:code -->

<h2 class="wp-block-heading" id="подведение-итогов">Подведение итогов</h2>

Как видите, и django-guardian, и ZenStack решают проблемы с разрешениями на уровне строк, хотя и в совершенно разных парадигмах. Django-guardian полагается на императивный код, и ответственность за то, чтобы обеспечить надлежащую логику проверки там, где это необходимо, в большей степени лежит на разработчике.

С другой стороны, ZenStack отдает предпочтение декларативному моделированию. Поскольку правила выражаются на уровне ORM, они автоматически применяются ко всему коду приложения, использующему уровень данных, что повышает согласованность и надежность.

Будучи относительно новым инструментарием, ZenStack не лишен своих ограничений. Например, по сравнению с django-guardian, в нем отсутствуют две основные функции:

<strong>Пользовательские разрешения</strong>

ZenStack моделирует фиксированный набор разрешений: CRUD, в то время как django-guardian позволяет вам определять пользовательские разрешения. Хотя все разрешения в конечном итоге сводятся к CRUD, пользовательские разрешения могут выражать тонкий контроль разрешений на уровне полей. Это пока не поддерживается ZenStack.

<strong>API для явной проверки разрешений</strong>

Проверка разрешений в ZenStack внедрена в CRUD API ORM. Однако иногда бывает удобно явно проверить, есть ли у пользователя разрешение на определенный объект, и использовать его, например, для динамического отображения пользовательского интерфейса.

Я надеюсь, что эта статья поможет вам на пути перехода вашего стека python в мир Javascript, и удачи вам в этом начинании!
