const THICCNESS = 60;
const SVG_PATH_01 = "#matter-path-01";
const SVG_PATH_02 = "#matter-path-02";
const SVG_WIDTH_IN_PX = 100;
const SVG_WIDTH_AS_PERCENT_OF_CONTAINER_WIDTH = 0.3;

const matterContainer = document.querySelector("#matter-container");

// module aliases
var Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite,
  Body = Matter.Body,
  Svg = Matter.Svg,
  Vector = Matter.Vector,
  Vertices = Matter.Vertices;
  Events = Matter.Events,
  Query = Matter.Query;

// create an engine
var engine = Engine.create();
engine.world.gravity.scale = .0001; // Adjust the gravity scale as needed

// create a renderer
var render = Render.create({
  element: matterContainer,
  engine: engine,
  options: {
    width: matterContainer.clientWidth,
    height: matterContainer.clientHeight,
    background: "transparent",
    wireframes: false,
    showAngleIndicator: false
  }
});

createCircle();
createRect();
createSvgOne();
createSvgTwo();

var ground = Bodies.rectangle(
  matterContainer.clientWidth / 2,
  matterContainer.clientHeight + THICCNESS / 2,
  27184,
  THICCNESS,
  { isStatic: true }
);

let leftWall = Bodies.rectangle(
  0 - THICCNESS / 2,
  matterContainer.clientHeight / 2,
  THICCNESS,
  matterContainer.clientHeight * 5,
  {
    isStatic: true
  }
);

let rightWall = Bodies.rectangle(
  matterContainer.clientWidth + THICCNESS / 2,
  matterContainer.clientHeight / 2,
  THICCNESS,
  matterContainer.clientHeight * 5,
  { isStatic: true }
);

let topWall = Bodies.rectangle(
    matterContainer.clientWidth / 2,
    -THICCNESS / 2,
    matterContainer.clientWidth + THICCNESS * 2,
    THICCNESS,
    { isStatic: true }
);

// add all of the bodies to the world
Composite.add(engine.world, [ground, leftWall, rightWall, topWall]);

let mouse = Matter.Mouse.create(render.canvas);
let mouseConstraint = Matter.MouseConstraint.create(engine, {
  mouse: mouse,
  constraint: {
    stiffness: 0.1,
    render: {
      visible: false
    }
  }
});

Composite.add(engine.world, mouseConstraint);

let isDragging = false; // Flag to track dragging state

// Event to change cursor to "grab" when hovering over bodies
Events.on(mouseConstraint, 'mousemove', (event) => {
    if (!isDragging) {
        const foundBodies = Query.point(Composite.allBodies(engine.world), event.mouse.position);
        if (foundBodies.length > 0) {
            render.canvas.style.cursor = 'grab';
        } else {
            render.canvas.style.cursor = 'default';
        }
    }
});

// Event to change cursor to "grabbing" when mouse is down on a body
Events.on(mouseConstraint, 'mousedown', () => {
    render.canvas.style.cursor = 'grabbing';
    isDragging = true; // Set dragging flag to true
});

// Event to reset cursor to "default" when mouse is up on a body
Events.on(mouseConstraint, 'mouseup', () => {
    render.canvas.style.cursor = 'grab';
    isDragging = false; // Reset dragging flag to false
});

// allow scroll through the canvas
mouseConstraint.mouse.element.removeEventListener(
  "mousewheel",
  mouseConstraint.mouse.mousewheel
);
mouseConstraint.mouse.element.removeEventListener(
  "DOMMouseScroll",
  mouseConstraint.mouse.mousewheel
);

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);
console.log(Composite.allBodies(engine.world));

function createCircle() {
  let circle = Bodies.circle(
    100,
    70,
    40,
    {
        frictionAir: .015,
        restitution: 0,
        friction: .1,
      render: {
        fillStyle: "#01924f",
        strokeStyle: "#01924f"
      }
    }
  );
  Composite.add(engine.world, circle);
}

function createRect() {
    let rect = Bodies.rectangle(
      400,
      80,
      120,
      62,
      {
        angle: Math.PI / 2.3,
        frictionAir: .015,
        restitution: 0,
        friction: .1,
        render: {
          fillStyle: "#d82d19",
          strokeStyle: "#d82d19"
        }
      }
    );
    Composite.add(engine.world, rect);
  }

function createSvgOne() {
  const paths = document.querySelectorAll(SVG_PATH_01);
  paths.forEach((path, index) => {
    let vertices = Svg.pathToVertices(path);
    vertices = Vertices.scale(vertices, .8, .8);
    let svgBody = Bodies.fromVertices(
      1000,
      220,
      [vertices],
      {
        frictionAir: .015,
        restitution: 0,
        friction: .1,
        render: {
          fillStyle: "#f3b352",
          strokeStyle: "#f3b352",
          lineWidth: 2
        }
      }
    );
    Composite.add(engine.world, svgBody);
  });
}

function createSvgTwo() {
  const paths = document.querySelectorAll(SVG_PATH_02);
  paths.forEach((path, index) => {
    let vertices = Svg.pathToVertices(path);
    vertices = Vertices.scale(vertices, .8, .8);
    let svgBody = Bodies.fromVertices(
      600,
      100,
      [vertices],
      {
        frictionAir: .015,
        restitution: 0,
        friction: .1,
        render: {
          fillStyle: "#307faf",
          strokeStyle: "#307faf",
          lineWidth: 2
        }
      }
    );
    Composite.add(engine.world, svgBody);
  });
}


function handleResize(matterContainer) {
  // set canvas size to new values
  render.canvas.width = matterContainer.clientWidth;
  render.canvas.height = matterContainer.clientHeight;

  // reposition ground
  Body.setPosition(
    ground,
    Vector.create(
      matterContainer.clientWidth / 2,
      matterContainer.clientHeight + THICCNESS / 2
    )
  );

  // reposition right wall
  Body.setPosition(
    rightWall,
    Vector.create(
      matterContainer.clientWidth + THICCNESS / 2,
      matterContainer.clientHeight / 2
    )
  );

}

window.addEventListener("resize", () => handleResize(matterContainer));