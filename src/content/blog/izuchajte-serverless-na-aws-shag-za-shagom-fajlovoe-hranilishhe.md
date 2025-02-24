---
title: Изучайте serverless на AWS шаг за шагом — Файловое хранилище
meta_title: Изучайте serverless на AWS шаг за шагом — Файловое хранилище - Igor Gorlov
description: >-
  В прошлой статье я рассказал об основах взаимодействия с базами данных
  DynamoDB с помощью CDK. В этой статье я расскажу о том, как хранить данные в
  виде файлов с помощью Amazon S3.
date: 2023-03-15T20:32:55.000Z
author: Igor Gorlov
image: ../../assets/images/undefined-Mar-15-2023.avif
categories:
  - Учебник
tags:
  - AWS
  - Serverless
draft: false
lastmod: 2024-03-20T21:26:48.166Z
---

В прошлой статье я рассказал об основах взаимодействия с базами данных DynamoDB с помощью CDK. В этой статье я расскажу о том, как хранить данные в виде файлов с помощью Amazon S3. Эта серия будет продолжаться! Следите за мной в twitter или DEV, чтобы получить уведомление о публикации следующей статьи!

<h2 class="wp-block-heading">Бессерверное хранение файлов с помощью Amazon S3</h2>

Две недели назад я рассказал об основах взаимодействия с базами данных DynamoDB. Эти базы данных отлично подходят для хранения структурированных данных, состоящих из небольших элементов: предельный размер одного элемента составляет 400 КБ. Однако что, если вы хотите хранить большие файлы? В этом случае следует использовать Amazon S3, сервис, позволяющий хранить файлы в облаке.

Amazon S3 очень мощный, потому что он может хранить практически бесконечное количество данных и оставаться доступным 99,99999999999% времени. Это также очень дешево, поскольку вы платите только за используемое хранилище и объем передаваемых данных.

Вместе мы собираемся создать небольшой клон dev.to, позволяющий пользователям публиковать, размещать и читать статьи. Содержимое статей, которое может быть довольно большим, мы будем хранить в Amazon S3, а метаданные (название статьи, автор и т.д.) - в DynamoDB: это будет отличный обзор предыдущей статьи!

В Amazon S3 файлы хранятся в ведрах. Ведро - это контейнер для файлов, и оно имеет уникальное имя. Каждое ведро может содержать почти бесконечное количество файлов. Вы также можете создавать подпапки в ведре и хранить файлы в этих подпапках.

Вот небольшая схема архитектуры, которую мы будем строить:

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--E4iORW_u--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://raw.githubusercontent.com/PChol22/kumo-articles/master/blog-posts/learn-serverless/storage/asset/architecture.png" alt="Схема архитектуры" title="architecture schema of the dev-to clone"/></figure>
<!-- /wp:image -->

Приложение будет содержать 3 лямбда-функции, базу данных DynamoDB, ведро S3 и REST API, взаимодействующие между собой.

<h2 class="wp-block-heading">Как создать ведро S3 с помощью CDK?</h2>

Как и в других статьях этого цикла, мы будем использовать AWS CDK для создания нашей инфраструктуры. Я начну с проекта, над которым работал в прошлой статье, и добавлю необходимый код для создания ведра S3. Если вы хотите следовать за мной, вы можете клонировать этот <a href="https://github.com/PChol22/learn-serverless" target="_blank" rel="noreferrer noopener nofollow">репозиторий</a> и проверить ветку баз данных.

Создать ведро очень просто, нужно лишь добавить следующий код в файл <code>learn-serverless-stack.ts</code>, в конструктор:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">// Previous code

export class LearnServerlessStack extends cdk.Stack {
  // Previous code
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Previous code
    const articlesBucket = new cdk.aws_s3.Bucket(this, 'articlesBucket', {});
  }
}
</code></pre>
<!-- /wp:code -->

Видите, ничего сложного! Обратите внимание, что я не указал никакого имени для ведра, CDK автоматически сгенерирует его за меня. Если вы хотите указать имя, вы можете сделать это, передав его в качестве параметра, но имейте в виду, что имя должно быть уникальным в мире, иначе развертывание будет неудачным.

