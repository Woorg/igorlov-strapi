---
title: >-
  Создание аудиореактивных визуальных эффектов с помощью динамических частиц в
  Three.js
date: 2023-12-21T00:00:00.000Z
categories:
  - Учебник
author: Игорь Горлов
draft: false
slug: >-
  sozdanye-audyoreaktyvn-kh-vyzualn-kh-ffektov-s-pomoschiu-dynamycheskykh-chastyts-v-three-js
tags:
  - Three.js
  - Webgl
image: >-
  ../../assets/images/sozdanye-audyoreaktyvn-kh-vyzualn-kh-ffektov-s-pomoschiu-dynamycheskykh-chastyts-v-three-js-Dec-21-2023.avif
meta_title: >-
  Создание аудиореактивных визуальных эффектов с помощью динамических частиц в
  Three.js | Игорь Горлов - Фронтeндер
description: >-
  В этом руководстве вы узнаете, как мы в ARKx создавали аудиореактивные
  визуальные эффекты для сайта Coala Music. Мы рассмотрим концепции и техники,
  используем
lastmod: 2024-03-20T21:26:44.483Z
---

В этом руководстве вы узнаете, как мы в ARKx создавали аудиореактивные визуальные эффекты для сайта Coala Music. Мы рассмотрим концепции и техники, используемые для синхронизации аудиочастот и темпа, создания динамического визуализатора с процедурными анимациями частиц.

## Начало работы

Мы инициализируем нашу сцену Three.js только после взаимодействия с пользователем; таким образом мы сможем включить автовоспроизведение звука и избежать политики блокировки основных браузеров.

```js
export default class App {
	constructor() {
		this.onClickBinder = () => this.init();
		document.addEventListener('click', this.onClickBinder);
	}

	init() {
		document.removeEventListener('click', this.onClickBinder);

		// BASIC THREEJS SCENE
		this.renderer = new THREE.WebGLRenderer();
		this.camera = new THREE.PerspectiveCamera(
			70,
			window.innerWidth / window.innerHeight,
			0.1,
			10000,
		);
		this.scene = new THREE.Scene();
	}
}
```

## Анализ аудиоданных

Далее мы инициализируем наши менеджеры аудио и BPM. Они отвечают за загрузку аудио, его анализ и синхронизацию с визуальными элементами.

```js
async createManagers() {
  App.audioManager = new AudioManager();
  await App.audioManager.loadAudioBuffer();
  App.bpmManager = new BPMManager();
  App.bpmManager.addEventListener('beat', () => {
    this.particles.onBPMBeat();
  });
  await App.bpmManager.detectBPM(App.audioManager.audio.buffer);
}
```

Затем класс `AudioManager` загружает аудио из URL - мы используем URL Spotify Preview - и анализирует его, разбивая аудиосигналы на частотные блоки в режиме реального времени.

```js
const audioLoader = new THREE.AudioLoader();
audioLoader.load(this.song.url, (buffer) => {
	this.audio.setBuffer(buffer);
});
```

## Частотные данные

Для расчета амплитуд нам необходимо разделить частотный спектр на низкие, средние и высокие частоты.

Чтобы разделить диапазоны, нам нужно определить начальную и конечную точки (например, диапазон низких частот начинается со значения `lowFrequency` и заканчивается начальным значением `midFrequency`). Чтобы получить среднее значение амплитуды, просто умножьте частоты на длину буфера, затем разделите на частоту дискретизации и нормализуйте к шкале 0-1.

```js
this.lowFrequency = 10;
this.frequencyArray = this.audioAnalyser.getFrequencyData();

const lowFreqRangeStart = Math.floor(
	(this.lowFrequency * this.bufferLength) / this.audioContext.sampleRate,
);
const lowFreqRangeEnd = Math.floor(
	(this.midFrequency * this.bufferLength) / this.audioContext.sampleRate,
);

const lowAvg = this.normalizeValue(
	this.calculateAverage(this.frequencyArray, lowFreqRangeStart, lowFreqRangeEnd),
);
// ТОЖЕ САМОЕ ДЛЯ MID И HIGH
```

## Определение темпа

Амплитуды частот недостаточно, чтобы совместить музыкальный ритм с визуальными элементами. Определение BPM (Beats Per Minute) необходимо для того, чтобы элементы реагировали синхронно с пульсом музыки. В проекте Coala представлено множество песен их артистов, и мы не знаем темпа каждого музыкального произведения. Поэтому мы определяем BPM асинхронно с помощью замечательного модуля `web-audio-beat-detector`, просто передавая ему audioBuffer.

`const { bpm } = await guess(audioBuffer);`

## Отправка сигналов

После обнаружения BPM мы можем отправить сигнал события с помощью `setInterval`.

