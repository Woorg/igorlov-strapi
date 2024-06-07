---
title: Создание ролика для игры в кости с помощью Three.js и Cannon-es
meta_title: Создание ролика для игры в кости с помощью Three.js и Cannon-es - Igor Gorlov
description: >-
  В этом руководстве мы проведем вас через процесс создания интерактивного
  3D-ролика из игральных костей, используя библиотеки JavaScript Three.js для
  создания 3D-графики и cannon-es для добавления взаимодействия.
date: 2023-01-29T18:30:00.000Z
author: ''
image: ../../assets/images/undefined-Jan-29-2023.avif
categories:
  - Учебник
tags:
  - 3d
  - cannon-es
  - three.js
  - webgl
draft: false
lastmod: 2024-03-20T21:26:49.002Z
---

<!-- wp:image {"linkDestination":"custom"} -->
<figure class="wp-block-image"><a href="http://tympanus.net/Tutorials/DiceRoller/"><img src="https://i7x7p5b7.stackpathcdn.com/codrops/wp-content/uploads/2023/01/diceroller-1.jpg" alt=""/></a></figure>
<!-- /wp:image -->

В этом руководстве мы проведем вас через процесс создания интерактивного 3D-ролика из игральных костей, используя библиотеки JavaScript Three.js для создания 3D-графики и cannon-es для добавления взаимодействия. Мы начнем с создания кубиков с помощью модифицированной BoxGeometry без использования текстур, шейдеров или внешних 3D-моделей. Затем мы будем использовать cannon-es для включения физики, имитации броска кости и определения стороны приземления.

<!-- wp:rank-math/toc-block {"title":"Оглавление","headings":[{"key":"845bdb06-a7bd-4b76-bafe-5136247a846b","content":"Кодирование кубиков","level":2,"link":"#кодирование-кубиков","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"166b2477-9877-484a-8a31-361f9588708e","content":"Закругление краев коробки","level":3,"link":"#закругление-краев-коробки","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"d3ffeff4-e66a-4ad8-a9e3-cdfbda6fd8b8","content":"Обновление нормалей","level":3,"link":"#обновление-нормалей","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"d976d3db-1f9f-459a-9639-6130bc2e7247","content":"Нанесение насечек по бокам","level":3,"link":"#нанесение-насечек-по-бокам","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"cbfebd21-8b68-4950-8cf7-ea05606ee9d0","content":"Нанесение цвета","level":3,"link":"#нанесение-цвета","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"4d07cb4f-5785-49aa-a883-ab5de7c1bcdb","content":"Выбор инструмента анимации","level":2,"link":"#выбор-инструмента-анимации","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"f1912078-0103-4bd6-b505-4ac435d66023","content":"Three.js сцена и физический мир","level":2,"link":"#three-js-сцена-и-физический-мир","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"0c9248b6-c1f8-43d3-9fa0-f23ac9748adc","content":"Анимирование кубиков","level":2,"link":"#анимирование-кубиков","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"074cee85-a714-4e15-a4e1-0473c7c9116e","content":"Проверка верхней стороны","level":2,"link":"#проверка-верхней-стороны","disable":false,"isUpdated":false,"isGeneratedLink":true}],"listStyle":"ul"} -->
<div class="wp-block-rank-math-toc-block" id="rank-math-toc"><h2>Оглавление</h2><nav><ul><li class=""><a href="#кодирование-кубиков">Кодирование кубиков</a><ul><li class=""><a href="#закругление-краев-коробки">Закругление краев коробки</a></li><li class=""><a href="#обновление-нормалей">Обновление нормалей</a></li><li class=""><a href="#нанесение-насечек-по-бокам">Нанесение насечек по бокам</a></li><li class=""><a href="#нанесение-цвета">Нанесение цвета</a></li></ul></li><li class=""><a href="#выбор-инструмента-анимации">Выбор инструмента анимации</a></li><li class=""><a href="#three-js-сцена-и-физический-мир">Three.js сцена и физический мир</a></li><li class=""><a href="#анимирование-кубиков">Анимирование кубиков</a></li><li class=""><a href="#проверка-верхней-стороны">Проверка верхней стороны</a></li></ul></nav></div>
<!-- /wp:rank-math/toc-block -->

<h2 class="wp-block-heading" id="кодирование-кубиков">Кодирование кубиков</h2>

Конечно, можно найти готовую модель кубика в интернете или создать ее в Blender, но давайте сделаем ее программно с помощью Three.js. В конце концов, мы же здесь учимся 🙂 .

Геометрия кубика будет основана на THREE.BoxGeometry, но изменена, чтобы скруглить углы коробки и добавить выемки на гранях.

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="закругление-краев-коробки">Закругление краев коробки</h3>

Скругление углов коробки - довольно распространенная задача, поэтому для нее существует множество решений. Одно из таких решений включено в пакет Three.js: RoundedBoxGeometry расширяет класс BoxGeometry и может быть найден в папке examples/jsm/geometries/.

Класс RoundedBoxGeometry работает для любого размера коробки и предоставляет настраиваемую геометрию с включенным UV и нормалями. Если вам не нужны дополнительные модификации геометрии, RoundedBoxGeometry, скорее всего, будет идеальным решением ”из коробки" (ba dum tss!).

RoundedBoxGeometry позволяет задать количество сегментов для закругленной области, но плоские поверхности всегда строятся с одной парой треугольников.

<!-- wp:image {"id":69639} -->
<figure class="wp-block-image"><img src="https://i7x7p5b7.stackpathcdn.com/codrops/wp-content/uploads/2023/01/rounded-box-provided-1-400x240.png" alt="" class="wp-image-69639"/><figcaption class="wp-element-caption"><code>RoundedBoxGeometry</code></figcaption></figure>
<!-- /wp:image -->

Из-за этого ограничения мы не можем добавить выемки на стороны коробки, поэтому мы создаем собственное решение для скругления граней.

За основу мы берем куб как BoxGeometry с приличным количеством сегментов.

<!-- wp:code {"lineNumbers":true} -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript line-numbers">const params = {
    segments: 50,
    edgeRadius: .07
};

let boxGeometry = new THREE.BoxGeometry(1, 1, 1, params.segments, params.segments, params.segments);</code></pre>
<!-- /wp:code -->

<!-- wp:image {"id":69584} -->
<figure class="wp-block-image"><img src="https://i7x7p5b7.stackpathcdn.com/codrops/wp-content/uploads/2023/01/rounded-box-1-400x210.png" alt="" class="wp-image-69584"/><figcaption class="wp-element-caption">BoxGeometry</figcaption></figure>
<!-- /wp:image -->

Практически, изменение геометрии означает перебор вершин бокса для доступа к координатам XYZ в массиве boxGeometry.attributes.position. После изменения координат XYZ они могут быть повторно применены к атрибуту position.

<!-- wp:code {"lineNumbers":true} -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript line-numbers">function createDiceGeometry() {
    let boxGeometry = new THREE.BoxGeometry(1, 1, 1, params.segments, params.segments, params.segments);
    const positionAttribute = boxGeometry.attributes.position;

    for (let i = 0; i &lt; positionAttribute.count; i++) {

        let position = new THREE.Vector3().fromBufferAttribute(positionAttribute, i);

        // modify position.x, position.y and position.z

        positionAttribute.setXYZ(i, position.x, position.y, position.z);
    }

    return boxGeometry;
}</code></pre>
<!-- /wp:code -->

Обратите внимание, что мы не кодируем универсальное решение, как RoundedBoxGeometry. Поскольку мы создаем кубическую форму, мы охватываем только случай, когда все стороны коробки равны 1. Мы также не утруждаем себя вычислением UV-координат, поскольку на кубик не нужно накладывать текстуру.

Начнем с выбора координат (положений вершин), которые находятся близко к граням коробки. Поскольку сторона коробки равна 1, мы знаем, что координаты X, Y и Z изменяются от -0,5 до 0,5.

Если все три координаты вершин близки к -0,5 или 0,5, то вершина геометрии близка к вершине коробки (постараемся не путать вершины геометрии, которые мы изменяем, с восемью вершинами коробки, которые мы округляем).

<!-- wp:image {"id":69585} -->
<figure class="wp-block-image"><img src="https://i7x7p5b7.stackpathcdn.com/codrops/wp-content/uploads/2023/01/rounded-box-2-400x239.png" alt="" class="wp-image-69585"/><figcaption class="wp-element-caption">all x, y, and z are close to 0.5 or -0.5</figcaption></figure>
<!-- /wp:image -->

Если только 2 из 3 координат близки к -0,5 или 0,5, геометрическая вершина находится близко к краю коробки. Другие вершины сохраняют исходное положение. Например, если координаты X и Y близки к -0,5 или 0,5, вершина находится близко к краю, параллельному оси Z.

<!-- wp:image {"id":69586} -->
<figure class="wp-block-image"><img src="https://i7x7p5b7.stackpathcdn.com/codrops/wp-content/uploads/2023/01/rounded-box-3-400x239.png" alt="" class="wp-image-69586"/><figcaption class="wp-element-caption">only x and y are close to 0.5 or -0.5</figcaption></figure>
<!-- /wp:image -->

Таким образом, мы выбираем все вершины геометрии, которые должны быть изменены:

<!-- wp:code {"lineNumbers":true} -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript line-numbers">function createDiceGeometry() {
    // ...

    const subCubeHalfSize = .5 - params.edgeRadius;

    for (let i = 0; i &lt; positionAttribute.count; i++) {

        // ...

        if (Math.abs(position.x) &gt; subCubeHalfSize &amp;&amp; Math.abs(position.y) &gt; subCubeHalfSize &amp;&amp; Math.abs(position.z) &gt; subCubeHalfSize) {
            // position is close to box vertex
        } else if (Math.abs(position.x) &gt; subCubeHalfSize &amp;&amp; Math.abs(position.y) &gt; subCubeHalfSize) {
            // position is close to box edge that's parallel to Z axis
        } else if (Math.abs(position.x) &gt; subCubeHalfSize &amp;&amp; Math.abs(position.z) &gt; subCubeHalfSize) {
            // position is close to box edge that's parallel to Y axis
        } else if (Math.abs(position.y) &gt; subCubeHalfSize &amp;&amp; Math.abs(position.z) &gt; subCubeHalfSize) {
            // position is close to box edge that's parallel to X axis
        }

        // ...
    }

    // ...
}</code></pre>
<!-- /wp:code -->

