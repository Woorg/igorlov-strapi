---
title: 'Смешивание FFI, Fiddle и расширения на C в Ruby'
meta_title: 'Смешивание FFI, Fiddle и расширения на C в Ruby | Игорь Горлов - Фронтeндер'
description: >-
  Если вы работаете с Ruby и вам нужно вызвать функцию, написанную на языке C,
  есть несколько удобных гемов: RubyFFI и Fiddle.


  RubyFFI обладает множеством во
date: 2023-12-18T00:00:00.000Z
categories:
  - Учебник
author: Игорь Горлов
type: blog
draft: false
slug: smeshyvanye-ffi-fiddle-y-rasshyrenyia-na-c-v-ruby
tags:
  - Ruby
image: >-
  ../../assets/images/smeshyvanye-ffi-fiddle-y-rasshyrenyia-na-c-v-ruby-Dec-18-2023.avif
lastmod: 2024-03-20T21:26:43.887Z
---

Если вы работаете с Ruby и вам нужно вызвать функцию, написанную на языке C, есть несколько удобных гемов: Ruby-FFI и Fiddle.

Ruby-FFI обладает множеством возможностей, позволяющих решить большинство проблем, с которыми вы можете столкнуться. Fiddle может показаться немного менее удобным, но, будучи официальным гемом Ruby, он изначально доступен в большинстве окружений.

## Когда вы хотите использовать и FFI, и Fiddle, и расширение C

Могут возникнуть ситуации, когда вы захотите переписать некоторые части вашего гема, реализованные с помощью FFI или Fiddle, в расширения на C. Известно, что вызовы функций с помощью libffi почти в 100 раз медленнее, чем при использовании родных расширений C. Если необходимо выполнить большое количество вызовов с требованием к скорости, вам стоит переписать функцию, реализованную с помощью FFI, используя расширения на C.

## Основные принципы

Основная проблема здесь заключается в том, чтобы определить, как работать с указателем структуры FFI или Fiddle в качестве аргумента в функции расширения C. Решение простое: получить адрес памяти из объектов `Fiddle::Pointer` или `FFI::Pointer` Ruby.

Здесь вы узнаете, как написать функцию расширения на C, принимающую в качестве аргумента FFI::Pointer, обратившись к гемму rcairo.

## Проверка существования константы FFI::Pointer

Начнем с того, что убедимся, что константа `FFI::Pointer` определена. Этот шаг проверяет, что `require "ffi"` был выполнен и `Fiddle::Pointer` доступен.

`if (NIL_P (rb_cairo__cFFIPointer)) { rb_raise (rb_eNotImpError, "%s: FFI::Pointer is required", rb_id2name (rb_frame_this_func ())); }`.

Значение `rb_cairo__cFFIPointer` предварительно устанавливается в Init_cairo_private.

`void Init_cairo_private (void) { // -- пропуск кода -- if (rb_const_defined (rb_cObject, rb_intern ("FFI"))) { rb_cairo__cFFIPointer = rb_const_get (rb_const_get (rb_cObject, rb_intern ("FFI")), rb_intern ("Pointer")); } else { rb_cairo__cFFIPointer = Qnil; } }`

В случае с программой Fiddle выполните следующие действия:

`rb_const_get (rb_const_get (rb_cObject, rb_intern ("Fiddle")), rb_intern ("Pointer"));`.

## Обеспечение согласованности типов аргументов

После подтверждения константы мы убеждаемся в согласованности классов аргументов. Поскольку `FFI::Pointer` и `Fiddle::Pointer` получают адреса, используя относительно общие имена - `address` и `to_i` соответственно, проверка типов помогает избежать ошибок.

`if (!RTEST (rb_obj_is_kind_of (pointer, rb_cairo__cFFIPointer))) { rb_raise (rb_eArgError, "must be FFI::Pointer: %s", rb_cairo__inspect (pointer)); }`

## Получение адреса

В FFI вы можете получить адрес с помощью метода `address`.

`# Ruby-FFI pt = FFI::MemoryPointer.new(:int) pt.address`.

В Fiddle метод `to_i` помогает получить адрес.

`# Fiddle pt = Fiddle::Pointer.new(Fiddle::SIZEOF_INT) pt.to_i`

В расширениях C эти методы Ruby вызываются с помощью `rb_funcall`.

`rb_funcall (ffi_pointer, rb_intern ("address"), 0) rb_funcall (fiddle_pointer, rb_intern ("to_i"), 0)`.

Вызов функции C с использованием полученного адреса в качестве аргумента

Приведенный выше код Ruby выполняется внутри кода расширения C.

