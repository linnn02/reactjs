import treeFactory from "../tree/TreeFactory.js";

class NonFlyweightTree {
    constructor(type, species, foliageColor, trunkColor, height, width, x, y, scale, rotation) {
        this.type = type;
        this.species = species;
        this.foliageColor = foliageColor;
        this.trunkColor = trunkColor;
        this.height = height;
        this.width = width;
        this.x = x;
        this.y = y;
        this.scale = scale;
        this.rotation = rotation;
    }
}

export function runBenchmark(count = 10000) {
    const types = ["pine", "oak", "birch", "maple"];
    const speciesMap = {
        pine: { species: "Pine", foliage: "#228B22", trunk: "#8B4513", h: 80, w: 30 },
        oak: { species: "Oak", foliage: "#006400", trunk: "#654321", h: 60, w: 40 },
        birch: { species: "Birch", foliage: "#90EE90", trunk: "#F5F5DC", h: 70, w: 20 },
        maple: { species: "Maple", foliage: "#FF8C00", trunk: "#A0522D", h: 65, w: 35 },
    };

    const nonFlyweightStart = performance.now();
    const normalTrees = [];

    for (let i = 0; i < count; i++) {
        const type = types[Math.floor(Math.random() * types.length)];
        const c = speciesMap[type];

        normalTrees.push(
            new NonFlyweightTree(
                type,
                c.species,
                c.foliage,
                c.trunk,
                c.h,
                c.w,
                Math.random() * 1200,
                Math.random() * 700,
                0.4 + Math.random() * 1.1,
                (Math.random() - 0.5) * 0.2
            )
        );
    }

    const nonFlyweightTime = performance.now() - nonFlyweightStart;

    treeFactory.resetStats();

    const flyweightStart = performance.now();
    const flyweightTrees = [];

    for (let i = 0; i < count; i++) {
        const type = types[Math.floor(Math.random() * types.length)];
        const c = speciesMap[type];

        const flyweight = treeFactory.getTree(
            type,
            c.species,
            c.foliage,
            c.trunk,
            c.h,
            c.w);

            flyweightTrees.push({
                flyweight,
                x: Math.random() * 1200,
                y: Math.random() * 700,
                scale: 0.4 + Math.random() * 1.1,
                rotation: (Math.random() - 0.5) * 0.2,
            });
        }

        const flyweightTime = performance.now() - flyweightStart;
        const stats = treeFactory.getStats();

        return {
            count,
            nonFlyweightTimeMs: nonFlyweightTime.toFixed(2),
            flyweightTimeMs: flyweightTime.toFixed(2),
            normalObjects: normalTrees.length,
            flyweightObjects: flyweightTrees.length,
            uniqueFlyweights: stats.uniqueFlyweights,
            reusedFlyweights: stats.reusedFlyweights,
            memorySavedApproxPercent: stats.memorySavedApproxPercent,
        };
    }