---
title: >-
  Создайте ИИ-разработчика, который будет делать за вас запросы на исправление
  ошибок
meta_title: >-
  Создайте ИИ-разработчика, который будет делать за вас запросы на исправление
  ошибок | Игорь Горлов - Фронтeндер
description: >-
  Руководство по Python с полным кодом Окончательный код: E2B Cookbook  AI
  GitHub Developer Что мы будем делать В этом руководстве мы создадим
  собственног
date: 2023-12-21T00:00:00.000Z
categories:
  - Учебник
author: Игорь Горлов
draft: false
slug: >-
  sozdaite-yy-razrabotchyka-kotor-i-budet-delat-za-vas-zapros-na-yspravlenye-oshybok
tags:
  - Python
  - Ai
image: >-
  ../../assets/images/sozdaite-yy-razrabotchyka-kotor-i-budet-delat-za-vas-zapros-na-yspravlenye-oshybok-Dec-21-2023.avif
lastmod: 2024-03-20T21:26:48.100Z
---

Руководство по Python с полным кодом

🏁 Окончательный код: E2B Cookbook - AI GitHub Developer

Что мы будем делать

В этом руководстве мы создадим собственного разработчика ИИ, который клонирует выбранный вами репозиторий GitHub в свою удаленную облачную среду, работает над ним, а затем делает запрос на притяжение с изменениями.

Для удаленного выполнения действий ИИ-разработчика мы используем E2B Sandboxes, а для ИИ-ассистента - OpenAI’s Assistants API.

Полный финальный код можно найти здесь. 🏁

Вот пример проекта Next.js, созданного разработчиком ИИ.

Предварительные условия

Мы используем два ключевых понятия:

OpenAI API - найдите свой ключ API здесь, прочитайте введение в Assistants API, и вызов функций.

E2B Sandbox - найти бесплатный API-ключ можно здесь, прочитать, как работают песочницы E2B, можно здесь.

## 1. Создать файлы

Давайте начнем с создания файлов:

`main.py` для основной программы

`assistant.py` для определения поведения AI разработчика

`actions.py` для определения действий (функций Python) для разработчика.

Подготовьте также файл `.env`, в котором хранятся ключи API.

## 2. Определение действий для ассистента

В файле `actions.py` мы определяем Python-функции как выполняемые действия для ИИ-ассистента и LLM.

Сначала импортируем E2B Sandbox и все остальное, что нам нужно.

Здесь мы используем песочницу E2B ”по умолчанию". Для различных случаев использования мы можем использовать различные пользовательские песочницы с дополнительными пакетами. Например, песочницу интерпретатора кода, полезную для расширенного анализа данных, или песочницу облачного браузера.

### 2.1 Импорт пакетов

Мы используем библиотеку Python `Rich` для форматирования терминального вывода программы.

```py
import os import random import string from typing import Any, Dict from e2b import Sandbox from rich.console import Console from rich.theme import Theme
```

### 2.2 Печать действий в песочнице

Мы определяем директорию, в которую разработчик AI будет клонировать пользовательское репо в песочнице. Мы добавляем способ печати того, что происходит в песочнице (и выбираем тему для печати, используя `Rich`).

```py
import logging

REPO_DIRECTORY = "/home/user/repo"
custom_theme = Theme(
    {
        "sandbox_action": "bold #E57B00",  # Корректируем цвет по необходимости
    }
)
console = Console(theme=custom_theme)

# Create a logger instance
logger = logging.getLogger(__name__)

def print_sandbox_action(action_type: str, action_message: str):
    # Add logging statements to log the action type and message
    logger.debug(f"Action type: {action_type}")
    logger.debug(f"Action message: {action_message}")

    console.print(
        f"[sandbox_action] [Sandbox Action][/sandbox_action] {action_type}: {action_message}"
    )
```

### 2.3 Определение действий для разработчика ИИ

Затем мы определяем действия, которые может использовать разработчик ИИ. В дальнейшем вы можете модифицировать программу, добавив дополнительные действия для вашего конкретного случая использования по тому же принципу. Мы добавляем действия, которые позволяют разработчику ИИ делать следующее:

