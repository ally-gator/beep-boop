// ==========================================================
// TOY BOX PAGE — matter-toybox.js
// Physics: Matter.js · Rendering: Path2D with evenodd fill rule
// Architecture mirrors matter-fixed-shapes.html — full rebuild
// on every resize so SC, walls, and pieces stay in sync.
// ==========================================================

const DPR = window.devicePixelRatio || 1;

// ── SVG VISUALS ────────────────────────────────────────────
// outer: SVG path string · holes: array of circle centres/radii in SVG-space coords
const SVG = {
    p1: {
        outer: 'M100,0C44.77,0,0,44.77,0,100v200c0,55.23,44.77,100,100,100s100-44.77,100-100V100C200,44.77,155.23,0,100,0Z',
        holes: [{ cx: 100, cy: 100, r: 36 }, { cx: 100, cy: 300, r: 36 }]
    },
    p2: {
        outer: 'M100,0C44.77,0,0,44.77,0,100v575c0,55.23,44.77,100,100,100s100-44.77,100-100V100C200,44.77,155.23,0,100,0Z',
        holes: [{ cx: 100, cy: 100, r: 36 }, { cx: 100, cy: 387.5, r: 36 }, { cx: 100, cy: 675, r: 36 }]
    },
    p3: {
        outer: 'M400,300c-110.28,0-200-89.72-200-200C200,44.77,155.23,0,100,0S0,44.77,0,100s10.59,106.35,31.48,155.73c20.15,47.64,48.98,90.41,85.68,127.11s79.47,65.53,127.11,85.68c49.38,20.89,101.77,31.48,155.73,31.48s100-44.77,100-100-44.77-100-100-100Z',
        holes: [{ cx: 100, cy: 100, r: 36 }, { cx: 400, cy: 400, r: 36 }]
    },
    p4: {
        outer: 'M576.38,183.2c-15.12-35.74-36.73-67.81-64.25-95.33-27.52-27.52-59.59-49.14-95.33-64.25C379.75,7.95,340.46,0,300,0s-79.75,7.95-116.8,23.62c-35.74,15.11-67.81,36.73-95.33,64.25-27.52,27.52-49.14,59.59-64.25,95.33C7.95,220.25,0,259.54,0,300c0,55.23,44.77,100,100,100s100-44.77,100-100,44.86-100,100-100,100,44.86,100,100,44.77,100,100,100,100-44.77,100-100c0-40.46-7.95-79.75-23.62-116.8Z',
        holes: [{ cx: 100, cy: 300, r: 36 }, { cx: 300, cy: 100, r: 36 }, { cx: 500, cy: 300, r: 36 }]
    }
};

// ── PIECE DEFINITIONS ──────────────────────────────────────
// spine: centre-line points through the shape · r: circle radius for physics hull
const PIECE_DEFS = [
    { svgId: 'p1', spine: [{ x: 100, y: 0 }, { x: 100, y: 400 }], r: 100 },
    { svgId: 'p2', spine: [{ x: 100, y: 0 }, { x: 100, y: 775 }], r: 100 },
    { svgId: 'p3', spine: [{ x: 100, y: 100 }, { x: 175, y: 140 }, { x: 230, y: 200 }, { x: 270, y: 270 }, { x: 300, y: 350 }, { x: 400, y: 400 }], r: 100 },
    { svgId: 'p4', spine: [{ x: 100, y: 300 }, { x: 150, y: 220 }, { x: 220, y: 160 }, { x: 300, y: 100 }, { x: 380, y: 160 }, { x: 450, y: 220 }, { x: 500, y: 300 }], r: 100 }
];

// ── PHYSICS OPTIONS ────────────────────────────────────────
const OPTS = { restitution: 0.35, friction: 0.6, frictionAir: 0.03, density: 0.003 };

// ── CANVAS SETUP ───────────────────────────────────────────
const matterContainer = document.querySelector('#tb-matter');
const _canvas = document.createElement('canvas');
matterContainer.appendChild(_canvas);
const ctx = _canvas.getContext('2d');

// Dimensions — recomputed on every resize
let W, H, SC;

function updateDimensions() {
    W  = matterContainer.clientWidth;
    H  = matterContainer.clientHeight;
    SC = (H * 0.40) / 975;
    _canvas.width        = W * DPR;
    _canvas.height       = H * DPR;
    _canvas.style.width  = W + 'px';
    _canvas.style.height = H + 'px';
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
}

// ── PHYSICS ────────────────────────────────────────────────
const { Engine, Runner, Bodies, Body, World, Mouse, MouseConstraint, Events, Sleeping } = Matter;
const engine = Engine.create({ gravity: { y: 1.2 }, enableSleeping: true });
const world  = engine.world;

