---
title: >-
  Стратегии миграции данных в Ruby on Rails: Правильный способ управления
  недостающими данными
meta_title: >-
  Стратегии миграции данных в Ruby on Rails: Правильный способ управления
  недостающими данными | Игорь Горлов - Фронтeндер
description: >-
  Обзор


  В этой статье мы рассмотрим возможные стратегии миграции, генерации и
  заполнения данных в Railsприложении. Мы будем реализовывать их, улучшать,
  рассмат
date: 2023-12-18T00:00:00.000Z
categories:
  - Учебник
author: Игорь Горлов
type: blog
draft: false
slug: >-
  stratehyy-myhratsyy-dann-kh-v-ruby-on-rails-pravyln-i-sposob-upravlenyia-nedostaiuschymy-dann-my
tags:
  - Rails
  - Ruby
  - Паттерны
image: >-
  ../../assets/images/stratehyy-myhratsyy-dann-kh-v-ruby-on-rails-pravyln-i-sposob-upravlenyia-nedostaiuschymy-dann-my-Dec-18-2023.avif
lastmod: 2024-03-20T21:26:47.633Z
---

Обзор

В этой статье мы рассмотрим возможные стратегии миграции, генерации и заполнения данных в Rails-приложении. Мы будем реализовывать их, улучшать, рассматривать их плюсы и минусы, а также обсуждать, какие из них лучше использовать в различных сценариях. К концу статьи у нас будет полное представление о различных способах решения проблем миграции данных.

## Введение

Говоря простым языком, миграция данных - это процесс добавления, обновления или переноса некоторых данных внутри вашего приложения. Наиболее распространенными случаями миграции данных являются следующие:

Заполнение столбцов данных Перемещение данных столбцов из одной таблицы в другую Генерация новых записей базы данных Обновление поврежденных или недействительных данных правильными значениями Удаление неиспользуемых данных

Мы рассмотрим 3 различных способа сделать это:

## Прямое манипулирование данными Rake Task Data Migration Gem

### Прямое манипулирование данными

Первый вариант - самый простой: мы просто добавим недостающие данные через `rails c` или через прямое подключение к базе данных в продакшене.

Преимущества:

Легко Не нужно внедрять ничего нового Быстро, потому что миграция данных может быть выполнена за несколько минут.

Проблемы:

Слишком рискованно; изменения могут оказаться не такими, как предполагалось Возможны проблемы с доступом и безопасностью Отсутствуют тесты и обзоры кода, поэтому мы не можем быть уверены в качестве Отсутствие контроля; вы не знаете, кто и почему выполнил миграцию.

### Задача Rake

Второй вариант - это задача rake. В этой главе мы постараемся понять, как правильно добавлять задачи rake, убедиться, что они работают корректно, узнать их плюсы и минусы, а также изучить, как их можно использовать для миграции данных. Мы начнем с добавления простейшей rake-задачи, а затем перейдем к улучшению ее структуры, покрытию логики тестами и рассмотрим лучшие практики написания миграции данных с помощью rake-задач.

Представим, что у нас есть модель Animal со следующими полями:

`id` `kind` `status` `created_at` `updated_at`

И нам нужно изменить значение статуса с `nil` на `reserved` для всех животных, которые мы создали до сегодняшнего дня. Как мы можем это сделать? Начнем с добавления простого шаблона задачи rake.

`# frozen_string_literal: true # lib/tasks/animals/backfill_statuses.rake namespace :animals do desc "Update animal status to 'reserved' for animals created before today" task backfill_statuses: [:environment] do puts 'Обновление статуса животного...' end end`

И проверьте, что все работает:

`rake animals:backfill_statuses # => Обновление статуса животного...`.

Задание выполнено и работает, как и ожидалось. Теперь добавим фактический код с обновлением базы данных. Он будет выглядеть следующим образом:

`# frozen_string_literal: true # lib/tasks/animals/backfill_statuses.rake namespace :animals do desc "Update animal status to 'reserved' for animals created before today" task backfill_statuses: [:environment] do Animal.where(status: nil).where('created_at < ?', Time.zone.today).update_all(status: 'reserved') end end`

Теперь давайте проверим, работает ли это:

