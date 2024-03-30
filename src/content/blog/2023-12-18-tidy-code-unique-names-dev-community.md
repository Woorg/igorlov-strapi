---
title: Аккуратный код - уникальные имена
meta_title: Аккуратный код - уникальные имена | Игорь Горлов - Фронтeндер
description: Недавно я столкнулся с чемто примерно следующим в кодовой базе клиента.
date: 2023-12-18T00:00:00.000Z
categories:
  - Как закодить
author: Игорь Горлов
type: blog
draft: false
slug: akkuratn-i-kod-unykaln-e-ymena
tags:
  - Ruby
  - Rails
image: ../../assets/images/akkuratn-i-kod-unykaln-e-ymena-Dec-18-2023.avif
lastmod: 2024-03-20T21:26:48.657Z
---

Недавно я столкнулся с чем-то примерно следующим в
кодовой базе клиента.

```rb
# app/model/user.rb
class User < ActiveRecord::Base
  # ...more code

  before_validation :set_username

  # ...more code

  private

  def set_username
    return unless username.blank?

    i = 0
    begin
      if i < 10 && (email.present? || first_name.present?)
        prefix = [first_name, last_name].compact.join.presence || email.split('@')[0]
        self.username = prefix + (i.positive? ? i.to_s : '')
      else
        self.username = "user_#{SecureRandom.hex(3)}"
      end
      i += 1
    end while User.exists?(username: self.username)
  end
end
```

Это довольно стандартное требование к приложению - иметь некоторую именованную запись, которая может нуждаться в автоматически генерируемом имени, которое должно быть уникальным. Это довольно стандартный (если не сказать красивый) подход для Rails-приложения. Я и сам в прошлом использовал подобный подход.

В этот раз1 мне пришло в голову, что это может быть хорошей возможностью применить немного объектно-ориентированного дизайна и использовать объект Value. В качестве отправной точки я представлял себе нечто подобное:

```rb
# app/model/user/unique_name.rb
class User::UniqueName
  delegate :email, :first_name, :last_name, to: :@user

  def initialize(user)
    @user = user
  end

  def to_s
    username = nil
    i = 0
    begin
      if i < 10 && (email.present? || first_name.present?)
        prefix = [first_name, last_name].compact.join.presence || email.split('@')[0]
        username = prefix + (i.positive? ? i.to_s : '')
      else
        username = "user_#{SecureRandom.hex(3)}"
      end
      i += 1
    end while User.exists?(username: self.username)
    username
  end
end

# app/model/user.rb
class User < ActiveRecord::Base
  # ...more code

  before_validation :set_username

  # ...more code

  private
  def set_username
    return unless username.blank?
    self.username = UniqueName.new(self)
  end
end
```

Хотя `User::UniqueName` все еще не очень красив, у него уже есть несколько полезных свойств. Например, при любом тестировании, которое я провожу, будь то модульные тесты или эксперименты в REPL, он обладает очень желательным свойством - его можно тестировать на основе простых входных и выходных данных. Кроме того, это можно сделать в относительной изоляции от других свойств `User`, которые я хотел бы протестировать. Это не помешает мне тестировать и интеграцию с `User`, но таких тестов может быть немного.

`User::UniqueName.new(User.new).to_s # вот и все!`

Все основные действия инкапсулированы здесь. В качестве приятного эргономичного бонуса ActiveRecord позаботится о вызове `#to_s` для нас, поскольку он преобразует наш объект Value в строку.

Если это лучшее, что мы можем сделать, то это не так уж и плохо, но в нынешнем виде этот код можно почистить и сделать его более общим. Например, в другом проекте, над которым я работаю, есть много моделей, для которых требуется генерировать уникальные имена. Некоторые модели также должны быть уникальными в определенной области. В этом случае объект Value Object может иметь такую форму. Здесь мы также добавили логику, которая будет возвращать имя записи, если оно присутствует, устраняя необходимость в условии в нашем обратном вызове.

```rb
# app/models/unique_name.rb
class UniqueName
  def initialize(record, attribute: :name, scope: nil, root_name: nil)
    @record = record
    @attribute = attribute
    @root_name = root_name || "New #{model.model_name.human}"
    @scope = scope
  end

  def to_s
    name = имя_записи
    return name if name.present?
    unique_name
  end

  def record_name
    record.public_send(attribute)
  end

  def record_scope_value
    record.public_send(scope)
  end

  def unique_name
    n = auto_named_count
    n.zero? ? name : numbered_name(n)
  end

  def numbered_name(number)
    "#{default_name} (#{number})"
  end

  def auto_named_count
    query = model.where(attribute => root_name).or(model.where(attribute => "#{root_name} (%)"))
    return query.count unless scope
    query.or(model.where(scope => record_scope_value)).count
  end

  def model
    record.class
  end

  private

  attr_reader :record, :attribute, :root_name, :scope
end

# app/model/user.rb
class User < ActiveRecord::Base
  # ...more code

  before_validation { self.username = UniqueName.new(self) }

  # ...more code
end

# app/model/survey.rb
class Survey < ActiveRecord::Base
  # ...more code

  validates :name, uniqueness: { scope: :author }
  before_validation { self.name = UniqueName.new(self, scope: :author_id) }

  # ...more code
end

# app/model/saved_report.rb
class SavedReport < ActiveRecord::Base
  # ...more code

  validates :name, uniqueness: { scope: :author }
  before_validation { self.name = UniqueName.new(self, scope: :author_id) }

  # ...more code
end
```

Теперь у нас есть объект Value Object, достаточно общий, чтобы широко использоваться в большом проекте, и, возможно, уже на пути к тому, чтобы стать полезной библиотекой.

Первоначально опубликовано на delonnewman.name.

Давно отдавая предпочтение функциональному программированию, я изучаю взаимодополняемость объектно-ориентированного и функционального программирования (подробнее об этом позже).
