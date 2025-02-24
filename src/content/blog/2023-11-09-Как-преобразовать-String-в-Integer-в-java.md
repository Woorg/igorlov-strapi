---
title: Как преобразовать String в Integer в java
meta_title: |
  Как Преобразовать String В Integer В Java - Фул Фронт Дев
description: |
  для разъяснений посмотрите видеоролик
date: 2023-11-08T22:17:18.098Z
image: ../../assets/images/kak-preobrazovatь-string-v-integer-v-java-Nov-09-2023.avif
categories:
  - Как закодить
author: Igor Gorlov
tags:
  - Java
draft: false
type: blog
slug: kak-preobrazovatь-string-v-integer-v-java
keywords:
  - String в Integer в java
lastmod: 2024-03-20T21:26:47.103Z
---

для разъяснений посмотрите видеоролик

https://www.youtube.com/watch?v=Vy4o8Zgdvbs

```java
import java.util.*;
import java.lang.*;
class Demo{
    public static void main(String[] args){
        String s = "9999";
        int num1 = Integer.parseInt(s);
        System.out.println(num1);
        int num2 = Integer.valueOf(s);
        System.out.println(num2);
    }
}

```
