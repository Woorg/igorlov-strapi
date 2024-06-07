---
title: Перестаньте бояться InjectionTokens
meta_title: Перестаньте бояться InjectionTokens - Igor Gorlov
description: >-
  Injection Tokens, похоже, пугают многих разработчиков. Они не понимают, что
  это такое, как их использовать и каково их назначение.
date: 2023-02-25T17:18:02.000Z
author: Igor Gorlov
image: ../../assets/images/undefined-Feb-25-2023.avif
categories:
  - Как закодить
tags:
  - Angular
draft: false
lastmod: 2024-03-20T21:26:47.550Z
---

Injection Tokens, похоже, пугают многих разработчиков. Они не понимают, что это такое, как их использовать и каково их назначение.

Чтобы преодолеть страх перед этой функцией, важно иметь базовое представление о том, как работает инъекция зависимостей Angular. (В отдельной статье мы более подробно рассмотрим внутреннюю работу системы DI в Angular для полного понимания).

<!-- wp:rank-math/toc-block {"title":"Оглавление","headings":[{"key":"c8fe0768-d502-44f9-9252-ab9d1be5cf75","content":"Чтобы внедрить MyService, мы напишем следующее:","level":2,"link":"#чтобы-внедрить-my-service-мы-напишем-следующее","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"1887ad5c-b9a6-4144-960b-7fcf151f28fc","content":"useValue","level":2,"link":"#use-value","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"8fe90b98-bec2-4a6a-bc0b-ca99cccbfdd7","content":"useClass","level":2,"link":"#use-class","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"907603d0-5975-46c1-a51f-b8dc05c65fd4","content":"useFactory","level":2,"link":"#use-factory","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"bb69b6a4-3725-4eb1-9f78-5834223710e0","content":"useExisting","level":2,"link":"#use-existing","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"cbd2c5d7-9da7-49ac-9b47-006d5745f2fe","content":"Notes","level":2,"link":"#notes","disable":false,"isUpdated":false,"isGeneratedLink":true}],"listStyle":"ul"} -->
<div class="wp-block-rank-math-toc-block" id="rank-math-toc"><h2>Оглавление</h2><nav><ul><li class=""><a href="#чтобы-внедрить-my-service-мы-напишем-следующее">Чтобы внедрить MyService, мы напишем следующее:</a></li><li class=""><a href="#use-value">useValue</a></li><li class=""><a href="#use-class">useClass</a></li><li class=""><a href="#use-factory">useFactory</a></li><li class=""><a href="#use-existing">useExisting</a></li><li class=""><a href="#notes">Notes</a></li></ul></nav></div>
<!-- /wp:rank-math/toc-block -->

Вот пример того, как работает паттерн singleton. Когда мы добавляем @Injectable({providedIn: ‘root’}) к одному из наших сервисов:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">@Injectable({ providedIn: 'root' })
export class MyService {
 // ...
}
</code></pre>
<!-- /wp:code -->

При первом вызове MyService Angular сохранит сервис в записи RootInjector, ключом которой будет класс MyService, а значением - объект, содержащий фабрику MyService, текущее значение и флаг multi.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">record:{
 //...
 [index]:{
   key: class MyService,
   value: {
    factory: f MyService_Factory(t),
    multi: undefined
    value: {}
   }
 //...
}
</code></pre>
<!-- /wp:code -->

Таким образом, в следующий раз, когда мы захотим внедрить наш сервис через конструктор или функцию inject в другом компоненте, DI Angular будет искать сервис в объекте записи и возвращать его текущее значение или создавать его с помощью функции фабрики.

Также очень важно понять, что произойдет, если мы предоставим наш сервис непосредственно в bootstrapApplication или массиве провайдеров компонента.

<h2 class="wp-block-heading" id="чтобы-внедрить-my-service-мы-напишем-следующее">Чтобы внедрить MyService, мы напишем следующее:</h2>

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">@Component({
  // ...
  providers: [MyService],
})
export class AppComponent {}
</code></pre>
<!-- /wp:code -->

Этот код является сокращенным синтаксисом для

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">@Component({
  // ...
  providers: [{provide: MyService, useClass: MyService}],
})
export class AppComponent {}
</code></pre>
<!-- /wp:code -->

Создавая InjectionToken, мы создаем ”статический” ключ для нашей записи или словаря услуг.

Написав это:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">export const DATA = new InjectionToken&lt;string&gt;('data');
</code></pre>
<!-- /wp:code -->

Мы создаем ”константу” типа string.

InjectionToken может принимать объект в качестве второго параметра, содержащий фабричную функцию и атрибут providedIn (Хотя этот параметр будет устаревшим, так как значением по умолчанию является root и нет другой возможности). Заводская функция действует как значение по умолчанию, если другое значение не предоставлено.

Давайте посмотрим на следующий пример, чтобы прояснить это.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">export const DATA = new InjectionToken&lt;string&gt;('data', {
  factory: () =&gt; 'toto',
});
</code></pre>
<!-- /wp:code -->

