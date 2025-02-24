---
title: Простое разворачивание и откат функций PostgreSQL с помощью Supabase
meta_title: |
  Простой Разворачивание И Откат Функций PostgreSQL С...
description: >
  В мире управления базами данных версионный контроль и развертывание имеют
  решающее значение. Эффективное развертывание и управление функциями баз
  данных...
date: 2023-10-22T22:04:41.413Z
image: >-
  ../../assets/images/prostoj-razvorachivanie-i-otkat-funkcij-postgresql-s-pomoshьyu-supabase-Oct-23-2023.avif
categories:
  - Как закодить
author: Igor Gorlov
tags:
  - Postgres
draft: false
keywords:
  - PostgreSQL
type: blog
slug: prostoj-razvorachivanie-i-otkat-funkcij-postgresql-s-pomoshьyu-supabase
lastmod: 2024-03-20T21:26:44.791Z
---

В мире управления базами данных версионный контроль и развертывание имеют решающее значение. Эффективное развертывание и управление функциями баз данных необходимо для поддержания целостности ваших приложений, работающих с данными. В то время как миграции баз данных, как подробно описано в руководстве по миграциям Supabase, идеальны для долгосрочных проектов, существуют сценарии, такие как прототипирование и быстрая разработка, где требуется большая гибкость.

В этой статье мы исследуем подход, созданный для быстрого прототипирования и гибкой разработки - как легко разворачивать и откатывать функции PostgreSQL с использованием Supabase. Supabase, мощная альтернатива традиционным системам управления базами данных с открытым исходным кодом, упрощает процесс развертывания и управления функциями в таких сценариях.

Если вы работаете над более сложными рабочими процессами или долгосрочными проектами, мы настоятельно рекомендуем обратиться к руководству по миграциям Supabase для оптимальных практик версионного контроля и развертывания.