Создать директорию в удаленной песочнице Сохранить содержимое (например, код) в файл Перечислить файлы в директории Прочитать содержимое файлов Зафиксировать изменения Сделать запрос на извлечение.

”Действия" - это функции Python, автоматически вызываемые в программе с помощью E2B SDK. Внутри действий
Каждому действию соответствует ровно одна функция OpenAI (см. следующие шаги руководства).

Для каждого действия необходимо указать аргументы и добавить печать соответствующей информации. Например, для `list_files` имеет смысл возвращать список файлов в папке.  
Внутри действий вызываются различные операции внутри песочницы.

```py
# Список действий для помощника
def create_directory(sandbox: Sandbox, args: Dict[str, Any]) -> str:
    directory = args["path"]
    print("Creating directory:", directory)  # Add logging statement
    try:
        sandbox.filesystem.make_dir(directory)
        return "success"
    except Exception as e:
        return f"Error: {e}"

def save_content_to_file(sandbox: Sandbox, args: Dict[str, Any]) -> str:
    path = args["path"]
    content = args["content"]
    print("Saving content to:", path)  # Add logging statement
    try:
        dir = os.path.dirname(path)
        sandbox.filesystem.make_dir(dir)
        sandbox.filesystem.write(path, content)
        return "success"
    except Exception as e:
        return f"Error: {e}"

def list_files(sandbox: Sandbox, args: Dict[str, Any]) -> str:
    path = args["path"]
    print("Listing files on path:", path)  # Add logging statement
    try:
        files = sandbox.filesystem.list(path)
        response = "\n".join([f"dir: {file.name}" if file.is_dir else file.name for file in files])
        return response
    except Exception as e:
        return f"Error: {e}"

def read_file(sandbox: Sandbox, args: Dict[str, Any]) -> str:
    path = args["path"]
    print("Чтение файла по пути:", path)  # Add logging statement
    try:
        return sandbox.filesystem.read(path)
    except Exception as e:
        return f"Error: {e}"

def commit(sandbox: Sandbox, args: Dict[str, Any]) -> str:
    repo_directory = "/home/user/repo"
    commit_message = args["message"]
    print("Committing with the message:", commit_message)  # Add logging statement
    git_add_proc = sandbox.process.start_and_wait(f"git -C {repo_directory} add .")
    if git_add_proc.exit_code != 0:
        error = f"Error adding files to staging: {git_add_proc.stdout}\n\t{git_add_proc.stderr}"
        print("\tError:", error)  # Add logging statement
        return error
    git_commit_proc = sandbox.process.start_and_wait(f"git -C {repo_directory} commit -m '{commit_message}'")
    if git_commit_proc.exit_code != 0:
        error = f"Error committing changes: {git_commit_proc.stdout}\n\t{git_commit_proc.stderr}"
        print("\tError:", error)  # Add logging statement
        return error
    return "success"

def make_pull_request(sandbox: Sandbox, args: Dict[str, Any]) -> str:
    base_branch = "main"
    random_letters = "".join(random.choice(string.ascii_letters) for _ in range(5))
    new_branch_name = f"ai-developer-{random_letters}"
    title = args["title"]
    body = ""
    print("Making a pull request", f"from '{new_branch_name}' to '{base_branch}'")  # Add logging statement
    git_checkout_proc = sandbox.process.start_and_wait(f"git -C {REPO_DIRECTORY} checkout -b {new_branch_name}")
    if git_checkout_proc.exit_code != 0:
        error = f"Ошибка создания новой ветки git {new_branch_name}: {git_checkout_proc.stdout}\n\t{git_checkout_proc.stderr}"
        print("\tError:", error)  # Add logging statement
        return
```

## 3. Создание помощника

Теперь мы создадим самого разработчика ИИ внутри файла `assistant.py`. Особенностью API ассистентов OpenAI, которой мы воспользуемся, является вызов функций.

Функция вызова функций дает нашему ИИ-ассистенту возможность принимать решения о вызове действий в песочнице, которые мы определили в файле `actions.py`.

### 3.1 Импорт пакетов

