---
title: Как обучить классификатор для набора данных Iris с помощью Tinygrad
meta_title: >-
  Как обучить классификатор для набора данных Iris с помощью Tinygrad | Игорь
  Горлов - Фронтeндер
description: >-
  В этом уроке мы рассмотрим процесс построения простой модели классификации
  ирисов с помощью TinyGrad, легкого фреймворка глубокого обучения. Мы
  рассмотрим след
date: 2023-12-16T00:00:00.000Z
image: >-
  ../../assets/images/kak-obuchyt-klassyfykator-dlia-nabora-dann-kh-iris-s-pomoschiu-tinygrad-Dec-16-2023.avif
categories:
  - Учебник
author: Игорь Горлов
draft: false
slug: kak-obuchyt-klassyfykator-dlia-nabora-dann-kh-iris-s-pomoschiu-tinygrad
tags:
  - Ai
  - Tinygrad
  - Машинное обучение
  - Python
lastmod: 2024-03-20T21:26:47.962Z
---

В этом уроке мы рассмотрим процесс построения простой модели классификации ирисов с помощью TinyGrad, легкого фреймворка глубокого обучения. Мы рассмотрим следующие темы:

Этот учебник предполагает, что у вас есть хотя бы базовое понимание нейронных сетей и линейных функций.

Давайте шаг за шагом перейдем к построению нашей модели классификации Iris.

## Знакомство с набором данных Iris

Набор данных Iris - это классический набор данных в машинном обучении. Он содержит образцы трех видов цветков ириса, каждый из которых имеет четыре характеристики: длина чашелистика, ширина чашелистика, длина лепестка и ширина лепестка. Задача состоит в том, чтобы классифицировать виды на основе этих признаков.

## Настройка среды

Прежде чем мы начнем, убедитесь, что у вас установлен TinyGrad и необходимые зависимости. Инструкции по установке можно найти здесь.

Модель

Давайте начнем с создания модели в файле `model.py`.

```py
from tinygrad.tensor import Tensor
from tinygrad.nn import Linear


class IrisModel:
    def __init__(self):
        self.linear1 = Linear(4, 16)
        self.linear2 = Linear(16, 3)

    def forward(self, x):
        x = self.linear1(x).relu()
        x = self.linear2(x)
        return x.log_softmax()

    @property
    def params(self):
        return [self.linear1.weight, self.linear2.weight]
```

Начнем с импорта необходимых классов из tinygrad

Как и в pytorch, мы можем создать класс для нашей модели. Поскольку набор данных радужной оболочки глаза содержит четыре поля \[float, float, float, float\], мы можем использовать простые линейные слои для построения нашей модели.

Функция forward принимает входной тензор, x, и передает его нашим слоям классов, l1 и l2. В конце мы используем функцию log_softmax(), чтобы получить тензор вероятностей для каждого поля.

## Предварительная обработка данных и обучение

Мы создадим новый файл `training.py`, в котором будем обрабатывать наши данные из sklearn.datasets и использовать их для обучения нашей модели

Сначала импортируем все необходимое:

```py
# Import necessary modules
from tinygrad.nn.optim import SGD
from tinygrad.tensor import Tensor
from tinygrad.nn import Linear
from sklearn.datasets import load_iris as iris
from sklearn.model_selection import train_test_split as dataset_split
from model import IrisModel

# Load iris dataset
iris_data = iris()

# Split the dataset into training and testing sets
train_data, test_data, train_labels, test_labels = dataset_split(iris_data.data, iris_data.target, test_size=0.2, random_state=42)

# Create a model instance
model = IrisModel()

# Define the optimizer
optimizer = SGD(model.parameters(), lr=0.01)

# Train the model
for epoch in range(100):
    # Forward pass
    output = model.forward(train_data)
    loss = ((output - train_labels) ** 2).sum()

    # Backward pass
    loss.backward()
    optimizer.step()
    optimizer.zero_grad()

# Evaluate the model
test_output = model.forward(test_data)
accuracy = np.mean(np.argmax(test_output, axis=1) == test_labels)
print("Test Accuracy:", accuracy)
```

Используя load_iris, мы загрузим наши данные, затем разделим их на обучающее и тестовое подмножество

```py
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split

# Load the iris dataset
iris = load_iris()
X = iris.data
y = iris.target

# Split the dataset into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
```

Далее нам нужно создать экземпляр базовой модели, создать оптимизатор и установить размер партии и количество эпох

```py
from sklearn.linear_model import SGDClassifier

model = SGDClassifier()
optimizer = SGDClassifier(alpha=1e-3)
epochs = 10000
batch_size = 32
```

В отличие от библиотек типа pytorch или tensorflow, нам нужно указать параметры, которые будут обновляться в нашей модели при использовании оптимизатора, для удобства я создал функцию params, возвращающую список весов каждого линейного слоя, иначе вы бы написали что-то вроде:

`opt = SGD([model.l1.weight, model.l2.weight], lr=1e-3)`.

## Переходим к собственно обучению

Используя похожий на pytorch for loop подход, мы возьмем случайную выборку из обучающих данных, преобразуем ее в тензор, а затем передадим этот входной тензор в нашу модель для обучения.

