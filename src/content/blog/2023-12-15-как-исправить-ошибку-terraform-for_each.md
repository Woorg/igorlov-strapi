---
title: Как исправить ошибку Terraform for_each
meta_title: Как исправить ошибку Terraform for_each | Игорь Горлов - Фронтeндер
description: >-
  # Что такое ошибка for_each?


  Атрибут for_each в Terraform позволяет создать набор похожих ресурсов на
  основе заданных вами критериев.


  Когда вам нужно созд
date: 2023-12-15T18:42:03.899Z
image: ../../assets/images/kak-yspravyt-oshybku-terraform-for_each-Dec-15-2023.avif
categories:
  - Учебник
author: Igor Gorlov
tags:
  - Terraform
draft: false
translated: ''
translatedPosition: ''
type: blog
slug: kak-yspravyt-oshybku-terraform-for_each
lastmod: 2024-03-20T21:26:44.860Z
---

# Что такое ошибка for_each?

”Атрибут for_each в Terraform позволяет создать набор похожих ресурсов на основе заданных вами критериев.”

”Когда вам нужно создать набор похожих экземпляров, каждый из которых назначен отдельной группе безопасности. Terraform не может разобрать aws*security_group.*.id в этом атрибуте, поскольку выражение splat (\_) интерполирует только типы списков, а атрибут for_each предназначен для типов map.

- Локальное значение может возвращать тип map.
- Определите локальное значение в файле main.tf. Это преобразует список групп безопасности в карту.

