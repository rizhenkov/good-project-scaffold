# AGENTS.md

> **Каркас не инициализирован.** Пока существует `scaffold/INIT.md`, сначала выполни
> его — до любой другой задачи. Этот блок удаляется при инициализации.

## Проект

<Название — одна фраза: что делает и для кого. Заполняется при инициализации.>

Карта документации и правило, где какой документ живёт, — [README.md](README.md).

## Перед задачей

Прочитай оглавление [ADR](docs/ADR/README.md) и ADR своей области (ADR-001 п. 7), затем
документы области:

| Задача касается                                | Читать                                                                                                                                                                  |
|------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| кода api: куда положить, как назвать           | [Layer-Boundaries](apps/api/docs/Conventions/Layer-Boundaries.md), [Naming](apps/api/docs/Conventions/Naming.md), [Signatures](apps/api/docs/Conventions/Signatures.md) |
| зависимостей и DI                              | [DI-Container](apps/api/docs/DI-Container.md)                                                                                                                           |
| схемы данных, запросов, миграций               | [Conventions/Database](apps/api/docs/Conventions/Database.md), [Database-Access](apps/api/docs/Database-Access.md)                                                      |
| очередей и расписаний                          | [Background-Jobs](apps/api/docs/Conventions/Background-Jobs.md)                                                                                                         |
| ошибок и ответов API                           | [Errors](apps/api/docs/Conventions/Errors.md)                                                                                                                           |
| тестов                                         | [Conventions/Testing](apps/api/docs/Conventions/Testing.md), [Test-Setup](apps/api/docs/Test-Setup.md)                                                                  |
| всего, что зависит от рантайма, БД или очереди | [Platform](apps/api/docs/Platform.md)                                                                                                                                   |
| конфигурации и деплоя                          | [Configuration](apps/api/docs/Configuration.md), [Deployment](apps/api/docs/Deployment.md)                                                                              |
| интерфейса и его текстов                       | [Design](apps/web/docs/Design.md), [Glossary](docs/Glossary.md)                                                                                                         |

## Команды

<Заполняется при инициализации: установка зависимостей, локальный запуск, линтер,
проверка типов, все тесты. Команды отдельных видов тестов — в
[apps/api/docs/Test-Setup.md](apps/api/docs/Test-Setup.md).>

## Готово, когда

- Тесты, линтер и проверка типов проходят; новый код покрыт тестами по
  [Conventions/Testing.md](apps/api/docs/Conventions/Testing.md).
- Документы поправлены в том же изменении, что и код:
  - новое значимое решение — ADR и строка в его оглавлении (критерии — в
    [docs/ADR/README.md](docs/ADR/README.md));
  - новый код ошибки, переменная, порт (интерфейс внешней зависимости,
    [DI-Container](apps/api/docs/DI-Container.md)), очередь или расписание — в таблице
    документа, который их ведёт;
  - отложенное («позже», «отдельным ADR») — строка в [бэклоге](docs/Backlog.md).
- Сгенерированная миграция прочитана целиком
  ([Conventions/Database.md](apps/api/docs/Conventions/Database.md) §7).
- Код, который опирается на правило из ADR, ссылается на его пункт (ADR-001 п. 4).
