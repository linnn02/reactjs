## Что было сделано
1) Проанализирован файл 
2) Найдено 7 антипаттернов (минимум требовалось 5):
- Global namespace pollution
- Modifying Object.prototype
- Code duplication
- Tight coupling
- Strings in setTimeout/setInterval
- document.write
- Lack of structure

## Главные проблемы legacy-кода
- Глобальное состояние + сильная связанность функций = сложно сопровождать и развивать.
- Модификация Object.prototype = высокийС риск скрытых багов.
- Дублирование логики = техдолг