Сначала давайте округлим вершины геометрии, которые находятся рядом с вершинами коробки. Мы хотим заменить их исходное положение координатой XYZ, лежащей на сфере, расположенной в углу коробки.

<!-- wp:image {"id":69587} -->
<figure class="wp-block-image"><img src="https://i7x7p5b7.stackpathcdn.com/codrops/wp-content/uploads/2023/01/rounded-box-4-400x214.png" alt="" class="wp-image-69587"/></figure>
<!-- /wp:image -->

Чтобы преобразовать вектор положения таким образом, мы разбиваем его на две составляющие:

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li><code>subCube - вектор, указывающий на бокс, радиус которого меньше исходного путем округления.</code></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><code>дополнение - остаток вектора положения</code></li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:code {"lineNumbers":true} -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript line-numbers">for (let i = 0; i &lt; positionAttribute.count; i++) {

    const subCubeHalfSize = .5 - params.edgeRadius;
    
    // ...

    const subCube = new THREE.Vector3(
        Math.sign(position.x),
        Math.sign(position.y),
        Math.sign(position.z)
    ).multiplyScalar(subCubeHalfSize);

    const addition = new THREE.Vector3().subVectors(position, subCubeEdges);

    // ...
}</code></pre>
<!-- /wp:code -->

<!-- wp:image {"id":69588} -->
<figure class="wp-block-image"><img src="https://i7x7p5b7.stackpathcdn.com/codrops/wp-content/uploads/2023/01/rounded-box-5-400x214.png" alt="" class="wp-image-69588"/><figcaption class="wp-element-caption">subCube vector in purple, addition vector in black</figcaption></figure>
<!-- /wp:image -->

Исходное положение вершины представляет собой сумму векторов subCube и addition. Мы оставляем subCube без изменений, так как он указывает на центр сферы. Вектор сложения мы нормализуем, чтобы он указывал на сферу с радиусом = 1

<!-- wp:image {"id":69589} -->
<figure class="wp-block-image"><img src="https://i7x7p5b7.stackpathcdn.com/codrops/wp-content/uploads/2023/01/rounded-box-6-400x298.png" alt="" class="wp-image-69589"/><figcaption class="wp-element-caption">subCube vector in purple, addition vector in black</figcaption></figure>
<!-- /wp:image -->

… и умножить его на значение радиуса округления, чтобы переместить координату на нужную сферу.

<!-- wp:image {"id":69590} -->
<figure class="wp-block-image"><img src="https://i7x7p5b7.stackpathcdn.com/codrops/wp-content/uploads/2023/01/rounded-box-7-400x218.png" alt="" class="wp-image-69590"/><figcaption class="wp-element-caption">subCube vector in purple, addition vector in black</figcaption></figure>
<!-- /wp:image -->

<!-- wp:code {"lineNumbers":true} -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript line-numbers">for (let i = 0; i &lt; positionAttribute.count; i++) {

    // ...

    const subCube = new THREE.Vector3(Math.sign(position.x), Math.sign(position.y), Math.sign(position.z)).multiplyScalar(subCubeHalfSize);
    const addition = new THREE.Vector3().subVectors(position, subCube);

    if (Math.abs(position.x) &gt; subCubeHalfSize &amp;&amp; Math.abs(position.y) &gt; subCubeHalfSize &amp;&amp; Math.abs(position.z) &gt; subCubeHalfSize) {
        // position is close to box vertex
        addition.normalize().multiplyScalar(params.edgeRadius);
        position = subCube.add(addition);
    }
    
    // ...
}</code></pre>
<!-- /wp:code -->

