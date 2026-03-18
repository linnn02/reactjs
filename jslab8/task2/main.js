import { TodoList } from "./todo/TodoList.js";
import { testIndividualListeners, testEventDelegation } from "./test/performance-test.js";

const todoList = new TodoList("todo-list");

const generateBtn = document.getElementById("generateBtn");
const addBtn = document.getElementById("addBtn");
const input = document.getElementById("todoInput");
const performanceBtn = document.getElementById("performanceBtn");
const info = document.getElementById("info");

generateBtn.addEventListener("click", () => {
    document.getElementById("todo-list").innerHTML = "";
    todoList.items.clear();
    todoList.idCounter = 0;
    todoList.generateItems(1000);

    info.innerHTML = `
    <strong>Список создан:</strong><br>
    Добавлено 1000 задач.<br>
    Все элементы обслуживаются через event delegation.
    `;
});

addBtn.addEventListener("click", () => {
    const text = input.ariaValueMax.trim();
    if (!text) return;

    todoList.addItem(text, "normal");
    input.value = "";
});

performanceBtn.addEventListener("click", () => {
    const individual = testIndividualListeners("todo-list", 1000);
    const delegated = testEventDelegation("todo-list");

    info.innerHTML = `
    <strong>Сравнение производительности:</strong><br>
    Индивидуальные listeners: ${individual.toFixed(2)} ms<br>
    Event delegation: ${delegated.toFixed(2)} ms
    `;

    console.log("Individual listeners:", individual.toFixed(2), "ms");
    console.log("Event delegation:", delegated.toFixed(2), "ms");
});

generateBtn.click();