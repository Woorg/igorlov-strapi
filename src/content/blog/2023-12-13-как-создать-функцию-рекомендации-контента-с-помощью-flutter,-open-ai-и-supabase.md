---
title: >-
  Как создать функцию рекомендации контента с помощью Flutter, Open AI и
  Supabase
meta_title: >-
  Как создать функцию рекомендации контента с помощью Flutter, Open AI и
  Supabase - Фул Фронт Дев
description: >-
  Рекомендация релевантного контента пользователю очень важна для поддержания
  его интереса к приложению. Хотя это обычная функция, которую мы хотели бы
  иметь в н
date: 2023-12-13T01:45:07.435Z
image: >-
  ../../assets/images/kak-sozdat-funktsyiu-rekomendatsyy-kontenta-s-pomoschiu-flutter-open-ai-y-supabase-Dec-13-2023.avif
categories:
  - Учебник
author: Igor Gorlov
tags:
  - Open AI
  - Supabase
  - Flutter
draft: false
translated: ''
translatedPosition: ''
type: blog
slug: >-
  kak-sozdat-funktsyiu-rekomendatsyy-kontenta-s-pomoschiu-flutter-open-ai-y-supabase
lastmod: 2024-03-20T21:26:43.254Z
---

Рекомендация релевантного контента пользователю очень важна для поддержания его интереса к приложению. Хотя это обычная функция, которую мы хотели бы иметь в наших приложениях, создать ее не так просто. Ситуация изменилась с появлением векторных баз данных и открытого искусственного интеллекта. Сегодня мы можем выполнять семантический поиск с учетом контекста контента с помощью всего одного запроса к векторной базе данных.  
В этой статье мы расскажем, как можно создать приложение для просмотра фильмов на Flutter, которое рекомендует другой фильм на основе того, что просматривает пользователь.

