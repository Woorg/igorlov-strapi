---
title: >-
  Совместное использование данных Google Maps между отдельными компонентами
  Livewire
meta_title: >-
  Совместное использование данных Google Maps между отдельными компонентами
  Livewire - Igor Gorlov
description: 'Допустим, у нас есть отдельные компоненты Livewire для'
date: 2023-04-20T18:49:05.000Z
author: Igor Gorlov
image: ../../assets/images/undefined-Apr-20-2023.avif
categories:
  - Как закодить
tags:
  - Laravel
  - Livewire
draft: false
lastmod: 2024-03-20T21:26:46.525Z
---

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://fly.io/laravel-bytes/2023-04-20/pin-in-hand-cover.webp" alt="Sharing a glowing Google Maps Marker between two green hands."/></figure>
<!-- /wp:image -->

Изображение Анни Руйгт

Допустим, у нас есть отдельные компоненты Livewire для:

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Элемент карты Google - интерактивная карта для добавления и удаления маркеров местоположения</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Элемент поисковой строки - для перефокусировки элемента карты Google на заданное пользователем местоположение </li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Элемент выпадающего списка - для фильтрации маркеров, показанных в элементе карты Google </li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Наконец, форма — для отправки данных, предоставленных пользователем, из всех вышеперечисленных компонентов.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

Как именно мы можем обмениваться данными между этими отдельными компонентами Livewire?

