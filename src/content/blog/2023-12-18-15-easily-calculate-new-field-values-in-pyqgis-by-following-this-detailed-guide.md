---
title: >-
  Легко рассчитайте значения новых полей в PyQGIS, следуя этому подробному
  руководству
meta_title: >-
  Легко рассчитайте значения новых полей в PyQGIS, следуя этому подробному
  руководству | Игорь Горлов - Фронтeндер
description: >-
  Если вы испытываете трудности с вычислением значений новых полей в PyQGIS,
  этот пошаговый учебник  идеальный ресурс для вас. В этом уроке мы проведем вас
  чере
date: 2023-12-18T00:00:00.000Z
categories:
  - Как закодить
author: Игорь Горлов
type: blog
draft: false
slug: >-
  lehko-rasschytaite-znachenyia-nov-kh-polei-v-pyqgis-sleduia-tomu-podrobnomu-rukovodstvu
tags:
  - Pyqgis
  - Python
image: >-
  ../../assets/images/lehko-rasschytaite-znachenyia-nov-kh-polei-v-pyqgis-sleduia-tomu-podrobnomu-rukovodstvu-Dec-18-2023.avif
lastmod: 2024-03-20T21:26:47.823Z
---

Если вы испытываете трудности с вычислением значений новых полей в PyQGIS, этот пошаговый учебник - идеальный ресурс для вас. В этом уроке мы проведем вас через процесс создания векторного слоя, добавления к нему приписанной таблицы, добавления данных в его поля и вычисления новых значений полей с помощью цикла for. В частности, мы покажем вам, как вычислить поле плотности. Независимо от того, являетесь ли вы начинающим или опытным пользователем PyQGIS, это руководство поможет вам усовершенствовать свои навыки и расширить возможности анализа данных.

Следуя инструкциям этого руководства, вы сможете создать векторный слой, добавить данные в его поля и вычислить новые значения полей с помощью цикла for. Мы привели полный код для справки. Урок подходит как для начинающих, так и для опытных пользователей PyQGIS. Основные выводы из этого урока включают в себя:

- Создавать векторный слой с приписанной таблицей
- Добавлять данные в поля векторного слоя
- Вычислите новые значения полей с помощью цикла for

## Сначала создайте векторный слой:

`from qgis.PyQt.QtCore import QVariant from qgis.core import edit vl = QgsVectorLayer("Point", "Cities_Kurdistan", "memory") pr = vl.dataProvider()`.

Затем добавьте к нему приписанную таблицу:

`pr.addAttributes([QgsField("Город", QVariant.String), QgsField("Население", QVariant.Double), QgsField("Площадь", QVariant.Double), QgsField("Плотность", QVariant.Double)]) vl.updateFields()`.

## Затем определите данные:

`my_data = [ {'x': 44.01, 'y': 36.19, 'City': 'Erbil', 'Population': 2932800, 'Area': 14872}, {'x': 45.43, 'y': 35.55, 'Город': 'Сулеймания', 'Население': 1967000, 'Area': 20143}, {'x': 42.99, 'y': 36.86, 'City': 'Духок', 'Население': 1292535, 'Area': 10955}, {'x': 45.98, 'y': 35.17, 'City': 'Халабджа', 'Население': 109000, 'Area': 889}]`.

После этого добавьте данные в поля:

`for rec in my_data: f = QgsFeature() pt = QgsPointXY(rec['x'], rec['y']) f.setGeometry(QgsGeometry.fromPointXY(pt)) f.setAttributes([rec['City'], rec['Population'], rec['Area']]) pr.addFeature(f) vl.updateExtents() QgsProject.instance().addMapLayer(vl)`

Поле плотности в настоящее время пустое, и мы вычислим его с помощью цикла for:

`with edit(vl): for f in vl.getFeatures(): f['Density'] = f['Population'] / f['Area'] vl.updateFeature(f)`

Полный код выглядит следующим образом:

`from qgis.PyQt.QtCore import QVariant from qgis.core import edit vl = QgsVectorLayer("Point", "Cities_Kurdistan", "memory") pr = vl.dataProvider() # добавляем атрибуты pr.addAttributes([QgsField("City", QVariant.String), QgsField("Население", QVariant.Double), QgsField("Площадь", QVariant.Double), QgsField("Плотность", QVariant.Double)]) vl.updateFields() #define your data my_data = [ {'x': 44.01, 'y': 36.19, 'City': 'Erbil', 'Population': 2932800, 'Area': 14872}, {'x': 45.43, 'y': 35.55, 'Город': 'Сулеймания', 'Население': 1967000, 'Area': 20143}, {'x': 42.99, 'y': 36.86, 'City': 'Духок', 'Население': 1292535, 'Area': 10955}, {'x': 45.98, 'y': 35.17, 'City': 'Халабджа', 'Население': 109000, 'Area': 889}]  # добавляем данные в поля for rec in my_data: f = QgsFeature() pt = QgsPointXY(rec['x'], rec['y']) f.setGeometry(QgsGeometry.fromPointXY(pt)) f.setAttributes([rec['City'], rec['Population'], rec['Area']]) pr.addFeature(f) vl.updateExtents() QgsProject.instance().addMapLayer(vl) # вычисляем "Плотность": with edit(vl): for f in vl.getFeatures(): f['Density'] = f['Population'] / f['Area'] vl.updateFeature(f)`

В заключение следует отметить, что данное руководство содержит исчерпывающую информацию о вычислении значений новых полей в PyQGIS. Мы надеемся, что это руководство поможет вам усовершенствовать свои навыки и улучшить возможности анализа данных.

Если вам понравился контент, пожалуйста, подпишитесь на мой канал для получения новых материалов

[Источник](https://dev.to/azad77/15-easily-calculate-new-field-values-in-pyqgis-by-following-this-detailed-guide-3nko)
