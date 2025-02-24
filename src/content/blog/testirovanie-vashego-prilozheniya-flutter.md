---
title: Тестирование вашего приложения Flutter
meta_title: Тестирование вашего приложения Flutter - Igor Gorlov
description: >-
  Привет всем, сегодня мы поговорим о тестировании с помощью flutter и о
  важности этого в ваших проектах, так что давайте начнем.
date: 2023-02-17T05:44:00.000Z
image: ../../assets/images/undefined-Feb-17-2023.avif
categories:
  - Учебник
author: Igor Gorlov
tags:
  - Flutter
  - Testing
  - Dart
draft: false
lastmod: 2024-03-20T21:26:43.006Z
---

Привет всем, сегодня мы поговорим о тестировании с помощью flutter и о важности этого в ваших проектах, так что давайте начнем.

<!-- wp:rank-math/toc-block {"title":"Оглавление","headings":[{"key":"4d0fcb4e-2b8f-4894-bed7-c4a54f7e0f97","content":"Зачем нам нужно тестирование?","level":2,"link":"#зачем-нам-нужно-тестирование","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"d22570c8-140f-485a-83e0-e2ee7b5906a0","content":"Концепция","level":2,"link":"#концепция","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"893857b1-0348-4170-aafc-017f987ff8d6","content":"Типы тестов","level":2,"link":"#типы-тестов","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"178c19c2-8322-4eb2-9cdd-b393733aecd0","content":"Юнит-тест","level":2,"link":"#юнит-тест","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"d0e575cd-278c-4cee-ba15-32f4e076b660","content":"Тест виджета","level":2,"link":"#тест-виджета","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"325694fb-8afa-47a9-bd42-74ca1538c492","content":"Интеграционный тест","level":2,"link":"#интеграционный-тест","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"72329715-9748-4f9d-85bf-b6c16efde383","content":"Бонус","level":2,"link":"#бонус","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"7460d649-7271-4feb-afa7-3af6acaba628","content":"Заключение","level":2,"link":"#заключение","disable":false,"isUpdated":false,"isGeneratedLink":true}],"listStyle":"ul"} -->
<div class="wp-block-rank-math-toc-block" id="rank-math-toc"><h2>Оглавление</h2><nav><ul><li class=""><a href="#зачем-нам-нужно-тестирование">Зачем нам нужно тестирование?</a></li><li class=""><a href="#концепция">Концепция</a></li><li class=""><a href="#типы-тестов">Типы тестов</a></li><li class=""><a href="#юнит-тест">Юнит-тест</a></li><li class=""><a href="#тест-виджета">Тест виджета</a></li><li class=""><a href="#интеграционный-тест">Интеграционный тест</a></li><li class=""><a href="#бонус">Бонус</a></li><li class=""><a href="#заключение">Заключение</a></li></ul></nav></div>
<!-- /wp:rank-math/toc-block -->

<h2 class="wp-block-heading" id="зачем-нам-нужно-тестирование">Зачем нам нужно тестирование?</h2>

По мере роста нашего проекта flutter растет и важность его тестирования, поэтому, поскольку ваш код был хорошо сделан, используя хорошие паттерны и следуя лучшим практикам, проще внедрить тест, чтобы убедиться, что приложение работает так, как вы задумали.

<h2 class="wp-block-heading" id="концепция">Концепция</h2>

Существует несколько концепций того, как писать тесты и создавать лучшие и хорошо спроектированные приложения, одна из самых распространенных - TDD (Test Driven Development), которая гласит, что вы должны сначала написать тест, а затем написать код, и повторить процесс столько раз, сколько вам нужно, чтобы убедиться, что все проходит тест и код делает только то, что должен делать.

<h2 class="wp-block-heading" id="типы-тестов">Типы тестов</h2>

Во Flutter у нас есть три типа тестов, это:

Юнит-тест: как видно из названия, этот вид тестов предназначен для проверки того, работает ли минимальная часть вашего кода так, как ожидается, сюда входят, например, функции и классы.

Тест виджетов: Этот тест проверяет, работают ли виджеты так, как ожидается, поэтому целью этого вида теста является проверка согласованности пользовательского интерфейса.

Интеграционный тест: Последний, интеграционный тест, лично мне больше всего нравится, он представляет собой смесь двух типов тестов, описанных ранее. С его помощью вы можете проверить весь поток, например, проверить, работает ли оформление заказа в приложении для электронной коммерции так, как ожидалось.

Учитывая все вышесказанное, давайте рассмотрим несколько примеров, чтобы лучше понять суть. В данном случае я покажу, как проверить вход в систему, потому что это общая функция для большинства проектов.

Чтобы начать, предположим, что у вас уже есть flutter в вашем O.S. Тогда просто создайте проект командой flutter create login_test, где имя login_test может быть изменено, если вы хотите дать другое имя проекту, с этим созданным проектом проверьте в корневом каталоге и вы сможете найти папку под названием test, весь ваш код тестирования должен быть в ней, и по умолчанию все классы, созданные для этой цели, должны быть в \_test.dart, чтобы язык распознал это как класс тестирования.

Чтобы начать использовать концепцию TDD, давайте сначала создадим модульный тест, а затем реализацию.

<h2 class="wp-block-heading" id="юнит-тест">Юнит-тест</h2>

Удалите файл, поставляемый с проектом, и создайте файл unit_login_test.dart в папке test со следующим кодом:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">import 'package:flutter_test/flutter_test.dart';

void main() {
  group('Login controller', () {
    test("success login", () {
      LoginController controller = LoginController();
      expect(controller.login("username", "password"), true);
    });

    test("failed login", () {
      LoginController controller = LoginController();
      expect(controller.login("invalidUsername", "invalidPassword"), false);
    });
  });
}

</code></pre>
<!-- /wp:code -->

Мы создаем главную функцию, которая запускает в данном случае эти тесты, мы должны импортировать класс flutter_test для выполнения, как мы хотим, для этого мы создаем группу и внутри помещаем все наши тестовые случаи, инициируем наш класс и выполняем функцию с некоторыми заданными параметрами и ожидаемым возвратом в функции expect test для этого мы представляем, что у нас есть контроллер и внутри функция login, которая получает имя пользователя и пароль и, если они совпадают, возвращает булево значение. Для выполнения теперь мы должны создать файл login_controller.dart в папке lib со следующим кодом:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">class LoginController {
  bool login(String username, String password) {
    return username == "username" &amp;&amp; password == "password";
  }
}

</code></pre>
<!-- /wp:code -->

Таким образом, нам остается только импортировать этот класс в наш тестовый класс и выполнить его, чтобы увидеть результат

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript"><code>import 'package:login_test/login_controller.dart';</code></code></pre>
<!-- /wp:code -->

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--p1p51pMB--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/gizzgl646gg2hhslbsjl.png" alt="Прохождение модульного теста"/></figure>
<!-- /wp:image -->

Теперь перейдем ко второму типу тестов.

<h2 class="wp-block-heading" id="тест-виджета">Тест виджета</h2>

Как и в случае с юнит-тестом, мы создадим тестовый файл и реализуем его, для начала создайте файл widget_login_test.dart и поместите в него следующий код:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  testWidgets("Login UI", (tester) async {
    await tester.pumpWidget(const MaterialApp(home: LoginPage()));

    final username = find.byKey(const Key("usernameTextField"));
    final password = find.byKey(const Key("passwordTextField"));
    final loginButton = find.byKey(const Key("loginButton"));

    expect(username, findsOneWidget);
    expect(password, findsOneWidget);
    expect(loginButton, findsOneWidget);

    await tester.enterText(username, "username");
    await tester.enterText(password, "password");
    await tester.tap(loginButton);

    await tester.pump();
    final successMessage = find.byKey(const Key('success'));
    expect(successMessage, findsOneWidget);
  });
}

</code></pre>
<!-- /wp:code -->

Тест виджетов отображает виджеты, и вы можете выполнять такие действия, как tap() и enterText(), чтобы взаимодействовать с компонентами. В данном тестовом случае нам нужно выполнить поиск с помощью параметра Key, вы можете сделать это с помощью текста, но Key дает вам больше уверенности в том, что вы получите то, что нужно. Теперь для реализации кода просто создайте файл под названием login_page.dart и поместите в него этот код:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">import 'package:flutter/material.dart';
import 'package:login_test/login_controller.dart';

LoginController loginController = LoginController();

TextEditingController usernameController = TextEditingController();
TextEditingController passwordController = TextEditingController();

class LoginPage extends StatelessWidget {
  const LoginPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          TextField(
            controller: usernameController,
            key: const Key('usernameTextField'),
          ),
          TextField(
            controller: passwordController,
            key: const Key('passwordTextField'),
          ),
          const SizedBox(height: 16),
          ElevatedButton(
            key: const Key('loginButton'),
            child: const Text("Login"),
            onPressed: () {
              // Example login logic
              if (loginController.login(
                  usernameController.text, passwordController.text)) {
                showDialog(
                  context: context,
                  builder: (_) =&gt; const AlertDialog(
                    key: Key('success'),
                    title: Text("Login Successful"),
                  ),
                );
              }
            },
          ),
        ],
      ),
    );
  }
}