<!-- wp:rank-math/toc-block {"title":"Оглавление","headings":[{"key":"e47addb7-323b-492c-8e2a-fd5ad78a55de","content":"Возможности совместного использования","level":2,"link":"#возможности-совместного-использования","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"a0945000-7fce-45f3-9bb5-1038e4444d99","content":"Создание компонента карты Google","level":2,"link":"#создание-компонента-карты-google","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"bf33d941-7094-4a60-a453-af0c2b712eb5","content":"Создание компонента поисковой строки","level":2,"link":"#создание-компонента-поисковой-строки","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"dcc8234e-316a-4433-88a1-2338e5d92811","content":"Обмен данными с помощью событий браузера","level":2,"link":"#обмен-данными-с-помощью-событий-браузера","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"d53c089c-6e48-492f-99d8-cb0e78d3e9c8","content":"Пересмотр компонента Maps для маркировки булавками","level":2,"link":"#пересмотр-компонента-maps-для-маркировки-булавками","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"3275e7d5-f9ef-490a-9dd4-027fe01726fa","content":"Создание компонента фильтра","level":2,"link":"#создание-компонента-фильтра","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"4102991d-2f76-48da-880c-c1ac62152187","content":"Обмен данными через переменные JavaScript","level":2,"link":"#обмен-данными-через-переменные-java-script","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"d85b8f2a-aef0-4510-a3c5-9aa4070c4dd1","content":"Финал формы","level":2,"link":"#финал-формы","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"09fde70e-551d-4b21-873d-da22ce3d6440","content":"Совместное использование данных через селектор запросов HTML-элемента","level":2,"link":"#совместное-использование-данных-через-селектор-запросов-html-элемента","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"cc4a0193-b643-4eea-b7a2-da64b9c9ecc6","content":"Возможности обучения","level":2,"link":"#возможности-обучения","disable":false,"isUpdated":false,"isGeneratedLink":true}],"listStyle":"ul"} -->
<div class="wp-block-rank-math-toc-block" id="rank-math-toc"><h2>Оглавление</h2><nav><ul><li class=""><a href="#возможности-совместного-использования">Возможности совместного использования</a></li><li class=""><a href="#создание-компонента-карты-google">Создание компонента карты Google</a></li><li class=""><a href="#создание-компонента-поисковой-строки">Создание компонента поисковой строки</a></li><li class=""><a href="#обмен-данными-с-помощью-событий-браузера">Обмен данными с помощью событий браузера</a></li><li class=""><a href="#пересмотр-компонента-maps-для-маркировки-булавками">Пересмотр компонента Maps для маркировки булавками</a></li><li class=""><a href="#создание-компонента-фильтра">Создание компонента фильтра</a></li><li class=""><a href="#обмен-данными-через-переменные-java-script">Обмен данными через переменные JavaScript</a></li><li class=""><a href="#финал-формы">Финал формы</a></li><li class=""><a href="#совместное-использование-данных-через-селектор-запросов-html-элемента">Совместное использование данных через селектор запросов HTML-элемента</a></li><li class=""><a href="#возможности-обучения">Возможности обучения</a></li></ul></nav></div>
<!-- /wp:rank-math/toc-block -->

<h2 class="wp-block-heading" id="возможности-совместного-использования">Возможности совместного использования</h2>

В этой статье мы рассмотрим различные возможности обмена данными между компонентами Livewire:

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Обмен данными через событие dispatchBrowserEvent в Livewire: полезно, когда данные из компонента A на сервере необходимы для внесения изменений в пользовательский интерфейс компонента B. </li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Обмен данными через переменные JavaScript: полезно, когда данные, собранные из пользовательского интерфейса компонента A, необходимы для внесения изменений в пользовательский интерфейс компонента B. </li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Обмен данными через события emit в Livewire: полезно, когда обработанные данные из компонента A на сервере необходимы компоненту B на сервере </li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Обмен данными через Html Query Selectors: полезно, когда нам нужно передать данные из пользовательского ввода, предоставленного в элементах отдельных компонентов, в родительский компонент.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

Мы рассмотрим все эти возможности, объединив вместе следующие компоненты Livewire: элемент Google Maps, поисковую строку, выпадающий фильтр и форму.

<h2 class="wp-block-heading" id="создание-компонента-карты-google">Создание компонента карты Google</h2>

Давайте начнем с центрального элемента нашей сегодняшней статьи: Компонент карты Google. Мы будем использовать его для того, чтобы наши пользователи могли добавлять маркеры в различные точки мира.

Для начала создайте компонент с помощью php artisan make:livewire map. Не забудьте добавить в его вид элемент div с заданными шириной и высотой для отображения карты:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="php" class="language-php">&lt;!--app\resources\views\livewire\map.blade.php--&gt;
&lt;div&gt;
    &lt;div 
    wire:ignore id="map" 
    style="width:500px;height:400px;"&gt;
    &lt;/div&gt;
</code></pre>
<!-- /wp:code -->

Затем добавьте скрипт для инициализации элемента Google Maps в этот div. Обязательно авторизуйте доступ к Google Maps api, используя либо встроенный загрузчик bootstrap, либо унаследованный тег загрузки скрипта.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="php" class="language-php">    &lt;script&gt;
        /* Add Inline Google Auth Boostrapper here */

        /* How to initialize the map */
        let map;
        async function initMap() {
            const { Map } = await google.maps.importLibrary("maps");
            map = new Map(document.getElementById("map"), {
                    zoom: 4,
                    center: { lat: @js( $lat ), lng: @js( $lng ) },
                    mapId: "DEMO_MAP_ID",
            });
        }

        /* Initialize map when Livewire has loaded */
        document.addEventListener('livewire:load', function () { 
            initMap();
        });
    &lt;/script&gt;
&lt;/div&gt;
</code></pre>
<!-- /wp:code -->

Заметили @js( $lat ) и @js( $lng ) в приведенном выше фрагменте кода? Это помощник Livewire, который позволяет нам использовать PHP-атрибуты $lat и $lng в JavaScript нашего представления. Нам придется объявить их в компоненте Map:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="php" class="language-php">/* App\Http\Livewire\Map.php */

class Map extends Component{

      public $lat = -25.344;
      public $lng = 131.031;
</code></pre>
<!-- /wp:code -->

Выше мы объявили координаты местоположения по умолчанию. Это покажет местоположение по умолчанию в нашем компоненте карт. В следующем разделе ниже мы добавим компонент поисковой строки, чтобы пользователи могли легко переместить фокус в нужное им место. А затем мы реализуем первый способ обмена данными между компонентами.

<h2 class="wp-block-heading" id="создание-компонента-поисковой-строки">Создание компонента поисковой строки</h2>

Создайте отдельный компонент с помощью команды: php artisan make:livewire map-search-box. Его вид будет состоять из двух элементов, текстового поля ввода и кнопки:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="php" class="language-php">&lt;!--app\resources\views\livewire\map-saerch-box.blade.php--&gt;
&lt;div&gt;
    &lt;input type="text" wire:model.defer="address" /&gt;
    &lt;button wire:click="search"&gt;Search&lt;/button&gt;
&lt;/div&gt;
</code></pre>
<!-- /wp:code -->

Элемент text подключен к атрибуту $address компонента и использует model.defer, чтобы убедиться, что Livewire не отправляет свои запросы по умолчанию при каждом изменении элемента. С другой стороны, элемент кнопки подключен к методу поиска в компоненте Livewire через слушатель клика.

Этот метод search() преобразует строковое значение элемента ввода (подключенного к $address) в координаты местоположения:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="php" class="language-php">/* App\Http\Livewire\MapSearchBox.php */

class MapSearchBox extends Component{

      public $address;

      public function search()
      {
          // Use a custom service to get address' lat-long coordinates
          // Either through Google GeoCoder or some other translator
          $coordinates = new \App\Http\Services\GoogleLocationEncoder( 
            $this-&gt;address 
          );
      }
</code></pre>
<!-- /wp:code -->

После получения наших координат из компонента MapSearchBox, нам нужно будет повторно отцентрировать местоположение, видимое из представления компонента Map.

Хм-м-м. Но. Компонент MapSearchBox является отдельным компонентом от компонента Map, так как же именно мы можем обмениваться данными между двумя отдельными компонентами?

<h2 class="wp-block-heading" id="обмен-данными-с-помощью-событий-браузера">Обмен данными с помощью событий браузера</h2>

Обычный способ обмена данными о событиях между компонентами - это использование функции emit в Livewire. Однако этот подход фактически делает два немедленных запроса для каждого emit: первый запрос - вызов компонента, от которого исходило событие, а второй - вызов компонента, слушающего испускаемое событие.

В нашем случае (перестановка карты на основе координат из окна поиска) второй запрос нам не нужен. Нам нужно только передать полученные координаты в пользовательский интерфейс нашей карты, чтобы изменить местоположение, на котором центрируется карта.

Поэтому вместо emit давайте воспользуемся функцией dispatchBrowserEvent в Livewire:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="php" class="language-php">/* \App\Http\Livewire\MapSearchBox */
public function search()
{
    /* Get coordinates */

    // Dispatch event to the page
+  $this-&gt;dispatchBrowserEvent( 'updatedMapLocation',[
+    'lat' =&gt; $coordinates-&gt;getLatitude(),
+    'lng' =&gt; $coordinates-&gt;getLongitude()
+  ]);
}
</code></pre>
<!-- /wp:code -->

Событие окна браузера, updatedMapLocation от MapSearchBox, передается на текущую страницу, где все доступные компоненты могут прослушать его. Поскольку представление нашего компонента Map также находится на этой странице, он может легко прослушать отправленное событие и перецентрировать местоположение на основе полученных координат:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="php" class="language-php">/* \app\resources\views\livewire\ */
&lt;script&gt;
// Listen to location update from search box
window.addEventListener('updatedMapLocation',function(e){
    // Defer set lat long values of component
    @this.set( 'lat', e.detail.lat, true);
    @this.set( 'lng', e.detail.lng, true);

    // Translate to Google coord
    let coord = new google.maps.LatLng(e.detail.lat, e.detail.lng);

    // Re-center map
    map.setCenter( coord );
});
</code></pre>
<!-- /wp:code -->

Это занимает всего один запрос к компоненту MapSearchBox для обработки координат из заданной пользователем строки и обновления представления компонента карты для повторного центрирования местоположения - замечательно!

<h2 class="wp-block-heading" id="пересмотр-компонента-maps-для-маркировки-булавками">Пересмотр компонента Maps для маркировки булавками</h2>

Важной функциональностью элементов карты является их функция “Pin Dropping”, позволяющая пользователям отмечать места на карте. Для этого нам понадобится слушатель события click в нашем элементе карты:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="php" class="language-php">let map;

// Dictionary of markers, each marker identified by its lat lng string
+  let markers = {}; 

async function initMap() {
  /* Map initialization logic here... */

  // Add marker listener
+  map.addListener("click", (mapsMouseEvent) =&gt; {
      // Get coordinates 
      let coord = mapsMouseEvent.latLng.toJSON();

      // Generate id based on lat lng to record marker
      let id = coord.lat.toString()+coord.lng.toString();

      // Add Marker to coordinate clicked on, identified by id
      markershttps://fly.io/laravel-bytes/map-livewire/ = new google.maps.Marker({
          position: mapsMouseEvent.latLng,
          map,
          title: "Re-Click to Delete",
      });

      // Delete marker on re-click
      markershttps://fly.io/laravel-bytes/map-livewire/.addListener("click", () =&gt; {
          markershttps://fly.io/laravel-bytes/map-livewire/.setMap(null);
          delete markers.id;
      });
  });
});  
</code></pre>
<!-- /wp:code -->