`rake animals:backfill_statuses`

Задача rake выполнена, и значения базы данных обновлены соответствующим образом. Вот и все. Наш основной сценарий работает, как и ожидалось, но все еще есть место для улучшений. Давайте посмотрим, что можно сделать, чтобы повысить надежность нашей задачи.

## Улучшения

Есть 5 областей, которые мы можем потенциально улучшить:

Отображение результатов в консоли для наглядности Обеспечение согласованности данных с транзакциями Оптимизация запросов к БД Изолировать код задачи rake Добавить тесты

## Отображение результатов в консоли для наглядности

Как вы могли заметить, задача rake выше не показала никаких результатов. Это может стать настоящей проблемой, потому что вы не знаете, успешно ли она была запущена, и потратите много времени, пытаясь проверить ее самостоятельно на производственных данных. Давайте устраним эту проблему:

`# frozen_string_literal: true # lib/tasks/animals/backfill_statuses.rake namespace :animals do desc "Update animal status to 'reserved' for animals created before today" task backfill_statuses: [:environment] do puts "Перед запуском задачи rake, в состоянии "зарезервировано" находилось #{Animal.where(status: 'reserved').count} животных."  Animal.where(status: nil).where('created_at < ?', Time.zone.today).update_all(status: 'reserved') puts "После выполнения задачи граблей в состоянии "reserved" теперь находится #{Animal.where(status: 'reserved').count} животных." end end`

## Теперь запустим задачу rake:

`rake animals:backfill_statuses # => До выполнения задачи rake в состоянии ”зарезервировано" было 0 животных. # => После выполнения задачи граблей в состоянии "зарезервировано" теперь 101 животное.

С обновленным кодом мы отображаем количество животных в состоянии ”зарезервировано" как до, так и после выполнения задачи rake, обеспечивая лучшую наглядностьи обеспечить успешное выполнение задания.

## Обеспечение согласованности данных с транзакциями

Что произойдет, если в процессе миграции данных возникнут непредвиденные ошибки? Сейчас мы не справляемся с этим. Даже если для приведенного нами примера это не критично, в общем случае не стоит забывать о том, что подобные манипуляции с данными нужно обернуть в транзакцию, чтобы сохранить целостность состояния данных.

`# frozen_string_literal: true # lib/tasks/animals/backfill_statuses.rake namespace :animals do desc "Update animal status to 'reserved' for animals created before today" task backfill_statuses: [:environment] do ActiveRecord::Base.transaction do Animal.where(status: nil).where('created_at < ?', Time.zone.today).update_all(status: 'reserved') end end`

Добавив блок `ActiveRecord::Base.transaction`, мы гарантируем, что все обновления будут выполняться как одна атомарная операция. Если во время миграции данных произойдет какая-либо ошибка, транзакция будет откачена, а данные останутся неизменными, что обеспечит их согласованность и целостность.

## Оптимизация запросов к БД

Мы уже решали эту проблему в нашей задаче rake, но важно отметить, что по возможности следует использовать оптимальное решение для базы данных. Например, кто-то может написать нашу задачу следующим образом:

`# frozen_string_literal: true # lib/tasks/animals/backfill_statuses.rake namespace :animals do desc "Update animal status to 'reserved' for animals created before today" task backfill_statuses: [:environment] do Animal.where(status: nil).where('created_at < ?', Time.zone.today).each do |animal| animal.update(status: 'reserved') end end end`

Следующий код будет вызывать SQL-запрос на обновление для каждого животного из списка, что делает его неоптимальным:

