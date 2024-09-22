---
title: Создание более безопасных онлайн-сообществ с помощью ИИ/МЛ модерации контента
meta_title: Создание более безопасных онлайн-сообществ с помощью ИИ/МЛ модерации контента
description: >-
  Интерактивность и непредсказуемость платформ для создания пользовательского
  контента (UGC) в прямом эфире во многом объясняет их популярность. Но эта
  непредсказуемость означает, что сообщества должны тщательно следить за своим
  контентом, чтобы убедиться, что он соответствует правилам сообщества или
  политике приемлемого использования и является подходящим, безопасным и
  доброжелательным для всех пользователей.
date: 2023-04-22T07:35:11.000Z
author: Igor Gorlov
image: ../../assets/images/undefined-Apr-22-2023.avif
categories:
  - Как закодить
tags:
  - Amazon Rekognition
  - AWS
lastmod: 2024-03-20T21:26:48.340Z
---

Интерактивность и непредсказуемость платформ для создания пользовательского контента (UGC) в прямом эфире во многом объясняет их популярность. Но эта непредсказуемость означает, что сообщества должны тщательно следить за своим контентом, чтобы убедиться, что он соответствует правилам сообщества или политике приемлемого использования и является подходящим, безопасным и доброжелательным для всех пользователей. Это часто приводит к созданию системы модерации, в которой пользователи сообщают о потенциальных нарушениях правил сообщества, а модераторы или администраторы принимают необходимые меры. Часто это ручной процесс, который оставляет желать лучшего. В последние годы инструменты искусственного интеллекта (ИИ) и машинного обучения (МЛ) усовершенствовались, и разработчики могут использовать их для помощи в модерировании своих сообществ. В этой статье мы рассмотрим один из способов сделать это с помощью Amazon Interactive Video Service (Amazon IVS) и Amazon Rekognition.

