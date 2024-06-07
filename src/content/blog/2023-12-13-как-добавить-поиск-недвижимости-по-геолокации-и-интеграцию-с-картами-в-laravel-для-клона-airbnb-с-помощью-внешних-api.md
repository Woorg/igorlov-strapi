---
title: >-
  Как добавить поиск недвижимости по геолокации и интеграцию с картами в Laravel
  для клона Airbnb с помощью внешних API?
meta_title: >-
  Как добавить поиск недвижимости по геолокации и интеграцию с картами в Laravel
  для клона Airbnb с помощью внешних API? - Фул Фронт Дев
description: >-
  **Внедрение геолокационного поиска и интеграции карт в приложение Laravel,
  например, в клон Airbnb, включает в себя несколько шагов. В этом примере я
  проведу в
date: 2023-12-13T01:23:28.522Z
image: >-
  ../../assets/images/kak-dobavyt-poysk-nedvyzhymosty-po-heolokatsyy-y-yntehratsyiu-s-kartamy-v-laravel-dlia-klona-airbnb-s-pomoschiu-vneshnykh-api-Dec-13-2023.avif
categories:
  - Как закодить
author: Igor Gorlov
tags:
  - Laravel
  - Google Maps API
draft: false
translated: ''
translatedPosition: ''
type: blog
slug: >-
  kak-dobavyt-poysk-nedvyzhymosty-po-heolokatsyy-y-yntehratsyiu-s-kartamy-v-laravel-dlia-klona-airbnb-s-pomoschiu-vneshnykh-api
lastmod: 2024-03-20T21:26:46.622Z
---

**Внедрение геолокационного поиска и интеграции карт в приложение Laravel, например, в клон Airbnb, включает в себя несколько шагов. В этом примере я проведу вас через процесс настройки поиска недвижимости по геолокации с помощью Google Maps API и Laravel.**.

**Шаг 1: Создание проекта Laravel**.

Если вы еще не сделали этого, создайте новый проект Laravel:

```bash
composer create-project --prefer-dist laravel/laravel airbnb-clone
cd airbnb-clone
```

**Шаг 2: Настройте вашу базу данных**

Настройте подключение к базе данных в файле .env и запустите миграции для создания таблицы свойств:

```bash
php artisan make:model Property -m
php artisan migrate
```

Определите схему таблицы свойств в сгенерированном файле миграции (database/migrations/YY_MM_DD_create_properties_table.php):

```bash
public function up()
{
    Schema::create('properties', function (Blueprint $table) {
        $table->id();
        $table->string('title');
        $table->text('description');
        $table->decimal('latitude', 10, 7);
        $table->decimal('longitude', 10, 7);
        $table->timestamps();
    });
}
```

**Шаг 3: Создание модели объекта и сеялки**

Определите модель свойств (app/Models/Property.php) и создайте сеялку для заполнения базы данных примерами свойств:

```bash
php artisan make:seeder PropertySeeder
```

В Property.php добавьте заполняемые поля и определите область поиска на основе геолокации:

```php
protected $fillable = ['title', 'description', 'latitude', 'longitude'];

public function scopeWithinDistance($query, $latitude, $longitude, $radius = 10)
{
    return $query
        ->select('id', 'title', 'description', 'latitude', 'longitude')
        ->selectRaw(
            "(6371 * acos(cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) + sin(radians(?)) * sin(radians(latitude)))) AS distance",
            [$latitude, $longitude, $latitude]
        )
        ->having('distance', '<=', $radius);
}
```

В файле PropertySeeder.php загрузите некоторые примеры данных с координатами:

```php
использовать Illuminate\Database\Seeder;
использовать App\Models\Property;

class PropertySeeder extends Seeder
{
    public function run()
    {
        Property::create([
            'title' => 'Уютная квартира',
            'description' => 'Уютная квартира в центре города',
            'latitude' => 40.7128,
            'longitude' => -74.0060,
        ]);

        // Добавьте сюда другие свойства...
    }
}
```

Запустите сеялку, чтобы заполнить базу данных:

```bash
php artisan db:seed --class=PropertySeeder
```

**Шаг 4: Создание контроллера поиска**

Создайте контроллер для поиска недвижимости:

```bash
php artisan make:controller PropertyController
```

В PropertyController.php создайте метод для поиска по геолокации:

```php
use Illuminate\Http\Request;
использовать App\Models\Property;

public function search(Request $request)
{
    $latitude = $request->input('latitude');
    $longitude = $request->input('longitude');
    $radius = $request->input('radius', 10); // Радиус по умолчанию равен 10 километрам

    $properties = Property::withinDistance($latitude, $longitude, $radius)->get();

    return response()->json(['properties' => $properties]);
}
```

**Шаг 5: Настройка маршрутов**

Определите API-маршрут для поиска недвижимости в файле routes/api.php:

```php
Route::get('/properties/search', 'PropertyController@search');
```

**Шаг 6: Создание фронтенда**

Для создания фронтенда вы можете использовать JavaScript и картографическую библиотеку, например Leaflet или Google Maps. Вот пример использования Leaflet:

1. Установите Leaflet и Leaflet.markercluster через npm:

```bash
npm install leaflet leaflet.markercluster
```

1. Создайте компонент Vue или используйте JavaScript для интеграции карты в ваш фронтенд. Вот упрощенный пример:

```js
<!-- Шаблон компонента Vue -->
<template>
  <!-- Контейнер карты -->
  <div>
    <div id="map"></div>
    <!-- Входы поиска -->
    <div>
      Широта: <input v-model="latitude" />
      Долгота: <input v-model="longitude" />
      Радиус (км): <input v-model="radius" />
      <button @click="searchProperties">Поиск</button>.
    </div>
    <!-- Список свойств -->
    <ul>
      <li v-for="property in properties" :key="property.id">
        {{ property.title }} - {{ property.distance }} км.
      </li>
    </ul>
  </div>
</template>

<!-- Скрипт компонента Vue -->
<script>
import L from 'leaflet';

export default {
  data() {
    возврат {
      широта: 0,
      долгота: 0,
      радиус: 10,
      свойства: [],
      map: null,
    };
  },
  mounted() {
    this.map = L.map('map').setView([this.latitude, this.longitude], 10);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
  },
  методы: {
    searchProperties() {
      axios
        .get(`/api/properties/search?latitude=${this.latitude}&longitude=${this.longitude}&radius=${this.radius}`)
        .then((response) => {
          this.properties = response.data.properties;
          this.updateMarkers();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    updateMarkers() {
      // Очистите существующие маркеры
      this.map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          this.map.removeLayer(layer);
        }
      });

      // Добавление новых маркеров
      this.properties.forEach((property) => {
        L.marker([property.latitude, property.longitude])
          .addTo(this.map)
          .bindPopup(property.title);
      });
    },
  },
};
</script>

<!-- Стили компонентов Vue -->
<style>
#map {
  высота: 400px;
}
</style>
```

**Шаг 7: Запустите свой сервер разработки**

Запустите сервер разработки Laravel и скомпилируйте активы фронтенда:

```bash
php artisan serve
npm run dev
```

Теперь, когда вы заходите в свое приложение, у вас должен быть простой поиск недвижимости по геолокации и интеграция карты с использованием Laravel, Vue.js и Google Maps API.

Не забудьте настроить и улучшить этот пример в соответствии с конкретными требованиями вашего клона Airbnb. Кроме того, продумайте аутентификацию пользователей и меры безопасности при работе с пользовательскими данными и информацией о местоположении.