Шаг за шагом, что происходит выше? Во-первых, мы добавляем словарь JavaScript под названием markers для хранения ссылок на уникально идентифицированные маркеры местоположения в представлении компонента Map. Затем мы перерабатываем функцию initMap(), чтобы перехватывать события щелчка на карте.

Для каждого места, на котором был сделан щелчок, мы получаем координаты, генерируем уникальный идентификатор на основе этих координат и присваиваем этот уникальный идентификатор в качестве ключа в словаре markers, устанавливая его значение как ссылку на новый маркер Google Map. Мы также добавляем слушателя при нажатии на каждый новый маркер, чтобы по желанию удалять его при повторном нажатии.

В следующем разделе мы перейдем ко второму способу обмена данными, фильтруя вышеуказанные маркеры с помощью отдельного компонента фильтра.

<h2 class="wp-block-heading" id="создание-компонента-фильтра">Создание компонента фильтра</h2>

Допустим, нам нужен способ массового удаления маркеров карты в компоненте Map на основе условий фильтрации с сервера. Для этого мы можем добавить компонент: php artisan make:livewire map-marker-filter.

В этом примере мы будем удалять маркеры, которые не находятся в пределах ”области”. Мы будем использовать эти опции "области" для фильтрации маркеров карты. Чтобы получить эти параметры, мы можем объявить их в компоненте MapMarkerFilter:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="php" class="language-php">/* \App\Http\Livewire\MapMarkerFilter */

