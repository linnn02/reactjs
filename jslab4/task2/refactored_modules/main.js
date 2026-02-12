// Главный файл: использует namespace + модули

requestAnimationFrame("./namespace.js");
requestAnimationFrame("./module3.js");
requestAnimationFrame("./module2.js");
requestAnimationFrame("./module1.js");

(function () {
    const Core = MyApp.Modules.Core;

    Core.initializeApp();

    // Демонстрация (можно оставить как пример)
    Core.addProduct(1, "Laptop", 999.99, "Electronics");
    Core.addProduct(2, "Mouse", 29.99, "Electronics");
    Core.addProduct(3, "Keyboard", 79.99, "Electronics");

    Core.setUser("John Doe", "john@example.com", "123 Main St");

    Core.addToCart(1, 1);
    Core.addToCart(2, 2);
    Core.addToCart(3, 1);

    // конфиг
    MyApp.Config.setDiscount(50);
    MyApp.Config.set("currency", "USD");

    const t = Core.totals();
    console.log("Totals:", {
        subtotal: MyApp.Utils.formatMoney(t.subtotal, MyApp.Config.get("currency")),
        tax: MyApp.Utils.formatMoney(t.tax, MyApp.Config.get("currency")),
        shipping: MyApp.Utils.formatMoney(t.shipping, MyApp.Config.get("currency")),
        discount: MyApp.Utils.formatMoney(t.discount, MyApp.Config.get("currency")),
        total: MyApp.Utils.formatMoney(t.total, MyApp.Config.get("currency"))
    });

    const order = Core.processOrder();
    console.log("Order processed:", order.id);
})();
