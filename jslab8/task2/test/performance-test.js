export function testIndividualListeners(containerId, itemCount) {
    const container = document.getElementById(containerId);
    const startTime = performance.now();

    for (let i = 1; i <= itemCount; i++) {
        const item = container.querySelector(`[data-id="todo-${i}"]`);

        if (item) {
            const checkbox = item.querySelector('input[type="checkbox"]');
            if (checkbox) {
                checkbox.addEventListener("change", () => {
                    item.classList.toggle("completed", checkbox.checked);
                });
            }
        }
    }

    const endTime = performance.now();
    return endTime - startTime;
}

export function testEventDelegation(containerId) {
    const container = document.getElementById(containerId);
    const startTime = performance.now();

    const handler = (e) => {
        if (e.target.matches('input[type="checkbox"]')) {
            const item = e.target.closest(".todo-item");
            if (item) {
                item.classList.toggle("completed", e.target.checked);
            }
        }
    };

    container.addEventListener("change", handler);
    const endTime = performance.now();
    container.removeEventListener("change", handler);

    return endTime - startTime;
}