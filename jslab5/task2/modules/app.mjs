import { calculate } from './core.mjs';

calculate();

document.getElementById("btn").addEventListener("click", async () => {
    const module = await import('./advanced_feature.mjs');
    module.showFeature();
});
