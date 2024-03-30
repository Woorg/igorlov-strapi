---
title: Как установить Apache Airflow на Windows без Docker
meta_title: Как установить Apache Airflow на Windows без Docker - Igor Gorlov
description: >-
  Apache Airflow – это инструмент, который помогает управлять и планировать
  конвейеры данных. Согласно документации, он позволяет программно создавать,
  планировать и контролировать рабочие процессы.
date: 2023-02-26T09:36:35.000Z
author: Igor Gorlov
image: ../../assets/images/undefined-Feb-26-2023.avif
categories:
  - Учебник
tags:
  - Data Science
  - Python
draft: false
lastmod: 2024-03-20T21:26:44.071Z
---

Apache Airflow - это инструмент, который помогает управлять и планировать конвейеры данных. Согласно документации, он позволяет ”программно создавать, планировать и контролировать рабочие процессы”.

Airflow - важнейший инструмент для инженеров и ученых, работающих с данными. В этой статье я покажу вам, как установить его на Windows без Docker.

Хотя рекомендуется запускать Airflow с Docker, этот метод подходит для машин с малым количеством памяти, на которых невозможно запустить Docker.

<h2 class="wp-block-heading">Предварительные условия:</h2>

Эта статья предполагает, что вы знакомы с использованием командной строки и можете настроить свою среду разработки в соответствии с инструкциями.

<h2 class="wp-block-heading">Требования:</h2>

Для выполнения этого руководства вам потребуется Python 3.8 или выше, Windows 10 или выше и подсистема Windows Subsystem for Linux (WSL2).

<h2 class="wp-block-heading">Что такое подсистема Windows для Linux (WSL2)?</h2>

WSL2 позволяет запускать команды и программы Linux в операционной системе Windows.

Она предоставляет совместимую с Linux среду, которая работает в Windows, позволяя пользователям использовать инструменты и утилиты командной строки Linux на машине Windows.

Когда Python и WSL2 установлены и активированы на вашей машине, запустите терминал, найдя Ubuntu в меню ”Пуск”.

<h2 class="wp-block-heading">Шаг 1: Настройка виртуальной среды</h2>

Для работы с Airflow в Windows необходимо создать виртуальную среду. Для этого вам нужно установить пакет virtualenv.

Примечание: Убедитесь, что вы находитесь в корне терминала, набрав:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">cd ~</code></pre>
<!-- /wp:code -->

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">pip install virtualenv </code></pre>
<!-- /wp:code -->

Создайте виртуальную среду следующим образом:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">virtualenv airflow_env </code></pre>
<!-- /wp:code -->

А затем активируйте среду:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash"> source airflow_env/bin/activate</code></pre>
<!-- /wp:code -->

<h2 class="wp-block-heading">Шаг 2: Настройка каталога</h2>

Создайте папку с именем airflow. Моя папка будет расположена в c/Users/[Имя пользователя]. Вы можете поместить свою в любое удобное для вас место.

Если вы не знаете, как пользоваться терминалом, вы можете выполнить действия, показанные на рисунке ниже:

<img srcset="https://www.freecodecamp.org/news/content/images/size/w600/2023/01/set-virtual_env-1.png 600w, https://www.freecodecamp.org/news/content/images/2023/01/set-virtual_env-1.png 963w" width="963" height="396" class="kg-image" src="https://www.freecodecamp.org/news/content/images/2023/01/set-virtual_env-1.png" alt="set-virtual_env-1">

Создайте каталог Airflow из терминала

Теперь, когда вы создали эту папку, вам нужно установить ее в качестве переменной окружения. Откройте скрипт .bashrc из терминала с помощью команды:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">nano ~/.bashrc </code></pre>
<!-- /wp:code -->

Затем напишите следующее:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">AIRFLOW_HOME=/c/Users/[YourUsername]/airflow</code></pre>
<!-- /wp:code -->

<img srcset="https://www.freecodecamp.org/news/content/images/size/w600/2023/01/airflow_env_variable.png 600w, https://www.freecodecamp.org/news/content/images/2023/01/airflow_env_variable.png 792w" width="792" height="283" class="kg-image" src="https://www.freecodecamp.org/news/content/images/2023/01/airflow_env_variable.png" alt="airflow_env_variable">

Установите путь к каталогу Airflow в качестве переменной окружения

Нажмите ctrl s и ctrl x, чтобы выйти из редактора nano.

Эта часть каталога Airflow будет навсегда сохранена как переменная окружения. В любой момент, когда вы откроете новый терминал, вы сможете восстановить значение переменной, набрав:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">cd $AIRFLOW_HOME</code></pre>
<!-- /wp:code -->

