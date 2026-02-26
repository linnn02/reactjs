## Что решает Factory
Паттерн Factory (Фабрика) создаёт объекты без указания точного класса напрямую.
Вместо `new EmailNotification(...)` мы вызываем `NotificationFactory.create(type, options)`

## Чем отличается от Constructor
- Constructor: вызывающий код знает конкретный класс (`new EmailNotification`)
- Factory: вызывающий код передаёт только `type`, а фабрика сама решает, какой класс создать

## Когда использовать
- тип объекта определяется во время выполнения (runtime)
- нужно легко добавлять новые типы объектов
- хочется убрать разрастание `if/else` и `switch` по проекту и держать создание в одном месте

## Состав
- `notifications/` классы Email/SMS/Push (все имеют `send(message)`)
- `NotificationFactory.js` фабрика для создания объектов
- `app.js` — пример использования

## Как запустить
node task2/app.js