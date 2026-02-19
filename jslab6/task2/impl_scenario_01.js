// SCENARIO_01: Singleton
class AppConfig {
    constructor() {
        // Guard: prevent creating more than one instance
        if (AppConfig._instance) {
            return AppConfig._instance;
        }

        // Store configuration values
        this.settings = {
            apiBaseUrl: 'https://api.example.com/v1',
            locale: 'kk-KZ',
            featureFlags: { darkMode: true, betaCheckout: false }
        };

        AppConfig._instance = this;
    }

    // Part of Singleton usage: a shared object provides read access
    get(key) {
        return this.settings[key];
    }

    // Part of Singleton usage: a shared object provides update access
    set(key, value) {
        this.settings[key] = value;
    }

    // Global access point to the single instance
    static getInstance() {
        if (!AppConfig._instance) {
            new AppConfig();
        }
        return AppConfig._instance;
    }
}

// Demo
const cfg1 = AppConfig.getInstance();
const cfg2 = AppConfig.getInstance();

console.log('[SCENARIO_01] same instance?', cfg1 === cfg2);
console.log('[SCENARIO_01] apiBaseUrl before:', cfg1.get('apiBaseUrl'));
cfg2.set('apiBaseUrl', 'https://api.newdomain.kz/v2');
console.log('[SCENARIO_01] apiBaseUrl after:', cfg1.get('apiBaseUrl'));