Angular будет хранить наш токен внутри объекта record объекта RootInjector:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">record: {
 //...
 [index]: {
   key: InjectionToken {_desc: 'data', ngMetadataName: 'InjectionToken'}
   value: {
     factory: () =&gt; 'toto',
     multi: undefined,
     value: "toto"
   }
 },
 //...
}
</code></pre>
<!-- /wp:code -->

Затем, когда мы вводим его внутрь компонента, DI Angular будет искать ключ DATA в записи RootInjector и вводить соответствующее значение. (‘toto’ в данном примере)

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">@Component({
  // ...
  template: `{{ data }} `, // toto
})
export class AppComponent {
  data = inject(DATA);
}
</code></pre>
<!-- /wp:code -->

Однако в массиве поставщика компонентов мы можем переопределить этот Token для отображения DATA с другим значением. На этот раз Angular будет хранить значение внутри записи NodeInjector.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">@Component({
  // ...
  provider: [{provide: DATA, useValue: 'titi'}],
  template: `{{ data }} `, // titi
})
export class AppComponent {
  data = inject(DATA);
}
</code></pre>
<!-- /wp:code -->

Когда Angular ищет маркер DATA, он сначала проверяет NodeInjector компонента, затем NodeInjector его родителя и, наконец, RootInjector. В результате, в данном примере выходным значением будет ‘titi’.

Предоставление вашего InjectionToken

<h2 class="wp-block-heading" id="use-value">useValue</h2>

Ключевое слово useValue позволяет нам предоставить строку, число, интерфейс, экземпляр класса или любое постоянное значение. Это очень полезно для настройки свойств конфигурации.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">export type Environment = 'local' | 'dev' | 'int' | 'prod';

export interface AppConfig {
  version: string;
  apiUrl: string;
  environment: Environment;
}

export const APP_CONFIG = new InjectionToken&lt;AppConfig&gt;('app.config');

export const getAppConfigProvider = (value: AppConfig): ValueProvider =&gt; ({
  provide: APP_CONFIG,
  useValue: value,
});

bootstrapApplication(AppComponent, {
  providers: [
    getAppConfigProvider(environment) // environment files
  ],
});
</code></pre>
<!-- /wp:code -->

В приведенном выше примере мы создаем InjectionToken для хранения конфигурации окружения.&nbsp;

Это рекомендуемый метод доступа к переменным окружения в рабочем пространстве Nx, поскольку он позволяет избежать циклических зависимостей.<br>Чтобы получить свойства окружения, мы вводим токен внутрь нашего компонента.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">@Component({
  selector: 'app-root',
  standalone: true,
  template: `{{ config.version }}`,
})
export class AppComponent {
  config = inject(APP_CONFIG);
}
</code></pre>
<!-- /wp:code -->

<h2 class="wp-block-heading" id="use-class">useClass</h2>

Ключевое слово useClass позволяет нам инстанцировать новый класс. Это полезно, например, для реализации принципа инверсии зависимостей.

Принцип инверсии зависимостей - это принцип проектирования программного обеспечения, который гласит, что различные уровни зависят от абстракций, а не друг от друга. Такая инверсия делает код более гибким, удобным в обслуживании и тестировании.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">export interface Search&lt;T&gt; {
  search: (search: string) =&gt; T[];
}

export const SEARCH = new InjectionToken&lt;Search&lt;object&gt;&gt;('search');

@Component({
  selector: 'shareable',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, AsyncPipe, JsonPipe],
  template: `
    &lt;input type="text" [formControl]="searchInput" /&gt;
    &lt;button (click)="search()"&gt;&lt;/button&gt;
    &lt;div *ngFor="let d of data | async"&gt;{{ d | json }}&lt;/div&gt;
  `,
})
export class ShareableComponent {
  searchService = inject(SEARCH, {optional: true}); 
  data = new BehaviorSubject&lt;object[]&gt;([]);

  searchInput = new FormControl('', { nonNullable: true });

  // We are not injecting `searchService` with the constructor, 
  // because `inject` function infers the type. 
  constructor() {
    if (!this.searchService) 
       throw new Error(`SEARCH TOKEN must be PROVIDED`);
  }

  search() {
    this.data.next(this.searchService.search(this.searchInput.value));
  }
}
</code></pre>
<!-- /wp:code -->

Компонент ShareableComponent отображает поле ввода, кнопку поиска и список результатов поиска. Когда мы нажимаем кнопку поиска, компонент ищет ”где-то” и выводит результаты. Этот компонент является универсальным и не требует дополнительной информации о том, как и где искать. Детали реализации предоставляются родительским компонентом.

Давайте посмотрим, как мы можем использовать ShareableComponent.

Во-первых, мы создадим служебную функцию для предоставления нашего токена. Это повышает удобство работы разработчика и снижает вероятность ошибок, поскольку добавляет в нашу функцию сильную типизацию.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">export const getSearchServiceProvider = &lt;T, C extends Search&lt;T&gt;&gt;(clazz: new () =&gt; C): ClassProvider =&gt; ({
  provide: SEARCH,
  useClass: clazz,
});
</code></pre>
<!-- /wp:code -->