<img srcset="https://www.freecodecamp.org/news/content/images/size/w600/2023/01/airflow_home-2.png 600w, https://www.freecodecamp.org/news/content/images/2023/01/airflow_home-2.png 742w" width="742" height="262" class="kg-image" src="https://www.freecodecamp.org/news/content/images/2023/01/airflow_home-2.png" alt="airflow_home-2">

Перейдите в каталог Airflow с помощью переменной окружения

<h2 class="wp-block-heading">Шаг 3: Установите Apache Airflow</h2>

Когда виртуальная среда все еще активна, а текущий каталог указывает на созданную папку Airflow, установите Apache Airflow:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash"> pip install apache-airflow </code></pre>
<!-- /wp:code -->

Инициализируйте базу данных:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">airflow db init </code></pre>
<!-- /wp:code -->

Создайте папку с именем dags внутри папки airflow. Она будет использоваться для хранения всех скриптов Airflow.

<img srcset="https://www.freecodecamp.org/news/content/images/size/w600/2023/01/airflow_db_init-1.png 600w, https://www.freecodecamp.org/news/content/images/2023/01/airflow_db_init-1.png 743w" width="743" height="182" class="kg-image" src="https://www.freecodecamp.org/news/content/images/2023/01/airflow_db_init-1.png" alt="airflow_db_init-1">

Просмотр файлов и папок, созданных Airflow db init

<h2 class="wp-block-heading">Шаг 4: Создание пользователя Airflow</h2>

Когда airflow только установлен, вам нужно будет создать пользователя. Этот пользователь будет использоваться для входа в пользовательский интерфейс Airflow и выполнения некоторых функций администратора.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">airflow users create --username admin –password admin –firstname admin –lastname admin –role Admin –email youremail@email.com</code></pre>
<!-- /wp:code -->

Проверьте созданного пользователя:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">airflow users list</code></pre>
<!-- /wp:code -->

<img srcset="https://www.freecodecamp.org/news/content/images/size/w600/2023/01/create-users.png 600w, https://www.freecodecamp.org/news/content/images/2023/01/create-users.png 970w" width="970" height="386" class="kg-image" src="https://www.freecodecamp.org/news/content/images/2023/01/create-users.png" alt="create-users">

Создайте пользователя Airflow и внесите в список созданного пользователя

<h2 class="wp-block-heading">Шаг 5: Запуск веб-сервера</h2>

Запустите планировщик с помощью этой команды:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">airflow scheduler </code></pre>
<!-- /wp:code -->

Запустите другой терминал, активируйте виртуальную среду airflow, перейдите по адресу $AIRFLOW_HOME и запустите веб-сервер:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">airflow webserver </code></pre>
<!-- /wp:code -->

Если по умолчанию используется порт 8080, измените порт, набрав:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">airflow webserver –port &lt;port number&gt;</code></pre>
<!-- /wp:code -->

Войдите в пользовательский интерфейс, используя имя пользователя, созданное ранее с помощью команды “airflow users create”.

В пользовательском интерфейсе вы можете просмотреть предварительно созданные группы DAG, которые поставляются с Airflow по умолчанию.

<h2 class="wp-block-heading">Как создать первую группу DAG</h2>

Группа DAG - это сценарий Python для организации и управления задачами в рабочем процессе.

Чтобы создать группу DAG, перейдите в папку dags, созданную в каталоге $AIRFLOW_HOME. Создайте файл с именем “hello_world_dag.py”. Используйте VS Code, если он доступен.

Введите код с изображения ниже и сохраните его:

<img sizes="(min-width: 1200px) 1200px" srcset="https://www.freecodecamp.org/news/content/images/size/w600/2023/01/first_dag.png 600w, https://www.freecodecamp.org/news/content/images/size/w1000/2023/01/first_dag.png 1000w, https://www.freecodecamp.org/news/content/images/2023/01/first_dag.png 1366w" width="1366" height="706" class="kg-image" src="https://www.freecodecamp.org/news/content/images/2023/01/first_dag.png" alt="first_dag">

Пример сценария DAG в редакторе VS Code

Перейдите в пользовательский интерфейс Airflow и найдите hello_world_dag. Если он не отображается, попробуйте обновить браузер.

Вот и все. На этом установка Apache Airflow на Windows завершена.

<h2 class="wp-block-heading">Подведение итогов</h2>

В этом руководстве мы рассмотрели, как установить Apache Airflow на машину Windows без Docker и как написать сценарий DAG.

Я надеюсь, что описанные выше шаги помогли вам установить airflow на машину Windows без Docker.

В последующих статьях вы узнаете о концепциях и компонентах Apache Airflow.