С помощью приведенного выше кода мы можем обогнуть все вершины куба.

<!-- wp:image {"id":69591} -->
<figure class="wp-block-image"><img src="https://i7x7p5b7.stackpathcdn.com/codrops/wp-content/uploads/2023/01/rounded-box-8-400x218.png" alt="" class="wp-image-69591"/></figure>
<!-- /wp:image -->

Тот же подход работает для краев коробки. Например, возьмем вершины геометрии, которые находятся рядом с краями бокса параллельно оси Z. Их position.z уже правильная, поэтому нужно изменить только координаты X и Y. Другими словами,

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li><code>position.z не изменяется</code></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><code>addition.z должен быть установлен в ноль перед нормализацией вектора сложения</code></li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:image {"id":69592} -->
<figure class="wp-block-image"><img src="https://i7x7p5b7.stackpathcdn.com/codrops/wp-content/uploads/2023/01/rounded-box-9-400x218.png" alt="" class="wp-image-69592"/><figcaption class="wp-element-caption">subCube vector in purple, addition vector in black</figcaption></figure>
<!-- /wp:image -->

Повторив это для других осей, мы получим геометрию округлого куба.

<!-- wp:code {"lineNumbers":true} -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript line-numbers">let position = new THREE.Vector3().fromBufferAttribute(positionAttribute, i);

const subCube = new THREE.Vector3(Math.sign(position.x), Math.sign(position.y), Math.sign(position.z)).multiplyScalar(subCubeHalfSize);
const addition = new THREE.Vector3().subVectors(position, subCube);

if (Math.abs(position.x) &gt; subCubeHalfSize &amp;&amp; Math.abs(position.y) &gt; subCubeHalfSize &amp;&amp; Math.abs(position.z) &gt; subCubeHalfSize) {
    addition.normalize().multiplyScalar(params.edgeRadius);
    position = subCube.add(addition);
} else if (Math.abs(position.x) &gt; subCubeHalfSize &amp;&amp; Math.abs(position.y) &gt; subCubeHalfSize) {
    addition.z = 0;
    addition.normalize().multiplyScalar(params.edgeRadius);
    position.x = subCube.x + addition.x;
    position.y = subCube.y + addition.y;
} else if (Math.abs(position.x) &gt; subCubeHalfSize &amp;&amp; Math.abs(position.z) &gt; subCubeHalfSize) {
    addition.y = 0;
    addition.normalize().multiplyScalar(params.edgeRadius);
    position.x = subCube.x + addition.x;
    position.z = subCube.z + addition.z;
} else if (Math.abs(position.y) &gt; subCubeHalfSize &amp;&amp; Math.abs(position.z) &gt; subCubeHalfSize) {
    addition.x = 0;
    addition.normalize().multiplyScalar(params.edgeRadius);
    position.y = subCube.y + addition.y;
    position.z = subCube.z + addition.z;
}</code></pre>
<!-- /wp:code -->

<!-- wp:image {"id":69593} -->
<figure class="wp-block-image"><img src="https://i7x7p5b7.stackpathcdn.com/codrops/wp-content/uploads/2023/01/rounded-box-10-400x218.png" alt="" class="wp-image-69593"/><figcaption class="wp-element-caption">vertices of rounded box</figcaption></figure>
<!-- /wp:image -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="обновление-нормалей">Обновление нормалей</h3>

Часто для обновления нормалей достаточно просто вызвать computeVertexNormals() после модификации вершин геометрии. Метод вычисляет нормаль для каждой вершины путем усреднения нормалей соседних граней (граней, которые разделяют эту вершину). Это очень простой способ сгладить геометрию, если только геометрия не имеет дублирующихся вершин.

Обычно 1+ вершин геометрии располагаются на одной и той же позиции, в основном для поддержания UV и нормальных атрибутов. Например, возьмем THREE.CylinderGeometry. Боковая поверхность имеет шов, который виден на левом рисунке. Есть два набора вершин, расположенных на этой вертикальной линии шва. Дублированные вершины имеют одинаковое положение и одинаковую нормаль, но разные UV-атрибуты. Первый набор вершин связан с гранями слева от линии шва (UV.x = 1), а второй набор вершин связан с гранями справа от шва (UV.x = 0). Дублирование вершин необходимо для правильного обертывания текстуры вокруг стороны и, в случае цилиндра, для поддержки параметраtaLength.<br>Конечно, THREE.CylinderGeometry идет с правильно рассчитанными нормалями, как вы видите на центральной картинке.

<!-- wp:image {"id":69630} -->
<figure class="wp-block-image"><img src="https://i7x7p5b7.stackpathcdn.com/codrops/wp-content/uploads/2023/01/3xcylinder-800x267.png" alt="" class="wp-image-69630"/><figcaption class="wp-element-caption"><code>CylinderGeometry</code> with texture (left), original normals (center), automatically recalculated normals (right)</figcaption></figure>
<!-- /wp:image -->

Но если мы вызовем cylinder.geometry.computeVertexNormals() (даже без изменения геометрии), нормали станут такими, как показано на правом рисунке. Средние нормали граней отличаются для левого и правого набора дублированных вершин.

<!-- wp:code {"lineNumbers":true} -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript line-numbers">const material = new THREE.MeshNormalMaterial({});
const cylinder = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 2, 9), material);
// here normals are correct (central pic)

cylinder.geometry.computeVertexNormals();
// here normals have a seam (right pic)</code></pre>
<!-- /wp:code -->

THREE.BoxGeometry также имеет дублированные вершины на коробке. Они расположены на гранях коробки. Вот почему мы можем легко наложить текстуры на каждую сторону коробки… и вот почему у нас возникает аналогичная проблема со швами.

На рисунке ниже показаны исходные нормали бокса на измененной геометрии

<!-- wp:image {"id":69919} -->
<figure class="wp-block-image"><img src="https://i7x7p5b7.stackpathcdn.com/codrops/wp-content/uploads/2023/01/wireframes-and-original-nirmals-400x190.png" alt="" class="wp-image-69919"/></figure>
<!-- /wp:image -->

При наличии дополнительных вершин на гранях коробки функция computeVertexNormals() не дает правильного результата.

<!-- wp:image {"id":69920} -->
<figure class="wp-block-image"><img src="https://i7x7p5b7.stackpathcdn.com/codrops/wp-content/uploads/2023/01/cube-normals-ill-3-315x300.png" alt="" class="wp-image-69920"/></figure>
<!-- /wp:image -->

