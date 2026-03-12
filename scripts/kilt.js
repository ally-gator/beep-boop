// ==========================================================
// KILT PAGE — kilt.js
// ==========================================================


// ----------------------------------------------------------
// SECTION 3: Type Tester
// ----------------------------------------------------------

document.addEventListener('DOMContentLoaded', function () {

    const desktopText = document.getElementById('kilt-text');
    const mobileText  = document.getElementById('kilt-text-mob');

    // Auto-resize the typing area to fit its content
    const adjustHeight = () => {
        desktopText.style.height = 'auto';
        desktopText.style.height = desktopText.scrollHeight + 'px';
        mobileText.style.height = 'auto';
        mobileText.style.height = mobileText.scrollHeight + 'px';
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

    // Update line height
    window.updateLineHeight = function (newVal) {
        var newLineHeight = newVal + 'px';
        desktopText.style.lineHeight = newLineHeight;
        mobileText.style.lineHeight  = newLineHeight;
        adjustHeight();
    };

    // Update variable font weight
    window.updateFontWeight = function (newVal) {
        desktopText.style.fontVariationSettings = `'wght' ${newVal}`;
        mobileText.style.fontVariationSettings  = `'wght' ${newVal}`;
    };

    // Adjust slider ranges for mobile screens
    const updateSliderValuesForMobile = () => {
        if (window.innerWidth <= 576) {
            document.getElementById('size-slider').max    = '120';
            document.getElementById('size-slider').value  = '60';
            document.getElementById('leading-slider').max   = '150';
            document.getElementById('leading-slider').value = '75';
        } else {
            document.getElementById('size-slider').max    = '240';
            document.getElementById('size-slider').value  = '120';
            document.getElementById('leading-slider').max   = '300';
            document.getElementById('leading-slider').value = '150';
        }
    };

    updateSliderValuesForMobile();
    window.addEventListener('resize', updateSliderValuesForMobile);

});


// ----------------------------------------------------------
// SECTION 6: Interactive Alphabet Glyph Viewer
//
// How it works:
//   - The right column lists all 26 letters (Aa, Bb, Cc...).
//   - When the cursor enters a list item, the large letter
//     in the grid viewer on the left swaps to show that
//     character, rendered live with the Kilt font.
//   - The hovered item turns green (.active class).
//   - Starts on "A" by default.
// ----------------------------------------------------------

document.addEventListener('DOMContentLoaded', function () {

    const glyphImg = document.getElementById('kilt-glyph-img');
    const azItems  = document.querySelectorAll('.kilt-az-list li');

    if (!glyphImg || !azItems.length) return;

    azItems.forEach(function (li) {
        li.addEventListener('mouseenter', function () {
            // Swap the SVG to the hovered letter
            const letter = li.dataset.letter.toLowerCase();
            glyphImg.src = `../assets/kilt-page/svgs/glyph-grid/kilt-${letter}.svg`;
            glyphImg.alt = `Glyph ${li.dataset.letter}`;
            // Move the green highlight
            azItems.forEach(function (l) { l.classList.remove('active'); });
            li.classList.add('active');
        });
    });

});


// ----------------------------------------------------------
// DOWNLOAD BUTTON (Rive animation)
// ----------------------------------------------------------

document.addEventListener('DOMContentLoaded', function () {

    const button = document.getElementById('bloopy-dwn-btn');
    if (!button) return;   // button not present on this page version

    const r = new rive.Rive({
        src: '../assets/d2d-page/rivs/download-btn.riv',
        canvas: button,
        autoplay: true,
        artboard: 'bb24-download-btn',
        stateMachines: 'Button Machine',
        isTouchScrollEnabled: true,
        onLoad: () => {
            r.resizeDrawingSurfaceToCanvas();
            const inputs = r.stateMachineInputs('Button Machine');
            const xInput = inputs.find((i) => i.name === 'xAxis');
            const yInput = inputs.find((i) => i.name === 'yAxis');
            if (!xInput || !yInput) return;

            let maxWidth  = window.innerWidth;
            let maxHeight = window.innerHeight;
            window.addEventListener('resize', () => {
                maxWidth  = window.innerWidth;
                maxHeight = window.innerHeight;
            });
            window.addEventListener('mousemove', function (e) {
                xInput.value = (e.x / maxWidth)  * 100;
                yInput.value = 100 - (e.y / maxHeight) * 100;
            });
        },
        onStateChange: (riveEvent) => {
            riveEvent.data.forEach((state) => {
                if (state.indexOf('Linkout') > -1) {
                    window.location.href = '../assets/fonts/Kilt.zip';
                } else if (state.indexOf('hoverOnB') > -1 || state.indexOf('hoverOnA') > -1) {
                    button.style.cursor = 'pointer';
                } else if (state.indexOf('idle') > -1) {
                    button.style.cursor = 'default';
                }
            });
        }
    });

});
