---
title: Kubernetes для сисадмина - вводим KubeVirt
meta_title: |
  Kubernetes Для Сисадмина - Вводим KubeVirt - Фул Фронт Дев
description: >
  Всегда существовал какой-то вид разделения между разработчиками и инженерами
  по инфраструктуре/системными администраторами. Одни писали код, а другие...
date: 2023-10-23T22:00:18.408Z
image: ../../assets/images/kubernetes-dlya-sisadmina-vvodim-kubevirt-Oct-24-2023.avif
categories:
  - Как закодить
author: Igor Gorlov
tags:
  - DevOps
  - Kubernetes
  - KubeVirt
draft: false
keywords:
  - Kubernetes для сисадмина
type: blog
slug: kubernetes-dlya-sisadmina-vvodim-kubevirt
lastmod: 2024-03-20T21:26:45.583Z
---

Всегда существовал какой-то вид разделения между разработчиками и инженерами по инфраструктуре/системными администраторами. Одни писали код, а другие создавали окружения, в которых этот код работал. С различными движениями, произошедшими в области облачных вычислений, DevOps и внесением вклада в open source проекты, границы между ними стали размытыми. Все начали писать код и работать в облаке.

С появлением Kubernetes эти грани еще более размыты. Все начали писать небольшие куски кода и управлять такими вещами, как масштабирование, сети и хранилище. Но что же насчет тех сред, которые все еще требуют виртуальных машин (VMs)? Организации все равно нужны VMs и стандартная инфраструктура, несмотря на размытие линий между Dev и Ops.

И здесь на сцену выходит KubeVirt.

## Что такое KubeVirt?

Когда речь идет о платформенной инженерии и Kubernetes, нам все равно нужно думать о виртуальных машинах. В мире по-прежнему работает миллионы виртуальных машин, и, честно говоря, это, вероятно, не прекратится в течение очень долгого времени, если вообще когда-либо. Подумайте об этом – главныефреймы до сих пор работают.

Не все приложения будут контейнеризированы.

Из-за этого нам нужен способ управления виртуальными машинами в Kubernetes, если Kubernetes собирается быть будущей платформой по выбору.

Вводим KubeVirt.

KubeVirt представляет собой метод, по сути, контейнеризации виртуальных машин. Это почти похоже на вложенную виртуализацию. Вы берете образ операционной системы в формате ISO или .img и выполняете его в Kubernetes. Вы можете управлять им декларативно, как с любым другим подом, но он "регистрируется" в Kubernetes как виртуальная машина.

## Почему KubeVirt

KubeVirt устанавливается так же, как и любая другая рабочая нагрузка в Kubernetes – как Pod с компонентами оператора (CRD и контроллерами).

KubeVirt делает возможным управление виртуальными машинами в Kubernetes. Вам в основном нужно импортировать существующую виртуальную машину или создать новую, скопировав и переместив ее жесткий диск в том Kubernetes, а затем запустив ее из этого тома.

Это декларативный подход к работе с виртуальными машинами. Подобно тому, как это можно видеть, возможно, с Ansible или Chef для VMs, но теперь это работает на Kubernetes. Если Kubernetes должен стать стандартом для нижележащих платформ, должен существовать метод для управления и выполнения нагрузок, которые не ограничиваются контейнерами, потому что не все приложения будут контейнеризированы.

Важно отметить: вы не ПОДКЛЮЧАЕТЕСЬ к существующим виртуальным машинам, которые все еще работают. Вы берете нагрузки, которые работали бы на этих существующих виртуальных машинах, и запускаете их внутри Kubernetes.

Вы выполняете новый стиль виртуализации, а не подключаетесь напрямую к уже работающей виртуальной машине.

## Разбор KubeVirt

При использовании KubeVirt у вас есть возможность выбрать императивный подход, декларативный подход или оба.