class MapMarkerFilter extends Component
{
    public $options = [
        ['id'=&gt;1, 'label'=&gt;'Area1'],
        ['id'=&gt;2, 'label'=&gt;'Area2'],
    ];
</code></pre>
<!-- /wp:code -->

Мы можем предоставить эти ”фильтры области” в качестве $options в элементе select в представлении:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="php" class="language-php">/* app\resources\views\livewire\map-marker-filter.blade.php */
&lt;div&gt;
  &lt;select id="area" onchange="filterChange( this )"&gt;
    &lt;option&gt;Select an Area&lt;/option&gt;
    @foreach( $options as $opt )
        &lt;option value="{{ $opt['id'] }}"&gt;
        {{ $opt['label'] }}
        &lt;/option&gt;
    @endforeach
  &lt;/select&gt;
&lt;/div&gt;
</code></pre>
<!-- /wp:code -->

Когда новый фильтр выбран, мы отправим две вещи компоненту MapMarkerFilter на сервере: 1️⃣the значение выбранного параметра, и, 2️⃣the список координат из словаря маркеров JavaScript.

<h2 class="wp-block-heading" id="обмен-данными-через-переменные-java-script">Обмен данными через переменные JavaScript</h2>

Мы можем легко получить опцию 1️⃣selected при изменении, поскольку она находится в нашем текущем компоненте MapMarkerFilter. Но как насчет JS-переменной 2️⃣markers, хранящей наши булавки, которые находятся в представлении карты? Она объявлена в другом компоненте, так как же нам передать ее текущему представлению MapMarkerFilter?

Чтобы передать список маркеров из Map в MapMarkerFilter, давайте попробуем использовать прямой подход: посмотрим, в какой области видимости доступна переменная markers. Будучи объявленной в JavaScript представления компонента Map, посмотрим, можем ли мы получить это значение из JavaScript MapMarkerFilter.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="php" class="language-php">/* app\resources\views\livewire\map-marker-filter.blade.php */
&lt;script&gt;
  function filterChange( objVal ){
      let filterId = objVal.value;
  +   let coords = Object.keys(markers);
  +   console.log( coords );
  +   @this.filterMarkers( filterId, coords );
  }
&lt;/script&gt;
</code></pre>
<!-- /wp:code -->

Сохраните изменения и выберите вариант из фильтра…и. И - работает! Мы действительно имеем доступ к маркеру JS переменной Map из MapMarkerFilter! Здесь нет ничего удивительного. Это переменные JavaScript, доступные для других скриптов на той же странице:<img src="https://fly.io/laravel-bytes/2023-04-20/img_1.png" alt="">

Обратите внимание на утверждение @this.filterMarkers(). Это встроенный способ вызова метода компонента из JavaScript представления. В приведенном выше случае две переменные, filterId и coords, из JavaScript представления отправляются в метод filterMarkers() в компоненте:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="php" class="language-php">public function filterMarkers( $filterId, $coords )
{
    // Using filterId, get marker ids that should be removed from the map
    $toRemove = (new \App\Http\Services\MapMarkerFilter)
    -&gt;getCoordsToRemove( $filterId, $coords );

    // Send this back to the view
    $this-&gt;dispatchBrowserEvent( 'removeMarkers', [
        'coords' =&gt; $toRemove
    ]);
}   
</code></pre>
<!-- /wp:code -->

Из этого метода мы можем использовать выбранный $filterId, чтобы определить, какие маркеры в списке $coordinates должны быть удалены из представления карты.

Как только мы определили координаты маркеров для удаления, мы можем использовать еще один вызов dispatchBrowserEvent для передачи события removeMarkers обратно на страницу клиента. Наши маркеры находятся в компоненте Map, поэтому из JavaScript его представления добавим слушателя этого события и удалим указанный идентификатор маркеров, отправленный из события:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="php" class="language-php">/* app\resources\views\livewire\map.blade.php */

/* Listen to location update from search box */
window.addEventListener('removeMarkers',function(e){
    // Delete each cooordinate by id
    for( i in e.detail.coords ){
        let id = e.detail.coords[i];
        markershttps://fly.io/laravel-bytes/map-livewire/.setMap(null);
        delete markershttps://fly.io/laravel-bytes/map-livewire/;
    }
});
</code></pre>
<!-- /wp:code -->

<h2 class="wp-block-heading" id="финал-формы">Финал формы</h2>

В финале формы мы передадим все введенные пользователем данные из каждого компонента, которые мы объявили выше: ключевое слово поиска из компонента Search, выбранный вариант фильтра из компонента Filter и, наконец, маркеры карты, выбранные в компоненте Map.

Давайте создадим компонент формы с помощью php artisan make:livewire map-form. Для его вида мы просто включим все остальные компоненты, которые мы создали, с дополнительной кнопкой:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="php" class="language-php">&lt;!--app\resources\views\livewire\map-form.blade.php--&gt;
&lt;div&gt; 
  &lt;h1&gt;Form&lt;/form&gt;
  &lt;form wire:submit.prevent="submit"&gt;
      &lt;div class="flex flex-row justify-between"&gt;
          &lt;livewire:map-search-box /&gt;
          &lt;livewire:map-territory-filter /&gt;
      &lt;/div&gt;

