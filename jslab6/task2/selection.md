## SCENARIO_01

Problem Summary: Нужно единое хранилище конфигурации приложения, доступное всем модулям, и всегда возвращающее один и тот же объект
Selected Pattern Family: Creational
Selected Pattern: Singleton
Why This Family?: Это задача контроля создания объекта (нельзя допустить несколько экземпляров конфигурации), а порождающие паттерны решают проблемы создания. 
Why This Pattern?: Singleton гарантирует единственный экземпляр и глобальную точку доступа.
Alternative Considered: Factory Method — создаёт объекты разных типов, но не обеспечивает ровно один объект на всё приложение

## SCENARIO_02

Problem Summary: Есть legacy gateway с устаревшим интерфейсом; новый код ожидает другой формат вызова.
Selected Pattern Family: Structural
Selected Pattern: Adapter
Why This Family?: Это проблема «стыковки» интерфейсов и композиции объектов, а Structural паттерны отвечают за соединение объектов без ломки системы. 
Why This Pattern?: Adapter преобразует современный вызов charge({amount, currency, cardToken}) в legacy processPayment(cardNumber, amount, currencyCode).
Alternative Considered: Facade — скрывает подсистему, но не обязательно решает несовместимость интерфейса один-к-одному.

## SCENARIO_03

Problem Summary: Несколько компонентов должны реагировать на событие отправки домашки, без жёстких прямых вызовов друг друга.
Selected Pattern Family: Behavioral
Selected Pattern: Observer
Why This Family?: Суть задачи — коммуникация и уведомления между независимыми объектами. Behavioral паттерны оптимизируют взаимодействие. 
Why This Pattern?: Observer позволяет подписчикам получать уведомления от издателя без прямой связанности
Alternative Considered: Mediator — тоже координирует коммуникацию, но здесь проще и естественнее модель

## SCENARIO_04

Problem Summary: Есть одинаковый процесс построения отчёта, но разные представления (HTML/PDF), и нужно легко добавлять новые форматы.
Selected Pattern Family: Creational
Selected Pattern: Builder
Why This Family?: Это про процесс создания сложного результата по шагам; Ch.6 описывает Builder как отделяющий процесс построения от представления
Why This Pattern?: Director фиксирует шаги сборки, а конкретные builders меняют формат без изменения логики построения.
Alternative Considered: Factory — создаёт объект, но не описывает пошаговую сборку сложного продукта

## SCENARIO_05

Problem Summary: Нужны undo/redo для действий (move/rename/delete), каждое действие — объект, который можно хранить и переисполнять
Selected Pattern Family: Behavioral
Selected Pattern: Command
Why This Family?: Это управление действиями и взаимодействием. Behavioral паттерны про контроль потока действий
Why This Pattern?: Command инкапсулирует действие в объект, позволяет хранить историю, делать undo/redo, добавлять новые команды без изменения invoker
Alternative Considered: Memento — хранит состояние для отката, но здесь требуется именно объект-действие и переисполнение

## SCENARIO_06

Problem Summary: Нужно сильно снизить память, разделив общие TYPE-данные между тысячами частиц, сохраняя уникальные координаты отдельно
Selected Pattern Family: Structural
Selected Pattern: Flyweight
Why This Family?: Это задача композиции и эффективного переиспользования общих данных (intrinsic state). Structural паттерны помогают строить структуру объектов
Why This Pattern?: Flyweight разделяет intrinsic (общие) и extrinsic (уникальные) данные и кэширует типы
Alternative Considered: Prototype — клонирует, но не решает проблему общего кэша и переиспользования типа на 50000 объектов