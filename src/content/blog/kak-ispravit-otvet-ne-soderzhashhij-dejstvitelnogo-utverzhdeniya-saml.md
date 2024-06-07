---
title: 'Как исправить ответ, не содержащий действительного утверждения saml'
meta_title: >-
  Как исправить ответ, не содержащий действительного утверждения saml - Igor
  Gorlov
description: >-
  Если вы читаете эту статью, значит, вы управляете идентификационными данными
  пользователей за пределами AWS и используете Identity Provider (IdP)
  Federation для предоставления этим внешним идентификационным данным разрешения
  на использование ресурсов AWS в вашей учетной записи.
date: 2023-04-22T07:45:11.000Z
author: Igor Gorlov
image: ../../assets/images/undefined-Apr-22-2023.avif
categories:
  - Как закодить
tags:
  - Iam
  - Saml
draft: false
lastmod: 2024-03-20T21:26:42.986Z
---

Если вы читаете эту статью, значит, вы управляете идентификационными данными пользователей за пределами AWS и используете Identity Provider (IdP) Federation для предоставления этим внешним идентификационным данным разрешения на использование ресурсов AWS в вашей учетной записи.

В этом процессе аутентификации одной из наиболее распространенных ошибок, с которой вам, возможно, придется столкнуться, является “response did not contain a valid saml assertion”, и в этой статье я хочу поделиться с вами некоторыми советами по устранению неполадок, чтобы решить эту проблему.