Используя приведенную выше функцию, мы можем предоставить желаемую реализацию интерфейса Search в компоненте, который вызывает ShareableComponent. Когда Angular попытается внедрить инъекционный токен SEARCH, он будет обходить каждый NodeInjector в дереве компонентов, пока не найдет предоставленную реализацию.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">@Injectable()
export class DetailSearchService implements Search&lt;Detail&gt; {
  search = (search: string): Detail[] =&gt; {
  // implementation of our search function
  }
}

@Component({
  selector: 'parent',
  standalone: true,
  imports: [ShareableComponent],
  providers: [getSearchServiceProvider(DetailSearchService)],
  template: `
   &lt;shareable&gt;&lt;/shareable&gt;
  `,
})
export class ParentComponent {}
</code></pre>
<!-- /wp:code -->

Если мы хотим повторно использовать ShareableComponent с другой реализацией поиска, это становится очень просто.&nbsp;

<h2 class="wp-block-heading" id="use-factory">useFactory</h2>

Ключевое слово useFactory позволяет нам предоставить объект через фабричную функцию.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">export const USER = new InjectionToken&lt;string&gt;('user');

export const getUserProvider = (index: number): FactoryProvider =&gt; ({
  provide: USER,
  useFactory: () =&gt; inject(Store).select(selectUser(index)),
});
</code></pre>
<!-- /wp:code -->

Функция inject позволяет нам включать другие сервисы в функцию фабрики.

В качестве альтернативы, если вы не хотите использовать функцию inject, FactoryProvider имеет третий параметр deps, в который можно вводить другие инжектируемые сервисы.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">export const getUserProvider = (index: number): FactoryProvider =&gt; ({
  provide: USER,
  useFactory: (store: Store) =&gt; store.select(selectUser(index))],
  deps: [Store],
});
</code></pre>
<!-- /wp:code -->

Но я советую вам использовать функцию inject. Она чище и проще для понимания.

Затем мы можем использовать этот провайдер для получения одного пользователя из хранилища:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">@Component({
  selector: 'app-root',
  standalone: true,
  providers: [getUserProvider(2)],
  template: ` &lt;div&gt;{{ user }}&lt;/div&gt; `,
})
export class ParentComponent {
  user = inject(USER);
}
</code></pre>
<!-- /wp:code -->

<h2 class="wp-block-heading" id="use-existing">useExisting</h2>

Ключевое слово useExisting позволяет нам сопоставить существующий экземпляр сервиса с новым токеном, создавая псевдоним.

При рассмотрении объекта записи, созданного Angular, мы имеем следующее:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">record:{
 //...
 [index]:{
   key: InjectionToken {_desc: 'data', ngMetadataName: 'InjectionToken', ɵprov: undefined},
   value: {
    factory: () =&gt; ɵɵinject(resolveForwardRef(provider.useExisting)),
    multi: undefined
    value: {}
   }
 //...
}
</code></pre>
<!-- /wp:code -->

Angular разрешает InjectionToken, передавая ссылку на класс, указанный в параметре useExisting. Он ищет этот класс в NodeInjector и RootInjector, поэтому он должен быть задан заранее, иначе произойдет ошибка.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">NullInjectorError: No provider for XXX!
</code></pre>
<!-- /wp:code -->

<h2 class="wp-block-heading" id="notes">Notes</h2>

При предоставлении InjectionToken через провайдеры не обеспечивается безопасность типов. Например, следующий код не приведет к ошибке Typescript, даже если тип будет определен как число для num , но будет предоставлена строка. (Мы можем получить ошибку во время выполнения).<br>export const NUMBER = new InjectionToken(‘number’);

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">@Component({
  providers: [{provide: NUMBER, useValue: 'toto'}],
  // ... 
})
export class ParentComponent {
  num = inject(NUMBER);
  //^ (property) ParentComponent.num: number
}
</code></pre>
<!-- /wp:code -->

Чтобы обеспечить безопасность типов, я советую создать служебную функцию для предоставления вашего маркера.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">export const NUMBER = new InjectionToken&lt;number&gt;('number');

export const getNumberProvider = (num: number): ValueProvider =&gt; ({
  provide: NUMBER,
  useValue: num
});
// NUMBER token should be provided through this function

@Component({
  providers: [getNumberProvider('toto')],
                                 //^ Argument of type 'string' is not assignable to parameter of type 'number'
  // ...
})
export class ParentComponent {
  num = inject(NUMBER);
}
</code></pre>
<!-- /wp:code -->

Таким образом, наша реализация будет безопасной, и любые ошибки будут возникать во время компиляции, а не во время выполнения.

Вот и все для этой статьи! Теперь у вас должно быть хорошее понимание InjectionToken и того, что они означают. Я надеюсь, что эта информация развенчала их для вас, и вы больше не будете испытывать страх перед ними.

Надеюсь, вы узнали новую концепцию Angular. Если вам понравилось, вы можете найти меня на Twitter или Github.

👉 Если вы хотите ускорить свой путь изучения Angular и Nx, загляните на Angular challenges.