```py
from typing import List from dotenv import load_dotenv import openai from openai.types.beta.assistant_create_params import Tool load_dotenv()
```

### 3.2 Определите помощника

Теперь мы создадим помощника и оснастим его шестью функциями (помните, это функции OpenAI, а не Python), каждая из которых соответствует одному действию, определенному ранее в файле `actions.py`.

```py
def create_assistant(): client = openai.Client() functions: List[Tool] = [ { "type": "function", "function": { "name": "create_directory", "description": "Создать каталог", "параметры": { "type": "object", "properties": { "path": { "type": "string", "description": "Путь к создаваемому каталогу", }, }, "required": ["path"], }, "required": { "type": "function", "function": { "name": "save_content_to_file", "description": "Сохранить содержимое (код или текст) в файл", "parameters": { "type": "object", "properties": { "content": { "type": "string", "description": "Содержимое для сохранения", }, "path": { "type": "string", "description": "Путь к файлу, включая расширение", }, }, "required": ["content", "path"], }, }, }, { "type": "function", "function": { "name": "list_files", "description": "Список файлов в каталоге", "parameters": { "type": "object", "properties": { "path": { "type": "string", "description": "Путь к каталогу", }, }, "required": ["path"], }, "required": { "type": "function", "function": { "name": "read_file", "description": "Чтение файла", "parameters": { "type": "object", "properties": { "path": { "type": "string", "description": "Путь к файлу", }, }, "required": ["path"], }, "required": { "type": "function", "function": { "name": "commit", "description": "Зафиксировать изменения в репо", "parameters": { "type": "object", "properties": { "message": { "type": "string", "description": "Сообщение о фиксации", }, }, "required": ["message"], }, "required": { "type": "function", "function": { "name": "make_pull_request", "description": "Создает новую ветку и делает pull request", "parameters": { "type": "object", "properties": { "title": { "type": "string", "description": "Название запроса", } }, "required": ["title"], } }, }, }, ]
```

### 3.3 Запись системной подсказки

Все еще находясь внутри функции `create_assistant()`, мы даем указания помощнику и выбираем его параметры. После запуска этого файла он выведет идентификатор помощника, который мы можем сохранить в качестве переменной окружения.  
Не забудьте повторно запустить файл с ассистентом и создать новый ID при каждом обновлении.

💡 Совет: При необходимости корректируйте инструкции. Например, вы можете решитьИдеально, насколько разработчик ИИ вовлечен в дискуссию с пользователем и не ограничивается ли он выполнением поставленной задачи.  
Здесь может пригодиться руководство по разработке подсказок OpenAI.

```py
import logging

ai_developer = client.beta.assistants.create(instructions="""Вы - разработчик ИИ. Вы помогаете пользователю решать его задачи, связанные с кодированием в его кодовой базе. Предоставленная кодовая база находится в /home/user/repo. Получив задание по кодированию, работайте над ним до завершения, коммитите его и делайте pull request.  Если вы столкнулись с проблемой, сообщите об этом незамедлительно, пожалуйста.  Вы можете создавать и сохранять содержимое (текст или код) в указанном файле (или создавать новый файл), перечислять файлы в заданном каталоге, читать файлы, фиксировать изменения и делать запросы на исправление. Всегда следите за тем, чтобы записывать содержимое в кодовую базу.  По умолчанию после выполнения любого действия с репозиторием всегда либо фиксируйте свои изменения, либо делайте запрос на притяжение. Это поможет в проверке и слиянии ваших изменений. Назовите PR в соответствии с внесенными изменениями.  Ведите себя профессионально, избегайте споров и сосредоточьтесь на выполнении задания.  По завершении задания всегда указывайте ссылку на сделанный вами запрос (если вы его сделали). Кроме того, будьте готовы к дискуссиям; не все, что пишет пользователь, подразумевает изменения в репозитории. Например, если пользователь пишет "спасибо", вы можете просто ответить "не за что". Но по умолчанию, если вам поставили задачу, вы должны немедленно выполнить ее в предоставленном репо, а не только рассказывать о своем плане. """, name="AI Developer", tools=functions, model="gpt-4-1106-preview",)

# Add logging statements
logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

# Example logging statements
logger.debug('Debug message')
logger.info('Info message')
logger.warning('Warning message')
logger.error('Error message')

print("AI Developer Assistant created, copy its id to .env file:")
print(ai_developer.id)

if __name__ == "__main__":
    create_assistant()
```

