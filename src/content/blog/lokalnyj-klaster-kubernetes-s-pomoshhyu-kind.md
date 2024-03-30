---
title: Локальный кластер Kubernetes с помощью Kind
meta_title: Локальный кластер Kubernetes с помощью Kind - Igor Gorlov
description: >-
  Мне нужен был небольшой инструмент для локального изучения Kubernetes, есть
  несколько вариантов, но Kind (Kubernetes In Docker) был моим предпочтительным
  выбором, вам нужен только Docker, и вы можете очень легко справиться с
  настройкой Kubernetes.
date: 2023-02-25T16:56:37.000Z
author: Igor Gorlov
image: ../../assets/images/undefined-Feb-25-2023.avif
categories:
  - Как закодить
tags:
  - ckad
  - Kubernetes
draft: false
lastmod: 2024-03-20T21:26:46.987Z
---

Мне нужен был небольшой инструмент для локального изучения Kubernetes, есть несколько вариантов, но Kind (Kubernetes In Docker) был моим предпочтительным выбором, вам нужен только Docker, и вы можете очень легко справиться с настройкой Kubernetes.

<!-- wp:rank-math/toc-block {"title":"Оглавление","headings":[{"key":"c0e694a4-8a92-407e-82f7-fc154129d2d8","content":"Установка Kind","level":2,"link":"#установка-kind","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"f6675c32-20ce-4796-8d5a-7d7b0e075079","content":"Некоторые настройки для Kind","level":2,"link":"#некоторые-настройки-для-kind","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"2604b976-b729-4e57-b84c-c0ceec8084ab","content":"Создайте кластер:","level":2,"link":"#создайте-кластер","disable":false,"isUpdated":false,"isGeneratedLink":true},{"key":"07b0c1b7-072c-4e41-b184-cdbbe7ec1820","content":"Теперь вы можете получить доступ к открытой службе :","level":2,"link":"#теперь-вы-можете-получить-доступ-к-открытой-службе","disable":false,"isUpdated":false,"isGeneratedLink":true}],"listStyle":"ul"} -->
<div class="wp-block-rank-math-toc-block" id="rank-math-toc"><h2>Оглавление</h2><nav><ul><li class=""><a href="#установка-kind">Установка Kind</a></li><li class=""><a href="#некоторые-настройки-для-kind">Некоторые настройки для Kind</a></li><li class=""><a href="#создайте-кластер">Создайте кластер:</a></li><li class=""><a href="#теперь-вы-можете-получить-доступ-к-открытой-службе">Теперь вы можете получить доступ к открытой службе :</a></li></ul></nav></div>
<!-- /wp:rank-math/toc-block -->

<h2 class="wp-block-heading" id="установка-kind">Установка Kind</h2>

Установите его с помощью Brew :

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">brew install kind
# It works with Linux, Mac, Windows (with Docker Desktop and WSL2)
</code></pre>
<!-- /wp:code -->

Затем вы можете создать кластер:

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">kind create cluster -n kind1 [--config conf.yml]
kind create cluster -n kind2

# Get the list of clusters
kind get clusters

# Select the cluster you want, by selecting context
k config get-contexts
k config use-context kind-kind1

# Display available addresses for the current cluster
k cluster-info

# Export logs about the cluster
kind export logs -n kind1

# You can delete clusters, when you want
kind delete cluster -n kind1
kind delete cluster -n kind2
</code></pre>
<!-- /wp:code -->

Создание занимает несколько секунд, вы можете установить таймер, чтобы проверить, что :<img width="856" height="365" src="https://res.cloudinary.com/practicaldev/image/fetch/s--sPpSzwb0--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/j670qp358eqxe68qbuua.png" alt="Kind cluster creation">

<h2 class="wp-block-heading" id="некоторые-настройки-для-kind">Некоторые настройки для Kind</h2>

Kind предлагает возможность вносить конфигурацию в создаваемые вами кластеры.

Он работает поверх KubeADM, вы также можете реализовать специфическую конфигурацию для него.

Мы рассмотрим несколько простых примеров использования.

Экспликация Nginx, с сервисом NodePort

<h2 class="wp-block-heading" id="создайте-кластер">Создайте кластер:</h2>

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">cat &lt;&lt;EOF | kind create cluster -n kind1 --config -
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
- role: control-plane
  extraPortMappings:
  - containerPort: 30000
    hostPort: 30000
    protocol: TCP
EOF
</code></pre>
<!-- /wp:code -->

Создайте развертывание и службу :

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">k create deployment nginx --image=nginx --port=80
k create service nodeport nginx --tcp=80:80 --node-port=30000
</code></pre>
<!-- /wp:code -->

Теперь вы можете получить доступ к открытой службе :

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">curl localhost:30000
</code></pre>
<!-- /wp:code -->

Кластер с одним ведущим и одним рабочим

Создайте кластер :

<!-- wp:code -->
<pre class="wp-block-code"><code lang="bash" class="language-bash">cat &lt;&lt;EOF | kind create cluster -n kind1 --config -
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
- role: control-plane
- role: worker
EOF
</code></pre>
<!-- /wp:code -->

Кластер с контроллером Nginx

Создайте кластер :

<!-- wp:code -->
<pre class="wp-block-code"><code lang="docker" class="language-docker">cat &lt;&lt;EOF | kind create cluster -n kind1 --config -
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
name: kind
nodes:
- role: control-plane
  kubeadmConfigPatches:
  - |
    kind: InitConfiguration
    nodeRegistration:
      kubeletExtraArgs:
        node-labels: "ingress-ready=true"
  extraPortMappings:
  - containerPort: 80
    hostPort: 8080
    protocol: TCP
  - containerPort: 443
    hostPort: 44300
    protocol: TCP
EOF
</code></pre>
<!-- /wp:code -->

Создайте ресурсы :

<!-- wp:code -->
<pre class="wp-block-code"><code lang="docker" class="language-docker"># install the Nginx ingress
k apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/kind/deploy.yaml

# install the resources
cat &lt;&lt;EOF | k apply -f -
kind: Pod
apiVersion: v1
metadata:
  name: test-app
  labels:
    app: test-app
spec:
  containers:
  - name: test-app
    image: hashicorp/http-echo:latest
    args:
    - "-text=The test has been successful!"
--- 

kind: Service
apiVersion: v1
metadata:
  name: test-service
spec:
  selector:
    app: test-app
  ports:
  - port: 5678
--- 

apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: test-ingress
spec:
  rules:
  - http:
      paths:
      - pathType: Prefix
        path: "/app"
        backend:
          service:
            name: test-service
            port:
              number: 5678
EOF

# forward port
k port-forward service/test-service 5678:5678
</code></pre>
<!-- /wp:code -->

<h2 class="wp-block-heading" id="теперь-вы-можете-получить-доступ-к-открытой-службе">Теперь вы можете получить доступ к открытой службе :</h2>

<!-- wp:code -->
<pre class="wp-block-code"><code lang="docker" class="language-docker">curl localhost:5678
</code></pre>
<!-- /wp:code -->

Весь этот код конфигурации доступен в этом репозитории, я надеюсь, что вы получите такое же удовольствие, как и я, от использования этого удивительного инструмента.
