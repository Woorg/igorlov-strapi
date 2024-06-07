---
title: >-
  Работа с состоянием компонента с использованием локального хранилища:
  useLocalStorage с помощью Typescript
meta_title: >-
  Работа с состоянием компонента с использованием локального хранилища:
  useLocalStorage с помощью Typescript | Игорь Горлов - Fullstack Developer
description: >-
  Этот хук можно использовать для обработки любого состояния компонента со всеми
  значениями, совместимыми с JSON.
date: 2024-02-09T00:00:00.000Z
categories:
  - Как закодить
author: Игорь Горлов
type: blog
draft: false
slug: >-
  rabota-s-sostoianyem-komponenta-s-yspolzovanyem-lokalnoho-khranylyscha-uselocalstorage-s-pomoschiu-typescript
translatedPosition: 3
tags:
  - useLocalStorage
  - React Custom Hooks
image: >-
  ../../assets/images/rabota-s-sostoianyem-komponenta-s-yspolzovanyem-lokalnoho-khranylyscha-uselocalstorage-s-pomoschiu-typescript-Feb-09-2024.avif
lastmod: 2024-03-20T21:26:46.335Z
---

Этот хук можно использовать для обработки любого состояния компонента со всеми значениями, совместимыми с JSON.

```ts
import { useEffect, useRef, useState } from 'react';

export const useLocalStorage = <T>(key: string, defaultValue: T, overWrite = false) => {
	const [value, setValue] = useState<T>(() => {
		if (typeof window === undefined)
			throw new Error('localStorage can be used only in client side');
		if (overWrite) return defaultValue;
		else {
			try {
				const currentValue = window.localStorage.getItem(key);
				if (currentValue) return JSON.parse(currentValue) as T;
			} catch (error) {
				console.error(`Error while reading localStorage item with key=${key}:`, error);
				return defaultValue;
			}
			return defaultValue;
		}
	});

	const previousKeyRef = useRef<string>('');

	useEffect(() => {
		const previousKey = previousKeyRef.current;
		if (previousKey !== key && previousKey) {
			try {
				window.localStorage.removeItem(previousKey);
			} catch (error) {
				console.error(`Error while removing localStorage item with key=${previousKey}:`, error);
			}
		}
		previousKeyRef.current = key;
		try {
			window.localStorage.setItem(key, JSON.stringify(value));
		} catch (error) {
			console.error(`Error while setting localStorage item with key=${key}:`, error);
		}
	}, [value, key, defaultValue]);

	return [value, setValue] as const;
};
```
