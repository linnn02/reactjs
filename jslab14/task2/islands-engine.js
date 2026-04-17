
const IslandRegistry = {
    counter: (container) => {
        console.log('[Island Engine] Initializing Counter Island', container);

        let count = 0;

        const display = container.querySelector('.count-display');
        const btnInc = container.querySelector('.btn-increase');
        const btnDec = container.querySelector('.btn-decrease');

        if (!display || !btnInc || !btnDec) {
            console.error('[Island Engine] Counter island elements not found');
            return;
        }

        btnInc.addEventListener('click', () => {
            count++;
            display.textContent = count;
        });

        btnDec.addEventListener('click', () => {
            if (count > 0) {
                count--;
            }
            display.textContent = count;
        });
    },

    'color-picker': (container) => {
        console.log('[Island Engine] Initializing Color Picker Island', container);

        const preview = container.querySelector('.preview-box');
        const buttons = container.querySelectorAll('button[data-color]');

        if (!preview || !buttons.length) {
            console.error('[Island Engine] Color picker island elements not found');
            return;
        }

        buttons.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                const hex = e.target.getAttribute('data-color');
                preview.style.backgroundColor = hex;
            });
        });
    },
};

document.addEventListener('DOMContentLoaded', () => {
    const islands = document.querySelectorAll('[data-island-type]');

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const type = entry.target.getAttribute('data-island-type');

                    if (IslandRegistry[type]) {
                        IslandRegistry[type](entry.target);
                        observer.unobserve(entry.target);
                    } else {
                        console.warn('[Island Engine] No island registered for type:', type);
                    }
                }
            });
        },
        {
            threshold: 0.1,
        }
    );

    islands.forEach((island) => observer.observe(island));
});