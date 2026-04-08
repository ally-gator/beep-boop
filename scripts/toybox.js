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
            document.getElementById('size-slider').value  = '72';
            document.getElementById('leading-slider').max   = '300';
            document.getElementById('leading-slider').value = '72';
            updateSize(72);
        }
    };

    updateSliderValuesForMobile();
    window.addEventListener('resize', updateSliderValuesForMobile);

    // ----------------------------------------------------------
    // SECTION 7 — Interactive Alphabet Glyph Viewer
    // ----------------------------------------------------------

    const tbGlyphImg   = document.getElementById('tb-glyph-img');
    const tbLetterItems = document.querySelectorAll('.tb-az-list li');

    tbLetterItems.forEach(function (item) {
        item.addEventListener('mouseenter', function () {
            var letter = item.dataset.letter;
            tbGlyphImg.src = '../assets/toybox-page/letter-svgs/tbglyphs-' + letter + '.svg';
            tbGlyphImg.alt = 'Glyph ' + letter;
            tbLetterItems.forEach(function (i) { i.classList.remove('active'); });
            item.classList.add('active');
        });
    });

});
