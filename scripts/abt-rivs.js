// Abt Section 01 Riv
document.addEventListener("DOMContentLoaded", function() {
  const canvas = document.getElementById("abt-canvas-1");
  const parent = document.getElementById("abt-1-layout");

  if (!canvas || !parent) {
      console.error("Canvas or parent element not found.");
      return;
  }

  const originalWidth = 750;
  const originalHeight = 750;
  const aspectRatio = originalWidth / originalHeight;
  const minWidth = 600; // Set your minimum width here

  const r = new rive.Rive({
      src: 'assets/abt-rivs/abt-page-section01.riv',
      canvas: canvas,
      autoplay: true,
      artboard: "bb24-abt-01",
      stateMachines: "State Machine 1",
      isTouchScrollEnabled: true,  // Enable touch scrolling
      onLoad: () => {
          resizeCanvas(); // Ensure initial resize when Rive animation is loaded
          r.resizeDrawingSurfaceToCanvas();
      },
      onStateChange: (riveEvent) => {
          const newStates = riveEvent.data;
          newStates.forEach((state) => {
              if (state.indexOf("HOVER") > -1) {
                  canvas.style.cursor = "pointer";
              } else if (state.indexOf("IDLE") > -1 || state.indexOf("HOVER OFF") > -1) {
                  canvas.style.cursor = "default";
              }
          });
      }
  });

  function resizeCanvas() {
      const parentWidth = parent.clientWidth;
      const newWidth = Math.max(parentWidth, minWidth);
      const newHeight = newWidth / aspectRatio;

      // Set the canvas dimensions
      canvas.width = newWidth;
      canvas.height = newHeight;

      // Update Rive's drawing surface to the new canvas size
      r.resizeDrawingSurfaceToCanvas();
  }

  window.addEventListener('resize', resizeCanvas, { passive: true });
  resizeCanvas(); // Call the function initially to set canvas size
});


// Abt Section 02 Riv
document.addEventListener("DOMContentLoaded", function() {
  const canvas = document.getElementById("abt-canvas-2");
  const parent = document.getElementById("abt-2-layout");

  if (!canvas || !parent) {
      console.error("Canvas or parent element not found.");
      return;
  }

  const originalWidth = 750;
  const originalHeight = 750;
  const aspectRatio = originalWidth / originalHeight;
  const minWidth = 600; // Set your minimum width here

  const r = new rive.Rive({
      src: 'assets/abt-rivs/abt-page-section02.riv',
      // OR the path to a discoverable and public Rive asset
      // src: '/public/example.riv',
      canvas: document.getElementById("abt-canvas-2"),
      autoplay: true,
      artboard: "bb24-abt-02",
      stateMachines: "State Machine 1",
      isTouchScrollEnabled: true,  // Enable touch scrolling
      onLoad: () => {
        resizeCanvas(); // Ensure initial resize when Rive animation is loaded
        r.resizeDrawingSurfaceToCanvas();
      },
      onStateChange: (riveEvent) => {
        const newStates = riveEvent.data;
        newStates.forEach((state) => {
          //Add pointer to the hover on state
          if (state.indexOf("HOVER1-ON") > -1 || state.indexOf("HOVER2-ON") > -1) {
            canvas.style.cursor = "pointer";
            //Add an else if for all states that should have the 'pointer' cursor
          } else if (state.indexOf("IDLE-1") > -1 || state.indexOf("IDLE-2") > -1 || state.indexOf("HOVER1-OFF") > -1 || state.indexOf("HOVER2-OFF") > -1) {
            canvas.style.cursor = "default";
          } 
        });
      }
  });
  function resizeCanvas() {
    const parentWidth = parent.clientWidth;
    const newWidth = Math.max(parentWidth, minWidth);
    const newHeight = newWidth / aspectRatio;

    // Set the canvas dimensions
    canvas.width = newWidth;
    canvas.height = newHeight;

    // Update Rive's drawing surface to the new canvas size
    r.resizeDrawingSurfaceToCanvas();
  }

  window.addEventListener('resize', resizeCanvas, { passive: true });
  resizeCanvas(); // Call the function initially to set canvas size
});

//Egg Crack - Riv 03
document.addEventListener("DOMContentLoaded", function() {
  const canvas = document.getElementById("abt-canvas-3");
  const parent = document.getElementById("abt-3-layout");

  if (!canvas || !parent) {
      console.error("Canvas or parent element not found.");
      return;
  }

  const originalWidth = 750;
  const originalHeight = 750;
  const aspectRatio = originalWidth / originalHeight;
  const minWidth = 600; // Set your minimum width here

  const r = new rive.Rive({
      src: 'assets/abt-rivs/abt-page-section03.riv',
      // OR the path to a discoverable and public Rive asset
      // src: '/public/example.riv',
      canvas: document.getElementById("abt-canvas-3"),
      autoplay: true,
      artboard: "bb24-abt-03",
      stateMachines: "State Machine 1",
      isTouchScrollEnabled: true,  // Enable touch scrolling
      onLoad: () => {
        resizeCanvas(); // Ensure initial resize when Rive animation is loaded
        r.resizeDrawingSurfaceToCanvas();
      },
  });
  function resizeCanvas() {
    const parentWidth = parent.clientWidth;
    const newWidth = Math.max(parentWidth, minWidth);
    const newHeight = newWidth / aspectRatio;

    // Set the canvas dimensions
    canvas.width = newWidth;
    canvas.height = newHeight;

    // Update Rive's drawing surface to the new canvas size
    r.resizeDrawingSurfaceToCanvas();
  }

  window.addEventListener('resize', resizeCanvas, { passive: true });
  resizeCanvas(); // Call the function initially to set canvas size
});

