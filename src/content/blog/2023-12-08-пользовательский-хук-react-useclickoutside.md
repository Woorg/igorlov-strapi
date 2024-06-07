---
title: 'Пользовательский хук React: useClickOutside'
meta_title: 'Пользовательский хук React: useClickOutside - Фул Фронт Дев'
description: >-
  В этом цикле статей мы отправимся в путешествие по царству пользовательских
  хуков React, открывая их огромный потенциал для повышения эффективности ваших
  проек
date: 2023-12-08T02:36:23.349Z
image: ../../assets/images/polzovatelskyi-khuk-react-useclickoutside-Dec-08-2023.avif
categories:
  - Как закодить
author: Igor Gorlov
tags:
  - React
  - React Custom Hooks
draft: false
translated: ''
translatedPosition: ''
type: blog
slug: polzovatelskyi-khuk-react-useclickoutside
keywords:
  - React Custom Hooks
lastmod: 2024-03-20T21:26:48.553Z
---

В этом цикле статей мы отправимся в путешествие по царству пользовательских хуков React, открывая их огромный потенциал для повышения эффективности ваших проектов разработки. Сегодня мы сосредоточимся на хуке “useClickOutside”, одном из многих тщательно проработанных хуков, доступных в коллекции пользовательских хуков React.

Github: [https://github.com/sergeyleschev/react-custom-hooks](https://github.com/sergeyleschev/react-custom-hooks)

```js
import useEventListener from '../useEventListener/useEventListener';

export default function useClickOutside(ref, cb) {
	useEventListener(
		'click',
		(e) => {
			if (ref.current == null || ref.current.contains(e.target)) return;
			cb(e);
		},
		document,
	);
}
```

Вход в полноэкранный режим

Хук **useClickOutside** предназначен для упрощения процесса обнаружения щелчков за пределами указанного компонента. Используя хук useEventListener, он прослушивает события щелчка на уровне документа, позволяя вам запускать функцию обратного вызова, когда щелчок происходит за пределами ссылки на указанный компонент.

Одно из главных преимуществ useClickOutside - простота использования. Просто импортируйте хук в свой компонент и передайте ссылку на нужный компонент и функцию обратного вызова. Хук берет на себя настройку и очистку слушателя событий, экономя ваше время и усилия. Кроме того, он прекрасно сочетается с функциональными компонентами, использующими хуки useState и useRef.

Потенциальные возможности применения useClickOutside безграничны. Он особенно полезен при реализации модальных окон, выпадающих меню или любых элементов, которые должны закрываться, когда пользователь взаимодействует с чем-либо за их пределами. Используя useClickOutside, вы сможете улучшить пользовательский опыт, обеспечив интуитивное и эффективное взаимодействие.

```js
import { useRef, useState } from 'react';
import useClickOutside from './useClickOutside';

export default function ClickOutsideComponent() {
	const [open, setOpen] = useState(false);
	const modalRef = useRef();

	useClickOutside(modalRef, () => {
		if (open) setOpen(false);
	});

	return (
		<>
			<button onClick={() => setOpen(true)}>Открыть</button>
			<div
				ref={modalRef}
				style={{
					display: open ? 'block' : 'none',
					backgroundColor: 'blue',
					цвет: 'белый',
					width: '100px',
					высота: '100px',
					position: 'absolute',
					top: 'calc(50% - 50px)',
					left: 'calc(50% - 50px)',
				}}
			>
				<span>Модальный</span>
			</div>
		</>
	);
}
```

Вход в полноэкранный режим

Чтобы увидеть _useClickOutside_ в действии, посмотрите на пример выше. В этом случае компонент ClickOutsideComponent использует хук для переключения видимости модального окна. Когда пользователь щелкает за пределами модального окна, предоставленная функция обратного вызова устанавливает состояние open в false, закрывая модальное окно. Таким образом, компонент предлагает элегантный и удобный способ управления видимостью модального окна.

Полная версия | React Custom Hooks:  
[https://dev.to/sergeyleschev/supercharge-your-react-projects-with-custom-hooks-pl4](https://dev.to/sergeyleschev/supercharge-your-react-projects-with-custom-hooks-pl4)
