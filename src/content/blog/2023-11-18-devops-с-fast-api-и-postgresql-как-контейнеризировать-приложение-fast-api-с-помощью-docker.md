---
title: >-
  DevOps с Fast API и PostgreSQL: Как контейнеризировать приложение Fast API с
  помощью Docker
meta_title: |
  DevOps С Fast API И PostgreSQL: Как Контейнеризировать...
description: >
  (https://fastapi.tiangolo.com/) - это современный фреймворк с открытым
  исходным кодом, который используется для построения API на языке Python.
date: 2023-11-17T21:35:20.616Z
image: >-
  ../../assets/images/devops-s-fast-api-i-postgresql-kak-kontejnerizirovatь-prilozhenie-fast-api-s-pomoshьyu-docker-Nov-18-2023.avif
categories:
  - Как закодить
author: Igor Gorlov
tags:
  - DevOps
  - PostgreSQL
  - Docker
draft: false
type: blog
slug: >-
  devops-s-fast-api-i-postgresql-kak-kontejnerizirovatь-prilozhenie-fast-api-s-pomoshьyu-docker
lastmod: 2024-03-20T21:26:47.305Z
---

[FastAPI](https://fastapi.tiangolo.com/) - это современный фреймворк с открытым исходным кодом, который используется для построения API на языке Python.

[PostgreSQL](https://www.postgresql.org/) - объектно-реляционная система управления базами данных с открытым исходным кодом.

В этом уроке мы создадим пример RESTful API с помощью Fast API и используем возможности хранения данных с помощью PostgreSQL. Затем мы контейнеризируем наш API и базу данных с помощью файлов [Dockerfile](https://docs.docker.com/engine/reference/builder/) и [Docker Compose](https://docs.docker.com/get-started/08_using_compose/). Dockerfile - это текстовый файл, содержащий последовательность инструкций, которые будут выполнены в файле Docker Compose для создания контейнера. Docker compose - это инструмент для определения и совместного использования многоконтейнерных контейнеров Docker. Наше приложение будет состоять из двух контейнеров. Контейнер Fast API и контейнер PostgreSQL.

## [](https://dev.to/mbuthi/devops-with-fast-api-postgresql-how-to-containerize-fast-api-application-with-docker-1jdb#prerequisites-and-tools)Необходимые условия и инструменты.

1. Docker - Вам необходимо иметь базовое представление о том, как работает docker. Чтобы понять, как работает docker, вы можете обратиться к моей предыдущей статье [Getting started with docker](https://dev.to/mbuthi/docker-2oge). Вы узнаете, как установить docker, как работает docker и команды docker.
2. [Python](https://www.python.org/) - На вашей машине должен быть установлен Python. Предпочтительно python 3.10.
3. [VsCode](https://code.visualstudio.com/download)

## [](https://dev.to/mbuthi/devops-with-fast-api-postgresql-how-to-containerize-fast-api-application-with-docker-1jdb#getting-started-with-fastapi)Начало работы с FastAPI

Мы создадим на Python пример приложения для работы с листингом товаров, в котором наши пользователи смогут выполнять CRUD-операции через API. Для хранения данных о товарах мы будем использовать PostgreSQL. Однако нам необходимо понять, как будет выглядеть структура каталогов нашего проекта. Ниже приведен снимок структуры каталогов проекта в FastAPI:

```
.
└── FastAPI_APP/
    ├──── app/
    │ ├──── api/
    │ │ ├── v1/
    │ │ │ │ ├──── endpoints/
    │ │ │ │ │ ├──── __init__.py
    │ │ │ │ │ └──── products.py
    │ │ │ │ ├──── __init__.py
    │ │ │ │ └──── api.py
    │ │ │ ├──── __init__.py
    │ │ │ └──── deps.py
    │ ├──── core/
    │ │ ├──── __init__.py
    │ │ └──── settings.py
    │ ├──── crud/
    │ │ ├──── __init__.py
    │ │ ├──── base.py
    │ │ └──── product.py
    │ ├──── db/
    │ │ ├──── __init__.py
    │ │ └──── session.py
    │ ├──── models/
    │ │ │ ├──── __init__.py
    │ │ ├──── basemodel.py
    │ │ └──── products.py
    │ ├──── schemas/
    │ │ ├──── __init__.py
    │ │ └──── product.py
    │ └──── utils/
    │ ├──── __init__.py
    │ └──── idgen.py
    └──── main.py
```

Вход в полноэкранный режим

В общих чертах:

- FastAPI_APP - Это корневой каталог нашего приложения.
- app - Хранит сервисы нашего API.
- main.py - Это точка входа в API.
- api - Содержит конечные точки API.
- core - Содержит основные функции, такие как настройки и логирование.
- crud - Содержит CRUD-операции (Create, Read, Update, Delete).
- db - Содержит код, связанный с базой данных.
- models - Содержит модели баз данных.
- utils - Содержит служебные функции и классы.

Для начала создания API необходимо установить Vscode или другую IDE. Затем создайте новый проект со структурой каталогов, показанной выше.

## [](https://dev.to/mbuthi/devops-with-fast-api-postgresql-how-to-containerize-fast-api-application-with-docker-1jdb#setting-up-our-docker-environment)Настройка нашего окружения docker

Для начала мы создадим файл docker compose и файл docker для нашего приложения.  
Для этого перейдите в vscode code, откройте файл с именем **Dockerfile** и вставьте в него приведенные ниже инструкции.

```
# Использовать официальный образ python из хаба docker
FROM python:3.10.13-bullseye


# предотвращает копирование файлов pyc в контейнер
ENV PYTHONDONTWRITEBYTECODE 1

# Обеспечивает протоколирование вывода python в терминале контейнера
ENV PYTHONUNBUFFERED 1




RUN apt-get update \
  # зависимости для сборки пакетов Python
  && apt-get install -y build-essential \
  # зависимости psycopg2
  && apt-get install -y libpq-dev \
  # Зависимости перевода
  && apt-get install -y gettext \
  # очистка неиспользуемых файлов
  && apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false \
  && rm -rf /var/lib/apt/lists/*

# Скопировать файл 'requirements.txt' из локального контекста сборки в файловую систему контейнера.
COPY ./requirements.txt /requirements.txt

# Установить зависимости python
RUN pip install -r /requirements.txt --no-cache-dir


# Установить рабочий каталог
WORKDIR /app

# Запустите программу Uvicorn для запуска веб-приложения на языке Python
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

Вход в полноэкранный режим

Далее мы создадим наш файл docker compose. Внутри vscode откройте файл **docker-compose.yml** и вставьте в него следующие инструкции.

```
# указать версию композита
version: '3.7'

# Указываем сервисы для нашей установки docker compose
services:

  api:
    build:
      # путь к директории, содержащей Dockerfile
      контекст: .

      # Укажите имя образа
    image: products_api

    # этот том используется для отображения файлов и папок на хосте на контейнер
    # таким образом, если мы изменим код на хосте, код в докер-контейнере также будет изменен
    volumes:
      - .:/app

    # Сопоставление порта 8000 на хосте с портом 8000 в контейнере
    ports:
      - 8000:8000

    # Указать путь к файлу .env
    env_file:
      - ./.env

    # Определите зависимость от сервиса "products_db", чтобы он запускался первым
    depends_on:
      - products_db

  products_db:

    # указать имя образа нашей базы данных
    # Если образ не найден в нашем локальном репозитории
    # Он будет взят из реестра докеров, которым является Docker Hub
    image: postgres:16rc1-alpine3.18

    # Монтируем том для хранения данных postgreSQL
    volumes:
      - postgres_data:/var/lib/postgresql/data/
    окружение:  # Использовать переменные окружения для настройки db
      - POSTGRES_USER=${POSTGRES_USER}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
      - POSTGRES_DATABASE=${POSTGRES_DATABASE}

# Определите том для сохранения данных postgreSQL
volumes:
  postgres_data:
```

Вход в полноэкранный режим

## [](https://dev.to/mbuthi/devops-with-fast-api-postgresql-how-to-containerize-fast-api-application-with-docker-1jdb#environment-variables-with-fastapi)Переменные окружения с FastAPI.

Далее мы создадим файл `.env` и инстанцируем наши переменные окружения. Внутри вашего vscode откройте файл .env и включите в него следующие переменные

```
# Хост базы данных PostgreSQL
POSTGRES_HOST=products_db

# Пользователь базы данных PostgreSQL
POSTGRES_USER=имя пользователя

# Пароль базы данных PostgreSQL
POSTGRES_PASSWORD=пароль

# Имя базы данных PostgreSQL
POSTGRES_DATABASE=database

# Порт базы данных PostgreSQL
POSTGRES_PORT=5432

# URI асинхронной базы данных для подключения к PostgreSQL
ASYNC_DATABASE_URI=postgresql+asyncpg://username:password@products_db:5432/database

# Название проекта или приложения
PROJECT_NAME=Product Listings
```

Вход в полноэкранный режим

Файл .env содержит чувствительные переменные. Включение этих
чувствительных переменных в файл .env всегда является хорошей практикой.

## [](https://dev.to/mbuthi/devops-with-fast-api-postgresql-how-to-containerize-fast-api-application-with-docker-1jdb#generating-unique-ids)Генерация уникальных идентификаторов.

В нашем приложении FastAPI мы определим надежную служебную функцию для генерации уникальных идентификаторов. Эта функция будет использовать модуль UUID. Перейдите в папку utils module/, откройте файл idgen.py и вставьте в него фрагмент кода, приведенный ниже.

```
import uuid

def idgen() -> str:
    # Генерируем случайную строку uuid
    return str(uuid.uuid4().hex)
```

Вход в полноэкранный режим

## [](https://dev.to/mbuthi/devops-with-fast-api-postgresql-how-to-containerize-fast-api-application-with-docker-1jdb#settings-configuration-in-fastapi)Настройка параметров в FastAPI

Далее мы создадим класс настроек. Этот класс будет наследоваться от базового класса настроек pydantic. Класс будет отвечать за загрузку переменных окружения в контекст приложения и определение других настроек приложения. Откройте файл с именем settings.py в своем vscode и вставьте следующий фрагмент кода.

```
# import packages
from pydantic_settings import BaseSettings
импортировать os
from dotenv import load_dotenv
импортировать секреты

load_dotenv()
class Settings(BaseSettings):
    """
    Параметры настроек и конфигураций приложения

    Этот класс определяет настройки приложения, используя библиотеку проверки данных pydantic
    """
    PROJECT_NAME: str = os.getenv("PROJECT_NAME")
    API_V1_STR: str = "/api/v1"
    ASYNC_DATABASE_URI: str = os.getenv("ASYNC_DATABASE_URI")
    SECRET_KEY: str = secrets.token_urlsafe(32)

settings = Settings()
```

Вход в полноэкранный режим

## [](https://dev.to/mbuthi/devops-with-fast-api-postgresql-how-to-containerize-fast-api-application-with-docker-1jdb#creating-our-models-in-fast-api)Создание наших моделей в Fast API

Начнем с создания базового класса. Базовый класс будет содержать общие атрибуты для всех моделей. Это поможет сохранить чистоту кода. Откройте файл base.py, который находится в папке models. Внутри файла вставьте следующий фрагмент кода

```
from sqlalchemy import DateTime, func
from sqlalchemy.orm import Mapped, declared_attr, DeclarativeBase, mapped_column
from app.utils.idgen import idgen
from datetime import datetime


class Base_(DeclarativeBase):
    """
    Базовый класс для моделей SQLAlchemy с общими атрибутами для сохранения DRY (Don't Repeat Yourself).

    Этот класс предназначен для использования в качестве базового класса для моделей SQLAlchemy.
    Он определяет общие атрибуты, такие как имя таблицы, временная метка создания,
    и метка обновления, которые могут быть унаследованы другими моделями, что поможет вам
    придерживаться принципа DRY (Don't Repeat Yourself).

    Атрибуты:
        __tablename__ (str): Имя таблицы, полученное из имени класса и набранное в нижнем регистре.
        id (str): Уникальный идентификатор каждой записи.
        created_on (datetime): Временная метка, когда была создана запись.
        updated_on (datetime, необязательно): Временная метка последнего обновления записи.
            По умолчанию принимается значение None, пока не произойдет обновление.

    Пример:
        Создание модели SQLAlchemy с использованием этого базового класса:


        class YourModel(Base_):
            # Определите здесь дополнительные атрибуты для вашей модели.

    """
    @declared_attr
    def __tablename__(cls):
        # Имя таблицы получается из имени класса в нижнем регистре
        return cls.__name__.lower()

    # Уникальный UUID-идентификатор для каждой записи
    id: Mapped[str] = mapped_column(primary_key=True, default=idgen,index=True)

    # Временная метка создания записи
    created_on: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())

    # Временная метка обновления записи, первоначально None, пока не произойдет обновление
    updated_on: Mapped[datetime] = mapped_column(DateTime(timezone=True), onupdate=func.now(), nullable=True)
```

Вход в полноэкранный режим

Базовый класс содержит атрибут id, который является уникальным UUID для каждой записи, а также атрибут created_on, который является временной меткой для создания записи, и updated_on, который является временной меткой для обновления записи.

Далее мы определим модель нашего продукта. Модель будет наследоваться от базового класса `Base_`. Откройте файл product.py, который находится в папке models. Внутри файла вставьте следующий фрагмент кода.

```
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String
from .base import Base_

class Product(Base_):
    """
    Это класс SQLAlchemy для определения модели продукта.
    Он наследует все атрибуты и методы класса Base_.
    Этот класс определяет общие атрибуты, такие как название, изображение цены,
    и вес.
    Атрибуты:
        name (str): Название товара
        price (str): Цена товара
        image (str): url изображения товара
        вес (str): Цена товара
    'nullable=False' означает, что эти столбцы не могут иметь в базе данных значения NULL.
    """
    name: Mapped[str] = mapped_column(String(30), index=True, nullable=False)
    цена: Mapped[str] = mapped_column(String(30), nullable=False)
    изображение: Mapped[str] = mapped_column(String, nullable=False)
    вес: Mapped[str] = mapped_column(String, nullable=False)
```

Вход в полноэкранный режим

Атрибут [`Mapped[str]`](https://docs.sqlalchemy.org/en/20/orm/internals.html#sqlalchemy.orm.Mapped) является всего лишь подсказкой в стиле Python. Она подчеркивает, что атрибут будет содержать значения типа string. [`mapped_column`](https://docs.sqlalchemy.org/en/20/orm/mapping_api.html#sqlalchemy.orm.mapped_column) заменяет прежний sqlalchemy `Column`.

## [](https://dev.to/mbuthi/devops-with-fast-api-postgresql-how-to-containerize-fast-api-application-with-docker-1jdb#creating-schemas-in-fast-api)Создание схем в Fast API.

Теперь мы определим наши [pydantic](https://docs.pydantic.dev/latest/)схемы. Эти [схемы](https://docs.pydantic.dev/latest/concepts/json_schema/) выступают в качестве классов данных, которые определяют, какие данные должны быть получены конечной точкой API, чтобы запрос считался корректным. Они также могут быть использованы в Fast API для определения [модели ответа](https://fastapi.tiangolo.com/tutorial/response-model/), которая представляет собой ответ, возвращаемый конечной точкой. Откройте файл product.py, находящийся в папке `schemas, и вставьте в него следующий фрагмент кода.

```
from typing import Optional
from pydantic import BaseModel

class ProductBase(BaseModel):
    name: str # Название товара (обязательно)
    price: str # Цена товара (обязательно)
    image: str # URL или путь к изображению товара (обязательно)
    weight: str # Вес товара (обязательно)

class ProductCreate(ProductBase):
    ...

class ProductUpdate(ProductBase):
    ...

class ProductPatch(ProductBase):
    name: Optional[str] # Имя необязательно для патча
    price: Optional[str] # Цена необязательна для патча
    image: Optional[str] # Изображение необязательно для патча
    weight: Optional[str] # Вес необязателен для исправления


class Product(ProductBase):
    id: str

    class Config:
        orm_mode = True
```

Вход в полноэкранный режим

`Optional` импортируется из модуля типизации Python, который определяет, что поле не является обязательным и поэтому может быть None.

## [](https://dev.to/mbuthi/devops-with-fast-api-postgresql-how-to-containerize-fast-api-application-with-docker-1jdb#creating-crud-operations-in-fast-api)Создание CRUD-операций в Fast API

Теперь мы определим методы Create, Read, Update и Delete. Для начала мы создадим базовый класс для этих операций. Базовый класс поможет в поддержании DRY-проектирования кода в Python. Различные модели SQLAlchemy также будут наследоваться от этого класса для выполнения операций с базой данных. Поэтому откройте файл base.py в папке с именем crud. Вставьте приведенный ниже фрагмент кода.

````
from typing import Any, Dict, Generic, Optional, Type, TypeVar
из pydantic import BaseModel
из sqlalchemy.ext.declarative import DeclarativeMeta
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import func, update
from fastapi.encoders import jsonable_encoder

ModelType = TypeVar("ModelType", bound=DeclarativeMeta)
CreateSchemaType = TypeVar("CreateSchemaType", bound=BaseModel)
UpdateSchemaType = TypeVar("UpdateSchemaType", bound=BaseModel)

class CRUDBase(Generic[ModelType, CreateSchemaType, UpdateSchemaType]):
    """
       Общие CRUD-операции (Create, Read, Update, Delete) для моделей SQLAlchemy.

    Этот класс предоставляет набор общих CRUD-операций, которые могут быть использованы с моделями SQLAlchemy.
    Он включает методы для создания, получения, обновления и удаления записей в базе данных.

    Args:
        model (Type[ModelType]): Класс модели SQLAlchemy для выполнения CRUD-операций.

    Пример:
        Создание экземпляра CRUD для конкретной модели (например, модели User):

        ```

python
        crud_user = CRUDBase[Prodcut, ProductCreateSchema, ProductUpdateSchema]


        ```
    """
    def __init__(self, model: Type[ModelType]):
        self.model = model
    # получить отдельный экземпляр
    async def get(self, db: AsyncSession, obj_id: str) -> Optional[ModelType]:
        query = await db.execute(select(self.model).where(self.model.id == obj_id))
        return query.scalar_one_or_none()

    # получить все множественные сущности
    async def get_multi(self, db: AsyncSession, *, skip: int = 0, limit: int = 100) -> ModelType:
        query = await db.execute(select(self.model))
        return query.scalars().all()

    # поиск конкретной сущности
    async def get_by_params(self, db: AsyncSession, **params: Any) -> Optional[ModelType]:
        query = select(self.model)
        for key, value in params.items():
            if isinstance(value, str):
                query = query.where(func.lower(getattr(self.model, key)) == func.lower(value))
            else:
                query = query.where(getattr(self.model, key) == value)
        result = await db.execute(query)
        return result.scalar_one_or_none()

    # добавить сущность
    async def get_or_create(self, db: AsyncSession,
                            defaults: Optional[Dict[str, Any]], **kwargs: Any) -> ModelType:
        instance = await self.get_by_params(db, **kwargs)
        if instance:
            return instance, False
        params = defaults или {}
        params.update(kwargs)
        instance = self.model(**params)
        db.add(instance)
        await db.commit()
        await db.refresh(instance)
        return instance, True

    # Частичное обновление сущности
    async def patch(self, db: AsyncSession,
                    *, obj_id: str,
                    obj_in: UpdateSchemaType | Dict[str, Any]
                    ) -> Optional[ModelType]:
        db_obj = await self.get(db=db, obj_id=obj_id)
        if not db_obj:
            return None
        update_data = obj_in if isinstance(obj_in, dict) else obj_in.model_dump(exclude_unset=True)
        запрос = (
            update(self.model)
            .where(self.model.id == obj_id)
            .values(**update_data)
        )
        await db.execute(query)
        return await self.get(db, obj_id)

    # Полное обновление сущности
    async def update(
        self,
        db: AsyncSession,
        *,
        obj_current: ModelType,
        obj_new: UpdateSchemaType | Dict[str, Any] | ModelType
    ):
        obj_data = jsonable_encoder(obj_current)

        if isinstance(obj_new, dict):
            update_data = obj_new
        else:
            update_data = obj_new.model_dump(exclude_unset=True)
        for field in obj_data:
            if field in update_data:
                setattr(obj_current, field, update_data[field])
        db.add(obj_current)
        await db.commit()
        await db.refresh(obj_current)
        return obj_current


    # полное удаление сущности из базы данных
    async def remove(self, db: AsyncSession, *, obj_id: str) -> Optional[ModelType]:
        db_obj = await self.get(db, obj_id)
        if not db_obj:
            return None

        await db.delete(db_obj)
        await db.commit()

        return db_obj

````

Вход в полноэкранный режим

Мы определили различные методы. Метод get получает из базы данных одну запись, соответствующую идентификатору объекта. Метод get_multi получает из базы данных пагинальные документы. Метод get_by_params осуществляет поиск совпадающих записей по заданным параметрам. Метод get_or_create сначала смотрит, существует ли сущность, если не существует, то сущность создается в БД. Метод patch обновляет поля записи. Метод update полностью обновляет поля записи. Метод remove удаляет запись из БД.

Определив наш базовый класс для CRUD-операций, мы теперь определим CRUD-операции продукта. CRUD-операции Product будут наследоваться от базового класса `CRUDBase`. Откройте файл product.py в папке crud. Вставьте приведенный ниже фрагмент кода.

```
from typing import Any, Coroutine, Dict, Optional
from fastapi_pagination import Page
from sqlalchemy.ext.asyncio import AsyncSession
from .base import CRUDBase
from app.schemas.product import ProductUpdate, ProductCreate
from app.models.product import Product

class CRUDProduct(CRUDBase[Product, ProductCreate, ProductUpdate]):

    async def get(self, db: AsyncSession, obj_id: str) -> Product:
        return await super().get(db, obj_id)

    async def get_or_create(self, db: AsyncSession, defaults: Dict[str, Any] | None, **kwargs: Any) -> Product:
        return await super().get_or_create(db, defaults, **kwargs)

    async def get_multi(self, db: AsyncSession, *, skip: int = 0, limit: int = 20) -> Страница[Продукт]:
        return await super().get_multi(db, skip=skip, limit=limit)

    async def update(self, db: AsyncSession, *, obj_current: Product, obj_new: ProductUpdate | Dict[str, Any] | Product):
        return await super().update(db, obj_current=obj_current, obj_new=obj_new)

    async def remove(self, db: AsyncSession, *, obj_id: str) -> Product | None:
        return await super().remove(db, obj_id=obj_id)

product = CRUDProduct(Product)

```

Вход в полноэкранный режим

## [](https://dev.to/mbuthi/devops-with-fast-api-postgresql-how-to-containerize-fast-api-application-with-docker-1jdb#creating-the-database-session)Создание сеанса работы с базой данных

Здесь мы определим асинхронный движок базы данных для выполнения асинхронных операций с базой данных. Затем мы свяжем этот движок с создателем сессии, которая будет асинхронно взаимодействовать с базой данных. Откройте файл session.py, который находится в папке с именем db. Вставьте приведенный ниже фрагмент кода.

```
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
из app.core.settings import settings

# Создаем асинхронный движок SQLAlchemy, используя ASYNC_DATABASE_URI из настроек приложения.
engine = create_async_engine(
    settings.ASYNC_DATABASE_URI,
)

# Создаем класс AsyncSession с помощью sessionmaker, привязанный к движку SQLAlchemy.
# Этот класс сессии будет использоваться для асинхронного взаимодействия с базой данных.
SessionLocal = sessionmaker(
    engine, expire_on_commit=False, class_=AsyncSession
)
```

Вход в полноэкранный режим

`create_async_engine` - Создает асинхронный движок SQLAlchemy, используя ASYNC_DATABASE_URI из настроек приложения.  
`sessionmaker` - Создается класс AsyncSession с использованием sessionmaker, привязанный к движку SQLAlchemy.

## [](https://dev.to/mbuthi/devops-with-fast-api-postgresql-how-to-containerize-fast-api-application-with-docker-1jdb#creating-fast-api-dependencies)Создание зависимостей Fast API

Здесь мы определим все зависимости, которые будут использоваться в нашем приложении. В их число может входить и сессия базы данных. Откройте файл с именем deps.py, находящийся в папке API, и вставьте в него фрагмент кода, приведенный ниже.

```
from typing import AsyncGenerator
from sqlalchemy.ext.asyncio import AsyncSession
из app.db.session import SessionLocal


async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with SessionLocal() as db:
        yield db
```

Вход в полноэкранный режим

Функция `get_db` - это асинхронная функция генерации, которая выдает сеанс работы с базой данных.

## [](https://dev.to/mbuthi/devops-with-fast-api-postgresql-how-to-containerize-fast-api-application-with-docker-1jdb#creating-the-product-listings-endpoints)Создание конечных точек списков товаров

Здесь мы определим методы POST, GET, PUT, PATCH и DELETE.

- POST будет создавать новый продукт.
- GET - получение продукта или продуктов.
- PUT полностью обновляет продукт.
- PATCH обновляет поля, указанные для продукта.
- DELETE удаляет продукт из базы данных.

Перейдите в редактор кода и откройте файл products.py, который находится в папке с именем endpoints. Внутри файла вставьте приведенный ниже фрагмент кода.

```
# Импорт необходимых модулей и компонентов
from typing import Annotated
from fastapi import APIRouter, status, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi_pagination import Page, paginate
from app.schemas.product import Product, ProductCreate, ProductPatch, ProductUpdate
from app.api.deps import get_db
from app import crud

# Создание экземпляра APIRouter
router = APIRouter()

# Определяем маршрут для создания нового продукта
@router.post("/", response_model=Product, status_code=status.HTTP_201_CREATED)
async def create_product(
    db: Annotated[AsyncSession, Depends(get_db)],
    product_in: ProductCreate
):
    # Используем CRUD-операции (Create, Read, Update, Delete) из модуля 'crud'
    # для создания нового продукта или возврата существующего, если он уже существует
    product, created = await crud.product.get_or_create(
        db=db, defaults=product_in.dict()
    )

    # Если продукт уже существует, поднимаем HTTPException с кодом состояния 400
    если не создан:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Продукт существует"
        )

    # Вернуть созданный или существующий продукт
    вернуть продукт

# Определение маршрута для получения продукта по его идентификатору
@router.get("/{productId}", response_model=Product, status_code=status.HTTP_200_OK)
async def get_product(
    db: Annotated[AsyncSession, Depends(get_db)],
    productId: str
):
    # Используем операцию CRUD для получения продукта по его ID
    product = await crud.product.get(db=db, obj_id=productId)

    # Если продукт не существует, то выдается HTTPException с кодом состояния 404
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
        )

    # Вернуть найденный продукт
    вернуть продукт

# Определяем маршрут для получения постраничного списка товаров
@router.get("/", response_model=Page[Product], status_code=status.HTTP_200_OK)
async def get_products(
    db: Annotated[AsyncSession, Depends(get_db)],
    skip: int = 0,
    limit: int = 20
):
    # Используем операцию CRUD для получения нескольких продуктов с пагинацией
    products = await crud.product.get_multi(db=db, skip=skip, limit=limit)

    # Если продукты не найдены, выдать HTTPException с кодом состояния 404
    if not products:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Продукты не найдены"
        )

    # Возвращаем постраничный список продуктов
    return paginate(products)

# Определяем маршрут для частичного обновления товара
@router.patch("/{productId}", status_code=status.HTTP_200_OK)
async def patch_product(
    db: Annotated[AsyncSession, Depends(get_db)],
    product_Id: str,
    product_in: ProductPatch
):
    # Используем операцию CRUD для получения продукта по его идентификатору
    product = await crud.product.get(db=db, obj_id=product_Id)

    # Если продукт не существует, то выдается HTTPException с кодом состояния 404
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
        )

    # Используем операцию CRUD для исправления (частичного обновления) продукта
    product_patched = await crud.product.patch(db=db, obj_id=product_Id, obj_in=product_in.dict())

    # Возврат исправленного продукта
    return product_patched

# Определить маршрут для полного обновления продукта
@router.put("/{productId}", response_model=Product, status_code=status.HTTP_200_OK)
async def update_product(
    db: Annotated[AsyncSession, Depends(get_db)],
    productId: str,
    product_in: ProductUpdate
):
    # Используем операцию CRUD для получения продукта по его идентификатору
    product = await crud.product.get(db=db, obj_id=productId)

    # Если продукт не существует, то выдается HTTPException с кодом состояния 404
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
        )

    # Используем операцию CRUD для полного обновления продукта
    product_updated = await crud.product.update(
        db=db, obj_current=product, obj_new=product_in
    )

    # Возврат обновленного продукта
    return product_updated

# Определение маршрута для удаления продукта
@router.delete("/{productId}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_product(
    db: Annotated[AsyncSession, Depends(get_db)],
    productId: str
):
    # Используем операцию CRUD для получения продукта по его ID
    product = await crud.product.get(db=db, obj_id=productId)

    # Если продукт не существует, то выдается HTTPException с кодом состояния 404
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
        )

    # Используем операцию CRUD для удаления (delete) продукта
    await crud.product.remove(db=db, obj_id=productId)

    # Возвращаем ответ 204 No Content, свидетельствующий об успешном удалении
    return

```

Вход в полноэкранный режим

Конечные точки состоят из комментариев, поясняющих, что происходит в каждой из них.

Теперь нам необходимо отобразить конечные точки на точку входа API, для чего мы отредактируем два файла. Для первого файла откроем файл api.py, который находится в папке с именем v1. Затем вставим в него фрагмент кода, приведенный ниже.

```
# Импортируем класс APIRouter из FastAPI
from fastapi import APIRouter

# Импорт маршрутизатора 'products' из модуля 'app.api.v1.endpoints'
from app.api.v1.endpoints import products

# Создаем экземпляр APIRouter
router = APIRouter()

# Включить маршрутизатор 'products' в качестве подмаршрутизатора с префиксом '/products'
# и присваиваем тег "Products" для группировки связанных с ним конечных точек API
router.include_router(products.router, prefix="/products", tags=["Products"])
```

Вход в полноэкранный режим

Затем откройте файл main.py и вставьте в него приведенный ниже фрагмент кода.

```
# Импортируем класс FastAPI из фреймворка FastAPI
from fastapi import FastAPI

# Импорт add_pagination
from fastapi_pagination import add_pagination

# Импорт 'router' из модуля 'app.api.v1.api'
from app.api.v1.api import router

# Импорт объекта 'settings' из модуля 'app.core.settings'
from app.core.settings import settings

# Создаем экземпляр приложения FastAPI
# - 'title' устанавливается в название проекта из 'settings'
# - 'openapi_url' задает URL для документации по OpenAPI
app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Добавить необходимые параметры пагинации во все маршруты, использующие paginate
add_pagination(app)

# Включите "маршрутизатор" (содержащий маршруты API) в приложение FastAPI
app.include_router(router)
```

Вход в полноэкранный режим

До этого момента мы можем попробовать раскрутить наш сервер. Для этого мы должны собрать наше приложение с помощью докер-контейнеров и докер-образов.

## [](https://dev.to/mbuthi/devops-with-fast-api-postgresql-how-to-containerize-fast-api-application-with-docker-1jdb#running-the-product-listings-api)Запуск API списков товаров

Здесь мы попробуем запустить наш API.

Предполагая, что на вашей локальной машине установлен [docker](https://docs.docker.com/engine/install/), откройте терминал vscode.

Чтобы включить терминал:

- Windows используйте сочетание клавиш **ctrl + \`**.
- В Mac OS используйте сочетание клавиш **⌘ +\`**.
- В Linux используется сочетание клавиш **Ctrl+Shift+\`**.

В\` терминале напишите следующую команду:

```
docker-compose -f docker-compose.yml up -d
```

Вход в полноэкранный режим

- `docker-compose` - Эта команда используется для управления контейнерами Docker с помощью Docker compose.
- \-f - Здесь указывается путь к файлу compose.
- docker-compose.yml - Это путь к файлу compose, в котором определяются контейнеры. В нашем случае это docker-compose.yml.
- up - Используется для инициализации и запуска сервисов, указанных в файле compose. В нашем случае запускаются сервисы `products_db` и `api`.
- \-d - Указывает, что контейнеры должны запускаться в режиме отсоединения, т.е. контейнеры запускаются как фоновые сервисы.

После успешного выполнения команды можно убедиться, что контейнеры действительно запущены, выполнив следующую команду в терминале vscode:

```
docker ps
```

Вход в полноэкранный режим

Вы должны увидеть следующий вывод:

[![Описание изображения](https://res.cloudinary.com/practicaldev/image/fetch/s--3iduM_6x--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/8wr6qtwbscldbk26jzb7.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--3iduM_6x--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/8wr6qtwbscldbk26jzb7.png)

Чтобы просмотреть документацию API через Swagger, можно открыть удобный браузер и вставить URL, приведенный ниже:

```
http://localhost:8000/docs
```

Вход в полноэкранный режим

По умолчанию мы будем обращаться к нашему API через порт 8000, поскольку именно этот порт мы привязали к хосту, как мы ранее указали в файле docker compose.

В браузере вы увидите примерно следующее:

[![Описание изображения](https://res.cloudinary.com/practicaldev/image/fetch/s--QnUiM7H6--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ia3qw45rr4jc6kexttyn.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--QnUiM7H6--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ia3qw45rr4jc6kexttyn.png)

Теперь мы успешно настроили наш API для работы с листингами товаров. Однако если мы попытаемся выполнить POST-запрос в Swagger, то получим ошибку 500 Internal server error.

Чтобы понять, в чем причина ошибки, мы просмотрим журналы контейнера `api`. Для просмотра журналов мы можем использовать [docker desktop](https://www.docker.com/products/docker-desktop/) или наш терминал. Для этого в терминале vscode мы выполним приведенную ниже команду:

```
docker logs <CONTAINER ID>
```

Вход в полноэкранный режим

Идентификатор `CONTAINER ID` - это идентификатор запущенного в данный момент контейнера `api`.

Для получения `CONTAINER ID` выполним команду:

```
docker ps
```

Вход в полноэкранный режим

После успешного выполнения команды `docker logs` мы получим следующую ошибку, как показано на рисунке ниже:

[![Описание изображения](https://res.cloudinary.com/practicaldev/image/fetch/s--no3Ti_-V--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/5ou564u6dgrog0juujj7.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--no3Ti_-V--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/5ou564u6dgrog0juujj7.png)

В последней строке мы видим, что в логах указано, что `база данных` не существует``. Ранее мы определили в файле `**.env**`, что POSTGRES_DATABASE=database. В то время как эта база данных с именем database не существует. Это означает, что нам придется сначала создать саму базу данных.

Для создания базы данных мы воспользуемся контейнером `products_db`.

В терминале vscode:

- Выполните приведенную ниже команду

```
docker exec -it <CONTAINER ID> /bin/bash
```

Вход в полноэкранный режим

Приведенная выше команда запускает Bash-терминал внутри контейнера.

Выполните команду `docker ps` для получения идентификатора `products_db` и замените `CONTAINER ID` на идентификатор экземпляра образа `products_db`.

- Нам необходимо создать базу данных. Для этого в Bash-терминале контейнера выполним следующую серию команд:

```
psql -U username
```

Вход в полноэкранный режим

Приведенная выше команда запускает терминальный интерфейс для работы с PostgreSQL. Это позволяет вводить запросы в интерактивном режиме.

```
CREATE DATABASE database;
```

Вход в полноэкранный режим

Приведенная выше команда создает в PostgreSQL базу данных с именем database.

```
ALTER ROLE username WITH PASSWORD 'password';
```

Вход в полноэкранный режим

Приведенная выше команда изменяет роль username и присваивает ей пароль `password`.

```
GRANT ALL PRIVILEGES ON DATABASE database TO username;
```

Вход в полноэкранный режим

Приведенная выше команда предоставляет все привилегии базы данных пользователю с именем username.

После этого необходимо выполнить миграцию базы данных.

## [](https://dev.to/mbuthi/devops-with-fast-api-postgresql-how-to-containerize-fast-api-application-with-docker-1jdb#fast-api-database-migrations)Быстрая миграция базы данных API

Миграции баз данных или миграции схем - это контролируемые наборы изменений, разработанные для модификации структуры объектов реляционной базы данных.

Для выполнения миграции в нашем API мы создадим файл alembic.ini и папку alembic в корневом каталоге проекта. Внутри папки alembic создадим еще одну папку с именем versions и два файла env.py и script.py.mako.

Теперь структура каталогов проекта выглядит следующим образом:

```
.
└── FastAPI_APP/
    ├──── app/
    │ ├──── alembic.ini
    │ ├──── alembic/
    │ │ ├──── versions
    │ │ ├──── env.py
    │ │ └──── script.py.mako
    │ ├──── api/
    │ │ ├── v1/
    │ │ │ │ ├──── endpoints/
    │ │ │ │ │ ├──── __init__.py
    │ │ │ │ │ └──── products.py
    │ │ │ │ ├──── __init__.py
    │ │ │ │ └──── api.py
    │ │ │ ├──── __init__.py
    │ │ │ └──── deps.py
    │ ├──── core/
    │ │ ├──── __init__.py
    │ │ └──── settings.py
    │ ├──── crud/
    │ │ ├──── __init__.py
    │ │ ├──── base.py
    │ │ └──── product.py
    │ ├──── db/
    │ │ ├──── __init__.py
    │ │ └──── session.py
    │ ├──── models/
    │ │ │ ├──── __init__.py
    │ │ ├──── basemodel.py
    │ │ └──── products.py
    │ ├──── schemas/
    │ │ ├──── __init__.py
    │ │ └──── product.py
    │ └──── utils/
    │ ├──── __init__.py
    │ └──── idgen.py
    └──── main.py
```

Вход в полноэкранный режим

Теперь отредактируем добавленные нами файлы.

Откройте файл alembic.ini и вставьте в него приведенный ниже скрипт:

```
# Общая конфигурация одной базы данных.

[alembic]
# путь к скриптам миграции
script_location = alembic

# шаблон, используемый для генерации имен файлов миграции; По умолчанию используется %%(rev)s_%%(slug)s
file_template = %%(year)d-%%(month).2d-%%(day).2d-%%(hour).2d-%%(minute).2d_%%(rev)s

# путь sys.path, при наличии будет дописан к sys.path.
# по умолчанию к текущему рабочему каталогу.
prepend_sys_path = .

version_path_separator = os # Использовать os.pathsep. Конфигурация по умолчанию, используемая для новых проектов.


sqlalchemy.url =


[post_write_hooks].

# Конфигурация протоколирования
[loggers]
ключи = root,sqlalchemy,alembic

[handlers]
ключи = консоль

[formatters]
ключи = generic

[logger_root]
уровень = WARN
обработчики = консоль
qualname =

[logger_sqlalchemy]
уровень = WARN
обработчики =
qualname = sqlalchemy.engine

[logger_alembic]
уровень = INFO
обработчики =
qualname = alembic

[handler_console]
class = StreamHandler
args = (sys.stderr,)
уровень = NOTSET
форматтер = generic

[formatter_generic]
format = %(levelname)-5.5s [%(name)s] %(message)s
datefmt = %H:%M:%S
```

Вход в полноэкранный режим

Файл alembci.ini является конфигурационным файлом, используемым с Alembic, и содержит настройки и опции для управления изменениями схемы базы данных с течением времени.

Откройте файл env.py, находящийся в папке или модуле alembic, и вставьте в него приведенный ниже фрагмент кода:

```
# Импортируем необходимые модули
import asyncio
import sys
import pathlib
from alembic import context
from sqlalchemy.ext.asyncio import create_async_engine

# Импорт необходимых моделей и настроек базы данных
from app.models.product import Product
from app.core.settings import settings
from app.models.base import Base_
from sqlalchemy.orm import declarative_base

# Определяем целевые метаданные для миграций
target_metadata = Base_.metadata

# Добавляем родительский каталог текущего файла в sys.path
# Это позволяет импортировать модули из родительского каталога
sys.path.append(str(pathlib.Path(__file__).resolve().parents[1]))

# Определяем функцию для запуска миграций
def do_run_migrations(connection):
    context.configure(
        compare_type=True,
        dialect_opts={"paramstyle": "named"},
        connection=connection,
        target_metadata=target_metadata,
        include_schemas=True,
        version_table_schema=target_metadata.schema,
    )

    с context.begin_transaction():
        context.run_migrations()

# Определите асинхронную функцию для запуска миграций в режиме онлайн
async def run_migrations_online():
    """Запуск миграций в режиме "онлайн".

    В этом сценарии мы создаем Engine
    и связываем соединение с контекстом.

    """
    # Создаем асинхронный движок базы данных, используя URI из настроек
    connectable = create_async_engine(settings.ASYNC_DATABASE_URI, future=True)

    # Подключение к базе данных и запуск миграций в транзакции
    async с connectable.connect() as connection:
        await connection.run_sync(do_run_migrations)

# Запуск миграций в режиме онлайн с помощью asyncio
asyncio.run(run_migrations_online())
```

Вход в полноэкранный режим

Приведенный выше сценарий запускает миграции баз данных с использованием Alembic для асинхронного движка баз данных в Fast API.

Откройте файл с именем script.py.mako, содержащийся в модуле alembic. Вставьте приведенный ниже сценарий:

```
"""
Revision ID: ${up_revision}
Пересмотры: ${down_revision | запятая,n}
Дата создания: ${create_date}
"""

# Импортируем необходимые модули из Alembic и SQLAlchemy
from alembic import op
import sqlalchemy as sa

# Импортируем все дополнительные необходимые модули (если они указаны)
${imports if imports else ""}

# Определяем идентификаторы ревизий, используемые Alembic
revision = ${repr(up_revision)} # Уникальный идентификатор для данной ревизии
down_revision = ${repr(down_revision)} # Ревизия, к которой относится данная ревизия (если таковая имеется)
branch_labels = ${repr(branch_labels)}  # Метки, связанные с этой ревизией (если таковые имеются)
depends_on = ${repr(depends_on)} # Зависимости для данной ревизии (если таковые имеются)

def upgrade():
    ${upgrades if upgrades else "pass"}
    """
    Эта функция вызывается при обновлении схемы базы данных.
    Можно указать SQL-операции для применения изменений схемы.
    Если операции не указаны, то можно использовать 'pass'.
    """

def downgrade():
    ${downgrades if downgrades else "pass"}.
    """
    Эта функция вызывается при понижении схемы базы данных.
    Можно указать SQL-операции для отмены изменений схемы.
    Если операции не указаны, то можно использовать 'pass'.
    """
```

Вход в полноэкранный режим

Определив скрипты для работы с миграциями, мы теперь должны выполнить их в api контейнере. Для этого выполните приведенные ниже команды:

```
docker exec -it <CONTAINER ID> /bin/bash
```

Вход в полноэкранный режим

Приведенная выше команда запускает Bash-терминал внутри контейнера.

Замените идентификатор на реальный идентификатор api-контейнера. Для получения api-контейнера выполните команду `docker ps`.

```
alembic revision --autogenerate -m "Migrate products table"
```

Вход в полноэкранный режим

Приведенная выше команда генерирует новый сценарий миграции. Новый сценарий миграции содержит различия между текущей схемой базы данных и определениями моделей в коде.

```
alembic upgrade head
```

Вход в полноэкранный режим

Приведенная выше команда применяется ко всем незавершенным миграциям.

## [](https://dev.to/mbuthi/devops-with-fast-api-postgresql-how-to-containerize-fast-api-application-with-docker-1jdb#testing-our-api)Тестирование нашего API

Поскольку мы уже выполнили миграцию схемы нашей базы данных, теперь мы можем с уверенностью протестировать наш API с помощью swagger-документов.

Чтобы получить доступ к документам Swagger, введите в браузер следующий URL:

```
http://localhost:8000/docs
```

Вход в полноэкранный режим

Для начала мы можем выполнить POST-запрос.

### [](https://dev.to/mbuthi/devops-with-fast-api-postgresql-how-to-containerize-fast-api-application-with-docker-1jdb#post-request-fast-api)POST-запрос Fast API

В Swagger разверните сворачиваемый POST-запрос, затем нажмите кнопку **Пробовать**. В разделе **Тело ответа** измените значения ключей JSON-схемы по своему усмотрению, как показано ниже.

[![Описание изображения](https://res.cloudinary.com/practicaldev/image/fetch/s--aXDqDZjh--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/a6mc6r5hul4jyrra45gh.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--aXDqDZjh--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/a6mc6r5hul4jyrra45gh.png)

В качестве ключа image можно указать URL-адрес изображения. Затем нажмите на кнопку выполнить. После успешного выполнения POST вы увидите код состояния 201 created с телом ответа, как показано ниже:

[![Описание изображения](https://res.cloudinary.com/practicaldev/image/fetch/s--2gMwziNr--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/076lgbcbkihrn6da02jf.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--2gMwziNr--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/076lgbcbkihrn6da02jf.png)

Тело **ответа** может отличаться от приведенного выше в зависимости от значений, которые вы присвоили своей схеме JSON.

### [](https://dev.to/mbuthi/devops-with-fast-api-postgresql-how-to-containerize-fast-api-application-with-docker-1jdb#get-request-paginated-data)GET-запрос (постраничные данные)

В GET-запросе мы хотим получить несколько элементов. Для этого мы можем указать пропуск и ограничение.  
Skip, аналогично OFFSET, - это количество строк таблицы результатов, которые необходимо пропустить, прежде чем будут получены какие-либо строки.  
Limit - это синтаксис, указывающий на получение ПЕРВЫХ N строк таблицы результатов.

Щелкните на запросе get, и для параметра skip мы можем принять значение по умолчанию, равное 0, а для параметра limit мы также можем принять значение по умолчанию, равное 20.

Щелкните на кнопке **execute**, и в результате вы увидите тело **Response body**, содержащее постраничные данные о продукте.

[![Описание изображения](https://res.cloudinary.com/practicaldev/image/fetch/s--uZRhVroN--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/1e7vd2vwj6z10bhjo3mc.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--uZRhVroN--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/1e7vd2vwj6z10bhjo3mc.png)

## [](https://dev.to/mbuthi/devops-with-fast-api-postgresql-how-to-containerize-fast-api-application-with-docker-1jdb#bonus-points)Бонусные баллы

В качестве дополнительного бонуса у вас есть возможность изучить оставшиеся конечные точки и поделиться своими соображениями по поводу ”тела ответа” в разделе комментариев.

Получить доступ к проекту можно в моем репозитории GitHub по следующему URL:

```
https://github.com/mbuthi/product_listing_API
```

Вход в полноэкранный режим

Клонируйте проект в локальный репозиторий и приступайте к его запуску.

## [](https://dev.to/mbuthi/devops-with-fast-api-postgresql-how-to-containerize-fast-api-application-with-docker-1jdb#conclusion)Заключение

В заключение этой статьи мы рассмотрели процесс контейнеризации приложения Fast API и базы данных PostgreSQL с помощью docker. Разделив API и базу данных на отдельные контейнеры, мы добились переносимости и простоты развертывания.

Мы начали с создания файлов dockerfile и docker compose для нашей среды docker, настройки моделей, схем, CRUD-операций и конечных точек.

На протяжении всей статьи мы рассказывали о том, как сохранять данные с помощью томов в docker, а также о лучших практиках docker и подчеркивали важность DRY-программирования.

Я надеюсь, что эта статья дала вам представление о контейнеризации приложений Fast API и баз данных PostgreSQL с помощью docker и позволила вывести веб-приложения на новый уровень. По мере того как вы будете продолжать знакомство с контейнеризацией, изучайте более сложные темы, связанные с Fast API и docker.