<h2 class="wp-block-heading">Создание базы данных DynamoDB и трех функций Lambda</h2>

Давайте создадим таблицу DynamoDB для хранения метаданных наших статей. Мы также создадим три функции Lambda: одну для создания статьи, одну для списка всех статей и одну для чтения конкретной статьи.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">// Previous code

// Create the database
const articlesDatabase = new cdk.aws_dynamodb.Table(this, 'articlesDatabase', {
  partitionKey: {
    name: 'PK',
    type: cdk.aws_dynamodb.AttributeType.STRING,
  },
  sortKey: {
    name: 'SK',
    type: cdk.aws_dynamodb.AttributeType.STRING,
  },
  billingMode: cdk.aws_dynamodb.BillingMode.PAY_PER_REQUEST,
});

// Create the publishArticle Lambda function
const publishArticle = new cdk.aws_lambda_nodejs.NodejsFunction(this, 'publishArticle', {
  entry: path.join(__dirname, 'publishArticle', 'handler.ts'),
  handler: 'handler',
  environment: {
    BUCKET_NAME: articlesBucket.bucketName,
    TABLE_NAME: articlesDatabase.tableName,
  },
});

// Create the listArticles Lambda function
const listArticles = new cdk.aws_lambda_nodejs.NodejsFunction(this, 'listArticles', {
  entry: path.join(__dirname, 'listArticles', 'handler.ts'),
  handler: 'handler',
  environment: {
    BUCKET_NAME: articlesBucket.bucketName,
    TABLE_NAME: articlesDatabase.tableName,
  },
});

// Create the getArticle Lambda function
const getArticle = new cdk.aws_lambda_nodejs.NodejsFunction(this, 'getArticle', {
  entry: path.join(__dirname, 'getArticle', 'handler.ts'),
  handler: 'handler',
  environment: {
    BUCKET_NAME: articlesBucket.bucketName,
  },
});
</code></pre>
<!-- /wp:code -->

Если вернуться к схеме архитектуры, то можно увидеть, что существуют взаимодействия между функциями Lambda и S3 Bucket и таблицей DynamoDB:

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Ведро S3 взаимодействует с <code>publishArticle </code>и <code>getArticle </code>-&gt; я передал имя моего нового ведра в качестве переменной окружения функциям Lambda.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Таблица DynamoDB взаимодействует с <code>publishArticle </code>и <code>listArticles </code>-&gt; я передал имя моей новой таблицы в качестве переменной окружения функциям Lambda.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

Эти переменные окружения будут использоваться функциями Lambda для взаимодействия с S3 Bucket и таблицей DynamoDB.

<h2 class="wp-block-heading">Предоставьте разрешения функциям Lambda и создайте REST API</h2>

Разрешения являются основой безопасности в приложениях AWS. Если вы не предоставите явных разрешений вашим функциям Lambda, они не смогут взаимодействовать с ведром S3 и таблицей DynamoDB. Мы будем использовать методы <code>grantRead </code>и grantWrite для предоставления разрешений нашим Lambda-функциям.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">// Previous code
articlesBucket.grantWrite(publishArticle);
articlesDatabase.grantWriteData(publishArticle);

articlesDatabase.grantReadData(listArticles);

articlesBucket.grantRead(getArticle);
</code></pre>
<!-- /wp:code -->

Наконец, давайте подключим наши функции Lambda к REST API. Судя по прошлым статьям, API уже существует, и нам просто нужно добавить к нему новый ресурс. Мы создадим новый ресурс под названием <code>articles </code>и добавим к нему три метода: <code>POST</code>, <code>GET </code>и <code>GET /{id}</code>.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">// Previous code
const articlesResource = myFirstApi.root.addResource('articles');

articlesResource.addMethod('POST', new cdk.aws_apigateway.LambdaIntegration(publishArticle));
articlesResource.addMethod('GET', new cdk.aws_apigateway.LambdaIntegration(listArticles));
articlesResource.addResource('{id}').addMethod('GET', new cdk.aws_apigateway.LambdaIntegration(getArticle));
</code></pre>
<!-- /wp:code -->

