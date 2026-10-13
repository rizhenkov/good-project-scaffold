# Сигнатуры методов (Repository & Services)

## Порядок аргументов: от общего к частному

`(scopeId, entityId)` — сначала «где ищем», потом «что ищем».

```typescript
// ✅
findItem(orderId: string, itemId: string);
// ❌
findItem(itemId: string, orderId: string);
```

## Позиционные аргументы vs объект

- **1–2 обязательных связанных идентификатора** → позиционно: `findById(id)`,
  `findItem(orderId, itemId)`.
- **3 и более аргументов**, аргументы одного типа, которые легко перепутать, или нет
  очевидной иерархии → один объект:

```typescript
service.recordPayment({ orderId, customerId, amount });
```

## Опции

Необязательные параметры, флаги, сортировка, пагинация — последним аргументом-объектом
`options`. Никаких boolean trap (`true, 10` позиционно).

```typescript
orders.findExpiring(before, { limit: 100, includeCancelled: false });
```

## Cheat sheet

| Ситуация          | Решение                       | Пример                                  |
|:------------------|:------------------------------|:----------------------------------------|
| Поиск по id       | 1 позиционный                 | `findById(id)`                          |
| Поиск в контексте | 2 позиционных                 | `findItem(orderId, itemId)`             |
| Сложный поиск     | объект                        | `find({ customerId, status, createdBefore })` |
| Настройки         | объект `options` последним    | `findAll(customerId, { limit: 20 })`    |
