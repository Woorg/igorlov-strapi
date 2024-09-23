---
title: Когда и где использовать ReScript? Счастливый путь ReScript
meta_title: >-
  Когда и где использовать ReScript? Счастливый путь ReScript | Игорь Горлов -
  Фронтeндер
description: >-
  Отказ от ответственности: Эта статья  мнение, и она предполагает, что вы уже
  немного изучили ReScript. Я написал ее, чтобы обосновать свое мнение об
  использов
date: 2023-12-18T00:00:00.000Z
categories:
  - Обзор
author: Игорь Горлов
draft: false
slug: kohda-y-hde-yspolzovat-rescript-schastlyv-i-put-rescript
translatedPosition: 69
tags:
  - ReScript
  - Typescript
image: >-
  ../../assets/images/kohda-y-hde-yspolzovat-rescript-schastlyv-i-put-rescript-Dec-18-2023.avif
lastmod: 2024-03-20T21:26:48.087Z
---

Отказ от ответственности: Эта статья - мнение, и она предполагает, что вы уже немного изучили ReScript. Я написал ее, чтобы обосновать свое мнение об использовании или неиспользовании ReScript в некоторых проектах. Если вам интересно узнать больше, посетите форум ReScript, чтобы узнать больше мнений.

Вы сомневаетесь, стоит ли внедрять ReScript, или уже пробовали и разочаровались? Я дам вам реалистичное руководство по внедрению ReScript в проект.

## Что такое ReScript?

ReScript - это язык, который компилируется в JavaScript и обеспечивает лучшую систему типов, быструю компиляцию и проверку типов. Он обеспечивает лучшую в своем классе совместимость с JavaScript среди многих аналогичных языков.

## В чем отличие от TypeScript?

Согласно официальной документации, ReScript и TypeScript имеют довольно разные подходы к работе с кодом.

Дизайн TypeScript нацелен на выражение кода, уже написанного на JS. В каком-то смысле это выходит за рамки систем типов. В результате система типов TypeScript является более мощной и гибкой, чем любая другая система типов. Она способна выразить даже грязные и несостоятельные модели реального мира.

ReScript, с другой стороны, нацелен на поддержку грамотного моделирования данных. Он обеспечивает первоклассную поддержку ADT (алгебраических типов данных), полезную для моделирования, и сопоставление образцов для выражения декларативной логики, причем все это основано на его надежной системе типов.

Позвольте мне показать вам простую машину состояний в ReScript.

```ts
// Counter.res
type data = {
  count: int
}

type state =
  | Paused(data)
  | Running(data)

type event =
  | Start
  | Pause
  | Resume
  | Increase
  | Decrease
  | Reset

let init = () => Paused({ count: 0 })

let next = (state, event) => {
  // Compiler understand what type you want here, without additional annotations
  switch (state, event) {
  | (Paused(data), Start | Resume) => Running(data)
  | (Running({ count }), Increase) => Running({ count: count + 1 })
  | (Running({ count }), Decrease) => Running({ count: count - 1 })
  | (Running(data), Pause) => Paused({ count: count })
  | (_, Reset) => init()
  }
}
```

Красиво, правда?

Теоретически это также означает отказ от некоторой выразительности модели. В обмен на мощные возможности вы не сможете выразить в ReScript все, что можно выразить в JavaScript/TypeScript.

## Когда рескрипт причиняет боль

Если вы используете `lodash/fp` или Ramda.js для составления функций, или вам нравится использовать ts-pattern для имитации сопоставления шаблонов в TypeScript, вас также могут заинтересовать языки вроде ReScript.

Но усыновить ребенка часто бывает непросто.

Из-за вышеупомянутых различий вам может быть трудно выразить в ReScript то, что вы обычно выражали в TypeScript, или вы можете почувствовать себя перегруженным привязкой часто используемых внешних типов.

