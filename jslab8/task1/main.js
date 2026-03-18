import { ForestRenderer } from "./forest/ForestRenderer.js";
import { runBenchmark } from "./test/benchmark.js";

const forest = new ForestRenderer("forestCanvas");

const generateBtn = document.getElementById("generateBtn");
const benchmarkBtn = document.getElementById("benchmarkBtn");
const info = document.getElementById("info");
const benchmarkInfo = document.getElementById("benchmarkInfo");

function renderForest() {
    forest.generateForest(10000);
    const stats = forest.render();

    info.innerHTML = `
    <strong>Статистика леса:</strong><br>
    Всего деревьев: ${stats.totalTrees}<br>
    Уникальных flyweight-объектов: ${stats.uniqueFlyweights}<br>
    Повторно использовано: ${stats.reusedFlyweights}<br>
    Примерная экономия памяти: ${stats.memorySavedApproxPercent}%
    `;
}

generateBtn.addEventListener("click", renderForest);

benchmarkBtn.addEventListener("click", () => {
    const result = runBenchmark(10000);

    benchmarkInfo.innerHTML = `
    <strong>Результаты benchmark:</strong><br>
    Количество деревьев: ${result.count}<br>
    Без Flyweight: ${result.nonFlyweightTimeMs} ms<br>
    С Flyweight: ${result.flyweightTimeMs} ms<br>
    Обычных объектов: ${result.normalObjects}<br>
    Контекстных объектов с Flyweight: ${result.flyweightObjects}<br>
    Уникальных Flyweight: ${result.uniqueFlyweights}<br>
    Повторных использований: ${result.reusedFlyweights}<br>
    Примерная экономия памяти: ${result.memorySavedApproxPercent}%
    `;

    console.table(result);
});
renderForest();