Пожалуйста, посетите мой **[GitHub-репозиторий статей по Terraform](https://github.com/awsmine/Terraform_projects)** по различным темам, которые постоянно обновляются.

Давайте начнем!

# [](https://dev.to/aws-builders/how-to-fix-a-terraform-foreach-error-46hg#objectives)Цели:

**1.** Войдите в AWS Management Console

**2.** Создайте инфраструктуру для блока ресурсов

**3.** В каталоге ресурсов **terraform_files** создайте 4 файла - **_`main.tf`_**, **_`variables.tf`_**, **_`outputs.tf`_** и **_`terrafprm.tfvars`_**.

**4.** Инициализация рабочего каталога

**5.** Исправьте ошибку for_each

**6.** Разверните ваши ресурсы

# [](https://dev.to/aws-builders/how-to-fix-a-terraform-foreach-error-46hg#prerequisites)Предварительные условия:

- Учетная запись пользователя AWS с правами администратора, но не root.
- Cloud9 IDE с AWS CLI.

# [](https://dev.to/aws-builders/how-to-fix-a-terraform-foreach-error-46hg#resources-used)Используемые ресурсы:

**[Документация Terraform](https://registry.terraform.io/providers/hashicorp/aws/latest/docs).**
**[Документация Terraform для AMI](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/data-sources/ami).**.
**[Troubleshoot Terraform - Correct a for_each error](https://developer.hashicorp.com/terraform/tutorials/configuration-language/troubleshooting-workflow)**.
**[learn-terraform-troubleshooting](https://github.com/hashicorp/learn-terraform-troubleshooting/tree/main)**.

# [](https://dev.to/aws-builders/how-to-fix-a-terraform-foreach-error-46hg#steps-for-implementation-to-this-project)Шаги для внедрения в этот проект:

## [](https://dev.to/aws-builders/how-to-fix-a-terraform-foreach-error-46hg#1-login-to-aws-management-console)1\. Войдите в консоль управления AWS

- Убедитесь, что вы находитесь в регионе N. Virginia (us-east-1).

## [](https://dev.to/aws-builders/how-to-fix-a-terraform-foreach-error-46hg#2-create-infrastructure-for-resources-block)2\. Создайте инфраструктуру для блока ресурсов

- Создадим следующую организационную структуру, как показано ниже.

[![Описание изображения](https://res.cloudinary.com/practicaldev/image/fetch/s--pQ6rhLGO--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/263mpsoydcfpwqfpol6h.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--pQ6rhLGO--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/263mpsoydcfpwqfpol6h.png)

## [](https://dev.to/aws-builders/how-to-fix-a-terraform-foreach-error-46hg#3-under-terraformfiles-resources-directory-create-4-files-raw-maintf-endraw-raw-variablestf-endraw-raw-outputstf-endraw-and-raw-terrafprmtfvars-endraw-)3\. В директории ресурсов **terraform_files** создадим 4 файла - **`main.tf`**, **`variables.tf`**, **`outputs.tf`** и **`terrafprm.tfvars`**.

- **1\. main.tf**
- замените vpc_id на свой собственный VPC

```js
терраформа {

  required_providers {
    aws = {
      источник = "hashicorp/aws"
      версия = "~> 4.23"
    }
  }

  required_version = ">= 0.14.9"
}

провайдер "aws" {
  регион = var.region
}

данные "aws_ami" "linux" {
   most_recent = true
   owners = ["amazon"]

  фильтр {
    name = "name"
    values = ["amzn2-ami-hvm-*-x86_64-gp2"]
  }

  фильтр {
    name = "тип виртуализации"
    значения = ["hvm"]
  }
}

ресурс "aws_instance" "web_app" {
  for_each = aws_security_group.*.id
  ami = data.aws_ami.linux.id
  availability_zone = var.az_1a
  instance_type = var.instance_type
  vpc_security_group_ids = [each.id]
  user_data = <<-EOF
              #!/bin/bash
              echo "Hello, World" > index.html
              nohup busybox httpd -f -p 8080 &
              EOF
  теги = {
    Name = "${var.name}-mywebapp"
  }
}
 ресурс "aws_security_group" "sg_ping" {
   name = "Allow Ping"
   vpc_id = "<DUMMY VALUE>"
}

ресурс "aws_security_group" "sg_8080" {
   имя = "Разрешить 8080"
   vpc_id = "<DUMMY VALUE>"
}

 ресурс "aws_security_group_rule" "sg_ping" {
   тип = "ingress"
   from_port = -1
   to_port = -1
   протокол = "icmp"
   security_group_id = aws_security_group.sg_ping.id
   source_security_group_id = aws_security_group.sg_8080.id
}

 ресурс "aws_security_group_rule" "sg_8080" {
   типe = "ingress"
   from_port = 8080
   to_port = 8080
   протокол = "tcp"
   security_group_id = aws_security_group.sg_8080.id
   source_security_group_id = aws_security_group.sg_ping.id
}
```

- **2\. переменные.tf**

```
переменная "регион" {
  описание = "регион"
}

переменная "name" {
  description = "Значение тега Name для экземпляра EC2"
}

переменная "az_1a" {
  описание = "зона доступности 1"
  тип = строка
  по умолчанию = "us-east-1a"
}

переменная "instance_type" {
  description = "Значение тега Name для типа экземпляра EC2"
  тип = строка
  default = "t2.micro"
}
```

- **3\. outputs.tf**

```
output "instance_id" {
  description = "ID экземпляра EC2"
  value = [for instance in aws_instance.web_app: instance.id]
}

output "instance_public_ip" {
  description = "Публичный IP-адрес экземпляра EC2"
  value = [for instance in aws_instance.web_app: instance.public_ip]
}

выход "instance_name" {
  description = "Теги экземпляра EC2"
  value = [for instance in aws_instance.web_app: instance.tags.Name]
}
```

- **4\. terrafprm.tfvars**

```
имя = "rev"
регион = "us-east-1"
```

## [](https://dev.to/aws-builders/how-to-fix-a-terraform-foreach-error-46hg#4-initialize-your-working-directory)4\. Инициализация рабочей директории

```
cd terraform_files
```

- Формат терраформы

```
terraform fmt
```

[![Описание изображения](https://res.cloudinary.com/practicaldev/image/fetch/s--pmm-9nji--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/jzp1pqeshtp1xnufub88.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--pmm-9nji--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/jzp1pqeshtp1xnufub88.png)

- Создайте рабочий каталог

```
terraform init
```

[![Описание изображения](https://res.cloudinary.com/practicaldev/image/fetch/s--hGHxQZTA--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/f9phi1nieh1bhiwg1s9j.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--hGHxQZTA--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/f9phi1nieh1bhiwg1s9j.png)

- Проверка конфигурации

```
terraform validate
```

- получить ряд ошибок в конфигурационном файле

[![Описание изображения](https://res.cloudinary.com/practicaldev/image/fetch/s--82NtWmrt--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/k6wtvabfsbdxka7xl5k8.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--82NtWmrt--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/k6wtvabfsbdxka7xl5k8.png)

## [](https://dev.to/aws-builders/how-to-fix-a-terraform-foreach-error-46hg#5-fix-the-foreach-error)5\. Исправление ошибки for_each

**Ошибки**

- в **main.tf** - Просмотреть детали всех сообщений об ошибках
  - 1\. Исправьте ошибку интерполяции переменных - В строке 33 имеется недопустимая ссылка на атрибут for_each для группы aws_security.
  - Ошибка возникает потому, что выражение \* в значении aws_security_group.\*.id не поддерживается атрибутом for_each.

```
Ошибка: Недопустимая ссылка
│
│ на main.tf строка 33, в ресурсе "aws_instance" "web_app":
│ 33: for_each = aws_security_group.*.id
│
│ За ссылкой на тип ресурса должно следовать как минимум одно обращение к атрибуту, указывающее на имя ресурса.
```

- в **main.tf** - Просмотр деталей сообщения об ошибке Invalid “each” attribute
  - 2\. В строке 37 недопустимый объект “each”, в котором отсутствует атрибут vpc_security_group_ids.
  - Ошибка возникает потому, что значение \[each.id\] зависит от атрибута for_each

```
Ошибка: Неверный атрибут "each"
│
│ на main.tf строка 37, в ресурсе "aws_instance" "web_app":
│ 37: vpc_security_group_ids = [each.id]
│
```

**1\. Исправление ошибок**

- в нижней части файла main.tf объявите локальные переменные для групп безопасности, создаваемых в конфигурационном файле:

```js
локальные переменные {
  security_groups = {
    sg_ping = aws_security_group.sg_ping.id,
    sg_8080 = aws_security_group.sg_8080.id,
  }
}
```

**2\. Исправление ошибок**

- В строке 33 замените значение aws_security_group.\*.id на local.security.groups
- заменить

```js
for_each     = aws_security_group.*.id
```

- с

```js
for_each = local.security_groups;
```

**3\. Исправление ошибок**

- В строке 37 замените значение \[each.id\] на \[each.value\]
- заменить

```js
vpc_security_group_ids = [each.id];
```

- с

```js
vpc_security_group_ids = [each.value];
```

**4\. Исправление ошибок**

- В строке 44 для атрибута Name тега
- замените значение

```js
${var.name}-mywebapp
```

- с

```js
${var.name}-mywebapp-${each.key}
```

- **main.tf** выглядит следующим образом

```js
терраформа {

  required_providers {
    aws = {
      источник = "hashicorp/aws"
      версия = "~> 4.23"
    }
  }

  required_version = ">= 0.14.9"
}

провайдер "aws" {
  регион = var.region
}

данные "aws_ami" "linux" {
  most_recent = true
  owners = ["amazon"]

  фильтр {
    name = "name"
    values = ["amzn2-ami-hvm-*-x86_64-gp2"]
  }

  фильтр {
    name = "тип виртуализации"
    значения = ["hvm"]
  }
}

ресурс "aws_instance" "web_app" {
  for_each = local.security_groups
  ami = data.aws_ami.linux.id
  availability_zone = var.az_1a
  instance_type = var.instance_type
  vpc_security_group_ids = [each.value]
  user_data = <<-EOF
              #!/bin/bash
              echo "Hello, World" > index.html
              nohup busybox httpd -f -p 8080 &
              EOF
  теги = {
    Name = "${var.name}-mywebapp-${each.key}"
  }
}
ресурс "aws_security_group" "sg_ping" {
  name = "Allow Ping"
  vpc_id = "vpc-0da931f5deb73c9e2"
}

ресурс "aws_security_group" "sg_8080" {
  имя = "Разрешить 8080"
  vpc_id = "vpc-0da931f5deb73c9e2"
}

ресурс "aws_security_group_rule" "sg_ping" {
  тип = "ingress"
  from_port = -1
  to_port = -1
  протокол = "icmp"
  security_group_id = aws_security_group.sg_ping.id
  source_security_group_id = aws_security_group.sg_8080.id
}

ресурс "aws_security_group_rule" "sg_8080" {
  тип = "ingress"
  from_port = 8080
  to_port = 8080
  протокол = "tcp"
  security_group_id = aws_security_group.sg_8080.id
  source_security_group_id = aws_security_group.sg_ping.id
}

локали {
  security_groups = {
    sg_ping = aws_security_group.sg_ping.id,
    sg_8080 = aws_security_group.sg_8080.id,
  }
}
```

- Проверьте конфигурацию:

```js
проверить конфигурацию
```

- Вы должны получить сообщение об успешном завершении конфигурации.

[![Описание изображения](https://res.cloudinary.com/practicaldev/image/fetch/s--pf4sLnC1--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/zcig1audzinjkvd6g9vm.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--pf4sLnC1--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/zcig1audzinjkvd6g9vm.png)

## [](https://dev.to/aws-builders/how-to-fix-a-terraform-foreach-error-46hg#6-deploy-your-resources)6\. Развертывание ресурсов

- Создайте план Terraform

```js
план terraform
```

Вход в полноэкранный режим

[![Описание изображения](https://res.cloudinary.com/practicaldev/image/fetch/s--T5Nsr3SR--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/x68ayv1fz24neugdtz2l.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--T5Nsr3SR--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/x68ayv1fz24neugdtz2l.png)

[![Описание изображения](https://res.cloudinary.com/practicaldev/image/fetch/s--gxidj4CQ--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/obaucc2tav4jmrwcmsyt.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--gxidj4CQ--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/obaucc2tav4jmrwcmsyt.png)

- Создайте ресурсы

```
применить терраформу
```

- введите yes для подтверждения развертывания

[![Описание изображения](https://res.cloudinary.com/practicaldev/image/fetch/s--U-oQ6l4x--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/d8lla6znd92dqozs1r28.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--U-oQ6l4x--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/d8lla6znd92dqozs1r28.png)

[![Описание изображения](https://res.cloudinary.com/practicaldev/image/fetch/s--IjDh5KiR--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/yzhjbv5rusns7ufusssw.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--IjDh5KiR--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/yzhjbv5rusns7ufusssw.png)

- Инстансы EC2 - rev-mywebapp-sg_8080 и rev-mywebapp-sg_ping

[![Описание изображения](https://res.cloudinary.com/practicaldev/image/fetch/s--Zfo_9FYY--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/352jylboxi4hp2j2fxza.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--Zfo_9FYY--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/352jylboxi4hp2j2fxza.png)

# [](https://dev.to/aws-builders/how-to-fix-a-terraform-foreach-error-46hg#cleanup)Очистка

```
разрушение терраформы
```

[![Описание изображения](https://res.cloudinary.com/practicaldev/image/fetch/s--XaLIQs7K--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/xkeulnm8d33azt2zrrgu.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--XaLIQs7K--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/xkeulnm8d33azt2zrrgu.png)

# [](https://dev.to/aws-builders/how-to-fix-a-terraform-foreach-error-46hg#what-we-have-done-so-far)Что мы сделали на данный момент

Мы успешно исправили ошибку **for_each** и развернули наши ресурсы.