//Typogrpahy - Riv04
document.addEventListener("DOMContentLoaded", function() {
  const canvas = document.getElementById("abt-canvas-4");
  const parent = document.getElementById("abt-riv-4");

  if (!canvas || !parent) {
      console.error("Canvas or parent element not found.");
      return;
  }

  const originalWidth = 750;
  const originalHeight = 750;
  const aspectRatio = originalWidth / originalHeight;
  const minWidth = 400; // Set your minimum width here

  const r = new rive.Rive({
      src: 'assets/abt-rivs/abt-page-section04.riv',
      // OR the path to a discoverable and public Rive asset
      // src: '/public/example.riv',
      canvas: document.getElementById("abt-canvas-4"),
      autoplay: true,
      artboard: "bb24-abt-04",
      stateMachines: "State Machine 1",
      isTouchScrollEnabled: true,  // Enable touch scrolling
      onLoad: () => {
        resizeCanvas(); // Ensure initial resize when Rive animation is loaded
        r.resizeDrawingSurfaceToCanvas();
      },
      onStateChange: (riveEvent) => {
        const newStates = riveEvent.data;
        newStates.forEach((state) => {
          if (state.indexOf("Linkout-NM") > -1) {
            window.open("https://off-type.com/products/neue-montreal", "_blank");
          } else if (state.indexOf("Linkout-Repro") > -1){
            window.open("https://www.collletttivo.it/typefaces/necto-mono", "_blank");
          } else if (state.indexOf("Linkout IBM") > -1){
            window.open("https://fonts.google.com/specimen/IBM+Plex+Mono", "_blank");
          } else if (state.indexOf("Linkout-Terminal") > -1) {
            window.open("https://velvetyne.fr/fonts/terminal-grotesque/", "_blank");
          } else if (state.indexOf("IBMStateB") > -1 || state.indexOf("TerminalB") > -1 || state.indexOf("ReproB") > -1 || state.indexOf("NeueMontrealB") > -1 )  {  
            //Add an else if for all states that should have the 'pointer' cursor
            canvas.style.cursor = "pointer";
          } else if (state.indexOf("idle" > -1)){
            canvas.style.cursor = "default";
          }
        });
      }
  });
  function resizeCanvas() {
    const parentWidth = parent.clientWidth;
    const newWidth = Math.max(parentWidth, minWidth);
    const newHeight = newWidth / aspectRatio;

    console.log(parentWidth, newWidth); 
    // Set the canvas dimensions
    canvas.width = newWidth;
    canvas.height = newHeight;

    // Update Rive's drawing surface to the new canvas size
    r.resizeDrawingSurfaceToCanvas();
  }

  window.addEventListener('resize', resizeCanvas, { passive: true });
  resizeCanvas(); // Call the function initially to set canvas size
});




document.addEventListener("DOMContentLoaded", function() {
  const canvas = document.getElementById("abt-canvas-5");
  const parent = document.getElementById("abt-5-layout");

  if (!canvas || !parent) {
      console.error("Canvas or parent element not found.");
      return;
  }

  const originalWidth = 750;
  const originalHeight = 750;
  const aspectRatio = originalWidth / originalHeight;
  const minWidth = 400; // Set your minimum width here

  const r = new rive.Rive({
      src: 'assets/abt-rivs/abt-page-section05.riv',
      // OR the path to a discoverable and public Rive asset
      // src: '/public/example.riv',
      canvas: document.getElementById("abt-canvas-5"),
      autoplay: true,
      artboard: "apt-page-pt5",
      stateMachines: "State Machine 1",
      isTouchScrollEnabled: true,  // Enable touch scrolling
      onLoad: () => {
        resizeCanvas(); // Ensure initial resize when Rive animation is loaded
        r.resizeDrawingSurfaceToCanvas();
      },
      onStateChange: (riveEvent) => {
        const newStates = riveEvent.data;
        newStates.forEach((state) => {
          //Add pointer to the hover on state
          if (state.indexOf("HoverOn") > -1 || state.indexOf("HoverOff") > -1) {
            canvas.style.cursor = "pointer";
            //Add an else if for all states that should have the 'pointer' cursor
          } else if (state.indexOf("IdleOn") > -1 || state.indexOf("IdleOff") > -1 || state.indexOf("ClickOn") > -1 || state.indexOf("ClickOff") > -1) {
            canvas.style.cursor = "default";
          } 
        });
      }
  });
  function resizeCanvas() {
    const parentWidth = parent.clientWidth;
    const newWidth = Math.max(parentWidth, minWidth);
    const newHeight = newWidth / aspectRatio;

    console.log(parentWidth, newWidth); 
    // Set the canvas dimensions
    canvas.width = newWidth;
    canvas.height = newHeight;

    // Update Rive's drawing surface to the new canvas size
    r.resizeDrawingSurfaceToCanvas();
  }

  window.addEventListener('resize', resizeCanvas, { passive: true });
  resizeCanvas(); // Call the function initially to set canvas size
});