И мы закончили с инфраструктурой! Осталось написать код наших лямбда-функций (самая интересная часть 😎).

<h2 class="wp-block-heading">Взаимодействие с ведром S3 и таблицей DynamoDB</h2>

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Публикация статьи</h3>

Начнем с лямбда-функции <code>publishArticle</code>. Эта функция будет вызываться, когда пользователь захочет опубликовать статью. Она получит название, содержание и автора статьи из тела запроса, сохранит статью в S3 Bucket и ее метаданные в таблице DynamoDB.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

const dynamoDBClient = new DynamoDBClient({});
const s3Client = new S3Client({});

export const handler = async (event: { body: string }): Promise&lt;{ statusCode: number; body: string }&gt; =&gt; {
  // parse the request body
  const { title, content, author } = JSON.parse(event.body) as { title?: string; content?: string; author?: string };

  if (title === undefined || content === undefined || author === undefined) {
    return Promise.resolve({ statusCode: 400, body: 'Missing title or content' });
  }

  // generate a unique id for the article
  const id = uuidv4();

  // store the article metadata in the database PK = article, SK = ${id}
  await dynamoDBClient.send(
    new PutItemCommand({
      TableName: process.env.TABLE_NAME,
      Item: {
        PK: { S: `article` },
        SK: { S: id },
        title: { S: title },
        author: { S: title },
      },
    }),
  );

  // store the article content in the bucket
  await s3Client.send(
    new PutObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: id,
      Body: content,
    }),
  );

  // return the id of the article
  return { statusCode: 200, body: JSON.stringify({ id }) };
};
</code></pre>
<!-- /wp:code -->

В приведенном выше коде я использовал пакеты <code>@aws-sdk/client-dynamodb</code> и <code>@aws-sdk/client-s3</code> для взаимодействия с таблицей DynamoDB и ведром S3. Я использовал команды <code>PutItemCommand</code> и <code>PutObjectCommand</code> для хранения метаданных и содержимого статьи в таблице DynamoDB и ведре S3.

Если вам нужно освежить в памяти, как взаимодействовать с DynamoDB, ознакомьтесь с моей последней статьей;

Обратите внимание, что я использовал переменные окружения <code>process.env.TABLE_NAME</code> и <code>process.env.BUCKET_NAME</code> для получения имени таблицы DynamoDB и ведра S3, эти переменные окружения были установлены в CDK ранее!

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Получить статью</h3>

Лямбда-функция <code>getArticle</code> будет вызываться, когда пользователь захочет получить статью. Она получит id статьи из параметров пути запроса и вернет содержимое статьи, хранящееся в S3 Bucket.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">import { GetObjectCommand, GetObjectCommandOutput, S3Client } from '@aws-sdk/client-s3';

const client = new S3Client({});

export const handler = async ({
  pathParameters: { id },
}: {
  pathParameters: { id: string };
}): Promise&lt;{ statusCode: number; body: string }&gt; =&gt; {
  let result: GetObjectCommandOutput | undefined;

  // get the article content from the bucket using the id as the key
  try {
    result = await client.send(
      new GetObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: id,
      }),
    );
  } catch {
    result = undefined;
  }

  if (result?.Body === undefined) {
    return { statusCode: 404, body: 'Article not found' };
  }

  // transform the body of the response to a string
  const content = await result.Body.transformToString();

  // return the article content
  return {
    statusCode: 200,
    body: JSON.stringify({ content }),
  };
};
</code></pre>
<!-- /wp:code -->

В приведенном выше коде я использовал пакет <code>@aws-sdk/client-s3</code> для взаимодействия с S3 Bucket. Я использовал команду <code>GetObjectCommand</code> для получения содержимого статьи из ведра S3. Указанный ключ id - это id статьи (помните, что я использовал этот id для создания объекта в PublishArticle).