```ts
@send external beginPath: t => unit = "beginPath"
@send external closePath: t => unit = "closePath"
@send external fill: t => unit = "fill"
@send external stroke: t => unit = "stroke"
@send external clip: t => unit = "clip"
@send external moveTo: (t, ~x: float, ~y: float) => unit = "moveTo"
@send external lineTo: (t, ~x: float, ~y: float) => unit = "lineTo"
@send external quadraticCurveTo: (t, ~cp1x: float, ~cp1y: float, ~x: float, ~y: float) => unit = "quadraticCurveTo"
@send external bezierCurveTo: ( t, ~cp1x: float, ~cp1y: float, ~cp2x: float, ~cp2y: float, ~x: float, ~y: float, ) => unit = "bezierCurveTo"
@send external arcTo: (t, ~x1: float, ~y1: float, ~x2: float, ~y2: float, ~r: float) => unit = "arcTo"
@send external arc: ( t, ~x: float, ~y: float, ~r: float, ~startAngle: float, ~endAngle: float, ~anticw: bool, ) => unit = "arc"
@send external rect: (t, ~x: float, ~y: float, ~w: float, ~h: float) => unit = "rect"
@send external isPointInPath: (t, ~x: float, ~y: float) => bool = "isPointInPath"  /* Path2D */
type path2d @new external newPath2D: string => path2d = "Path2D"
@send external fillPath2D: (t, path2d) => unit = "fill"
@send external strokePath2D: (t, path2d) => unit = "stroke"  /* Text */
@set external font: (t, string) => unit = "font"
@set external textAlign: (t, string) => unit = "textAlign"
@set external textBaseline: (t, string) => unit = "textBaseline"
@send external fillText: (t, string, ~x: float, ~y: float, ~maxWidth: float=?, @ignore unit) => unit = "fillText"
@send external strokeText: (t, string, ~x: float, ~y: float, ~maxWidth: float=?, @ignore unit) => unit = "strokeText"
@send external measureText: (t, string) => measureText = "measureText"
@get external width: measureText => float = "width"  /* Rectangles */
@send external fillRect: (t, ~x: float, ~y: float, ~w: float, ~h: float) => unit = "fillRect"
@send external strokeRect: (t, ~x: float, ~y: float, ~w: float, ~h: float) => unit = "strokeRect"
@send external clearRect: (t, ~x: float, ~y: float, ~w: float, ~h: float) => unit = "clearRect"
```

Это часть кода привязки rescript-webapi для API Canvas.

Если ваша первая попытка работы с ReScript была связана с интерфейсом графической библиотеки, а не с собственной логикой приложения, вы могли быстро отказаться от нее.

## Основная проблема

В итоге вы оказываетесь перед дилеммой. Что лучше: ReScript или TypeScript?

Вы можете считать, что язык - это серьезная проблема; вы можете беспокоиться, что он станет необратимым решением, затруднит понимание кодовой базы новыми сотрудниками или даже затруднит прием на работу.

Но, несмотря на все ваши опасения, язык имеет не такое большое значение, как вам кажется. На самом деле важно то, что вы выражаете на языке, - это бизнес.

Если ваш бизнес сложный, он будет выглядеть сложным, даже если вы выразите его на самом подходящем языке, а если ваш бизнес нишевый, его будет сложно привлечь, даже если вы используете самый популярный язык.

## Войдите в ”чистую комнату"

Когда бизнес и программное обеспечение, которое его представляет, становятся достаточно сложными, разработчикам трудно за ними угнаться.

Даже если система типов TypeScript смирится с этой ситуацией, это не сильно поможет. Это происходит не потому, что проблема вызвана языком, а потому, что выражения разных моделей смешиваются.

Необходимо хорошо изолировать каждую модель и оркестровать ее зависимости.

Обратите внимание на знаменитый подход ”Чистая архитектура". Я не хочу сказать, что это всегда правильный выбор, но стоит отметить, что он изолирует бизнес-логику и помещает ее в "ядро" всех зависимостей.

При таком подходе по определению не существует внешних зависимостей от ”основного" модуля. Не заботясь о внешнем мире, вы можете просто смоделировать свой бизнес и построить логику с нуля. Это одно из немногих мест, где вы можете с уверенностью использовать DSL (Domain Specific Language).