<!-- wp:rank-math/toc-block {"title":"Содержание","headings":[{"key":"d567c02c-3a6f-4b4c-ac4d-ff70b8eae4ad","content":"PostgreSQL и Supabase в современных веб-приложениях","level":2,"link":"#postgre-sql-и-supabase-в-современных-веб-приложениях","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"9210c7fe-4c8c-4cbd-9520-5a3811c48704","content":"Отслеживание истории функций в PostgreSQL","level":2,"link":"#отслеживание-истории-функций-в-postgre-sql","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"d8aff0af-1bca-4c71-b640-f24fc6c13995","content":" Сохранение истории функций","level":2,"link":"#сохранение-истории-функций","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"f0bbe039-41ab-4974-8ef3-c2cdca3f3688","content":"Функция archive.save_function_history","level":3,"link":"#функция-archive-save-function-history","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"0a7b5092-c19a-4372-a947-6c5a609da55e","content":"Развертывание функций из исходного кода","level":2,"link":"#развертывание-функций-из-исходного-кода","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"46746628-ca49-4313-8d40-5165a709a98e","content":"Функция create_function_from_source","level":3,"link":"#функция-create-function-from-source","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"f76a3228-b180-41ba-9a90-75564b76f475","content":"Настройка существующих функций в качестве первой версии","level":2,"link":"#настройка-существующих-функций-в-качестве-первой-версии","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"07847ad2-ab2d-411f-bd5b-7c799c498c00","content":"В заключение","level":2,"link":"#в-заключение","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"63772966-9117-4c04-8be8-f235bae00e4e","content":"Дополнительные ресурсы","level":2,"link":"#дополнительные-ресурсы","disable":false,"isUpdated":false,"isGeneratedLink":true}],"listStyle":"ul"} -->
<div class="wp-block-rank-math-toc-block" id="rank-math-toc"><h2>Содержание</h2><nav><ul><li class=""><a href="#postgre-sql-и-supabase-в-современных-веб-приложениях">PostgreSQL и Supabase в современных веб-приложениях</a></li><li class=""><a href="#отслеживание-истории-функций-в-postgre-sql">Отслеживание истории функций в PostgreSQL</a></li><li class=""><a href="#сохранение-истории-функций"> Сохранение истории функций</a><ul><li class=""><a href="#функция-archive-save-function-history">Функция archive.save_function_history</a></li></ul></li><li class=""><a href="#развертывание-функций-из-исходного-кода">Развертывание функций из исходного кода</a><ul><li class=""><a href="#функция-create-function-from-source">Функция create_function_from_source</a></li></ul></li><li class=""><a href="#настройка-существующих-функций-в-качестве-первой-версии">Настройка существующих функций в качестве первой версии</a></li><li class=""><a href="#в-заключение">В заключение</a></li><li class=""><a href="#дополнительные-ресурсы">Дополнительные ресурсы</a></li></ul></nav></div>
<!-- /wp:rank-math/toc-block -->

<h2 class="wp-block-heading" id="postgre-sql-и-supabase-в-современных-веб-приложениях">PostgreSQL и Supabase в современных веб-приложениях</h2>

PostgreSQL, надежная система управления реляционными базами данных с открытым исходным кодом (RDBMS), завоевала популярность в веб-разработке благодаря своей надежности, расширяемости и поддержке сложных типов данных.

Supabase, платформа с открытым исходным кодом, предоставляет различные инструменты и услуги для современных веб-приложений. Она использует PostgreSQL как свой основной базовый движок базы данных и предоставляет удобный интерфейс для управления данными, аутентификации и многими другими возможностями.

Мы исследуем, как Supabase дополняет PostgreSQL, упрощая развертывание функций и их откат. Вы можете обратиться к документации PostgreSQL, чтобы узнать больше о PostgreSQL.

<h2 class="wp-block-heading" id="отслеживание-истории-функций-в-postgre-sql">Отслеживание истории функций в PostgreSQL</h2>

При управлении базой данных PostgreSQL важно отслеживать изменения, внесенные в функции со временем. Эта история позволяет вам просматривать, аудитить и возвращаться к предыдущим версиям при необходимости.

Для облегчения этого, мы создадим таблицу archive.function_history, в которой будут храниться важные сведения о каждой функции, включая ее имя, аргументы, возвращаемый тип, исходный код и настройки языка.

Вот SQL-код для создания этой таблицы:

```sql
CREATE SCHEMA archive;

CREATE TABLE archive.function_history (
  schema_name text,
  function_name text,
  args text,
  return_type text,
  source_code text,
  lang_settings text,
  updated_at timestamp default now()
);

```

<h2 class="wp-block-heading" id="сохранение-истории-функций">Сохранение истории функций</h2>

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="функция-archive-save-function-history">Функция archive.save_function_history</h3>

Для автоматизации записи изменений в функциях мы создадим функцию PostgreSQL с названием archive.save_function_history. Эта функция принимает параметры, такие как имя функции, аргументы, возвращаемый тип, исходный код, имя схемы и настройки языка.

Вот SQL-код для создания функции archive.save_function_history:

```sql
CREATE OR REPLACE
FUNCTION archive.save_function_history(
  function_name text,
  args text,
  return_type text,
  source_code text,
  schema_name text default 'public',
  lang_settings text default 'plpgsql'
) RETURNS void
SET search_path = public, archive
SECURITY DEFINER
AS
$
BEGIN
  INSERT INTO archive.function_history (
        schema_name,
        function_name,
        args,
        return_type,
        source_code,
        lang_settings)
  VALUES (schema_name, function_name, args, return_type, source_code, lang_settings);
END;
$
LANGUAGE plpgsql;
-- Protecting the function:
REVOKE EXECUTE ON FUNCTION
archive.save_function_history FROM public;

REVOKE EXECUTE ON FUNCTION
archive.save_function_history FROM anon, authenticated;


```

Эта функция позволяет нам легко сохранять снимок функции каждый раз, когда она изменяется.

<h2 class="wp-block-heading" id="развертывание-функций-из-исходного-кода">Развертывание функций из исходного кода</h2>

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="функция-create-function-from-source">Функция create_function_from_source</h3>

Управление функциями часто включает в себя их развертывание из исходного кода. PostgreSQL требует конкретного синтаксиса для создания функций, и Supabase упрощает это с помощью функции create_function_from_source.

```sql
CREATE OR REPLACE FUNCTION
create_function_from_source(
  function_text text,
  schema_name text default 'public'
) RETURNS text
SECURITY DEFINER
AS $
DECLARE
  function_name text;
  argument_types text;
  return_type text;
  function_source text;
  lang_settings text;
BEGIN
  -- Execute the function text to create the function
  EXECUTE function_text;

  -- Extract function name from function text
  SELECT (regexp_matches(function_text, 'create (or replace )?function (public\.)?(\w+)', 'i'))[3]
  INTO function_name;

  -- Get function details from the system catalog
  SELECT pg_get_function_result(p.oid),
                pg_get_function_arguments(p.oid), p.prosrc, l.lanname
  INTO return_type, argument_types, function_source, lang_settings
  FROM pg_proc p
  JOIN pg_namespace n ON n.oid = p.pronamespace
  JOIN pg_language l ON l.oid = p.prolang
  WHERE n.nspname = schema_name AND p.proname = function_name;

  -- Save function history
  PERFORM archive.save_function_history(function_name, argument_types, return_type, function_text, schema_name, lang_settings);

  RETURN 'Function created successfully.';
EXCEPTION
  WHEN others THEN
    RAISE EXCEPTION 'Error creating function: %', sqlerrm;
END;
$ LANGUAGE plpgsql;
-- Protecting the function:
REVOKE EXECUTE ON FUNCTION
create_function_from_source FROM public;

REVOKE EXECUTE ON FUNCTION
create_function_from_source FROM anon, authenticated;


```

Эта функция принимает исходный код SQL функции и имя схемы в качестве параметров, создавая функцию в базе данных. Это мощное средство для динамического создания функций.

Вот пример развертывания функции с использованием create_function_from_source:

```sql

SELECT create_function_from_source(
$
-- Note that you can just paste the function below:
CREATE OR REPLACE FUNCTION public.convert_to_uuid(input_value text)
 RETURNS uuid
AS $function$
DECLARE
  hash_hex text;
BEGIN
  -- Return null if input_value is null or an empty string
  IF input_value IS NULL OR NULLIF(input_value, '') IS NULL THEN
    RETURN NULL;
  END IF;
  hash_hex := substring(encode(digest(input_value::bytea, 'sha512'), 'hex'), 1, 36);
  RETURN (left(hash_hex, 8) || '-' || right(hash_hex, 4) || '-4' || right(hash_hex, 3) || '-a' || right(hash_hex, 3) || '-' || right(hash_hex, 12))::uuid;
END;
$function$
LANGUAGE plpgsql
IMMUTABLE
SECURITY DEFINER;
-- End of the function above
$
);


```

Откат функций так же важен, как и их разворачивание. Ошибки случаются, и возможность вернуться к предыдущей версии может сэкономить много времени и предотвратить повреждение данных.

В этом случае на помощь приходит функция rollback_function. Она извлекает самую последнюю версию функции из таблицы archive.function_history и выполняет ее. Если предыдущей версии нет, она обрабатывает ситуацию грациозно.

Вот SQL-код для создания и использования функции rollback_function:

```sql

CREATE OR REPLACE FUNCTION rollback_function(
  func_name text,
  schema_n text default 'public'
) RETURNS text
SECURITY DEFINER
AS $
DECLARE
  function_text text;
BEGIN
  -- Get the most recent function version from the function_history table
  SELECT source_code
  INTO function_text
  FROM archive.function_history
  WHERE function_name = func_name AND schema_name = schema_n
  ORDER BY updated_at DESC
  LIMIT 1;

  -- If no previous version is found, raise an error
  IF function_text IS NULL THEN
    RAISE EXCEPTION 'No previous version of function % found.', func_name;
  END IF;

  -- Add 'or replace' to the function text if it's not already there (case-insensitive search and replace)
  IF NOT function_text ~* 'or replace' THEN
    function_text := regexp_replace(function_text, 'create function', 'create or replace function', 'i');
  END IF;

  -- Execute the function text to create the function
  EXECUTE function_text;

  RETURN 'Function rolled back successfully.';
EXCEPTION
  WHEN others THEN
    RAISE EXCEPTION 'Error rolling back function: %', sqlerrm;
END;
$ LANGUAGE plpgsql;

-- Protecting the function:
REVOKE EXECUTE ON FUNCTION rollback_function FROM public;
REVOKE EXECUTE ON FUNCTION rollback_function FROM anon, authenticated;

-- Example of rolling back a function
SELECT rollback_function('convert_to_uuid');


```

<h2 class="wp-block-heading" id="настройка-существующих-функций-в-качестве-первой-версии">Настройка существующих функций в качестве первой версии</h2>

Если у вас уже есть база данных, но вы хотите начать версионирование с текущего момента, вы можете использовать следующую функцию для архивирования всех функций в схеме public.

```sql
CREATE OR REPLACE FUNCTION archive.setup_function_history(schema_name text default 'public')
RETURNS VOID AS
$$
DECLARE
  function_record record;
BEGIN
  -- Loop through existing functions in the specified schema
  FOR function_record IN (
    SELECT
      n.nspname AS schema_name,
      p.proname AS function_name,
      pg_catalog.pg_get_function_arguments(p.oid) AS args,
      pg_catalog.pg_get_function_result(p.oid) AS return_type,
      pg_catalog.pg_get_functiondef(p.oid) AS source_code,
      l.lanname AS lang_settings
    FROM pg_catalog.pg_proc p
    LEFT JOIN pg_catalog.pg_namespace n ON n.oid = p.pronamespace
    LEFT JOIN pg_catalog.pg_language l ON l.oid = p.prolang
    WHERE n.nspname = schema_name
  )
  LOOP
    -- Insert information about the function into the history table
    PERFORM archive.save_function_history(
      function_record.function_name,
      function_record.args,
      function_record.return_type,
      function_record.source_code,
      function_record.schema_name,
      function_record.lang_settings
    );
  END LOOP;
END;
$$
LANGUAGE plpgsql;

SELECT archive.setup_function_history();

```

<h2 class="wp-block-heading" id="в-заключение">В заключение</h2>

В заключение можно сказать, что эффективное управление функциями PostgreSQL критически важно для разработки веб-приложений. Supabase, с его интеграцией с PostgreSQL и рассмотренными нами инструментами, предлагает упрощенный подход к развертыванию и откату функций.

Основные выводы из этой статьи включают важность отслеживания истории функций, создание таблицы archive.function_history, функцию archive.save_function_history для записи изменений, а также удобство функций create_function_from_text и rollback_function для развертывания и отката.

Если вы нашли эту статью полезной, вас также может заинтересовать изучение связанных тем:

Мы призываем вас глубже изучить Supabase и PostgreSQL, чтобы раскрыть полный потенциал эффективного управления базой данных.

<h2 class="wp-block-heading" id="дополнительные-ресурсы">Дополнительные ресурсы</h2>

Для дополнительной информации и исследований предоставляются следующие дополнительные ресурсы:

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li><a href="https://supabase.com/docs">Документация Supabase</a></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><a href="https://www.postgresql.org/docs/">Документация PostgreSQL</a></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><a href="https://github.com/supabase/supabase">Репозиторий Supabase на GitHub</a></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><a href="https://www.postgresql.org/">Официальный сайт PostgreSQL</a></li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

Не стесняйтесь погрузиться в эти ресурсы для углубленного понимания этих мощных инструментов управления базой данных.
