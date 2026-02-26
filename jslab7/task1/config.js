
const config = {};

export default {
    // Получить значение по ключу
    get(key) {
        return config[key];
    },

    // Установить значение
    set(key, value) {
        config[key] = value;
    },

    // Получить все настройки (копия)
    getAll() {
        return { ...config };
    },
};