Вы можете использовать TypeScript и здесь, но именно здесь ReScript действительно сияет. По моему опыту, при работе с чистой бизнес-логикой ReScript демонстрирует в несколько раз лучшую выразительность, чем TypeScript.

Позвольте мне показать примеры:

```ts
// Entity_Organization.res

@genType type data = {
  name: string,
  label: string,
  owner: memberId,
  members: array<memberId>,
}

@genType type state = Active(data)

@genType type event =
  | Created({date: Date.t, by: memberId, name: string, label: string})
  | MemberAdded({date: Date.t, by: option<memberId>, member: memberId})
  | MemberRemoved({date: Date.t, by: option<memberId>, member: memberId})

@genType type error =
  | MemberAlreadyJoined({by: option<memberId>, member: memberId})
  | CannotRemoveOwner({by: option<memberId>, ownerMember: memberId})
  | CannotRemoveSelf({member: memberId})

@genType type t = {
  id: id,
  seq: int,
  events: array<event>,
  state: option<state>,
}

@genType let make = (id, ~state=?, ~seq=0, ()) => {
  id,
  seq,
  events: [],
  state,
}

module Logic = Abstract.Logic.Make({
  type id = id
  type state = state
  type t = t
  type event = event
  type error = error
  let make = make
})

let logic: Logic.t = (t, event) => {
  // bunch of patterns
  // ...
}
```

Кроме того, такие возможности, как пометка аргументов и возможность определения типа HM, избавят вас от необходимости объявлять сигнатуры зависимостей.

```ts
// Service_Organization.res  @genType
let addMemberToOrganization = async (
  ~findMember,
  ~findOrganization,
  ~memberId,
  ~organizationId,
  ~by,
  ~date,
) => {
  switch (
    await Promise.all2((findMember(memberId), findOrganization(organizationId)))
  ) {
    | (Some(member), Some(organization)) =>
      switch (
        organization->Organization.addMember(~member=member.Member.id, ~by, ~date),
        member->Member.joinToOrganization(~organization=organization.id, ~date),
      ) {
        | (Ok(organization), Ok(member)) =>
          Ok({"organization": organization, "member": member})
        | (organizationResult, memberResult) =>
          Error(
            #AggregatedError({
              "member": memberResult->Util.someError,
              "organization": organizationResult->Util.someError,
            }),
          )
      }
    | (member, organization) =>
      Error(
        #InvalidParameter({
          "member": member->Option.map(member => member.id),
          "organization": organization->Option.map(organization => organization.id),
        }),
      )
    | exception Js.Exn.Error(exn) =>
      Error(#IOError({"exn": exn}))
  }
}
```

Видите? Нет необходимости объявлять тип `interface AddMemberToOrganizationDeps { ... }` для файлов TypeScript.

Это очень удобно и для компонентов React.

`@genType @react.component let make = (~onClick) => { // ... useSomthing  <button onClick> {message} </button> }`

Компилятор может определить фактический тип зависимости типа `onClick`, и вам не нужно объявлять тип реквизита.

Затем просто добавьте `@genType`. Компилятор ReScript сгенерирует правильные определения TypeScript с выведенными типами. Таким образом, я могу использовать модуль `Service_Organization`, написанный на ReScript, на моем сервере GraphQL, который написан на TypeScript, используя Pothos, Prisma и т. д.

```ts
import * as OrganizationService from 'core/Service_Organization.gen.ts';

async resolve(_root, args, ctx) {
  const result = await OrganizationService.addMemberToOrganization({
    findMember: ctx.app.repo.findMember,
    findOrganization: ctx.app.repo.findOrganization,
    memberId: args.input.memberId,
    organizationId: args.input.organizationId,
    by: ctx.req.currentMember?.id,
    date: Date.now(),
  });

  // ... other works
}
```

Это очень простой паттерн инверсии управления. Приятно, что для инъекции зависимостей вам не нужен тяжелый DI-контейнер вроде NestJS. Все является простыми функциями и может быть проверено во время компиляции системами типов ReScript и TypeScript.

Эти преимущества могут быть использованы независимо от того, является ли это backend или frontend.

