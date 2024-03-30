---
title: Когда цифры не имеют смысла
meta_title: 'Когда цифры не имеют смысла | Игорь Горлов - Fullstack Developer '
description: >-
  В большинстве случаев базовая арифметика довольно проста и интуитивно понятна.
  Даже работа со степенями и корнями не доставляет особой головной боли. Однако
  ст
date: 2023-12-18T00:00:00.000Z
categories:
  - Учебник
author: Игорь Горлов
type: blog
draft: false
slug: kohda-tsyfr-ne-ymeiut-sm-sla
translatedPosition: 63
tags:
  - Python
image: ../../assets/images/kohda-tsyfr-ne-ymeiut-sm-sla-Dec-18-2023.avif
lastmod: 2024-03-20T21:26:44.551Z
---

В большинстве случаев базовая арифметика довольно проста и интуитивно понятна. Даже работа со степенями и корнями не доставляет особой головной боли. Однако стандарт IEEE для чисел с плавающей точкой включает специальные значения, которые могут все испортить: NaN (Not a Number), положительная бесконечность и отрицательная бесконечность. Фактически, большинство алгебраических свойств вещественных чисел больше не действуют. Единственная цель этого поста - показать несколько интересных для меня случаев, когда эти значения приводят к контринтуитивным результатам.

## Стандартное поведение NaN и бесконечности

For all x: `NaN > x` is false.

For all x: `NaN < x` is false.

For all x: `NaN == x` is false.

For all x: `NaN != x` is true.

Для всех x, кроме NaN и +Infinity: `+Infinity > x` истинно.

Для всех x, кроме Nan и -Infinity: `-Infinity < x` истинно.

`Infinity / Infinity = NaN`

`Infinity * 0 == NaN`

`Infinity - Infinity == NaN`

Любая другая арифметическая операция между числом и бесконечностью приводит к бесконечности (с возможной сменой знака).

Любая другая арифметическая операция между числом (или бесконечностью) и NaN приводит к результату NaN.

Все, что я буду рассказывать вам дальше, тривиально вытекает из понимания приведенного выше списка; иными словами, если вы понимаете все его следствия, я не скажу вам ничего нового. В любом случае, мне кажется интересным рассмотреть некоторые побочные эффекты, которые могут ускользнуть от нас, когда мы не помним о них.

## Сломанные свойства

Ниже приведен неполный список свойств, которые мы привыкли ожидать при программировании, но которые больше не верны из-за существования NaN и Infinity. Я приведу формулировку свойства (которое не выполняется), а затем часть кода на JavaScript и Python, реализующую его проверку, после чего приведу вызов, возвращающий false.

Примечание: JavaScript легко выдает значения `NaN` и `Infinity` не только потому, что это собственные значения, но и потому, что они получаются в результате обычных операций (`Math.sqrt(-1)` или `1/0`). В случае Python они реализованы в библиотеке `math` (`math.nan` и `math.inf`), и операции, которые могут привести к их появлению (`math.sqrt(-1)` или `1/0`), вызовут исключение. По этой причине в каждом фрагменте Python следует использовать следующий заголовок.

`из математики импортировать nan, inf`

Отказ от ответственности: эти фрагменты JavaScript также не будут работать со значениями типа строк или объектов. Я не пытаюсь сделать вывод об ошибках в JavaScript. Речь идет о значениях NaN и Infinity, которые относятся к числовым типам в любом языке с полной поддержкой стандарта IEEE.

Теперь посмотрите, как падают тавтологии.

## Идентичность

Начнем с самого очевидного и болезненного.

`function identity(x){ return x == x } identity(NaN)`

`def identity(x): return x == x  identity(nan)`

Некоторые из них являются прямым следствием этого.

Список не может содержать элементов, которые не равны ни одному элементу

Извините за явную избыточность высказывания: посмотрите примеры, чтобы понять, что я имею в виду.

```javascript
function checkIncludesEqual(arr, x) {
	if (arr.includes(x)) {
		return arr.some((e) => e === x);
	} else {
		return true;
	}
}
checkIncludesEqual([1, 2, NaN], NaN);
```

```python
def checkIncludesEqual(arr, x):
    if x in arr:
        return any(x == e for e in arr)
    else:
        return True

checkIncludesEqual([1, 2, nan], nan)
```

Максимальное значение списка больше или равно остальным