<!-- wp:rank-math/toc-block {"title":"Оглавление","headings":[{"key":"dc9f9fe0-ded8-4452-b8ac-61ff3bc73670","content":"Обзор решения","level":2,"link":"#обзор-решения","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"1af28a6b-8269-4830-a6b1-2c13ab095607","content":"Создание правила Amazon EventBridge и функции AWS Lambda","level":2,"link":"#создание-правила-amazon-event-bridge-и-функции-aws-lambda","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"4c090d73-e668-4d29-bafc-c01f3e8a07e5","content":"Создание функций AWS Lambda","level":2,"link":"#создание-функций-aws-lambda","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"34fa81f7-ed25-4c71-9b99-91bec1ffcf75","content":"Демо","level":2,"link":"#демо","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"b5a69b5d-ce1a-4dd8-887e-4fd7cfcfd7a3","content":"Резюме","level":2,"link":"#резюме","disable":false,"isUpdated":false,"isGeneratedLink":true}],"listStyle":"ul"} -->
<div class="wp-block-rank-math-toc-block" id="rank-math-toc"><h2>Оглавление</h2><nav><ul><li class=""><a href="#обзор-решения">Обзор решения</a></li><li class=""><a href="#создание-правила-amazon-event-bridge-и-функции-aws-lambda">Создание правила Amazon EventBridge и функции AWS Lambda</a></li><li class=""><a href="#создание-функций-aws-lambda">Создание функций AWS Lambda</a></li><li class=""><a href="#демо">Демо</a></li><li class=""><a href="#резюме">Резюме</a></li></ul></nav></div>
<!-- /wp:rank-math/toc-block -->

<h2 class="wp-block-heading" id="обзор-решения">Обзор решения</h2>

Анализ каждого кадра каждого живого потока в приложении с помощью AI/ML был бы очень дорогой и сложной задачей. Вместо этого разработчики могут анализировать образцы прямых трансляций в своих приложениях с определенной периодичностью, чтобы помочь модераторам, предупреждая их о наличии контента, нуждающегося в дальнейшем рассмотрении человеком-модератором. Это не 100% идеальное решение, но это один из способов автоматизировать модерацию контента и облегчить работу модераторов.

Это решение включает в себя следующие шаги:

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Настройте автоматическую запись живых потоков в Amazon Simple Storage Service (Amazon S3) на ваших каналах Amazon IVS для сохранения уменьшенных изображений с заданной частотой.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Создайте правило Amazon EventBridge, которое срабатывает при создании нового объекта в ведре Amazon S3.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Создайте функцию AWS Lambda, которая будет запускаться правилом EventBridge и использовать Amazon Rekognition для обнаружения контента, такого как нагота, насилие или азартные игры, которые могут нуждаться в модерации человеком.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Создайте функцию AWS Lambda и откройте ее через Amazon API Gateway, чтобы обеспечить средства для остановки прямого потока, если это необходимо.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Отправьте пользовательское событие в чат Amazon IVS, содержащее результаты анализа.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<h2 class="wp-block-heading" id="создание-правила-amazon-event-bridge-и-функции-aws-lambda">Создание правила Amazon EventBridge и функции AWS Lambda</h2>

Мы будем использовать AWS Serverless Application Model (SAM), чтобы упростить создание правила и функций. Вот весь файл template.yaml, который описывает необходимые разрешения, правило Amazon EventBridge, слой AWS Lambda (для зависимости от AWS SDK) и определения функций. Мы разберем это ниже.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">AWSTemplateFormatVersion: '2010-09-09'
Transform: 'AWS::Serverless-2016-10-31'
Description: Amazon IVS Moderation Functions
Globals:
  Function:
    Runtime: nodejs18.x
    Timeout: 30
    MemorySize: 128
  Api:
    EndpointConfiguration: 
      Type: REGIONAL
    Cors:
      AllowMethods: "'GET, POST, OPTIONS'"
      AllowHeaders: "'Content-Type'"
      AllowOrigin: "'*'"
      MaxAge: "'600'"
Resources:
  IvsChatLambdaRefLayer:
    Type: AWS::Serverless::LayerVersion
    Properties:
      LayerName: sam-app-dependencies
      Description: Dependencies for sam app
      ContentUri: dependencies/
      CompatibleRuntimes:
        - nodejs18.x
      LicenseInfo: "MIT"
      RetentionPolicy: Retain
  IVSAccessPolicy:
    Type: AWS::IAM::Policy
    Properties:
      PolicyName: IVSModerationAccessPolicy
      PolicyDocument:
        Version: "2012-10-17"
        Statement:
          - Effect: Allow
            Action:
              - 's3:GetObject'
              - 's3:GetObjectAcl'
              - 'ivschat:SendEvent'
              - 'ivs:StopStream'
              - 'rekognition:DetectModerationLabels'
            Resource: '*'
      Roles:
        - Ref: ModerateImageRole
        - Ref: StopStreamRole
  ApiAccessPolicy:
    Type: AWS::IAM::Policy
    Properties:
      PolicyName: ApiAccessPolicy
      PolicyDocument:
        Version: "2012-10-17"
        Statement:
          - Effect: Allow
            Action:
              - 'sts:AssumeRole'
            Resource: '*'
      Roles:
        - Ref: ModerateImageRole
        - Ref: StopStreamRole
  EventRule:
    Type: AWS::Events::Rule
    Properties:
      Description: EventRule
      State: ENABLED
      EventPattern: 
        source:
          - aws.s3
        detail-type:
          - "Object Created"
        detail:
          bucket:
            name:
              - ivs-demo-channel-stream-archive
          object:
            key:
              - suffix: .jpg
      Targets:
        - Arn: !GetAtt ModerateImage.Arn
          Id: MyLambdaFunctionTarget
  PermissionForEventsToInvokeLambda:
    Type: AWS::Lambda::Permission
    Properties:
      FunctionName: !Ref ModerateImage
      Action: lambda:InvokeFunction
      Principal: events.amazonaws.com
      SourceArn: !GetAtt EventRule.Arn
  ModerateImage:
    Type: 'AWS::Serverless::Function'
    Properties:
      Environment:
        Variables:
          DEMO_CHAT_ARN: 'arn:aws:ivschat:us-east-1:[redacted]:room/[redacted]'
          DEMO_CHANNEL_ARN: 'arn:aws:ivs:us-east-1:[redacted]:channel/[redacted]'
      Handler: index.moderateImage
      Layers:
        - !Ref IvsChatLambdaRefLayer
      CodeUri: lambda/
  StopStream:
    Type: 'AWS::Serverless::Function'
    Properties:
      Environment:
        Variables:
          DEMO_CHAT_ARN: 'arn:aws:ivschat:us-east-1:[redacted]:room/[redacted]'
          DEMO_CHANNEL_ARN: 'arn:aws:ivs:us-east-1:[redacted]:channel/[redacted]'
      Handler: index.stopStream
      Layers:
        - !Ref IvsChatLambdaRefLayer
      CodeUri: lambda/
      Events:
        Api1:
          Type: Api
          Properties:
            Path: /stop-stream
            Method: POST
Outputs:
  ApiURL:
    Description: "API endpoint URL for Prod environment"
    Value: !Sub "https://${ServerlessRestApi}.execute-api.${AWS::Region}.amazonaws.com/Prod/"
</code></pre>
<!-- /wp:code -->

В этом файле многое происходит, поэтому давайте немного разберем его. Во-первых, мы создаем слой для включения AWS SDK for JavaScript (v3) в нашу функцию.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">IvsChatLambdaRefLayer:
  Type: AWS::Serverless::LayerVersion
  Properties:
    LayerName: sam-app-dependencies
    Description: Dependencies for sam app
    ContentUri: dependencies/
    CompatibleRuntimes:
      - nodejs18.x
    LicenseInfo: "MIT"
    RetentionPolicy: Retain
</code></pre>
<!-- /wp:code -->

В каталоге dependencies/nodejs находится файл package.json, который включает модули, необходимые нашей функции.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">{
  "dependencies": {
    "@aws-sdk/client-ivs": "^3.289.0",
    "@aws-sdk/client-ivschat": "^3.289.0",
    "@aws-sdk/client-rekognition": "^3.289.0"
  }
}
</code></pre>
<!-- /wp:code -->

Следующий раздел, обозначенный ключами IVSAccessPolicy и APIAccessPolicy, дает нашему бессерверному приложению возможность получить доступ к необходимым API (s3:GetObject, s3:GetObjectAcl, ivschat:SendEvent, ivs:StopStream и rekognition:DetectModerationLabels) и выставить метод остановки потока, который мы создадим ниже, через Amazon API Gateway.

Далее мы создаем правило Amazon EventBridge. Свойство name в поле bucket должно соответствовать имени ведра Amazon S3, которое вы настроили в конфигурации записи. Запись на Amazon S3 создает различные файлы, включая плейлисты и HLS-медиа, поэтому мы можем отфильтровать это правило, чтобы оно срабатывало только для наших миниатюр, установив ключ в объекте как suffix: jpg.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">EventRule:
  Type: AWS::Events::Rule
  Properties:
    Description: EventRule
    State: ENABLED
    EventPattern: 
      source:
        - aws.s3
      detail-type:
        - "Object Created"
      detail:
        bucket:
          name:
            - ivs-demo-channel-stream-archive
        object:
          key:
            - suffix: .jpg
    Targets:
      - Arn: !GetAtt ModerateImage.Arn
        Id: MyLambdaFunctionTarget
</code></pre>
<!-- /wp:code -->

Далее мы предоставляем правилу необходимые разрешения для вызова функции AWS Lambda.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">PermissionForEventsToInvokeLambda:
  Type: AWS::Lambda::Permission
  Properties:
    FunctionName: !Ref ModerateImage
    Action: lambda:InvokeFunction
    Principal: events.amazonaws.com
    SourceArn: !GetAtt EventRule.Arn
</code></pre>
<!-- /wp:code -->

Теперь мы можем определить нашу функцию, которая будет вызываться правилом Amazon EventBridge.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">ModerateImage:
  Type: 'AWS::Serverless::Function'
  Properties:
    Environment:
      Variables:
        DEMO_CHAT_ARN: 'arn:aws:ivschat:us-east-1:[redacted]:room/[redacted]'
        DEMO_CHANNEL_ARN: 'arn:aws:ivs:us-east-1:[redacted]:channel/[redacted]'
    Handler: index.moderateImage
    Layers:
      - !Ref IvsChatLambdaRefLayer
    CodeUri: lambda/
</code></pre>
<!-- /wp:code -->

Примечание: я объявляю DEMO_CHAT_ARN и DEMO_CHANNEL_ARN как переменные среды, но ваше приложение, скорее всего, будет получать значения ARN из события, передаваемого в функцию, поскольку вы, вероятно, будете использовать эту функциональность не только с одним каналом Amazon IVS.

Наконец, мы можем определить функцию, которая будет использоваться для остановки потока, если это необходимо.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">StopStream:
  Type: 'AWS::Serverless::Function'
  Properties:
    Environment:
      Variables:
        DEMO_CHAT_ARN: 'arn:aws:ivschat:us-east-1:[redacted]:room/[redacted]'
        DEMO_CHANNEL_ARN: 'arn:aws:ivs:us-east-1:[redacted]:channel/[redacted]'
    Handler: index.stopStream
    Layers:
      - !Ref IvsChatLambdaRefLayer
    CodeUri: lambda/
    Events:
      Api1:
        Type: Api
        Properties:
          Path: /stop-stream
          Method: POST
</code></pre>
<!-- /wp:code -->

<h2 class="wp-block-heading" id="создание-функций-aws-lambda">Создание функций AWS Lambda</h2>

Теперь, когда мы описали нашу инфраструктуру с помощью AWS SAM, давайте создадим описанные нами функции. В файле index.mjs мы импортируем классы SDK, получим значения Arn из переменных окружения, которые мы передали, и создадим экземпляры клиентов, необходимых для наших функций.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">import { IvsClient, StopStreamCommand } from "@aws-sdk/client-ivs";
import { IvschatClient, SendEventCommand } from "@aws-sdk/client-ivschat";
import { RekognitionClient, DetectModerationLabelsCommand } from "@aws-sdk/client-rekognition";

const chatArn = process.env.DEMO_CHAT_ARN;
const channelArn = process.env.DEMO_CHANNEL_ARN;

const ivsClient = new IvsClient();
const ivsChatClient = new IvschatClient();
const rekognitionClient = new RekognitionClient();
</code></pre>
<!-- /wp:code -->

Функция moderateImage получит событие Amazon EventBridge, извлечет bucket и ключ из события и отправит команду DetectModerationLabelsCommand через rekognitionClient для обнаружения любого неуместного или оскорбительного содержимого в изображениях на основе перечисленных здесь категорий.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">export const moderateImage = async (event) =&gt; {
  console.log('moderateImage:', JSON.stringify(event, null, 2));
  const bucket = event.detail.bucket.name;
  const key = event.detail.object.key;

  const detectLabelsCommandInput = {
    Image: {
      S3Object: {
        Bucket: bucket,
        Name: key,
      }
    },
  };
  const detectLabelsRequest = new DetectModerationLabelsCommand(detectLabelsCommandInput);
  const detectLabelsResponse = await rekognitionClient.send(detectLabelsRequest);

  if (detectLabelsResponse.ModerationLabels) {
    sendEvent('STREAM_MODERATION', detectLabelsResponse.ModerationLabels);
  }
};
</code></pre>
<!-- /wp:code -->

При необходимости функция moderateImage вызывает sendEvent для публикации пользовательского события для всех фронт-эндов, подключенных к данной чат-комнате Amazon IVS.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">const sendEvent = async (eventName, eventDetails) =&gt; {
  const sendEventInput = {
    roomIdentifier: chatArn,
    attributes: {
      streamModerationEvent: JSON.stringify(eventDetails),
    },
    eventName,
  };
  const sendEventRequest = new SendEventCommand(sendEventInput);
  await ivsChatClient.send(sendEventRequest);
};
</code></pre>
<!-- /wp:code -->