</code></pre>
<!-- /wp:code -->

Теперь нам нужно только импортировать LoginPage в наш тестовый файл виджета, просто введите<code> import ‘package:login_test/login_page.dart’; </code>с этим вы можете выполнить ваш тест и должны увидеть что-то вроде

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--lmCt0oyv--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/yax9zfxi0saeu2t2yzqf.png" alt="Тест виджета"/></figure>
<!-- /wp:image -->

<h2 class="wp-block-heading" id="интеграционный-тест">Интеграционный тест</h2>

Это последний тип тестирования, он работает путем выполнения полной функции, для этого вам нужно реальное устройство, для начала нам нужно добавить новую зависимость в наш файл pubspec.yaml в разделе dev_dependencies под названием integration_test: sdk: flutter, после этого просто введите flutter pub get для обновления зависимостей, с этой установкой вам нужно создать папку integration_test в корневом каталоге, затем вставить файл, который вы можете назвать app_test.dart с кодом ниже:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:integration_test/integration_test.dart';
import 'package:login_test/login_page.dart';

void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();
  WidgetsFlutterBinding.ensureInitialized();
  group('LoginPage', () {
    testWidgets("Login UI", (tester) async {
      await tester.pumpWidget(const MaterialApp(home: LoginPage()));

      final username = find.byKey(const Key("usernameTextField"));
      final password = find.byKey(const Key("passwordTextField"));
      final loginButton = find.byKey(const Key("loginButton"));

      expect(username, findsOneWidget);
      expect(password, findsOneWidget);
      expect(loginButton, findsOneWidget);

      await tester.enterText(username, "username");
      await tester.pumpAndSettle(const Duration(seconds: 1));
      await tester.enterText(password, "password");
      await tester.pumpAndSettle(const Duration(seconds: 1));
      await tester.tap(loginButton);

      await tester.pumpAndSettle(const Duration(seconds: 1));
      final successMessage = find.byKey(const Key('success'));
      expect(successMessage, findsOneWidget);
    });
  });
}

