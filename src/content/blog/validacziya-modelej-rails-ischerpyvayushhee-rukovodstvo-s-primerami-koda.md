---
title: 'Валидация моделей Rails: Исчерпывающее руководство с примерами кода'
meta_title: >-
  Валидация моделей Rails: Исчерпывающее руководство с примерами кода - Igor
  Gorlov
description: >-
  Ruby on Rails предоставляет множество встроенных методов валидации, которые
  помогают гарантировать, что данные, хранящиеся в вашей базе данных,
  последовательны и соответствуют определенным критериям. Эти методы проверки
  могут быть заданы непосредственно в файлах модели, что упрощает их управление
  и поддержку.
date: 2023-02-25T17:51:17.000Z
author: Igor Gorlov
image: ../../assets/images/undefined-Feb-25-2023.avif
categories:
  - Учебник
tags:
  - Rails
  - Ruby
draft: false
lastmod: 2024-03-20T21:26:44.431Z
---

Ruby on Rails предоставляет множество встроенных методов валидации, которые помогают гарантировать, что данные, хранящиеся в вашей базе данных, последовательны и соответствуют определенным критериям. Эти методы проверки могут быть заданы непосредственно в файлах модели, что упрощает их управление и поддержку.

<!-- wp:rank-math/toc-block {"title":"Оглавление","headings":[{"key":"c2a8ecf7-1dbb-424b-bc55-c204e1c87ba2","content":"Валидация присутствия","level":2,"link":"#валидация-присутствия","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"dbd53ec6-c368-46a3-9a08-2ae48b464537","content":"Length Validation","level":2,"link":"#length-validation","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"625d516b-c828-4bf9-ba95-700e8775b11b","content":"Валидация формата","level":2,"link":"#валидация-формата","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"7ae51da4-c80f-4c7d-8a16-8c1417631604","content":"Проверка на уникальность","level":2,"link":"#проверка-на-уникальность","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"5a15368d-4d7e-4a86-8a6b-9793dd5fdf98","content":"Numericality Валидация","level":2,"link":"#numericality-валидация","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"d907b54d-0d28-4f4c-a39b-8e4dba9d2149","content":"Валидация проверки","level":2,"link":"#валидация-проверки","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"06117027-9ea2-4876-9e6d-7e49d8fad23f","content":"Валидация включения","level":2,"link":"#валидация-включения","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"c42c9901-6d9d-4674-bf5f-149e31d761b8","content":"Валидация исключения","level":2,"link":"#валидация-исключения","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"8fdcb832-71b1-46b8-a50d-24a59710f70d","content":"Валидация пользовательских сообщений","level":2,"link":"#валидация-пользовательских-сообщений","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"83525d35-be77-4c37-9be9-eae7203d752e","content":"Условная валидация","level":2,"link":"#условная-валидация","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"f2970082-942d-4b7d-a2a9-7290d1dd884b","content":"Множественные валидации","level":2,"link":"#множественные-валидации","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"a77ab71f-cc1a-4486-b103-2651ba09e0f6","content":"Пользовательская валидация","level":2,"link":"#пользовательская-валидация","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"6500df65-0484-4439-8e9e-aa856fdab444","content":"Валидация ассоциаций","level":2,"link":"#валидация-ассоциаций","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"ac0e6927-b02f-4f23-9c7f-5987f3c0a7ac","content":"Заключение","level":2,"link":"#заключение","disable":false,"isUpdated":false,"isGeneratedLink":true}],"listStyle":"ul"} -->
<div class="wp-block-rank-math-toc-block" id="rank-math-toc"><h2>Оглавление</h2><nav><ul><li class=""><a href="#валидация-присутствия">Валидация присутствия</a></li><li class=""><a href="#length-validation">Length Validation</a></li><li class=""><a href="#валидация-формата">Валидация формата</a></li><li class=""><a href="#проверка-на-уникальность">Проверка на уникальность</a></li><li class=""><a href="#numericality-валидация">Numericality Валидация</a></li><li class=""><a href="#валидация-проверки">Валидация проверки</a></li><li class=""><a href="#валидация-включения">Валидация включения</a></li><li class=""><a href="#валидация-исключения">Валидация исключения</a></li><li class=""><a href="#валидация-пользовательских-сообщений">Валидация пользовательских сообщений</a></li><li class=""><a href="#условная-валидация">Условная валидация</a></li><li class=""><a href="#множественные-валидации">Множественные валидации</a></li><li class=""><a href="#пользовательская-валидация">Пользовательская валидация</a></li><li class=""><a href="#валидация-ассоциаций">Валидация ассоциаций</a></li><li class=""><a href="#заключение">Заключение</a></li></ul></nav></div>
<!-- /wp:rank-math/toc-block -->

Вот некоторые из наиболее распространенных методов валидации, доступных в Rails:

<h2 class="wp-block-heading" id="валидация-присутствия">Валидация присутствия</h2>

Самый простой тип валидации — это валидация присутствия, которая гарантирует, что определенное поле не пусто. Например, если вы хотите убедиться, что поле name модели User всегда присутствует, вы напишете следующий код:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="ruby" class="language-ruby">class User &lt; ApplicationRecord
  validates :name, presence: true
end
</code></pre>
<!-- /wp:code -->

<h2 class="wp-block-heading" id="length-validation">Length Validation</h2>

Другим распространенным типом валидации является валидация длины, которая ограничивает длину строкового поля. Например, если вы хотите убедиться, что поле пароля в модели User имеет длину не менее 8 символов, вы напишете следующий код:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="ruby" class="language-ruby">class User &lt; ApplicationRecord
  validates :password, length: { minimum: 8 }
end
</code></pre>
<!-- /wp:code -->

Вы также можете указать максимальную длину поля или как минимальную, так и максимальную длину:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="ruby" class="language-ruby">class User &lt; ApplicationRecord
  validates :password, length: { minimum: 8, maximum: 20 }
end
</code></pre>
<!-- /wp:code -->

<h2 class="wp-block-heading" id="валидация-формата">Валидация формата</h2>

Проверка формата используется для того, чтобы убедиться, что поле соответствует определенному шаблону, например, определенному формату электронной почты или формату почтового индекса. Например, если вы хотите убедиться, что поле email в модели User имеет правильный формат, вы напишите следующий код:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="ruby" class="language-ruby">class User &lt; ApplicationRecord
  validates :email, format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i, on: :create }
end
</code></pre>
<!-- /wp:code -->

<h2 class="wp-block-heading" id="проверка-на-уникальность">Проверка на уникальность</h2>

Проверка уникальности гарантирует, что определенное поле уникально для всех записей в базе данных. Например, если вы хотите убедиться, что поле email в модели User уникально, вы напишете следующий код:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="ruby" class="language-ruby">class User &lt; ApplicationRecord
  validates :email, uniqueness: true
end
</code></pre>
<!-- /wp:code -->

<h2 class="wp-block-heading" id="numericality-валидация">Numericality Валидация</h2>

Проверка на числовой характер гарантирует, что определенное поле является числом. Вы также можете задать дополнительные ограничения, например, убедиться, что число больше или равно определенному значению, или что оно является целым числом. Например, если вы хотите убедиться, что поле возраст модели User является числом, большим или равным 18, вы можете написать следующий код:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="ruby" class="language-ruby">class User &lt; ApplicationRecord
  validates :age, numericality: { greater_than_or_equal_to: 18 }
end
</code></pre>
<!-- /wp:code -->

<h2 class="wp-block-heading" id="валидация-проверки">Валидация проверки</h2>

Валидация подтверждения гарантирует, что поле подтверждается вторым полем. Например, если вы хотите убедиться, что пользователь подтвердил свой пароль, введя его дважды, вы должны написать следующий код:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="ruby" class="language-ruby">class User &lt; ApplicationRecord
  validates :password, confirmation: true
end
</code></pre>
<!-- /wp:code -->

В представлении у вас будет два поля, одно для пароля и одно для подтверждения, а поле подтверждения будет названо password_confirmation.

<h2 class="wp-block-heading" id="валидация-включения">Валидация включения</h2>

Валидация включения используется для того, чтобы убедиться, что поле включено в определенный набор значений. Например, если вы хотите убедиться, что модель User имеет поле role, которое является либо admin, либо moderator, либо member, вы напишите следующий код:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="ruby" class="language-ruby">class User &lt; ApplicationRecord
  validates :role, inclusion: { in: %w(admin moderator member) }
end
</code></pre>
<!-- /wp:code -->

<h2 class="wp-block-heading" id="валидация-исключения">Валидация исключения</h2>

Проверка на исключение используется для того, чтобы убедиться, что поле не входит в определенный набор значений. Например, если вы хотите убедиться, что модель User не имеет поля роли admin или root, вы должны написать следующий код:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="ruby" class="language-ruby">class User &lt; ApplicationRecord
  validates :role, exclusion: { in: %w(admin root) }
end
</code></pre>
<!-- /wp:code -->

<h2 class="wp-block-heading" id="валидация-пользовательских-сообщений">Валидация пользовательских сообщений</h2>

Вы также можете задать пользовательские сообщения об ошибках для каждой валидации. Например, если вы хотите отобразить пользовательское сообщение об ошибке, когда электронная почта модели User не имеет правильного формата, вы можете написать следующий код:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="ruby" class="language-ruby">class User &lt; ApplicationRecord
  validates :email, format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i, 
    message: "is not a valid email address" }
end
</code></pre>
<!-- /wp:code -->

<h2 class="wp-block-heading" id="условная-валидация">Условная валидация</h2>

Условная проверка позволяет указать, что проверка должна происходить только при выполнении определенного условия. Условие можно указать с помощью опции if. Например, если вы хотите убедиться, что пароль модели User имеет длину не менее 8 символов, только если поле password не равно nil, вы можете написать следующий код:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="ruby" class="language-ruby">class User &lt; ApplicationRecord
  validates :password, length: { minimum: 8 }, if: :password_not_nil

  private
    def password_not_nil
      password.present?
    end
end
</code></pre>
<!-- /wp:code -->

<h2 class="wp-block-heading" id="множественные-валидации">Множественные валидации</h2>

Вы можете использовать несколько валидаций для одного поля, объединяя их в цепочку. Например, если вы хотите убедиться, что email модели User присутствует, имеет правильный формат и является уникальным, вы можете написать следующий код:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="ruby" class="language-ruby">class User &lt; ApplicationRecord
  validates :email, presence: true, format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i }, uniqueness: true