Ваш фронт-энд может решить, как обрабатывать это событие, а логика публикации этого события будет зависеть от ваших бизнес-потребностей. Может быть, вы предпочтете запустить пользовательский сигнал тревоги в CloudWatch, отправить электронное письмо или опубликовать уведомление через Amazon SNS? Потребности каждого приложения отличаются, но данные о модерации доступны на данном этапе, чтобы делать с ними то, что вам нужно.

Метод stopStream использует ivsClient для отправки команды StopStreamCommand. Опять же, реализация этого зависит от вас. Вы даже можете полностью автоматизировать эту команду, если результат Amazon Rekognition соответствует определенной категории или превышает уровень доверия.

<!-- wp:code -->
<pre class="wp-block-code"><code lang="javascript" class="language-javascript">export const stopStream = async (event) =&gt; {
  console.log('stopStream:', JSON.stringify(event, null, 2));
  try {
    const stopStreamRequest = new StopStreamCommand({ channelArn });
    const stopStreamResponse = await ivsClient.send(stopStreamRequest);
    responseObject.body = JSON.stringify(stopStreamResponse);
  }
  catch (err) {
    responseObject.statusCode = err?.name === 'ChannelNotBroadcasting' ? 404 : 500;
    responseObject.body = JSON.stringify(err);
  }
  return responseObject;
};
</code></pre>
<!-- /wp:code -->

<h2 class="wp-block-heading" id="демо">Демо</h2>

В своей демонстрации я решил прослушивать пользовательские события и отображать результаты в представлении модератора, которое показывает обнаруженный элемент и уровень доверия. Я также предлагаю модератору кнопку ”Остановить поток", которая вызывает метод stopStream через открытый Amazon API Gateway.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--XuC8pl2y--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/09xlx7vjla1cck9ehqs6.png" alt="демонстрация модерации контента"/></figure>
<!-- /wp:image -->

<h2 class="wp-block-heading" id="резюме">Резюме</h2>

В этой статье мы узнали, как использовать Amazon Rekognition для помощи модераторам в модерировании контента в приложениях, которые они создают с помощью Amazon IVS. Если вы хотите узнать больше о том, как Amazon IVS может помочь создать более безопасные сообщества пользовательского контента, ознакомьтесь со следующими статьями блога:
