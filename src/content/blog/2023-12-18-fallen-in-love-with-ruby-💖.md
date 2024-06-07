---
title: 'Влюбился в Руби '
meta_title: Влюбился в Руби | Игорь Горлов - Фронтeндер
description: "Привет всем рубистам \U0001F44B, В этой статье я расскажу о том, что заставило меня влюбиться в язык программирования Ruby. Я не эксперт, но просто делюсь своим мнение"
date: 2023-12-18T00:00:00.000Z
categories:
  - Учебник
author: Игорь Горлов
type: blog
draft: false
slug: vliubylsia-v-ruby
tags:
  - Ruby
  - Rails
image: ../../assets/images/vliubylsia-v-ruby-Dec-18-2023.avif
lastmod: 2024-03-20T21:26:45.046Z
---

Привет всем рубистам 👋, В этой статье я расскажу о том, что заставило меня влюбиться в язык программирования Ruby. Я не эксперт, но просто делюсь своим мнением.

Изначально я начал свою карьеру в веб-разработке как PHP-разработчик. 🐘 -> 💎

Как говорится в документации, Ruby - лучший друг программиста. Он предлагает большую читабельность и элегантный синтаксис, который легко читать и писать, не очень криптоватый, чтобы увидеть в действии.

Пример кода PHP 🐘:

```php
<?php
class Student {
    public $name;
    public $age;
    public $grade;

    function __construct($name, $age, $grade) {
        $this->name = $name;
        $this->age = $age;
        $this->grade = $grade;
    }

    function display() {
        echo "Name: " . $this->name . "\n";
        echo "Возраст: " . $this->age . "\n";
        echo "Класс: " . $this->grade . "\n";
    }
}

$student1 = new Student("John", 18, "A");
$student2 = new Student("Jane", 19, "B");

echo "Student 1:\n";
$student1->display();

echo "\nStudent 2:\n";
$student2->display();
?>
```

Код примера Ruby 💎:

```rb
class Student
  attr_accessor :name, :age, :grade

  def initialize(name, age, grade)
    @name = name
    @age = age
    @grade = grade
  end

  def display
    puts "Name: #{@name}"
    puts "Age: #{@age}"
    puts "Grade: #{@grade}"
  end
end

student1 = Student.new("John", 18, "A")
student2 = Student.new("Jane", 19, "B")

puts "Student 1:"
student1.display

puts "\nStudent 2:"
student2.display
```

Для меня версия на рубине выглядит круто и кажется более читабельной и понятной, а также содержит меньше строк кода. В Ruby есть не только удобство чтения, но и несколько способов решения задач. Если вы знаете другие интересные вещи в Ruby, сообщите мне об этом в разделе комментариев. Спасибо, что читаете 🤝.