</code></pre>
<!-- /wp:code -->

этот код очень похож на тест виджетов, но у нас есть несколько отличий, мы используем IntegrationTestWidgetsFlutterBinding.ensureInitialized(); и WidgetsFlutterBinding.ensureInitialized(); чтобы убедиться, что у нас есть интеграционный тест и виджеты, готовые к началу процесса.

<h2 class="wp-block-heading" id="бонус">Бонус</h2>

В дополнительной части этой статьи мы рассмотрим, как получить визуальный отчет о покрытии тестов, если вы не хотите изучать это, просто перейдите к заключению.

Для этого нам нужно запустить в терминале flutter test --coverage, после выполнения которого должна быть создана папка coverage с файлом lcov.info внутри, как мы видим ниже:

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--NFYFrPqF--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/f97uoy7j1gm1romn06c5.png" alt="Папка с покрытиями"/></figure>
<!-- /wp:image -->

после этого вам нужно преобразовать этот файл в кучу файлов для чтения веб-сервером, для продолжения просто введите в терминале genhtml coverage/lcov.info -o coverage/html, где coverage/lcov.info - это путь к файлу, созданному выше, а coverage/html после флага -o - это каталог, куда я хочу сохранить сгенерированные файлы, когда эта часть закончится, вы увидите папку с заданным именем, созданную там, где вы выбрали.