Чтобы исправить швы, необходимо удалить все дублирующиеся вершины перед вызовом computeVertexNormals(). Это можно легко сделать с помощью метода mergeVertices(), который предназначен для удаления вершин с одинаковым набором атрибутов. Дублированные вершины имеют атрибуты normal и uv, унаследованные от BoxGeometry, которые мы удаляем. После этого у дублированных вершин остается только атрибут position, и вершины с одинаковой позицией могут быть автоматически объединены.

<!-- wp:image {"id":69921} -->
<figure class="wp-block-image"><img src="https://i7x7p5b7.stackpathcdn.com/codrops/wp-content/uploads/2023/01/cube-normals-ill-4-315x300.png" alt="" class="wp-image-69921"/></figure>
<!-- /wp:image -->

P.S. Чтобы исправить нормали округлого куба, можно также просто повторно использовать вектор сложения вместо слияния вершин и повторного вычисления нормалей:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">const normalAttribute = boxGeometry.attributes.normal;
// ...
normalAttribute.setXYZ(i, addition.x, addition.y, addition.z);</code></pre>
<!-- /wp:code -->

Это простое и элегантное решение, но мы хотим автоматически обновлять нормали после следующего изменения геометрии. Поэтому в сегодняшнем проекте мы используем комбинацию mergeVertices() и computeVertexNormals().

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="нанесение-насечек-по-бокам">Нанесение насечек по бокам</h3>

Следующим шагом будет добавление от одного до шести гладких углублений на стороны куба. Для начала добавим одну в центр верхней стороны. Мы можем выбрать вершины верхней стороны, просто проверив, равно ли значение position.y 0,5. Для выбранных вершин мы уменьшим position.y на высоту выемки.

Сложность заключается в расчете формы выемки. Давайте сначала подумаем о двумерном пространстве и сформируем центрированный симметричный гладкий импульс по координатам XY.

Первый шаг - функция косинуса для волны с пиком в точке x = 0.

<!-- wp:image {"id":69711} -->
<figure class="wp-block-image"><img src="https://i7x7p5b7.stackpathcdn.com/codrops/wp-content/uploads/2023/01/graph-1-1-400x226.png" alt="" class="wp-image-69711"/></figure>
<!-- /wp:image -->

Затем превратите его в положительное число, прибавив к Y 1.

<!-- wp:image {"id":69712} -->
<figure class="wp-block-image"><img src="https://i7x7p5b7.stackpathcdn.com/codrops/wp-content/uploads/2023/01/graph-4-1-400x226.png" alt="" class="wp-image-69712"/></figure>
<!-- /wp:image -->

Период косинуса равен 2 x π, то есть центральная волна начинается в точке x = -π и заканчивается в точке x = π. Удобнее было бы иметь его от -1 до 1, поэтому мы умножаем x на π.

<!-- wp:image {"id":69713} -->
<figure class="wp-block-image"><img src="https://i7x7p5b7.stackpathcdn.com/codrops/wp-content/uploads/2023/01/graph-3-1-400x226.png" alt="" class="wp-image-69713"/></figure>
<!-- /wp:image -->

Поскольку нам нужна только одна волна в центре, мы ограничиваем значение x от -1 до 1.

<!-- wp:image {"id":69714} -->
<figure class="wp-block-image"><img src="https://i7x7p5b7.stackpathcdn.com/codrops/wp-content/uploads/2023/01/graph-2-1-400x226.png" alt="" class="wp-image-69714"/></figure>
<!-- /wp:image -->

Отлично! Импульс может быть параметризован переменными PULSE_WIDTH и PULSE_DEPTH, и именно так мы используем его для выемки кубика.

<!-- wp:embed {"url":"https://codepen.io/ksenia-k/pen/VwBMNQN","type":"wp-embed","providerNameSlug":"codepen","align":"full"} -->
<figure class="wp-block-embed alignfull is-type-wp-embed is-provider-codepen wp-block-embed-codepen"><div class="wp-block-embed__wrapper">
https://codepen.io/ksenia-k/pen/VwBMNQN
</div></figure>
<!-- /wp:embed -->

Преобразовать форму в трехмерное пространство довольно просто. Двумерная волна определяет Y как функцию X. Чтобы сделать Y функцией и X, и Z, мы просто перемножим две волны - первую, взятую как функцию X, и вторую, как функцию Z.

<!-- wp:code {"lineNumbers":true} -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript line-numbers">const notchWave = (v) =&gt; {
    v = (1 / params.notchRadius) * v;
    v = Math.PI * Math.max(-1, Math.min(1, v));
    return params.notchDepth * (Math.cos(v) + 1.);
}
const notch = (pos) =&gt; notchWave(pos[0]) * notchWave(pos[1]);</code></pre>
<!-- /wp:code -->

Итак, для верхней стороны мы вычитаем значение notch([position.x, position.z]) из position.y, и аналогично для других сторон коробки. Поскольку наш импульс центрирован в точке (0, 0), мы можем сместить надсечки по боковой поверхности, добавив смещение к аргументам функции notch.

<!-- wp:code {"lineNumbers":true} -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript line-numbers">const offset = .23;

if (position.y === .5) {
    position.y -= notch([position.x, position.z]);
} else if (position.x === .5) {
    position.x -= notch([position.y + offset, position.z + offset]);
    position.x -= notch([position.y - offset, position.z - offset]);
} else if (position.z === .5) {
    position.z -= notch([position.x - offset, position.y + offset]);
    position.z -= notch([position.x, position.y]);
    position.z -= notch([position.x + offset, position.y - offset]);
} else if (position.z === -.5) {
    position.z += notch([position.x + offset, position.y + offset]);
    position.z += notch([position.x + offset, position.y - offset]);
    position.z += notch([position.x - offset, position.y + offset]);
    position.z += notch([position.x - offset, position.y - offset]);
} else if (position.x === -.5) {
    position.x += notch([position.y + offset, position.z + offset]);
    position.x += notch([position.y + offset, position.z - offset]);
    position.x += notch([position.y, position.z]);
    position.x += notch([position.y - offset, position.z + offset]);
    position.x += notch([position.y - offset, position.z - offset]);
} else if (position.y === -.5) {
    position.y += notch([position.x + offset, position.z + offset]);
    position.y += notch([position.x + offset, position.z]);
    position.y += notch([position.x + offset, position.z - offset]);
    position.y += notch([position.x - offset, position.z + offset]);
    position.y += notch([position.x - offset, position.z]);
    position.y += notch([position.x - offset, position.z - offset]);
}</code></pre>
<!-- /wp:code -->

Мы вставляем этот код после первого изменения geometryBase.attributes.position и получаем готовую сетку кубиков.

<!-- wp:image {"id":69633} -->
<figure class="wp-block-image"><img src="https://i7x7p5b7.stackpathcdn.com/codrops/wp-content/uploads/2023/01/final-dice-mesh-1-306x300.png" alt="" class="wp-image-69633"/></figure>
<!-- /wp:image -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="нанесение-цвета">Нанесение цвета</h3>