```javascript
function checkMaxIsGE(arr) {
	let maxVal = Math.max(...arr);
	return arr.every((x) => maxVal >= x);
}
checkMaxIsGE([-1, 0, 1, NaN]);
```

```python
def checkMaxIsGE(arr):
    maxVal = max(arr)
    return all(maxVal >= x for x in arr)

checkMaxIsGE([-1, 0, 1, nan])
```

Минимальное значение списка меньше или равно остальным

```javascript
function checkMinIsLE(arr) {
	let minVal = Math.min(...arr);
	return arr.every((x) => x <= minVal);
}
checkMinIsLE([-1, 0, 1, NaN]);
```

```python
def check_min_is_le(arr):
    min_val = min(arr)
    return all(min_val <= x for x in arr)

check_min_is_le([-1, 0, 1, nan])
```

Делимое равно делителю, умноженному на коэффициент

Это первое, что мы узнаем о делении. Из `D / d = Q` следует `D = Q * d`. Ну… не более. Этот пример можно показать только на JavaScript, потому что Python не позволяет делить на ноль.

```javascript
function checkDdQ(dividend, divisor) {
	quotient = dividend / divisor;
	return dividend == quotient * divisor;
}
checkDdQ(1, 0);
checkDdQ(1, Infinity);
```

Квадрат значения больше или равен самому себе

```javascript
function checkSquareIsGE(x) {
	return x * x >= x;
}
checkSquareIsGE(NaN);
```

```python
def check_square_is_ge(x):
    return x * x >= x

check_square_is_ge(nan)
check_square_is_ge(inf)
```

”Меньше или равно” эквивалентно ”Не больше”.

Меня это особенно беспокоит, не знаю почему.

```javascript
function checkLEQisNGT(x) {
	return x <= 10 === !(x > 10);
}
checkLEQisNGT(NaN);
```

```python
def check_LEQ_is_NGT(x):
    return x <= 10 and not x > 10

check_LEQ_is_NGT(nan)
```

Величина, деленная сама на себя, равна единице

```javascript
function checkBetweenSelfIsOne(x) {
	return x / x === 1;
}
checkBetweenSelfIsOne(NaN);
checkBetweenSelfIsOne(Infinity);
```

```python
def check_between_self_is_one(x):
    return x / x == 1

check_between_self_is_one(float('nan'))
check_between_self_is_one(float('inf'))
```

Значение минус само себя равно нулю

```javascript
function checkMinusSelfIsZero(x) {
	return x - x == 0;
}

checkMinusSelfIsZero(NaN);
checkMinusSelfIsZero(Infinity);
```

```python
def checkMinusSelfIsZero(x):
    return x - x == 0

checkMinusSelfIsZero(nan)
checkMinusSelfIsZero(inf)
```

Значение, умноженное на ноль, равно нулю

```javascript
function checkTimesZero(x) {
	return x * 0 === 0;
}

checkTimesZero(NaN);
checkTimesZero(Infinity);
```

```python
def check_times_zero(x):
    return x * 0 == 0

check_times_zero(nan)
check_times_zero(inf)
```

У этих двух последних есть интересный побочный эффект. Можно было бы ожидать, что `1 / (x-x)` и `1 / (x * 0)` приведут к бесконечности. Однако, когда `x` - бесконечность, они приводят к NaN. У вас еще не кружится голова?

## Интересный факт!

Во время работы над этой статьей я нашел кое-что интересное о квадратных корнях в Python. Как я уже говорил, Python выдает исключение, если вы пытаетесь вычислить квадратный корень из отрицательного числа. Но в Python встроена реализация комплексных чисел, поэтому если вместо этого использовать оператор мощности (`**`), то он вернет корректный результат!

```python
from math import sqrt
import cmath

sqrt(-1)  # ValueError: math domain error
(-1) ** 0.5  # (6.123233995736766e-17+1j)
```

Идеальным результатом было бы `(0+1j)`, но из-за проблем с точностью плавающей точки вместо `0` получилось очень, очень маленькое число. Надеюсь, вам это тоже показалось интересным!

## Заключение

Семантически грамотный код гораздо меньше подвержен ошибкам и избавляет от необходимости постоянно отлавливать исключения. Надеюсь, эти примеры послужили напоминанием о том, что нельзя пренебрегать специальными числовыми значениями или принимать как должное многие кажущиеся интуитивно понятными свойства, которые, если их не учитывать, могут привести к нежелательному поведению внешне корректного кода.