Декларативный подход будет использовать оператора. Есть CRD и операторы, которые вы можете установить, и как это делается, вы увидите в практической части этой статьи. С декларативным подходом вы будете использовать API kubevirt.io/v1 с доступными пользовательскими ресурсами. Например, одним из пользовательских ресурсов является ресурс/объект VirtualMachine.

Императивный подход использует утилиту командной строки virtctl для KubeVirt. Kubernetes по своей природе декларативен, поэтому цель всегда использовать декларативный подход, но существует определенный функционал, для которого требуется использовать CLI. Например, использование команды image-upload для загрузки файлов ISO или .dmg для использования в Kubernetes в качестве виртуальной машины выполняется с помощью CLI.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--oMQP_UmC--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ps6fsfeiimffkotzolc9.png" alt="Описание изображения"/></figure>
<!-- /wp:image -->

Чтобы установить интерфейс командной строки (CLI), существуют два подхода:

Krew - это способ управления плагинами для Kubernetes. Дополнительную информацию можно найти по следующей ссылке: <a href="https://krew.sigs.k8s.io/">https://krew.sigs.k8s.io/</a>

Для установки <code>virtctl</code> с использованием Krew выполните следующие шаги:

```bash
kubectl krew install virt
```

## Устройство на базе ARM (например, Mac M1).

На момент написания этого текста плагин virtctl не работает с Krew, если вы используете систему на базе ARM, например, Mac M1. К счастью, с версии 1.0 KubeVirt существует обходной путь, позволяющий получить его напрямую из исходных файлов.

Сначала загрузите virtctl для ARM по следующей ссылке: <a href="https://github.com/kubevirt/kubevirt/releases/tag/v1.1.0-alpha.0">https://github.com/kubevirt/kubevirt/releases/tag/v1.1.0-alpha.0</a>

Затем запустите его через терминал. Например, чтобы запустить новую виртуальную машину с именем "deployvm" с помощью командной строки, выполните следующее:

```bash
./virtctl-v1.1.0-alpha.0-darwin-arm64 start deployvm


```

Вы также можете добавить virtctl в ваш $PATH.

## Развертывание виртуальной машины

В этом разделе вы узнаете, как развернуть виртуальную машину Ubuntu в Kubernetes с использованием KubeVirt.

### Установка KubeVirt

Сначала вам нужно установить KubeVirt:

- Указав версию KubeVirt, которую вы хотите использовать, которая может быть последней.
- Установив CRD (Custom Resource Definitions) из последней версии.
- Установив оператора из последней версии.

```bash
export VERSION=$(curl -s https://api.github.com/repos/kubevirt/kubevirt/releases | grep tag_name | grep -v -- '-rc' | sort -r | head -1 | awk -F': ' '{print $2}' | sed 's/,//' | xargs)

echo $VERSION

kubectl apply -f https://github.com/kubevirt/kubevirt/releases/download/$VERSION/kubevirt-operator.yaml

kubectl apply -f https://github.com/kubevirt/kubevirt/releases/download/$VERSION/kubevirt-cr.yaml


```

После установки вышеуказанного, выполните команду <code>kubectl get all -n kubevirt</code>, и вы должны увидеть вывод, подобный приведенному ниже:

```bash
kubectl get all -n kubevirt
                               READY   STATUS    RESTARTS      AGE
pod/virt-api-5db54b85bd-65j59          1/1     Running   1 (22h ago)   26h
pod/virt-api-5db54b85bd-th5z8          1/1     Running   1 (22h ago)   26h
pod/virt-controller-594d556ff5-gmqdr   1/1     Running   1 (22h ago)   26h
pod/virt-controller-594d556ff5-r2vmr   1/1     Running   1 (22h ago)   26h
pod/virt-handler-ch522                 1/1     Running   0             26h
pod/virt-handler-sx7cs                 1/1     Running   0             26h
pod/virt-handler-wzdnr                 1/1     Running   0             25h
pod/virt-handler-xxkq8                 1/1     Running   0             26h
pod/virt-operator-599794b899-pmcj5     1/1     Running   0             26h
pod/virt-operator-599794b899-qkvcp     1/1     Running   0             26h

NAME                                  TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)   AGE
service/kubevirt-operator-webhook     ClusterIP   10.0.217.253   <none>        443/TCP   26h
service/kubevirt-prometheus-metrics   ClusterIP   None           <none>        443/TCP   26h
service/virt-api                      ClusterIP   10.0.226.106   <none>        443/TCP   26h
service/virt-exportproxy              ClusterIP   10.0.206.74    <none>        443/TCP   26h


```