Обычно функции потерь имеют свой собственный класс, но в tinygrad к ним можно обращаться с помощью Tensor.

В данном случае мы используем Tensor.sparse_categorial_crossentropy, поскольку мы имеем дело с многоклассовой классификацией.

Эта функция потерь принимает два входа: наш тензор выходов (out) и тензор меток (target).

```py
for epoch in range(epochs):
    sample_indices = np.random.randint(0, X_train.shape[0], size=(32))
    batch = Tensor(X_train[sample_indices], requires_grad=False)
    target = Tensor(y_train[sample_indices])

    out = model.forward(batch)
    loss = Tensor.sparse_categorical_crossentropy(out, target)

    opt.zero_grad()
    loss.backward()
    opt.step()

    preds = out.numpy().argmax(axis=-1)
    acc = (preds == target.numpy()).mean()

    if epoch % 100 == 0:
        print(f"Epoch {epoch}, loss: {loss.numpy()}, acc: {acc}")
```

При выполнении кода вы можете увидеть такие строки

Эпоха 9990, потери: 0.20084689557552338, acc: 0.96875 Эпоха 9991, потери: 0.1804082840681076, acc: 1.0 Эпоха 9992, убыток: 0.28833892941474915, acc: 0.90625 Эпоха 9993, потери: 0.15084490180015564, acc: 0.96875 Эпоха 9994, потери: 0.1843332201242447, acc: 1.0 Эпоха 9995, потери: 0.21117405593395233, acc: 0.96875 Эпоха 9996, потери: 0.2075180560350418, acc: 0.96875 Эпоха 9997, потери: 0.13138934969902039, акк: 1.0`

Если потери уменьшаются, значит, наша модель обучается правильно. Также полезно рассчитать точность тестирования нашей модели, чтобы определить, правильно ли она делает прогнозы.

## Давайте объясним, что делают opt.zero_grad(), loss.backward() и opt.step()

### opt.zero_grad()

Эта строка отвечает за очистку или обнулениевычисление градиентов параметров модели. В контексте глубокого обучения в процессе обратного распространения вычисляются градиенты потерь относительно параметров модели. Эти градиенты используются для обновления параметров модели с целью минимизации потерь. Прежде чем вычислять новые градиенты для текущей партии данных, необходимо очистить градиенты предыдущей партии. Эта строка гарантирует, что градиенты будут инициализированы нулем.

### loss.backward()

После очистки градиентов эта строка вычисляет градиенты потерь относительно параметров модели. Она выполняет обратное распространение по вычислительному графу модели. Другими словами, она вычисляет, насколько нужно изменить каждый параметр, чтобы уменьшить потери. Градиенты сохраняются в параметрах модели и будут использоваться на следующем шаге для обновления модели.

### opt.step()

Наконец, эта строка обновляет параметры модели, используя вычисленные градиенты. Это шаг, на котором модель обучается и адаптируется к данным. Оптимизатор (в данном случае opt) отвечает за настройку параметров таким образом, чтобы уменьшить потери. Обычные оптимизаторы, такие как стохастический градиентный спуск (SGD) или его разновидности, например Adam или RMSprop, используют градиенты для определения направления и величины обновления параметров. Скорость обучения, которая часто является гиперпараметром, управляет размером шага обновления.

На выходе мы получаем тензор вероятностей, некоторые из которых отрицательные, а некоторые положительные. Мы используем np.argmax для получения индекса значения с наибольшей вероятностью. Этот индекс соответствует одной из 3 меток, предлагаемых набором данных радужной оболочки глаза.

```py
classes = { 0: "iris-setosa", 1: "iris-versicolor", 2: "iris-virginica" }
```

Подробнее об этом позже

Последний шаг - оценить нашу модель на тестовом подмножестве, чтобы проверить ее точность на данных, на которых она не обучалась

```py
#avg_acc = 0
for i in range(100):
    samp = np.random.randint(0, X_test.shape[0], size=(32))
    batch = Tensor(X_test[samp], requires_grad=False).to("cuda")
    target = Tensor(y_test[samp]).to("cuda")
    out = model.forward(batch)
    preds = out.argmax(axis=-1).numpy()
    avg_acc += (preds == target.numpy()).mean()

print(f"Точность теста: {avg_acc/100}")
```

Я не буду слишком подробно объяснять этот шаг, потому что он похож на шаг обучения, за исключением того, что мы не изменяем веса модели с помощью обратного распространения и вычисления функции потерь.

Все, что мы хотим сделать, - это проверить, совпадает ли вывод нашей модели с реальной меткой для данной выборки обучающих данных.

Если вы получили точность выше 0,9, поздравляем! Вы только что построили свою первую модель с помощью tinygrad и использовали ее для обучения классификатора цветов ириса.

PyTorch и Tensorflow могут быть хороши, но Tinygrad позволяет по-новому взглянуть на машинное обучение, позволяя нам увидеть операции, происходящие на более низком уровне.

Использование переменной окружения “DEBUG=4” позволяет нам увидеть различные операции машинного обучения (mlops).