Чтобы окрасить кубик, мы просто применим к нему серый материал MeshStandardMaterial.

<!-- wp:image {"id":69634} -->
<figure class="wp-block-image"><img src="https://i7x7p5b7.stackpathcdn.com/codrops/wp-content/uploads/2023/01/final-dice-mesh-3-306x300.png" alt="" class="wp-image-69634"/></figure>
<!-- /wp:image -->

Чтобы раскрасить выемки, мы можем сделать простой трюк и разместить шесть плоскостей внутри куба так, чтобы они выходили из выемок.

<!-- wp:image {"id":69637} -->
<figure class="wp-block-image"><img src="https://i7x7p5b7.stackpathcdn.com/codrops/wp-content/uploads/2023/01/final-dice-mesh-2-306x300.png" alt="" class="wp-image-69637"/></figure>
<!-- /wp:image -->

Мы завершаем работу над кубиками, окрашивая внутренние панели в черный цвет и группируя их с основной сеткой.

<!-- wp:code {"lineNumbers":true} -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript line-numbers">function createBoxGeometry() {
    let boxGeometry = new THREE.BoxGeometry(1, 1, 1, params.segments, params.segments, params.segments);

    // ...
    // modify boxGeometry.attributes.position and re-calculate normals

    return boxGeometry;
}

function createInnerGeometry() {
    
    // keep the plane size equal to flat surface of cube
    const baseGeometry = new THREE.PlaneGeometry(1 - 2 * params.edgeRadius, 1 - 2 * params.edgeRadius);
    
    // place planes a bit behind the box sides
    const offset = .48;

    // and merge them as we already have BufferGeometryUtils file loaded :)
    return BufferGeometryUtils.mergeBufferGeometries([
        baseGeometry.clone().translate(0, 0, offset),
        baseGeometry.clone().translate(0, 0, -offset),
        baseGeometry.clone().rotateX(.5 * Math.PI).translate(0, -offset, 0),
        baseGeometry.clone().rotateX(.5 * Math.PI).translate(0, offset, 0),
        baseGeometry.clone().rotateY(.5 * Math.PI).translate(-offset, 0, 0),
        baseGeometry.clone().rotateY(.5 * Math.PI).translate(offset, 0, 0),
    ], false);
}

function createDiceMesh() {
    const boxMaterialOuter = new THREE.MeshStandardMaterial({
        color: 0xeeeeee,
    })
    const boxMaterialInner = new THREE.MeshStandardMaterial({
        color: 0x000000,
        roughness: 0,
        metalness: 1,
        side: THREE.DoubleSide
    })

    const diceMesh = new THREE.Group();
    const innerMesh = new THREE.Mesh(createInnerGeometry(), boxMaterialInner);
    const outerMesh = new THREE.Mesh(createBoxGeometry(), boxMaterialOuter);
    diceMesh.add(innerMesh, outerMesh);

    return diceMesh;
}</code></pre>
<!-- /wp:code -->

<!-- wp:embed {"url":"https://codepen.io/ksenia-k/pen/rNrYNgj","type":"wp-embed","providerNameSlug":"codepen","align":"full"} -->
<figure class="wp-block-embed alignfull is-type-wp-embed is-provider-codepen wp-block-embed-codepen"><div class="wp-block-embed__wrapper">
https://codepen.io/ksenia-k/pen/rNrYNgj
</div></figure>
<!-- /wp:embed -->

Далее мы перейдем к анимации. Обратите внимание, что вторая часть этого урока не зависит от первой и наоборот.

<h2 class="wp-block-heading" id="выбор-инструмента-анимации">Выбор инструмента анимации</h2>

Цитируя любой учебник на эту тему, я должен сказать, что Three.js - это инструмент для рисования 3D-сцен в браузере. Он не включает в себя физический движок или другие встроенные инструменты для работы с анимацией. Чтобы избежать путаницы, система анимации Three.js - это API, который в основном используется для запуска анимации для импортированных моделей. Она не сильно помогает создавать новые переходы (за исключением KeyframeTrack, но он довольно прост).

Чтобы добавить движение и взаимодействие в сцену, нам нужно вычислить значения анимированных свойств для каждого кадра. Анимированным свойством может быть трансформация 3D-объекта, цвет материала или любой другой атрибут экземпляра Three.js.

Вычисление анимированного свойства может быть простым, как увеличение его значения в цикле requestAnimationFrame(), или сложным, как импорт какого-либо игрового движка для вычисления трансформаций.

Характер и сложность перехода определяют выбор инструмента анимации.

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Для базовых условий, линейных переходов и простых смягчений, интерполяций и других тривиальных вычислений обходитесь без дополнительных либ.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Используйте GSAP для создания цепочки из нескольких анимаций, для обработки пользовательских смягчений, для разработки анимации с прокруткой и других относительно сложных переходов. Это добавит 60-80 кб к вашему приложению.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Если вам нужно применить силы к объектам и заставить их сталкиваться друг с другом, воспользуйтесь инструментами физики.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

Что касается физики, существует множество решений, совместимых с Three.js. В зависимости от проекта, это может быть 3D или только 2D физика, с поддержкой мягких тел или без нее и т.д. Некоторые библиотеки будут включать в себя определенные функции, например, моделирование транспортных средств или ткани. Некоторые лучше совместимы с React, некоторые имеют богатые инструменты отладки и т.д.

В этом учебнике у нас есть только кубики, падающие на поверхность. С точки зрения физики, наши требования таковы:

<!-- wp:list {"ordered":true} -->
<ol><!-- wp:list-item -->
<li>Только жесткие тела (форма кубика не будет деформироваться, поэтому нам не нужна поддержка мягких тел)</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Формы объектов Box и Plane</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Обнаружение столкновений, чтобы кубики сталкивались друг с другом и с нижней плоскостью</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Силы, чтобы бросить кубики и позволить им упасть на пол</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

Технически, это все очень базовые требования, и любая библиотека 3D физики будет работать. Поэтому имеет смысл рассмотреть только:

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>минимальный размер</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>достойная поддержка (документация, примеры и т.д.)</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

Cannon-es хорошо подходит. Библиотека в минимальной комплектации добавит всего 40-50 кб к проекту. Это похоже на самый низкий уровень, который можно получить для 3D физики на данный момент. Иногда указывается, что Physijs имеет примерно такой же размер, но на самом деле Physijs - это плагин, который помогает использовать библиотеку ammo.js, поэтому вам всегда нужно загружать оба файла.

Поддержка cannon-es на данный момент в порядке - не так хорошо, как для Three.js или GSAP, но хорошо по сравнению с другими доступными вариантами физики.

Вы можете увидеть, что библиотека называется устаревшей, но это всего лишь путаница между Cannon.js и cannon-es. Первая - это оригинальный инструмент, который не обновлялся с 2016 года. На самом деле, он по-прежнему совместим с современным Three.js. Но что более важно, он был форкнут в 2020 году замечательной командой pmndrs и с тех пор регулярно обновляется как JS-модуль и как React-компонент.