Небольшая оговорка: в этой статье представлен обзор того, что можно создать с помощью векторной базы данных, поэтому в ней не будут рассмотрены все детали реализации. Вы можете найти полную кодовую базу приложения в этой статье [здесь](https://github.com/dshukertjr/flutter-movie-recommendation), чтобы узнать больше деталей.

## [](https://dev.to/supabase/how-to-build-a-content-recommendation-feature-using-flutter-open-ai-and-supabase-3mg4#why-use-a-vector-database-for-recommending-content)Зачем использовать векторную базу данных для рекомендации контента

В машинном обучении часто используется процесс преобразования фрагмента контента в векторное представление, называемое эмбеддингом, поскольку он позволяет математически анализировать семантический контент. Если предположить, что у нас есть движок, способный создавать вкрапления, хорошо учитывающие контекст данных, мы можем посмотреть на расстояние между каждым вкраплением, чтобы понять, похожи или нет два контента. Open AI предоставляет хорошо натренированную модель для преобразования текстового контента в вкрапления, поэтому ее использование позволяет нам создать высококачественный рекомендательный механизм.

Существует множество вариантов векторных баз данных, но мы будем использовать Supabase в качестве нашей векторной базы данных в этой статье, потому что мы хотим хранить также данные без вкраплений, и мы хотим иметь возможность легко запрашивать их из нашего приложения Flutter.

## [](https://dev.to/supabase/how-to-build-a-content-recommendation-feature-using-flutter-open-ai-and-supabase-3mg4#what-we-will-build)Что мы будем строить

Мы будем создавать приложение для просмотра фильмов. Подумайте о Netflix, за исключением того, что пользователи не смогут посмотреть фильм. Цель этого приложения - продемонстрировать, как можно выводить на поверхность связанный контент, чтобы удержать пользователей.

[![Интерфейсы приложений](https://res.cloudinary.com/practicaldev/image/fetch/s--FEyPL1G7--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/w2ayn17ee891t6m3sns2.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--FEyPL1G7--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/w2ayn17ee891t6m3sns2.png)

## [](https://dev.to/supabase/how-to-build-a-content-recommendation-feature-using-flutter-open-ai-and-supabase-3mg4#tools-technologies-used)Используемые инструменты/технологии

- [Flutter](https://flutter.dev/) - используется для создания интерфейса приложения
- [Supabase](https://supabase.com/) - используется для хранения эмбеддингов, а также других данных о фильмах в базе данных
- [Open AI API](https://openai.com/blog/openai-api) - используется для преобразования данных о фильмах в эмбеддинги
- [TMDB API](https://developer.themoviedb.org/docs) - Бесплатный API для получения данных о фильмах.

## [](https://dev.to/supabase/how-to-build-a-content-recommendation-feature-using-flutter-open-ai-and-supabase-3mg4#creating-the-app)Создание приложения

Сначала нам нужно заполнить базу данных данными о фильмах и их вкраплениях. Для этого мы воспользуемся [Supabase edge functions](https://supabase.com/docs/guides/functions), чтобы вызвать TMDB API и Open AI API для получения данных о фильмах и генерации вкраплений. Как только мы получим данные, мы сохраним их в базе данных Supabase и запросим их из нашего приложения Flutter.

[![Обзор системы](https://res.cloudinary.com/practicaldev/image/fetch/s--4akHAVbW--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/pufwjkb1vqut4xov9adw.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--4akHAVbW--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/pufwjkb1vqut4xov9adw.png)

### [](https://dev.to/supabase/how-to-build-a-content-recommendation-feature-using-flutter-open-ai-and-supabase-3mg4#step-1-create-the-table)Шаг 1: Создание таблицы

У нас будет одна таблица для этого проекта, и это таблица `films`. Таблица `films` будет хранить некоторую базовую информацию о каждом фильме, например, название или данные о релизе, а также встраивать обзор каждого фильма, чтобы мы могли выполнять векторный поиск сходства друг с другом.

```sql
-- Включить расширение pgvector
создать расширение vector
с
  расширениями схем;

-- Создать таблицу
создать таблицу public.films (
  id integer первичный ключ,
  текст названия,
  текст обзора,
  дата_релиза дата,
  backdrop_path text,
  embedding vector(1536)
);

-- Включите защиту на уровне строки
alter table public.films включить защиту на уровне строк;

-- Создайте политику, позволяющую любому пользователю читать таблицу films
создать Политика "Дети публичны." на public.films для select using (true);
```

### [](https://dev.to/supabase/how-to-build-a-content-recommendation-feature-using-flutter-open-ai-and-supabase-3mg4#step-2-get-movie-data)Шаг 2: Получение данных о фильме

Получить данные о фильмах относительно просто. TMDB API предоставляет простую в использовании конечную точку [movies endpoint](https://developer.themoviedb.org/reference/discover-movie) для запроса информации о фильмах, а также широкий спектр фильтров для сужения результатов запроса.

Нам нужен бэкэнд для безопасного вызова API, и для этого мы воспользуемся [Supabase Edge Functions](https://supabase.com/docs/guides/functions). Шаги со 2 по 4 будут заключаться в построении кода этой граничной функции, а полный пример кода можно найти [здесь](https://github.com/dshukertjr/flutter-movie-recommendation/blob/main/supabase/functions/get_film_data/index.ts).

Следующий код предоставит нам 20 самых популярных фильмов за определенный год.

```ts
const searchParams = new URLSearchParams();
searchParams.set('sort_by', 'popularity.desc');
searchParams.set('page', '1');
searchParams.set('language', 'en-US');
searchParams.set('primary_release_year', `${year}`);
searchParams.set('include_adult', 'false');
searchParams.set('include_video', 'false');
searchParams.set('region', 'US');
searchParams.set('watch_region', 'US');
searchParams.set('with_original_language', 'en');

const tmdbResponse = await fetch(
	`https://api.themoviedb.org/3/discover/movie?${searchParams.toString()}`,
	{
		метод: 'GET',
		заголовки: {
			'Content-Type': 'application/json',
			Авторизация: `Bearer ${tmdbApiKey}`,
		},
	},
);

const tmdbJson = await tmdbResponse.json();

const tmdbStatus = tmdbResponse.status;
if (!(200 <= tmdbStatus && tmdbStatus <= 299)) {
	return returnError({
		сообщение: 'Ошибка при получении данных из tmdb API',
	});
}

const films = tmdbJson.results;
```

### [](https://dev.to/supabase/how-to-build-a-content-recommendation-feature-using-flutter-open-ai-and-supabase-3mg4#step-3-generate-embeddings)Шаг 3: Генерация вкраплений

Мы можем взять данные о фильмах из предыдущего шага и сгенерировать вкрапления для каждого из них. Здесь мы вызываем [Open AI Embeddings API](https://platform.openai.com/docs/guides/embeddings), чтобы преобразовать `overview` каждого фильма в эмбеддинги. `Обзор` содержит краткое описание каждого фильма и является хорошим источником для создания вкраплений, представляющих каждый из фильмов.

```ts
const response = await fetch('https://api.openai.com/v1/embeddings', {
	метод: 'POST',
	headers: {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${openAiApiKey}`,
	},
	body: JSON.stringify({
		input: film.overview,
		model: 'text-embedding-ada-002',
	}),
});

const responseData = await response.json();
if (responseData.error) {
	return returnError({
		сообщение: `Ошибка при получении встраивания Open API: ${responseData.error.message}`,
	});
}

const embedding = responseData.data[0].embedding;
```

### [](https://dev.to/supabase/how-to-build-a-content-recommendation-feature-using-flutter-open-ai-and-supabase-3mg4#step-4-store-the-data-in-the-supabase-database)Шаг 4: Храните данные в базе данных Supabase

После того как мы получили данные о фильме и данные о вставке, нам осталось их сохранить. Мы можем вызвать функцию `upsert()` на клиенте Supabase, чтобы легко сохранить данные.

Опять же, я опустил много кода здесь для простоты, но вы можете найти полный код краевых функций с шага 2 по шаг 4 [здесь](https://github.com/dshukertjr/flutter-movie-recommendation/blob/main/supabase/functions/get_film_data/index.ts).

```ts
// Код из шага 2
// Получаем данные о фильмах и сохраняем их в переменной `films`.
...

for(const film of films) {
    // Код из Шага 3
  // Получаем вкрапления и сохраняем их в переменной `embeddings`.

    filmsWithEmbeddings.push({
      id: film.id,
      title: film.title,
      обзор: film.overview,
      release_date: film.release_date,
      backdrop_path: film.backdrop_path,
      embedding,
    })
}

// Сохраняем каждый фильм, а также его вкрапления в базу данных Supabase
const { error } = await supabase.from('films').upsert(filmsWithEmbeddings)
```

### [](https://dev.to/supabase/how-to-build-a-content-recommendation-feature-using-flutter-open-ai-and-supabase-3mg4#step-5-create-a-database-function-to-query-similar-movies)Шаг 5: Создаем функцию базы данных для запроса похожих фильмов

Для того чтобы выполнить векторный поиск сходства с помощью Supabase, нам нужно создать [функцию базы данных](https://supabase.com/docs/guides/database/functions). Эта функция базы данных будет принимать в качестве аргумента `embedding` и `film_id`. Аргумент `embedding` будет являться вставкой для поиска похожих фильмов в базе данных, а аргумент film_id будет использоваться для отсеивания одинаковых фильмов, которые запрашиваются.

Кроме того, мыЧтобы эффективно выполнять запросы даже при больших наборах данных, мы установили [HSNW-индекс](https://supabase.com/blog/increase-performance-pgvector-hnsw) на столбце `embedding`.

```sql
-- Установить индекс на столбце "встраивание
создайте индекс на фильмах с помощью hnsw (embedding vector_cosine_ops);

-- Создание функции для поиска связанных фильмов
создать или заменить функцию get_related_film(embedding vector(1536), film_id integer)
возвращает множество фильмов
язык sql
как $
    выбрать *
    из фильмов
    where id != film_id
    order by films.embedding <=> get_related_film.embedding
    ограничение 6;
Инвокер безопасности $;
```

### [](https://dev.to/supabase/how-to-build-a-content-recommendation-feature-using-flutter-open-ai-and-supabase-3mg4#step-6-create-the-flutter-interface)Шаг 6: Создание интерфейса Flutter

Теперь, когда у нас готов бэкэнд, нам осталось создать интерфейс для отображения и запроса данных. Поскольку основная цель этой статьи - продемонстрировать поиск по сходству с помощью векторов, я не буду вдаваться во все подробности реализации Flutter, но вы можете найти полную кодовую базу [здесь](https://github.com/dshukertjr/flutter-movie-recommendation/tree/main/flutter).

В нашем приложении будут следующие страницы:

- **HomePage**: точка входа в приложение и отображение списка фильмов.
- **DetailsPage**: отображает детали фильма, а также связанные с ним фильмы

[![Структура каталогов Flutter](https://res.cloudinary.com/practicaldev/image/fetch/s--xnW7ryJu--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/rf225zrv6gzdbozpabgj.jpg)](https://res.cloudinary.com/practicaldev/image/fetch/s--xnW7ryJu--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/rf225zrv6gzdbozpabgj.jpg)

`components/film_cell.dart` - это общий компонент для отображения настраиваемой ячейки для главной и подробной страницы. `models/film.dart` содержит модель данных, представляющую один фильм.

Обе страницы выглядят следующим образом. Волшебство происходит в нижней части страницы подробностей в разделе с надписью `Вам также может понравиться:`. Мы выполняем векторный поиск сходства, чтобы получить список фильмов, похожих на выбранный, используя функцию базы данных, которую мы реализовали ранее.

[![Интерфейсы приложений](https://res.cloudinary.com/practicaldev/image/fetch/s--FEyPL1G7--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/w2ayn17ee891t6m3sns2.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--FEyPL1G7--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/w2ayn17ee891t6m3sns2.png)

Ниже приведен код главной страницы. Это простой ListView со стандартным запросом `select` из нашей таблицы `films`. Ничего особенного здесь нет.

```dart
import 'package:filmsearch/components/film_cell.dart';
import 'package:filmsearch/main.dart';
import 'package:filmsearch/models/film.dart';

import 'package:flutter/material.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final filmsFuture = supabase
      .from('films')
      .select<List<Map<String, dynamic>>()
      .withConverter<List<Film>>((data) => data.map(Film.fromJson).toList());

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Films'),
      ),
      body: FutureBuilder(
          future: filmsFuture,
          builder: (context, snapshot) {
            if (snapshot.hasError) {
              return Center(
                child: Text(snapshot.error.toString()),
              );
            }
            if (!snapshot.hasData) {
              return const Center(child: CircularProgressIndicator());
            }
            final films = snapshot.data!
            return ListView.builder(
              itemBuilder: (context, index) {
                final film = films[index];
                return FilmCell(film: film);
              },
              itemCount: films.length,
            );
          }),
    );
  }
}
```

На странице подробностей мы вызываем функцию базы данных `get_related_film`, созданную в шаге 5, чтобы получить 6 наиболее связанных фильмов и отобразить их.

```dart
import 'package:filmsearch/components/film_cell.dart';
import 'package:filmsearch/main.dart';
import 'package:filmsearch/models/film.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

class DetailsPage extends StatefulWidget {
  const DetailsPage({super.key, required this.film});

  final Film film;

  @override
  State<DetailsPage> createState() => _DetailsPageState();
}

class _DetailsPageState extends State<DetailsPage> {
  late final Future<List<Film>> relatedFilmsFuture;

  @override
  void initState() {
    super.initState();

        // Создаем будущее, которое вызывает функцию get_related_film для запроса
        // связанные фильмы.
    relatedFilmsFuture = supabase.rpc('get_related_film', params: {
      'embedding': widget.film.embedding,
      'film_id': widget.film.id,
    }).withConverter<List<Film>>((data) =>
        List<Map<String, dynamic>>.from(data).map(Film.fromJson).toList())
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.film.title),
      ),
      body: ListView(
        children: [
          герой(
            tag: widget.film.imageUrl,
            дочерний: Image.network(widget.film.imageUrl),
          ),
          Padding(
            padding: const EdgeInsets.all(8.0),
            дочерний: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Text(
                  DateFormat.yMMMd().format(widget.film.releaseDate),
                  стиль: const TextStyle(цвет: Colors.grey),
                ),
                const SizedBox(высота: 8),
                Text(
                  widget.film.overview,
                  style: const TextStyle(fontSize: 16),
                ),
                const SizedBox(высота: 24),
                const Text(
                  'Вам также может понравиться:',
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ],
            ),
          ),
                    // Отображение списка связанных фильмов
          FutureBuilder<List<Film>>(
              future: relatedFilmsFuture,
              builder: (context, snapshot) {
                if (snapshot.hasError) {
                  return Center(
                    child: Text(snapshot.error.toString()),
                  );
                }
                if (!snapshot.hasData) {
                  return const Center(child: CircularProgressIndicator());
                }
                final films = snapshot.data!
                return Wrap(
                  children: films
                      .map((film) => InkWell(
                            onTap: () {
                              Navigator.of(context).push(MaterialPageRoute(
                                  builder: (context) =>
                                      DetailsPage(film: film))))
                            },
                            child: FractionallySizedBox(
                              widthFactor: 0.5,
                              дочерний: FilmCell(
                                фильм: фильм,
                                isHeroEnabled: false,
                                fontSize: 16,
                              ),
                            ),
                          ))
                      .toList(),
                );
              }),
        ],
      ),
    );
  }
}
```

Вот и все. Теперь у нас есть функционирующая система рекомендаций по сходству на основе Open AI, встроенная в наше приложение Flutter. В качестве контекста сегодня использовались фильмы, но вы можете легко представить, что эту же концепцию можно применить и к другим типам контента.

## [](https://dev.to/supabase/how-to-build-a-content-recommendation-feature-using-flutter-open-ai-and-supabase-3mg4#afterthoughts)Afterthoughts

В этой статье мы рассмотрели, как можно взять один фильм и порекомендовать список фильмов, похожих на выбранный. Это хорошо работает, но у нас есть только один образец для получения сходства. А что, если мы хотим рекомендовать список фильмов для просмотра, основываясь, скажем, на последних 10 фильмах, которые смотрел пользователь? Существует множество способов решения подобных проблем, и я надеюсь, что прочтение этой статьи пробудило ваше интеллектуальное любопытство к решению подобных проблем.

## [](https://dev.to/supabase/how-to-build-a-content-recommendation-feature-using-flutter-open-ai-and-supabase-3mg4#resources)Ресурсы

- [Полная кодовая база приложения из этой статьи](https://github.com/dshukertjr/flutter-movie-recommendation)
- https://www.youtube.com/watch?v=pG95GO0Kcxs
- [Supabase pgvector guide](https://supabase.com/docs/guides/database/extensions/pgvector)
- [Хранение вкраплений OpenAI в Postgres с помощью pgvector](https://supabase.com/docs/guides/database/extensions/pgvector)
