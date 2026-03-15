// ==========================================================
// TOY BOX PAGE — matter-toybox.js
// Physics simulation using Matter.js + the tb-p1 to tb-p4 shapes
// ==========================================================

// ── PHYSICS CONTROLS ──────────────────────────────────────
// Tweak these to change the overall feel of the simulation:

const GRAVITY_Y     = 1;       // Direction: 1 = down, 0 = weightless, -1 = up
const GRAVITY_SCALE = 0.001;   // Strength: smaller = lighter/slower fall

// Wall thickness (invisible boundary around the canvas)
const THICCNESS = 60;

// Shape colours — all black to match the design
const SHAPE_COLOUR = '#000000';

// Background colour used to paint holes — must match --tb-bg in toybox.css
const BG_COLOUR = '#ebbdb0';

// Debug: draw a magenta crosshair at body.position for every registered shape.
// Set true, open the page, screenshot — then measure the offset from each crosshair
// to the visual hole centre and apply that delta to lx/ly above. Set false when done.
const DEBUG_CENTROID = false;

// Per-shape physics options — adjust frictionAir, restitution, friction as needed:
//   frictionAir:  air resistance (0 = no drag, 0.05 = sluggish)
//   restitution:  bounciness   (0 = no bounce, 1 = full bounce)
//   friction:     surface grip (0 = ice, 1 = rough)
const PHYSICS = {
    frictionAir: 0.02,
    restitution: 0.3,
    friction:    0.1
};

// ── HOLE REGISTRY ──────────────────────────────────────────
// Each entry: { body, holes: [{ lx, ly, r }] }
// lx/ly = hole centre in LOCAL body coordinates (pixels from body centroid)
// r     = hole radius in pixels
// These are painted onto the canvas after each render frame.
// If a hole looks offset, tweak its lx/ly here.

const holeRegistry = [];

// ── SETUP ──────────────────────────────────────────────────

const matterContainer = document.querySelector('#tb-matter');

var Engine     = Matter.Engine,
    Render     = Matter.Render,
    Runner     = Matter.Runner,
    Bodies     = Matter.Bodies,
    Composite  = Matter.Composite,
    Body       = Matter.Body,
    Svg        = Matter.Svg,
    Vector     = Matter.Vector,
    Vertices   = Matter.Vertices,
    Events     = Matter.Events,
    Query      = Matter.Query;

// Create engine with gravity settings
var engine = Engine.create();
engine.world.gravity.y     = GRAVITY_Y;
engine.world.gravity.scale = GRAVITY_SCALE;

// Create renderer
var render = Render.create({
    element: matterContainer,
    engine:  engine,
    options: {
        width:              matterContainer.clientWidth,
        height:             matterContainer.clientHeight,
        background:         'transparent',
        wireframes:         false,
        showAngleIndicator: false
    }
});

// ── SPAWN SHAPES ───────────────────────────────────────────
// spawnShape(pathId, scale, x, y, angle, holes)
//   pathId — id of the hidden <path> element in #tb-svgs
//   scale  — shape size (0.1 = tiny, 0.5 = large)    ← adjust per-call below
//   x, y   — spawn position in the canvas
//   angle  — initial rotation in radians
//   holes  — array of { lx, ly, r } for post-render hole painting

// tb-p1: small pill (2 holes)
// SVG 200×400, centroid (100,200), scale 0.25 → lx=(hx-100)*0.25, ly=(hy-200)*0.25
// hole centres from SVG: top=(100,100), bottom=(100,300)
spawnShape('tb-p1-path', 0.25, matterContainer.clientWidth * 0.15, 60, 0, [
    { lx:  0, ly: -25, r: 9 },   // top hole    (100,100)
    { lx:  0, ly:  25, r: 9 }    // bottom hole (100,300)
]);
spawnShape('tb-p1-path', 0.25, matterContainer.clientWidth * 0.45, 40, Math.PI / 4, [
    { lx:  0, ly: -25, r: 9 },
    { lx:  0, ly:  25, r: 9 }
]);

// tb-p2: tall pill (3 holes)
// SVG 200×775, centroid (100,387.5), scale 0.25 (matches tb-p1 width — same 200px SVG)
// hole centres from SVG: top=(100,172), mid=(100,387.5), bot=(100,675)
spawnShape('tb-p2-path', 0.25, matterContainer.clientWidth * 0.70, 80, Math.PI / 6, [
    { lx:  0, ly: -72, r: 9 },   // top hole    (100,100)
    { lx:  0, ly:   0, r: 9 },   // middle hole (100,387.5)
    { lx:  0, ly:  72, r: 9 }    // bottom hole (100,675)
]);

// tb-p3: curved L / quarter-circle arm (2 holes)
// SVG 500×500, centroid ≈(245,255), scale 0.22
// hole centres from SVG: top-left=(100.5,172), bot-right=(400,400)
// ⚠ centroid is estimated for this concave shape — tweak lx/ly ±5 if slightly off
spawnShape('tb-p3-path', 0.22, matterContainer.clientWidth * 0.30, 100, Math.PI / 3, [
    { lx: -32, ly: -44, r: 8 },  // top-left hole  (100.5,100)
    { lx:  34, ly:  22, r: 8 }   // bottom-right hole (400,400)
]);
spawnShape('tb-p3-path', 0.22, matterContainer.clientWidth * 0.80, 50, -Math.PI / 5, [
    { lx: -32, ly: -18, r: 8 },
    { lx:  34, ly:  32, r: 8 }
]);

