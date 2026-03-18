export class EventDelegator {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        this.handlers = new Map();

        this.handleClick = this.handleClick.bind(this);
        this.handleDoubleClick = this.handleDoubleClick.bind(this);

        this.container.addEventListener("click", this.handleClick);
        this.container.addEventListener("dblclick", this.handleDoubleClick);
        this.container.addEventListener("change", this.handleClick);
    }

    handleClick(event) {
        const target = event.target;
        const action = target.dataset.action;

        if (!action) return;

        const item = target.closest("[data-id]");
        const itemId = item ? item.dataset.id : null;

        switch (action) {
            case "toggle":
                this.emit("toggle", {
                    id: itemId,
                    completed: target.checked,
                });
                break;

            case "delete":
                this.emit("delete", { id: itemId });
                break;

                case "edit":
                    this.emit("edit", { id: itemId });
                    break;

            case "priority":
                this.emit("priority", {
                    id: itemId,
                    priority: target.dataset.priority,
                });
                break;

                default:
                    break;
            }
        }

        handleDoubleClick(event) {
            const item = event.target.closest("[data-id]");
            if (item) {
                this.emit("edit-start", { id: item.dataset.id });
            }
        }

        on(eventName, handler) {
            if (!this.handlers.has(eventName)) {
                this.handlers.set(eventName, []);
            }

            this.handlers.get(eventName).push(handler);
        }

        emit(eventName, data) {
            const handlers = this.handlers.get(eventName);
            if (!handlers) return;

            handlers.forEach((handler) => handler(data));
        }
    }