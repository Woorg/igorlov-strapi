---
title: Как лениво и динамически загрузить компонент в Angular
meta_title: Как лениво и динамически загрузить компонент в Angular - Igor Gorlov
description: >-
  Однако эта статья посвящена динамической и ленивой загрузке компонента.
  Основным преимуществом ленивой загрузки компонента является уменьшение размера
  начального пакета и загрузка компонента в браузер только при необходимости.
date: 2023-04-25T07:41:58.000Z
image: ../../assets/images/undefined-Apr-25-2023.avif
author: Igor Gorlov
categories:
  - Как закодить
tags:
  - Angular
draft: false
lastmod: 2024-03-20T21:26:42.694Z
---

Существует три способа использования компонента в приложении Angular.

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Загрузка при изменении маршрута</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Использование в качестве дочернего компонента</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Динамическая загрузка по требованию</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

Однако эта статья посвящена динамической и ленивой загрузке компонента. Основным преимуществом ленивой загрузки компонента является уменьшение размера начального пакета и загрузка компонента в браузер только при необходимости.

Допустим, у вас есть компонент под названием GreetComponent, как показано в следующем блоке кода,

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
&nbsp;
const template = `
&nbsp;&nbsp; &lt;h2&gt;{{message}} &lt;/h2&gt;
&nbsp;&nbsp; &lt;button (click)='sendMessage()'&gt;Send Message &lt;/button&gt;
`
@Component({
&nbsp; selector: 'app-greet',
&nbsp; standalone: true,
&nbsp; imports: [CommonModule],
&nbsp; template: template
})
export class GreetComponent {
&nbsp; @Input({ required: true }) message?: string;
&nbsp; @Output() messageEvent = new EventEmitter&lt;boolean&gt;();
&nbsp; sendMessage(): void {
&nbsp;&nbsp;&nbsp; this.messageEvent.emit(true);
&nbsp; }
} 
</code></pre>
<!-- /wp:code -->

Компонент GreetComponent имеет украшенное свойство @Input и украшенный @Output() EvenEmmiter. Компонент FooComponent использует его в качестве дочернего компонента, как показано в следующем блоке кода.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">const template = `
&nbsp;&nbsp; &lt;app-greet [message]='message' (messageEvent)='sendMessage($event)'&gt;&lt;/app-greet&gt;
`
@Component({
&nbsp; selector: 'app-foo',
&nbsp; standalone: true,
&nbsp; imports: [CommonModule,
&nbsp;&nbsp;&nbsp; GreetComponent],
&nbsp; template : template
})
export class FooComponent {
&nbsp;&nbsp; message = "data from parent"
&nbsp;
&nbsp;&nbsp; sendMessage(m:boolean){
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; console.log(m);
&nbsp;&nbsp; }
}
</code></pre>
<!-- /wp:code -->

Здесь стоит обратить внимание на несколько моментов,

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>GreetComponent является частью массива imports.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>GreetComponent используется в шаблоне.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

Из-за этих двух моментов, каждый раз, когда Angular компилирует FooComponent, он также включает GreetComponent, увеличивая размер пакета, содержащего FooComponent.

_Одним из основных преимуществ динамической (ленивой) загрузки компонента является уменьшение размера пакета, поскольку он загружается в браузер только тогда, когда это необходимо. _

Допустим, компонент GreetComponent должен загружаться динамически и лениво при нажатии кнопки в FooComponent. Для этого,&nbsp;

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Добавьте кнопку</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Удалите из шаблона FooComponent</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Удалить GreetComponent из массива импортов. [Важно]</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">const template = `
&nbsp;&nbsp; &lt;button (click)='loadComponent()'&gt;Load Greet Component &lt;/button&gt;
`
@Component({
&nbsp; selector: 'app-foo',
&nbsp; standalone: true,
&nbsp; imports: [CommonModule],
&nbsp; template: template
})
export class FooComponent {
&nbsp; message = "data from parent"
&nbsp; greetcomp: any;
</code></pre>
<!-- /wp:code -->

Чтобы динамически загрузить компонент, инжектируйте ViewContainerRef с помощью функции inject или инжекта конструктора. &nbsp;

vcr = inject(ViewContainerRef);

После этого импортируйте файл, содержащий GreetComponent, с помощью оператора import. &nbsp;Оператор import используется в JavaScript для динамической загрузки файла.

const { GreetComponent } = await import(’../greet/greet.component’);

После импорта файла используйте метод CreateComponent в ViewContainerRef.

this.greetcomp = this.vcr.createComponent(GreetComponent);

Вы можете получить доступ ко всем свойствам и событиям динамически загруженных компонентов, используя метод экземпляра. Так, свойству message можно передать значение a, как показано в следующем блоке кода,

this.greetcomp.instance.message = “Hello dynamic Component”;

Вы можете подписаться на EventEmitter, украшенный @Output, как показано далее,

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">this.greetcomp.instance.messageEvent.subscribe((data:any)=&gt;{
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; console.log(data);
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; })

</code></pre>
<!-- /wp:code -->

Собрав все вместе, вы можете лениво загрузить GreetComponent нажатием кнопки в FooComponent, как показано в следующем листинге кода,

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">const template = `
&nbsp;&nbsp; &lt;button (click)='loadComponent()'&gt;Load Greet Component &lt;/button&gt;
`
@Component({
&nbsp; selector: 'app-foo',
&nbsp; standalone: true,
&nbsp; imports: [CommonModule],
&nbsp; template: template
})
export class FooComponent {
&nbsp; message = "data from parent"
&nbsp; greetcomp: any;
&nbsp; vcr = inject(ViewContainerRef);
&nbsp; 
&nbsp; async loadComponent() {
&nbsp;&nbsp;&nbsp; this.vcr.clear();
&nbsp;&nbsp;&nbsp; const { GreetComponent } = await import('../greet/greet.component');
&nbsp;&nbsp;&nbsp; this.greetcomp = this.vcr.createComponent(GreetComponent);
&nbsp;&nbsp;&nbsp; if (this.greetcomp) {
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; this.greetcomp.instance.message = "Hello dynamic Component";
&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; this.greetcomp.instance.messageEvent.subscribe((data:any)=&gt;{
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; console.log(data);
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; })
&nbsp;&nbsp;&nbsp; }
&nbsp;
&nbsp; }
}

</code></pre>
<!-- /wp:code -->

В настоящее время Angular загружает GreetComponent в конце после всех DOM-элементов FooComponent. Чтобы загрузить его в определенный div-блок, считайте div-блок как ViewChild и ViewConatinerRef.&nbsp; В другом посте я расскажу об этом подробнее.

Надеюсь, эта статья будет вам полезна. Спасибо за прочтение.