// tb-p4: triple arch (3 holes)
// ⚠ Hole positions are approximate — tweak lx/ly if they look offset in the browser
spawnShape('tb-p4-path', 0.22, matterContainer.clientWidth * 0.55, 120, Math.PI / 8, [
    { lx: -44, ly:  22, r: 8 },  // left arch hole
    { lx:   0, ly: -22, r: 8 },  // centre arch hole
    { lx:  44, ly:  22, r: 8 }   // right arch hole
]);

// ── WALLS ──────────────────────────────────────────────────

var ground = Bodies.rectangle(
    matterContainer.clientWidth / 2,
    matterContainer.clientHeight + THICCNESS / 2,
    27184,
    THICCNESS,
    { isStatic: true }
);

var leftWall = Bodies.rectangle(
    0 - THICCNESS / 2,
    matterContainer.clientHeight / 2,
    THICCNESS,
    matterContainer.clientHeight * 5,
    { isStatic: true }
);

var rightWall = Bodies.rectangle(
    matterContainer.clientWidth + THICCNESS / 2,
    matterContainer.clientHeight / 2,
    THICCNESS,
    matterContainer.clientHeight * 5,
    { isStatic: true }
);

var topWall = Bodies.rectangle(
    matterContainer.clientWidth / 2,
    -THICCNESS / 2,
    matterContainer.clientWidth + THICCNESS * 2,
    THICCNESS,
    { isStatic: true }
);

Composite.add(engine.world, [ground, leftWall, rightWall, topWall]);

// ── MOUSE INTERACTION ──────────────────────────────────────

var mouse = Matter.Mouse.create(render.canvas);
var mouseConstraint = Matter.MouseConstraint.create(engine, {
    mouse:      mouse,
    constraint: { stiffness: 0.1, render: { visible: false } }
});

Composite.add(engine.world, mouseConstraint);

var isDragging = false;

Events.on(mouseConstraint, 'mousemove', (event) => {
    if (!isDragging) {
        const found = Query.point(Composite.allBodies(engine.world), event.mouse.position);
        render.canvas.style.cursor = found.length > 0 ? 'grab' : 'default';
    }
});

Events.on(mouseConstraint, 'mousedown', () => {
    render.canvas.style.cursor = 'grabbing';
    isDragging = true;
});

Events.on(mouseConstraint, 'mouseup', () => {
    render.canvas.style.cursor = 'grab';
    isDragging = false;
});

// Allow scrolling through the canvas — don't swallow scroll events
mouseConstraint.mouse.element.removeEventListener('mousewheel',     mouseConstraint.mouse.mousewheel);
mouseConstraint.mouse.element.removeEventListener('DOMMouseScroll', mouseConstraint.mouse.mousewheel);

// ── HOLE PAINTER ───────────────────────────────────────────

Events.on(render, 'afterRender', function () {
    const ctx = render.canvas.getContext('2d');
    ctx.fillStyle = BG_COLOUR;

    if (DEBUG_CENTROID) {
        ctx.strokeStyle = '#ff00ff';
        ctx.lineWidth   = 2;
        holeRegistry.forEach(({ body }) => {
            const { x, y } = body.position;
            ctx.beginPath(); ctx.moveTo(x - 8, y); ctx.lineTo(x + 8, y); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(x, y - 8); ctx.lineTo(x, y + 8); ctx.stroke();
        });
    }

    holeRegistry.forEach(({ body, holes }) => {
        const { x, y } = body.position;
        const angle    = body.angle;

        holes.forEach(({ lx, ly, r }) => {
            // Transform local hole position by body rotation, then translate to world position
            const cosA = Math.cos(angle);
            const sinA = Math.sin(angle);
            const wx   = x + lx * cosA - ly * sinA;
            const wy   = y + lx * sinA + ly * cosA;

            ctx.beginPath();
            ctx.arc(wx, wy, r, 0, Math.PI * 2);
            ctx.fill();
        });
    });
});

// ── RUN ────────────────────────────────────────────────────

Render.run(render);
var runner = Runner.create();
Runner.run(runner, engine);

// ── RESIZE HANDLER ─────────────────────────────────────────

function handleResize() {
    render.canvas.width  = matterContainer.clientWidth;
    render.canvas.height = matterContainer.clientHeight;

    Body.setPosition(ground,     Vector.create(matterContainer.clientWidth / 2, matterContainer.clientHeight + THICCNESS / 2));
    Body.setPosition(rightWall,  Vector.create(matterContainer.clientWidth + THICCNESS / 2, matterContainer.clientHeight / 2));
    Body.setPosition(topWall,    Vector.create(matterContainer.clientWidth / 2, -THICCNESS / 2));
}

window.addEventListener('resize', handleResize);

// ── HELPERS ────────────────────────────────────────────────

function spawnShape(pathId, scale, x, y, angle, holes) {
    const pathEl = document.getElementById(pathId);
    if (!pathEl) { console.warn('tb-matter: path not found —', pathId); return; }

    // Use default step (30px intervals) — matches matter-d2d.js; fewer points = cleaner poly-decomp
    let vertices = Svg.pathToVertices(pathEl);
    vertices = Vertices.scale(vertices, scale, scale);

    const body = Bodies.fromVertices(x, y, [vertices], {
        frictionAir: PHYSICS.frictionAir,
        restitution: PHYSICS.restitution,
        friction:    PHYSICS.friction,
        render: {
            fillStyle:   SHAPE_COLOUR,
            strokeStyle: SHAPE_COLOUR
        }
    });

    if (body) {
        Body.setAngle(body, angle);   // set after fromVertices centroid correction
        Composite.add(engine.world, body);
        if (holes && holes.length) {
            holeRegistry.push({ body, holes });
        }
    }
}
