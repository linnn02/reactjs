import eventBus from "../pubsub/EventBus.js";

export class DashboardWidget {
    constructor(widgetName, outputCallback = null, renderCallback = null) {
        this.widgetName = widgetName;
        this.subscriptions = [];
        this.receivedArticles = [];
        this.outputCallback = outputCallback;
        this.renderCallback = renderCallback;
    }

    subscribe(categories) {
        categories.forEach((category) => {
            const unsubscribe = eventBus.subscribe(`news:${category}`, (article) => {
                this.update(article);
            });

            this.subscriptions.push(unsubscribe);
        });

        this.log(`[Dashboard] ${this.widgetName} subscribed to: ${categories.join(", ")}`);
    }

    update(article) {
        this.receivedArticles.unshift(article);
        if (this.receivedArticles.length > 10) {
            this.receivedArticles.pop();
        }

        this.log(`[Dashboard ${this.widgetName}] ${article.headline} (${article.category})`);

        if (this.renderCallback) {
            this.renderCallback(this.receivedArticles);
        }
    }

    unsubscribe() {
        this.subscriptions.forEach((unsub) => unsub());
        this.subscriptions = [];
        this.log(`[Dashboard] ${this.widgetName} unsubscribed all`);
    }

    getStats() {
        return {
            received: this.receivedArticles.length,
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