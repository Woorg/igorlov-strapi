---
title: Как запрашивать разрешения на определение местоположения в Jetpack Compose
meta_title: >-
  Как запрашивать разрешения на определение местоположения в Jetpack Compose -
  Фул Фронт Дев
description: >-
  Получение данных о местоположении пользователя может быть довольно сложным
  делом. За прошедшие годы разрешения, необходимые для этого, и логика,
  связанная с эт
date: 2023-12-12T18:21:01.909Z
image: >-
  ../../assets/images/kak-zaprashyvat-razreshenyia-na-opredelenye-mestopolozhenyia-v-jetpack-compose-Dec-12-2023.avif
categories:
  - Учебник
author: Igor Gorlov
tags:
  - Jetpack Compose
draft: false
translated: ''
translatedPosition: ''
type: blog
slug: kak-zaprashyvat-razreshenyia-na-opredelenye-mestopolozhenyia-v-jetpack-compose
keywords:
  - Jetpack Compose
lastmod: 2024-03-20T21:26:43.739Z
---

Получение данных о местоположении пользователя может быть довольно сложным делом. За прошедшие годы разрешения, необходимые для этого, и логика, связанная с этим, претерпели значительные изменения.

Если ваше приложение зависит от получения информации о местоположении пользователя, вы хотите обеспечить ему приятные ощущения, когда приложение запрашивает эту информацию. Поэтому очень важно учесть все возможные варианты и позволить пользователю выбрать тот вариант, который ему наиболее удобен.

В Jetpack Compose логика, связанная с получением информации о местоположении пользователя, немного изменилась, и важно знать, как это делается.

