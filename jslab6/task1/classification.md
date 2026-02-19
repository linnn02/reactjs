## SNIPPET_01

**Pattern Family:** Creational

**Specific Pattern:** Singleton

**Evidence:**
if (DatabaseConnection._instance) {
    return DatabaseConnection._instance;
}

static getInstance() {
    if (!DatabaseConnection._instance) {
        new DatabaseConnection('localhost', 5432);
    }
    return DatabaseConnection._instance;
}

**Book Reference:** Chapter 6 "Creational Design Patterns", Chapter 7 "The Singleton Pattern"

**Reasoning:**
Данный код реализует паттерн Singleton, потому что он гарантирует создание только одного экземпляра класса DatabaseConnection. Конструктор проверяет наличие уже существующего экземпляра и возвращает его вместо создания нового. Метод getInstance() обеспечивает глобальную точку доступа к этому объекту. Согласно Chapter 6, порождающие паттерны управляют созданием объектов, и Singleton является одним из них


## SNIPPET_02

**Pattern Family:** Behavioral

**Specific Pattern:** Observer

**Evidence:**

subscribe(event, callback)
publish(event, data)
handlers.forEach(handler => handler(data))

**Book Reference:** Chapter 6 "Behavioral Design Patterns", Chapter 7 "The Observer Pattern"

**Reasoning:**
Этот код реализует механизм подписки и уведомления. Объекты могут подписываться на события и получать уведомления при их возникновении. EventBus не знает конкретных подписчиков, он просто уведомляет их. Согласно Chapter 6, поведенческие паттерны управляют коммуникацией между объектами. Observer позволяет уведомлять множество объектов об изменениях


## SNIPPET_03

**Pattern Family:** Structural

**Specific Pattern:** Facade

**Evidence:**
this._auth = new AuthService();
this._repo = new UserRepository();
this._logger = new AuditLogger();

login(token) {
    this._auth.validateToken(token);
    this._repo.findByToken(token);
    this._logger.log('LOGIN', user);
}

**Book Reference:** Chapter 6 "Structural Design Patterns", Chapter 7 "The Facade Pattern"

**Reasoning:**
UserSession предоставляет простой интерфейс login(), который скрывает сложную внутреннюю работу нескольких подсистем. Клиенту не нужно взаимодействовать напрямую с AuthService, UserRepository и AuditLogger. Согласно Chapter 6, структурные паттерны управляют композицией объектов, и Facade упрощает интерфейс сложной системы


## SNIPPET_04

**Pattern Family:** Creational

**Specific Pattern:** Factory Method

**Evidence:**
function createNotifier(type) {
    switch(type) {
        case 'sms': return new SMSNotifier();
        case 'telegram': return new TelegramNotifier();
    }
}

**Book Reference:** Chapter 6"Creational Design Patterns", Chapter 7 "The Factory Pattern"

**Reasoning:**
Функция createNotifier создаёт разные объекты в зависимости от входного параметра. Клиент не создаёт объекты напрямую с помощью new. Согласно Chapter 6, Factory Method управляет созданием объектов и выбирает конкретный класс во время выполнения


## SNIPPET_05

**Pattern Family:** Structural

**Specific Pattern:** Decorator

**Evidence:**
class SeverityLogger {
    constructor(logger, level) {
        this._logger = logger;
    }
}

**Book Reference:** Chapter 6 "Structural Design Patterns", Chapter 7 "The Decorator Pattern"

**Reasoning:**
SeverityLogger добавляет новую функциональность, не изменяя оригинальный класс PlainTextLogger. Он оборачивает объект и расширяет его поведение. Согласно Chapter 6, Decorator является структурным паттерном, который динамически добавляет поведение объекту


## SNIPPET_06

**Pattern Family:** Creational

**Specific Pattern:** Prototype

**Evidence:**
const car = vehiclePrototype.clone();
const truck = vehiclePrototype.clone();

**Book Reference:** Chapter 6 "Creational Design Patterns", Chapter 7 "The Prototype Pattern"

**Reasoning:**
Объекты создаются путём клонирования существующего объекта vehiclePrototype. Это соответствует Prototype pattern, который создаёт новые объекты на основе существующего прототипа


## SNIPPET_07

**Pattern Family:** Behavioral

**Specific Pattern:** Chain of Responsibility

**Evidence:**
this.next.handle(ticket);

**Book Reference:** Chapter 6 "Behavioral Design Patterns", Chapter 7 "Chain of Responsibility"

**Reasoning:**
Запрос передаётся по цепочке объектов до тех пор, пока один из них не обработает его. Согласно Chapter 6, поведенческие паттерны управляют взаимодействием объектов


## SNIPPET_08

**Pattern Family:** Behavioral

**Specific Pattern:** Command

**Evidence:**
execute()
undo()
history.run(new WriteCommand())

**Book Reference:** Chapter 6 "Behavioral Design Patterns", Chapter 7 "Command Pattern"

**Reasoning:**
Каждое действие инкапсулируется в объект команды. Команды могут выполняться и отменяться. Это соответствует Command pattern


## SNIPPET_09

**Pattern Family:** Structural

**Specific Pattern:** Flyweight

**Evidence:**
TreeTypeFactory.get(...)

**Book Reference:** Chapter 6 "Structural Design Patterns", Chapter 7 "Flyweight Pattern"

**Reasoning:**
Объекты TreeType переиспользуются вместо создания новых. Это снижает использование памяти


## SNIPPET_10

**Pattern Family:** Behavioral

**Specific Pattern:** Mediator

**Evidence:**
class ChatRoom
room.send(...)

**Book Reference:** Chapter 6 "Behavioral Design Patterns", Chapter 7 "Mediator Pattern"

**Reasoning:**
ChatRoom управляет взаимодействием между пользователями. Пользователи не взаимодействуют напрямую