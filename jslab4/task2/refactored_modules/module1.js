(function (ns) {
    // приватное состояние  ольше нет глобальных cart/products/user
    const state = {
        cart: [],
        products: [],
        user: null};

        function persist() {
            ns.Utils.storage.set("products", state.products);
            ns.Utils.storage.set("cart", state.cart);
            ns.Utils.storage.set("user", state.user);
        }

        function load() {
            state.products = ns.Utils.storage.get("products", []);
            state.cart = ns.Utils.storage.get("cart", []);
            state.user = ns.Utils.storage.get("user", null);
        }

        // ===== Products =====
        function addProduct(id, name, price, category) {
            if (!ns.Utils.validators.price(price)) throw new Error("Некорректная цена товара");

            const product = {
                id: Number(id),
                name: String(name),
                price: Number(price),
                category: String(category)
            };

            state.products.push(product);
            persist();
            return product;
        }

        function removeProduct(id) {
            const pid = Number(id);
            state.products = state.products.filter(p => p.id !== pid);
            // Также удалим из корзины, если был
            state.cart = state.cart.filter(i => i.id !== pid);
            persist();
            return true;
        }

        function listProducts() {
            return [...state.products];
        }

        // ===== Cart =====
        function addToCart(productId, quantity) {
            if (!ns.Utils.validators.quantity(quantity)) throw new Error("Некорректное количество");

            const pid = Number(productId);
            const product = state.products.find(p => p.id === pid);
            if (!product) throw new Error("Товар не найден");

            const existing = state.cart.find(i => i.id === pid);
            if (existing) {
                existing.quantity += Number(quantity);
            } else {
                state.cart.push({
                    id: pid,
                    name: product.name,
                    price: product.price,
                    quantity: Number(quantity)
                });
            }

            persist();
            return true;
        }

        function removeFromCart(productId) {
            const pid = Number(productId);
            state.cart = state.cart.filter(i => i.id !== pid);
            persist();
            return true;
        }

        function listCart() {
            return [...state.cart];
        }

        // ===== User =====
        function setUser(name, email, address) {
            if (!ns.Utils.validators.email(email)) throw new Error("Некорректный email");

            state.user = { name: String(name), email: String(email), address: String(address) };
            persist();
            return state.user;
        }

        function updateUser(fields) {
            if (!state.user) throw new Error("Пользователь не задан");

            const next = { ...state.user };

            if (fields.name) next.name = String(fields.name);
            if (fields.email) {
                if (!ns.Utils.validators.email(fields.email)) throw new Error("Некорректный email");
                next.email = String(fields.email);
            }
            if (fields.address) next.address = String(fields.address);

            state.user = next;
            persist();
            return state.user;
        }

        function getUser() {
            return state.user ? { ...state.user } : null;
        }

        // ===== Totals / Order =====
        function subtotal() {
            return state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        }

        function tax(amount) {
            return Number(amount) * ns.Config.get("taxRate");
        }

        function shipping(amount) {
            const threshold = ns.Config.get("freeShippingThreshold");
            if (Number(amount) > threshold) return 0;
            return ns.Config.get("shippingCost");
        }

        function totals() {
            const sub = subtotal();
            const t = tax(sub);
            const ship = shipping(sub);
            const disc = ns.Config.get("discount");
            const total = sub + t + ship - disc;

            return { subtotal: sub, tax: t, shipping: ship, discount: disc, total };
        }

        function processOrder() {
            if (!state.user) throw new Error("Пользователь не задан");
            if (state.cart.length === 0) throw new Error("Корзина пуста");

            const t = totals();
            const order = {
                id: ns.Utils.orderId(),
                user: { ...state.user },
                items: state.cart.map(i => ({ ...i })),
                ...t,
                date: ns.Utils.nowIso()
            };

            // сохраняем заказы
            const orders = ns.Utils.storage.get("orders", []);
            orders.push(order);
            ns.Utils.storage.set("orders", orders);

            // очищаем корзину
            state.cart = [];
            persist();

            return order;
        }

        function initializeApp() {
            load();
            return true;
        }

        // Публичный API (минимально необходимое)
        ns.Modules.Core = {
            initializeApp,

            addProduct,
            removeProduct,
            listProducts,

            addToCart,
            removeFromCart,
            listCart,

            setUser,
            updateUser,
            getUser,

            totals,
            processOrder};
        })(MyApp);
        