Как и в большинстве случаев, для получения разрешений можно использовать библиотеку. Она от Accompanist (читайте Google), и вы можете найти ее [здесь](https://google.github.io/accompanist/permissions/#:~:text=A%20library%20which%20provides%20Android%20runtime%20permissions%20support%20for%20Jetpack%20Compose.&text=The%20permission%20APIs%20are%20currently,marked%20with%20the%20%40ExperimentalPermissionsApi%20annotation.). \***\*Но вы ведь здесь для того, чтобы научиться делать все самостоятельно,** верно?\*\* Так что читайте дальше. 🕵️‍♀️

Прежде чем мы перейдем к коду и логике, важно понять, что запрос разрешения у пользователя - это путь, который может иметь множество точек принятия решения. Поэтому его лучше всего описывать с помощью состояний, которые представляют текущий статус разрешения (одобрено/отклонено/запрещено) и текущий статус операционной системы.

Приведенная ниже диаграмма иллюстрирует этот поток:

![location](https://www.freecodecamp.org/news/content/images/2023/10/location.png)

Позже в этой статье вы увидите, как мы будем представлять эти состояния в переменных в нашем коде.

## Save Our Souls (S.O.S.)

Прежде чем мы перейдем к логике запроса разрешения, мы позаботимся о том, как его оформить. Как обычно, добавьте необходимые разрешения в файл AndroidManifest.xml:

```xml
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />

```

Затем мы создадим композитный экран, на котором будем запрашивать необходимые разрешения на местоположение. Первым шагом в этом экране будет проверка того, предоставлял ли пользователь ранее необходимые разрешения. Это можно сделать с помощью метода checkSelfPermission, который не является чем-то новым для Jetpack Compose:

```java
val locationPermissionsAlreadyGranted = ContextCompat.checkSelfPermission(
            this,
            Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED
```

Если разрешение не предоставлено, мы должны запросить его. Для этого мы будем использовать объект [rememberLauncherForActivityResult](https://developer.android.com/reference/kotlin/androidx/activity/compose/package-summary#rememberlauncherforactivityresult). Это позволит нам в Jetpack Compose получить результат от активности.

```java
val locationPermissions = arrayOf(
Manifest.permission.ACCESS_FINE_LOCATION,
Manifest.permission.ACCESS_COARSE_LOCATION)

val locationPermissionLauncher = rememberLauncherForActivityResult(
contract = ActivityResultContracts.RequestMultiplePermissions(),
onResult = { permissions ->
val permissionsGranted = permissions.values.reduce { acc, isPermissionGranted ->
acc && isPermissionGranted
}

                    if (!permissionsGranted) {
                       //Логика, когда разрешения не были предоставлены пользователем
                    }
                })

```

Аргументы, которые нам нужно передать в `rememberLauncherForActivityResult`, следующие:

1. [ActivityResultContract](https://developer.android.com/reference/androidx/activity/result/contract/ActivityResultContract) - определяет вход активности и выход.
2. onResult - обратный вызов при получении результата

В приведенном выше фрагменте кода мы используем контракт с несколькими разрешениями, поскольку запрашиваем несколько разрешений на местоположение. Существует также контракт для запроса только одного разрешения, **ActivityResultContracts.RequestPermission().**.

Этот фрагмент кода не запускается сразу, поскольку нам нужно запросить разрешения. Для этого мы используем метод launch, чтобы запустить активность:

```java
locationPermissionLauncher.launch(locationPermissions)
```

В случае если пользователь предоставил все или несколько необходимых разрешений, мы можем продолжить логику работы приложения.

Но если пользователь не одобрил ни одно из разрешений, нам нужно найти способ объяснить ему, почему эти разрешения необходимы.

## Объяснение обоснования

Если пользователь отклонил разрешение, но не выбрал опцию ”Отказать и больше не спрашивать", у нас есть способ дать пользователю краткое объяснение, почему он должен предоставить требуемое разрешение (разрешения).

Чтобы выяснить, нужно ли предоставлять это обоснование, мы используем параметр [shouldShowRequestPermissionRationale](<https://developer.android.com/reference/androidx/core/app/ActivityCompat#shouldShowRequestPermissionRationale(android.app.Activity,java.lang.String)>) из класса Activity:

```java
val shouldShowPermissionRationale: Boolean = shouldShowRequestPermissionRationale(Manifest.permission.ACCESS_COARSE_LOCATION)

```

Как только мы узнаем, что мы можем отобразить это объяснение, есть два способа сделать это:

1. Мы можем представить его пользователю с помощью AlertDialog
2. Мы можем использовать панель закусок

Представить диалог оповещения довольно просто. Все, что нам нужно сделать, это четко описать пользователю, почему необходимо одобрить это разрешение:

```java
@Composable
    fun ShowLocationPermissionRationale() {
        AlertDialog(
            onDismissRequest = {
               //Логика, когда происходит увольнение
            },
        title = {
            Text("Требуется разрешение")
                },
        text = {
            Text("Вам необходимо одобрить это разрешение, чтобы...")
        },
        confirmButton = {
            TextButton(onClick = {
              // Логика, когда пользователь подтверждает принятие разрешения
            }) {
                Text("Confirm")
            }
        },
        dismissButton = {
            TextButton(onClick = {
              //Логика, когда пользователь отказывается принимать разрешения
            }) {
                Text("Deny")
            }
        })
    }
```

Если мы хотим отобразить закусочную, нам нужно знать, что мы должны использовать контейнер Scaffold, поскольку это единственный контейнер, который поддерживает отображение закусочной. Если мы его не используем, то закусочная не появится.

Ниже приведен фрагмент, показывающий, как это сделать:

```java
val scope = rememberCoroutineScope()
val snackbarHostState = remember { SnackbarHostState() }

Scaffold(snackbarHost = {
SnackbarHost(hostState = snackbarHostState)
}) { contentPadding ->
if (shouldShowPermissionRationale) {
LaunchedEffect(key1 = shouldShowPermissionRationale, block = {
scope.launch {
val userAction = snackbarHostState.showSnackbar(
message = "Пожалуйста, авторизуйте разрешения на местоположение",
actionLabel = "Одобрить",
duration = SnackbarDuration.Indefinite,
withDismissAction = true
)
when (userAction) {
SnackbarResult.ActionPerformed -> {
//Пользователь одобрил предоставление разрешения
//Запросить разрешения снова
}
SnackbarResult.Dismissed -> {
//Пользователь отклонил закусочную
}
}
}
})
}
}

```

С помощью атрибута withDismissAction мы разрешили отменять саму панель закусок и прослушали действие, выполняемое пользователем.

## Наблюдатель жизненного цикла

Мы упустили из виду тот факт, что нам необходимо убедиться в том, что наш запрос разрешения соответствует композитному жизненному циклу. Это означает, что как только пользователь выберет свои предпочтения относительно запроса разрешения, нам нужно, чтобы пользовательский интерфейс адаптировался соответствующим образом.

Если вы попробуете поместить приведенный выше код в метод onCreate активности, вы будете удивлены результатом, поскольку приложение завершится со следующим исключением:

> **java.lang.IllegalStateException: Launcher has not been initialized**

Это происходит потому, что Composable-функции должны быть свободны от побочных эффектов. Что такое побочный эффект? Согласно [документации Google](https://developer.android.com/jetpack/compose/side-effects), это:

> … изменение состояния приложения, которое происходит вне области действия составной функции.

Таким образом, в нашем примере побочным эффектом является запуск активности для разрешений.

Чтобы обойти этот сценарий, нам нужно использовать одну из опций побочного эффекта. Поскольку мы не хотим спрашивать пользователя о разрешениях, не помня, что он выбрал ранее, мы не можем использовать общий \***\*SideEffect\*\***. А \***\*LaunchedEffect\*\*** используется для вызова методов приостановки внутри Composable, что не является нашим случаем использования.

Таким образом, у нас остается \***\*DisposableEffect\*\***. Читая [документацию](https://developer.android.com/jetpack/compose/side-effects#disposableeffect), мы видим, что [DisposableEffect](<https://developer.android.com/reference/kotlin/androidx/compose/runtime/package-summary#DisposableEffect(kotlin.Any,kotlin.Function1)>) может быть объединен с событиями жизненного цикла, что нам и нужно.

```java
val lifecycleOwner = LocalLifecycleOwner.current
            DisposableEffect(key1 = lifecycleOwner, effect = {
                val observer = LifecycleEventObserver { _, event ->
                    if (event == Lifecycle.Event.ON_START && !locationPermissionsAlreadyGranted) {
                        locationPermissionLauncher.launch(locationPermissions)
                       }
                    }
                    lifecycleOwner.lifecycle.addObserver(observer)
                    onDispose {
                        lifecycleOwner.lifecycle.removeObserver(observer)
                    }
                }
            )
```

В приведенном выше фрагменте кода мы добавляем наблюдатель жизненного цикла, который запускается только в случае события onStart жизненного цикла. Мы также объединяем его с булевым значением, которое мы объявили в начале этого раздела, locationPermissionsAlreadyGranted. Это нужно для того, чтобы не показывать диалог запроса разрешений, если они уже предоставлены.

Как и в случае со всеми наблюдателями жизненного цикла, нам нужно удалить нашего наблюдателя после завершения композиции. Эта логика находится в пункте DisposableEffect’s onDispose.

## Местоположение не найдено

Последний случай, с которым нам нужно разобраться, - это когда пользователь выбирает опцию ”Отказать и больше не спрашивать". В этом случае мы не можем попросить пользователя предоставить необходимые разрешения.

Единственный способ, которым пользователь может отменить свой выбор, - это перейти на экран настроек нашего приложения и изменить разрешения там. Поэтому нам нужно направить пользователя туда.

Чтобы открыть экран настроек нашего приложения, нам нужно использовать намерение с действием \***\*ACTION_APPLICATION_DETAILS_SETTINGS.\*\***

```java
Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS, Uri.fromParts("package", packageName, null)).also {
startActivity(it)
}

```

Используя приведенную выше логику, мы можем добавить ее в наш код, когда узнаем, что пользователь решил отказать в разрешениях и не запрашивать их снова. Это происходит внутри нашего запроса на получение разрешений, когда пользователь не предоставил разрешения, а опция показать обоснование равна false.

## Местоположение подтверждено

Если взять все, что мы обсуждали в этой статье, и поместить в один файл, мы получим следующий код:

```java
class MainActivity : ComponentActivity() {

    @OptIn(ExperimentalMaterial3Api::class)
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContent {

            var locationPermissionsGranted by remember { mutableStateOf(areLocationPermissionsAlreadyGranted()) }
            var shouldShowPermissionRationale by remember {
                mutableStateOf(
                    shouldShowRequestPermissionRationale(Manifest.permission.ACCESS_COARSE_LOCATION)
                )
            }

            var shouldDirectUserToApplicationSettings by remember {
                mutableStateOf(false)
            }

            var currentPermissionsStatus by remember {
                mutableStateOf(decideCurrentPermissionStatus(locationPermissionsGranted, shouldShowPermissionRationale))
            }

            val locationPermissions = arrayOf(
                Manifest.permission.ACCESS_FINE_LOCATION,
                Manifest.permission.ACCESS_COARSE_LOCATION
            )

            val locationPermissionLauncher = rememberLauncherForActivityResult(
                contract = ActivityResultContracts.RequestMultiplePermissions(),
                onResult = { разрешения ->
                    locationPermissionsGranted = permissions.values.reduce { acc, isPermissionGranted ->
                        acc && isPermissionGranted
                    }

                    if (!locationPermissionsGranted) {
                        shouldShowPermissionRationale =
                            shouldShowRequestPermissionRationale(Manifest.permission.ACCESS_COARSE_LOCATION)
                    }
                    shouldDirectUserToApplicationSettings = !shouldShowPermissionRationale && !locationPermissionsGranted
                    currentPermissionsStatus = decideCurrentPermissionStatus(locationPermissionsGranted, shouldShowPermissionRationale)
                })

            val lifecycleOwner = LocalLifecycleOwner.current
            DisposableEffect(key1 = lifecycleOwner, effect = {
                val observer = LifecycleEventObserver { _, event ->
                    if (event == Lifecycle.Event.ON_START &&
                        !locationPermissionsGranted &&
                        !shouldShowPermissionRationale) {
                        locationPermissionLauncher.launch(locationPermissions)
                    }
                }
                lifecycleOwner.lifecycle.addObserver(observer)
                onDispose {
                    lifecycleOwner.lifecycle.removeObserver(observer)
                    }
                }
            )

            val scope = rememberCoroutineScope()
            val snackbarHostState = remember { SnackbarHostState() }

            LocationPermissionsTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    Scaffold(snackbarHost = {
                        SnackbarHost(hostState = snackbarHostState)
                    }) { contentPadding ->
                        Column(modifier = Modifier.fillMaxSize(),
                        verticalArrangement = Arrangement.Center,
                        horizontalAlignment = Alignment.CenterHorizontally){
                            Текст(модификатор = Модификатор
                                .padding(contentPadding)
                                .fillMaxWidth(),
                                text = "Разрешения на местоположение",
                                textAlign = TextAlign.Center)
                            Spacer(modifier = Modifier.padding(20.dp))
                            Text(modifier = Modifier
                                .padding(contentPadding)
                                .fillMaxWidth(),
                                text = "Текущий статус разрешения: $currentPermissionsStatus",
                                textAlign = TextAlign.Center,
                                fontWeight = FontWeight.Bold
                            )
                        }
                        if (shouldShowPermissionRationale) {
                            LaunchedEffect(Unit) {
                                scope.launch {
                                    val userAction = snackbarHostState.showSnackbar(
                                        message = "Пожалуйста, авторизуйте разрешения на местоположение",
                                        actionLabel = "Одобрить",
                                        duration = SnackbarDuration.Indefinite,
                                        withDismissAction = true
                                    )
                                    when (userAction) {
                                        SnackbarResult.ActionPerformed -> {
                                            shouldShowPermissionRationale = false
                                            locationPermissionLauncher.launch(locationPermissions)
                                        }
                                        SnackbarResult.Dismissed -> {
                                            shouldShowPermissionRationale = false
                                        }
                                    }
                                }
                            }
                        }
                        if (shouldDirectUserToApplicationSettings) {
                            openApplicationSettings()
                        }
                    }
                }
            }
        }
    }

    private fun areLocationPermissionsAlreadyGranted(): Boolean {
        return ContextCompat.checkSelfPermission(
            this,
            Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED
    }

    private fun openApplicationSettings() {
        Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS, Uri.fromParts("package", packageName, null)).also {
            startActivity(it)
        }
    }

    private fun decideCurrentPermissionStatus(locationPermissionsGranted: Boolean,
                                              shouldShowPermissionRationale: Boolean): String {
        return if (locationPermissionsGranted) "Granted"
        else if (shouldShowPermissionRationale) "Отклонено"
        else "Denied"
    }
}
```

А вот так это выглядит:

![location2](https://www.freecodecamp.org/news/content/images/2023/10/location2.gif)

Я поместил всю логику в один файл только для целей этой статьи. Это далеко не самый эстетичный и правильный подход к работе с логикой запроса разрешений.

Вы можете легко рефакторизовать логические переменные, связанные с хранением различных состояний запроса разрешений, в классе модели представления, прикрепленном к этому экрану.

Вы можете увидеть весь код, описанный в этой статье, перейдя в этот проект:

Репозиторий, содержащий код, связанный с различными статьями Medium, которые я написал - TomerPacific/MediumArticles

https://github.com/TomerPacific/MediumArticles/tree/master/LocationPermissions

А если вы хотите прочитать другие мои статьи, вы можете просмотреть их ниже:

GitHub - TomerPacific/MediumArticles: Репозиторий, содержащий код, связанный с различными статьями на Medium, которые я написал

Репозиторий, содержащий код, связанный с различными статьями Medium, которые я написал - GitHub - TomerPacific/MediumArticles: Репозиторий, содержащий код, связанный с различными статьями Medium…

https://github.com/TomerPacific/MediumArticles

Я также использовал эту логику в приложении, которое выможно попробовать [здесь](https://play.google.com/store/apps/details?id=com.tomerpacific.scheduler).

Спасибо, что читаете!