end
</code></pre>
<!-- /wp:code -->

<h2 class="wp-block-heading" id="пользовательская-валидация">Пользовательская валидация</h2>

Помимо встроенных методов валидации, Rails также позволяет создавать пользовательские валидации. Например, если вы хотите убедиться, что модель User содержит уникальную комбинацию имени и фамилии, вы можете написать собственный метод проверки:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="ruby" class="language-ruby">class User &lt; ApplicationRecord
  validate :unique_name

  def unique_name
    if User.exists?(first_name: first_name, last_name: last_name)
      errors.add(:first_name, "and last name have already been taken")
    end
  end
end
</code></pre>
<!-- /wp:code -->

или если вы хотите, чтобы имя модели User всегда писалось с заглавной буквы, вы можете написать следующий код:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="ruby" class="language-ruby">class User &lt; ApplicationRecord
  validate :name_must_be_capitalized

  private
    def name_must_be_capitalized
      errors.add(:name, "must be capitalized") unless name.nil? || name == name.capitalize
    end
end
</code></pre>
<!-- /wp:code -->

<h2 class="wp-block-heading" id="валидация-ассоциаций">Валидация ассоциаций</h2>

Помимо проверки отдельных моделей, вы также можете проверять ассоциации между моделями. Проверка ассоциаций позволяет задать проверку для модели, которая зависит от состояния других моделей.

