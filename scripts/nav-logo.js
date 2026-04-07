document.addEventListener('DOMContentLoaded', () => {
  // Mobile uses the static SVG — skip animation entirely
  if (window.matchMedia('(max-width: 575px)').matches) return;

  const FRAME_COUNT = 24;
  const FPS = 24;
  const FRAME_MS = 1000 / FPS;

  // Resolve base path — works from root pages and fonts/ subpages
  const depth = window.location.pathname.includes('/fonts/') ? '../' : '';
  const frameSrc = (i) =>
    `${depth}assets/logos/SK8BRD-FLIP/SK8BRD-FLIP_${String(i).padStart(3, '0')}.png`;

  // Preload all frames on page load so there's no flicker
  const frames = Array.from({ length: FRAME_COUNT }, (_, i) => {
    const img = new Image();
    img.src = frameSrc(i);
    return img;
  });

  const logo = document.getElementById('nav-logo');
  if (!logo) return;

  let currentFrame = 0;
  let rafId = null;
  let lastTime = null;
  let state = 'idle'; // 'forward' | 'finish' | 'idle'

  function setFrame(n) {
    currentFrame = n;
    logo.src = frames[n].src;
  }

  function animate(ts) {
    if (lastTime === null) lastTime = ts;
    const elapsed = ts - lastTime;

    if (elapsed >= FRAME_MS) {
      lastTime = ts - (elapsed % FRAME_MS);

      const next = currentFrame + 1;

      if (state === 'forward') {
        if (next >= FRAME_COUNT - 1) {
          // Reached last frame — hold here
          setFrame(FRAME_COUNT - 1);
          state = 'idle';
          rafId = null;
          return;
        }
        setFrame(next);

      } else if (state === 'finish') {
        if (next >= FRAME_COUNT - 1) {
          // Completed the cycle — reset to frame 0 (matches last frame visually)
          setFrame(0);
          state = 'idle';
          rafId = null;
          return;
        }
        setFrame(next);
      }
    }

    rafId = requestAnimationFrame(animate);
  }

  function onEnter() {
    // Always restart forward from current position
    if (rafId) cancelAnimationFrame(rafId);
    state = 'forward';
    lastTime = null;
    rafId = requestAnimationFrame(animate);
  }

  function onLeave() {
    if (currentFrame === 0 || currentFrame === FRAME_COUNT - 1) {
      // At start or end — snap to frame 0 immediately (they're identical)
      setFrame(0);
      state = 'idle';
      if (rafId) cancelAnimationFrame(rafId);
      rafId = null;
      return;
    }
    // Mid-animation — let it play to the end, then reset
    state = 'finish';
    if (!rafId) {
      lastTime = null;
      rafId = requestAnimationFrame(animate);
    }
  }

  // Attach to the <a> wrapper so the full clickable area triggers the animation
  logo.closest('a').addEventListener('mouseenter', onEnter);
  logo.closest('a').addEventListener('mouseleave', onLeave);
});
