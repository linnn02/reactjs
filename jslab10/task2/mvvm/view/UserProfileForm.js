export class UserProfileForm {
    constructor(containerId, viewModel) {
        this.container = document.getElementById(containerId);
        this.viewModel = viewModel;
        this._subscribed = false;
    }

    render() {
        const vm = this.viewModel;

        this.container.innerHTML = `
        <div class="mvvm-form">
        <h1>User Profile (MVVM)</h1>

        <div class="form-group">
        <label>Имя:</label>
        <input type="text" data-field="firstName" value="${this.escapeHtml(vm.firstName)}" />
        <span class="error">${vm.errors?.firstName || ""}</span>
        </div>

        <div class="form-group">
        <label>Фамилия:</label>
        <input type="text" data-field="lastName" value="${this.escapeHtml(vm.lastName)}" />
        <span class="error">${vm.errors?.lastName || ""}</span>
        </div>

        <div class="form-group">
        <label>Email:</label>
        <input type="email" data-field="email" value="${this.escapeHtml(vm.email)}" />
        <span class="error">${vm.errors?.email || ""}</span>
        </div>

        <div class="form-group">
        <label>Возраст:</label>
        <input type="number" data-field="age" value="${this.escapeHtml(vm.age)}" />
        <span class="error">${vm.errors?.age || ""}</span>
        </div>

        <div class="preview">
        <h3>Предпросмотр</h3>
        <p><strong>Полное имя:</strong> ${this.escapeHtml(vm.fullName)}</p>
        <p><strong>Форма валидна:</strong> ${vm.isValid ? "Да" : "Нет"}</p>
        </div>

        <div class="actions">
        <button id="saveBtn" ${!vm.isValid ? "disabled" : ""}>Сохранить</button>
        <button id="resetBtn">Сбросить</button>
        </div>

        <div id="message"></div>
        </div>
        `;

        this.attachEventListeners();

        if (!this._subscribed) {
            this.subscribeToChanges();
            this._subscribed = true;
        }
    }

    attachEventListeners() {
        this.container.oninput = (e) => {
            if (e.target.dataset.field) {
                const field = e.target.dataset.field;
                this.viewModel[field] = e.target.value;
            }
        };

        const saveBtn = this.container.querySelector("#saveBtn");
        const resetBtn = this.container.querySelector("#resetBtn");
        const message = this.container.querySelector("#message");

        saveBtn?.addEventListener("click", () => {
            const result = this.viewModel.save();

            if (result.success) {
                message.textContent = "Профиль успешно сохранён";
                message.className = "success";
            } else {
                message.textContent = "Исправьте ошибки в форме";
                message.className = "error-box";
            }
        });

        resetBtn?.addEventListener("click", () => {
            this.viewModel.reset();
            message.textContent = "";
            message.className = "";
        });
    }

    subscribeToChanges() {
        ["firstName", "lastName", "email", "age", "errors"].forEach((field) => {
            this.viewModel.$watch(field, () => this.render());
        });
    }

    escapeHtml(value) {
        return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
    }
}