## 4. Создание основной программы

Теперь мы создадим основную программу. Ассистент вызывает функции OpenAI через JSON, который E2B SDK разбирает и автоматически вызывает определенные действия.

### 4.1 Импорт пакетов

Сначала мы импортируем необходимые пакеты - `openai`, `e2b Sandbox` и действия, которые мы создали в другом файле.

```py
import os
import logging
from dotenv import load_dotenv
from e2b import Sandbox
import openai
import time
from ai_github_developer.actions import (
    create_directory,
    read_file,
    save_content_to_file,
    list_files,
    commit,
    make_pull_request,
    REPO_DIRECTORY,
)
from rich import print
from rich.console import Console
from rich.theme import Theme
from rich.prompt import Prompt

# Set up logging
logging.basicConfig(level=logging.DEBUG)

class MyPrompt(Prompt):
    prompt_suffix = ""
    custom_theme = Theme(
        {
            "theme": "bold #666666",
        }
    )
    console = Console(theme=custom_theme)
```

### 4.2 Получение помощника

Мы вызываем ассистента по его ID и используем OpenAI API для получения ассистента. Не забудьте сохранить ID помощника, ключ OpenAI API и ключ E2B API в качестве переменных окружения.

```py
import logging

load_dotenv()
client = openai.Client()

# Set up logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

AI_ASSISTANT_ID = os.getenv("AI_ASSISTANT_ID")
USER_GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")

# Add logging statements
logger.debug("AI_ASSISTANT_ID: %s", AI_ASSISTANT_ID)
logger.debug("USER_GITHUB_TOKEN: %s", USER_GITHUB_TOKEN)

assistant = client.beta.assistants.retrieve(AI_ASSISTANT_ID)
```

### 4.2 Запрос пользователю репозитория GitHub, аутентификации и задания

Мы определяем три функции, которые запрашивают у пользователя

