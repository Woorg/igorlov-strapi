---
title: 'Изучаем Godot 4, делая ролевую игру - часть 24: Исправление ошибок'
meta_title: >-
  Изучаем Godot 4, делая ролевую игру - часть 24: Исправление ошибок | Игорь
  Горлов - Fullstack Developer
description: >-
  Если вы запустите этот проект после обновления Godot 4.1.1, вы заметите
  несколько ошибок, которые появятся в панели Errors. Я не говорю о желтых
  предупреждения
date: 2023-12-18T00:00:00.000Z
categories:
  - Как пофиксить
author: Игорь Горлов
type: blog
draft: false
slug: yzuchaem-godot-4-delaia-rolevuiu-yhru-chast-24-yspravlenye-oshybok
translatedPosition: 58
tags:
  - Godot
image: >-
  ../../assets/images/yzuchaem-godot-4-delaia-rolevuiu-yhru-chast-24-yspravlenye-oshybok-Dec-18-2023.avif
lastmod: 2024-03-20T21:26:43.753Z
---

Если вы запустите этот проект после обновления Godot 4.1.1, вы заметите несколько ошибок, которые появятся в панели Errors. Я не говорю о желтых предупреждениях (они желтые, они плавные), нет, я говорю о красных предупреждениях. Сама игра по-прежнему работает нормально с этими предупреждениями, но их легко исправить, так что давайте исправим их, чтобы они не загромождали наш журнал вывода.

ЧТО ВЫ УЗНАЕТЕ В ЭТОЙ ЧАСТИ:

- Исправление основных ошибок.

## Ошибка вызова из сигнала 'scene_changed' в callable.

Если вы меняете сцены через Главное меню или переходы между сценами, вы можете получить эту ошибку. Это происходит из-за несоответствия между количеством аргументов, передаваемых сигналом, и количеством аргументов, ожидаемых функцией, подключенной к сигналу.

В нашем скрипте Global.gd есть сигнал scene_changed, который настроен на выдачу с одним аргументом (новая сцена).

`###Global.gd extends Node  #notifies scene change signal scene_changed(new_scene)`

Позже в функции change_scene мы подаем сигнал с одним аргументом.

`###Global.gd  extends Node  func change_scene(scene_path): # older code scene_changed.emit(new_scene)`

Но в наших скриптах Main и Main_2.gd есть функция, связанная с нашим сигналом - у которой нет параметров. Поэтому, когда сигнал 'scene_changed' испускается и пытается вызвать \_on_scene_changed с одним аргументом (новая сцена), происходит ошибка, потому что \_on_scene_changed не настроена на прием аргументов.

```gd
### Main.gd extends Node2D

# Connect signal to function
func _ready():
    Global.scene_changed.connect(_on_scene_changed)  # older code

# Only after scene has been changed, do we free our resource
func _on_scene_changed():
    queue_free()
```

Чтобы решить эту проблему, мы можем обновить нашу функцию \_on_scene_changed в скрипте Main.gd, чтобы она принимала один аргумент. Мы также должны подключать сигнал к нашей функции только при изменении сцены, а не при ее загрузке.

```gd
### Main.gd extends Node2D

# Transports player to saloon scene
func _on_saloon_body_entered(body):
    if body.name == "Player":
        Global.change_scene("res://Scenes/Main_2.tscn")
        Global.scene_changed.connect(_on_scene_changed)

# Saves game every 5 minutes
func _on_timer_timeout():
    if Global.current_scene_name != "MainMenu":
        print("Autosaved game.")
        Global.save()

# Only after scene has been changed, do we free our resource
func _on_scene_changed(new_scene):
    queue_free()
```

```gd
### Main_2.gd - previously Saloon extends Node2D

# plays different background music
func _ready():
    $Player/BackgroundMusic.stream = load("res://../../assets/FX/Music/Free Retro SFX by @inertsongs/Imposter Syndrome (theme).wav")
    $Player/BackgroundMusic.play()

# transports player to main scene
func _on_trigger_area_body_entered(body):
    if body.name == "Player":
        Global.change_scene("res://Scenes/Main.tscn")
        Global.scene_changed.connect(_on_scene_changed)

# only after scene has been changed, do we free our resource
func _on_scene_changed(new_scene):
    queue_free()
```

## Ошибка вызова из сигналов 'health_updated' и 'stamina_updated' в callable.

Эта ошибка возникает всякий раз, когда игра пытается обновить здоровье и выносливость с помощью сигналов. Как и в случае с ошибкой выше, это происходит из-за несоответствия номеров аргументов. Когда мы испускаем сигнал 'health_updated' в скрипте Player.gd, мы передаем аргумент. Затем, в скрипте Health.gd, метод 'update_health' подключается к этому сигналу и ожидает получить этот аргумент. Однако наш метод 'update_health' определен без каких-либо параметров, поэтому возникает несоответствие и ошибка.

Чтобы исправить это, нам просто нужно передать обе переменные x и max_x в сигналах здоровья и выносливости.

```gd
### Player.gd
# older code
# updates player xp
func update_xp(value):
    xp += value
    # check if player leveled up after reaching xp requirements
    if xp >= xp_requirements:
        # older code
        # update signals for Label values
        health_updated.emit(health, max_health)
        stamina_updated.emit(stamina, max_stamina)
        ammo_pickups_updated.emit(ammo_pickup)
        health_pickups_updated.emit(health_pickup)
        stamina_pickups_updated.emit(stamina_pickup)
        xp_updated.emit(xp)
```

