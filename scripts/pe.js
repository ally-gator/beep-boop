document.addEventListener('DOMContentLoaded', function () {

    // =========================================================
    // TYPE TESTER
    // =========================================================

    const desktopText = document.getElementById('pe-text');
    const mobileText  = document.getElementById('pe-text-mob');

    window.updateSize = function (newVal) {
        const fontSize   = newVal + 'px';
        const paddingTop = (newVal * 0.3) + 'px';
        desktopText.style.fontSize   = fontSize;
        mobileText.style.fontSize    = fontSize;
        desktopText.style.paddingTop = paddingTop;
        mobileText.style.paddingTop  = paddingTop;
    };

    window.updateLineHeight = function (newVal) {
        const lh = newVal + 'px';
        desktopText.style.lineHeight = lh;
        mobileText.style.lineHeight  = lh;
    };

    window.updateDotSharpness = function (newVal) {
        const barVal = document.getElementById('bar-slider').value;
        const fvs = `'DOTW' ${newVal}, 'BARW' ${barVal}`;
        desktopText.style.fontVariationSettings = fvs;
        mobileText.style.fontVariationSettings  = fvs;
    };

    window.updateBarSharpness = function (newVal) {
        const dotVal = document.getElementById('dot-slider').value;
        const fvs = `'BARW' ${newVal}, 'DOTW' ${dotVal}`;
        desktopText.style.fontVariationSettings = fvs;
        mobileText.style.fontVariationSettings  = fvs;
    };

    const updateSliderValuesForMobile = () => {
        const sizeSlider    = document.getElementById('size-slider');
        const leadingSlider = document.getElementById('leading-slider');
        const dotSlider     = document.getElementById('dot-slider');
        const barSlider     = document.getElementById('bar-slider');

        if (window.innerWidth <= 576) {
            sizeSlider.min      = '0';
            sizeSlider.max      = '100';
            sizeSlider.value    = '40';
            leadingSlider.min   = '0';
            leadingSlider.max   = '150';
            leadingSlider.value = '55';
            dotSlider.value     = '0';
            barSlider.value     = '0';
        } else {
            sizeSlider.min      = '0';
            sizeSlider.max      = '200';
            sizeSlider.value    = '60';
            leadingSlider.min   = '0';
            leadingSlider.max   = '240';
            leadingSlider.value = '80';
            dotSlider.value     = '0';
            barSlider.value     = '0';
        }
        updateSize(sizeSlider.value);
        updateLineHeight(leadingSlider.value);
    };

    updateSliderValuesForMobile();
    window.addEventListener('resize', updateSliderValuesForMobile);

    // =========================================================
    // FRAME ANIMATION — 61-frame webp sequence, continuous loop
    // =========================================================

    const frameCount = 61;

    // Preload all frames so swaps are instant
    const frames = Array.from({ length: frameCount }, (_, i) => {
        const img = new Image();
        img.src = `../assets/pe-page/webp-spec-02/H_3D_V2.${String(i).padStart(5, '0')}.webp`;
        return img;
    });

    const animImg = document.getElementById('pe-anim-img');

    let frameIdx  = 0;
    let lastTime  = 0;
    const frameInterval = 1000 / 12; // 12fps

    function tick(timestamp) {
        if (timestamp - lastTime >= frameInterval) {
            if (frames[frameIdx]?.complete) {
                animImg.src = frames[frameIdx].src;
            }
            frameIdx = (frameIdx + 1) % frameCount;
            lastTime = timestamp;
        }
        requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);

});
