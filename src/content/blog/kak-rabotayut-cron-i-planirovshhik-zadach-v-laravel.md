---
title: Как работают cron и планировщик задач в Laravel
meta_title: Как работают cron и планировщик задач в Laravel - Igor Gorlov
description: >-
  Довольно часто я вижу, как люди ищут cron в контексте Laravel. Фреймворк имеет
  механизм поверх Linux crontab, чтобы заставить его работать. Позвольте мне...
date: 2023-01-29T17:07:00.000Z
image: ../../assets/images/undefined-Jan-29-2023.avif
categories:
  - Как закодить
author: Igor Gorlov
tags:
  - Laravel
  - Cron
draft: false
lastmod: 2024-03-20T21:26:45.826Z
---

Довольно часто я вижу, как люди ищут “cron” в контексте Laravel. Фреймворк имеет механизм поверх Linux crontab, чтобы заставить его работать. Позвольте мне показать вам, как это работает.

На самом деле все это описано в официальной документации здесь, но эта страница довольно длинная, и я хочу сократить ее до основных вещей, которые вам нужно знать. Тем не менее вы можете захотеть прочитать полную версию документации позже.

<h2 class="wp-block-heading">Основы: Задания Cron</h2>

Как люди раньше запускали периодические автоматические задания? С помощью так называемых cron-заданий, установленных на сервере. Чтобы настроить задание на выполнение, например, каждый час, нужно отредактировать текстовый файл crontab и добавить строку:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript"> 0 * * * * sh /path/to/script.sh </code></pre>
<!-- /wp:code -->

Эти звездочки означают разные периоды:

минутычасыдни месяцамесяцыдни недели

Итак, в приведенном выше случае сервер должен выполнять script.sh во все часы в 0 минут, что будет 9:00, 10:00, 11:00 и т.д. Один раз каждый час.

Таким образом, вы добавляете больше заданий, подобных этому, с разным синтаксисом для разных периодов.

На самом деле, вы можете использовать файл crontab и для выполнения команд Laravel artisan. Например:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">
0 9 * * * sh /path/to/your/project/php artisan some:command
</code></pre>
<!-- /wp:code -->

Это позволит выполнять php artisan some:command каждый день в 9:00.

Но ведь неудобно подключаться к серверу и настраивать все это вручную на всех серверах, верно? Вот тут-то и приходит на помощь функция Laravel Task Scheduler.

<h2 class="wp-block-heading">Планировщик задач Laravel</h2>

Laravel позволяет перечислить все ваши команды в определенном файле app/Console/Kernel.php, и вам нужно добавить только одну команду cron на ваш сервер:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">
* * * * * cd /path-to-your-project &amp;&amp; php artisan schedule:run &gt;&gt; /dev/null 2&gt;&amp;1
</code></pre>
<!-- /wp:code -->

Это означает, что каждую минуту будет выполняться php artisan schedule:run и проверять, есть ли команды для выполнения.

Вот основной метод по умолчанию в app/Console/Kernel.php:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">
class Kernel extends ConsoleKernel
{
protected function schedule(Schedule $schedule)
{
// $schedule-&gt;command('inspire')-&gt;hourly();
}

}
</code></pre>
<!-- /wp:code -->

Вот пример синтаксиса для ввода команд в расписание:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">
$schedule-&gt;[command]()-&gt;[when_to_execute]();
</code></pre>
<!-- /wp:code -->

Вам просто нужно перечислить здесь команды одну за другой, и задание cron, запускаемое каждую минуту, будет их выполнять.

Существует множество различных удобных для человека вариантов синтаксиса для ”когда выполнять”. Вот несколько примеров:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript"><code>-&gt;everyTwoMinutes()<span style="font-size: var(--wp--preset--font-size--medium);"> </span></code>
<code>-&gt;hourly()<span style="font-size: var(--wp--preset--font-size--medium);"> </span></code>
<code>-&gt;dailyAt('13:00')<span style="font-size: var(--wp--preset--font-size--medium);"> </span></code>
<code>-&gt;weeklyOn(1, '8:00')</code></code></pre>
<!-- /wp:code -->

И т.д.

Вы можете проверить их все в этом разделе документации.

Кроме того, в этом случае можно выполнить различные команды:

Artisan команды: <code>$schedule-&gt;command(‘emails:send Taylor --force’)</code>

Jobs: <code>$schedule-&gt;job(new Heartbeat)</code>

Shell commands: <code>$schedule-&gt;exec(‘node /home/forge/script.js’)</code>

И это основы, которые вам необходимо знать и понимать Планирование задач в Laravel. Для получения подробной информации и других возможностей читайте официальную документацию.