## Ошибка Условие "p_scene && p_scene->get_parent() != root" является истинным.

При загрузке игры может возникнуть эта ошибка. Эта ошибка обычно возникает, когда мы пытаемся установить текущую сцену в Godot, а сцена, которую мы пытаемся установить, уже имеет родительский узел, который не является корнем дерева сцен. При смене сцены мы обычно хотим добавить новую сцену в качестве дочернего узла корневого узла, а затем установить ее в качестве текущей сцены. Однако если у сцены уже есть родитель, не являющийся корнем, Godot не позволит нам установить ее в качестве текущей сцены, что приведет к этой ошибке.

Мы можем исправить это с помощью объекта call_deferred, который позволит нам установить текущую сцену и изменить сцену при загрузке игры в одном и том же кадре, избежав ошибки, с которой мы столкнулись.

```gd
### Global.gd
# older code
# load game func
load_game():
    if loading and FileAccess.file_exists(save_path):
        # older code
        # Change to the loaded scene
        get_tree().root.call_deferred("add_child", game)
        get_tree().call_deferred("set_current_scene", game)
        current_scene_name = game.name
        # code remains the same
    else:
        print("Save file not found!")
        return false
```

## Ошибка: Узел не найден: "Player" (относительно "/root/MainMenu").

При загрузке игры может возникнуть эта ошибка. Эта ошибка происходит потому, что мы пытаемся получить доступ к узлу "Player" из сцены "MainMenu". Похоже, что сцена "MainMenu" не имеет узла "Player".

В нашей функции load*data() мы пытаемся найти узел "Player" из текущей*сцены, которая в данном случае является "MainMenu". Вот проблемная строка:

`var player = current_scene.get_node("Player")`

Если в сцене "MainMenu" нет узла "Player", мы получим ошибку "Node not found". Чтобы избежать этой ошибки, мы можем сначала проверить, существует ли узел "Player" в текущей_сцене, прежде чем пытаться получить к нему доступ:

```gd
### Global.gd
# Older code
# Player data to load when changing scenes
func load_data():
    var current_scene = get_tree().get_current_scene()
    if current_scene and FileAccess.file_exists(save_path):
        print("Save file found!")
        var file = FileAccess.open(save_path, FileAccess.READ)
        var data = JSON.parse_string(file.get_as_text())
        file.close()
        # Now you can load data into the nodes
        if current_scene.has_node("Player"):
            var player = current_scene.get_node("Player")
            if player and data.has("player"):
                player.values_to_load(data["player"])
            else:
                print("Save file not found!")
```

## Ошибка data_to_load() Таймер не был добавлен в сцену.

В функции data_to_load() нашего EnemySpawner мы можем просто удалить последнюю строку, добавляющую узел таймера, поскольку у нас уже есть узел таймера, добавленный в нашу сцену, и этот узел таймера настроен на автовоспроизведение при запуске.

```gd
###EnemySpawner.gd

# Load data from save file
func data_to_load(data):
    enemy_count = data.size()
    for enemy_data in data:
        var enemy = enemy_scene.instantiate()
        enemy.data_to_load(enemy_data)
        add_child(enemy)
```

## Ошибка change_scene(): Невозможно изменить это состояние во время промывки запросов.

Эта ошибка возникает, когда мы пытаемся изменить сцену, в то время как некоторые запросы физики все еще решаются. Godot не позволяет напрямую изменять некоторые свойства физики или менять сцены во время процесса физики, так как это может привести к сбоям или неожиданному поведению.

Одним из решений является использование функции call_deferred(), которая планирует вызов метода во время простоя следующего кадра. Это может предотвратить гоночные условия, которые могут возникнуть, если запросы к физике будут сбрасываться, пока мы пытаемся изменить сцену.

```gd
###Global.gd

func change_scene(scene_path):
    # Save the game before changing scenes
    save()

    # Then change the scene
    current_scene_name = scene_path.get_file().get_basename()
    var current_scene = get_tree().get_root().get_child(get_tree().get_root().get_child_count() - 1)
    current_scene.queue_free()
    var new_scene = load(scene_path).instantiate()
    get_tree().get_root().call_deferred("add_child", new_scene)
    get_tree().call_deferred("set_current_scene", new_scene)

    # Carries persistent data across scenes
    load_data()

    scene_changed.emit(new_scene)
```

С этими проблемами красные ошибки из нашего журнала должны быть удалены. Оставшиеся желтые предупреждения не имеют значения, поскольку удаление некоторых "затененных" переменных приведет к появлению реальных ошибок. Однако вы можете исправить предупреждения о том, что переменная x никогда не используется, добавив отступы к неиспользуемым параметрам.

Ваш окончательный код должен выглядеть следующим образом.

Если возникнут другие критические ошибки, эта часть серии уроков будет обновляться для их устранения по мере необходимости. Пожалуйста, помните, что исправление ошибок - это постоянная часть разработки, особенно в разработке игр, где наш движок постоянно обновляется, что приводит к поломкам кода! Не забудьте сохранить свой проект, и до встречи в следующей части.

Серия учебников состоит из 25 глав. Я буду выпускать все главы по частям в течение следующих нескольких недель.