В завершение нам нужно открыть эту директорию для доступа в веб-браузере, для этого я рекомендую получить библиотеку dhttpd отсюда, просто введите в терминале dart pub global activate dhttpd, этим вы загрузите библиотеку глобально, после этого просто введите dhttpd --path coverage/html/ и откройте браузер, чтобы поместить URL http://localhost:8080 и, наконец, вы сможете увидеть полный отчет о вашем тесте, как показано ниже:

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--sqTj7Y5U--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/w1iisor30wrk3zzoxgfa.png" alt="Покрытие флаттера"/></figure>
<!-- /wp:image -->

На этом мы заканчиваем бонусную часть, которая может быть очень важна для понимания того, где код не покрыт и где тесты не работают.

<h2 class="wp-block-heading" id="заключение">Заключение</h2>

Как мы видим, тесты дают нам больше уверенности в конечном результате, сфокусированном на релизе, этот процесс может занять больше времени для завершения функции, но выигрыш от этого более ценен, чем если бы об ошибке сообщили после распространения проекта, так что, надеюсь, все поняли, как делать и важность, надеюсь, увидимся в следующий раз.

Если вы хотите увидеть полный код, я выложил код, ссылка: Репозиторий

<!-- wp:acf/acf-donate {"id":"block_64678dc93985f","name":"acf/acf-donate","data":{"title":"Задонатить на поддержку!","_title":"field_646b621e8617c","list_0_name":"Donatepay","_list_0_name":"field_646b623e8617e","list_0_url":"https://new.donatepay.ru/@1117856","_list_0_url":"field_646b62528617f","list_0_address":"","_list_0_address":"field_646b625d86180","list_1_name":"Donationalerts","_list_1_name":"field_646b623e8617e","list_1_url":"https://www.donationalerts.com/c/woorg_","_list_1_url":"field_646b62528617f","list_1_address":"","_list_1_address":"field_646b625d86180","list_2_name":"USDT (TRC20)","_list_2_name":"field_646b623e8617e","list_2_url":"","_list_2_url":"field_646b62528617f","list_2_address":"TR121HxpTDF71TMm9idZkBaZxnjSMcCPWj","_list_2_address":"field_646b625d86180","list_3_name":"ETH","_list_3_name":"field_646b623e8617e","list_3_url":"","_list_3_url":"field_646b62528617f","list_3_address":"0x442721192987047eDeEC69Ca1D4c706f9Adb16B3","_list_3_address":"field_646b625d86180","list_4_name":"BTC","_list_4_name":"field_646b623e8617e","list_4_url":"","_list_4_url":"field_646b62528617f","list_4_address":"36dLKv5uRozphSQa55w2XgsF42AugPu2QT","_list_4_address":"field_646b625d86180","list":5,"_list":"field_646b62308617d"},"align":"","mode":"edit"} /-->
