// Module Pattern (Ch. 7): конфигурация в приватном замыкании, наружу — только API
(function (ns) {
    const state = {
        discount: 0,
        shippingCost: 5,
        taxRate: 0.08,
        currency: "USD",
        language: "en",
        theme: "light",
        freeShippingThreshold: 50
    };

    ns.Config = {
        getAll() {
            return { ...state };
        },

        get(key) {
            return state[key];
        },

        set(key, value) {
            if (!(key in state)) throw new Error(`Неизвестный ключ конфигурации: ${key}`);
            state[key] = value;
            return state[key];
        },

        setDiscount(value) {
            state.discount = Number(value) || 0;
            return state.discount;
        }
    };
})(MyApp);