Вы можете найти множество статей и примеров на эту тему. Старый контент все еще может быть очень полезен, хотя идеальной совместимости между различными версиями Cannon.js и cannon-es не существует.

<h2 class="wp-block-heading" id="three-js-сцена-и-физический-мир">Three.js сцена и физический мир</h2>

Основная идея заключается в построении трехмерного физического мира параллельно с трехмерной сценой. Мы добавляем в физический мир все 3D-объекты, которые должны двигаться и взаимодействовать как тела одинаковой формы. После применения физических свойств и сил к физическим телам, мы позволяем движку моделировать физический мир кадр за кадром. На каждом этапе симуляции мы берем трансформации, рассчитанные для физических тел, применяем их к видимым объектам и рендерим (перерисовываем) сцену Three.js.

Вот созданный объект physicsWorld. Чуть позже мы добавим к нему несколько свойств.

<!-- wp:code {"lineNumbers":true} -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript line-numbers">let physicsWorld = new CANNON.World({})</code></pre>
<!-- /wp:code -->

Я опускаю часть с созданием сцены Three.js, поскольку это всего лишь базовая установка с парой света и теней. И если вы дошли до этого момента, то, скорее всего, вы уже знакомы с Three.js 🙂 .

Чтобы создать пол, мы добавляем в сцену горизонтальную плоскость. Она не имеет цвета и только получает тени. Затем мы добавляем эту же плоскость в физический мир как статический объект. Она наследует положение и вращение сетки, и поскольку пол статичен, эти значения не будут меняться.

<!-- wp:code {"lineNumbers":true} -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript line-numbers">function createFloor() {
    
    // Three.js (visible) object
    const floor = new THREE.Mesh(
        new THREE.PlaneGeometry(1000, 1000),
        new THREE.ShadowMaterial({
            opacity: .1
        })
    )
    floor.receiveShadow = true;
    floor.position.y = -7;
    floor.quaternion.setFromAxisAngle(new THREE.Vector3(-1, 0, 0), Math.PI * .5);
    scene.add(floor);

    // Cannon-es (physical) object
    const floorBody = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Plane(),
    });
    floorBody.position.copy(floor.position);
    floorBody.quaternion.copy(floor.quaternion);
    physicsWorld.addBody(floorBody);
}</code></pre>
<!-- /wp:code -->

Для создания кубиков мы используем функцию createDiceMesh(), описанную выше, без особых изменений. Для нескольких кубиков мы можем клонировать исходный объект для повышения производительности.

<!-- wp:code {"lineNumbers":true} -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript line-numbers">const diceArray = []; // to store { mesh, body } for a pair of visible mesh and physical body

diceMesh = createDiceMesh(); // returns dice as a THREE.Group()

for (let i = 0; i &lt; params.numberOfDice; i++) {
    diceArray.push(createDice());
}

function createDice() {
    const mesh = diceMesh.clone();
    scene.add(mesh);

    const body = new CANNON.Body({
        mass: 1,
        shape: new CANNON.Box(new CANNON.Vec3(.5, .5, .5)),
    });
    physicsWorld.addBody(body);

    return {mesh, body};
}</code></pre>
<!-- /wp:code -->

Вы можете заметить, что сетка кубиков основана на THREE.BoxGeometry(1, 1, 1), в то время как CANNON.Box основан на size = 0.5. Так что да, cannon-es box принимает половину размера в качестве аргумента, в то время как Three.js принимает полный размер, и у меня нет объяснения этому ¯*(ツ)*/¯.&nbsp; Вы можете поймать такие вещи с помощью cannon-es-debugger, который генерирует видимые wireframes для физических тел.

Как и пол, сетка кубиков должна иметь такое же положение и вращение, как и тело кубика. Но в отличие от пола, свойства кубиков анимированы. Поэтому мы заботимся о трансформации кубиков вне функции createDice().

<h2 class="wp-block-heading" id="анимирование-кубиков">Анимирование кубиков</h2>

Мы управляем анимацией кубиков с помощью двух функций:

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>throwDice(), где положение игральных костей сбрасывается до начальных значений. Функция будет вызываться в любое время пользователем, чтобы бросить игральную кость</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>render(), где рассчитывается следующий шаг физического мира, обновляется положение тела кости, и мы копируем его на видимую сетку. Функция выполняется в бесконечном цикле requestAnimationFrame()</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:code {"lineNumbers":true} -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript line-numbers">function render() {
    // recalculate the physics world
    physicsWorld.fixedStep();

    // apply recalculated values to visible elements 
    for (const dice of diceArray) {
        dice.mesh.position.copy(dice.body.position)
    }

    // redraw the scene
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

function throwDice() {
    diceArray.forEach((d, dIdx) =&gt; {
        d.body.position = new CANNON.Vec3(5, dIdx * 1.5, 0); // the floor is placed at y = -7
        d.mesh.position.copy(d.body.position);
    });
}</code></pre>
<!-- /wp:code -->

Сейчас у нас есть кубики, висящие над полом. Они не двигаются, так как к ним еще не приложена сила.

<!-- wp:image {"id":69723} -->
<figure class="wp-block-image"><img src="https://i7x7p5b7.stackpathcdn.com/codrops/wp-content/uploads/2023/01/physics-01-800x504.png" alt="" class="wp-image-69723"/></figure>
<!-- /wp:image -->

Первая сила, которую мы добавляем, - это всемирное тяготение.

<!-- wp:code {"lineNumbers":true} -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript line-numbers">function initPhysics() {
    physicsWorld = new CANNON.World({
        gravity: new CANNON.Vec3(0, -50, 0),
    })
}</code></pre>
<!-- /wp:code -->

Обычно гравитация задается как вертикальная сила со значением y = -9.8. Это относится к гравитации Земли (9,807 м/с²) и предполагает, что вы хотите сохранить физику в ”настоящих" единицах СИ: силы в м/с², массы в килограммах, расстояния в метрах и так далее. Это возможно, но гравитация 9.8 имеет смысл только в том случае, если вы сохраняете все остальные свойства мира, объектов и материалов физически корректными. Плюс, в этом случае .fixedStep() следует заменить на функцию .step(), чтобы изменить скорость симуляции на "реальные" секунды.

На практике использование значения гравитации Земли редко бывает необходимым, и добиться даже реалистичного движения можно, просто экспериментируя с различными комбинациями сил, скорости, вращения и массы. Гравитация - это сила, влияющая на все динамические тела. Она не обязана иметь определенное значение или быть направленной вниз.

Для кубиков мы используем вертикальную силу с y = 50. Она заставляет кубики падать на пол.

<!-- wp:video -->
<figure class="wp-block-video"><video controls src="https://i7x7p5b7.stackpathcdn.com/codrops/wp-content/uploads/2023/01/physics-02.webm"></video></figure>
<!-- /wp:video -->