### Создание виртуальной машины

После установки KubeVirt вы можете использовать объект VirtualMachine для создания новой виртуальной машины. Например, ниже приведен манифест, который создаст новую виртуальную машину с именем "deployvm" и образом Ubuntu.

```yaml
apiVersion: kubevirt.io/v1
kind: VirtualMachine
metadata:
  name: deployvm
spec:
  running: true
  template:
    metadata:
      labels:
        kubevirt.io/size: medium
        kubevirt.io/domain: test
    spec:
      domain:
        devices:
          disks:
            - name: containerdisk
              disk:
                bus: virtio
            - name: cloudinitdisk
              disk:
                bus: virtio
          interfaces:
            - name: default
              masquerade: {}
        resources:
          requests:
            memory: 64M
      networks:
        - name: default
          pod: {}
      volumes:
        - name: containerdisk
          containerDisk:
            image: mcas/kubevirt-ubuntu-20.04:latest
        - name: cloudinitdisk
          cloudInitNoCloud:
            userDataBase64: SGkuXG4=
```

💡 Вы также можете запустить виртуальную машину, используя команду <code>start vm</code> внутри <code>virtctl</code>.

После запуска манифеста VirtualMachine, вы можете использовать команду <code>kubectl get vms</code>, чтобы увидеть, как виртуальная машина запускается.

```bash
NAME       AGE   STATUS     READY
deployvm   3s    Starting   False


```

Через примерно 30 секунд, статус должен измениться на "Running".

```bash
NAME       AGE   STATUS    READY
deployvm   42s   Running   True


```

### Доступ к виртуальной машине

Для доступа к виртуальной машине через то, что по сути является SSH-консолью, вы можете использовать команду <code>console</code> внутри CLI <code>virtctl</code>.

Например, если ваша виртуальная машина называется "deployvm", используйте следующую команду:

```bash
virtctl console deployvm


```

## Золотые образы

Если у вас есть опыт системного администратора или инженера инфраструктуры, термин "золотой образ" наверняка знаком вам. С точки зрения облачной инженерии, вы можете знать его как AMI (Amazon Machine Image).

Это образ, разработанный именно для ваших нужд. Нужен образ Ubuntu с определенными приложениями и программным обеспечением? Создайте клон образа, чтобы использовать его позже. Нужен образ Windows Server 2019 с Active Directory? Создайте такой образ, сделайте его клон и сохраните этот клон как "золотой образ".

В Kubernetes есть два разных подхода:

<!-- wp:list {"ordered":true} -->
<ol><!-- wp:list-item -->
<li>Containerized Data Importer (CDI).</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Хранение ISO-образа в контейнерном образе.</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

CDI - это способ взять .img или ISO, сохранить его в томе и использовать его позже при создании виртуальной машины. CDI имеет собственную CRD (Custom Resource Definition) и конфигурацию оператора, независимую от KubeVirt.

Хранение ISO-образа в контейнерном образе - это другой подход, который кажется более прямолинейным на момент написания этой статьи. Именно поэтому данная статья будет рассматривать подход с "ISO в контейнерном образе".

В данной статье будет использоваться ISO-образ Windows Server 2019.

### Подготовка Windows

Сначала скачайте следующий ISO-образ: <a href="https://www.microsoft.com/en-US/evalcenter/evaluate-windows-server-2019?filetype=ISO">ссылка на ISO Windows Server 2019</a>

Затем создайте Dockerfile, который позволит использовать ISO-

