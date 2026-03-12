
// тестируем поведение:
// 1) getInstance() возвращает один и тот же объект
// 2) new ConfigManager() не создаёт второй объект
// 3) данные сохраняются и видны через все ссылки

import ConfigManager from "./singleton.js";

const instance1 = ConfigManager.getInstance();
const instance2 = ConfigManager.getInstance();

console.log("Same instance (getInstance):", instance1 === instance2);

const instance3 = new ConfigManager();
console.log("Same instance (new):", instance1 === instance3); 

instance1.set("appName", "MyApp");
console.log("From instance2:", instance2.get("appName")); 
console.log("From instance3:", instance3.get("appName")); 

console.log("All config:", instance2.getAll());