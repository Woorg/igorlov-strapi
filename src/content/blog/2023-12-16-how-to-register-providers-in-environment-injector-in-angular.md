---
title: Как зарегистрировать провайдеров в инжекторе окружения в Angular
meta_title: >-
  Как зарегистрировать провайдеров в инжекторе окружения в Angular | Игорь
  Горлов - Фронтeндер
description: >-
  Введение


  В этой статье я рассказываю о том, как зарегистрировать провайдеров в
  инжекторе окружения в Angular. Одним из способов создания инжектора окружения
  я
date: 2023-12-16T00:00:00.000Z
categories:
  - how-to-3
author: Игорь Горлов
draft: false
slug: kak-zarehystryrovat-provaiderov-v-ynzhektore-okruzhenyia-v-angular
tags:
  - Angular
image: >-
  ../../assets/images/kak-zarehystryrovat-provaiderov-v-ynzhektore-okruzhenyia-v-angular-Dec-16-2023.avif
lastmod: 2024-03-20T21:26:45.067Z
---

В этой статье я рассказываю о том, как зарегистрировать провайдеров в инжекторе окружения в Angular. Одним из способов создания инжектора окружения является использование токена `ENVIRONMENT_INITIALIZER`. Когда у меня есть несколько провайдеров, и они не должны выполнять какую-либо логику во время загрузки, я могу использовать `makeEnvironmentProviders`, чтобы обернуть массив провайдеров в `EnvironmentProviders`. Более того, `EnvironmentProviders` принимаются в инжекторе окружения и не могут быть случайно использованы в компонентах.

Моя практика заключается в создании пользовательской функции провайдера, которая вызывает makeEnvironmentProviders внутри компонента. Затем я могу указать ее в массиве `providers` в `bootstrapApplication` для загрузки приложения.

## Пример использования демонстрации

В этом демо у `AppComponent` есть два дочерних компонента, `CensoredFormComponent` и `CensoredSentenceComponent`. `CensoredFormComponent` содержит управляемую шаблоном форму, которая позволяет пользователю вводить свободный текст в элемент TextArea. Поскольку вводимый текст является свободным, он может легко содержать нецензурные выражения, такие как fxxk и axxhole.

В обязанности провайдера входит использование регулярных выражений для выявления ненормативной лексики и замена плохих слов на символы, такие как звездочки. Затем `CensoredSentenceComponent` отображает чистую версию, которая менее оскорбительна для читателей.

```js
const language = 'English';

@Component({
  selector: 'my-app',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container">
      <h2>Replace bad {{ language }} words with {{ character }}</h2>
      <app-censored-form (sentenceChange)="inputSentence = $event" />
      <app-censored-sentence [sentence]="inputSentence" />
    </div>
  `,
})
export class App {
  language = language;
  character = MASKED_CHARACTER;
  inputSentence = '';
}

