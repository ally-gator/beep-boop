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
    // SCROLL ANIMATION — 101-frame webp sequence
    // =========================================================

    const frameCount = 101;

    // Preload all frames so swaps are instant
    const frames = Array.from({ length: frameCount }, (_, i) => {
        const img = new Image();
        img.src = `../assets/pe-page/webp-spec/H_3D_Render.${String(i).padStart(5, '0')}.webp`;
        return img;
    });

    const animImg     = document.getElementById('pe-anim-img');
    const animSection = document.getElementById('pe-about');

    window.addEventListener('scroll', () => {
        const rect = animSection.getBoundingClientRect();
        // Start animation when section is halfway up from the bottom of the viewport
        const triggerOffset = window.innerHeight * 0.5;
        const scrollable    = animSection.offsetHeight - window.innerHeight + triggerOffset;
        if (scrollable <= 0) return;

        const progress = Math.max(0, Math.min(1, (triggerOffset - rect.top) / scrollable));
        const idx      = Math.min(frameCount - 1, Math.floor(progress * frameCount));

        if (frames[idx] && frames[idx].complete) {
            animImg.src = frames[idx].src;
        }
    }, { passive: true });

});
