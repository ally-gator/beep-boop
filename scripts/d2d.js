// Font-Tester
document.addEventListener("DOMContentLoaded", function() {
  const desktopText = document.getElementById("d2d-text");
  const mobileText = document.getElementById("d2d-text-mob");

  const adjustHeight = () => {
    desktopText.style.height = "auto"; // Reset height to auto to get the actual scroll height
    desktopText.style.height = desktopText.scrollHeight + "px"; // Set height to scrollHeight
    mobileText.style.height = "auto";
    mobileText.style.height = mobileText.scrollHeight + "px";
  };

  // Adjust height on input
  desktopText.addEventListener("input", adjustHeight);
  mobileText.addEventListener("input", adjustHeight);

  adjustHeight();

  // Change font-size
  window.updateSize = function(newVal) {
    var newFontSize = newVal + 'px';
    var newPaddingTop = (newVal * 0.3) + 'px'; // Adjust this multiplier to get the desired padding
    desktopText.style.fontSize = newFontSize;
    mobileText.style.fontSize = newFontSize;
    desktopText.style.paddingTop = newPaddingTop;
    mobileText.style.paddingTop = newPaddingTop;
    document.getElementById('size-value').textContent = newFontSize;
    adjustHeight(); // Adjust height after changing font size
  };

  // Change line-height
  window.updateLineHeight = function(newVal) {
    var newLineHeight = newVal + 'px';
    desktopText.style.lineHeight = newLineHeight;
    mobileText.style.lineHeight = newLineHeight;
    document.getElementById('leading-value').textContent = newLineHeight;
    adjustHeight(); // Adjust height after changing line height
  };

  // Change letter-spacing
  window.updateLetterSpacing = function(newVal) {
    var newLetterSpacing = newVal + 'px';
    desktopText.style.letterSpacing = newLetterSpacing;
    mobileText.style.letterSpacing = newLetterSpacing;
    document.getElementById('kerning-value').textContent = newLetterSpacing;
    adjustHeight(); // Adjust height after changing letter spacing
  };

  // Function to update slider values for mobile
  const updateSliderValuesForMobile = () => {
    if (window.innerWidth <= 576) {
      // Mobile view settings
      document.getElementById('size-slider').min = "0";
      document.getElementById('size-slider').max = "100"; // Change the max value for mobile
      document.getElementById('size-slider').value = "50"; // Default value for mobile

      document.getElementById('leading-slider').min = "0";
      document.getElementById('leading-slider').max = "144"; // Change the max value for mobile
      document.getElementById('leading-slider').value = "72"; // Default value for mobile

      document.getElementById('kerning-slider').min = "-5";
      document.getElementById('kerning-slider').max = "5"; // Change the max value for mobile
      document.getElementById('kerning-slider').value = "0"; // Default value for mobile
    } else {
      // Desktop view settings
      document.getElementById('size-slider').min = "0";
      document.getElementById('size-slider').max = "240";
      document.getElementById('size-slider').value = "120";

      document.getElementById('leading-slider').min = "0";
      document.getElementById('leading-slider').max = "300";
      document.getElementById('leading-slider').value = "150";

      document.getElementById('kerning-slider').min = "-10";
      document.getElementById('kerning-slider').max = "10";
      document.getElementById('kerning-slider').value = "0";
    }
  };

  // Call the function to update slider values based on screen size
  updateSliderValuesForMobile(); // Ensures it's called at page load

  // Update slider values on window resize
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
                window.location.href = "../assets/fonts/dot2dot.zip";
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