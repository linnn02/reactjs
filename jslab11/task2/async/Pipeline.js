class AsyncQueue {
    constructor(concurrency = 1) {
        this.concurrency = concurrency;
        this.running = 0;
        this.queue = [];
    }

    async add(task) {
        return new Promise((resolve, reject) => {
            this.queue.push({ task, resolve, reject });
            this.process();
        });
    }

    async process() {
        while (this.running < this.concurrency && this.queue.length > 0) {
            const { task, resolve, reject } = this.queue.shift();
            this.running += 1;

            Promise.resolve()
            .then(() => task())
            .then(resolve)
            .catch(reject)
            .finally(() => {
                this.running -= 1;
                this.process();
            });
        }
    }
}

export class AsyncPipeline {
    constructor() {
        this.stages = [];
    }

    use(middleware) {
        this.stages.push(middleware);
        return this;
    }

    async execute(initialData, context = {}) {
        let data = initialData;
        let currentContext = context;

        for (const stage of this.stages) {
            const result = await stage(data, currentContext);

            if (result === null || result === undefined) {
                throw new Error(
                    `Stage ${stage.name || 'anonymous'} returned null/undefined`
                );
            }

            if (Array.isArray(result)) {
                data = result[0];
                currentContext = {
                    ...currentContext,
                    ...(result[1] || {}),
                };
            } else {
                data = result;
            }
        }

        return data;
    }
}

export function pipe(...functions) {
    return async (initial) => {
        return functions.reduce(async (ActiveXObject, fn) => {
            const resolved = await ActiveXObject;
            return fn(resolved);
        }, Promise.resolve(initial));
    };
}

export async function mapParallel(items, handler, concurrency = 5) {
    const queue = new AsyncQueue(concurrency);
    const promises = items.map((item) => queue.add(() => handler(item)));
    return Promise.all(promises);
}

export async function mapSequential(items, handler) {
    const results = [];

    for (const item of items) {
        results.push(await handler(item));
    }

    return results;
}

export async function filterParallel(items, predicate, concurrency = 5) {
    const results = await mapParallel(
        items,
        async (item) => {
            const matches = await predicate(item);
            return { item, matches };
        },
        concurrency);

        return results.filter((result) => result.matches).map((result) => result.item);
    }

    export async function reduceAsync(items, reducer, initialValue) {
        let accumulator = initialValue;

        for (const item of items) {
            accumulator = await reducer(accumulator, item);
        }

        return accumulator;
    }

    export class AsyncBatcher {
        constructor(handler, options = {}) {
            this.handler = handler;
            this.batchSize = options.batchSize || 10;
            this.maxWaitMs = options.maxWaitMs || 100;
            this.queue = [];
            this.timeoutId = null;
        }

        async add(item) {
            return new Promise((resolve, reject) => {
                this.queue.push({ item, resolve, reject });

                if (this.queue.length >= this.batchSize) {
                    this.flush();
                } else if (!this.timeoutId) {
                    this.timeoutId = setTimeout(() => this.flush(), this.maxWaitMs);
                }
            });
        }

        async flush() {
            if (this.timeoutId) {
                clearTimeout(this.timeoutId);
                this.timeoutId = null;
            }

            if (this.queue.length === 0) {
                return;
            }

            const batch = [...this.queue];
            this.queue = [];

            try {
                const results = await this.handler(batch.map((entry) => entry.item));
                batch.forEach((entry, index) => entry.resolve(results[index]));
            } catch (error) {
                batch.forEach((entry) => entry.reject(error));
            }
        }
    }