<!-- wp:rank-math/toc-block {"title":"Оглавление","headings":[{"key":"33a8908c-967e-42fb-beb8-27286b8c0ead","content":"Расследование проблемы \u0022В ответе SAML не найдено действительное утверждение","level":2,"link":"#расследование-проблемы-в-ответе-saml-не-найдено-действительное-утверждение","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"c8e8eac1-ad45-4f99-97dc-71e98abff9ff","content":"Проверка имени атрибута и значения атрибута на вашем IdP","level":3,"link":"#проверка-имени-атрибута-и-значения-атрибута-на-вашем-id-p","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"bc0ce0ce-b909-4b44-9ba4-d4f86b4b0c8f","content":"Проблемы синхронизации времени между IdP и поставщиком услуг","level":3,"link":"#проблемы-синхронизации-времени-между-id-p-и-поставщиком-услуг","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"cefd3fa6-1413-4180-bf6e-47c075ecd38a","content":"Несоответствие Metadata.xml","level":3,"link":"#несоответствие-metadata-xml","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"c4474103-81f6-415b-a9db-536c8d0e6a72","content":"Как просмотреть ответ SAML для устранения неполадок","level":2,"link":"#как-просмотреть-ответ-saml-для-устранения-неполадок","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"573c3de0-c723-402a-a933-ded258492300","content":"Google Chrome и Firefox","level":3,"link":"#google-chrome-и-firefox","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"02980551-71a5-4209-81e2-15e6b0a0e60f","content":"Учебники","level":2,"link":"#учебники","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"4df591e1-4528-4243-afb8-a83c610315ca","content":"Выводы","level":2,"link":"#выводы","disable":false,"isUpdated":false,"isGeneratedLink":true}],"listStyle":"ul"} -->
<div class="wp-block-rank-math-toc-block" id="rank-math-toc"><h2>Оглавление</h2><nav><ul><li class=""><a href="#расследование-проблемы-в-ответе-saml-не-найдено-действительное-утверждение">Расследование проблемы "В ответе SAML не найдено действительное утверждение</a><ul><li class=""><a href="#проверка-имени-атрибута-и-значения-атрибута-на-вашем-id-p">Проверка имени атрибута и значения атрибута на вашем IdP</a></li><li class=""><a href="#проблемы-синхронизации-времени-между-id-p-и-поставщиком-услуг">Проблемы синхронизации времени между IdP и поставщиком услуг</a></li><li class=""><a href="#несоответствие-metadata-xml">Несоответствие Metadata.xml</a></li></ul></li><li class=""><a href="#как-просмотреть-ответ-saml-для-устранения-неполадок">Как просмотреть ответ SAML для устранения неполадок</a><ul><li class=""><a href="#google-chrome-и-firefox">Google Chrome и Firefox</a></li></ul></li><li class=""><a href="#учебники">Учебники</a></li><li class=""><a href="#выводы">Выводы</a></li></ul></nav></div>
<!-- /wp:rank-math/toc-block -->

<h2 class="wp-block-heading" id="расследование-проблемы-в-ответе-saml-не-найдено-действительное-утверждение">Расследование проблемы "В ответе SAML не найдено действительное утверждение</h2>

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="проверка-имени-атрибута-и-значения-атрибута-на-вашем-id-p">Проверка имени атрибута и значения атрибута на вашем IdP</h3>

Если вы работаете на AWS (но в целом), недействительное утверждение SAML в основном возникает, когда в SAML-ответе от IdP отсутствует атрибут с именем Name, установленным в https://aws.amazon.com/SAML/Attributes/Role . Атрибут также должен содержать один или несколько элементов AttributeValue, каждый из которых содержит эти две строки, разделенные запятой:

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>ARN роли, с которой может быть сопоставлен пользователь.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>ARN провайдера SAML.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

Например:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">&lt;Attribute Name="&lt;https://aws.amazon.com/SAML/Attributes/Role&gt;"&gt;

&lt;AttributeValue&gt;arn:aws:iam::account-number:role/role-name1,arn:aws:iam::account-number:saml-provider/provider-name&lt;/AttributeValue&gt;

&lt;/Attribute&gt;
</code></pre>
<!-- /wp:code -->

<a href="https://repost.aws/knowledge-center/iam-invalid-saml-response-okta" target="_blank" rel="noreferrer noopener nofollow">Здесь </a>также приведен пример разрешения для Okta.

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="проблемы-синхронизации-времени-между-id-p-и-поставщиком-услуг">Проблемы синхронизации времени между IdP и поставщиком услуг</h3>

https://docs.pulsesecure.net/WebHelp/Content/PCS/PCS_AdminGuide_8.2/Investigating a No valid assertion.htm

Если часы SAML IdP и поставщика услуг SAML (например, AWS) не синхронизированы, утверждение может быть признано недействительным, и аутентификация не пройдет.

Возможное решение - проверить, что ваш IdP и поставщик услуг могут использовать один и тот же NTP-сервер, или доказать, что часы вашего сервера актуальны.

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="несоответствие-metadata-xml">Несоответствие Metadata.xml</h3>

Обновление данных и модернизация могут привести к тому, что сертификаты перестанут доверять одной стороне процесса федерации или другой. Попробуйте проверить и обновить metadata.xml с обеих сторон, чтобы сертификаты снова совпадали.

Сообщение SAML неправильно отформатировано, содержит недостающие или недопустимые элементы

<a href="https://stackoverflow.com/questions/64158310/aws-sso-your-request-included-an-invalid-saml-response">https://stackoverflow.com/questions/64158310/aws-sso-your-request-included-an-invalid-saml-response</a>

Иногда ошибка возникает не только с атрибутом User, но и в целом, если сообщение должно содержать всю необходимую информацию в требуемом формате. Например:

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Сообщение было подписано, но подпись не может быть проверена.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Утверждение содержит неприемлемое ограничение аудитории.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Утверждение больше не действительно, или срок действия сообщения истек, см. раздел Проблемы синхронизации времени между IdP и поставщиком услуг.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Ответ SAML содержит ошибку, указывающую на то, что поставщик облачных услуг получил сообщение SAML от IdP с кодом состояния ошибки.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

Помните, что SAML соответствует схеме, поэтому вы должны придерживаться его стандарта при создании XML-запроса. Обязательно обратитесь к этому документу, чтобы увидеть все стандартные теги.

Еще несколькими примерами возможных опечаток могут быть:

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Не указание кодировки в начале XML: &lt;?xml version="1.0" encoding="UTF-8"?&gt;</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Ошибка в получателе данных SubjectConfirmationData : установите его на "https://signin.aws.amazon.com/saml".Не включено заявление об аутентификации.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<h2 class="wp-block-heading" id="как-просмотреть-ответ-saml-для-устранения-неполадок">Как просмотреть ответ SAML для устранения неполадок</h2>

<a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/troubleshoot_saml.html">https://docs.aws.amazon.com/IAM/latest/UserGuide/troubleshoot_saml.html</a>

В этой статье есть несколько идей, которые помогут вам выявить точную причину проблемы. Тем не менее, я также хотел бы дать вам несколько основных советов по отладке полученного вами утверждения SAML, чтобы найти детали, которые могут указать вам на первопричину проблемы.

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="google-chrome-и-firefox">Google Chrome и Firefox</h3>

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Нажмите F12, чтобы запустить консоль Developer Tools.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Выберите вкладку Сеть, а затем выберите пункт Сохранить журнал (Persist Log в Firefox).</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Найдите сообщение SAML Post, затем просмотрите вкладку Payload в верхней части. Найдите элемент SAMLResponse, который содержит ответ в Base64-кодировке.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Скопируйте его.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

💡 Примечание по безопасности: поскольку утверждения SAML содержат конфиденциальную информацию, я не рекомендую вам использовать онлайн-декодеры base64 и использовать один из этих простых скриптов, чтобы сделать это с вашего локального терминала.

<strong>Windows systems (PowerShell):</strong>

<code>PS C:\\&gt;[System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String(“base64encodedtext”))</code>

<strong>MacOS and Linux systems:</strong>

<code>$echo “base64encodedtext” | base64 --decode</code>

Кроме того, если атрибуты вашего поставщика идентификационных данных не зашифрованы, надстройка SAML Tracer для браузера Firefox или декодер SAML-сообщений Chrome могут просмотреть эти атрибуты.\*\*\*\*.

<h2 class="wp-block-heading" id="учебники">Учебники</h2>

Чтобы помочь вам в дальнейшем, вот две статьи из нашего блога, где мы делимся некоторыми советами по настройке SAML с GSuite (обратите внимание, что концепции и свойства аналогичны другим IdP).

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li><a href="https://blog.leapp.cloud/how-to-saml-federate-your-aws-account-with-g-suite">https://blog.leapp.cloud/how-to-saml-federate-your-aws-account-with-g-suite</a></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><a href="https://blog.leapp.cloud/how-to-update-in-bulk-g-suite-users-custom-attributes-with-google-admin-sdk">https://blog.leapp.cloud/how-to-update-in-bulk-g-suite-users-custom-attributes-with-google-admin-sdk</a></li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<h2 class="wp-block-heading" id="выводы">Выводы</h2>

В этой статье мы рассмотрели, как устранить очень неприятную ошибку федерации SAML: “Response did not contain a valid SAML assertion”.

Мы показали, что она может возникать, когда:

Ролевые атрибуты не установлены правильно в SAML-запросе - На стороне IdP.Имеет место десинхронизация времени между IdP и поставщиком услуг.Имеется несоответствие Metadata.xml между субъектами, поэтому сертификат не совпадает.В запросе есть опечатки или неверная структура SAML.

В общем, я всегда возвращаюсь к этой ссылке, когда мне нужно устранить неполадки в ответе SAML, поскольку проблема может заключаться в другой конфигурации в зависимости от используемого вами IdP.

Эта небольшая статья была полезна для всех вас, и до следующего раза, счастливых SAML утверждений, и до встречи в следующей статье! 😉.