      &lt;livewire:map /&gt;
      &lt;button type="submit" class="btn btn-primary"&gt;Submit&lt;/button&gt;
  &lt;/form&gt;
&lt;/div&gt;
</code></pre>
<!-- /wp:code -->

Теперь мы можем определенно сделать сигнал emit submit от родителя, который будут слушать все дочерние компоненты и выдавать свои значения в ответ на него:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="php" class="language-php">/* App\Http\Livewire\MapForm.php */
public function submit(): void
{
    $this-&gt;emit('submit');
}

/* App\Http\Livewire\&lt;somechildcomponenthere&gt; */
// Listen to submit from parent
public $listeners = [
    'submit' 
];

public function submit(): void
{
    $this-&gt;emitUp('map-form', $this-&gt;valueNeedToPass);
}
</code></pre>
<!-- /wp:code -->

Но. Это будет тонна запросов, один запрос от формы, и два запроса к каждому слушающему компоненту (1. для получения родительского события emit, и 2. для отправки значения родительскому компоненту). Ай-яй-яй.

Ладно, поскольку вышеописанное не так уж и экономно, давайте попробуем другой подход к обмену данными, не так ли?

<h2 class="wp-block-heading" id="совместное-использование-данных-через-селектор-запросов-html-элемента">Совместное использование данных через селектор запросов HTML-элемента</h2>

Подобно тому, как js-переменные доступны от одного компонента к другому компоненту на той же странице, так и html-элементы! Итак, мы просто получаем значения элементов ввода из компонентов MapSearch и MapMarkerFilter в JavaScript нашей формы MapForm.

Сначала измените элемент формы, чтобы вызвать JS-функцию:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="php" class="language-php">&lt;!--app\resources\views\livewire\map-form.blade.php--&gt;

- &lt;form wire:submit.prevent="submit"&gt;
+ &lt;form onsubmit="return process()"&gt;
</code></pre>
<!-- /wp:code -->

Затем обязательно добавьте идентификатор к их элементам ввода:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="php" class="language-php">&lt;!--app\resources\views\livewire\map-search-box.blade.php--&gt;
&lt;input id="searchString" type="text" placeholder="Location" wire:model.defer="address" /&gt;

&lt;!--app\resources\views\livewire\map-marker-filter.blade.php--&gt;
&lt;select id="filterId" onchange="filterChange( this )"&gt;
</code></pre>
<!-- /wp:code -->

Поскольку маркеры доступны как переменная на текущей странице, мы можем просто вызвать ее и из JavaScript MapForm:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="php" class="language-php">function process()
{
  // Get Search keyword
  @this.set( 'searchKey', document.getElementById('searchId').value, true );

  // Get Selected Filter option
  @this.set( 'filterId', document.getElementById('filterId').value, true );

  // Get markers keys list, as the key themselves are the coordinates
  @this.set( 'coords', Object.keys(markerList), true );

  // Trigger Submit
  @this.submit();

  return false;
}
</code></pre>
<!-- /wp:code -->

Затем просто определите метод submit в нашем компоненте MapForm:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="php" class="language-php">/* \App\Http\Livewire\MapForm.php*/

public $searchKey;
public $filterId;
public $coords;

public function submit()
{
    // Validate entries
    $this-&gt;validate([
      'searchKey' =&gt; 'string',
      'filterId'  =&gt; 'numeric',
      'coords'    =&gt; 'required',
    ]);

    // Do processing

    // Redirect 
}
</code></pre>
<!-- /wp:code -->

Прежде чем вызвать метод submit() на сервере, мы сначала установили значения $searchKey, $filterId и $coords из разных компонентов через выборку запроса и переменные JavaScript. И теперь эти значения из отдельных компонентов находятся в нашем родительском компоненте MapForm!

<h2 class="wp-block-heading" id="возможности-обучения">Возможности обучения</h2>

Итак, что мы узнали сегодня?

-Возможности!

Мы узнали о четырех различных, полезных для пользователя возможностях обмена данными между компонентами Livewire.

И хотя не все они являются чисто специфическими для Livewire подходами, они довольно хорошо справляются со своей задачей в конкретных областях применения. Попробуйте их как-нибудь!