```
D, [2023-07-21T09:50:58.346040 #67787] DEBUG -- : Загрузка животных (1.6ms) SELECT `animals`.* FROM `animals` WHERE `animals`.`status` IS NULL AND (created_at < '2023-07-21')
D, [2023-07-21T09:50:58.346735 #67787] DEBUG -- : ↳ lib/tasks/animals/backfill_statuses.rake:10:in `block (2 levels) in <main>'
D, [2023-07-21T09:50:58.371908 #67787] DEBUG -- : TRANSACTION (2.2ms) BEGIN
D, [2023-07-21T09:50:58.372737 #67787] DEBUG -- : ↳ lib/tasks/animals/backfill_statuses.rake:11:in `block (3 levels) in <main>'
D, [2023-07-21T09:50:58.375091 #67787] DEBUG -- : Обновление животных (2.2 мс) UPDATE `animals` SET `animals`.`status` = 'reserved', `animals`.`updated_at` = '2023-07-21 07:50:58.368697' WHERE `animals`.`id` = 1
D, [2023-07-21T09:50:58.375713 #67787] DEBUG -- : ↳ lib/tasks/animals/backfill_statuses.rake:11:in `block (3 levels) in <main>'
D, [2023-07-21T09:50:58.381169 #67787] DEBUG -- : TRANSACTION (5.0ms) COMMIT
D, [2023-07-21T09:50:58.381524 #67787] DEBUG -- : ↳ lib/tasks/animals/backfill_statuses.rake:11:in `block (3 levels) in <main>'
D, [2023-07-21T09:50:58.383624 #67787] DEBUG -- : TRANSACTION (1.3ms) BEGIN
D, [2023-07-21T09:50:58.384250 #67787] DEBUG -- : ↳ lib/tasks/animals/backfill_statuses.rake:11:in `block (3 levels) in <main>'
D, [2023-07-21T09:50:58.385792 #67787] DEBUG -- : Обновление животных (1.4 мс) UPDATE `animals` SET `animals`.`status` = 'reserved', `animals`.`updated_at` = '2023-07-21 07:50:58.381901' WHERE `animals`.`id` = 2
...
```

Поэтому всегда имеет смысл попытаться найти способ сделать это в одной операции DB, как мы сделали в следующем коде:

`# frozen_string_literal: true # lib/tasks/animals/backfill_statuses.rake namespace :animals do desc "Update animal status to 'reserved' for animals created before today" task backfill_statuses: [:environment] do Animal.where(status: nil).where('created_at < ?', Time.zone.today).update_all(status: 'reserved') end end`

Этот код вызовет только один запрос DB:

`Animal Update All (6.8ms) UPDATE `animals`SET`animals`.`status`= 'reserved' WHERE`animals`.`status` IS NULL AND (created_at < '2023-07-21')`

Если нет возможности обновить что-то одним запросом к БД, то, по крайней мере, стоит подумать об использовании пакетов как о хорошей практике:

`# frozen_string_literal: true # lib/tasks/animals/backfill_statuses.rake namespace :animals do desc "Update animal status to 'reserved' for animals created before today" task backfill_statuses: [:environment] do Animal.where(status: nil).where('created_at < ?', Time.zone.today).find_each do |animal| animal.update(status: 'reserved') end end end`

P.S. Чтобы увидеть журналы SQL из задачи rake, вы можете добавить следующий код внутрь:

`# frozen_string_literal: true # lib/tasks/animals/backfill_statuses.rake namespace :animals do desc "Update animal status to 'reserved' for animals created before today" task backfill_statuses: [:environment] do ActiveRecord::Base.logger = Logger.new(STDOUT) # ... end end`

## Isoпоздно код задачи граблей

Одна из не очень очевидных проблем, которая может возникнуть, когда у вас много задач на граблях, - это отсутствие инкапсуляции. Давайте посмотрим на следующие две rake-задачи и попробуем догадаться, что здесь может быть не так:

`# frozen_string_literal: true # lib/tasks/animals/task1.rake namespace :animals do task task1: [:environment] do puts message end def message 'Hello world from Task 1!' end end`.

`# frozen_string_literal: true # lib/tasks/animals/task2.rake namespace :animals do task task2: [:environment] do puts message end def message 'Hello world from Task 2!' end end`

Теперь запустим их оба:

`rake animals:task1 # => Hello world from Task 2! rake animals:task2 # => Hello world from Task 2!`

Вы заметили? Это не то, что мы ожидали! Вторая задача rake отменила значение метода из первой! А это довольно опасно и неожиданно, если бы вы использовали что-то подобное:

`# frozen_string_literal: true # lib/tasks/animals/task1.rake namespace :animals do task task1: [:environment] do query.destroy_all end def query Animal.where(status: nil) end end`.

`lib/tasks/animals/task2.rake`

`# frozen_string_literal: true # lib/tasks/animals/task2.rake namespace :animals do task task2: [:environment] do query.destroy_all end def query Animal.all end end`

И запустите:

`rake animals:task1`

Вы удалите все записи вместо желаемого подмножества!

## Как мы можем это исправить?

Нам нужно обернуть наши задачи rake в класс `Rake::DSL` следующим образом:

`# frozen_string_literal: true # lib/tasks/animals/task1.rake module Tasks module Animals class Task1 include Rake::DSL def initialize namespace :animals do task task task1: [:environment] do puts message end end end private def message 'Hello world from Task 1!' end end end end end end Tasks::Animals::Task1.new`

`# frozen_string_literal: true # lib/tasks/animals/task2.rake module Tasks module Animals class Task2 include Rake::DSL def initialize namespace :animals do task task task2: [:environment] do puts message end end end end private def message 'Hello world from Task 2!' end end end end end end Tasks::Animals::Task2.new`

И приступаем к выполнению:

`rake animals:task1 # => Hello world from Task 1! rake animals:task2 # => Hello world from Task 2!`

Теперь все работает, как и ожидалось. Давайте применим ту же изоляцию для нашей rake-задачи `backfill_statuses`.

`# frozen_string_literal: true # lib/tasks/animals/backfill_statuses.rake module Tasks module Animals class BackfillStatuses include Rake::DSL def initialize namespace :animals do desc "Обновить статус животного до 'reserved' для животных, созданных до сегодняшнего дня" task backfill_statuses: [:environment] do Animal.where(status: nil).where('created_at < ?', Time.zone.today).update_all(status: 'reserved') end end end end end end end end Задачи::Animals::BackfillStatuses.new`

Вот и все.

## Добавить тесты

Последнее, что мы сделаем для обеспечения качества, - добавим тесты. Давайте посмотрим, как можно протестировать задачи rake.

Прежде всего, нам нужно определить код для загрузки наших задач:

`# spec/support/tasks.rb # frozen_string_literal: true RSpec.configure do |_config| Rails.application.load_tasks end`.

И включите его в файл `spec/rails_helper.rb`:

`# spec/rails_helper.rb require 'support/tasks'`.

Затем добавим наш тест:

`# spec/tasks/animals/backfill_statuses_spec.rb # frozen_string_literal: true require 'rails_helper' RSpec.describe 'rake animals:backfill_statuses', type: :task do subject { Rake::Task['animals:backfill_statuses'].execute } let(:expected_output) do <<~TEXT До запуска задачи rake в состоянии 'reserved' находилось 1 животное. После выполнения задачи граблей в состоянии "зарезервировано" теперь находится 2 животных. TEXT end let(:animal_1) { create(:animal, created_at: 10.days.ago, status: nil) } let(:animal_2) { create(:animal, created_at: 10.days.ago, status: 'reserved') } let(:animal_3) { create(:animal, created_at: 10.days.ago, status: 'another_status') } let(:animal_4) { create(:animal, created_at: 10.days.from_now, status: nil) } before do animal_1 animal_2 animal_3 animal_4 end it "update animal status to 'reserved' for animals created before today" do expect { subject }.to change { animal_1.reload.status }.с(nil).to('reserved') .and output(expected_output).to_stdout expect(animal_2.reload.status).to eq('reserved') expect(animal_3.reload.status).to eq('another_status') expect(animal_4.reload.status).to be_nil end end`

Вот и все.

## Миграция данных Gem

Третий вариант - использовать гем data-migrate.

Давайте добавим этот гем в наш проект:

`# Gemfile gem 'data_migrate'`.

Выполнить:

`bundle install`

Теперь вы можете сгенерировать миграцию данных так же, как и миграцию схемы:

`rails g data_migration backfill_animal_statuses # => db/data/20230721111716_backfill_animal_statuses.rb`.

Давайте добавим немного кода в сгенерированный файл, чтобы проверить, действительно ли он работает:

`# frozen_string_literal: true class BackfillAnimalStatuses < ActiveRecord::Migration[7.0] def up puts 'Test Data Migration' end def down # ничего не делать end end`.

Чтобы запустить миграцию, нужно выполнить следующую команду:

`rake data:migrate # или rake db:migrate:with_data`.

И мы получим следующий результат:

`== 20230721111716 BackfillAnimalStatuses: migrating =========================== Test Data Migration == 20230721111716 BackfillAnimalStatuses: migrated (0.0000s) ==================`.

Этот переход может быть запущен только один раз. Поэтому давайте удалим его и сгенерируем другой и добавим в него настоящий код:

`rails g data_migration backfill_animal_statuses # => db/data/20230721112534_backfill_animal_statuses.rbb`.

Вот что мы получим после добавления кода бизнес-логики:

`# db/data/20230721112534_backfill_animal_statuses.rb # frozen_string_literal: true class BackfillAnimalStatuses < ActiveRecord::Migration[7.0] def up Animal.where(status: nil).where('created_at < ?', Time.zone.today).update_all(status: 'reserved') end def down # do nothing end end`.

И приступаем к работе:

`rake data:migrate`

Вот что мы получаем:

`== Данные ======================================================================= == 20230721112534 BackfillAnimalStatuses: migrating =========================== == 20230721112534 BackfillAnimalStatuses: migrated (0.0221s) ==================`.

В принципе, миграция данных работает по той же логике, что и миграция схемы, но вместо сохранения последней запущенной версии миграции в таблице `schema_migrations, миграция данных сохраняет эту версию в другой таблице, называемой `data_migrations`.

Важно отметить, что в большинстве случаев миграция данных должна быть необратимой, но мы не хотим вызывать явную ошибку, так как это помешает откату для изменений структуры схемы. Вместо этого мы просто оставляем метод `down` пустым. По этой причине было бы лучше спроектировать миграцию идемпотентным способом, чтобы иметь возможность запускать ее несколько раз, если это возможно.

Миграция данных не дает никаких дополнительных преимуществ, кроме тех, о которых мы говорили выше. Поэтому нам по-прежнему нужно думать о тех проблемах, которые мы решали для задачи rake, таких как отображение вывода, добавление транзакций, оптимизация запросов к БД и т. д.

## Сравнение задачи Rake и Data Migration Gem

Давайте сравним эти два решения и решим, какое из них следует использовать и при каких условиях:

### Когда задача rake подходит лучше?

Когда вы хотите иметь возможность выбрать точное время и день, когда вы хотите его выполнить. Когда вы хотите иметь возможность выбрать платформу, на которой вы хотите его запустить (например, staging или production). Когда вы хотите запустить одну и ту же задачу rake несколько раз.

### Когда лучше использовать гем миграции данных?

Когда вы хотите быть уверены, что данные будут добавлены автоматически и никто не забудет выполнить задание. Когда для вас важен порядок миграции схемы (например, миграция схемы добавляет новый столбец, а миграция данных заполняет этот столбец). Когда вы хотите запустить миграцию на всех средах без дополнительных усилий. Когда миграцию нужно запустить только один раз.

Итак, в целом задача rake гораздо более гибкая и тестируемая и может решать те же задачи, что и миграция данных, но может потребовать больше усилий. Миграции данных гораздо более строги, но обеспечивают некоторую автоматизацию и строгий порядок выполнения, связанный с изменениями схемы.

Например, гем миграции данных очень хорошо подходит, если вам нужно поддержать некоторую реструктуризацию схемы базы данных и вы не хотите упустить данные во время этих изменений. Например, если вам нужно переименовать столбец и скопировать значения из старого столбца в новый, затем установить ограничение `NULL=false` на новый столбец, а затем полностью удалить старый столбец, то гем миграции данных значительно упростит этот процесс по сравнению с использованием задачи rake.

С другой стороны, если задача не связана с изменением схемы базы данных, более подходящим вариантом может стать задача rake. Она предлагает большую гибкость и тестируемость, что упрощает управление задачами, не связанными напрямую с изменением схемы.

## Заключение

На протяжении всегоВ этой статье мы рассмотрели различные стратегии миграции, генерации и заполнения данных в Rails-приложении. Мы реализовали и улучшили эти стратегии, тщательно рассмотрев их преимущества и недостатки. Кроме того, мы сравнили два основных решения - задачу rake и гем миграции данных - и рассмотрели их пригодность в различных сценариях.