bootstrapApplication(App, {
  providers: [provideSanitization(langua
```

Функция `provideSanitization` принимает язык и вызывает функцию `makeEnvironmentProviders` для регистрации провайдеров в инжекторе окружения. Если язык английский, служба маскирует плохие английские слова символами. Аналогично, другой сервис маскирует плохие испанские слова, если язык испанский.

```js
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-censored-form',
  standalone: true,
  imports: [FormsModule],
  template: `
    <form #myForm="ngForm">
      <div>
        <label for="sentence">
          <span class="label">Sentence: </span>
          <textarea id="sentence" name="sentence" rows="8" cols="45" [ngModel]="sentence" (ngModelChange)="onSentenceChange($event)"></textarea>
        </label>
      </div>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CensoredFormComponent {
  sentence = '';
  @Output() sentenceChange = new EventEmitter<string>();

  onSentenceChange(event: string): void {
    this.sentence = event;
    this.sentenceChange.emit(event);
  }
}
```

```js
// censored-sentence.component.ts

import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { SanitizePipe } from './sanitize.pipe';

@Component({
  selector: 'app-censored-sentence',
  template: `

      <label for="result">
        <span class="label">Очищенное предложение: </span>
        <span id="result" name="result" [innerHtml]="sentence | sanitize"></span>
      </label>

  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CensoredSentenceComponent {
  @Input() sentence!: string;
}
```

`SantizePipe` - это автономная труба, которая маскирует плохие слова символами, применяет CSS-стили в соответствии с опциями и выводит конечный HTML-код.

```js
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SanitizeService } from './sanitize.service';

@Pipe({
  name: 'sanitize',
  standalone: true,
})
export class SanitizePipe implements PipeTransform {
  constructor(
    private sanitizeService: SanitizeService,
    private domSanitizer: DomSanitizer
  ) {}

  transform(value: string): SafeHtml {
    const sanitizedValue = this.sanitizeService.cleanse(value);
    return this.domSanitizer.bypassSecurityTrustHtml(sanitizedValue);
  }
}
```

`SanitizePipe` инжектирует `SanitizeService`, а конкретный сервис предоставляется `provideSanitization` на основе значения параметра language. В следующем разделе я покажу, как регистрировать провайдеров в инжекторе окружения.

## Определение пользовательских провайдеров и загрузка приложения

Сначала мне нужно определить несколько инжекторных лексем, чтобы предоставить параметры стилизации CSS и символ для маскировки бранных слов.

```js
export interface SanitizeOptions {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  character?: string;
  color?: string;
}
```

```js
// sanitization-options.token.ts
import { InjectionToken } from '@angular/core';

export const sanitizationOptions = new InjectionToken('sanitizationOptions');
```

```js
import { InjectionToken } from '@angular/core';

export const MaskedCharacter = new InjectionToken() < string > 'MASKED_CHARACTER';
```

Во-вторых, мне нужно определить новые сервисы, которые определяют английские/испанские ругательства и заменяют их на выбранные символы. Кроме того, выполняется логика для предоставления правильного сервиса в контексте makeEnvironmentProviders.

`// sanitize.service.ts export abstract class SanitizeService { abstract cleanse(sentence: string): string; }`

`SanitizeService` - это абстрактный класс с методом cleanse для очистки свободных текстов. Конкретные сервисы расширяют его для реализации метода, а `SanitizeService` может также служить маркером для инъекций.

```js
@Injectable()
export class MaskWordsService extends SanitizeService {
  private readonly badWords = [
    'motherfucker',
    'fuck',
    'bitch',
    'shit',
    'asshole',
  ];

  private readonly sanitizeOptions = inject(SANITIZATION_OPTIONS);
  private readonly styles = getStyles(this.sanitizeOptions);
  private readonly getMaskedWordsFn = getMaskedWords(this.sanitizeOptions);

  cleanse(sentence: string): string {
    let text = sentence;

    for (const word of this.badWords) {
      const regex = new RegExp(word, 'gi');
      const maskedWords = this.getMaskedWordsFn(word);
      text = text.replace(regex, `<span ${this.styles}>${maskedWords}</span>`);
    }

    return text;
  }
}
```

```js
@Injectable()
export class MaskSpanishWordsService extends SanitizeService {
  private badWords = ['puta', 'tu puta madre', 'mierda'];

  options = inject(SANITIZATION_OPTIONS);

  getMaskedWords = getMaskedWords(this.options);

  cleanse(sentence: string): string {
    let text = sentence;

    for (const word of this.badWords) {
      const regex = createRegex(word);
      const maskedWords = this.getMaskedWords(word);

      text = replaceWords(text, regex, maskedWords);
    }

    return text;
  }
}

function createRegex(word: string): RegExp {
  return new RegExp(word, 'gi');
}

function replaceWords(text: string, regex: RegExp, maskedWords: string): string {
  return text.replace(regex, `<span>${maskedWords}</span>`);
}
```

`MaskWordsService` отвечает за избавление от английских ругательств, а `MaskSpanishService` - за избавление от испанских ругательств.

Выполнив все вышеописанные действия, я могу определить функцию провайдера `provideSanitization`.

`// language.type.ts export type Language = 'English' | 'Spanish';`.

```js
function getSanitizeService(language: Language): Type<SanitizeService> {
  switch (language) {
    case 'English':
      return MaskWordsService;
    case 'Spanish':
      return MaskSpanishWordsService;
    default:
      throw new Error('Invalid language');
  }
}

export function getSanitizationProviders(language: Language): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: SANITIZATION_OPTIONS,
      useValue: {
        isBold: true,
        isItalic: true,
        isUnderline: true,
        color: 'rebeccapurple',
        character: 'X',
      },
    },
    {
      provide: SanitizeService,
      useClass: getSanitizeService(language),
    },
    {
      provide: MASKED_CHARACTER,
      useFactory: () => inject(SANITIZATION_OPTIONS).character || '*',
    },
  ]);
}
```

Я регистрирую `SANITIZATION_OPTIONS` для выделения полужирным, курсивом и подчеркиванием символа X цветом rebeccapurple. Случай `SanitizeService` немного запутанный; когда язык английский, он регистрируется в `MaskWordsService`. В противном случае `SanitizeService` регистрируется на `MaskSpanishWordsService`. Когда я вызываю `inject(SanitizeService)`, этот провайдер определяет, какую службу использовать. Провайдер `MASKED_CHARACTER` - это ярлык для возврата символа в интерфейсе `SANITIZATION_OPTIONS`.

```js
const LANGUAGE = 'English';
bootstrapApplication(App, { providers: [provideSanitization(LANGUAGE)] }).then(() =>
	console.log('Application started successfully'),
);
```

`provideSanitization` завершен, и я включаю его в массив провайдеров во время загрузки.

## А если я использую provideSanitization в компоненте?

В `CensoredFormComponent`, когда я указываю `provideSanitization('Spanish')` в массиве провайдеров, возникает ошибка. В каком-то смысле это хорошо, потому что компонент не может передать другое значение в функцию провайдера, чтобы предоставить другой SanitizeService. В противном случае, когда CensoredFormComponent инжектирует `SanitizeService` и вызывает метод cleanse, результаты становятся неожиданными

`Тип 'EnvironmentProviders' не может быть присвоен типу 'Provider'.`

```js
@Component({ selector: 'app-censored-form', standalone: true, ... other properties ... providers: [provideSanitization('Spanish')] <-- Ошибка возникает на этой строке }) export class CensoredFormComponent {}
```

На этом я заканчиваю статью в блоге и надеюсь, что вам понравился контент и вы продолжите следить за моим опытом обучения в Angular и других технологиях.
