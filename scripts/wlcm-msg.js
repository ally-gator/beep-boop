document.addEventListener('DOMContentLoaded', () => {
    const el = document.querySelector('.wlcm-msg');
    let isDragging = false;
    let activated = false; // has the user interacted yet?
    let offsetX = 0;
    let offsetY = 0;

    function activateDrag(e) {
        // On first interaction, snapshot current position as explicit left/top
        // so we can freely move the element without the CSS anchor fighting us
        if (!activated) {
            const rect = el.getBoundingClientRect();
            el.style.right = 'auto';
            el.style.bottom = 'auto';
            el.style.left = rect.left + 'px';
            el.style.top = rect.top + 'px';
            activated = true;
        }

        isDragging = true;
        el.classList.add('is-dragging');

        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        const rect = el.getBoundingClientRect();
        offsetX = clientX - rect.left;
        offsetY = clientY - rect.top;
    }

    function onMove(e) {
        if (!isDragging) return;
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        el.style.left = (clientX - offsetX) + 'px';
        el.style.top = (clientY - offsetY) + 'px';
    }

    function onEnd() {
        isDragging = false;
        el.classList.remove('is-dragging');
    }

    el.addEventListener('mousedown', activateDrag);
    el.addEventListener('touchstart', activateDrag, { passive: true });

    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove, { passive: true });

    window.addEventListener('mouseup', onEnd);
    window.addEventListener('touchend', onEnd);
});
