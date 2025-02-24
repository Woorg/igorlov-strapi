---
title: Печать карт с помощью PyQGIS
meta_title: Печать карт с помощью PyQGIS | Игорь Горлов - Фронтeндер
description: >-
  Узнайте, как легко распечатать карты с помощью PyQGIS, воспользовавшись этим
  пошаговым руководством. PyQGIS  это библиотека Python, которая предоставляет
  дост
date: 2023-12-18T00:00:00.000Z
categories:
  - Как закодить
author: Игорь Горлов
type: blog
draft: false
tags:
  - Pyqgis
  - Python
image: ../../assets/images/pechat-kart-s-pomoschiu-pyqgis-Dec-18-2023.avif
slug: pechat-kart-s-pomoschiu-pyqgis
lastmod: 2024-03-20T21:26:44.113Z
---

Узнайте, как легко распечатать карты с помощью PyQGIS, воспользовавшись этим пошаговым руководством. PyQGIS - это библиотека Python, которая предоставляет доступ к QGIS API, позволяя автоматизировать задачи и создавать пользовательские плагины. В этом руководстве мы будем использовать класс QgsLayoutExporter() для экспорта макетов в виде изображений, PDF и SVG. Независимо от того, являетесь ли вы профессионалом в области ГИС или разработчиком на Python, вы найдете этот учебник полезным для улучшения ваших навыков работы с картами.

Мы используем класс QgsLayoutExporter() для экспорта открытого нами макета:

`manager = QgsProject.instance().layoutManager() print(manager.printLayouts()) layout = manager.layoutByName("Layout1")`.

Мы используем класс QgsLayoutExporter() для экспорта в изображения, SVG и PDF:

`exporter = QgsLayoutExporter(layout)`.

## Экспорт в изображение PNG:

`exporter.exportToImage("D:/Python_QGIS/Layout1.png", QgsLayoutExporter.ImageExportSettings())`.

## Экспорт в PDF:

`exporter.exportToPdf("D:/Python_QGIS/Layout1.pdf", QgsLayoutExporter.PdfExportSettings())`.

## Экспорт в SVG-изображение:

`exporter.exportToSvg("D:/Python_QGIS/Layout1.svg", QgsLayoutExporter.SvgExportSettings())`.

Используйте цикл for для экспорта макета:

`for layout in manager.printLayouts(): exporter = QgsLayoutExporter(layout) exporter.exportToImage("D:/Python_QGIS/Image2.png".format(layout.name()), QgsLayoutExporter.ImageExportSettings())`.

В заключение хочу сказать, что это руководство содержит пошаговую инструкцию о том, как легко печатать карты с помощью PyQGIS. В нем объясняется, как использовать класс QgsLayoutExporter() для экспорта макетов в виде изображений, PDF и SVG. Следуя этому руководству, профессионалы ГИС и разработчики на Python смогут улучшить свои навыки создания карт и автоматизировать задачи. В целом, этот учебник является полезным ресурсом для тех, кто хочет улучшить свои знания о печати карт с помощью PyQGIS.

Если вам понравился контент, пожалуйста, подпишитесь на мой канал для получения новых материалов

[Источник](https://dev.to/azad77/12-map-printing-with-pyqgis-4hpe)
