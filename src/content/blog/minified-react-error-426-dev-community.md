---
title: 'Ошибка минификации React #426'
meta_title: 'Ошибка минификации React #426 | Игорь Горлов - Fullstack Developer '
description: >-
  В этой статье я хотел бы рассмотреть проблему, с которой я столкнулся на этой
  неделе. Это первый раз, когда я столкнулся с подобной проблемой, используя
  React,
date: 2024-02-10T00:00:00.000Z
categories:
  - Как пофиксить
author: Игорь Горлов
type: blog
draft: false
slug: oshybka-mynyfykatsyy-react-426
translatedPosition: 20
tags:
  - React
image: ../../assets/images/oshybka-mynyfykatsyy-react-426-Feb-10-2024.avif
lastmod: 2024-03-20T21:26:45.478Z
---

В этой статье я хотел бы рассмотреть проблему, с которой я столкнулся на этой неделе. Это первый раз, когда я столкнулся с подобной проблемой, используя React, и первый раз, когда я знаю `startTransition` из React.

## [](#how-it-comes)Как это приходит

Эта ошибка связана с компонентом [`ReactMarkdown`](https://github.com/remarkjs/react-markdown) и хуком [`useDisclosure`](https://chakra-ui.com/docs/hooks/use-disclosure) в компоненте [`@chakra-ui/react`](https://chakra-ui.com/).

```js
<ReactMarkdown
  components={{
    code({ children, ...props }) {
      // ...
      return (
        // some rendering based on the children, such as
        // <code>{children}</code>
        // <SyntaxHighlighter>{String(children)}SyntaxHighlighter>
        // <Preview children={Array.isArray(children) ? children : [children]} ></Preview>
      );
    }
  }}
>
  {children}
</ReactMarkdown>;
```

`const { isOpen, onToggle } = useDisclosure();`

Вот исходный рабочий процесс:

Кнопка переключается -> UseDisclosure перехватывает изменения -> ReactMarkdown обновляет рендеринг (на основе статуса `isOpen`)

```js
<Button onClick={() => onToggle()}>
  {isOpen ? "Show Less" : "Show More..."}
</Button>
<ReactMarkdown>
  {isOpen ? veryLongText : shortText}
</ReactMarkdown>
```

## [](#error-occurs)Возникла ошибка

Теперь, когда у нас есть очень длинная строка `veryLongText`, обновление выдаст вам [ошибку](https://react.dev/errors/426?invariant=426):

> Компонент приостановлен во время ответа на синхронный ввод. Это приводит к замене пользовательского интерфейса индикатором загрузки. Чтобы исправить это, обновления, которые приостанавливаются, должны быть обернуты с помощью startTransition.

Это указывает на то, что компонент приостановил или прекратил работу, когда пытался обработать синхронный ввод. Под синхронным вводом понимаются действия или события, которые обрабатываются немедленно, не дожидаясь завершения других задач.

Он предполагает, что мы можем обернуть обновления или изменения, которые вызывают приостановку компонента, функцией под названием `startTransition`.

## [](#how-to-solve)Как решить

Вот обновленный вариант решения ошибки с помощью `startTransition`.

```js
const { isOpen, onToggle: originalOnToggle } = useDisclosure();
const onToggle = () => {
  startTransition(() => {
    originalOnToggle();
  });
};
// no changes to Button and ReactMarkdown code
<Button onClick={() => onToggle()}>
  {isOpen ? "Show Less" : "Show More..."}
</Button>
<ReactMarkdown>
  {isOpen ? veryLongText : shortText }
</ReactMarkdown>
```

Мы используем функцию `startTransition`, которая сообщает React об оптимизации и пакетном обновлении. Это означает, что при нажатии на кнопку и вызове функции `onToggle` обновление состояния, вызванное функцией `originalOnToggle()`, рассматривается как низкоприоритетное обновление. Вот полный текст [`diff`](https://patch-diff.githubusercontent.com/raw/tarasglek/chatcraft.org/pull/358.diff), если вам интересно:

```js
import { memo, startTransition, useCallback, useState, useEffect, useRef, useMemo } from 'react';
import { useClipboard, Kbd, Spacer, useDisclosure } from '@chakra-ui/react';
import ResizeTextarea from 'react-textarea-autosize';
import { TbDots, TbTrash } from 'react-icons/tb';
import { Flex, Box, VStack, Button } from '@chakra-ui/react';
import { CardBody } from './CardBody';

function MessageBase({
	text,
	summaryText,
	settings,
	editing,
	handleSubmit,
	handleKeyDown,
	isLoading,
	onPrompt,
	hidePreviews,
	useMobileBreakpoint,
	getMetaKey,
}) {
	const [isOpen, setIsOpen] = useState(false);
	const messageForm = useRef < HTMLFormElement > null;
	const { onToggle: originalOnToggle } = useDisclosure();
	const isLongMessage = text.length > 5000;
	const displaySummaryText = !isOpen && (summaryText || isLongMessage);

	const onToggle = () => {
		startTransition(() => {
			originalOnToggle();
		});
		setIsOpen(!isOpen);
	};

	useEffect(() => {
		if (settings.countTokens) {
			// Some logic here
		}
	}, [settings.countTokens]);

	return (
		<VStack align="stretch" spacing={4}>
			<CardBody p={0}>
				<Flex direction="column" gap={3}>
					<Box maxWidth="100%" minH="2em" overflow="hidden" px={6} pb={2}>
						{isLongMessage && (
							<Button size="sm" variant="ghost" onClick={onToggle}>
								{isOpen ? 'Show Less' : 'Show More...'}
							</Button>
						)}
						{editing ? (
							<form onSubmit={handleSubmit} ref={messageForm} onKeyDown={handleKeyDown}>
								{/* Some form elements */}
							</form>
						) : (
							<Markdown
								previewCode={!hidePreviews && !displaySummaryText}
								isLoading={isLoading}
								onPrompt={onPrompt}
							>
								{displaySummaryText ? summaryText || text.slice(0, 250).trim() : text}
							</Markdown>
						)}
					</Box>
				</Flex>
			</CardBody>
		</VStack>
	);
}
```

Функция `startTransition` специально разработана для работы с React Concurrent Mode (или просто Concurrent Mode), который является экспериментальным набором функций в React для улучшения производительности и удобства работы со сложными пользовательскими интерфейсами. Я очень рад узнать об этой возможности. Надеюсь, это поможет. До встречи в следующем посте!