Существует несколько представительных архитектурных паттернов для UI-приложений. Это не совсем точная классификация, но я разделяю их на стиль Elm (он же Elm Architecture) и стиль Cycle.js (он же Reactive programming или Data-flow graph).

Elm - это язык, очень похожий на ReScript (как семейство ML), и предпосылкой их успеха стало то, что они с самого начала заложили этот архитектурный паттерн. Elm изолирует основную логику пользовательского интерфейса, а взаимодействие с системой (например, DOM API) осуществляется через среду выполнения Elm.

Вы можете выбрать аналогичную архитектуру для своего пользовательского интерфейса, взять за основу ReScript и использовать TypeScript для создания собственной среды исполнения Elm.

Или вы можете быть знакомы с Redux. Всю грязную работу выполняет промежуточное ПО. Тогда остальная часть пользовательского интерфейса может быть написана с помощью ReScript без каких-либо неудобств.

Выбор языка общего назначения

Как ни странно, языки удобнее, когда они представляют ограниченную поверхность модели. Хотя вы можете опасаться, что при смене языка будет сложно разобраться, код TOML на самом деле более лаконичен и прост для понимания, чем код TypeScript для ”конфигурации"

Еще одним примером того, насколько удобным может быть язык для ограниченных моделей, является Mint. Он представляет собой декларативную, основанную на компонентах разработку пользовательского интерфейса, стилизацию и управление состояниями в очень чистом виде.

Некоторые из специализированных языков очень просты, в то время как другие ограничивают возможности использования интерпретатора или среды выполнения (VM). С точки зрения системы выражения и интерпретации, такие фреймворки, как Svelte и Vue, также можно отнести к языкам.

Здесь преимущества TypeScript и ReScript схожи. Принесите свою собственную виртуальную машину. У обоих нет никаких ограничений, кроме указания JavaScript в качестве целевого языка. И JavaScript является универсальным.

Их также можно использовать для специальных целей, например, для DSL, намеренно ограничивая их выразительность.

ReScript можно использовать для выражения компонентов React с форматированной сигнатурой типов.

ts-pattern можно назвать (как бы) DSL и его интерпретатором для декларативной логики (ReScript для этого явно лучше). И так далее.

Они могут не быть языками с наилучшим представлением модели, но они могут обеспечить тот уровень представления, который устраивает разработчика.

По моему опыту, чем ближе к ядру, тем мощнее ReScript, а чем дальше от него, тем удобнее TypeScript. Но почему бы не выбрать оба варианта?

## Когда нужно быстро и грязно

Не все программы имеют такую архитектуру кода. А архитектуры кода сложно поддерживать. Если критические части не изолированы должным образом, они могут легко запутаться.

Однако на самом деле в большинстве случаев монолитный код с беспорядочными проводами достаточно хорош. В таких кодовых базах гибкие языки выигрывают.

## Достаточно ли гибок ReScript? Возможно, нет (пока)

Но при некоторой нехватке гибкости он может быть достаточно производительным при наличии соответствующего ”фреймворка" (это как ваш собственный интерпретатор и VM!) для его целей.

Это одна из недостающих частей в текущей экосистеме ReScript. Что-то вроде ReScript-первого полностекового фреймворка для веб-приложений (привязки к Next.js недостаточно)

Однако ядро и экосистема ReScript продолжают неуклонно расти, и я уверен, что в ближайшем будущем мы достигнем этой цели.

## Заключение

Вам не обязательно использовать ReScript для всего проекта. То же самое относится и к TypeScript. Там, где язык имеет больше смысла, используйте его. Использование нескольких языков в любом сложном проекте встречается чаще, чем вы думаете.

Прежде чем использовать новый язык, такой как ReScript, сначала оцените свою доменную модель и правильную архитектуру. Попробуйте использовать ReScript в тех местах, где как можно меньше зависимостей и где речь идет о чистой бизнес-логике. (Не обязательно, но это сделает вас счастливее)

По мере того, как вы будете чувствовать себя более комфортно и уверенно, используя ReScript, вы сможете попробовать ReScript и с другими внешними моделями. Помогите ReScript охватить больше, поделившись им с экосистемой.
