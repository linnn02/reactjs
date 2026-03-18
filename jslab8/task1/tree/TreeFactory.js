import { FlyweightTree } from "./FlyweightTree.js";

class TreeFactory {
    constructor() {
        this.trees = new Map();
        this.requestCount = 0;
    }

    getTree(type, species, foliageColor, trunkColor, height, width) {
        const key = `${type}|${species}|${foliageColor}|${trunkColor}|${height}|${width}`;
        this.requestCount++;

        if (!this.trees.has(key)) {
            const flyweight = new FlyweightTree(
                type,
                species,
                foliageColor,
                trunkColor,
                height,
                width);
                this.trees.set(key, flyweight);
                console.log(`[Factory] Создан новый flyweight: ${key}`);
            } else {
                console.log(`[Factory] Повторное использование flyweight: ${key}`);
            }

            return this.trees.get(key);
        }

        getStats() {
            const uniqueFlyweights = this.trees.size;
            const totalTrees = this.requestCount;
            const reused = totalTrees - uniqueFlyweights;

            return {
                totalTrees,
                uniqueFlyweights,
                reusedFlyweights: reused,
                memorySavedApproxPercent:
                totalTrees > 0 ? Math.round((reused / totalTrees) * 100) : 0,
            };
        }

        resetStats() {
            this.trees.clear();
            this.requestCount = 0;
        }
    }

    const treeFactory = new TreeFactory();
    export default treeFactory;