```yaml
FROM scratch
ADD  17763.3650.221105-1748.rs5_release_svc_refresh_SERVER_EVAL_x64FRE_en-us.iso /disk/
```

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--_xP_kwc---/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/z9w2if8biw68w72zc9xh.png" alt="Image description"/></figure>
<!-- /wp:image -->

После завершения этого процесса, загрузите контейнерный образ на Dockerhub. Если у вас нет учетной записи Dockerhub, вы можете бесплатно зарегистрироваться здесь: <a href="https://hub.docker.com/signup">ссылка для регистрации на Dockerhub</a>

После регистрации вам потребуется войти в учетную запись Dockerhub через командную строку.

```bash
docker login name_of_dockerhub_org


```

Вас попросят ввести пароль.

После входа в систему создайте контейнерный образ, пометьте его и отправьте его на Dockerhub. Например, моя организация Dockerhub называется adminturneddevops, поэтому я использую ее имя в примере ниже.

```bash
docker build -t adminturneddevops/winkube/w2k9_iso:sep2020 .
docker tag docker_id adminturneddevops/winkube:latest
docker push adminturneddevops/winkube:latest

```

### Размещение ВМ

Теперь, когда образ контейнера создан и хранится на Dockerhub, вы можете использовать его для развёртывания ВМ.

Сначала создайте постоянный том (PVC). Как упоминалось выше, том используется для хранения данных, необходимых для работы ВМ. Это можно сравнить с жестким диском на компьютере.

💡 Убедитесь, что вы изучили, какой Storage Class вам нужен для вашей конкретной среды.

```yaml
kubectl apply -f - <<EOF
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: winhd
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 100Gi
  storageClassName: name_of_storageclass
EOF


```

Далее создайте ВМ. ВМ создается с использованием объекта/ресурса VirtualMachine из API KubeVirt.

Убедитесь, что в строке image: вы указали имя вашей организации на Dockerhub.

```yaml
kubectl apply -f - <<EOF
apiVersion: kubevirt.io/v1
kind: VirtualMachine
metadata:
  generation: 1
  labels:
    kubevirt.io/os: windows
  name: windowsonkubernetes
spec:
  running: true
  template:
    metadata:
      labels:
        kubevirt.io/domain: vm1
    spec:
      domain:
        cpu:
          cores: 2
        devices:
          disks:
          - cdrom:
              bus: sata
            bootOrder: 1
            name: iso
          - disk:
              bus: virtio
            name: harddrive
          - cdrom:
              bus: sata
              readonly: true
            name: virtio-drivers
        machine:
          type: q35
        resources:
          requests:
            memory: 4096M
      volumes:
      - name: harddrive
        persistentVolumeClaim:
          claimName: winhd
      - name: iso
        containerDisk:
          image: YOUR_DOCKER_HUB_ORG/winkube:latest
      - name:  virtio-drivers
        containerDisk:
          image: kubevirt/virtio-container-disk
EOF


```

Запустите kubectl get vm, и через 2-3 минуты вы должны увидеть, что ВМ запущена.

```bash
kubectl get vm

NAME                  AGE   STATUS    READY
windowsonkubernetes   21m   Running   True

```

### Подключение

Для подключения через VNC, вам потребуется программа remote-viewer. Если у вас её нет, вы можете воспользоваться следующей ссылкой: <a href="https://www.realvnc.com/en/connect/download/viewer/macos/">https://www.realvnc.com/en/connect/download/viewer/macos/</a>

Если у вас установлен virtctl через Krew, используйте следующую команду для подключения через VNC:

```bash
kubectl virt vnc windowsonkubernetes


```

Если вы установили virtctl из исходного кода, используйте следующую команду:

```bash
virtctl vnc windowsonkubernetes


```

Теперь вы должны увидеть появление консоли VNC.

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--qO_Y6QlK--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/h0mirxuxqgg2zrp8x83i.png" alt="Image description"/></figure>
<!-- /wp:image -->

Поздравляю! Вы успешно запустили полноценную виртуальную машину с Windows в Kubernetes.
