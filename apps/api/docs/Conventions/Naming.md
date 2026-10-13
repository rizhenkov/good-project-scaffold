# Именование (Naming)

## Файлы

Суффикс говорит о роли файла: по имени в поиске IDE сразу видно, что это.

| Категория        | Суффикс           | Пример                          |
|:-----------------|:------------------|:--------------------------------|
| Сущность         | `.entity.ts`      | `order.entity.ts`               |
| Value object     | `.vo.ts`          | `money.vo.ts`                   |
| Интерфейс (порт) | `.interface.ts`   | `file-storage.interface.ts`     |
| Сервис           | `.service.ts`     | `cancel-order.service.ts`       |
| Репозиторий      | `.repository.ts`  | `prisma-order.repository.ts`    |
| Реализация порта | `.storage.ts` и т. п. по роли | `s3-file.storage.ts`  |
| Клиент внешнего API | `.client.ts`   | `s3-api.client.ts`              |
| Роуты            | `.routes.ts`      | `order.routes.ts`               |
| Middleware       | `.middleware.ts`  | `auth.middleware.ts`            |
| Схема валидации  | `.schema.ts`      | `order.schema.ts`               |
| Доменная ошибка  | `.error.ts`       | `order-not-found.error.ts`      |
| Конфиг           | `.config.ts`      | `auth.config.ts`                |
| Unit-тест        | `.test.ts`        | `order.entity.test.ts`          |

Файлы и папки — `kebab-case`.

## Типы

- **Без префикса `I`** у интерфейсов: `FileStorage`, не `IFileStorage`. Потребителю
  всё равно, интерфейс это или класс.
- **Без суффикса `Interface` в имени типа.** Суффикс только в имени файла.
- **Реализация называется по технологии**: `PrismaOrderRepository` реализует `OrderRepository`,
  `S3FileStorage` реализует `FileStorage`.
- **Префикс `App`** только при конфликте с глобальными именами (`AppLogger` вместо `Logger`).
- Классы и интерфейсы — `PascalCase`, переменные и методы — `camelCase`, константы —
  `UPPER_SNAKE_CASE`.

## Имя файла ↔ имя типа

`FileStorage` → `file-storage.interface.ts`, `CancelOrderService` →
`cancel-order.service.ts`. Один основной экспорт на файл.

## DI-токены

Если выбрана DI-библиотека с токенами ([../DI-Container.md](../DI-Container.md)), строка
токена равна имени интерфейса: `@inject('FileStorage')`.

## База данных

Модели ORM — `PascalCase`, таблицы и колонки — `snake_case` (в Prisma через
`@@map` / `@map`).
