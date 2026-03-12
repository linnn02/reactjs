import eventBus from "../pubsub/EventBus.js";

export class PushNotifier {
    constructor(deviceName, outputCallback = null) {
        this.deviceName = deviceName;
        this.subscriptions = [];
        this.pushCount = 0;
        this.outputCallback = outputCallback;
    }

    subscribe(categories) {
        categories.forEach((category) => {
            const unsubscribe = eventBus.subscribe(`news:${category}`, (article) => {
                this.sendPush(article);
            });

            this.subscriptions.push(unsubscribe);
        });

        this.log(`[Push] ${this.deviceName} subscribed to: ${categories.join(", ")}`);
    }

    sendPush(article) {
        this.pushCount++;
        this.log(`[Push -> ${this.deviceName}] ${article.headline}`);
    }

    unsubscribe() {
        this.subscriptions.forEach((unsub) => unsub());
        this.subscriptions = [];
        this.log(`[Push] ${this.deviceName} unsubscribed all`);
    }

    getStats() {
        return {
            sent: this.pushCount,
            subscriptions: this.subscriptions.length,
        };
    }

    log(message) {
        console.log(message);
        if (this.outputCallback) {
            this.outputCallback(message);
        }
    }
}