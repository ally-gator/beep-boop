// ==========================================================
// TOY BOX PAGE — toybox.js
// Type tester: SIZE, LEADING, HOLE (variable axis)
// ==========================================================

document.addEventListener('DOMContentLoaded', function () {

    const desktopText = document.getElementById('tb-text');
    const mobileText  = document.getElementById('tb-text-mob');

    // Auto-resize the typing area to fit its content
    const adjustHeight = () => {
        desktopText.style.height = 'auto';
        desktopText.style.height = desktopText.scrollHeight + 'px';
        mobileText.style.height  = 'auto';
        mobileText.style.height  = mobileText.scrollHeight + 'px';
    };

    desktopText.addEventListener('input', adjustHeight);
    mobileText.addEventListener('input', adjustHeight);
    adjustHeight();

    // Update font size
    window.updateSize = function (newVal) {
        var newFontSize   = newVal + 'px';
        var newPaddingTop = (newVal * 0.3) + 'px';
        desktopText.style.fontSize   = newFontSize;
        mobileText.style.fontSize    = newFontSize;
        desktopText.style.paddingTop = newPaddingTop;
        mobileText.style.paddingTop  = newPaddingTop;
        adjustHeight();
    };

    // Update line height (LEADING)
    window.updateLineHeight = function (newVal) {
        var newLineHeight = newVal + 'px';
        desktopText.style.lineHeight = newLineHeight;
        mobileText.style.lineHeight  = newLineHeight;
        adjustHeight();
    };

    // Update HOLE variable axis (0–100)
    window.updateHole = function (newVal) {
        var settings = `'HOLE' ${newVal}`;
        desktopText.style.fontVariationSettings = settings;
        mobileText.style.fontVariationSettings  = settings;
    };

    // Adjust slider ranges for mobile screens
    const updateSliderValuesForMobile = () => {
        if (window.innerWidth <= 576) {
            document.getElementById('size-slider').max    = '72';
            document.getElementById('size-slider').value  = '42';
            document.getElementById('leading-slider').max   = '150';
            document.getElementById('leading-slider').value = '75';
            updateSize(42);
        } else {
            document.getElementById('size-slider').max    = '240';
            document.getElementById('size-slider').value  = '120';
            document.getElementById('leading-slider').max   = '300';
            document.getElementById('leading-slider').value = '150';
            updateSize(120);
        }
    };

    updateSliderValuesForMobile();
    window.addEventListener('resize', updateSliderValuesForMobile);

});
