document.addEventListener("DOMContentLoaded", function() {
    const desktopText = document.getElementById("pe-text");
    const mobileText = document.getElementById("pe-text-mob");

    const adjustHeight = () => {
        desktopText.style.height = "auto"; // Reset height to auto to get the actual scroll height
        desktopText.style.height = desktopText.scrollHeight + "px"; // Set height to scrollHeight
        mobileText.style.height = "auto";
        mobileText.style.height = mobileText.scrollHeight + "px";
    };

    // Adjust height on input
    desktopText.addEventListener("input", adjustHeight);
    mobileText.addEventListener("input", adjustHeight);

    adjustHeight(); // Initial adjustment of height

    // Change font-size
    window.updateSize = function(newVal) {
        const newFontSize = newVal + 'px';
        const newPaddingTop = (newVal * 0.3) + 'px'; // Adjust this multiplier to get the desired padding
        desktopText.style.fontSize = newFontSize;
        mobileText.style.fontSize = newFontSize;
        desktopText.style.paddingTop = newPaddingTop;
        mobileText.style.paddingTop = newPaddingTop;
        // document.getElementById('size-value').textContent = newFontSize; // Uncomment if needed
        adjustHeight(); // Adjust height after changing font size
    };

    // Change line-height
    window.updateLineHeight = function(newVal) {
        const newLineHeight = newVal + 'px';
        desktopText.style.lineHeight = newLineHeight;
        mobileText.style.lineHeight = newLineHeight;
        // document.getElementById('leading-value').textContent = newLineHeight; // Uncomment if needed
        adjustHeight(); // Adjust height after changing line height
    };

    // Change dot sharpness
    window.updateDotSharpness = function(newVal) {
        const barValue = document.getElementById('bar-slider').value;
        desktopText.style.fontVariationSettings = `'DOTW' ${newVal}, 'BARW' ${barValue}`;
        mobileText.style.fontVariationSettings = `'DOTW' ${newVal}, 'BARW' ${barValue}`;
        // document.getElementById('dot-value').textContent = newVal; // Uncomment if needed
    };

    // Change font-weight (bar sharpness)
    window.updateBarSharpness = function(newVal) {
        const dotValue = document.getElementById('dot-slider').value;
        desktopText.style.fontVariationSettings = `'BARW' ${newVal}, 'DOTW' ${dotValue}`;
        mobileText.style.fontVariationSettings = `'BARW' ${newVal}, 'DOTW' ${dotValue}`;
        // document.getElementById('weight-value').textContent = newVal; // Uncomment if needed
    };

    // Function to update slider values for mobile
    const updateSliderValuesForMobile = () => {
        const sizeSlider = document.getElementById('size-slider');
        const leadingSlider = document.getElementById('leading-slider');
        const dotSlider = document.getElementById('dot-slider');
        const barSlider = document.getElementById('bar-slider');

        if (window.innerWidth <= 576) {
            sizeSlider.min = "0";
            sizeSlider.max = "100"; // Change the max value for mobile
            sizeSlider.value = "50"; // Default value for mobile

            leadingSlider.min = "0";
            leadingSlider.max = "150"; // Change the max value for mobile
            leadingSlider.value = "75"; // Default value for mobile

            dotSlider.min = "0";
            dotSlider.max = "100"; // Adjust if needed
            dotSlider.value = "0"; // Default value for mobile

            barSlider.min = "0";
            barSlider.max = "100"; // Adjust weight range for mobile if needed
            barSlider.value = "0"; // Default value for mobile
        } else {
            // Reset values to default for larger screens
            sizeSlider.min = "0";
            sizeSlider.max = "200";
            sizeSlider.value = "100";

            leadingSlider.min = "0";
            leadingSlider.max = "240";
            leadingSlider.value = "120";

            dotSlider.min = "0";
            dotSlider.max = "100";
            dotSlider.value = "0";

            barSlider.min = "0";
            barSlider.max = "100";
            barSlider.value = "0";
        }
    };

    // Call the function to update slider values based on screen size
    updateSliderValuesForMobile();

    // Optionally update slider values when resizing the window
    window.addEventListener('resize', updateSliderValuesForMobile);
});







//downlaod Riv
document.addEventListener("DOMContentLoaded", function() {
      let button = document.getElementById("bloopy-dwn-btn");
      if (!button) {
        console.error("Element with id 'bloopy-home' not found.");
        return;
      }
      const r = new rive.Rive({
          src: '../assets/d2d-page/rivs/download-btn.riv',
          // OR the path to a discoverable and public Rive asset
          // src: '/public/example.riv',
          canvas: document.getElementById("bloopy-dwn-btn"),
          autoplay: true,
          artboard: "bb24-download-btn",
          stateMachines: "Button Machine",
          isTouchScrollEnabled: true,  // Enable touch scrolling
          onLoad: () => {
            r.resizeDrawingSurfaceToCanvas();
            // Replace LookAround with the name of your state machine
            const inputs = r.stateMachineInputs("Button Machine");
            // Replace xAxis with the name of your x input
            const xInput = inputs.find((input) => input.name === "xAxis");
            // Replace yAxis with the name of your y input
            const yInput = inputs.find((input) => input.name === "yAxis");
      
            if (!xInput || !yInput) {
              console.error("xInput or yInput not found.");
              return;
            }
      
            const updateMaxDimensions = () => {
              maxWidth = window.innerWidth;
              maxHeight = window.innerHeight;
            };
      
            let maxWidth = window.innerWidth;
            let maxHeight = window.innerHeight;
            updateMaxDimensions();
      
            window.addEventListener("resize", updateMaxDimensions);
      
            // This assumes your blend state for x and y axis goes from 0-100
            window.addEventListener("mousemove", function (e) {
              xInput.value = (e.x / maxWidth) * 100;
              yInput.value = 100 - (e.y / maxHeight) * 100;
            });
          },
          onStateChange: (riveEvent) => {
            const newStates = riveEvent.data;
            newStates.forEach((state) => {
              if (state.indexOf("Linkout") > -1) {
                window.location.href = "../assets/fonts/Pocket-Electronic.zip";
              } else if (state.indexOf("hoverOnB") > -1 || state.indexOf("hoverOnA") > -1 ) {  
                //Add an else if for all states that should have the 'pointer' cursor
                button.style.cursor = "pointer";
              } else if (state.indexOf("idle" > -1)){
                button.style.cursor = "default";
              }
            });
          }
      });
  });