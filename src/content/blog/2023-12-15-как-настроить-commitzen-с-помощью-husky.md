---
title: Как настроить Commitzen с помощью Husky
meta_title: Как настроить Commitzen с помощью Husky - Фул Фронт Дев
description: >-
  Спецификация [Conventional
  commits](https://www.conventionalcommits.org/en/v1.0.0/) содержит набор правил
  для создания явной истории коммитов, что облегчает на
date: 2023-12-15T18:02:56.338Z
image: ../../assets/images/kak-nastroyt-commitzen-s-pomoschiu-husky-Dec-15-2023.avif
categories:
  - Учебник
author: Igor Gorlov
tags:
  - Husky
  - Commitzen
draft: false
translated: ''
translatedPosition: ''
type: blog
slug: kak-nastroyt-commitzen-s-pomoschiu-husky
lastmod: 2024-03-20T21:26:47.246Z
---

Спецификация [Conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) содержит набор правил для создания явной истории коммитов, что облегчает написание автоматизированных инструментов поверх, например, [semantic release](https://github.com/semantic-release/semantic-release). Вы можете вручную следовать этому соглашению в своем проекте или использовать инструмент, который поможет вам, например [Commitizen](https://github.com/commitizen/cz-cli).

Есть несколько способов использовать Commitizen в вашем проекте, в этом посте я покажу вам, как настроить его с помощью [Husky](https://typicode.github.io/husky/), чтобы всякий раз, когда вы запускаете `git commit`, вам предлагалось заполнить все необходимые поля коммита во время коммита.

Для начала установите пакеты Commitzen и Husky:

```bash
npm i commitizen husky --save-dev
```

Далее инициализируйте ваш проект для использования адаптера cz-conventional-changelog

```bash
commitizen init cz-conventional-changelog --save-dev --save-exact
```

Эта команда выполнит следующие действия:

1. Установите npm-модуль адаптера cz-conventional-changelog;
2. Сохраните его в `package.json` в `dependencies` или `devDependencies`;
3. Добавьте ключ `config.commitizen` в корень вашего `package.json`.

Наконец, в файле `package.json` установите хук Husky для запуска Commitzen по команде commit

```json
"husky": {
  "hooks": {
    "prepare-commit-msg": "exec < /dev/tty && npx cz --hook || true".
  }
}
```

Вот и все, вы готовы. Внесите изменения в свой код, запустите `git commit` и следуйте инструкциям Commitzen.
