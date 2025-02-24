---
title: Django сигналы
meta_title: Django сигналы - Igor Gorlov
description: >-
  Сигналы в django – это способ для ваших моделей общаться друг с другом при
  наступлении события. Те, кто работал с JavaScript, скорее всего, сталкивались
  с методом .addEventListener(), который вызывается только при наступлении
  события. Этот метод работает так же, как и сигналы django, но на этот раз он
  вызывается, когда одна часть двух связанных моделей сохраняется, удаляется,
  обновляется и т.д.
date: 2023-04-27T21:42:29.000Z
author: Igor Gorlov
image: ../../assets/images/undefined-Apr-28-2023.avif
categories:
  - Как закодить
tags:
  - Django
draft: false
lastmod: 2024-03-20T21:26:44.199Z
---

<!-- wp:rank-math/toc-block {"title":"Оглавление","headings":[{"key":"5d314a49-a0d7-44c3-a366-4c74850f837e","content":"Добрый день, гики!!!","level":2,"link":"#добрый-день-гики","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"e8d63cbf-9d90-46ab-9c6a-cdb4e73fcedf","content":"Создание рабочего сигнала","level":2,"link":"#создание-рабочего-сигнала","disable":false,"isUpdated":false,"isGeneratedLink":true}],"listStyle":"ul"} -->
<div class="wp-block-rank-math-toc-block" id="rank-math-toc"><h2>Оглавление</h2><nav><ul><li class=""><a href="#добрый-день-гики">Добрый день, гики!!!</a></li><li class=""><a href="#создание-рабочего-сигнала">Создание рабочего сигнала</a></li></ul></nav></div>
<!-- /wp:rank-math/toc-block -->

<h2 class="wp-block-heading" id="добрый-день-гики">Добрый день, гики!!!</h2>

Сигналы в django - это способ для ваших моделей общаться друг с другом при наступлении события. Те, кто работал с JavaScript, скорее всего, сталкивались с методом .addEventListener(), который вызывается только при наступлении события. Этот метод работает так же, как и сигналы django, но на этот раз он вызывается, когда одна часть двух связанных моделей сохраняется, удаляется, обновляется и т.д.

Ниже перечислены некоторые из доступных событий, которые могут быть вызваны.

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>pre_save и post_save: Эти события вызываются перед сохранением модели и после сохранения модели соответственно.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>pre_delete и post_delete: Эти события вызываются до или после удаления модели соответственно.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>m2m_changed: Вызывается при изменении поля "многие ко многим" в модели.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>request_started и request_finished: Вызываются до и после того, как HTTP-запрос будет отправлен или завершен соответственно.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<h2 class="wp-block-heading" id="создание-рабочего-сигнала">Создание рабочего сигнала</h2>

Одна очень важная часть моего django приложения, где я использую сигналы, это когда я работаю с моделью, которая имеет отношения один к одному с моделью пользователя. В этом учебнике я буду использовать модель Profile. У каждого пользователя должен быть профиль, который является расширением модели пользователя. На самом деле это можно сделать разными способами, один из которых - переопределить метод сохранения модели пользователя и затем создать профиль для созданного пользователя. Но давайте предположим, что мы хотим, чтобы все было просто и аккуратно, сигналы будут правильным способом.

Я буду считать, что вы уже знаете, как начать проект django, поэтому я пропущу эту часть. Перейдите в файл models.py вашего приложения и создайте модель Profile.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">from django.contrib.auth import get_user_model
import uuid

# user object
User = get_user_model()


class Profile(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    friends = models.ManyToManyField("self", blank=True)
    picture = models.ImageField(upload_to="dps")

    def __str__(self):
        return self.user.username


</code></pre>
<!-- /wp:code -->

Хорошо! Мы настроили нашу модель профиля, давайте сделаем миграции и мигрируем в базу данных

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">$ python manage.py makemigrations
$ python manage.py migrate
</code></pre>
<!-- /wp:code -->

Теперь мы хотим, чтобы профили автоматически создавались при создании экземпляра пользователя. Для этого создайте файл в каталоге вашего приложения и назовите его signals.py

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">#signals.py

from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Profile, User

@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
        print(f"Profile for {instance.username} created successfully!!")

</code></pre>
<!-- /wp:code -->

Здесь я использовал сигнал post_save, потому что наш профиль будет создан после успешного создания пользователя.

Нам нужно сообщить нашему приложению об этом файле, поэтому перейдите к вашему файлу apps.py, который был создан, когда вы выполнили $ python manage.py startapp , и добавьте в него этот фрагмент кода.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">class AccountConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name="account"

    # add this
    def ready(self):
        from . import signals
</code></pre>
<!-- /wp:code -->

Теперь все готово. Чтобы это работало, убедитесь, что ваше приложение зарегистрировано в INSTALLED_APPS как &lt;имя<em>приложения&gt;.apps.&lt;имя</em>приложения&gt;Config.

Теперь вы можете создавать экземпляры профилей просто на лету. Спасибо, что прочитали, оставляйте комментарии ниже. До встречи в следующем выпуске.