`VALUE rb_cr_address; rb_cr_address = rb_funcall (pointer, rb_intern ("address"), 0); cr = NUM2PTR (rb_cr_address); cr_check_status (cr);`

Здесь макрос `NUM2PTR` не предусмотрен в `ruby.h`, поэтому вам придется определить его самостоятельно:

`#if SIZEOF_LONG == SIZEOF_VOIDP # define PTR2NUM(x) (ULONG2NUM((unsigned long)(x))) # define NUM2PTR(x) ((void *)(NUM2ULONG(x))) #else # define PTR2NUM(x) (ULL2NUM((unsigned long)(x))) # define NUM2PTR(x) ((void *)(NUM2ULL(x))) #endif`

Функция `cr_check_status` вызывает родную функцию Cairo `cairo_status_to_string`. Безопасно вставлять такую функцию в середину.

## Создание объекта Ruby

Чтобы создать объект Ruby из полученного адреса, сделайте следующее:

`rb_cr = rb_obj_alloc (self); cairo_reference (cr); RTYPEDDATA_DATA (rb_cr) = cr; rb_ivar_set (rb_cr, cr_id_surface, Qnil);`

Используйте `rb_obj_alloc` для создания экземпляра класса (в данном случае self). `cairo_reference()` - это функция Cairo, которая увеличивает количество ссылок, что гарантирует, что сборка мусора не удалит ваш объект `ruby-FFI`. `RTYPEDDATA_DATA` используется для прямого доступа к данным объектов TypedData. Наконец, `rb_ivar_set` устанавливает переменную экземпляра.

## Базовый пример

Давайте рассмотрим базовый пример. Для этого `piyo.h` и `piyo.c` были подготовлены в качестве целей для создания привязок.

piyo.h

`#ifndef PIYO_H #define PIYO_H #include <stdio.h> typedef struct Piyo { int age; char *name; } Piyo; void displayPiyoInfo(const Piyo *piyo); #endif`

piyo.c

`#include "piyo.h" void displayPiyoInfo(const Piyo *piyo) { printf("Имя: %s\n", piyo->имя); printf("Возраст: %d\n", piyo->возраст); }`

Напишите расширение на языке C так, чтобы следующий код функционировал правильно:

`require 'fiddle/import' require_relative './piyo.so' module Piyo Piyo = Fiddle::Importer.struct(['int age', 'char* name']) end tori_name = 'piyoko' Piyo::Piyo.malloc(Fiddle::RUBY_FREE) do |piyo| piyo.age = 100 piyo.name = tori_name Piyo.display_info(piyo) end`.

## Расширение Ruby C

piyo_rb.c

`#include "ruby.h" #include "piyo.h"  #if SIZEOF_LONG == SIZEOF_VOIDP #define PTR2NUM(x) (ULONG2NUM((unsigned long)(x))) #define NUM2PTR(x) ((void *)(NUM2ULONG(x))) #else #define PTR2NUM(x) (ULL2NUM((unsigned long)(x)))) #define NUM2PTR(x) ((void *)(NUM2ULL(x))) #endif VALUE rb_cFiddlePointer; VALUE rb_display_info(VALUE self, VALUE piyo) { Piyo *ptr; VALUE rb_address = rb_funcall(piyo, rb_intern("to_i"), 0); ptr = NUM2PTR(rb_address);  displayPiyoInfo(ptr); return Qnil; } void Init_piyo(void) { VALUE mPiyo = rb_define_module("Piyo"); rb_define_singleton_method(mPiyo, "display_info", rb_display_info, 1); }`

Создайте Makefile с:

extconf.rb

`require 'mkmf' find_header('piyo.h', __dir__) create_makefile('piyo')`

Скомпилируйте с помощью:

`ruby extconf.rb make`.

Выполнить с помощью:

`ruby test.rb`

Если все работает правильно, вы должны увидеть результат в виде:

`Имя: piyoko Возраст: 100`.

Хотя это простой пример и не включает в себя все аспекты, такие как проверка определения класса и проверка типа аргумента, вам нужно будет добавить эти элементы, чтобы превратить его в практический драгоценный камень.

## На этом у нас все.

Эта статья была переведена с японского на английский язык совместными усилиями ChatGPT, DeepL и автора. Автор, несмотря на то, что он слабее всех троих владеет английским языком, сыграл решающую роль в предоставлении инструкций ChatGPT и DeepL. В японском языке “Piyo” означает щебечущий звук птенца и часто используется как метасинтаксическая переменная, следующая за “hoge” и “fuga”.
