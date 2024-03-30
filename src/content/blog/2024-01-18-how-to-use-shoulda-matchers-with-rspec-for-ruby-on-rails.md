---
title: Как использовать Shoulda Matchers с RSpec для Ruby on Rails
meta_title: >-
  Как использовать Shoulda Matchers с RSpec для Ruby on Rails | Игорь Горлов -
  Фронтeндер
description: >-
  При написании тестов в Rails следует избегать повторений и иметь необходимое
  количество тестов, чтобы удовлетворить ваш сценарий использования.


  Эта статья поз
date: 2024-01-18T00:00:00.000Z
categories:
  - Учебник
author: Игорь Горлов
type: blog
draft: false
slug: kak-yspolzovat-shoulda-matchers-s-rspec-dlia-ruby-on-rails
tags:
  - Ruby
  - Rails
image: >-
  ../../assets/images/kak-yspolzovat-shoulda-matchers-s-rspec-dlia-ruby-on-rails-Jan-18-2024.avif
lastmod: 2024-03-20T21:26:48.420Z
---

При написании тестов в Rails следует избегать повторений и иметь необходимое количество тестов, чтобы удовлетворить ваш сценарий использования.

Эта статья познакомит вас с shoulda-матчерами с RSpec для тестирования функциональности в Rails. В конце статьи вы должны чувствовать себя уверенно при использовании shoulda-матчеров в вашем Rails-приложении.

Давайте приступим!

## Начало работы

Клонируйте репозиторий этого стартового Rails-приложения.

В ветке `starter-code` установлены и настроены следующие гемы:

Shoulda Matchers для Ruby on Rails

Согласно документации shoulda-matchers:

Shoulda Matchers предоставляет RSpec- и Minitest-совместимые однострочники для тестирования общей функциональности Rails, которая, если бы была написана вручную, была бы намного длиннее, сложнее и подвержена ошибкам.

Давайте посмотрим, как будут выглядеть `shoulda-matchers`, прежде чем устанавливать и использовать их. В нашем репозитории есть модели `Author` и `Book`. Мы добавим проверку имени в модель `Author` без `shoulda-matchers`.

```ruby
RSpec.describe Author, type: :model do
  describe "validations" do
    it "is invalid with invalid attributes" do
      expect(build(:author, name: '')).to_not be_valid
    end
  end
end
```

В приведенном выше примере мы создаем запись `author` без `name`, и ожидаем, что она будет недействительной. Если мы проверим наличие `name` в нашей модели `Author`, эта спецификация должна пройти.

Примечание: Хотя в этом посте мы рассмотрим shoulda-матчеры с помощью RSpec, вы можете использовать другие фреймворки, например Minitest.

## Установка shoulda-matchers Gem для Ruby on Rails

Добавьте гем shoulda-matchers в группу `test` в вашем Gemfile. Он должен выглядеть следующим образом:

`group :test do gem 'shoulda-matchers', '~> 5.0' end`.

Затем запустите `bundle install`, чтобы установить гем. Далее поместите приведенный ниже фрагмент кода в нижнюю часть файла `spec/rails_helper.rb`.

```ruby
Shoulda::Matchers.configure do |config|
  config.integrate do |with|
    with.test_framework :rspec
    with.library :rails
  end
end
```

Здесь мы указываем тестовый фреймворк и библиотеку, которые мы будем использовать.

Теперь мы погрузимся в спецификацию нашей активной модели.

## Спецификация активной модели в Rails

Ваша спецификация Active Model может полностью состоять из валидаций, подобных приведенной выше, которые за вас выполняет shoulda-matchers. Вы захотите проверить наличие или длину определенных атрибутов. Например, в примере приложения, приведенном выше, важно проверить наличие `name` для модели автора.

```ruby
describe "validations" do
  it { should validate_presence_of(:name) }
  it { should validate_length_of(:name).is_at_least(2) }
  it { should validate_length_of(:name).is_at_most(50) }
end
```

Здесь мы проверяем наличие и длину `name`. Вы можете видеть, что эти проверки являются однострочными по сравнению с первоначальной спецификацией, которую мы создали, когда мы не использовали shoulda-матчеры.  
Противоположностью `presence` является `absence`, поэтому мы можем подтвердить отсутствие атрибута следующим образом:

`it { should validate_absence_of(:name) }`.

Вот еще одна спецификация валидации:

`it { should validate_numericality_of(:publication_year).is_greater_than_or_equal_to(1800) }`.

