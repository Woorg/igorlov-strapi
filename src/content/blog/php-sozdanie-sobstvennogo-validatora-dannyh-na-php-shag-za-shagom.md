---
title: 'PHP – Создание собственного валидатора данных на PHP: Шаг за шагом'
meta_title: >-
  PHP – Создание собственного валидатора данных на PHP: Шаг за шагом - Igor
  Gorlov
description: >-
  В этом руководстве я расскажу вам, как создать пользовательский валидатор
  данных в PHP, шаг за шагом создавая нашу собственную библиотеку валидации.
  Валидаторы данных являются важными инструментами для любого разработчика,
  которому необходимо обеспечить достоверность и безопасность данных,
  передаваемых пользователем. К концу этого урока вы будете хорошо понимать, как
  создавать пользовательские валидаторы данных в PHP, что позволит вам лучше
date: 2023-04-22T07:12:18.000Z
author: Igor Gorlov
image: ../../assets/images/undefined-Apr-22-2023.avif
categories:
  - Учебник
tags:
  - Php
draft: false
lastmod: 2024-03-20T21:26:47.174Z
---

В этом руководстве я расскажу вам, как создать пользовательский валидатор данных в PHP, шаг за шагом создавая нашу собственную библиотеку валидации. Валидаторы данных являются важными инструментами для любого разработчика, которому необходимо обеспечить достоверность и безопасность данных, передаваемых пользователем. К концу этого урока вы будете хорошо понимать, как создавать пользовательские валидаторы данных в PHP, что позволит вам лучше обрабатывать пользовательские данные и обеспечивать безопасность ваших приложений.