Команда GetObjectCommand возвращает объект <code>GetObjectCommandOutput</code>, который содержит тело ответа. Если запрос не встречает проблем, я использую метод transformToString, чтобы преобразовать тело в строку и вернуть ее.

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Перечислить статьи</h3>

Лямбда-функция <code>listArticles</code> будет вызываться, когда пользователь захочет перечислить все статьи. Она вернет список метаданных статей, хранящихся в таблице DynamoDB. Пока что у нее не будет никаких параметров.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">import { DynamoDBClient, QueryCommand } from '@aws-sdk/client-dynamodb';

const client = new DynamoDBClient({});

export const handler = async (): Promise&lt;{ statusCode: number; body: string }&gt; =&gt; {
  // Query the list of the articles with the PK = 'article'
  const { Items } = await client.send(
    new QueryCommand({
      TableName: process.env.TABLE_NAME,
      KeyConditionExpression: 'PK = :pk',
      ExpressionAttributeValues: {
        ':pk': { S: 'article' },
      },
    }),
  );

  if (Items === undefined) {
    return { statusCode: 500, body: 'No articles found' };
  }

  // map the results (un-marshall the DynamoDB attributes)
  const articles = Items.map(item =&gt; ({
    id: item.SK?.S,
    title: item.title?.S,
    author: item.author?.S,
  }));

  // return the list of articles (title, id and author)
  return {
    statusCode: 200,
    body: JSON.stringify({ articles }),
  };
};
</code></pre>
<!-- /wp:code -->

Эта функция Lambda менее интересна, так как она работает только с DynamoDB, я использую команду QueryCommand для перечисления всех элементов таблицы с PK = ‘article’. (помните, что я установил PK = ‘article’ и SK = ’${id}’, когда хранил метаданные статьи в PublishArticle).

<h2 class="wp-block-heading">Пора протестировать наше приложение!</h2>

Сначала необходимо развернуть приложение. Для этого нужно выполнить следующую команду:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">npm run cdk deploy
</code></pre>
<!-- /wp:code -->

Как только вы закончите, перейдите в Postman и протестируйте ваш новый API!

Давайте создадим статью с помощью POST-вызова, содержащего правильное тело:

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--pSU-cvvP--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://raw.githubusercontent.com/PChol22/kumo-articles/master/blog-posts/learn-serverless/storage/asset/create-first-article.png" alt="Создайте первую статью" title="Create first article"/></figure>
<!-- /wp:image -->

Затем вы можете перечислить все статьи с помощью вызова GET:

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--8NR_rWBM--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://raw.githubusercontent.com/PChol22/kumo-articles/master/blog-posts/learn-serverless/storage/asset/first-list.png" alt="Список статей (1 статья)" title="List articles (1 article)"/></figure>
<!-- /wp:image -->

И, наконец, вы можете получить содержимое только что созданной статьи с помощью вызова GET:

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--vGzVXazd--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://raw.githubusercontent.com/PChol22/kumo-articles/master/blog-posts/learn-serverless/storage/asset/first-get.png" alt="Получить первую статью" title="Get first article"/></figure>
<!-- /wp:image -->

Но теперь, чтобы увидеть силу S3, давайте создадим вторую статью с гораздо, гораздо, гораздо большим содержанием:

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--oCUAoWyT--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://raw.githubusercontent.com/PChol22/kumo-articles/master/blog-posts/learn-serverless/storage/asset/create-second-article.png" alt="Создание второй статьи" title="Create second article"/></figure>
<!-- /wp:image -->

Вы можете видеть, что список статей обновляется автоматически:

И когда вы получаете содержимое второй статьи, вы видите, что полезная нагрузка намного больше, чем 800kB!!! Это никогда бы не поместилось в элемент DynamoDB! Вот в чем сила S3!

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--hLCWqYyb--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://raw.githubusercontent.com/PChol22/kumo-articles/master/blog-posts/learn-serverless/storage/asset/second-list.png" alt="Список статей (2 статьи)" title="List articles (2 articles)"/></figure>
<!-- /wp:image -->

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--mibPSRN9--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://raw.githubusercontent.com/PChol22/kumo-articles/master/blog-posts/learn-serverless/storage/asset/second-get.png" alt="Получить вторую статью" title="Get second article"/></figure>
<!-- /wp:image -->