Например, если модель User имеет множество сообщений, вы можете проверить, что пользователь должен иметь хотя бы одно сообщение, прежде чем оно будет сохранено в базе данных. Для этого нужно написать следующий код:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="ruby" class="language-ruby">class User &lt; ApplicationRecord
  has_many :posts
  validates_associated :posts
end

class Post &lt; ApplicationRecord
  belongs_to :user
  validates :title, presence: true
end
</code></pre>
<!-- /wp:code -->

В этом примере пользователь не будет сохранен в базе данных, если у него нет хотя бы одного связанного с ним поста с названием.

<h2 class="wp-block-heading" id="заключение">Заключение</h2>

В заключение следует отметить, что валидации являются важной частью любого Rails-приложения. Используя валидации, вы можете гарантировать, что ваши данные всегда точны, последовательны и соответствуют заданным вами критериям.

Независимо от того, проверяете ли вы отдельные модели или ассоциации между моделями, Rails позволяет легко определять и применять правила проверки. Используя возможности валидации Rails, вы можете сделать свое приложение более надежным и прочным, гарантируя, что данные, вводимые вашими пользователями, всегда точны и последовательны.

Для получения дополнительной информации и полного руководства по валидации в Rails посетите официальную документацию Ruby on Rails по адресу https://guides.rubyonrails.org/active_record_validations.html.