В приведенном выше примере мы проверяем, является ли `publication_year` числовым значением и больше ли оно или равно `1800`. Мы можем модифицировать сравнение, чтобы оно выглядело следующим образом:

`it { should validate_comparison_of(:publication_year).greater_than(1800) }`.

Это предполагает, что мы собираемся использовать `validate_comparison_of`.

Вы также можете проверить наличие `validate_exclusion_of` (и его противоположность, `validate_inclusion_of`) следующим образом:

```ruby
it { should validate_exclusion_of(:username).in_array(['admin', 'superadmin']) }
it { should validate_inclusion_of(:country).in_array(['Nigeria', 'Ghana']) }
```

Допустим, вам нужно подтвердить `пароль`:

`it { should validate_confirmation_of(:password) }`.

При необходимости вы захотите подтвердить, что атрибут был принят. Это пригодится, например, при работе с `терминами_услуг`:

`it { should validate_acceptance_of(:terms_of_service) }`.

Далее мы обратимся к спецификации Active Record.

## Спецификация Active Record в Rails

В некоторых случаях вам потребуется проверить уникальность атрибута. С этой задачей справится однострочник:

`it { should validate_uniqueness_of(:title) }`.

Вы можете пойти еще дальше, используя область видимости:

`it { should validate_uniqueness_of(:title).scoped_to(:author_id) }`.

Это проверит, что у вас есть проверка уникальности для атрибута `title`, но с привязкой к `author_id`.

Мы также можем проверить связь между авторами и книгами. Допустим, у автора должно быть много книг.

`describe "association" do it { should have_many(:books)} end`.

Эта спецификация пройдет, если у нас есть отношения, указанные в модели автора. Затем, для модели книги, мы можем иметь спецификацию `belongs_to`:

`it { should belong_to(:author) }`.

Существуют также однострочные спецификации для других ассоциаций, которые вы можете захотеть протестировать:

```ruby
it { should have_one(:delivery_address) }
it { should have_one_attached(:avatar) }
it { should have_many_attached(:pictures) }
it { should have_and_belong_to_many(:publishers) }
it { should have_rich_text(:description) }
```

Если выВы можете проверить, есть ли в вашей базе данных определенные столбцы:

`it { should have_db_column(:title) }`.

Можно пойти дальше и проверить тип столбца:

`it { should have_db_column(:title).of_type(:string) }`.

Также есть возможность проверить наличие индекса:

`it { should have_db_index(:name) }`.

Даже если у вас составной индекс:

`it { should have_db_index([:author_id, :title]) }`.

Вы можете использовать `implicit_order_column` в Rails v6+, чтобы определить пользовательский столбец для неявного упорядочивания:

`self.implicit_order_column = "updated_at"`.

Здесь мы указываем, что хотим, чтобы столбец `updated_at` управлял упорядочиванием. Таким образом, когда мы запустим `Book.first`, Rails будет использовать колонку `updated_at` вместо `id`. По умолчанию Rails использует `id` для упорядочивания записей.

В `shoulda-matchers` есть однострочный тест для этого:

`it { should have_implicit_order_column(:updated_at) }`.

Если у нас есть перечисление для нашей модели (например, `enum status: [:published, :unpublished]`), мы можем написать этот тест:

`it { should define_enum_for(:status) }`.

Мы можем указать значения теста:

`it { should define_enum_for(:status).with_values([:published, :unpublished]) }`.

Если у вас есть атрибут, доступный только для чтения, вы также можете проверить его:

`it { should have_readonly_attribute(:genre) }`

И вы можете проверить на `accepts_nested_attributes_for`:

```ruby
it { should accept_nested_attributes_for(:publishers) }
it { should accept_nested_attributes_for(:publishers).allow_destroy(true) }
it { should accept_nested_attributes_for(:publishers).update_only(true) }
```

Приведенные выше тесты зависят от сценария использования, определенного в вашей модели. Если вы не знаете, как работает `accept_nested_attributes_for`, вы можете обратиться к документации Rails API.