URL-адрес репозитория GitHub Указание задачи для агента ИИ (например, ”Пожалуйста, создайте калькулятор на JavaScript и сохраните его в новом файле") Токен аутентификации GitHub.

У пользователя запрашивается его персональный токен доступа GitHub (classic) как стандартный способ безопасного взаимодействия с API GitHub.

💡 Совет: Сохраните свой токен GitHub как `GITHUB_TOKEN` в файле `.env`, чтобы не вставлять его каждый раз при запуске программы.

```py
import logging

def prompt_user_for_github_repo():
    logging.info("Prompting user for GitHub repo")
    user_repo = MyPrompt.ask("\nВ каком репо GitHub вы хотите работать? Укажите его следующим образом: [bold #E0E0E0]your_username/your_repo_name[/bold #E0E0E0].\n> ")
    logging.debug(f"User repo: {user_repo}")
    print("\n🔄[#666666] Клонирование репо...[/#666666]", end="\n")
    print("", end="\n")
    repo_url = f"https://github.com/{user_repo.strip()}.git"
    logging.debug(f"Repo URL: {repo_url}")
    return repo_url

def prompt_user_for_task(repo_url):
    logging.info("Prompting user for task")
    user_task_specification = MyPrompt.ask("\n\n🤖[#E57B00][bold] Разработчик AI работает в клонированном репо[/bold][/#E57B00]\n\nЧто вы хотите сделать?\n> ")
    logging.debug(f"User task specification: {user_task_specification}")
    user_task = (
        f"Пожалуйста, работайте с репо кодовой базы под названием {repo_url} "
        f"которая клонирована в каталоге /home/user/repo. Реагируйте на следующий комментарий пользователя: {user_task_specification}"
    )
    logging.debug(f"User task: {user_task}")
    print("", end="\n")
    return user_task

def prompt_user_for_auth():
    logging.info("Prompting user for authentication")
    user_auth = MyPrompt.ask("\nПредоставьте [bold]токен GitHub[/bold] со следующими правами:\n\n\u2022 read:org\n\u2022 read:project\n\u2022 repo\n\nНайдите или создайте свой токен на [bold #0096FF]https://github.com/settings/tokens[/bold #0096FF]\n\nToken:", password=True)
    logging.debug("User authentication provided")
    print("", end="\n")
    return user_auth
```

### 4.3 Настройка git

Мы настраиваем конфигурацию Git и аутентификацию для учетной записи пользователя в заданном окружении песочницы. Это включает в себя настройку электронной почты и имени пользователя, вход в систему с помощью персонального токена доступа GitHub и настройку учетных данных Git для GitHub. Чтобы контролировать процесс, мы добавили печать кодов выхода на каждом шаге.

```py
import logging

def setup_git(sandbox):
    logging.info("Logging into GitHub...")
    sandbox.process.start_and_wait("git config --global user.email 'ai-developer@email.com'")
    sandbox.process.start_and_wait("git config --global user.name 'AI Developer'")

    # Вход пользователя на GitHub
    proc = sandbox.process.start_and_wait(f"echo {USER_GITHUB_TOKEN} | gh auth login --with-token")
    if proc.exit_code != 0:
        logging.error("Error: Unable to log into GitHub")
        logging.error(proc.stderr)
        logging.error(proc.stdout)
        exit(1)

    # Настройка учетных данных Git пользователя
    proc = sandbox.process.start_and_wait("gh auth setup-git")
    if proc.exit_code != 0:
        logging.error("Error: Unable to set up Git auth with GitHub")
        logging.error(proc.stderr)
        logging.error(proc.stdout)
        exit(1)
    else:
        logging.info("\n✅ [#666666]Logged in[/#666666]")
```

### 4.4 Клонирование репозитория

Используя среду песочницы, выполните команду Git clone и проверьте, успешно ли прошел процесс. Мы определяем способ печати стандартного вывода или стандартной ошибки из песочницы (с определенной визуальной темой).

```py
import logging

def clone_repo_in_sandbox(sandbox, repo_url):
    logging.debug(f"Cloning repo: {repo_url}")
    git_clone_proc = sandbox.process.start_and_wait(f"git clone {repo_url} {REPO_DIRECTORY}")
    if git_clone_proc.exit_code != 0:
        logging.error("Error: Unable to clone the repo")
        exit(1)

def handle_sandbox_stdout(message):
    logging.info(f"[Sandbox] {message.line}")

def handle_sandbox_stderr(message):
    logging.info(f"[Sandbox] {message.line}")
```

### 4.5 Создание песочницы

Теперь мы можем определить функцию `main` для создания песочницы E2B.

Внутри функции мы выбираем предпочтительную песочницу E2B, которая называется просто ”`Sandbox`”, так как мы выбрали песочницу по умолчанию.

💡 Совет: E2B предлагает готовые песочницы или возможность создать свою собственную, используя предпочтительные пакеты. Чтобы сохранить простоту этого руководства, мы выбрали песочницу по умолчанию и оснастили ее только теми действиями, которые мы определили в файле `actions.py`.

Мы используем метод `sandbox.add_action()` для регистрации действий в песочнице.  
Мы запускаем песочницу и настраиваем ИИ-ассистента в git. Мы регистрируем пользователя на GitHub с помощью токена аутентификации.  
Назначаем ассистенту задачу пользователя. Затем мы создаем поток, отправляем в него сообщения и, наконец, запускаем поток.

Мы регистрируем действия в песочнице с помощью метода `sandbox.add_action()`. Мы запускаем песочницу, настраиваем ИИ-разработчика в Git и запрашиваем у пользователя токен GitHub, если он еще не добавил его в качестве переменной окружения.

Затем мы назначаем задачу пользователя ассистенту, создаем и запускаем поток для отправки сообщений для выполнения задачи.

Здесь мы используем концепцию OpenAI о потоках, сообщениях и запусках.

```py
import logging

def main():
    global USER_GITHUB_TOKEN

    # Set up logging
    logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')

    # Создаем песочницу E2B
    sandbox = Sandbox(
        on_stderr=handle_sandbox_stderr,
        on_stdout=handle_sandbox_stdout,
    )

    # Add logging statements
    logging.debug('Creating sandbox')
    sandbox.add_action(create_directory)
    logging.debug('Added create_directory action')
    sandbox.add_action(read_file)
    logging.debug('Added read_file action')
    sandbox.add_action(save_content_to_file)
    logging.debug('Added save_content_to_file action')
    sandbox.add_action(list_files)
    logging.debug('Added list_files action')
    sandbox.add_action(commit)
    logging.debug('Added commit action')
    sandbox.add_action(make_pull_request)
    logging.debug('Added make_pull_request action')

    print("\n🤖[#E57B00][bold] AI developer[/#E57B00][/bold]")

    if USER_GITHUB_TOKEN is None:
        USER_GITHUB_TOKEN = prompt_user_for_auth()
    else:
        print("\n✅ [#666666]GitHub token loaded[/#666666]\n")

    # Сразу настраиваем git, чтобы пользователь сразу понял, что передал неправильный токен
    setup_git(sandbox)

    # Клонируем репо
    repo_url = prompt_user_for_github_repo()
    clone_repo_in_sandbox(sandbox, repo_url)

    while True:
        user_task = prompt_user_for_task(repo_url)

        thread = client.beta.threads.create(
            messages=[
                {
                    "role": "user",
                    "content": f"Тщательно спланируйте эту задачу и начните работать над ней: {user_task} в репозитории {repo_url}",
                },
            ],
        )

        run = client.beta.threads.runs.create(
            thread_id=thread.id,
            assistant_id=assistant.id,
        )
```

Потоки, сообщения и прогоны - это концепция из OpenAI’s Assistants API:

### 4.6 Создание песочницы

Все еще находясь внутри главной функции, мы выводим процесс работы ассистента на терминал. Каждый раз, когда разработчик решает использовать одно из действий, пользователь может увидеть в терминале логи о выбранном действии и его успехе/неудаче.

Примечание: продолжительность работы ассистента в значительной степени определяется OpenAI.

В конце мы используем `time.sleep()`, чтобы указать, как часто мы хотим опрашивать состояние помощника.

```py
import logging

# Set up logging
logging.basicConfig(level=logging.DEBUG)

spinner = ""
with console.status(spinner):
    previous_status = None
    while True:
        if run.status != previous_status:
            console.print(f"[bold #FF8800]>[/bold #FF8800] Assistant is currently in status: {run.status} [#66666666](ожидание OpenAI)[/#66666666]")
            logging.debug(f"Assistant is currently in status: {run.status}")
            previous_status = run.status

        if run.status == "requires_action":
            outputs = sandbox.openai.actions.run(run)
            if len(outputs) > 0:
                client.beta.threads.runs.submit_tool_outputs(
                    thread_id=thread.id,
                    run_id=run.id,
                    tool_outputs=outputs
                )
        elif run.status == "completed":
            console.print("\n✅[#666666] Run completed[/#666666]")
            logging.debug("Run completed")
            messages = (
                client.beta.threads.messages.list(thread_id=thread.id)
                .data[0]
                .content
            )
            text_messages = [
                message
                for message in messages
                if message.type == "text"
            ]
            console.print("Thread finished:", text_messages[0].text.value)
            logging.debug(f"Thread finished: {text_messages[0].text.value}")
            break
        elif run.status in ["queued", "in_progress"]:
            pass
        elif run.status in ["cancelled", "cancelling", "expired", "failed"]:
            break
        else:
            print(f"Unknown status: {run.status}")
            logging.debug(f"Unknown status: {run.status}")
            break

        run = client.beta.threads.runs.retrieve(
            thread_id=thread.id,
            run_id=run.id
        )
        time.sleep(0.5)
```

Наконец, под функцией main мы пишем код, который будет выполняться, если скрипт является основной выполняемой программой.

`if __name__ == "__main__": main()`.

## Вывод

Спасибо, что прочитали это руководство, и я буду признателен за ваши отзывы!