let bodies = [], runner, mc;

function spineBody(points, r) {
    const filled = [];
    for (let i = 0; i < points.length - 1; i++) {
        const a = points[i], b = points[i + 1];
        const dx = b.x - a.x, dy = b.y - a.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const steps = Math.ceil(dist / (r * 1.2));
        for (let s = 0; s <= steps; s++) {
            const t = s / steps;
            filled.push({ x: a.x + dx * t, y: a.y + dy * t });
        }
    }
    const unique = [filled[0]];
    for (let i = 1; i < filled.length; i++) {
        const prev = unique[unique.length - 1];
        const dx = filled[i].x - prev.x, dy = filled[i].y - prev.y;
        if (Math.sqrt(dx * dx + dy * dy) > r * 0.5) unique.push(filled[i]);
    }
    const parts = unique.map(p => Bodies.circle(p.x * SC, p.y * SC, r * SC, OPTS));
    return Body.create({ parts, ...OPTS });
}

function makeBody(def, dropX, dropY) {
    const body = spineBody(def.spine, def.r);
    body._svgOffsetX = -body.position.x;
    body._svgOffsetY = -body.position.y;
    Body.setPosition(body, { x: dropX, y: dropY });
    Body.setAngle(body, (Math.random() - 0.5) * 0.3);
    body._def = def;
    return body;
}

// ── RENDERING ─────────────────────────────────────────────

function drawPiece(body) {
    const svg = SVG[body._def.svgId];
    ctx.save();
    ctx.translate(body.position.x, body.position.y);
    ctx.rotate(body.angle);
    ctx.translate(body._svgOffsetX, body._svgOffsetY);
    ctx.scale(SC, SC);
    ctx.fillStyle = '#000000';
    const path = new Path2D();
    path.addPath(new Path2D(svg.outer));
    svg.holes.forEach(h => {
        const hole = new Path2D();
        hole.arc(h.cx, h.cy, h.r, 0, Math.PI * 2);
        hole.closePath();
        path.addPath(hole);
    });
    ctx.fill(path, 'evenodd');
    ctx.restore();
}

function loop() {
    ctx.clearRect(0, 0, W, H);
    bodies.forEach(drawPiece);
    requestAnimationFrame(loop);
}

function wakeAll() {
    bodies.forEach(b => Sleeping.set(b, false));
}

// ── WORLD SETUP ────────────────────────────────────────────

function buildWalls() {
    const s = { isStatic: true, restitution: 0.3, friction: 0.8 };
    World.add(world, [
        Bodies.rectangle(W / 2, H + 30,  W + 200, 60,      s),  // ground
        Bodies.rectangle(-30,   H / 2,   60,      H + 200, s),  // left
        Bodies.rectangle(W + 30, H / 2,  60,      H + 200, s),  // right
    ]);
}

function spawnPieces() {
    bodies.forEach(b => World.remove(world, b));
    bodies = [];
    [0, 2, 3, 1].forEach((pi, i) => {
        const def = PIECE_DEFS[pi];
        const x = (W / 5) * (i + 1);
        const y = -80 - i * 160;
        const b = makeBody(def, x, y);
        bodies.push(b);
        World.add(world, b);
    });
}

function init() {
    World.clear(world);
    Engine.clear(engine);
    engine.gravity.y = 1.2;
    buildWalls();
    spawnPieces();

    const mouse = Mouse.create(_canvas);
    mouse.pixelRatio = DPR;
    mc = MouseConstraint.create(engine, {
        mouse,
        constraint: { stiffness: 0.25, angularStiffness: 0.1, render: { visible: false } }
    });
    World.add(world, mc);
    Events.on(mc, 'startdrag', wakeAll);

    // Allow scroll to pass through — don't swallow wheel events
    mc.mouse.element.removeEventListener('mousewheel',     mc.mouse.mousewheel);
    mc.mouse.element.removeEventListener('DOMMouseScroll', mc.mouse.mousewheel);

    // Cursor feedback
    Events.on(mc, 'startdrag', () => { _canvas.style.cursor = 'grabbing'; });
    Events.on(mc, 'enddrag',   () => { _canvas.style.cursor = 'grab'; });
    _canvas.addEventListener('mousemove', () => {
        if (!mc.body) _canvas.style.cursor = 'default';
    }, { passive: true });

    if (runner) Runner.stop(runner);
    runner = Runner.create();
    Runner.run(runner, engine);
}

// ── RESIZE & RESET ─────────────────────────────────────────

let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        updateDimensions();
        init();
    }, 150);
});

_canvas.addEventListener('dblclick', () => {
    updateDimensions();
    init();
});

// ── BOOT ───────────────────────────────────────────────────

updateDimensions();
loop();
init();