Также есть варианты проверки сериализации записей при использовании макроса `serialize:

`it { should serialize(:books) } it { should serialize(:books).as(BooksSerializer) }`.

Здесь мы проверяем, что `books` сериализуется. Мы указываем точный сериализатор, который мы ожидаем использовать с `as`.

Наконец, давайте обратимся к спецификации контроллера действий.

## Спецификация контроллера действий в Rails

Переходя к параметрам, давайте используем `config.filter_parameters` для фильтрации параметров, которые мы не хотим показывать в наших логах:

`RSpec.describe ApplicationController, type: :controller do it { should filter_param(:password) } end`.

Из вышесказанного видно, что эта спецификация предназначена для `ApplicationController`. Для параметров, которые будут использоваться в других контроллерах при создании записи (например, в `BooksController`), мы можем иметь спецификацию, которая выглядит следующим образом:

```ruby
RSpec.describe BooksController, type: :controller do
  it do
    params = {
      book: {
        title: 'Tipping Point',
        description: 'Tipping Point',
        author: 1,
        publication_year: 2001
      }
    }
    should permit(:title, :description, :author, :publication_year)
      .for(:create, params: params)
      .on(:book)
  end
end
```

Это позволит проверить, что для действия `BooksController` разрешены нужные параметры. Хэш `params`, который мы создаем, соответствует части запроса к контроллеру. Тест проверяет, что `title`, `description`, `author` и `publication_year` являются разрешенными параметрами для `book`.

А что если действию для работы нужен параметр запроса?

```ruby
RSpec.describe BooksController, type: :controller do
  before do
    create(:book, id: 1)
  end

  it do
    params = {
      id: 1,
      book: {
        title: 'Tipping Point',
        description: 'Tipping Point',
        author: 1,
        publication_year: 2001
      }
    }
    should permit(:title, :description, :author, :publication_year)
      .for(:update, params: params)
      .on(:book)
  end
end
```

В приведенном выше примере мы используем блок `before` для создания новой записи о книге с `id` равным 1. Затем мы включаем `id` в хэш params.

Если у вас есть действие контроллера, которое просто перенаправляет на другой путь, вы можете иметь спецификацию, которая выглядит следующим образом:

`describe 'GET #show' do before { get :show } it { should redirect_to(books_path) } end`.

Это проверяет, что мы будем перенаправлены на `books_path`, когда запрос дойдет до действия `show`.

Мы можем модифицировать приведенную выше спецификацию, чтобы также проверить ее ответ:

`describe 'GET #show' do before { get :show } it { should redirect_to(books_path) } it { should respond_with(301) } end`.

Мы изменили его, чтобы проверить код статуса. Если мы не уверены в точном коде статуса, но у нас есть диапазон чисел, мы можем использовать следующее:

`describe 'GET #show' do before { get :show } it { should redirect_to(books_path) } it { should respond_with(301..308) } end`.

Мы можем использовать матчер `rescue_from` для спасения от определенных ошибок, таких как `ActiveRecord::RecordInvalid`:

`it { should rescue_from(ActiveRecord::RecordInvalid).with(:handle_invalid) }`.

Это предполагает, что у нас есть (или будет) метод с именем `handle_invalid`, который будет обрабатывать ошибку.

Существуют матчеры для обратных вызовов, которые мы обычно используем в наших контроллерах:

```ruby
it { should use_before_action(:set_user) }
it { should_not use_before_action(:set_admin) }
it { should use_around_action(:wrap_in_transaction) }
it { should_not use_around_action(:wrap_in_transaction) }
it { should use_after_action(:send_admin_email) }
it { should_not use_after_action(:send_user_email) }
```

Вы можете проверить, была ли установлена `сессия` или нет.

`it { should set_session } it { should_not set_session }`.

Вы захотите использовать `should_not set_session` в вашем действии `destroy`.

Наконец, вот как вы можете написать спецификацию для своих маршрутов:

`it { should route(:get, '/books').to(action: :index) } it { should route(:get, '/books/1').to(action: :show, id: 1) }`.

И это все!

## Завершение

В этой статье мы увидели, как выглядит спецификация, в которой не используются shoulda-матчеры. Затем мы рассмотрели, как использовать shoulda-матчеры в вашем Rails-проекте. Это упрощает спецификации - вместо того, чтобы спецификация занимала несколько строк, shoulda-матчеры занимают всего одну строку.

Хотя использование shoulda-матчеров полезно, вы должны знать, что они не могут заменить все спецификации, которые вам придется написать (в основном это спецификации, связанные с бизнес-логикой).

Счастливого кодинга!

P.S. Если вы хотите читать посты Ruby Magic, как только они выходят из печати, подпишитесь на нашу рассылку Ruby Magic и не пропустите ни одного поста!
