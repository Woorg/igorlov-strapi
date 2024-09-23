---
title: Рекомендательная система с Apache AGE
date: 2023-04-21T07:15:27.000Z
image: ../../assets/images/undefined-Apr-21-2023.avif
author: Igor Gorlov
categories:
  - Учебник
tags:
  - Graph
  - Postgres
draft: false
meta_title: Рекомендательная система с Apache AGE - Фул Фронт Дев
description: >-
  Посмотрев на Youtube видеоролик Как работают рекомендательные системы
  (Netflix/Amazon) от Art of the Problem, я вдохновился им и зах
lastmod: 2024-03-20T21:26:45.644Z
---

Посмотрев на Youtube видеоролик ”Как работают рекомендательные системы (Netflix/Amazon)” от Art of the Problem, я вдохновился им и захотел создать статью в блоге на эту тему. Итак, здесь мы будем работать над тем, как создать рекомендательную систему с помощью базы данных графов. Для этого мы будем использовать Apache AGE, который является расширением с открытым исходным кодом для PostgreSQL, позволяющим нам создавать узлы и ребра.

<!-- wp:rank-math/toc-block {"title":"Оглавление","headings":[{"key":"1b89c5a1-1625-4290-961f-7c0330c101c9","content":"Создание графа","level":2,"link":"#создание-графа","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"d6bb02cb-cc6a-4838-b27d-f42c17adaa11","content":"Метод фильтрации содержимого","level":2,"link":"#метод-фильтрации-содержимого","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"98499715-b277-4619-ad3f-99141f772de0","content":"Заключение","level":2,"link":"#заключение","disable":false,"isUpdated":false,"isGeneratedLink":true}],"listStyle":"ul"} -->
<div class="wp-block-rank-math-toc-block" id="rank-math-toc"><h2>Оглавление</h2><nav><ul><li class=""><a href="#создание-графа">Создание графа</a></li><li class=""><a href="#метод-фильтрации-содержимого">Метод фильтрации содержимого</a></li><li class=""><a href="#заключение">Заключение</a></li></ul></nav></div>
<!-- /wp:rank-math/toc-block -->

<h2 class="wp-block-heading" id="создание-графа">Создание графа</h2>

Учитывая наблюдения за действиями пользователей в прошлом, нам нужно предсказать, что еще может понравиться пользователю. Мы можем представить предпочтения пользователей графически в виде связей между людьми и вещами, которые они оценивают или о которых имеют мнение, например, фильмами. Подход, который мы будем использовать, называется фильтрацией содержимого, которая использует информацию, известную нам о людях и вещах, в качестве соединительной ткани для рекомендаций.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="sql" class="language-sql">-- Creating the graph.
SELECT create_graph('RecommenderSystem');


-- Adding user.
SELECT * FROM cypher('RecommenderSystem', $
    CREATE (:Person {name: 'Abigail'})
$) AS (a agtype);


-- Adding movies.
SELECT * FROM cypher('RecommenderSystem', $
    CREATE (:Movie {title: 'The Matrix'}),
           (:Movie {title: 'Shrek'}),
           (:Movie {title: 'The Blair Witch Project'}),
           (:Movie {title: 'Jurassic Park'}),
           (:Movie {title: 'Thor: Love and Thunder'})
$) AS (a agtype);


-- Adding categories.
SELECT * FROM cypher('RecommenderSystem', $
    CREATE (:Category {name: 'Action'}),
           (:Category {name: 'Comedy'}),
           (:Category {name: 'Horror'})
$) AS (a agtype);
</code></pre>
<!-- /wp:code -->

Мы можем представить силу связей с помощью свойства под названием рейтинг на ребрах между пользователями и категориями, а также фильмами и категориями. Этот рейтинг будет варьироваться от 0 до 4, где 0 означает, что пользователь ненавидел фильм, а 4 - что фильм ему понравился. Это также работает для категорий и фильмов, где 0 - меньшая вероятность, а 4 - наибольшая вероятность.

Допустим, Эбигейл имеет рейтинг 3 для комедии, 1 для боевика и 0 для ужасов.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="sql" class="language-sql">-- User preferences.
SELECT * FROM cypher('RecommenderSystem', $
    MATCH (a:Person {name: 'Abigail'}), (A:Category), (C:Category), (H:Category)
    WHERE A.name = 'Action' AND C.name = 'Comedy' AND H.name = 'Horror' 
    CREATE (a)-[:RATING {rating: 3}]-&gt;(C),
           (a)-[:RATING {rating: 1}]-&gt;(A),
           (a)-[:RATING {rating: 0}]-&gt;(H)
$) AS (a agtype);
</code></pre>
<!-- /wp:code -->

Каждый фильм также сопоставлен с каждой категорией таким же образом. Например, в ”Матрице” нет комедии, много экшена и нет ужасов.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="sql" class="language-sql">-- The Matrix and it's relationship with Categories.
SELECT * FROM cypher('RecommenderSystem', $
    MATCH (matrix:Movie {title: 'The Matrix'}), (A:Category), (C:Category), (H:Category)
    WHERE A.name = 'Action' AND C.name = 'Comedy' AND H.name = 'Horror' 
    CREATE (matrix)-[:RATING {rating: 0}]-&gt;(C),
           (matrix)-[:RATING {rating: 4}]-&gt;(A),
           (matrix)-[:RATING {rating: 0}]-&gt;(H)
$) AS (a agtype);

-- Shrek and it's relationship with Categories.
SELECT * FROM cypher('RecommenderSystem', $
    MATCH (shrek:Movie {title: 'Shrek'}), (A:Category), (C:Category), (H:Category)
    WHERE A.name = 'Action' AND C.name = 'Comedy' AND H.name = 'Horror' 
    CREATE (shrek)-[:RATING {rating: 4}]-&gt;(C),
           (shrek)-[:RATING {rating: 2}]-&gt;(A),
           (shrek)-[:RATING {rating: 0}]-&gt;(H)
$) AS (a agtype);

-- The Blair Witch Project and it's relationship with Categories.
SELECT * FROM cypher('RecommenderSystem', $
    MATCH (witch:Movie {title: 'The Blair Witch Project'}), (A:Category), (C:Category), (H:Category)
    WHERE A.name = 'Action' AND C.name = 'Comedy' AND H.name = 'Horror' 
    CREATE (witch)-[:RATING {rating: 0}]-&gt;(C),
           (witch)-[:RATING {rating: 0}]-&gt;(A),
           (witch)-[:RATING {rating: 4}]-&gt;(H)
$) AS (a agtype);

-- Jurassic Park and it's relationship with Categories.
SELECT * FROM cypher('RecommenderSystem', $
    MATCH (jurassic:Movie {title: 'Jurassic Park'}), (A:Category), (C:Category), (H:Category)
    WHERE A.name = 'Action' AND C.name = 'Comedy' AND H.name = 'Horror' 
    CREATE (jurassic)-[:RATING {rating: 1}]-&gt;(C),
           (jurassic)-[:RATING {rating: 3}]-&gt;(A),
           (jurassic)-[:RATING {rating: 0}]-&gt;(H)
$) AS (a agtype);

-- Thor: Love and Thunder and it's relationship with Categories.
SELECT * FROM cypher('RecommenderSystem', $
    MATCH (thor:Movie {title: 'Thor: Love and Thunder'}), (A:Category), (C:Category), (H:Category)
    WHERE A.name = 'Action' AND C.name = 'Comedy' AND H.name = 'Horror' 
    CREATE (thor)-[:RATING {rating: 4}]-&gt;(C),
           (thor)-[:RATING {rating: 2}]-&gt;(A),
           (thor)-[:RATING {rating: 0}]-&gt;(H)
$) AS (a agtype);
</code></pre>
<!-- /wp:code -->

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--0QyAkwM2--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/seselcy2xfl15p8f2638.png" alt="график с указанием возраста"/></figure>
<!-- /wp:image -->

<h2 class="wp-block-heading" id="метод-фильтрации-содержимого">Метод фильтрации содержимого</h2>

Чтобы определить, понравится ли кому-то фильм, нужно перемножить все факторы вместе и разделить их на количество категорий, умноженное на 4.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="sql" class="language-sql">-- The Matrix estimated rating for the user.
SELECT e1/(ct*4) AS factor FROM cypher('RecommenderSystem', $
MATCH (u:Person)-[e1:RATING]-&gt;(v:Category)&lt;-[e2:RATING]-(w:Movie{title: 'The Matrix'}), (c:Category) WITH e1, e2, COUNT(*) AS ct
RETURN SUM(e1.rating * e2.rating)::float, ct
$) AS (e1 float, ct agtype);

      factor       
------------------- 

 0.333333333333333
(1 row)

</code></pre>
<!-- /wp:code -->

Мы можем представить силу связи между Эбигейл и Матрицей как: [(3 x 0) + (1 x 4) + (0 x 0)] / 12 = 0,3 . По нашим оценкам, фильм ей не очень понравится. Теперь нам нужно собрать данные по всем остальным фильмам, чтобы мы могли показать те, которые больше всего соответствуют ее интересам.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="sql" class="language-sql">-- Shrek's estimated rating for the user.
SELECT e1/(ct*4) AS factor FROM cypher('RecommenderSystem', $
MATCH (u:Person)-[e1:RATING]-&gt;(v:Category)&lt;-[e2:RATING]-(w:Movie{title: 'Shrek'}), (c:Category) WITH e1, e2, COUNT(*) AS ct
RETURN SUM(e1.rating * e2.rating)::float, ct
$) AS (e1 float, ct agtype);

      factor      
------------------ 

 1.16666666666667
(1 row)


-- The Blair Witch Project estimated rating for the user.
SELECT e1/(ct*4) AS factor FROM cypher('RecommenderSystem', $
MATCH (u:Person)-[e1:RATING]-&gt;(v:Category)&lt;-[e2:RATING]-(w:Movie{title: 'The Blair Witch Project'}), (c:Category) WITH e1, e2, COUNT(*) AS ct
RETURN SUM(e1.rating * e2.rating)::float, ct
$) AS (e1 float, ct agtype);

 factor 
-------- 

 0.0
(1 row)


-- Jurassic Park estimated rating for the user.
SELECT e1/(ct*4) AS factor FROM cypher('RecommenderSystem', $
MATCH (u:Person)-[e1:RATING]-&gt;(v:Category)&lt;-[e2:RATING]-(w:Movie{title: 'Jurassic Park'}), (c:Category) WITH e1, e2, COUNT(*) AS ct
RETURN SUM(e1.rating * e2.rating)::float, ct
$) AS (e1 float, ct agtype);
 factor 
-------- 

 0.5
(1 row)


-- Thor: Love and Thunder estimated rating for the user.
SELECT e1/(ct*4) AS factor FROM cypher('RecommenderSystem', $
MATCH (u:Person)-[e1:RATING]-&gt;(v:Category)&lt;-[e2:RATING]-(w:Movie{title: 'Thor: Love and Thunder'}), (c:Category) WITH e1, e2, COUNT(*) AS ct
RETURN SUM(e1.rating * e2.rating)::float, ct
$) AS (e1 float, ct agtype);
      factor      
------------------ 

 1.16666666666667
(1 row)
</code></pre>
<!-- /wp:code -->

Несмотря на то, что ”Шрек” и "Тор" не являются ее чашкой чая, согласно нашему анализу графиков, Эбигейл предпочтет посмотреть фильмы из нашего списка.

<h2 class="wp-block-heading" id="заключение">Заключение</h2>

Мы показали, как создать рекомендательную систему с графовой базой данных с помощью Apache AGE. Этот подход может быть расширен для реализации более сложных сценариев, таких как включение демографических данных пользователя, истории поиска или связей в социальных сетях. Графовые базы данных хорошо подходят для рекомендательных систем, поскольку они могут легко представлять отношения между пользователями и предметами, а также атрибуты этих сущностей. Кроме того, использование SQL и языка запросов Cypher облегчает работу с большими массивами данных и выполнение сложных запросов. В целом, мы надеемся, что эта статья послужит отправной точкой для тех, кто заинтересован в создании рекомендательной системы с использованием базы данных графов.

<!-- wp:acf/acf-donate {"id":"block_64678dc93985f","name":"acf/acf-donate","data":{"title":"Задонатить на поддержку!","_title":"field_646b621e8617c","list_0_name":"Donatepay","_list_0_name":"field_646b623e8617e","list_0_url":"https://new.donatepay.ru/@1117856","_list_0_url":"field_646b62528617f","list_0_address":"","_list_0_address":"field_646b625d86180","list_1_name":"Donationalerts","_list_1_name":"field_646b623e8617e","list_1_url":"https://www.donationalerts.com/c/woorg_","_list_1_url":"field_646b62528617f","list_1_address":"","_list_1_address":"field_646b625d86180","list_2_name":"USDT (TRC20)","_list_2_name":"field_646b623e8617e","list_2_url":"","_list_2_url":"field_646b62528617f","list_2_address":"TR121HxpTDF71TMm9idZkBaZxnjSMcCPWj","_list_2_address":"field_646b625d86180","list_3_name":"ETH","_list_3_name":"field_646b623e8617e","list_3_url":"","_list_3_url":"field_646b62528617f","list_3_address":"0x442721192987047eDeEC69Ca1D4c706f9Adb16B3","_list_3_address":"field_646b625d86180","list_4_name":"BTC","_list_4_name":"field_646b623e8617e","list_4_url":"","_list_4_url":"field_646b62528617f","list_4_address":"36dLKv5uRozphSQa55w2XgsF42AugPu2QT","_list_4_address":"field_646b625d86180","list":5,"_list":"field_646b62308617d"},"align":"","mode":"edit"} /-->