Чтобы сделать кубики более упругими, мы изучим понятия материала и контактного материала. Материал - это свойство каждого физического тела, а материал контакта - это пушечная сущность, описывающая взаимодействие пары материалов.

Поскольку все кубики являются одинаковыми физическими телами и в сцене нет других динамических объектов, достаточно использовать один материал и один контактный материал. Библиотека cannon-es предоставляет world.defaultMaterial и world.defaultContactMaterial, которые применяются автоматически. Поэтому нет необходимости создавать новые.

Параметры по умолчанию для материала контакта, включая трение и реституцию, уже определены в библиотеке. Хотя трение по умолчанию кажется достаточным, мы увеличим значение реституции с 0 до 0,3, чтобы добиться более упругого эффекта.

<!-- wp:code {"lineNumbers":true} -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript line-numbers">function initPhysics() {
    // ...
    physicsWorld.defaultContactMaterial.restitution = .3;
}</code></pre>
<!-- /wp:code -->

Обновление значения реституции приводит к более живому и энергичному движению кубиков.

<!-- wp:video -->
<figure class="wp-block-video"><video controls src="https://i7x7p5b7.stackpathcdn.com/codrops/wp-content/uploads/2023/01/physics-03.webm"></video></figure>
<!-- /wp:video -->

Добавление случайного начального вращения к каждой кости обеспечивает более естественное и непредсказуемое движение броска:

<!-- wp:code {"lineNumbers":true} -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript line-numbers">function throwDice() {
    diceArray.forEach((d, dIdx) =&gt; {

        // to reset the velocity dice got on the previous throw
        d.body.velocity.setZero();
        d.body.angularVelocity.setZero();
        
        // set initial position
        // ...
        
        // set initial rotation
        d.mesh.rotation.set(2 * Math.PI * Math.random(), 0, 2 * Math.PI * Math.random())
        d.body.quaternion.copy(d.mesh.quaternion);
    });
}</code></pre>
<!-- /wp:code -->

Поскольку вращение кубика, как и его положение, динамично, мы также обновляем кватернион кубика на каждом шаге моделирования.

<!-- wp:code {"lineNumbers":true} -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript line-numbers">function render() {
    // recalculate the physics world
    // ...
    
    // apply recalculated values to visible elements 
    for (const dice of diceArray) {
        dice.mesh.position.copy(dice.body.position);
        dice.mesh.quaternion.copy(dice.body.quaternion);
    }
    
    // redraw the scene
    // ...
}</code></pre>
<!-- /wp:code -->

<!-- wp:video -->
<figure class="wp-block-video"><video controls src="https://i7x7p5b7.stackpathcdn.com/codrops/wp-content/uploads/2023/01/physics-04.webm"></video></figure>
<!-- /wp:video -->

Сейчас кубики падают вниз под действием силы тяжести. Чтобы бросить их, нам нужно вскоре приложить дополнительную силу. Другими словами, приложить произвольный импульс, который заставит кубик лететь немного вверх и влево.

<!-- wp:code {"lineNumbers":true} -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript line-numbers">function throwDice() {
    diceArray.forEach((d, dIdx) =&gt; {
        // reset velocity, set initial position &amp; rotation
        // ...
        
        const force = 3 + 5 * Math.random();
        d.body.applyImpulse(
            new CANNON.Vec3(-force, force, 0)
        );
    });
}</code></pre>
<!-- /wp:code -->

<!-- wp:video -->
<figure class="wp-block-video"><video controls src="https://i7x7p5b7.stackpathcdn.com/codrops/wp-content/uploads/2023/01/physics-05.webm"></video></figure>
<!-- /wp:video -->

Без второго аргумента сила applyImpulse() добавляется к центру масс кубика. Но если мы немного сместим его от точки по умолчанию (0, 0, 0), импульс придаст дополнительную угловую скорость и закрутит кубик.

<!-- wp:code {"lineNumbers":true} -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript line-numbers">d.body.applyImpulse(
    new CANNON.Vec3(-force, force, 0),
    new CANNON.Vec3(0, 0, .2) // point of application of force is shifted from the center of mass 
);</code></pre>
<!-- /wp:code -->

<!-- wp:video -->
<figure class="wp-block-video"><video controls src="https://i7x7p5b7.stackpathcdn.com/codrops/wp-content/uploads/2023/01/physics-06.webm"></video></figure>
<!-- /wp:video -->

Вот и все. Кубики бросаются случайно, но в то же время они приземляются в предсказуемой области.

<h2 class="wp-block-heading" id="проверка-верхней-стороны">Проверка верхней стороны</h2>

Последнее, что нужно сделать, это проверить верхнюю сторону каждого кубика после завершения броска. Помимо добавления таких элементов, как кнопка для броска костей и место для отображения счета, нам необходимо:

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>запечатлеть момент неподвижности для каждого броска игральных костей</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>проверьте окончательное вращение и получите число верхней стороны</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

В Cannon-es есть несколько удобных обратных вызовов, которые мы можем использовать здесь: sleepyEvent, sleepEvent и wakeupEvent. После установки опции allowSleep в true для мира физики мы можем получить доступ к этим событиям. Cannon-es отслеживает скорость движения тела и запускает события, связанные со сном, используя sleepSpeedLimit и sleepTimeLimit. Как только скорость становится меньше sleepSpeedLimit, мы получаем событие sleepy, а если состояние sleepy длится дольше sleepTimeLimit, то получаем событие sleep.

<!-- wp:code {"lineNumbers":true} -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript line-numbers">function initPhysics() {
    physicsWorld = new CANNON.World({
        allowSleep: true,
        // ...
    })
}

function initScene() {

    // ...

    for (let i = 0; i &lt; params.numberOfDice; i++) {
        diceArray.push(createDice());
        addDiceEvents(diceArray[i]);
    }

    // ...
}

function addDiceEvents(dice) {
    dice.body.addEventListener('sleep', (e) =&gt; {
        // ...
    });
}
</code></pre>
<!-- /wp:code -->

Пределы настраиваются, и мы можем изменить sleepTimeLimit с 1 секунды по умолчанию на 0,1 секунды. Таким образом, у нас есть обратный вызов sleep при условии ”кубик имеет стабильное положение в течение 100 мс подряд".

<!-- wp:code {"lineNumbers":true} -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript line-numbers">function createDice() {
    // ...
    
    const body = new CANNON.Body({
        // ...
        sleepTimeLimit: .1 // change from default 1 sec to 100ms
    });
    
    // ...
}</code></pre>
<!-- /wp:code -->

Событие срабатывает, когда бросок кубика завершен. Скорее всего, это означает, что игральная кость лежит на полу или (редко и при большом количестве костей) она устойчиво встала на ребро. В первом случае мы отключаем отслеживание скорости для тела кубика и проверяем конечную ориентацию, чтобы считать счет. Если кубик балансирует на грани, мы сохраняем трекер сна включенным.