<h2 class="wp-block-heading">Улучшение качества нашего приложения</h2>

Мы просто создали простой S3 Bucket, используя минимально возможную конфигурацию. Но мы можем улучшить качество нашего приложения, добавив некоторые функции:

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Мы можем зарегистрировать статьи в S3 Bucket с помощью класса хранения "Intelligent-Tiering", который будет автоматически перемещать данные в класс хранения "Infrequent Access", когда к ним не обращаются в течение некоторого времени.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Мы можем заблокировать публичный доступ к нашему S3 Bucket, за исключением случаев, когда доступ к нему осуществляет функция Lambda</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Мы можем обеспечить шифрование нашего ведра S3.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>...</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

Для этого давайте обновим конфигурацию нашего ведра S3:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">// Previously, we had:
const articlesBucket = new cdk.aws_s3.Bucket(this, 'articlesBucket', {});

// Now, we have:
const articlesBucket = new cdk.aws_s3.Bucket(this, 'articlesBucket', {
  lifecycleRules: [
    // Enable intelligent tiering
    {
      transitions: [
        {
          storageClass: cdk.aws_s3.StorageClass.INTELLIGENT_TIERING,
          transitionAfter: cdk.Duration.days(0),
        },
      ],
    },
  ],
  blockPublicAccess: cdk.aws_s3.BlockPublicAccess.BLOCK_ALL, // Enable block public access
  encryption: cdk.aws_s3.BucketEncryption.S3_MANAGED, // Enable encryption
});
</code></pre>
<!-- /wp:code -->

Существует множество других небольших улучшений, которые вы можете сделать не только с этим Bucket, но и с вашими Lambdas или API! Я создал инструмент под названием sls-mentor, который поможет вам улучшить качество вашего бессерверного приложения. Он проверит ваш код и вашу конфигурацию и даст вам рекомендации по улучшению вашего приложения!

По сути, это большой облачный линтер, не стесняйтесь проверить его, чтобы узнать больше о AWS!

<h2 class="wp-block-heading">Домашнее задание 🤓</h2>

Мы создали простое приложение для публикации и чтения статей. Но оно не идеально, есть некоторые вещи, которые мы можем улучшить:

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Мы не можем ни удалить статью, ни обновить ее!</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Нет управления пользователями, любой может опубликовать статью и просмотреть все статьи. Основываясь на моей последней статье, вы можете использовать userId в качестве PK таблицы статей. Таким образом, вы сможете выводить список статей только пользователя, и только он сможет удалять свои статьи.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Если у вас есть желание, вы можете попробовать хранить в S3 изображения обложек для каждой статьи и возвращать их при ПОЛУЧЕНИИ статьи.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

Вот это программа! Надеюсь, вам понравилась эта статья, и вы узнали что-то новое. Если у вас есть вопросы, не стесняйтесь обращаться ко мне!

Помните, что код, описанный в этой статье, вы можете найти в моем <a href="https://github.com/PChol22/learn-serverless" target="_blank" rel="noreferrer noopener nofollow">репозитории</a>.

<h2 class="wp-block-heading">Заключение</h2>

Я планирую продолжать эту серию статей раз в два месяца. Я уже рассказал о создании простых лямбда-функций и REST API, а также о взаимодействии с базами данных DynamoDB. Вы можете следить за этим прогрессом на моем репозитории! Я буду освещать новые темы, такие как хранение файлов, создание приложений, управляемых событиями, и многое другое. Если у вас есть какие-либо предложения, не стесняйтесь обращаться ко мне!

Я буду очень признателен, если вы отреагируете и поделитесь этой статьей со своими друзьями и коллегами. Это очень поможет мне расширить свою аудиторию. Также не забудьте подписаться на рассылку, чтобы быть в курсе, когда выйдет следующая статья!
