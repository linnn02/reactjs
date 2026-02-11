(function (ns) {
    function isBrowserStorageAvailable() {
        try {
            return typeof localStorage !== "undefined";
        } catch {
            return false;
        }
    }

    const storage = {
        get(key, fallback) {
            if (!isBrowserStorageAvailable()) return fallback;
            const raw = localStorage.getItem(key);
            return raw ? JSON.parse(raw) : fallback;
        },
        set(key, value) {
            if (!isBrowserStorageAvailable()) return false;
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        }
    };

    const validators = {
        email(email) {
            return !!email && email.includes("@") && email.includes(".");
        },
        price(price) {
            return price !== null && price !== undefined && Number(price) >= 0;
        },
        quantity(qty) {
            return qty !== null && qty !== undefined && Number(qty) >= 1;
        }
    };

    function formatMoney(amount, currency) {
        const cur = currency || "USD";
        return `${cur} ${Number(amount).toFixed(2)}`;
    }

    function nowIso() {
        return new Date().toISOString();
    }

    function orderId() {
        return `ORD-${Date.now()}`;
    }

    ns.Utils = { storage, validators, formatMoney, nowIso, orderId };
})(MyApp);