<!-- wp:code {"lineNumbers":true} -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript line-numbers">function addDiceEvents(dice) {
    dice.body.addEventListener('sleep', (e) =&gt; {

        dice.body.allowSleep = false;

        // check the dice rotation
        
        if (lyingOnSide) {
            // show result
        } else {
            // landed on edge =&gt; wait to fall on side and fire the event again
            dice.body.allowSleep = true;
        }
    });
}

function throwDice() {
    diceArray.forEach((d, dIdx) =&gt; {
        // ...
        
        // track body velocity again for new throw
        d.body.allowSleep = true;
    });
}</code></pre>
<!-- /wp:code -->

Чтобы проверить ориентацию кубика, а именно сторону, которая оказалась сверху, мы принимаем вращение за вектор Эйлера и анализируем эйлеровы компоненты.

<!-- wp:code {"lineNumbers":true} -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript line-numbers">const euler = new CANNON.Vec3();
dice.body.quaternion.toEuler(euler);</code></pre>
<!-- /wp:code -->

Известно, что

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>игральная кость была создана таким образом, чтобы сторона №1 была на Yplus, сторона №6 на Yminus, сторона №2 на Xplus, сторона №5 на Xminus, сторона №3 на Zplus и сторона №4 на Zminus</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>поверхность пола перпендикулярна оси Y</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>кватернион преобразуется к эйлеровой системе координат в порядке YZX</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:image {"id":69678} -->
<figure class="wp-block-image"><img src="https://i7x7p5b7.stackpathcdn.com/codrops/wp-content/uploads/2023/01/1-side-400x288.png" alt="" class="wp-image-69678"/></figure>
<!-- /wp:image -->

Вращение, хранящееся в векторе Эйлера, - это набор из трех вращений, которые выполняются в порядке YZX по отношению к локальной системе координат. Таким образом, первое вращение происходит вокруг локальной оси Y (которая совпадает с мировой осью Y), затем вокруг локальной оси Z (которая теперь может отличаться от мировой оси Z), затем локальное вращение X (которое может отличаться от мировой оси X).

Первое вращение по оси Y может быть абсолютно случайным, и кубик все равно будет лежать на полу стороной №1 вверх. Это означает, что нам не нужен euler.y для вычисления результата.

<!-- wp:video -->
<figure class="wp-block-video"><video controls src="https://i7x7p5b7.stackpathcdn.com/codrops/wp-content/uploads/2023/01/y-random.webm"></video></figure>
<!-- /wp:video -->

Очевидно, что euler.z и euler.x должны быть кратны π/2, поэтому мы можем перебрать возможные комбинации.

Как уже говорилось, при euler.z = 0 и euler.x = 0 мы получим сторону №1.

При euler.z = 0 вращение куба вокруг локальной оси X на π/2, -π/2 и на -π (-π здесь равно π) приводит к ориентации сторон #4, #3 и #6 соответственно.

<!-- wp:video -->
<figure class="wp-block-video"><video controls src="https://i7x7p5b7.stackpathcdn.com/codrops/wp-content/uploads/2023/01/randY-x-options.webm"></video></figure>
<!-- /wp:video -->

При euler.z = 0.5 куб поворачивается вокруг оси Z на π/2, и мы имеем сторону #2 на вершине независимо от поворота по оси X. Фактически, ось X теперь совпадает с исходной осью Y, поэтому мы получили блокировку Gimbal lock.

<!-- wp:video -->
<figure class="wp-block-video"><video controls src="https://i7x7p5b7.stackpathcdn.com/codrops/wp-content/uploads/2023/01/randY-z-plus.webm"></video></figure>
<!-- /wp:video -->

То же самое для случая поворота Z на -π/2. Ось X снова фиксируется, и мы всегда имеем сторону №5 сверху.

<!-- wp:video -->
<figure class="wp-block-video"><video controls src="https://i7x7p5b7.stackpathcdn.com/codrops/wp-content/uploads/2023/01/randY-z-minus.webm"></video></figure>
<!-- /wp:video -->

Согласно определению угла Эйлера, второе вращение (Z-вращение с порядком YZX) охватывает только диапазон π (в то время как первое и третье вращения имеют диапазон 2 x π). Другими словами, Z-вращение определено только между -π/2 и π/2, так что все варианты углов кубика покрыты.

<!-- wp:code {"lineNumbers":true} -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript line-numbers">const eps = .1;
let isZero = (angle) =&gt; Math.abs(angle) &lt; eps;
let isHalfPi = (angle) =&gt; Math.abs(angle - .5 * Math.PI) &lt; eps;
let isMinusHalfPi = (angle) =&gt; Math.abs(.5 * Math.PI + angle) &lt; eps;
let isPiOrMinusPi = (angle) =&gt; (Math.abs(Math.PI - angle) &lt; eps || Math.abs(Math.PI + angle) &lt; eps);

if (isZero(euler.z)) {
    if (isZero(euler.x)) {
        showRollResults(1);
    } else if (isHalfPi(euler.x)) {
        showRollResults(4);
    } else if (isMinusHalfPi(euler.x)) {
        showRollResults(3);
    } else if (isPiOrMinusPi(euler.x)) {
        showRollResults(6);
    } else {
        // landed on edge =&gt; wait to fall on side and fire the event again
        dice.body.allowSleep = true;
    }
} else if (isHalfPi(euler.z)) {
    showRollResults(2);
} else if (isMinusHalfPi(euler.z)) {
    showRollResults(5);
} else {
    // landed on edge =&gt; wait to fall on side and fire the event again
    dice.body.allowSleep = true;
}</code></pre>
<!-- /wp:code -->

В этом учебнике мы рассмотрели использование Three.js и cannon-es для создания динамичного и интерактивного ролика для игры в кости. Манипулируя 3D-формами, экспериментируя с различными комбинациями сил и настраивая свойства физических тел, мы смогли создать реалистичную и увлекательную симуляцию. Элементы пользовательского интерфейса и дополнительный код для этого проекта можно найти в сопроводительном репозитории. Мы рекомендуем вам загрузить проект и поэкспериментировать с различными настройками и параметрами, чтобы углубить свое понимание и навыки в анимации и физическом моделировании. Получайте удовольствие!

<!-- wp:video -->
<figure class="wp-block-video"><video controls src="https://i7x7p5b7.stackpathcdn.com/codrops/wp-content/uploads/2023/01/dice-final.mov"></video></figure>
<!-- /wp:video -->

Check out the <a href="http://tympanus.net/Tutorials/DiceRoller/" target="_blank" rel="noreferrer noopener">final demo</a> and see the full code in the <a href="https://github.com/uuuulala/Threejs-rolling-dice-tutorial/" target="_blank" rel="noreferrer noopener">GitHub repo</a>. 🎲 🤘
