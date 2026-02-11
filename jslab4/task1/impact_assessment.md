## Шкала severity
- Critical: ломает приложение/безопасность/массовые конфликты
- High: сильно мешает поддержке и развитию
- Medium: заметные проблемы, но не критично
- Low: косметика/локальные риски

## 1 Global Namespace Pollution — Severity: HIGH
- Maintainability: сильно хуже (не видно источников изменений)
- Scalability: плохо (рост проекта = рост конфликтов)
- Performance: обычно нейтрально
- Team: сложно параллельно работать (все трогают глобальный стейт)



## 2 Modifying Object.prototype — Severity: CRITICAL
- Maintainability: критически хуже (неявные эффекты)
- Scalability: очень рискованно (больше кода = больше поломок)
- Performance: может страдать (for..in, проверки)
- Team: высокий риск “тихих” багов


## 3 Code Duplication — Severity: MEDIUM
- Maintainability: хуже (фиксить в 3 местах)
- Scalability: хуже (дубли растут)
- Performance: обычно незначительно
- Team: путаница в “какую функцию использовать”



## 4 Tight Coupling — Severity: HIGH
- Maintainability: плохо (одно изменение ломает другое)
- Scalability: плохо (сложно расширять)
- Performance: может быть хуже из-за лишних зависимостей/пересчётов
- Team: сложно делить ответственность по модулям



## 5 Strings in setTimeout/setInterval — Severity: HIGH
- Maintainability: хуже (отладка/логика)
- Scalability: хуже (сложнее контролировать выполнение)
- Performance: хуже (парсинг строк)
- Team: сложнее понимать и сопровождать



## 6 document.write — Severity: MEDIUM
- Maintainability: хуже (устаревший подход)
- Scalability: плохо (ломает структуру UI)
- Performance: может ухудшать рендер
- Team: неудобно интегрировать с нормальным DOM



## 7 Lack of structure — Severity: HIGH
- Maintainability: низкая
- Scalability: низкая
- Performance: косвенно (из-за хаоса и лишних операций)
- Team: трудно распределять зоны ответственности



## Приоритет исправления (от самого важного)
1) Modifying Object.prototype (CRITICAL)
2) Global namespace pollution (HIGH)
3) Tight coupling (HIGH)
4) Strings in setTimeout (HIGH)
5) Lack of structure (HIGH)
6) Code duplication (MEDIUM)
7) document.write (MEDIUM)