```js
this.interval = 60000 / bpm; // Преобразуем BPM в интервал
this.intervalId = setInterval(() => {
	this.dispatchEvent({ type: 'beat' });
}, this.interval);
```

## Процедурные реактивные частицы (веселая часть 😎)

Теперь мы создадим наши динамические частицы, которые вскоре будут реагировать на звуковые сигналы. Начнем с двух новых функций, которые будут создавать базовые геометрии (`Box` и `Cylinder`) со случайными сегментами и свойствами; такой подход приведет к тому, что каждый раз структура будет уникальной.

Затем мы добавим эту геометрию в объект `THREE.Points` с простым `ShaderMaterial`.

```js
const geometry = new THREE.BoxGeometry(1, 1, 1, widthSeg, heightSeg, depthSeg);

const material = new THREE.ShaderMaterial({
	side: THREE.DoubleSide,
	vertexShader: vertex,
	fragmentShader: fragment,
	transparent: true,
	uniforms: {
		size: { value: 2 },
	},
});

const pointsMesh = new THREE.Points(geometry, material);
```

Теперь мы можем начать создавать наши сетки со случайными атрибутами в заданном интервале:

## Добавление шума

Мы черпали вдохновение в учебнике Акеллы по FBO и включили шум завихрений в вершинный шейдер, чтобы создать органичные, естественные движения и добавить частицам текучие, вихревые движения. Я не буду углубляться в объяснение Curl Noise и FBO Particles, поскольку Акелла проделал потрясающую работу в своем туториале. Вы можете посмотреть его, чтобы узнать об этом больше.

## Анимация частиц

Подводя итог, можно сказать, что в вершинном шейдере мы анимируем точки для достижения динамических эффектов, которые диктуют поведение и внешний вид частиц. Начиная с `newpos`, которая является исходным положением каждой точки, мы создаем цель. Эта цель добавляет шум скручивания alна его нормальный вектор, изменяющийся в зависимости от частоты и амплитудной формы. Он интерполируется по мощности расстояния `d` между ними. Этот процесс создает плавный переход, ослабевающий по мере приближения точки к цели.

```js
vec3 newpos = position;
vec3 target = position + (normal * .1) + curl(newpos.x * frequency, newpos.y * frequency, newpos.z * frequency) * amplitude;
float d = length(newpos - target) / maxDistance;
newpos = mix(position, target, pow(d, 4.));
```

Мы также добавляем волновое движение к `newpos.z`, добавляя дополнительный слой живости в анимацию.

`newpos.z += sin(time) * (.1 * offsetGain);`

Кроме того, размер каждой точки динамически изменяется в зависимости от того, насколько близко точка находится к цели и на какой глубине в сцене она находится, что делает анимацию более трехмерной.

`gl_PointSize = size + (pow(d,3.) * offsetSize) * (1./-mvPosition.z);`

Вот оно:

## Добавление цветов

В шейдере фрагмента мы маскируем точку с помощью функции формы круга и интерполируем формы `startColor` и `endColor` в соответствии с `vDistance` точки, определенной в вершине:

```js
vec3 circ = vec3(circle(uv, 1.));
vec3 color = mix(startColor, endColor, vDistance);
gl_FragColor = vec4(color, circ.r * vDistance);
```

## Объединение аудио и визуальных эффектов

Теперь мы можем использовать наши творческие способности, чтобы назначить звуковые данные и ритм всем свойствам, как в вершинных, так и во фрагментных шейдерах. Мы также можем добавить несколько произвольных анимаций для масштабирования, позиционирования и вращения с помощью GSAP.

```js
update() {
  // Динамически обновляем амплитуду на основе высокочастотных данных из аудиоменеджера
  this.material.uniforms.amplitude.value = 0.8 + THREE.MathUtils.mapLinear(App.audioManager.frequencyData.high, 0, 0.6, -0.1, 0.2);

  // Обновляем коэффициент усиления смещения на основе низкочастотных данных для тонких изменений эффекта
  this.material.uniforms.offsetGain.value = App.audioManager.frequencyData.mid * 0.6;

  // Сопоставляем низкочастотные данные с диапазоном и используем их для увеличения временной формы
  const t = THREE.MathUtils.mapLinear(App.audioManager.frequencyData.low, 0.6, 1, 0.2, 0.5);
  this.time += THREE.MathUtils.clamp(t, 0.2, 0.5);

  // Зажимаем значение, чтобы оно оставалось в нужном диапазоне
  this.material.uniforms.time.value = this.time;
}
```

## Заключение

Это руководство рассказало вам о том, как синхронизировать звук с интересными визуальными эффектами частиц с помощью Three.js.  
Надеюсь, вам понравилось! Если у вас есть вопросы, дайте мне знать в Twitter.
