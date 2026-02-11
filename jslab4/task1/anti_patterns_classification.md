## 1) Global Namespace Pollution
**Unfavorable situation (Bad Solution):**
Глобальные переменные и объекты делают код хрупким: конфликт имён, неконтролируемые изменения состояния, сложная отладка. 

**How to Fix (Good Solution):**
- Применить **Module Pattern (Ch.7)**: закрыть состояние внутри модуля (IIFE), наружу отдать только публичный API.
- Применить **Namespace Pattern (Ch.11)**: все модули расположить под одним глобальным объектом (например MyApp), а не десятки отдельных глобальных переменных.


## 2) Modifying Object.prototype
**Bad Solution:**
Расширение Object.prototype создаёт неявные эффекты для всех объектов и может ломать сторонний код. 

**How to Fix:**
- Не трогать прототипы глобальных объектов.
- Вынести общие функции в **Utils-модуль** (Module Pattern), например MyApp.Utils.formatMoney(...).


## 3) Code Duplication (валидация email)
**Bad Solution:**
Три одинаковые функции проверки email увеличивают техдолг и риск расхождения логики. 

**How to Fix:**
- Оставить одну функцию isValidEmail(email) в Utils.
- Остальные места кода должны использовать только её (DRY).


## 4) Tight Coupling
**Bad Solution:**
Функции завязаны на глобальное состояние и побочные эффекты (например, изменение userName сразу влияет на cache и UI). 

**How to Fix:**
- Хранить состояние в приватном объекте внутри Core модуля.
- Взаимодействовать через методы API (Core.login(), Core.setUserName()), а не напрямую через глобальные переменные.


## 5) Strings in setTimeout/setInterval
**Bad Solution:**
Строки в таймерах фактически ведут себя как eval, ухудшают безопасность и отладку. 

**How to Fix:**
- Передавать функцию: setTimeout(updateTimer, 1000) (или () => updateTimer()).
- Таймеры держать внутри Core и управлять ими через методы.


## 6) document.write
**Bad Solution:**
document.write может сломать страницу и считается устаревшей практикой. 

**How to Fix:**
- Использовать безопасный вывод: textContent, innerHTML (аккуратно), создание DOM-элементов.
- Вынести UI-вывод в отдельный метод Core.render(...).

## 7) Lack of structure (спагетти-код)
**Bad Solution:**
Конфиги, утилиты, бизнес-логика и UI смешаны без модулей. 

**How to Fix:**
- Разбить на 3+ модулей (Core / Utils / Config).
- Организовать через Namespace Pattern:
  - MyApp.Config
  - MyApp.Utils
  - MyApp.Modules.Core