<!-- wp:rank-math/toc-block {"title":"Оглавление","headings":[{"key":"3373c9e1-ded1-4791-9003-e8b9d61e6efc","content":"Шаг 1: Создание класса валидации","level":2,"link":"#шаг-1-создание-класса-валидации","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"b93abc2d-1671-40e5-9608-bba0cb3fd0a7","content":"Шаг 2: Создание классов правил для валидации данных","level":2,"link":"#шаг-2-создание-классов-правил-для-валидации-данных","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"022d6257-fbf4-4e15-90d6-5819f7249dbd","content":"ValidatorInterface","level":3,"link":"#validator-interface","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"5d722dfc-5fd1-43b8-9ccd-32427f20ade5","content":"AbstractValidator","level":3,"link":"#abstract-validator","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"6376d013-7523-4688-b908-89d43847602e","content":"Integer","level":3,"link":"#integer","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"001b8c65-cdbd-4cd4-9ab8-377b4bdc7a19","content":"NotNull","level":3,"link":"#not-null","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"ab5682ee-3e61-4e93-bfae-164c6f4bff51","content":"Шаг 3: Создание экземпляра класса Validation","level":2,"link":"#шаг-3-создание-экземпляра-класса-validation","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"4f1544c1-5aa1-4144-a985-68a543516f7f","content":"Шаг 4: Валидация данных","level":2,"link":"#шаг-4-валидация-данных","disable":false,"isUpdated":false,"isGeneratedLink":true}],"listStyle":"ul"} -->
<div class="wp-block-rank-math-toc-block" id="rank-math-toc"><h2>Оглавление</h2><nav><ul><li class=""><a href="#шаг-1-создание-класса-валидации">Шаг 1: Создание класса валидации</a></li><li class=""><a href="#шаг-2-создание-классов-правил-для-валидации-данных">Шаг 2: Создание классов правил для валидации данных</a><ul><li class=""><a href="#validator-interface">ValidatorInterface</a></li><li class=""><a href="#abstract-validator">AbstractValidator</a></li><li class=""><a href="#integer">Integer</a></li><li class=""><a href="#not-null">NotNull</a></li></ul></li><li class=""><a href="#шаг-3-создание-экземпляра-класса-validation">Шаг 3: Создание экземпляра класса Validation</a></li><li class=""><a href="#шаг-4-валидация-данных">Шаг 4: Валидация данных</a></li></ul></nav></div>
<!-- /wp:rank-math/toc-block -->

<h2 class="wp-block-heading" id="шаг-1-создание-класса-валидации">Шаг 1: Создание класса валидации</h2>

Первым шагом является создание класса, который будет обрабатывать валидацию. Этот класс должен быть способен хранить правила проверки для каждого поля, которое мы хотим проверить, а также проверять эти правила при вызове.

Вот пример простого класса для проверки:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="php" class="language-php">&lt;?php

namespace DevCoder\Validator;

use DevCoder\Validator\Assert\ValidatorInterface;
use InvalidArgumentException;
use function get_class;
use function gettype;
use function is_array;
use function is_object;
use function sprintf;

class Validation
{
    /**
     * @var array&lt;string,array&gt;
     */
    private $validators;

    /**
     * @var array&lt;string,string&gt;
     */
    private $errors = [];

    /**
     * @var array
     */
    private $data = [];

    public function __construct(array $fieldValidators)
    {
        foreach ($fieldValidators as $field =&gt; $validators) {
            if (!is_array($validators)) {
                $validators = [$validators];
            }
            $this-&gt;addValidator($field, $validators);
        }
    }

    public function validate(array $data): bool
    {
        $this-&gt;data = $data;

        /**
         * @var $validators array&lt;ValidatorInterface&gt;
         */
        foreach ($this-&gt;validators as $field =&gt; $validators) {
            if (!isset($this-&gt;data[$field])) {
                $this-&gt;data[$field] = null;
            }

            foreach ($validators as $validator) {
                if ($validator-&gt;validate($this-&gt;data[$field]) === false) {
                    $this-&gt;addError($field, (string)$validator-&gt;getError());
                }
            }

        }
        return $this-&gt;getErrors() === [];
    }

    /**
     * @return array&lt;string,string&gt;
     */
    public function getErrors(): array
    {
        return $this-&gt;errors;
    }

    /**
     * @return array
     */
    public function getData(): array
    {
        return $this-&gt;data;
    }

    private function addError(string $field, string $message): void
    {
        $this-&gt;errors[$field][] = $message;
    }

    /**
     * @param string $field
     * @param array&lt;ValidatorInterface&gt; $validators
     * @return void
     */
    private function addValidator(string $field, array $validators): void
    {
        foreach ($validators as $validator) {
            if (!$validator instanceof ValidatorInterface) {
                throw new InvalidArgumentException(sprintf(
                    $field . ' validator must be an instance of ValidatorInterface, "%s" given.',
                    is_object($validator) ? get_class($validator) : gettype($validator)
                ));
            }

            $this-&gt;validators[$field][] = $validator;
        }
    }
}

</code></pre>
<!-- /wp:code -->

<h2 class="wp-block-heading" id="шаг-2-создание-классов-правил-для-валидации-данных">Шаг 2: Создание классов правил для валидации данных</h2>

Теперь, когда мы создали класс Validator, следующим шагом будет создание собственных правил валидации. Эти правила будут использоваться для проверки того, являются ли предоставленные данные действительными или нет. Мы создадим их в отдельных файлах, по одному для каждого правила валидации. Каждый файл правила валидации должен содержать класс, названный в честь правила, которое он реализует. Например, если у нас есть правило валидации, проверяющее, является ли значение целым числом, мы назовем класс Integer.

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="validator-interface">ValidatorInterface</h3>

<!-- wp:code -->
<pre class="wp-block-code"><code lang="php" class="language-php">&lt;?php

namespace DevCoder\Validator\Assert;

interface ValidatorInterface
{
    public function validate($value): bool;
    public function getError(): ?string;
}
</code></pre>
<!-- /wp:code -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="abstract-validator">AbstractValidator</h3>

<!-- wp:code -->
<pre class="wp-block-code"><code lang="php" class="language-php">&lt;?php

namespace DevCoder\Validator\Assert;

abstract class AbstractValidator implements ValidatorInterface
{
    /**
     * @var string|null
     */
    protected $error;

    public function getError(): ?string
    {
        return $this-&gt;error;
    }

    protected function error(string $message, array $context): void
    {
        $replace = [];
        foreach ($context as $key =&gt; $value) {
            if (is_object($value)) {
                $value = method_exists($value, '__toString') ? (string)$value : get_class($value);
            } elseif (is_array($value)) {
                $value = json_encode($value);
            } else {
                $value = (string)$value;
            }
            $replace['{{ ' . $key . ' }}'] = $value;
        }

        $this-&gt;error = strtr($message, $replace);
    }
}
</code></pre>
<!-- /wp:code -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="integer">Integer</h3>

<!-- wp:code -->
<pre class="wp-block-code"><code lang="php" class="language-php">&lt;?php

declare(strict_types=1);

namespace DevCoder\Validator\Assert;

use function ctype_digit;
use function is_int;
use function strval;

class Integer extends AbstractValidator
{
    /**
     * @var string
     */
    private $invalidMessage = 'This value should be of type {{ type }}.';
    private $minMessage = '{{ value }} should be {{ limit }} or more.';
    private $maxMessage = '{{ value }} should be {{ limit }} or less.';

    /**
     * @var int|null
     */
    private $min;
    /**
     * @var int|null
     */
    private $max;

    public function validate($value): bool
    {
        if ($value === null) {
            return true;
        }

        if (ctype_digit(strval($value)) === false) {
            $this-&gt;error($this-&gt;invalidMessage, ['value' =&gt; $value, 'type' =&gt; 'integer']);
            return false;
        }

        if (is_int($this-&gt;min) &amp;&amp; $value &lt; $this-&gt;min) {
            $this-&gt;error($this-&gt;minMessage, ['value' =&gt; $value, 'limit' =&gt; $this-&gt;min]);
            return false;
        }

        if (is_int($this-&gt;max) &amp;&amp; $value &gt; $this-&gt;max) {
            $this-&gt;error($this-&gt;maxMessage, ['value' =&gt; $value, 'limit' =&gt; $this-&gt;max]);
            return false;
        }

        return true;
    }

    public function invalidMessage(string $invalidMessage): self
    {
        $this-&gt;invalidMessage = $invalidMessage;
        return $this;
    }

    public function minMessage(string $minMessage): self
    {
        $this-&gt;minMessage = $minMessage;
        return $this;
    }

    public function maxMessage(string $maxMessage): self
    {
        $this-&gt;maxMessage = $maxMessage;
        return $this;
    }

    public function min(int $min): self
    {
        $this-&gt;min = $min;
        return $this;
    }

    public function max(int $max): self
    {
        $this-&gt;max = $max;
        return $this;
    }
}

</code></pre>
<!-- /wp:code -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading" id="not-null">NotNull</h3>

<!-- wp:code -->
<pre class="wp-block-code"><code lang="php" class="language-php">&lt;?php

declare(strict_types=1);

namespace DevCoder\Validator\Assert;

class NotNull extends AbstractValidator
{
    private $message = 'This value should not be null.';

    public function validate($value): bool
    {
        if ($value === null) {
            $this-&gt;error($this-&gt;message, ['value' =&gt; $value]);
            return false;
        }

        return true;
    }

    public function message(string $message): self
    {
        $this-&gt;message = $message;
        return $this;
    }
}

</code></pre>
<!-- /wp:code -->

<h2 class="wp-block-heading" id="шаг-3-создание-экземпляра-класса-validation">Шаг 3: Создание экземпляра класса Validation</h2>

Этот объект принимает массив вариантов валидации в качестве входных данных. Ключами массива являются имена полей, а значениями — массивы валидаторов.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="php" class="language-php">&lt;?php
$validation = new Validator([
    'age' =&gt; [(new Integer())-&gt;min(18)-&gt;max(99), new NotNull()],
    'number_of_children' =&gt; [new NotNull(), new Integer()],
    'salary' =&gt; [new NotNull(), new Integer()],
]);
</code></pre>
<!-- /wp:code -->

<h2 class="wp-block-heading" id="шаг-4-валидация-данных">Шаг 4: Валидация данных</h2>

После создания экземпляра класса Validation вы можете проверить данные, вызвав метод validate() класса Validation. Этот метод вернет true, если все правила валидации выполнены, и false в противном случае.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="php" class="language-php">&lt;?php

if ($validation-&gt;validate($_POST) === true) {
    $data = $validation-&gt;getData();
    // save in database
    // redirect in another page
}

return render('template.html.php', [
    'errors' =&gt; $validation-&gt;getErrors()
]);
</code></pre>
<!-- /wp:code -->

Пример других правил, которые могут быть добавлены

<!-- wp:code -->
<pre class="wp-block-code"><code lang="php" class="language-php">$validation = new Validation([
    'email' =&gt; [new NotNull(), new Email()],
    'password' =&gt; new NotNull(),
    'firstname' =&gt; [new NotNull(), (new StringLength())-&gt;min(3), new Alphabetic()],
    'lastname' =&gt; [(new StringLength())-&gt;min(3)],
    'gender' =&gt; new Choice(['Mme', 'Mr', null]),
    'website' =&gt; [new NotNull(), new Url()],
    'age' =&gt; [new NotNull(), (new Integer())-&gt;min(18)],
    'invoice_total' =&gt; [new NotNull(), new Numeric()],
    'active' =&gt; [new NotNull(), new Custom(function ($value) {
        return is_bool($value);
    })]
]);
</code></pre>
<!-- /wp:code -->

Чтобы увидеть другие правила валидации, которые можно добавить, посмотрите мой репозиторий на GitHub по следующему URL: https://github.com/devcoder-xyz/php-validator/tree/main/src/Assert.

Идеально подходит для небольшого проекта<br>Просто и легко!<br>https://github.com/devcoder-xyz/php-validator
