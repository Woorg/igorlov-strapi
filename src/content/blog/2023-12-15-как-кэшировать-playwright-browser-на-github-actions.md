---
title: Как кэшировать Playwright Browser на Github Actions
meta_title: >-
  Как кэшировать Playwright Browser на Github Actions | Игорь Горлов -
  Фронтeндер
description: >-
  Многие из нас, кому приходится заниматься автоматизацией процессов, наверняка
  рекомендовали или предлагали Playwright в качестве основного инструмента для
  авто
date: 2023-12-15T19:24:46.883Z
image: >-
  ../../assets/images/kak-k-shyrovat-playwright-browser-na-github-actions-Dec-15-2023.avif
categories:
  - Учебник
author: Igor Gorlov
tags:
  - 'Playwright '
draft: false
translated: ''
translatedPosition: ''
type: blog
slug: kak-k-shyrovat-playwright-browser-na-github-actions
lastmod: 2024-03-20T21:26:48.625Z
---

Многие из нас, кому приходится заниматься автоматизацией процессов, наверняка рекомендовали или предлагали Playwright в качестве основного инструмента для автоматизации своей компании. Playwright позволяет нам создавать комплексные сквозные тесты для наших программных приложений, что делает его незаменимым ресурсом для каждого инженера-программиста.

Для тех из нас, кто уже имеет опыт создания тестов с помощью Playwright и хочет легко интегрировать эти тесты в рабочий процесс GitHub Actions, скорость выполнения тестов может стать источником разочарования. Ожидание результатов тестирования в GitHub Actions иногда может отнимать много времени.

Хорошая новость заключается в том, что я нашел эффективное решение, которое может значительно повысить скорость и эффективность выполнения тестов Playwright в среде непрерывной интеграции (CI) GitHub Action. Это усовершенствование обещает не только сэкономить драгоценное время, но и оптимизировать наш конвейер CI/CD, что приведет к более продуктивному и надежному процессу разработки. В следующих разделах я опишу шаги и стратегии, позволяющие ускорить выполнение тестов Playwright в GitHub Actions.

```yaml
имя: Playwright Tests
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]
jobs:
  test:
    timeout-minutes: 60
    работает на: ubuntu-latest
    шаги:
      - использует: actions/checkout@v3
      - использует: actions/setup-node@v2
        с:
          node-version: '18.x'
      - имя: Получить версию установленного Playwright
        id: playwright-version
        выполнить: echo "PLAYWRIGHT_VERSION=$(node -e "console.log(require('./package-lock.json').dependencies['@playwright/test'].version)")" >> $GITHUB_ENV
      - имя: Кэшировать двоичные файлы плейсхолдера
        uses: actions/cache@v3
        id: playwright-cache
        с:
          путь: |
            ~/.cache/ms-playwright
          ключ: ${{ runner.os }}-playwright-${{ env.PLAYWRIGHT_VERSION }}
      - выполнить: npm ci
      - выполнить: npx playwright install --with-deps
        if: steps.playwright-cache.outputs.cache-hit != 'true'
      - run: npx playwright install-deps
        если: steps.playwright-cache.outputs.cache-hit != 'true'

      - имя: Запуск тестов Playwright
        выполнить: npx playwright test
      - использует: actions/upload-artifact@v2
        if: always()
        с:
          имя: playwright-test-results
          путь: test-results/
```

Ссылки:

1.[https://playwrightsolutions.com/playwright-github-action-to-cache-the-browser-binaries/](https://playwrightsolutions.com/playwright-github-action-to-cache-the-browser-binaries/)

2.[https://github.com/microsoft/playwright/issues/7249#issuecomment-1385567519](https://github.com/microsoft/playwright/issues/7249#issuecomment-1385567519)
